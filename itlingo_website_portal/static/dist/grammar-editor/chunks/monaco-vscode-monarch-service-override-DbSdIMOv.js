import { r as e } from "./rolldown-runtime-B1bRi_D7.js";
import { $A as t, B as n, Cb as r, DN as i, F as a, Gr as o, I as s, Ir as c, JO as l, Kf as u, L as d, Nr as f, ON as p, R as m, US as h, Ur as g, Yf as _, _y as v, av as y, cC as b, cf as x, df as S, fo as C, gy as w, hk as T, ho as E, hu as D, hy as O, iv as k, kN as A, lf as j, mo as M, my as N, ov as P, pu as F, qO as I, qr as L, r as R, rC as z, tv as B, uf as ee, uj as V, uw as H, wb as U, xk as W, xy as G, zC as K } from "./standaloneServices-DUdtGggg.js";
import { o as q, t as J } from "./editorBrowser-zJfFG23V.js";
A(), V(), W(), l(), K(), U(), G(), N(), P(), _(), F(), E(), n(), s(), R();
var Y = /* @__PURE__ */ e({});
q(), g(), j();
var X;
D(Y);
var Z = class extends t {
	static {
		X = this;
	}
	static {
		this.ID = "editor.contrib.inspectTokens";
	}
	static get(e) {
		return e.getContribution(X.ID);
	}
	constructor(e, t, n) {
		super(), this._editor = e, this._languageService = n, this._widget = null, this._register(this._editor.onDidChangeModel((e) => this.stop())), this._register(this._editor.onDidChangeModelLanguage((e) => this.stop())), this._register(u.onDidChange((e) => this.stop())), this._register(this._editor.onKeyUp((e) => e.keyCode === T.Escape && this.stop()));
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
Z = X = i([p(1, a), p(2, r)], Z);
var Q = class extends f {
	constructor() {
		super({
			id: "editor.action.inspectTokens",
			label: C.inspectTokensAction,
			alias: "Developer: Inspect Tokens",
			precondition: void 0
		});
	}
	run(e, t) {
		Z.get(t)?.launch();
	}
};
function $(e) {
	let t = "";
	for (let n = 0, r = e.length; n < r; n++) {
		let r = e.charCodeAt(n);
		switch (r) {
			case I.Tab:
				t += "→";
				break;
			case I.Space:
				t += "·";
				break;
			default: t += String.fromCharCode(r);
		}
	}
	return t;
}
function te(e, t) {
	let n = u.get(t);
	if (n) return n;
	let r = e.encodeLanguageId(t);
	return {
		getInitialState: () => x,
		tokenize: (e, n, r) => ee(t, r),
		tokenizeEncoded: (e, t, n) => S(r, n)
	};
}
var ne = class e extends t {
	static {
		this._ID = "editor.contrib.inspectTokensWidget";
	}
	constructor(e, t) {
		super(), this.allowEditorOverflow = !0, this._editor = e, this._languageService = t, this._model = this._editor.getModel(), this._domNode = b("div"), this._domNode.className = "tokens-inspect-widget", this._tokenizationSupport = te(this._languageService.languageIdCodec, this._model.getLanguageId()), this._compute(this._editor.getPosition()), this._register(this._editor.onDidChangeCursorPosition((e) => this._compute(this._editor.getPosition()))), this._editor.addContentWidget(this);
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
		H(this._domNode, h("h2.tm-token", void 0, $(a), h("span.tm-token-length", void 0, `${a.length} ${a.length === 1 ? "char" : "chars"}`))), z(this._domNode, h("hr.tokens-inspect-separator", { style: "clear:both" }));
		let o = (r << 1) + 1 < t.tokens2.length ? this._decodeMetadata(t.tokens2[(r << 1) + 1]) : null;
		z(this._domNode, h("table.tm-metadata-table", void 0, h("tbody", void 0, h("tr", void 0, h("td.tm-metadata-key", void 0, "language"), h("td.tm-metadata-value", void 0, `${o ? o.languageId : "-?-"}`)), h("tr", void 0, h("td.tm-metadata-key", void 0, "token type"), h("td.tm-metadata-value", void 0, `${o ? this._tokenTypeToString(o.tokenType) : "-?-"}`)), h("tr", void 0, h("td.tm-metadata-key", void 0, "font style"), h("td.tm-metadata-value", void 0, `${o ? this._fontStyleToString(o.fontStyle) : "-?-"}`)), h("tr", void 0, h("td.tm-metadata-key", void 0, "foreground"), h("td.tm-metadata-value", void 0, `${o ? v.Format.CSS.formatHex(o.foreground) : "-?-"}`)), h("tr", void 0, h("td.tm-metadata-key", void 0, "background"), h("td.tm-metadata-value", void 0, `${o ? v.Format.CSS.formatHex(o.background) : "-?-"}`))))), z(this._domNode, h("hr.tokens-inspect-separator")), n < t.tokens1.length && z(this._domNode, h("span.tm-token-type", void 0, t.tokens1[n].type)), this._editor.layoutContentWidget(this);
	}
	_decodeMetadata(e) {
		let t = u.getColorMap(), n = y.getLanguageId(e), r = y.getTokenType(e), i = y.getFontStyle(e), a = y.getForeground(e), o = y.getBackground(e);
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
			case k.Other: return "Other";
			case k.Comment: return "Comment";
			case k.String: return "String";
			case k.RegEx: return "RegEx";
			default: return "??";
		}
	}
	_fontStyleToString(e) {
		let t = "";
		return e & B.Italic && (t += "italic "), e & B.Bold && (t += "bold "), e & B.Underline && (t += "underline "), e & B.Strikethrough && (t += "strikethrough "), t.length === 0 && (t = "---"), t;
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
			preference: [J.BELOW, J.ABOVE]
		};
	}
};
L(Z.ID, Z, c.Lazy), o(Q), g(), s(), E(), o(class extends f {
	constructor() {
		super({
			id: "editor.action.toggleHighContrast",
			label: M.toggleHighContrast,
			alias: "Toggle High Contrast Theme",
			precondition: void 0
		}), this._originalThemeName = null;
	}
	run(e, t) {
		let n = e.get(a), r = n.getColorTheme();
		w(r.type) ? (n.setTheme(this._originalThemeName || (O(r.type) ? "vs-dark" : "vs")), this._originalThemeName = null) : (n.setTheme(O(r.type) ? d : m), this._originalThemeName = r.themeName);
	}
});
//#endregion
//#region node_modules/@codingame/monaco-vscode-monarch-service-override/index.js
function re() {
	return {};
}
//#endregion
export { re as default };
