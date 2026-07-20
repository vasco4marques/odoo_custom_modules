import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { $A as t, $b as n, $j as r, $k as i, Ab as a, Ad as o, Ay as s, BA as c, BO as l, Bk as u, Bu as ee, CD as te, Cb as ne, Cj as re, DN as d, Dd as ie, Dk as ae, Ey as oe, FA as f, Fd as se, Fx as ce, GE as le, Gx as ue, HT as de, Hb as fe, IA as pe, IE as me, Ix as he, Iy as ge, Jb as _e, Jj as ve, KA as p, Kk as m, Kx as ye, Lb as be, MA as xe, Md as Se, My as Ce, NO as we, Nb as Te, Nd as Ee, OE as De, ON as h, Ok as g, PA as _, PO as Oe, PT as ke, Pb as Ae, Pd as je, Pj as Me, QE as Ne, Qj as Pe, Qk as v, RO as y, Sb as Fe, VA as Ie, VO as Le, Vb as Re, Vu as ze, Wj as Be, Wk as Ve, XE as He, Xb as Ue, Yb as We, Yj as Ge, ZD as Ke, Zb as qe, _O as Je, aE as Ye, aS as Xe, ad as Ze, ax as Qe, bD as $e, bS as et, bc as tt, bj as nt, dD as rt, dS as it, dj as at, dx as ot, gD as st, hD as b, hj as ct, iD as lt, id as ut, ii as dt, ij as ft, jb as pt, jk as mt, jy as ht, kD as gt, kN as x, ky as _t, mO as vt, ni as yt, nj as bt, od as xt, oi as St, px as Ct, qE as wt, qb as Tt, rd as Et, rp as Dt, rx as Ot, sE as kt, ti as At, tp as jt, uD as Mt, uj as S, vS as Nt, vx as Pt, wb as Ft, wy as It, xD as Lt, xb as Rt, xc as C, yE as zt, yx as w } from "./standaloneServices-DUdtGggg.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/common/editor.js
function Bt(e) {
	let t = e;
	return !!t && typeof t.getSelection == "function" && !!t.onDidChangeSelection;
}
function Vt(e) {
	let t = e;
	return !!t && typeof t.getScrollPosition == "function" && typeof t.setScrollPosition == "function" && !!t.onDidChangeScroll;
}
function Ht(e, t, n) {
	for (let r of n.visibleEditorPanes) if (r.group.id === t && e.matches(r.input)) return r.getViewState();
}
function Ut(e) {
	if (k(e)) return !1;
	let t = e;
	return b.isUri(t?.resource);
}
function T(e) {
	if (k(e)) return !1;
	let t = e;
	return t?.original !== void 0 && t.modified !== void 0;
}
function E(e) {
	if (k(e)) return !1;
	let t = e;
	return !t || t.resources && !Array.isArray(t.resources) ? !1 : !!t.resources || !!t.multiDiffSource;
}
function D(e) {
	if (k(e) || T(e)) return !1;
	let t = e;
	return t?.primary !== void 0 && t.secondary !== void 0;
}
function Wt(e) {
	if (k(e)) return !1;
	let t = e;
	return t ? t.resource === void 0 || t.resource.scheme === Mt.untitled || t.forceUntitled === !0 : !1;
}
function O(e) {
	if (k(e)) return !1;
	let t = e;
	return b.isUri(t?.base?.resource) && b.isUri(t?.input1?.resource) && b.isUri(t?.input2?.resource) && b.isUri(t?.result?.resource);
}
function k(e) {
	return e instanceof mn;
}
function Gt(e) {
	let t = e;
	return b.isUri(t?.preferredResource);
}
function Kt(e) {
	let t = e;
	return k(t?.primary) && k(t?.secondary);
}
function qt(e) {
	let t = e;
	return k(t?.modified) && k(t?.original);
}
function Jt(e, t, n, r, a) {
	return rn(r, [_e({
		id: "workbench.action.openLargeFile",
		label: i(4050, "Open Anyway"),
		run: () => {
			let r = {
				...n,
				limits: { size: Number.MAX_VALUE }
			};
			e.openEditor(t, r);
		}
	}), _e({
		id: "workbench.action.configureEditorLargeFileConfirmation",
		label: i(4051, "Configure Limit"),
		run: () => a.openUserSettings({ query: "workbench.editorLargeFileConfirmation" })
	})], {
		forceMessage: !0,
		forceSeverity: Re.Warning
	});
}
function Yt(e) {
	return k(e?.editor);
}
function Xt(e) {
	let t = e;
	return Yt(e) && t?.group !== void 0;
}
function Zt(e) {
	let t = e;
	return typeof t?.groupId == "number" && k(t.editor);
}
function Qt(e) {
	return typeof e?.groupId == "number";
}
function $t(e, t, n, r) {
	if (!e.isSticky(t)) return !1;
	switch (r.preventPinnedEditorClose) {
		case "keyboardAndMouse": return n === P.MOUSE || n === P.KEYBOARD;
		case "mouse": return n === P.MOUSE;
		case "keyboard": return n === P.KEYBOARD;
	}
	return !1;
}
async function en(e, t, n) {
	return e?.length ? await Promise.all(e.map(async (e) => {
		let r = b.revive(e.fileUri);
		if (!r) {
			n.info("Cannot resolve the path because it is not valid.", e);
			return;
		}
		if (!await t.canHandleResource(r)) {
			n.info("Cannot resolve the path because it cannot be handled", e);
			return;
		}
		let i = e.exists, a = e.type;
		if (typeof i != "boolean" || typeof a != "number") try {
			a = (await t.stat(r)).isDirectory ? Pt.Directory : Pt.Unknown, i = !0;
		} catch (e) {
			n.error(e), i = !1;
		}
		if (!i && e.openOnlyIfExists) {
			n.info("Cannot resolve the path because it does not exist", e);
			return;
		}
		if (a === Pt.Directory) {
			n.info("Cannot resolve the path because it is a directory", e);
			return;
		}
		let o = {
			...e.options,
			pinned: !0
		};
		return i ? {
			resource: r,
			options: o
		} : {
			resource: r,
			options: o,
			forceUntitled: !0
		};
	})) : [];
}
function tn(e) {
	let t = e;
	if (!t) return !1;
	let n = t;
	if (n.modified) return tn(n.modified);
	let r = t;
	return !!(r.contributionsState && r.viewState && Array.isArray(r.cursorState));
}
function nn(e) {
	return qe(e);
}
function rn(e, t, n) {
	let r = We(e, t);
	return r.forceMessage = n?.forceMessage, r.forceSeverity = n?.forceSeverity, r.allowDialog = n?.allowDialog, r;
}
var an, on, sn, cn, ln, un, dn, A, j, fn, pn, M, mn, hn, gn, N, _n, P, F, vn, yn, bn, I = e((() => {
	v(), re(), st(), S(), f(), ye(), he(), rt(), Ue(), Tt(), fe(), an = {
		EditorPane: "workbench.contributions.editors",
		EditorFactory: "workbench.contributions.editor.inputFactories"
	}, on = {
		id: "default",
		displayName: i(4048, "Text Editor"),
		providerDisplayName: i(4049, "Built-in")
	}, sn = "workbench.editor.sidebysideEditor", cn = "workbench.editors.textDiffEditor", ln = "workbench.editors.binaryResourceDiffEditor", (function(e) {
		e[e.PROGRAMMATIC = 1] = "PROGRAMMATIC", e[e.USER = 2] = "USER", e[e.EDIT = 3] = "EDIT", e[e.NAVIGATION = 4] = "NAVIGATION", e[e.JUMP = 5] = "JUMP";
	})(un ||= {}), (function(e) {
		e[e.IDENTICAL = 1] = "IDENTICAL", e[e.SIMILAR = 2] = "SIMILAR", e[e.DIFFERENT = 3] = "DIFFERENT";
	})(dn ||= {}), (function(e) {
		e[e.SHORT = 0] = "SHORT", e[e.MEDIUM = 1] = "MEDIUM", e[e.LONG = 2] = "LONG";
	})(A ||= {}), (function(e) {
		e[e.EXPLICIT = 1] = "EXPLICIT", e[e.AUTO = 2] = "AUTO", e[e.FOCUS_CHANGE = 3] = "FOCUS_CHANGE", e[e.WINDOW_CHANGE = 4] = "WINDOW_CHANGE";
	})(j ||= {}), fn = class {
		constructor() {
			this.mapIdToSaveSource = /* @__PURE__ */ new Map();
		}
		registerSource(e, t) {
			let n = this.mapIdToSaveSource.get(e);
			return n || (n = {
				source: e,
				label: t
			}, this.mapIdToSaveSource.set(e, n)), n.source;
		}
		getSourceLabel(e) {
			return this.mapIdToSaveSource.get(e)?.label ?? e;
		}
	}, pn = new fn(), (function(e) {
		e[e.None = 0] = "None", e[e.Readonly = 2] = "Readonly", e[e.Untitled = 4] = "Untitled", e[e.Singleton = 8] = "Singleton", e[e.RequiresTrust = 16] = "RequiresTrust", e[e.CanSplitInGroup = 32] = "CanSplitInGroup", e[e.ForceDescription = 64] = "ForceDescription", e[e.CanDropIntoEditor = 128] = "CanDropIntoEditor", e[e.MultipleEditors = 256] = "MultipleEditors", e[e.Scratchpad = 512] = "Scratchpad";
	})(M ||= {}), mn = class extends t {}, (function(e) {
		e[e.UNKNOWN = 0] = "UNKNOWN", e[e.REPLACE = 1] = "REPLACE", e[e.MOVE = 2] = "MOVE", e[e.UNPIN = 3] = "UNPIN";
	})(hn ||= {}), (function(e) {
		e[e.GROUP_ACTIVE = 0] = "GROUP_ACTIVE", e[e.GROUP_INDEX = 1] = "GROUP_INDEX", e[e.GROUP_LABEL = 2] = "GROUP_LABEL", e[e.GROUP_LOCKED = 3] = "GROUP_LOCKED", e[e.EDITORS_SELECTION = 4] = "EDITORS_SELECTION", e[e.EDITOR_OPEN = 5] = "EDITOR_OPEN", e[e.EDITOR_CLOSE = 6] = "EDITOR_CLOSE", e[e.EDITOR_MOVE = 7] = "EDITOR_MOVE", e[e.EDITOR_ACTIVE = 8] = "EDITOR_ACTIVE", e[e.EDITOR_LABEL = 9] = "EDITOR_LABEL", e[e.EDITOR_CAPABILITIES = 10] = "EDITOR_CAPABILITIES", e[e.EDITOR_PIN = 11] = "EDITOR_PIN", e[e.EDITOR_TRANSIENT = 12] = "EDITOR_TRANSIENT", e[e.EDITOR_STICKY = 13] = "EDITOR_STICKY", e[e.EDITOR_DIRTY = 14] = "EDITOR_DIRTY", e[e.EDITOR_WILL_DISPOSE = 15] = "EDITOR_WILL_DISPOSE";
	})(gn ||= {}), (function(e) {
		e[e.PRIMARY = 1] = "PRIMARY", e[e.SECONDARY = 2] = "SECONDARY", e[e.BOTH = 3] = "BOTH", e[e.ANY = 4] = "ANY";
	})(N ||= {}), _n = class {
		getOriginalUri(e, t) {
			if (!e) return;
			if (O(e)) return F.getOriginalUri(e.result, t);
			if (t?.supportSideBySide) {
				let { primary: n, secondary: r } = this.getSideEditors(e);
				if (n && r) {
					if (t?.supportSideBySide === N.BOTH) return {
						primary: this.getOriginalUri(n, { filterByScheme: t.filterByScheme }),
						secondary: this.getOriginalUri(r, { filterByScheme: t.filterByScheme })
					};
					if (t?.supportSideBySide === N.ANY) return this.getOriginalUri(n, { filterByScheme: t.filterByScheme }) ?? this.getOriginalUri(r, { filterByScheme: t.filterByScheme });
					e = t.supportSideBySide === N.PRIMARY ? n : r;
				}
			}
			if (T(e) || E(e) || D(e) || O(e)) return;
			let n = Gt(e) ? e.preferredResource : e.resource;
			return !n || !t?.filterByScheme ? n : this.filterUri(n, t.filterByScheme);
		}
		getSideEditors(e) {
			return Kt(e) || D(e) ? {
				primary: e.primary,
				secondary: e.secondary
			} : qt(e) || T(e) ? {
				primary: e.modified,
				secondary: e.original
			} : {
				primary: void 0,
				secondary: void 0
			};
		}
		getCanonicalUri(e, t) {
			if (!e) return;
			if (O(e)) return F.getCanonicalUri(e.result, t);
			if (t?.supportSideBySide) {
				let { primary: n, secondary: r } = this.getSideEditors(e);
				if (n && r) {
					if (t?.supportSideBySide === N.BOTH) return {
						primary: this.getCanonicalUri(n, { filterByScheme: t.filterByScheme }),
						secondary: this.getCanonicalUri(r, { filterByScheme: t.filterByScheme })
					};
					if (t?.supportSideBySide === N.ANY) return this.getCanonicalUri(n, { filterByScheme: t.filterByScheme }) ?? this.getCanonicalUri(r, { filterByScheme: t.filterByScheme });
					e = t.supportSideBySide === N.PRIMARY ? n : r;
				}
			}
			if (T(e) || E(e) || D(e) || O(e)) return;
			let n = e.resource;
			return !n || !t?.filterByScheme ? n : this.filterUri(n, t.filterByScheme);
		}
		filterUri(e, t) {
			if (Array.isArray(t)) {
				if (t.some((t) => e.scheme === t)) return e;
			} else if (t === e.scheme) return e;
		}
	}, (function(e) {
		e[e.UNKNOWN = 0] = "UNKNOWN", e[e.KEYBOARD = 1] = "KEYBOARD", e[e.MOUSE = 2] = "MOUSE";
	})(P ||= {}), F = new _n(), (function(e) {
		e[e.LEFT = 0] = "LEFT", e[e.RIGHT = 1] = "RIGHT";
	})(vn ||= {}), yn = class {
		constructor() {
			this.editorSerializerConstructors = /* @__PURE__ */ new Map(), this.editorSerializerInstances = /* @__PURE__ */ new Map();
		}
		start(e) {
			let t = this.instantiationService = e.get(xe);
			for (let [e, n] of this.editorSerializerConstructors) this.createEditorSerializer(e, n, t);
			this.editorSerializerConstructors.clear();
		}
		createEditorSerializer(e, t, n) {
			let r = n.createInstance(t);
			this.editorSerializerInstances.set(e, r);
		}
		registerFileEditorFactory(e) {
			if (this.fileEditorFactory) throw Error("Can only register one file editor factory.");
			this.fileEditorFactory = e;
		}
		getFileEditorFactory() {
			return nt(this.fileEditorFactory);
		}
		registerEditorSerializer(e, t) {
			if (this.editorSerializerConstructors.has(e) || this.editorSerializerInstances.has(e)) throw Error(`A editor serializer with type ID '${e}' was already registered.`);
			return this.instantiationService ? this.createEditorSerializer(e, t, this.instantiationService) : this.editorSerializerConstructors.set(e, t), ct(() => {
				this.editorSerializerConstructors.delete(e), this.editorSerializerInstances.delete(e);
			});
		}
		getEditorSerializer(e) {
			return this.editorSerializerInstances.get(typeof e == "string" ? e : e.typeId);
		}
	}, ue.add(an.EditorFactory, new yn()), (function(e) {
		e[e.MOST_RECENTLY_ACTIVE = 0] = "MOST_RECENTLY_ACTIVE", e[e.SEQUENTIAL = 1] = "SEQUENTIAL";
	})(bn ||= {});
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/editor/common/editorGroupsService.js
function xn(e) {
	let t = e;
	return k(t?.editor) && k(t?.replacement);
}
function Sn(e) {
	let t = e;
	return !!t && typeof t.id == "number" && Array.isArray(t.editors);
}
function Cn(e) {
	return e.getValue("workbench.editor.openSideBySideDirection") === "down" ? L.DOWN : L.RIGHT;
}
var L, wn, Tn, En, Dn, On, kn, An = e((() => {
	I(), (function(e) {
		e[e.UP = 0] = "UP", e[e.DOWN = 1] = "DOWN", e[e.LEFT = 2] = "LEFT", e[e.RIGHT = 3] = "RIGHT";
	})(L ||= {}), (function(e) {
		e[e.HORIZONTAL = 0] = "HORIZONTAL", e[e.VERTICAL = 1] = "VERTICAL";
	})(wn ||= {}), (function(e) {
		e[e.FIRST = 0] = "FIRST", e[e.LAST = 1] = "LAST", e[e.NEXT = 2] = "NEXT", e[e.PREVIOUS = 3] = "PREVIOUS";
	})(Tn ||= {}), (function(e) {
		e[e.MAXIMIZE = 0] = "MAXIMIZE", e[e.EXPAND = 1] = "EXPAND", e[e.EVEN = 2] = "EVEN";
	})(En ||= {}), (function(e) {
		e[e.COPY_EDITORS = 0] = "COPY_EDITORS", e[e.MOVE_EDITORS = 1] = "MOVE_EDITORS";
	})(Dn ||= {}), (function(e) {
		e[e.CREATION_TIME = 0] = "CREATION_TIME", e[e.MOST_RECENTLY_ACTIVE = 1] = "MOST_RECENTLY_ACTIVE", e[e.GRID_APPEARANCE = 2] = "GRID_APPEARANCE";
	})(On ||= {}), (function(e) {
		e[e.NEW_EDITOR = 1] = "NEW_EDITOR", e[e.MOVE_EDITOR = 2] = "MOVE_EDITOR", e[e.COPY_EDITOR = 3] = "COPY_EDITOR";
	})(kn ||= {});
})), R, jn = e((() => {
	f(), R = _("editorService");
})), Mn, Nn = e((() => {
	f(), Mn = _("untitledTextEditorService");
})), z, Pn = e((() => {
	p(), I(), He(), z = class extends mn {
		constructor() {
			super(...arguments), this._onDidChangeDirty = this._register(new c()), this._onDidChangeLabel = this._register(new c()), this._onDidChangeCapabilities = this._register(new c()), this._onWillDispose = this._register(new c()), this.onDidChangeDirty = this._onDidChangeDirty.event, this.onDidChangeLabel = this._onDidChangeLabel.event, this.onDidChangeCapabilities = this._onDidChangeCapabilities.event, this.onWillDispose = this._onWillDispose.event;
		}
		get editorId() {}
		get capabilities() {
			return M.Readonly;
		}
		hasCapability(e) {
			return e === M.None ? this.capabilities === M.None : (this.capabilities & e) !== 0;
		}
		isReadonly() {
			return this.hasCapability(M.Readonly);
		}
		getName() {
			return `Editor ${this.typeId}`;
		}
		getDescription(e) {}
		getTitle(e) {
			return this.getName();
		}
		getLabelExtraClasses() {
			return [];
		}
		getAriaLabel() {
			return this.getTitle(A.SHORT);
		}
		getIcon() {}
		getTelemetryDescriptor() {
			return { typeId: this.typeId };
		}
		isDirty() {
			return !1;
		}
		isModified() {
			return this.isDirty();
		}
		isSaving() {
			return !1;
		}
		async resolve() {
			return null;
		}
		async save(e, t) {
			return this;
		}
		async saveAs(e, t) {
			return this;
		}
		async revert(e, t) {}
		async rename(e, t) {}
		copy() {
			return this;
		}
		canMove(e, t) {
			return !0;
		}
		canReopen() {
			return !0;
		}
		matches(e) {
			if (k(e)) return this === e;
			let t = e.options?.override;
			return this.editorId !== t && t !== void 0 && this.editorId !== void 0 ? !1 : Ne(this.resource, F.getCanonicalUri(e));
		}
		prefersEditorPane(e) {
			return e.at(0);
		}
		toUntyped(e) {}
		isDisposed() {
			return this._store.isDisposed;
		}
		dispose() {
			this.isDisposed() || this._onWillDispose.fire(), super.dispose();
		}
	};
})), B, V, Fn, In, Ln = e((() => {
	x(), p(), v(), ye(), I(), Pn(), jn(), V = class extends z {
		static {
			B = this;
		}
		static {
			this.ID = "workbench.editorinputs.sidebysideEditorInput";
		}
		get typeId() {
			return B.ID;
		}
		get capabilities() {
			let e = this.primary.capabilities;
			return e &= ~M.CanSplitInGroup, this.secondary.hasCapability(M.RequiresTrust) && (e |= M.RequiresTrust), this.secondary.hasCapability(M.Singleton) && (e |= M.Singleton), e |= M.MultipleEditors, e;
		}
		get resource() {
			if (this.hasIdenticalSides) return this.primary.resource;
		}
		constructor(e, t, n, r, i) {
			super(), this.preferredName = e, this.preferredDescription = t, this.secondary = n, this.primary = r, this.editorService = i, this.hasIdenticalSides = this.primary.matches(this.secondary), this.registerListeners();
		}
		registerListeners() {
			this._register(Ie.once(Ie.any(this.primary.onWillDispose, this.secondary.onWillDispose))(() => {
				this.isDisposed() || this.dispose();
			})), this._register(this.primary.onDidChangeDirty(() => this._onDidChangeDirty.fire())), this._register(this.primary.onDidChangeCapabilities(() => this._onDidChangeCapabilities.fire())), this._register(this.secondary.onDidChangeCapabilities(() => this._onDidChangeCapabilities.fire())), this._register(this.primary.onDidChangeLabel(() => this._onDidChangeLabel.fire())), this._register(this.secondary.onDidChangeLabel(() => this._onDidChangeLabel.fire()));
		}
		getName() {
			return this.getPreferredName() || (this.hasIdenticalSides ? this.primary.getName() : i(4053, "{0} - {1}", this.secondary.getName(), this.primary.getName()));
		}
		getPreferredName() {
			return this.preferredName;
		}
		getDescription(e) {
			return this.getPreferredDescription() || (this.hasIdenticalSides ? this.primary.getDescription(e) : super.getDescription(e));
		}
		getPreferredDescription() {
			return this.preferredDescription;
		}
		getTitle(e) {
			let t;
			t = this.hasIdenticalSides ? this.primary.getTitle(e) ?? this.getName() : super.getTitle(e);
			let n = this.getPreferredTitle();
			return n && (t = `${n} (${t})`), t;
		}
		getPreferredTitle() {
			if (this.preferredName && this.preferredDescription) return `${this.preferredName} ${this.preferredDescription}`;
			if (this.preferredName || this.preferredDescription) return this.preferredName ?? this.preferredDescription;
		}
		getLabelExtraClasses() {
			return this.hasIdenticalSides ? this.primary.getLabelExtraClasses() : super.getLabelExtraClasses();
		}
		getAriaLabel() {
			return this.hasIdenticalSides ? this.primary.getAriaLabel() : super.getAriaLabel();
		}
		getTelemetryDescriptor() {
			return {
				...this.primary.getTelemetryDescriptor(),
				...super.getTelemetryDescriptor()
			};
		}
		isDirty() {
			return this.primary.isDirty();
		}
		isSaving() {
			return this.primary.isSaving();
		}
		async save(e, t) {
			let n = await this.primary.save(e, t);
			return this.saveResultToEditor(n);
		}
		async saveAs(e, t) {
			let n = await this.primary.saveAs(e, t);
			return this.saveResultToEditor(n);
		}
		saveResultToEditor(e) {
			if (!e || !this.hasIdenticalSides) return e;
			if (this.primary.matches(e)) return this;
			if (e instanceof z) return new B(this.preferredName, this.preferredDescription, e, e, this.editorService);
			if (!T(e) && !E(e) && !D(e) && !O(e)) return {
				primary: e,
				secondary: e,
				label: this.preferredName,
				description: this.preferredDescription
			};
		}
		revert(e, t) {
			return this.primary.revert(e, t);
		}
		async rename(e, t) {
			if (!this.hasIdenticalSides) return;
			let n = await this.primary.rename(e, t);
			if (n) {
				if (k(n.editor)) return {
					editor: new B(this.preferredName, this.preferredDescription, n.editor, n.editor, this.editorService),
					options: {
						...n.options,
						viewState: Ht(this, e, this.editorService)
					}
				};
				if (Ut(n.editor)) return { editor: {
					label: this.preferredName,
					description: this.preferredDescription,
					primary: n.editor,
					secondary: n.editor,
					options: {
						...n.options,
						viewState: Ht(this, e, this.editorService)
					}
				} };
			}
		}
		isReadonly() {
			return this.primary.isReadonly();
		}
		toUntyped(e) {
			let t = this.primary.toUntyped(e), n = this.secondary.toUntyped(e);
			if (t && n && !T(t) && !T(n) && !E(t) && !E(n) && !D(t) && !D(n) && !O(t) && !O(n)) {
				let r = {
					label: this.preferredName,
					description: this.preferredDescription,
					primary: t,
					secondary: n
				};
				return typeof e?.preserveViewState == "number" && (r.options = { viewState: Ht(this, e.preserveViewState, this.editorService) }), r;
			}
		}
		matches(e) {
			return this === e ? !0 : qt(e) || T(e) ? !1 : e instanceof B || D(e) ? this.primary.matches(e.primary) && this.secondary.matches(e.secondary) : !1;
		}
	}, V = B = d([h(4, R)], V), Fn = class {
		canSerialize(e) {
			let t = e;
			if (t.primary && t.secondary) {
				let [e, n] = this.getSerializers(t.secondary.typeId, t.primary.typeId);
				return !!(e?.canSerialize(t.secondary) && n?.canSerialize(t.primary));
			}
			return !1;
		}
		serialize(e) {
			let t = e;
			if (t.primary && t.secondary) {
				let [e, n] = this.getSerializers(t.secondary.typeId, t.primary.typeId);
				if (n && e) {
					let r = n.serialize(t.primary), i = e.serialize(t.secondary);
					if (r && i) {
						let e = {
							name: t.getPreferredName(),
							description: t.getPreferredDescription(),
							primarySerialized: r,
							secondarySerialized: i,
							primaryTypeId: t.primary.typeId,
							secondaryTypeId: t.secondary.typeId
						};
						return JSON.stringify(e);
					}
				}
			}
		}
		deserialize(e, t) {
			let n = JSON.parse(t), [r, i] = this.getSerializers(n.secondaryTypeId, n.primaryTypeId);
			if (i && r) {
				let t = i.deserialize(e, n.primarySerialized), a = r.deserialize(e, n.secondarySerialized);
				if (t instanceof z && a instanceof z) return this.createEditorInput(e, n.name, n.description, a, t);
			}
		}
		getSerializers(e, t) {
			let n = ue.as(an.EditorFactory);
			return [n.getEditorSerializer(e), n.getEditorSerializer(t)];
		}
	}, In = class extends Fn {
		createEditorInput(e, t, n, r, i) {
			return e.createInstance(V, t, n, r, i);
		}
	};
})), Rn, zn = e((() => {
	p(), S(), Rn = class extends t {
		constructor() {
			super(...arguments), this._onWillDispose = this._register(new c()), this.onWillDispose = this._onWillDispose.event, this.resolved = !1;
		}
		async resolve() {
			this.resolved = !0;
		}
		isResolved() {
			return this.resolved;
		}
		isDisposed() {
			return this._store.isDisposed;
		}
		dispose() {
			this._onWillDispose.fire(), super.dispose();
		}
	};
})), Bn, Vn, Hn = e((() => {
	Bn = "languageDetection", Vn = "automaticlanguagedetection.likelywrong";
})), Un, Wn = e((() => {
	f(), Un = _("ILanguageDetectionService");
})), Gn, H, Kn = e((() => {
	x(), it(), zn(), Ft(), Fe(), S(), ge(), Hn(), Wn(), De(), Ce(), v(), H = class extends Rn {
		static {
			Gn = this;
		}
		static {
			this.AUTO_DETECT_LANGUAGE_THROTTLE_DELAY = 600;
		}
		constructor(e, t, n, r, i) {
			super(), this.modelService = e, this.languageService = t, this.languageDetectionService = n, this.accessibilityService = r, this.textEditorModelHandle = void 0, this.modelDisposeListener = this._register(new ft()), this.autoDetectLanguageThrottler = this._register(new zt(Gn.AUTO_DETECT_LANGUAGE_THROTTLE_DELAY)), this._blockLanguageChangeListener = !1, this._languageChangeSource = void 0, i && this.handleExistingModel(i);
		}
		handleExistingModel(e) {
			let t = this.modelService.getModel(e);
			if (!t) throw Error(`Document with resource ${e.toString(!0)} does not exist`);
			this.textEditorModelHandle = e, this.registerModelDisposeListener(t);
		}
		registerModelDisposeListener(e) {
			this.modelDisposeListener.value = e.onWillDispose(() => {
				this.textEditorModelHandle = void 0, this.dispose();
			});
		}
		get textEditorModel() {
			return this.textEditorModelHandle ? this.modelService.getModel(this.textEditorModelHandle) : null;
		}
		isReadonly() {
			return !0;
		}
		get languageChangeSource() {
			return this._languageChangeSource;
		}
		get hasLanguageSetExplicitly() {
			return typeof this._languageChangeSource == "string";
		}
		setLanguageId(e, t) {
			this._languageChangeSource = "user", this.setLanguageIdInternal(e, t);
		}
		setLanguageIdInternal(e, t) {
			if (this.isResolved() && !(!e || e === this.textEditorModel.getLanguageId())) {
				this._blockLanguageChangeListener = !0;
				try {
					this.textEditorModel.setLanguage(this.languageService.createById(e), t);
				} finally {
					this._blockLanguageChangeListener = !1;
				}
			}
		}
		installModelListeners(e) {
			let t = this._register(e.onDidChangeLanguage((e) => {
				e.source === "languageDetection" || this._blockLanguageChangeListener || (this._languageChangeSource = "api", t.dispose());
			}));
		}
		getLanguageId() {
			return this.textEditorModel?.getLanguageId();
		}
		autoDetectLanguage() {
			return this.autoDetectLanguageThrottler.trigger(() => this.doAutoDetectLanguage());
		}
		async doAutoDetectLanguage() {
			if (this.hasLanguageSetExplicitly || !this.textEditorModelHandle || !this.languageDetectionService.isEnabledForLanguage(this.getLanguageId() ?? "plaintext")) return;
			let e = await this.languageDetectionService.detectLanguage(this.textEditorModelHandle), t = this.getLanguageId();
			if (e && e !== t && !this.isDisposed()) {
				this.setLanguageIdInternal(e, Bn);
				let t = this.languageService.getLanguageName(e);
				this.accessibilityService.alert(i(4054, "Language {0} was automatically detected and set as the language mode.", t ?? e));
			}
		}
		createTextEditorModel(e, t, n) {
			let r = this.getFirstLineText(e), i = this.getOrCreateLanguage(t, this.languageService, n, r);
			return this.doCreateTextEditorModel(e, i, t);
		}
		doCreateTextEditorModel(e, t, n) {
			let r = n && this.modelService.getModel(n);
			return r ? this.updateTextEditorModel(e, t.languageId) : (r = this.modelService.createModel(e, t, n), this.createdEditorModel = !0, this.registerModelDisposeListener(r)), this.textEditorModelHandle = r.uri, r;
		}
		getFirstLineText(e) {
			let t = e;
			return typeof t.getFirstLineText == "function" ? t.getFirstLineText(Xe.FIRST_LINE_DETECTION_LENGTH_LIMIT) : e.getLineContent(1).substr(0, Xe.FIRST_LINE_DETECTION_LENGTH_LIMIT);
		}
		getOrCreateLanguage(e, t, n, r) {
			return !n || n === "plaintext" ? t.createByFilepathOrFirstLine(e ?? null, r) : t.createById(n);
		}
		updateTextEditorModel(e, t, n) {
			this.isResolved() && (e && this.modelService.updateModel(this.textEditorModel, e, n), t && t !== "plaintext" && this.textEditorModel.getLanguageId() !== t && this.textEditorModel.setLanguage(this.languageService.createById(t)));
		}
		createSnapshot() {
			return this.textEditorModel ? this.textEditorModel.createSnapshot(!0) : null;
		}
		isResolved() {
			return !!this.textEditorModelHandle;
		}
		dispose() {
			this.modelDisposeListener.dispose(), this.textEditorModelHandle && this.createdEditorModel && this.modelService.destroyModel(this.textEditorModelHandle), this.textEditorModelHandle = void 0, this.createdEditorModel = !1, super.dispose();
		}
	}, H = Gn = d([
		h(0, Rt),
		h(1, ne),
		h(2, Un),
		h(3, ht)
	], H);
})), qn, Jn = e((() => {
	zn(), qn = class extends Rn {
		get originalModel() {
			return this._originalModel;
		}
		get modifiedModel() {
			return this._modifiedModel;
		}
		constructor(e, t) {
			super(), this._originalModel = e, this._modifiedModel = t;
		}
		async resolve() {
			await Promise.all([this._originalModel?.resolve(), this._modifiedModel?.resolve()]);
		}
		isResolved() {
			return !!(this._originalModel?.isResolved() && this._modifiedModel?.isResolved());
		}
		dispose() {
			super.dispose();
		}
	};
})), Yn, Xn = e((() => {
	Jn(), Yn = class extends qn {
		get originalModel() {
			return this._originalModel;
		}
		get modifiedModel() {
			return this._modifiedModel;
		}
		get textDiffEditorModel() {
			return this._textDiffEditorModel;
		}
		constructor(e, t) {
			super(e, t), this._textDiffEditorModel = void 0, this._originalModel = e, this._modifiedModel = t, this.updateTextDiffEditorModel();
		}
		async resolve() {
			await super.resolve(), this.updateTextDiffEditorModel();
		}
		updateTextDiffEditorModel() {
			this.originalModel?.isResolved() && this.modifiedModel?.isResolved() && (this._textDiffEditorModel ? (this._textDiffEditorModel.original = this.originalModel.textEditorModel, this._textDiffEditorModel.modified = this.modifiedModel.textEditorModel) : this._textDiffEditorModel = {
				original: this.originalModel.textEditorModel,
				modified: this.modifiedModel.textEditorModel
			});
		}
		isResolved() {
			return !!this._textDiffEditorModel;
		}
		isReadonly() {
			return !!this.modifiedModel && this.modifiedModel.isReadonly();
		}
		dispose() {
			this._textDiffEditorModel = void 0, super.dispose();
		}
	};
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/base/common/labels.js
function Zn(e, t) {
	let { os: n, tildify: r, relative: i } = t;
	if (i) {
		let t = Qn(e, i, n);
		if (typeof t == "string") return t;
	}
	let a = e.fsPath;
	if (n === g.Windows && !m ? a = a.replace(/\//g, "\\") : n !== g.Windows && m && (a = a.replace(/\\/g, "/")), n !== g.Windows && r?.userHome) {
		let t = r.userHome.fsPath, i;
		i = e.scheme !== r.userHome.scheme && e.path[0] === y.sep && e.path[1] !== y.sep ? r.userHome.with({ path: e.path }).fsPath : a, a = er(i, t, n);
	}
	return (n === g.Windows ? Le : y).normalize($n(a, n === g.Windows));
}
function Qn(e, t, n) {
	let r = n === g.Windows ? Le : y, i = n === g.Linux ? le : wt, a = t.getWorkspace(), o = a.folders.at(0);
	if (!o) return;
	e.scheme !== o.uri.scheme && e.path[0] === y.sep && e.path[1] !== y.sep && (e = o.uri.with({ path: e.path }));
	let s = t.getWorkspaceFolder(e);
	if (!s) return;
	let c;
	if (c = i.isEqual(s.uri, e) ? "" : i.relativePath(s.uri, e) ?? "", c &&= r.normalize(c), a.folders.length > 1 && !t.noPrefix) {
		let e = s.name ? s.name : i.basenameOrAuthority(s.uri);
		c = c ? `${e} • ${c}` : e;
	}
	return c;
}
function $n(e, t = m) {
	return Lt(e, t) ? e.charAt(0).toUpperCase() + e.slice(1) : e;
}
function er(e, t, n = ae) {
	if (n === g.Windows || !e || !t) return e;
	let r = lr.original === t ? lr.normalized : void 0;
	r || (r = t, m && (r = gt(r)), r = `${vt(r, y.sep)}${y.sep}`, lr = {
		original: t,
		normalized: r
	});
	let i = e;
	return m && (i = gt(i)), (n === g.Linux ? i.startsWith(r) : Je(i, r)) ? `~/${i.substr(r.length)}` : e;
}
function tr(e, t) {
	return e.replace(/^~($|\/|\\)/, `${t}$1`);
}
function nr(e, t = l) {
	let n = Array(e.length), r = !1;
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		if (a === "") {
			n[i] = `.${t}`;
			continue;
		}
		if (!a) {
			n[i] = a;
			continue;
		}
		r = !0;
		let o = "", s = a;
		s.indexOf(dr) === 0 ? (o = s.substr(0, s.indexOf(dr) + 2), s = s.substr(s.indexOf(dr) + 2)) : s.indexOf(t) === 0 ? (o = s.substr(0, s.indexOf(t) + t.length), s = s.substr(s.indexOf(t) + t.length)) : s.indexOf(fr) === 0 && (o = s.substr(0, s.indexOf(fr) + 1), s = s.substr(s.indexOf(fr) + 1));
		let c = s.split(t);
		for (let a = 1; r && a <= c.length; a++) for (let s = c.length - a; r && s >= 0; s--) {
			r = !1;
			let l = c.slice(s, s + a).join(t);
			for (let n = 0; !r && n < e.length; n++) if (n !== i && e[n] && e[n].indexOf(l) > -1) {
				let i = s + a === c.length, o = s > 0 && e[n].indexOf(t) > -1 ? t + l : l, u = e[n].endsWith(o);
				r = !i || u;
			}
			if (!r) {
				let e = "";
				(c[0].endsWith(":") || o !== "") && (s === 1 && (s = 0, a++, l = c[0] + t + l), s > 0 && (e = c[0] + t), e = o + e), s > 0 && (e = e + ur + t), e += l, s + a < c.length && (e = e + t + ur), n[i] = e;
			}
		}
		r && (n[i] = a);
	}
	return n;
}
function rr(e, t = Object.create(null)) {
	let n = [], r = !1, i = "";
	for (let a of e) if (a === "$" || r && a === "{") i && n.push({
		value: i,
		type: U.TEXT
	}), i = "", r = !0;
	else if (a === "}" && r) {
		let e = t[i];
		if (typeof e == "string") e.length && n.push({
			value: e,
			type: U.VARIABLE
		});
		else if (e) {
			let t = n[n.length - 1];
			(!t || t.type !== U.SEPARATOR) && n.push({
				value: e.label,
				type: U.SEPARATOR
			});
		}
		i = "", r = !1;
	} else i += a;
	return i && !r && n.push({
		value: i,
		type: U.TEXT
	}), n.filter((e, t) => e.type !== U.SEPARATOR || [n[t - 1], n[t + 1]].every((e) => e && (e.type === U.VARIABLE || e.type === U.TEXT) && e.value.length > 0)).map((e) => e.value).join("");
}
function ir(e, t) {
	return u || t ? e.replace(/\(&&\w\)|&&/g, "").replace(/&/g, u ? "&" : "&&") : e.replace(/&&|&/g, (e) => e === "&" ? "&&" : "&");
}
function ar(e, t) {
	let n = e.replace(/\(&&\w\)|&&/g, "");
	if (t) return n;
	if (u) return {
		withMnemonic: n,
		withoutMnemonic: n
	};
	let r;
	return r = m ? e.replace(/&&|&/g, (e) => e === "&" ? "&&" : "&") : e.replace(/&&/g, "_"), {
		withMnemonic: r,
		withoutMnemonic: n
	};
}
function or(e) {
	return e.replace(/&/g, "&&");
}
function sr(e) {
	if (e.endsWith("]")) {
		let t = e.lastIndexOf(" [", e.length - 2);
		if (t !== -1) {
			let n = cr(e.substring(0, t)), r = e.substring(t);
			return {
				name: n.name + r,
				parentPath: n.parentPath
			};
		}
	}
	return cr(e);
}
function cr(e) {
	let t = e.indexOf("/") === -1 ? Le : y, n = t.basename(e), r = t.dirname(e);
	return n.length ? {
		name: n,
		parentPath: r
	} : {
		name: r,
		parentPath: ""
	};
}
var lr, ur, dr, fr, U, pr = e((() => {
	te(), we(), mt(), He(), Ke(), lr = Object.create(null), ur = "…", dr = "\\\\", fr = "~", (function(e) {
		e[e.TEXT = 0] = "TEXT", e[e.VARIABLE = 1] = "VARIABLE", e[e.SEPARATOR = 2] = "SEPARATOR";
	})(U ||= {});
})), mr, W, hr, gr = e((() => {
	x(), v(), Ln(), I(), Kn(), Jn(), Xn(), jn(), pr(), a(), W = class extends V {
		static {
			mr = this;
		}
		static {
			this.ID = "workbench.editors.diffEditorInput";
		}
		get typeId() {
			return mr.ID;
		}
		get editorId() {
			return this.modified.editorId === this.original.editorId ? this.modified.editorId : void 0;
		}
		get capabilities() {
			let e = super.capabilities;
			return this.labels.forceDescription && (e |= M.ForceDescription), e;
		}
		constructor(e, t, n, r, i, a) {
			super(e, t, n, r, a), this.original = n, this.modified = r, this.forceOpenAsBinary = i, this.cachedModel = void 0, this.labels = this.computeLabels();
		}
		computeLabels() {
			let e, t = !1;
			if (this.preferredName) e = this.preferredName;
			else {
				let n = this.original.getName(), r = this.modified.getName();
				e = i(4052, "{0} ↔ {1}", n, r), t = n === r;
			}
			let n, r, a;
			if (this.preferredDescription) n = this.preferredDescription, r = this.preferredDescription, a = this.preferredDescription;
			else {
				n = this.computeLabel(this.original.getDescription(A.SHORT), this.modified.getDescription(A.SHORT)), a = this.computeLabel(this.original.getDescription(A.LONG), this.modified.getDescription(A.LONG));
				let e = this.original.getDescription(A.MEDIUM), t = this.modified.getDescription(A.MEDIUM);
				if (typeof e == "string" && typeof t == "string" && (e || t)) {
					let [n, i] = nr([e, t]);
					r = this.computeLabel(n, i);
				}
			}
			let o = this.computeLabel(this.original.getTitle(A.SHORT) ?? this.original.getName(), this.modified.getTitle(A.SHORT) ?? this.modified.getName(), " ↔ "), s = this.computeLabel(this.original.getTitle(A.MEDIUM) ?? this.original.getName(), this.modified.getTitle(A.MEDIUM) ?? this.modified.getName(), " ↔ "), c = this.computeLabel(this.original.getTitle(A.LONG) ?? this.original.getName(), this.modified.getTitle(A.LONG) ?? this.modified.getName(), " ↔ "), l = this.getPreferredTitle();
			return l && (o = `${l} (${o})`, s = `${l} (${s})`, c = `${l} (${c})`), {
				name: e,
				shortDescription: n,
				mediumDescription: r,
				longDescription: a,
				forceDescription: t,
				shortTitle: o,
				mediumTitle: s,
				longTitle: c
			};
		}
		computeLabel(e, t, n = " - ") {
			if (!(!e || !t)) return e === t ? t : `${e}${n}${t}`;
		}
		getName() {
			return this.labels.name;
		}
		getDescription(e = A.MEDIUM) {
			switch (e) {
				case A.SHORT: return this.labels.shortDescription;
				case A.LONG: return this.labels.longDescription;
				case A.MEDIUM:
				default: return this.labels.mediumDescription;
			}
		}
		getTitle(e) {
			switch (e) {
				case A.SHORT: return this.labels.shortTitle;
				case A.LONG: return this.labels.longTitle;
				default:
				case A.MEDIUM: return this.labels.mediumTitle;
			}
		}
		async resolve() {
			let e = await this.createModel();
			return this.cachedModel?.dispose(), this.cachedModel = e, this.cachedModel;
		}
		prefersEditorPane(e) {
			return this.forceOpenAsBinary ? e.find((e) => e.typeId === ln) : e.find((e) => e.typeId === cn);
		}
		async createModel() {
			let [e, t] = await Promise.all([this.original.resolve(), this.modified.resolve()]);
			return t instanceof H && e instanceof H ? new Yn(e, t) : new qn(pt(e) ? e : void 0, pt(t) ? t : void 0);
		}
		toUntyped(e) {
			let t = super.toUntyped(e);
			if (t) return {
				...t,
				modified: t.primary,
				original: t.secondary
			};
		}
		matches(e) {
			return this === e ? !0 : e instanceof mr ? this.modified.matches(e.modified) && this.original.matches(e.original) && e.forceOpenAsBinary === this.forceOpenAsBinary : T(e) ? this.modified.matches(e.modified) && this.original.matches(e.original) : !1;
		}
		dispose() {
			this.cachedModel &&= (this.cachedModel.dispose(), void 0), super.dispose();
		}
	}, W = mr = d([h(5, R)], W), hr = class extends Fn {
		createEditorInput(e, t, n, r, i) {
			return e.createInstance(W, t, n, r, i, void 0);
		}
	};
})), _r, vr = e((() => {
	f(), _r = _("filesConfigurationService");
})), yr, br = e((() => {
	f(), yr = _("textFileService");
})), xr, Sr = e((() => {
	se(), f(), xr = pe(je);
})), Cr, wr = e((() => {
	f(), Cr = _("pathService");
})), Tr, Er = e((() => {
	f(), Tr = _("editorGroupsService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/lifecycle/common/lifecycle.js
function Dr(e) {
	switch (e) {
		case G.Starting: return "Starting";
		case G.Ready: return "Ready";
		case G.Restored: return "Restored";
		case G.Eventually: return "Eventually";
	}
}
var Or, kr, Ar, G, jr = e((() => {
	(function(e) {
		e[e.Default = 1] = "Default", e[e.Last = 2] = "Last";
	})(Or ||= {}), (function(e) {
		e[e.CLOSE = 1] = "CLOSE", e[e.QUIT = 2] = "QUIT", e[e.RELOAD = 3] = "RELOAD", e[e.LOAD = 4] = "LOAD";
	})(kr ||= {}), (function(e) {
		e[e.NewWindow = 1] = "NewWindow", e[e.ReloadedWindow = 3] = "ReloadedWindow", e[e.ReopenedWindow = 4] = "ReopenedWindow";
	})(Ar ||= {}), (function(e) {
		e[e.Starting = 1] = "Starting", e[e.Ready = 2] = "Ready", e[e.Restored = 3] = "Restored", e[e.Eventually = 4] = "Eventually";
	})(G ||= {});
})), Mr, Nr = e((() => {
	f(), Mr = _("lifecycleService");
})), Pr, Fr = e((() => {
	f(), Pr = _("editorPaneService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/common/contributions.js
function Ir(e) {
	let t = e;
	return !!t && typeof t.editorTypeId == "string";
}
function Lr(e) {
	switch (e) {
		case G.Restored: return K.AfterRestored;
		case G.Eventually: return K.Eventually;
	}
}
function Rr(e) {
	switch (e) {
		case K.BlockStartup: return G.Starting;
		case K.BlockRestore: return G.Ready;
		case K.AfterRestored: return G.Restored;
		case K.Eventually: return G.Eventually;
	}
}
var zr, K, q, Br, Vr = e((() => {
	f(), jr(), Nr(), ye(), De(), tt(), Dt(), se(), r(), S(), Fr(), (function(e) {
		e.Workbench = "workbench.contributions.kind";
	})(zr ||= {}), (function(e) {
		e[e.BlockStartup = 1] = "BlockStartup", e[e.BlockRestore = 2] = "BlockRestore", e[e.AfterRestored = 3] = "AfterRestored", e[e.Eventually = 4] = "Eventually";
	})(K ||= {}), q = class e extends t {
		constructor() {
			super(...arguments), this.contributionsByPhase = /* @__PURE__ */ new Map(), this.contributionsByEditor = /* @__PURE__ */ new Map(), this.contributionsById = /* @__PURE__ */ new Map(), this.instancesById = /* @__PURE__ */ new Map(), this.instanceDisposables = this._register(new bt()), this.timingsByPhase = /* @__PURE__ */ new Map(), this.pendingRestoredContributions = new Ye(), this.whenRestored = this.pendingRestoredContributions.p;
		}
		static {
			this.INSTANCE = new e();
		}
		static {
			this.BLOCK_BEFORE_RESTORE_WARN_THRESHOLD = 20;
		}
		static {
			this.BLOCK_AFTER_RESTORE_WARN_THRESHOLD = 100;
		}
		get timings() {
			return this.timingsByPhase;
		}
		registerWorkbenchContribution2(e, t, n) {
			let r = {
				id: e,
				ctor: t
			};
			this.instantiationService && this.lifecycleService && this.logService && this.environmentService && this.editorPaneService && (typeof n == "number" && this.lifecycleService.phase >= n || typeof e == "string" && Ir(n) && this.editorPaneService.didInstantiateEditorPane(n.editorTypeId)) ? this.safeCreateContribution(this.instantiationService, this.logService, this.environmentService, r, typeof n == "number" ? Rr(n) : this.lifecycleService.phase) : (typeof n == "number" && Pe(this.contributionsByPhase, Rr(n), []).push(r), typeof e == "string" && (this.contributionsById.has(e) ? console.error(`IWorkbenchContributionsRegistry#registerWorkbenchContribution(): Can't register multiple contributions with same id '${e}'`) : this.contributionsById.set(e, r), Ir(n) && Pe(this.contributionsByEditor, n.editorTypeId, []).push(r)));
		}
		registerWorkbenchContribution(e, t) {
			this.registerWorkbenchContribution2(void 0, e, Lr(t));
		}
		getWorkbenchContribution(e) {
			if (this.instancesById.has(e)) return this.instancesById.get(e);
			let t = this.instantiationService, n = this.lifecycleService, r = this.logService, i = this.environmentService;
			if (!t || !n || !r || !i) throw Error(`IWorkbenchContributionsRegistry#getContribution('${e}'): cannot be called before registry started`);
			let a = this.contributionsById.get(e);
			if (!a) throw Error(`IWorkbenchContributionsRegistry#getContribution('${e}'): contribution with that identifier is unknown.`);
			n.phase < G.Restored && r.warn(`IWorkbenchContributionsRegistry#getContribution('${e}'): contribution instantiated before LifecyclePhase.Restored!`), this.safeCreateContribution(t, r, i, a, n.phase);
			let o = this.instancesById.get(e);
			if (!o) throw Error(`IWorkbenchContributionsRegistry#getContribution('${e}'): failed to create contribution.`);
			return o;
		}
		start(e) {
			let t = this.instantiationService = e.get(xe), n = this.lifecycleService = e.get(Mr), r = this.logService = e.get(jt), i = this.environmentService = e.get(je), a = this.editorPaneService = e.get(Pr);
			this._register(n.onDidShutdown(() => {
				this.instanceDisposables.clear();
			}));
			for (let e of [
				G.Starting,
				G.Ready,
				G.Restored,
				G.Eventually
			]) this.instantiateByPhase(t, n, r, i, e);
			for (let e of this.contributionsByEditor.keys()) a.didInstantiateEditorPane(e) && this.onEditor(e, t, n, r, i);
			this._register(a.onWillInstantiateEditorPane((e) => this.onEditor(e.typeId, t, n, r, i)));
		}
		onEditor(e, t, n, r, i) {
			let a = this.contributionsByEditor.get(e);
			if (a) {
				this.contributionsByEditor.delete(e);
				for (let e of a) this.safeCreateContribution(t, r, i, e, n.phase);
			}
		}
		instantiateByPhase(e, t, n, r, i) {
			t.phase >= i ? this.doInstantiateByPhase(e, n, r, i) : t.when(i).then(() => this.doInstantiateByPhase(e, n, r, i));
		}
		async doInstantiateByPhase(e, t, n, r) {
			let i = this.contributionsByPhase.get(r);
			if (i) switch (this.contributionsByPhase.delete(r), r) {
				case G.Starting:
				case G.Ready:
					C(`code/willCreateWorkbenchContributions/${r}`);
					for (let a of i) this.safeCreateContribution(e, t, n, a, r);
					C(`code/didCreateWorkbenchContributions/${r}`);
					break;
				case G.Restored:
				case G.Eventually:
					r === G.Eventually && await this.pendingRestoredContributions.p, this.doInstantiateWhenIdle(i, e, t, n, r);
					break;
			}
		}
		doInstantiateWhenIdle(e, t, n, r, i) {
			C(`code/willCreateWorkbenchContributions/${i}`);
			let a = 0, o = i === G.Eventually ? 3e3 : 500, s = (c) => {
				for (; a < e.length;) {
					let l = e[a++];
					if (this.safeCreateContribution(t, n, r, l, i), c.timeRemaining() < 1) {
						me(s, o);
						break;
					}
				}
				a === e.length && (C(`code/didCreateWorkbenchContributions/${i}`), i === G.Restored && this.pendingRestoredContributions.complete());
			};
			me(s, o);
		}
		safeCreateContribution(t, n, r, i, a) {
			if (typeof i.id == "string" && this.instancesById.has(i.id)) return;
			let o = Date.now();
			try {
				typeof i.id == "string" && C(`code/willCreateWorkbenchContribution/${a}/${i.id}`);
				let e = t.createInstance(i.ctor);
				typeof i.id == "string" && (this.instancesById.set(i.id, e), this.contributionsById.delete(i.id)), at(e) && this.instanceDisposables.add(e);
			} catch (e) {
				n.error(`Unable to create workbench contribution '${i.id ?? i.ctor.name}'.`, e);
			} finally {
				typeof i.id == "string" && C(`code/didCreateWorkbenchContribution/${a}/${i.id}`);
			}
			if (typeof i.id == "string" || !r.isBuilt) {
				let t = Date.now() - o;
				if (t > (a < G.Restored ? e.BLOCK_BEFORE_RESTORE_WARN_THRESHOLD : e.BLOCK_AFTER_RESTORE_WARN_THRESHOLD) && n.warn(`Creation of workbench contribution '${i.id ?? i.ctor.name}' took ${t}ms.`), typeof i.id == "string") {
					let e = this.timingsByPhase.get(a);
					e || (e = [], this.timingsByPhase.set(a, e)), e.push([i.id, t]);
				}
			}
		}
	}, Br = q.INSTANCE.registerWorkbenchContribution2.bind(q.INSTANCE), q.INSTANCE.getWorkbenchContribution.bind(q.INSTANCE), ue.add(zr.Workbench, q.INSTANCE);
})), J, Y, Hr = e((() => {
	x(), st(), et(), we(), p(), He(), S(), ie(), xt(), Ae(), rt(), r(), te(), Y = class extends t {
		static {
			J = this;
		}
		static {
			this.NO_FOLDER = null;
		}
		constructor(e, t, n, r) {
			super(), this.getExpression = e, this.shouldUpdate = t, this.contextService = n, this.configurationService = r, this._onExpressionChange = this._register(new c()), this.onExpressionChange = this._onExpressionChange.event, this.mapFolderToParsedExpression = /* @__PURE__ */ new Map(), this.mapFolderToConfiguredExpression = /* @__PURE__ */ new Map(), this.updateExpressions(!1), this.registerListeners();
		}
		registerListeners() {
			this._register(this.configurationService.onDidChangeConfiguration((e) => {
				this.shouldUpdate(e) && this.updateExpressions(!0);
			})), this._register(this.contextService.onDidChangeWorkspaceFolders(() => this.updateExpressions(!0)));
		}
		updateExpressions(e) {
			let t = !1;
			for (let e of this.contextService.getWorkspace().folders) {
				let n = e.uri.toString(), r = this.doGetExpression(e.uri), i = this.mapFolderToConfiguredExpression.get(n);
				r ? (!i || !Nt(i.expression, r.expression)) && (t = !0, this.mapFolderToParsedExpression.set(n, o(r.expression)), this.mapFolderToConfiguredExpression.set(n, r)) : i && (t = !0, this.mapFolderToParsedExpression.delete(n), this.mapFolderToConfiguredExpression.delete(n));
			}
			let n = new Ge(this.contextService.getWorkspace().folders.map((e) => e.uri));
			for (let [e] of this.mapFolderToConfiguredExpression) e !== J.NO_FOLDER && (n.has(b.parse(e)) || (this.mapFolderToParsedExpression.delete(e), this.mapFolderToConfiguredExpression.delete(e), t = !0));
			let r = this.doGetExpression(void 0), i = this.mapFolderToConfiguredExpression.get(J.NO_FOLDER);
			r ? (!i || !Nt(i.expression, r.expression)) && (t = !0, this.mapFolderToParsedExpression.set(J.NO_FOLDER, o(r.expression)), this.mapFolderToConfiguredExpression.set(J.NO_FOLDER, r)) : i && (t = !0, this.mapFolderToParsedExpression.delete(J.NO_FOLDER), this.mapFolderToConfiguredExpression.delete(J.NO_FOLDER)), e && t && this._onExpressionChange.fire();
		}
		doGetExpression(e) {
			let t = this.getExpression(e);
			if (!t) return;
			let n = Object.keys(t);
			if (n.length === 0) return;
			let r = !1, i = Object.create(null);
			for (let e of n) {
				r ||= Oe(e);
				let n = e, a = $e(n, !0);
				if (a) {
					let e = a.toLowerCase();
					a !== a.toLowerCase() && (n = `${e}${n.substring(1)}`);
				}
				i[n] = t[e];
			}
			return {
				expression: i,
				hasAbsolutePath: r
			};
		}
		matches(e, t) {
			if (this.mapFolderToParsedExpression.size === 0) return !1;
			let n = this.contextService.getWorkspaceFolder(e), r, i;
			if (n && this.mapFolderToParsedExpression.has(n.uri.toString()) ? (r = this.mapFolderToParsedExpression.get(n.uri.toString()), i = this.mapFolderToConfiguredExpression.get(n.uri.toString())) : (r = this.mapFolderToParsedExpression.get(J.NO_FOLDER), i = this.mapFolderToConfiguredExpression.get(J.NO_FOLDER)), !r) return !1;
			let a;
			return a = n ? lt(n.uri, e) : this.uriToPath(e), typeof a == "string" && r(a, void 0, t) ? !0 : a !== this.uriToPath(e) && i?.hasAbsolutePath ? !!r(this.uriToPath(e), void 0, t) : !1;
		}
		uriToPath(e) {
			return e.scheme === Mt.file ? e.fsPath : e.path;
		}
	}, Y = J = d([h(2, Ze), h(3, Te)], Y);
})), X, Ur, Z, Q, $, Wr = e((() => {
	x(), v(), be(), p(), S(), ze(), ut(), Ae(), he(), s(), et(), mt(), xt(), Hr(), De(), Ee(), se(), r(), Pn(), I(), St(), yt(), oe(), f(), Ur = new ee("autoSaveAfterShortDelayContext", !1, !0), (function(e) {
		e[e.OFF = 0] = "OFF", e[e.AFTER_SHORT_DELAY = 1] = "AFTER_SHORT_DELAY", e[e.AFTER_LONG_DELAY = 2] = "AFTER_LONG_DELAY", e[e.ON_FOCUS_CHANGE = 3] = "ON_FOCUS_CHANGE", e[e.ON_WINDOW_CHANGE = 4] = "ON_WINDOW_CHANGE";
	})(Z ||= {}), (function(e) {
		e[e.SETTINGS = 1] = "SETTINGS", e[e.OUT_OF_WORKSPACE = 2] = "OUT_OF_WORKSPACE", e[e.ERRORS = 3] = "ERRORS", e[e.DISABLED = 4] = "DISABLED";
	})(Q ||= {}), $ = class extends t {
		static {
			X = this;
		}
		static {
			this.DEFAULT_AUTO_SAVE_MODE = Ve ? n.AFTER_DELAY : n.OFF;
		}
		static {
			this.DEFAULT_AUTO_SAVE_DELAY = 1e3;
		}
		static {
			this.READONLY_MESSAGES = {
				providerReadonly: {
					value: i(14098, "Editor is read-only because the file system of the file is read-only."),
					isTrusted: !0
				},
				sessionReadonly: {
					value: i(14099, "Editor is read-only because the file was set read-only in this session. [Click here](command:{0}) to set writeable.", "workbench.action.files.setActiveEditorWriteableInSession"),
					isTrusted: !0
				},
				configuredReadonly: {
					value: i(14100, "Editor is read-only because the file was set read-only via settings. [Click here](command:{0}) to configure or [toggle for this session](command:{1}).", "workbench.action.openSettings?%5B%22files.readonly%22%5D", "workbench.action.files.toggleActiveEditorReadonlyInSession"),
					isTrusted: !0
				},
				fileLocked: {
					value: i(14101, "Editor is read-only because of file permissions. [Click here](command:{0}) to set writeable anyway.", "workbench.action.files.setActiveEditorWriteableInSession"),
					isTrusted: !0
				},
				fileReadonly: {
					value: i(14102, "Editor is read-only because the file is read-only."),
					isTrusted: !0
				}
			};
		}
		constructor(e, t, n, r, i, a, o, s) {
			super(), this.configurationService = t, this.contextService = n, this.environmentService = r, this.uriIdentityService = i, this.fileService = a, this.markerService = o, this.textResourceConfigurationService = s, this._onDidChangeAutoSaveConfiguration = this._register(new c()), this.onDidChangeAutoSaveConfiguration = this._onDidChangeAutoSaveConfiguration.event, this._onDidChangeAutoSaveDisabled = this._register(new c()), this.onDidChangeAutoSaveDisabled = this._onDidChangeAutoSaveDisabled.event, this._onDidChangeFilesAssociation = this._register(new c()), this.onDidChangeFilesAssociation = this._onDidChangeFilesAssociation.event, this._onDidChangeReadonly = this._register(new c()), this.onDidChangeReadonly = this._onDidChangeReadonly.event, this.autoSaveConfigurationCache = new Be(1e3), this.autoSaveAfterShortDelayOverrides = new ve(), this.autoSaveDisabledOverrides = new ve(), this.readonlyIncludeMatcher = this._register(new kt(() => this.createReadonlyMatcher(Qe))), this.readonlyExcludeMatcher = this._register(new kt(() => this.createReadonlyMatcher(Ot))), this.sessionReadonlyOverrides = new ve((e) => this.uriIdentityService.extUri.getComparisonKey(e)), this.autoSaveAfterShortDelayContext = Ur.bindTo(e);
			let l = t.getValue();
			this.currentGlobalAutoSaveConfiguration = this.computeAutoSaveConfiguration(void 0, l.files), this.currentFilesAssociationConfiguration = l?.files?.associations, this.currentHotExitConfiguration = l?.files?.hotExit || w.ON_EXIT, this.onFilesConfigurationChange(l, !1), this.registerListeners();
		}
		createReadonlyMatcher(e) {
			let t = this._register(new Y((t) => this.configurationService.getValue(e, { resource: t }), (t) => t.affectsConfiguration(e), this.contextService, this.configurationService));
			return this._register(t.onExpressionChange(() => this._onDidChangeReadonly.fire())), t;
		}
		isReadonly(e, t) {
			let n = this.fileService.getProvider(e.scheme);
			if (n && ce(n)) return n.readOnlyMessage ?? X.READONLY_MESSAGES.providerReadonly;
			let r = this.sessionReadonlyOverrides.get(e);
			return typeof r == "boolean" ? r === !0 && X.READONLY_MESSAGES.sessionReadonly : this.uriIdentityService.extUri.isEqualOrParent(e, this.environmentService.userRoamingDataHome) || this.uriIdentityService.extUri.isEqual(e, this.contextService.getWorkspace().configuration ?? void 0) ? !1 : this.readonlyIncludeMatcher.value.matches(e) ? !this.readonlyExcludeMatcher.value.matches(e) && X.READONLY_MESSAGES.configuredReadonly : this.configuredReadonlyFromPermissions && t?.locked ? X.READONLY_MESSAGES.fileLocked : t?.readonly ? X.READONLY_MESSAGES.fileReadonly : !1;
		}
		async updateReadonly(e, t) {
			if (t === "toggle") {
				let n;
				try {
					n = await this.fileService.resolve(e, { resolveMetadata: !0 });
				} catch {}
				t = !this.isReadonly(e, n);
			}
			t === "reset" ? this.sessionReadonlyOverrides.delete(e) : this.sessionReadonlyOverrides.set(e, t), this._onDidChangeReadonly.fire();
		}
		registerListeners() {
			this._register(this.configurationService.onDidChangeConfiguration((e) => {
				e.affectsConfiguration("files") && this.onFilesConfigurationChange(this.configurationService.getValue(), !0);
			}));
		}
		onFilesConfigurationChange(e, t) {
			this.currentGlobalAutoSaveConfiguration = this.computeAutoSaveConfiguration(void 0, e.files), this.autoSaveConfigurationCache.clear(), this.autoSaveAfterShortDelayContext.set(this.getAutoSaveMode(void 0).mode === Z.AFTER_SHORT_DELAY), t && this._onDidChangeAutoSaveConfiguration.fire();
			let n = e?.files?.associations;
			Nt(this.currentFilesAssociationConfiguration, n) || (this.currentFilesAssociationConfiguration = n, t && this._onDidChangeFilesAssociation.fire());
			let r = e?.files?.hotExit;
			r === w.OFF || r === w.ON_EXIT_AND_WINDOW_CLOSE ? this.currentHotExitConfiguration = r : this.currentHotExitConfiguration = w.ON_EXIT;
			let i = !!e?.files?.readonlyFromPermissions;
			i !== !!this.configuredReadonlyFromPermissions && (this.configuredReadonlyFromPermissions = i, t && this._onDidChangeReadonly.fire());
		}
		getAutoSaveConfiguration(e) {
			let t = this.toResource(e);
			if (t) {
				let e = this.autoSaveConfigurationCache.get(t);
				return e || (e = this.computeAutoSaveConfiguration(t, this.textResourceConfigurationService.getValue(t, "files")), this.autoSaveConfigurationCache.set(t, e)), e;
			}
			return this.currentGlobalAutoSaveConfiguration;
		}
		computeAutoSaveConfiguration(e, t) {
			let r, i, a, o, s, c;
			switch (t?.autoSave ?? X.DEFAULT_AUTO_SAVE_MODE) {
				case n.AFTER_DELAY:
					r = "afterDelay", i = typeof t?.autoSaveDelay == "number" && t.autoSaveDelay >= 0 ? t.autoSaveDelay : X.DEFAULT_AUTO_SAVE_DELAY, c = i <= X.DEFAULT_AUTO_SAVE_DELAY;
					break;
				case n.ON_FOCUS_CHANGE:
					r = "onFocusChange";
					break;
				case n.ON_WINDOW_CHANGE:
					r = "onWindowChange";
					break;
			}
			return t?.autoSaveWorkspaceFilesOnly === !0 && (a = !0, e && !this.contextService.isInsideWorkspace(e) && (s = !0, c = void 0)), t?.autoSaveWhenNoErrors === !0 && (o = !0, c = void 0), {
				autoSave: r,
				autoSaveDelay: i,
				autoSaveWorkspaceFilesOnly: a,
				autoSaveWhenNoErrors: o,
				isOutOfWorkspace: s,
				isShortAutoSaveDelay: c
			};
		}
		toResource(e) {
			return e instanceof z ? F.getOriginalUri(e, { supportSideBySide: N.PRIMARY }) : e;
		}
		hasShortAutoSaveDelay(e) {
			let t = this.toResource(e);
			return t && this.autoSaveAfterShortDelayOverrides.has(t) ? !0 : this.getAutoSaveConfiguration(t).isShortAutoSaveDelay ? !t || !this.autoSaveDisabledOverrides.has(t) : !1;
		}
		getAutoSaveMode(e, t) {
			let n = this.toResource(e);
			if (n && this.autoSaveAfterShortDelayOverrides.has(n)) return { mode: Z.AFTER_SHORT_DELAY };
			if (n && this.autoSaveDisabledOverrides.has(n)) return {
				mode: Z.OFF,
				reason: Q.DISABLED
			};
			let r = this.getAutoSaveConfiguration(n);
			if (r.autoSave === void 0 || typeof t == "number" && (r.autoSave === "afterDelay" && t !== j.AUTO || r.autoSave === "onFocusChange" && t !== j.FOCUS_CHANGE && t !== j.WINDOW_CHANGE || r.autoSave === "onWindowChange" && t !== j.WINDOW_CHANGE)) return {
				mode: Z.OFF,
				reason: Q.SETTINGS
			};
			if (n) {
				if (r.autoSaveWorkspaceFilesOnly && r.isOutOfWorkspace) return {
					mode: Z.OFF,
					reason: Q.OUT_OF_WORKSPACE
				};
				if (r.autoSaveWhenNoErrors && this.markerService.read({
					resource: n,
					take: 1,
					severities: dt.Error
				}).length > 0) return {
					mode: Z.OFF,
					reason: Q.ERRORS
				};
			}
			switch (r.autoSave) {
				case "afterDelay": return typeof r.autoSaveDelay == "number" && r.autoSaveDelay <= X.DEFAULT_AUTO_SAVE_DELAY ? { mode: r.autoSaveWhenNoErrors ? Z.AFTER_LONG_DELAY : Z.AFTER_SHORT_DELAY } : { mode: Z.AFTER_LONG_DELAY };
				case "onFocusChange": return { mode: Z.ON_FOCUS_CHANGE };
				case "onWindowChange": return { mode: Z.ON_WINDOW_CHANGE };
			}
		}
		async toggleAutoSave() {
			let e = this.configurationService.getValue("files.autoSave"), t;
			return t = [
				n.AFTER_DELAY,
				n.ON_FOCUS_CHANGE,
				n.ON_WINDOW_CHANGE
			].some((t) => t === e) ? n.OFF : n.AFTER_DELAY, this.configurationService.updateValue("files.autoSave", t);
		}
		enableAutoSaveAfterShortDelay(e) {
			let n = this.toResource(e);
			if (!n) return t.None;
			let r = this.autoSaveAfterShortDelayOverrides.get(n) ?? 0;
			return this.autoSaveAfterShortDelayOverrides.set(n, r + 1), ct(() => {
				let e = this.autoSaveAfterShortDelayOverrides.get(n) ?? 0;
				e <= 1 ? this.autoSaveAfterShortDelayOverrides.delete(n) : this.autoSaveAfterShortDelayOverrides.set(n, e - 1);
			});
		}
		disableAutoSave(e) {
			let n = this.toResource(e);
			if (!n) return t.None;
			let r = this.autoSaveDisabledOverrides.get(n) ?? 0;
			return this.autoSaveDisabledOverrides.set(n, r + 1), r === 0 && this._onDidChangeAutoSaveDisabled.fire(n), ct(() => {
				let e = this.autoSaveDisabledOverrides.get(n) ?? 0;
				e <= 1 ? (this.autoSaveDisabledOverrides.delete(n), this._onDidChangeAutoSaveDisabled.fire(n)) : this.autoSaveDisabledOverrides.set(n, e - 1);
			});
		}
		get isHotExitEnabled() {
			return !this.contextService.getWorkspace().transient && this.currentHotExitConfiguration !== w.OFF;
		}
		get hotExitConfiguration() {
			return this.currentHotExitConfiguration;
		}
		preventSaveConflicts(e, t) {
			return this.configurationService.getValue("files.saveConflictResolution", {
				resource: e,
				overrideIdentifier: t
			}) !== "overwriteFileOnDisk";
		}
	}, $ = X = d([
		h(0, Et),
		h(1, Te),
		h(2, Ze),
		h(3, je),
		h(4, Se),
		h(5, _t),
		h(6, At),
		h(7, It)
	], $);
})), Gr, Kr = e((() => {
	f(), Gr = _("workingCopyService");
})), qr, Jr = e((() => {
	(function(e) {
		e[e.None = 0] = "None", e[e.Untitled = 2] = "Untitled", e[e.Scratchpad = 4] = "Scratchpad";
	})(qr ||= {});
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/textfile/common/textfiles.js
function Yr(e) {
	let t = !1;
	return { read() {
		return t ? null : (t = !0, e);
	} };
}
function Xr(e) {
	if (e !== void 0) return typeof e == "string" ? ke.fromString(e) : { read: () => {
		let t = e.read();
		return typeof t == "string" ? ke.fromString(t) : null;
	} };
}
var Zr, Qr, $r, ei, ti, ni = e((() => {
	he(), de(), re(), (function(e) {
		e[e.FILE_IS_BINARY = 0] = "FILE_IS_BINARY";
	})(Zr ||= {}), Qr = class extends ot {
		static isTextFileOperationError(e) {
			return e instanceof Error && !Me(e.textFileOperationResult);
		}
		constructor(e, t, n) {
			super(e, Ct.FILE_OTHER_ERROR), this.textFileOperationResult = t, this.options = n;
		}
	}, (function(e) {
		e[e.SAVED = 0] = "SAVED", e[e.DIRTY = 1] = "DIRTY", e[e.PENDING_SAVE = 2] = "PENDING_SAVE", e[e.CONFLICT = 3] = "CONFLICT", e[e.ORPHAN = 4] = "ORPHAN", e[e.ERROR = 5] = "ERROR";
	})($r ||= {}), (function(e) {
		e[e.EDITOR = 1] = "EDITOR", e[e.REFERENCE = 2] = "REFERENCE", e[e.OTHER = 3] = "OTHER";
	})(ei ||= {}), (function(e) {
		e[e.Encode = 0] = "Encode", e[e.Decode = 1] = "Decode";
	})(ti ||= {});
}));
//#endregion
export { rr as $, I as $t, Ar as A, xn as At, br as B, dn as Bt, Pr as C, Tn as Ct, G as D, Dn as Dt, Nr as E, On as Et, Cr as F, hn as Ft, gr as G, j as Gt, vr as H, bn as Ht, wr as I, P as It, ar as J, cn as Jt, Zn as K, pn as Kt, xr as L, an as Lt, jr as M, ln as Mt, Tr as N, vn as Nt, Dr as O, An as Ot, Er as P, on as Pt, sr as Q, Ht as Qt, Sr as R, M as Rt, Br as S, L as St, Mr as T, En as Tt, W as U, gn as Ut, _r as V, F as Vt, hr as W, sn as Wt, $n as X, rn as Xt, ir as Y, A as Yt, nr as Z, Jt as Zt, Y as _, $t as _n, Pn as _t, ei as a, nn as an, H as at, K as b, R as bt, Xr as c, T as cn, Wn as ct, Gr as d, E as dn, Rn as dt, Qt as en, er as et, Kr as f, D as fn, zn as ft, Wr as g, en as gn, z as gt, $ as h, Wt as hn, Ln as ht, Zr as i, Xt as in, Xn as it, Or as j, Cn as jt, kr as k, Sn as kt, qr as l, Ut as ln, Vn as lt, Z as m, tn as mn, In as mt, $r as n, k as nn, tr as nt, ni as o, Vt as on, Kn as ot, Q as p, Kt as pn, V as pt, pr as q, N as qt, Qr as r, Yt as rn, Yn as rt, Yr as s, Bt as sn, Un as st, ti as t, Zt as tn, or as tt, Jr as u, O as un, Hn as ut, Hr as v, Mn as vt, Fr as w, wn as wt, Vr as x, jn as xt, zr as y, Nn as yt, yr as z, un as zt };
