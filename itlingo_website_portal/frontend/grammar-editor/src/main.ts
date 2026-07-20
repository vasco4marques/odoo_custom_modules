import * as monaco from '@codingame/monaco-vscode-editor-api';
import {
    RegisteredFileSystemProvider,
    RegisteredMemoryFile,
    registerFileSystemOverlay,
} from '@codingame/monaco-vscode-files-service-override';

import {createGrammarLanguageService} from './grammar-language-service.js';
import type {
    LanguageServiceLifecycle,
    LanguageServiceStateChange,
} from './language-service-lifecycle.js';
import {initializeMonacoServices} from './monaco-services.js';
import {
    countProblems,
    groupProblemsByPath,
    type ProblemItem,
    summarizeProblems,
    toProblemItems,
    waitForDiagnosticsQuiet,
} from './problems.js';
import {
    buildFileUri,
    validateGrammarPath,
    type WorkspaceFile,
    WorkspaceFileRegistry,
} from './workspace-files.js';
import './style.css';

type DslStatus = 'draft' | 'active' | 'deprecated';

interface GrammarFile {
    id: number;
    path: string;
    content: string;
    isEntry: boolean;
}

interface GrammarWorkspace {
    dsl: {id: number; acronym: string; version: string; status: DslStatus};
    permissions: {canRead: boolean; canEdit: boolean};
    files: GrammarFile[];
    suggestedPath: string;
    suggestedContent: string;
}

interface JsonRpcError {
    message?: string;
    data?: {message?: string};
}

interface JsonRpcResponse<T> {
    result?: T;
    error?: JsonRpcError;
}

interface SourceFile {
    id?: number;
    path: string;
    content: string;
    isEntry: boolean;
    initiallyDirty?: boolean;
}

type Disposable = {dispose(): void};

