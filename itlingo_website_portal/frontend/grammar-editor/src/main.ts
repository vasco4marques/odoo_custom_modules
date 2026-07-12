import * as monaco from '@codingame/monaco-vscode-editor-api';
import {initFile} from '@codingame/monaco-vscode-files-service-override';

import {createGrammarLanguageService} from './grammar-language-service.js';
import type {
    LanguageServiceLifecycle,
    LanguageServiceStateChange,
} from './language-service-lifecycle.js';
import {initializeMonacoServices} from './monaco-services.js';
import {
    countProblems,
    type ProblemItem,
    summarizeProblems,
    toProblemItems,
    waitForDiagnosticsQuiet,
} from './problems.js';
import './style.css';

type DslStatus = 'draft' | 'active' | 'deprecated' | 'archived';

interface GrammarFile {
    id: number;
    path: string;
    content: string;
    isEntry: boolean;
}

interface GrammarWorkspace {
    dsl: {
        id: number;
        acronym: string;
        version: string;
        status: DslStatus;
    };
    permissions: {
        canRead: boolean;
        canEdit: boolean;
    };
    files: GrammarFile[];
    suggestedPath: string;
    suggestedContent: string;
}

interface JsonRpcError {
    message?: string;
    data?: {
        message?: string;
    };
}

interface JsonRpcResponse<T> {
    result?: T;
    error?: JsonRpcError;
}

async function rpc<T>(url: string, params: Record<string, unknown> = {}): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            id: Date.now(),
            params,
        }),
    });
    if (!response.ok) {
        throw new Error(`The server returned HTTP ${response.status}.`);
    }
    const payload = await response.json() as JsonRpcResponse<T>;
    if (payload.error) {
        throw new Error(
            payload.error.data?.message
            || payload.error.message
            || 'The grammar request failed.',
        );
    }
    if (payload.result === undefined) {
        throw new Error('The grammar server returned an empty response.');
    }
    return payload.result;
}

function requiredElement<T extends Element>(root: ParentNode, selector: string): T {
    const element = root.querySelector<T>(selector);
    if (!element) {
        throw new Error(`Grammar Editor element is missing: ${selector}`);
    }
    return element;
}

