import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { BA as t, Dd as n, FA as r, IO as i, KA as a, NO as o, PA as s, dS as c, hj as l, kd as u, pS as d, uj as f } from "./standaloneServices-DUdtGggg.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/editor/common/languageSelector.js
function p(e, t, n, r, a, o) {
	if (Array.isArray(e)) {
		let i = 0;
		for (let s of e) {
			let e = p(s, t, n, r, a, o);
			if (e === 10) return e;
			e > i && (i = e);
		}
		return i;
	} else if (typeof e == "string") return r ? e === "*" ? 5 : e === n ? 10 : 0 : 0;
	else if (e) {
		let { language: s, pattern: c, scheme: l, hasAccessToAllModels: d, notebookType: f } = e;
		if (!r && !d) return 0;
		f && a && (t = a);
		let p = 0;
		if (l) if (l === t.scheme) p = 10;
		else if (l === "*") p = 5;
		else return 0;
		if (s) if (s === n) p = 10;
		else if (s === "*") p = Math.max(p, 5);
		else return 0;
		if (f) if (f === o) p = 10;
		else if (f === "*" && o !== void 0) p = Math.max(p, 5);
		else return 0;
		if (c) {
			let e;
			if (e = typeof c == "string" ? c : {
				...c,
				base: i(c.base)
			}, e === t.fsPath || u(e, t.fsPath)) p = 10;
			else return 0;
		}
		return p;
	} else return 0;
}
function m(e) {
	return typeof e == "string" ? !1 : Array.isArray(e) ? e.some(m) : !!e.notebookType;
}
var h = e((() => {
	n(), o();
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
	a(), f(), c(), h(), v = class {
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
			this._notebookInfoResolver = e, this._clock = 0, this._entries = [], this._onDidChange = new t();
		}
		register(e, t) {
			let n = {
				selector: e,
				provider: t,
				_score: -1,
				_time: this._clock++
			};
			return this._entries.push(n), this._lastCandidate = void 0, this._onDidChange.fire(this._entries.length), l(() => {
				if (n) {
					let e = this._entries.indexOf(n);
					e >= 0 && (this._entries.splice(e, 1), this._lastCandidate = void 0, this._onDidChange.fire(this._entries.length), n = void 0);
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
				for (let e of this._entries) if (e._score = p(e.selector, i.uri, i.languageId, d(t), i.notebookUri, i.notebookType), g(e.selector) && e._score > 0) if (n) e._score = 0;
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
	r(), x = s("ILanguageStatusService");
}));
//#endregion
export { h as a, b as i, S as n, p as o, y as r, m as s, x as t };
