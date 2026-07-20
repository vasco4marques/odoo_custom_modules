import { n as e, r as t } from "./rolldown-runtime-B1bRi_D7.js";
import { $A as n, $g as r, $k as i, $l as a, A as o, AA as s, Ab as c, Al as l, Ay as u, BA as d, Bc as f, Bu as p, Bv as m, CM as h, Ca as ee, Cb as g, DA as _, DN as v, Dc as y, Ew as b, F as te, FA as x, Fw as ne, Fy as re, Hl as ie, Hv as S, Hw as ae, I as oe, Ih as se, Iw as ce, Ix as le, Iy as ue, Jb as de, Jh as fe, Jl as pe, Ju as me, Jw as he, Jx as ge, KA as _e, Kl as ve, LC as C, Lb as ye, Lc as be, Ll as xe, Lr as Se, Lw as Ce, M as we, MA as w, MC as Te, Mi as Ee, My as De, Nb as Oe, OA as ke, ON as T, Oa as Ae, Ob as je, PA as Me, Pb as Ne, Ps as Pe, Pt as Fe, QE as Ie, QM as Le, QS as Re, Qc as ze, Qk as Be, Qw as Ve, Ra as He, Rc as Ue, Rw as We, SA as Ge, Sb as Ke, So as qe, Sv as Je, TA as Ye, Tc as Xe, Ub as Ze, Ug as Qe, Ur as $e, Uv as et, Uw as E, VA as tt, VM as nt, Vl as rt, Vu as it, Vv as at, Vw as ot, Wb as st, Wt as ct, Wv as lt, XC as ut, XE as dt, Xa as ft, Xv as pt, Xw as D, Xx as mt, Yh as ht, Yu as gt, Yv as _t, Yw as O, Yx as vt, ZM as yt, Za as bt, Zc as xt, _h as St, _i as Ct, _k as k, an as wt, b as Tt, bM as Et, cC as A, cM as Dt, cT as j, cg as Ot, dS as kt, dh as At, du as jt, eA as Mt, ej as Nt, et as Pt, eu as Ft, ey as M, fC as It, fM as Lt, fh as Rt, fu as zt, gN as Bt, gr as Vt, gs as Ht, gu as Ut, hj as N, hk as P, ho as Wt, hr as Gt, hu as Kt, i as qt, iT as F, id as Jt, ig as Yt, ij as Xt, ip as Zt, j as Qt, jA as $t, jM as en, ji as tn, jl as nn, jw as rn, jy as an, k as on, kN as I, ka as sn, kb as cn, kc as ln, ky as un, l as dn, lC as fn, l_ as pn, lh as mn, lu as hn, mN as gn, nN as _n, nT as L, nd as vn, ng as yn, nj as bn, ny as R, oT as xn, og as Sn, on as Cn, ph as wn, po as Tn, pu as En, qM as Dn, qS as On, qb as kn, ql as An, qw as jn, qx as Mn, r as Nn, rT as z, rd as Pn, rg as Fn, rn as In, ry as Ln, sT as Rn, sg as zn, sn as Bn, sp as Vn, sx as Hn, t as Un, tC as Wn, tS as Gn, tT as B, td as Kn, tt as qn, ty as Jn, u as Yn, uj as V, uu as Xn, uw as Zn, vM as Qn, vi as $n, vr as er, vs as H, vu as tr, wA as nr, wa as rr, wb as ir, wo as ar, wv as or, xb as sr, xk as cr, y as lr, y_ as ur, yh as dr, yi as fr, yr as pr, ys as mr, zC as U, za as hr, zc as gr, zu as W, zv as G, zw as K } from "./standaloneServices-DUdtGggg.js";
import { c as _r, i as vr, l as yr, o as br, s as xr } from "./editorBrowser-zJfFG23V.js";
import { $t as Sr, B as Cr, Vt as wr, bt as Tr, mn as Er, qt as Dr, xt as Or, z as kr } from "./textfiles-GCUcfhe8.js";
import { $i as Ar, Ar as jr, Bn as Mr, Cn as Nr, Cr as Pr, Da as Fr, Di as q, Dn as Ir, Dr as Lr, Ea as Rr, En as zr, Er as Br, Fa as Vr, Fr as Hr, Gn as J, Gr as Ur, Hr as Wr, Ir as Y, Jr as Gr, Lr as Kr, Mn as qr, Mr as Jr, Nn as Yr, Nr as Xr, Oi as Zr, On as Qr, Or as $r, Pa as ei, Pn as ti, Pr as ni, Qi as ri, Tr as ii, Ur as X, Vn as ai, Wn as oi, Wr as si, Xr as ci, Yr as li, Zr as ui, _n as di, _o as fi, _r as pi, bn as mi, br as hi, ci as gi, cr as _i, da as vi, dr as yi, fr as bi, gn as xi, gr as Si, hr as Ci, jr as wi, kn as Ti, kr as Ei, li as Di, lr as Oi, mr as ki, or as Ai, pa as ji, pr as Mi, si as Ni, sr as Pi, ua as Fi, ui as Ii, ur as Li, vn as Ri, vr as zi, wr as Bi, xn as Vi, yn as Hi } from "./embeddedCodeEditorWidget-DPX_ivX-.js";
import { a as Ui, i as Wi, n as Gi, t as Z } from "./platformObservableUtils-CuEWfyFX.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/common/editor/editorOptions.js
function Ki(e, t, n) {
	let r = !1, i = qi(e);
	if (Er(i) && (t.restoreViewState(i), r = !0), e.selection) {
		let i = {
			startLineNumber: e.selection.startLineNumber,
			startColumn: e.selection.startColumn,
			endLineNumber: e.selection.endLineNumber ?? e.selection.startLineNumber,
			endColumn: e.selection.endColumn ?? e.selection.startColumn
		};
		t.setSelection(i, e.selectionSource ?? cn.NAVIGATION), e.selectionRevealType === je.NearTop ? t.revealRangeNearTop(i, n) : e.selectionRevealType === je.NearTopIfOutsideViewport ? t.revealRangeNearTopIfOutsideViewport(i, n) : e.selectionRevealType === je.CenterIfOutsideViewport ? t.revealRangeInCenterIfOutsideViewport(i, n) : t.revealRangeInCenter(i, n), r = !0;
	}
	return r;
}
function qi(e) {
	if (!e.selection || !e.viewState) return e.viewState;
	let t = e.viewState;
	if (t.modified) return t.modified.cursorState = [], t;
	let n = e.viewState;
	return n.cursorState &&= [], n;
}
var Ji = e((() => {
	c(), Sr();
})), Yi, Xi = e((() => {
	I(), br(), ge(), ke(), mt(), fi(), Or(), x(), ye(), dt(), Ne(), Ji(), Yi = class extends Mn {
		constructor(e, t, n) {
			super(t), this.editorService = e, this.configurationService = n, this._register(this.registerCodeEditorOpenHandler(this.doOpenCodeEditor.bind(this))), this._register(this.registerCodeEditorOpenHandler(this.doOpenCodeEditorFromDiff.bind(this)));
		}
		getActiveCodeEditor() {
			let e = this.editorService.activeTextEditorControl;
			if (xr(e)) return e;
			if (yr(e)) return e.getModifiedEditor();
			let t = this.editorService.activeEditorPane?.getControl();
			return _r(t) && xr(t.activeCodeEditor) ? t.activeCodeEditor : null;
		}
		async doOpenCodeEditorFromDiff(e, t, n) {
			let r = this.editorService.activeTextEditorControl;
			if (!n && yr(r) && e.options && e.resource && t === r.getModifiedEditor() && r.getModel() && Ie(e.resource, r.getModel()?.modified.uri)) {
				let t = r.getModifiedEditor();
				return Ki(e.options, t, _.Smooth), t;
			}
			return null;
		}
		async doOpenCodeEditor(e, t, n) {
			if (!this.configurationService.getValue().workbench?.editor?.enablePreviewFromCodeNavigation && t && !e.options?.pinned && !n && !Ie(t.getModel()?.uri, e.resource)) {
				for (let e of this.editorService.visibleEditorPanes) if (vr(e.getControl()) === t) {
					e.group.pinEditor();
					break;
				}
			}
			let r = await this.editorService.openEditor(e, n ? -2 : -1);
			if (r) {
				let e = r.getControl();
				if (xr(e)) return e;
				if (_r(e) && xr(e.activeCodeEditor)) return e.activeCodeEditor;
			}
			return null;
		}
	}, Yi = v([
		T(0, Tr),
		T(1, vt),
		T(2, Oe)
	], Yi);
})), Zi, Qi = e((() => {
	x(), Zi = Me("textEditorService");
}));
gn(), Le(), h(), V(), _e(), $t(), Ge(), Be(), cr(), j(), L(), jn(), ae(), We(), ce(), rn(), b(), U(), kt(), le(), kn(), ir(), Ke(), ue(), De(), Ln(), Jn(), pt(), lt(), at(), or(), ur(), pn(), r(), Qe(), ht(), fe(), se(), dr(), St(), wn(), Rt(), At(), Vn(), Jt(), vn(), gt(), it(), tr(), En(), zt(), Xn(), Ft(), ve(), xt(), f(), Ue(), ln(), Pe(), ar(), Wt(), ft(), hr(), Ee(), fr(), $e(), Pt(), oe(), we(), o(), Tt(), Yn(), Nn(), Vr(), vi(), Ar(), Zr(), Ii(), ui(), Ui(), Ur(), Wr(), Gi(), Kr(), Hr(), wi(), hi();
var $i = /* @__PURE__ */ t({});
I(), x(), Kt($i);
var ea = qn("diff-review-insert", mn.add, i(165, "Icon for 'Insert' in accessible diff viewer.")), ta = qn("diff-review-remove", mn.remove, i(166, "Icon for 'Remove' in accessible diff viewer.")), na = qn("diff-review-close", mn.close, i(167, "Icon for 'Close' in accessible diff viewer.")), ra = class extends n {
	static {
		this._ttPolicy = dn("diffReview", { createHTML: (e) => e });
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this._parentNode = e, this._visible = t, this._setVisible = n, this._canClose = r, this._width = i, this._height = a, this._diffs = o, this._models = s, this._instantiationService = c, this._state = z(this, (e) => {
			let t = this._visible.read(e);
			if (this._parentNode.style.visibility = t ? "visible" : "hidden", !t) return null;
			let n = e.store.add(this._instantiationService.createInstance(ia, this._diffs, this._models, this._setVisible, this._canClose));
			return {
				model: n,
				view: e.store.add(this._instantiationService.createInstance(fa, this._parentNode, n, this._width, this._height, this._models))
			};
		}).recomputeInitiallyAndOnChange(this._store);
	}
	next() {
		O((e) => {
			let t = this._visible.get();
			this._setVisible(!0, e), t && this._state.get().model.nextGroup(e);
		});
	}
	prev() {
		O((e) => {
			this._setVisible(!0, e), this._state.get().model.previousGroup(e);
		});
	}
	close() {
		O((e) => {
			this._setVisible(!1, e);
		});
	}
};
ra = v([T(8, w)], ra);
var ia = class extends n {
	constructor(e, t, n, r, i) {
		super(), this._diffs = e, this._models = t, this._setVisible = n, this.canClose = r, this._accessibilitySignalService = i, this._groups = E(this, []), this._currentGroupIdx = E(this, 0), this._currentElementIdx = E(this, 0), this.groups = this._groups, this.currentGroup = this._currentGroupIdx.map((e, t) => this._groups.read(t)[e]), this.currentGroupIndex = this._currentGroupIdx, this.currentElement = this._currentElementIdx.map((e, t) => this.currentGroup.read(t)?.lines[e]), this._register(D((e) => {
			let t = this._diffs.read(e);
			if (!t) {
				this._groups.set([], void 0);
				return;
			}
			let n = oa(t, this._models.getOriginalModel().getLineCount(), this._models.getModifiedModel().getLineCount());
			O((e) => {
				let t = this._models.getModifiedPosition();
				if (t) {
					let r = n.findIndex((e) => t?.lineNumber < e.range.modified.endLineNumberExclusive);
					r !== -1 && this._currentGroupIdx.set(r, e);
				}
				this._groups.set(n, e);
			});
		})), this._register(D((e) => {
			let t = this.currentElement.read(e);
			t?.type === Q.Deleted ? this._accessibilitySignalService.playSignal(Y.diffLineDeleted, { source: "accessibleDiffViewer.currentElementChanged" }) : t?.type === Q.Added && this._accessibilitySignalService.playSignal(Y.diffLineInserted, { source: "accessibleDiffViewer.currentElementChanged" });
		})), this._register(D((e) => {
			let t = this.currentElement.read(e);
			if (t && t.type !== Q.Header) {
				let e = t.modifiedLineNumber ?? t.diff.modified.startLineNumber;
				this._models.modifiedSetSelection(M.fromPositions(new R(e, 1)));
			}
		}));
	}
	_goToGroupDelta(e, t) {
		let n = this.groups.get();
		!n || n.length <= 1 || he(t, (t) => {
			this._currentGroupIdx.set(S.ofLength(n.length).clipCyclic(this._currentGroupIdx.get() + e), t), this._currentElementIdx.set(0, t);
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
		!t || t.lines.length <= 1 || O((n) => {
			this._currentElementIdx.set(S.ofLength(t.lines.length).clip(this._currentElementIdx.get() + e), n);
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
		n !== -1 && O((e) => {
			this._currentElementIdx.set(n, e);
		});
	}
	revealCurrentElementInEditor() {
		if (!this.canClose.get()) return;
		this._setVisible(!1, void 0);
		let e = this.currentElement.get();
		e && (e.type === Q.Deleted ? this._models.originalReveal(M.fromPositions(new R(e.originalLineNumber, 1))) : this._models.modifiedReveal(e.type === Q.Header ? void 0 : M.fromPositions(new R(e.modifiedLineNumber, 1))));
	}
	close() {
		this.canClose.get() && (this._setVisible(!1, void 0), this._models.modifiedFocus());
	}
};
ia = v([T(4, lr)], ia);
var aa = 3;
function oa(e, t, n) {
	let r = [];
	for (let i of Et(e, (e, t) => t.modified.startLineNumber - e.modified.endLineNumberExclusive < 2 * aa)) {
		let e = [];
		e.push(new ca());
		let a = new G(Math.max(1, i[0].original.startLineNumber - aa), Math.min(i[i.length - 1].original.endLineNumberExclusive + aa, t + 1)), o = new G(Math.max(1, i[0].modified.startLineNumber - aa), Math.min(i[i.length - 1].modified.endLineNumberExclusive + aa, n + 1));
		Qn(i, (t, n) => {
			let r = new G(t ? t.original.endLineNumberExclusive : a.startLineNumber, n ? n.original.startLineNumber : a.endLineNumberExclusive), i = new G(t ? t.modified.endLineNumberExclusive : o.startLineNumber, n ? n.modified.startLineNumber : o.endLineNumberExclusive);
			r.forEach((t) => {
				e.push(new da(t, i.startLineNumber + (t - r.startLineNumber)));
			}), n && (n.original.forEach((t) => {
				e.push(new la(n, t));
			}), n.modified.forEach((t) => {
				e.push(new ua(n, t));
			}));
		});
		let s = i[0].modified.join(i[i.length - 1].modified), c = i[0].original.join(i[i.length - 1].original);
		r.push(new sa(new zi(s, c), e));
	}
	return r;
}
var Q;
(function(e) {
	e[e.Header = 0] = "Header", e[e.Unchanged = 1] = "Unchanged", e[e.Deleted = 2] = "Deleted", e[e.Added = 3] = "Added";
})(Q ||= {});
var sa = class {
	constructor(e, t) {
		this.range = e, this.lines = t;
	}
}, ca = class {
	constructor() {
		this.type = Q.Header;
	}
}, la = class {
	constructor(e, t) {
		this.diff = e, this.originalLineNumber = t, this.type = Q.Deleted, this.modifiedLineNumber = void 0;
	}
}, ua = class {
	constructor(e, t) {
		this.diff = e, this.modifiedLineNumber = t, this.type = Q.Added, this.originalLineNumber = void 0;
	}
}, da = class {
	constructor(e, t) {
		this.originalLineNumber = e, this.modifiedLineNumber = t, this.type = Q.Unchanged;
	}
}, fa = class extends n {
	constructor(e, t, n, r, o, s) {
		super(), this._element = e, this._model = t, this._width = n, this._height = r, this._models = o, this._languageService = s, this.domNode = this._element, this.domNode.className = "monaco-component diff-review monaco-editor-background";
		let c = A("div");
		c.className = "diff-review-actions", this._actionBar = this._register(new Ct(c)), this._register(D((e) => {
			this._actionBar.clear(), this._model.canClose.read(e) && this._actionBar.push(de({
				id: "diffreview.close",
				label: i(168, "Close"),
				class: "close-diff-review " + a.asClassName(na),
				enabled: !0,
				run: async () => t.close()
			}), {
				label: !1,
				icon: !0
			});
		})), this._content = A("div"), this._content.className = "diff-review-content", this._content.setAttribute("role", "code"), this._scrollbar = this._register(new ie(this._content, {})), Zn(this.domNode, this._scrollbar.getDomNode(), c), this._register(D((e) => {
			this._height.read(e), this._width.read(e), this._scrollbar.scanDomNode();
		})), this._register(N(() => {
			Zn(this.domNode);
		})), this._register(Ei(this.domNode, {
			width: this._width,
			height: this._height
		})), this._register(Ei(this._content, {
			width: this._width,
			height: this._height
		})), this._register(B((e, t) => {
			this._model.currentGroup.read(e), this._render(t);
		})), this._register(Wn(this.domNode, "keydown", (e) => {
			(e.equals(P.DownArrow) || e.equals(k.CtrlCmd | P.DownArrow) || e.equals(k.Alt | P.DownArrow)) && (e.preventDefault(), this._model.goToNextLine()), (e.equals(P.UpArrow) || e.equals(k.CtrlCmd | P.UpArrow) || e.equals(k.Alt | P.UpArrow)) && (e.preventDefault(), this._model.goToPreviousLine()), (e.equals(P.Escape) || e.equals(k.CtrlCmd | P.Escape) || e.equals(k.Alt | P.Escape) || e.equals(k.Shift | P.Escape)) && (e.preventDefault(), this._model.close()), (e.equals(P.Space) || e.equals(P.Enter)) && (e.preventDefault(), this._model.revealCurrentElementInEditor());
		}));
	}
	_render(e) {
		let t = this._models.getOriginalOptions(), n = this._models.getModifiedOptions(), r = A("div");
		r.className = "diff-review-table", r.setAttribute("role", "list"), r.setAttribute("aria-label", i(169, "Accessible Diff Viewer. Use arrow up and down to navigate.")), ei(r, n.get(H.fontInfo)), Zn(this._content, r);
		let a = this._models.getOriginalModel(), o = this._models.getModifiedModel();
		if (!a || !o) return;
		let s = a.getOptions(), c = o.getOptions(), l = n.get(H.lineHeight), u = this._model.currentGroup.get();
		for (let d of u?.lines || []) {
			if (!u) break;
			let f;
			if (d.type === Q.Header) {
				let e = A("div");
				e.className = "diff-review-row", e.setAttribute("role", "listitem");
				let t = u.range, n = this._model.currentGroupIndex.get(), r = this._model.groups.get().length, a = (e) => e === 0 ? i(170, "no lines changed") : e === 1 ? i(171, "1 line changed") : i(172, "{0} lines changed", e), o = a(t.original.length), s = a(t.modified.length);
				e.setAttribute("aria-label", i(173, "Difference {0} of {1}: original line {2}, {3}, modified line {4}, {5}", n + 1, r, t.original.startLineNumber, o, t.modified.startLineNumber, s));
				let c = A("div");
				c.className = "diff-review-cell diff-review-summary", c.appendChild(It(`${n + 1}/${r}: @@ -${t.original.startLineNumber},${t.original.length} +${t.modified.startLineNumber},${t.modified.length} @@`)), e.appendChild(c), f = e;
			} else f = this._createRow(d, l, this._width.get(), t, a, s, n, o, c);
			r.appendChild(f);
			let p = z((e) => this._model.currentElement.read(e) === d);
			e.add(D((e) => {
				let t = p.read(e);
				f.tabIndex = t ? 0 : -1, t && f.focus();
			})), e.add(Re(f, "focus", () => {
				this._model.goToLine(d);
			}));
		}
		this._scrollbar.scanDomNode();
	}
	_createRow(e, t, n, r, o, s, c, l, u) {
		let d = r.get(H.layoutInfo), f = d.glyphMarginWidth + d.lineNumbersWidth, p = c.get(H.layoutInfo), m = 10 + p.glyphMarginWidth + p.lineNumbersWidth, h = "diff-review-row", ee = "", g = null;
		switch (e.type) {
			case Q.Added:
				h = "diff-review-row line-insert", ee = " char-insert", g = ea;
				break;
			case Q.Deleted:
				h = "diff-review-row line-delete", ee = " char-delete", g = ta;
				break;
		}
		let _ = A("div");
		_.style.minWidth = n + "px", _.className = h, _.setAttribute("role", "listitem"), _.ariaLevel = "";
		let v = A("div");
		v.className = "diff-review-cell", v.style.height = `${t}px`, _.appendChild(v);
		let y = A("span");
		y.style.width = f + "px", y.style.minWidth = f + "px", y.className = "diff-review-line-number" + ee, e.originalLineNumber === void 0 ? y.innerText = "\xA0" : y.appendChild(It(String(e.originalLineNumber))), v.appendChild(y);
		let b = A("span");
		b.style.width = m + "px", b.style.minWidth = m + "px", b.style.paddingRight = "10px", b.className = "diff-review-line-number" + ee, e.modifiedLineNumber === void 0 ? b.innerText = "\xA0" : b.appendChild(It(String(e.modifiedLineNumber))), v.appendChild(b);
		let te = A("span");
		if (te.className = "diff-review-spacer", g) {
			let e = A("span");
			e.className = a.asClassName(g), e.innerText = "\xA0\xA0", te.appendChild(e);
		} else te.innerText = "\xA0\xA0";
		v.appendChild(te);
		let x;
		if (e.modifiedLineNumber !== void 0) {
			let t = this._getLineHtml(l, c, u.tabSize, e.modifiedLineNumber, this._languageService.languageIdCodec);
			ra._ttPolicy && (t = ra._ttPolicy.createHTML(t)), v.insertAdjacentHTML("beforeend", t), x = l.getLineContent(e.modifiedLineNumber);
		} else {
			let t = this._getLineHtml(o, r, s.tabSize, e.originalLineNumber, this._languageService.languageIdCodec);
			ra._ttPolicy && (t = ra._ttPolicy.createHTML(t)), v.insertAdjacentHTML("beforeend", t), x = o.getLineContent(e.originalLineNumber);
		}
		x.length === 0 && (x = i(174, "blank"));
		let ne = "";
		switch (e.type) {
			case Q.Unchanged:
				ne = e.originalLineNumber === e.modifiedLineNumber ? i(175, "{0} unchanged line {1}", x, e.originalLineNumber) : i(176, "{0} original line {1} modified line {2}", x, e.originalLineNumber, e.modifiedLineNumber);
				break;
			case Q.Added:
				ne = i(177, "+ {0} modified line {1}", x, e.modifiedLineNumber);
				break;
			case Q.Deleted:
				ne = i(178, "- {0} original line {1}", x, e.originalLineNumber);
				break;
		}
		return _.setAttribute("aria-label", ne), _;
	}
	_getLineHtml(e, t, n, r, i) {
		let a = e.getLineContent(r), o = t.get(H.fontInfo), s = t.get(H.scrollbar).verticalScrollbarSize, c = Zt.createEmpty(a, i), l = Di.isBasicASCII(a, e.mightContainNonBasicASCII()), u = Di.containsRTL(a, l, e.mightContainRTL());
		return ji(new Fi(o.isMonospace && !t.get(H.disableMonospaceOptimizations), o.canUseHalfwidthRightwardsArrow, a, !1, l, u, 0, c, [], n, 0, o.spaceWidth, o.middotWidth, o.wsmiddotWidth, t.get(H.stopRenderingLineAfter), t.get(H.renderWhitespace), t.get(H.renderControlCharacters), t.get(H.fontLigatures) !== Ht.OFF, null, null, s)).html;
	}
};
fa = v([T(5, g)], fa);
var pa = class {
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
Si(), ai(), ti(), U(), fr(), kn(), h(), At(), V(), b(), Ft(), wi(), lt(), Be(), oi(), ae(), j(), L();
var ma = class e extends n {
	static {
		this.movedCodeBlockPadding = 4;
	}
	constructor(t, n, r, i, a) {
		super(), this._rootElement = t, this._diffModel = n, this._originalEditorLayoutInfo = r, this._modifiedEditorLayoutInfo = i, this._editors = a, this._originalScrollTop = K(this, this._editors.original.onDidScrollChange, () => this._editors.original.getScrollTop()), this._modifiedScrollTop = K(this, this._editors.modified.onDidScrollChange, () => this._editors.modified.getScrollTop()), this._viewZonesChanged = J("onDidChangeViewZones", this._editors.modified.onDidChangeViewZones), this.width = E(this, 0), this._modifiedViewZonesChangedSignal = J("modified.onDidChangeViewZones", this._editors.modified.onDidChangeViewZones), this._originalViewZonesChangedSignal = J("original.onDidChangeViewZones", this._editors.original.onDidChangeViewZones), this._state = z(this, (t) => {
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
					range: new S(Math.min(r, a), Math.max(r, a)),
					from: s,
					to: c,
					fromWithoutScroll: r,
					toWithoutScroll: a,
					move: e
				};
			});
			o.sort(nt(Lt((e) => e.fromWithoutScroll > e.toWithoutScroll, Dt), Lt((e) => e.fromWithoutScroll > e.toWithoutScroll ? e.fromWithoutScroll : -e.toWithoutScroll, en)));
			let s = ha.compute(o.map((e) => e.range)), c = i.verticalScrollbarWidth, l = (s.getTrackCount() - 1) * 10 + 20, u = c + l + (a.contentLeft - e.movedCodeBlockPadding), d = 0;
			for (let e of o) {
				let r = s.getTrack(d), i = c + 10 + r * 10, o = u, l = a.glyphMarginWidth + a.lineNumbersWidth, f = fn("http://www.w3.org/2000/svg", "rect");
				f.classList.add("arrow-rectangle"), f.setAttribute("x", `${o - l}`), f.setAttribute("y", `${e.to - 18 / 2}`), f.setAttribute("width", `${l}`), f.setAttribute("height", "18"), this._element.appendChild(f);
				let p = fn("http://www.w3.org/2000/svg", "g"), m = fn("http://www.w3.org/2000/svg", "path");
				m.setAttribute("d", `M 0 ${e.from} L ${i} ${e.from} L ${i} ${e.to} L ${o - 15} ${e.to}`), m.setAttribute("fill", "none"), p.appendChild(m);
				let h = fn("http://www.w3.org/2000/svg", "polygon");
				h.classList.add("arrow"), t.store.add(D((t) => {
					m.classList.toggle("currentMove", e.move === n.activeMovedText.read(t)), h.classList.toggle("currentMove", e.move === n.activeMovedText.read(t));
				})), h.setAttribute("points", `${o - 15},${e.to - 15 / 2} ${o},${e.to} ${o - 15},${e.to + 15 / 2}`), p.appendChild(h), this._element.appendChild(p), d++;
			}
			this.width.set(l, void 0);
		}), this._element = fn("http://www.w3.org/2000/svg", "svg"), this._element.setAttribute("class", "moved-blocks-lines"), this._rootElement.appendChild(this._element), this._register(N(() => this._element.remove())), this._register(D((t) => {
			let n = this._originalEditorLayoutInfo.read(t), r = this._modifiedEditorLayoutInfo.read(t);
			!n || !r || (this._element.style.left = `${n.width - n.verticalScrollbarWidth}px`, this._element.style.height = `${n.height}px`, this._element.style.width = `${n.verticalScrollbarWidth + n.contentLeft - e.movedCodeBlockPadding + this.width.read(t)}px`);
		})), this._register(ne(this._state));
		let o = z((e) => {
			let t = this._diffModel.read(e)?.diff.read(e);
			return t ? t.movedTexts.map((e) => ({
				move: e,
				original: new Bi(He(e.lineRangeMapping.original.startLineNumber - 1), 18),
				modified: new Bi(He(e.lineRangeMapping.modified.startLineNumber - 1), 18)
			})) : [];
		});
		this._register(jr(this._editors.original, o.map((e) => e.map((e) => e.original)))), this._register(jr(this._editors.modified, o.map((e) => e.map((e) => e.modified)))), this._register(B((e, t) => {
			let n = o.read(e);
			for (let e of n) t.add(new ga(this._editors.original, e.original, e.move, "original", this._diffModel.get())), t.add(new ga(this._editors.modified, e.modified, e.move, "modified", this._diffModel.get()));
		}));
		let s = J("original.onDidFocusEditorWidget", (e) => this._editors.original.onDidFocusEditorWidget(() => setTimeout(() => e(void 0), 0))), c = J("modified.onDidFocusEditorWidget", (e) => this._editors.modified.onDidFocusEditorWidget(() => setTimeout(() => e(void 0), 0))), l = "modified";
		this._register(Ve({ changeTracker: {
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
}, ha = class e {
	static compute(t) {
		let n = [], r = [];
		for (let e of t) {
			let t = n.findIndex((t) => !t.intersectsStrict(e));
			t === -1 && (n.length >= 6 ? t = yt(n, Lt((t) => t.intersectWithRangeLength(e), en)) : (t = n.length, n.push(new et()))), n[t].addRange(e), r.push(t);
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
}, ga = class extends Br {
	constructor(e, t, n, r, o) {
		let s = C("div.diff-hidden-lines-widget");
		super(e, t, s.root), this._editor = e, this._move = n, this._kind = r, this._diffModel = o, this._nodes = C("div.diff-moved-code-block", { style: { marginRight: "4px" } }, [C("div.text-content@textContent"), C("div.action-bar@actionBar")]), s.root.appendChild(this._nodes.root);
		let c = K(this._editor.onDidLayoutChange, () => this._editor.getLayoutInfo());
		this._register(Ei(this._nodes.root, { paddingRight: c.map((e) => e.verticalScrollbarWidth) }));
		let l;
		l = n.changes.length > 0 ? this._kind === "original" ? i(198, "Code moved with changes to line {0}-{1}", this._move.lineRangeMapping.modified.startLineNumber, this._move.lineRangeMapping.modified.endLineNumberExclusive - 1) : i(199, "Code moved with changes from line {0}-{1}", this._move.lineRangeMapping.original.startLineNumber, this._move.lineRangeMapping.original.endLineNumberExclusive - 1) : this._kind === "original" ? i(200, "Code moved to line {0}-{1}", this._move.lineRangeMapping.modified.startLineNumber, this._move.lineRangeMapping.modified.endLineNumberExclusive - 1) : i(201, "Code moved from line {0}-{1}", this._move.lineRangeMapping.original.startLineNumber, this._move.lineRangeMapping.original.endLineNumberExclusive - 1);
		let u = this._register(new Ct(this._nodes.actionBar, { highlightToggledItems: !0 })), d = new Ze("", l, "", !1);
		u.push(d, {
			icon: !1,
			label: !0
		});
		let f = new Ze("", "Compare", a.asClassName(mn.compareChanges), !0, () => {
			this._editor.focus(), this._diffModel.movedTextToCompare.set(this._diffModel.movedTextToCompare.get() === n ? void 0 : this._move, void 0);
		});
		this._register(D((e) => {
			let t = this._diffModel.movedTextToCompare.read(e) === n;
			f.checked = t;
		})), u.push(f, {
			icon: !1,
			label: !0
		});
	}
};
V(), b(), wi(), j();
var _a = class extends n {
	constructor(e, t, n, r) {
		super(), this._editors = e, this._diffModel = t, this._options = n, this._decorations = z(this, (e) => {
			let t = this._diffModel.read(e), n = t?.diff.read(e);
			if (!n) return null;
			let r = this._diffModel.read(e).movedTextToCompare.read(e), i = this._options.renderIndicators.read(e), a = this._options.showEmptyDecorations.read(e), o = [], s = [];
			if (!r) for (let r of n.mappings) if (r.lineRangeMapping.original.isEmpty || o.push({
				range: r.lineRangeMapping.original.toInclusiveRange(),
				options: i ? Mi : bi
			}), r.lineRangeMapping.modified.isEmpty || s.push({
				range: r.lineRangeMapping.modified.toInclusiveRange(),
				options: i ? yi : Li
			}), r.lineRangeMapping.modified.isEmpty || r.lineRangeMapping.original.isEmpty) r.lineRangeMapping.original.isEmpty || o.push({
				range: r.lineRangeMapping.original.toInclusiveRange(),
				options: Ci
			}), r.lineRangeMapping.modified.isEmpty || s.push({
				range: r.lineRangeMapping.modified.toInclusiveRange(),
				options: ki
			});
			else {
				let n = this._options.useTrueInlineDiffRendering.read(e) && Yr(r.lineRangeMapping);
				for (let e of r.lineRangeMapping.innerChanges || []) if (r.lineRangeMapping.original.contains(e.originalRange.startLineNumber) && o.push({
					range: e.originalRange,
					options: e.originalRange.isEmpty() && a ? Oi : _i
				}), r.lineRangeMapping.modified.contains(e.modifiedRange.startLineNumber) && s.push({
					range: e.modifiedRange,
					options: e.modifiedRange.isEmpty() && a && !n ? Pi : Ai
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
					options: i ? Mi : bi
				});
				let n = e.modified.toInclusiveRange();
				n && s.push({
					range: n,
					options: i ? yi : Li
				});
				for (let t of e.innerChanges || []) o.push({
					range: t.originalRange,
					options: _i
				}), s.push({
					range: t.modifiedRange,
					options: Ai
				});
			}
			let c = this._diffModel.read(e).activeMovedText.read(e);
			for (let e of n.movedTexts) o.push({
				range: e.lineRangeMapping.original.toInclusiveRange(),
				options: {
					description: "moved",
					blockClassName: "movedOriginal" + (e === c ? " currentMove" : ""),
					blockPadding: [
						ma.movedCodeBlockPadding,
						0,
						ma.movedCodeBlockPadding,
						ma.movedCodeBlockPadding
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
		}), this._register($r(this._editors.original, this._decorations.map((e) => e?.originalDecorations || []))), this._register($r(this._editors.modified, this._decorations.map((e) => e?.modifiedDecorations || [])));
	}
};
Qr(), I(), U(), pe(), V(), b(), wi(), Pe(), Ln(), gi(), mt(), We(), j(), L(), oi();
var $, va = class extends n {
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
		let s = K(this._themeService.onDidColorThemeChange, () => this._themeService.getColorTheme()), c = z((e) => {
			let t = s.read(e);
			return {
				insertColor: t.getColor(Sn) || (t.getColor(Yt) || yn).transparent(2),
				removeColor: t.getColor(zn) || (t.getColor(Ot) || Fn).transparent(2)
			};
		}), l = hn(A("div"));
		l.setClassName("diffViewport"), l.setPosition("absolute");
		let u = C("div.diffOverview", { style: {
			position: "absolute",
			top: "0px",
			width: $.ENTIRE_DIFF_OVERVIEW_WIDTH + "px"
		} }).root;
		this._register(Lr(u, l.domNode)), this._register(Wn(u, On.POINTER_DOWN, (e) => {
			this._editors.modified.delegateVerticalScrollbarPointerDown(e);
		})), this._register(Re(u, On.MOUSE_WHEEL, (e) => {
			this._editors.modified.delegateScrollFromMouseWheelEvent(e);
		}, { passive: !1 })), this._register(Lr(this._rootElement, u)), this._register(B((e, t) => {
			let n = this._diffModel.read(e), r = this._editors.original.createOverviewRuler("original diffOverviewRuler");
			r && (t.add(r), t.add(Lr(u, r.getDomNode())));
			let i = this._editors.modified.createOverviewRuler("modified diffOverviewRuler");
			if (i && (t.add(i), t.add(Lr(u, i.getDomNode()))), !r || !i) return;
			let a = J("viewZoneChanged", this._editors.original.onDidChangeViewZones), o = J("viewZoneChanged", this._editors.modified.onDidChangeViewZones), s = J("hiddenRangesChanged", this._editors.original.onDidChangeHiddenAreas), d = J("hiddenRangesChanged", this._editors.modified.onDidChangeHiddenAreas);
			t.add(D((e) => {
				a.read(e), o.read(e), s.read(e), d.read(e);
				let t = c.read(e), l = n?.diff.read(e)?.mappings;
				function u(e, t, n) {
					let r = n._getViewModel();
					return r ? e.filter((e) => e.length > 0).map((e) => {
						let n = r.coordinatesConverter.convertModelPositionToViewPosition(new R(e.startLineNumber, 1)), i = r.coordinatesConverter.convertModelPositionToViewPosition(new R(e.endLineNumberExclusive, 1)), a = i.lineNumber - n.lineNumber;
						return new Ni(n.lineNumber, i.lineNumber, a, t.toString());
					}) : [];
				}
				let f = u((l || []).map((e) => e.lineRangeMapping.original), t.removeColor, this._editors.original), p = u((l || []).map((e) => e.lineRangeMapping.modified), t.insertColor, this._editors.modified);
				r?.setZones(f), i?.setZones(p);
			})), t.add(D((e) => {
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
					let o = this._editors.modifiedScrollTop.read(e), s = this._editors.modifiedScrollHeight.read(e), c = this._editors.modified.getOption(H.scrollbar), u = new An(c.verticalHasArrows ? c.arrowSize : 0, c.verticalScrollbarSize, 0, a.height, s, o);
					l.setTop(u.getSliderPosition()), l.setHeight(u.getSliderSize());
				} else l.setTop(0), l.setHeight(0);
				u.style.height = t + "px", u.style.left = n - $.ENTIRE_DIFF_OVERVIEW_WIDTH + "px", l.setWidth($.ENTIRE_DIFF_OVERVIEW_WIDTH);
			}));
		}));
	}
};
va = $ = v([T(6, vt)], va), I(), V(), b(), Pe(), Ln(), Be(), x(), We(), j(), L();
var ya = class extends n {
	get onDidContentSizeChange() {
		return this._onDidContentSizeChange.event;
	}
	constructor(e, t, n, r, i, a, o, s) {
		super(), this.originalEditorElement = e, this.modifiedEditorElement = t, this._options = n, this._argCodeEditorWidgetOptions = r, this._createInnerEditor = i, this._contextKeyService = a, this._instantiationService = o, this._keybindingService = s, this.original = this._register(this._createLeftHandSideEditor(this._options.editorOptions.get(), this._argCodeEditorWidgetOptions.originalEditor || {})), this.modified = this._register(this._createRightHandSideEditor(this._options.editorOptions.get(), this._argCodeEditorWidgetOptions.modifiedEditor || {})), this._onDidContentSizeChange = this._register(new d()), this.modifiedScrollTop = K(this, this.modified.onDidScrollChange, () => this.modified.getScrollTop()), this.modifiedScrollHeight = K(this, this.modified.onDidScrollChange, () => this.modified.getScrollHeight()), this.modifiedObs = Ti(this.modified), this.originalObs = Ti(this.original), this.modifiedModel = this.modifiedObs.model, this.modifiedSelections = K(this, this.modified.onDidChangeCursorSelection, () => this.modified.getSelections() ?? []), this.modifiedCursor = xn({
			owner: this,
			equalsFn: R.equals
		}, (e) => this.modifiedSelections.read(e)[0]?.getPosition() ?? new R(1, 1)), this.originalCursor = K(this, this.original.onDidChangeCursorPosition, () => this.original.getPosition() ?? new R(1, 1)), this.isOriginalFocused = Ti(this.original).isFocused, this.isModifiedFocused = Ti(this.modified).isFocused, this.isFocused = z(this, (e) => this.isOriginalFocused.read(e) || this.isModifiedFocused.read(e)), this._argCodeEditorWidgetOptions = null, this._register(Ve({ changeTracker: {
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
			let t = this.original.getContentWidth() + this.modified.getContentWidth() + va.ENTIRE_DIFF_OVERVIEW_WIDTH, n = Math.max(this.modified.getContentHeight(), this.original.getContentHeight());
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
		return t.modifiedAriaLabel && (n.ariaLabel = t.modifiedAriaLabel), n.ariaLabel = this._updateAriaLabel(n.ariaLabel), n.wordWrapOverride1 = this._options.diffWordWrap.get(), n.revealHorizontalRightPadding = mr.revealHorizontalRightPadding.defaultValue + va.ENTIRE_DIFF_OVERVIEW_WIDTH, n.scrollbar.verticalHasArrows = !1, n.extraEditorClassName = "modified-in-monaco-diff-editor", n;
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
ya = v([
	T(5, Pn),
	T(6, w),
	T(7, jt)
], ya), Bn(), V(), b(), j(), ae(), L();
var ba = class {
	resetSash() {
		this._sashRatio.set(void 0, void 0);
	}
	constructor(e, t) {
		this._options = e, this.dimensions = t, this.sashLeft = Rn(this, (e) => {
			let t = this._sashRatio.read(e) ?? this._options.splitViewDefaultRatio.read(e);
			return this._computeSashLeft(t, e);
		}, (e, t) => {
			let n = this.dimensions.width.get();
			this._sashRatio.set(e / n, t);
		}), this._sashRatio = E(this, void 0);
	}
	_computeSashLeft(e, t) {
		let n = this.dimensions.width.read(t), r = Math.floor(this._options.splitViewDefaultRatio.read(t) * n), i = this._options.enableSplitViewResizing.read(t) ? Math.floor(e * n) : r;
		return n <= 200 ? r : i < 100 ? 100 : i > n - 100 ? n - 100 : i;
	}
}, xa = class extends n {
	constructor(e, t, n, r, i, a) {
		super(), this._domNode = e, this._dimensions = t, this._enabled = n, this._boundarySashes = r, this.sashLeft = i, this._resetSash = a, this._sash = this._register(new wt(this._domNode, {
			getVerticalSashTop: (e) => 0,
			getVerticalSashLeft: (e) => this.sashLeft.get(),
			getVerticalSashHeight: (e) => this._dimensions.height.get()
		}, { orientation: In.VERTICAL })), this._startSashPosition = void 0, this._register(this._sash.onDidStart(() => {
			this._startSashPosition = this.sashLeft.get();
		})), this._register(this._sash.onDidChange((e) => {
			this.sashLeft.set(this._startSashPosition + (e.currentX - e.startX), void 0);
		})), this._register(this._sash.onDidEnd(() => this._sash.layout())), this._register(this._sash.onDidReset(() => this._resetSash())), this._register(D((e) => {
			let t = this._boundarySashes.read(e);
			t && (this._sash.orthogonalEndSash = t.bottom);
		})), this._register(D((e) => {
			let t = this._enabled.read(e);
			this._sash.state = t ? Cn.Enabled : Cn.Disabled, this.sashLeft.read(e), this._dimensions.height.read(e), this._sash.layout();
		}));
	}
};
_e(), V(), ke();
var Sa = class e extends n {
	constructor() {
		super(...arguments), this._id = ++e.idCounter, this._onDidDispose = this._register(new d()), this.onDidDispose = this._onDidDispose.event;
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
rt(), pr(), Vt(), Ir(), Nr(), Hi(), kn();
var Ca = class extends st {
	constructor(e) {
		super(), this._getContext = e;
	}
	runAction(e, t) {
		let n = this._getContext();
		return super.runAction(e, n);
	}
};
U(), V(), b(), at(), lt(), We(), oi(), L(), jn(), ae();
var wa = class extends n {
	constructor(e, t, n) {
		super(), this._editor = e, this._domNode = t, this.itemProvider = n, this.scrollTop = K(this, this._editor.onDidScrollChange, (e) => this._editor.getScrollTop()), this.isScrollTopZero = this.scrollTop.map((e) => e === 0), this.modelAttached = K(this, this._editor.onDidChangeModel, (e) => this._editor.hasModel()), this.editorOnDidChangeViewZones = J("onDidChangeViewZones", this._editor.onDidChangeViewZones), this.editorOnDidContentSizeChange = J("onDidContentSizeChange", this._editor.onDidContentSizeChange), this.domNodeSizeChanged = Ce("domNodeSizeChanged"), this.views = this._register(new Nt()), this._domNode.className = "gutter monaco-editor";
		let r = this._domNode.appendChild(C("div.scroll-decoration", {
			role: "presentation",
			ariaHidden: "true",
			style: { width: "100%" }
		}).root), i = new ResizeObserver(() => {
			O((e) => {
				this.domNodeSizeChanged.trigger(e);
			});
		});
		i.observe(this._domNode), this._register(N(() => i.disconnect())), this._register(D((e) => {
			r.className = this.isScrollTopZero.read(e) ? "" : "scroll-decoration";
		})), this._register(D((e) => this.render(e)));
	}
	dispose() {
		super.dispose(), Zn(this._domNode);
	}
	render(e) {
		if (!this.modelAttached.read(e)) return;
		this.domNodeSizeChanged.read(e), this.editorOnDidChangeViewZones.read(e), this.editorOnDidContentSizeChange.read(e);
		let t = this.scrollTop.read(e), n = this._editor.getVisibleRanges(), r = new Set(this.views.keys()), i = S.ofStartAndLength(0, this._domNode.clientHeight);
		if (!i.isEmpty) for (let a of n) {
			let n = new G(a.startLineNumber, a.endLineNumber + 1), o = this.itemProvider.getIntersectingGutterItems(n, e);
			O((e) => {
				for (let a of o) {
					if (!a.range.intersect(n)) continue;
					r.delete(a.id);
					let o = this.views.get(a.id);
					if (o) o.item.set(a, e);
					else {
						let e = A("div");
						this._domNode.appendChild(e);
						let t = E("item", a);
						o = new Ta(t, this.itemProvider.createView(t, e), e), this.views.set(a.id, o);
					}
					let s = a.range.startLineNumber <= this._editor.getModel().getLineCount() ? this._editor.getTopForLineNumber(a.range.startLineNumber, !0) - t : a.range.startLineNumber > 1 ? this._editor.getBottomForLineNumber(a.range.startLineNumber - 1, !1) - t : 0, c = (a.range.endLineNumberExclusive === 1 ? Math.max(s, this._editor.getTopForLineNumber(a.range.startLineNumber, !1) - t) : Math.max(s, this._editor.getBottomForLineNumber(a.range.endLineNumberExclusive - 1, !0) - t)) - s;
					o.domNode.style.top = `${s}px`, o.domNode.style.height = `${c}px`, o.gutterItemView.layout(S.ofStartAndLength(s, c), i);
				}
			});
		}
		for (let e of r) this.views.deleteAndDispose(e);
	}
}, Ta = class {
	constructor(e, t, n) {
		this.item = e, this.gutterItemView = t, this.domNode = n;
	}
	dispose() {
		this.gutterItemView.dispose(), this.domNode.remove();
	}
};
I(), U(), fr(), V(), b(), Jt(), x(), Pe(), at(), lt(), Jn(), hi(), wi(), We(), j(), ae(), L();
var Ea = [], Da = 35, Oa = class extends n {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this._diffModel = t, this._editors = n, this._options = r, this._sashLayout = i, this._boundarySashes = a, this._instantiationService = o, this._contextKeyService = s, this._menuService = c, this._menu = this._register(this._menuService.createMenu(Xe.DiffEditorHunkToolbar, this._contextKeyService)), this._actions = K(this, this._menu.onDidChange, () => this._menu.getActions()), this._hasActions = this._actions.map((e) => e.length > 0), this._showSash = z(this, (e) => this._options.renderSideBySide.read(e) && this._hasActions.read(e)), this.width = z(this, (e) => this._hasActions.read(e) ? Da : 0), this.elements = C("div.gutter@gutter", { style: {
			position: "absolute",
			height: "100%",
			width: "35px"
		} }, []), this._currentDiff = z(this, (e) => {
			let t = this._diffModel.read(e);
			if (!t) return;
			let n = t.diff.read(e)?.mappings, r = this._editors.modifiedCursor.read(e);
			if (r) return n?.find((e) => e.lineRangeMapping.modified.contains(r.lineNumber));
		}), this._selectedDiffs = z(this, (e) => {
			let t = this._diffModel.read(e)?.diff.read(e);
			if (!t) return Ea;
			let n = this._editors.modifiedSelections.read(e);
			if (n.every((e) => e.isEmpty())) return Ea;
			let r = new m(n.map((e) => G.fromRangeInclusive(e))), i = t.mappings.filter((e) => e.lineRangeMapping.innerChanges && r.intersects(e.lineRangeMapping.modified)).map((e) => ({
				mapping: e,
				rangeMappings: e.lineRangeMapping.innerChanges.filter((e) => n.some((t) => M.areIntersecting(e.modifiedRange, t)))
			}));
			return i.length === 0 || i.every((e) => e.rangeMappings.length === 0) ? Ea : i;
		}), this._register(Jr(e, this.elements.root)), this._register(Re(this.elements.root, "click", () => {
			this._editors.modified.focus();
		})), this._register(Ei(this.elements.root, { display: this._hasActions.map((e) => e ? "block" : "none") })), F(this, (t) => this._showSash.read(t) ? new xa(e, this._sashLayout.dimensions, this._options.enableSplitViewResizing, this._boundarySashes, Rn(this, (e) => this._sashLayout.sashLeft.read(e) - Da, (e, t) => this._sashLayout.sashLeft.set(e + Da, t)), () => this._sashLayout.resetSash()) : void 0).recomputeInitiallyAndOnChange(this._store);
		let l = z(this, (e) => {
			let t = this._diffModel.read(e);
			if (!t) return [];
			let n = t.diff.read(e);
			if (!n) return [];
			let r = this._selectedDiffs.read(e);
			if (r.length > 0) return [new ka(pi.fromRangeMappings(r.flatMap((e) => e.rangeMappings)), !0, Xe.DiffEditorSelectionToolbar, void 0, t.model.original.uri, t.model.modified.uri)];
			let i = this._currentDiff.read(e);
			return n.mappings.map((e) => new ka(e.lineRangeMapping.withInnerChangesFromLineRanges(), e.lineRangeMapping === i?.lineRangeMapping, Xe.DiffEditorHunkToolbar, void 0, t.model.original.uri, t.model.modified.uri));
		});
		this._register(new wa(this._editors.modified, this.elements.root, {
			getIntersectingGutterItems: (e, t) => l.read(t),
			createView: (e, t) => this._instantiationService.createInstance(Aa, e, t, this)
		})), this._register(Re(this.elements.gutter, On.MOUSE_WHEEL, (e) => {
			this._editors.modified.getOption(H.scrollbar).handleMouseWheel && this._editors.modified.delegateScrollFromMouseWheelEvent(e);
		}, { passive: !1 }));
	}
	computeStagedValue(e) {
		let t = e.innerChanges ?? [], n = new Ri(this._editors.modifiedModel.get()), r = new Ri(this._editors.original.getModel());
		return new Je(t.map((e) => e.toTextEdit(n))).apply(r);
	}
	layout(e) {
		this.elements.gutter.style.left = e + "px";
	}
};
Oa = v([
	T(6, w),
	T(7, Pn),
	T(8, tn)
], Oa);
var ka = class {
	constructor(e, t, n, r, i, a) {
		this.mapping = e, this.showAlways = t, this.menuId = n, this.rangeOverride = r, this.originalUri = i, this.modifiedUri = a;
	}
	get id() {
		return this.mapping.modified.toString();
	}
	get range() {
		return this.rangeOverride ?? this.mapping.modified;
	}
}, Aa = class extends n {
	constructor(e, t, n, r) {
		super(), this._item = e, this._elements = C("div.gutterItem", { style: {
			height: "20px",
			width: "34px"
		} }, [C("div.background@background", {}, []), C("div.buttons@buttons", {}, [])]), this._showAlways = this._item.map(this, (e) => e.showAlways), this._menuId = this._item.map(this, (e) => e.menuId), this._isSmall = E(this, !1), this._lastItemRange = void 0, this._lastViewRange = void 0;
		let i = this._register(r.createInstance(Gt, "element", { instantHover: !0 }, { position: { hoverPosition: xe.RIGHT } }));
		this._register(Lr(t, this._elements.root)), this._register(D((e) => {
			let t = this._showAlways.read(e);
			this._elements.root.classList.toggle("noTransition", !0), this._elements.root.classList.toggle("showAlways", t), setTimeout(() => {
				this._elements.root.classList.toggle("noTransition", !1);
			}, 0);
		})), this._register(B((e, t) => {
			this._elements.buttons.replaceChildren();
			let a = t.add(r.createInstance(Vi, this._elements.buttons, this._menuId.read(e), {
				orientation: $n.VERTICAL,
				hoverDelegate: i,
				toolbarOptions: { primaryGroup: (e) => e.startsWith("primary") },
				overflowBehavior: { maxItems: this._isSmall.read(e) ? 1 : 3 },
				hiddenItemStrategy: mi.Ignore,
				actionRunner: t.add(new Ca(() => {
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
		let r = e.length / 2 - n / 2, i = n, a = e.start + r, o = S.tryCreate(i, t.endExclusive - i - n), s = S.tryCreate(e.start + i, e.endExclusive - n - i);
		s && o && s.start < s.endExclusive && (a = o.clip(a), a = s.clip(a)), this._elements.buttons.style.top = `${a - e.start}px`;
	}
};
Aa = v([T(3, w)], Aa), di(), U(), Ae(), At(), V(), b(), at(), Jn(), hi(), Be(), j(), L();
var ja = [], Ma = class extends n {
	constructor(e, t, n, r) {
		super(), this._editors = e, this._diffModel = t, this._options = n, this._widget = r, this._selectedDiffs = z(this, (e) => {
			let t = this._diffModel.read(e)?.diff.read(e);
			if (!t) return ja;
			let n = this._editors.modifiedSelections.read(e);
			if (n.every((e) => e.isEmpty())) return ja;
			let r = new m(n.map((e) => G.fromRangeInclusive(e))), i = t.mappings.filter((e) => e.lineRangeMapping.innerChanges && r.intersects(e.lineRangeMapping.modified)).map((e) => ({
				mapping: e,
				rangeMappings: e.lineRangeMapping.innerChanges.filter((e) => n.some((t) => M.areIntersecting(e.modifiedRange, t)))
			}));
			return i.length === 0 || i.every((e) => e.rangeMappings.length === 0) ? ja : i;
		}), this._register(B((e, t) => {
			if (!this._options.shouldRenderOldRevertArrows.read(e)) return;
			let n = this._diffModel.read(e), r = n?.diff.read(e);
			if (!n || !r || n.movedTextToCompare.read(e)) return;
			let i = [], a = this._selectedDiffs.read(e), o = new Set(a.map((e) => e.mapping));
			if (a.length > 0) {
				let n = this._editors.modifiedSelections.read(e), r = t.add(new Na(n[n.length - 1].positionLineNumber, this._widget, a.flatMap((e) => e.rangeMappings), !0));
				this._editors.modified.addGlyphMarginWidget(r), i.push(r);
			}
			for (let e of r.mappings) if (!o.has(e) && !e.lineRangeMapping.modified.isEmpty && e.lineRangeMapping.innerChanges) {
				let n = t.add(new Na(e.lineRangeMapping.modified.startLineNumber, this._widget, e.lineRangeMapping, !1));
				this._editors.modified.addGlyphMarginWidget(n), i.push(n);
			}
			t.add(N(() => {
				for (let e of i) this._editors.modified.removeGlyphMarginWidget(e);
			}));
		}));
	}
}, Na = class e extends n {
	static {
		this.counter = 0;
	}
	getId() {
		return this._id;
	}
	constructor(t, n, r, a) {
		super(), this._lineNumber = t, this._widget = n, this._diffs = r, this._revertSelection = a, this._id = `revertButton${e.counter++}`, this._domNode = C("div.revertButton", { title: this._revertSelection ? i(202, "Revert Selected Changes") : i(203, "Revert Change") }, [sn(mn.arrowRight)]).root, this._register(Re(this._domNode, On.MOUSE_DOWN, (e) => {
			e.button !== 2 && (e.stopPropagation(), e.preventDefault());
		})), this._register(Re(this._domNode, On.MOUSE_UP, (e) => {
			e.stopPropagation(), e.preventDefault();
		})), this._register(Re(this._domNode, On.CLICK, (e) => {
			this._diffs instanceof zi ? this._widget.revert(this._diffs) : this._widget.revertRangeMappings(this._diffs), e.stopPropagation(), e.preventDefault();
		}));
	}
	getDomNode() {
		return this._domNode;
	}
	getPosition() {
		return {
			lane: Gn.Right,
			range: {
				startColumn: 1,
				startLineNumber: this._lineNumber,
				endColumn: 1,
				endLineNumber: this._lineNumber
			},
			zIndex: 10001
		};
	}
}, Pa = /* @__PURE__ */ t({});
En(), I(), U(), Le(), _e(), V(), b(), Kr(), Tt(), Jt(), x(), zt(), at(), Ln(), Jn(), ke(), ti(), wi(), ae(), j(), L(), rn(), jn(), We(), Kt(Pa);
var Fa = class extends Sa {
	static {
		this.ENTIRE_DIFF_OVERVIEW_WIDTH = va.ENTIRE_DIFF_OVERVIEW_WIDTH;
	}
	get onDidContentSizeChange() {
		return this._editors.onDidContentSizeChange;
	}
	get collapseUnchangedRegions() {
		return this._options.hideUnchangedRegions.get();
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this._domElement = e, this._parentContextKeyService = r, this._parentInstantiationService = i, this._codeEditorService = a, this._accessibilitySignalService = o, this._editorProgressService = s, this.keybindingService = c, this.elements = C("div.monaco-diff-editor.side-by-side", { style: {
			position: "relative",
			height: "100%"
		} }, [
			C("div.editor.original@original", { style: {
				position: "absolute",
				height: "100%"
			} }),
			C("div.editor.modified@modified", { style: {
				position: "absolute",
				height: "100%"
			} }),
			C("div.accessibleDiffViewer@accessibleDiffViewer", { style: {
				position: "absolute",
				height: "100%"
			} })
		]), this._diffModelSrc = this._register(ot(this, void 0)), this._diffModel = z(this, (e) => this._diffModelSrc.read(e)?.object), this.onDidChangeModel = tt.fromObservableLight(this._diffModel), this._contextKeyService = this._register(this._parentContextKeyService.createScoped(this._domElement)), this._instantiationService = this._register(this._parentInstantiationService.createChild(new on([Pn, this._contextKeyService]))), this._boundarySashes = E(this, void 0), this._accessibleDiffViewerShouldBeVisible = E(this, !1), this._accessibleDiffViewerVisible = z(this, (e) => this._options.onlyShowAccessibleDiffViewer.read(e) ? !0 : this._accessibleDiffViewerShouldBeVisible.read(e)), this._movedBlocksLinesPart = E(this, void 0), this._layoutInfo = z(this, (e) => {
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
		}), this._diffValue = this._diffModel.map((e, t) => e?.diff.read(t)), this.onDidUpdateDiff = tt.fromObservableLight(this._diffValue), this._codeEditorService.willCreateDiffEditor(), this._contextKeyService.createKey("isInDiffEditor", !0), this.elements.root.classList.toggle("standalone", n.isStandaloneEditor || !1), this._domElement.appendChild(this.elements.root), this._register(N(() => this.elements.root.remove())), this._rootSizeObserver = this._register(new Pr(this.elements.root, t.dimension)), this._rootSizeObserver.setAutomaticLayout(t.automaticLayout ?? !1), this._options = this._instantiationService.createInstance(zr, t), this._register(D((e) => {
			this._options.setWidth(this._rootSizeObserver.width.read(e));
		})), this._contextKeyService.createKey(q.isEmbeddedDiffEditor.key, !1), this._register(Z(q.isEmbeddedDiffEditor, this._contextKeyService, (e) => this._options.isInEmbeddedEditor.read(e))), this._register(Z(q.comparingMovedCode, this._contextKeyService, (e) => !!this._diffModel.read(e)?.movedTextToCompare.read(e))), this._register(Z(q.diffEditorRenderSideBySideInlineBreakpointReached, this._contextKeyService, (e) => this._options.couldShowInlineViewBecauseOfSize.read(e))), this._register(Z(q.diffEditorInlineMode, this._contextKeyService, (e) => !this._options.renderSideBySide.read(e))), this._register(Z(q.hasChanges, this._contextKeyService, (e) => (this._diffModel.read(e)?.diff.read(e)?.mappings.length ?? 0) > 0)), this._editors = this._register(this._instantiationService.createInstance(ya, this.elements.original, this.elements.modified, this._options, n, (e, t, n, r) => this._createInnerEditor(e, t, n, r))), this._register(Z(q.diffEditorOriginalWritable, this._contextKeyService, (e) => this._options.originalEditable.read(e))), this._register(Z(q.diffEditorModifiedWritable, this._contextKeyService, (e) => !this._options.readOnly.read(e))), this._register(Z(q.diffEditorOriginalUri, this._contextKeyService, (e) => this._diffModel.read(e)?.model.original.uri.toString() ?? "")), this._register(Z(q.diffEditorModifiedUri, this._contextKeyService, (e) => this._diffModel.read(e)?.model.modified.uri.toString() ?? "")), this._overviewRulerPart = F(this, (e) => this._options.renderOverviewRuler.read(e) ? this._instantiationService.createInstance(X(va), this._editors, this.elements.root, this._diffModel, this._rootSizeObserver.width, this._rootSizeObserver.height, this._layoutInfo.map((e) => e.modifiedEditor)) : void 0).recomputeInitiallyAndOnChange(this._store);
		let l = {
			height: this._rootSizeObserver.height,
			width: this._rootSizeObserver.width.map((e, t) => e - (this._overviewRulerPart.read(t)?.width ?? 0))
		};
		this._sashLayout = new ba(this._options, l), this._sash = F(this, (e) => {
			let t = this._options.renderSideBySide.read(e);
			return this.elements.root.classList.toggle("side-by-side", t), t ? new xa(this.elements.root, l, this._options.enableSplitViewResizing, this._boundarySashes, this._sashLayout.sashLeft, () => this._sashLayout.resetSash()) : void 0;
		}).recomputeInitiallyAndOnChange(this._store);
		let u = F(this, (e) => this._instantiationService.createInstance(X(xi), this._editors, this._diffModel, this._options)).recomputeInitiallyAndOnChange(this._store);
		F(this, (e) => this._instantiationService.createInstance(X(_a), this._editors, this._diffModel, this._options, this)).recomputeInitiallyAndOnChange(this._store);
		let d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = !1, m = F(this, (e) => this._instantiationService.createInstance(X(qr), Te(this._domElement), this._editors, this._diffModel, this._options, this, () => p || u.read(void 0).isUpdatingHiddenAreas, d, f)).recomputeInitiallyAndOnChange(this._store), h = z(this, (e) => {
			let t = m.read(e).viewZones.read(e).orig, n = u.read(e).viewZones.read(e).origViewZones;
			return t.concat(n);
		}), ee = z(this, (e) => {
			let t = m.read(e).viewZones.read(e).mod, n = u.read(e).viewZones.read(e).modViewZones;
			return t.concat(n);
		});
		this._register(jr(this._editors.original, h, (e) => {
			p = e;
		}, d));
		let g;
		this._register(jr(this._editors.modified, ee, (e) => {
			p = e, p ? g = ni.capture(this._editors.modified) : (g?.restore(this._editors.modified), g = void 0);
		}, f)), this._accessibleDiffViewer = F(this, (e) => this._instantiationService.createInstance(X(ra), this.elements.accessibleDiffViewer, this._accessibleDiffViewerVisible, (e, t) => this._accessibleDiffViewerShouldBeVisible.set(e, t), this._options.onlyShowAccessibleDiffViewer.map((e) => !e), this._rootSizeObserver.width, this._rootSizeObserver.height, this._diffModel.map((e, t) => e?.diff.read(t)?.mappings.map((e) => e.lineRangeMapping)), new pa(this._editors))).recomputeInitiallyAndOnChange(this._store);
		let _ = this._accessibleDiffViewerVisible.map((e) => e ? "hidden" : "visible");
		this._register(Ei(this.elements.modified, { visibility: _ })), this._register(Ei(this.elements.original, { visibility: _ })), this._createDiffEditorContributions(), this._codeEditorService.addDiffEditor(this), this._register(N(() => {
			this._codeEditorService.removeDiffEditor(this);
		})), this._gutter = F(this, (e) => this._options.shouldRenderGutterMenu.read(e) ? this._instantiationService.createInstance(X(Oa), this.elements.root, this._diffModel, this._editors, this._options, this._sashLayout, this._boundarySashes) : void 0), this._register(ne(this._layoutInfo)), F(this, (e) => new (X(ma))(this.elements.root, this._diffModel, this._layoutInfo.map((e) => e.originalEditor), this._layoutInfo.map((e) => e.modifiedEditor), this._editors)).recomputeInitiallyAndOnChange(this._store, (e) => {
			this._movedBlocksLinesPart.set(e, void 0);
		}), this._register(tt.runAndSubscribe(this._editors.modified.onDidChangeCursorPosition, (e) => this._handleCursorPositionChange(e, !0))), this._register(tt.runAndSubscribe(this._editors.original.onDidChangeCursorPosition, (e) => this._handleCursorPositionChange(e, !1)));
		let v = this._diffModel.map(this, (e, t) => {
			if (e) return e.diff.read(t) === void 0 && !e.isDiffUpToDate.read(t);
		});
		this._register(B((e, t) => {
			if (v.read(e) === !0) {
				let e = this._editorProgressService.show(!0, 1e3);
				t.add(N(() => e.done()));
			}
		})), this._register(B((e, t) => {
			t.add(new (X(Ma))(this._editors, this._diffModel, this._options, this));
		})), this._register(B((e, t) => {
			let n = this._diffModel.read(e);
			if (n) for (let e of [n.model.original, n.model.modified]) t.add(e.onWillDispose((e) => {
				Bt(new _n("TextModel got disposed before DiffEditorWidget model got reset")), this.setModel(null);
			}));
		})), this._register(D((e) => {
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
		return e.createInstance(si, t, n, r);
	}
	_createDiffEditorContributions() {
		let e = Se.getDiffEditorContributions();
		for (let t of e) try {
			this._register(this._instantiationService.createInstance(t.ctor, this));
		} catch (e) {
			Bt(e);
		}
	}
	get _targetEditor() {
		return this._editors.modified;
	}
	getEditorType() {
		return Ye.IDiffEditor;
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
		return this._instantiationService.createInstance(Mr, e, this._options);
	}
	getModel() {
		return this._diffModel.get()?.model ?? null;
	}
	setModel(e) {
		let t = e ? "model" in e ? ii.create(e).createNewRef(this) : ii.create(this.createViewModel(e), this) : null;
		this.setDiffModel(t);
	}
	setDiffModel(e, t) {
		let n = this._diffModel.get();
		!e && n && this._accessibleDiffViewer.get().close(), this._diffModel.get() !== e?.object && he(t, (t) => {
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
		return e ? Ia(e) : null;
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
		let r = n.getPosition().lineNumber, i = n.getSelection(), a = G.fromRange(i || new M(r, 0, r, 0)), o = t.filter((e) => e.lineRangeMapping.modified.intersect(a));
		n.pushUndoStop(), n.executeEdits("diffEditor", o.map((t) => ({
			range: t.lineRangeMapping.modified.toExclusiveRange(),
			text: e.model.original.getValueInRange(t.lineRangeMapping.original.toExclusiveRange())
		}))), n.pushUndoStop();
	}
	_goTo(e) {
		this._editors.modified.setPosition(new R(e.lineRangeMapping.modified.startLineNumber, 1)), this._editors.modified.revealRangeInCenter(e.lineRangeMapping.modified.toExclusiveRange());
	}
	goToDiff(e) {
		let t = this._diffModel.get()?.diff.get()?.mappings;
		if (!t || t.length === 0) return;
		let n = this._editors.modified.getPosition().lineNumber, r;
		r = e === "next" ? this._editors.modified.getModel().getLineCount() === n ? t[0] : t.find((e) => e.lineRangeMapping.modified.startLineNumber > n) ?? t[0] : Dn(t, (e) => e.lineRangeMapping.modified.startLineNumber < n) ?? t[t.length - 1], this._goTo(r), r.lineRangeMapping.modified.isEmpty ? this._accessibilitySignalService.playSignal(Y.diffLineDeleted, { source: "diffEditor.goToDiff" }) : r.lineRangeMapping.original.isEmpty ? this._accessibilitySignalService.playSignal(Y.diffLineInserted, { source: "diffEditor.goToDiff" }) : r && this._accessibilitySignalService.playSignal(Y.diffLineModified, { source: "diffEditor.goToDiff" });
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
				let e = Xr(i.getStartPosition(), t), n = Xr(i.getEndPosition(), t);
				r = M.plusRange(e, n);
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
		e && O((t) => {
			for (let n of e) n.collapseAll(t);
		});
	}
	showAllUnchangedRegions() {
		let e = this._diffModel.get()?.unchangedRegions.get();
		e && O((t) => {
			for (let n of e) n.showAll(t);
		});
	}
	_handleCursorPositionChange(e, t) {
		if (e?.reason === ri.Explicit) {
			let n = this._diffModel.get()?.diff.get()?.mappings.find((n) => t ? n.lineRangeMapping.modified.contains(e.position.lineNumber) : n.lineRangeMapping.original.contains(e.position.lineNumber));
			n?.lineRangeMapping.modified.isEmpty ? this._accessibilitySignalService.playSignal(Y.diffLineDeleted, { source: "diffEditor.cursorPositionChanged" }) : n?.lineRangeMapping.original.isEmpty ? this._accessibilitySignalService.playSignal(Y.diffLineInserted, { source: "diffEditor.cursorPositionChanged" }) : n && this._accessibilitySignalService.playSignal(Y.diffLineModified, { source: "diffEditor.cursorPositionChanged" });
		}
	}
};
Fa = v([
	T(3, Pn),
	T(4, w),
	T(5, s),
	T(6, lr),
	T(7, qe),
	T(8, jt)
], Fa);
function Ia(e) {
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
nn(), ee(), Fr(), Gr();
var La = /* @__PURE__ */ t({});
En(), I(), U(), Yn(), Ne(), Pe(), ir(), Vr(), br();
var Ra;
Kt(La);
var za = class {
	static {
		Ra = this;
	}
	static {
		this._ttpTokenizer = dn("tokenizeToString", { createHTML(e) {
			return e;
		} });
	}
	constructor(e, t) {
		this._configurationService = e, this._languageService = t;
	}
	async renderCodeBlock(e, t, n) {
		let r = xr(n.context) ? n.context : void 0, i;
		e ? i = this._languageService.getLanguageIdByLanguageName(e) : r && (i = r.getModel()?.getLanguageId()), i ||= re;
		let a = await li(this._languageService, t, i), o = Ra._ttpTokenizer ? Ra._ttpTokenizer.createHTML(a) ?? a : a, s = A("span");
		s.innerHTML = o;
		let c = s.querySelector(".monaco-tokenized-source");
		return ut(c) ? (ei(c, this.getFontInfo(r)), s) : A("span");
	}
	getFontInfo(e) {
		return e ? e.getOption(H.fontInfo) : Rr({ fontFamily: this._configurationService.getValue("editor").fontFamily }, 1);
	}
};
za = Ra = v([T(0, Oe), T(1, g)], za), I(), V(), $t(), Ur(), ln(), Ne(), Jt(), x(), zt(), mt(), ar(), ir(), ue(), Tt(), Vt();
var Ba = 0, Va = !1;
function Ha(e) {
	if (!e) {
		if (Va) return;
		Va = !0;
	}
	ze(e || nr.document.body);
}
var Ua = class extends si {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		let m = { ...t };
		m.ariaLabel = m.ariaLabel || Tn.editorViewAccessibleLabel, super(e, m, { isStandaloneEditor: !0 }, n, r, i, a, c, l, u, d, f, s), s instanceof Un ? this._standaloneKeybindingService = s : this._standaloneKeybindingService = null, Ha(m.ariaContainerElement), bt((e, t) => n.createInstance(Gt, e, { instantHover: t }, {})), rr(o), p.setDefaultCodeBlockRenderer(n.createInstance(za));
	}
	addCommand(e, t, n) {
		if (!this._standaloneKeybindingService) return console.warn("Cannot add command because the editor is configured with an unrecognized KeybindingService"), null;
		let r = "DYNAMIC_" + ++Ba, i = W.deserialize(n);
		return this._standaloneKeybindingService.addDynamicKeybinding(r, e, t, i), r;
	}
	createContextKey(e, t) {
		return this._contextKeyService.createKey(e, t);
	}
	addAction(e) {
		if (typeof e.id != "string" || typeof e.label != "string" || typeof e.run != "function") throw Error("Invalid action descriptor, `id`, `label` and `run` are required properties!");
		if (!this._standaloneKeybindingService) return console.warn("Cannot add keybinding because the editor is configured with an unrecognized KeybindingService"), n.None;
		let t = e.id, r = e.label, i = W.and(W.equals("editorId", this.getId()), W.deserialize(e.precondition)), a = e.keybindings, o = W.and(i, W.deserialize(e.keybindingContext)), s = e.contextMenuGroupId || null, c = e.contextMenuOrder || 0, l = (t, ...n) => Promise.resolve(e.run(this, ...n)), u = new bn(), d = this.getId() + ":" + t;
		if (u.add(be.registerCommand(d, l)), s) {
			let e = {
				command: {
					id: d,
					title: r
				},
				when: i,
				group: s,
				order: c
			};
			u.add(y.appendMenuItem(Xe.EditorContext, e));
		}
		if (Array.isArray(a)) for (let e of a) u.add(this._standaloneKeybindingService.addDynamicKeybinding(d, e, l, o));
		let f = new ci(d, r, r, void 0, i, (...t) => Promise.resolve(e.run(this, ...t)), this._contextKeyService);
		return this._actions.set(t, f), u.add(N(() => {
			this._actions.delete(t);
		})), u;
	}
	_triggerCommand(e, t) {
		if (this._codeEditorService instanceof Kn) try {
			this._codeEditorService.setActiveCodeEditor(this), super._triggerCommand(e, t);
		} finally {
			this._codeEditorService.setActiveCodeEditor(null);
		}
		else super._triggerCommand(e, t);
	}
};
Ua = v([
	T(2, w),
	T(3, s),
	T(4, gr),
	T(5, Pn),
	T(6, er),
	T(7, jt),
	T(8, vt),
	T(9, me),
	T(10, an),
	T(11, _t),
	T(12, Wi),
	T(13, l)
], Ua);
var Wa = class extends Ua {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, ee) {
		let g = { ...t };
		qt(u, g, !1);
		let _ = c.registerEditorContainer(e);
		typeof g.theme == "string" && c.setTheme(g.theme), g.autoDetectHighContrast !== void 0 && c.setAutoDetectHighContrast(!!g.autoDetectHighContrast);
		let v = g.model;
		delete g.model, super(e, g, n, r, i, a, o, s, c, l, d, m, h, ee), this._configurationService = u, this._standaloneThemeService = c, this._register(_);
		let y;
		if (v === void 0) {
			let e = p.getLanguageIdByMimeType(g.language) || g.language || "plaintext";
			y = Ka(f, p, g.value || "", e, void 0), this._ownsModel = !0;
		} else y = v, this._ownsModel = !1;
		if (this._attachModel(y), y) {
			let e = {
				oldModelUrl: null,
				newModelUrl: y.uri
			};
			this._onDidChangeModel.fire(e);
		}
	}
	dispose() {
		super.dispose();
	}
	updateOptions(e) {
		qt(this._configurationService, e, !1), typeof e.theme == "string" && this._standaloneThemeService.setTheme(e.theme), e.autoDetectHighContrast !== void 0 && this._standaloneThemeService.setAutoDetectHighContrast(!!e.autoDetectHighContrast), super.updateOptions(e);
	}
	_postDetachModelCleanup(e) {
		super._postDetachModelCleanup(e), e && this._ownsModel && (e.dispose(), this._ownsModel = !1);
	}
};
Wa = v([
	T(2, w),
	T(3, s),
	T(4, gr),
	T(5, Pn),
	T(6, er),
	T(7, jt),
	T(8, te),
	T(9, me),
	T(10, Oe),
	T(11, an),
	T(12, sr),
	T(13, g),
	T(14, _t),
	T(15, Wi),
	T(16, l)
], Wa);
var Ga = class extends Fa {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f) {
		let p = { ...t };
		qt(s, p, !0);
		let m = a.registerEditorContainer(e);
		typeof p.theme == "string" && a.setTheme(p.theme), p.autoDetectHighContrast !== void 0 && a.setAutoDetectHighContrast(!!p.autoDetectHighContrast), super(e, p, { isStandaloneEditor: !0 }, r, n, i, d, l, f), this._configurationService = s, this._standaloneThemeService = a, this._register(m);
	}
	dispose() {
		super.dispose();
	}
	updateOptions(e) {
		qt(this._configurationService, e, !0), typeof e.theme == "string" && this._standaloneThemeService.setTheme(e.theme), e.autoDetectHighContrast !== void 0 && this._standaloneThemeService.setAutoDetectHighContrast(!!e.autoDetectHighContrast), super.updateOptions(e);
	}
	_createInnerEditor(e, t, n) {
		return e.createInstance(Ua, t, n);
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
Ga = v([
	T(2, w),
	T(3, Pn),
	T(4, s),
	T(5, te),
	T(6, me),
	T(7, Oe),
	T(8, Ut),
	T(9, qe),
	T(10, Qt),
	T(11, lr),
	T(12, jt)
], Ga);
function Ka(e, t, n, r, i) {
	if (n ||= "", !r) {
		let r = n.indexOf("\n"), a = n;
		return r !== -1 && (a = n.substring(0, r)), qa(e, n, t.createByFilepathOrFirstLine(i || null, a), i);
	}
	return qa(e, n, t.createById(r), i);
}
function qa(e, t, n, r) {
	return e.createModel(t, n, r);
}
I(), Sr(), u(), it(), V(), Ke(), ir(), Cr(), ct(), _e(), Be();
var Ja, Ya = "workbench.view.explorer";
new p("explorerViewletVisible", !0, {
	type: "boolean",
	description: i(8259, "True when the EXPLORER viewlet is visible.")
});
var Xa = new p("foldersViewVisible", !0, {
	type: "boolean",
	description: i(8260, "True when the FOLDERS view (the file tree within the explorer view container) is visible.")
});
new p("explorerResourceIsFolder", !1, {
	type: "boolean",
	description: i(8261, "True when the focused item in the EXPLORER is a folder.")
}), new p("explorerResourceReadonly", !1, {
	type: "boolean",
	description: i(8262, "True when the focused item in the EXPLORER is read-only.")
}).toNegated(), new p("explorerResourceParentReadonly", !1, {
	type: "boolean",
	description: i(8263, "True when the focused item in the EXPLORER's parent is read-only.")
}), new p("explorerResourceAvailableEditorIds", ""), new p("explorerResourceIsRoot", !1, {
	type: "boolean",
	description: i(8264, "True when the focused item in the EXPLORER is a root folder.")
}), new p("explorerResourceCut", !1, {
	type: "boolean",
	description: i(8265, "True when an item in the EXPLORER has been cut for cut and paste.")
}), new p("explorerResourceMoveableToTrash", !1, {
	type: "boolean",
	description: i(8266, "True when the focused item in the EXPLORER can be moved to trash.")
});
var Za = new p("filesExplorerFocus", !0, {
	type: "boolean",
	description: i(8267, "True when the focus is inside the EXPLORER view.")
});
new p("openEditorsFocus", !0, {
	type: "boolean",
	description: i(8268, "True when the focus is inside the OPEN EDITORS view.")
});
var Qa = new p("explorerViewletFocus", !0, {
	type: "boolean",
	description: i(8269, "True when the focus is inside the EXPLORER viewlet.")
});
new p("explorerFindProviderActive", !1, {
	type: "boolean",
	description: i(8270, "True when the explorer tree is using the explorer find provider.")
}), new p("explorerViewletCompressedFocus", !0, {
	type: "boolean",
	description: i(8271, "True when the focused item in the EXPLORER view is a compact item.")
}), new p("explorerViewletCompressedFirstFocus", !0, {
	type: "boolean",
	description: i(8272, "True when the focus is inside a compact item's first part in the EXPLORER view.")
}), new p("explorerViewletCompressedLastFocus", !0, {
	type: "boolean",
	description: i(8273, "True when the focus is inside a compact item's last part in the EXPLORER view.")
}), new p("viewHasSomeCollapsibleItem", !1, {
	type: "boolean",
	description: i(8274, "True when a workspace in the EXPLORER view has some collapsible root child.")
}), W.and(Xa, Za, W.not(Fe)), W.and(Xa, Qa, W.not(Fe));
var $a = "workbench.editors.files.textFileEditor", eo = "workbench.editors.files.fileEditorInput", to = "workbench.editors.files.binaryFileEditor", no = "code-text-binary", ro;
(function(e) {
	e.Default = "default", e.Mixed = "mixed", e.FilesFirst = "filesFirst", e.Type = "type", e.Modified = "modified", e.FoldersNestsFiles = "foldersNestsFiles";
})(ro ||= {});
var io;
(function(e) {
	e.Verbose = "verbose", e.Default = "default", e.Light = "light";
})(io ||= {});
var ao;
(function(e) {
	e.Default = "default", e.Upper = "upper", e.Lower = "lower", e.Unicode = "unicode";
})(ao ||= {});
var oo = Ja = class extends n {
	constructor(e, t, n, r) {
		super(), this.textFileService = e, this.fileService = t, this.languageService = n, this.modelService = r, this.fileWatcherDisposable = this._register(new Xt());
	}
	static async open(e, t, n, r, i) {
		await r.openEditor({
			original: { resource: Ja.resourceToTextFile(t, e) },
			modified: { resource: e },
			label: n,
			options: i
		});
	}
	static resourceToTextFile(e, t) {
		return t.with({
			scheme: e,
			query: JSON.stringify({
				scheme: t.scheme,
				query: t.query
			})
		});
	}
	static textFileToResource(e) {
		let { scheme: t, query: n } = JSON.parse(e.query);
		return e.with({
			scheme: t,
			query: n
		});
	}
	async provideTextContent(e) {
		if (!e.query) return null;
		let t = Ja.textFileToResource(e), n = await this.resolveEditorModel(e);
		if (!this.fileWatcherDisposable.value) {
			let r = new bn();
			this.fileWatcherDisposable.value = r, r.add(this.fileService.onDidFilesChange((n) => {
				n.contains(t, Hn.UPDATED) && this.resolveEditorModel(e, !1);
			})), n && r.add(tt.once(n.onWillDispose)(() => this.fileWatcherDisposable.clear()));
		}
		return n;
	}
	async resolveEditorModel(e, t = !0) {
		let n = Ja.textFileToResource(e), r = await this.textFileService.readStream(n), i = this.modelService.getModel(e);
		if (i) this.modelService.updateModel(i, r.value);
		else if (t) {
			let t = this.modelService.getModel(n), a;
			a = t ? this.languageService.createById(t.getLanguageId()) : this.languageService.createByFilepathOrFirstLine(n), i = this.modelService.createModel(r.value, a, e);
		}
		return i;
	}
};
oo = Ja = v([
	T(0, kr),
	T(1, un),
	T(2, g),
	T(3, sr)
], oo);
var so = class e {
	static {
		this.COUNTER = 0;
	}
	constructor(t, n) {
		this._editor = t, this._group = n, this.id = e.COUNTER++;
	}
	get editor() {
		return this._editor;
	}
	get group() {
		return this._group;
	}
	get groupId() {
		return this._group.id;
	}
	getId() {
		return `openeditor:${this.groupId}:${this.id}`;
	}
	isPreview() {
		return !this._group.isPinned(this.editor);
	}
	isSticky() {
		return this._group.isSticky(this.editor);
	}
	getResource() {
		return wr.getOriginalUri(this.editor, { supportSideBySide: Dr.PRIMARY });
	}
};
Be(), it();
var co = "workbench.action.files.revert", lo = "workbench.action.files.saveAs", uo = Mt(8071, "Save As..."), fo = "workbench.action.files.save";
Mt(8072, "Save");
var po = "workbench.action.files.saveWithoutFormatting";
Mt(8073, "Save without Formatting");
var mo = "saveAll";
Mt(8074, "Save All");
var ho = "workbench.files.action.saveAllInGroup", go = "workbench.action.files.saveFiles";
new p("groupFocusedInOpenEditors", !1), new p("dirtyEditorFocusedInOpenEditors", !1), new p("readonlyEditorFocusedInOpenEditors", !1), new p("openEditorsSelectedFileOrUntitled", !0), new p("resourceSelectedForCompare", !1), i(8075, "Remove Folder from Workspace"), Mt(8076, "New Untitled Text File");
//#endregion
export { Ca as C, Xi as D, Yi as E, Ki as O, Fa as S, Qi as T, Ua as _, lo as a, Ka as b, po as c, eo as d, so as f, Ya as g, oo as h, go as i, Ji as k, to as l, $a as m, mo as n, uo as o, ro as p, ho as r, fo as s, co as t, no as u, Ga as v, Zi as w, za as x, Wa as y };
