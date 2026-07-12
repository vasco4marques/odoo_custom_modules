import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { BS as t, Bb as n, HS as r, OS as i, TA as a, _A as o, _C as s, cC as c, uC as l, vC as u, zb as d } from "./standaloneServices-C51B94Xh.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/editor/common/services/languageFeatures.service.js
var f, p = e((() => {
	n(), f = d("ILanguageFeaturesService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/observable/common/platformObservableUtils.js
function m(e, t, n, i = s.ofCaller()) {
	return r({ debugName: () => `Configuration Key "${e}"` }, (t) => n.onDidChangeConfiguration((n) => {
		n.affectsConfiguration(e) && t(n);
	}), () => n.getValue(e) ?? t, i);
}
function h(e, t, n, r = s.ofCaller()) {
	let i = e.bindTo(t), a = new o();
	return c({ debugName: () => `Set Context Key "${e.key}"` }, (e) => {
		let t = n(e);
		return i.set(t), t;
	}, r).recomputeInitiallyAndOnChange(a), a;
}
var g = e((() => {
	a(), i(), t(), u(), l();
}));
//#endregion
export { p as a, f as i, g as n, m as r, h as t };
