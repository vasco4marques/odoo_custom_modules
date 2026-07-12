import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { Bb as t, Dj as n, Dl as r, Ds as i, El as a, Hw as o, Qw as s, Tj as c, Vb as l, __ as u, bb as d, ec as f, fT as p, pT as m, vD as h, xb as g, yD as _, zb as v } from "./standaloneServices-C51B94Xh.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/contrib/extensions/common/extensions.service.js
var y, b = e((() => {
	t(), y = v("extensionsWorkbenchService");
})), x, S = e((() => {
	t(), x = v("IUserDataInitializationService");
})), C, w = e((() => {
	c(), C = Object.freeze({
		View: n(1740, "View"),
		Help: n(1741, "Help"),
		Test: n(1742, "Test"),
		File: n(1743, "File"),
		Preferences: n(1744, "Preferences"),
		Developer: n(1745, "Developer")
	});
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/editor/common/services/getIconClasses.js
function T(e, t, n, r, a) {
	if (d.isThemeIcon(a)) return [`codicon-${a.id}`, "predefined-file-icon"];
	if (h.isUri(a)) return [];
	let s = r === i.ROOT_FOLDER ? ["rootfolder-icon"] : r === i.FOLDER ? ["folder-icon"] : ["file-icon"];
	if (n) {
		let a;
		if (n.scheme === p.data) a = o.parseMetaData(n).get(o.META_DATA_LABEL);
		else {
			let e = n.path.match(k);
			e ? (a = O(e[2].toLowerCase()), e[1] && s.push(`${O(e[1].toLowerCase())}-name-dir-icon`)) : a = O(n.authority.toLowerCase());
		}
		if (r === i.ROOT_FOLDER) s.push(`${a}-root-name-folder-icon`);
		else if (r === i.FOLDER) s.push(`${a}-name-folder-icon`);
		else {
			if (a) {
				if (s.push(`${a}-name-file-icon`), s.push("name-file-icon"), a.length <= 255) {
					let e = a.split(".");
					for (let t = 1; t < e.length; t++) s.push(`${e.slice(t).join(".")}-ext-file-icon`);
				}
				s.push("ext-file-icon");
			}
			let r = D(e, t, n);
			r && s.push(`${O(r)}-lang-file-icon`);
		}
	}
	return s;
}
function E(e) {
	return ["file-icon", `${O(e)}-lang-file-icon`];
}
function D(e, t, n) {
	if (!n) return null;
	let r = null;
	if (n.scheme === p.data) {
		let e = o.parseMetaData(n).get(o.META_DATA_MIME);
		e && (r = t.getLanguageIdByMimeType(e));
	} else {
		let t = e.getModel(n);
		t && (r = t.getLanguageId());
	}
	return r && r !== "plaintext" ? r : t.guessLanguageIdByFilepathOrFirstLine(n);
}
function O(e) {
	return e.replace(/[\s]/g, "/");
}
var k, A = e((() => {
	m(), s(), _(), u(), f(), g(), k = /(?:\/|^)(?:([^\/]+)\/)?([^\/]+)$/;
})), j, M = e((() => {
	r(), t(), j = l(a);
}));
//#endregion
export { E as a, w as c, y as d, b as f, T as i, x as l, M as n, A as o, O as r, C as s, j as t, S as u };
