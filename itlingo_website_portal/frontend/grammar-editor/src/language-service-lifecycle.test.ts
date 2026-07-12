import {describe, expect, it, vi} from 'vitest';

import {
    LanguageServiceLifecycle,
    type LanguageServiceSession,
    type LanguageServiceStateChange,
} from './language-service-lifecycle.js';

function createHarness(failGeneration = 0) {
    const sessions: Array<LanguageServiceSession & {
        start: ReturnType<typeof vi.fn>;
        dispose: ReturnType<typeof vi.fn>;
    }> = [];
    const states: LanguageServiceStateChange[] = [];
    const lifecycle = new LanguageServiceLifecycle(() => {
        const generation = sessions.length + 1;
        const session = {
            start: vi.fn(async () => {
                if (generation === failGeneration) {
                    throw new Error('worker startup failed');
                }
            }),
            dispose: vi.fn(async () => undefined),
        };
        sessions.push(session);
        return session;
    }, (change) => states.push(change));
    return {lifecycle, sessions, states};
}

describe('LanguageServiceLifecycle', () => {
    it('starts and restarts with a clean worker generation', async () => {
        const {lifecycle, sessions, states} = createHarness();

        await lifecycle.start();
        await lifecycle.restart();

        expect(sessions).toHaveLength(2);
        expect(sessions[0].dispose).toHaveBeenCalledOnce();
        expect(sessions[1].start).toHaveBeenCalledOnce();
        expect(states.map(({state, generation}) => [state, generation])).toEqual([
            ['starting', 1],
            ['ready', 1],
            ['starting', 2],
            ['ready', 2],
        ]);
    });

    it('reports a startup failure and disposes the failed worker', async () => {
        const {lifecycle, sessions, states} = createHarness(1);

        await expect(lifecycle.start()).rejects.toThrow('worker startup failed');

        expect(sessions[0].dispose).toHaveBeenCalledOnce();
        expect(states.at(-1)).toMatchObject({state: 'failed', generation: 1});
    });

    it('reports a worker construction failure', async () => {
        const states: LanguageServiceStateChange[] = [];
        const lifecycle = new LanguageServiceLifecycle(() => {
            throw new Error('worker could not be constructed');
        }, (change) => states.push(change));

        await expect(lifecycle.start()).rejects.toThrow(
            'worker could not be constructed',
        );

        expect(states.map(({state}) => state)).toEqual(['starting', 'failed']);
    });

    it('disposes once and never starts another worker after teardown', async () => {
        const {lifecycle, sessions, states} = createHarness();

        await lifecycle.start();
        await lifecycle.dispose();
        await lifecycle.restart();

        expect(sessions).toHaveLength(1);
        expect(sessions[0].dispose).toHaveBeenCalledOnce();
        expect(states.at(-1)).toMatchObject({state: 'stopped'});
    });
});
