import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { Bw as t, Ew as n, FA as r, PA as i, Rw as a, cT as o, gT as s, hT as c, nj as l, oT as u, uj as d } from "./standaloneServices-DUdtGggg.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/editor/common/services/languageFeatures.service.js
var f, p = e((() => {
	r(), f = i("ILanguageFeaturesService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/observable/common/platformObservableUtils.js
function m(e, n, r, i = c.ofCaller()) {
	return t({ debugName: () => `Configuration Key "${e}"` }, (t) => r.onDidChangeConfiguration((n) => {
		n.affectsConfiguration(e) && t(n);
	}), () => r.getValue(e) ?? n, i);
}
function h(e, t, n, r = c.ofCaller()) {
	let i = e.bindTo(t), a = new l();
	return u({ debugName: () => `Set Context Key "${e.key}"` }, (e) => {
		let t = n(e);
		return i.set(t), t;
	}, r).recomputeInitiallyAndOnChange(a), a;
}
var g = e((() => {
	d(), n(), a(), s(), o();
}));
//#endregion
export { p as a, f as i, g as n, m as r, h as t };
