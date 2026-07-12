import { $o as e, Ab as t, Aw as n, Bb as r, Bo as i, Dl as a, El as o, Fa as s, Jt as c, Jy as ee, Lb as l, Lp as u, Nl as d, Ob as f, PM as p, Pa as te, Pl as m, Vo as h, Wo as g, Xy as _, _j as ne, bM as v, cs as y, e_ as b, em as x, gs as S, hc as C, hs as w, ij as T, kb as E, mc as D, n as O, pw as k, r as A, rs as j, t_ as M, tm as N, vD as re, yD as P, zo as ie } from "./standaloneServices-C51B94Xh.js";
import { it as F } from "./configuration.service-DJ_Qr0zd.js";
import { _ as ae, a as oe, x as se } from "./editorResolverService-CZFxBDpH.js";
import { F as ce, cx as le, lx as ue, oa as de, wf as I, yf as L } from "./monaco-vscode-extensions-service-override-B4FJQig8.js";
import { C as R, Ct as z, Dt as B, I as V, L as H, Ot as fe, W as U, wt as pe, x as me, z as he } from "./monaco-vscode-files-service-override-BUohVD35.js";
import { $t as ge, I as _e, L as ve, Ot as W, P as ye, R as be, U as G, W as xe, Y as Se, Z as Ce, gn as K, jt as we, kt as Te, ln as q } from "./filesConfigurationService-CxZOIrXS.js";
import "./monaco-CmK_qFKQ.js";
import { n as Ee, t as De } from "./editor-BOmHBVeV.js";
import { _ as Oe, c as ke, i as Ae, l as je, n as Me, o as Ne, r as Pe, t as Fe, u as Ie } from "./views-BO0VClTM.js";
t(), p(), n(), D(), T(), P(), A(), M(), a(), S(), N(), r(), m(), _(), g(), i(), j(), s(), ge(), I(), ue(), Ce(), xe(), Te(), fe(), he(), _e(), be(), pe(), me(), se(), ae(), de(), u(), we(), oe(), c(), ce();
function Le(e, t, n) {
	let r = document.createElement(t === "status" ? "footer" : "div");
	return r.classList.add("part", "monaco-workbench-part", ...n), r.id = e, r.setAttribute("role", t), t === "status" && r.setAttribute("aria-live", "off"), r;
}
function J(e) {
	let t = e.getContainer()?.parentNode;
	t != null && e.layout(Math.max(e.minimumWidth, Math.min(e.maximumWidth, t.offsetWidth)), Math.max(e.minimumHeight, Math.min(e.maximumHeight, t.offsetHeight)), t.offsetTop, t.offsetLeft);
}
function Re(e, t) {
	e.oncontextmenu = () => !1;
	function n() {
		J(t);
	}
	t.onDidVisibilityChange((e) => {
		e && n();
	}), n();
}
function Y(e) {
	return O.get(d).getPart(e);
}
function ze(e, t) {
	t.append(e.getContainer());
	let n = new ResizeObserver(() => J(e));
	return n.observe(t), { dispose() {
		return n.disconnect();
	} };
}
function Be(e, t) {
	let n = Y(e);
	if (n == null) throw Error("Part not found");
	return ze(n, t);
}
function X(e, t) {
	let n = Y(e);
	if (n == null) throw Error("Part not found");
	return n.onDidVisibilityChange(t);
}
function Ve(e) {
	return e.isConnected ? e.checkVisibility == null ? e.offsetHeight > 0 && e.offsetWidth > 0 : e.checkVisibility({
		checkOpacity: !0,
		checkVisibilityCSS: !0
	}) : !1;
}
function Z() {
	let e = O.get(G).mainPart.getContainer();
	return e != null && Ve(e);
}
var Q = class extends De {
	constructor(e, t) {
		super(t.createInstance(Ie), !1, e, t), this.restoreGroup = (...e) => this.delegate.restoreGroup(...e);
	}
	getId() {
		return "standalone";
	}
	updateStyles() {}
	registerPart(e) {
		return this.delegate.registerPart(e);
	}
	bind(e, t) {
		return this.delegate.bind(e, t);
	}
	get activePart() {
		return this.delegate.activePart;
	}
};
Q = f([E(1, l)], Q);
var $ = (e) => e;
R(async (t) => {
	let n = t.get(z), r = t.get(le), i = t.get(ve), a = t.get(ie), s = t.get(G), c = t.get(W), l = t.get(ee), u = t.get(B), f = t.get(o), p = t.get(te), m = t.get(b), g = t.get(w), _ = t.get(d);
	function x() {
		let e = f.options?.defaultLayout;
		if ((e?.editors != null && e.editors.length > 0 || e?.layout?.editors != null) && ((e.force ?? !1) || a.isNew(h.WORKSPACE))) return {
			layout: e.layout?.editors,
			filesToOpenOrCreate: e.editors?.map((e) => ({
				viewColumn: e.viewColumn,
				fileUri: re.revive(e.uri),
				openOnlyIfExists: e.openOnlyIfExists,
				options: e.options
			}))
		};
		let { filesToOpenOrCreate: t, filesToDiff: n, filesToMerge: r } = f;
		if (t != null || n != null || r != null) return {
			filesToOpenOrCreate: t,
			filesToDiff: n,
			filesToMerge: r
		};
	}
	function S(e, t) {
		let n = e.options?.defaultLayout;
		if (n == null || !(n.force ?? !1) && !t.isNew(h.WORKSPACE)) return;
		let { views: r } = n;
		if (r != null && r.length > 0) return r.map((e) => e.id);
	}
	function T(e, t) {
		return y(e.getWorkspace()) ? !1 : m.getValue("window.restoreWindows") === "preserve" || t === void 0;
	}
	async function E(t, n) {
		if (n != null) {
			let e = v(await K(n.filesToMerge, t, l));
			if (e.length === 4 && q(e[0]) && q(e[1]) && q(e[2]) && q(e[3])) return [{ editor: {
				input1: { resource: e[0].resource },
				input2: { resource: e[1].resource },
				base: { resource: e[2].resource },
				result: { resource: e[3].resource },
				options: { pinned: !0 }
			} }];
			let r = v(await K(n.filesToDiff, t, l));
			if (r.length === 2) return [{ editor: {
				original: { resource: r[0].resource },
				modified: { resource: r[1].resource },
				options: { pinned: !0 }
			} }];
			let i = [], a = await K(n.filesToOpenOrCreate, t, l);
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t != null && i.push({
					editor: t,
					viewColumn: n.filesToOpenOrCreate?.[e].viewColumn
				});
			}
			return i;
		} else if (p.getWorkbenchState() === e.EMPTY && m.getValue("workbench.startupEditor") === "newUntitledFile") return s.mainPart.hasRestorableState ? [] : [{ editor: { resource: void 0 } }];
		return [];
	}
	let D = x();
	D != null && l.info("Initial editor state", D);
	let O = {
		layout: { editors: D?.layout },
		editor: {
			restoreEditors: T(p, D),
			editorsToOpen: E(g, D)
		},
		views: {
			defaults: S(f, a),
			containerToRestore: {}
		}
	};
	function A(e) {
		return r.getDefaultViewContainer(e) ?? r.getViewContainersByLocation(e)[0];
	}
	function j() {
		if (_.isVisible(V.SIDEBAR_PART)) {
			let e;
			e = !f.isBuilt || i.startupKind === ye.ReloadedWindow || ne ? a.get(ke.activeViewletSettingsKey, h.WORKSPACE, A(L.Sidebar)?.id) : A(L.Sidebar)?.id, O.views.containerToRestore.sideBar = e;
		}
		if (_.isVisible(V.PANEL_PART)) {
			let e = a.get(je.activePanelSettingsKey, h.WORKSPACE, A(L.Panel)?.id);
			O.views.containerToRestore.panel = e;
		}
		if (_.isVisible(V.AUXILIARYBAR_PART)) {
			let e = a.get(Oe.activeViewSettingsKey, h.WORKSPACE, A(L.AuxiliaryBar)?.id);
			O.views.containerToRestore.auxiliaryBar = e;
		}
	}
	j(), O = $(O), O.views.containerToRestore.sideBar ?? _.setPartHidden(!0, V.SIDEBAR_PART), O.views.containerToRestore.panel ?? _.setPartHidden(!0, V.PANEL_PART), O.views.containerToRestore.auxiliaryBar ?? _.setPartHidden(!0, V.AUXILIARYBAR_PART);
	let M = document.createElement("div");
	M.style.display = "none", document.body.append(M);
	for (let { id: e, role: t, classes: n, options: r, getPosition: i, onDidChangePosition: a } of [
		{
			id: V.TITLEBAR_PART,
			role: "none",
			classes: ["titlebar"]
		},
		{
			id: V.BANNER_PART,
			role: "banner",
			classes: ["banner"]
		},
		{
			id: V.ACTIVITYBAR_PART,
			role: "none",
			classes: ["activitybar"],
			getPosition: () => _.getSideBarPosition(),
			onDidChangePosition: _.onDidChangeSideBarPosition
		},
		{
			id: V.SIDEBAR_PART,
			role: "none",
			classes: ["sidebar"],
			getPosition: () => _.getSideBarPosition(),
			onDidChangePosition: _.onDidChangeSideBarPosition
		},
		{
			id: V.EDITOR_PART,
			role: "main",
			classes: ["editor"],
			options: { restorePreviousState: O.editor.restoreEditors }
		},
		{
			id: V.PANEL_PART,
			role: "none",
			classes: ["panel", "basepanel"],
			getPosition: () => _.getPanelPosition(),
			onDidChangePosition: _.onDidChangePanelPosition
		},
		{
			id: V.AUXILIARYBAR_PART,
			role: "none",
			classes: ["auxiliarybar", "basepanel"],
			getPosition: () => _.getSideBarPosition() === H.LEFT ? H.RIGHT : H.LEFT,
			onDidChangePosition: _.onDidChangeSideBarPosition
		},
		{
			id: V.STATUSBAR_PART,
			role: "status",
			classes: ["statusbar"]
		}
	]) {
		let o = _.getPart(e);
		if (o != null) {
			let s = Le(e, t, n);
			if (o.create(s, r), Re(s, o), o.layout(9999, 9999, 0, 0), M.append(s), i != null) {
				let e = i();
				o.element.classList.add(U(e)), a?.(() => {
					o.element.classList.remove(U(e)), e = i(), o.element.classList.add(U(e));
				});
			}
		}
	}
	let N = [], P = [];
	N.push((async () => {
		C("code/willRestoreEditors"), await s.mainPart.whenReady, C("code/restoreEditors/editorGroupsReady"), O.layout?.editors != null && s.applyLayout(O.layout.editors);
		let e = await O.editor.editorsToOpen;
		C("code/restoreEditors/editorsToOpenResolved");
		let t;
		if (e.length > 0) {
			let n = s.getGroups(Se.GRID_APPEARANCE), r = /* @__PURE__ */ new Map();
			for (let t of e) {
				let e = n[(t.viewColumn ?? 1) - 1], i = r.get(e.id);
				i ?? (i = /* @__PURE__ */ new Set(), r.set(e.id, i)), i.add(t.editor);
			}
			t = Promise.all(Array.from(r).map(async ([e, t]) => {
				try {
					await c.openEditors(Array.from(t), e, { validateTrust: !0 });
				} catch (e) {
					l.error(e);
				}
			}));
		}
		P.push(Promise.all([t?.finally(() => C("code/restoreEditors/editorsOpened")), s.mainPart.whenRestored.finally(() => C("code/restoreEditors/editorGroupsRestored"))]).finally(() => {
			C("code/didRestoreEditors");
		}));
	})());
	let F = (async () => {
		if (O.views.defaults != null && O.views.defaults.length > 0) {
			C("code/willOpenDefaultViews");
			let e = [], t = (t) => {
				let n = r.getViewLocationById(t.id);
				if (n !== null) {
					let i = r.getViewContainerByViewId(t.id);
					if (i != null) {
						t.order >= (e[n]?.order ?? 0) && (e[n] = {
							id: i.id,
							order: t.order
						});
						let a = r.getViewContainerModel(i);
						return a.setCollapsed(t.id, !1), a.setVisible(t.id, !0), !0;
					}
				}
				return !1;
			}, n = [...O.views.defaults].reverse().map((e, t) => ({
				id: e,
				order: t
			})), i = n.length;
			for (; i > 0;) i--, t(n[i]) && n.splice(i, 1);
			if (n.length > 0) {
				await u.whenInstalledExtensionsRegistered();
				let e = n.length;
				for (; e > 0;) e--, t(n[e]) && n.splice(e, 1);
			}
			e[L.Sidebar] != null && (O.views.containerToRestore.sideBar = e[L.Sidebar].id), e[L.Panel] != null && (O.views.containerToRestore.panel = e[L.Panel].id), e[L.AuxiliaryBar] != null && (O.views.containerToRestore.auxiliaryBar = e[L.AuxiliaryBar].id), C("code/didOpenDefaultViews");
		}
	})();
	N.push(F), N.push((async () => {
		await F, O.views.containerToRestore.sideBar != null && (C("code/willRestoreViewlet"), await n.openPaneComposite(O.views.containerToRestore.sideBar, L.Sidebar) ?? await n.openPaneComposite(A(L.Sidebar)?.id, L.Sidebar), C("code/didRestoreViewlet"));
	})()), N.push((async () => {
		await F, O.views.containerToRestore.panel != null && (C("code/willRestorePanel"), await n.openPaneComposite(O.views.containerToRestore.panel, L.Panel) ?? await n.openPaneComposite(A(L.Panel)?.id, L.Panel), C("code/didRestorePanel"));
	})()), N.push((async () => {
		await F, O.views.containerToRestore.auxiliaryBar != null && (C("code/willRestoreAuxiliaryBar"), await n.openPaneComposite(O.views.containerToRestore.auxiliaryBar, L.AuxiliaryBar) ?? await n.openPaneComposite(A(L.AuxiliaryBar)?.id, L.AuxiliaryBar), C("code/didRestoreAuxiliaryBar"));
	})()), await k.settled(N), await k.settled(P);
});
function He(e, t, n) {
	return n != null && ($ = typeof n == "boolean" ? (e) => ({
		...e,
		editor: {
			...e.editor,
			restoreEditors: n
		}
	}) : n), {
		...Ae(t),
		...F({
			isKeybindingConfigurationVisible: Z,
			shouldUseGlobalPicker: Z
		}),
		...Ne({ shouldUseGlobalKeybindings: Z }),
		[G.toString()]: new x(Q, [e], !1),
		[W.toString()]: new x(Ee, [e, Z], !1)
	};
}
//#endregion
export { V as Parts, H as Position, Be as attachPart, He as default, Fe as getSideBarPosition, Me as isPartVisibile, Pe as onDidChangeSideBarPosition, X as onPartVisibilityChange };
