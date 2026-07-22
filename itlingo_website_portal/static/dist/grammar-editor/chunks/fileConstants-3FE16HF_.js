import { n as e, r as t } from "./rolldown-runtime-B1bRi_D7.js";
import { $A as n, $g as r, $k as i, $l as a, A as o, AA as s, Ab as c, Al as l, BA as u, Bc as d, Bu as f, Bv as p, CM as m, Ca as h, Cb as g, DA as _, DN as v, Dc as y, Ew as b, F as x, FA as S, Fw as C, Fy as ee, Hl as te, Hv as ne, Hw as re, I as ie, Ih as ae, Iw as oe, Iy as se, Jb as ce, Jh as le, Jl as ue, Ju as de, Jw as fe, Jx as pe, KA as me, Kl as he, LC as w, Lb as ge, Lc as _e, Ll as ve, Lr as ye, Lw as be, M as xe, MA as T, MC as Se, Mi as Ce, My as we, Nb as Te, OA as Ee, ON as E, Oa as De, Ob as Oe, PA as ke, Pb as Ae, Ps as je, QE as Me, QM as Ne, QS as Pe, Qc as Fe, Qk as Ie, Qw as Le, Ra as Re, Rc as ze, Rw as Be, SA as Ve, Sb as He, So as Ue, Sv as We, TA as Ge, Tc as Ke, Ub as qe, Ug as Je, Ur as Ye, Uv as Xe, Uw as D, VA as Ze, VM as Qe, Vl as $e, Vu as et, Vv as tt, Vw as nt, Wb as rt, Wv as it, XC as at, XE as ot, Xa as st, Xv as ct, Xw as O, Xx as lt, Yh as ut, Yu as dt, Yv as ft, Yw as k, Yx as pt, ZM as mt, Za as ht, Zc as gt, _h as _t, _i as vt, _k as A, an as yt, b as bt, bM as xt, cC as j, cM as St, cT as M, cg as Ct, dS as wt, dh as Tt, du as Et, eA as Dt, ej as Ot, et as kt, eu as At, ey as N, fC as jt, fM as Mt, fh as Nt, fu as Pt, gN as Ft, gr as It, gs as Lt, gu as Rt, hj as P, hk as F, ho as zt, hr as Bt, hu as Vt, i as Ht, iT as I, id as Ut, ig as Wt, ip as Gt, j as Kt, jA as qt, jM as Jt, ji as Yt, jl as Xt, jw as Zt, jy as Qt, k as $t, kN as L, ka as en, kb as tn, kc as nn, l as rn, lC as an, l_ as on, lh as sn, lu as cn, mN as ln, nN as un, nT as R, nd as dn, ng as fn, nj as pn, ny as z, oT as mn, og as hn, on as gn, ph as _n, po as vn, pu as yn, qM as bn, qS as xn, qb as Sn, ql as Cn, qw as wn, qx as Tn, r as En, rT as B, rd as Dn, rg as On, rn as kn, ry as An, sT as jn, sg as Mn, sn as Nn, sp as Pn, t as Fn, tC as In, tS as Ln, tT as V, td as Rn, tt as zn, ty as Bn, u as Vn, uj as H, uu as Hn, uw as Un, vM as Wn, vi as Gn, vr as Kn, vs as U, vu as qn, wA as Jn, wa as Yn, wb as Xn, wo as Zn, wv as Qn, xb as $n, xk as er, y as tr, y_ as nr, yh as rr, yi as ir, yr as ar, ys as or, zC as W, za as sr, zc as cr, zu as lr, zv as G, zw as K } from "./standaloneServices-DUdtGggg.js";
import { c as ur, i as dr, l as fr, o as pr, s as mr } from "./editorBrowser-zJfFG23V.js";
import { $t as hr, bt as gr, mn as _r, xt as vr } from "./textfiles-GCUcfhe8.js";
import { $i as yr, Ar as br, Bn as xr, Cn as Sr, Cr, Da as wr, Di as q, Dn as Tr, Dr as Er, Ea as Dr, En as Or, Er as kr, Fa as Ar, Fr as jr, Gn as J, Gr as Mr, Hr as Nr, Ir as Y, Jr as Pr, Lr as Fr, Mn as Ir, Mr as Lr, Nn as Rr, Nr as zr, Oi as Br, On as Vr, Or as Hr, Pa as Ur, Pn as Wr, Pr as Gr, Qi as Kr, Tr as qr, Ur as X, Vn as Jr, Wn as Yr, Wr as Xr, Xr as Zr, Yr as Qr, Zr as $r, _n as ei, _o as ti, _r as ni, bn as ri, br as ii, ci as ai, cr as oi, da as si, dr as ci, fr as li, gn as ui, gr as di, hr as fi, jr as pi, kn as mi, kr as hi, li as gi, lr as _i, mr as vi, or as yi, pa as bi, pr as xi, si as Si, sr as Ci, ua as wi, ui as Ti, ur as Ei, vn as Di, vr as Oi, wr as ki, xn as Ai, yn as ji } from "./embeddedCodeEditorWidget-DPX_ivX-.js";
import { a as Mi, i as Ni, n as Pi, t as Z } from "./platformObservableUtils-CuEWfyFX.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/common/editor/editorOptions.js
function Fi(e, t, n) {
	let r = !1, i = Ii(e);
	if (_r(i) && (t.restoreViewState(i), r = !0), e.selection) {
		let i = {
			startLineNumber: e.selection.startLineNumber,
			startColumn: e.selection.startColumn,
			endLineNumber: e.selection.endLineNumber ?? e.selection.startLineNumber,
			endColumn: e.selection.endColumn ?? e.selection.startColumn
		};
		t.setSelection(i, e.selectionSource ?? tn.NAVIGATION), e.selectionRevealType === Oe.NearTop ? t.revealRangeNearTop(i, n) : e.selectionRevealType === Oe.NearTopIfOutsideViewport ? t.revealRangeNearTopIfOutsideViewport(i, n) : e.selectionRevealType === Oe.CenterIfOutsideViewport ? t.revealRangeInCenterIfOutsideViewport(i, n) : t.revealRangeInCenter(i, n), r = !0;
	}
	return r;
}
function Ii(e) {
	if (!e.selection || !e.viewState) return e.viewState;
	let t = e.viewState;
	if (t.modified) return t.modified.cursorState = [], t;
	let n = e.viewState;
	return n.cursorState &&= [], n;
}
var Li = e((() => {
	c(), hr();
})), Ri, zi = e((() => {
	L(), pr(), pe(), Ee(), lt(), ti(), vr(), S(), ge(), ot(), Ae(), Li(), Ri = class extends Tn {
		constructor(e, t, n) {
			super(t), this.editorService = e, this.configurationService = n, this._register(this.registerCodeEditorOpenHandler(this.doOpenCodeEditor.bind(this))), this._register(this.registerCodeEditorOpenHandler(this.doOpenCodeEditorFromDiff.bind(this)));
		}
		getActiveCodeEditor() {
			let e = this.editorService.activeTextEditorControl;
			if (mr(e)) return e;
			if (fr(e)) return e.getModifiedEditor();
			let t = this.editorService.activeEditorPane?.getControl();
			return ur(t) && mr(t.activeCodeEditor) ? t.activeCodeEditor : null;
		}
		async doOpenCodeEditorFromDiff(e, t, n) {
			let r = this.editorService.activeTextEditorControl;
			if (!n && fr(r) && e.options && e.resource && t === r.getModifiedEditor() && r.getModel() && Me(e.resource, r.getModel()?.modified.uri)) {
				let t = r.getModifiedEditor();
				return Fi(e.options, t, _.Smooth), t;
			}
			return null;
		}
		async doOpenCodeEditor(e, t, n) {
			if (!this.configurationService.getValue().workbench?.editor?.enablePreviewFromCodeNavigation && t && !e.options?.pinned && !n && !Me(t.getModel()?.uri, e.resource)) {
				for (let e of this.editorService.visibleEditorPanes) if (dr(e.getControl()) === t) {
					e.group.pinEditor();
					break;
				}
			}
			let r = await this.editorService.openEditor(e, n ? -2 : -1);
			if (r) {
				let e = r.getControl();
				if (mr(e)) return e;
				if (ur(e) && mr(e.activeCodeEditor)) return e.activeCodeEditor;
			}
			return null;
		}
	}, Ri = v([
		E(0, gr),
		E(1, pt),
		E(2, Te)
	], Ri);
})), Bi, Vi = e((() => {
	S(), Bi = ke("textEditorService");
}));
ln(), Ne(), m(), H(), me(), qt(), Ve(), Ie(), er(), M(), R(), wn(), re(), Be(), oe(), Zt(), b(), W(), wt(), Sn(), Xn(), He(), se(), we(), An(), Bn(), ct(), it(), tt(), Qn(), nr(), on(), r(), Je(), ut(), le(), ae(), rr(), _t(), _n(), Nt(), Tt(), Pn(), Ut(), dn(), dt(), et(), qn(), yn(), Pt(), Hn(), At(), he(), gt(), d(), ze(), nn(), je(), Zn(), zt(), st(), sr(), Ce(), ir(), Ye(), kt(), ie(), xe(), o(), bt(), Vn(), En(), Ar(), si(), yr(), Br(), Ti(), $r(), Mi(), Mr(), Nr(), Pi(), Fr(), jr(), pi(), ii();
var Hi = /* @__PURE__ */ t({});
L(), S(), Vt(Hi);
var Ui = zn("diff-review-insert", sn.add, i(165, "Icon for 'Insert' in accessible diff viewer.")), Wi = zn("diff-review-remove", sn.remove, i(166, "Icon for 'Remove' in accessible diff viewer.")), Gi = zn("diff-review-close", sn.close, i(167, "Icon for 'Close' in accessible diff viewer.")), Ki = class extends n {
	static {
		this._ttPolicy = rn("diffReview", { createHTML: (e) => e });
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this._parentNode = e, this._visible = t, this._setVisible = n, this._canClose = r, this._width = i, this._height = a, this._diffs = o, this._models = s, this._instantiationService = c, this._state = B(this, (e) => {
			let t = this._visible.read(e);
			if (this._parentNode.style.visibility = t ? "visible" : "hidden", !t) return null;
			let n = e.store.add(this._instantiationService.createInstance(qi, this._diffs, this._models, this._setVisible, this._canClose));
			return {
				model: n,
				view: e.store.add(this._instantiationService.createInstance(ta, this._parentNode, n, this._width, this._height, this._models))
			};
		}).recomputeInitiallyAndOnChange(this._store);
	}
	next() {
		k((e) => {
			let t = this._visible.get();
			this._setVisible(!0, e), t && this._state.get().model.nextGroup(e);
		});
	}
	prev() {
		k((e) => {
			this._setVisible(!0, e), this._state.get().model.previousGroup(e);
		});
	}
	close() {
		k((e) => {
			this._setVisible(!1, e);
		});
	}
};
Ki = v([E(8, T)], Ki);
var qi = class extends n {
	constructor(e, t, n, r, i) {
		super(), this._diffs = e, this._models = t, this._setVisible = n, this.canClose = r, this._accessibilitySignalService = i, this._groups = D(this, []), this._currentGroupIdx = D(this, 0), this._currentElementIdx = D(this, 0), this.groups = this._groups, this.currentGroup = this._currentGroupIdx.map((e, t) => this._groups.read(t)[e]), this.currentGroupIndex = this._currentGroupIdx, this.currentElement = this._currentElementIdx.map((e, t) => this.currentGroup.read(t)?.lines[e]), this._register(O((e) => {
			let t = this._diffs.read(e);
			if (!t) {
				this._groups.set([], void 0);
				return;
			}
			let n = Yi(t, this._models.getOriginalModel().getLineCount(), this._models.getModifiedModel().getLineCount());
			k((e) => {
				let t = this._models.getModifiedPosition();
				if (t) {
					let r = n.findIndex((e) => t?.lineNumber < e.range.modified.endLineNumberExclusive);
					r !== -1 && this._currentGroupIdx.set(r, e);
				}
				this._groups.set(n, e);
			});
		})), this._register(O((e) => {
			let t = this.currentElement.read(e);
			t?.type === Q.Deleted ? this._accessibilitySignalService.playSignal(Y.diffLineDeleted, { source: "accessibleDiffViewer.currentElementChanged" }) : t?.type === Q.Added && this._accessibilitySignalService.playSignal(Y.diffLineInserted, { source: "accessibleDiffViewer.currentElementChanged" });
		})), this._register(O((e) => {
			let t = this.currentElement.read(e);
			if (t && t.type !== Q.Header) {
				let e = t.modifiedLineNumber ?? t.diff.modified.startLineNumber;
				this._models.modifiedSetSelection(N.fromPositions(new z(e, 1)));
			}
		}));
	}
	_goToGroupDelta(e, t) {
		let n = this.groups.get();
		!n || n.length <= 1 || fe(t, (t) => {
			this._currentGroupIdx.set(ne.ofLength(n.length).clipCyclic(this._currentGroupIdx.get() + e), t), this._currentElementIdx.set(0, t);
		});
	}
	nextGroup(e) {
		this._goToGroupDelta(1, e);
	}
	previousGroup(e) {
		this._goToGroupDelta(-1, e);
	}
	_goToLineDelta(e) {
		let t = this.currentGroup.get();
		!t || t.lines.length <= 1 || k((n) => {
			this._currentElementIdx.set(ne.ofLength(t.lines.length).clip(this._currentElementIdx.get() + e), n);
		});
	}
	goToNextLine() {
		this._goToLineDelta(1);
	}
	goToPreviousLine() {
		this._goToLineDelta(-1);
	}
	goToLine(e) {
		let t = this.currentGroup.get();
		if (!t) return;
		let n = t.lines.indexOf(e);
		n !== -1 && k((e) => {
			this._currentElementIdx.set(n, e);
		});
	}
	revealCurrentElementInEditor() {
		if (!this.canClose.get()) return;
		this._setVisible(!1, void 0);
		let e = this.currentElement.get();
		e && (e.type === Q.Deleted ? this._models.originalReveal(N.fromPositions(new z(e.originalLineNumber, 1))) : this._models.modifiedReveal(e.type === Q.Header ? void 0 : N.fromPositions(new z(e.modifiedLineNumber, 1))));
	}
	close() {
		this.canClose.get() && (this._setVisible(!1, void 0), this._models.modifiedFocus());
	}
};
qi = v([E(4, tr)], qi);
var Ji = 3;
function Yi(e, t, n) {
	let r = [];
	for (let i of xt(e, (e, t) => t.modified.startLineNumber - e.modified.endLineNumberExclusive < 2 * Ji)) {
		let e = [];
		e.push(new Zi());
		let a = new G(Math.max(1, i[0].original.startLineNumber - Ji), Math.min(i[i.length - 1].original.endLineNumberExclusive + Ji, t + 1)), o = new G(Math.max(1, i[0].modified.startLineNumber - Ji), Math.min(i[i.length - 1].modified.endLineNumberExclusive + Ji, n + 1));
		Wn(i, (t, n) => {
			let r = new G(t ? t.original.endLineNumberExclusive : a.startLineNumber, n ? n.original.startLineNumber : a.endLineNumberExclusive), i = new G(t ? t.modified.endLineNumberExclusive : o.startLineNumber, n ? n.modified.startLineNumber : o.endLineNumberExclusive);
			r.forEach((t) => {
				e.push(new ea(t, i.startLineNumber + (t - r.startLineNumber)));
			}), n && (n.original.forEach((t) => {
				e.push(new Qi(n, t));
			}), n.modified.forEach((t) => {
				e.push(new $i(n, t));
			}));
		});
		let s = i[0].modified.join(i[i.length - 1].modified), c = i[0].original.join(i[i.length - 1].original);
		r.push(new Xi(new Oi(s, c), e));
	}
	return r;
}
var Q;
(function(e) {
	e[e.Header = 0] = "Header", e[e.Unchanged = 1] = "Unchanged", e[e.Deleted = 2] = "Deleted", e[e.Added = 3] = "Added";
})(Q ||= {});
var Xi = class {
	constructor(e, t) {
		this.range = e, this.lines = t;
	}
}, Zi = class {
	constructor() {
		this.type = Q.Header;
	}
}, Qi = class {
	constructor(e, t) {
		this.diff = e, this.originalLineNumber = t, this.type = Q.Deleted, this.modifiedLineNumber = void 0;
	}
}, $i = class {
	constructor(e, t) {
		this.diff = e, this.modifiedLineNumber = t, this.type = Q.Added, this.originalLineNumber = void 0;
	}
}, ea = class {
	constructor(e, t) {
		this.originalLineNumber = e, this.modifiedLineNumber = t, this.type = Q.Unchanged;
	}
}, ta = class extends n {
	constructor(e, t, n, r, o, s) {
		super(), this._element = e, this._model = t, this._width = n, this._height = r, this._models = o, this._languageService = s, this.domNode = this._element, this.domNode.className = "monaco-component diff-review monaco-editor-background";
		let c = j("div");
		c.className = "diff-review-actions", this._actionBar = this._register(new vt(c)), this._register(O((e) => {
			this._actionBar.clear(), this._model.canClose.read(e) && this._actionBar.push(ce({
				id: "diffreview.close",
				label: i(168, "Close"),
				class: "close-diff-review " + a.asClassName(Gi),
				enabled: !0,
				run: async () => t.close()
			}), {
				label: !1,
				icon: !0
			});
		})), this._content = j("div"), this._content.className = "diff-review-content", this._content.setAttribute("role", "code"), this._scrollbar = this._register(new te(this._content, {})), Un(this.domNode, this._scrollbar.getDomNode(), c), this._register(O((e) => {
			this._height.read(e), this._width.read(e), this._scrollbar.scanDomNode();
		})), this._register(P(() => {
			Un(this.domNode);
		})), this._register(hi(this.domNode, {
			width: this._width,
			height: this._height
		})), this._register(hi(this._content, {
			width: this._width,
			height: this._height
		})), this._register(V((e, t) => {
			this._model.currentGroup.read(e), this._render(t);
		})), this._register(In(this.domNode, "keydown", (e) => {
			(e.equals(F.DownArrow) || e.equals(A.CtrlCmd | F.DownArrow) || e.equals(A.Alt | F.DownArrow)) && (e.preventDefault(), this._model.goToNextLine()), (e.equals(F.UpArrow) || e.equals(A.CtrlCmd | F.UpArrow) || e.equals(A.Alt | F.UpArrow)) && (e.preventDefault(), this._model.goToPreviousLine()), (e.equals(F.Escape) || e.equals(A.CtrlCmd | F.Escape) || e.equals(A.Alt | F.Escape) || e.equals(A.Shift | F.Escape)) && (e.preventDefault(), this._model.close()), (e.equals(F.Space) || e.equals(F.Enter)) && (e.preventDefault(), this._model.revealCurrentElementInEditor());
		}));
	}
	_render(e) {
		let t = this._models.getOriginalOptions(), n = this._models.getModifiedOptions(), r = j("div");
		r.className = "diff-review-table", r.setAttribute("role", "list"), r.setAttribute("aria-label", i(169, "Accessible Diff Viewer. Use arrow up and down to navigate.")), Ur(r, n.get(U.fontInfo)), Un(this._content, r);
		let a = this._models.getOriginalModel(), o = this._models.getModifiedModel();
		if (!a || !o) return;
		let s = a.getOptions(), c = o.getOptions(), l = n.get(U.lineHeight), u = this._model.currentGroup.get();
		for (let d of u?.lines || []) {
			if (!u) break;
			let f;
			if (d.type === Q.Header) {
				let e = j("div");
				e.className = "diff-review-row", e.setAttribute("role", "listitem");
				let t = u.range, n = this._model.currentGroupIndex.get(), r = this._model.groups.get().length, a = (e) => e === 0 ? i(170, "no lines changed") : e === 1 ? i(171, "1 line changed") : i(172, "{0} lines changed", e), o = a(t.original.length), s = a(t.modified.length);
				e.setAttribute("aria-label", i(173, "Difference {0} of {1}: original line {2}, {3}, modified line {4}, {5}", n + 1, r, t.original.startLineNumber, o, t.modified.startLineNumber, s));
				let c = j("div");
				c.className = "diff-review-cell diff-review-summary", c.appendChild(jt(`${n + 1}/${r}: @@ -${t.original.startLineNumber},${t.original.length} +${t.modified.startLineNumber},${t.modified.length} @@`)), e.appendChild(c), f = e;
			} else f = this._createRow(d, l, this._width.get(), t, a, s, n, o, c);
			r.appendChild(f);
			let p = B((e) => this._model.currentElement.read(e) === d);
			e.add(O((e) => {
				let t = p.read(e);
				f.tabIndex = t ? 0 : -1, t && f.focus();
			})), e.add(Pe(f, "focus", () => {
				this._model.goToLine(d);
			}));
		}
		this._scrollbar.scanDomNode();
	}
	_createRow(e, t, n, r, o, s, c, l, u) {
		let d = r.get(U.layoutInfo), f = d.glyphMarginWidth + d.lineNumbersWidth, p = c.get(U.layoutInfo), m = 10 + p.glyphMarginWidth + p.lineNumbersWidth, h = "diff-review-row", g = "", _ = null;
		switch (e.type) {
			case Q.Added:
				h = "diff-review-row line-insert", g = " char-insert", _ = Ui;
				break;
			case Q.Deleted:
				h = "diff-review-row line-delete", g = " char-delete", _ = Wi;
				break;
		}
		let v = j("div");
		v.style.minWidth = n + "px", v.className = h, v.setAttribute("role", "listitem"), v.ariaLevel = "";
		let y = j("div");
		y.className = "diff-review-cell", y.style.height = `${t}px`, v.appendChild(y);
		let b = j("span");
		b.style.width = f + "px", b.style.minWidth = f + "px", b.className = "diff-review-line-number" + g, e.originalLineNumber === void 0 ? b.innerText = "\xA0" : b.appendChild(jt(String(e.originalLineNumber))), y.appendChild(b);
		let x = j("span");
		x.style.width = m + "px", x.style.minWidth = m + "px", x.style.paddingRight = "10px", x.className = "diff-review-line-number" + g, e.modifiedLineNumber === void 0 ? x.innerText = "\xA0" : x.appendChild(jt(String(e.modifiedLineNumber))), y.appendChild(x);
		let S = j("span");
		if (S.className = "diff-review-spacer", _) {
			let e = j("span");
			e.className = a.asClassName(_), e.innerText = "\xA0\xA0", S.appendChild(e);
		} else S.innerText = "\xA0\xA0";
		y.appendChild(S);
		let C;
		if (e.modifiedLineNumber !== void 0) {
			let t = this._getLineHtml(l, c, u.tabSize, e.modifiedLineNumber, this._languageService.languageIdCodec);
			Ki._ttPolicy && (t = Ki._ttPolicy.createHTML(t)), y.insertAdjacentHTML("beforeend", t), C = l.getLineContent(e.modifiedLineNumber);
		} else {
			let t = this._getLineHtml(o, r, s.tabSize, e.originalLineNumber, this._languageService.languageIdCodec);
			Ki._ttPolicy && (t = Ki._ttPolicy.createHTML(t)), y.insertAdjacentHTML("beforeend", t), C = o.getLineContent(e.originalLineNumber);
		}
		C.length === 0 && (C = i(174, "blank"));
		let ee = "";
		switch (e.type) {
			case Q.Unchanged:
				ee = e.originalLineNumber === e.modifiedLineNumber ? i(175, "{0} unchanged line {1}", C, e.originalLineNumber) : i(176, "{0} original line {1} modified line {2}", C, e.originalLineNumber, e.modifiedLineNumber);
				break;
			case Q.Added:
				ee = i(177, "+ {0} modified line {1}", C, e.modifiedLineNumber);
				break;
			case Q.Deleted:
				ee = i(178, "- {0} original line {1}", C, e.originalLineNumber);
				break;
		}
		return v.setAttribute("aria-label", ee), v;
	}
	_getLineHtml(e, t, n, r, i) {
		let a = e.getLineContent(r), o = t.get(U.fontInfo), s = t.get(U.scrollbar).verticalScrollbarSize, c = Gt.createEmpty(a, i), l = gi.isBasicASCII(a, e.mightContainNonBasicASCII()), u = gi.containsRTL(a, l, e.mightContainRTL());
		return bi(new wi(o.isMonospace && !t.get(U.disableMonospaceOptimizations), o.canUseHalfwidthRightwardsArrow, a, !1, l, u, 0, c, [], n, 0, o.spaceWidth, o.middotWidth, o.wsmiddotWidth, t.get(U.stopRenderingLineAfter), t.get(U.renderWhitespace), t.get(U.renderControlCharacters), t.get(U.fontLigatures) !== Lt.OFF, null, null, s)).html;
	}
};
ta = v([E(5, g)], ta);
var na = class {
	constructor(e) {
		this.editors = e;
	}
	getOriginalModel() {
		return this.editors.original.getModel();
	}
	getOriginalOptions() {
		return this.editors.original.getOptions();
	}
	originalReveal(e) {
		this.editors.original.revealRange(e), this.editors.original.setSelection(e), this.editors.original.focus();
	}
	getModifiedModel() {
		return this.editors.modified.getModel();
	}
	getModifiedOptions() {
		return this.editors.modified.getOptions();
	}
	modifiedReveal(e) {
		e && (this.editors.modified.revealRange(e), this.editors.modified.setSelection(e)), this.editors.modified.focus();
	}
	modifiedSetSelection(e) {
		this.editors.modified.setSelection(e);
	}
	modifiedFocus() {
		this.editors.modified.focus();
	}
	getModifiedPosition() {
		return this.editors.modified.getPosition() ?? void 0;
	}
};
di(), Jr(), Wr(), W(), ir(), Sn(), m(), Tt(), H(), b(), At(), pi(), it(), Ie(), Yr(), re(), M(), R();
var ra = class e extends n {
	static {
		this.movedCodeBlockPadding = 4;
	}
	constructor(t, n, r, i, a) {
		super(), this._rootElement = t, this._diffModel = n, this._originalEditorLayoutInfo = r, this._modifiedEditorLayoutInfo = i, this._editors = a, this._originalScrollTop = K(this, this._editors.original.onDidScrollChange, () => this._editors.original.getScrollTop()), this._modifiedScrollTop = K(this, this._editors.modified.onDidScrollChange, () => this._editors.modified.getScrollTop()), this._viewZonesChanged = J("onDidChangeViewZones", this._editors.modified.onDidChangeViewZones), this.width = D(this, 0), this._modifiedViewZonesChangedSignal = J("modified.onDidChangeViewZones", this._editors.modified.onDidChangeViewZones), this._originalViewZonesChangedSignal = J("original.onDidChangeViewZones", this._editors.original.onDidChangeViewZones), this._state = B(this, (t) => {
			this._element.replaceChildren();
			let n = this._diffModel.read(t), r = n?.diff.read(t)?.movedTexts;
			if (!r || r.length === 0) {
				this.width.set(0, void 0);
				return;
			}
			this._viewZonesChanged.read(t);
			let i = this._originalEditorLayoutInfo.read(t), a = this._modifiedEditorLayoutInfo.read(t);
			if (!i || !a) {
				this.width.set(0, void 0);
				return;
			}
			this._modifiedViewZonesChangedSignal.read(t), this._originalViewZonesChangedSignal.read(t);
			let o = r.map((e) => {
				function n(e, t) {
					return (t.getTopForLineNumber(e.startLineNumber, !0) + t.getTopForLineNumber(e.endLineNumberExclusive, !0)) / 2;
				}
				let r = n(e.lineRangeMapping.original, this._editors.original), i = this._originalScrollTop.read(t), a = n(e.lineRangeMapping.modified, this._editors.modified), o = this._modifiedScrollTop.read(t), s = r - i, c = a - o;
				return {
					range: new ne(Math.min(r, a), Math.max(r, a)),
					from: s,
					to: c,
					fromWithoutScroll: r,
					toWithoutScroll: a,
					move: e
				};
			});
			o.sort(Qe(Mt((e) => e.fromWithoutScroll > e.toWithoutScroll, St), Mt((e) => e.fromWithoutScroll > e.toWithoutScroll ? e.fromWithoutScroll : -e.toWithoutScroll, Jt)));
			let s = ia.compute(o.map((e) => e.range)), c = i.verticalScrollbarWidth, l = (s.getTrackCount() - 1) * 10 + 20, u = c + l + (a.contentLeft - e.movedCodeBlockPadding), d = 0;
			for (let e of o) {
				let r = s.getTrack(d), i = c + 10 + r * 10, o = u, l = a.glyphMarginWidth + a.lineNumbersWidth, f = an("http://www.w3.org/2000/svg", "rect");
				f.classList.add("arrow-rectangle"), f.setAttribute("x", `${o - l}`), f.setAttribute("y", `${e.to - 18 / 2}`), f.setAttribute("width", `${l}`), f.setAttribute("height", "18"), this._element.appendChild(f);
				let p = an("http://www.w3.org/2000/svg", "g"), m = an("http://www.w3.org/2000/svg", "path");
				m.setAttribute("d", `M 0 ${e.from} L ${i} ${e.from} L ${i} ${e.to} L ${o - 15} ${e.to}`), m.setAttribute("fill", "none"), p.appendChild(m);
				let h = an("http://www.w3.org/2000/svg", "polygon");
				h.classList.add("arrow"), t.store.add(O((t) => {
					m.classList.toggle("currentMove", e.move === n.activeMovedText.read(t)), h.classList.toggle("currentMove", e.move === n.activeMovedText.read(t));
				})), h.setAttribute("points", `${o - 15},${e.to - 15 / 2} ${o},${e.to} ${o - 15},${e.to + 15 / 2}`), p.appendChild(h), this._element.appendChild(p), d++;
			}
			this.width.set(l, void 0);
		}), this._element = an("http://www.w3.org/2000/svg", "svg"), this._element.setAttribute("class", "moved-blocks-lines"), this._rootElement.appendChild(this._element), this._register(P(() => this._element.remove())), this._register(O((t) => {
			let n = this._originalEditorLayoutInfo.read(t), r = this._modifiedEditorLayoutInfo.read(t);
			!n || !r || (this._element.style.left = `${n.width - n.verticalScrollbarWidth}px`, this._element.style.height = `${n.height}px`, this._element.style.width = `${n.verticalScrollbarWidth + n.contentLeft - e.movedCodeBlockPadding + this.width.read(t)}px`);
		})), this._register(C(this._state));
		let o = B((e) => {
			let t = this._diffModel.read(e)?.diff.read(e);
			return t ? t.movedTexts.map((e) => ({
				move: e,
				original: new ki(Re(e.lineRangeMapping.original.startLineNumber - 1), 18),
				modified: new ki(Re(e.lineRangeMapping.modified.startLineNumber - 1), 18)
			})) : [];
		});
		this._register(br(this._editors.original, o.map((e) => e.map((e) => e.original)))), this._register(br(this._editors.modified, o.map((e) => e.map((e) => e.modified)))), this._register(V((e, t) => {
			let n = o.read(e);
			for (let e of n) t.add(new aa(this._editors.original, e.original, e.move, "original", this._diffModel.get())), t.add(new aa(this._editors.modified, e.modified, e.move, "modified", this._diffModel.get()));
		}));
		let s = J("original.onDidFocusEditorWidget", (e) => this._editors.original.onDidFocusEditorWidget(() => setTimeout(() => e(void 0), 0))), c = J("modified.onDidFocusEditorWidget", (e) => this._editors.modified.onDidFocusEditorWidget(() => setTimeout(() => e(void 0), 0))), l = "modified";
		this._register(Le({ changeTracker: {
			createChangeSummary: () => void 0,
			handleChange: (e, t) => (e.didChange(s) && (l = "original"), e.didChange(c) && (l = "modified"), !0)
		} }, (e) => {
			s.read(e), c.read(e);
			let t = this._diffModel.read(e);
			if (!t) return;
			let n = t.diff.read(e), r;
			if (n && l === "original") {
				let t = this._editors.originalCursor.read(e);
				t && (r = n.movedTexts.find((e) => e.lineRangeMapping.original.contains(t.lineNumber)));
			}
			if (n && l === "modified") {
				let t = this._editors.modifiedCursor.read(e);
				t && (r = n.movedTexts.find((e) => e.lineRangeMapping.modified.contains(t.lineNumber)));
			}
			r !== t.movedTextToCompare.read(void 0) && t.movedTextToCompare.set(void 0, void 0), t.setActiveMovedText(r);
		}));
	}
}, ia = class e {
	static compute(t) {
		let n = [], r = [];
		for (let e of t) {
			let t = n.findIndex((t) => !t.intersectsStrict(e));
			t === -1 && (n.length >= 6 ? t = mt(n, Mt((t) => t.intersectWithRangeLength(e), Jt)) : (t = n.length, n.push(new Xe()))), n[t].addRange(e), r.push(t);
		}
		return new e(n.length, r);
	}
	constructor(e, t) {
		this._trackCount = e, this.trackPerLineIdx = t;
	}
	getTrack(e) {
		return this.trackPerLineIdx[e];
	}
	getTrackCount() {
		return this._trackCount;
	}
}, aa = class extends kr {
	constructor(e, t, n, r, o) {
		let s = w("div.diff-hidden-lines-widget");
		super(e, t, s.root), this._editor = e, this._move = n, this._kind = r, this._diffModel = o, this._nodes = w("div.diff-moved-code-block", { style: { marginRight: "4px" } }, [w("div.text-content@textContent"), w("div.action-bar@actionBar")]), s.root.appendChild(this._nodes.root);
		let c = K(this._editor.onDidLayoutChange, () => this._editor.getLayoutInfo());
		this._register(hi(this._nodes.root, { paddingRight: c.map((e) => e.verticalScrollbarWidth) }));
		let l;
		l = n.changes.length > 0 ? this._kind === "original" ? i(198, "Code moved with changes to line {0}-{1}", this._move.lineRangeMapping.modified.startLineNumber, this._move.lineRangeMapping.modified.endLineNumberExclusive - 1) : i(199, "Code moved with changes from line {0}-{1}", this._move.lineRangeMapping.original.startLineNumber, this._move.lineRangeMapping.original.endLineNumberExclusive - 1) : this._kind === "original" ? i(200, "Code moved to line {0}-{1}", this._move.lineRangeMapping.modified.startLineNumber, this._move.lineRangeMapping.modified.endLineNumberExclusive - 1) : i(201, "Code moved from line {0}-{1}", this._move.lineRangeMapping.original.startLineNumber, this._move.lineRangeMapping.original.endLineNumberExclusive - 1);
		let u = this._register(new vt(this._nodes.actionBar, { highlightToggledItems: !0 })), d = new qe("", l, "", !1);
		u.push(d, {
			icon: !1,
			label: !0
		});
		let f = new qe("", "Compare", a.asClassName(sn.compareChanges), !0, () => {
			this._editor.focus(), this._diffModel.movedTextToCompare.set(this._diffModel.movedTextToCompare.get() === n ? void 0 : this._move, void 0);
		});
		this._register(O((e) => {
			let t = this._diffModel.movedTextToCompare.read(e) === n;
			f.checked = t;
		})), u.push(f, {
			icon: !1,
			label: !0
		});
	}
};
H(), b(), pi(), M();
var oa = class extends n {
	constructor(e, t, n, r) {
		super(), this._editors = e, this._diffModel = t, this._options = n, this._decorations = B(this, (e) => {
			let t = this._diffModel.read(e), n = t?.diff.read(e);
			if (!n) return null;
			let r = this._diffModel.read(e).movedTextToCompare.read(e), i = this._options.renderIndicators.read(e), a = this._options.showEmptyDecorations.read(e), o = [], s = [];
			if (!r) for (let r of n.mappings) if (r.lineRangeMapping.original.isEmpty || o.push({
				range: r.lineRangeMapping.original.toInclusiveRange(),
				options: i ? xi : li
			}), r.lineRangeMapping.modified.isEmpty || s.push({
				range: r.lineRangeMapping.modified.toInclusiveRange(),
				options: i ? ci : Ei
			}), r.lineRangeMapping.modified.isEmpty || r.lineRangeMapping.original.isEmpty) r.lineRangeMapping.original.isEmpty || o.push({
				range: r.lineRangeMapping.original.toInclusiveRange(),
				options: fi
			}), r.lineRangeMapping.modified.isEmpty || s.push({
				range: r.lineRangeMapping.modified.toInclusiveRange(),
				options: vi
			});
			else {
				let n = this._options.useTrueInlineDiffRendering.read(e) && Rr(r.lineRangeMapping);
				for (let e of r.lineRangeMapping.innerChanges || []) if (r.lineRangeMapping.original.contains(e.originalRange.startLineNumber) && o.push({
					range: e.originalRange,
					options: e.originalRange.isEmpty() && a ? _i : oi
				}), r.lineRangeMapping.modified.contains(e.modifiedRange.startLineNumber) && s.push({
					range: e.modifiedRange,
					options: e.modifiedRange.isEmpty() && a && !n ? Ci : yi
				}), n) {
					let n = t.model.original.getValueInRange(e.originalRange);
					s.push({
						range: e.modifiedRange,
						options: {
							description: "deleted-text",
							before: {
								content: n,
								inlineClassName: "inline-deleted-text"
							},
							zIndex: 1e5,
							showIfCollapsed: !0
						}
					});
				}
			}
			if (r) for (let e of r.changes) {
				let t = e.original.toInclusiveRange();
				t && o.push({
					range: t,
					options: i ? xi : li
				});
				let n = e.modified.toInclusiveRange();
				n && s.push({
					range: n,
					options: i ? ci : Ei
				});
				for (let t of e.innerChanges || []) o.push({
					range: t.originalRange,
					options: oi
				}), s.push({
					range: t.modifiedRange,
					options: yi
				});
			}
			let c = this._diffModel.read(e).activeMovedText.read(e);
			for (let e of n.movedTexts) o.push({
				range: e.lineRangeMapping.original.toInclusiveRange(),
				options: {
					description: "moved",
					blockClassName: "movedOriginal" + (e === c ? " currentMove" : ""),
					blockPadding: [
						ra.movedCodeBlockPadding,
						0,
						ra.movedCodeBlockPadding,
						ra.movedCodeBlockPadding
					]
				}
			}), s.push({
				range: e.lineRangeMapping.modified.toInclusiveRange(),
				options: {
					description: "moved",
					blockClassName: "movedModified" + (e === c ? " currentMove" : ""),
					blockPadding: [
						4,
						0,
						4,
						4
					]
				}
			});
			return {
				originalDecorations: o,
				modifiedDecorations: s
			};
		}), this._register(Hr(this._editors.original, this._decorations.map((e) => e?.originalDecorations || []))), this._register(Hr(this._editors.modified, this._decorations.map((e) => e?.modifiedDecorations || [])));
	}
};
Vr(), L(), W(), ue(), H(), b(), pi(), je(), An(), ai(), lt(), Be(), M(), R(), Yr();
var $, sa = class extends n {
	static {
		$ = this;
	}
	static {
		this.ONE_OVERVIEW_WIDTH = 15;
	}
	static {
		this.ENTIRE_DIFF_OVERVIEW_WIDTH = this.ONE_OVERVIEW_WIDTH * 2;
	}
	constructor(e, t, n, r, i, a, o) {
		super(), this._editors = e, this._rootElement = t, this._diffModel = n, this._rootWidth = r, this._rootHeight = i, this._modifiedEditorLayoutInfo = a, this._themeService = o, this.width = $.ENTIRE_DIFF_OVERVIEW_WIDTH;
		let s = K(this._themeService.onDidColorThemeChange, () => this._themeService.getColorTheme()), c = B((e) => {
			let t = s.read(e);
			return {
				insertColor: t.getColor(hn) || (t.getColor(Wt) || fn).transparent(2),
				removeColor: t.getColor(Mn) || (t.getColor(Ct) || On).transparent(2)
			};
		}), l = cn(j("div"));
		l.setClassName("diffViewport"), l.setPosition("absolute");
		let u = w("div.diffOverview", { style: {
			position: "absolute",
			top: "0px",
			width: $.ENTIRE_DIFF_OVERVIEW_WIDTH + "px"
		} }).root;
		this._register(Er(u, l.domNode)), this._register(In(u, xn.POINTER_DOWN, (e) => {
			this._editors.modified.delegateVerticalScrollbarPointerDown(e);
		})), this._register(Pe(u, xn.MOUSE_WHEEL, (e) => {
			this._editors.modified.delegateScrollFromMouseWheelEvent(e);
		}, { passive: !1 })), this._register(Er(this._rootElement, u)), this._register(V((e, t) => {
			let n = this._diffModel.read(e), r = this._editors.original.createOverviewRuler("original diffOverviewRuler");
			r && (t.add(r), t.add(Er(u, r.getDomNode())));
			let i = this._editors.modified.createOverviewRuler("modified diffOverviewRuler");
			if (i && (t.add(i), t.add(Er(u, i.getDomNode()))), !r || !i) return;
			let a = J("viewZoneChanged", this._editors.original.onDidChangeViewZones), o = J("viewZoneChanged", this._editors.modified.onDidChangeViewZones), s = J("hiddenRangesChanged", this._editors.original.onDidChangeHiddenAreas), d = J("hiddenRangesChanged", this._editors.modified.onDidChangeHiddenAreas);
			t.add(O((e) => {
				a.read(e), o.read(e), s.read(e), d.read(e);
				let t = c.read(e), l = n?.diff.read(e)?.mappings;
				function u(e, t, n) {
					let r = n._getViewModel();
					return r ? e.filter((e) => e.length > 0).map((e) => {
						let n = r.coordinatesConverter.convertModelPositionToViewPosition(new z(e.startLineNumber, 1)), i = r.coordinatesConverter.convertModelPositionToViewPosition(new z(e.endLineNumberExclusive, 1)), a = i.lineNumber - n.lineNumber;
						return new Si(n.lineNumber, i.lineNumber, a, t.toString());
					}) : [];
				}
				let f = u((l || []).map((e) => e.lineRangeMapping.original), t.removeColor, this._editors.original), p = u((l || []).map((e) => e.lineRangeMapping.modified), t.insertColor, this._editors.modified);
				r?.setZones(f), i?.setZones(p);
			})), t.add(O((e) => {
				let t = this._rootHeight.read(e), n = this._rootWidth.read(e), a = this._modifiedEditorLayoutInfo.read(e);
				if (a) {
					let n = $.ENTIRE_DIFF_OVERVIEW_WIDTH - 2 * $.ONE_OVERVIEW_WIDTH;
					r.setLayout({
						top: 0,
						height: t,
						right: n + $.ONE_OVERVIEW_WIDTH,
						width: $.ONE_OVERVIEW_WIDTH
					}), i.setLayout({
						top: 0,
						height: t,
						right: 0,
						width: $.ONE_OVERVIEW_WIDTH
					});
					let o = this._editors.modifiedScrollTop.read(e), s = this._editors.modifiedScrollHeight.read(e), c = this._editors.modified.getOption(U.scrollbar), u = new Cn(c.verticalHasArrows ? c.arrowSize : 0, c.verticalScrollbarSize, 0, a.height, s, o);
					l.setTop(u.getSliderPosition()), l.setHeight(u.getSliderSize());
				} else l.setTop(0), l.setHeight(0);
				u.style.height = t + "px", u.style.left = n - $.ENTIRE_DIFF_OVERVIEW_WIDTH + "px", l.setWidth($.ENTIRE_DIFF_OVERVIEW_WIDTH);
			}));
		}));
	}
};
sa = $ = v([E(6, pt)], sa), L(), H(), b(), je(), An(), Ie(), S(), Be(), M(), R();
var ca = class extends n {
	get onDidContentSizeChange() {
		return this._onDidContentSizeChange.event;
	}
	constructor(e, t, n, r, i, a, o, s) {
		super(), this.originalEditorElement = e, this.modifiedEditorElement = t, this._options = n, this._argCodeEditorWidgetOptions = r, this._createInnerEditor = i, this._contextKeyService = a, this._instantiationService = o, this._keybindingService = s, this.original = this._register(this._createLeftHandSideEditor(this._options.editorOptions.get(), this._argCodeEditorWidgetOptions.originalEditor || {})), this.modified = this._register(this._createRightHandSideEditor(this._options.editorOptions.get(), this._argCodeEditorWidgetOptions.modifiedEditor || {})), this._onDidContentSizeChange = this._register(new u()), this.modifiedScrollTop = K(this, this.modified.onDidScrollChange, () => this.modified.getScrollTop()), this.modifiedScrollHeight = K(this, this.modified.onDidScrollChange, () => this.modified.getScrollHeight()), this.modifiedObs = mi(this.modified), this.originalObs = mi(this.original), this.modifiedModel = this.modifiedObs.model, this.modifiedSelections = K(this, this.modified.onDidChangeCursorSelection, () => this.modified.getSelections() ?? []), this.modifiedCursor = mn({
			owner: this,
			equalsFn: z.equals
		}, (e) => this.modifiedSelections.read(e)[0]?.getPosition() ?? new z(1, 1)), this.originalCursor = K(this, this.original.onDidChangeCursorPosition, () => this.original.getPosition() ?? new z(1, 1)), this.isOriginalFocused = mi(this.original).isFocused, this.isModifiedFocused = mi(this.modified).isFocused, this.isFocused = B(this, (e) => this.isOriginalFocused.read(e) || this.isModifiedFocused.read(e)), this._argCodeEditorWidgetOptions = null, this._register(Le({ changeTracker: {
			createChangeSummary: () => ({}),
			handleChange: (e, t) => (e.didChange(n.editorOptions) && Object.assign(t, e.change.changedOptions), !0)
		} }, (e, t) => {
			n.editorOptions.read(e), this._options.renderSideBySide.read(e), this.modified.updateOptions(this._adjustOptionsForRightHandSide(e, t)), this.original.updateOptions(this._adjustOptionsForLeftHandSide(e, t));
		}));
	}
	_createLeftHandSideEditor(e, t) {
		let n = this._adjustOptionsForLeftHandSide(void 0, e), r = this._constructInnerEditor(this._instantiationService, this.originalEditorElement, n, t), i = this._contextKeyService.createKey("isInDiffLeftEditor", r.hasWidgetFocus());
		return this._register(r.onDidFocusEditorWidget(() => i.set(!0))), this._register(r.onDidBlurEditorWidget(() => i.set(!1))), r;
	}
	_createRightHandSideEditor(e, t) {
		let n = this._adjustOptionsForRightHandSide(void 0, e), r = this._constructInnerEditor(this._instantiationService, this.modifiedEditorElement, n, t), i = this._contextKeyService.createKey("isInDiffRightEditor", r.hasWidgetFocus());
		return this._register(r.onDidFocusEditorWidget(() => i.set(!0))), this._register(r.onDidBlurEditorWidget(() => i.set(!1))), r;
	}
	_constructInnerEditor(e, t, n, r) {
		let i = this._createInnerEditor(e, t, n, r);
		return this._register(i.onDidContentSizeChange((e) => {
			let t = this.original.getContentWidth() + this.modified.getContentWidth() + sa.ENTIRE_DIFF_OVERVIEW_WIDTH, n = Math.max(this.modified.getContentHeight(), this.original.getContentHeight());
			this._onDidContentSizeChange.fire({
				contentHeight: n,
				contentWidth: t,
				contentHeightChanged: e.contentHeightChanged,
				contentWidthChanged: e.contentWidthChanged
			});
		})), i;
	}
	_adjustOptionsForLeftHandSide(e, t) {
		let n = this._adjustOptionsForSubEditor(t);
		return this._options.renderSideBySide.get() ? (n.unicodeHighlight = this._options.editorOptions.get().unicodeHighlight || {}, n.wordWrapOverride1 = this._options.diffWordWrap.get()) : (n.wordWrapOverride1 = "off", n.wordWrapOverride2 = "off", n.stickyScroll = { enabled: !1 }, n.unicodeHighlight = {
			nonBasicASCII: !1,
			ambiguousCharacters: !1,
			invisibleCharacters: !1
		}), n.glyphMargin = this._options.renderSideBySide.get(), t.originalAriaLabel && (n.ariaLabel = t.originalAriaLabel), n.ariaLabel = this._updateAriaLabel(n.ariaLabel), n.readOnly = !this._options.originalEditable.get(), n.dropIntoEditor = { enabled: !n.readOnly }, n.extraEditorClassName = "original-in-monaco-diff-editor", n;
	}
	_adjustOptionsForRightHandSide(e, t) {
		let n = this._adjustOptionsForSubEditor(t);
		return t.modifiedAriaLabel && (n.ariaLabel = t.modifiedAriaLabel), n.ariaLabel = this._updateAriaLabel(n.ariaLabel), n.wordWrapOverride1 = this._options.diffWordWrap.get(), n.revealHorizontalRightPadding = or.revealHorizontalRightPadding.defaultValue + sa.ENTIRE_DIFF_OVERVIEW_WIDTH, n.scrollbar.verticalHasArrows = !1, n.extraEditorClassName = "modified-in-monaco-diff-editor", n;
	}
	_adjustOptionsForSubEditor(e) {
		let t = {
			...e,
			dimension: {
				height: 0,
				width: 0
			}
		};
		return t.inDiffEditor = !0, t.automaticLayout = !1, t.allowVariableLineHeights = !1, t.allowVariableFonts = !1, t.allowVariableFontsInAccessibilityMode = !1, t.scrollbar = { ...t.scrollbar || {} }, t.folding = !1, t.codeLens = this._options.diffCodeLens.get(), t.fixedOverflowWidgets = !0, t.minimap = { ...t.minimap || {} }, t.minimap.enabled = !1, this._options.hideUnchangedRegions.get() ? t.stickyScroll = { enabled: !1 } : t.stickyScroll = this._options.editorOptions.get().stickyScroll, t;
	}
	_updateAriaLabel(e) {
		e ||= "";
		let t = i(179, " use {0} to open the accessibility help.", this._keybindingService.lookupKeybinding("editor.action.accessibilityHelp")?.getAriaLabel());
		return this._options.accessibilityVerbose.get() ? e + t : e ? e.replaceAll(t, "") : "";
	}
};
ca = v([
	E(5, Dn),
	E(6, T),
	E(7, Et)
], ca), Nn(), H(), b(), M(), re(), R();
var la = class {
	resetSash() {
		this._sashRatio.set(void 0, void 0);
	}
	constructor(e, t) {
		this._options = e, this.dimensions = t, this.sashLeft = jn(this, (e) => {
			let t = this._sashRatio.read(e) ?? this._options.splitViewDefaultRatio.read(e);
			return this._computeSashLeft(t, e);
		}, (e, t) => {
			let n = this.dimensions.width.get();
			this._sashRatio.set(e / n, t);
		}), this._sashRatio = D(this, void 0);
	}
	_computeSashLeft(e, t) {
		let n = this.dimensions.width.read(t), r = Math.floor(this._options.splitViewDefaultRatio.read(t) * n), i = this._options.enableSplitViewResizing.read(t) ? Math.floor(e * n) : r;
		return n <= 200 ? r : i < 100 ? 100 : i > n - 100 ? n - 100 : i;
	}
}, ua = class extends n {
	constructor(e, t, n, r, i, a) {
		super(), this._domNode = e, this._dimensions = t, this._enabled = n, this._boundarySashes = r, this.sashLeft = i, this._resetSash = a, this._sash = this._register(new yt(this._domNode, {
			getVerticalSashTop: (e) => 0,
			getVerticalSashLeft: (e) => this.sashLeft.get(),
			getVerticalSashHeight: (e) => this._dimensions.height.get()
		}, { orientation: kn.VERTICAL })), this._startSashPosition = void 0, this._register(this._sash.onDidStart(() => {
			this._startSashPosition = this.sashLeft.get();
		})), this._register(this._sash.onDidChange((e) => {
			this.sashLeft.set(this._startSashPosition + (e.currentX - e.startX), void 0);
		})), this._register(this._sash.onDidEnd(() => this._sash.layout())), this._register(this._sash.onDidReset(() => this._resetSash())), this._register(O((e) => {
			let t = this._boundarySashes.read(e);
			t && (this._sash.orthogonalEndSash = t.bottom);
		})), this._register(O((e) => {
			let t = this._enabled.read(e);
			this._sash.state = t ? gn.Enabled : gn.Disabled, this.sashLeft.read(e), this._dimensions.height.read(e), this._sash.layout();
		}));
	}
};
me(), H(), Ee();
var da = class e extends n {
	constructor() {
		super(...arguments), this._id = ++e.idCounter, this._onDidDispose = this._register(new u()), this.onDidDispose = this._onDidDispose.event;
	}
	static {
		this.idCounter = 0;
	}
	getId() {
		return this.getEditorType() + ":v2:" + this._id;
	}
	getVisibleColumnFromPosition(e) {
		return this._targetEditor.getVisibleColumnFromPosition(e);
	}
	getStatusbarColumn(e) {
		return this._targetEditor.getStatusbarColumn(e);
	}
	getPosition() {
		return this._targetEditor.getPosition();
	}
	setPosition(e, t = "api") {
		this._targetEditor.setPosition(e, t);
	}
	revealLine(e, t = _.Smooth) {
		this._targetEditor.revealLine(e, t);
	}
	revealLineInCenter(e, t = _.Smooth) {
		this._targetEditor.revealLineInCenter(e, t);
	}
	revealLineInCenterIfOutsideViewport(e, t = _.Smooth) {
		this._targetEditor.revealLineInCenterIfOutsideViewport(e, t);
	}
	revealLineNearTop(e, t = _.Smooth) {
		this._targetEditor.revealLineNearTop(e, t);
	}
	revealPosition(e, t = _.Smooth) {
		this._targetEditor.revealPosition(e, t);
	}
	revealPositionInCenter(e, t = _.Smooth) {
		this._targetEditor.revealPositionInCenter(e, t);
	}
	revealPositionInCenterIfOutsideViewport(e, t = _.Smooth) {
		this._targetEditor.revealPositionInCenterIfOutsideViewport(e, t);
	}
	revealPositionNearTop(e, t = _.Smooth) {
		this._targetEditor.revealPositionNearTop(e, t);
	}
	getSelection() {
		return this._targetEditor.getSelection();
	}
	getSelections() {
		return this._targetEditor.getSelections();
	}
	setSelection(e, t = "api") {
		this._targetEditor.setSelection(e, t);
	}
	setSelections(e, t = "api") {
		this._targetEditor.setSelections(e, t);
	}
	revealLines(e, t, n = _.Smooth) {
		this._targetEditor.revealLines(e, t, n);
	}
	revealLinesInCenter(e, t, n = _.Smooth) {
		this._targetEditor.revealLinesInCenter(e, t, n);
	}
	revealLinesInCenterIfOutsideViewport(e, t, n = _.Smooth) {
		this._targetEditor.revealLinesInCenterIfOutsideViewport(e, t, n);
	}
	revealLinesNearTop(e, t, n = _.Smooth) {
		this._targetEditor.revealLinesNearTop(e, t, n);
	}
	revealRange(e, t = _.Smooth, n = !1, r = !0) {
		this._targetEditor.revealRange(e, t, n, r);
	}
	revealRangeInCenter(e, t = _.Smooth) {
		this._targetEditor.revealRangeInCenter(e, t);
	}
	revealRangeInCenterIfOutsideViewport(e, t = _.Smooth) {
		this._targetEditor.revealRangeInCenterIfOutsideViewport(e, t);
	}
	revealRangeNearTop(e, t = _.Smooth) {
		this._targetEditor.revealRangeNearTop(e, t);
	}
	revealRangeNearTopIfOutsideViewport(e, t = _.Smooth) {
		this._targetEditor.revealRangeNearTopIfOutsideViewport(e, t);
	}
	revealRangeAtTop(e, t = _.Smooth) {
		this._targetEditor.revealRangeAtTop(e, t);
	}
	getSupportedActions() {
		return this._targetEditor.getSupportedActions();
	}
	focus() {
		this._targetEditor.focus();
	}
	trigger(e, t, n) {
		this._targetEditor.trigger(e, t, n);
	}
	createDecorationsCollection(e) {
		return this._targetEditor.createDecorationsCollection(e);
	}
	changeDecorations(e) {
		return this._targetEditor.changeDecorations(e);
	}
};
$e(), ar(), It(), Tr(), Sr(), ji(), Sn();
var fa = class extends rt {
	constructor(e) {
		super(), this._getContext = e;
	}
	runAction(e, t) {
		let n = this._getContext();
		return super.runAction(e, n);
	}
};
W(), H(), b(), tt(), it(), Be(), Yr(), R(), wn(), re();
var pa = class extends n {
	constructor(e, t, n) {
		super(), this._editor = e, this._domNode = t, this.itemProvider = n, this.scrollTop = K(this, this._editor.onDidScrollChange, (e) => this._editor.getScrollTop()), this.isScrollTopZero = this.scrollTop.map((e) => e === 0), this.modelAttached = K(this, this._editor.onDidChangeModel, (e) => this._editor.hasModel()), this.editorOnDidChangeViewZones = J("onDidChangeViewZones", this._editor.onDidChangeViewZones), this.editorOnDidContentSizeChange = J("onDidContentSizeChange", this._editor.onDidContentSizeChange), this.domNodeSizeChanged = be("domNodeSizeChanged"), this.views = this._register(new Ot()), this._domNode.className = "gutter monaco-editor";
		let r = this._domNode.appendChild(w("div.scroll-decoration", {
			role: "presentation",
			ariaHidden: "true",
			style: { width: "100%" }
		}).root), i = new ResizeObserver(() => {
			k((e) => {
				this.domNodeSizeChanged.trigger(e);
			});
		});
		i.observe(this._domNode), this._register(P(() => i.disconnect())), this._register(O((e) => {
			r.className = this.isScrollTopZero.read(e) ? "" : "scroll-decoration";
		})), this._register(O((e) => this.render(e)));
	}
	dispose() {
		super.dispose(), Un(this._domNode);
	}
	render(e) {
		if (!this.modelAttached.read(e)) return;
		this.domNodeSizeChanged.read(e), this.editorOnDidChangeViewZones.read(e), this.editorOnDidContentSizeChange.read(e);
		let t = this.scrollTop.read(e), n = this._editor.getVisibleRanges(), r = new Set(this.views.keys()), i = ne.ofStartAndLength(0, this._domNode.clientHeight);
		if (!i.isEmpty) for (let a of n) {
			let n = new G(a.startLineNumber, a.endLineNumber + 1), o = this.itemProvider.getIntersectingGutterItems(n, e);
			k((e) => {
				for (let a of o) {
					if (!a.range.intersect(n)) continue;
					r.delete(a.id);
					let o = this.views.get(a.id);
					if (o) o.item.set(a, e);
					else {
						let e = j("div");
						this._domNode.appendChild(e);
						let t = D("item", a);
						o = new ma(t, this.itemProvider.createView(t, e), e), this.views.set(a.id, o);
					}
					let s = a.range.startLineNumber <= this._editor.getModel().getLineCount() ? this._editor.getTopForLineNumber(a.range.startLineNumber, !0) - t : a.range.startLineNumber > 1 ? this._editor.getBottomForLineNumber(a.range.startLineNumber - 1, !1) - t : 0, c = (a.range.endLineNumberExclusive === 1 ? Math.max(s, this._editor.getTopForLineNumber(a.range.startLineNumber, !1) - t) : Math.max(s, this._editor.getBottomForLineNumber(a.range.endLineNumberExclusive - 1, !0) - t)) - s;
					o.domNode.style.top = `${s}px`, o.domNode.style.height = `${c}px`, o.gutterItemView.layout(ne.ofStartAndLength(s, c), i);
				}
			});
		}
		for (let e of r) this.views.deleteAndDispose(e);
	}
}, ma = class {
	constructor(e, t, n) {
		this.item = e, this.gutterItemView = t, this.domNode = n;
	}
	dispose() {
		this.gutterItemView.dispose(), this.domNode.remove();
	}
};
L(), W(), ir(), H(), b(), Ut(), S(), je(), tt(), it(), Bn(), ii(), pi(), Be(), M(), re(), R();
var ha = [], ga = 35, _a = class extends n {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this._diffModel = t, this._editors = n, this._options = r, this._sashLayout = i, this._boundarySashes = a, this._instantiationService = o, this._contextKeyService = s, this._menuService = c, this._menu = this._register(this._menuService.createMenu(Ke.DiffEditorHunkToolbar, this._contextKeyService)), this._actions = K(this, this._menu.onDidChange, () => this._menu.getActions()), this._hasActions = this._actions.map((e) => e.length > 0), this._showSash = B(this, (e) => this._options.renderSideBySide.read(e) && this._hasActions.read(e)), this.width = B(this, (e) => this._hasActions.read(e) ? ga : 0), this.elements = w("div.gutter@gutter", { style: {
			position: "absolute",
			height: "100%",
			width: "35px"
		} }, []), this._currentDiff = B(this, (e) => {
			let t = this._diffModel.read(e);
			if (!t) return;
			let n = t.diff.read(e)?.mappings, r = this._editors.modifiedCursor.read(e);
			if (r) return n?.find((e) => e.lineRangeMapping.modified.contains(r.lineNumber));
		}), this._selectedDiffs = B(this, (e) => {
			let t = this._diffModel.read(e)?.diff.read(e);
			if (!t) return ha;
			let n = this._editors.modifiedSelections.read(e);
			if (n.every((e) => e.isEmpty())) return ha;
			let r = new p(n.map((e) => G.fromRangeInclusive(e))), i = t.mappings.filter((e) => e.lineRangeMapping.innerChanges && r.intersects(e.lineRangeMapping.modified)).map((e) => ({
				mapping: e,
				rangeMappings: e.lineRangeMapping.innerChanges.filter((e) => n.some((t) => N.areIntersecting(e.modifiedRange, t)))
			}));
			return i.length === 0 || i.every((e) => e.rangeMappings.length === 0) ? ha : i;
		}), this._register(Lr(e, this.elements.root)), this._register(Pe(this.elements.root, "click", () => {
			this._editors.modified.focus();
		})), this._register(hi(this.elements.root, { display: this._hasActions.map((e) => e ? "block" : "none") })), I(this, (t) => this._showSash.read(t) ? new ua(e, this._sashLayout.dimensions, this._options.enableSplitViewResizing, this._boundarySashes, jn(this, (e) => this._sashLayout.sashLeft.read(e) - ga, (e, t) => this._sashLayout.sashLeft.set(e + ga, t)), () => this._sashLayout.resetSash()) : void 0).recomputeInitiallyAndOnChange(this._store);
		let l = B(this, (e) => {
			let t = this._diffModel.read(e);
			if (!t) return [];
			let n = t.diff.read(e);
			if (!n) return [];
			let r = this._selectedDiffs.read(e);
			if (r.length > 0) return [new va(ni.fromRangeMappings(r.flatMap((e) => e.rangeMappings)), !0, Ke.DiffEditorSelectionToolbar, void 0, t.model.original.uri, t.model.modified.uri)];
			let i = this._currentDiff.read(e);
			return n.mappings.map((e) => new va(e.lineRangeMapping.withInnerChangesFromLineRanges(), e.lineRangeMapping === i?.lineRangeMapping, Ke.DiffEditorHunkToolbar, void 0, t.model.original.uri, t.model.modified.uri));
		});
		this._register(new pa(this._editors.modified, this.elements.root, {
			getIntersectingGutterItems: (e, t) => l.read(t),
			createView: (e, t) => this._instantiationService.createInstance(ya, e, t, this)
		})), this._register(Pe(this.elements.gutter, xn.MOUSE_WHEEL, (e) => {
			this._editors.modified.getOption(U.scrollbar).handleMouseWheel && this._editors.modified.delegateScrollFromMouseWheelEvent(e);
		}, { passive: !1 }));
	}
	computeStagedValue(e) {
		let t = e.innerChanges ?? [], n = new Di(this._editors.modifiedModel.get()), r = new Di(this._editors.original.getModel());
		return new We(t.map((e) => e.toTextEdit(n))).apply(r);
	}
	layout(e) {
		this.elements.gutter.style.left = e + "px";
	}
};
_a = v([
	E(6, T),
	E(7, Dn),
	E(8, Yt)
], _a);
var va = class {
	constructor(e, t, n, r, i, a) {
		this.mapping = e, this.showAlways = t, this.menuId = n, this.rangeOverride = r, this.originalUri = i, this.modifiedUri = a;
	}
	get id() {
		return this.mapping.modified.toString();
	}
	get range() {
		return this.rangeOverride ?? this.mapping.modified;
	}
}, ya = class extends n {
	constructor(e, t, n, r) {
		super(), this._item = e, this._elements = w("div.gutterItem", { style: {
			height: "20px",
			width: "34px"
		} }, [w("div.background@background", {}, []), w("div.buttons@buttons", {}, [])]), this._showAlways = this._item.map(this, (e) => e.showAlways), this._menuId = this._item.map(this, (e) => e.menuId), this._isSmall = D(this, !1), this._lastItemRange = void 0, this._lastViewRange = void 0;
		let i = this._register(r.createInstance(Bt, "element", { instantHover: !0 }, { position: { hoverPosition: ve.RIGHT } }));
		this._register(Er(t, this._elements.root)), this._register(O((e) => {
			let t = this._showAlways.read(e);
			this._elements.root.classList.toggle("noTransition", !0), this._elements.root.classList.toggle("showAlways", t), setTimeout(() => {
				this._elements.root.classList.toggle("noTransition", !1);
			}, 0);
		})), this._register(V((e, t) => {
			this._elements.buttons.replaceChildren();
			let a = t.add(r.createInstance(Ai, this._elements.buttons, this._menuId.read(e), {
				orientation: Gn.VERTICAL,
				hoverDelegate: i,
				toolbarOptions: { primaryGroup: (e) => e.startsWith("primary") },
				overflowBehavior: { maxItems: this._isSmall.read(e) ? 1 : 3 },
				hiddenItemStrategy: ri.Ignore,
				actionRunner: t.add(new fa(() => {
					let e = this._item.read(void 0), t = e.mapping;
					return {
						mapping: t,
						originalWithModifiedChanges: n.computeStagedValue(t),
						originalUri: e.originalUri,
						modifiedUri: e.modifiedUri
					};
				})),
				menuOptions: { shouldForwardArgs: !0 }
			}));
			t.add(a.onDidChangeMenuItems(() => {
				this._lastItemRange && this.layout(this._lastItemRange, this._lastViewRange);
			}));
		}));
	}
	layout(e, t) {
		this._lastItemRange = e, this._lastViewRange = t;
		let n = this._elements.buttons.clientHeight;
		this._isSmall.set(this._item.get().mapping.original.startLineNumber === 1 && e.length < 30, void 0), n = this._elements.buttons.clientHeight;
		let r = e.length / 2 - n / 2, i = n, a = e.start + r, o = ne.tryCreate(i, t.endExclusive - i - n), s = ne.tryCreate(e.start + i, e.endExclusive - n - i);
		s && o && s.start < s.endExclusive && (a = o.clip(a), a = s.clip(a)), this._elements.buttons.style.top = `${a - e.start}px`;
	}
};
ya = v([E(3, T)], ya), ei(), W(), De(), Tt(), H(), b(), tt(), Bn(), ii(), Ie(), M(), R();
var ba = [], xa = class extends n {
	constructor(e, t, n, r) {
		super(), this._editors = e, this._diffModel = t, this._options = n, this._widget = r, this._selectedDiffs = B(this, (e) => {
			let t = this._diffModel.read(e)?.diff.read(e);
			if (!t) return ba;
			let n = this._editors.modifiedSelections.read(e);
			if (n.every((e) => e.isEmpty())) return ba;
			let r = new p(n.map((e) => G.fromRangeInclusive(e))), i = t.mappings.filter((e) => e.lineRangeMapping.innerChanges && r.intersects(e.lineRangeMapping.modified)).map((e) => ({
				mapping: e,
				rangeMappings: e.lineRangeMapping.innerChanges.filter((e) => n.some((t) => N.areIntersecting(e.modifiedRange, t)))
			}));
			return i.length === 0 || i.every((e) => e.rangeMappings.length === 0) ? ba : i;
		}), this._register(V((e, t) => {
			if (!this._options.shouldRenderOldRevertArrows.read(e)) return;
			let n = this._diffModel.read(e), r = n?.diff.read(e);
			if (!n || !r || n.movedTextToCompare.read(e)) return;
			let i = [], a = this._selectedDiffs.read(e), o = new Set(a.map((e) => e.mapping));
			if (a.length > 0) {
				let n = this._editors.modifiedSelections.read(e), r = t.add(new Sa(n[n.length - 1].positionLineNumber, this._widget, a.flatMap((e) => e.rangeMappings), !0));
				this._editors.modified.addGlyphMarginWidget(r), i.push(r);
			}
			for (let e of r.mappings) if (!o.has(e) && !e.lineRangeMapping.modified.isEmpty && e.lineRangeMapping.innerChanges) {
				let n = t.add(new Sa(e.lineRangeMapping.modified.startLineNumber, this._widget, e.lineRangeMapping, !1));
				this._editors.modified.addGlyphMarginWidget(n), i.push(n);
			}
			t.add(P(() => {
				for (let e of i) this._editors.modified.removeGlyphMarginWidget(e);
			}));
		}));
	}
}, Sa = class e extends n {
	static {
		this.counter = 0;
	}
	getId() {
		return this._id;
	}
	constructor(t, n, r, a) {
		super(), this._lineNumber = t, this._widget = n, this._diffs = r, this._revertSelection = a, this._id = `revertButton${e.counter++}`, this._domNode = w("div.revertButton", { title: this._revertSelection ? i(202, "Revert Selected Changes") : i(203, "Revert Change") }, [en(sn.arrowRight)]).root, this._register(Pe(this._domNode, xn.MOUSE_DOWN, (e) => {
			e.button !== 2 && (e.stopPropagation(), e.preventDefault());
		})), this._register(Pe(this._domNode, xn.MOUSE_UP, (e) => {
			e.stopPropagation(), e.preventDefault();
		})), this._register(Pe(this._domNode, xn.CLICK, (e) => {
			this._diffs instanceof Oi ? this._widget.revert(this._diffs) : this._widget.revertRangeMappings(this._diffs), e.stopPropagation(), e.preventDefault();
		}));
	}
	getDomNode() {
		return this._domNode;
	}
	getPosition() {
		return {
			lane: Ln.Right,
			range: {
				startColumn: 1,
				startLineNumber: this._lineNumber,
				endColumn: 1,
				endLineNumber: this._lineNumber
			},
			zIndex: 10001
		};
	}
}, Ca = /* @__PURE__ */ t({});
yn(), L(), W(), Ne(), me(), H(), b(), Fr(), bt(), Ut(), S(), Pt(), tt(), An(), Bn(), Ee(), Wr(), pi(), re(), M(), R(), Zt(), wn(), Be(), Vt(Ca);
var wa = class extends da {
	static {
		this.ENTIRE_DIFF_OVERVIEW_WIDTH = sa.ENTIRE_DIFF_OVERVIEW_WIDTH;
	}
	get onDidContentSizeChange() {
		return this._editors.onDidContentSizeChange;
	}
	get collapseUnchangedRegions() {
		return this._options.hideUnchangedRegions.get();
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this._domElement = e, this._parentContextKeyService = r, this._parentInstantiationService = i, this._codeEditorService = a, this._accessibilitySignalService = o, this._editorProgressService = s, this.keybindingService = c, this.elements = w("div.monaco-diff-editor.side-by-side", { style: {
			position: "relative",
			height: "100%"
		} }, [
			w("div.editor.original@original", { style: {
				position: "absolute",
				height: "100%"
			} }),
			w("div.editor.modified@modified", { style: {
				position: "absolute",
				height: "100%"
			} }),
			w("div.accessibleDiffViewer@accessibleDiffViewer", { style: {
				position: "absolute",
				height: "100%"
			} })
		]), this._diffModelSrc = this._register(nt(this, void 0)), this._diffModel = B(this, (e) => this._diffModelSrc.read(e)?.object), this.onDidChangeModel = Ze.fromObservableLight(this._diffModel), this._contextKeyService = this._register(this._parentContextKeyService.createScoped(this._domElement)), this._instantiationService = this._register(this._parentInstantiationService.createChild(new $t([Dn, this._contextKeyService]))), this._boundarySashes = D(this, void 0), this._accessibleDiffViewerShouldBeVisible = D(this, !1), this._accessibleDiffViewerVisible = B(this, (e) => this._options.onlyShowAccessibleDiffViewer.read(e) ? !0 : this._accessibleDiffViewerShouldBeVisible.read(e)), this._movedBlocksLinesPart = D(this, void 0), this._layoutInfo = B(this, (e) => {
			let t = this._rootSizeObserver.width.read(e), n = this._rootSizeObserver.height.read(e);
			this._rootSizeObserver.automaticLayout ? this.elements.root.style.height = "100%" : this.elements.root.style.height = n + "px";
			let r = this._sash.read(e), i = this._gutter.read(e), a = i?.width.read(e) ?? 0, o = this._overviewRulerPart.read(e)?.width ?? 0, s, c, l, u, d;
			if (r) {
				let n = r.sashLeft.read(e), i = this._movedBlocksLinesPart.read(e)?.width.read(e) ?? 0;
				s = 0, c = n - a - i, d = n - a, l = n, u = t - l - o;
			} else {
				d = 0;
				let n = this._options.inlineViewHideOriginalLineNumbers.read(e);
				s = a, c = n ? 0 : Math.max(5, this._editors.originalObs.layoutInfoDecorationsLeft.read(e)), l = a + c, u = t - l - o;
			}
			return this.elements.original.style.left = s + "px", this.elements.original.style.width = c + "px", this._editors.original.layout({
				width: c,
				height: n
			}, !0), i?.layout(d), this.elements.modified.style.left = l + "px", this.elements.modified.style.width = u + "px", this._editors.modified.layout({
				width: u,
				height: n
			}, !0), {
				modifiedEditor: this._editors.modified.getLayoutInfo(),
				originalEditor: this._editors.original.getLayoutInfo()
			};
		}), this._diffValue = this._diffModel.map((e, t) => e?.diff.read(t)), this.onDidUpdateDiff = Ze.fromObservableLight(this._diffValue), this._codeEditorService.willCreateDiffEditor(), this._contextKeyService.createKey("isInDiffEditor", !0), this.elements.root.classList.toggle("standalone", n.isStandaloneEditor || !1), this._domElement.appendChild(this.elements.root), this._register(P(() => this.elements.root.remove())), this._rootSizeObserver = this._register(new Cr(this.elements.root, t.dimension)), this._rootSizeObserver.setAutomaticLayout(t.automaticLayout ?? !1), this._options = this._instantiationService.createInstance(Or, t), this._register(O((e) => {
			this._options.setWidth(this._rootSizeObserver.width.read(e));
		})), this._contextKeyService.createKey(q.isEmbeddedDiffEditor.key, !1), this._register(Z(q.isEmbeddedDiffEditor, this._contextKeyService, (e) => this._options.isInEmbeddedEditor.read(e))), this._register(Z(q.comparingMovedCode, this._contextKeyService, (e) => !!this._diffModel.read(e)?.movedTextToCompare.read(e))), this._register(Z(q.diffEditorRenderSideBySideInlineBreakpointReached, this._contextKeyService, (e) => this._options.couldShowInlineViewBecauseOfSize.read(e))), this._register(Z(q.diffEditorInlineMode, this._contextKeyService, (e) => !this._options.renderSideBySide.read(e))), this._register(Z(q.hasChanges, this._contextKeyService, (e) => (this._diffModel.read(e)?.diff.read(e)?.mappings.length ?? 0) > 0)), this._editors = this._register(this._instantiationService.createInstance(ca, this.elements.original, this.elements.modified, this._options, n, (e, t, n, r) => this._createInnerEditor(e, t, n, r))), this._register(Z(q.diffEditorOriginalWritable, this._contextKeyService, (e) => this._options.originalEditable.read(e))), this._register(Z(q.diffEditorModifiedWritable, this._contextKeyService, (e) => !this._options.readOnly.read(e))), this._register(Z(q.diffEditorOriginalUri, this._contextKeyService, (e) => this._diffModel.read(e)?.model.original.uri.toString() ?? "")), this._register(Z(q.diffEditorModifiedUri, this._contextKeyService, (e) => this._diffModel.read(e)?.model.modified.uri.toString() ?? "")), this._overviewRulerPart = I(this, (e) => this._options.renderOverviewRuler.read(e) ? this._instantiationService.createInstance(X(sa), this._editors, this.elements.root, this._diffModel, this._rootSizeObserver.width, this._rootSizeObserver.height, this._layoutInfo.map((e) => e.modifiedEditor)) : void 0).recomputeInitiallyAndOnChange(this._store);
		let l = {
			height: this._rootSizeObserver.height,
			width: this._rootSizeObserver.width.map((e, t) => e - (this._overviewRulerPart.read(t)?.width ?? 0))
		};
		this._sashLayout = new la(this._options, l), this._sash = I(this, (e) => {
			let t = this._options.renderSideBySide.read(e);
			return this.elements.root.classList.toggle("side-by-side", t), t ? new ua(this.elements.root, l, this._options.enableSplitViewResizing, this._boundarySashes, this._sashLayout.sashLeft, () => this._sashLayout.resetSash()) : void 0;
		}).recomputeInitiallyAndOnChange(this._store);
		let u = I(this, (e) => this._instantiationService.createInstance(X(ui), this._editors, this._diffModel, this._options)).recomputeInitiallyAndOnChange(this._store);
		I(this, (e) => this._instantiationService.createInstance(X(oa), this._editors, this._diffModel, this._options, this)).recomputeInitiallyAndOnChange(this._store);
		let d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = !1, m = I(this, (e) => this._instantiationService.createInstance(X(Ir), Se(this._domElement), this._editors, this._diffModel, this._options, this, () => p || u.read(void 0).isUpdatingHiddenAreas, d, f)).recomputeInitiallyAndOnChange(this._store), h = B(this, (e) => {
			let t = m.read(e).viewZones.read(e).orig, n = u.read(e).viewZones.read(e).origViewZones;
			return t.concat(n);
		}), g = B(this, (e) => {
			let t = m.read(e).viewZones.read(e).mod, n = u.read(e).viewZones.read(e).modViewZones;
			return t.concat(n);
		});
		this._register(br(this._editors.original, h, (e) => {
			p = e;
		}, d));
		let _;
		this._register(br(this._editors.modified, g, (e) => {
			p = e, p ? _ = Gr.capture(this._editors.modified) : (_?.restore(this._editors.modified), _ = void 0);
		}, f)), this._accessibleDiffViewer = I(this, (e) => this._instantiationService.createInstance(X(Ki), this.elements.accessibleDiffViewer, this._accessibleDiffViewerVisible, (e, t) => this._accessibleDiffViewerShouldBeVisible.set(e, t), this._options.onlyShowAccessibleDiffViewer.map((e) => !e), this._rootSizeObserver.width, this._rootSizeObserver.height, this._diffModel.map((e, t) => e?.diff.read(t)?.mappings.map((e) => e.lineRangeMapping)), new na(this._editors))).recomputeInitiallyAndOnChange(this._store);
		let v = this._accessibleDiffViewerVisible.map((e) => e ? "hidden" : "visible");
		this._register(hi(this.elements.modified, { visibility: v })), this._register(hi(this.elements.original, { visibility: v })), this._createDiffEditorContributions(), this._codeEditorService.addDiffEditor(this), this._register(P(() => {
			this._codeEditorService.removeDiffEditor(this);
		})), this._gutter = I(this, (e) => this._options.shouldRenderGutterMenu.read(e) ? this._instantiationService.createInstance(X(_a), this.elements.root, this._diffModel, this._editors, this._options, this._sashLayout, this._boundarySashes) : void 0), this._register(C(this._layoutInfo)), I(this, (e) => new (X(ra))(this.elements.root, this._diffModel, this._layoutInfo.map((e) => e.originalEditor), this._layoutInfo.map((e) => e.modifiedEditor), this._editors)).recomputeInitiallyAndOnChange(this._store, (e) => {
			this._movedBlocksLinesPart.set(e, void 0);
		}), this._register(Ze.runAndSubscribe(this._editors.modified.onDidChangeCursorPosition, (e) => this._handleCursorPositionChange(e, !0))), this._register(Ze.runAndSubscribe(this._editors.original.onDidChangeCursorPosition, (e) => this._handleCursorPositionChange(e, !1)));
		let y = this._diffModel.map(this, (e, t) => {
			if (e) return e.diff.read(t) === void 0 && !e.isDiffUpToDate.read(t);
		});
		this._register(V((e, t) => {
			if (y.read(e) === !0) {
				let e = this._editorProgressService.show(!0, 1e3);
				t.add(P(() => e.done()));
			}
		})), this._register(V((e, t) => {
			t.add(new (X(xa))(this._editors, this._diffModel, this._options, this));
		})), this._register(V((e, t) => {
			let n = this._diffModel.read(e);
			if (n) for (let e of [n.model.original, n.model.modified]) t.add(e.onWillDispose((e) => {
				Ft(new un("TextModel got disposed before DiffEditorWidget model got reset")), this.setModel(null);
			}));
		})), this._register(O((e) => {
			this._options.setModel(this._diffModel.read(e));
		})), this._register(this.keybindingService.registerContainer(this.getContainerDomNode()));
	}
	getViewWidth() {
		return this._rootSizeObserver.width.get();
	}
	getContentHeight() {
		return this._editors.modified.getContentHeight();
	}
	_createInnerEditor(e, t, n, r) {
		return e.createInstance(Xr, t, n, r);
	}
	_createDiffEditorContributions() {
		let e = ye.getDiffEditorContributions();
		for (let t of e) try {
			this._register(this._instantiationService.createInstance(t.ctor, this));
		} catch (e) {
			Ft(e);
		}
	}
	get _targetEditor() {
		return this._editors.modified;
	}
	getEditorType() {
		return Ge.IDiffEditor;
	}
	onVisible() {
		this._editors.original.onVisible(), this._editors.modified.onVisible();
	}
	onHide() {
		this._editors.original.onHide(), this._editors.modified.onHide();
	}
	layout(e) {
		this._rootSizeObserver.observe(e);
	}
	hasTextFocus() {
		return this._editors.original.hasTextFocus() || this._editors.modified.hasTextFocus();
	}
	saveViewState() {
		return {
			original: this._editors.original.saveViewState(),
			modified: this._editors.modified.saveViewState(),
			modelState: this._diffModel.get()?.serializeState()
		};
	}
	restoreViewState(e) {
		if (e && e.original && e.modified) {
			let t = e;
			this._editors.original.restoreViewState(t.original), this._editors.modified.restoreViewState(t.modified), t.modelState && this._diffModel.get()?.restoreSerializedState(t.modelState);
		}
	}
	handleInitialized() {
		this._editors.original.handleInitialized(), this._editors.modified.handleInitialized();
	}
	createViewModel(e) {
		return this._instantiationService.createInstance(xr, e, this._options);
	}
	getModel() {
		return this._diffModel.get()?.model ?? null;
	}
	setModel(e) {
		let t = e ? "model" in e ? qr.create(e).createNewRef(this) : qr.create(this.createViewModel(e), this) : null;
		this.setDiffModel(t);
	}
	setDiffModel(e, t) {
		let n = this._diffModel.get();
		!e && n && this._accessibleDiffViewer.get().close(), this._diffModel.get() !== e?.object && fe(t, (t) => {
			let n = e?.object;
			K.batchEventsGlobally(t, () => {
				this._editors.original.setModel(n ? n.model.original : null), this._editors.modified.setModel(n ? n.model.modified : null);
			});
			let r = this._diffModelSrc.get()?.createNewRef(this);
			this._diffModelSrc.set(e?.createNewRef(this), t), setTimeout(() => {
				r?.dispose();
			}, 0);
		});
	}
	updateOptions(e) {
		this._options.updateOptions(e);
	}
	getDomNode() {
		return this.elements.root;
	}
	getContainerDomNode() {
		return this._domElement;
	}
	getOriginalEditor() {
		return this._editors.original;
	}
	getModifiedEditor() {
		return this._editors.modified;
	}
	setBoundarySashes(e) {
		this._boundarySashes.set(e, void 0);
	}
	get ignoreTrimWhitespace() {
		return this._options.ignoreTrimWhitespace.get();
	}
	get maxComputationTime() {
		return this._options.maxComputationTimeMs.get();
	}
	get renderSideBySide() {
		return this._options.renderSideBySide.get();
	}
	getLineChanges() {
		let e = this._diffModel.get()?.diff.get();
		return e ? Ta(e) : null;
	}
	getDiffComputationResult() {
		let e = this._diffModel.get()?.diff.get();
		return e ? {
			changes: this.getLineChanges(),
			changes2: e.mappings.map((e) => e.lineRangeMapping),
			identical: e.identical,
			quitEarly: e.quitEarly
		} : null;
	}
	revert(e) {
		let t = this._diffModel.get();
		!t || !t.isDiffUpToDate.get() || (this._editors.modified.pushUndoStop(), this._editors.modified.executeEdits("diffEditor", [{
			range: e.modified.toExclusiveRange(),
			text: t.model.original.getValueInRange(e.original.toExclusiveRange())
		}]), this._editors.modified.pushUndoStop());
	}
	revertRangeMappings(e) {
		let t = this._diffModel.get();
		if (!t || !t.isDiffUpToDate.get()) return;
		let n = e.map((e) => ({
			range: e.modifiedRange,
			text: t.model.original.getValueInRange(e.originalRange)
		}));
		this._editors.modified.pushUndoStop(), this._editors.modified.executeEdits("diffEditor", n), this._editors.modified.pushUndoStop();
	}
	revertFocusedRangeMappings() {
		let e = this._diffModel.get();
		if (!e || !e.isDiffUpToDate.get()) return;
		let t = this._diffModel.get()?.diff.get()?.mappings;
		if (!t || t.length === 0) return;
		let n = this._editors.modified;
		if (!n.hasTextFocus()) return;
		let r = n.getPosition().lineNumber, i = n.getSelection(), a = G.fromRange(i || new N(r, 0, r, 0)), o = t.filter((e) => e.lineRangeMapping.modified.intersect(a));
		n.pushUndoStop(), n.executeEdits("diffEditor", o.map((t) => ({
			range: t.lineRangeMapping.modified.toExclusiveRange(),
			text: e.model.original.getValueInRange(t.lineRangeMapping.original.toExclusiveRange())
		}))), n.pushUndoStop();
	}
	_goTo(e) {
		this._editors.modified.setPosition(new z(e.lineRangeMapping.modified.startLineNumber, 1)), this._editors.modified.revealRangeInCenter(e.lineRangeMapping.modified.toExclusiveRange());
	}
	goToDiff(e) {
		let t = this._diffModel.get()?.diff.get()?.mappings;
		if (!t || t.length === 0) return;
		let n = this._editors.modified.getPosition().lineNumber, r;
		r = e === "next" ? this._editors.modified.getModel().getLineCount() === n ? t[0] : t.find((e) => e.lineRangeMapping.modified.startLineNumber > n) ?? t[0] : bn(t, (e) => e.lineRangeMapping.modified.startLineNumber < n) ?? t[t.length - 1], this._goTo(r), r.lineRangeMapping.modified.isEmpty ? this._accessibilitySignalService.playSignal(Y.diffLineDeleted, { source: "diffEditor.goToDiff" }) : r.lineRangeMapping.original.isEmpty ? this._accessibilitySignalService.playSignal(Y.diffLineInserted, { source: "diffEditor.goToDiff" }) : r && this._accessibilitySignalService.playSignal(Y.diffLineModified, { source: "diffEditor.goToDiff" });
	}
	revealFirstDiff() {
		let e = this._diffModel.get();
		e && this.waitForDiff().then(() => {
			let t = e.diff.get()?.mappings;
			!t || t.length === 0 || this._goTo(t[0]);
		});
	}
	accessibleDiffViewerNext() {
		this._accessibleDiffViewer.get().next();
	}
	accessibleDiffViewerPrev() {
		this._accessibleDiffViewer.get().prev();
	}
	async waitForDiff() {
		let e = this._diffModel.get();
		e && await e.waitForDiff();
	}
	mapToOtherSide() {
		let e = this._editors.modified.hasWidgetFocus(), t = e ? this._editors.modified : this._editors.original, n = e ? this._editors.original : this._editors.modified, r, i = t.getSelection();
		if (i) {
			let t = this._diffModel.get()?.diff.get()?.mappings.map((t) => e ? t.lineRangeMapping.flip() : t.lineRangeMapping);
			if (t) {
				let e = zr(i.getStartPosition(), t), n = zr(i.getEndPosition(), t);
				r = N.plusRange(e, n);
			}
		}
		return {
			destination: n,
			destinationSelection: r
		};
	}
	switchSide() {
		let { destination: e, destinationSelection: t } = this.mapToOtherSide();
		e.focus(), t && e.setSelection(t);
	}
	exitCompareMove() {
		let e = this._diffModel.get();
		e && e.movedTextToCompare.set(void 0, void 0);
	}
	collapseAllUnchangedRegions() {
		let e = this._diffModel.get()?.unchangedRegions.get();
		e && k((t) => {
			for (let n of e) n.collapseAll(t);
		});
	}
	showAllUnchangedRegions() {
		let e = this._diffModel.get()?.unchangedRegions.get();
		e && k((t) => {
			for (let n of e) n.showAll(t);
		});
	}
	_handleCursorPositionChange(e, t) {
		if (e?.reason === Kr.Explicit) {
			let n = this._diffModel.get()?.diff.get()?.mappings.find((n) => t ? n.lineRangeMapping.modified.contains(e.position.lineNumber) : n.lineRangeMapping.original.contains(e.position.lineNumber));
			n?.lineRangeMapping.modified.isEmpty ? this._accessibilitySignalService.playSignal(Y.diffLineDeleted, { source: "diffEditor.cursorPositionChanged" }) : n?.lineRangeMapping.original.isEmpty ? this._accessibilitySignalService.playSignal(Y.diffLineInserted, { source: "diffEditor.cursorPositionChanged" }) : n && this._accessibilitySignalService.playSignal(Y.diffLineModified, { source: "diffEditor.cursorPositionChanged" });
		}
	}
};
wa = v([
	E(3, Dn),
	E(4, T),
	E(5, s),
	E(6, tr),
	E(7, Ue),
	E(8, Et)
], wa);
function Ta(e) {
	return e.mappings.map((e) => {
		let t = e.lineRangeMapping, n, r, i, a, o = t.innerChanges;
		return t.original.isEmpty ? (n = t.original.startLineNumber - 1, r = 0, o = void 0) : (n = t.original.startLineNumber, r = t.original.endLineNumberExclusive - 1), t.modified.isEmpty ? (i = t.modified.startLineNumber - 1, a = 0, o = void 0) : (i = t.modified.startLineNumber, a = t.modified.endLineNumberExclusive - 1), {
			originalStartLineNumber: n,
			originalEndLineNumber: r,
			modifiedStartLineNumber: i,
			modifiedEndLineNumber: a,
			charChanges: o?.map((e) => ({
				originalStartLineNumber: e.originalRange.startLineNumber,
				originalStartColumn: e.originalRange.startColumn,
				originalEndLineNumber: e.originalRange.endLineNumber,
				originalEndColumn: e.originalRange.endColumn,
				modifiedStartLineNumber: e.modifiedRange.startLineNumber,
				modifiedStartColumn: e.modifiedRange.startColumn,
				modifiedEndLineNumber: e.modifiedRange.endLineNumber,
				modifiedEndColumn: e.modifiedRange.endColumn
			}))
		};
	});
}
Xt(), h(), wr(), Pr();
var Ea = /* @__PURE__ */ t({});
yn(), L(), W(), Vn(), Ae(), je(), Xn(), Ar(), pr();
var Da;
Vt(Ea);
var Oa = class {
	static {
		Da = this;
	}
	static {
		this._ttpTokenizer = rn("tokenizeToString", { createHTML(e) {
			return e;
		} });
	}
	constructor(e, t) {
		this._configurationService = e, this._languageService = t;
	}
	async renderCodeBlock(e, t, n) {
		let r = mr(n.context) ? n.context : void 0, i;
		e ? i = this._languageService.getLanguageIdByLanguageName(e) : r && (i = r.getModel()?.getLanguageId()), i ||= ee;
		let a = await Qr(this._languageService, t, i), o = Da._ttpTokenizer ? Da._ttpTokenizer.createHTML(a) ?? a : a, s = j("span");
		s.innerHTML = o;
		let c = s.querySelector(".monaco-tokenized-source");
		return at(c) ? (Ur(c, this.getFontInfo(r)), s) : j("span");
	}
	getFontInfo(e) {
		return e ? e.getOption(U.fontInfo) : Dr({ fontFamily: this._configurationService.getValue("editor").fontFamily }, 1);
	}
};
Oa = Da = v([E(0, Te), E(1, g)], Oa), L(), H(), qt(), Mr(), nn(), Ae(), Ut(), S(), Pt(), lt(), Zn(), Xn(), se(), bt(), It();
var ka = 0, Aa = !1;
function ja(e) {
	if (!e) {
		if (Aa) return;
		Aa = !0;
	}
	Fe(e || Jn.document.body);
}
var Ma = class extends Xr {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		let m = { ...t };
		m.ariaLabel = m.ariaLabel || vn.editorViewAccessibleLabel, super(e, m, { isStandaloneEditor: !0 }, n, r, i, a, c, l, u, d, f, s), s instanceof Fn ? this._standaloneKeybindingService = s : this._standaloneKeybindingService = null, ja(m.ariaContainerElement), ht((e, t) => n.createInstance(Bt, e, { instantHover: t }, {})), Yn(o), p.setDefaultCodeBlockRenderer(n.createInstance(Oa));
	}
	addCommand(e, t, n) {
		if (!this._standaloneKeybindingService) return console.warn("Cannot add command because the editor is configured with an unrecognized KeybindingService"), null;
		let r = "DYNAMIC_" + ++ka, i = lr.deserialize(n);
		return this._standaloneKeybindingService.addDynamicKeybinding(r, e, t, i), r;
	}
	createContextKey(e, t) {
		return this._contextKeyService.createKey(e, t);
	}
	addAction(e) {
		if (typeof e.id != "string" || typeof e.label != "string" || typeof e.run != "function") throw Error("Invalid action descriptor, `id`, `label` and `run` are required properties!");
		if (!this._standaloneKeybindingService) return console.warn("Cannot add keybinding because the editor is configured with an unrecognized KeybindingService"), n.None;
		let t = e.id, r = e.label, i = lr.and(lr.equals("editorId", this.getId()), lr.deserialize(e.precondition)), a = e.keybindings, o = lr.and(i, lr.deserialize(e.keybindingContext)), s = e.contextMenuGroupId || null, c = e.contextMenuOrder || 0, l = (t, ...n) => Promise.resolve(e.run(this, ...n)), u = new pn(), d = this.getId() + ":" + t;
		if (u.add(_e.registerCommand(d, l)), s) {
			let e = {
				command: {
					id: d,
					title: r
				},
				when: i,
				group: s,
				order: c
			};
			u.add(y.appendMenuItem(Ke.EditorContext, e));
		}
		if (Array.isArray(a)) for (let e of a) u.add(this._standaloneKeybindingService.addDynamicKeybinding(d, e, l, o));
		let f = new Zr(d, r, r, void 0, i, (...t) => Promise.resolve(e.run(this, ...t)), this._contextKeyService);
		return this._actions.set(t, f), u.add(P(() => {
			this._actions.delete(t);
		})), u;
	}
	_triggerCommand(e, t) {
		if (this._codeEditorService instanceof Rn) try {
			this._codeEditorService.setActiveCodeEditor(this), super._triggerCommand(e, t);
		} finally {
			this._codeEditorService.setActiveCodeEditor(null);
		}
		else super._triggerCommand(e, t);
	}
};
Ma = v([
	E(2, T),
	E(3, s),
	E(4, cr),
	E(5, Dn),
	E(6, Kn),
	E(7, Et),
	E(8, pt),
	E(9, de),
	E(10, Qt),
	E(11, ft),
	E(12, Ni),
	E(13, l)
], Ma);
var Na = class extends Ma {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
		let _ = { ...t };
		Ht(u, _, !1);
		let v = c.registerEditorContainer(e);
		typeof _.theme == "string" && c.setTheme(_.theme), _.autoDetectHighContrast !== void 0 && c.setAutoDetectHighContrast(!!_.autoDetectHighContrast);
		let y = _.model;
		delete _.model, super(e, _, n, r, i, a, o, s, c, l, d, m, h, g), this._configurationService = u, this._standaloneThemeService = c, this._register(v);
		let b;
		if (y === void 0) {
			let e = p.getLanguageIdByMimeType(_.language) || _.language || "plaintext";
			b = Fa(f, p, _.value || "", e, void 0), this._ownsModel = !0;
		} else b = y, this._ownsModel = !1;
		if (this._attachModel(b), b) {
			let e = {
				oldModelUrl: null,
				newModelUrl: b.uri
			};
			this._onDidChangeModel.fire(e);
		}
	}
	dispose() {
		super.dispose();
	}
	updateOptions(e) {
		Ht(this._configurationService, e, !1), typeof e.theme == "string" && this._standaloneThemeService.setTheme(e.theme), e.autoDetectHighContrast !== void 0 && this._standaloneThemeService.setAutoDetectHighContrast(!!e.autoDetectHighContrast), super.updateOptions(e);
	}
	_postDetachModelCleanup(e) {
		super._postDetachModelCleanup(e), e && this._ownsModel && (e.dispose(), this._ownsModel = !1);
	}
};
Na = v([
	E(2, T),
	E(3, s),
	E(4, cr),
	E(5, Dn),
	E(6, Kn),
	E(7, Et),
	E(8, x),
	E(9, de),
	E(10, Te),
	E(11, Qt),
	E(12, $n),
	E(13, g),
	E(14, ft),
	E(15, Ni),
	E(16, l)
], Na);
var Pa = class extends wa {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f) {
		let p = { ...t };
		Ht(s, p, !0);
		let m = a.registerEditorContainer(e);
		typeof p.theme == "string" && a.setTheme(p.theme), p.autoDetectHighContrast !== void 0 && a.setAutoDetectHighContrast(!!p.autoDetectHighContrast), super(e, p, { isStandaloneEditor: !0 }, r, n, i, d, l, f), this._configurationService = s, this._standaloneThemeService = a, this._register(m);
	}
	dispose() {
		super.dispose();
	}
	updateOptions(e) {
		Ht(this._configurationService, e, !0), typeof e.theme == "string" && this._standaloneThemeService.setTheme(e.theme), e.autoDetectHighContrast !== void 0 && this._standaloneThemeService.setAutoDetectHighContrast(!!e.autoDetectHighContrast), super.updateOptions(e);
	}
	_createInnerEditor(e, t, n) {
		return e.createInstance(Ma, t, n);
	}
	getOriginalEditor() {
		return super.getOriginalEditor();
	}
	getModifiedEditor() {
		return super.getModifiedEditor();
	}
	addCommand(e, t, n) {
		return this.getModifiedEditor().addCommand(e, t, n);
	}
	createContextKey(e, t) {
		return this.getModifiedEditor().createContextKey(e, t);
	}
	addAction(e) {
		return this.getModifiedEditor().addAction(e);
	}
};
Pa = v([
	E(2, T),
	E(3, Dn),
	E(4, s),
	E(5, x),
	E(6, de),
	E(7, Te),
	E(8, Rt),
	E(9, Ue),
	E(10, Kt),
	E(11, tr),
	E(12, Et)
], Pa);
function Fa(e, t, n, r, i) {
	if (n ||= "", !r) {
		let r = n.indexOf("\n"), a = n;
		return r !== -1 && (a = n.substring(0, r)), Ia(e, n, t.createByFilepathOrFirstLine(i || null, a), i);
	}
	return Ia(e, n, t.createById(r), i);
}
function Ia(e, t, n, r) {
	return e.createModel(t, n, r);
}
Ie(), et();
var La = "workbench.action.files.revert", Ra = "workbench.action.files.saveAs", za = Dt(8071, "Save As..."), Ba = "workbench.action.files.save";
Dt(8072, "Save");
var Va = "workbench.action.files.saveWithoutFormatting";
Dt(8073, "Save without Formatting");
var Ha = "saveAll";
Dt(8074, "Save All");
var Ua = "workbench.files.action.saveAllInGroup", Wa = "workbench.action.files.saveFiles";
new f("groupFocusedInOpenEditors", !1), new f("dirtyEditorFocusedInOpenEditors", !1), new f("readonlyEditorFocusedInOpenEditors", !1), new f("openEditorsSelectedFileOrUntitled", !0), new f("resourceSelectedForCompare", !1), i(8075, "Remove Folder from Workspace"), Dt(8076, "New Untitled Text File");
//#endregion
export { Vi as _, Ra as a, Fi as b, Va as c, Na as d, Fa as f, Bi as g, fa as h, Wa as i, Ma as l, wa as m, Ha as n, za as o, Oa as p, Ua as r, Ba as s, La as t, Pa as u, Ri as v, Li as x, zi as y };
