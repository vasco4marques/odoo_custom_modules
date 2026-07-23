// Usage: node compile.mjs <workspacePath> <entryRelativePath>
//
// Prints {ok, js, diagnostics, compilerVersion} as JSON. Author imports of
// langium and vscode-languageserver-types remain external so the generated
// module shares those packages with the runtime that eventually loads it.

import path from 'node:path';
import {mkdtemp, rm, symlink, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {build, version as esbuildVersion} from 'esbuild';

const LANGIUM_VERSION = '4.3.1';
const BUNDLE_VERSION = '1.1.0';
const COMPILER_VERSION = `esbuild ${esbuildVersion} / langium ${LANGIUM_VERSION} / compiler ${BUNDLE_VERSION}`;
const COMPILER_DIRECTORY = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
);

function output(payload) {
    process.stdout.write(JSON.stringify(payload));
}

function diagnosticLocation(location, workspacePath) {
    if (!location) {
        return {
            path: '',
            line: 1,
            column: 1,
        };
    }
    const sourcePath = location.file
        ? path.relative(workspacePath, path.resolve(workspacePath, location.file))
        : '';
    return {
        path: sourcePath.split(path.sep).join('/'),
        line: location.line || 1,
        // esbuild columns are zero-based; editor/LSP diagnostics are one-based.
        column: (location.column ?? 0) + 1,
        length: location.length || 0,
        lineText: location.lineText || '',
        suggestion: location.suggestion || '',
    };
}

function normalizeDiagnostic(message, severity, workspacePath) {
    return {
        severity,
        message: message.text || String(message),
        ...diagnosticLocation(message.location, workspacePath),
        code: message.id || 'esbuild',
    };
}

async function smokeLoad(javascript) {
    const smokeDirectory = await mkdtemp(
        path.join(tmpdir(), 'itlingo-services-smoke-'),
    );
    const consoleMethods = ['debug', 'error', 'info', 'log', 'warn'];
    const originalConsole = new Map(
        consoleMethods.map((method) => [method, console[method]]),
    );
    try {
        // Author logging must not corrupt the compiler's JSON stdout protocol.
        for (const method of consoleMethods) {
            console[method] = () => {};
        }
        const modulePath = path.join(smokeDirectory, 'services.mjs');
        await writeFile(modulePath, javascript, 'utf8');
        // The artifact keeps Langium external. Resolve it from this compiler's
        // pinned node_modules so the smoke test uses the production version.
        await symlink(
            path.join(COMPILER_DIRECTORY, 'node_modules'),
            path.join(smokeDirectory, 'node_modules'),
            'dir',
        );
        const imported = await import(pathToFileURL(modulePath).href);
        const module = typeof imported.default === 'function'
            ? imported.default()
            : imported.default;
        if (
            typeof module !== 'object'
            || module === null
            || Array.isArray(module)
            || typeof module.then === 'function'
        ) {
            throw new TypeError(
                'The default export must be a synchronous Langium module object or factory',
            );
        }
    } finally {
        for (const [method, implementation] of originalConsole) {
            console[method] = implementation;
        }
        await rm(smokeDirectory, {recursive: true, force: true});
    }
}

async function main() {
    const workspacePath = process.argv[2];
    const entryRelativePath = process.argv[3];
    if (!workspacePath || !entryRelativePath) {
        output({
            ok: false,
            js: '',
            diagnostics: [{
                severity: 'error',
                message: 'Usage: node compile.mjs <workspacePath> <entryRelativePath>',
                path: '',
                line: 1,
                column: 1,
                code: 'usage',
            }],
            compilerVersion: COMPILER_VERSION,
        });
        process.exitCode = 2;
        return;
    }

    const absoluteWorkspace = path.resolve(workspacePath);
    const entryPath = path.resolve(absoluteWorkspace, entryRelativePath);
    const relativeEntry = path.relative(absoluteWorkspace, entryPath);
    if (relativeEntry.startsWith('..') || path.isAbsolute(relativeEntry)) {
        output({
            ok: false,
            js: '',
            diagnostics: [{
                severity: 'error',
                message: 'The services entry must be inside the workspace.',
                path: entryRelativePath,
                line: 1,
                column: 1,
                code: 'invalid-entry',
            }],
            compilerVersion: COMPILER_VERSION,
        });
        process.exitCode = 2;
        return;
    }

    try {
        const result = await build({
            absWorkingDir: absoluteWorkspace,
            entryPoints: [entryPath],
            bundle: true,
            platform: 'node',
            format: 'esm',
            target: 'node22',
            external: ['langium', 'vscode-languageserver-types'],
            write: false,
            logLevel: 'silent',
            charset: 'utf8',
            legalComments: 'none',
        });
        const javascript = result.outputFiles.find(
            (file) => file.path === '<stdout>' || file.path.endsWith('.js'),
        );
        const diagnostics = result.warnings.map(
            (warning) => normalizeDiagnostic(warning, 'warning', absoluteWorkspace),
        );
        const artifact = javascript?.text || '';
        try {
            await smokeLoad(artifact);
        } catch (error) {
            diagnostics.push({
                severity: 'error',
                message: `Compiled services module failed its load check: ${
                    error?.message || String(error)
                }`,
                path: entryRelativePath.split(path.sep).join('/'),
                line: 1,
                column: 1,
                code: 'services-smoke-load',
            });
            output({
                ok: false,
                js: '',
                diagnostics,
                compilerVersion: COMPILER_VERSION,
            });
            process.exitCode = 1;
            return;
        }
        output({
            ok: true,
            js: artifact,
            diagnostics,
            compilerVersion: COMPILER_VERSION,
        });
    } catch (error) {
        const errors = Array.isArray(error?.errors) ? error.errors : [];
        const warnings = Array.isArray(error?.warnings) ? error.warnings : [];
        const diagnostics = [
            ...errors.map(
                (item) => normalizeDiagnostic(item, 'error', absoluteWorkspace),
            ),
            ...warnings.map(
                (item) => normalizeDiagnostic(item, 'warning', absoluteWorkspace),
            ),
        ];
        if (!diagnostics.length) {
            diagnostics.push({
                severity: 'error',
                message: error?.message || String(error),
                path: entryRelativePath,
                line: 1,
                column: 1,
                code: 'esbuild',
            });
        }
        output({
            ok: false,
            js: '',
            diagnostics,
            compilerVersion: COMPILER_VERSION,
        });
        process.exitCode = 1;
    }
}

main().catch((error) => {
    output({
        ok: false,
        js: '',
        diagnostics: [{
            severity: 'error',
            message: error?.message || String(error),
            path: '',
            line: 1,
            column: 1,
            code: 'services-compiler',
        }],
        compilerVersion: COMPILER_VERSION,
    });
    process.exitCode = 1;
});
