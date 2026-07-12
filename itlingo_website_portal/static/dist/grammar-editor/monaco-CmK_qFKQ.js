import { $j as e, $y as t, A_ as n, Ab as r, Bb as i, Cd as a, Em as o, Fb as s, Gm as c, H_ as l, IC as u, Ib as d, Jy as f, Kj as p, Lb as m, Lj as h, Mb as g, Md as ee, Mj as _, Nk as te, Ob as v, Og as y, Om as ne, Pj as b, Q as re, Qh as ie, Qy as ae, Rb as oe, Ry as se, Sm as ce, TA as le, U_ as ue, WC as de, Xl as fe, Xy as pe, Yl as x, Z as me, _b as he, _c as ge, ab as S, b_ as C, cg as w, dN as T, dv as E, em as D, fb as O, gb as k, gc as A, gs as j, hs as M, ih as N, ij as P, jb as F, jd as I, kO as L, kb as R, lv as z, mb as _e, n as B, pb as V, r as ve, rh as ye, sA as be, t as H, tm as xe, ub as Se, vb as Ce, vg as we, wD as Te, wc as Ee, wd as De, xm as Oe, zD as ke, zT as Ae } from "./standaloneServices-C51B94Xh.js";
import { s as U } from "./configuration.service-DJ_Qr0zd.js";
import { Oa as je, di as Me, ka as Ne } from "./editorResolverService-CZFxBDpH.js";
import { lC as Pe, oC as Fe } from "./monaco-vscode-extensions-service-override-B4FJQig8.js";
import { C as Ie, T as Le, w as Re } from "./files-iACwD_Ow.js";
import { Vn as ze, ir as Be } from "./monaco-vscode-files-service-override-BUohVD35.js";
T(), p(), h(), P(), le(), be(), te(), L(), ke(), Te(), Ae(), de(), d(), g(), r(), Ce(), k(), _e(), O(), Se(), S(), t(), pe(), se(), E(), ue(), n(), Ne(), y(), we(), w(), ie(), N(), ye(), c(), ne(), o(), ce(), Oe(), xe(), ee(), De(), fe(), Me(), Ee(), ge(), j(), re(), ve(), Pe(), Fe(), Be(), i();
function Ve(e, t) {
	return e.invokeFunction((e) => oe.getServiceDependencies(t).sort((e, t) => e.index - t.index).map((t) => e.get(t.id)));
}
function W(e) {
	let t = e;
	return class extends t {
		constructor(...t) {
			super(...t.slice(1), ...Ve(t[0], e));
		}
	};
}
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/monaco.js
i();
function G(t, n) {
	let r = e(t.editor) ? _(t.editor) : Object.create(null);
	return Object.assign(r, _(n)), r;
}
function K(t, n) {
	let r = G(t);
	if (e(t.diffEditor)) {
		let e = _(t.diffEditor);
		e.diffCodeLens = e.codeLens, delete e.codeLens, e.diffWordWrap = e.wordWrap, delete e.wordWrap, Object.assign(r, e);
	}
	return r.accessibilityVerbose = t.accessibility?.verbosity?.diffEditor ?? !1, Object.assign(r, _(n)), r;
}
function q(e) {
	let t = class extends e {
		constructor(e, t = {}, n, r) {
			let { theme: i, autoDetectHighContrast: a, model: o, value: s, language: c, accessibilityHelpUrl: l, ariaContainerElement: u, overflowWidgetsDomNode: d, dimension: f, ...p } = t, m = G(r.getValue(t.model?.uri), p);
			super(n, e, {
				...m,
				overflowWidgetsDomNode: d,
				dimension: f,
				theme: i,
				autoDetectHighContrast: a,
				model: o,
				value: s,
				language: c,
				accessibilityHelpUrl: l,
				ariaContainerElement: u
			}), this.textResourceConfigurationService = r, this.optionsOverrides = {}, this.lastAppliedEditorOptions = m, this.optionsOverrides = p, this._register(r.onDidChangeConfiguration((e) => {
				let t = this.getModel()?.uri;
				t != null && e.affectsConfiguration(t, "editor") && this.updateEditorConfiguration();
			})), this._register(this.onDidChangeModelLanguage(() => this.updateEditorConfiguration())), this._register(this.onDidChangeModel(() => this.updateEditorConfiguration())), this.updateEditorConfiguration();
			let h = n.createChild(new x([V, this._contextKeyService])), g = this._register(h.createInstance(ze));
			this.onDidChangeModel((e) => {
				g.set(e.newModelUrl);
			}), g.set(this.getModel()?.uri);
		}
		updateEditorConfiguration() {
			if (!this.hasModel() || this.textResourceConfigurationService == null) return;
			let e = this.getModel().uri, t = this.textResourceConfigurationService.getValue(e);
			if (t == null) return;
			let n = G(t, this.optionsOverrides), r = n;
			this.lastAppliedEditorOptions != null && (r = b(this.lastAppliedEditorOptions, r)), Object.keys(r).length > 0 && (this.lastAppliedEditorOptions = n, super.updateOptions(r));
		}
		updateOptions(e) {
			this.optionsOverrides ??= {}, je.applyUpdate(this.optionsOverrides, e) && this.updateEditorConfiguration();
		}
	};
	return t = v([R(2, m), R(3, z)], t), t;
}
var He = q(W(Ie)), J = q(W(Le)), Y = class extends W(Re) {
	constructor(e, t = {}, n, r) {
		let { theme: i, autoDetectHighContrast: a, modifiedAriaLabel: o, originalAriaLabel: s, overflowWidgetsDomNode: c, dimension: l, ...u } = t, d = K(r.getValue(void 0), u);
		super(n, e, {
			...d,
			overflowWidgetsDomNode: c,
			dimension: l,
			theme: i,
			autoDetectHighContrast: a,
			modifiedAriaLabel: o,
			originalAriaLabel: s
		}), this.textResourceConfigurationService = r, this.optionsOverrides = {}, this.lastAppliedEditorOptions = d, this.optionsOverrides = u, this._register(r.onDidChangeConfiguration((e) => {
			let t = this._targetEditor.getModel()?.uri;
			t != null && (e.affectsConfiguration(t, "editor") || e.affectsConfiguration(t, "diffEditor") || e.affectsConfiguration(t, "accessibility.verbosity.diffEditor")) && this.updateEditorConfiguration();
		})), this._register(this._targetEditor.onDidChangeModelLanguage(() => this.updateEditorConfiguration())), this._register(this.onDidChangeModel(() => this.updateEditorConfiguration())), this.updateEditorConfiguration();
	}
	updateEditorConfiguration() {
		if (this.getModel() == null || this.textResourceConfigurationService == null) return;
		let e = this._targetEditor.getModel()?.uri, t = this.textResourceConfigurationService.getValue(e);
		if (t == null) return;
		let n = K(t, this.optionsOverrides), r = n;
		this.lastAppliedEditorOptions != null && (r = b(this.lastAppliedEditorOptions, r)), Object.keys(r).length > 0 && (this.lastAppliedEditorOptions = n, super.updateOptions(r));
	}
	updateOptions(e) {
		this.optionsOverrides ??= {}, this.optionsOverrides = {
			...this.optionsOverrides,
			...e
		}, this.updateEditorConfiguration();
	}
	_createInnerEditor(e, t, n) {
		return e.createInstance(He, t, n);
	}
};
Y = v([R(2, m), R(3, z)], Y);
async function X(e, t) {
	await (await U(M)).writeFile(e, u.fromString(t));
}
async function Ue(e, t) {
	return t != null && await X(e, t), await (await U(F)).createModelReference(e);
}
function We(e) {
	return e.registerKeybindingProvider != null;
}
var Z = class extends H {
	constructor(e, t, n, r, i, a, o) {
		super(t, n, r, i, a, o), this.delegate = e, this._register(e.registerKeybindingProvider({
			provideKeybindings: () => this.getUserKeybindingItems(),
			onDidChangeKeybindings: this.onDidUpdateKeybindings
		}));
	}
	_getResolver() {
		return this.delegate._getResolver();
	}
	resolveKeyboardEvent(e) {
		return this.delegate.resolveKeyboardEvent(e);
	}
	resolveKeybinding(e) {
		return this.delegate.resolveKeybinding(e);
	}
	resolveUserBinding(e) {
		return this.delegate.resolveUserBinding(e);
	}
	_dumpDebugInfo() {
		return this.delegate._dumpDebugInfo();
	}
	_dumpDebugInfoJSON() {
		return this.delegate._dumpDebugInfoJSON();
	}
	enableKeybindingHoldMode(e) {
		return this.delegate.enableKeybindingHoldMode(e);
	}
};
Z = v([
	R(1, V),
	R(2, he),
	R(3, ae),
	R(4, I),
	R(5, f),
	R(6, s)
], Z);
var Q = null;
function $(e) {
	if (Q == null) {
		let t = new x();
		t.set(A, new D(me, [], !0));
		let n = e.get(a);
		!(n instanceof H) && We(n) && t.set(a, new D(Z, [n], !0)), Q = e.get(m).createChild(t);
	}
	return Q;
}
var Ge = (e, t, n) => B.initialize(n ?? {}).invokeFunction($).createInstance(J, e, t), Ke = (e, t, n) => B.initialize(n ?? {}).invokeFunction($).createInstance(Y, e, t);
({
	...l,
	...C
});
//#endregion
export { X as i, Ge as n, Ue as r, Ke as t };
