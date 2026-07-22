import { $f as e, $g as t, A as n, AA as r, Aj as i, Ay as a, Bb as o, Bc as s, Cc as c, Cj as l, Cy as u, DN as d, Ey as f, FA as p, Gc as m, HT as h, Ic as g, Ih as _, JO as ee, Jh as te, Ju as ne, KA as re, Kx as ie, MA as v, NA as ae, NO as oe, ON as y, PT as se, Rc as b, Sc as x, Sy as ce, Ug as le, Ur as ue, Vu as de, Yh as fe, Yu as pe, Yy as me, _S as S, _h as he, at as ge, bS as C, cb as w, dk as T, du as E, ep as D, fh as O, fu as k, hS as A, id as j, jA as M, jk as N, k as P, kN as F, kc as I, ky as L, l_ as _e, mN as ve, n as R, ot as ye, ph as be, r as xe, rd as z, rp as Se, sb as Ce, t as B, tp as we, uj as Te, wy as V, yD as Ee, y_ as De, yh as Oe, zb as H, zc as ke, zy as Ae } from "./standaloneServices-DUdtGggg.js";
import { Ca as je, Gr as Me, Sa as Ne } from "./embeddedCodeEditorWidget-DPX_ivX-.js";
import { d as Pe, l as Fe, u as Ie } from "./fileConstants-3FE16HF_.js";
import { Ht as Le, an as Re } from "./monaco-vscode-files-service-override-7u1fRyMX.js";
import { Mi as ze, Ni as Be } from "./monaco-vscode-extensions-service-override-DXU-yJ4u.js";
import { t as U } from "./services-Bnks5LpF.js";
F(), ve(), l(), Te(), re(), M(), N(), T(), ee(), oe(), Ee(), h(), C(), ie(), o(), w(), me(), a(), f(), u(), De(), _e(), t(), le(), fe(), te(), _(), Oe(), he(), be(), O(), Se(), D(), j(), pe(), de(), k(), m(), s(), b(), g(), I(), c(), ue(), ye(), n(), xe(), je(), Me(), Re(), Be(), ze(), p();
function Ve(e, t) {
	return e.invokeFunction((e) => ae.getServiceDependencies(t).sort((e, t) => e.index - t.index).map((t) => e.get(t.id)));
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
p();
function G(e, t) {
	let n = i(e.editor) ? A(e.editor) : Object.create(null);
	return Object.assign(n, A(t)), n;
}
function K(e, t) {
	let n = G(e);
	if (i(e.diffEditor)) {
		let t = A(e.diffEditor);
		t.diffCodeLens = t.codeLens, delete t.codeLens, t.diffWordWrap = t.wordWrap, delete t.wordWrap, Object.assign(n, t);
	}
	return n.accessibilityVerbose = e.accessibility?.verbosity?.diffEditor ?? !1, Object.assign(n, A(t)), n;
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
			let h = n.createChild(new P([z, this._contextKeyService])), g = this._register(h.createInstance(Le));
			this.onDidChangeModel((e) => {
				g.set(e.newModelUrl);
			}), g.set(this.getModel()?.uri);
		}
		updateEditorConfiguration() {
			if (!this.hasModel() || this.textResourceConfigurationService == null) return;
			let e = this.getModel().uri, t = this.textResourceConfigurationService.getValue(e);
			if (t == null) return;
			let n = G(t, this.optionsOverrides), r = n;
			this.lastAppliedEditorOptions != null && (r = S(this.lastAppliedEditorOptions, r)), Object.keys(r).length > 0 && (this.lastAppliedEditorOptions = n, super.updateOptions(r));
		}
		updateOptions(e) {
			this.optionsOverrides ??= {}, Ne.applyUpdate(this.optionsOverrides, e) && this.updateEditorConfiguration();
		}
	};
	return t = d([y(2, v), y(3, V)], t), t;
}
var He = q(W(Fe)), J = q(W(Pe)), Y = class extends W(Ie) {
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
		this.lastAppliedEditorOptions != null && (r = S(this.lastAppliedEditorOptions, r)), Object.keys(r).length > 0 && (this.lastAppliedEditorOptions = n, super.updateOptions(r));
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
Y = d([y(2, v), y(3, V)], Y);
async function X(e, t) {
	await (await U(L)).writeFile(e, se.fromString(t));
}
async function Ue(e, t) {
	return t != null && await X(e, t), await (await U(ce)).createModelReference(e);
}
function We(e) {
	return e.registerKeybindingProvider != null;
}
var Z = class extends B {
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
Z = d([
	y(1, z),
	y(2, ke),
	y(3, e),
	y(4, ne),
	y(5, we),
	y(6, r)
], Z);
var Q = null;
function $(e) {
	if (Q == null) {
		let t = new P();
		t.set(x, new H(ge, [], !0));
		let n = e.get(E);
		!(n instanceof B) && We(n) && t.set(E, new H(Z, [n], !0)), Q = e.get(v).createChild(t);
	}
	return Q;
}
var Ge = (e, t, n) => R.initialize(n ?? {}).invokeFunction($).createInstance(J, e, t), Ke = (e, t, n) => R.initialize(n ?? {}).invokeFunction($).createInstance(Y, e, t);
({
	...Ce,
	...Ae
});
//#endregion
export { X as i, Ge as n, Ue as r, Ke as t };
