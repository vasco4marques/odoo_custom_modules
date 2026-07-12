import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { Bb as t, zb as n } from "./standaloneServices-C51B94Xh.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/textMate/browser/textMateTokenizationFeature.service.js
var r, i = e((() => {
	t(), r = n("textMateTokenizationFeature");
})), a = "editor.semanticHighlighting";
function o(e, t, n) {
	let r = n.getValue(a, {
		overrideIdentifier: e.getLanguageId(),
		resource: e.uri
	})?.enabled;
	return typeof r == "boolean" ? r : t.getColorTheme().semanticHighlighting;
}
//#endregion
export { i, o as n, r, a as t };
