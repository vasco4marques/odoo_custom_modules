import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { $l as t, BE as n, FA as r, Fd as i, IA as a, Ix as o, Iy as s, PA as c, Pd as l, Qk as u, XE as d, dD as f, eA as p, eu as m, gD as h, hD as g, lx as _, uD as v } from "./standaloneServices-DUdtGggg.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/action/common/actionCommonCategories.js
var y, b = e((() => {
	u(), y = Object.freeze({
		View: p(1740, "View"),
		Help: p(1741, "Help"),
		Test: p(1742, "Test"),
		File: p(1743, "File"),
		Preferences: p(1744, "Preferences"),
		Developer: p(1745, "Developer")
	});
})), x, S = e((() => {
	i(), r(), x = a(l);
})), C, w = e((() => {
	r(), C = c("IUserDataInitializationService");
})), T, E = e((() => {
	r(), T = c("extensionsWorkbenchService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/editor/common/services/getIconClasses.js
function D(e, r, i, a, o) {
	if (t.isThemeIcon(o)) return [`codicon-${o.id}`, "predefined-file-icon"];
	if (g.isUri(o)) return [];
	let s = a === _.ROOT_FOLDER ? ["rootfolder-icon"] : a === _.FOLDER ? ["folder-icon"] : ["file-icon"];
	if (i) {
		let t;
		if (i.scheme === v.data) t = n.parseMetaData(i).get(n.META_DATA_LABEL);
		else {
			let e = i.path.match(j);
			e ? (t = A(e[2].toLowerCase()), e[1] && s.push(`${A(e[1].toLowerCase())}-name-dir-icon`)) : t = A(i.authority.toLowerCase());
		}
		if (a === _.ROOT_FOLDER) s.push(`${t}-root-name-folder-icon`);
		else if (a === _.FOLDER) s.push(`${t}-name-folder-icon`);
		else {
			if (t) {
				if (s.push(`${t}-name-file-icon`), s.push("name-file-icon"), t.length <= 255) {
					let e = t.split(".");
					for (let t = 1; t < e.length; t++) s.push(`${e.slice(t).join(".")}-ext-file-icon`);
				}
				s.push("ext-file-icon");
			}
			let n = k(e, r, i);
			n && s.push(`${A(n)}-lang-file-icon`);
		}
	}
	return s;
}
function O(e) {
	return ["file-icon", `${A(e)}-lang-file-icon`];
}
function k(e, t, r) {
	if (!r) return null;
	let i = null;
	if (r.scheme === v.data) {
		let e = n.parseMetaData(r).get(n.META_DATA_MIME);
		e && (i = t.getLanguageIdByMimeType(e));
	} else {
		let t = e.getModel(r);
		t && (i = t.getLanguageId());
	}
	return i && i !== "plaintext" ? i : t.guessLanguageIdByFilepathOrFirstLine(r);
}
function A(e) {
	return e.replace(/[\s]/g, "/");
}
var j, M = e((() => {
	f(), d(), h(), s(), o(), m(), j = /(?:\/|^)(?:([^\/]+)\/)?([^\/]+)$/;
}));
//#endregion
export { T as a, w as c, y as d, b as f, M as i, x as l, D as n, E as o, O as r, C as s, A as t, S as u };
