import {describe, expect, it} from 'vitest';

import {
    compilerDiagnosticsToProblemItems,
    countProblems,
    groupProblemsByPath,
    summarizeProblems,
    toProblemItems,
    waitForDiagnosticsQuiet,
} from './problems.js';

const marker = (overrides: Record<string, unknown> = {}) => ({
    severity: 8,
    message: 'Something is wrong',
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: 1,
    endColumn: 5,
    ...overrides,
});

describe('toProblemItems', () => {
    it('maps Monaco marker severities, source, and code', () => {
        const items = toProblemItems([
            marker({severity: 4, source: 'langium', code: 'linking-error'}),
            marker({severity: 8, code: {value: 'lexing-error'}}),
            marker({severity: 2}),
            marker({severity: 1}),
        ]);
        expect(items.map((item) => item.severity)).toEqual([
            'error', 'warning', 'info', 'hint',
        ]);
        expect(items[0].code).toBe('lexing-error');
        expect(items[1].source).toBe('langium');
        expect(items[1].code).toBe('linking-error');
        expect(items[2].code).toBe('');
    });

    it('sorts errors before warnings and by position within a severity', () => {
        const items = toProblemItems([
            marker({severity: 4, startLineNumber: 1}),
            marker({severity: 8, startLineNumber: 9, startColumn: 7}),
            marker({severity: 8, startLineNumber: 9, startColumn: 2}),
            marker({severity: 8, startLineNumber: 3}),
        ]);
        expect(items.map((item) => [
            item.severity, item.startLineNumber, item.startColumn,
        ])).toEqual([
            ['error', 3, 1],
            ['error', 9, 2],
            ['error', 9, 7],
            ['warning', 1, 1],
        ]);
    });

    it('carries resource and path metadata and groups problems by file', () => {
        const main = toProblemItems([marker()], {
            resource: 'file:///workspace/Main.langium',
            path: 'Main.langium',
        });
        const terminals = toProblemItems([marker({severity: 4})], {
            resource: 'file:///workspace/shared/Terminals.langium',
            path: 'shared/Terminals.langium',
        });
        const groups = groupProblemsByPath([...main, ...terminals]);

        expect([...groups.keys()]).toEqual([
            'Main.langium', 'shared/Terminals.langium',
        ]);
        expect(groups.get('Main.langium')?.[0].resource).toBe(
            'file:///workspace/Main.langium',
        );
    });
});

describe('countProblems and summarizeProblems', () => {
    it('reports zero problems', () => {
        const counts = countProblems([]);
        expect(counts).toEqual({errors: 0, warnings: 0, others: 0, total: 0});
        expect(summarizeProblems(counts)).toBe('No problems');
    });

    it('pluralizes error, warning, and hint counts', () => {
        const counts = countProblems(toProblemItems([
            marker({severity: 8}),
            marker({severity: 8}),
            marker({severity: 4}),
            marker({severity: 1}),
        ]));
        expect(counts).toEqual({errors: 2, warnings: 1, others: 1, total: 4});
        expect(summarizeProblems(counts)).toBe('2 errors, 1 warning, 1 hint');
    });
});

describe('compilerDiagnosticsToProblemItems', () => {
    it('maps esbuild locations into clickable services problems', () => {
        const items = compilerDiagnosticsToProblemItems([{
            severity: 'error',
            message: 'Expected identifier',
            path: 'runtime/services.ts',
            line: 7,
            column: 12,
            length: 3,
            code: 'expected-identifier',
        }], (path) => `file:///workspace/${path}`);

        expect(items[0]).toMatchObject({
            severity: 'error',
            path: 'runtime/services.ts',
            resource: 'file:///workspace/runtime/services.ts',
            startLineNumber: 7,
            startColumn: 12,
            endColumn: 15,
            source: 'services compiler',
            code: 'expected-identifier',
        });
    });
});

describe('waitForDiagnosticsQuiet', () => {
    const makeClock = () => {
        let current = 0;
        return {
            now: () => current,
            sleep: (ms: number) => {
                current += ms;
                return Promise.resolve();
            },
            advanceTo: (value: number) => {
                current = value;
            },
        };
    };

    it('resolves true once activity has been quiet long enough', async () => {
        const clock = makeClock();
        let lastActivity = 0;
        const settled = waitForDiagnosticsQuiet(
            () => lastActivity,
            {quietMs: 400, timeoutMs: 10000},
            clock.now,
            (ms) => {
                lastActivity = Math.min(lastActivity + 100, 300);
                return clock.sleep(ms);
            },
        );
        await expect(settled).resolves.toBe(true);
    });

    it('resolves false when activity never becomes quiet before the timeout', async () => {
        const clock = makeClock();
        const settled = waitForDiagnosticsQuiet(
            () => clock.now(),
            {quietMs: 400, timeoutMs: 2000},
            clock.now,
            clock.sleep,
        );
        await expect(settled).resolves.toBe(false);
    });
});