function registerLangiumLanguage(): void {
    if (!monaco.languages.getLanguages().some((language) => language.id === 'langium')) {
        monaco.languages.register({
            id: 'langium',
            extensions: ['.langium'],
            aliases: ['Langium Grammar', 'langium'],
        });
        monaco.languages.setMonarchTokensProvider('langium', {
            keywords: [
                'grammar', 'entry', 'returns', 'infer', 'infers', 'terminal',
                'hidden', 'fragment', 'interface', 'type', 'extends', 'import',
                'with', 'current', 'true', 'false',
            ],
            tokenizer: {
                root: [
                    [/\/\*/, 'comment', '@comment'],
                    [/\/\/.*$/, 'comment'],
                    [/'([^'\\]|\\.)*'/, 'string'],
                    [/"([^"\\]|\\.)*"/, 'string'],
                    [/[A-Za-z_$][\w$]*/, {
                        cases: {'@keywords': 'keyword', '@default': 'identifier'},
                    }],
                    [/[{}()[\]:;,.?*+|=&!<>@]/, 'delimiter'],
                    [/\d+(?:\.\d+)?/, 'number'],
                ],
                comment: [
                    [/[^/*]+/, 'comment'],
                    [/\*\//, 'comment', '@pop'],
                    [/[/*]/, 'comment'],
                ],
            },
        });
    }
}

type ValidityState = 'not-validated' | 'validating' | 'valid' | 'invalid';

class GrammarEditorApp {
    private readonly dslId: number;
    private readonly editorHost: HTMLElement;
    private readonly saveButton: HTMLButtonElement | null;
    private readonly validateButton: HTMLButtonElement;
    private readonly restartButton: HTMLButtonElement;
    private readonly status: HTMLElement;
    private readonly validity: HTMLElement;
    private readonly serverStatus: HTMLElement;
    private readonly error: HTMLElement;
    private readonly filename: HTMLElement;
    private readonly problemsSummary: HTMLElement;
    private readonly problemsList: HTMLElement;
    private editor?: monaco.editor.IStandaloneCodeEditor;
    private model?: monaco.editor.ITextModel;
    private languageService?: LanguageServiceLifecycle;
    private fileId?: number;
    private path = '';
    private canEdit = false;
    private dirty = false;
    private saving = false;
    private validating = false;
    private validatedClean = false;
    private serverReady = false;
    private disposed = false;
    private problems: ProblemItem[] = [];
    private lastActivityAt = Date.now();
    private changeListener?: monaco.IDisposable;
    private markerListener?: monaco.IDisposable;

    constructor(private readonly root: HTMLElement) {
        this.dslId = Number(root.dataset.dslId);
        if (!Number.isInteger(this.dslId) || this.dslId <= 0) {
            throw new Error('The Grammar Editor has an invalid DSL identifier.');
        }
        this.editorHost = requiredElement(root, '[data-grammar-editor]');
        // The Save button is intentionally absent in read-only presentation.
        this.saveButton = root.querySelector<HTMLButtonElement>('[data-grammar-save]');
        this.validateButton = requiredElement(root, '[data-grammar-validate]');
        this.restartButton = requiredElement(root, '[data-grammar-server-restart]');
        this.status = requiredElement(root, '[data-grammar-status]');
        this.validity = requiredElement(root, '[data-grammar-validity]');
        this.serverStatus = requiredElement(root, '[data-grammar-server-status]');
        this.error = requiredElement(root, '[data-grammar-error]');
        this.filename = requiredElement(root, '[data-grammar-filename]');
        this.problemsSummary = requiredElement(root, '[data-grammar-problems-summary]');
        this.problemsList = requiredElement(root, '[data-grammar-problems]');
    }

    async start(): Promise<void> {
        this.setState('Loading…');
        this.setValidity('not-validated', 'Not validated');
        this.saveButton?.addEventListener('click', this.onSaveClick);
        this.validateButton.addEventListener('click', this.onValidateClick);
        this.restartButton.addEventListener('click', this.onRestartClick);
        this.problemsList.addEventListener('click', this.onProblemsClick);
        this.problemsList.addEventListener('keydown', this.onProblemsKeydown);
        window.addEventListener('beforeunload', this.onBeforeUnload);
        window.addEventListener('pagehide', this.onPageHide);

        try {
            const workspace = await rpc<GrammarWorkspace>(
                `/dsl/${this.dslId}/grammar/load`,
            );
            const file = workspace.files[0];
            const path = file?.path || workspace.suggestedPath;
            const uri = monaco.Uri.parse(
                `file:///itlingo-dsl/${this.dslId}/${encodeURIComponent(path)}`,
            );
            // Files must be seeded before the VS Code services initialize.
            // After initialization, the file service becomes immutable.
            await initFile(uri, this.initialContent(workspace));
            await initializeMonacoServices();
            this.mount(workspace, uri);
        } catch (error) {
            this.fail(error, 'Could not load the grammar editor.');
        }
    }

    private initialContent(workspace: GrammarWorkspace): string {
        const file = workspace.files[0];
        if (file) {
            return file.content;
        }
        // A new grammar starts from the server's minimal valid starter
        // instead of an empty, invalid document.
        return workspace.permissions.canEdit ? workspace.suggestedContent : '';
    }

    private mount(workspace: GrammarWorkspace, uri: monaco.Uri): void {
        const file = workspace.files[0];
        this.canEdit = workspace.permissions.canEdit;
        this.fileId = file?.id;
        this.path = file?.path || workspace.suggestedPath;
        this.filename.textContent = this.path;

        registerLangiumLanguage();
        this.model = monaco.editor.createModel(
            this.initialContent(workspace), 'langium', uri,
        );
        this.editor = monaco.editor.create(this.editorHost, {
            model: this.model,
            automaticLayout: true,
            readOnly: !this.canEdit,
            domReadOnly: !this.canEdit,
            minimap: {enabled: true},
            scrollBeyondLastLine: false,
            fontSize: 14,
            tabSize: 4,
            insertSpaces: true,
            ariaLabel: 'Langium grammar source editor',
        });
        this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            void this.save();
        });
        this.changeListener = this.model.onDidChangeContent(() => {
            this.lastActivityAt = Date.now();
            this.validatedClean = false;
            this.refreshValidity();
            if (this.canEdit) {
                this.dirty = true;
                if (!this.saving) {
                    this.setState('Unsaved changes');
                }
            }
        });
        this.markerListener = monaco.editor.onDidChangeMarkers((resources) => {
            if (resources.some((resource) => resource.toString() === this.model?.uri.toString())) {
                this.lastActivityAt = Date.now();
                this.updateDiagnosticMetadata();
            }
        });

        this.languageService = createGrammarLanguageService(
            this.onLanguageServiceState,
            (capabilities) => {
                this.root.dataset.grammarServerCapabilities = capabilities.join(',');
            },
        );
        void this.languageService.start().catch((error) => {
            this.fail(error, 'The Langium grammar service failed to start.', 'server');
        });

        if (!this.canEdit) {
            this.setState('Read-only');
        } else if (file) {
            this.setState('Saved');
        } else {
            this.dirty = true;
            this.setState('Unsaved changes');
        }
        this.updateDiagnosticMetadata();
        this.editor.focus();
    }

    private readonly onLanguageServiceState = (change: LanguageServiceStateChange): void => {
        this.root.dataset.grammarServerState = change.state;
        this.root.dataset.grammarServerGeneration = String(change.generation);
        this.serverReady = change.state === 'ready';
        this.updateValidateButton();
        const labels = {
            starting: 'Server: Starting…',
            ready: 'Server: Ready',
            failed: 'Server: Failed',
            stopped: 'Server: Stopped',
        } as const;
        this.serverStatus.textContent = labels[change.state];
        this.serverStatus.classList.toggle('text-success', change.state === 'ready');
        this.serverStatus.classList.toggle('text-danger', change.state === 'failed');
        this.serverStatus.classList.toggle(
            'text-muted',
            change.state !== 'ready' && change.state !== 'failed',
        );
        this.restartButton.disabled = change.state === 'starting' || change.state === 'stopped';
        if (change.state === 'ready' && this.root.dataset.grammarErrorKind === 'server') {
            this.hideError();
        }
    };

    private readonly onRestartClick = (): void => {
        if (!this.languageService) {
            return;
        }
        this.restartButton.disabled = true;
        this.clearDiagnosticMarkers();
        void this.languageService.restart().catch((error) => {
            this.fail(
                error,
                'The Langium grammar service could not be restarted.',
                'server',
            );
        });
    };

    private clearDiagnosticMarkers(): void {
        if (!this.model) {
            return;
        }
        const owners = new Set(
            monaco.editor.getModelMarkers({resource: this.model.uri})
                .map((marker) => marker.owner),
        );
        for (const owner of owners) {
            monaco.editor.setModelMarkers(this.model, owner, []);
        }
        this.updateDiagnosticMetadata();
    }

    private updateDiagnosticMetadata(): void {
        const markers = this.model
            ? monaco.editor.getModelMarkers({resource: this.model.uri})
            : [];
        this.problems = toProblemItems(markers);
        const counts = countProblems(this.problems);
        this.root.dataset.grammarDiagnostics = String(counts.total);
        this.root.dataset.grammarDiagnosticErrors = String(counts.errors);
        this.root.dataset.grammarDiagnosticWarnings = String(counts.warnings);
        this.root.dataset.grammarDiagnosticMessages = JSON.stringify(
            this.problems.map((problem) => problem.message),
        );
        this.renderProblems();
        this.refreshValidity();
    }

    private renderProblems(): void {
        const counts = countProblems(this.problems);
        this.problemsSummary.textContent = `Problems: ${summarizeProblems(counts)}`;
        this.problemsList.replaceChildren(...this.problems.map((problem, index) => {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = `itlingo-grammar-problem itlingo-grammar-problem-${problem.severity}`;
            item.setAttribute('role', 'listitem');
            item.dataset.grammarProblemIndex = String(index);
            item.setAttribute(
                'aria-label',
                `${problem.severity} at line ${problem.startLineNumber}, `
                + `column ${problem.startColumn}: ${problem.message}`,
            );

            const severity = document.createElement('span');
            severity.className = 'itlingo-grammar-problem-severity';
            severity.textContent = problem.severity;

            const message = document.createElement('span');
            message.className = 'itlingo-grammar-problem-message';
            message.textContent = problem.message;

            const origin = document.createElement('span');
            origin.className = 'itlingo-grammar-problem-origin text-muted';
            origin.textContent = [
                problem.source,
                problem.code ? `(${problem.code})` : '',
            ].filter(Boolean).join(' ');

            const position = document.createElement('span');
            position.className = 'itlingo-grammar-problem-position text-muted';
            position.textContent = `Ln ${problem.startLineNumber}, Col ${problem.startColumn}`;

            item.append(severity, message, origin, position);
            return item;
        }));
    }

    private readonly onProblemsClick = (event: Event): void => {
        const item = (event.target as HTMLElement)
            .closest<HTMLElement>('[data-grammar-problem-index]');
        if (item) {
            this.revealProblem(Number(item.dataset.grammarProblemIndex));
        }
    };

    private readonly onProblemsKeydown = (event: KeyboardEvent): void => {
        const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
        if (!keys.includes(event.key)) {
            return;
        }
        const items = Array.from(this.problemsList
            .querySelectorAll<HTMLButtonElement>('[data-grammar-problem-index]'));
        if (!items.length) {
            return;
        }
        const current = items.indexOf(document.activeElement as HTMLButtonElement);
        const next = event.key === 'Home' ? 0
            : event.key === 'End' ? items.length - 1
                : event.key === 'ArrowDown' ? Math.min(current + 1, items.length - 1)
                    : Math.max(current - 1, 0);
        event.preventDefault();
        items[next].focus();
    };

    private revealProblem(index: number): void {
        const problem = this.problems[index];
        if (!problem || !this.editor) {
            return;
        }
        const range = new monaco.Range(
            problem.startLineNumber,
            problem.startColumn,
            problem.endLineNumber,
            problem.endColumn,
        );
        this.editor.setSelection(range);
        this.editor.revealRangeInCenterIfOutsideViewport(range);
        this.editor.focus();
        this.root.dataset.grammarFocusedProblem = String(index);
    }

    private readonly onSaveClick = (): void => {
        void this.save();
    };

    private readonly onValidateClick = (): void => {
        void this.validate();
    };

    private async validate(): Promise<void> {
        if (this.validating || !this.model) {
            return;
        }
        if (!this.serverReady) {
            this.fail(
                new Error('The language service is not ready. Wait for '
                    + '"Server: Ready" or restart the language service.'),
                'Validation is unavailable.',
                'validate',
            );
            return;
        }
        this.validating = true;
        this.setValidity('validating', 'Validating…');
        this.updateValidateButton();
        try {
            // Diagnostics are pushed by the language server after document
            // synchronization; wait until content and marker activity settle
            // so the result describes the current source.
            const settled = await waitForDiagnosticsQuiet(
                () => this.lastActivityAt,
                {quietMs: 600, timeoutMs: 15000},
            );
            if (this.disposed) {
                return;
            }
            if (!settled) {
                this.setValidity('not-validated', 'Not validated');
                this.fail(
                    new Error('Validation timed out while waiting for diagnostics.'),
                    'Validation timed out.',
                    'validate',
                );
                return;
            }
            this.updateDiagnosticMetadata();
            const counts = countProblems(this.problems);
            if (counts.errors === 0) {
                this.validatedClean = true;
                this.setValidity('valid', 'Valid');
            } else {
                this.validatedClean = false;
                this.setValidity('invalid', summarizeProblems(counts));
            }
            if (this.root.dataset.grammarErrorKind === 'validate') {
                this.hideError();
            }
        } finally {
            this.validating = false;
            this.updateValidateButton();
        }
    }

    private setValidity(state: ValidityState, label: string): void {
        this.root.dataset.grammarValidityState = state;
        this.validity.textContent = label;
        this.validity.classList.toggle('text-success', state === 'valid');
        this.validity.classList.toggle('text-danger', state === 'invalid');
        this.validity.classList.toggle(
            'text-muted', state !== 'valid' && state !== 'invalid',
        );
    }

    private refreshValidity(): void {
        if (this.validating) {
            return;
        }
        const counts = countProblems(this.problems);
        if (counts.errors > 0) {
            this.validatedClean = false;
            this.setValidity('invalid', summarizeProblems(counts));
        } else if (this.validatedClean) {
            this.setValidity('valid', 'Valid');
        } else {
            this.setValidity('not-validated', 'Not validated');
        }
    }

    private updateValidateButton(): void {
        this.validateButton.disabled = this.validating || !this.serverReady;
    }

    private async save(): Promise<void> {
        if (!this.canEdit || !this.model || this.saving || !this.dirty) {
            return;
        }
        this.saving = true;
        const savingVersion = this.model.getAlternativeVersionId();
        this.hideError();
        this.setState('Saving…');
        try {
            const saved = await rpc<GrammarFile>(
                `/dsl/${this.dslId}/grammar/save`,
                {
                    file_id: this.fileId || false,
                    path: this.path,
                    content: this.model.getValue(),
                },
            );
            this.fileId = saved.id;
            this.path = saved.path;
            this.filename.textContent = saved.path;
            if (this.model.getAlternativeVersionId() === savingVersion) {
                this.dirty = false;
                this.setState('Saved');
            } else {
                this.dirty = true;
                this.setState('Unsaved changes');
            }
        } catch (error) {
            this.dirty = true;
            this.fail(error, 'Save failed.', 'save');
            this.setState('Save failed');
        } finally {
            this.saving = false;
            this.updateSaveButton();
        }
    }

    private setState(label: string): void {
        this.status.textContent = label;
        this.status.classList.toggle('text-danger', label === 'Save failed');
        this.status.classList.toggle('text-muted', label !== 'Save failed');
        this.updateSaveButton();
    }

    private updateSaveButton(): void {
        if (this.saveButton) {
            this.saveButton.disabled = !this.canEdit || !this.dirty || this.saving;
        }
    }

    private fail(error: unknown, fallback: string, kind = 'editor'): void {
        let message = error instanceof Error && error.message ? error.message : fallback;
        if (typeof error === 'object' && error && 'message' in error) {
            message = String(error.message || fallback);
        }
        this.error.textContent = message;
        this.error.classList.remove('d-none');
        this.root.dataset.grammarErrorKind = kind;
    }

    private hideError(): void {
        this.error.textContent = '';
        this.error.classList.add('d-none');
        delete this.root.dataset.grammarErrorKind;
    }

    private readonly onBeforeUnload = (event: BeforeUnloadEvent): void => {
        if (this.dirty) {
            event.preventDefault();
            event.returnValue = '';
        }
    };

    private readonly onPageHide = (): void => {
        this.dispose();
    };

    private dispose(): void {
        if (this.disposed) {
            return;
        }
        this.disposed = true;
        window.removeEventListener('beforeunload', this.onBeforeUnload);
        window.removeEventListener('pagehide', this.onPageHide);
        this.saveButton?.removeEventListener('click', this.onSaveClick);
        this.validateButton.removeEventListener('click', this.onValidateClick);
        this.restartButton.removeEventListener('click', this.onRestartClick);
        this.problemsList.removeEventListener('click', this.onProblemsClick);
        this.problemsList.removeEventListener('keydown', this.onProblemsKeydown);
        this.changeListener?.dispose();
        this.markerListener?.dispose();
        void this.languageService?.dispose();
        this.editor?.dispose();
        this.model?.dispose();
    }
}

const root = document.querySelector<HTMLElement>('#itlingo-grammar-editor');
if (root) {
    const app = new GrammarEditorApp(root);
    void app.start();
}
