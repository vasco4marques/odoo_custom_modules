import { $u as e, Ay as t, Bb as n, CM as r, DN as i, FA as a, Fd as o, Kl as s, MA as c, Nb as ee, OE as l, ON as u, Pb as d, Pd as f, Wk as p, ad as te, bc as m, bd as ne, cc as h, dE as g, dd as re, ed as _, fc as v, gD as y, hD as b, hd as x, jk as S, kN as C, ky as ie, lM as w, lc as T, n as E, nn as D, od as O, r as k, rp as A, sc as ae, tp as oe, xc as j, zb as M } from "./standaloneServices-DUdtGggg.js";
import { $t as N, A as se, E as ce, Et as le, M as ue, N as P, Ot as F, P as I, T as L, _t as R, bt as z, gn as B, ln as V, xt as H } from "./textfiles-GCUcfhe8.js";
import { Xa as U, mo as de, uo as fe } from "./embeddedCodeEditorWidget-DPX_ivX-.js";
import { n as pe, t as me } from "./editor-CUnbW-4h.js";
import { A as he, B as ge, G as W, L as G, R as K, S as _e, Xn as ve, Yn as ye, b as be, j as xe } from "./monaco-vscode-files-service-override-7u1fRyMX.js";
import { Qp as Se, _s as Ce, dn as we, hm as Te, um as q, vs as Ee } from "./monaco-vscode-extensions-service-override-DXU-yJ4u.js";
import { Q as De } from "./services-Bnks5LpF.js";
import "./monaco-BhqF1Hm6.js";
import { _ as Oe, c as ke, i as Ae, l as je, n as Me, o as Ne, r as Pe, t as Fe, u as Ie } from "./views-pKotJpJG.js";
C(), r(), l(), m(), S(), y(), k(), d(), o(), t(), n(), a(), _(), A(), v(), h(), x(), O(), N(), Te(), Ee(), F(), I(), H(), ve(), ge(), ue(), ce(), xe(), be(), de(), fe(), Se(), s(), R(), U(), D(), we();
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
function Y(t) {
	return E.get(e).getPart(t);
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
	let e = E.get(P).mainPart.getContainer();
	return e != null && Ve(e);
}
var Q = class extends me {
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
Q = i([u(1, c)], Q);
var $ = (e) => e;
_e(async (t) => {
	let n = t.get(he), r = t.get(Ce), i = t.get(L), a = t.get(ae), o = t.get(P), s = t.get(z), c = t.get(oe), l = t.get(ye), u = t.get(f), d = t.get(te), m = t.get(ee), h = t.get(ie), _ = t.get(e);
	function v() {
		let e = u.options?.defaultLayout;
		if ((e?.editors != null && e.editors.length > 0 || e?.layout?.editors != null) && ((e.force ?? !1) || a.isNew(T.WORKSPACE))) return {
			layout: e.layout?.editors,
			filesToOpenOrCreate: e.editors?.map((e) => ({
				viewColumn: e.viewColumn,
				fileUri: b.revive(e.uri),
				openOnlyIfExists: e.openOnlyIfExists,
				options: e.options
			}))
		};
		let { filesToOpenOrCreate: t, filesToDiff: n, filesToMerge: r } = u;
		if (t != null || n != null || r != null) return {
			filesToOpenOrCreate: t,
			filesToDiff: n,
			filesToMerge: r
		};
	}
	function y(e, t) {
		let n = e.options?.defaultLayout;
		if (n == null || !(n.force ?? !1) && !t.isNew(T.WORKSPACE)) return;
		let { views: r } = n;
		if (r != null && r.length > 0) return r.map((e) => e.id);
	}
	function x(e, t) {
		return ne(e.getWorkspace()) ? !1 : m.getValue("window.restoreWindows") === "preserve" || t === void 0;
	}
	async function S(e, t) {
		if (t != null) {
			let n = w(await B(t.filesToMerge, e, c));
			if (n.length === 4 && V(n[0]) && V(n[1]) && V(n[2]) && V(n[3])) return [{ editor: {
				input1: { resource: n[0].resource },
				input2: { resource: n[1].resource },
				base: { resource: n[2].resource },
				result: { resource: n[3].resource },
				options: { pinned: !0 }
			} }];
			let r = w(await B(t.filesToDiff, e, c));
			if (r.length === 2) return [{ editor: {
				original: { resource: r[0].resource },
				modified: { resource: r[1].resource },
				options: { pinned: !0 }
			} }];
			let i = [], a = await B(t.filesToOpenOrCreate, e, c);
			for (let e = 0; e < a.length; e++) {
				let n = a[e];
				n != null && i.push({
					editor: n,
					viewColumn: t.filesToOpenOrCreate?.[e].viewColumn
				});
			}
			return i;
		} else if (d.getWorkbenchState() === re.EMPTY && m.getValue("workbench.startupEditor") === "newUntitledFile") return o.mainPart.hasRestorableState ? [] : [{ editor: { resource: void 0 } }];
		return [];
	}
	let C = v();
	C != null && c.info("Initial editor state", C);
	let E = {
		layout: { editors: C?.layout },
		editor: {
			restoreEditors: x(d, C),
			editorsToOpen: S(h, C)
		},
		views: {
			defaults: y(u, a),
			containerToRestore: {}
		}
	};
	function D(e) {
		return r.getDefaultViewContainer(e) ?? r.getViewContainersByLocation(e)[0];
	}
	function O() {
		if (_.isVisible(G.SIDEBAR_PART)) {
			let e;
			e = !u.isBuilt || i.startupKind === se.ReloadedWindow || p ? a.get(ke.activeViewletSettingsKey, T.WORKSPACE, D(q.Sidebar)?.id) : D(q.Sidebar)?.id, E.views.containerToRestore.sideBar = e;
		}
		if (_.isVisible(G.PANEL_PART)) {
			let e = a.get(je.activePanelSettingsKey, T.WORKSPACE, D(q.Panel)?.id);
			E.views.containerToRestore.panel = e;
		}
		if (_.isVisible(G.AUXILIARYBAR_PART)) {
			let e = a.get(Oe.activeViewSettingsKey, T.WORKSPACE, D(q.AuxiliaryBar)?.id);
			E.views.containerToRestore.auxiliaryBar = e;
		}
	}
	O(), E = $(E), E.views.containerToRestore.sideBar ?? _.setPartHidden(!0, G.SIDEBAR_PART), E.views.containerToRestore.panel ?? _.setPartHidden(!0, G.PANEL_PART), E.views.containerToRestore.auxiliaryBar ?? _.setPartHidden(!0, G.AUXILIARYBAR_PART);
	let k = document.createElement("div");
	k.style.display = "none", document.body.append(k);
	for (let { id: e, role: t, classes: n, options: r, getPosition: i, onDidChangePosition: a } of [
		{
			id: G.TITLEBAR_PART,
			role: "none",
			classes: ["titlebar"]
		},
		{
			id: G.BANNER_PART,
			role: "banner",
			classes: ["banner"]
		},
		{
			id: G.ACTIVITYBAR_PART,
			role: "none",
			classes: ["activitybar"],
			getPosition: () => _.getSideBarPosition(),
			onDidChangePosition: _.onDidChangeSideBarPosition
		},
		{
			id: G.SIDEBAR_PART,
			role: "none",
			classes: ["sidebar"],
			getPosition: () => _.getSideBarPosition(),
			onDidChangePosition: _.onDidChangeSideBarPosition
		},
		{
			id: G.EDITOR_PART,
			role: "main",
			classes: ["editor"],
			options: { restorePreviousState: E.editor.restoreEditors }
		},
		{
			id: G.PANEL_PART,
			role: "none",
			classes: ["panel", "basepanel"],
			getPosition: () => _.getPanelPosition(),
			onDidChangePosition: _.onDidChangePanelPosition
		},
		{
			id: G.AUXILIARYBAR_PART,
			role: "none",
			classes: ["auxiliarybar", "basepanel"],
			getPosition: () => _.getSideBarPosition() === K.LEFT ? K.RIGHT : K.LEFT,
			onDidChangePosition: _.onDidChangeSideBarPosition
		},
		{
			id: G.STATUSBAR_PART,
			role: "status",
			classes: ["statusbar"]
		}
	]) {
		let o = _.getPart(e);
		if (o != null) {
			let s = Le(e, t, n);
			if (o.create(s, r), Re(s, o), o.layout(9999, 9999, 0, 0), k.append(s), i != null) {
				let e = i();
				o.element.classList.add(W(e)), a?.(() => {
					o.element.classList.remove(W(e)), e = i(), o.element.classList.add(W(e));
				});
			}
		}
	}
	let A = [], M = [];
	A.push((async () => {
		j("code/willRestoreEditors"), await o.mainPart.whenReady, j("code/restoreEditors/editorGroupsReady"), E.layout?.editors != null && o.applyLayout(E.layout.editors);
		let e = await E.editor.editorsToOpen;
		j("code/restoreEditors/editorsToOpenResolved");
		let t;
		if (e.length > 0) {
			let n = o.getGroups(le.GRID_APPEARANCE), r = /* @__PURE__ */ new Map();
			for (let t of e) {
				let e = n[(t.viewColumn ?? 1) - 1], i = r.get(e.id);
				i ?? (i = /* @__PURE__ */ new Set(), r.set(e.id, i)), i.add(t.editor);
			}
			t = Promise.all(Array.from(r).map(async ([e, t]) => {
				try {
					await s.openEditors(Array.from(t), e, { validateTrust: !0 });
				} catch (e) {
					c.error(e);
				}
			}));
		}
		M.push(Promise.all([t?.finally(() => j("code/restoreEditors/editorsOpened")), o.mainPart.whenRestored.finally(() => j("code/restoreEditors/editorGroupsRestored"))]).finally(() => {
			j("code/didRestoreEditors");
		}));
	})());
	let N = (async () => {
		if (E.views.defaults != null && E.views.defaults.length > 0) {
			j("code/willOpenDefaultViews");
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
			}, n = [...E.views.defaults].reverse().map((e, t) => ({
				id: e,
				order: t
			})), i = n.length;
			for (; i > 0;) i--, t(n[i]) && n.splice(i, 1);
			if (n.length > 0) {
				await l.whenInstalledExtensionsRegistered();
				let e = n.length;
				for (; e > 0;) e--, t(n[e]) && n.splice(e, 1);
			}
			e[q.Sidebar] != null && (E.views.containerToRestore.sideBar = e[q.Sidebar].id), e[q.Panel] != null && (E.views.containerToRestore.panel = e[q.Panel].id), e[q.AuxiliaryBar] != null && (E.views.containerToRestore.auxiliaryBar = e[q.AuxiliaryBar].id), j("code/didOpenDefaultViews");
		}
	})();
	A.push(N), A.push((async () => {
		await N, E.views.containerToRestore.sideBar != null && (j("code/willRestoreViewlet"), await n.openPaneComposite(E.views.containerToRestore.sideBar, q.Sidebar) ?? await n.openPaneComposite(D(q.Sidebar)?.id, q.Sidebar), j("code/didRestoreViewlet"));
	})()), A.push((async () => {
		await N, E.views.containerToRestore.panel != null && (j("code/willRestorePanel"), await n.openPaneComposite(E.views.containerToRestore.panel, q.Panel) ?? await n.openPaneComposite(D(q.Panel)?.id, q.Panel), j("code/didRestorePanel"));
	})()), A.push((async () => {
		await N, E.views.containerToRestore.auxiliaryBar != null && (j("code/willRestoreAuxiliaryBar"), await n.openPaneComposite(E.views.containerToRestore.auxiliaryBar, q.AuxiliaryBar) ?? await n.openPaneComposite(D(q.AuxiliaryBar)?.id, q.AuxiliaryBar), j("code/didRestoreAuxiliaryBar"));
	})()), await g.settled(A), await g.settled(M);
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
		...De({
			isKeybindingConfigurationVisible: Z,
			shouldUseGlobalPicker: Z
		}),
		...Ne({ shouldUseGlobalKeybindings: Z }),
		[P.toString()]: new M(Q, [e], !1),
		[z.toString()]: new M(pe, [e, Z], !1)
	};
}
//#endregion
export { G as Parts, K as Position, Be as attachPart, He as default, Fe as getSideBarPosition, Me as isPartVisibile, Pe as onDidChangeSideBarPosition, X as onPartVisibilityChange };
