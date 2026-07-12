import { Ab as e, Bb as t, Fb as n, Ib as r, Lb as i, Ob as a, em as o, fE as s, kb as c, nA as l, sA as u, tm as d, uE as f } from "./standaloneServices-C51B94Xh.js";
import { J as p, W as m } from "./editorResolverService-CZFxBDpH.js";
import { _ as h, b as g, v as _, y as v } from "./files-iACwD_Ow.js";
import { Ot as y, U as b, W as x, Z as S, kt as C, q as w } from "./filesConfigurationService-CxZOIrXS.js";
import { i as T, t as E } from "./tools-CGs0ihXi.js";
import { c as D } from "./fileCommands._save-BcixAh1E.js";
import { n as O, r as k, t as A } from "./editor-BOmHBVeV.js";
e(), u(), r(), g(), C(), d(), _(), S(), x(), t(), p(), f(), E();
var j = class {
	constructor() {
		this.onWillDispose = l.None, this.hasMaximizedGroup = () => !1, this.windowId = s.vscodeWindowId, this.onDidLayout = l.None, this.onDidScroll = l.None, this.isReady = !0, this.whenReady = Promise.resolve(), this.whenRestored = Promise.resolve(), this.hasRestorableState = !1, this.centerLayout = T, this.isLayoutCentered = T, this.enforcePartOptions = T, this.onDidChangeActiveGroup = l.None, this.onDidAddGroup = l.None, this.onDidRemoveGroup = l.None, this.onDidMoveGroup = l.None, this.onDidActivateGroup = l.None, this.onDidChangeGroupIndex = l.None, this.onDidChangeGroupLocked = l.None, this.onDidChangeGroupMaximized = l.None, this.activeGroup = k, this.groups = [k], this.count = 0, this.orientation = w.HORIZONTAL, this.getGroups = () => [], this.getGroup = () => void 0, this.activateGroup = T, this.getSize = T, this.setSize = T, this.arrangeGroups = T, this.toggleMaximizeGroup = T, this.toggleExpandGroup = T, this.applyLayout = T, this.getLayout = T, this.setGroupOrientation = T, this.findGroup = () => void 0, this.addGroup = T, this.removeGroup = T, this.moveGroup = T, this.mergeGroup = T, this.mergeAllGroups = T, this.copyGroup = T, this.partOptions = m, this.onDidChangeEditorPartOptions = l.None, this.createEditorDropTarget = T;
	}
	get contentDimension() {
		return T();
	}
	get sideGroup() {
		return T();
	}
}, M = class {
	constructor() {
		this.getScopedInstantiationService = T, this.registerContextKeyProvider = T, this.saveWorkingSet = T, this.getWorkingSets = T, this.applyWorkingSet = T, this.deleteWorkingSet = T, this.onDidCreateAuxiliaryEditorPart = l.None, this.mainPart = new j(), this.activePart = this.mainPart, this.parts = [this.mainPart], this.getPart = T, this.createAuxiliaryEditorPart = T, this.onDidChangeGroupMaximized = l.None, this.toggleMaximizeGroup = T, this.toggleExpandGroup = T, this.partOptions = m, this.createEditorDropTarget = T, this._serviceBrand = void 0, this.getLayout = T, this.onDidChangeActiveGroup = l.None, this.onDidAddGroup = l.None, this.onDidRemoveGroup = l.None, this.onDidMoveGroup = l.None, this.onDidActivateGroup = l.None, this.onDidLayout = l.None, this.onDidScroll = l.None, this.onDidChangeGroupIndex = l.None, this.onDidChangeGroupLocked = l.None, this.activeGroup = k, this.groups = [k], this.count = 0, this.orientation = w.HORIZONTAL, this.isReady = !1, this.whenReady = Promise.resolve(), this.whenRestored = Promise.resolve(), this.hasRestorableState = !1, this.getGroups = () => [], this.getGroup = () => void 0, this.activateGroup = T, this.getSize = T, this.setSize = T, this.arrangeGroups = T, this.applyLayout = T, this.centerLayout = T, this.isLayoutCentered = () => !1, this.setGroupOrientation = T, this.findGroup = () => void 0, this.addGroup = T, this.removeGroup = T, this.moveGroup = T, this.mergeGroup = T, this.mergeAllGroups = T, this.copyGroup = T, this.onDidChangeEditorPartOptions = l.None, this.enforcePartOptions = T;
	}
	get contentDimension() {
		return T();
	}
	get sideGroup() {
		return T();
	}
}, N = class extends A {
	constructor(e, t) {
		super(t.createInstance(M), !0, e, t);
	}
};
N = a([c(1, i)], N);
function P(e) {
	return {
		[n.toString()]: new o(v, void 0, !0),
		[y.toString()]: new o(O, [e, () => !1], !0),
		[h.toString()]: new o(D, [], !1),
		[b.toString()]: new o(N, [e])
	};
}
//#endregion
export { P as default };
