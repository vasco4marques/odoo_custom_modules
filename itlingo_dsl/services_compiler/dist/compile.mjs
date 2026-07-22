// src/compile.mjs
import path from "node:path";
import { build, version as esbuildVersion } from "esbuild";
var LANGIUM_VERSION = "4.3.1";
var BUNDLE_VERSION = "1.0.0";
var COMPILER_VERSION = `esbuild ${esbuildVersion} / langium ${LANGIUM_VERSION} / compiler ${BUNDLE_VERSION}`;
function output(payload) {
  process.stdout.write(JSON.stringify(payload));
}
function diagnosticLocation(location, workspacePath) {
  if (!location) {
    return {
      path: "",
      line: 1,
      column: 1
    };
  }
  const sourcePath = location.file ? path.relative(workspacePath, path.resolve(workspacePath, location.file)) : "";
  return {
    path: sourcePath.split(path.sep).join("/"),
    line: location.line || 1,
    // esbuild columns are zero-based; editor/LSP diagnostics are one-based.
    column: (location.column ?? 0) + 1,
    length: location.length || 0,
    lineText: location.lineText || "",
    suggestion: location.suggestion || ""
  };
}
function normalizeDiagnostic(message, severity, workspacePath) {
  return {
    severity,
    message: message.text || String(message),
    ...diagnosticLocation(message.location, workspacePath),
    code: message.id || "esbuild"
  };
}
async function main() {
  const workspacePath = process.argv[2];
  const entryRelativePath = process.argv[3];
  if (!workspacePath || !entryRelativePath) {
    output({
      ok: false,
      js: "",
      diagnostics: [{
        severity: "error",
        message: "Usage: node compile.mjs <workspacePath> <entryRelativePath>",
        path: "",
        line: 1,
        column: 1,
        code: "usage"
      }],
      compilerVersion: COMPILER_VERSION
    });
    process.exitCode = 2;
    return;
  }
  const absoluteWorkspace = path.resolve(workspacePath);
  const entryPath = path.resolve(absoluteWorkspace, entryRelativePath);
  const relativeEntry = path.relative(absoluteWorkspace, entryPath);
  if (relativeEntry.startsWith("..") || path.isAbsolute(relativeEntry)) {
    output({
      ok: false,
      js: "",
      diagnostics: [{
        severity: "error",
        message: "The services entry must be inside the workspace.",
        path: entryRelativePath,
        line: 1,
        column: 1,
        code: "invalid-entry"
      }],
      compilerVersion: COMPILER_VERSION
    });
    process.exitCode = 2;
    return;
  }
  try {
    const result = await build({
      absWorkingDir: absoluteWorkspace,
      entryPoints: [entryPath],
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node18",
      external: ["langium", "vscode-languageserver-types"],
      write: false,
      logLevel: "silent",
      charset: "utf8",
      legalComments: "none"
    });
    const javascript = result.outputFiles.find(
      (file) => file.path === "<stdout>" || file.path.endsWith(".js")
    );
    const diagnostics = result.warnings.map(
      (warning) => normalizeDiagnostic(warning, "warning", absoluteWorkspace)
    );
    output({
      ok: true,
      js: javascript?.text || "",
      diagnostics,
      compilerVersion: COMPILER_VERSION
    });
  } catch (error) {
    const errors = Array.isArray(error?.errors) ? error.errors : [];
    const warnings = Array.isArray(error?.warnings) ? error.warnings : [];
    const diagnostics = [
      ...errors.map(
        (item) => normalizeDiagnostic(item, "error", absoluteWorkspace)
      ),
      ...warnings.map(
        (item) => normalizeDiagnostic(item, "warning", absoluteWorkspace)
      )
    ];
    if (!diagnostics.length) {
      diagnostics.push({
        severity: "error",
        message: error?.message || String(error),
        path: entryRelativePath,
        line: 1,
        column: 1,
        code: "esbuild"
      });
    }
    output({
      ok: false,
      js: "",
      diagnostics,
      compilerVersion: COMPILER_VERSION
    });
    process.exitCode = 1;
  }
}
main().catch((error) => {
  output({
    ok: false,
    js: "",
    diagnostics: [{
      severity: "error",
      message: error?.message || String(error),
      path: "",
      line: 1,
      column: 1,
      code: "services-compiler"
    }],
    compilerVersion: COMPILER_VERSION
  });
  process.exitCode = 1;
});
