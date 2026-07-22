import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { FA as t, IA as n, JO as r, Nb as i, Pb as a, dD as o, gD as s, hD as c, qO as l, uD as u } from "./standaloneServices-DUdtGggg.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/contrib/webview/common/webview.js
function d(e, t) {
	return e.scheme === u.http || e.scheme === u.https ? e : (t && t.authority && t.isRemote && e.scheme === u.file && (e = c.from({
		scheme: u.vscodeRemote,
		authority: t.authority,
		path: e.path
	})), c.from({
		scheme: u.https,
		authority: `${e.scheme}+${f(e.authority)}.${h}`,
		path: e.path,
		fragment: e.fragment,
		query: e.query
	}));
}
function f(e) {
	return e.replace(/./g, (e) => {
		let t = e.charCodeAt(0);
		return t >= l.a && t <= l.z || t >= l.A && t <= l.Z || t >= l.Digit0 && t <= l.Digit9 ? e : "-" + t.toString(16).padStart(4, "0");
	});
}
function p(e) {
	return e.replace(/-([0-9a-f]{4})/g, (e, t) => String.fromCharCode(parseInt(t, 16)));
}
var m, h, g, _ = e((() => {
	r(), o(), s(), m = "vscode-cdn.net", h = `vscode-resource.${m}`, g = `'self' https://*.${m}`;
}));
a(), t();
var v = n(i);
//#endregion
export { g as a, _ as i, d as n, h as o, p as r, v as t };
