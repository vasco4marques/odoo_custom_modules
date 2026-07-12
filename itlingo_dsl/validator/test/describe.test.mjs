import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const validatorDir = resolve(testDir, '..');
const cli = resolve(validatorDir, 'dist/describe.mjs');
const fixtures = resolve(testDir, 'fixtures');

function run(grammarPath) {
    return JSON.parse(execFileSync(process.execPath, [cli, grammarPath], { encoding: 'utf-8' }));
}

const inventory = run(resolve(fixtures, 'inventory.langium'));
assert.equal(inventory.success, true);
assert.equal(inventory.schema_version, '1.1');
assert.equal(inventory.entry_type, 'Model');
assert.match(inventory.describer_version, /^langium 4\.3\.1 \/ describer 1\.1\.0$/);

const byName = Object.fromEntries(inventory.types.map((type) => [type.name, type]));
assert.equal(byName.Requirement.indexed, true, 'inherited string name makes a type indexed');
assert.deepEqual(byName.Requirement.super_types, ['Named']);

const requirementFields = Object.fromEntries(
    byName.Requirement.properties.map((property) => [property.name, property]),
);
assert.deepEqual(requirementFields.name, {
    name: 'name', kind: 'primitive', type: 'string', list: false, optional: false,
});
assert.deepEqual(requirementFields.priority, {
    name: 'priority', kind: 'primitive', type: 'string', list: false, optional: true,
    values: ['High', 'Low', 'Medium'],
});
assert.deepEqual(requirementFields.actors, {
    name: 'actors', kind: 'reference', target: 'Actor', list: true, optional: true,
});
assert.deepEqual(requirementFields.attributes, {
    name: 'attributes', kind: 'containment', target: 'Attribute', list: true, optional: true,
});
assert.deepEqual(inventory.unions.find((union) => union.name === 'Element'), {
    name: 'Element', alternatives: ['Actor', 'Requirement'],
});

const actorFields = Object.fromEntries(byName.Actor.properties.map((property) => [property.name, property]));
assert.equal(actorFields.active.type, 'boolean');
assert.equal(actorFields.active.optional, true);

const attributeFields = Object.fromEntries(
    byName.Attribute.properties.map((property) => [property.name, property]),
);
assert.equal(attributeFields.value.kind, 'primitive');
assert.equal(attributeFields.value.type, 'string | number', 'datatype rule alternatives are preserved');

// These production grammars are the import-inlining acceptance test. ASL
// imports Terminals.langium; RSL is intentionally also checked for regressions.
const parserDir = resolve(validatorDir, '../../itlingo_templating/parser');
for (const fileName of ['rsl.langium', 'asl.langium']) {
    const result = run(resolve(parserDir, fileName));
    assert.equal(result.success, true, `${fileName} should describe successfully`);
    assert.equal(result.entry_type, 'Model');
    assert.ok(result.types.length > 0);
}

const broken = spawnSync(process.execPath, [cli, resolve(fixtures, 'broken.langium')], {
    encoding: 'utf-8',
});
assert.notEqual(broken.status, 0);
const brokenPayload = JSON.parse(broken.stdout);
assert.equal(brokenPayload.success, false);
assert.match(brokenPayload.message, /Invalid grammar/);

const missing = spawnSync(process.execPath, [cli, resolve(fixtures, 'missing.langium')], {
    encoding: 'utf-8',
});
assert.notEqual(missing.status, 0);
const missingPayload = JSON.parse(missing.stdout);
assert.equal(missingPayload.success, false);
assert.match(missingPayload.message, /ENOENT/);

console.log('Grammar describer tests passed.');