async function rpc<T>(url: string, params: Record<string, unknown> = {}): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({jsonrpc: '2.0', method: 'call', id: Date.now(), params}),
    });
    if (!response.ok) {
        throw new Error(`The server returned HTTP ${response.status}.`);
    }
    const payload = await response.json() as JsonRpcResponse<T>;
    if (payload.error) {
        throw new Error(
            payload.error.data?.message || payload.error.message
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
    if (monaco.languages.getLanguages().some((language) => language.id === 'langium')) {
        return;
    }
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

type ValidityState = 'not-validated' | 'validating' | 'valid' | 'invalid';

export class GrammarEditorApp {
    private readonly dslId: number;
    private readonly editorHost: HTMLElement;
    private readonly filesHost: HTMLElement;
    private readonly createButton: HTMLButtonElement | null;
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
    private readonly files = new WorkspaceFileRegistry<monaco.editor.ITextModel>();
    private readonly viewStates = new Map<string, monaco.editor.ICodeEditorViewState | null>();
    private readonly modelListeners = new Map<string, Disposable>();
    private readonly fileNodes = new Map<string, RegisteredMemoryFile>();
    private readonly fileRegistrations = new Map<string, Disposable>();
    private readonly fileProvider = new RegisteredFileSystemProvider(false);
    private editor?: monaco.editor.IStandaloneCodeEditor;
    private languageService?: LanguageServiceLifecycle;
    private overlayRegistration?: Disposable;
    private markerListener?: Disposable;
    private activePath = '';
    private canEdit = false;
    private saving = false;
    private validating = false;
    private validatedClean = false;
    private serverReady = false;
    private disposed = false;
    private problems: ProblemItem[] = [];
    private lastActivityAt = Date.now();

    constructor(private readonly root: HTMLElement) {
        this.dslId = Number(root.dataset.dslId);
        if (!Number.isInteger(this.dslId) || this.dslId <= 0) {
            throw new Error('The Grammar Editor has an invalid DSL identifier.');
        }
        this.editorHost = requiredElement(root, '[data-grammar-editor]');
        this.filesHost = requiredElement(root, '[data-grammar-files]');
        this.createButton = root.querySelector('[data-grammar-file-create]');
        this.saveButton = root.querySelector('[data-grammar-save]');
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
        this.createButton?.addEventListener('click', this.onCreateClick);
        this.filesHost.addEventListener('click', this.onFilesClick);
        this.problemsList.addEventListener('click', this.onProblemsClick);
        this.problemsList.addEventListener('keydown', this.onProblemsKeydown);
        window.addEventListener('beforeunload', this.onBeforeUnload);
        window.addEventListener('pagehide', this.onPageHide);

        try {
            const workspace = await rpc<GrammarWorkspace>(`/dsl/${this.dslId}/grammar/load`);
            this.canEdit = workspace.permissions.canEdit;
            const sources: SourceFile[] = workspace.files.length
                ? workspace.files
                : this.canEdit ? [{
                    path: workspace.suggestedPath,
                    content: workspace.suggestedContent,
                    isEntry: true,
                    initiallyDirty: true,
                }] : [];

            // The overlay is installed before Monaco's services initialize, but
            // unlike initFile it remains mutable for later create/rename/delete.
            this.overlayRegistration = registerFileSystemOverlay(1, this.fileProvider);
            for (const source of sources) {
                this.registerOverlayFile(source.path, source.content);
            }
            await initializeMonacoServices();
            this.mount(sources);
        } catch (error) {
            this.fail(error, 'Could not load the grammar editor.');
        }
    }

    private mount(sources: SourceFile[]): void {
        registerLangiumLanguage();
        for (const source of sources) {
            this.addModel(source);
        }
        const initial = sources.find((source) => source.isEntry) || sources[0];
        this.editor = monaco.editor.create(this.editorHost, {
            model: initial ? this.files.get(initial.path)?.model : null,
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
        if (initial) {
            this.activePath = initial.path;
        }
        this.markerListener = monaco.editor.onDidChangeMarkers((resources) => {
            const uris = new Set(this.files.sorted().map((file) => file.model.uri.toString()));
            if (resources.some((resource) => uris.has(resource.toString()))) {
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

        this.renderFiles();
        this.updateDiagnosticMetadata();
        this.refreshSaveState();
        this.editor.focus();
    }

    private addModel(source: SourceFile): WorkspaceFile<monaco.editor.ITextModel> {
        const uri = monaco.Uri.parse(buildFileUri(this.dslId, source.path));
        const model = monaco.editor.createModel(source.content, 'langium', uri);
        const version = model.getAlternativeVersionId();
        const file = this.files.add({
            id: source.id,
            path: source.path,
            isEntry: source.isEntry,
            model,
            savedVersionId: source.initiallyDirty ? version - 1 : version,
            dirty: Boolean(source.initiallyDirty),
        });
        this.attachModelListener(file);
        return file;
    }

    private attachModelListener(file: WorkspaceFile<monaco.editor.ITextModel>): void {
        this.modelListeners.set(file.path, file.model.onDidChangeContent(() => {
            this.lastActivityAt = Date.now();
            this.validatedClean = false;
            this.files.refreshDirty(file.path);
            const node = this.fileNodes.get(file.path);
            if (node) {
                void node.write(new TextEncoder().encode(file.model.getValue()));
            }
            this.refreshValidity();
            this.refreshSaveState();
            this.renderFiles();
        }));
    }

    private registerOverlayFile(path: string, content: string): void {
        const uri = monaco.Uri.parse(buildFileUri(this.dslId, path));
        const node = new RegisteredMemoryFile(uri, content);
        this.fileNodes.set(path, node);
        this.fileRegistrations.set(path, this.fileProvider.registerFile(node));
    }

    private unregisterOverlayFile(path: string): void {
        this.fileRegistrations.get(path)?.dispose();
        this.fileRegistrations.delete(path);
        this.fileNodes.delete(path);
    }

    private switchTo(path: string, focus = true): void {
        const file = this.files.get(path);
        if (!file || !this.editor || path === this.activePath) {
            if (focus) {
                this.editor?.focus();
            }
            return;
        }
        if (this.activePath) {
            this.viewStates.set(this.activePath, this.editor.saveViewState());
        }
        this.activePath = path;
        this.editor.setModel(file.model);
        this.editor.restoreViewState(this.viewStates.get(path) || null);
        this.filename.textContent = path;
        this.root.dataset.grammarActiveFile = path;
        this.renderFiles();
        if (focus) {
            this.editor.focus();
        }
    }

    private renderFiles(): void {
        const fileErrors = this.fileErrorCounts();
        this.root.dataset.grammarFileErrors = JSON.stringify(fileErrors);
        const nodes = this.files.sorted().map((file) => {
            const row = document.createElement('div');
            row.className = 'itlingo-grammar-file-row';
            row.classList.toggle('active', file.path === this.activePath);
            row.dataset.grammarFilePath = file.path;

            const select = document.createElement('button');
            select.type = 'button';
            select.className = 'itlingo-grammar-file-select';
            select.dataset.grammarFileSelect = file.path;
            select.title = file.path;

            const icon = document.createElement('i');
            icon.className = file.isEntry ? 'fa fa-star text-warning' : 'fa fa-file-code-o';
            icon.setAttribute('aria-hidden', 'true');
            const label = document.createElement('span');
            label.className = 'itlingo-grammar-file-label';
            label.textContent = file.path;
            select.append(icon, label);
            if (file.dirty) {
                const dirty = document.createElement('span');
                dirty.className = 'itlingo-grammar-file-dirty';
                dirty.title = 'Unsaved changes';
                dirty.textContent = '●';
                select.append(dirty);
            }
            const errorCount = fileErrors[file.path] || 0;
            if (errorCount) {
                const errors = document.createElement('span');
                errors.className = 'badge rounded-pill bg-danger';
                errors.dataset.grammarFileErrorCount = String(errorCount);
                errors.textContent = String(errorCount);
                select.append(errors);
            }
            row.append(select);

            if (this.canEdit && file.id) {
                const actions = document.createElement('div');
                actions.className = 'itlingo-grammar-file-actions';
                if (!file.isEntry) {
                    actions.append(this.fileAction('star', 'Set as entry file', 'set-entry', file.path));
                }
                actions.append(
                    this.fileAction('pencil', 'Rename file', 'rename', file.path),
                    this.fileAction('trash', 'Delete file', 'delete', file.path),
                );
                row.append(actions);
            }
            return row;
        });
        this.filesHost.replaceChildren(...nodes);
        this.filesHost.classList.toggle('itlingo-grammar-files-empty', nodes.length === 0);
        if (!nodes.length) {
            this.filesHost.textContent = this.canEdit
                ? 'No grammar files. Create one to begin.'
                : 'This DSL has no grammar files.';
        }
        const active = this.files.get(this.activePath);
        this.filename.textContent = active?.path || 'No grammar file selected';
        this.root.dataset.grammarActiveFile = active?.path || '';
    }

    private fileAction(icon: string, title: string, action: string, path: string): HTMLButtonElement {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-sm btn-link';
        button.dataset.grammarFileAction = action;
        button.dataset.grammarFilePath = path;
        button.title = title;
        button.setAttribute('aria-label', `${title}: ${path}`);
        const symbol = document.createElement('i');
        symbol.className = `fa fa-${icon}`;
        symbol.setAttribute('aria-hidden', 'true');
        button.append(symbol);
        return button;
    }

    private fileErrorCounts(): Record<string, number> {
        const counts: Record<string, number> = {};
        for (const problem of this.problems) {
            if (problem.severity === 'error') {
                counts[problem.path] = (counts[problem.path] || 0) + 1;
            }
        }
        return counts;
    }

    private readonly onFilesClick = (event: Event): void => {
        const target = event.target as HTMLElement;
        const action = target.closest<HTMLElement>('[data-grammar-file-action]');
        if (action) {
            const path = action.dataset.grammarFilePath || '';
            const name = action.dataset.grammarFileAction;
            if (name === 'rename') {
                void this.renameFile(path);
            } else if (name === 'delete') {
                void this.deleteFile(path);
            } else if (name === 'set-entry') {
                void this.setEntry(path);
            }
            return;
        }
        const select = target.closest<HTMLElement>('[data-grammar-file-select]');
        if (select?.dataset.grammarFileSelect) {
            this.switchTo(select.dataset.grammarFileSelect);
        }
    };

    private readonly onCreateClick = (): void => {
        const value = window.prompt('Relative path for the new .langium file:');
        if (value !== null) {
            void this.createFile(value);
        }
    };

    private async createFile(value: string): Promise<void> {
        try {
            const path = validateGrammarPath(value);
            this.hideError();
            const created = await rpc<GrammarFile>(
                `/dsl/${this.dslId}/grammar/file/create`, {path, content: ''},
            );
            this.registerOverlayFile(created.path, created.content);
            this.addModel(created);
            this.switchTo(created.path);
            this.renderFiles();
            this.refreshSaveState();
        } catch (error) {
            this.fail(error, 'Could not create the grammar file.', 'file');
        }
    }

    private async renameFile(oldPath: string): Promise<void> {
        const file = this.files.get(oldPath);
        if (!file?.id) {
            return;
        }
        const value = window.prompt('New relative .langium path:', oldPath);
        if (value === null) {
            return;
        }
        try {
            const newPath = validateGrammarPath(value);
            if (newPath === oldPath) {
                return;
            }
            this.hideError();
            const renamed = await rpc<GrammarFile>(
                `/dsl/${this.dslId}/grammar/file/rename`,
                {file_id: file.id, path: newPath},
            );
            const content = file.model.getValue();
            const wasActive = this.activePath === oldPath;
            if (wasActive && this.editor) {
                this.viewStates.set(oldPath, this.editor.saveViewState());
            }
            this.registerOverlayFile(newPath, content);
            const model = monaco.editor.createModel(
                content, 'langium', monaco.Uri.parse(buildFileUri(this.dslId, newPath)),
            );
            const migrated = this.files.rename(oldPath, newPath, model);
            migrated.id = renamed.id;
            migrated.isEntry = renamed.isEntry;
            this.modelListeners.get(oldPath)?.dispose();
            this.modelListeners.delete(oldPath);
            this.attachModelListener(migrated);
            const oldViewState = this.viewStates.get(oldPath) || null;
            this.viewStates.delete(oldPath);
            this.viewStates.set(newPath, oldViewState);
            if (wasActive && this.editor) {
                this.activePath = newPath;
                this.editor.setModel(model);
                this.editor.restoreViewState(oldViewState);
            }
            file.model.dispose();
            this.unregisterOverlayFile(oldPath);
            this.renderFiles();
            this.updateDiagnosticMetadata();
            this.refreshSaveState();
        } catch (error) {
            this.fail(error, 'Could not rename the grammar file.', 'file');
        }
    }

    private async deleteFile(path: string): Promise<void> {
        const file = this.files.get(path);
        if (!file?.id || !window.confirm(`Delete ${path}?`)) {
            return;
        }
        try {
            this.hideError();
            await rpc(`/dsl/${this.dslId}/grammar/file/delete`, {file_id: file.id});
            const wasActive = this.activePath === path;
            this.modelListeners.get(path)?.dispose();
            this.modelListeners.delete(path);
            this.files.delete(path);
            this.viewStates.delete(path);
            this.unregisterOverlayFile(path);
            if (wasActive) {
                const next = this.files.sorted()[0];
                this.activePath = next?.path || '';
                this.editor?.setModel(next?.model || null);
            }
            file.model.dispose();
            this.renderFiles();
            this.updateDiagnosticMetadata();
            this.refreshSaveState();
        } catch (error) {
            this.fail(error, 'Could not delete the grammar file.', 'file');
        }
    }

    private async setEntry(path: string): Promise<void> {
        const file = this.files.get(path);
        if (!file?.id) {
            return;
        }
        try {
            this.hideError();
            const result = await rpc<{files: GrammarFile[]}>(
                `/dsl/${this.dslId}/grammar/file/set-entry`, {file_id: file.id},
            );
            for (const payload of result.files) {
                const current = this.files.get(payload.path);
                if (current) {
                    current.isEntry = payload.isEntry;
                }
            }
            this.renderFiles();
        } catch (error) {
            this.fail(error, 'Could not change the entry grammar.', 'file');
        }
    }

    /** Programmatic edit hook used by browser integration tests and extensions. */
    setFileContent(path: string, content: string): void {
        const file = this.files.get(path);
        if (!file) {
            throw new Error(`Grammar file '${path}' is not registered.`);
        }
        file.model.setValue(content);
        this.switchTo(path, false);
    }

    private readonly onLanguageServiceState = (change: LanguageServiceStateChange): void => {
        this.root.dataset.grammarServerState = change.state;
        this.root.dataset.grammarServerGeneration = String(change.generation);
        this.serverReady = change.state === 'ready';
        this.updateValidateButton();
        const labels = {
            starting: 'Server: Starting…', ready: 'Server: Ready',
            failed: 'Server: Failed', stopped: 'Server: Stopped',
        } as const;
        this.serverStatus.textContent = labels[change.state];
        this.serverStatus.classList.toggle('text-success', change.state === 'ready');
        this.serverStatus.classList.toggle('text-danger', change.state === 'failed');
        this.serverStatus.classList.toggle(
            'text-muted', change.state !== 'ready' && change.state !== 'failed',
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
            this.fail(error, 'The Langium grammar service could not be restarted.', 'server');
        });
    };

    private clearDiagnosticMarkers(): void {
        for (const file of this.files.sorted()) {
            const owners = new Set(
                monaco.editor.getModelMarkers({resource: file.model.uri})
                    .map((marker) => marker.owner),
            );
            for (const owner of owners) {
                monaco.editor.setModelMarkers(file.model, owner, []);
            }
        }
        this.updateDiagnosticMetadata();
    }

    private updateDiagnosticMetadata(): void {
        this.problems = this.files.sorted().flatMap((file) => toProblemItems(
            monaco.editor.getModelMarkers({resource: file.model.uri}),
            {resource: file.model.uri.toString(), path: file.path},
        ));
        const counts = countProblems(this.problems);
        this.root.dataset.grammarDiagnostics = String(counts.total);
        this.root.dataset.grammarDiagnosticErrors = String(counts.errors);
        this.root.dataset.grammarDiagnosticWarnings = String(counts.warnings);
        this.root.dataset.grammarDiagnosticMessages = JSON.stringify(
            this.problems.map((problem) => problem.message),
        );
        this.renderProblems();
        this.renderFiles();
        this.refreshValidity();
    }

    private renderProblems(): void {
        const counts = countProblems(this.problems);
        this.problemsSummary.textContent = `Problems: ${summarizeProblems(counts)}`;
        const nodes: HTMLElement[] = [];
        let problemIndex = 0;
        for (const [path, problems] of groupProblemsByPath(this.problems)) {
            const heading = document.createElement('div');
            heading.className = 'itlingo-grammar-problem-file';
            heading.textContent = path;
            nodes.push(heading);
            for (const problem of problems) {
                const index = problemIndex++;
                const item = document.createElement('button');
                item.type = 'button';
                item.className = `itlingo-grammar-problem itlingo-grammar-problem-${problem.severity}`;
                item.setAttribute('role', 'listitem');
                item.dataset.grammarProblemIndex = String(index);
                item.setAttribute(
                    'aria-label', `${problem.severity} in ${path} at line `
                    + `${problem.startLineNumber}, column ${problem.startColumn}: ${problem.message}`,
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
                    problem.source, problem.code ? `(${problem.code})` : '',
                ].filter(Boolean).join(' ');
                const position = document.createElement('span');
                position.className = 'itlingo-grammar-problem-position text-muted';
                position.textContent = `Ln ${problem.startLineNumber}, Col ${problem.startColumn}`;
                item.append(severity, message, origin, position);
                nodes.push(item);
            }
        }
        this.problemsList.replaceChildren(...nodes);
    }

    private readonly onProblemsClick = (event: Event): void => {
        const item = (event.target as HTMLElement)
            .closest<HTMLElement>('[data-grammar-problem-index]');
        if (item) {
            this.revealProblem(Number(item.dataset.grammarProblemIndex));
        }
    };

    private readonly onProblemsKeydown = (event: KeyboardEvent): void => {
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
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
        this.switchTo(problem.path, false);
        const range = new monaco.Range(
            problem.startLineNumber, problem.startColumn,
            problem.endLineNumber, problem.endColumn,
        );
        this.editor.setSelection(range);
        this.editor.revealRangeInCenterIfOutsideViewport(range);
        this.editor.focus();
        this.root.dataset.grammarFocusedProblem = String(index);
    }

    private readonly onSaveClick = (): void => { void this.save(); };
    private readonly onValidateClick = (): void => { void this.validate(); };

    private async validate(): Promise<void> {
        if (this.validating || this.files.sorted().length === 0) {
            return;
        }
        if (!this.serverReady) {
            this.fail(
                new Error('The language service is not ready. Wait for "Server: Ready" '
                    + 'or restart the language service.'),
                'Validation is unavailable.', 'validate',
            );
            return;
        }
        this.validating = true;
        this.setValidity('validating', 'Validating…');
        this.updateValidateButton();
        try {
            const settled = await waitForDiagnosticsQuiet(
                () => this.lastActivityAt, {quietMs: 600, timeoutMs: 15000},
            );
            if (this.disposed) {
                return;
            }
            if (!settled) {
                this.setValidity('not-validated', 'Not validated');
                this.fail(
                    new Error('Validation timed out while waiting for diagnostics.'),
                    'Validation timed out.', 'validate',
                );
                return;
            }
            this.updateDiagnosticMetadata();
            const counts = countProblems(this.problems);
            this.validatedClean = counts.errors === 0;
            this.setValidity(
                counts.errors === 0 ? 'valid' : 'invalid',
                counts.errors === 0 ? 'Valid' : summarizeProblems(counts),
            );
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
        this.validity.classList.toggle('text-muted', state !== 'valid' && state !== 'invalid');
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
        this.validateButton.disabled = this.validating || !this.serverReady
            || this.files.sorted().length === 0;
    }

    private async save(): Promise<void> {
        if (!this.canEdit || this.saving || !this.files.hasDirty()) {
            return;
        }
        this.saving = true;
        this.hideError();
        const dirtyFiles = this.files.sorted().filter((file) => file.dirty);
        try {
            for (const [index, file] of dirtyFiles.entries()) {
                const savingVersion = file.model.getAlternativeVersionId();
                this.setState(`Saving ${index + 1}/${dirtyFiles.length}…`);
                const saved = await rpc<GrammarFile>(
                    `/dsl/${this.dslId}/grammar/save`,
                    {
                        file_id: file.id || false,
                        path: file.path,
                        content: file.model.getValue(),
                    },
                );
                file.id = saved.id;
                file.isEntry = saved.isEntry;
                if (file.model.getAlternativeVersionId() === savingVersion) {
                    this.files.markSaved(file.path, savingVersion);
                } else {
                    this.files.refreshDirty(file.path);
                }
                this.renderFiles();
            }
        } catch (error) {
            this.fail(error, 'Save failed.', 'save');
        } finally {
            this.saving = false;
            this.refreshSaveState();
        }
    }

    private refreshSaveState(): void {
        const dirtyCount = this.files.sorted().filter((file) => file.dirty).length;
        this.root.dataset.grammarDirtyFiles = String(dirtyCount);
        if (!this.saving) {
            if (!this.canEdit) {
                this.setState('Read-only');
            } else if (dirtyCount) {
                this.setState(dirtyCount === 1 ? 'Unsaved changes' : `${dirtyCount} unsaved files`);
            } else {
                this.setState('Saved');
            }
        }
        this.updateSaveButton();
    }

    private setState(label: string): void {
        this.status.textContent = label;
        const failed = label === 'Save failed';
        this.status.classList.toggle('text-danger', failed);
        this.status.classList.toggle('text-muted', !failed);
        this.updateSaveButton();
    }

    private updateSaveButton(): void {
        if (this.saveButton) {
            this.saveButton.disabled = !this.canEdit || !this.files.hasDirty() || this.saving;
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
        if (this.files.hasDirty()) {
            event.preventDefault();
            event.returnValue = '';
        }
    };

    private readonly onPageHide = (): void => { this.dispose(); };

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
        this.createButton?.removeEventListener('click', this.onCreateClick);
        this.filesHost.removeEventListener('click', this.onFilesClick);
        this.problemsList.removeEventListener('click', this.onProblemsClick);
        this.problemsList.removeEventListener('keydown', this.onProblemsKeydown);
        for (const listener of this.modelListeners.values()) {
            listener.dispose();
        }
        this.markerListener?.dispose();
        void this.languageService?.dispose();
        this.editor?.dispose();
        for (const file of this.files.sorted()) {
            file.model.dispose();
        }
        for (const registration of this.fileRegistrations.values()) {
            registration.dispose();
        }
        this.overlayRegistration?.dispose();
        this.fileProvider.dispose();
    }
}

export let grammarEditorApp: GrammarEditorApp | undefined;

export function mountGrammarEditor(root: HTMLElement): GrammarEditorApp {
    grammarEditorApp = new GrammarEditorApp(root);
    return grammarEditorApp;
}
