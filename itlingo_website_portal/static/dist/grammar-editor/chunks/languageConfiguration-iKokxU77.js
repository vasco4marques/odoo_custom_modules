import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { JO as t, iv as n, ov as r, qO as i } from "./standaloneServices-DUdtGggg.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/editor/common/languages/languageConfiguration.js
function a(e, t, n) {
	e.has(t) ? e.get(t).push(n) : e.set(t, [n]);
}
var o, s, c, l = e((() => {
	t(), r(), (function(e) {
		e[e.None = 0] = "None", e[e.Indent = 1] = "Indent", e[e.IndentOutdent = 2] = "IndentOutdent", e[e.Outdent = 3] = "Outdent";
	})(o ||= {}), s = class {
		constructor(e) {
			if (this._neutralCharacter = null, this._neutralCharacterSearched = !1, this.open = e.open, this.close = e.close, this._inString = !0, this._inComment = !0, this._inRegEx = !0, Array.isArray(e.notIn)) for (let t = 0, n = e.notIn.length; t < n; t++) switch (e.notIn[t]) {
				case "string":
					this._inString = !1;
					break;
				case "comment":
					this._inComment = !1;
					break;
				case "regex":
					this._inRegEx = !1;
					break;
			}
		}
		isOK(e) {
			switch (e) {
				case n.Other: return !0;
				case n.Comment: return this._inComment;
				case n.String: return this._inString;
				case n.RegEx: return this._inRegEx;
			}
		}
		shouldAutoClose(e, t) {
			if (e.getTokenCount() === 0) return !0;
			let n = e.findTokenIndexAtOffset(t - 2), r = e.getStandardTokenType(n);
			return this.isOK(r);
		}
		_findNeutralCharacterInRange(e, t) {
			for (let n = e; n <= t; n++) {
				let e = String.fromCharCode(n);
				if (!this.open.includes(e) && !this.close.includes(e)) return e;
			}
			return null;
		}
		findNeutralCharacter() {
			return this._neutralCharacterSearched || (this._neutralCharacterSearched = !0, this._neutralCharacter ||= this._findNeutralCharacterInRange(i.Digit0, i.Digit9), this._neutralCharacter ||= this._findNeutralCharacterInRange(i.a, i.z), this._neutralCharacter ||= this._findNeutralCharacterInRange(i.A, i.Z)), this._neutralCharacter;
		}
	}, c = class {
		constructor(e) {
			this.autoClosingPairsOpenByStart = /* @__PURE__ */ new Map(), this.autoClosingPairsOpenByEnd = /* @__PURE__ */ new Map(), this.autoClosingPairsCloseByStart = /* @__PURE__ */ new Map(), this.autoClosingPairsCloseByEnd = /* @__PURE__ */ new Map(), this.autoClosingPairsCloseSingleChar = /* @__PURE__ */ new Map();
			for (let t of e) a(this.autoClosingPairsOpenByStart, t.open.charAt(0), t), a(this.autoClosingPairsOpenByEnd, t.open.charAt(t.open.length - 1), t), a(this.autoClosingPairsCloseByStart, t.close.charAt(0), t), a(this.autoClosingPairsCloseByEnd, t.close.charAt(t.close.length - 1), t), t.close.length === 1 && t.open.length === 1 && a(this.autoClosingPairsCloseSingleChar, t.close, t);
		}
	};
}));
//#endregion
export { l as i, o as n, s as r, c as t };
