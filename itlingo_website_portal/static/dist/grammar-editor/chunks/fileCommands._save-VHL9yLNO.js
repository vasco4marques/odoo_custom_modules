import { r as e } from "./rolldown-runtime-B1bRi_D7.js";
import { $A as t, $f as n, $j as r, $k as i, AA as a, Ab as o, Ay as s, BA as c, BD as l, CD as u, CM as d, Cj as ee, Cy as te, DN as f, Dy as ne, Ey as p, FA as m, Fc as re, Gj as ie, Gx as ae, HE as oe, Hb as se, Ia as ce, Ic as le, Ix as ue, Jb as de, Jj as h, Jt as fe, Ju as pe, KA as g, Kx as me, LE as he, La as ge, Lb as _e, Lc as ve, MA as _, MT as ye, Md as be, Mt as xe, NO as Se, Nb as Ce, Nd as we, Nj as Te, OE as Ee, ON as v, Oy as De, Pb as Oe, Pc as ke, QE as y, Qb as Ae, Qk as je, RO as Me, Rc as Ne, SD as Pe, Sy as Fe, Tb as Ie, UA as Le, UE as Re, US as ze, Ua as Be, Ud as Ve, VA as b, VC as He, Vb as Ue, WS as We, Wa as Ge, XE as x, Xb as Ke, Xx as qe, Yj as Je, Yu as Ye, Yx as Xe, ZD as Ze, Zj as Qe, _C as $e, _O as et, _k as S, ad as tt, bS as nt, bj as C, cc as rt, cj as w, cx as it, dD as at, dE as ot, eD as st, en as ct, ep as lt, fc as ut, gD as T, gM as dt, gN as ft, gb as pt, hD as E, hN as mt, hj as ht, hk as D, hu as gt, hx as _t, iC as vt, ij as yt, jA as bt, jT as xt, jt as St, kN as O, ko as Ct, ky as k, lM as A, lO as wt, lc as Tt, lo as Et, mN as Dt, mO as Ot, mk as kt, ni as At, nj as j, nn as jt, oD as Mt, od as Nt, pu as Pt, qb as Ft, rn as M, rp as It, sc as Lt, sn as Rt, sx as zt, tD as Bt, ti as Vt, tn as Ht, tp as Ut, uD as N, uc as Wt, uj as P, uo as Gt, ux as Kt, vS as qt, vb as Jt, wD as Yt, wy as Xt, xk as Zt, zC as Qt, zd as $t } from "./standaloneServices-DUdtGggg.js";
import { c as en, l as tn, o as nn, s as rn } from "./editorBrowser-zJfFG23V.js";
import { $t as F, At as an, B as on, Bt as sn, Et as I, F as cn, G as ln, Gt as L, H as un, Ht as R, I as dn, L as fn, Lt as pn, N as z, Ot as mn, P as B, Pt as hn, Qt as gn, R as _n, Rt as V, S as vn, U as yn, Ut as bn, V as xn, Vt as Sn, Wt as Cn, Yt as wn, _t as Tn, a as En, b as Dn, bt as H, cn as On, d as kn, dt as An, en as jn, f as Mn, fn as Nn, ft as Pn, g as Fn, gt as In, hn as Ln, ht as Rn, i as zn, in as Bn, jt as Vn, kt as Hn, l as Un, ln as Wn, m as U, n as Gn, nn as W, o as Kn, p as G, pt as K, qt as q, rn as qn, sn as Jn, tn as Yn, u as Xn, un as Zn, vt as Qn, x as $n, xt as J, yt as er, z as tr } from "./textfiles-GCUcfhe8.js";
import { Ct as nr, Ga as rr, Ha as ir, Ka as ar, La as or, Wa as sr, Xa as cr, _o as lr, a as ur, c as dr, co as fr, go as pr, hn as mr, ho as hr, i as gr, l as _r, lo as vr, o as yr, qa as br, r as xr, s as Sr, t as Cr, uo as wr, vo as Tr, wt as Er } from "./embeddedCodeEditorWidget-DPX_ivX-.js";
import { _ as Dr, a as Or, c as kr, g as Ar, i as jr, n as Mr, r as Nr, s as Pr, t as Fr } from "./fileConstants-3FE16HF_.js";
import { a as Ir, i as Lr, o as Rr, r as zr, t as Br } from "./files-Cnl248xB.js";
Dt(), d(), r(), ee(), g(), m(), je(), Se(), Ze(), u(), T(), at(), me(), ue(), Ke(), Ft(), se(), o(), er(), Tn(), Rn(), ln(), Ve(), O(), F(), wr(), on(), De(), J(), s(), x(), _n(), dn(), un(), te(), P(), p(), pr();
var Vr, Hr = class extends fr {
	static {
		Vr = this;
	}
	static {
		this.ID = "workbench.editors.untitledEditorInput";
	}
	get typeId() {
		return Vr.ID;
	}
	get editorId() {
		return hn.id;
	}
	constructor(e, t, n, r, i, a, o, s, c, l, u) {
		super(e.resource, void 0, r, t, n, i, s, l, u), this.model = e, this.environmentService = a, this.pathService = o, this.textModelService = c, this.modelResolve = void 0, this.modelDisposables = this._register(new j()), this.cachedUntitledTextEditorModelReference = void 0, this.registerModelListeners(e), this._register(this.textFileService.untitled.onDidCreate((e) => this.onDidCreateUntitledModel(e)));
	}
	registerModelListeners(e) {
		this.modelDisposables.clear(), this.modelDisposables.add(e.onDidChangeDirty(() => this._onDidChangeDirty.fire())), this.modelDisposables.add(e.onDidChangeName(() => this._onDidChangeLabel.fire())), this.modelDisposables.add(e.onDidRevert(() => this.dispose()));
	}
	onDidCreateUntitledModel(e) {
		y(e.resource, this.model.resource) && e !== this.model && (this.model = e, this.registerModelListeners(e));
	}
	getName() {
		return this.model.name;
	}
	getDescription(e = wn.MEDIUM) {
		if (!this.model.hasAssociatedFilePath) {
			let e = this.resource.path;
			return e === this.getName() ? void 0 : e;
		}
		return super.getDescription(e);
	}
	getTitle(e) {
		if (!this.model.hasAssociatedFilePath) {
			let e = this.getName(), t = this.getDescription();
			return t && t !== e ? `${e} • ${t}` : e;
		}
		return super.getTitle(e);
	}
	isDirty() {
		return this.model.isDirty();
	}
	getEncoding() {
		return this.model.getEncoding();
	}
	setEncoding(e, t) {
		return this.model.setEncoding(e);
	}
	get hasLanguageSetExplicitly() {
		return this.model.hasLanguageSetExplicitly;
	}
	get hasAssociatedFilePath() {
		return this.model.hasAssociatedFilePath;
	}
	setLanguageId(e, t) {
		this.model.setLanguageId(e, t);
	}
	getLanguageId() {
		return this.model.getLanguageId();
	}
	async resolve() {
		return this.modelResolve ||= (async () => {
			this.cachedUntitledTextEditorModelReference = await this.textModelService.createModelReference(this.resource);
		})(), await this.modelResolve, this.isDisposed() && this.disposeModelReference(), this.model;
	}
	toUntyped(e) {
		let t = {
			resource: this.model.hasAssociatedFilePath ? Mt(this.model.resource, this.environmentService.remoteAuthority, this.pathService.defaultUriScheme) : this.resource,
			forceUntitled: !0,
			options: { override: this.editorId }
		};
		return typeof e?.preserveViewState == "number" && (t.encoding = this.getEncoding(), t.languageId = this.getLanguageId(), t.contents = this.model.isModified() ? this.model.textEditorModel?.getValue() : void 0, t.options.viewState = gn(this, e.preserveViewState, this.editorService), typeof t.contents == "string" && !this.model.hasAssociatedFilePath && !e.preserveResource && (t.resource = void 0)), t;
	}
	matches(e) {
		return this === e ? !0 : e instanceof Vr ? y(e.resource, this.resource) : Ln(e) ? super.matches(e) : !1;
	}
	dispose() {
		this.modelResolve = void 0, this.disposeModelReference(), super.dispose();
	}
	disposeModelReference() {
		w(this.cachedUntitledTextEditorModelReference), this.cachedUntitledTextEditorModelReference = void 0;
	}
};
Hr = Vr = f([
	v(1, tr),
	v(2, ne),
	v(3, H),
	v(4, k),
	v(5, fn),
	v(6, cn),
	v(7, xn),
	v(8, Fe),
	v(9, Xt),
	v(10, hr)
], Hr), O(), F(), wr(), x(), we(), s(), cr(), rr(), P(), _e();
var Y, Ur = class extends Error {
	constructor(e, t) {
		super(e), this.name = "FileEditorInputLeakError", this.stack = t;
	}
}, Wr = class extends t {
	static {
		Y = this;
	}
	constructor(e, t, n, r, i) {
		super(), this.untitledTextEditorService = e, this.instantiationService = t, this.uriIdentityService = n, this.fileService = r, this.editorResolverService = i, this.editorInputCache = new h(), this.fileEditorFactory = ae.as(pn.EditorFactory).getFileEditorFactory(), this.mapLeakToCounter = /* @__PURE__ */ new Map(), this.registerDefaultEditor();
	}
	registerDefaultEditor() {
		this._register(this.editorResolverService.registerEditor("*", {
			id: hn.id,
			label: hn.displayName,
			detail: hn.providerDisplayName,
			priority: ar.builtin
		}, {}, {
			createEditorInput: (e) => ({ editor: this.createTextEditor(e) }),
			createUntitledEditorInput: (e) => ({ editor: this.createTextEditor(e) }),
			createDiffEditorInput: (e) => ({ editor: this.createTextEditor(e) })
		}));
	}
	async resolveTextEditor(e) {
		return this.createTextEditor(e);
	}
	createTextEditor(e) {
		if (Zn(e)) return this.createTextEditor(e.result);
		if (On(e)) {
			let t = this.createTextEditor(e.original), n = this.createTextEditor(e.modified);
			return this.instantiationService.createInstance(yn, e.label, e.description, t, n, void 0);
		}
		if (Nn(e)) {
			let t = this.createTextEditor(e.primary), n = this.createTextEditor(e.secondary);
			return this.instantiationService.createInstance(K, e.label, e.description, n, t);
		}
		let t = e;
		if (t.forceUntitled || !t.resource || t.resource.scheme === N.untitled) {
			let e = {
				languageId: t.languageId,
				initialValue: t.contents,
				encoding: t.encoding
			}, n;
			return n = t.resource?.scheme === N.untitled ? this.untitledTextEditorService.create({
				untitledResource: t.resource,
				...e
			}) : this.untitledTextEditorService.create({
				associatedResource: t.resource,
				...e
			}), this.createOrGetCached(n.resource, () => this.instantiationService.createInstance(Hr, n));
		}
		let n = e;
		if (n.resource instanceof E) {
			let e = n.label || oe(n.resource), t = n.resource, r = this.uriIdentityService.asCanonicalUri(t);
			return this.createOrGetCached(r, () => n.forceFile || this.fileService.hasProvider(r) ? this.fileEditorFactory.createFileEditor(r, t, n.label, n.description, n.encoding, n.languageId, n.contents, this.instantiationService) : this.instantiationService.createInstance(vr, r, n.label, n.description, n.languageId, n.contents), (r) => {
				r instanceof Hr || (r instanceof vr ? (e && r.setName(e), n.description && r.setDescription(n.description), n.languageId && r.setPreferredLanguageId(n.languageId), typeof n.contents == "string" && r.setPreferredContents(n.contents)) : (r.setPreferredResource(t), n.label && r.setPreferredName(n.label), n.description && r.setPreferredDescription(n.description), n.encoding && r.setPreferredEncoding(n.encoding), n.languageId && r.setPreferredLanguageId(n.languageId), typeof n.contents == "string" && r.setPreferredContents(n.contents)));
			});
		}
		throw Error(`ITextEditorService: Unable to create texteditor from ${JSON.stringify(e)}`);
	}
	createOrGetCached(e, t, n) {
		let r = this.editorInputCache.get(e);
		if (r) return n?.(r), r;
		r = t(), this.editorInputCache.set(e, r);
		let i = this.trackLeaks(r);
		return b.once(r.onWillDispose)(() => {
			this.editorInputCache.delete(e), i && this.untrackLeaks(i);
		}), r;
	}
	static {
		this.LEAK_TRACKING_THRESHOLD = 256;
	}
	static {
		this.LEAK_REPORTING_THRESHOLD = 2 * this.LEAK_TRACKING_THRESHOLD;
	}
	static {
		this.LEAK_REPORTED = !1;
	}
	trackLeaks(e) {
		if (Y.LEAK_REPORTED || this.editorInputCache.size < Y.LEAK_TRACKING_THRESHOLD) return;
		let t = `${e.resource.scheme}#${e.typeId || "<no typeId>"}#${e.editorId || "<no editorId>"}\n${(/* @__PURE__ */ Error()).stack?.split("\n").slice(2).join("\n") ?? ""}`, n = (this.mapLeakToCounter.get(t) ?? 0) + 1;
		if (this.mapLeakToCounter.set(t, n), this.editorInputCache.size > Y.LEAK_REPORTING_THRESHOLD) {
			Y.LEAK_REPORTED = !0;
			let [e, t] = Array.from(this.mapLeakToCounter.entries()).reduce(([e, t], [n, r]) => r > t ? [n, r] : [e, t]);
			ft(new Ur(`Potential text editor input LEAK detected, having ${this.editorInputCache.size} text editor inputs already. Most frequent owner (${t})`, e));
		}
		return t;
	}
	untrackLeaks(e) {
		let t = (this.mapLeakToCounter.get(e) ?? 1) - 1;
		this.mapLeakToCounter.set(e, t), t === 0 && this.mapLeakToCounter.delete(e);
	}
};
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/browser/parts/editor/media/sidebysideeditor.css
Wr = Y = f([
	v(0, Qn),
	v(1, _),
	v(2, be),
	v(3, k),
	v(4, sr)
], Wr), Pt();
var Gr = /* @__PURE__ */ e({});
Zt(), Ee(), ye(), Qt(), Oe(), ir(), Be(), Rt(), jt(), mr(), O(), g(), F(), _r(), rt(), m(), lt(), qe(), p(), B(), J(), P();
var Kr = class extends dr {
	constructor(e, t, n, r, i, a, o, s, c, l) {
		super(e, t, r, s, a), this.instantiationService = i, this.textResourceConfigurationService = o, this.editorService = c, this.editorGroupService = l, this.groupListener = this._register(new yt()), this.viewState = this.getEditorMemento(l, o, n, 100);
	}
	setEditorVisible(e) {
		this.groupListener.value = this.group.onWillCloseEditor((e) => this.onWillCloseEditor(e)), super.setEditorVisible(e);
	}
	onWillCloseEditor(e) {
		let t = e.editor;
		t === this.input && this.updateEditorViewState(t);
	}
	clearInput() {
		this.updateEditorViewState(this.input), super.clearInput();
	}
	saveState() {
		this.updateEditorViewState(this.input), super.saveState();
	}
	updateEditorViewState(e) {
		if (!e || !this.tracksEditorViewState(e)) return;
		let t = this.toEditorViewStateResource(e);
		t && (this.tracksDisposedEditorViewState() || (this.editorViewStateDisposables ||= /* @__PURE__ */ new Map(), this.editorViewStateDisposables.has(e) || this.editorViewStateDisposables.set(e, b.once(e.onWillDispose)(() => {
			this.clearEditorViewState(t, this.group), this.editorViewStateDisposables?.delete(e);
		}))), e.isDisposed() && !this.tracksDisposedEditorViewState() || !this.shouldRestoreEditorViewState(e) && !this.group.contains(e) ? this.clearEditorViewState(t, this.group) : e.isDisposed() || this.saveEditorViewState(t));
	}
	shouldRestoreEditorViewState(e, t) {
		return !t?.newInGroup || this.textResourceConfigurationService.getValue(Sn.getOriginalUri(e, { supportSideBySide: q.PRIMARY }), "workbench.editor.restoreViewState") !== !1;
	}
	getViewState() {
		let e = this.input;
		if (!e || !this.tracksEditorViewState(e)) return;
		let t = this.toEditorViewStateResource(e);
		if (t) return this.computeEditorViewState(t);
	}
	saveEditorViewState(e) {
		let t = this.computeEditorViewState(e);
		t && this.viewState.saveEditorState(this.group, e, t);
	}
	loadEditorViewState(e, t) {
		if (!e || !this.tracksEditorViewState(e) || !this.shouldRestoreEditorViewState(e, t)) return;
		let n = this.toEditorViewStateResource(e);
		if (n) return this.viewState.loadEditorState(this.group, n);
	}
	moveEditorViewState(e, t, n) {
		return this.viewState.moveEditorState(e, t, n);
	}
	clearEditorViewState(e, t) {
		this.viewState.clearEditorState(e, t);
	}
	dispose() {
		if (super.dispose(), this.editorViewStateDisposables) {
			for (let [, e] of this.editorViewStateDisposables) e.dispose();
			this.editorViewStateDisposables = void 0;
		}
	}
	tracksDisposedEditorViewState() {
		return !1;
	}
};
Kr = f([
	v(3, n),
	v(4, _),
	v(5, Lt),
	v(6, Xt),
	v(7, Xe),
	v(8, H),
	v(9, z)
], Kr), O(), me(), F(), Rn(), lt(), m(), qe(), B(), g(), rt(), P(), p(), J(), x(), T();
var X;
gt(Gr);
function qr(e) {
	let t = e;
	return typeof t?.primary == "object" && typeof t.secondary == "object";
}
var Jr = class extends Kr {
	static {
		X = this;
	}
	static {
		this.ID = Cn;
	}
	static {
		this.SIDE_BY_SIDE_LAYOUT_SETTING = "workbench.editor.splitInGroupLayout";
	}
	static {
		this.VIEW_STATE_PREFERENCE_KEY = "sideBySideEditorViewState";
	}
	get minimumPrimaryWidth() {
		return this.primaryEditorPane ? this.primaryEditorPane.minimumWidth : 0;
	}
	get maximumPrimaryWidth() {
		return this.primaryEditorPane ? this.primaryEditorPane.maximumWidth : Infinity;
	}
	get minimumPrimaryHeight() {
		return this.primaryEditorPane ? this.primaryEditorPane.minimumHeight : 0;
	}
	get maximumPrimaryHeight() {
		return this.primaryEditorPane ? this.primaryEditorPane.maximumHeight : Infinity;
	}
	get minimumSecondaryWidth() {
		return this.secondaryEditorPane ? this.secondaryEditorPane.minimumWidth : 0;
	}
	get maximumSecondaryWidth() {
		return this.secondaryEditorPane ? this.secondaryEditorPane.maximumWidth : Infinity;
	}
	get minimumSecondaryHeight() {
		return this.secondaryEditorPane ? this.secondaryEditorPane.minimumHeight : 0;
	}
	get maximumSecondaryHeight() {
		return this.secondaryEditorPane ? this.secondaryEditorPane.maximumHeight : Infinity;
	}
	set minimumWidth(e) {}
	set maximumWidth(e) {}
	set minimumHeight(e) {}
	set maximumHeight(e) {}
	get minimumWidth() {
		return this.minimumPrimaryWidth + this.minimumSecondaryWidth;
	}
	get maximumWidth() {
		return this.maximumPrimaryWidth + this.maximumSecondaryWidth;
	}
	get minimumHeight() {
		return this.minimumPrimaryHeight + this.minimumSecondaryHeight;
	}
	get maximumHeight() {
		return this.maximumPrimaryHeight + this.maximumSecondaryHeight;
	}
	constructor(e, t, n, r, i, a, o, s, l) {
		super(X.ID, e, X.VIEW_STATE_PREFERENCE_KEY, t, n, i, o, r, s, l), this.configurationService = a, this.onDidCreateEditors = this._register(new c()), this._onDidChangeSizeConstraints = this._register(new Le()), this.onDidChangeSizeConstraints = b.any(this.onDidCreateEditors.event, this._onDidChangeSizeConstraints.event), this._onDidChangeSelection = this._register(new c()), this.onDidChangeSelection = this._onDidChangeSelection.event, this.primaryEditorPane = void 0, this.secondaryEditorPane = void 0, this.splitviewDisposables = this._register(new j()), this.editorDisposables = this._register(new j()), this.dimension = new We(0, 0), this.lastFocusedSide = void 0, this.orientation = this.configurationService.getValue(X.SIDE_BY_SIDE_LAYOUT_SETTING) === "vertical" ? M.VERTICAL : M.HORIZONTAL, this.registerListeners();
	}
	registerListeners() {
		this._register(this.configurationService.onDidChangeConfiguration((e) => this.onConfigurationUpdated(e)));
	}
	onConfigurationUpdated(e) {
		e.affectsConfiguration(X.SIDE_BY_SIDE_LAYOUT_SETTING) && (this.orientation = this.configurationService.getValue(X.SIDE_BY_SIDE_LAYOUT_SETTING) === "vertical" ? M.VERTICAL : M.HORIZONTAL, this.splitview && this.recreateSplitview());
	}
	recreateSplitview() {
		let e = C(this.getContainer()), t = this.getSplitViewRatio();
		this.splitview && (this.splitview.el.remove(), this.splitviewDisposables.clear()), this.createSplitView(e, t), this.layout(this.dimension);
	}
	getSplitViewRatio() {
		let e;
		if (this.splitview) {
			let t = this.splitview.getViewSize(0), n = this.splitview.getViewSize(1);
			Math.abs(t - n) > 1 && (e = t / (this.splitview.orientation === M.HORIZONTAL ? this.dimension.width : this.dimension.height));
		}
		return e;
	}
	createEditor(e) {
		e.classList.add("side-by-side-editor"), this.secondaryEditorContainer = ze(".side-by-side-editor-container.editor-instance"), this.primaryEditorContainer = ze(".side-by-side-editor-container.editor-instance"), this.createSplitView(e);
	}
	createSplitView(e, t) {
		this.splitview = this.splitviewDisposables.add(new Ht(e, { orientation: this.orientation })), this.splitviewDisposables.add(this.splitview.onDidSashReset(() => this.splitview?.distributeViewSizes())), this.orientation === M.HORIZONTAL ? this.splitview.orthogonalEndSash = this._boundarySashes?.bottom : (this.splitview.orthogonalStartSash = this._boundarySashes?.left, this.splitview.orthogonalEndSash = this._boundarySashes?.right);
		let n = ct.Distribute, r = ct.Distribute;
		if (t) {
			let e = this.splitview.orientation === M.HORIZONTAL ? this.dimension.width : this.dimension.height;
			n = Math.round(e * t), r = e - n, this.splitview.layout(this.orientation === M.HORIZONTAL ? this.dimension.width : this.dimension.height);
		}
		let i = C(this.secondaryEditorContainer);
		this.splitview.addView({
			element: i,
			layout: (e) => this.layoutPane(this.secondaryEditorPane, e),
			minimumSize: this.orientation === M.HORIZONTAL ? or.width : or.height,
			maximumSize: Infinity,
			onDidChange: b.None
		}, n);
		let a = C(this.primaryEditorContainer);
		this.splitview.addView({
			element: a,
			layout: (e) => this.layoutPane(this.primaryEditorPane, e),
			minimumSize: this.orientation === M.HORIZONTAL ? or.width : or.height,
			maximumSize: Infinity,
			onDidChange: b.None
		}, r), this.updateStyles();
	}
	getTitle() {
		return this.input ? this.input.getName() : i(3507, "Side by Side Editor");
	}
	async setInput(e, t, n, r) {
		let i = this.input;
		await super.setInput(e, t, n, r), (!i || !e.matches(i)) && (i && this.disposeEditors(), this.createEditors(e));
		let { primary: a, secondary: o, viewState: s } = this.loadViewState(e, t, n);
		if (this.lastFocusedSide = s?.focus, typeof s?.ratio == "number" && this.splitview) {
			let e = this.splitview.orientation === M.HORIZONTAL ? this.dimension.width : this.dimension.height;
			this.splitview.resizeView(0, Math.round(e * s.ratio));
		} else this.splitview?.distributeViewSizes();
		await Promise.all([this.secondaryEditorPane?.setInput(e.secondary, o, n, r), this.primaryEditorPane?.setInput(e.primary, a, n, r)]), typeof t?.target == "number" && (this.lastFocusedSide = t.target);
	}
	loadViewState(e, t, n) {
		let r = qr(t?.viewState) ? t?.viewState : this.loadEditorViewState(e, n), i = Object.create(null), a;
		return t?.target === q.SECONDARY ? a = { ...t } : i = { ...t }, i.viewState = r?.primary, r?.secondary && (a ? a.viewState = r?.secondary : a = { viewState: r.secondary }), {
			primary: i,
			secondary: a,
			viewState: r
		};
	}
	createEditors(e) {
		this.secondaryEditorPane = this.doCreateEditor(e.secondary, C(this.secondaryEditorContainer)), this.primaryEditorPane = this.doCreateEditor(e.primary, C(this.primaryEditorContainer)), this.layout(this.dimension), this._onDidChangeSizeConstraints.input = b.any(b.map(this.secondaryEditorPane.onDidChangeSizeConstraints, () => void 0), b.map(this.primaryEditorPane.onDidChangeSizeConstraints, () => void 0)), this.onDidCreateEditors.fire(void 0), this.editorDisposables.add(this.primaryEditorPane.onDidFocus(() => this.onDidFocusChange(q.PRIMARY))), this.editorDisposables.add(this.secondaryEditorPane.onDidFocus(() => this.onDidFocusChange(q.SECONDARY)));
	}
	doCreateEditor(e, t) {
		let n = ae.as(pn.EditorPane).getEditorPane(e);
		if (!n) throw Error("No editor pane descriptor for editor found");
		let r = n.instantiate(this.instantiationService, this.group);
		return r.create(t), r.setVisible(this.isVisible()), Jn(r) && this.editorDisposables.add(r.onDidChangeSelection((e) => this._onDidChangeSelection.fire(e))), this.editorDisposables.add(r), r;
	}
	onDidFocusChange(e) {
		this.lastFocusedSide = e, this._onDidChangeControl.fire();
	}
	getSelection() {
		let e = this.getLastFocusedEditorPane();
		if (Jn(e)) {
			let t = e.getSelection();
			if (t) return new Yr(t, e === this.primaryEditorPane ? q.PRIMARY : q.SECONDARY);
		}
	}
	setOptions(e) {
		super.setOptions(e), typeof e?.target == "number" && (this.lastFocusedSide = e.target), this.getLastFocusedEditorPane()?.setOptions(e);
	}
	setEditorVisible(e) {
		this.primaryEditorPane?.setVisible(e), this.secondaryEditorPane?.setVisible(e), super.setEditorVisible(e);
	}
	clearInput() {
		super.clearInput(), this.primaryEditorPane?.clearInput(), this.secondaryEditorPane?.clearInput(), this.disposeEditors();
	}
	focus() {
		super.focus(), this.getLastFocusedEditorPane()?.focus();
	}
	getLastFocusedEditorPane() {
		return this.lastFocusedSide === q.SECONDARY ? this.secondaryEditorPane : this.primaryEditorPane;
	}
	layout(e) {
		this.dimension = e, C(this.splitview).layout(this.orientation === M.HORIZONTAL ? e.width : e.height);
	}
	setBoundarySashes(e) {
		this._boundarySashes = e, this.splitview && (this.splitview.orthogonalEndSash = e.bottom);
	}
	layoutPane(e, t) {
		e?.layout(this.orientation === M.HORIZONTAL ? new We(t, this.dimension.height) : new We(this.dimension.width, t));
	}
	getControl() {
		return this.getLastFocusedEditorPane()?.getControl();
	}
	getPrimaryEditorPane() {
		return this.primaryEditorPane;
	}
	getSecondaryEditorPane() {
		return this.secondaryEditorPane;
	}
	tracksEditorViewState(e) {
		return e instanceof K;
	}
	computeEditorViewState(e) {
		if (!this.input || !y(e, this.toEditorViewStateResource(this.input))) return;
		let t = this.primaryEditorPane?.getViewState(), n = this.secondaryEditorPane?.getViewState();
		if (!(!t || !n)) return {
			primary: t,
			secondary: n,
			focus: this.lastFocusedSide,
			ratio: this.getSplitViewRatio()
		};
	}
	toEditorViewStateResource(e) {
		let t, n;
		if (e instanceof K && (t = e.primary.resource, n = e.secondary.resource), !(!n || !t)) return E.from({
			scheme: "sideBySide",
			path: `${wt(n.toString())}${wt(t.toString())}`
		});
	}
	updateStyles() {
		super.updateStyles(), this.primaryEditorContainer && (this.orientation === M.HORIZONTAL ? (this.primaryEditorContainer.style.borderLeftWidth = "1px", this.primaryEditorContainer.style.borderLeftStyle = "solid", this.primaryEditorContainer.style.borderLeftColor = this.getColor(Er) ?? "", this.primaryEditorContainer.style.borderTopWidth = "0") : (this.primaryEditorContainer.style.borderTopWidth = "1px", this.primaryEditorContainer.style.borderTopStyle = "solid", this.primaryEditorContainer.style.borderTopColor = this.getColor(nr) ?? "", this.primaryEditorContainer.style.borderLeftWidth = "0"));
	}
	dispose() {
		this.disposeEditors(), super.dispose();
	}
	disposeEditors() {
		this.editorDisposables.clear(), this.secondaryEditorPane = void 0, this.primaryEditorPane = void 0, this.lastFocusedSide = void 0, this.secondaryEditorContainer && vt(this.secondaryEditorContainer), this.primaryEditorContainer && vt(this.primaryEditorContainer);
	}
};
Jr = X = f([
	v(1, n),
	v(2, _),
	v(3, Xe),
	v(4, Lt),
	v(5, Ce),
	v(6, Xt),
	v(7, H),
	v(8, z)
], Jr);
var Yr = class e {
	constructor(e, t) {
		this.selection = e, this.side = t;
	}
	compare(t) {
		return !(t instanceof e) || this.side !== t.side ? sn.DIFFERENT : this.selection.compare(t.selection);
	}
	restore(e) {
		let t = {
			...e,
			target: this.side
		};
		return this.selection.restore(t);
	}
};
nn(), lr(), O(), F(), Rn(), P(), ut(), rt(), me(), g(), mn(), B(), r(), nt();
var Xr, Zr = class extends t {
	static {
		Xr = this;
	}
	static {
		this.STORAGE_KEY = "editors.mru";
	}
	get count() {
		return this.mostRecentEditorsMap.size;
	}
	get editors() {
		return [...this.mostRecentEditorsMap.values()];
	}
	hasEditor(e) {
		return this.editorsPerResourceCounter.get(e.resource)?.has(this.toIdentifier(e)) ?? !1;
	}
	hasEditors(e) {
		return this.editorsPerResourceCounter.has(e);
	}
	toIdentifier(e, t) {
		return typeof e == "string" ? t ? `${e}/${t}` : e : this.toIdentifier(e.typeId, e.editorId);
	}
	constructor(e, t, n) {
		super(), this.editorGroupService = t, this.storageService = n, this.keyMap = /* @__PURE__ */ new Map(), this.mostRecentEditorsMap = new ie(), this.editorsPerResourceCounter = new h(), this._onDidMostRecentlyActiveEditorsChange = this._register(new c()), this.onDidMostRecentlyActiveEditorsChange = this._onDidMostRecentlyActiveEditorsChange.event, this.editorGroupsContainer = e ?? t, this.isScoped = !!e, this.registerListeners(), this.loadState();
	}
	registerListeners() {
		this._register(this.editorGroupsContainer.onDidAddGroup((e) => this.onGroupAdded(e))), this._register(this.editorGroupService.onDidChangeEditorPartOptions((e) => this.onDidChangeEditorPartOptions(e))), this._register(this.storageService.onWillSaveState(() => this.saveState()));
	}
	onGroupAdded(e) {
		let t = e.getEditors(R.MOST_RECENTLY_ACTIVE);
		for (let n = t.length - 1; n >= 0; n--) this.addMostRecentEditor(e, t[n], !1, !0);
		this.editorGroupsContainer.activeGroup === e && e.activeEditor && this.addMostRecentEditor(e, e.activeEditor, !0, !1), this.registerGroupListeners(e);
	}
	registerGroupListeners(e) {
		let t = new j();
		t.add(e.onDidModelChange((t) => {
			switch (t.kind) {
				case bn.GROUP_ACTIVE:
					this.editorGroupsContainer.activeGroup === e && e.activeEditor && this.addMostRecentEditor(e, e.activeEditor, !0, !1);
					break;
				case bn.EDITOR_OPEN:
					t.editor && (this.addMostRecentEditor(e, t.editor, !1, !0), this.ensureOpenedEditorsLimit({
						groupId: e.id,
						editor: t.editor
					}, e.id));
					break;
			}
		})), t.add(e.onDidCloseEditor((t) => {
			this.removeMostRecentEditor(e, t.editor);
		})), t.add(e.onDidActiveEditorChange((t) => {
			t.editor && this.addMostRecentEditor(e, t.editor, this.editorGroupsContainer.activeGroup === e, !1);
		})), b.once(e.onWillDispose)(() => w(t));
	}
	onDidChangeEditorPartOptions(e) {
		if (!qt(e.newPartOptions.limit, e.oldPartOptions.limit)) {
			let e = this.editorGroupsContainer.activeGroup, t;
			e.activeEditor && (t = {
				editor: e.activeEditor,
				groupId: e.id
			}), this.ensureOpenedEditorsLimit(t);
		}
	}
	addMostRecentEditor(e, t, n, r) {
		let i = this.ensureKey(e, t), a = this.mostRecentEditorsMap.first;
		n || !a ? this.mostRecentEditorsMap.set(i, i, a ? Qe.AsOld : void 0) : (this.mostRecentEditorsMap.set(i, i, Qe.AsOld), this.mostRecentEditorsMap.set(a, a, Qe.AsOld)), r && this.updateEditorResourcesMap(t, !0), this._onDidMostRecentlyActiveEditorsChange.fire();
	}
	updateEditorResourcesMap(e, t) {
		let n, r, i;
		if (e instanceof K ? (n = e.primary.resource, r = e.primary.typeId, i = e.primary.editorId) : (n = e.resource, r = e.typeId, i = e.editorId), !n) return;
		let a = this.toIdentifier(r, i);
		if (t) {
			let e = this.editorsPerResourceCounter.get(n);
			e || (e = /* @__PURE__ */ new Map(), this.editorsPerResourceCounter.set(n, e)), e.set(a, (e.get(a) ?? 0) + 1);
		} else {
			let e = this.editorsPerResourceCounter.get(n);
			if (e) {
				let t = e.get(a) ?? 0;
				t > 1 ? e.set(a, t - 1) : (e.delete(a), e.size === 0 && this.editorsPerResourceCounter.delete(n));
			}
		}
	}
	removeMostRecentEditor(e, t) {
		this.updateEditorResourcesMap(t, !1);
		let n = this.findKey(e, t);
		if (n) {
			this.mostRecentEditorsMap.delete(n);
			let t = this.keyMap.get(e.id);
			t?.delete(n.editor) && t.size === 0 && this.keyMap.delete(e.id), this._onDidMostRecentlyActiveEditorsChange.fire();
		}
	}
	findKey(e, t) {
		let n = this.keyMap.get(e.id);
		if (n) return n.get(t);
	}
	ensureKey(e, t) {
		let n = this.keyMap.get(e.id);
		n || (n = /* @__PURE__ */ new Map(), this.keyMap.set(e.id, n));
		let r = n.get(t);
		return r || (r = {
			groupId: e.id,
			editor: t
		}, n.set(t, r)), r;
	}
	async ensureOpenedEditorsLimit(e, t) {
		if (!this.editorGroupService.partOptions.limit?.enabled || typeof this.editorGroupService.partOptions.limit.value != "number" || this.editorGroupService.partOptions.limit.value <= 0) return;
		let n = this.editorGroupService.partOptions.limit.value;
		if (this.editorGroupService.partOptions.limit?.perEditorGroup) if (typeof t == "number") {
			let r = this.editorGroupsContainer.getGroup(t);
			r && await this.doEnsureOpenedEditorsLimit(n, r.getEditors(R.MOST_RECENTLY_ACTIVE).map((e) => ({
				editor: e,
				groupId: t
			})), e);
		} else for (let t of this.editorGroupsContainer.groups) await this.ensureOpenedEditorsLimit(e, t.id);
		else await this.doEnsureOpenedEditorsLimit(n, [...this.mostRecentEditorsMap.values()], e);
	}
	async doEnsureOpenedEditorsLimit(e, t, n) {
		let r;
		if (r = this.editorGroupService.partOptions.limit?.excludeDirty ? t.filter(({ editor: e }) => !(e.isDirty() && !e.isSaving() || e.hasCapability(V.Scratchpad))) : t, e >= r.length) return;
		let i = r.reverse().filter(({ editor: e, groupId: t }) => !(e.isDirty() && !e.isSaving() || e.hasCapability(V.Scratchpad) || n && e === n.editor && t === n.groupId || this.editorGroupsContainer.getGroup(t)?.isSticky(e))), a = r.length - e, o = /* @__PURE__ */ new Map();
		for (let { groupId: e, editor: t } of i) {
			let n = o.get(e);
			if (n || (n = [], o.set(e, n)), n.push(t), a--, a === 0) break;
		}
		for (let [e, t] of o) {
			let n = this.editorGroupsContainer.getGroup(e);
			n && await n.closeEditors(t, { preserveFocus: !0 });
		}
	}
	saveState() {
		this.isScoped || (this.mostRecentEditorsMap.isEmpty() ? this.storageService.remove(Xr.STORAGE_KEY, Tt.WORKSPACE) : this.storageService.store(Xr.STORAGE_KEY, JSON.stringify(this.serialize()), Tt.WORKSPACE, Wt.MACHINE));
	}
	serialize() {
		let e = ae.as(pn.EditorFactory), t = [...this.mostRecentEditorsMap.values()], n = /* @__PURE__ */ new Map();
		return { entries: A(t.map(({ editor: t, groupId: r }) => {
			let i = this.editorGroupsContainer.getGroup(r);
			if (!i) return;
			let a = n.get(i);
			a || (a = i.getEditors(R.SEQUENTIAL).filter((t) => e.getEditorSerializer(t)?.canSerialize(t)), n.set(i, a));
			let o = a.indexOf(t);
			if (o !== -1) return {
				groupId: r,
				index: o
			};
		})) };
	}
	async loadState() {
		(this.editorGroupsContainer === this.editorGroupService.mainPart || this.editorGroupsContainer === this.editorGroupService) && await this.editorGroupService.whenReady;
		let e = !1;
		if (!this.isScoped) {
			let t = this.storageService.get(Xr.STORAGE_KEY, Tt.WORKSPACE);
			t && (e = !0, this.deserialize(JSON.parse(t)));
		}
		if (!e) {
			let e = this.editorGroupsContainer.getGroups(I.MOST_RECENTLY_ACTIVE);
			for (let t = e.length - 1; t >= 0; t--) {
				let n = e[t], r = n.getEditors(R.MOST_RECENTLY_ACTIVE);
				for (let e = r.length - 1; e >= 0; e--) this.addMostRecentEditor(n, r[e], !0, !0);
			}
		}
		for (let e of this.editorGroupsContainer.groups) this.registerGroupListeners(e);
	}
	deserialize(e) {
		let t = [];
		for (let { groupId: n, index: r } of e.entries) {
			let e = this.editorGroupsContainer.getGroup(n);
			if (!e) continue;
			let i = e.getEditorByIndex(r);
			if (!i) continue;
			let a = this.ensureKey(e, i);
			t.push([a, a]), this.updateEditorResourcesMap(i, !0);
		}
		this.mostRecentEditorsMap.fromJSON(t);
	}
};
Zr = Xr = f([v(1, z), v(2, Lt)], Zr), Nt(), Gt(), Sr(), ur(), Oe(), F(), mn(), B();
function Qr(e, t, n) {
	let r = e.get(z), i = ei(t, n, r, e.get(Ce));
	return i instanceof Promise ? i.then((e) => $r(e, t, n, r)) : $r(i, t, n, r);
}
function $r(e, t, n, r) {
	let i;
	return r.activeGroup !== e && t.options && !t.options.inactive && t.options.preserveFocus && typeof t.options.activation != "number" && n !== -2 && (i = Ie.ACTIVATE), [e, i];
}
function ei(e, t, n, r) {
	let i, a = qn(e) ? e.editor : e, o = e.options;
	if (t && typeof t != "number") i = t;
	else if (typeof t == "number" && t >= 0) i = n.getGroup(t);
	else if (t === -2) {
		let e = Vn(r), t = n.findGroup({ direction: e });
		(!t || ti(t, a)) && (t = n.addGroup(n.activeGroup, e)), i = t;
	} else if (t === -3) i = n.createAuxiliaryEditorPart({
		bounds: o?.auxiliary?.bounds,
		compact: o?.auxiliary?.compact,
		alwaysOnTop: o?.auxiliary?.alwaysOnTop
	}).then((e) => e.activeGroup);
	else if (!o || typeof o.index != "number") {
		let e = n.getGroups(I.MOST_RECENTLY_ACTIVE);
		if (o?.revealIfVisible) {
			for (let t of e) if (ni(t, a)) {
				i = t;
				break;
			}
		}
		if (!i && (o?.revealIfOpened || r.getValue("workbench.editor.revealIfOpen") || W(a) && a.hasCapability(V.Singleton))) {
			let t, n;
			for (let r of e) if (ri(r, a) && (n ||= r, !t && r.isActive(a) && (t = r)), n && t) break;
			i = t || n;
		}
	}
	if (!i) {
		let e = n.activeGroup;
		if (ti(e, a)) {
			for (let t of n.getGroups(I.MOST_RECENTLY_ACTIVE)) if (!ti(t, a)) {
				e = t;
				break;
			}
			i = ti(e, a) ? n.addGroup(e, Vn(r)) : e;
		} else i = e;
	}
	return i;
}
function ti(e, t) {
	return !(!e.isLocked || ri(e, t));
}
function ni(e, t) {
	return e.activeEditor ? e.activeEditor.matches(t) : !1;
}
function ri(e, t) {
	for (let n of e.editors) if (n.matches(t)) return !0;
	return !1;
}
O(), m(), F(), Rn(), r(), s(), g(), T(), x(), ln(), mn(), B(), lr(), Oe(), P(), d(), _e(), ee(), we(), cr(), rr(), Dr();
var ii, ai = ii = class extends t {
	constructor(e, t, n, r, i, a, o, s, l, u, d) {
		super(), this.editorGroupService = t, this.instantiationService = n, this.fileService = r, this.configurationService = i, this.contextService = a, this.uriIdentityService = o, this.editorResolverService = s, this.workspaceTrustRequestService = l, this.hostService = u, this.textEditorService = d, this._onDidActiveEditorChange = this._register(new c()), this.onDidActiveEditorChange = this._onDidActiveEditorChange.event, this._onDidVisibleEditorsChange = this._register(new c()), this.onDidVisibleEditorsChange = this._onDidVisibleEditorsChange.event, this._onDidEditorsChange = this._register(new c()), this.onDidEditorsChange = this._onDidEditorsChange.event, this._onWillOpenEditor = this._register(new c()), this.onWillOpenEditor = this._onWillOpenEditor.event, this._onDidCloseEditor = this._register(new c()), this.onDidCloseEditor = this._onDidCloseEditor.event, this._onDidOpenEditorFail = this._register(new c()), this.onDidOpenEditorFail = this._onDidOpenEditorFail.event, this._onDidMostRecentlyActiveEditorsChange = this._register(new c()), this.onDidMostRecentlyActiveEditorsChange = this._onDidMostRecentlyActiveEditorsChange.event, this.lastActiveEditor = void 0, this.activeOutOfWorkspaceWatchers = new h(), this.closeOnFileDelete = !1, this.editorGroupsContainer = e ?? t, this.editorsObserver = this._register(this.instantiationService.createInstance(Zr, this.editorGroupsContainer)), this.onConfigurationUpdated(), this.registerListeners();
	}
	createScoped(e, t) {
		return t.add(new ii(e, this.editorGroupService, this.instantiationService, this.fileService, this.configurationService, this.contextService, this.uriIdentityService, this.editorResolverService, this.workspaceTrustRequestService, this.hostService, this.textEditorService));
	}
	registerListeners() {
		this.editorGroupsContainer === this.editorGroupService.mainPart || this.editorGroupsContainer === this.editorGroupService ? this.editorGroupService.whenReady.then(() => this.onEditorGroupsReady()) : this.onEditorGroupsReady(), this._register(this.editorGroupsContainer.onDidChangeActiveGroup((e) => this.handleActiveEditorChange(e))), this._register(this.editorGroupsContainer.onDidAddGroup((e) => this.registerGroupListeners(e))), this._register(this.editorsObserver.onDidMostRecentlyActiveEditorsChange(() => this._onDidMostRecentlyActiveEditorsChange.fire())), this._register(this.onDidVisibleEditorsChange(() => this.handleVisibleEditorsChange())), this._register(this.fileService.onDidRunOperation((e) => this.onDidRunFileOperation(e))), this._register(this.fileService.onDidFilesChange((e) => this.onDidFilesChange(e))), this._register(this.configurationService.onDidChangeConfiguration((e) => this.onConfigurationUpdated(e)));
	}
	onEditorGroupsReady() {
		for (let e of this.editorGroupsContainer.groups) this.registerGroupListeners(e);
		this.activeEditor && (this.doHandleActiveEditorChangeEvent(), this._onDidVisibleEditorsChange.fire());
	}
	handleActiveEditorChange(e) {
		e === this.editorGroupsContainer.activeGroup && (!this.lastActiveEditor && !e.activeEditor || this.doHandleActiveEditorChangeEvent());
	}
	doHandleActiveEditorChangeEvent() {
		let e = this.editorGroupsContainer.activeGroup;
		this.lastActiveEditor = e.activeEditor ?? void 0, this._onDidActiveEditorChange.fire();
	}
	registerGroupListeners(e) {
		let t = new j();
		t.add(e.onDidModelChange((t) => {
			this._onDidEditorsChange.fire({
				groupId: e.id,
				event: t
			});
		})), t.add(e.onDidActiveEditorChange(() => {
			this.handleActiveEditorChange(e), this._onDidVisibleEditorsChange.fire();
		})), t.add(e.onWillOpenEditor((e) => {
			this._onWillOpenEditor.fire(e);
		})), t.add(e.onDidCloseEditor((e) => {
			this._onDidCloseEditor.fire(e);
		})), t.add(e.onDidOpenEditorFail((t) => {
			this._onDidOpenEditorFail.fire({
				editor: t,
				groupId: e.id
			});
		})), b.once(e.onWillDispose)(() => {
			w(t);
		});
	}
	handleVisibleEditorsChange() {
		let e = new Je();
		for (let t of this.visibleEditors) {
			let n = dt(A([Sn.getCanonicalUri(t, { supportSideBySide: q.PRIMARY }), Sn.getCanonicalUri(t, { supportSideBySide: q.SECONDARY })]), (e) => e.toString());
			for (let t of n) this.fileService.hasProvider(t) && !this.contextService.isInsideWorkspace(t) && e.add(t);
		}
		for (let t of this.activeOutOfWorkspaceWatchers.keys()) e.has(t) || (w(this.activeOutOfWorkspaceWatchers.get(t)), this.activeOutOfWorkspaceWatchers.delete(t));
		for (let t of e.keys()) if (!this.activeOutOfWorkspaceWatchers.get(t)) {
			let e = this.fileService.watch(t);
			this.activeOutOfWorkspaceWatchers.set(t, e);
		}
	}
	async onDidRunFileOperation(e) {
		e.isOperation(Kt.MOVE) && this.handleMovedFile(e.resource, e.target.resource), (e.isOperation(Kt.DELETE) || e.isOperation(Kt.MOVE)) && this.handleDeletedFile(e.resource, !1, e.target ? e.target.resource : void 0);
	}
	onDidFilesChange(e) {
		e.gotDeleted() && this.handleDeletedFile(e, !0);
	}
	async handleMovedFile(e, t) {
		for (let n of this.editorGroupsContainer.groups) {
			let r = [];
			for (let i of n.editors) {
				let a = i.resource;
				if (!a || !this.uriIdentityService.extUri.isEqualOrParent(a, e)) continue;
				let o;
				if (this.uriIdentityService.extUri.isEqual(e, a)) o = t;
				else {
					let n = Pe(a.path, e.path, this.uriIdentityService.extUri.ignorePathCasing(a));
					o = Bt(t, a.path.substr(n + e.path.length + 1));
				}
				let s = await i.rename(n.id, o);
				if (!s) return;
				let c = {
					preserveFocus: !0,
					pinned: n.isPinned(i),
					sticky: n.isSticky(i),
					index: n.getIndexOfEditor(i),
					inactive: !n.isActive(i)
				};
				W(s.editor) ? r.push({
					editor: i,
					replacement: s.editor,
					options: {
						...s.options,
						...c
					}
				}) : r.push({
					editor: i,
					replacement: {
						...s.editor,
						options: {
							...s.editor.options,
							...c
						}
					}
				});
			}
			r.length && this.replaceEditors(r, n);
		}
	}
	onConfigurationUpdated(e) {
		if (e && !e.affectsConfiguration("workbench.editor.closeOnFileDelete")) return;
		let t = this.configurationService.getValue();
		typeof t.workbench?.editor?.closeOnFileDelete == "boolean" ? this.closeOnFileDelete = t.workbench.editor.closeOnFileDelete : this.closeOnFileDelete = !1;
	}
	handleDeletedFile(e, t, n) {
		for (let r of this.getAllNonDirtyEditors({
			includeUntitled: !1,
			supportSideBySide: !0
		})) (async () => {
			let i = r.resource;
			if (i && (this.closeOnFileDelete || !t)) {
				if (n && this.uriIdentityService.extUri.isEqualOrParent(i, n)) return;
				let a = !1;
				if (a = e instanceof it ? e.contains(i, zt.DELETED) : this.uriIdentityService.extUri.isEqualOrParent(i, e), !a) return;
				let o = !1;
				t && this.fileService.hasProvider(i) && (await he(100), o = await this.fileService.exists(i)), !o && !r.isDisposed() && r.dispose();
			}
		})();
	}
	getAllNonDirtyEditors(e) {
		let t = [];
		function n(n) {
			n.hasCapability(V.Untitled) && !e.includeUntitled || n.isDirty() || t.push(n);
		}
		for (let t of this.editors) e.supportSideBySide && t instanceof K ? (n(t.primary), n(t.secondary)) : n(t);
		return t;
	}
	get activeEditorPane() {
		return this.editorGroupsContainer.activeGroup?.activeEditorPane;
	}
	get activeTextEditorControl() {
		let e = this.activeEditorPane;
		if (e) {
			let t = e.getControl();
			if (rn(t) || tn(t)) return t;
			if (en(t) && rn(t.activeCodeEditor)) return t.activeCodeEditor;
		}
	}
	get activeTextEditorLanguageId() {
		let e, t = this.activeTextEditorControl;
		return e = tn(t) ? t.getModifiedEditor() : t, e?.getModel()?.getLanguageId();
	}
	get count() {
		return this.editorsObserver.count;
	}
	get editors() {
		return this.getEditors(R.SEQUENTIAL).map(({ editor: e }) => e);
	}
	getEditors(e, t) {
		switch (e) {
			case R.MOST_RECENTLY_ACTIVE: return t?.excludeSticky ? this.editorsObserver.editors.filter(({ groupId: e, editor: t }) => !this.editorGroupsContainer.getGroup(e)?.isSticky(t)) : this.editorsObserver.editors;
			case R.SEQUENTIAL: {
				let e = [];
				for (let n of this.editorGroupsContainer.getGroups(I.GRID_APPEARANCE)) e.push(...n.getEditors(R.SEQUENTIAL, t).map((e) => ({
					editor: e,
					groupId: n.id
				})));
				return e;
			}
		}
	}
	get activeEditor() {
		let e = this.editorGroupsContainer.activeGroup;
		return e ? e.activeEditor ?? void 0 : void 0;
	}
	get visibleEditorPanes() {
		return A(this.editorGroupsContainer.groups.map((e) => e.activeEditorPane));
	}
	get visibleTextEditorControls() {
		return this.doGetVisibleTextEditorControls(this.visibleEditorPanes);
	}
	doGetVisibleTextEditorControls(e) {
		let t = [];
		for (let n of e) {
			let e = [];
			n instanceof Jr ? (e.push(n.getPrimaryEditorPane()?.getControl()), e.push(n.getSecondaryEditorPane()?.getControl())) : e.push(n.getControl());
			for (let n of e) (rn(n) || tn(n)) && t.push(n);
		}
		return t;
	}
	getVisibleTextEditorControls(e) {
		return this.doGetVisibleTextEditorControls(A(this.editorGroupsContainer.getGroups(e === R.SEQUENTIAL ? I.GRID_APPEARANCE : I.MOST_RECENTLY_ACTIVE).map((e) => e.activeEditorPane)));
	}
	get visibleEditors() {
		return A(this.editorGroupsContainer.groups.map((e) => e.activeEditor));
	}
	async openEditor(e, t, n) {
		let r, i = W(e) ? t : e.options, a;
		if (Tr(t) && (n = t), !W(e)) {
			let t = await this.editorResolverService.resolveEditor(e, n);
			if (t === br.ABORT) return;
			Bn(t) && (r = t.editor, i = t.options, a = t.group);
		}
		if (r ||= W(e) ? e : await this.textEditorService.resolveTextEditor(e), !a) {
			let e, t = this.instantiationService.invokeFunction(Qr, {
				editor: r,
				options: i
			}, n);
			t instanceof Promise ? [a, e] = await t : [a, e] = t, e && (i = {
				...i,
				activation: e
			});
		}
		return a.openEditor(r, i);
	}
	async openEditors(e, t, n) {
		if (n?.validateTrust && !await this.handleWorkspaceTrust(e)) return [];
		let r = /* @__PURE__ */ new Map();
		for (let n of e) {
			let e, i;
			if (!qn(n)) {
				let r = await this.editorResolverService.resolveEditor(n, t);
				if (r === br.ABORT) continue;
				Bn(r) && (e = r, i = r.group);
			}
			if (e ||= qn(n) ? n : {
				editor: await this.textEditorService.resolveTextEditor(n),
				options: n.options
			}, !i) {
				let n = this.instantiationService.invokeFunction(Qr, e, t);
				n instanceof Promise ? [i] = await n : [i] = n;
			}
			let a = r.get(i);
			a || (a = [], r.set(i, a)), a.push(e);
		}
		let i = [];
		for (let [e, t] of r) i.push(e.openEditors(t));
		return A(await ot.settled(i));
	}
	async handleWorkspaceTrust(e) {
		let { resources: t, diffMode: n, mergeMode: r } = this.extractEditorResources(e);
		switch (await this.workspaceTrustRequestService.requestOpenFilesTrust(t)) {
			case yr.Open: return !0;
			case yr.OpenInNewWindow: return await this.hostService.openWindow(t.map((e) => ({ fileUri: e })), {
				forceNewWindow: !0,
				diffMode: n,
				mergeMode: r
			}), !1;
			case yr.Cancel: return !1;
		}
	}
	extractEditorResources(e) {
		let t = new Je(), n = !1, r = !1;
		for (let i of e) if (qn(i)) {
			let e = Sn.getOriginalUri(i.editor, { supportSideBySide: q.BOTH });
			E.isUri(e) ? t.add(e) : e && (e.primary && t.add(e.primary), e.secondary && t.add(e.secondary), n = i.editor instanceof yn);
		} else Zn(i) && (E.isUri(i.input1) && t.add(i.input1.resource), E.isUri(i.input2) && t.add(i.input2.resource), E.isUri(i.base) && t.add(i.base.resource), E.isUri(i.result) && t.add(i.result.resource), r = !0), On(i) ? (E.isUri(i.original.resource) && t.add(i.original.resource), E.isUri(i.modified.resource) && t.add(i.modified.resource), n = !0) : Wn(i) && t.add(i.resource);
		return {
			resources: Array.from(t.keys()),
			diffMode: n,
			mergeMode: r
		};
	}
	isOpened(e) {
		return this.editorsObserver.hasEditor({
			resource: this.uriIdentityService.asCanonicalUri(e.resource),
			typeId: e.typeId,
			editorId: e.editorId
		});
	}
	isVisible(e) {
		for (let t of this.editorGroupsContainer.groups) if (t.activeEditor?.matches(e)) return !0;
		return !1;
	}
	async closeEditor({ editor: e, groupId: t }, n) {
		await this.editorGroupsContainer.getGroup(t)?.closeEditor(e, n);
	}
	async closeEditors(e, t) {
		let n = /* @__PURE__ */ new Map();
		for (let { editor: t, groupId: r } of e) {
			let e = this.editorGroupsContainer.getGroup(r);
			if (!e) continue;
			let i = n.get(e);
			i || (i = [], n.set(e, i)), i.push(t);
		}
		for (let [e, r] of n) await e.closeEditors(r, t);
	}
	findEditors(e, t, n) {
		let r = E.isUri(e) ? e : e.resource, i = E.isUri(e) ? void 0 : e.typeId;
		if (t?.supportSideBySide !== q.ANY && t?.supportSideBySide !== q.SECONDARY && !this.editorsObserver.hasEditors(r)) return E.isUri(e) || Te(n) ? [] : void 0;
		if (Te(n)) {
			let n = [];
			for (let r of this.editorGroupsContainer.getGroups(t?.order === R.SEQUENTIAL ? I.GRID_APPEARANCE : I.MOST_RECENTLY_ACTIVE)) {
				let i = [];
				if (E.isUri(e)) i.push(...this.findEditors(e, t, r));
				else {
					let n = this.findEditors(e, t, r);
					n && i.push(n);
				}
				n.push(...i.map((e) => ({
					editor: e,
					groupId: r.id
				})));
			}
			return n;
		} else {
			let a = typeof n == "number" ? this.editorGroupsContainer.getGroup(n) : n;
			if (E.isUri(e)) return a ? a.findEditors(r, t) : [];
			{
				if (!a) return;
				let e = a.findEditors(r, t);
				for (let t of e) if (t.typeId === i) return t;
				return;
			}
		}
	}
	async replaceEditors(e, t) {
		let n = typeof t == "number" ? this.editorGroupsContainer.getGroup(t) : t, r = [];
		for (let t of e) {
			let e;
			if (!W(t.replacement)) {
				let r = await this.editorResolverService.resolveEditor(t.replacement, n);
				if (r === br.ABORT) continue;
				Bn(r) && (e = {
					editor: t.editor,
					replacement: r.editor,
					options: r.options,
					forceReplaceDirty: t.forceReplaceDirty
				});
			}
			e ||= {
				editor: t.editor,
				replacement: an(t) ? t.replacement : await this.textEditorService.resolveTextEditor(t.replacement),
				options: an(t) ? t.options : t.replacement.options,
				forceReplaceDirty: t.forceReplaceDirty
			}, r.push(e);
		}
		return n?.replaceEditors(r);
	}
	async save(e, t) {
		Array.isArray(e) || (e = [e]);
		let n = this.getUniqueEditors(e), r = [], i = [];
		if (t?.saveAs) i.push(...n);
		else for (let { groupId: e, editor: t } of n) t.hasCapability(V.Untitled) ? i.push({
			groupId: e,
			editor: t
		}) : r.push({
			groupId: e,
			editor: t
		});
		let a = await ot.settled(r.map(({ groupId: e, editor: n }) => (t?.reason === L.EXPLICIT && this.editorGroupsContainer.getGroup(e)?.pinEditor(n), n.save(e, t))));
		for (let { groupId: e, editor: n } of i) {
			if (n.isDisposed()) continue;
			let r = {
				pinned: !0,
				viewState: (await this.openEditor(n, e))?.getViewState()
			}, i = t?.saveAs ? await n.saveAs(e, t) : await n.save(e, t);
			if (a.push(i), !i) break;
			if (!n.matches(i)) {
				let t = n.hasCapability(V.Untitled) ? this.editorGroupsContainer.groups.map((e) => e.id) : [e];
				for (let e of t) i instanceof In ? await this.replaceEditors([{
					editor: n,
					replacement: i,
					options: r
				}], e) : await this.replaceEditors([{
					editor: n,
					replacement: {
						...i,
						options: r
					}
				}], e);
			}
		}
		return {
			success: a.every((e) => !!e),
			editors: A(a)
		};
	}
	saveAll(e) {
		return this.save(this.getAllModifiedEditors(e), e);
	}
	async revert(e, t) {
		Array.isArray(e) || (e = [e]);
		let n = this.getUniqueEditors(e);
		return await ot.settled(n.map(async ({ groupId: e, editor: n }) => (this.editorGroupsContainer.getGroup(e)?.pinEditor(n), n.revert(e, t)))), !n.some(({ editor: e }) => e.isDirty());
	}
	async revertAll(e) {
		return this.revert(this.getAllModifiedEditors(e), e);
	}
	getAllModifiedEditors(e) {
		let t = [];
		for (let n of this.editorGroupsContainer.getGroups(I.MOST_RECENTLY_ACTIVE)) for (let r of n.getEditors(R.MOST_RECENTLY_ACTIVE)) r.isModified() && ((typeof e?.includeUntitled == "boolean" || !e?.includeUntitled?.includeScratchpad) && r.hasCapability(V.Scratchpad) || !e?.includeUntitled && r.hasCapability(V.Untitled) || e?.excludeSticky && n.isSticky(r) || t.push({
			groupId: n.id,
			editor: r
		}));
		return t;
	}
	getUniqueEditors(e) {
		let t = [];
		for (let { editor: n, groupId: r } of e) t.some((e) => e.editor.matches(n)) || t.push({
			editor: n,
			groupId: r
		});
		return t;
	}
	dispose() {
		super.dispose(), this.activeOutOfWorkspaceWatchers.forEach((e) => w(e)), this.activeOutOfWorkspaceWatchers.clear();
	}
};
ai = ii = f([
	v(1, z),
	v(2, _),
	v(3, k),
	v(4, Ce),
	v(5, tt),
	v(6, be),
	v(7, sr),
	v(8, Et),
	v(9, gr),
	v(10, Ar)
], ai), $n(), O(), P(), Fn(), un(), ur(), F(), J(), B(), Mn(), Xn(), It(), At(), r(), we();
var oi = class extends t {
	static {
		this.ID = "workbench.contrib.editorAutoSave";
	}
	constructor(e, t, n, r, i, a, o, s) {
		super(), this.filesConfigurationService = e, this.hostService = t, this.editorService = n, this.editorGroupService = r, this.workingCopyService = i, this.logService = a, this.markerService = o, this.uriIdentityService = s, this.scheduledAutoSavesAfterDelay = /* @__PURE__ */ new Map(), this.lastActiveEditor = void 0, this.lastActiveGroupId = void 0, this.lastActiveEditorControlDisposable = this._register(new j()), this.waitingOnConditionAutoSaveWorkingCopies = new h((e) => this.uriIdentityService.extUri.getComparisonKey(e)), this.waitingOnConditionAutoSaveEditors = new h((e) => this.uriIdentityService.extUri.getComparisonKey(e));
		for (let e of this.workingCopyService.dirtyWorkingCopies) this.onDidRegister(e);
		this.registerListeners();
	}
	registerListeners() {
		this._register(this.hostService.onDidChangeFocus((e) => this.onWindowFocusChange(e))), this._register(this.hostService.onDidChangeActiveWindow(() => this.onActiveWindowChange())), this._register(this.editorService.onDidActiveEditorChange(() => this.onDidActiveEditorChange())), this._register(this.filesConfigurationService.onDidChangeAutoSaveConfiguration(() => this.onDidChangeAutoSaveConfiguration())), this._register(this.workingCopyService.onDidRegister((e) => this.onDidRegister(e))), this._register(this.workingCopyService.onDidUnregister((e) => this.onDidUnregister(e))), this._register(this.workingCopyService.onDidChangeDirty((e) => this.onDidChangeDirty(e))), this._register(this.workingCopyService.onDidChangeContent((e) => this.onDidChangeContent(e))), this._register(this.markerService.onMarkerChanged((e) => this.onConditionChanged(e, G.ERRORS))), this._register(this.filesConfigurationService.onDidChangeAutoSaveDisabled((e) => this.onConditionChanged([e], G.DISABLED)));
	}
	onConditionChanged(e, t) {
		for (let n of e) {
			let e = this.waitingOnConditionAutoSaveWorkingCopies.get(n);
			if (e?.condition === t) e.workingCopy.isDirty() && this.filesConfigurationService.getAutoSaveMode(e.workingCopy.resource, e.reason).mode !== U.OFF && (this.discardAutoSave(e.workingCopy), this.logService.trace("[editor auto save] running auto save from condition change event", e.workingCopy.resource.toString(), e.workingCopy.typeId), e.workingCopy.save({ reason: e.reason }));
			else {
				let e = this.waitingOnConditionAutoSaveEditors.get(n);
				e?.condition === t && !e.editor.editor.isDisposed() && e.editor.editor.isDirty() && this.filesConfigurationService.getAutoSaveMode(e.editor.editor, e.reason).mode !== U.OFF && (this.waitingOnConditionAutoSaveEditors.delete(n), this.logService.trace(`[editor auto save] running auto save from condition change event with reason ${e.reason}`), this.editorService.save(e.editor, { reason: e.reason }));
			}
		}
	}
	onWindowFocusChange(e) {
		e || this.maybeTriggerAutoSave(L.WINDOW_CHANGE);
	}
	onActiveWindowChange() {
		this.maybeTriggerAutoSave(L.WINDOW_CHANGE);
	}
	onDidActiveEditorChange() {
		this.lastActiveEditor && typeof this.lastActiveGroupId == "number" && this.maybeTriggerAutoSave(L.FOCUS_CHANGE, {
			groupId: this.lastActiveGroupId,
			editor: this.lastActiveEditor
		});
		let e = this.editorGroupService.activeGroup, t = this.lastActiveEditor = e.activeEditor ?? void 0;
		this.lastActiveGroupId = e.id, this.lastActiveEditorControlDisposable.clear();
		let n = this.editorService.activeEditorPane;
		t && n && this.lastActiveEditorControlDisposable.add(n.onDidBlur(() => {
			this.maybeTriggerAutoSave(L.FOCUS_CHANGE, {
				groupId: e.id,
				editor: t
			});
		}));
	}
	maybeTriggerAutoSave(e, t) {
		if (t) {
			if (!t.editor.isDirty() || t.editor.isReadonly() || t.editor.hasCapability(V.Untitled)) return;
			let n = this.filesConfigurationService.getAutoSaveMode(t.editor, e);
			n.mode === U.OFF ? t.editor.resource && (n.reason === G.ERRORS || n.reason === G.DISABLED) && this.waitingOnConditionAutoSaveEditors.set(t.editor.resource, {
				editor: t,
				reason: e,
				condition: n.reason
			}) : (e === L.WINDOW_CHANGE && (n.mode === U.ON_FOCUS_CHANGE || n.mode === U.ON_WINDOW_CHANGE) || e === L.FOCUS_CHANGE && n.mode === U.ON_FOCUS_CHANGE) && (this.logService.trace(`[editor auto save] triggering auto save with reason ${e}`), this.editorService.save(t, { reason: e }));
		} else this.saveAllDirtyAutoSaveables(e);
	}
	onDidChangeAutoSaveConfiguration() {
		let e;
		switch (this.filesConfigurationService.getAutoSaveMode(void 0).mode) {
			case U.ON_FOCUS_CHANGE:
				e = L.FOCUS_CHANGE;
				break;
			case U.ON_WINDOW_CHANGE:
				e = L.WINDOW_CHANGE;
				break;
			case U.AFTER_SHORT_DELAY:
			case U.AFTER_LONG_DELAY:
				e = L.AUTO;
				break;
		}
		e && this.saveAllDirtyAutoSaveables(e);
	}
	saveAllDirtyAutoSaveables(e) {
		for (let t of this.workingCopyService.dirtyWorkingCopies) {
			if (t.capabilities & Un.Untitled) continue;
			let n = this.filesConfigurationService.getAutoSaveMode(t.resource, e);
			n.mode === U.OFF ? (n.reason === G.ERRORS || n.reason === G.DISABLED) && this.waitingOnConditionAutoSaveWorkingCopies.set(t.resource, {
				workingCopy: t,
				reason: e,
				condition: n.reason
			}) : t.save({ reason: e });
		}
	}
	onDidRegister(e) {
		e.isDirty() && this.scheduleAutoSave(e);
	}
	onDidUnregister(e) {
		this.discardAutoSave(e);
	}
	onDidChangeDirty(e) {
		e.isDirty() ? this.scheduleAutoSave(e) : this.discardAutoSave(e);
	}
	onDidChangeContent(e) {
		e.isDirty() && this.scheduleAutoSave(e);
	}
	scheduleAutoSave(e) {
		if (e.capabilities & Un.Untitled) return;
		let t = this.filesConfigurationService.getAutoSaveConfiguration(e.resource).autoSaveDelay;
		if (typeof t != "number") return;
		this.discardAutoSave(e), this.logService.trace(`[editor auto save] scheduling auto save after ${t}ms`, e.resource.toString(), e.typeId);
		let n = setTimeout(() => {
			if (this.discardAutoSave(e), e.isDirty()) {
				let t = L.AUTO, n = this.filesConfigurationService.getAutoSaveMode(e.resource, t);
				n.mode === U.OFF ? (n.reason === G.ERRORS || n.reason === G.DISABLED) && this.waitingOnConditionAutoSaveWorkingCopies.set(e.resource, {
					workingCopy: e,
					reason: t,
					condition: n.reason
				}) : (this.logService.trace("[editor auto save] running auto save", e.resource.toString(), e.typeId), e.save({ reason: t }));
			}
		}, t);
		this.scheduledAutoSavesAfterDelay.set(e, ht(() => {
			this.logService.trace("[editor auto save] clearing pending auto save", e.resource.toString(), e.typeId), clearTimeout(n);
		}));
	}
	discardAutoSave(e) {
		w(this.scheduledAutoSavesAfterDelay.get(e)), this.scheduledAutoSavesAfterDelay.delete(e), this.waitingOnConditionAutoSaveWorkingCopies.delete(e.resource), this.waitingOnConditionAutoSaveEditors.delete(e.resource);
	}
};
oi = f([
	v(0, xn),
	v(1, gr),
	v(2, H),
	v(3, z),
	v(4, kn),
	v(5, Ut),
	v(6, Vt),
	v(7, be)
], oi), vn(oi.ID, oi, Dn.BlockRestore), O(), Pn(), s(), Jt();
var si = class extends An {
	constructor(e, t, n) {
		super(), this.resource = e, this.name = t, this.fileService = n, this.mime = pt.binary;
	}
	getName() {
		return this.name;
	}
	getSize() {
		return this.size;
	}
	getMime() {
		return this.mime;
	}
	getETag() {
		return this.etag;
	}
	async resolve() {
		if (this.fileService.hasProvider(this.resource)) {
			let e = await this.fileService.stat(this.resource);
			this.etag = e.etag, typeof e.size == "number" && (this.size = e.size);
		}
		return super.resolve();
	}
};
si = f([v(2, k)], si), O(), F(), wr(), s(), Kn(), on(), m(), P(), te(), De(), un(), J(), x(), g(), at(), dn(), p(), pr();
var ci, Z;
(function(e) {
	e[e.None = 0] = "None", e[e.Text = 1] = "Text", e[e.Binary = 2] = "Binary";
})(Z ||= {});
var Q = ci = class extends fr {
	get typeId() {
		return zr;
	}
	get editorId() {
		return hn.id;
	}
	get capabilities() {
		let e = V.CanSplitInGroup;
		return this.model ? this.model.isReadonly() && (e |= V.Readonly) : this.fileService.hasProvider(this.resource) ? this.filesConfigurationService.isReadonly(this.resource) && (e |= V.Readonly) : e |= V.Untitled, e & V.Readonly || (e |= V.CanDropIntoEditor), e;
	}
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, ee, te, f, ne, p) {
		super(e, t, te, c, u, d, ee, ne, p), this.instantiationService = s, this.textModelService = l, this.pathService = f, this.forceOpenAs = Z.None, this.model = void 0, this.cachedTextFileModelReference = void 0, this.modelListeners = this._register(new j()), this.model = this.textFileService.files.get(e), n && this.setPreferredName(n), r && this.setPreferredDescription(r), i && this.setPreferredEncoding(i), a && this.setPreferredLanguageId(a), typeof o == "string" && this.setPreferredContents(o), this._register(this.textFileService.files.onDidCreate((e) => this.onDidCreateTextFileModel(e))), this.model && this.registerModelListeners(this.model);
	}
	onDidCreateTextFileModel(e) {
		y(e.resource, this.resource) && (this.model = e, this.registerModelListeners(e));
	}
	registerModelListeners(e) {
		this.modelListeners.clear(), this.modelListeners.add(e.onDidChangeDirty(() => this._onDidChangeDirty.fire())), this.modelListeners.add(e.onDidChangeReadonly(() => this._onDidChangeCapabilities.fire())), this.modelListeners.add(e.onDidSaveError(() => this._onDidChangeDirty.fire())), this.modelListeners.add(b.once(e.onWillDispose)(() => {
			this.modelListeners.clear(), this.model = void 0;
		}));
	}
	getName() {
		return this.preferredName || super.getName();
	}
	setPreferredName(e) {
		this.allowLabelOverride() && this.preferredName !== e && (this.preferredName = e, this._onDidChangeLabel.fire());
	}
	allowLabelOverride() {
		return this.resource.scheme !== this.pathService.defaultUriScheme && this.resource.scheme !== N.vscodeUserData && this.resource.scheme !== N.file && this.resource.scheme !== N.vscodeRemote;
	}
	getPreferredName() {
		return this.preferredName;
	}
	isReadonly() {
		return this.model ? this.model.isReadonly() : this.filesConfigurationService.isReadonly(this.resource);
	}
	getDescription(e) {
		return this.preferredDescription || super.getDescription(e);
	}
	setPreferredDescription(e) {
		this.allowLabelOverride() && this.preferredDescription !== e && (this.preferredDescription = e, this._onDidChangeLabel.fire());
	}
	getPreferredDescription() {
		return this.preferredDescription;
	}
	getTitle(e) {
		let t = super.getTitle(e), n = this.getPreferredTitle();
		return n && (t = `${n} (${t})`), t;
	}
	getPreferredTitle() {
		if (this.preferredName && this.preferredDescription) return `${this.preferredName} ${this.preferredDescription}`;
		if (this.preferredName || this.preferredDescription) return this.preferredName ?? this.preferredDescription;
	}
	getEncoding() {
		return this.model ? this.model.getEncoding() : this.preferredEncoding;
	}
	getPreferredEncoding() {
		return this.preferredEncoding;
	}
	async setEncoding(e, t) {
		return this.setPreferredEncoding(e), this.model?.setEncoding(e, t);
	}
	setPreferredEncoding(e) {
		this.preferredEncoding = e, this.setForceOpenAsText();
	}
	getLanguageId() {
		return this.model ? this.model.getLanguageId() : this.preferredLanguageId;
	}
	getPreferredLanguageId() {
		return this.preferredLanguageId;
	}
	setLanguageId(e, t) {
		this.setPreferredLanguageId(e), this.model?.setLanguageId(e, t);
	}
	setPreferredLanguageId(e) {
		this.preferredLanguageId = e, this.setForceOpenAsText();
	}
	setPreferredContents(e) {
		this.preferredContents = e, this.setForceOpenAsText();
	}
	setForceOpenAsText() {
		this.forceOpenAs = Z.Text;
	}
	setForceOpenAsBinary() {
		this.forceOpenAs = Z.Binary;
	}
	isDirty() {
		return !!this.model?.isDirty();
	}
	isSaving() {
		return this.model?.hasState(Gn.SAVED) || this.model?.hasState(Gn.CONFLICT) || this.model?.hasState(Gn.ERROR) ? !1 : this.filesConfigurationService.hasShortAutoSaveDelay(this) ? !0 : super.isSaving();
	}
	prefersEditorPane(e) {
		return this.forceOpenAs === Z.Binary ? e.find((e) => e.typeId === Br) : e.find((e) => e.typeId === Rr);
	}
	resolve(e) {
		return this.forceOpenAs === Z.Binary ? this.doResolveAsBinary() : this.doResolveAsText(e);
	}
	async doResolveAsText(e) {
		try {
			let t = this.preferredContents;
			this.preferredContents = void 0, await this.textFileService.files.resolve(this.resource, {
				languageId: this.preferredLanguageId,
				encoding: this.preferredEncoding,
				contents: typeof t == "string" ? $t(t) : void 0,
				reload: { async: !0 },
				allowBinary: this.forceOpenAs === Z.Text,
				reason: En.EDITOR,
				limits: this.ensureLimits(e)
			}), this.cachedTextFileModelReference ||= await this.textModelService.createModelReference(this.resource);
			let n = this.cachedTextFileModelReference.object;
			return this.isDisposed() && this.disposeModelReference(), n;
		} catch (e) {
			if (e.textFileOperationResult === zn.FILE_IS_BINARY) return this.doResolveAsBinary();
			throw e;
		}
	}
	async doResolveAsBinary() {
		let e = this.instantiationService.createInstance(si, this.preferredResource, this.getName());
		return await e.resolve(), e;
	}
	isResolved() {
		return !!this.model;
	}
	async rename(e, t) {
		return { editor: {
			resource: t,
			encoding: this.getEncoding(),
			options: { viewState: gn(this, e, this.editorService) }
		} };
	}
	toUntyped(e) {
		let t = {
			resource: this.preferredResource,
			forceFile: !0,
			options: { override: this.editorId }
		};
		return typeof e?.preserveViewState == "number" && (t.encoding = this.getEncoding(), t.languageId = this.getLanguageId(), t.contents = (() => {
			let e = this.textFileService.files.get(this.resource);
			if (e?.isDirty() && !e.textEditorModel.isTooLargeForHeapOperation()) return e.textEditorModel.getValue();
		})(), t.options = {
			...t.options,
			viewState: gn(this, e.preserveViewState, this.editorService)
		}), t;
	}
	matches(e) {
		return this === e ? !0 : e instanceof ci ? y(e.resource, this.resource) : Wn(e) ? super.matches(e) : !1;
	}
	dispose() {
		this.model = void 0, this.disposeModelReference(), super.dispose();
	}
	disposeModelReference() {
		w(this.cachedTextFileModelReference), this.cachedTextFileModelReference = void 0;
	}
};
Q = ci = f([
	v(7, _),
	v(8, tr),
	v(9, Fe),
	v(10, ne),
	v(11, k),
	v(12, xn),
	v(13, H),
	v(14, cn),
	v(15, Xt),
	v(16, hr)
], Q), me(), F(), ae.as(pn.EditorFactory).registerFileEditorFactory({
	typeId: zr,
	createFileEditor: (e, t, n, r, i, a, o, s) => s.createInstance(Q, e, t, n, r, i, a, o),
	isFileEditor: (e) => e instanceof Q
}), bt(), Ye(), Ne(), le(), Ct(), xe(), xr(), Qt(), ge(), T(), F(), mn();
function li(e, t, n, r) {
	let i = ui(e, t, n, r), a = {
		groupedEditors: [],
		preserveFocus: i.length && i[0].preserveFocus || !1
	};
	for (let e of i) {
		let t = gi(e, n);
		if (!t) continue;
		let { group: r, editor: i } = t, o;
		for (let e of a.groupedEditors) if (e.group.id === r.id) {
			o = e;
			break;
		}
		o || (o = {
			group: r,
			editors: []
		}, a.groupedEditors.push(o)), i && o.editors.push(i);
	}
	return a;
}
function ui(e, t, n, r) {
	let i = r.lastFocusedList, a = i instanceof ce && i.getHTMLElement() === $e(), o = fi(e, a, t, n, r);
	if (!o) {
		let e = n.activeGroup, t = e.activeEditor;
		o = {
			groupId: e.id,
			editorIndex: t ? e.getIndexOfEditor(t) : void 0
		}, a = !1;
	}
	let s = pi(o, a, t, n, r);
	return di(o, s);
}
function di(e, t) {
	if (t.length <= 1) return t;
	let n = t.findIndex((t) => t.groupId === e.groupId && t.editorIndex === e.editorIndex);
	if (n !== -1) t.splice(n, 1), t.unshift(e);
	else if (e.editorIndex === void 0) t.unshift(e);
	else throw Error("Editor context not found in multi editor context");
	return t;
}
function fi(e, t, n, r, i) {
	let a = e.filter((e) => jn(e) || E.isUri(e));
	for (let e of a) if (jn(e)) return e;
	for (let e of a) {
		let t = n.findEditors(e);
		if (t.length) {
			let e = t[0], n = r.getGroup(e.groupId);
			return {
				groupId: e.groupId,
				editorIndex: n?.getIndexOfEditor(e.editor)
			};
		}
	}
	if (t) {
		let e = i.lastFocusedList;
		for (let t of e.getFocusedElements()) if (hi(t)) return mi(t, void 0, r);
	}
}
function pi(e, t, n, r, i) {
	if (t) {
		let t = i.lastFocusedList.getSelectedElements().filter(hi);
		if (t.length > 1) return t.map((t) => mi(t, e.preserveFocus, r));
		if (t.length === 0) return pi(e, !1, n, r, i);
	} else {
		let t = r.getGroup(e.groupId), n = e.editorIndex === void 0 ? t?.activeEditor : t?.getEditorByIndex(e.editorIndex);
		if (t && n && t.isSelected(n)) return t.selectedEditors.map((n) => mi({
			editor: n,
			groupId: t.id
		}, e.preserveFocus, r));
	}
	return [e];
}
function mi(e, t, n) {
	if (Hn(e)) return {
		groupId: e.id,
		editorIndex: void 0,
		preserveFocus: t
	};
	let r = n.getGroup(e.groupId);
	return {
		groupId: e.groupId,
		editorIndex: r ? r.getIndexOfEditor(e.editor) : -1,
		preserveFocus: t
	};
}
function hi(e) {
	return Hn(e) || Yn(e);
}
function gi(e, t) {
	let n = t.getGroup(e.groupId);
	if (n) return e.editorIndex === void 0 ? {
		group: n,
		editor: void 0
	} : {
		group: n,
		editor: n.getEditorByIndex(e.editorIndex)
	};
}
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/contrib/files/common/explorerFileNestingTrie.js
var _i = class {
	constructor(e) {
		this.root = new vi();
		for (let [t, n] of e) for (let e of n) this.root.add(t, e);
	}
	toString() {
		return this.root.toString();
	}
	getAttributes(e, t) {
		let n = e.lastIndexOf(".");
		return n < 1 ? {
			dirname: t,
			basename: e,
			extname: ""
		} : {
			dirname: t,
			basename: e.substring(0, n),
			extname: e.substring(n + 1)
		};
	}
	nest(e, t) {
		let n = new vi();
		for (let r of e) {
			let e = this.getAttributes(r, t), i = this.root.get(r, e);
			for (let e of i) n.add(e, r);
		}
		let r = (e, i = /* @__PURE__ */ new Set()) => {
			if (i.has(e)) return [];
			i.add(e);
			let a = this.getAttributes(e, t), o = n.get(e, a);
			return o.length === 0 || o.length === 1 && o[0] === e ? [e] : o.flatMap((e) => r(e, i));
		}, i = /* @__PURE__ */ new Map();
		for (let t of e) {
			let e = r(t);
			e.length === 0 && (e = [t]);
			for (let n of e) {
				let e = i.get(n);
				e || i.set(n, e = /* @__PURE__ */ new Set()), t !== n && e.add(t);
			}
		}
		return i;
	}
}, vi = class e {
	constructor() {
		this.value = new yi(), this.map = /* @__PURE__ */ new Map();
	}
	add(t, n) {
		if (t === "") this.value.add(t, n);
		else if (t[0] === "*") this.value.add(t, n);
		else {
			let r = t[0], i = t.slice(1), a = this.map.get(r);
			a || this.map.set(r, a = new e()), a.add(i, n);
		}
	}
	get(e, t) {
		let n = [];
		n.push(...this.value.get(e, t));
		let r = e[0], i = e.slice(1), a = this.map.get(r);
		return a && n.push(...a.get(i, t)), n;
	}
	toString(e = "") {
		let t = [];
		return this.value.hasItems && t.push("* => \n" + this.value.toString(e + "  ")), t.map((t) => e + t).join("\n");
	}
}, yi = class e {
	constructor() {
		this.star = [], this.epsilon = [], this.map = /* @__PURE__ */ new Map(), this.hasItems = !1;
	}
	add(t, n) {
		if (this.hasItems = !0, t === "*") this.star.push(new xi(n));
		else if (t === "") this.epsilon.push(new xi(n));
		else {
			let r = t[t.length - 1], i = t.slice(0, t.length - 1);
			if (r === "*") throw Error("Unexpected star in SufTrie key: " + t);
			{
				let t = this.map.get(r);
				t || this.map.set(r, t = new e()), t.add(i, n);
			}
		}
	}
	get(e, t) {
		let n = [];
		e === "" && n.push(...this.epsilon.map((e) => e.substitute(t))), this.star.length && n.push(...this.star.map((n) => n.substitute(t, e)));
		let r = e[e.length - 1], i = e.slice(0, e.length - 1), a = this.map.get(r);
		return a && n.push(...a.get(i, t)), n;
	}
	toString(e = "") {
		let t = [];
		return this.star.length && t.push("* => " + this.star.join("; ")), this.epsilon.length && t.push("ε => " + this.epsilon.join("; ")), t.map((t) => e + t).join("\n");
	}
}, $;
(function(e) {
	e.capture = "capture", e.basename = "basename", e.dirname = "dirname", e.extname = "extname";
})($ ||= {});
var bi = /\$[({](capture|basename|dirname|extname)[)}]/g, xi = class {
	constructor(e) {
		this.tokens = [], bi.lastIndex = 0;
		let t, n = 0;
		for (; t = bi.exec(e);) {
			let r = e.slice(n, t.index);
			this.tokens.push(r);
			let i = t[1];
			switch (i) {
				case $.basename:
				case $.dirname:
				case $.extname:
				case $.capture:
					this.tokens.push({ capture: i });
					break;
				default: throw Error("unknown substitution type: " + i);
			}
			n = t.index + t[0].length;
		}
		if (n !== e.length) {
			let t = e.slice(n, e.length);
			this.tokens.push(t);
		}
	}
	substitute(e, t) {
		return this.tokens.map((n) => {
			if (typeof n == "string") return n;
			switch (n.capture) {
				case $.basename: return e.basename;
				case $.dirname: return e.dirname;
				case $.extname: return e.extname;
				case $.capture: return t || "";
			}
		}).join("");
	}
};
O(), T(), u(), r(), ue(), Ze(), d(), P(), g(), x(), ee();
var Si = class e {
	constructor(e, t, n, r, i, a, o, s, c, l = Re(e), u, d = !1) {
		this.resource = e, this.fileService = t, this.configService = n, this.filesConfigService = r, this._parent = i, this._isDirectory = a, this._isSymbolicLink = o, this._readonly = s, this._locked = c, this._name = l, this._mtime = u, this._unknown = d, this.error = void 0, this._isExcluded = !1, this.markedAsFindResult = !1, this._isDirectoryResolved = !1;
	}
	get isExcluded() {
		return this._isExcluded ? !0 : this._parent ? this._parent.isExcluded : !1;
	}
	set isExcluded(e) {
		this._isExcluded = e;
	}
	hasChildren(e) {
		return this.hasNests ? this.nestedChildren?.some((t) => e(t)) ?? !1 : this.isDirectory;
	}
	get hasNests() {
		return !!this.nestedChildren?.length;
	}
	get isDirectoryResolved() {
		return this._isDirectoryResolved;
	}
	get isSymbolicLink() {
		return !!this._isSymbolicLink;
	}
	get isDirectory() {
		return !!this._isDirectory;
	}
	get isReadonly() {
		return this.filesConfigService.isReadonly(this.resource, {
			resource: this.resource,
			name: this.name,
			readonly: this._readonly,
			locked: this._locked
		});
	}
	get mtime() {
		return this._mtime;
	}
	get name() {
		return this._name;
	}
	get isUnknown() {
		return this._unknown;
	}
	get parent() {
		return this._parent;
	}
	get root() {
		return this._parent ? this._parent.root : this;
	}
	get children() {
		return /* @__PURE__ */ new Map();
	}
	updateName(e) {
		this._parent?.removeChild(this), this._name = e, this._parent?.addChild(this);
	}
	getId() {
		let e = this.root.resource.toString() + "::" + this.resource.toString();
		return this.isMarkedAsFiltered() && (e += "::findFilterResult"), e;
	}
	toString() {
		return `ExplorerItem: ${this.name}`;
	}
	get isRoot() {
		return this === this.root;
	}
	static create(t, n, r, i, a, o) {
		let s = new e(i.resource, t, n, r, a, i.isDirectory, i.isSymbolicLink, i.readonly, i.locked, i.name, i.mtime, !i.isFile && !i.isDirectory);
		if (s.isDirectory && (s._isDirectoryResolved = !!i.children || !!o && o.some((e) => st(e, s.resource)), i.children)) for (let a = 0, c = i.children.length; a < c; a++) {
			let c = e.create(t, n, r, i.children[a], s, o);
			s.addChild(c);
		}
		return s;
	}
	static mergeLocalWithDisk(t, n) {
		if (t.resource.toString() !== n.resource.toString()) return;
		let r = t.isDirectory || n.isDirectory;
		if (!(r && n._isDirectoryResolved && !t._isDirectoryResolved) && (n.resource = t.resource, n.isRoot || n.updateName(t.name), n._isDirectory = t.isDirectory, n._mtime = t.mtime, n._isDirectoryResolved = t._isDirectoryResolved, n._isSymbolicLink = t.isSymbolicLink, n.error = t.error, r && t._isDirectoryResolved)) {
			let r = new h();
			n.children.forEach((e) => {
				r.set(e.resource, e);
			}), n.children.clear(), t.children.forEach((t) => {
				let i = r.get(t.resource);
				i ? (e.mergeLocalWithDisk(t, i), n.addChild(i), r.delete(t.resource)) : n.addChild(t);
			}), r.forEach((e) => {
				e instanceof Ci && n.addChild(e);
			});
		}
	}
	addChild(e) {
		e._parent = this, e.updateResource(!1), this.children.set(this.getPlatformAwareName(e.name), e);
	}
	getChild(e) {
		return this.children.get(this.getPlatformAwareName(e));
	}
	fetchChildren(t) {
		let n = this.configService.getValue({ resource: this.root.resource }).explorer.fileNesting;
		return n.enabled && this.nestedChildren ? this.nestedChildren : (async () => {
			if (!this._isDirectoryResolved) {
				let n = t === Ir.Modified;
				this.error = void 0;
				try {
					let t = await this.fileService.resolve(this.resource, {
						resolveSingleChildDescendants: !0,
						resolveMetadata: n
					}), r = e.create(this.fileService, this.configService, this.filesConfigService, t, this);
					e.mergeLocalWithDisk(r, this);
				} catch (e) {
					throw this.error = e, e;
				}
				this._isDirectoryResolved = !0;
			}
			let r = [];
			if (n.enabled) {
				let e = [], t = [];
				for (let n of this.children.entries()) n[1].nestedParent = void 0, n[1].isDirectory ? t.push(n) : e.push(n);
				let n = this.fileNester.nest(e.map(([e]) => e), this.getPlatformAwareName(this.name));
				for (let [t, i] of e) {
					let e = n.get(t);
					if (e !== void 0) {
						i.nestedChildren = [];
						for (let t of e.keys()) {
							let e = C(this.children.get(t));
							i.nestedChildren.push(e), e.nestedParent = i;
						}
						r.push(i);
					} else i.nestedChildren = void 0;
				}
				for (let [e, n] of t.values()) r.push(n);
			} else this.children.forEach((e) => {
				r.push(e);
			});
			return r;
		})();
	}
	get fileNester() {
		if (!this.root._fileNester) {
			let e = this.configService.getValue({ resource: this.root.resource }).explorer.fileNesting, t = Object.entries(e.patterns).filter((e) => typeof e[0] == "string" && typeof e[1] == "string" && e[0] && e[1]).map(([e, t]) => [this.getPlatformAwareName(e.trim()), t.split(",").map((e) => this.getPlatformAwareName(e.trim().replace(/\u200b/g, "").trim())).filter((e) => e !== "")]);
			this.root._fileNester = new _i(t);
		}
		return this.root._fileNester;
	}
	removeChild(e) {
		this.nestedChildren = void 0, this.children.delete(this.getPlatformAwareName(e.name));
	}
	forgetChildren() {
		this.children.clear(), this.nestedChildren = void 0, this._isDirectoryResolved = !1, this._fileNester = void 0;
	}
	getPlatformAwareName(e) {
		return this.fileService.hasCapability(this.resource, _t.PathCaseSensitive) ? e : e.toLowerCase();
	}
	move(e) {
		this.nestedParent?.removeChild(this), this._parent?.removeChild(this), e.removeChild(this), e.addChild(this), this.updateResource(!0);
	}
	updateResource(e) {
		this._parent && (this.resource = Bt(this._parent.resource, this.name)), e && this.isDirectory && this.children.forEach((e) => {
			e.updateResource(!0);
		});
	}
	rename(e) {
		this.updateName(e.name), this._mtime = e.mtime, this.updateResource(!0);
	}
	find(e) {
		let t = !this.fileService.hasCapability(e, _t.PathCaseSensitive);
		return e && this.resource.scheme === e.scheme && l(this.resource.authority, e.authority) && (t ? et(e.path, this.resource.path) : e.path.startsWith(this.resource.path)) ? this.findByPath(Ot(e.path, Me.sep), this.resource.path.length, t) : null;
	}
	findByPath(e, t, n) {
		if (Yt(Ot(this.resource.path, Me.sep), e, n)) return this;
		if (this.isDirectory) {
			for (; t < e.length && e[t] === Me.sep;) t++;
			let r = e.indexOf(Me.sep, t);
			r === -1 && (r = e.length);
			let i = e.substring(t, r), a = this.children.get(this.getPlatformAwareName(i));
			if (a) return a.findByPath(e, r, n);
		}
		return null;
	}
	isMarkedAsFiltered() {
		return this.markedAsFindResult;
	}
	markItemAndParentsAsFiltered() {
		this.markedAsFindResult = !0, this.parent?.markItemAndParentsAsFiltered();
	}
	unmarkItemAndChildren() {
		this.markedAsFindResult = !1, this.children.forEach((e) => e.unmarkItemAndChildren());
	}
};
Si.__decorator = f([Ge], Si.prototype, "children", null);
var Ci = class extends Si {
	constructor(e, t, n, r, i) {
		super(E.file(""), e, t, n, r, i), this._isDirectoryResolved = !0;
	}
};
T(), F(), ge(), d(), fe(), Qt();
function wi(e) {
	let t = e.get(St).lastFocusedList, n = t?.getHTMLElement();
	if (n && He(n) && t instanceof ce) {
		let e = A(t.getSelectedElements().filter((e) => e instanceof Lr)), n = t.getFocusedElements(), r = n.length ? n[0] : void 0, i;
		return r instanceof Lr && (i = r), e.some((e) => e === i) ? e : i ? [i] : void 0;
	}
}
je(), Dt(), m(), xe(), F(), Rn(), mn(), B(), J(), on(), x();
async function Ti(e, t) {
	let n = e.get(z), r = e.get(a), i = e.get(tr), o = wi(e);
	if (!o) {
		let e = n.activeGroup;
		e.activeEditor && (o = [], e.activeEditor instanceof K && !t?.saveAs && !(e.activeEditor.primary.hasCapability(V.Untitled) || e.activeEditor.secondary.hasCapability(V.Untitled)) && e.activeEditor.secondary.isModified() ? (o.push({
			groupId: e.id,
			editor: e.activeEditor.primary
		}), o.push({
			groupId: e.id,
			editor: e.activeEditor.secondary
		})) : o.push({
			groupId: e.id,
			editor: e.activeEditor
		}));
	}
	if (!o || o.length === 0) return;
	await Di(e, o, t);
	let s = r.getFocusedCodeEditor();
	if (s instanceof Cr && !s.isSimpleWidget) {
		let e = s.getModel()?.uri;
		e && !o.some(({ editor: t }) => y(Sn.getCanonicalUri(t, { supportSideBySide: q.PRIMARY }), e)) && (i.files.get(e)?.isReadonly() || await i.save(e, t));
	}
}
function Ei(e, t, n) {
	let r = [];
	for (let e of t) for (let t of e.getEditors(R.MOST_RECENTLY_ACTIVE)) t.isDirty() && r.push({
		groupId: e.id,
		editor: t
	});
	return Di(e, r, n);
}
async function Di(e, t, n) {
	let r = e.get(H), a = e.get(pe), o = e.get(_);
	try {
		await r.save(t, n);
	} catch (e) {
		if (!mt(e)) {
			let s = [de({
				id: "workbench.action.files.saveEditors",
				label: i(8064, "Retry"),
				run: () => o.invokeFunction((e) => Di(e, t, n))
			})], c = t.filter(({ editor: e }) => !e.hasCapability(V.Untitled));
			c.length > 0 && s.push(de({
				id: "workbench.action.files.revertEditors",
				label: c.length > 1 ? i(8065, "Revert All") : i(8066, "Revert"),
				run: () => r.revert(c)
			})), a.notify({
				id: t.map(({ editor: e }) => xt(e.resource?.toString())).join(),
				severity: Ue.Error,
				message: i(8067, "Failed to save '{0}': {1}", t.map(({ editor: e }) => e.getName()).join(", "), Ae(e, !1)),
				actions: { primary: s }
			});
		}
	}
}
re.registerCommandAndKeybindingRule({
	when: void 0,
	weight: ke.WorkbenchContrib,
	primary: S.CtrlCmd | D.KeyS,
	id: Pr,
	handler: (e) => Ti(e, {
		reason: L.EXPLICIT,
		force: !0
	})
}), re.registerCommandAndKeybindingRule({
	when: void 0,
	weight: ke.WorkbenchContrib,
	primary: kt(S.CtrlCmd | D.KeyK, D.KeyS),
	win: { primary: kt(S.CtrlCmd | D.KeyK, S.CtrlCmd | S.Shift | D.KeyS) },
	id: kr,
	handler: (e) => Ti(e, {
		reason: L.EXPLICIT,
		force: !0,
		skipSaveParticipants: !0
	})
}), re.registerCommandAndKeybindingRule({
	id: Or,
	weight: ke.WorkbenchContrib,
	when: void 0,
	primary: S.CtrlCmd | S.Shift | D.KeyS,
	handler: (e) => Ti(e, {
		reason: L.EXPLICIT,
		saveAs: !0
	})
}), re.registerCommandAndKeybindingRule({
	when: void 0,
	weight: ke.WorkbenchContrib,
	primary: void 0,
	mac: { primary: S.CtrlCmd | S.Alt | D.KeyS },
	win: { primary: kt(S.CtrlCmd | D.KeyK, D.KeyS) },
	id: Mr,
	handler: (e) => Ei(e, e.get(z).getGroups(I.MOST_RECENTLY_ACTIVE), { reason: L.EXPLICIT })
}), ve.registerCommand({
	id: Nr,
	handler: (e, t, n) => {
		let r = e.get(z), i = li([n], e.get(H), r, e.get(St)), a;
		return a = i.groupedEditors.length ? i.groupedEditors.map(({ group: e }) => e) : r.getGroups(I.MOST_RECENTLY_ACTIVE), Ei(e, a, { reason: L.EXPLICIT });
	}
}), ve.registerCommand({
	id: jr,
	handler: async (e) => (await e.get(H).saveAll({
		includeUntitled: !1,
		reason: L.EXPLICIT
	})).success
}), ve.registerCommand({
	id: Fr,
	handler: async (e) => {
		let t = e.get(z), n = e.get(H), r = wi(e);
		if (!r) {
			let e = t.activeGroup;
			e.activeEditor && (r = [{
				groupId: e.id,
				editor: e.activeEditor
			}]);
		}
		if (!(!r || r.length === 0)) try {
			await n.revert(r.filter(({ editor: e }) => !e.hasCapability(V.Untitled)), { force: !0 });
		} catch (t) {
			e.get(pe).error(i(8068, "Failed to revert '{0}': {1}", r.map(({ editor: e }) => e.getName()).join(", "), Ae(t, !1)));
		}
	}
});
//#endregion
export { Qr as a, Wr as c, ai as i, Hr as l, Q as n, Jr as o, si as r, Kr as s, li as t };
