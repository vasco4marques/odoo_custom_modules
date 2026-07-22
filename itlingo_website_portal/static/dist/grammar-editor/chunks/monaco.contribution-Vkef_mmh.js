import { r as e } from "./rolldown-runtime-B1bRi_D7.js";
import { $A as t, $g as n, $k as r, $v as i, A as a, AA as o, Ai as s, Ar as c, CM as l, C_ as u, Cb as d, Cj as f, DN as p, Dc as ee, Ef as m, Ew as h, F as g, FA as _, Fr as v, Fw as y, Gf as b, Gl as te, Gs as ne, HD as re, Hv as ie, Hw as ae, I as oe, Ih as se, Iy as ce, Jh as le, KA as ue, Kf as x, Kl as de, Ks as fe, Kw as S, LC as C, Lc as pe, MA as me, MC as he, Nb as ge, Ny as _e, OA as ve, ON as w, Of as ye, Pb as be, Pf as xe, Ps as Se, QM as Ce, Qk as we, Rc as Te, Rw as Ee, SA as De, Sb as Oe, TA as ke, Tc as Ae, Ts as je, Ug as Me, Ur as Ne, Us as Pe, Uw as T, VA as Fe, Vs as Ie, Vu as Le, Vw as Re, WM as ze, Ws as Be, Wv as Ve, Xl as He, Xv as Ue, Xw as E, Yf as D, Yh as We, Yl as Ge, Yv as Ke, Yw as O, ZD as qe, Zl as Je, Zv as Ye, _h as Xe, _y as Ze, aA as Qe, cT as $e, cf as et, d as tt, dS as nt, df as rt, dh as it, du as at, eS as ot, ev as st, ey as ct, f as lt, fM as ut, fh as dt, fs as ft, fu as pt, gD as mt, gO as ht, hD as gt, hj as _t, hs as vt, hu as yt, hv as bt, hw as xt, id as St, ip as Ct, ir as wt, jA as Tt, jM as Et, jj as Dt, jr as Ot, jw as kt, k as At, kN as jt, kc as Mt, l as Nt, lA as Pt, lS as Ft, l_ as It, lf as Lt, lh as Rt, lr as zt, mN as Bt, ms as Vt, n as k, nN as Ht, nT as Ut, ni as Wt, nj as Gt, nv as Kt, ov as qt, ph as Jt, pu as Yt, qf as Xt, qw as Zt, r as Qt, rT as A, rd as j, rv as M, sp as $t, t as en, tT as tn, ti as N, tv as nn, ty as rn, u as an, uf as on, ug as sn, uj as P, vO as cn, vv as ln, wA as un, wb as dn, wi as fn, xb as F, xy as pn, y_ as mn, yh as hn, ys as I, zC as gn, zf as _n, zu as L, zw as vn } from "./standaloneServices-DUdtGggg.js";
import { Aa as yn, Cn as bn, Cr as xn, Di as Sn, Hr as Cn, Oi as wn, On as Tn, Ur as En, da as Dn, ja as On, jr as kn, kn as An, li as R, pa as jn, ua as Mn, ui as Nn, xn as Pn } from "./embeddedCodeEditorWidget-DPX_ivX-.js";
import { d as Fn, f as In, h as Ln, m as Rn, u as zn } from "./fileConstants-3FE16HF_.js";
import { a as Bn, i as z } from "./platformObservableUtils-CuEWfyFX.js";
import { Uf as Vn, Wf as Hn } from "./monaco-vscode-extensions-service-override-DXU-yJ4u.js";
import { $n as Un, An as Wn, Bn as Gn, Cn as Kn, Dn as qn, En as Jn, Fn as Yn, Gn as Xn, Hn as Zn, In as Qn, Jn as $n, Kn as er, Ln as tr, Mn as nr, Nn as rr, On as ir, Pn as ar, Qn as or, Rn as sr, Tn as cr, Un as lr, Vn as ur, Wn as dr, Xn as fr, Yn as pr, Zn as mr, ar as hr, cr as gr, dr as _r, er as vr, fr as yr, gn as br, hn as xr, hr as Sr, ir as Cr, jn as wr, kn as Tr, lr as Er, mn as Dr, mr as Or, nr as kr, or as Ar, pr as jr, qn as Mr, r as Nr, rr as Pr, sr as Fr, tr as Ir, ur as Lr, wn as Rr, zn as zr } from "./services-Bnks5LpF.js";
import { i as Br, n as Vr, r as Hr, t as Ur } from "./monaco-BhqF1Hm6.js";
Bt(), Ce(), l(), P(), ue(), De(), we(), qe(), mt(), rn(), i(), it(), D(), Yt(), Je(), fe(), Be(), Se(), Sr(), Rr();
var Wr = /* @__PURE__ */ e({});
jt(), f(), _(), Tt(), Pt(), $e(), Ut(), Zt(), ae(), Ee(), kt(), h(), gn(), Oe(), St(), Le(), Te(), Mt(), Ne(), On(), br();
function Gr(e, t, n) {
	return new Kr(e, t, n);
}
var Kr = class extends xr {
	constructor(e, t, n) {
		super(n.worker, n.keepIdleModels || !1, e, t), this._foreignModuleHost = n.host || null, this._foreignProxy = this._getProxy().then((e) => new Proxy({}, { get(t, n, r) {
			if (n !== "then") {
				if (typeof n != "string") throw Error("Not supported");
				if (n !== "then") return (...t) => e.$fmr(n, t);
			}
		} }));
	}
	fhr(e, t) {
		if (!this._foreignModuleHost || typeof this._foreignModuleHost[e] != "function") return Promise.reject(/* @__PURE__ */ Error("Missing method " + e + " or missing main thread foreign host."));
		try {
			return Promise.resolve(this._foreignModuleHost[e].apply(this._foreignModuleHost, t));
		} catch (e) {
			return Promise.reject(e);
		}
	}
	getProxy() {
		return this._foreignProxy;
	}
	withSyncedResources(e) {
		return this.workerWithSyncedResources(e).then((e) => this.getProxy());
	}
};
ve(), nt(), dn(), ce(), Ue(), Ve(), qt(), $t(), Lt(), lt(), an(), Dn(), Nn(), Bn();
var B;
(function(e) {
	e[e.None = 0] = "None", e[e.Open = 1] = "Open", e[e.Close = -1] = "Close";
})(B ||= {});
function qr(e) {
	return Array.isArray(e);
}
function Jr(e) {
	return !qr(e);
}
function Yr(e) {
	return typeof e == "string";
}
function Xr(e) {
	return !Yr(e);
}
function V(e) {
	return !e;
}
function H(e, t) {
	return e.ignoreCase && t ? t.toLowerCase() : t;
}
function Zr(e) {
	return e.replace(/[&<>'"_]/g, "-");
}
function Qr(e, t) {
	console.log(`${e.languageId}: ${t}`);
}
function U(e, t) {
	return /* @__PURE__ */ Error(`${e.languageId}: ${t}`);
}
function W(e, t, n, r, i) {
	let a = /\$((\$)|(#)|(\d\d?)|[sS](\d\d?)|@(\w+))/g, o = null;
	return t.replace(a, function(t, a, s, c, l, u, d, f, p) {
		return V(s) ? V(c) ? !V(l) && l < r.length ? H(e, r[l]) : !V(d) && e && typeof e[d] == "string" ? e[d] : (o === null && (o = i.split("."), o.unshift(i)), !V(u) && u < o.length ? H(e, o[u]) : "") : H(e, n) : "$";
	});
}
function $r(e, t, n) {
	let r = /\$[sS](\d\d?)/g, i = null;
	return t.replace(r, function(t, r) {
		return i === null && (i = n.split("."), i.unshift(n)), !V(r) && r < i.length ? re(H(e, i[r])) : "";
	});
}
function ei(e, t) {
	let n = t;
	for (; n && n.length > 0;) {
		let t = e.tokenizer[n];
		if (t) return t;
		let r = n.lastIndexOf(".");
		n = r < 0 ? null : n.substr(0, r);
	}
	return null;
}
function ti(e, t) {
	let n = t;
	for (; n && n.length > 0;) {
		if (e.stateNames[n]) return !0;
		let t = n.lastIndexOf(".");
		n = t < 0 ? null : n.substr(0, t);
	}
	return !1;
}
//#endregion
//#region node_modules/@codingame/monaco-vscode-editor-api/vscode/src/vs/editor/standalone/common/monarch/monarchLexer.js
be();
var ni, ri = 5, ii = class e {
	static {
		this._INSTANCE = new e(ri);
	}
	static create(e, t) {
		return this._INSTANCE.create(e, t);
	}
	constructor(e) {
		this._maxCacheDepth = e, this._entries = Object.create(null);
	}
	create(e, t) {
		if (e !== null && e.depth >= this._maxCacheDepth) return new G(e, t);
		let n = G.getStackElementId(e);
		n.length > 0 && (n += "|"), n += t;
		let r = this._entries[n];
		return r || (r = new G(e, t), this._entries[n] = r, r);
	}
}, G = class e {
	constructor(e, t) {
		this.parent = e, this.state = t, this.depth = (this.parent ? this.parent.depth : 0) + 1;
	}
	static getStackElementId(e) {
		let t = "";
		for (; e !== null;) t.length > 0 && (t += "|"), t += e.state, e = e.parent;
		return t;
	}
	static _equals(e, t) {
		for (; e !== null && t !== null;) {
			if (e === t) return !0;
			if (e.state !== t.state) return !1;
			e = e.parent, t = t.parent;
		}
		return e === null && t === null;
	}
	equals(t) {
		return e._equals(this, t);
	}
	push(e) {
		return ii.create(this, e);
	}
	pop() {
		return this.parent;
	}
	popall() {
		let e = this;
		for (; e.parent;) e = e.parent;
		return e;
	}
	switchTo(e) {
		return ii.create(this.parent, e);
	}
}, K = class e {
	constructor(e, t) {
		this.languageId = e, this.state = t;
	}
	equals(e) {
		return this.languageId === e.languageId && this.state.equals(e.state);
	}
	clone() {
		return this.state.clone() === this.state ? this : new e(this.languageId, this.state);
	}
}, q = class e {
	static {
		this._INSTANCE = new e(ri);
	}
	static create(e, t) {
		return this._INSTANCE.create(e, t);
	}
	constructor(e) {
		this._maxCacheDepth = e, this._entries = Object.create(null);
	}
	create(e, t) {
		if (t !== null || e !== null && e.depth >= this._maxCacheDepth) return new ai(e, t);
		let n = G.getStackElementId(e), r = this._entries[n];
		return r || (r = new ai(e, null), this._entries[n] = r, r);
	}
}, ai = class e {
	constructor(e, t) {
		this.stack = e, this.embeddedLanguageData = t;
	}
	clone() {
		return (this.embeddedLanguageData ? this.embeddedLanguageData.clone() : null) === this.embeddedLanguageData ? this : q.create(this.stack, this.embeddedLanguageData);
	}
	equals(t) {
		return !(t instanceof e) || !this.stack.equals(t.stack) ? !1 : this.embeddedLanguageData === null && t.embeddedLanguageData === null ? !0 : this.embeddedLanguageData === null || t.embeddedLanguageData === null ? !1 : this.embeddedLanguageData.equals(t.embeddedLanguageData);
	}
}, oi = class {
	constructor() {
		this._tokens = [], this._languageId = null, this._lastTokenType = null, this._lastTokenLanguage = null;
	}
	enterLanguage(e) {
		this._languageId = e;
	}
	emit(e, t) {
		this._lastTokenType === t && this._lastTokenLanguage === this._languageId || (this._lastTokenType = t, this._lastTokenLanguage = this._languageId, this._tokens.push(new b(e, t, this._languageId)));
	}
	nestedLanguageTokenize(e, t, n, r) {
		let i = n.languageId, a = n.state, o = x.get(i);
		if (!o) return this.enterLanguage(i), this.emit(r, ""), a;
		let s = o.tokenize(e, t, a);
		if (r !== 0) for (let e of s.tokens) this._tokens.push(new b(e.offset + r, e.type, e.language));
		else this._tokens = this._tokens.concat(s.tokens);
		return this._lastTokenType = null, this._lastTokenLanguage = null, this._languageId = null, s.endState;
	}
	finalize(e) {
		return new Xt(this._tokens, e);
	}
}, si = class e {
	constructor(e, t) {
		this._languageService = e, this._theme = t, this._prependTokens = null, this._tokens = [], this._currentLanguageId = Kt.Null, this._lastTokenMetadata = 0;
	}
	enterLanguage(e) {
		this._currentLanguageId = this._languageService.languageIdCodec.encodeLanguageId(e);
	}
	emit(e, t) {
		let n = this._theme.match(this._currentLanguageId, t) | M.BALANCED_BRACKETS_MASK;
		this._lastTokenMetadata !== n && (this._lastTokenMetadata = n, this._tokens.push(e), this._tokens.push(n));
	}
	static _merge(e, t, n) {
		let r = e === null ? 0 : e.length, i = t.length, a = n === null ? 0 : n.length;
		if (r === 0 && i === 0 && a === 0) return /* @__PURE__ */ new Uint32Array();
		if (r === 0 && i === 0) return n;
		if (i === 0 && a === 0) return e;
		let o = new Uint32Array(r + i + a);
		e !== null && o.set(e);
		for (let e = 0; e < i; e++) o[r + e] = t[e];
		return n !== null && o.set(n, r + i), o;
	}
	nestedLanguageTokenize(t, n, r, i) {
		let a = r.languageId, o = r.state, s = x.get(a);
		if (!s) return this.enterLanguage(a), this.emit(i, ""), o;
		let c = s.tokenizeEncoded(t, n, o);
		if (i !== 0) for (let e = 0, t = c.tokens.length; e < t; e += 2) c.tokens[e] += i;
		return this._prependTokens = e._merge(this._prependTokens, this._tokens, c.tokens), this._tokens = [], this._currentLanguageId = 0, this._lastTokenMetadata = 0, c.endState;
	}
	finalize(t) {
		return new m(e._merge(this._prependTokens, this._tokens, null), [], t);
	}
}, J = ni = class extends t {
	constructor(e, t, n, r, i) {
		super(), this._configurationService = i, this._languageService = e, this._standaloneThemeService = t, this._languageId = n, this._lexer = r, this._embeddedLanguages = Object.create(null), this.embeddedLoaded = Promise.resolve(void 0);
		let a = !1;
		this._register(x.onDidChange((e) => {
			if (a) return;
			let t = !1;
			for (let n = 0, r = e.changedLanguages.length; n < r; n++) {
				let r = e.changedLanguages[n];
				if (this._embeddedLanguages[r]) {
					t = !0;
					break;
				}
			}
			t && (a = !0, x.handleChange([this._languageId]), a = !1);
		})), this._maxTokenizationLineLength = this._configurationService.getValue("editor.maxTokenizationLineLength", { overrideIdentifier: this._languageId }), this._register(this._configurationService.onDidChangeConfiguration((e) => {
			e.affectsConfiguration("editor.maxTokenizationLineLength") && (this._maxTokenizationLineLength = this._configurationService.getValue("editor.maxTokenizationLineLength", { overrideIdentifier: this._languageId }));
		}));
	}
	getLoadStatus() {
		let e = [];
		for (let t in this._embeddedLanguages) {
			let n = x.get(t);
			if (n) {
				if (n instanceof ni) {
					let t = n.getLoadStatus();
					t.loaded === !1 && e.push(t.promise);
				}
				continue;
			}
			x.isResolved(t) || e.push(x.getOrCreate(t));
		}
		return e.length === 0 ? { loaded: !0 } : {
			loaded: !1,
			promise: Promise.all(e).then((e) => void 0)
		};
	}
	getInitialState() {
		let e = ii.create(null, this._lexer.start);
		return q.create(e, null);
	}
	tokenize(e, t, n) {
		if (e.length >= this._maxTokenizationLineLength) return on(this._languageId, n);
		let r = new oi(), i = this._tokenize(e, t, n, r);
		return r.finalize(i);
	}
	tokenizeEncoded(e, t, n) {
		if (e.length >= this._maxTokenizationLineLength) return rt(this._languageService.languageIdCodec.encodeLanguageId(this._languageId), n);
		let r = new si(this._languageService, this._standaloneThemeService.getColorTheme().tokenTheme), i = this._tokenize(e, t, n, r);
		return r.finalize(i);
	}
	_tokenize(e, t, n, r) {
		return n.embeddedLanguageData ? this._nestedTokenize(e, t, n, 0, r) : this._myTokenize(e, t, n, 0, r);
	}
	_findLeavingNestedLanguageOffset(e, t) {
		let n = this._lexer.tokenizer[t.stack.state];
		if (!n && (n = ei(this._lexer, t.stack.state), !n)) throw U(this._lexer, "tokenizer state is not defined: " + t.stack.state);
		let r = -1, i = !1;
		for (let a of n) {
			if (!Xr(a.action) || !(a.action.nextEmbedded === "@pop" || a.action.hasEmbeddedEndInCases)) continue;
			i = !0;
			let n = a.resolveRegex(t.stack.state), o = n.source;
			if (o.substr(0, 4) === "^(?:" && o.substr(o.length - 1, 1) === ")") {
				let e = (n.ignoreCase ? "i" : "") + (n.unicode ? "u" : "");
				n = new RegExp(o.substr(4, o.length - 5), e);
			}
			let s = e.search(n);
			s === -1 || s !== 0 && a.matchOnlyAtLineStart || (r === -1 || s < r) && (r = s);
		}
		if (!i) throw U(this._lexer, "no rule containing nextEmbedded: \"@pop\" in tokenizer embedded state: " + t.stack.state);
		return r;
	}
	_nestedTokenize(e, t, n, r, i) {
		let a = this._findLeavingNestedLanguageOffset(e, n);
		if (a === -1) {
			let a = i.nestedLanguageTokenize(e, t, n.embeddedLanguageData, r);
			return q.create(n.stack, new K(n.embeddedLanguageData.languageId, a));
		}
		let o = e.substring(0, a);
		o.length > 0 && i.nestedLanguageTokenize(o, !1, n.embeddedLanguageData, r);
		let s = e.substring(a);
		return this._myTokenize(s, t, n, r + a, i);
	}
	_safeRuleName(e) {
		return e ? e.name : "(unknown)";
	}
	_myTokenize(e, t, n, r, i) {
		i.enterLanguage(this._languageId);
		let a = e.length, o = t && this._lexer.includeLF ? e + "\n" : e, s = o.length, c = n.embeddedLanguageData, l = n.stack, u = 0, d = null, f = !0;
		for (; f || u < s;) {
			let n = u, p = l.depth, ee = d ? d.groups.length : 0, m = l.state, h = null, g = null, _ = null, v = null, y = null;
			if (d) {
				h = d.matches;
				let e = d.groups.shift();
				g = e.matched, _ = e.action, v = d.rule, d.groups.length === 0 && (d = null);
			} else {
				if (!f && u >= s) break;
				f = !1;
				let e = this._lexer.tokenizer[m];
				if (!e && (e = ei(this._lexer, m), !e)) throw U(this._lexer, "tokenizer state is not defined: " + m);
				let t = o.substr(u);
				for (let n of e) if ((u === 0 || !n.matchOnlyAtLineStart) && (h = t.match(n.resolveRegex(m)), h)) {
					g = h[0], _ = n.action;
					break;
				}
			}
			if (h || (h = [""], g = ""), _ ||= (u < s && (h = [o.charAt(u)], g = h[0]), this._lexer.defaultToken), g === null) break;
			for (u += g.length; Jr(_) && Xr(_) && _.test;) _ = _.test(g, h, m, u === s);
			let b = null;
			if (typeof _ == "string" || Array.isArray(_)) b = _;
			else if (_.group) b = _.group;
			else if (_.token !== null && _.token !== void 0) {
				if (b = _.tokenSubst ? W(this._lexer, _.token, g, h, m) : _.token, _.nextEmbedded) if (_.nextEmbedded === "@pop") {
					if (!c) throw U(this._lexer, "cannot pop embedded language if not inside one");
					c = null;
				} else if (c) throw U(this._lexer, "cannot enter embedded language from within an embedded language");
				else y = W(this._lexer, _.nextEmbedded, g, h, m);
				if (_.goBack && (u = Math.max(0, u - _.goBack)), _.switchTo && typeof _.switchTo == "string") {
					let e = W(this._lexer, _.switchTo, g, h, m);
					if (e[0] === "@" && (e = e.substr(1)), ei(this._lexer, e)) l = l.switchTo(e);
					else throw U(this._lexer, "trying to switch to a state '" + e + "' that is undefined in rule: " + this._safeRuleName(v));
				} else if (_.transform && typeof _.transform == "function") throw U(this._lexer, "action.transform not supported");
				else if (_.next) if (_.next === "@push") {
					if (l.depth >= this._lexer.maxStack) throw U(this._lexer, "maximum tokenizer stack size reached: [" + l.state + "," + l.parent.state + ",...]");
					l = l.push(m);
				} else if (_.next === "@pop") {
					if (l.depth <= 1) throw U(this._lexer, "trying to pop an empty stack in rule: " + this._safeRuleName(v));
					l = l.pop();
				} else if (_.next === "@popall") l = l.popall();
				else {
					let e = W(this._lexer, _.next, g, h, m);
					if (e[0] === "@" && (e = e.substr(1)), ei(this._lexer, e)) l = l.push(e);
					else throw U(this._lexer, "trying to set a next state '" + e + "' that is undefined in rule: " + this._safeRuleName(v));
				}
				_.log && typeof _.log == "string" && Qr(this._lexer, this._lexer.languageId + ": " + W(this._lexer, _.log, g, h, m));
			}
			if (b === null) throw U(this._lexer, "lexer rule has no well-defined action in rule: " + this._safeRuleName(v));
			let te = (n) => {
				let a = this._languageService.getLanguageIdByLanguageName(n) || this._languageService.getLanguageIdByMimeType(n) || n, o = this._getNestedEmbeddedLanguageData(a);
				if (u < s) {
					let n = e.substr(u);
					return this._nestedTokenize(n, t, q.create(l, o), r + u, i);
				} else return q.create(l, o);
			};
			if (Array.isArray(b)) {
				if (d && d.groups.length > 0) throw U(this._lexer, "groups cannot be nested: " + this._safeRuleName(v));
				if (h.length !== b.length + 1) throw U(this._lexer, "matched number of groups does not match the number of actions in rule: " + this._safeRuleName(v));
				let e = 0;
				for (let t = 1; t < h.length; t++) e += h[t].length;
				if (e !== g.length) throw U(this._lexer, "with groups, all characters should be matched in consecutive groups in rule: " + this._safeRuleName(v));
				d = {
					rule: v,
					matches: h,
					groups: []
				};
				for (let e = 0; e < b.length; e++) d.groups[e] = {
					action: b[e],
					matched: h[e + 1]
				};
				u -= g.length;
				continue;
			} else {
				if (b === "@rematch" && (u -= g.length, g = "", h = null, b = "", y !== null)) return te(y);
				if (g.length === 0) {
					if (s === 0 || p !== l.depth || m !== l.state || (d ? d.groups.length : 0) !== ee) continue;
					throw U(this._lexer, "no progress in tokenizer in rule: " + this._safeRuleName(v));
				}
				let e = null;
				if (Yr(b) && b.indexOf("@brackets") === 0) {
					let t = b.substr(9), n = ci(this._lexer, g);
					if (!n) throw U(this._lexer, "@brackets token returned but no bracket defined as: " + g);
					e = Zr(n.token + t);
				} else e = Zr(b === "" ? "" : b + this._lexer.tokenPostfix);
				n < a && i.emit(n + r, e);
			}
			if (y !== null) return te(y);
		}
		return q.create(l, c);
	}
	_getNestedEmbeddedLanguageData(e) {
		if (!this._languageService.isRegisteredLanguageId(e)) return new K(e, et);
		e !== this._languageId && (this._languageService.requestBasicLanguageFeatures(e), x.getOrCreate(e), this._embeddedLanguages[e] = !0);
		let t = x.get(e);
		return t ? new K(e, t.getInitialState()) : new K(e, et);
	}
};
J = ni = p([w(4, ge)], J);
function ci(e, t) {
	if (!t) return null;
	t = H(e, t);
	let n = e.brackets;
	for (let e of n) if (e.open === t) return {
		token: e.token,
		bracketType: B.Open
	};
	else if (e.close === t) return {
		token: e.token,
		bracketType: B.Close
	};
	return null;
}
qe(), qt(), D();
var li = Nt("standaloneColorizer", { createHTML: (e) => e }), ui = class {
	static colorizeElement(e, t, n, r) {
		r ||= {};
		let i = r.theme || "vs", a = r.mimeType || n.getAttribute("lang") || n.getAttribute("data-lang");
		if (!a) return console.error("Mode not detected"), Promise.resolve();
		let o = t.getLanguageIdByMimeType(a) || a;
		e.setTheme(i);
		let s = n.firstChild ? n.firstChild.nodeValue : "";
		return n.className += " " + i, this.colorize(t, s || "", o, r).then((e) => {
			n.innerHTML = li?.createHTML(e) ?? e;
		}, (e) => console.error(e));
	}
	static async colorize(e, t, n, r) {
		let i = e.languageIdCodec, a = 4;
		r && typeof r.tabSize == "number" && (a = r.tabSize), cn(t) && (t = t.substr(1));
		let o = ht(t);
		if (!e.isRegisteredLanguageId(n)) return fi(o, a, i);
		let s = await x.getOrCreate(n);
		return s ? di(o, a, s, i) : fi(o, a, i);
	}
	static colorizeLine(e, t, n, r, i = 4) {
		let a = R.isBasicASCII(e, t);
		return jn(new Mn(!1, !0, e, !1, a, R.containsRTL(e, a, n), 0, r, [], i, 0, 0, 0, 0, -1, "none", !1, !1, null, null, 0)).html;
	}
	static colorizeModelLine(e, t, n = 4) {
		let r = e.getLineContent(t);
		e.tokenization.forceTokenization(t);
		let i = e.tokenization.getLineTokens(t).inflate();
		return this.colorizeLine(r, e.mightContainNonBasicASCII(), e.mightContainRTL(), i, n);
	}
};
function di(e, t, n, r) {
	return new Promise((i, a) => {
		let o = () => {
			let s = pi(e, t, n, r);
			if (n instanceof J) {
				let e = n.getLoadStatus();
				if (e.loaded === !1) {
					e.promise.then(o, a);
					return;
				}
			}
			i(s);
		};
		o();
	});
}
function fi(e, t, n) {
	let r = [], i = (nn.None << M.FONT_STYLE_OFFSET | st.DefaultForeground << M.FOREGROUND_OFFSET | st.DefaultBackground << M.BACKGROUND_OFFSET) >>> 0, a = /* @__PURE__ */ new Uint32Array(2);
	a[0] = 0, a[1] = i;
	for (let i = 0, o = e.length; i < o; i++) {
		let o = e[i];
		a[0] = o.length;
		let s = new Ct(a, o, n), c = R.isBasicASCII(o, !0), l = jn(new Mn(!1, !0, o, !1, c, R.containsRTL(o, c, !0), 0, s, [], t, 0, 0, 0, 0, -1, "none", !1, !1, null, null, 0));
		r = r.concat(l.html), r.push("<br/>");
	}
	return r.join("");
}
function pi(e, t, n, r) {
	let i = [], a = n.getInitialState();
	for (let o = 0, s = e.length; o < s; o++) {
		let s = e[o], c = n.tokenizeEncoded(s, !0, a);
		Ct.convertToEndOffset(c.tokens, s.length);
		let l = new Ct(c.tokens, s, r), u = R.isBasicASCII(s, !0), d = jn(new Mn(!1, !0, s, !1, u, R.containsRTL(s, u, !0), 0, l.inflate(), [], t, 0, 0, 0, 0, -1, "none", !1, !1, null, null, 0));
		i = i.concat(d.html), i.push("<br/>"), a = c.endState;
	}
	return i.join("");
}
pt(), Wt(), Ot(), oe(), a(), Qt(), Cn(), mn(), It(), le(), Me(), se(), hn(), Xe(), We(), n(), Jt(), dt(), u("multiDiffEditor.headerBackground", {
	dark: "#262626",
	light: "tab.inactiveBackground",
	hcDark: "tab.inactiveBackground",
	hcLight: "tab.inactiveBackground"
}, r(209, "The background color of the diff editor's header")), u("multiDiffEditor.background", sn, r(210, "The background color of the multi file diff editor")), u("multiDiffEditor.border", {
	dark: "sideBarSectionHeader.border",
	light: "#cccccc",
	hcDark: "sideBarSectionHeader.border",
	hcLight: "#cccccc"
}, r(211, "The border color of the multi file diff editor")), pn(), jt(), zt(), P(), s(), bn(), Tn();
var mi = class {
	constructor(e, t) {
		this.viewModel = e, this.deltaScrollVertical = t;
	}
	getId() {
		return this.viewModel;
	}
}, hi = class extends t {
	constructor(e, t, n, r, i) {
		super(), this._container = e, this._overflowWidgetsDomNode = t, this._workbenchUIElementFactory = n, this._instantiationService = r, this._viewModel = T(this, void 0), this._collapsed = A(this, (e) => this._viewModel.read(e)?.collapsed.read(e)), this._editorContentHeight = T(this, 500), this.contentHeight = A(this, (e) => (this._collapsed.read(e) ? 0 : this._editorContentHeight.read(e)) + this._outerEditorHeight), this._modifiedContentWidth = T(this, 0), this._modifiedWidth = T(this, 0), this._originalContentWidth = T(this, 0), this._originalWidth = T(this, 0), this.maxScroll = A(this, (e) => {
			let t = this._modifiedContentWidth.read(e) - this._modifiedWidth.read(e), n = this._originalContentWidth.read(e) - this._originalWidth.read(e);
			return t > n ? {
				maxScroll: t,
				width: this._modifiedWidth.read(e)
			} : {
				maxScroll: n,
				width: this._originalWidth.read(e)
			};
		}), this._elements = C("div.multiDiffEntry", [C("div.header@header", [C("div.header-content", [
			C("div.collapse-button@collapseButton"),
			C("div.file-path", [
				C("div.title.modified.show-file-icons@primaryPath", []),
				C("div.status.deleted@status", ["R"]),
				C("div.title.original.show-file-icons@secondaryPath", [])
			]),
			C("div.actions@actions")
		])]), C("div.editorParent", [C("div.editorContainer@editor")])]), this.editor = this._register(this._instantiationService.createInstance(Rn, this._elements.editor, {
			overflowWidgetsDomNode: this._overflowWidgetsDomNode,
			fixedOverflowWidgets: !0
		}, {})), this.isModifedFocused = An(this.editor.getModifiedEditor()).isFocused, this.isOriginalFocused = An(this.editor.getOriginalEditor()).isFocused, this.isFocused = A(this, (e) => this.isModifedFocused.read(e) || this.isOriginalFocused.read(e)), this._resourceLabel = this._workbenchUIElementFactory.createResourceLabel ? this._register(this._workbenchUIElementFactory.createResourceLabel(this._elements.primaryPath)) : void 0, this._resourceLabel2 = this._workbenchUIElementFactory.createResourceLabel ? this._register(this._workbenchUIElementFactory.createResourceLabel(this._elements.secondaryPath)) : void 0, this._dataStore = this._register(new Gt()), this._headerHeight = 40, this._lastScrollTop = -1, this._isSettingScrollTop = !1;
		let a = new wt(this._elements.collapseButton, {});
		this._register(E((e) => {
			a.element.className = "", a.icon = this._collapsed.read(e) ? Rt.chevronRight : Rt.chevronDown;
		})), this._register(a.onDidClick(() => {
			this._viewModel.get()?.collapsed.set(!this._collapsed.get(), void 0);
		})), this._register(E((e) => {
			this._elements.editor.style.display = this._collapsed.read(e) ? "none" : "block";
		})), this._register(this.editor.getModifiedEditor().onDidLayoutChange((e) => {
			let t = this.editor.getModifiedEditor().getLayoutInfo().contentWidth;
			this._modifiedWidth.set(t, void 0);
		})), this._register(this.editor.getOriginalEditor().onDidLayoutChange((e) => {
			let t = this.editor.getOriginalEditor().getLayoutInfo().contentWidth;
			this._originalWidth.set(t, void 0);
		})), this._register(this.editor.onDidContentSizeChange((e) => {
			S((t) => {
				this._editorContentHeight.set(e.contentHeight, t), this._modifiedContentWidth.set(this.editor.getModifiedEditor().getContentWidth(), t), this._originalContentWidth.set(this.editor.getOriginalEditor().getContentWidth(), t);
			});
		})), this._register(this.editor.getOriginalEditor().onDidScrollChange((e) => {
			if (this._isSettingScrollTop || !e.scrollTopChanged || !this._data) return;
			let t = e.scrollTop - this._lastScrollTop;
			this._data.deltaScrollVertical(t);
		})), this._register(E((e) => {
			let t = this._viewModel.read(e)?.isActive.read(e);
			this._elements.root.classList.toggle("active", t);
		})), this._container.appendChild(this._elements.root), this._outerEditorHeight = this._headerHeight, this._contextKeyService = this._register(i.createScoped(this._elements.actions));
		let o = this._register(this._instantiationService.createChild(new At([j, this._contextKeyService])));
		this._register(o.createInstance(Pn, this._elements.actions, Ae.MultiDiffEditorFileToolbar, {
			actionRunner: this._register(new Ln(() => this._viewModel.get()?.modifiedUri ?? this._viewModel.get()?.originalUri)),
			menuOptions: { shouldForwardArgs: !0 },
			toolbarOptions: { primaryGroup: (e) => e.startsWith("navigation") },
			actionViewItemProvider: (e, t) => fn(o, e, t)
		}));
	}
	setScrollLeft(e) {
		this._modifiedContentWidth.get() - this._modifiedWidth.get() > this._originalContentWidth.get() - this._originalWidth.get() ? this.editor.getModifiedEditor().setScrollLeft(e) : this.editor.getOriginalEditor().setScrollLeft(e);
	}
	setData(e) {
		this._data = e;
		function t(e) {
			return {
				...e,
				scrollBeyondLastLine: !1,
				hideUnchangedRegions: { enabled: !0 },
				scrollbar: {
					vertical: "hidden",
					horizontal: "hidden",
					handleMouseWheel: !1,
					useShadows: !1
				},
				renderOverviewRuler: !1,
				fixedOverflowWidgets: !0,
				overviewRulerBorder: !1
			};
		}
		if (!e) {
			S((e) => {
				this._viewModel.set(void 0, e), this.editor.setDiffModel(null, e), this._dataStore.clear();
			});
			return;
		}
		let n = e.viewModel.documentDiffItem;
		if (S((r) => {
			this._resourceLabel?.setUri(e.viewModel.modifiedUri ?? e.viewModel.originalUri, { strikethrough: e.viewModel.modifiedUri === void 0 });
			let i = !1, a = !1, o = !1, s = "";
			e.viewModel.modifiedUri && e.viewModel.originalUri && e.viewModel.modifiedUri.path !== e.viewModel.originalUri.path ? (s = "R", i = !0) : e.viewModel.modifiedUri ? e.viewModel.originalUri || (s = "A", o = !0) : (s = "D", a = !0), this._elements.status.classList.toggle("renamed", i), this._elements.status.classList.toggle("deleted", a), this._elements.status.classList.toggle("added", o), this._elements.status.innerText = s, this._resourceLabel2?.setUri(i ? e.viewModel.originalUri : void 0, { strikethrough: !0 }), this._dataStore.clear(), this._viewModel.set(e.viewModel, r), this.editor.setDiffModel(e.viewModel.diffEditorViewModelRef, r), this.editor.updateOptions(t(n.options ?? {}));
		}), n.onOptionsDidChange && this._dataStore.add(n.onOptionsDidChange(() => {
			this.editor.updateOptions(t(n.options ?? {}));
		})), e.viewModel.isAlive.recomputeInitiallyAndOnChange(this._dataStore, (e) => {
			e || this.setData(void 0);
		}), e.viewModel.documentDiffItem.contextKeys) for (let [t, n] of Object.entries(e.viewModel.documentDiffItem.contextKeys)) this._contextKeyService.createKey(t, n);
	}
	render(e, t, n, r) {
		this._elements.root.style.visibility = "visible", this._elements.root.style.top = `${e.start}px`, this._elements.root.style.height = `${e.length}px`, this._elements.root.style.width = `${t}px`, this._elements.root.style.position = "absolute";
		let i = e.length - this._headerHeight, a = Math.max(0, Math.min(r.start - e.start, i));
		this._elements.header.style.transform = `translateY(${a}px)`, S((n) => {
			this.editor.layout({
				width: t - 16 - 2,
				height: e.length - this._outerEditorHeight
			});
		});
		try {
			this._isSettingScrollTop = !0, this._lastScrollTop = n, this.editor.getOriginalEditor().setScrollTop(n);
		} finally {
			this._isSettingScrollTop = !1;
		}
		this._elements.header.classList.toggle("shadow", a > 0 || n > 0), this._elements.header.classList.toggle("collapsed", a === i);
	}
	hide() {
		this._elements.root.style.top = "-100000px", this._elements.root.style.visibility = "hidden";
	}
};
hi = p([w(3, me), w(4, j)], hi), de(), wn(), kn(), Hn();
var gi = class {
	constructor(e) {
		this._create = e, this._unused = /* @__PURE__ */ new Set(), this._used = /* @__PURE__ */ new Set(), this._itemData = /* @__PURE__ */ new Map();
	}
	getUnusedObj(e) {
		let t;
		if (this._unused.size === 0) t = this._create(e), this._itemData.set(t, e);
		else {
			let n = [...this._unused.values()];
			t = n.find((t) => this._itemData.get(t).getId() === e.getId()) ?? n[0], this._unused.delete(t), this._itemData.set(t, e), t.setData(e);
		}
		return this._used.add(t), {
			object: t,
			dispose: () => {
				this._used.delete(t), this._unused.size > 5 ? t.dispose() : this._unused.add(t);
			}
		};
	}
	dispose() {
		for (let e of this._used) e.dispose();
		for (let e of this._unused) e.dispose();
		this._used.clear(), this._unused.clear();
	}
}, _i = /* @__PURE__ */ e({});
jt(), gn(), P(), h(), we(), St(), _(), a(), $e(), Zt(), Ut(), ae(), yt(_i);
var vi = class extends t {
	constructor(e, t, n, i, a, o) {
		super(), this._element = e, this._dimension = t, this._viewModel = n, this._workbenchUIElementFactory = i, this._parentContextKeyService = a, this._parentInstantiationService = o, this._scrollableElements = C("div.scrollContent", [C("div@content", { style: { overflow: "hidden" } }), C("div.monaco-editor@overflowWidgetsDomNode", {})]), this._scrollable = this._register(new Ge({
			forceIntegerValues: !1,
			scheduleAtNextAnimationFrame: (e) => xt(he(this._element), e),
			smoothScrollDuration: 100
		})), this._scrollableElement = this._register(new te(this._scrollableElements.root, {
			vertical: He.Auto,
			horizontal: He.Auto,
			useShadows: !1
		}, this._scrollable)), this._elements = C("div.monaco-component.multiDiffEditor", {}, [C("div", {}, [this._scrollableElement.getDomNode()]), C("div.placeholder@placeholder", {}, [C("div")])]), this._sizeObserver = this._register(new xn(this._element, void 0)), this._objectPool = this._register(new gi((e) => {
			let t = this._instantiationService.createInstance(hi, this._scrollableElements.content, this._scrollableElements.overflowWidgetsDomNode, this._workbenchUIElementFactory);
			return t.setData(e), t;
		})), this.scrollTop = vn(this, this._scrollableElement.onScroll, () => this._scrollableElement.getScrollPosition().scrollTop), this.scrollLeft = vn(this, this._scrollableElement.onScroll, () => this._scrollableElement.getScrollPosition().scrollLeft), this._viewItemsInfo = A(this, (e) => {
			let t = this._viewModel.read(e);
			if (!t) return {
				items: [],
				getItem: (e) => {
					throw new Ht();
				}
			};
			let n = t.items.read(e), r = /* @__PURE__ */ new Map();
			return {
				items: n.map((t) => {
					let n = e.store.add(new bi(t, this._objectPool, this.scrollLeft, (e) => {
						this._scrollableElement.setScrollPosition({ scrollTop: this._scrollableElement.getScrollPosition().scrollTop + e });
					})), i = this._lastDocStates?.[n.getKey()];
					return i && O((e) => {
						n.setViewState(i, e);
					}), r.set(t, n), n;
				}),
				getItem: (e) => r.get(e)
			};
		}), this._viewItems = this._viewItemsInfo.map(this, (e) => e.items), this._spaceBetweenPx = 0, this._totalHeight = this._viewItems.map(this, (e, t) => e.reduce((e, n) => e + n.contentHeight.read(t) + this._spaceBetweenPx, 0)), this.activeControl = A(this, (e) => {
			let t = this._viewModel.read(e)?.activeDiffItem.read(e);
			if (t) return this._viewItemsInfo.read(e).getItem(t).template.read(e)?.editor;
		}), this._contextKeyService = this._register(this._parentContextKeyService.createScoped(this._element)), this._instantiationService = this._register(this._parentInstantiationService.createChild(new At([j, this._contextKeyService]))), this._contextKeyService.createKey(Sn.inMultiDiffEditor.key, !0), this._lastDocStates = {}, this._register(tn((e, t) => {
			let n = this._viewModel.read(e);
			if (n && n.contextKeys) for (let [e, r] of Object.entries(n.contextKeys)) {
				let n = this._contextKeyService.createKey(e, void 0);
				n.set(r), t.add(_t(() => n.reset()));
			}
		}));
		let s = this._parentContextKeyService.createKey(Sn.multiDiffEditorAllCollapsed.key, !1);
		this._register(E((e) => {
			let t = this._viewModel.read(e);
			if (t) {
				let n = t.items.read(e).every((t) => t.collapsed.read(e));
				s.set(n);
			}
		})), this._register(E((e) => {
			let t = this._dimension.read(e);
			this._sizeObserver.observe(t);
		}));
		let c = A((e) => {
			if (this._viewItems.read(e).length > 0) return;
			let t = this._viewModel.read(e);
			return !t || t.isLoading.read(e) ? r(212, "Loading...") : r(213, "No Changed Files");
		});
		this._register(E((e) => {
			let t = c.read(e);
			this._elements.placeholder.innerText = t ?? "", this._elements.placeholder.classList.toggle("visible", !!t);
		})), this._scrollableElements.content.style.position = "relative", this._register(E((e) => {
			let t = this._sizeObserver.height.read(e);
			this._scrollableElements.root.style.height = `${t}px`;
			let n = this._totalHeight.read(e);
			this._scrollableElements.content.style.height = `${n}px`;
			let r = this._sizeObserver.width.read(e), i = r, a = ze(this._viewItems.read(e), ut((t) => t.maxScroll.read(e).maxScroll, Et));
			a && (i = r + a.maxScroll.read(e).maxScroll), this._scrollableElement.setScrollDimensions({
				width: r,
				height: t,
				scrollHeight: n,
				scrollWidth: i
			});
		})), e.replaceChildren(this._elements.root), this._register(_t(() => {
			e.replaceChildren();
		})), this._register(E((e) => {
			let t = this._viewModel.read(e);
			if (t && !t.isLoading.read(e)) {
				if (t.items.read(e).length === 0 || t.activeDiffItem.read(e)) return;
				this.goToNextChange();
			}
		})), this._register(this._register(E((e) => {
			S((t) => {
				this.render(e);
			});
		})));
	}
	setScrollState(e) {
		this._scrollableElement.setScrollPosition({
			scrollLeft: e.left,
			scrollTop: e.top
		});
	}
	getRootElement() {
		return this._elements.root;
	}
	getContextKeyService() {
		return this._contextKeyService;
	}
	getScopedInstantiationService() {
		return this._instantiationService;
	}
	reveal(e, t) {
		let n = this._viewItems.get(), r = n.findIndex((t) => t.viewModel.originalUri?.toString() === e.original?.toString() && t.viewModel.modifiedUri?.toString() === e.modified?.toString());
		if (r === -1) throw new Ht("Resource not found in diff editor");
		let i = n[r];
		this._viewModel.get().activeDiffItem.setCache(i.viewModel, void 0);
		let a = 0;
		for (let e = 0; e < r; e++) a += n[e].contentHeight.get() + this._spaceBetweenPx;
		this._scrollableElement.setScrollPosition({ scrollTop: a });
		let o = i.template.get()?.editor, s = "original" in e ? o?.getOriginalEditor() : o?.getModifiedEditor();
		s && t?.range && (s.revealRangeInCenter(t.range), yi(s, t.range));
	}
	getViewState() {
		return {
			scrollState: {
				top: this.scrollTop.get(),
				left: this.scrollLeft.get()
			},
			docStates: Object.fromEntries(this._viewItems.get().map((e) => [e.getKey(), e.getViewState()]))
		};
	}
	setViewState(e) {
		this.setScrollState(e.scrollState), this._lastDocStates = e.docStates, O((t) => {
			if (e.docStates) for (let n of this._viewItems.get()) {
				let r = e.docStates[n.getKey()];
				r && n.setViewState(r, t);
			}
		});
	}
	findDocumentDiffItem(e) {
		return this._viewItems.get().find((t) => t.viewModel.diffEditorViewModel.model.modified.uri.toString() === e.toString() || t.viewModel.diffEditorViewModel.model.original.uri.toString() === e.toString())?.viewModel.documentDiffItem;
	}
	tryGetCodeEditor(e) {
		let t = this._viewItems.get().find((t) => t.viewModel.diffEditorViewModel.model.modified.uri.toString() === e.toString() || t.viewModel.diffEditorViewModel.model.original.uri.toString() === e.toString()), n = t?.template.get()?.editor;
		if (n) return t.viewModel.diffEditorViewModel.model.modified.uri.toString() === e.toString() ? {
			diffEditor: n,
			editor: n.getModifiedEditor()
		} : {
			diffEditor: n,
			editor: n.getOriginalEditor()
		};
	}
	goToNextChange() {
		this._navigateToChange("next");
	}
	goToPreviousChange() {
		this._navigateToChange("previous");
	}
	_navigateToChange(e) {
		let t = this._viewItems.get();
		if (t.length === 0) return;
		let n = this._viewModel.get()?.activeDiffItem.get(), r = n ? t.findIndex((e) => e.viewModel === n) : -1;
		if (r === -1) {
			this._goToFile(0, "first");
			return;
		}
		let i = t[r];
		i.viewModel.collapsed.get() && i.viewModel.collapsed.set(!1, void 0);
		let a = i.template.get()?.editor;
		if (a?.getDiffComputationResult()?.changes2?.length) {
			let t = a.getModifiedEditor().getPosition()?.lineNumber || 1, n = a.getDiffComputationResult().changes2;
			if (e === "next" ? n.some((e) => e.modified.startLineNumber > t) : n.some((e) => e.modified.endLineNumberExclusive <= t)) {
				a.goToDiff(e);
				return;
			}
		}
		let o = (r + (e === "next" ? 1 : -1) + t.length) % t.length;
		this._goToFile(o, e === "next" ? "first" : "last");
	}
	_goToFile(e, t) {
		let n = this._viewItems.get()[e];
		n.viewModel.collapsed.get() && n.viewModel.collapsed.set(!1, void 0), this.reveal({
			original: n.viewModel.originalUri,
			modified: n.viewModel.modifiedUri
		});
		let r = n.template.get()?.editor;
		if (r?.getDiffComputationResult()?.changes2?.length) if (t === "first") r.revealFirstDiff();
		else {
			let e = r.getDiffComputationResult().changes2.at(-1), t = r.getModifiedEditor();
			t.setPosition({
				lineNumber: e.modified.startLineNumber,
				column: 1
			}), t.revealLineInCenter(e.modified.startLineNumber);
		}
		r?.focus();
	}
	render(e) {
		let t = this.scrollTop.read(e), n = 0, r = 0, i = 0, a = this._sizeObserver.height.read(e), o = ie.ofStartAndLength(t, a), s = this._sizeObserver.width.read(e);
		for (let c of this._viewItems.read(e)) {
			let l = c.contentHeight.read(e), u = Math.min(l, a), d = ie.ofStartAndLength(r, u), f = ie.ofStartAndLength(i, l);
			if (f.isBefore(o)) n -= l - u, c.hide();
			else if (f.isAfter(o)) c.hide();
			else {
				let e = Math.max(0, Math.min(o.start - f.start, l - u));
				n -= e;
				let r = ie.ofStartAndLength(t + n, a);
				c.render(d, e, s, r);
			}
			r += u + this._spaceBetweenPx, i += l + this._spaceBetweenPx;
		}
		this._scrollableElements.content.style.transform = `translateY(${-(t + n)}px)`;
	}
};
vi = p([w(4, j), w(5, me)], vi);
function yi(e, t) {
	let n = e.getModel(), r = e.createDecorationsCollection([{
		range: t,
		options: {
			description: "symbol-navigate-action-highlight",
			className: "symbolHighlight"
		}
	}]);
	setTimeout(() => {
		e.getModel() === n && r.clear();
	}, 350);
}
var bi = class extends t {
	constructor(e, t, n, r) {
		super(), this.viewModel = e, this._objectPool = t, this._scrollLeft = n, this._deltaScrollVertical = r, this._templateRef = this._register(Re(this, void 0)), this.contentHeight = A(this, (e) => this._templateRef.read(e)?.object.contentHeight?.read(e) ?? this.viewModel.lastTemplateData.read(e).contentHeight), this.maxScroll = A(this, (e) => this._templateRef.read(e)?.object.maxScroll.read(e) ?? {
			maxScroll: 0,
			scrollWidth: 0
		}), this.template = A(this, (e) => this._templateRef.read(e)?.object), this._isHidden = T(this, !1), this._isFocused = A(this, (e) => this.template.read(e)?.isFocused.read(e) ?? !1), this.viewModel.setIsFocused(this._isFocused, void 0), this._register(E((e) => {
			let t = this._scrollLeft.read(e);
			this._templateRef.read(e)?.object.setScrollLeft(t);
		})), this._register(E((e) => {
			let t = this._templateRef.read(e);
			t && this._isHidden.read(e) && (t.object.isFocused.read(e) || this._clear());
		}));
	}
	dispose() {
		this._clear(), super.dispose();
	}
	toString() {
		return `VirtualViewItem(${this.viewModel.documentDiffItem.modified?.uri.toString()})`;
	}
	getKey() {
		return this.viewModel.getKey();
	}
	getViewState() {
		return O((e) => {
			this._updateTemplateData(e);
		}), {
			collapsed: this.viewModel.collapsed.get(),
			selections: this.viewModel.lastTemplateData.get().selections
		};
	}
	setViewState(e, t) {
		this.viewModel.collapsed.set(e.collapsed, t), this._updateTemplateData(t);
		let n = this.viewModel.lastTemplateData.get(), r = e.selections?.map(Ye.liftSelection);
		this.viewModel.lastTemplateData.set({
			...n,
			selections: r
		}, t);
		let i = this._templateRef.get();
		i && r && i.object.editor.setSelections(r);
	}
	_updateTemplateData(e) {
		let t = this._templateRef.get();
		t && this.viewModel.lastTemplateData.set({
			contentHeight: t.object.contentHeight.get(),
			selections: t.object.editor.getSelections() ?? void 0
		}, e);
	}
	_clear() {
		let e = this._templateRef.get();
		e && O((t) => {
			this._updateTemplateData(t), e.object.hide(), this._templateRef.set(void 0, t);
		});
	}
	hide() {
		this._isHidden.set(!0, void 0);
	}
	render(e, t, n, r) {
		this._isHidden.set(!1, void 0);
		let i = this._templateRef.get();
		if (!i) {
			i = this._objectPool.getUnusedObj(new mi(this.viewModel, this._deltaScrollVertical)), this._templateRef.set(i, void 0);
			let e = this.viewModel.lastTemplateData.get().selections;
			e && i.object.editor.setSelections(e);
		}
		i.object.render(e, n, t, r);
	}
};
jt(), P(), h(), _(), ae(), $e();
var xi = class extends t {
	constructor(e, t, n) {
		super(), this._element = e, this._workbenchUIElementFactory = t, this._instantiationService = n, this._dimension = T(this, void 0), this._viewModel = T(this, void 0), this._widgetImpl = A(this, (e) => e.store.add(this._instantiationService.createInstance(En(vi), this._element, this._dimension, this._viewModel, this._workbenchUIElementFactory))), this._activeControl = A(this, (e) => this._widgetImpl.read(e).activeControl.read(e)), this.onDidChangeActiveControl = Fe.fromObservableLight(this._activeControl), this._register(y(this._widgetImpl));
	}
	reveal(e, t) {
		this._widgetImpl.get().reveal(e, t);
	}
	createViewModel(e) {
		return new Vn(e, this._instantiationService);
	}
	setViewModel(e) {
		this._viewModel.set(e, void 0);
	}
	layout(e) {
		this._dimension.set(e, void 0);
	}
	getActiveControl() {
		return this._activeControl.get();
	}
	getViewState() {
		return this._widgetImpl.get().getViewState();
	}
	setViewState(e) {
		this._widgetImpl.get().setViewState(e);
	}
	tryGetCodeEditor(e) {
		return this._widgetImpl.get().tryGetCodeEditor(e);
	}
	getRootElement() {
		return this._widgetImpl.get().getRootElement();
	}
	getContextKeyService() {
		return this._widgetImpl.get().getContextKeyService();
	}
	getScopedInstantiationService() {
		return this._widgetImpl.get().getScopedInstantiationService();
	}
	findDocumentDiffItem(e) {
		return this._widgetImpl.get().findDocumentDiffItem(e);
	}
	goToNextChange() {
		this._widgetImpl.get().goToNextChange();
	}
	goToPreviousChange() {
		this._widgetImpl.get().goToPreviousChange();
	}
};
xi = p([w(2, me)], xi), Yt(), P(), qe(), D(), Lt(), Mt(), yt(Wr);
function Si(e, t, n) {
	return k.initialize(n || {}).createInstance(Fn, e, t);
}
function Ci(e) {
	return k.get(o).onCodeEditorAdd((t) => {
		e(t);
	});
}
function wi(e) {
	return k.get(o).onDiffEditorAdd((t) => {
		e(t);
	});
}
function Ti() {
	return k.get(o).listCodeEditors();
}
function Ei() {
	return k.get(o).listDiffEditors();
}
function Di(e, t, n) {
	return k.initialize(n || {}).createInstance(zn, e, t);
}
function Oi(e, t) {
	return new xi(e, {}, k.initialize(t || {}));
}
function ki(e) {
	if (typeof e.id != "string" || typeof e.run != "function") throw Error("Invalid command descriptor, `id` and `run` are required properties!");
	return pe.registerCommand(e.id, e.run);
}
function Ai(e) {
	if (typeof e.id != "string" || typeof e.label != "string" || typeof e.run != "function") throw Error("Invalid action descriptor, `id`, `label` and `run` are required properties!");
	let t = L.deserialize(e.precondition), n = (n, ...r) => v.runEditorCommand(n, r, t, (t, n, r) => Promise.resolve(e.run(n, ...r))), r = new Gt();
	if (r.add(pe.registerCommand(e.id, n)), e.contextMenuGroupId) {
		let n = {
			command: {
				id: e.id,
				title: e.label
			},
			when: t,
			group: e.contextMenuGroupId,
			order: e.contextMenuOrder || 0
		};
		r.add(ee.appendMenuItem(Ae.EditorContext, n));
	}
	if (Array.isArray(e.keybindings)) {
		let n = k.get(at);
		if (!(n instanceof en)) console.warn("Cannot add keybinding because the editor is configured with an unrecognized KeybindingService");
		else {
			let i = L.and(t, L.deserialize(e.keybindingContext));
			r.add(n.addDynamicKeybindings(e.keybindings.map((t) => ({
				keybinding: t,
				command: e.id,
				when: i
			}))));
		}
	}
	return r;
}
function ji(e) {
	return Mi([e]);
}
function Mi(e) {
	let n = k.get(at);
	return n instanceof en ? n.addDynamicKeybindings(e.map((e) => ({
		keybinding: e.keybinding,
		command: e.command,
		commandArgs: e.commandArgs,
		when: L.deserialize(e.when)
	}))) : (console.warn("Cannot add keybinding because the editor is configured with an unrecognized KeybindingService"), t.None);
}
function Ni(e, t, n) {
	let r = k.get(d), i = r.getLanguageIdByMimeType(t) || t;
	return In(k.get(F), r, e, i, n);
}
function Pi(e, t) {
	let n = k.get(d), r = n.getLanguageIdByMimeType(t) || t || "plaintext";
	e.setLanguage(n.createById(r));
}
function Fi(e, t, n) {
	e && k.get(N).changeOne(t, e.uri, n);
}
function Ii(e) {
	k.get(N).changeAll(e, []);
}
function Li(e) {
	return k.get(N).read(e);
}
function Ri(e) {
	return k.get(N).onMarkerChanged(e);
}
function zi(e) {
	return k.get(F).getModel(e);
}
function Bi() {
	return k.get(F).getModels();
}
function Vi(e) {
	return k.get(F).onModelAdded(e);
}
function Hi(e) {
	return k.get(F).onModelRemoved(e);
}
function Ui(e) {
	return k.get(F).onModelLanguageChanged((t) => {
		e({
			model: t.model,
			oldLanguage: t.oldLanguageId
		});
	});
}
function Wi(e) {
	return Gr(k.get(F), k.get(tt), e);
}
function Gi(e, t) {
	let n = k.get(d), r = k.get(g);
	return ui.colorizeElement(r, n, e, t).then(() => {
		r.registerEditorContainer(e);
	});
}
function Ki(e, t, n) {
	let r = k.get(d);
	return k.get(g).registerEditorContainer(un.document.body), ui.colorize(r, e, t, n);
}
function qi(e, t, n = 4) {
	return k.get(g).registerEditorContainer(un.document.body), ui.colorizeModelLine(e, t, n);
}
function Ji(e) {
	return x.get(e) || {
		getInitialState: () => et,
		tokenize: (t, n, r) => on(e, r)
	};
}
function Yi(e, t) {
	x.getOrCreate(t);
	let n = Ji(t), r = ht(e), i = [], a = n.getInitialState();
	for (let e = 0, t = r.length; e < t; e++) {
		let t = r[e], o = n.tokenize(t, !0, a);
		i[e] = o.tokens, a = o.endState;
	}
	return i;
}
function Xi(e, t) {
	k.get(g).defineTheme(e, t);
}
function Zi(e) {
	k.get(g).setTheme(e);
}
function Qi() {
	yn.clearAllFontInfos();
}
function $i(e, t) {
	return pe.registerCommand({
		id: e,
		handler: t
	});
}
function ea(e) {
	return k.get(c).registerOpener({ async open(t) {
		return typeof t == "string" && (t = gt.parse(t)), e.open(t);
	} });
}
function ta(e) {
	return k.get(o).registerCodeEditorOpenHandler(async (t, n, r) => {
		if (!n) return null;
		let i = t.options?.selection, a;
		return i && typeof i.endLineNumber == "number" && typeof i.endColumn == "number" ? a = i : i && (a = {
			lineNumber: i.startLineNumber,
			column: i.startColumn
		}), await e.openCodeEditor(n, t.resource, a) ? n : null;
	});
}
function na() {
	return {
		create: Si,
		getEditors: Ti,
		getDiffEditors: Ei,
		onDidCreateEditor: Ci,
		onDidCreateDiffEditor: wi,
		createDiffEditor: Di,
		addCommand: ki,
		addEditorAction: Ai,
		addKeybindingRule: ji,
		addKeybindingRules: Mi,
		createModel: Ni,
		setModelLanguage: Pi,
		setModelMarkers: Fi,
		getModelMarkers: Li,
		removeAllMarkers: Ii,
		onDidChangeMarkers: Ri,
		getModels: Bi,
		getModel: zi,
		onDidCreateModel: Vi,
		onWillDisposeModel: Hi,
		onDidChangeModelLanguage: Ui,
		createWebWorker: Wi,
		colorizeElement: Gi,
		colorize: Ki,
		colorizeModelLine: qi,
		tokenize: Yi,
		defineTheme: Xi,
		setTheme: Zi,
		remeasureFonts: Qi,
		registerCommand: $i,
		registerLinkOpener: ea,
		registerEditorOpener: ta,
		AccessibilitySupport: cr,
		ContentWidgetPositionPreference: wr,
		CursorChangeReason: nr,
		DefaultEndOfLine: rr,
		EditorAutoIndentStrategy: Yn,
		EditorOption: Qn,
		EndOfLinePreference: tr,
		EndOfLineSequence: sr,
		MinimapPosition: Mr,
		MinimapSectionHeaderStyle: $n,
		MouseTargetType: pr,
		OverlayWidgetPositionPreference: or,
		OverviewRulerLane: Un,
		GlyphMarginLane: zr,
		RenderLineNumbersType: kr,
		RenderMinimap: Pr,
		ScrollbarVisibility: hr,
		ScrollType: Cr,
		TextEditorCursorBlinkingStyle: _r,
		TextEditorCursorStyle: yr,
		TrackedRangeStickiness: jr,
		WrappingIndent: Or,
		InjectedTextCursorStops: Zn,
		PositionAffinity: Ir,
		ShowLightbulbIconMode: Ar,
		TextDirection: Lr,
		ConfigurationChangedEvent: Vt,
		BareFontInfo: Ie,
		FontInfo: Pe,
		TextModelResolvedOptions: Ft,
		FindMatch: ot,
		ApplyUpdateResult: ft,
		EditorZoom: ne,
		createMultiFileDiffEditor: Oi,
		EditorType: ke,
		EditorOptions: I
	};
}
//#endregion
//#region node_modules/@codingame/monaco-vscode-editor-api/vscode/src/vs/editor/standalone/common/monarch/monarchCompile.js
function ra(e, t) {
	if (!t || !Array.isArray(t)) return !1;
	for (let n of t) if (!e(n)) return !1;
	return !0;
}
function Y(e, t) {
	return typeof e == "boolean" ? e : t;
}
function ia(e, t) {
	return typeof e == "string" ? e : t;
}
function aa(e) {
	let t = {};
	for (let n of e) t[n] = !0;
	return t;
}
function oa(e, t = !1) {
	t && (e = e.map(function(e) {
		return e.toLowerCase();
	}));
	let n = aa(e);
	return t ? function(e) {
		return n[e.toLowerCase()] !== void 0 && n.hasOwnProperty(e.toLowerCase());
	} : function(e) {
		return n[e] !== void 0 && n.hasOwnProperty(e);
	};
}
function sa(e, t, n) {
	t = t.replace(/@@/g, "");
	let r = 0, i;
	do
		i = !1, t = t.replace(/@(\w+)/g, function(n, r) {
			i = !0;
			let a = "";
			if (typeof e[r] == "string") a = e[r];
			else if (e[r] && e[r] instanceof RegExp) a = e[r].source;
			else if (e[r] === void 0) throw U(e, "language definition does not contain attribute '" + r + "', used at: " + t);
			else throw U(e, "attribute reference '" + r + "' must be a string, used at: " + t);
			return V(a) ? "" : "(?:" + a + ")";
		}), r++;
	while (i && r < 5);
	t = t.replace(/\x01/g, "@");
	let a = (e.ignoreCase ? "i" : "") + (e.unicode ? "u" : "");
	if (n && t.match(/\$[sS](\d\d?)/g)) {
		let n = null, r = null;
		return (i) => r && n === i ? r : (n = i, r = new RegExp($r(e, t, i), a), r);
	}
	return new RegExp(t, a);
}
function ca(e, t, n, r) {
	if (r < 0) return e;
	if (r < t.length) return t[r];
	if (r >= 100) {
		r -= 100;
		let e = n.split(".");
		if (e.unshift(n), r < e.length) return e[r];
	}
	return null;
}
function la(e, t, n, r) {
	let i = -1, a = n, o = n.match(/^\$(([sS]?)(\d\d?)|#)(.*)$/);
	o && (o[3] && (i = parseInt(o[3]), o[2] && (i += 100)), a = o[4]);
	let s = "~", c = a;
	!a || a.length === 0 ? (s = "!=", c = "") : /^\w*$/.test(c) ? s = "==" : (o = a.match(/^(@|!@|~|!~|==|!=)(.*)$/), o && (s = o[1], c = o[2]));
	let l;
	if ((s === "~" || s === "!~") && /^(\w|\|)*$/.test(c)) {
		let t = oa(c.split("|"), e.ignoreCase);
		l = function(e) {
			return s === "~" ? t(e) : !t(e);
		};
	} else if (s === "@" || s === "!@") {
		let n = e[c];
		if (!n) throw U(e, "the @ match target '" + c + "' is not defined, in rule: " + t);
		if (!ra(function(e) {
			return typeof e == "string";
		}, n)) throw U(e, "the @ match target '" + c + "' must be an array of strings, in rule: " + t);
		let r = oa(n, e.ignoreCase);
		l = function(e) {
			return s === "@" ? r(e) : !r(e);
		};
	} else if (s === "~" || s === "!~") if (c.indexOf("$") < 0) {
		let t = sa(e, "^" + c + "$", !1);
		l = function(e) {
			return s === "~" ? t.test(e) : !t.test(e);
		};
	} else l = function(t, n, r, i) {
		return sa(e, "^" + W(e, c, n, r, i) + "$", !1).test(t);
	};
	else if (c.indexOf("$") < 0) {
		let t = H(e, c);
		l = function(e) {
			return s === "==" ? e === t : e !== t;
		};
	} else {
		let t = H(e, c);
		l = function(n, r, i, a, o) {
			let c = W(e, t, r, i, a);
			return s === "==" ? n === c : n !== c;
		};
	}
	return i === -1 ? {
		name: n,
		value: r,
		test: function(e, t, n, r) {
			return l(e, e, t, n, r);
		}
	} : {
		name: n,
		value: r,
		test: function(e, t, n, r) {
			let a = ca(e, t, n, i);
			return l(a || "", e, t, n, r);
		}
	};
}
function ua(e, t, n) {
	if (!n) return { token: "" };
	if (typeof n == "string") return n;
	if (n.token || n.token === "") {
		if (typeof n.token != "string") throw U(e, "a 'token' attribute must be of type string, in rule: " + t);
		{
			let r = { token: n.token };
			if (n.token.indexOf("$") >= 0 && (r.tokenSubst = !0), typeof n.bracket == "string") if (n.bracket === "@open") r.bracket = B.Open;
			else if (n.bracket === "@close") r.bracket = B.Close;
			else throw U(e, "a 'bracket' attribute must be either '@open' or '@close', in rule: " + t);
			if (n.next) {
				if (typeof n.next != "string") throw U(e, "the next state must be a string value in rule: " + t);
				{
					let i = n.next;
					if (!/^(@pop|@push|@popall)$/.test(i) && (i[0] === "@" && (i = i.substr(1)), i.indexOf("$") < 0 && !ti(e, W(e, i, "", [], "")))) throw U(e, "the next state '" + n.next + "' is not defined in rule: " + t);
					r.next = i;
				}
			}
			return typeof n.goBack == "number" && (r.goBack = n.goBack), typeof n.switchTo == "string" && (r.switchTo = n.switchTo), typeof n.log == "string" && (r.log = n.log), typeof n.nextEmbedded == "string" && (r.nextEmbedded = n.nextEmbedded, e.usesEmbedded = !0), r;
		}
	} else if (Array.isArray(n)) {
		let r = [];
		for (let i = 0, a = n.length; i < a; i++) r[i] = ua(e, t, n[i]);
		return { group: r };
	} else if (n.cases) {
		let r = [], i = !1;
		for (let a in n.cases) if (n.cases.hasOwnProperty(a)) {
			let o = ua(e, t, n.cases[a]);
			a === "@default" || a === "@" || a === "" ? r.push({
				test: void 0,
				value: o,
				name: a
			}) : a === "@eos" ? r.push({
				test: function(e, t, n, r) {
					return r;
				},
				value: o,
				name: a
			}) : r.push(la(e, t, a, o)), i ||= !Dt(o) && (o.hasEmbeddedEndInCases || ["@pop", "@popall"].includes(o.nextEmbedded || ""));
		}
		let a = e.defaultToken;
		return {
			hasEmbeddedEndInCases: i,
			test: function(e, t, n, i) {
				for (let a of r) if (!a.test || a.test(e, t, n, i)) return a.value;
				return a;
			}
		};
	} else throw U(e, "an action must be a string, an object with a 'token' or 'cases' attribute, or an array of actions; in rule: " + t);
}
var da = class {
	constructor(e) {
		this.regex = /* @__PURE__ */ RegExp(""), this.action = { token: "" }, this.matchOnlyAtLineStart = !1, this.name = "", this.name = e;
	}
	setRegex(e, t) {
		let n;
		if (typeof t == "string") n = t;
		else if (t instanceof RegExp) n = t.source;
		else throw U(e, "rules must start with a match string or regular expression: " + this.name);
		this.matchOnlyAtLineStart = n.length > 0 && n[0] === "^", this.name = this.name + ": " + n, this.regex = sa(e, "^(?:" + (this.matchOnlyAtLineStart ? n.substr(1) : n) + ")", !0);
	}
	setAction(e, t) {
		this.action = ua(e, this.name, t);
	}
	resolveRegex(e) {
		return this.regex instanceof RegExp ? this.regex : this.regex(e);
	}
};
function fa(e, t) {
	if (!t || typeof t != "object") throw Error("Monarch: expecting a language definition object");
	let n = {
		languageId: e,
		includeLF: Y(t.includeLF, !1),
		noThrow: !1,
		maxStack: 100,
		start: typeof t.start == "string" ? t.start : null,
		ignoreCase: Y(t.ignoreCase, !1),
		unicode: Y(t.unicode, !1),
		tokenPostfix: ia(t.tokenPostfix, "." + e),
		defaultToken: ia(t.defaultToken, "source"),
		usesEmbedded: !1,
		stateNames: {},
		tokenizer: {},
		brackets: []
	}, r = t;
	r.languageId = e, r.includeLF = n.includeLF, r.ignoreCase = n.ignoreCase, r.unicode = n.unicode, r.noThrow = n.noThrow, r.usesEmbedded = n.usesEmbedded, r.stateNames = t.tokenizer, r.defaultToken = n.defaultToken;
	function i(e, a, o) {
		for (let s of o) {
			let o = s.include;
			if (o) {
				if (typeof o != "string") throw U(n, "an 'include' attribute must be a string at: " + e);
				if (o[0] === "@" && (o = o.substr(1)), !t.tokenizer[o]) throw U(n, "include target '" + o + "' is not defined at: " + e);
				i(e + "." + o, a, t.tokenizer[o]);
			} else {
				let t = new da(e);
				if (Array.isArray(s) && s.length >= 1 && s.length <= 3) if (t.setRegex(r, s[0]), s.length >= 3) if (typeof s[1] == "string") t.setAction(r, {
					token: s[1],
					next: s[2]
				});
				else if (typeof s[1] == "object") {
					let e = s[1];
					e.next = s[2], t.setAction(r, e);
				} else throw U(n, "a next state as the last element of a rule can only be given if the action is either an object or a string, at: " + e);
				else t.setAction(r, s[1]);
				else {
					if (!s.regex) throw U(n, "a rule must either be an array, or an object with a 'regex' or 'include' field at: " + e);
					s.name && typeof s.name == "string" && (t.name = s.name), s.matchOnlyAtStart && (t.matchOnlyAtLineStart = Y(s.matchOnlyAtLineStart, !1)), t.setRegex(r, s.regex), t.setAction(r, s.action);
				}
				a.push(t);
			}
		}
	}
	if (!t.tokenizer || typeof t.tokenizer != "object") throw U(n, "a language definition must define the 'tokenizer' attribute as an object");
	n.tokenizer = [];
	for (let e in t.tokenizer) if (t.tokenizer.hasOwnProperty(e)) {
		n.start ||= e;
		let r = t.tokenizer[e];
		n.tokenizer[e] = [], i("tokenizer." + e, n.tokenizer[e], r);
	}
	if (n.usesEmbedded = r.usesEmbedded, t.brackets) {
		if (!Array.isArray(t.brackets)) throw U(n, "the 'brackets' attribute must be defined as an array");
	} else t.brackets = [
		{
			open: "{",
			close: "}",
			token: "delimiter.curly"
		},
		{
			open: "[",
			close: "]",
			token: "delimiter.square"
		},
		{
			open: "(",
			close: ")",
			token: "delimiter.parenthesis"
		},
		{
			open: "<",
			close: ">",
			token: "delimiter.angle"
		}
	];
	let a = [];
	for (let e of t.brackets) {
		let t = e;
		if (t && Array.isArray(t) && t.length === 3 && (t = {
			token: t[2],
			open: t[0],
			close: t[1]
		}), t.open === t.close) throw U(n, "open and close brackets in a 'brackets' attribute must be different: " + t.open + "\n hint: use the 'bracket' attribute if matching on equal brackets is required.");
		if (typeof t.open == "string" && typeof t.token == "string" && typeof t.close == "string") a.push({
			token: t.token + n.tokenPostfix,
			open: H(n, t.open),
			close: H(n, t.close)
		});
		else throw U(n, "every element in the 'brackets' array must be a '{open,close,token}' object or array");
	}
	return n.brackets = a, n.noThrow = !0, n;
}
qt(), D(), dn(), ce(), Sr(), Qt(), oe(), be(), Wt(), ln();
function pa(e) {
	_e.registerLanguage(e);
}
function ma() {
	let e = [];
	return e = e.concat(_e.getLanguages()), e;
}
function ha(e) {
	return k.get(d).languageIdCodec.encodeLanguageId(e);
}
function ga(e, t) {
	return k.withServices(() => {
		let n = k.get(d).onDidRequestRichLanguageFeatures((r) => {
			r === e && (n.dispose(), t());
		});
		return n;
	});
}
function _a(e, t) {
	return k.withServices(() => {
		let n = k.get(d).onDidRequestBasicLanguageFeatures((r) => {
			r === e && (n.dispose(), t());
		});
		return n;
	});
}
function va(e, t) {
	if (!k.get(d).isRegisteredLanguageId(e)) throw Error(`Cannot set configuration for unknown language ${e}`);
	return k.get(Ke).register(e, t, 100);
}
var ya = class {
	constructor(e, t) {
		this._languageId = e, this._actual = t;
	}
	dispose() {}
	getInitialState() {
		return this._actual.getInitialState();
	}
	tokenize(e, t, n) {
		if (typeof this._actual.tokenize == "function") return ba.adaptTokenize(this._languageId, this._actual, e, n);
		throw Error("Not supported!");
	}
	tokenizeEncoded(e, t, n) {
		let r = this._actual.tokenizeEncoded(e, n);
		return new m(r.tokens, [], r.endState);
	}
}, ba = class e {
	constructor(e, t, n, r) {
		this._languageId = e, this._actual = t, this._languageService = n, this._standaloneThemeService = r;
	}
	dispose() {}
	getInitialState() {
		return this._actual.getInitialState();
	}
	static _toClassicTokens(e, t) {
		let n = [], r = 0;
		for (let i = 0, a = e.length; i < a; i++) {
			let a = e[i], o = a.startIndex;
			i === 0 ? o = 0 : o < r && (o = r), n[i] = new b(o, a.scopes, t), r = o;
		}
		return n;
	}
	static adaptTokenize(t, n, r, i) {
		let a = n.tokenize(r, i), o = e._toClassicTokens(a.tokens, t), s;
		return s = a.endState.equals(i) ? i : a.endState, new Xt(o, s);
	}
	tokenize(t, n, r) {
		return e.adaptTokenize(this._languageId, this._actual, t, r);
	}
	_toBinaryTokens(e, t) {
		let n = e.encodeLanguageId(this._languageId), r = this._standaloneThemeService.getColorTheme().tokenTheme, i = [], a = 0, o = 0;
		for (let e = 0, s = t.length; e < s; e++) {
			let s = t[e], c = r.match(n, s.scopes) | M.BALANCED_BRACKETS_MASK;
			if (a > 0 && i[a - 1] === c) continue;
			let l = s.startIndex;
			e === 0 ? l = 0 : l < o && (l = o), i[a++] = l, i[a++] = c, o = l;
		}
		let s = new Uint32Array(a);
		for (let e = 0; e < a; e++) s[e] = i[e];
		return s;
	}
	tokenizeEncoded(e, t, n) {
		let r = this._actual.tokenize(e, n), i = this._toBinaryTokens(this._languageService.languageIdCodec, r.tokens), a;
		return a = r.endState.equals(n) ? n : r.endState, new m(i, [], a);
	}
};
function xa(e) {
	return typeof e.getInitialState == "function";
}
function Sa(e) {
	return "tokenizeEncoded" in e;
}
function Ca(e) {
	return e && typeof e.then == "function";
}
function wa(e) {
	let t = k.get(g);
	if (e) {
		let n = [null];
		for (let t = 1, r = e.length; t < r; t++) n[t] = Ze.fromHex(e[t]);
		t.setColorMapOverride(n);
	} else t.setColorMapOverride(null);
}
function Ta(e, t) {
	return Sa(t) ? new ya(e, t) : new ba(e, t, k.get(d), k.get(g));
}
function Ea(e, t) {
	let n = new xe(async () => {
		let n = await Promise.resolve(t.create());
		return n ? xa(n) ? Ta(e, n) : new J(k.get(d), k.get(g), e, fa(e, n), k.get(ge)) : null;
	});
	return x.registerFactory(e, n);
}
function Da(e, t) {
	if (!k.get(d).isRegisteredLanguageId(e)) throw Error(`Cannot set tokens provider for unknown language ${e}`);
	return Ca(t) ? Ea(e, { create: () => t }) : x.register(e, Ta(e, t));
}
function Oa(e, t) {
	return Ca(t) ? Ea(e, { create: () => t }) : x.register(e, ((t) => new J(k.get(d), k.get(g), e, fa(e, t), k.get(ge)))(t));
}
function ka(e, t) {
	return k.get(z).referenceProvider.register(e, t);
}
function Aa(e, t) {
	return k.get(z).renameProvider.register(e, t);
}
function ja(e, t) {
	return k.get(z).newSymbolNamesProvider.register(e, t);
}
function Ma(e, t) {
	return k.get(z).signatureHelpProvider.register(e, t);
}
function Na(e, t) {
	return k.get(z).hoverProvider.register(e, { provideHover: async (e, n, r, i) => {
		let a = e.getWordAtPosition(n);
		return Promise.resolve(t.provideHover(e, n, r, i)).then((e) => {
			if (e) return !e.range && a && (e.range = new ct(n.lineNumber, a.startColumn, n.lineNumber, a.endColumn)), e.range ||= new ct(n.lineNumber, n.column, n.lineNumber, n.column), e;
		});
	} });
}
function Pa(e, t) {
	return k.get(z).documentSymbolProvider.register(e, t);
}
function Fa(e, t) {
	return k.get(z).documentHighlightProvider.register(e, t);
}
function Ia(e, t) {
	return k.get(z).linkedEditingRangeProvider.register(e, t);
}
function La(e, t) {
	return k.get(z).definitionProvider.register(e, t);
}
function Ra(e, t) {
	return k.get(z).implementationProvider.register(e, t);
}
function za(e, t) {
	return k.get(z).typeDefinitionProvider.register(e, t);
}
function Ba(e, t) {
	return k.get(z).codeLensProvider.register(e, t);
}
function Va(e, t, n) {
	return k.get(z).codeActionProvider.register(e, {
		providedCodeActionKinds: n?.providedCodeActionKinds,
		documentation: n?.documentation,
		provideCodeActions: (e, n, r, i) => {
			let a = k.get(N).read({ resource: e.uri }).filter((e) => ct.areIntersectingOrTouching(e, n));
			return t.provideCodeActions(e, n, {
				markers: a,
				only: r.only,
				trigger: r.trigger
			}, i);
		},
		resolveCodeAction: t.resolveCodeAction
	});
}
function Ha(e, t) {
	return k.get(z).documentFormattingEditProvider.register(e, t);
}
function Ua(e, t) {
	return k.get(z).documentRangeFormattingEditProvider.register(e, t);
}
function Wa(e, t) {
	return k.get(z).onTypeFormattingEditProvider.register(e, t);
}
function Ga(e, t) {
	return k.get(z).linkProvider.register(e, t);
}
function Ka(e, t) {
	return k.get(z).completionProvider.register(e, t);
}
function qa(e, t) {
	return k.get(z).colorProvider.register(e, t);
}
function Ja(e, t) {
	return k.get(z).foldingRangeProvider.register(e, t);
}
function Ya(e, t) {
	return k.get(z).declarationProvider.register(e, t);
}
function Xa(e, t) {
	return k.get(z).selectionRangeProvider.register(e, t);
}
function Za(e, t) {
	return k.get(z).documentSemanticTokensProvider.register(e, t);
}
function Qa(e, t) {
	return k.get(z).documentRangeSemanticTokensProvider.register(e, t);
}
function $a(e, t) {
	return k.get(z).inlineCompletionsProvider.register(e, t);
}
function eo(e, t) {
	return k.get(z).inlayHintsProvider.register(e, t);
}
function to() {
	return {
		register: pa,
		getLanguages: ma,
		onLanguage: ga,
		onLanguageEncountered: _a,
		getEncodedLanguageId: ha,
		setLanguageConfiguration: va,
		setColorMap: wa,
		registerTokensProviderFactory: Ea,
		setTokensProvider: Da,
		setMonarchTokensProvider: Oa,
		registerReferenceProvider: ka,
		registerRenameProvider: Aa,
		registerNewSymbolNameProvider: ja,
		registerCompletionItemProvider: Ka,
		registerSignatureHelpProvider: Ma,
		registerHoverProvider: Na,
		registerDocumentSymbolProvider: Pa,
		registerDocumentHighlightProvider: Fa,
		registerLinkedEditingRangeProvider: Ia,
		registerDefinitionProvider: La,
		registerImplementationProvider: Ra,
		registerTypeDefinitionProvider: za,
		registerCodeLensProvider: Ba,
		registerCodeActionProvider: Va,
		registerDocumentFormattingEditProvider: Ha,
		registerDocumentRangeFormattingEditProvider: Ua,
		registerOnTypeFormattingEditProvider: Wa,
		registerLinkProvider: Ga,
		registerColorProvider: qa,
		registerFoldingRangeProvider: Ja,
		registerDeclarationProvider: Ya,
		registerSelectionRangeProvider: Xa,
		registerDocumentSemanticTokensProvider: Za,
		registerDocumentRangeSemanticTokensProvider: Qa,
		registerInlineCompletionsProvider: $a,
		registerInlayHintsProvider: eo,
		DocumentHighlightKind: ar,
		CompletionItemKind: ir,
		CompletionItemTag: Tr,
		CompletionItemInsertTextRule: qn,
		SymbolKind: gr,
		SymbolTag: Er,
		IndentAction: ur,
		CompletionTriggerKind: Wn,
		SignatureHelpTriggerKind: Fr,
		InlayHintKind: lr,
		InlineCompletionTriggerKind: er,
		CodeActionTriggerType: Jn,
		NewSymbolNameTag: fr,
		NewSymbolNameTriggerKind: mr,
		PartialAcceptTriggerKind: vr,
		HoverVerbosityAction: Gn,
		InlineCompletionEndOfLifeReasonKind: dr,
		InlineCompletionHintStyle: Xn,
		FoldingRangeKind: ye,
		SelectedSuggestionInfo: _n,
		EditDeltaInfo: bt
	};
}
Se(), I.wrappingIndent.defaultValue = je.None, I.glyphMargin.defaultValue = !1, I.autoIndent.defaultValue = vt.Advanced, I.overviewRulerLanes.defaultValue = 2, Dr.setFormatterSelector((e, t, n) => Promise.resolve(e[0]));
var X = Kn();
X.editor = na(), X.languages = to(), X.CancellationTokenSource;
var no = X.Emitter, ro = X.KeyCode, io = X.KeyMod;
X.Position;
var ao = X.Range;
X.Selection, X.SelectionDirection;
var oo = X.MarkerSeverity, so = X.MarkerTag, co = X.Uri;
X.Token;
var Z = X.editor, Q = X.languages, lo = Qe(), $ = globalThis;
(lo?.globalAPI || typeof $.define == "function" && $.define.amd) && ($.monaco = X), $.require !== void 0 && typeof $.require.config == "function" && $.require.config({ ignoreDuplicateModules: [
	"vscode-languageserver-types",
	"vscode-languageserver-types/main",
	"vscode-languageserver-textdocument",
	"vscode-languageserver-textdocument/main",
	"vscode-nls",
	"vscode-nls/vscode-nls",
	"jsonc-parser",
	"jsonc-parser/main",
	"vscode-uri",
	"vscode-uri/index",
	"vs/basic-languages/typescript/typescript"
] });
//#endregion
//#region node_modules/@codingame/monaco-vscode-editor-api/esm/vs/editor/editor.api.js
var uo = Q.onLanguage;
Q.onLanguage = (e, t) => Nr(() => uo(e, t));
var fo = Q.onLanguage;
Q.onLanguageEncountered = (e, t) => Nr(() => fo(e, t)), Z.create = Vr, Z.createDiffEditor = Ur, Z.createModelReference = Hr, Z.writeFile = Br;
//#endregion
//#region node_modules/@codingame/monaco-vscode-standalone-typescript-language-features/language/typescript/monaco.contribution.js
var po = class {
	constructor(e, t, n, r, i) {
		this._onDidChange = new no(), this._onDidExtraLibsChange = new no(), this._extraLibs = /* @__PURE__ */ Object.create(null), this._removedExtraLibs = /* @__PURE__ */ Object.create(null), this._eagerModelSync = !1, this.setCompilerOptions(e), this.setDiagnosticsOptions(t), this.setWorkerOptions(n), this.setInlayHintsOptions(r), this.setModeConfiguration(i), this._onDidExtraLibsChangeTimeout = -1;
	}
	get onDidChange() {
		return this._onDidChange.event;
	}
	get onDidExtraLibsChange() {
		return this._onDidExtraLibsChange.event;
	}
	get modeConfiguration() {
		return this._modeConfiguration;
	}
	get workerOptions() {
		return this._workerOptions;
	}
	get inlayHintsOptions() {
		return this._inlayHintsOptions;
	}
	getExtraLibs() {
		return this._extraLibs;
	}
	addExtraLib(e, t) {
		let n;
		if (n = t === void 0 ? `ts:extralib-${Math.random().toString(36).substring(2, 15)}` : t, this._extraLibs[n] && this._extraLibs[n].content === e) return { dispose: () => {} };
		let r = 1;
		return this._removedExtraLibs[n] && (r = this._removedExtraLibs[n] + 1), this._extraLibs[n] && (r = this._extraLibs[n].version + 1), this._extraLibs[n] = {
			content: e,
			version: r
		}, this._fireOnDidExtraLibsChangeSoon(), { dispose: () => {
			let e = this._extraLibs[n];
			e && e.version === r && (delete this._extraLibs[n], this._removedExtraLibs[n] = r, this._fireOnDidExtraLibsChangeSoon());
		} };
	}
	setExtraLibs(e) {
		for (let e in this._extraLibs) this._removedExtraLibs[e] = this._extraLibs[e].version;
		if (this._extraLibs = /* @__PURE__ */ Object.create(null), e && e.length > 0) for (let t of e) {
			let e = t.filePath || `ts:extralib-${Math.random().toString(36).substring(2, 15)}`, n = t.content, r = 1;
			this._removedExtraLibs[e] && (r = this._removedExtraLibs[e] + 1), this._extraLibs[e] = {
				content: n,
				version: r
			};
		}
		this._fireOnDidExtraLibsChangeSoon();
	}
	_fireOnDidExtraLibsChangeSoon() {
		this._onDidExtraLibsChangeTimeout === -1 && (this._onDidExtraLibsChangeTimeout = window.setTimeout(() => {
			this._onDidExtraLibsChangeTimeout = -1, this._onDidExtraLibsChange.fire(void 0);
		}, 0));
	}
	getCompilerOptions() {
		return this._compilerOptions;
	}
	setCompilerOptions(e) {
		this._compilerOptions = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(void 0);
	}
	getDiagnosticsOptions() {
		return this._diagnosticsOptions;
	}
	setDiagnosticsOptions(e) {
		this._diagnosticsOptions = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(void 0);
	}
	setWorkerOptions(e) {
		this._workerOptions = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(void 0);
	}
	setInlayHintsOptions(e) {
		this._inlayHintsOptions = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(void 0);
	}
	setMaximumWorkerIdleTime(e) {}
	setEagerModelSync(e) {
		this._eagerModelSync = e;
	}
	getEagerModelSync() {
		return this._eagerModelSync;
	}
	setModeConfiguration(e) {
		this._modeConfiguration = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(void 0);
	}
}, mo = {
	completionItems: !0,
	hovers: !0,
	documentSymbols: !0,
	definitions: !0,
	references: !0,
	documentHighlights: !0,
	rename: !0,
	diagnostics: !0,
	documentRangeFormattingEdits: !0,
	signatureHelp: !0,
	onTypeFormattingEdits: !0,
	codeActions: !0,
	inlayHints: !0
}, ho = new po({
	allowNonTsExtensions: !0,
	target: 99
}, {
	noSemanticValidation: !1,
	noSyntaxValidation: !1,
	onlyVisible: !1
}, {}, {}, mo), go = new po({
	allowNonTsExtensions: !0,
	allowJs: !0,
	target: 99
}, {
	noSemanticValidation: !0,
	noSyntaxValidation: !1,
	onlyVisible: !1
}, {}, {}, mo);
function _o() {
	return import("./tsMode-BkECqHP-.js");
}
Q.onLanguage("typescript", () => _o().then((e) => e.setupTypeScript(ho))), Q.onLanguage("javascript", () => _o().then((e) => e.setupJavaScript(go)));
//#endregion
export { so as a, Z as c, oo as i, Q as l, ro as n, ao as o, io as r, co as s, ho as t };
