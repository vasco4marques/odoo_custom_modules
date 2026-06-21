// RSL -> JSON AST CLI.
//
// Usage: node parser.mjs <grammarPath> <rslPath>
// Builds Langium services from the grammar text at runtime (createServicesForGrammar)
// and prints {success, ast, error, diagnostics, ast_summary} as JSON on stdout.
//
// Self-contained: no network, no dependency on the chatbot/ITOI services.

import { readFileSync } from 'node:fs';
import { URI } from 'langium';
import { createServicesForGrammar } from 'langium/grammar';

function serializeValue(value, seen) {
  // Langium cross-reference: tag with {$ref: targetName}; the target is never
  // inlined (avoids cycles/duplication). Python resolves it against by_id.
  if (value && typeof value === 'object' && typeof value.$refText === 'string') {
    return { $ref: value.$refText };
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => serializeValue(item, seen))
      .filter((item) => item !== undefined);
  }
  if (value && typeof value === 'object') {
    return serializeAstNode(value, seen);
  }
  return value;
}

function serializeAstNode(node, seen = new WeakSet()) {
  if (!node || typeof node !== 'object') {
    return node;
  }
  if (seen.has(node)) {
    return undefined;
  }
  seen.add(node);

  const output = {};
  for (const [key, value] of Object.entries(node)) {
    if (key === '$container' || key === '$document' || key === '$cstNode' || key === '$refNode') {
      continue;
    }
    if (key === '$type') {
      output[key] = value;
      continue;
    }
    if (key.startsWith('$')) {
      continue;
    }
    output[key] = serializeValue(value, seen);
  }
  return output;
}

function countNodes(node) {
  if (!node || typeof node !== 'object') {
    return 0;
  }
  let count = 1;
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        count += countNodes(item);
      }
    } else if (value && typeof value === 'object') {
      count += countNodes(value);
    }
  }
  return count;
}

function emit(result) {
  process.stdout.write(JSON.stringify(result));
}

async function main() {
  const [grammarPath, rslPath] = process.argv.slice(2);
  if (!grammarPath || !rslPath) {
    emit({ success: false, error: 'Usage: parser.mjs <grammarPath> <rslPath>', diagnostics: [] });
    process.exit(2);
    return;
  }

  let grammar;
  let dslText;
  try {
    grammar = readFileSync(grammarPath, 'utf-8');
    dslText = readFileSync(rslPath, 'utf-8');
  } catch (err) {
    emit({ success: false, error: `Cannot read input files: ${String(err)}`, diagnostics: [] });
    process.exit(1);
    return;
  }

  if (!dslText.trim()) {
    emit({ success: false, error: 'Empty RSL specification', diagnostics: [] });
    process.exit(1);
    return;
  }

  try {
    const services = await createServicesForGrammar({ grammar });
    const fileExtension = String(services.LanguageMetaData?.fileExtensions?.[0] || 'rsl');
    const factory = services.shared.workspace.LangiumDocumentFactory;
    const document = factory.fromString(dslText, URI.parse(`memory:///input.${fileExtension}`));

    await services.shared.workspace.DocumentBuilder.build([document], { validation: true });

    const diagnostics = (document.diagnostics || []).map((d) => ({
      severity: d.severity,
      message: d.message,
      line: d.range?.start?.line ?? null,
      column: d.range?.start?.character ?? null,
    }));

    // severity 1 == Error in the LSP diagnostic scale.
    const parserErrors = (document.parseResult?.parserErrors || []).map((e) => ({
      severity: 1,
      message: e.message,
      line: e.token?.startLine ?? null,
      column: e.token?.startColumn ?? null,
    }));
    const lexerErrors = (document.parseResult?.lexerErrors || []).map((e) => ({
      severity: 1,
      message: e.message,
      line: e.line ?? null,
      column: e.column ?? null,
    }));

    const allDiagnostics = [...parserErrors, ...lexerErrors, ...diagnostics];
    const hasError = parserErrors.length > 0 || lexerErrors.length > 0
      || allDiagnostics.some((d) => d.severity === 1);

    if (hasError) {
      emit({ success: false, error: 'RSL specification has errors', diagnostics: allDiagnostics });
      process.exit(1);
      return;
    }

    const ast = serializeAstNode(document.parseResult.value);
    emit({
      success: true,
      ast,
      diagnostics: allDiagnostics,
      ast_summary: {
        node_count: countNodes(ast),
        root_type: String(document.parseResult.value?.$type || 'Model'),
      },
    });
  } catch (err) {
    emit({ success: false, error: String(err?.stack || err), diagnostics: [] });
    process.exit(1);
  }
}

main();
