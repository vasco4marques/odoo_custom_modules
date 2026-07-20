type GrammarEditorModule = typeof import('./main.js');

const root = document.querySelector<HTMLElement>('#itlingo-grammar-editor');
let editorModule: GrammarEditorModule | undefined;

export let grammarEditorApp: GrammarEditorModule['grammarEditorApp'];

function errorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    if (typeof error === 'object' && error && 'message' in error) {
        return String(error.message || fallback);
    }
    return fallback;
}

function showEditorError(error: unknown, fallback: string, kind = 'bootstrap'): void {
    if (!root) {
        return;
    }
    const alert = root.querySelector<HTMLElement>('[data-grammar-error]');
    if (alert) {
        alert.textContent = errorMessage(error, fallback);
        alert.classList.remove('d-none');
    }
    root.dataset.grammarErrorKind = kind;
    console.error('[ITLingo Grammar Editor]', error);
}

function eventError(event: ErrorEvent | PromiseRejectionEvent): unknown {
    return event instanceof PromiseRejectionEvent
        ? event.reason
        : event.error || event.message;
}

function containGlobalEditorError(event: ErrorEvent | PromiseRejectionEvent): void {
    if (!root) {
        return;
    }
    showEditorError(
        eventError(event),
        'The Grammar Editor stopped unexpectedly. Reload the page to try again.',
        'uncaught',
    );
    event.preventDefault();
    event.stopImmediatePropagation();
}

function canUseModuleWorkers(): boolean {
    if (!('Worker' in window)) {
        return false;
    }
    let optionRead = false;
    const source = URL.createObjectURL(new Blob(['export {};'], {type: 'text/javascript'}));
    try {
        const options = {
            get type(): WorkerType {
                optionRead = true;
                return 'module';
            },
        };
        const worker = new Worker(source, options);
        worker.terminate();
    } catch {
        return false;
    } finally {
        URL.revokeObjectURL(source);
    }
    return optionRead;
}

if (root) {
    window.addEventListener('error', containGlobalEditorError, {capture: true});
    window.addEventListener('unhandledrejection', containGlobalEditorError, {capture: true});

    if (!canUseModuleWorkers()) {
        showEditorError(
            new Error(
                'This browser cannot run module workers. '
                + 'Please use a current version of Firefox, Chrome, Edge, or Safari.',
            ),
            'This browser is not supported by the Grammar Editor.',
            'unsupported-browser',
        );
    } else {
        void import('./main.js')
            .then((loaded) => {
                editorModule = loaded;
                grammarEditorApp = loaded.mountGrammarEditor(root);
                return grammarEditorApp?.start();
            })
            .catch((error: unknown) => {
                showEditorError(error, 'Could not start the Grammar Editor.');
            });
    }
}

// Keep the module reference alive for debuggers without adding it to the public API.
void editorModule;
