import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

const parserPath = path.resolve('dist/parser.mjs');
const grammarPath = path.resolve('test/qualified.langium');
const servicesPath = path.resolve('test/qualified-services.mjs');

function parse(source) {
    const workspace = mkdtempSync(path.join(tmpdir(), 'itlingo-parser-test-'));
    const sourcePath = path.join(workspace, 'source.qref');
    writeFileSync(sourcePath, source, 'utf8');
    try {
        const proc = spawnSync(process.execPath, [
            parserPath,
            grammarPath,
            sourcePath,
            'Qualified reference specification',
            'all',
            servicesPath,
        ], { encoding: 'utf8' });
        return {
            status: proc.status,
            result: JSON.parse(proc.stdout),
            stderr: proc.stderr,
        };
    } finally {
        rmSync(workspace, { recursive: true, force: true });
    }
}

test('injected ScopeProvider resolves containment-qualified references', () => {
    const { status, result, stderr } = parse(
        'entity e_VAT { attribute VATValue } derived e_VAT.VATValue',
    );

    assert.equal(status, 0, stderr || result.error);
    assert.equal(result.success, true);
    assert.deepEqual(result.ast.uses[0].from, { $ref: 'e_VAT.VATValue' });
    assert.deepEqual(result.diagnostics, []);
});

test('injected ScopeProvider retains unresolved-reference diagnostics for typos', () => {
    const { status, result } = parse(
        'entity e_VAT { attribute VATValue } derived e_VAT.Nope',
    );

    assert.equal(status, 1);
    assert.equal(result.success, false);
    assert.ok(result.diagnostics.some(diagnostic =>
        diagnostic.message.includes(
            "Could not resolve reference to Attribute named 'e_VAT.Nope'",
        ),
    ));
});
