import { $o as e, Ab as t, Aw as n, Bb as r, Bo as i, Dl as a, El as o, Fa as s, Jt as c, Jy as ee, Lb as l, Lp as u, Nl as d, Ob as f, PM as p, Pa as te, Pl as m, Vo as h, Wo as g, Xy as _, _j as ne, bM as v, cs as y, e_ as re, em as b, gs as x, hc as S, hs as C, ij as w, kb as T, mc as E, n as D, pw as O, r as k, rs as A, t_ as j, tm as M, vD as ie, yD as N, zo as ae } from "./standaloneServices-C51B94Xh.js";
import { it as P } from "./configuration.service-Bga69j3H.js";
import { _ as oe, a as se, x as ce } from "./editorResolverService-CZFxBDpH.js";
import { F as le, cx as ue, lx as de, oa as fe, wf as F, yf as I } from "./monaco-vscode-extensions-service-override-CcXiXb-p.js";
import { At as L, B as R, Dt as z, E as B, Et as V, H as pe, jt as me, q as H, w as he, z as U } from "./monaco-vscode-files-service-override-DGMr6mGW.js";
import { $t as ge, I as _e, L as ve, Ot as W, P as ye, R as be, U as G, W as xe, Y as Se, Z as Ce, gn as K, jt as we, kt as Te, ln as q } from "./filesConfigurationService-CxZOIrXS.js";
import "./monaco-BGOsyT4t.js";
import { n as Ee, t as De } from "./editor-BOmHBVeV.js";
import { _ as Oe, c as ke, i as Ae, l as je, n as Me, o as Ne, r as Pe, t as Fe, u as Ie } from "./views-D2Wp5UKE.js";
t(), p(), n(), E(), w(), N(), k(), j(), a(), x(), M(), r(), m(), _(), g(), i(), A(), s(), ge(), F(), de(), Ce(), xe(), Te(), me(), pe(), _e(), be(), z(), he(), ce(), oe(), fe(), u(), we(), se(), c(), le();
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
	return D.get(d).getPart(e);
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
	let e = D.get(G).mainPart.getContainer();
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
Q = f([T(1, l)], Q);
var $ = (e) => e;
B(async (t) => {
	let n = t.get(V), r = t.get(ue), i = t.get(ve), a = t.get(ae), s = t.get(G), c = t.get(W), l = t.get(ee), u = t.get(L), f = t.get(o), p = t.get(te), m = t.get(re), g = t.get(C), _ = t.get(d);
	function b() {
		let e = f.options?.defaultLayout;
		if ((e?.editors != null && e.editors.length > 0 || e?.layout?.editors != null) && ((e.force ?? !1) || a.isNew(h.WORKSPACE))) return {
			layout: e.layout?.editors,
			filesToOpenOrCreate: e.editors?.map((e) => ({
				viewColumn: e.viewColumn,
				fileUri: ie.revive(e.uri),
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
	function x(e, t) {
		let n = e.options?.defaultLayout;
		if (n == null || !(n.force ?? !1) && !t.isNew(h.WORKSPACE)) return;
		let { views: r } = n;
		if (r != null && r.length > 0) return r.map((e) => e.id);
	}
	function w(e, t) {
		return y(e.getWorkspace()) ? !1 : m.getValue("window.restoreWindows") === "preserve" || t === void 0;
	}
	async function T(t, n) {
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
	let E = b();
	E != null && l.info("Initial editor state", E);
	let D = {
		layout: { editors: E?.layout },
		editor: {
			restoreEditors: w(p, E),
			editorsToOpen: T(g, E)
		},
		views: {
			defaults: x(f, a),
			containerToRestore: {}
		}
	};
	function k(e) {
		return r.getDefaultViewContainer(e) ?? r.getViewContainersByLocation(e)[0];
	}
	function A() {
		if (_.isVisible(U.SIDEBAR_PART)) {
			let e;
			e = !f.isBuilt || i.startupKind === ye.ReloadedWindow || ne ? a.get(ke.activeViewletSettingsKey, h.WORKSPACE, k(I.Sidebar)?.id) : k(I.Sidebar)?.id, D.views.containerToRestore.sideBar = e;
		}
		if (_.isVisible(U.PANEL_PART)) {
			let e = a.get(je.activePanelSettingsKey, h.WORKSPACE, k(I.Panel)?.id);
			D.views.containerToRestore.panel = e;
		}
		if (_.isVisible(U.AUXILIARYBAR_PART)) {
			let e = a.get(Oe.activeViewSettingsKey, h.WORKSPACE, k(I.AuxiliaryBar)?.id);
			D.views.containerToRestore.auxiliaryBar = e;
		}
	}
	A(), D = $(D), D.views.containerToRestore.sideBar ?? _.setPartHidden(!0, U.SIDEBAR_PART), D.views.containerToRestore.panel ?? _.setPartHidden(!0, U.PANEL_PART), D.views.containerToRestore.auxiliaryBar ?? _.setPartHidden(!0, U.AUXILIARYBAR_PART);
	let j = document.createElement("div");
	j.style.display = "none", document.body.append(j);
	for (let { id: e, role: t, classes: n, options: r, getPosition: i, onDidChangePosition: a } of [
		{
			id: U.TITLEBAR_PART,
			role: "none",
			classes: ["titlebar"]
		},
		{
			id: U.BANNER_PART,
			role: "banner",
			classes: ["banner"]
		},
		{
			id: U.ACTIVITYBAR_PART,
			role: "none",
			classes: ["activitybar"],
			getPosition: () => _.getSideBarPosition(),
			onDidChangePosition: _.onDidChangeSideBarPosition
		},
		{
			id: U.SIDEBAR_PART,
			role: "none",
			classes: ["sidebar"],
			getPosition: () => _.getSideBarPosition(),
			onDidChangePosition: _.onDidChangeSideBarPosition
		},
		{
			id: U.EDITOR_PART,
			role: "main",
			classes: ["editor"],
			options: { restorePreviousState: D.editor.restoreEditors }
		},
		{
			id: U.PANEL_PART,
			role: "none",
			classes: ["panel", "basepanel"],
			getPosition: () => _.getPanelPosition(),
			onDidChangePosition: _.onDidChangePanelPosition
		},
		{
			id: U.AUXILIARYBAR_PART,
			role: "none",
			classes: ["auxiliarybar", "basepanel"],
			getPosition: () => _.getSideBarPosition() === R.LEFT ? R.RIGHT : R.LEFT,
			onDidChangePosition: _.onDidChangeSideBarPosition
		},
		{
			id: U.STATUSBAR_PART,
			role: "status",
			classes: ["statusbar"]
		}
	]) {
		let o = _.getPart(e);
		if (o != null) {
			let s = Le(e, t, n);
			if (o.create(s, r), Re(s, o), o.layout(9999, 9999, 0, 0), j.append(s), i != null) {
				let e = i();
				o.element.classList.add(H(e)), a?.(() => {
					o.element.classList.remove(H(e)), e = i(), o.element.classList.add(H(e));
				});
			}
		}
	}
	let M = [], N = [];
	M.push((async () => {
		S("code/willRestoreEditors"), await s.mainPart.whenReady, S("code/restoreEditors/editorGroupsReady"), D.layout?.editors != null && s.applyLayout(D.layout.editors);
		let e = await D.editor.editorsToOpen;
		S("code/restoreEditors/editorsToOpenResolved");
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
		N.push(Promise.all([t?.finally(() => S("code/restoreEditors/editorsOpened")), s.mainPart.whenRestored.finally(() => S("code/restoreEditors/editorGroupsRestored"))]).finally(() => {
			S("code/didRestoreEditors");
		}));
	})());
	let P = (async () => {
		if (D.views.defaults != null && D.views.defaults.length > 0) {
			S("code/willOpenDefaultViews");
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
			}, n = [...D.views.defaults].reverse().map((e, t) => ({
				id: e,
				order: t
			})), i = n.length;
			for (; i > 0;) i--, t(n[i]) && n.splice(i, 1);
			if (n.length > 0) {
				await u.whenInstalledExtensionsRegistered();
				let e = n.length;
				for (; e > 0;) e--, t(n[e]) && n.splice(e, 1);
			}
			e[I.Sidebar] != null && (D.views.containerToRestore.sideBar = e[I.Sidebar].id), e[I.Panel] != null && (D.views.containerToRestore.panel = e[I.Panel].id), e[I.AuxiliaryBar] != null && (D.views.containerToRestore.auxiliaryBar = e[I.AuxiliaryBar].id), S("code/didOpenDefaultViews");
		}
	})();
	M.push(P), M.push((async () => {
		await P, D.views.containerToRestore.sideBar != null && (S("code/willRestoreViewlet"), await n.openPaneComposite(D.views.containerToRestore.sideBar, I.Sidebar) ?? await n.openPaneComposite(k(I.Sidebar)?.id, I.Sidebar), S("code/didRestoreViewlet"));
	})()), M.push((async () => {
		await P, D.views.containerToRestore.panel != null && (S("code/willRestorePanel"), await n.openPaneComposite(D.views.containerToRestore.panel, I.Panel) ?? await n.openPaneComposite(k(I.Panel)?.id, I.Panel), S("code/didRestorePanel"));
	})()), M.push((async () => {
		await P, D.views.containerToRestore.auxiliaryBar != null && (S("code/willRestoreAuxiliaryBar"), await n.openPaneComposite(D.views.containerToRestore.auxiliaryBar, I.AuxiliaryBar) ?? await n.openPaneComposite(k(I.AuxiliaryBar)?.id, I.AuxiliaryBar), S("code/didRestoreAuxiliaryBar"));
	})()), await O.settled(M), await O.settled(N);
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
		...P({
			isKeybindingConfigurationVisible: Z,
			shouldUseGlobalPicker: Z
		}),
		...Ne({ shouldUseGlobalKeybindings: Z }),
		[G.toString()]: new b(Q, [e], !1),
		[W.toString()]: new b(Ee, [e, Z], !1)
	};
}
//#endregion
export { U as Parts, R as Position, Be as attachPart, He as default, Fe as getSideBarPosition, Me as isPartVisibile, Pe as onDidChangeSideBarPosition, X as onPartVisibilityChange };
