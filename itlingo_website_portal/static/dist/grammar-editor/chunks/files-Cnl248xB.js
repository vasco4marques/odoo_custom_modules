import { $A as e, $k as t, Ay as n, Bu as r, Cb as i, DN as a, Ix as o, KA as s, ON as c, Pt as l, Qk as u, Sb as d, VA as f, Vu as p, Wt as m, ij as h, kN as g, ky as _, nj as v, sx as y, uj as b, wb as x, xb as S, zu as C } from "./standaloneServices-DUdtGggg.js";
import { $t as w, B as T, Vt as E, qt as D, z as O } from "./textfiles-GCUcfhe8.js";
g(), w(), o(), n(), p(), b(), d(), x(), T(), m(), s(), u();
var k, A = "workbench.view.explorer";
new r("explorerViewletVisible", !0, {
	type: "boolean",
	description: t(8259, "True when the EXPLORER viewlet is visible.")
});
var j = new r("foldersViewVisible", !0, {
	type: "boolean",
	description: t(8260, "True when the FOLDERS view (the file tree within the explorer view container) is visible.")
});
new r("explorerResourceIsFolder", !1, {
	type: "boolean",
	description: t(8261, "True when the focused item in the EXPLORER is a folder.")
}), new r("explorerResourceReadonly", !1, {
	type: "boolean",
	description: t(8262, "True when the focused item in the EXPLORER is read-only.")
}).toNegated(), new r("explorerResourceParentReadonly", !1, {
	type: "boolean",
	description: t(8263, "True when the focused item in the EXPLORER's parent is read-only.")
}), new r("explorerResourceAvailableEditorIds", ""), new r("explorerResourceIsRoot", !1, {
	type: "boolean",
	description: t(8264, "True when the focused item in the EXPLORER is a root folder.")
}), new r("explorerResourceCut", !1, {
	type: "boolean",
	description: t(8265, "True when an item in the EXPLORER has been cut for cut and paste.")
}), new r("explorerResourceMoveableToTrash", !1, {
	type: "boolean",
	description: t(8266, "True when the focused item in the EXPLORER can be moved to trash.")
});
var M = new r("filesExplorerFocus", !0, {
	type: "boolean",
	description: t(8267, "True when the focus is inside the EXPLORER view.")
});
new r("openEditorsFocus", !0, {
	type: "boolean",
	description: t(8268, "True when the focus is inside the OPEN EDITORS view.")
});
var N = new r("explorerViewletFocus", !0, {
	type: "boolean",
	description: t(8269, "True when the focus is inside the EXPLORER viewlet.")
});
new r("explorerFindProviderActive", !1, {
	type: "boolean",
	description: t(8270, "True when the explorer tree is using the explorer find provider.")
}), new r("explorerViewletCompressedFocus", !0, {
	type: "boolean",
	description: t(8271, "True when the focused item in the EXPLORER view is a compact item.")
}), new r("explorerViewletCompressedFirstFocus", !0, {
	type: "boolean",
	description: t(8272, "True when the focus is inside a compact item's first part in the EXPLORER view.")
}), new r("explorerViewletCompressedLastFocus", !0, {
	type: "boolean",
	description: t(8273, "True when the focus is inside a compact item's last part in the EXPLORER view.")
}), new r("viewHasSomeCollapsibleItem", !1, {
	type: "boolean",
	description: t(8274, "True when a workspace in the EXPLORER view has some collapsible root child.")
}), C.and(j, M, C.not(l)), C.and(j, N, C.not(l));
var P = "workbench.editors.files.textFileEditor", F = "workbench.editors.files.fileEditorInput", I = "workbench.editors.files.binaryFileEditor", L = "code-text-binary", R;
(function(e) {
	e.Default = "default", e.Mixed = "mixed", e.FilesFirst = "filesFirst", e.Type = "type", e.Modified = "modified", e.FoldersNestsFiles = "foldersNestsFiles";
})(R ||= {});
var z;
(function(e) {
	e.Verbose = "verbose", e.Default = "default", e.Light = "light";
})(z ||= {});
var B;
(function(e) {
	e.Default = "default", e.Upper = "upper", e.Lower = "lower", e.Unicode = "unicode";
})(B ||= {});
var V = k = class extends e {
	constructor(e, t, n, r) {
		super(), this.textFileService = e, this.fileService = t, this.languageService = n, this.modelService = r, this.fileWatcherDisposable = this._register(new h());
	}
	static async open(e, t, n, r, i) {
		await r.openEditor({
			original: { resource: k.resourceToTextFile(t, e) },
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
		let t = k.textFileToResource(e), n = await this.resolveEditorModel(e);
		if (!this.fileWatcherDisposable.value) {
			let r = new v();
			this.fileWatcherDisposable.value = r, r.add(this.fileService.onDidFilesChange((n) => {
				n.contains(t, y.UPDATED) && this.resolveEditorModel(e, !1);
			})), n && r.add(f.once(n.onWillDispose)(() => this.fileWatcherDisposable.clear()));
		}
		return n;
	}
	async resolveEditorModel(e, t = !0) {
		let n = k.textFileToResource(e), r = await this.textFileService.readStream(n), i = this.modelService.getModel(e);
		if (i) this.modelService.updateModel(i, r.value);
		else if (t) {
			let t = this.modelService.getModel(n), a;
			a = t ? this.languageService.createById(t.getLanguageId()) : this.languageService.createByFilepathOrFirstLine(n), i = this.modelService.createModel(r.value, a, e);
		}
		return i;
	}
};
V = k = a([
	c(0, O),
	c(1, _),
	c(2, i),
	c(3, S)
], V);
var H = class e {
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
		return E.getOriginalUri(this.editor, { supportSideBySide: D.PRIMARY });
	}
};
//#endregion
export { R as a, A as c, H as i, L as n, P as o, F as r, V as s, I as t };
