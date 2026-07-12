import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { AA as t, Bb as n, DD as r, Sa as i, TA as a, ba as o, iy as s, oy as c, sA as l, tA as u, wD as d, zb as f } from "./standaloneServices-C51B94Xh.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/editor/common/languageSelector.js
function p(e, t, n, a, o, s) {
	if (Array.isArray(e)) {
		let r = 0;
		for (let i of e) {
			let e = p(i, t, n, a, o, s);
			if (e === 10) return e;
			e > r && (r = e);
		}
		return r;
	} else if (typeof e == "string") return a ? e === "*" ? 5 : e === n ? 10 : 0 : 0;
	else if (e) {
		let { language: c, pattern: l, scheme: u, hasAccessToAllModels: d, notebookType: f } = e;
		if (!a && !d) return 0;
		f && o && (t = o);
		let p = 0;
		if (u) if (u === t.scheme) p = 10;
		else if (u === "*") p = 5;
		else return 0;
		if (c) if (c === n) p = 10;
		else if (c === "*") p = Math.max(p, 5);
		else return 0;
		if (f) if (f === s) p = 10;
		else if (f === "*" && s !== void 0) p = Math.max(p, 5);
		else return 0;
		if (l) {
			let e;
			if (e = typeof l == "string" ? l : {
				...l,
				base: r(l.base)
			}, e === t.fsPath || i(e, t.fsPath)) p = 10;
			else return 0;
		}
		return p;
	} else return 0;
}
function m(e) {
	return typeof e == "string" ? !1 : Array.isArray(e) ? e.some(m) : !!e.notebookType;
}
var h = e((() => {
	o(), d();
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/editor/common/languageFeatureRegistry.js
function g(e) {
	return typeof e == "string" ? !1 : Array.isArray(e) ? e.every(g) : !!e.exclusive;
}
function _(e) {
	return typeof e == "string" ? !1 : Array.isArray(e) ? e.some(_) : !!e.isBuiltin;
}
var v, y, b = e((() => {
	l(), a(), s(), h(), v = class {
		constructor(e, t, n, r, i) {
			this.uri = e, this.languageId = t, this.notebookUri = n, this.notebookType = r, this.recursive = i;
		}
		equals(e) {
			return this.notebookType === e.notebookType && this.languageId === e.languageId && this.uri.toString() === e.uri.toString() && this.notebookUri?.toString() === e.notebookUri?.toString() && this.recursive === e.recursive;
		}
	}, y = class e {
		get onDidChange() {
			return this._onDidChange.event;
		}
		constructor(e) {
			this._notebookInfoResolver = e, this._clock = 0, this._entries = [], this._onDidChange = new u();
		}
		register(e, n) {
			let r = {
				selector: e,
				provider: n,
				_score: -1,
				_time: this._clock++
			};
			return this._entries.push(r), this._lastCandidate = void 0, this._onDidChange.fire(this._entries.length), t(() => {
				if (r) {
					let e = this._entries.indexOf(r);
					e >= 0 && (this._entries.splice(e, 1), this._lastCandidate = void 0, this._onDidChange.fire(this._entries.length), r = void 0);
				}
			});
		}
		has(e) {
			return this.all(e).length > 0;
		}
		all(e) {
			if (!e) return [];
			this._updateScores(e, !1);
			let t = [];
			for (let e of this._entries) e._score > 0 && t.push(e.provider);
			return t;
		}
		allNoModel() {
			return this._entries.map((e) => e.provider);
		}
		ordered(e, t = !1) {
			let n = [];
			return this._orderedForEach(e, t, (e) => n.push(e.provider)), n;
		}
		orderedGroups(e) {
			let t = [], n, r;
			return this._orderedForEach(e, !1, (e) => {
				n && r === e._score ? n.push(e.provider) : (r = e._score, n = [e.provider], t.push(n));
			}), t;
		}
		_orderedForEach(e, t, n) {
			this._updateScores(e, t);
			for (let e of this._entries) e._score > 0 && n(e);
		}
		_updateScores(t, n) {
			let r = this._notebookInfoResolver?.(t.uri), i = r ? new v(t.uri, t.getLanguageId(), r.uri, r.type, n) : new v(t.uri, t.getLanguageId(), void 0, void 0, n);
			if (!this._lastCandidate?.equals(i)) {
				this._lastCandidate = i;
				for (let e of this._entries) if (e._score = p(e.selector, i.uri, i.languageId, c(t), i.notebookUri, i.notebookType), g(e.selector) && e._score > 0) if (n) e._score = 0;
				else {
					for (let e of this._entries) e._score = 0;
					e._score = 1e3;
					break;
				}
				this._entries.sort(e._compareByScoreAndTime);
			}
		}
		static _compareByScoreAndTime(e, t) {
			return e._score < t._score ? 1 : e._score > t._score ? -1 : _(e.selector) && !_(t.selector) ? 1 : !_(e.selector) && _(t.selector) ? -1 : e._time < t._time ? 1 : e._time > t._time ? -1 : 0;
		}
	};
})), x, S = e((() => {
	n(), x = f("ILanguageStatusService");
}));
//#endregion
export { h as a, b as i, S as n, p as o, y as r, m as s, x as t };
