// src/parser.mjs
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { URI } from "langium";
import { createServicesForGrammar } from "langium/grammar";
function loadGrammar(grammarPath, seen = /* @__PURE__ */ new Set()) {
  const absolutePath = resolve(grammarPath);
  if (seen.has(absolutePath)) {
    throw new Error(`Circular grammar import: ${absolutePath}`);
  }
  seen.add(absolutePath);
  const baseDir = dirname(absolutePath);
  const grammar = readFileSync(absolutePath, "utf-8");
  const imports = [];
  const grammarWithoutImports = grammar.replace(
    /^(\s*)import\s+['"]([^'"]+)['"]\s*;?\s*$/gm,
    (_match, _indent, importedPath) => {
      const fileName = importedPath.endsWith(".langium") ? importedPath : `${importedPath}.langium`;
      imports.push(loadGrammar(resolve(baseDir, fileName), seen));
      return "";
    }
  );
  return [grammarWithoutImports, ...imports].join("\n");
}
function serializeValue(value, seen) {
  if (value && typeof value === "object" && typeof value.$refText === "string") {
    return { $ref: value.$refText };
  }
  if (Array.isArray(value)) {
    return value.map((item) => serializeValue(item, seen)).filter((item) => item !== void 0);
  }
  if (value && typeof value === "object") {
    return serializeAstNode(value, seen);
  }
  return value;
}
function serializeAstNode(node, seen = /* @__PURE__ */ new WeakSet()) {
  if (!node || typeof node !== "object") {
    return node;
  }
  if (seen.has(node)) {
    return void 0;
  }
  seen.add(node);
  const output = {};
  for (const [key, value] of Object.entries(node)) {
    if (key === "$container" || key === "$document" || key === "$cstNode" || key === "$refNode") {
      continue;
    }
    if (key === "$type") {
      output[key] = value;
      continue;
    }
    if (key.startsWith("$")) {
      continue;
    }
    output[key] = serializeValue(value, seen);
  }
  return output;
}
function countNodes(node) {
  if (!node || typeof node !== "object") {
    return 0;
  }
  let count = 1;
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        count += countNodes(item);
      }
    } else if (value && typeof value === "object") {
      count += countNodes(value);
    }
  }
  return count;
}
function collectShape(node, shape = { types: /* @__PURE__ */ new Set(), namedTypes: /* @__PURE__ */ new Set() }) {
  if (!node || typeof node !== "object") {
    return shape;
  }
  if (typeof node.$type === "string") {
    shape.types.add(node.$type);
    if (typeof node.name === "string" && node.name) {
      shape.namedTypes.add(node.$type);
    }
  }
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      value.forEach((item) => collectShape(item, shape));
    } else if (value && typeof value === "object") {
      collectShape(value, shape);
    }
  }
  return shape;
}
function emit(result) {
  process.stdout.write(JSON.stringify(result));
}
async function main() {
  const [grammarPath, sourcePath, labelArg, validationModeArg] = process.argv.slice(2);
  const label = labelArg || "DSL specification";
  const validationMode = validationModeArg || "all";
  if (!grammarPath || !sourcePath) {
    emit({ success: false, error: "Usage: parser.mjs <grammarPath> <sourcePath> [label] [validationMode]", diagnostics: [] });
    process.exit(2);
    return;
  }
  let grammar;
  let dslText;
  try {
    grammar = loadGrammar(grammarPath);
    dslText = readFileSync(sourcePath, "utf-8");
  } catch (err) {
    emit({ success: false, error: `Cannot read input files: ${String(err)}`, diagnostics: [] });
    process.exit(1);
    return;
  }
  if (!dslText.trim()) {
    emit({ success: false, error: `Empty ${label}`, diagnostics: [] });
    process.exit(1);
    return;
  }
  try {
    const services = await createServicesForGrammar({ grammar });
    const fileExtension = String(services.LanguageMetaData?.fileExtensions?.[0] || "dsl").replace(/^\./, "");
    const factory = services.shared.workspace.LangiumDocumentFactory;
    const document = factory.fromString(dslText, URI.parse(`memory:///input.${fileExtension}`));
    const validateSemantics = validationMode !== "syntax";
    await services.shared.workspace.DocumentBuilder.build([document], { validation: validateSemantics });
    const diagnostics = validateSemantics ? (document.diagnostics || []).map((d) => ({
      severity: d.severity,
      message: d.message,
      line: d.range?.start?.line ?? null,
      column: d.range?.start?.character ?? null
    })) : [];
    const parserErrors = (document.parseResult?.parserErrors || []).map((e) => ({
      severity: 1,
      message: e.message,
      line: e.token?.startLine ?? null,
      column: e.token?.startColumn ?? null
    }));
    const lexerErrors = (document.parseResult?.lexerErrors || []).map((e) => ({
      severity: 1,
      message: e.message,
      line: e.line ?? null,
      column: e.column ?? null
    }));
    const allDiagnostics = [...parserErrors, ...lexerErrors, ...diagnostics];
    const hasError = parserErrors.length > 0 || lexerErrors.length > 0 || allDiagnostics.some((d) => d.severity === 1);
    if (hasError) {
      emit({ success: false, error: `${label} has errors`, diagnostics: allDiagnostics });
      process.exit(1);
      return;
    }
    const ast = serializeAstNode(document.parseResult.value);
    const shape = collectShape(ast);
    emit({
      success: true,
      ast,
      diagnostics: allDiagnostics,
      ast_summary: {
        node_count: countNodes(ast),
        root_type: String(document.parseResult.value?.$type || "Model")
      },
      grammar_shape: {
        entry_type: String(document.parseResult.value?.$type || "Model"),
        observed_types: [...shape.types].sort(),
        named_types: [...shape.namedTypes].sort()
      }
    });
  } catch (err) {
    emit({ success: false, error: String(err?.stack || err), diagnostics: [] });
    process.exit(1);
  }
}
main();
