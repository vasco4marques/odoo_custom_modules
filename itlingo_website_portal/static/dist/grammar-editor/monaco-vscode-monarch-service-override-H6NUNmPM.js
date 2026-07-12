import { r as e } from "./rolldown-runtime-B1bRi_D7.js";
import { A as t, Aa as n, Ab as r, By as i, D as a, Gb as o, Hy as s, M as c, Ma as l, Mk as u, Na as d, Nk as f, O as p, Ob as m, Oy as h, Ry as g, TA as _, UD as v, Vx as y, XE as b, YD as x, aD as S, ax as C, bm as w, bv as T, cE as E, d_ as D, eD as O, fS as k, f_ as A, gv as j, iD as M, jy as N, k as P, kb as F, mA as I, nv as L, oE as R, p_ as z, qE as B, r as V, rD as H, rv as U, u_ as W, ux as G, vm as K, ym as q } from "./standaloneServices-C51B94Xh.js";
import { o as J, t as Y } from "./editorBrowser-Bcg0bJo7.js";
_(), f(), x(), S(), b(), R(), y(), r(), T(), U(), K(), d(), c(), p(), V();
var X = /* @__PURE__ */ e({});
J(), g(), D();
var Z;
E(X);
var Q = class extends I {
	static {
		Z = this;
	}
	static {
		this.ID = "editor.contrib.inspectTokens";
	}
	static get(e) {
		return e.getContribution(Z.ID);
	}
	constructor(e, t, n) {
		super(), this._editor = e, this._languageService = n, this._widget = null, this._register(this._editor.onDidChangeModel((e) => this.stop())), this._register(this._editor.onDidChangeModelLanguage((e) => this.stop())), this._register(B.onDidChange((e) => this.stop())), this._register(this._editor.onKeyUp((e) => e.keyCode === v.Escape && this.stop()));
	}
	dispose() {
		this.stop(), super.dispose();
	}
	launch() {
		this._widget || this._editor.hasModel() && (this._widget = new ne(this._editor, this._languageService));
	}
	stop() {
		this._widget &&= (this._widget.dispose(), null);
	}
};
Q = Z = m([F(1, a), F(2, L)], Q);
var $ = class extends h {
	constructor() {
		super({
			id: "editor.action.inspectTokens",
			label: n.inspectTokensAction,
			alias: "Developer: Inspect Tokens",
			precondition: void 0
		});
	}
	run(e, t) {
		Q.get(t)?.launch();
	}
};
function ee(e) {
	let t = "";
	for (let n = 0, r = e.length; n < r; n++) {
		let r = e.charCodeAt(n);
		switch (r) {
			case u.Tab:
				t += "→";
				break;
			case u.Space:
				t += "·";
				break;
			default: t += String.fromCharCode(r);
		}
	}
	return t;
}
function te(e, t) {
	let n = B.get(t);
	if (n) return n;
	let r = e.encodeLanguageId(t);
	return {
		getInitialState: () => W,
		tokenize: (e, n, r) => A(t, r),
		tokenizeEncoded: (e, t, n) => z(r, n)
	};
}
var ne = class e extends I {
	static {
		this._ID = "editor.contrib.inspectTokensWidget";
	}
	constructor(e, t) {
		super(), this.allowEditorOverflow = !0, this._editor = e, this._languageService = t, this._model = this._editor.getModel(), this._domNode = G("div"), this._domNode.className = "tokens-inspect-widget", this._tokenizationSupport = te(this._languageService.languageIdCodec, this._model.getLanguageId()), this._compute(this._editor.getPosition()), this._register(this._editor.onDidChangeCursorPosition((e) => this._compute(this._editor.getPosition()))), this._editor.addContentWidget(this);
	}
	dispose() {
		this._editor.removeContentWidget(this), super.dispose();
	}
	getId() {
		return e._ID;
	}
	_compute(e) {
		let t = this._getTokensAtLine(e.lineNumber), n = 0;
		for (let r = t.tokens1.length - 1; r >= 0; r--) {
			let i = t.tokens1[r];
			if (e.column - 1 >= i.offset) {
				n = r;
				break;
			}
		}
		let r = 0;
		for (let n = t.tokens2.length >>> 1; n >= 0; n--) if (e.column - 1 >= t.tokens2[n << 1]) {
			r = n;
			break;
		}
		let i = this._model.getLineContent(e.lineNumber), a = "";
		if (n < t.tokens1.length) {
			let e = t.tokens1[n].offset, r = n + 1 < t.tokens1.length ? t.tokens1[n + 1].offset : i.length;
			a = i.substring(e, r);
		}
		k(this._domNode, o("h2.tm-token", void 0, ee(a), o("span.tm-token-length", void 0, `${a.length} ${a.length === 1 ? "char" : "chars"}`))), C(this._domNode, o("hr.tokens-inspect-separator", { style: "clear:both" }));
		let s = (r << 1) + 1 < t.tokens2.length ? this._decodeMetadata(t.tokens2[(r << 1) + 1]) : null;
		C(this._domNode, o("table.tm-metadata-table", void 0, o("tbody", void 0, o("tr", void 0, o("td.tm-metadata-key", void 0, "language"), o("td.tm-metadata-value", void 0, `${s ? s.languageId : "-?-"}`)), o("tr", void 0, o("td.tm-metadata-key", void 0, "token type"), o("td.tm-metadata-value", void 0, `${s ? this._tokenTypeToString(s.tokenType) : "-?-"}`)), o("tr", void 0, o("td.tm-metadata-key", void 0, "font style"), o("td.tm-metadata-value", void 0, `${s ? this._fontStyleToString(s.fontStyle) : "-?-"}`)), o("tr", void 0, o("td.tm-metadata-key", void 0, "foreground"), o("td.tm-metadata-value", void 0, `${s ? j.Format.CSS.formatHex(s.foreground) : "-?-"}`)), o("tr", void 0, o("td.tm-metadata-key", void 0, "background"), o("td.tm-metadata-value", void 0, `${s ? j.Format.CSS.formatHex(s.background) : "-?-"}`))))), C(this._domNode, o("hr.tokens-inspect-separator")), n < t.tokens1.length && C(this._domNode, o("span.tm-token-type", void 0, t.tokens1[n].type)), this._editor.layoutContentWidget(this);
	}
	_decodeMetadata(e) {
		let t = B.getColorMap(), n = M.getLanguageId(e), r = M.getTokenType(e), i = M.getFontStyle(e), a = M.getForeground(e), o = M.getBackground(e);
		return {
			languageId: this._languageService.languageIdCodec.decodeLanguageId(n),
			tokenType: r,
			fontStyle: i,
			foreground: t[a],
			background: t[o]
		};
	}
	_tokenTypeToString(e) {
		switch (e) {
			case H.Other: return "Other";
			case H.Comment: return "Comment";
			case H.String: return "String";
			case H.RegEx: return "RegEx";
			default: return "??";
		}
	}
	_fontStyleToString(e) {
		let t = "";
		return e & O.Italic && (t += "italic "), e & O.Bold && (t += "bold "), e & O.Underline && (t += "underline "), e & O.Strikethrough && (t += "strikethrough "), t.length === 0 && (t = "---"), t;
	}
	_getTokensAtLine(e) {
		let t = this._getStateBeforeLine(e), n = this._tokenizationSupport.tokenize(this._model.getLineContent(e), !0, t), r = this._tokenizationSupport.tokenizeEncoded(this._model.getLineContent(e), !0, t);
		return {
			startState: t,
			tokens1: n.tokens,
			tokens2: r.tokens,
			endState: n.endState
		};
	}
	_getStateBeforeLine(e) {
		let t = this._tokenizationSupport.getInitialState();
		for (let n = 1; n < e; n++) t = this._tokenizationSupport.tokenize(this._model.getLineContent(n), !0, t).endState;
		return t;
	}
	getDomNode() {
		return this._domNode;
	}
	getPosition() {
		return {
			position: this._editor.getPosition(),
			preference: [Y.BELOW, Y.ABOVE]
		};
	}
};
s(Q.ID, Q, N.Lazy), i($), g(), p(), d(), i(class extends h {
	constructor() {
		super({
			id: "editor.action.toggleHighContrast",
			label: l.toggleHighContrast,
			alias: "Toggle High Contrast Theme",
			precondition: void 0
		}), this._originalThemeName = null;
	}
	run(e, n) {
		let r = e.get(a), i = r.getColorTheme();
		w(i.type) ? (r.setTheme(this._originalThemeName || (q(i.type) ? "vs-dark" : "vs")), this._originalThemeName = null) : (r.setTheme(q(i.type) ? P : t), this._originalThemeName = i.themeName);
	}
});
//#endregion
//#region node_modules/@codingame/monaco-vscode-monarch-service-override/index.js
function re() {
	return {};
}
//#endregion
export { re as default };
