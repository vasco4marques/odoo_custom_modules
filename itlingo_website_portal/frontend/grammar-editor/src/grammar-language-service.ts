import {LanguageClientWrapper} from 'monaco-languageclient/lcwrapper';

import {
    LanguageServiceLifecycle,
    type LanguageServiceStateChange,
} from './language-service-lifecycle.js';

export function createGrammarLanguageService(
    onStateChange: (change: LanguageServiceStateChange) => void,
    onCapabilities: (capabilities: string[]) => void,
): LanguageServiceLifecycle {
    return new LanguageServiceLifecycle(() => {
        const worker = new Worker(
            new URL('./langium-server.worker.ts', import.meta.url),
            {type: 'module', name: 'ITLingo Langium Grammar language server'},
        );
        const client = new LanguageClientWrapper({
            languageId: 'langium',
            connection: {
                options: {$type: 'WorkerDirect', worker},
            },
            clientOptions: {
                documentSelector: [{language: 'langium', scheme: 'file'}],
            },
            disposeWorker: true,
        });
        return {
            start: async () => {
                await client.start();
                const capabilities = client.getLanguageClient()
                    ?.initializeResult?.capabilities;
                onCapabilities([
                    capabilities?.completionProvider ? 'completion' : '',
                    capabilities?.hoverProvider ? 'hover' : '',
                    capabilities?.definitionProvider ? 'definition' : '',
                ].filter(Boolean));
            },
            dispose: async () => {
                try {
                    await client.dispose(true);
                } finally {
                    worker.terminate();
                }
            },
        };
    }, onStateChange);
}
