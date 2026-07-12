import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { $O as t, $s as n, AA as r, Ab as i, Aw as a, Bb as o, Bd as s, Ca as c, Cr as l, Cs as ee, Db as te, Dl as ne, Dp as re, EA as ie, ET as ae, Eb as oe, Ej as u, El as se, Fa as ce, Fj as le, HA as ue, IC as de, Is as fe, Jo as pe, Jp as me, Jy as he, Kg as ge, Kj as _e, Lb as ve, Lj as ye, Ls as d, MD as be, Nb as xe, OO as Se, Ob as f, Op as Ce, PA as we, Pa as Te, Pb as Ee, Qp as De, Qv as Oe, Qw as ke, RA as Ae, Rw as je, TA as p, TD as Me, Tj as m, Tr as Ne, UA as Pe, Uj as Fe, Vb as Ie, Vd as Le, WC as Re, Xy as ze, Yw as Be, _A as Ve, _T as He, __ as Ue, _j as We, _s as h, bT as Ge, ba as Ke, br as qe, db as Je, dv as Ye, eT as Xe, e_ as Ze, ec as Qe, ej as $e, fT as et, fb as tt, gk as nt, gs as rt, hc as g, hs as it, ij as at, iy as ot, jD as st, js as ct, kD as _, kO as lt, kb as v, kp as ut, ks as dt, lv as ft, lw as pt, mA as y, mb as mt, mc as ht, nA as gt, nv as _t, oT as vt, pT as yt, pb as bt, pj as xt, qg as St, qo as Ct, qp as wt, qw as Tt, rM as Et, rv as Dt, sA as b, sw as Ot, tA as x, t_ as kt, tj as S, vD as C, vT as At, wD as jt, xr as Mt, xs as Nt, xw as Pt, yA as Ft, yD as It, yj as w, yk as Lt, zA as Rt, zb as T } from "./standaloneServices-C51B94Xh.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/common/editor.js
function zt(e) {
	let t = e;
	return !!t && typeof t.getSelection == "function" && !!t.onDidChangeSelection;
}
function Bt(e) {
	let t = e;
	return !!t && typeof t.getScrollPosition == "function" && typeof t.setScrollPosition == "function" && !!t.onDidChangeScroll;
}
function E(e, t, n) {
	for (let r of n.visibleEditorPanes) if (r.group.id === t && e.matches(r.input)) return r.getViewState();
}
function Vt(e) {
	if (j(e)) return !1;
	let t = e;
	return C.isUri(t?.resource);
}
function D(e) {
	if (j(e)) return !1;
	let t = e;
	return t?.original !== void 0 && t.modified !== void 0;
}
function O(e) {
	if (j(e)) return !1;
	let t = e;
	return !t || t.resources && !Array.isArray(t.resources) ? !1 : !!t.resources || !!t.multiDiffSource;
}
function k(e) {
	if (j(e) || D(e)) return !1;
	let t = e;
	return t?.primary !== void 0 && t.secondary !== void 0;
}
function Ht(e) {
	if (j(e)) return !1;
	let t = e;
	return t ? t.resource === void 0 || t.resource.scheme === et.untitled || t.forceUntitled === !0 : !1;
}
function A(e) {
	if (j(e)) return !1;
	let t = e;
	return C.isUri(t?.base?.resource) && C.isUri(t?.input1?.resource) && C.isUri(t?.input2?.resource) && C.isUri(t?.result?.resource);
}
function j(e) {
	return e instanceof dn;
}
function Ut(e) {
	let t = e;
	return C.isUri(t?.preferredResource);
}
function Wt(e) {
	let t = e;
	return j(t?.primary) && j(t?.secondary);
}
function Gt(e) {
	let t = e;
	return j(t?.modified) && j(t?.original);
}
function Kt(e, t, n, r, i) {
	return tn(r, [te({
		id: "workbench.action.openLargeFile",
		label: u(4050, "Open Anyway"),
		run: () => {
			let r = {
				...n,
				limits: { size: Number.MAX_VALUE }
			};
			e.openEditor(t, r);
		}
	}), te({
		id: "workbench.action.configureEditorLargeFileConfirmation",
		label: u(4051, "Configure Limit"),
		run: () => i.openUserSettings({ query: "workbench.editorLargeFileConfirmation" })
	})], {
		forceMessage: !0,
		forceSeverity: s.Warning
	});
}
function qt(e) {
	return j(e?.editor);
}
function Jt(e) {
	let t = e;
	return qt(e) && t?.group !== void 0;
}
function Yt(e) {
	let t = e;
	return typeof t?.groupId == "number" && j(t.editor);
}
function Xt(e) {
	return typeof e?.groupId == "number";
}
function Zt(e, t, n, r) {
	if (!e.isSticky(t)) return !1;
	switch (r.preventPinnedEditorClose) {
		case "keyboardAndMouse": return n === L.MOUSE || n === L.KEYBOARD;
		case "mouse": return n === L.MOUSE;
		case "keyboard": return n === L.KEYBOARD;
	}
	return !1;
}
async function Qt(e, t, n) {
	return e?.length ? await Promise.all(e.map(async (e) => {
		let r = C.revive(e.fileUri);
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
			a = (await t.stat(r)).isDirectory ? fe.Directory : fe.Unknown, i = !0;
		} catch (e) {
			n.error(e), i = !1;
		}
		if (!i && e.openOnlyIfExists) {
			n.info("Cannot resolve the path because it does not exist", e);
			return;
		}
		if (a === fe.Directory) {
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
function $t(e) {
	let t = e;
	if (!t) return !1;
	let n = t;
	if (n.modified) return $t(n.modified);
	let r = t;
	return !!(r.contributionsState && r.viewState && Array.isArray(r.cursorState));
}
function en(e) {
	return ut(e);
}
function tn(e, t, n) {
	let r = re(e, t);
	return r.forceMessage = n?.forceMessage, r.forceSeverity = n?.forceSeverity, r.allowDialog = n?.allowDialog, r;
}
var M, nn, rn, an, on, sn, cn, N, P, ln, un, F, dn, fn, pn, I, mn, L, R, hn, gn, _n, z = e((() => {
	m(), _e(), It(), p(), o(), tt(), Qe(), yt(), Ce(), oe(), Le(), M = {
		EditorPane: "workbench.contributions.editors",
		EditorFactory: "workbench.contributions.editor.inputFactories"
	}, nn = {
		id: "default",
		displayName: u(4048, "Text Editor"),
		providerDisplayName: u(4049, "Built-in")
	}, rn = "workbench.editor.sidebysideEditor", an = "workbench.editors.textDiffEditor", on = "workbench.editors.binaryResourceDiffEditor", (function(e) {
		e[e.PROGRAMMATIC = 1] = "PROGRAMMATIC", e[e.USER = 2] = "USER", e[e.EDIT = 3] = "EDIT", e[e.NAVIGATION = 4] = "NAVIGATION", e[e.JUMP = 5] = "JUMP";
	})(sn ||= {}), (function(e) {
		e[e.IDENTICAL = 1] = "IDENTICAL", e[e.SIMILAR = 2] = "SIMILAR", e[e.DIFFERENT = 3] = "DIFFERENT";
	})(cn ||= {}), (function(e) {
		e[e.SHORT = 0] = "SHORT", e[e.MEDIUM = 1] = "MEDIUM", e[e.LONG = 2] = "LONG";
	})(N ||= {}), (function(e) {
		e[e.EXPLICIT = 1] = "EXPLICIT", e[e.AUTO = 2] = "AUTO", e[e.FOCUS_CHANGE = 3] = "FOCUS_CHANGE", e[e.WINDOW_CHANGE = 4] = "WINDOW_CHANGE";
	})(P ||= {}), ln = class {
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
	}, un = new ln(), (function(e) {
		e[e.None = 0] = "None", e[e.Readonly = 2] = "Readonly", e[e.Untitled = 4] = "Untitled", e[e.Singleton = 8] = "Singleton", e[e.RequiresTrust = 16] = "RequiresTrust", e[e.CanSplitInGroup = 32] = "CanSplitInGroup", e[e.ForceDescription = 64] = "ForceDescription", e[e.CanDropIntoEditor = 128] = "CanDropIntoEditor", e[e.MultipleEditors = 256] = "MultipleEditors", e[e.Scratchpad = 512] = "Scratchpad";
	})(F ||= {}), dn = class extends y {}, (function(e) {
		e[e.UNKNOWN = 0] = "UNKNOWN", e[e.REPLACE = 1] = "REPLACE", e[e.MOVE = 2] = "MOVE", e[e.UNPIN = 3] = "UNPIN";
	})(fn ||= {}), (function(e) {
		e[e.GROUP_ACTIVE = 0] = "GROUP_ACTIVE", e[e.GROUP_INDEX = 1] = "GROUP_INDEX", e[e.GROUP_LABEL = 2] = "GROUP_LABEL", e[e.GROUP_LOCKED = 3] = "GROUP_LOCKED", e[e.EDITORS_SELECTION = 4] = "EDITORS_SELECTION", e[e.EDITOR_OPEN = 5] = "EDITOR_OPEN", e[e.EDITOR_CLOSE = 6] = "EDITOR_CLOSE", e[e.EDITOR_MOVE = 7] = "EDITOR_MOVE", e[e.EDITOR_ACTIVE = 8] = "EDITOR_ACTIVE", e[e.EDITOR_LABEL = 9] = "EDITOR_LABEL", e[e.EDITOR_CAPABILITIES = 10] = "EDITOR_CAPABILITIES", e[e.EDITOR_PIN = 11] = "EDITOR_PIN", e[e.EDITOR_TRANSIENT = 12] = "EDITOR_TRANSIENT", e[e.EDITOR_STICKY = 13] = "EDITOR_STICKY", e[e.EDITOR_DIRTY = 14] = "EDITOR_DIRTY", e[e.EDITOR_WILL_DISPOSE = 15] = "EDITOR_WILL_DISPOSE";
	})(pn ||= {}), (function(e) {
		e[e.PRIMARY = 1] = "PRIMARY", e[e.SECONDARY = 2] = "SECONDARY", e[e.BOTH = 3] = "BOTH", e[e.ANY = 4] = "ANY";
	})(I ||= {}), mn = class {
		getOriginalUri(e, t) {
			if (!e) return;
			if (A(e)) return R.getOriginalUri(e.result, t);
			if (t?.supportSideBySide) {
				let { primary: n, secondary: r } = this.getSideEditors(e);
				if (n && r) {
					if (t?.supportSideBySide === I.BOTH) return {
						primary: this.getOriginalUri(n, { filterByScheme: t.filterByScheme }),
						secondary: this.getOriginalUri(r, { filterByScheme: t.filterByScheme })
					};
					if (t?.supportSideBySide === I.ANY) return this.getOriginalUri(n, { filterByScheme: t.filterByScheme }) ?? this.getOriginalUri(r, { filterByScheme: t.filterByScheme });
					e = t.supportSideBySide === I.PRIMARY ? n : r;
				}
			}
			if (D(e) || O(e) || k(e) || A(e)) return;
			let n = Ut(e) ? e.preferredResource : e.resource;
			return !n || !t?.filterByScheme ? n : this.filterUri(n, t.filterByScheme);
		}
		getSideEditors(e) {
			return Wt(e) || k(e) ? {
				primary: e.primary,
				secondary: e.secondary
			} : Gt(e) || D(e) ? {
				primary: e.modified,
				secondary: e.original
			} : {
				primary: void 0,
				secondary: void 0
			};
		}
		getCanonicalUri(e, t) {
			if (!e) return;
			if (A(e)) return R.getCanonicalUri(e.result, t);
			if (t?.supportSideBySide) {
				let { primary: n, secondary: r } = this.getSideEditors(e);
				if (n && r) {
					if (t?.supportSideBySide === I.BOTH) return {
						primary: this.getCanonicalUri(n, { filterByScheme: t.filterByScheme }),
						secondary: this.getCanonicalUri(r, { filterByScheme: t.filterByScheme })
					};
					if (t?.supportSideBySide === I.ANY) return this.getCanonicalUri(n, { filterByScheme: t.filterByScheme }) ?? this.getCanonicalUri(r, { filterByScheme: t.filterByScheme });
					e = t.supportSideBySide === I.PRIMARY ? n : r;
				}
			}
			if (D(e) || O(e) || k(e) || A(e)) return;
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
	})(L ||= {}), R = new mn(), (function(e) {
		e[e.LEFT = 0] = "LEFT", e[e.RIGHT = 1] = "RIGHT";
	})(hn ||= {}), gn = class {
		constructor() {
			this.editorSerializerConstructors = /* @__PURE__ */ new Map(), this.editorSerializerInstances = /* @__PURE__ */ new Map();
		}
		start(e) {
			let t = this.instantiationService = e.get(ve);
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
			return Fe(this.fileEditorFactory);
		}
		registerEditorSerializer(e, t) {
			if (this.editorSerializerConstructors.has(e) || this.editorSerializerInstances.has(e)) throw Error(`A editor serializer with type ID '${e}' was already registered.`);
			return this.instantiationService ? this.createEditorSerializer(e, t, this.instantiationService) : this.editorSerializerConstructors.set(e, t), r(() => {
				this.editorSerializerConstructors.delete(e), this.editorSerializerInstances.delete(e);
			});
		}
		getEditorSerializer(e) {
			return this.editorSerializerInstances.get(typeof e == "string" ? e : e.typeId);
		}
	}, Je.add(M.EditorFactory, new gn()), (function(e) {
		e[e.MOST_RECENTLY_ACTIVE = 0] = "MOST_RECENTLY_ACTIVE", e[e.SEQUENTIAL = 1] = "SEQUENTIAL";
	})(_n ||= {});
})), B, vn = e((() => {
	b(), z(), ke(), B = class extends dn {
		constructor() {
			super(...arguments), this._onDidChangeDirty = this._register(new x()), this._onDidChangeLabel = this._register(new x()), this._onDidChangeCapabilities = this._register(new x()), this._onWillDispose = this._register(new x()), this.onDidChangeDirty = this._onDidChangeDirty.event, this.onDidChangeLabel = this._onDidChangeLabel.event, this.onDidChangeCapabilities = this._onDidChangeCapabilities.event, this.onWillDispose = this._onWillDispose.event;
		}
		get editorId() {}
		get capabilities() {
			return F.Readonly;
		}
		hasCapability(e) {
			return e === F.None ? this.capabilities === F.None : (this.capabilities & e) !== 0;
		}
		isReadonly() {
			return this.hasCapability(F.Readonly);
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
			return this.getTitle(N.SHORT);
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
			if (j(e)) return this === e;
			let t = e.options?.override;
			return this.editorId !== t && t !== void 0 && this.editorId !== void 0 ? !1 : Xe(this.resource, R.getCanonicalUri(e));
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
})), yn, bn = e((() => {
	o(), yn = T("editorService");
})), V, H, xn, Sn, Cn = e((() => {
	i(), b(), m(), tt(), z(), vn(), bn(), H = class extends B {
		static {
			V = this;
		}
		static {
			this.ID = "workbench.editorinputs.sidebysideEditorInput";
		}
		get typeId() {
			return V.ID;
		}
		get capabilities() {
			let e = this.primary.capabilities;
			return e &= ~F.CanSplitInGroup, this.secondary.hasCapability(F.RequiresTrust) && (e |= F.RequiresTrust), this.secondary.hasCapability(F.Singleton) && (e |= F.Singleton), e |= F.MultipleEditors, e;
		}
		get resource() {
			if (this.hasIdenticalSides) return this.primary.resource;
		}
		constructor(e, t, n, r, i) {
			super(), this.preferredName = e, this.preferredDescription = t, this.secondary = n, this.primary = r, this.editorService = i, this.hasIdenticalSides = this.primary.matches(this.secondary), this.registerListeners();
		}
		registerListeners() {
			this._register(gt.once(gt.any(this.primary.onWillDispose, this.secondary.onWillDispose))(() => {
				this.isDisposed() || this.dispose();
			})), this._register(this.primary.onDidChangeDirty(() => this._onDidChangeDirty.fire())), this._register(this.primary.onDidChangeCapabilities(() => this._onDidChangeCapabilities.fire())), this._register(this.secondary.onDidChangeCapabilities(() => this._onDidChangeCapabilities.fire())), this._register(this.primary.onDidChangeLabel(() => this._onDidChangeLabel.fire())), this._register(this.secondary.onDidChangeLabel(() => this._onDidChangeLabel.fire()));
		}
		getName() {
			return this.getPreferredName() || (this.hasIdenticalSides ? this.primary.getName() : u(4053, "{0} - {1}", this.secondary.getName(), this.primary.getName()));
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
			if (e instanceof B) return new V(this.preferredName, this.preferredDescription, e, e, this.editorService);
			if (!D(e) && !O(e) && !k(e) && !A(e)) return {
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
				if (j(n.editor)) return {
					editor: new V(this.preferredName, this.preferredDescription, n.editor, n.editor, this.editorService),
					options: {
						...n.options,
						viewState: E(this, e, this.editorService)
					}
				};
				if (Vt(n.editor)) return { editor: {
					label: this.preferredName,
					description: this.preferredDescription,
					primary: n.editor,
					secondary: n.editor,
					options: {
						...n.options,
						viewState: E(this, e, this.editorService)
					}
				} };
			}
		}
		isReadonly() {
			return this.primary.isReadonly();
		}
		toUntyped(e) {
			let t = this.primary.toUntyped(e), n = this.secondary.toUntyped(e);
			if (t && n && !D(t) && !D(n) && !O(t) && !O(n) && !k(t) && !k(n) && !A(t) && !A(n)) {
				let r = {
					label: this.preferredName,
					description: this.preferredDescription,
					primary: t,
					secondary: n
				};
				return typeof e?.preserveViewState == "number" && (r.options = { viewState: E(this, e.preserveViewState, this.editorService) }), r;
			}
		}
		matches(e) {
			return this === e ? !0 : Gt(e) || D(e) ? !1 : e instanceof V || k(e) ? this.primary.matches(e.primary) && this.secondary.matches(e.secondary) : !1;
		}
	}, H = V = f([v(4, yn)], H), xn = class {
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
				if (t instanceof B && a instanceof B) return this.createEditorInput(e, n.name, n.description, a, t);
			}
		}
		getSerializers(e, t) {
			let n = Je.as(M.EditorFactory);
			return [n.getEditorSerializer(e), n.getEditorSerializer(t)];
		}
	}, Sn = class extends xn {
		createEditorInput(e, t, n, r, i) {
			return e.createInstance(H, t, n, r, i);
		}
	};
})), wn, Tn = e((() => {
	b(), p(), wn = class extends y {
		constructor() {
			super(...arguments), this._onWillDispose = this._register(new x()), this.onWillDispose = this._onWillDispose.event, this.resolved = !1;
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
})), En, Dn, On = e((() => {
	En = "languageDetection", Dn = "automaticlanguagedetection.likelywrong";
})), kn, An = e((() => {
	o(), kn = T("ILanguageDetectionService");
})), jn, U, Mn = e((() => {
	i(), ot(), Tn(), Dt(), Ee(), p(), Ue(), On(), An(), a(), St(), m(), U = class extends wn {
		static {
			jn = this;
		}
		static {
			this.AUTO_DETECT_LANGUAGE_THROTTLE_DELAY = 600;
		}
		constructor(e, t, n, r, i) {
			super(), this.modelService = e, this.languageService = t, this.languageDetectionService = n, this.accessibilityService = r, this.textEditorModelHandle = void 0, this.modelDisposeListener = this._register(new Ft()), this.autoDetectLanguageThrottler = this._register(new Pt(jn.AUTO_DETECT_LANGUAGE_THROTTLE_DELAY)), this._blockLanguageChangeListener = !1, this._languageChangeSource = void 0, i && this.handleExistingModel(i);
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
				this.setLanguageIdInternal(e, En);
				let t = this.languageService.getLanguageName(e);
				this.accessibilityService.alert(u(4054, "Language {0} was automatically detected and set as the language mode.", t ?? e));
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
			return typeof t.getFirstLineText == "function" ? t.getFirstLineText(Oe.FIRST_LINE_DETECTION_LENGTH_LIMIT) : e.getLineContent(1).substr(0, Oe.FIRST_LINE_DETECTION_LENGTH_LIMIT);
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
	}, U = jn = f([
		v(0, xe),
		v(1, _t),
		v(2, kn),
		v(3, ge)
	], U);
})), Nn, Pn = e((() => {
	Tn(), Nn = class extends wn {
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
})), Fn, In = e((() => {
	Pn(), Fn = class extends Nn {
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
function Ln(e, t) {
	let { os: n, tildify: r, relative: i } = t;
	if (i) {
		let t = Rn(e, i, n);
		if (typeof t == "string") return t;
	}
	let a = e.fsPath;
	if (n === S.Windows && !w ? a = a.replace(/\//g, "\\") : n !== S.Windows && w && (a = a.replace(/\\/g, "/")), n !== S.Windows && r?.userHome) {
		let t = r.userHome.fsPath, i;
		i = e.scheme !== r.userHome.scheme && e.path[0] === _.sep && e.path[1] !== _.sep ? r.userHome.with({ path: e.path }).fsPath : a, a = Bn(i, t, n);
	}
	return (n === S.Windows ? be : _).normalize(zn(a, n === S.Windows));
}
function Rn(e, t, n) {
	let r = n === S.Windows ? be : _, i = n === S.Linux ? Tt : Be, a = t.getWorkspace(), o = a.folders.at(0);
	if (!o) return;
	e.scheme !== o.uri.scheme && e.path[0] === _.sep && e.path[1] !== _.sep && (e = o.uri.with({ path: e.path }));
	let s = t.getWorkspaceFolder(e);
	if (!s) return;
	let c;
	if (c = i.isEqual(s.uri, e) ? "" : i.relativePath(s.uri, e) ?? "", c &&= r.normalize(c), a.folders.length > 1 && !t.noPrefix) {
		let e = s.name ? s.name : i.basenameOrAuthority(s.uri);
		c = c ? `${e} • ${c}` : e;
	}
	return c;
}
function zn(e, t = w) {
	return At(e, t) ? e.charAt(0).toUpperCase() + e.slice(1) : e;
}
function Bn(e, t, n = $e) {
	if (n === S.Windows || !e || !t) return e;
	let r = Yn.original === t ? Yn.normalized : void 0;
	r || (r = t, w && (r = ae(r)), r = `${nt(r, _.sep)}${_.sep}`, Yn = {
		original: t,
		normalized: r
	});
	let i = e;
	return w && (i = ae(i)), (n === S.Linux ? i.startsWith(r) : Lt(i, r)) ? `~/${i.substr(r.length)}` : e;
}
function Vn(e, t) {
	return e.replace(/^~($|\/|\\)/, `${t}$1`);
}
function Hn(e, t = st) {
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
		s.indexOf(Zn) === 0 ? (o = s.substr(0, s.indexOf(Zn) + 2), s = s.substr(s.indexOf(Zn) + 2)) : s.indexOf(t) === 0 ? (o = s.substr(0, s.indexOf(t) + t.length), s = s.substr(s.indexOf(t) + t.length)) : s.indexOf(Qn) === 0 && (o = s.substr(0, s.indexOf(Qn) + 1), s = s.substr(s.indexOf(Qn) + 1));
		let c = s.split(t);
		for (let a = 1; r && a <= c.length; a++) for (let s = c.length - a; r && s >= 0; s--) {
			r = !1;
			let l = c.slice(s, s + a).join(t);
			for (let n = 0; !r && n < e.length; n++) if (n !== i && e[n] && e[n].indexOf(l) > -1) {
				let i = s + a === c.length, o = s > 0 && e[n].indexOf(t) > -1 ? t + l : l, ee = e[n].endsWith(o);
				r = !i || ee;
			}
			if (!r) {
				let e = "";
				(c[0].endsWith(":") || o !== "") && (s === 1 && (s = 0, a++, l = c[0] + t + l), s > 0 && (e = c[0] + t), e = o + e), s > 0 && (e = e + Xn + t), e += l, s + a < c.length && (e = e + t + Xn), n[i] = e;
			}
		}
		r && (n[i] = a);
	}
	return n;
}
function Un(e, t = Object.create(null)) {
	let n = [], r = !1, i = "";
	for (let a of e) if (a === "$" || r && a === "{") i && n.push({
		value: i,
		type: W.TEXT
	}), i = "", r = !0;
	else if (a === "}" && r) {
		let e = t[i];
		if (typeof e == "string") e.length && n.push({
			value: e,
			type: W.VARIABLE
		});
		else if (e) {
			let t = n[n.length - 1];
			(!t || t.type !== W.SEPARATOR) && n.push({
				value: e.label,
				type: W.SEPARATOR
			});
		}
		i = "", r = !1;
	} else i += a;
	return i && !r && n.push({
		value: i,
		type: W.TEXT
	}), n.filter((e, t) => e.type !== W.SEPARATOR || [n[t - 1], n[t + 1]].every((e) => e && (e.type === W.VARIABLE || e.type === W.TEXT) && e.value.length > 0)).map((e) => e.value).join("");
}
function Wn(e, t) {
	return xt || t ? e.replace(/\(&&\w\)|&&/g, "").replace(/&/g, xt ? "&" : "&&") : e.replace(/&&|&/g, (e) => e === "&" ? "&&" : "&");
}
function Gn(e, t) {
	let n = e.replace(/\(&&\w\)|&&/g, "");
	if (t) return n;
	if (xt) return {
		withMnemonic: n,
		withoutMnemonic: n
	};
	let r;
	return r = w ? e.replace(/&&|&/g, (e) => e === "&" ? "&&" : "&") : e.replace(/&&/g, "_"), {
		withMnemonic: r,
		withoutMnemonic: n
	};
}
function Kn(e) {
	return e.replace(/&/g, "&&");
}
function qn(e) {
	if (e.endsWith("]")) {
		let t = e.lastIndexOf(" [", e.length - 2);
		if (t !== -1) {
			let n = Jn(e.substring(0, t)), r = e.substring(t);
			return {
				name: n.name + r,
				parentPath: n.parentPath
			};
		}
	}
	return Jn(e);
}
function Jn(e) {
	let t = e.indexOf("/") === -1 ? be : _, n = t.basename(e), r = t.dirname(e);
	return n.length ? {
		name: n,
		parentPath: r
	} : {
		name: r,
		parentPath: ""
	};
}
var Yn, Xn, Zn, Qn, W, $n = e((() => {
	Ge(), jt(), at(), ke(), t(), Yn = Object.create(null), Xn = "…", Zn = "\\\\", Qn = "~", (function(e) {
		e[e.TEXT = 0] = "TEXT", e[e.VARIABLE = 1] = "VARIABLE", e[e.SEPARATOR = 2] = "SEPARATOR";
	})(W ||= {});
})), er, G, tr, nr = e((() => {
	i(), m(), Cn(), z(), Mn(), Pn(), In(), bn(), $n(), wt(), G = class extends H {
		static {
			er = this;
		}
		static {
			this.ID = "workbench.editors.diffEditorInput";
		}
		get typeId() {
			return er.ID;
		}
		get editorId() {
			return this.modified.editorId === this.original.editorId ? this.modified.editorId : void 0;
		}
		get capabilities() {
			let e = super.capabilities;
			return this.labels.forceDescription && (e |= F.ForceDescription), e;
		}
		constructor(e, t, n, r, i, a) {
			super(e, t, n, r, a), this.original = n, this.modified = r, this.forceOpenAsBinary = i, this.cachedModel = void 0, this.labels = this.computeLabels();
		}
		computeLabels() {
			let e, t = !1;
			if (this.preferredName) e = this.preferredName;
			else {
				let n = this.original.getName(), r = this.modified.getName();
				e = u(4052, "{0} ↔ {1}", n, r), t = n === r;
			}
			let n, r, i;
			if (this.preferredDescription) n = this.preferredDescription, r = this.preferredDescription, i = this.preferredDescription;
			else {
				n = this.computeLabel(this.original.getDescription(N.SHORT), this.modified.getDescription(N.SHORT)), i = this.computeLabel(this.original.getDescription(N.LONG), this.modified.getDescription(N.LONG));
				let e = this.original.getDescription(N.MEDIUM), t = this.modified.getDescription(N.MEDIUM);
				if (typeof e == "string" && typeof t == "string" && (e || t)) {
					let [n, i] = Hn([e, t]);
					r = this.computeLabel(n, i);
				}
			}
			let a = this.computeLabel(this.original.getTitle(N.SHORT) ?? this.original.getName(), this.modified.getTitle(N.SHORT) ?? this.modified.getName(), " ↔ "), o = this.computeLabel(this.original.getTitle(N.MEDIUM) ?? this.original.getName(), this.modified.getTitle(N.MEDIUM) ?? this.modified.getName(), " ↔ "), s = this.computeLabel(this.original.getTitle(N.LONG) ?? this.original.getName(), this.modified.getTitle(N.LONG) ?? this.modified.getName(), " ↔ "), c = this.getPreferredTitle();
			return c && (a = `${c} (${a})`, o = `${c} (${o})`, s = `${c} (${s})`), {
				name: e,
				shortDescription: n,
				mediumDescription: r,
				longDescription: i,
				forceDescription: t,
				shortTitle: a,
				mediumTitle: o,
				longTitle: s
			};
		}
		computeLabel(e, t, n = " - ") {
			if (!(!e || !t)) return e === t ? t : `${e}${n}${t}`;
		}
		getName() {
			return this.labels.name;
		}
		getDescription(e = N.MEDIUM) {
			switch (e) {
				case N.SHORT: return this.labels.shortDescription;
				case N.LONG: return this.labels.longDescription;
				case N.MEDIUM:
				default: return this.labels.mediumDescription;
			}
		}
		getTitle(e) {
			switch (e) {
				case N.SHORT: return this.labels.shortTitle;
				case N.LONG: return this.labels.longTitle;
				default:
				case N.MEDIUM: return this.labels.mediumTitle;
			}
		}
		async resolve() {
			let e = await this.createModel();
			return this.cachedModel?.dispose(), this.cachedModel = e, this.cachedModel;
		}
		prefersEditorPane(e) {
			return this.forceOpenAsBinary ? e.find((e) => e.typeId === on) : e.find((e) => e.typeId === an);
		}
		async createModel() {
			let [e, t] = await Promise.all([this.original.resolve(), this.modified.resolve()]);
			return t instanceof U && e instanceof U ? new Fn(e, t) : new Nn(me(e) ? e : void 0, me(t) ? t : void 0);
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
			return this === e ? !0 : e instanceof er ? this.modified.matches(e.modified) && this.original.matches(e.original) && e.forceOpenAsBinary === this.forceOpenAsBinary : D(e) ? this.modified.matches(e.modified) && this.original.matches(e.original) : !1;
		}
		dispose() {
			this.cachedModel &&= (this.cachedModel.dispose(), void 0), super.dispose();
		}
	}, G = er = f([v(5, yn)], G), tr = class extends xn {
		createEditorInput(e, t, n, r, i) {
			return e.createInstance(G, t, n, r, i, void 0);
		}
	};
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/editor/common/editorGroupsService.js
function rr(e) {
	let t = e;
	return j(t?.editor) && j(t?.replacement);
}
function ir(e) {
	let t = e;
	return !!t && typeof t.id == "number" && Array.isArray(t.editors);
}
function ar(e) {
	return e.getValue("workbench.editor.openSideBySideDirection") === "down" ? or.DOWN : or.RIGHT;
}
var or, sr, cr, lr, ur, dr, fr, pr = e((() => {
	z(), (function(e) {
		e[e.UP = 0] = "UP", e[e.DOWN = 1] = "DOWN", e[e.LEFT = 2] = "LEFT", e[e.RIGHT = 3] = "RIGHT";
	})(or ||= {}), (function(e) {
		e[e.HORIZONTAL = 0] = "HORIZONTAL", e[e.VERTICAL = 1] = "VERTICAL";
	})(sr ||= {}), (function(e) {
		e[e.FIRST = 0] = "FIRST", e[e.LAST = 1] = "LAST", e[e.NEXT = 2] = "NEXT", e[e.PREVIOUS = 3] = "PREVIOUS";
	})(cr ||= {}), (function(e) {
		e[e.MAXIMIZE = 0] = "MAXIMIZE", e[e.EXPAND = 1] = "EXPAND", e[e.EVEN = 2] = "EVEN";
	})(lr ||= {}), (function(e) {
		e[e.COPY_EDITORS = 0] = "COPY_EDITORS", e[e.MOVE_EDITORS = 1] = "MOVE_EDITORS";
	})(ur ||= {}), (function(e) {
		e[e.CREATION_TIME = 0] = "CREATION_TIME", e[e.MOST_RECENTLY_ACTIVE = 1] = "MOST_RECENTLY_ACTIVE", e[e.GRID_APPEARANCE = 2] = "GRID_APPEARANCE";
	})(dr ||= {}), (function(e) {
		e[e.NEW_EDITOR = 1] = "NEW_EDITOR", e[e.MOVE_EDITOR = 2] = "MOVE_EDITOR", e[e.COPY_EDITOR = 3] = "COPY_EDITOR";
	})(fr ||= {});
})), mr, hr = e((() => {
	o(), mr = T("editorGroupsService");
})), gr, _r = e((() => {
	o(), gr = T("editorPaneService");
})), vr, yr = e((() => {
	o(), vr = T("filesConfigurationService");
})), br, xr = e((() => {
	o(), br = T("lifecycleService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/lifecycle/common/lifecycle.js
function Sr(e) {
	switch (e) {
		case K.Starting: return "Starting";
		case K.Ready: return "Ready";
		case K.Restored: return "Restored";
		case K.Eventually: return "Eventually";
	}
}
var Cr, wr, Tr, K, Er = e((() => {
	(function(e) {
		e[e.Default = 1] = "Default", e[e.Last = 2] = "Last";
	})(Cr ||= {}), (function(e) {
		e[e.CLOSE = 1] = "CLOSE", e[e.QUIT = 2] = "QUIT", e[e.RELOAD = 3] = "RELOAD", e[e.LOAD = 4] = "LOAD";
	})(wr ||= {}), (function(e) {
		e[e.NewWindow = 1] = "NewWindow", e[e.ReloadedWindow = 3] = "ReloadedWindow", e[e.ReopenedWindow = 4] = "ReopenedWindow";
	})(Tr ||= {}), (function(e) {
		e[e.Starting = 1] = "Starting", e[e.Ready = 2] = "Ready", e[e.Restored = 3] = "Restored", e[e.Eventually = 4] = "Eventually";
	})(K ||= {});
})), Dr, Or = e((() => {
	o(), Dr = T("pathService");
})), kr, Ar = e((() => {
	ne(), o(), kr = Ie(se);
})), jr, Mr = e((() => {
	o(), jr = T("textFileService");
})), Nr, Pr = e((() => {
	o(), Nr = T("untitledTextEditorService");
})), Fr, Ir = e((() => {
	o(), Fr = T("workingCopyService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/common/contributions.js
function Lr(e) {
	let t = e;
	return !!t && typeof t.editorTypeId == "string";
}
function Rr(e) {
	switch (e) {
		case K.Restored: return q.AfterRestored;
		case K.Eventually: return q.Eventually;
	}
}
function zr(e) {
	switch (e) {
		case q.BlockStartup: return K.Starting;
		case q.BlockRestore: return K.Ready;
		case q.AfterRestored: return K.Restored;
		case q.Eventually: return K.Eventually;
	}
}
var Br, q, J, Vr, Hr = e((() => {
	o(), Er(), xr(), tt(), a(), ht(), ze(), ne(), Pe(), p(), _r(), (function(e) {
		e.Workbench = "workbench.contributions.kind";
	})(Br ||= {}), (function(e) {
		e[e.BlockStartup = 1] = "BlockStartup", e[e.BlockRestore = 2] = "BlockRestore", e[e.AfterRestored = 3] = "AfterRestored", e[e.Eventually = 4] = "Eventually";
	})(q ||= {}), J = class e extends y {
		constructor() {
			super(...arguments), this.contributionsByPhase = /* @__PURE__ */ new Map(), this.contributionsByEditor = /* @__PURE__ */ new Map(), this.contributionsById = /* @__PURE__ */ new Map(), this.instancesById = /* @__PURE__ */ new Map(), this.instanceDisposables = this._register(new Ve()), this.timingsByPhase = /* @__PURE__ */ new Map(), this.pendingRestoredContributions = new Ot(), this.whenRestored = this.pendingRestoredContributions.p;
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
			this.instantiationService && this.lifecycleService && this.logService && this.environmentService && this.editorPaneService && (typeof n == "number" && this.lifecycleService.phase >= n || typeof e == "string" && Lr(n) && this.editorPaneService.didInstantiateEditorPane(n.editorTypeId)) ? this.safeCreateContribution(this.instantiationService, this.logService, this.environmentService, r, typeof n == "number" ? zr(n) : this.lifecycleService.phase) : (typeof n == "number" && ue(this.contributionsByPhase, zr(n), []).push(r), typeof e == "string" && (this.contributionsById.has(e) ? console.error(`IWorkbenchContributionsRegistry#registerWorkbenchContribution(): Can't register multiple contributions with same id '${e}'`) : this.contributionsById.set(e, r), Lr(n) && ue(this.contributionsByEditor, n.editorTypeId, []).push(r)));
		}
		registerWorkbenchContribution(e, t) {
			this.registerWorkbenchContribution2(void 0, e, Rr(t));
		}
		getWorkbenchContribution(e) {
			if (this.instancesById.has(e)) return this.instancesById.get(e);
			let t = this.instantiationService, n = this.lifecycleService, r = this.logService, i = this.environmentService;
			if (!t || !n || !r || !i) throw Error(`IWorkbenchContributionsRegistry#getContribution('${e}'): cannot be called before registry started`);
			let a = this.contributionsById.get(e);
			if (!a) throw Error(`IWorkbenchContributionsRegistry#getContribution('${e}'): contribution with that identifier is unknown.`);
			n.phase < K.Restored && r.warn(`IWorkbenchContributionsRegistry#getContribution('${e}'): contribution instantiated before LifecyclePhase.Restored!`), this.safeCreateContribution(t, r, i, a, n.phase);
			let o = this.instancesById.get(e);
			if (!o) throw Error(`IWorkbenchContributionsRegistry#getContribution('${e}'): failed to create contribution.`);
			return o;
		}
		start(e) {
			let t = this.instantiationService = e.get(ve), n = this.lifecycleService = e.get(br), r = this.logService = e.get(he), i = this.environmentService = e.get(se), a = this.editorPaneService = e.get(gr);
			this._register(n.onDidShutdown(() => {
				this.instanceDisposables.clear();
			}));
			for (let e of [
				K.Starting,
				K.Ready,
				K.Restored,
				K.Eventually
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
				case K.Starting:
				case K.Ready:
					g(`code/willCreateWorkbenchContributions/${r}`);
					for (let a of i) this.safeCreateContribution(e, t, n, a, r);
					g(`code/didCreateWorkbenchContributions/${r}`);
					break;
				case K.Restored:
				case K.Eventually:
					r === K.Eventually && await this.pendingRestoredContributions.p, this.doInstantiateWhenIdle(i, e, t, n, r);
					break;
			}
		}
		doInstantiateWhenIdle(e, t, n, r, i) {
			g(`code/willCreateWorkbenchContributions/${i}`);
			let a = 0, o = i === K.Eventually ? 3e3 : 500, s = (c) => {
				for (; a < e.length;) {
					let l = e[a++];
					if (this.safeCreateContribution(t, n, r, l, i), c.timeRemaining() < 1) {
						je(s, o);
						break;
					}
				}
				a === e.length && (g(`code/didCreateWorkbenchContributions/${i}`), i === K.Restored && this.pendingRestoredContributions.complete());
			};
			je(s, o);
		}
		safeCreateContribution(t, n, r, i, a) {
			if (typeof i.id == "string" && this.instancesById.has(i.id)) return;
			let o = Date.now();
			try {
				typeof i.id == "string" && g(`code/willCreateWorkbenchContribution/${a}/${i.id}`);
				let e = t.createInstance(i.ctor);
				typeof i.id == "string" && (this.instancesById.set(i.id, e), this.contributionsById.delete(i.id)), ie(e) && this.instanceDisposables.add(e);
			} catch (e) {
				n.error(`Unable to create workbench contribution '${i.id ?? i.ctor.name}'.`, e);
			} finally {
				typeof i.id == "string" && g(`code/didCreateWorkbenchContribution/${a}/${i.id}`);
			}
			if (typeof i.id == "string" || !r.isBuilt) {
				let t = Date.now() - o;
				if (t > (a < K.Restored ? e.BLOCK_BEFORE_RESTORE_WARN_THRESHOLD : e.BLOCK_AFTER_RESTORE_WARN_THRESHOLD) && n.warn(`Creation of workbench contribution '${i.id ?? i.ctor.name}' took ${t}ms.`), typeof i.id == "string") {
					let e = this.timingsByPhase.get(a);
					e || (e = [], this.timingsByPhase.set(a, e)), e.push([i.id, t]);
				}
			}
		}
	}, Vr = J.INSTANCE.registerWorkbenchContribution2.bind(J.INSTANCE), J.INSTANCE.getWorkbenchContribution.bind(J.INSTANCE), Je.add(Br.Workbench, J.INSTANCE);
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/textfile/common/textfiles.js
function Ur(e) {
	let t = !1;
	return { read() {
		return t ? null : (t = !0, e);
	} };
}
function Wr(e) {
	if (e !== void 0) return typeof e == "string" ? de.fromString(e) : { read: () => {
		let t = e.read();
		return typeof t == "string" ? de.fromString(t) : null;
	} };
}
var Gr, Kr, qr, Jr, Yr, Xr = e((() => {
	Qe(), Re(), _e(), (function(e) {
		e[e.FILE_IS_BINARY = 0] = "FILE_IS_BINARY";
	})(Gr ||= {}), Kr = class extends dt {
		static isTextFileOperationError(e) {
			return e instanceof Error && !Et(e.textFileOperationResult);
		}
		constructor(e, t, n) {
			super(e, ct.FILE_OTHER_ERROR), this.textFileOperationResult = t, this.options = n;
		}
	}, (function(e) {
		e[e.SAVED = 0] = "SAVED", e[e.DIRTY = 1] = "DIRTY", e[e.PENDING_SAVE = 2] = "PENDING_SAVE", e[e.CONFLICT = 3] = "CONFLICT", e[e.ORPHAN = 4] = "ORPHAN", e[e.ERROR = 5] = "ERROR";
	})(qr ||= {}), (function(e) {
		e[e.EDITOR = 1] = "EDITOR", e[e.REFERENCE = 2] = "REFERENCE", e[e.OTHER = 3] = "OTHER";
	})(Jr ||= {}), (function(e) {
		e[e.Encode = 0] = "Encode", e[e.Decode = 1] = "Decode";
	})(Yr ||= {});
})), Zr, Qr = e((() => {
	(function(e) {
		e[e.None = 0] = "None", e[e.Untitled = 2] = "Untitled", e[e.Scratchpad = 4] = "Scratchpad";
	})(Zr ||= {});
})), Y, X, $r = e((() => {
	i(), It(), ye(), jt(), b(), ke(), p(), Ke(), ce(), kt(), yt(), Pe(), Ge(), X = class extends y {
		static {
			Y = this;
		}
		static {
			this.NO_FOLDER = null;
		}
		constructor(e, t, n, r) {
			super(), this.getExpression = e, this.shouldUpdate = t, this.contextService = n, this.configurationService = r, this._onExpressionChange = this._register(new x()), this.onExpressionChange = this._onExpressionChange.event, this.mapFolderToParsedExpression = /* @__PURE__ */ new Map(), this.mapFolderToConfiguredExpression = /* @__PURE__ */ new Map(), this.updateExpressions(!1), this.registerListeners();
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
				r ? (!i || !le(i.expression, r.expression)) && (t = !0, this.mapFolderToParsedExpression.set(n, c(r.expression)), this.mapFolderToConfiguredExpression.set(n, r)) : i && (t = !0, this.mapFolderToParsedExpression.delete(n), this.mapFolderToConfiguredExpression.delete(n));
			}
			let n = new Rt(this.contextService.getWorkspace().folders.map((e) => e.uri));
			for (let [e] of this.mapFolderToConfiguredExpression) e !== Y.NO_FOLDER && (n.has(C.parse(e)) || (this.mapFolderToParsedExpression.delete(e), this.mapFolderToConfiguredExpression.delete(e), t = !0));
			let r = this.doGetExpression(void 0), i = this.mapFolderToConfiguredExpression.get(Y.NO_FOLDER);
			r ? (!i || !le(i.expression, r.expression)) && (t = !0, this.mapFolderToParsedExpression.set(Y.NO_FOLDER, c(r.expression)), this.mapFolderToConfiguredExpression.set(Y.NO_FOLDER, r)) : i && (t = !0, this.mapFolderToParsedExpression.delete(Y.NO_FOLDER), this.mapFolderToConfiguredExpression.delete(Y.NO_FOLDER)), e && t && this._onExpressionChange.fire();
		}
		doGetExpression(e) {
			let t = this.getExpression(e);
			if (!t) return;
			let n = Object.keys(t);
			if (n.length === 0) return;
			let r = !1, i = Object.create(null);
			for (let e of n) {
				r ||= Me(e);
				let n = e, a = He(n, !0);
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
			if (n && this.mapFolderToParsedExpression.has(n.uri.toString()) ? (r = this.mapFolderToParsedExpression.get(n.uri.toString()), i = this.mapFolderToConfiguredExpression.get(n.uri.toString())) : (r = this.mapFolderToParsedExpression.get(Y.NO_FOLDER), i = this.mapFolderToConfiguredExpression.get(Y.NO_FOLDER)), !r) return !1;
			let a;
			return a = n ? vt(n.uri, e) : this.uriToPath(e), typeof a == "string" && r(a, void 0, t) ? !0 : a !== this.uriToPath(e) && i?.hasAbsolutePath ? !!r(this.uriToPath(e), void 0, t) : !1;
		}
		uriToPath(e) {
			return e.scheme === et.file ? e.fsPath : e.path;
		}
	}, X = Y = f([v(2, Te), v(3, Ze)], X);
})), Z, ei, Q, $, ti, ni = e((() => {
	i(), m(), De(), b(), p(), lt(), mt(), kt(), Qe(), rt(), ye(), at(), ce(), $r(), a(), pe(), ne(), Pe(), vn(), z(), Ne(), Mt(), Ye(), o(), ei = new Se("autoSaveAfterShortDelayContext", !1, !0), (function(e) {
		e[e.OFF = 0] = "OFF", e[e.AFTER_SHORT_DELAY = 1] = "AFTER_SHORT_DELAY", e[e.AFTER_LONG_DELAY = 2] = "AFTER_LONG_DELAY", e[e.ON_FOCUS_CHANGE = 3] = "ON_FOCUS_CHANGE", e[e.ON_WINDOW_CHANGE = 4] = "ON_WINDOW_CHANGE";
	})(Q ||= {}), (function(e) {
		e[e.SETTINGS = 1] = "SETTINGS", e[e.OUT_OF_WORKSPACE = 2] = "OUT_OF_WORKSPACE", e[e.ERRORS = 3] = "ERRORS", e[e.DISABLED = 4] = "DISABLED";
	})($ ||= {}), ti = class extends y {
		static {
			Z = this;
		}
		static {
			this.DEFAULT_AUTO_SAVE_MODE = We ? h.AFTER_DELAY : h.OFF;
		}
		static {
			this.DEFAULT_AUTO_SAVE_DELAY = 1e3;
		}
		static {
			this.READONLY_MESSAGES = {
				providerReadonly: {
					value: u(14098, "Editor is read-only because the file system of the file is read-only."),
					isTrusted: !0
				},
				sessionReadonly: {
					value: u(14099, "Editor is read-only because the file was set read-only in this session. [Click here](command:{0}) to set writeable.", "workbench.action.files.setActiveEditorWriteableInSession"),
					isTrusted: !0
				},
				configuredReadonly: {
					value: u(14100, "Editor is read-only because the file was set read-only via settings. [Click here](command:{0}) to configure or [toggle for this session](command:{1}).", "workbench.action.openSettings?%5B%22files.readonly%22%5D", "workbench.action.files.toggleActiveEditorReadonlyInSession"),
					isTrusted: !0
				},
				fileLocked: {
					value: u(14101, "Editor is read-only because of file permissions. [Click here](command:{0}) to set writeable anyway.", "workbench.action.files.setActiveEditorWriteableInSession"),
					isTrusted: !0
				},
				fileReadonly: {
					value: u(14102, "Editor is read-only because the file is read-only."),
					isTrusted: !0
				}
			};
		}
		constructor(e, t, n, r, i, a, o, s) {
			super(), this.configurationService = t, this.contextService = n, this.environmentService = r, this.uriIdentityService = i, this.fileService = a, this.markerService = o, this.textResourceConfigurationService = s, this._onDidChangeAutoSaveConfiguration = this._register(new x()), this.onDidChangeAutoSaveConfiguration = this._onDidChangeAutoSaveConfiguration.event, this._onDidChangeAutoSaveDisabled = this._register(new x()), this.onDidChangeAutoSaveDisabled = this._onDidChangeAutoSaveDisabled.event, this._onDidChangeFilesAssociation = this._register(new x()), this.onDidChangeFilesAssociation = this._onDidChangeFilesAssociation.event, this._onDidChangeReadonly = this._register(new x()), this.onDidChangeReadonly = this._onDidChangeReadonly.event, this.autoSaveConfigurationCache = new we(1e3), this.autoSaveAfterShortDelayOverrides = new Ae(), this.autoSaveDisabledOverrides = new Ae(), this.readonlyIncludeMatcher = this._register(new pt(() => this.createReadonlyMatcher(ee))), this.readonlyExcludeMatcher = this._register(new pt(() => this.createReadonlyMatcher(Nt))), this.sessionReadonlyOverrides = new Ae((e) => this.uriIdentityService.extUri.getComparisonKey(e)), this.autoSaveAfterShortDelayContext = ei.bindTo(e);
			let c = t.getValue();
			this.currentGlobalAutoSaveConfiguration = this.computeAutoSaveConfiguration(void 0, c.files), this.currentFilesAssociationConfiguration = c?.files?.associations, this.currentHotExitConfiguration = c?.files?.hotExit || d.ON_EXIT, this.onFilesConfigurationChange(c, !1), this.registerListeners();
		}
		createReadonlyMatcher(e) {
			let t = this._register(new X((t) => this.configurationService.getValue(e, { resource: t }), (t) => t.affectsConfiguration(e), this.contextService, this.configurationService));
			return this._register(t.onExpressionChange(() => this._onDidChangeReadonly.fire())), t;
		}
		isReadonly(e, t) {
			let r = this.fileService.getProvider(e.scheme);
			if (r && n(r)) return r.readOnlyMessage ?? Z.READONLY_MESSAGES.providerReadonly;
			let i = this.sessionReadonlyOverrides.get(e);
			return typeof i == "boolean" ? i === !0 && Z.READONLY_MESSAGES.sessionReadonly : this.uriIdentityService.extUri.isEqualOrParent(e, this.environmentService.userRoamingDataHome) || this.uriIdentityService.extUri.isEqual(e, this.contextService.getWorkspace().configuration ?? void 0) ? !1 : this.readonlyIncludeMatcher.value.matches(e) ? !this.readonlyExcludeMatcher.value.matches(e) && Z.READONLY_MESSAGES.configuredReadonly : this.configuredReadonlyFromPermissions && t?.locked ? Z.READONLY_MESSAGES.fileLocked : t?.readonly ? Z.READONLY_MESSAGES.fileReadonly : !1;
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
			this.currentGlobalAutoSaveConfiguration = this.computeAutoSaveConfiguration(void 0, e.files), this.autoSaveConfigurationCache.clear(), this.autoSaveAfterShortDelayContext.set(this.getAutoSaveMode(void 0).mode === Q.AFTER_SHORT_DELAY), t && this._onDidChangeAutoSaveConfiguration.fire();
			let n = e?.files?.associations;
			le(this.currentFilesAssociationConfiguration, n) || (this.currentFilesAssociationConfiguration = n, t && this._onDidChangeFilesAssociation.fire());
			let r = e?.files?.hotExit;
			r === d.OFF || r === d.ON_EXIT_AND_WINDOW_CLOSE ? this.currentHotExitConfiguration = r : this.currentHotExitConfiguration = d.ON_EXIT;
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
			let n, r, i, a, o, s;
			switch (t?.autoSave ?? Z.DEFAULT_AUTO_SAVE_MODE) {
				case h.AFTER_DELAY:
					n = "afterDelay", r = typeof t?.autoSaveDelay == "number" && t.autoSaveDelay >= 0 ? t.autoSaveDelay : Z.DEFAULT_AUTO_SAVE_DELAY, s = r <= Z.DEFAULT_AUTO_SAVE_DELAY;
					break;
				case h.ON_FOCUS_CHANGE:
					n = "onFocusChange";
					break;
				case h.ON_WINDOW_CHANGE:
					n = "onWindowChange";
					break;
			}
			return t?.autoSaveWorkspaceFilesOnly === !0 && (i = !0, e && !this.contextService.isInsideWorkspace(e) && (o = !0, s = void 0)), t?.autoSaveWhenNoErrors === !0 && (a = !0, s = void 0), {
				autoSave: n,
				autoSaveDelay: r,
				autoSaveWorkspaceFilesOnly: i,
				autoSaveWhenNoErrors: a,
				isOutOfWorkspace: o,
				isShortAutoSaveDelay: s
			};
		}
		toResource(e) {
			return e instanceof B ? R.getOriginalUri(e, { supportSideBySide: I.PRIMARY }) : e;
		}
		hasShortAutoSaveDelay(e) {
			let t = this.toResource(e);
			return t && this.autoSaveAfterShortDelayOverrides.has(t) ? !0 : this.getAutoSaveConfiguration(t).isShortAutoSaveDelay ? !t || !this.autoSaveDisabledOverrides.has(t) : !1;
		}
		getAutoSaveMode(e, t) {
			let n = this.toResource(e);
			if (n && this.autoSaveAfterShortDelayOverrides.has(n)) return { mode: Q.AFTER_SHORT_DELAY };
			if (n && this.autoSaveDisabledOverrides.has(n)) return {
				mode: Q.OFF,
				reason: $.DISABLED
			};
			let r = this.getAutoSaveConfiguration(n);
			if (r.autoSave === void 0 || typeof t == "number" && (r.autoSave === "afterDelay" && t !== P.AUTO || r.autoSave === "onFocusChange" && t !== P.FOCUS_CHANGE && t !== P.WINDOW_CHANGE || r.autoSave === "onWindowChange" && t !== P.WINDOW_CHANGE)) return {
				mode: Q.OFF,
				reason: $.SETTINGS
			};
			if (n) {
				if (r.autoSaveWorkspaceFilesOnly && r.isOutOfWorkspace) return {
					mode: Q.OFF,
					reason: $.OUT_OF_WORKSPACE
				};
				if (r.autoSaveWhenNoErrors && this.markerService.read({
					resource: n,
					take: 1,
					severities: l.Error
				}).length > 0) return {
					mode: Q.OFF,
					reason: $.ERRORS
				};
			}
			switch (r.autoSave) {
				case "afterDelay": return typeof r.autoSaveDelay == "number" && r.autoSaveDelay <= Z.DEFAULT_AUTO_SAVE_DELAY ? { mode: r.autoSaveWhenNoErrors ? Q.AFTER_LONG_DELAY : Q.AFTER_SHORT_DELAY } : { mode: Q.AFTER_LONG_DELAY };
				case "onFocusChange": return { mode: Q.ON_FOCUS_CHANGE };
				case "onWindowChange": return { mode: Q.ON_WINDOW_CHANGE };
			}
		}
		async toggleAutoSave() {
			let e = this.configurationService.getValue("files.autoSave"), t;
			return t = [
				h.AFTER_DELAY,
				h.ON_FOCUS_CHANGE,
				h.ON_WINDOW_CHANGE
			].some((t) => t === e) ? h.OFF : h.AFTER_DELAY, this.configurationService.updateValue("files.autoSave", t);
		}
		enableAutoSaveAfterShortDelay(e) {
			let t = this.toResource(e);
			if (!t) return y.None;
			let n = this.autoSaveAfterShortDelayOverrides.get(t) ?? 0;
			return this.autoSaveAfterShortDelayOverrides.set(t, n + 1), r(() => {
				let e = this.autoSaveAfterShortDelayOverrides.get(t) ?? 0;
				e <= 1 ? this.autoSaveAfterShortDelayOverrides.delete(t) : this.autoSaveAfterShortDelayOverrides.set(t, e - 1);
			});
		}
		disableAutoSave(e) {
			let t = this.toResource(e);
			if (!t) return y.None;
			let n = this.autoSaveDisabledOverrides.get(t) ?? 0;
			return this.autoSaveDisabledOverrides.set(t, n + 1), n === 0 && this._onDidChangeAutoSaveDisabled.fire(t), r(() => {
				let e = this.autoSaveDisabledOverrides.get(t) ?? 0;
				e <= 1 ? (this.autoSaveDisabledOverrides.delete(t), this._onDidChangeAutoSaveDisabled.fire(t)) : this.autoSaveDisabledOverrides.set(t, e - 1);
			});
		}
		get isHotExitEnabled() {
			return !this.contextService.getWorkspace().transient && this.currentHotExitConfiguration !== d.OFF;
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
	}, ti = Z = f([
		v(0, bt),
		v(1, Ze),
		v(2, Te),
		v(3, se),
		v(4, Ct),
		v(5, it),
		v(6, qe),
		v(7, ft)
	], ti);
}));
//#endregion
export { rr as $, z as $t, Or as A, B as At, yr as B, cn as Bt, Nr as C, wn as Ct, kr as D, Cn as Dt, Mr as E, Sn as Et, Cr as F, fn as Ft, or as G, P as Gt, _r as H, _n as Ht, Er as I, L as It, lr as J, an as Jt, cr as K, un as Kt, br as L, M as Lt, Sr as M, on as Mt, wr as N, hn as Nt, Ar as O, yn as Ot, Tr as P, nn as Pt, ir as Q, E as Qt, xr as R, F as Rt, Ir as S, On as St, jr as T, H as Tt, mr as U, pn as Ut, gr as V, R as Vt, hr as W, rn as Wt, ur as X, tn as Xt, dr as Y, N as Yt, pr as Z, Kt as Zt, Br as _, Zt as _n, U as _t, X as a, en as an, $n as at, Vr as b, An as bt, Qr as c, D as cn, zn as ct, Kr as d, O as dn, Un as dt, Xt as en, ar as et, Gr as f, k as fn, Bn as ft, Wr as g, Qt as gn, In as gt, Ur as h, Ht as hn, Fn as ht, ni as i, Jt as in, Ln as it, K as j, vn as jt, Dr as k, bn as kt, Yr as l, Vt as ln, Hn as lt, Xr as m, $t as mn, Vn as mt, Q as n, j as nn, tr as nt, $r as o, Bt as on, Gn as ot, Jr as p, Wt as pn, Kn as pt, sr as q, I as qt, ti as r, qt as rn, nr as rt, Zr as s, zt as sn, Wn as st, $ as t, Yt as tn, G as tt, qr as u, A as un, qn as ut, q as v, Mn as vt, Pr as w, Tn as wt, Fr as x, Dn as xt, Hr as y, kn as yt, vr as z, sn as zt };
