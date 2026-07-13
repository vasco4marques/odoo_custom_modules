// Langium grammar validator CLI.
//
// Usage: node validate.mjs <grammarPath>
// Validates the .langium file with the Langium Grammar DSL services and
// prints {success, valid, diagnostics, validatorVersion} as JSON on stdout.
//
// This is the server-side authority used by DSL publication. It never trusts
// or receives browser-computed validity; it validates the stored source.
// Self-contained: no network, no user-provided code execution.

import {readFileSync} from 'node:fs';
import {EmptyFileSystem, URI} from 'langium';
import {createLangiumGrammarServices} from 'langium/grammar';

// Keep in sync with the pinned "langium" version in package.json.
const LANGIUM_VERSION = '4.3.1';
const BUNDLE_VERSION = '1.0.1';
const VALIDATOR_VERSION = `langium ${LANGIUM_VERSION} / validator ${BUNDLE_VERSION}`;

const SEVERITIES = {1: 'error', 2: 'warning', 3: 'info', 4: 'hint'};

function output(payload) {
    process.stdout.write(JSON.stringify(payload));
}

async function main() {
    const grammarPath = process.argv[2];
    if (!grammarPath) {
        output({
            success: false,
            error: 'Usage: node validate.mjs <grammarPath>',
            validatorVersion: VALIDATOR_VERSION,
        });
        process.exitCode = 2;
        return;
    }

    const text = readFileSync(grammarPath, 'utf-8');
    const {shared} = createLangiumGrammarServices(EmptyFileSystem);
    const document = shared.workspace.LangiumDocumentFactory.fromString(
        text, URI.parse('file:///grammar.langium'),
    );
    shared.workspace.LangiumDocuments.addDocument(document);
    await shared.workspace.DocumentBuilder.build([document], {validation: true});

    const diagnostics = (document.diagnostics ?? []).map((diagnostic) => {
        let severity = SEVERITIES[diagnostic.severity] ?? 'error';
        // Langium 4.3.1 reports guarded assignments as unsupported while its
        // runtime grammar loader still consumes them successfully. ASL uses
        // this syntax for an optional `else`, so keep the diagnostic visible
        // but non-fatal. The describer applies the same compatibility rule.
        if (diagnostic.message === 'Predicates are currently not supported.') {
            severity = 'warning';
        }
        return {
            severity,
            message: diagnostic.message,
            line: diagnostic.range.start.line + 1,
            column: diagnostic.range.start.character + 1,
            code: typeof diagnostic.code === 'object'
                ? String(diagnostic.code?.value ?? '')
                : String(diagnostic.code ?? ''),
        };
    });

    output({
        success: true,
        valid: !diagnostics.some((diagnostic) => diagnostic.severity === 'error'),
        diagnostics,
        validatorVersion: VALIDATOR_VERSION,
    });
}

main().catch((error) => {
    output({
        success: false,
        error: error && error.message ? error.message : String(error),
        validatorVersion: VALIDATOR_VERSION,
    });
    process.exitCode = 1;
});
