import {describe, expect, it} from 'vitest';

import {
    buildFileUri,
    validateGrammarPath,
    WorkspaceFileRegistry,
} from './workspace-files.js';

class ModelStub {
    constructor(private version = 1) {}

    getAlternativeVersionId(): number {
        return this.version;
    }

    edit(): void {
        this.version += 1;
    }
}

describe('buildFileUri', () => {
    it('encodes path segments without encoding directory separators', () => {
        expect(buildFileUri(42, 'shared types/Terminals #1.langium')).toBe(
            'file:///itlingo-dsl/42/shared%20types/Terminals%20%231.langium',
        );
    });

    it('keeps nested paths distinct', () => {
        expect(buildFileUri(7, 'a/b.langium')).not.toBe(
            buildFileUri(7, 'a%2Fb.langium'),
        );
    });
});

describe('validateGrammarPath', () => {
    it('accepts nested relative Langium paths', () => {
        expect(validateGrammarPath(' shared/Terminals.langium ')).toBe(
            'shared/Terminals.langium',
        );
    });

    it.each([
        '../Escape.langium',
        'nested/../Escape.langium',
        '/absolute.langium',
        'nested\\Escape.langium',
        'not-a-grammar.txt',
    ])('rejects unsafe or invalid path %s', (path) => {
        expect(() => validateGrammarPath(path)).toThrow();
    });
});

describe('WorkspaceFileRegistry', () => {
    it('tracks per-file and aggregate dirty state', () => {
        const registry = new WorkspaceFileRegistry<ModelStub>();
        const first = new ModelStub();
        const second = new ModelStub();
        registry.add({
            id: 1, path: 'Main.langium', isEntry: true, model: first,
            savedVersionId: 1, dirty: false,
        });
        registry.add({
            id: 2, path: 'lib/Types.langium', isEntry: false, model: second,
            savedVersionId: 1, dirty: false,
        });

        second.edit();
        expect(registry.refreshDirty('lib/Types.langium')).toBe(true);
        expect(registry.hasDirty()).toBe(true);
        registry.markSaved('lib/Types.langium');
        expect(registry.hasDirty()).toBe(false);
    });

    it('renames a file while preserving its identity and dirty state', () => {
        const registry = new WorkspaceFileRegistry<ModelStub>();
        const oldModel = new ModelStub();
        oldModel.edit();
        registry.add({
            id: 9, path: 'Old.langium', isEntry: true, model: oldModel,
            savedVersionId: 1, dirty: true,
        });
        const newModel = new ModelStub();

        const renamed = registry.rename('Old.langium', 'nested/New.langium', newModel);

        expect(registry.get('Old.langium')).toBeUndefined();
        expect(registry.get('nested/New.langium')).toBe(renamed);
        expect(renamed.id).toBe(9);
        expect(renamed.isEntry).toBe(true);
        expect(renamed.dirty).toBe(true);
        expect(registry.sorted().map((file) => file.path)).toEqual([
            'nested/New.langium',
        ]);
    });
});
