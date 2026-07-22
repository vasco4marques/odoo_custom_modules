import { AA as e, Bb as t, DN as n, FA as r, KA as i, MA as a, ON as o, SA as s, VA as c, jA as l, kN as u, wA as d, zb as f } from "./standaloneServices-DUdtGggg.js";
import { N as p, Ot as m, P as h, bt as g, wt as _, xt as v } from "./textfiles-GCUcfhe8.js";
import { Ha as y, Ra as b } from "./embeddedCodeEditorWidget-DPX_ivX-.js";
import { _ as x, g as S, v as C, y as w } from "./fileConstants-3FE16HF_.js";
import { c as T } from "./fileCommands._save-VHL9yLNO.js";
import { i as E, t as D } from "./tools-DMW4ALLH.js";
import { n as O, r as k, t as A } from "./editor-CUnbW-4h.js";
u(), i(), l(), w(), v(), t(), x(), m(), h(), r(), y(), s(), D();
var j = class {
	constructor() {
		this.onWillDispose = c.None, this.hasMaximizedGroup = () => !1, this.windowId = d.vscodeWindowId, this.onDidLayout = c.None, this.onDidScroll = c.None, this.isReady = !0, this.whenReady = Promise.resolve(), this.whenRestored = Promise.resolve(), this.hasRestorableState = !1, this.centerLayout = E, this.isLayoutCentered = E, this.enforcePartOptions = E, this.onDidChangeActiveGroup = c.None, this.onDidAddGroup = c.None, this.onDidRemoveGroup = c.None, this.onDidMoveGroup = c.None, this.onDidActivateGroup = c.None, this.onDidChangeGroupIndex = c.None, this.onDidChangeGroupLocked = c.None, this.onDidChangeGroupMaximized = c.None, this.activeGroup = k, this.groups = [k], this.count = 0, this.orientation = _.HORIZONTAL, this.getGroups = () => [], this.getGroup = () => void 0, this.activateGroup = E, this.getSize = E, this.setSize = E, this.arrangeGroups = E, this.toggleMaximizeGroup = E, this.toggleExpandGroup = E, this.applyLayout = E, this.getLayout = E, this.setGroupOrientation = E, this.findGroup = () => void 0, this.addGroup = E, this.removeGroup = E, this.moveGroup = E, this.mergeGroup = E, this.mergeAllGroups = E, this.copyGroup = E, this.partOptions = b, this.onDidChangeEditorPartOptions = c.None, this.createEditorDropTarget = E;
	}
	get contentDimension() {
		return E();
	}
	get sideGroup() {
		return E();
	}
}, M = class {
	constructor() {
		this.getScopedInstantiationService = E, this.registerContextKeyProvider = E, this.saveWorkingSet = E, this.getWorkingSets = E, this.applyWorkingSet = E, this.deleteWorkingSet = E, this.onDidCreateAuxiliaryEditorPart = c.None, this.mainPart = new j(), this.activePart = this.mainPart, this.parts = [this.mainPart], this.getPart = E, this.createAuxiliaryEditorPart = E, this.onDidChangeGroupMaximized = c.None, this.toggleMaximizeGroup = E, this.toggleExpandGroup = E, this.partOptions = b, this.createEditorDropTarget = E, this._serviceBrand = void 0, this.getLayout = E, this.onDidChangeActiveGroup = c.None, this.onDidAddGroup = c.None, this.onDidRemoveGroup = c.None, this.onDidMoveGroup = c.None, this.onDidActivateGroup = c.None, this.onDidLayout = c.None, this.onDidScroll = c.None, this.onDidChangeGroupIndex = c.None, this.onDidChangeGroupLocked = c.None, this.activeGroup = k, this.groups = [k], this.count = 0, this.orientation = _.HORIZONTAL, this.isReady = !1, this.whenReady = Promise.resolve(), this.whenRestored = Promise.resolve(), this.hasRestorableState = !1, this.getGroups = () => [], this.getGroup = () => void 0, this.activateGroup = E, this.getSize = E, this.setSize = E, this.arrangeGroups = E, this.applyLayout = E, this.centerLayout = E, this.isLayoutCentered = () => !1, this.setGroupOrientation = E, this.findGroup = () => void 0, this.addGroup = E, this.removeGroup = E, this.moveGroup = E, this.mergeGroup = E, this.mergeAllGroups = E, this.copyGroup = E, this.onDidChangeEditorPartOptions = c.None, this.enforcePartOptions = E;
	}
	get contentDimension() {
		return E();
	}
	get sideGroup() {
		return E();
	}
}, N = class extends A {
	constructor(e, t) {
		super(t.createInstance(M), !0, e, t);
	}
};
N = n([o(1, a)], N);
function P(t) {
	return {
		[e.toString()]: new f(C, void 0, !0),
		[g.toString()]: new f(O, [t, () => !1], !0),
		[S.toString()]: new f(T, [], !1),
		[p.toString()]: new f(N, [t])
	};
}
//#endregion
export { P as default };
