/// <reference lib="WebWorker" />

import {EmptyFileSystem} from 'langium';
import {createLangiumGrammarServices} from 'langium/grammar';
import {
    type DefaultSharedModuleContext,
    startLanguageServer,
} from 'langium/lsp';
import {
    BrowserMessageReader,
    BrowserMessageWriter,
    createConnection,
} from 'vscode-languageserver/browser';

const scope = self as DedicatedWorkerGlobalScope;
const reader = new BrowserMessageReader(scope);
const writer = new BrowserMessageWriter(scope);
const context = {
    connection: createConnection(reader, writer),
    ...EmptyFileSystem,
} as DefaultSharedModuleContext;

// This is the language service for the Langium Grammar DSL itself. Authored
// RSL/ASL/PSL grammars all use this same worker and never load generated DSL
// services in the browser.
const {shared} = createLangiumGrammarServices(context);
startLanguageServer(shared);
