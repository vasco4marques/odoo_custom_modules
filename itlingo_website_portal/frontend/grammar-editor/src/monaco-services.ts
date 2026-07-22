import {MonacoVscodeApiWrapper} from 'monaco-languageclient/vscodeApiWrapper';
import {
    useWorkerFactory,
    Worker as WorkerDefinition,
} from 'monaco-languageclient/workerFactory';
import editorWorkerUrl from '@codingame/monaco-vscode-editor-api/esm/vs/editor/editor.worker.js?worker&url';
import typescriptWorkerUrl from '@codingame/monaco-vscode-standalone-typescript-language-features/worker?worker&url';

let initialization: Promise<void> | undefined;

/** Initialize the Monaco/VS Code services exactly once for this page. */
export function initializeMonacoServices(): Promise<void> {
    if (!initialization) {
        const api = new MonacoVscodeApiWrapper({
            $type: 'classic',
            viewsConfig: {$type: 'EditorService'},
            advanced: {
                loadExtensionServices: false,
                loadThemes: false,
            },
            monacoWorkerFactory: (logger) => {
                useWorkerFactory({
                    logger,
                    workerLoaders: {
                        editorWorkerService: () => new WorkerDefinition(
                            editorWorkerUrl,
                            {type: 'module', name: 'ITLingo Monaco editor worker'},
                        ),
                        typescript: () => new WorkerDefinition(
                            typescriptWorkerUrl,
                            {type: 'module', name: 'ITLingo TypeScript worker'},
                        ),
                        javascript: () => new WorkerDefinition(
                            typescriptWorkerUrl,
                            {type: 'module', name: 'ITLingo JavaScript worker'},
                        ),
                    },
                });
            },
        });
        initialization = api.start({caller: 'ITLingo Grammar Editor'});
    }
    return initialization;
}
