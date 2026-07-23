import assert from 'node:assert/strict';
import {execFileSync, spawnSync} from 'node:child_process';
import {mkdtempSync, mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import test from 'node:test';

const compilerPath = path.resolve('dist/compile.mjs');

function workspace(files) {
    const root = mkdtempSync(path.join(tmpdir(), 'itlingo-compiler-test-'));
    for (const [relativePath, content] of Object.entries(files)) {
        const destination = path.join(root, relativePath);
        mkdirSync(path.dirname(destination), {recursive: true});
        writeFileSync(destination, content, 'utf8');
    }
    return root;
}

test('bundles local TypeScript files and keeps runtime packages external', () => {
    const root = workspace({
        'services.ts': [
            "import {DefaultScopeProvider} from 'langium';",
            "import {value} from './lib/value.js';",
            'export default () => ({value, DefaultScopeProvider});',
        ].join('\n'),
        'lib/value.ts': 'export const value: number = 42;\n',
    });
    try {
        const stdout = execFileSync(
            process.execPath, [compilerPath, root, 'services.ts'], {encoding: 'utf8'},
        );
        const result = JSON.parse(stdout);
        assert.equal(result.ok, true);
        assert.match(result.js, /from "langium"/);
        assert.match(result.js, /value = 42/);
        assert.doesNotMatch(result.js, /\.\/lib\/value/);
        assert.deepEqual(result.diagnostics, []);
        assert.match(result.compilerVersion, /langium 4\.3\.1/);
    } finally {
        rmSync(root, {recursive: true, force: true});
    }
});

test('returns source-positioned diagnostics for invalid TypeScript', () => {
    const root = workspace({
        'services.ts': 'export default function broken( {\n',
    });
    try {
        const proc = spawnSync(
            process.execPath, [compilerPath, root, 'services.ts'], {encoding: 'utf8'},
        );
        const result = JSON.parse(proc.stdout);
        assert.equal(result.ok, false);
        assert.equal(result.js, '');
        assert.equal(result.diagnostics[0].severity, 'error');
        assert.equal(result.diagnostics[0].path, 'services.ts');
        assert.ok(result.diagnostics[0].line >= 1);
        assert.ok(result.diagnostics[0].column >= 1);
    } finally {
        rmSync(root, {recursive: true, force: true});
    }
});

test('author console output does not corrupt the compiler protocol', () => {
    const root = workspace({
        'services.ts': [
            "console.log('author module loaded');",
            "export default () => { console.warn('factory called'); return {}; };",
        ].join('\n'),
    });
    try {
        const stdout = execFileSync(
            process.execPath, [compilerPath, root, 'services.ts'], {encoding: 'utf8'},
        );
        const result = JSON.parse(stdout);
        assert.equal(result.ok, true);
        assert.deepEqual(result.diagnostics, []);
    } finally {
        rmSync(root, {recursive: true, force: true});
    }
});

for (const [name, source, message] of [
    [
        'top-level evaluation failure',
        "throw new Error('top-level boom'); export default () => ({});\n",
        /top-level boom/,
    ],
    [
        'factory evaluation failure',
        "export default () => { throw new Error('factory boom'); };\n",
        /factory boom/,
    ],
    [
        'invalid default export',
        "export default 'not a module';\n",
        /synchronous Langium module object or factory/,
    ],
]) {
    test(`rejects ${name} during the smoke-load step`, () => {
        const root = workspace({'services.ts': source});
        try {
            const proc = spawnSync(
                process.execPath, [compilerPath, root, 'services.ts'], {encoding: 'utf8'},
            );
            const result = JSON.parse(proc.stdout);
            assert.equal(result.ok, false);
            assert.equal(result.js, '');
            assert.equal(result.diagnostics.at(-1).severity, 'error');
            assert.equal(result.diagnostics.at(-1).code, 'services-smoke-load');
            assert.equal(result.diagnostics.at(-1).path, 'services.ts');
            assert.match(result.diagnostics.at(-1).message, message);
        } finally {
            rmSync(root, {recursive: true, force: true});
        }
    });
}
