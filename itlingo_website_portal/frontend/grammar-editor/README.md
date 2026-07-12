# ITLingo Grammar Editor frontend

This route-only bundle provides the Monaco editor and in-browser Langium
Grammar DSL language service for `/dsl/<id>/grammar`. Odoo remains the source
of truth; the browser does not persist grammar source locally.

## Build and test

All direct dependency versions are exact and `package-lock.json` is committed.
Run:

```sh
npm ci
npm run typecheck
npm test
npm run build
```

The build writes committed runtime files to
`../../static/dist/grammar-editor`. The QWeb editor template loads these files
directly, so Monaco and Langium are not included in the general Odoo frontend
bundle. `editor.worker.js` and `langium-grammar-server.worker.js` are separate,
same-origin module workers.

## Phase 2 dependency decision

The implementation was checked against the maintained
[monaco-languageclient Langium Grammar DSL example](https://github.com/TypeFox/monaco-languageclient/tree/main/packages/examples/src/langium/langium-dsl),
including its
[browser worker](https://github.com/TypeFox/monaco-languageclient/blob/main/packages/examples/src/langium/langium-dsl/worker/langium-server.ts).
The older [Langium + Monaco tutorial](https://langium.org/docs/learn/minilogo/langium_and_monaco/)
now says that it targets Langium 2.0.2 and is not compatible with current
versions, so it is not the implementation baseline.

Pinned runtime versions:

- `langium` 4.3.1 (the audit-safe compatible release; the maintained example
  still declares 4.2.1);
- `monaco-languageclient` 10.7.0;
- `@codingame/monaco-vscode-editor-api` 25.1.2;
- `@codingame/monaco-vscode-files-service-override` 25.1.2;
- `vscode-languageserver` 10.0.1;
- `vscode-languageserver-protocol` 3.18.2.

The maintained example can switch between a full extended editor wrapper and
a classic configuration. This addon deliberately keeps the Phase 1 focused
Odoo editor shell and initializes the classic Monaco/VS Code services directly.
It uses `LanguageClientWrapper` with a `WorkerDirect` connection, which creates
the same `BrowserMessageReader` / `BrowserMessageWriter` transport used by the
example. The worker calls `createLangiumGrammarServices` once; it never loads a
service generated from the DSL being authored.

The language client supplies live diagnostics, completion, hover, and
go-to-definition. The Odoo browser smoke test asserts all three navigation
capabilities from the server's LSP initialization result, then proves the
unknown-rule diagnostic and clean worker-restart lifecycle. Monaco models retain stable
`file:///itlingo-dsl/<dsl-id>/<path>` URIs, and every restart constructs a fresh
worker/client pair. Page teardown disposes the client, worker, editor, model,
listeners, and markers.

## Phase 3 usability layer

`src/problems.ts` converts Monaco markers into sorted problem items and feeds
both the compact Problems panel (severity, message, source, code, line, and
column; click or keyboard navigation focuses the exact editor range) and the
explicit Validate action. Validate waits for content and marker activity to go
quiet (`waitForDiagnosticsQuiet`) before reporting `Valid` or the error and
warning counts, so the result always describes the current source. Validity is
tracked separately from the save state: an invalid draft can be saved and
remains visibly invalid, and any edit resets a previous `Valid` result to
`Not validated`.

New grammars open with a minimal starter grammar supplied by the Odoo load
endpoint (`suggestedContent`), which the pinned Langium version accepts as
valid. Non-draft DSL versions render without a Save button and with an
explanatory read-only notice, while diagnostics and Validate stay available.
The page footer states explicitly that Save/Validate never build or deploy
templating or ITOI parsers.
