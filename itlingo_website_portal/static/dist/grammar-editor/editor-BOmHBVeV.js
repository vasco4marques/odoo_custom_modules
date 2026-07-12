import { Ab as e, Bb as t, Da as n, Fa as r, Fb as i, Ib as a, Jo as o, Lb as s, Mb as c, Nk as l, Oa as u, Ob as d, Pa as f, Qw as ee, TA as te, e_ as ne, fE as p, gs as re, hs as ie, ij as ae, jb as m, kb as h, mA as g, mb as _, n as v, nA as y, ov as b, pb as x, qo as S, r as C, sA as w, sv as T, tA as E, t_ as oe, uE as se, wD as ce, zD as le } from "./standaloneServices-C51B94Xh.js";
import { B as D, F as O, H as k, I as A, J as j, L as M, P as N, U as P, V as F, _ as I, g as L } from "./editorResolverService-CZFxBDpH.js";
import { C as R, S as z, T as B, _ as V, v as ue, x as H } from "./files-iACwD_Ow.js";
import { $t as U, Ft as de, Ot as fe, U as pe, Ut as W, W as me, Z as he, kt as ge, ln as _e, nn as G } from "./filesConfigurationService-CxZOIrXS.js";
import { i as K, t as ve } from "./tools-CGs0ihXi.js";
import { i as ye } from "./fileCommands._save-BcixAh1E.js";
e(), C(), a(), D(), ge(), U(), w(), ee(), z(), T(), j(), c(), te(), he(), me(), t(), oe(), u(), M(), o(), r(), re(), ue(), O(), I(), _(), l(), le(), ce(), ae(), se(), ve();
var q, J = new class {
	constructor() {
		this.selectedEditors = [], this.isSelected = () => !1, this.setSelection = K, this.isTransient = () => !1, this.windowId = p.vscodeWindowId, this.createEditorActions = K, this.onDidFocus = y.None, this.onDidOpenEditorFail = y.None, this.whenRestored = Promise.resolve(), this.disposed = !1, this.setActive = K, this.notifyIndexChanged = K, this.relayout = K, this.dispose = K, this.toJSON = K, this.minimumWidth = 0, this.maximumWidth = Infinity, this.minimumHeight = 0, this.maximumHeight = Infinity, this.onDidChange = y.None, this.layout = K, this.onDidModelChange = y.None, this.onWillDispose = y.None, this.onDidActiveEditorChange = y.None, this.onWillCloseEditor = y.None, this.onDidCloseEditor = y.None, this.onWillMoveEditor = y.None, this.onWillOpenEditor = y.None, this.id = 0, this.index = 0, this.label = "main", this.ariaLabel = "main", this.activeEditorPane = void 0, this.activeEditor = null, this.previewEditor = null, this.count = 0, this.isEmpty = !1, this.isLocked = !1, this.stickyCount = 0, this.editors = [], this.getEditors = () => [], this.findEditors = () => [], this.getEditorByIndex = () => void 0, this.getIndexOfEditor = K, this.openEditor = K, this.openEditors = K, this.isPinned = () => !1, this.isSticky = () => !1, this.isActive = () => !1, this.contains = () => !1, this.moveEditor = K, this.moveEditors = K, this.copyEditor = K, this.copyEditors = K, this.closeEditor = K, this.closeEditors = K, this.closeAllEditors = K, this.replaceEditors = K, this.pinEditor = () => {}, this.stickEditor = () => {}, this.unstickEditor = () => {}, this.lock = () => {}, this.isFirst = K, this.isLast = K;
	}
	get groupsView() {
		return K();
	}
	notifyLabelChanged() {}
	get titleHeight() {
		return K();
	}
	get element() {
		return K();
	}
	get scopedContextKeyService() {
		return v.get(x);
	}
	focus() {}
}(), Y = class {
	constructor(e, t) {
		this.input = e, this.editor = t, this.onDidChangeControl = y.None, this.onDidChangeSizeConstraints = y.None, this.onDidFocus = y.None, this.onDidBlur = y.None, this.options = void 0, this.group = J, this.scopedContextKeyService = void 0, this.getViewState = K, this.isVisible = K, this.hasFocus = K, this.getId = K, this.getTitle = K, this.focus = K;
	}
	get minimumWidth() {
		return P.width;
	}
	get maximumWidth() {
		return k.width;
	}
	get minimumHeight() {
		return P.height;
	}
	get maximumHeight() {
		return k.height;
	}
	getControl() {
		return this.editor;
	}
};
function be(e, t, n) {
	async function r(r, a, o) {
		let s = G(r) ? a : r.options;
		F(a) && (o = a);
		let c = _e(r) || G(r) ? r.resource : void 0;
		if (c == null || !e.canHandleResource(c)) return await t(r, a, o);
		let l;
		if (l = v.get(i).listCodeEditors().find((e) => e instanceof B && e.getModel() != null && e.getModel().uri.toString() === c.toString()), l == null) {
			let i = await t(r, a, o);
			if (i != null) return i;
			let u = await e.createModelReference(c);
			if (l = await n?.(u, s, o === -2), l == null) {
				u.dispose();
				return;
			}
		}
		return s != null && H(s, l, b.Immediate), (s?.preserveFocus ?? !1) || (l.focus(), l.getContainerDomNode().scrollIntoView()), new Y(G(r) ? r : void 0, l);
	}
	return r;
}
var X = class extends ye {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f) {
		super(void 0, n, r, i, a, o, s, c, l, u, d), this._isEditorPartVisible = t, this.openEditor = be(f, this.openEditor.bind(this), e);
	}
	get activeTextEditorControl() {
		let e = v.get(i).getFocusedCodeEditor();
		return e != null && e instanceof R ? e : super.activeTextEditorControl;
	}
	async openEditor(e, t, n) {
		if (this._isEditorPartVisible()) return await super.openEditor(e, t, n);
	}
};
X = d([
	h(2, pe),
	h(3, s),
	h(4, ie),
	h(5, ne),
	h(6, f),
	h(7, S),
	h(8, A),
	h(9, n),
	h(10, N),
	h(11, V),
	h(12, m)
], X);
var Z = class {
	constructor(e, t, n) {
		this.editor = e, this.input = t, this.group = n, this.onDidChangeControl = y.None, this.options = void 0, this.minimumWidth = 0, this.maximumWidth = Infinity, this.minimumHeight = 0, this.maximumHeight = Infinity, this.onDidChangeSizeConstraints = y.None, this.scopedContextKeyService = void 0, this.onDidFocus = this.editor.onDidFocusEditorWidget, this.onDidBlur = this.editor.onDidBlurEditorWidget;
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
}, Q = q = class extends g {
	constructor(e, t, n, r, i, a) {
		super(), this.editor = e, this.openEditorFallback = t, this.scopedContextKeyService = r, this.editorService = i, this.textModelService = a, this.active = !1, this.selectedEditors = [], this.isSelected = () => !1, this.setSelection = K, this.isTransient = () => !1, this.windowId = p.vscodeWindowId, this.onDidFocus = this.editor.onDidFocusEditorWidget, this.onDidOpenEditorFail = y.None, this.whenRestored = Promise.resolve(), this.disposed = !1, this.notifyIndexChanged = K, this.relayout = K, this.toJSON = K, this.minimumWidth = 0, this.maximumWidth = Infinity, this.minimumHeight = 0, this.maximumHeight = Infinity, this.onDidChange = this.editor.onDidLayoutChange, this.layout = () => this.editor.layout(), this._onDidModelChange = new E(), this.onDidModelChange = this._onDidModelChange.event, this.onWillDispose = this.editor.onDidDispose, this._onDidActiveEditorChange = new E(), this.onDidActiveEditorChange = this._onDidActiveEditorChange.event, this.onWillCloseEditor = y.None, this._onDidCloseEditor = new E(), this.onDidCloseEditor = this._onDidCloseEditor.event, this.onWillMoveEditor = y.None, this._onWillOpenEditor = new E(), this.onWillOpenEditor = this._onWillOpenEditor.event, this.id = --q.idCounter, this.index = -1, this.label = `standalone editor ${-this.id}`, this.ariaLabel = `standalone editor ${-this.id}`, this.previewEditor = null, this.isLocked = !0, this.stickyCount = 0, this.getEditors = () => this.editors, this.findEditors = (e) => this.pane != null && e.toString() === this.pane.input.resource.toString() ? [this.pane.input] : [], this.getEditorByIndex = (e) => this.pane != null && e === 0 ? this.pane.input : void 0, this.getIndexOfEditor = (e) => this.pane != null && this.pane.input === e ? 0 : -1, this.openEditor = async (e, t) => {
			if (!e.isDisposed() && e instanceof L) {
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
		}, this.isPinned = () => !1, this.isSticky = () => !1, this.isActive = () => this.editor.hasWidgetFocus(), this.contains = (e) => this.pane != null && this.pane.input === e, this.moveEditor = K, this.moveEditors = K, this.copyEditor = K, this.copyEditors = K, this.closeEditor = K, this.closeEditors = K, this.closeAllEditors = K, this.replaceEditors = K, this.pinEditor = () => {}, this.stickEditor = () => {}, this.unstickEditor = () => {}, this.lock = () => {}, this.isFirst = K, this.isLast = K;
		let o = (t) => {
			let r = n.createInstance(L, t, void 0, void 0, void 0, void 0);
			this._onWillOpenEditor.fire({
				editor: r,
				groupId: this.id
			}), this.pane = new Z(e, r, this), this._onDidModelChange.fire({
				kind: W.EDITOR_OPEN,
				editor: r,
				editorIndex: 0
			}), this._onDidActiveEditorChange.fire({ editor: r });
		}, s = (e) => {
			if (this.pane != null && this.pane.input.resource.toString() === e.toString()) {
				let e = this.pane;
				this.pane = void 0, this._onDidModelChange.fire({
					kind: W.EDITOR_CLOSE,
					editorIndex: 0
				}), this._onDidActiveEditorChange.fire({ editor: void 0 }), this._onDidCloseEditor.fire({
					context: de.UNKNOWN,
					editor: e.input,
					groupId: this.id,
					index: 0,
					sticky: !1
				});
			}
		};
		e.onDidChangeModel((e) => {
			e.oldModelUrl != null && s(e.oldModelUrl), e.newModelUrl != null && o(e.newModelUrl);
		}), this._register({ dispose: () => {
			let t = e.getModel();
			t != null && s(t.uri);
		} });
		let c = e.getModel();
		if (c != null) {
			let t = n.createInstance(L, c.uri, void 0, void 0, void 0, void 0);
			this.pane = new Z(e, t, this);
		}
	}
	get groupsView() {
		return K();
	}
	notifyLabelChanged() {}
	createEditorActions() {
		return {
			actions: {
				primary: [],
				secondary: []
			},
			onDidChange: y.None
		};
	}
	get titleHeight() {
		return K();
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
Q.idCounter = 0, Q = q = d([
	h(2, s),
	h(3, x),
	h(4, fe),
	h(5, m)
], Q);
var $ = class extends g {
	constructor(e, t, n, r) {
		super(), this.delegate = e, this.openEditorFallback = n, this.instantiationService = r, this._serviceBrand = void 0, this.additionalGroups = [], this.activeGroupOverride = void 0, this.onDidCreateAuxiliaryEditorPart = this.delegate.onDidCreateAuxiliaryEditorPart, this.onDidChangeGroupMaximized = this.delegate.onDidChangeGroupMaximized, this._onDidChangeActiveGroup = new E(), this.onDidChangeActiveGroup = y.any(this._onDidChangeActiveGroup.event, this.delegate.onDidChangeActiveGroup), this._onDidAddGroup = new E(), this.onDidAddGroup = y.any(this._onDidAddGroup.event, this.delegate.onDidAddGroup), this._onDidRemoveGroup = new E(), this.onDidRemoveGroup = y.any(this._onDidRemoveGroup.event, this.delegate.onDidRemoveGroup), this.onDidMoveGroup = this.delegate.onDidMoveGroup, this.onDidActivateGroup = this.delegate.onDidActivateGroup, this.onDidChangeGroupIndex = this.delegate.onDidChangeGroupIndex, this.onDidChangeGroupLocked = this.delegate.onDidChangeGroupLocked, this.getLayout = () => this.delegate.getLayout(), this.getGroups = (e) => [...this.delegate.getGroups(e), ...this.additionalGroups], this.getGroup = (e) => this.delegate.getGroup(e) ?? this.additionalGroups.find((t) => t.id === e), this.activateGroup = (...e) => this.delegate.activateGroup(...e), this.getSize = (...e) => this.delegate.getSize(...e), this.setSize = (...e) => this.delegate.setSize(...e), this.arrangeGroups = (...e) => this.delegate.arrangeGroups(...e), this.applyLayout = (...e) => this.delegate.applyLayout(...e), this.setGroupOrientation = (...e) => this.delegate.setGroupOrientation(...e), this.findGroup = (...e) => this.delegate.findGroup(...e), this.addGroup = (...e) => this.delegate.addGroup(...e), this.removeGroup = (...e) => this.delegate.removeGroup(...e), this.moveGroup = (...e) => this.delegate.moveGroup(...e), this.mergeGroup = (...e) => this.delegate.mergeGroup(...e), this.mergeAllGroups = (...e) => this.delegate.mergeAllGroups(...e), this.copyGroup = (...e) => this.delegate.copyGroup(...e), this.onDidChangeEditorPartOptions = this.delegate.onDidChangeEditorPartOptions, this.enforcePartOptions = (...e) => this.delegate.enforcePartOptions(...e), setTimeout(() => {
			let e = v.get(i), n = (e) => {
				if (e instanceof B) {
					let n, i = (e) => {
						let t = e == null ? void 0 : this.additionalGroups.find((t) => t.editor === e);
						this.activeGroupOverride !== t && (this.activeGroupOverride = t, this._onDidChangeActiveGroup.fire(this.activeGroup));
					}, a = (e) => {
						!t && this.activeGroupOverride === this.additionalGroups.find((t) => t.editor === e) && i(void 0);
					}, o = () => {
						n != null && window.clearTimeout(n), i(e);
					}, s = () => {
						n != null && window.clearTimeout(n), n = window.setTimeout(() => {
							n = void 0, a(e);
						}, 100);
					};
					e.onDidDispose(() => {
						a(e);
					}), e.onDidFocusEditorText(o), e.onDidFocusEditorWidget(o), e.onDidBlurEditorText(s), e.onDidBlurEditorWidget(s), e.hasWidgetFocus() && o();
					let c = r.createInstance(Q, e, this.openEditorFallback);
					this.additionalGroups.push(c), this._onDidAddGroup.fire(c);
				}
			};
			this._register(e.onCodeEditorAdd(n)), this._register(e.onCodeEditorRemove((e) => {
				if (e instanceof B) {
					let t = this.additionalGroups.find((t) => t.editor === e);
					t != null && (t.dispose(), this.activeGroupOverride === t && (this.activeGroupOverride = void 0, this._onDidChangeActiveGroup.fire(this.activeGroup)), this.additionalGroups = this.additionalGroups.filter((e) => e !== t), this._onDidRemoveGroup.fire(t));
				}
			})), e.listCodeEditors().forEach(n);
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
$ = d([h(3, s)], $);
//#endregion
export { X as n, J as r, $ as t };
