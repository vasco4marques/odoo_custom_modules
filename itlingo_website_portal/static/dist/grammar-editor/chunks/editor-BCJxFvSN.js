import { $A as e, AA as t, Ay as n, BA as r, Cy as i, DA as a, DN as o, FA as s, JO as c, KA as l, MA as u, Md as d, NO as f, Nb as ee, Nd as te, OA as ne, ON as p, Pb as re, SA as m, Sy as h, VA as g, XE as ie, ad as _, id as v, jA as y, jk as b, kN as x, ky as ae, lo as oe, n as S, od as se, r as ce, rd as C, uj as le, uo as ue, wA as w, yD as T } from "./standaloneServices-DUdtGggg.js";
import { $t as E, Ft as D, N as O, Ot as k, P as A, Ut as j, bt as M, ln as N, nn as P, xt as F } from "./textfiles-GCUcfhe8.js";
import { Ga as I, Ha as L, Ia as R, La as z, Wa as B, _o as V, a as H, i as de, lo as U, uo as fe, vo as pe } from "./embeddedCodeEditorWidget-DPX_ivX-.js";
import { O as me, T as he, _ as ge, k as _e, w as ve, y as W } from "./fileConstants-BXb76arb.js";
import { i as ye } from "./fileCommands._save-Cc8V0c-n.js";
import { i as G, t as K } from "./tools-DMW4ALLH.js";
x(), ce(), y(), V(), F(), E(), l(), ie(), _e(), ne(), L(), i(), le(), k(), A(), s(), re(), ue(), I(), te(), se(), n(), he(), H(), fe(), v(), c(), T(), f(), b(), m(), K();
var q, J = new class {
	constructor() {
		this.selectedEditors = [], this.isSelected = () => !1, this.setSelection = G, this.isTransient = () => !1, this.windowId = w.vscodeWindowId, this.createEditorActions = G, this.onDidFocus = g.None, this.onDidOpenEditorFail = g.None, this.whenRestored = Promise.resolve(), this.disposed = !1, this.setActive = G, this.notifyIndexChanged = G, this.relayout = G, this.dispose = G, this.toJSON = G, this.minimumWidth = 0, this.maximumWidth = Infinity, this.minimumHeight = 0, this.maximumHeight = Infinity, this.onDidChange = g.None, this.layout = G, this.onDidModelChange = g.None, this.onWillDispose = g.None, this.onDidActiveEditorChange = g.None, this.onWillCloseEditor = g.None, this.onDidCloseEditor = g.None, this.onWillMoveEditor = g.None, this.onWillOpenEditor = g.None, this.id = 0, this.index = 0, this.label = "main", this.ariaLabel = "main", this.activeEditorPane = void 0, this.activeEditor = null, this.previewEditor = null, this.count = 0, this.isEmpty = !1, this.isLocked = !1, this.stickyCount = 0, this.editors = [], this.getEditors = () => [], this.findEditors = () => [], this.getEditorByIndex = () => void 0, this.getIndexOfEditor = G, this.openEditor = G, this.openEditors = G, this.isPinned = () => !1, this.isSticky = () => !1, this.isActive = () => !1, this.contains = () => !1, this.moveEditor = G, this.moveEditors = G, this.copyEditor = G, this.copyEditors = G, this.closeEditor = G, this.closeEditors = G, this.closeAllEditors = G, this.replaceEditors = G, this.pinEditor = () => {}, this.stickEditor = () => {}, this.unstickEditor = () => {}, this.lock = () => {}, this.isFirst = G, this.isLast = G;
	}
	get groupsView() {
		return G();
	}
	notifyLabelChanged() {}
	get titleHeight() {
		return G();
	}
	get element() {
		return G();
	}
	get scopedContextKeyService() {
		return S.get(C);
	}
	focus() {}
}(), Y = class {
	constructor(e, t) {
		this.input = e, this.editor = t, this.onDidChangeControl = g.None, this.onDidChangeSizeConstraints = g.None, this.onDidFocus = g.None, this.onDidBlur = g.None, this.options = void 0, this.group = J, this.scopedContextKeyService = void 0, this.getViewState = G, this.isVisible = G, this.hasFocus = G, this.getId = G, this.getTitle = G, this.focus = G;
	}
	get minimumWidth() {
		return z.width;
	}
	get maximumWidth() {
		return R.width;
	}
	get minimumHeight() {
		return z.height;
	}
	get maximumHeight() {
		return R.height;
	}
	getControl() {
		return this.editor;
	}
};
function be(e, n, r) {
	async function i(i, o, s) {
		let c = P(i) ? o : i.options;
		pe(o) && (s = o);
		let l = N(i) || P(i) ? i.resource : void 0;
		if (l == null || !e.canHandleResource(l)) return await n(i, o, s);
		let u;
		if (u = S.get(t).listCodeEditors().find((e) => e instanceof W && e.getModel() != null && e.getModel().uri.toString() === l.toString()), u == null) {
			let t = await n(i, o, s);
			if (t != null) return t;
			let a = await e.createModelReference(l);
			if (u = await r?.(a, c, s === -2), u == null) {
				a.dispose();
				return;
			}
		}
		return c != null && me(c, u, a.Immediate), (c?.preserveFocus ?? !1) || (u.focus(), u.getContainerDomNode().scrollIntoView()), new Y(P(i) ? i : void 0, u);
	}
	return i;
}
var X = class extends ye {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f) {
		super(void 0, n, r, i, a, o, s, c, l, u, d), this._isEditorPartVisible = t, this.openEditor = be(f, this.openEditor.bind(this), e);
	}
	get activeTextEditorControl() {
		let e = S.get(t).getFocusedCodeEditor();
		return e != null && e instanceof ge ? e : super.activeTextEditorControl;
	}
	async openEditor(e, t, n) {
		if (this._isEditorPartVisible()) return await super.openEditor(e, t, n);
	}
};
X = o([
	p(2, O),
	p(3, u),
	p(4, ae),
	p(5, ee),
	p(6, _),
	p(7, d),
	p(8, B),
	p(9, oe),
	p(10, de),
	p(11, ve),
	p(12, h)
], X);
var Z = class {
	constructor(e, t, n) {
		this.editor = e, this.input = t, this.group = n, this.onDidChangeControl = g.None, this.options = void 0, this.minimumWidth = 0, this.maximumWidth = Infinity, this.minimumHeight = 0, this.maximumHeight = Infinity, this.onDidChangeSizeConstraints = g.None, this.scopedContextKeyService = void 0, this.onDidFocus = this.editor.onDidFocusEditorWidget, this.onDidBlur = this.editor.onDidBlurEditorWidget;
	}
	getControl() {
		return this.editor;
	}
	getViewState() {}
	isVisible() {
		return !0;
	}
	hasFocus() {
		return this.editor.hasWidgetFocus();
	}
	getId() {
		return this.editor.getId();
	}
	getTitle() {}
	focus() {
		this.editor.focus();
	}
}, Q = q = class extends e {
	constructor(e, t, n, i, a, o) {
		super(), this.editor = e, this.openEditorFallback = t, this.scopedContextKeyService = i, this.editorService = a, this.textModelService = o, this.active = !1, this.selectedEditors = [], this.isSelected = () => !1, this.setSelection = G, this.isTransient = () => !1, this.windowId = w.vscodeWindowId, this.onDidFocus = this.editor.onDidFocusEditorWidget, this.onDidOpenEditorFail = g.None, this.whenRestored = Promise.resolve(), this.disposed = !1, this.notifyIndexChanged = G, this.relayout = G, this.toJSON = G, this.minimumWidth = 0, this.maximumWidth = Infinity, this.minimumHeight = 0, this.maximumHeight = Infinity, this.onDidChange = this.editor.onDidLayoutChange, this.layout = () => this.editor.layout(), this._onDidModelChange = new r(), this.onDidModelChange = this._onDidModelChange.event, this.onWillDispose = this.editor.onDidDispose, this._onDidActiveEditorChange = new r(), this.onDidActiveEditorChange = this._onDidActiveEditorChange.event, this.onWillCloseEditor = g.None, this._onDidCloseEditor = new r(), this.onDidCloseEditor = this._onDidCloseEditor.event, this.onWillMoveEditor = g.None, this._onWillOpenEditor = new r(), this.onWillOpenEditor = this._onWillOpenEditor.event, this.id = --q.idCounter, this.index = -1, this.label = `standalone editor ${-this.id}`, this.ariaLabel = `standalone editor ${-this.id}`, this.previewEditor = null, this.isLocked = !0, this.stickyCount = 0, this.getEditors = () => this.editors, this.findEditors = (e) => this.pane != null && e.toString() === this.pane.input.resource.toString() ? [this.pane.input] : [], this.getEditorByIndex = (e) => this.pane != null && e === 0 ? this.pane.input : void 0, this.getIndexOfEditor = (e) => this.pane != null && this.pane.input === e ? 0 : -1, this.openEditor = async (e, t) => {
			if (!e.isDisposed() && e instanceof U) {
				if (e.resource.toString() === this.pane?.input.resource.toString()) return this.focus(), this.pane;
				if (this.openEditorFallback != null) {
					let n = await this.textModelService.createModelReference(e.resource), r = await this.openEditorFallback(n, t, !1);
					if (r == null) {
						n.dispose();
						return;
					}
					return new Y(e, r);
				}
			}
		}, this.openEditors = async (e) => {
			if (e.length === 1) return await this.openEditor(e[0].editor);
		}, this.isPinned = () => !1, this.isSticky = () => !1, this.isActive = () => this.editor.hasWidgetFocus(), this.contains = (e) => this.pane != null && this.pane.input === e, this.moveEditor = G, this.moveEditors = G, this.copyEditor = G, this.copyEditors = G, this.closeEditor = G, this.closeEditors = G, this.closeAllEditors = G, this.replaceEditors = G, this.pinEditor = () => {}, this.stickEditor = () => {}, this.unstickEditor = () => {}, this.lock = () => {}, this.isFirst = G, this.isLast = G;
		let s = (t) => {
			let r = n.createInstance(U, t, void 0, void 0, void 0, void 0);
			this._onWillOpenEditor.fire({
				editor: r,
				groupId: this.id
			}), this.pane = new Z(e, r, this), this._onDidModelChange.fire({
				kind: j.EDITOR_OPEN,
				editor: r,
				editorIndex: 0
			}), this._onDidActiveEditorChange.fire({ editor: r });
		}, c = (e) => {
			if (this.pane != null && this.pane.input.resource.toString() === e.toString()) {
				let e = this.pane;
				this.pane = void 0, this._onDidModelChange.fire({
					kind: j.EDITOR_CLOSE,
					editorIndex: 0
				}), this._onDidActiveEditorChange.fire({ editor: void 0 }), this._onDidCloseEditor.fire({
					context: D.UNKNOWN,
					editor: e.input,
					groupId: this.id,
					index: 0,
					sticky: !1
				});
			}
		};
		e.onDidChangeModel((e) => {
			e.oldModelUrl != null && c(e.oldModelUrl), e.newModelUrl != null && s(e.newModelUrl);
		}), this._register({ dispose: () => {
			let t = e.getModel();
			t != null && c(t.uri);
		} });
		let l = e.getModel();
		if (l != null) {
			let t = n.createInstance(U, l.uri, void 0, void 0, void 0, void 0);
			this.pane = new Z(e, t, this);
		}
	}
	get groupsView() {
		return G();
	}
	notifyLabelChanged() {}
	createEditorActions() {
		return {
			actions: {
				primary: [],
				secondary: []
			},
			onDidChange: g.None
		};
	}
	get titleHeight() {
		return G();
	}
	setActive(e) {
		this.active = e;
	}
	get element() {
		return this.editor.getContainerDomNode();
	}
	get activeEditorPane() {
		return this.pane;
	}
	get activeEditor() {
		return this.pane?.input ?? null;
	}
	get count() {
		return this.pane == null ? 0 : 1;
	}
	get isEmpty() {
		return this.pane == null;
	}
	get editors() {
		return this.pane == null ? [] : [this.pane.input];
	}
	focus() {
		this.editor.focus(), this.editor.getContainerDomNode().scrollIntoView();
	}
};
Q.idCounter = 0, Q = q = o([
	p(2, u),
	p(3, C),
	p(4, M),
	p(5, h)
], Q);
var $ = class extends e {
	constructor(e, n, i, a) {
		super(), this.delegate = e, this.openEditorFallback = i, this.instantiationService = a, this._serviceBrand = void 0, this.additionalGroups = [], this.activeGroupOverride = void 0, this.onDidCreateAuxiliaryEditorPart = this.delegate.onDidCreateAuxiliaryEditorPart, this.onDidChangeGroupMaximized = this.delegate.onDidChangeGroupMaximized, this._onDidChangeActiveGroup = new r(), this.onDidChangeActiveGroup = g.any(this._onDidChangeActiveGroup.event, this.delegate.onDidChangeActiveGroup), this._onDidAddGroup = new r(), this.onDidAddGroup = g.any(this._onDidAddGroup.event, this.delegate.onDidAddGroup), this._onDidRemoveGroup = new r(), this.onDidRemoveGroup = g.any(this._onDidRemoveGroup.event, this.delegate.onDidRemoveGroup), this.onDidMoveGroup = this.delegate.onDidMoveGroup, this.onDidActivateGroup = this.delegate.onDidActivateGroup, this.onDidChangeGroupIndex = this.delegate.onDidChangeGroupIndex, this.onDidChangeGroupLocked = this.delegate.onDidChangeGroupLocked, this.getLayout = () => this.delegate.getLayout(), this.getGroups = (e) => [...this.delegate.getGroups(e), ...this.additionalGroups], this.getGroup = (e) => this.delegate.getGroup(e) ?? this.additionalGroups.find((t) => t.id === e), this.activateGroup = (...e) => this.delegate.activateGroup(...e), this.getSize = (...e) => this.delegate.getSize(...e), this.setSize = (...e) => this.delegate.setSize(...e), this.arrangeGroups = (...e) => this.delegate.arrangeGroups(...e), this.applyLayout = (...e) => this.delegate.applyLayout(...e), this.setGroupOrientation = (...e) => this.delegate.setGroupOrientation(...e), this.findGroup = (...e) => this.delegate.findGroup(...e), this.addGroup = (...e) => this.delegate.addGroup(...e), this.removeGroup = (...e) => this.delegate.removeGroup(...e), this.moveGroup = (...e) => this.delegate.moveGroup(...e), this.mergeGroup = (...e) => this.delegate.mergeGroup(...e), this.mergeAllGroups = (...e) => this.delegate.mergeAllGroups(...e), this.copyGroup = (...e) => this.delegate.copyGroup(...e), this.onDidChangeEditorPartOptions = this.delegate.onDidChangeEditorPartOptions, this.enforcePartOptions = (...e) => this.delegate.enforcePartOptions(...e), setTimeout(() => {
			let e = S.get(t), r = (e) => {
				if (e instanceof W) {
					let t, r = (e) => {
						let t = e == null ? void 0 : this.additionalGroups.find((t) => t.editor === e);
						this.activeGroupOverride !== t && (this.activeGroupOverride = t, this._onDidChangeActiveGroup.fire(this.activeGroup));
					}, i = (e) => {
						!n && this.activeGroupOverride === this.additionalGroups.find((t) => t.editor === e) && r(void 0);
					}, o = () => {
						t != null && window.clearTimeout(t), r(e);
					}, s = () => {
						t != null && window.clearTimeout(t), t = window.setTimeout(() => {
							t = void 0, i(e);
						}, 100);
					};
					e.onDidDispose(() => {
						i(e);
					}), e.onDidFocusEditorText(o), e.onDidFocusEditorWidget(o), e.onDidBlurEditorText(s), e.onDidBlurEditorWidget(s), e.hasWidgetFocus() && o();
					let c = a.createInstance(Q, e, this.openEditorFallback);
					this.additionalGroups.push(c), this._onDidAddGroup.fire(c);
				}
			};
			this._register(e.onCodeEditorAdd(r)), this._register(e.onCodeEditorRemove((e) => {
				if (e instanceof W) {
					let t = this.additionalGroups.find((t) => t.editor === e);
					t != null && (t.dispose(), this.activeGroupOverride === t && (this.activeGroupOverride = void 0, this._onDidChangeActiveGroup.fire(this.activeGroup)), this.additionalGroups = this.additionalGroups.filter((e) => e !== t), this._onDidRemoveGroup.fire(t));
				}
			})), e.listCodeEditors().forEach(r);
		});
	}
	getScopedInstantiationService() {
		return this.instantiationService;
	}
	registerContextKeyProvider(e) {
		return this.delegate.registerContextKeyProvider(e);
	}
	saveWorkingSet(e) {
		return this.delegate.saveWorkingSet(e);
	}
	getWorkingSets() {
		return this.delegate.getWorkingSets();
	}
	applyWorkingSet(e) {
		return this.delegate.applyWorkingSet(e);
	}
	deleteWorkingSet(e) {
		return this.delegate.deleteWorkingSet(e);
	}
	get isReady() {
		return this.delegate.isReady;
	}
	get whenReady() {
		return this.delegate.whenReady;
	}
	get whenRestored() {
		return this.delegate.whenRestored;
	}
	get hasRestorableState() {
		return this.delegate.hasRestorableState;
	}
	get parts() {
		return this.delegate.parts;
	}
	createAuxiliaryEditorPart(e) {
		return this.delegate.createAuxiliaryEditorPart(e);
	}
	get mainPart() {
		return this.delegate.mainPart;
	}
	getPart(e) {
		return this.delegate.getPart(e);
	}
	toggleMaximizeGroup(e) {
		return this.delegate.toggleMaximizeGroup(e);
	}
	toggleExpandGroup(e) {
		return this.delegate.toggleExpandGroup(e);
	}
	createEditorDropTarget(e, t) {
		return this.delegate.createEditorDropTarget(e, t);
	}
	get groups() {
		return [...this.additionalGroups, ...this.delegate.groups];
	}
	get activeGroup() {
		return this.activeGroupOverride ?? this.delegate.activeGroup;
	}
	get sideGroup() {
		return this.delegate.sideGroup;
	}
	get count() {
		return this.delegate.count + this.additionalGroups.length;
	}
	get orientation() {
		return this.delegate.orientation;
	}
	get partOptions() {
		return this.delegate.partOptions;
	}
};
$ = o([p(3, u)], $);
//#endregion
export { X as n, J as r, $ as t };
