export type LanguageServiceState = 'starting' | 'ready' | 'failed' | 'stopped';

export interface LanguageServiceSession {
    start(): Promise<void>;
    dispose(): Promise<void>;
}

export interface LanguageServiceStateChange {
    state: LanguageServiceState;
    generation: number;
    error?: unknown;
}

type SessionFactory = () => LanguageServiceSession;
type StateListener = (change: LanguageServiceStateChange) => void;

/**
 * Serializes language-service startup, restart, and disposal so a late worker
 * cannot become active after a newer generation has started.
 */
export class LanguageServiceLifecycle {
    private session?: LanguageServiceSession;
    private operation: Promise<void> = Promise.resolve();
    private generation = 0;
    private permanentlyDisposed = false;

    constructor(
        private readonly createSession: SessionFactory,
        private readonly onStateChange: StateListener,
    ) {}

    start(): Promise<void> {
        return this.enqueue(async () => {
            if (this.permanentlyDisposed) {
                return;
            }
            await this.startGeneration();
        });
    }

    restart(): Promise<void> {
        return this.enqueue(async () => {
            if (this.permanentlyDisposed) {
                return;
            }
            await this.disposeSession();
            await this.startGeneration();
        });
    }

    dispose(): Promise<void> {
        this.permanentlyDisposed = true;
        return this.enqueue(async () => {
            await this.disposeSession();
            this.emit('stopped');
        });
    }

    private async startGeneration(): Promise<void> {
        this.generation += 1;
        const generation = this.generation;
        this.emit('starting');
        let session: LanguageServiceSession | undefined;
        try {
            session = this.createSession();
            this.session = session;
            await session.start();
            if (this.session === session) {
                this.emit('ready');
            }
        } catch (error) {
            if (this.session === session) {
                this.session = undefined;
            }
            await session?.dispose().catch(() => undefined);
            this.onStateChange({state: 'failed', generation, error});
            throw error;
        }
    }

    private async disposeSession(): Promise<void> {
        const session = this.session;
        this.session = undefined;
        if (session) {
            await session.dispose();
        }
    }

    private emit(state: LanguageServiceState): void {
        this.onStateChange({state, generation: this.generation});
    }

    private enqueue(operation: () => Promise<void>): Promise<void> {
        const result = this.operation.then(operation, operation);
        this.operation = result.catch(() => undefined);
        return result;
    }
}
