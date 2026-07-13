import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { $O as t, $j as n, Ab as r, Aw as i, Ba as a, Bb as o, Bd as s, DD as c, Dl as l, ED as u, Ej as d, El as f, Fj as p, IC as m, ID as h, Ia as ee, Jo as te, Jy as g, Kj as _, LO as ne, Lb as re, Lj as ie, ND as ae, Ob as v, PM as oe, Qw as y, RA as b, Ra as x, Sj as se, TA as ce, Tj as S, UA as le, Va as ue, Vb as de, Vd as fe, WC as pe, Ww as me, Xy as C, _A as he, bM as ge, bj as w, bo as T, cN as E, dN as D, dc as _e, dj as ve, eM as O, eT as ye, ec as k, fT as A, gs as be, hs as xe, ij as j, jj as Se, js as M, kb as N, lc as P, lp as Ce, mA as we, mw as Te, n as F, nA as I, nM as Ee, nT as De, nc as L, pT as Oe, qo as R, r as ke, rT as z, sA as Ae, tA as B, uT as je, vD as V, vo as H, wD as U, xD as W, xw as Me, yD as G, yo as K, za as q, zb as Ne } from "./standaloneServices-C51B94Xh.js";
import { At as Pe, Bt as Fe, Gt as Ie, Ht as Le, Jt as Re, Kt as ze, Mt as Be, N as J, Nt as Ve, Sr as He, Tr as Ue, Tt as We, Vt as Ge, _r as Ke, c as qe, fr as Je, gr as Ye, hr as Y, i as Xe, j as Ze, jt as Qe, lr as $e, mr as et, pr as tt, qt as nt, s as rt, t as it, vr as at, w as ot, wr as st, wt as ct, xr as lt, yr as ut } from "./monaco-vscode-files-service-override-DGMr6mGW.js";
import { D as dt, O as ft } from "./filesConfigurationService-CxZOIrXS.js";
import { o as pt, r as mt } from "./extensionManagement.service-ELKOh9mo.js";
import { a as ht, o as gt, r as _t, t as vt } from "./tools-CGs0ihXi.js";
import { n as yt, t as bt } from "./jsonErrorMessages-CboTgU8y.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensionManagement/common/extensionsProfileScannerService.service.js
var xt, St = e((() => {
	o(), xt = Ne("IExtensionsProfileScannerService");
})), Ct = e((() => {
	j(), h(), Ce();
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/telemetry/common/telemetryUtils.js
function wt(e, t) {
	return !t.isBuilt && !t.disableTelemetry || !(t.disableTelemetry || !e.enableTelemetry);
}
function Tt(e, t) {
	return t.extensionTestsLocationURI ? !0 : !(t.isBuilt || t.disableTelemetry || e.enableTelemetry && e.aiConfig?.ariaKey);
}
function Et(e) {
	let t = e.getValue(x), n = e.getValue(ee);
	if (e.getValue("telemetry.enableTelemetry") === !1 || n === !1) return a.NONE;
	switch (t ?? q.ON) {
		case q.ON: return a.USAGE;
		case q.ERROR: return a.ERROR;
		case q.CRASH: return a.CRASH;
		case q.OFF: return a.NONE;
	}
}
function Dt(e, t) {
	if (!e) return "none";
	let n = st(e), r = t?.remoteExtensionTips;
	if (r && Object.prototype.hasOwnProperty.call(r, n)) return n;
	let i = t?.virtualWorkspaceExtensionTips;
	return i && Object.prototype.hasOwnProperty.call(i, n) ? n : "other";
}
function Ot(e, t) {
	if (!e || !e.includes("/") && !e.includes("\\")) return e;
	let n = e, r = [];
	for (let n of t) for (;;) {
		let t = n.exec(e);
		if (!t) break;
		r.push([t.index, n.lastIndex]);
	}
	let i = /^[\\\/]?(node_modules|node_modules\.asar)[\\\/]/, a = /(file:\/\/)?([a-zA-Z]:(\\\\|\\|\/)|(\\\\|\\|\/))?([\w-\._]+(\\\\|\\|\/))+[\w-\._]*/g, o = 0;
	for (n = "";;) {
		let t = a.exec(e);
		if (!t) break;
		let s = r.some(([e, n]) => t.index < n && e < a.lastIndex);
		!i.test(t[0]) && !s && (n += e.substring(o, t.index) + "<REDACTED: user-file-path>", o = a.lastIndex);
	}
	return o < e.length && (n += e.substr(o)), n;
}
function kt(e) {
	if (!e) return e;
	for (let t of [
		{
			label: "URL",
			regex: /[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^\s]*/
		},
		{
			label: "Google API Key",
			regex: /AIza[A-Za-z0-9_\\\-]{35}/
		},
		{
			label: "JWT",
			regex: /eyJ[0eXAiOiJKV1Qi|hbGci|a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+/
		},
		{
			label: "Slack Token",
			regex: /xox[pbar]\-[A-Za-z0-9]/
		},
		{
			label: "GitHub Token",
			regex: /(gh[psuro]_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59})/
		},
		{
			label: "Generic Secret",
			regex: /(key|token|sig|secret|signature|password|passwd|pwd|android:value)[^a-zA-Z0-9]/i
		},
		{
			label: "CLI Credentials",
			regex: /((login|psexec|(certutil|psexec)\.exe).{1,50}(\s-u(ser(name)?)?\s+.{3,100})?\s-(admin|user|vm|root)?p(ass(word)?)?\s+["']?[^$\-\/\s]|(^|[\s\r\n\\])net(\.exe)?.{1,5}(user\s+|share\s+\/user:| user -? secrets ? set) \s + [^ $\s \/])/
		},
		{
			label: "Microsoft Entra ID",
			regex: /eyJ(?:0eXAiOiJKV1Qi|hbGci|[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.)/
		},
		{
			label: "Email",
			regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
		}
	]) if (t.regex.test(e)) return `<REDACTED: ${t.label}>`;
	return e;
}
function At(e, t) {
	return e ? Se(e, (e) => {
		if (e instanceof jt || Object.hasOwnProperty.call(e, "isTrustedTelemetryValue")) return e.value;
		if (typeof e == "string") {
			let n = e.replaceAll("%20", " ");
			n = Ot(n, t);
			for (let e of t) n = n.replace(e, "");
			return n = kt(n), n;
		}
	}) : {};
}
var jt, Mt, Nt, Pt, Ft, It = e((() => {
	ie(), _(), S(), Ue(), Ct(), ue(), jt = class {
		constructor(e) {
			this.value = e, this.isTrustedTelemetryValue = !0;
		}
	}, Mt = class {
		constructor() {
			this.telemetryLevel = a.NONE, this.sessionId = "someValue.sessionId", this.machineId = "someValue.machineId", this.sqmId = "someValue.sqmId", this.devDeviceId = "someValue.devDeviceId", this.firstSessionDate = "someValue.firstSessionDate", this.sendErrorTelemetry = !1;
		}
		publicLog() {}
		publicLog2() {}
		publicLogError() {}
		publicLogError2() {}
		setExperimentProperty() {}
	}, new Mt(), Nt = class {
		async publicLog(e, t, n) {}
		async publicLogError(e, t, n) {}
	}, Pt = "telemetry", Ft = {
		id: Pt,
		name: d(2082, "Telemetry")
	};
})), Lt, Rt, zt, Bt, Vt, Ht = e((() => {
	pt(), o(), Lt = de(mt), Rt = Ne("extensionManagementServerService"), zt = de(Lt), Bt = Ne("extensionEnablementService"), Vt = Ne("IWebExtensionsScannerService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensionManagement/common/extensionManagementUtil.js
function X(e, t) {
	return e.uuid && t.uuid ? e.uuid === t.uuid : e.id === t.id || ne(e.id, t.id) === 0;
}
function Ut(e) {
	let t = Zt.exec(e);
	return t && t[1] ? [Gt(t[1]), t[2]] : [Gt(e), void 0];
}
function Wt(e, t) {
	return `${e}.${t}`;
}
function Gt(e) {
	return e.toLowerCase();
}
function Kt(e, t) {
	return Gt(Wt(e ?? "undefined_publisher", t));
}
async function qt(e, t) {
	if (!ve) return !1;
	let n;
	try {
		n = (await e.readFile(V.file("/etc/os-release"))).value.toString();
	} catch {
		try {
			n = (await e.readFile(V.file("/usr/lib/os-release"))).value.toString();
		} catch (e) {
			t.debug("Error while getting the os-release file.", E(e));
		}
	}
	return !!n && (n.match(/^ID=([^\u001b\r\n]*)/m) || [])[1] === "alpine";
}
async function Jt(e, t) {
	let n = Fe(await qt(e, t) ? "alpine" : se, ae);
	return t.debug("ComputeTargetPlatform:", n), n;
}
function Yt(e, t) {
	return Xt(e, t) !== void 0;
}
function Xt(e, t) {
	return t.find(({ extensionOrPublisher: t }) => O(t) ? ne(e.id.split(".")[0], t) === 0 : X(e, t));
}
var Zt, Qt = e((() => {
	t(), Ge(), ut(), j(), G(), D(), h(), It(), _(), Zt = /^([^.]+\..+)@((prerelease)|(\d+\.\d+\.\d+(-.*)?))$/, new Je("pprice.better-merge");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/extensions/common/extensions.js
function $t(e) {
	let t = new tt();
	for (let n of e) t.set(n.identifier, n);
	return t;
}
function en(e, t) {
	return e.enabledApiProposals ? e.enabledApiProposals.includes(t) : !1;
}
function tn(e, t) {
	if (!en(e, t)) throw Error(`Extension '${e.identifier.value}' CANNOT use API proposal: ${t}.\nIts package.json#enabledApiProposals-property declares: ${e.enabledApiProposals?.join(", ") ?? "[]"} but NOT ${t}.\n The missing proposal MUST be added and you must start in extension development mode or use the following command line switch: --enable-proposed-api ${e.identifier.value}`);
}
function nn(e) {
	return {
		type: e.isBuiltin ? Y.System : Y.User,
		isBuiltin: e.isBuiltin || e.isUserBuiltin,
		identifier: {
			id: Kt(e.publisher, e.name),
			uuid: e.uuid
		},
		manifest: e,
		location: e.extensionLocation,
		targetPlatform: e.targetPlatform,
		validations: [],
		isValid: !0,
		preRelease: e.preRelease,
		publisherDisplayName: e.publisherDisplayName
	};
}
function rn(e, t) {
	let n = Wt(e.manifest.publisher, e.manifest.name);
	return {
		id: n,
		identifier: new Je(n),
		isBuiltin: e.type === Y.System,
		isUserBuiltin: e.type === Y.User && e.isBuiltin,
		isUnderDevelopment: !!t,
		extensionLocation: e.location,
		uuid: e.identifier.uuid,
		targetPlatform: e.targetPlatform,
		publisherDisplayName: e.publisherDisplayName,
		preRelease: e.preRelease,
		...e.manifest
	};
}
var an, on, sn, cn, ln, un, dn, fn, pn = e((() => {
	Ae(), G(), Qt(), Ve(), ut(), an = Object.freeze({
		identifier: new Je("nullExtensionDescription"),
		name: "Null Extension Description",
		version: "0.0.0",
		publisher: "vscode",
		engines: { vscode: "" },
		extensionLocation: V.parse("void:location"),
		isBuiltin: !1,
		targetPlatform: Ye.UNDEFINED,
		isUserBuiltin: !1,
		isUnderDevelopment: !1,
		preRelease: !1
	}), on = class {
		constructor(e) {
			this.dependency = e;
		}
	}, (function(e) {
		e[e.EagerAutoStart = 1] = "EagerAutoStart", e[e.EagerManualStart = 2] = "EagerManualStart", e[e.LazyAutoStart = 3] = "LazyAutoStart";
	})(sn ||= {}), cn = class {
		get versionId() {
			return this._versionId;
		}
		get allExtensions() {
			return this._allExtensions;
		}
		get myExtensions() {
			return this._myExtensions;
		}
		constructor(e, t, n) {
			this._versionId = e, this._allExtensions = t.slice(0), this._myExtensions = n.slice(0), this._myActivationEvents = null;
		}
		toSnapshot() {
			return {
				versionId: this._versionId,
				allExtensions: this._allExtensions,
				myExtensions: this._myExtensions,
				activationEvents: Be.createActivationEventsMap(this._allExtensions)
			};
		}
		set(e, t, n) {
			if (this._versionId > e) throw Error(`ExtensionHostExtensions: invalid versionId ${e} (current: ${this._versionId})`);
			let r = [], i = [], a = [], o = [], s = $t(this._allExtensions), c = $t(t), l = (e, t) => e.extensionLocation.toString() === t.extensionLocation.toString() || e.isBuiltin === t.isBuiltin || e.isUserBuiltin === t.isUserBuiltin || e.isUnderDevelopment === t.isUnderDevelopment;
			for (let e of this._allExtensions) {
				let t = c.get(e.identifier);
				if (!t) {
					r.push(e.identifier), s.delete(e.identifier);
					continue;
				}
				if (!l(e, t)) {
					r.push(e.identifier), s.delete(e.identifier);
					continue;
				}
			}
			for (let e of t) {
				let t = s.get(e.identifier);
				if (!t) {
					i.push(e);
					continue;
				}
				if (!l(t, e)) {
					r.push(t.identifier), s.delete(t.identifier);
					continue;
				}
			}
			let u = new et(this._myExtensions), d = new et(n);
			for (let e of this._myExtensions) d.has(e) || a.push(e);
			for (let e of n) u.has(e) || o.push(e);
			let f = {
				versionId: e,
				toRemove: r,
				toAdd: i,
				addActivationEvents: Be.createActivationEventsMap(i),
				myToRemove: a,
				myToAdd: o
			};
			return this.delta(f), f;
		}
		delta(e) {
			if (this._versionId >= e.versionId) return null;
			let { toRemove: t, toAdd: n, myToRemove: r, myToAdd: i } = e, a = new et(t), o = new et(r);
			for (let e = 0; e < this._allExtensions.length; e++) a.has(this._allExtensions[e].identifier) && (this._allExtensions.splice(e, 1), e--);
			for (let e = 0; e < this._myExtensions.length; e++) o.has(this._myExtensions[e]) && (this._myExtensions.splice(e, 1), e--);
			for (let e of n) this._allExtensions.push(e);
			for (let e of i) this._myExtensions.push(e);
			return this._myActivationEvents = null, e;
		}
		containsExtension(e) {
			for (let t of this._myExtensions) if (Je.equals(t, e)) return !0;
			return !1;
		}
		containsActivationEvent(e) {
			return this._myActivationEvents ||= this._readMyActivationEvents(), this._myActivationEvents.has(e);
		}
		_readMyActivationEvents() {
			let e = /* @__PURE__ */ new Set();
			for (let t of this._allExtensions) {
				if (!this.containsExtension(t.identifier)) continue;
				let n = Be.readActivationEvents(t);
				for (let t of n) e.add(t);
			}
			return e;
		}
	}, ln = class {
		constructor(e, t, n, r) {
			this.codeLoadingTime = e, this.activateCallTime = t, this.activateResolvedTime = n, this.activationReason = r;
		}
	}, un = class {
		constructor(e, t) {
			this.description = e, this.value = t;
		}
	}, (function(e) {
		e[e.Normal = 0] = "Normal", e[e.Immediate = 1] = "Immediate";
	})(dn ||= {}), fn = class {
		constructor() {
			this.onDidRegisterExtensions = I.None, this.onDidChangeExtensionsStatus = I.None, this.onDidChangeExtensions = I.None, this.onWillActivateByEvent = I.None, this.onDidChangeResponsiveChange = I.None, this.onWillStop = I.None, this.extensions = [];
		}
		activateByEvent(e) {
			return Promise.resolve(void 0);
		}
		activateById(e, t) {
			return Promise.resolve(void 0);
		}
		activationEventIsDone(e) {
			return !1;
		}
		whenInstalledExtensionsRegistered() {
			return Promise.resolve(!0);
		}
		getExtension() {
			return Promise.resolve(void 0);
		}
		readExtensionPointContributions(e) {
			return Promise.resolve(Object.create(null));
		}
		getExtensionsStatus() {
			return Object.create(null);
		}
		getInspectPorts(e, t) {
			return Promise.resolve([]);
		}
		async stopExtensionHosts() {
			return !0;
		}
		async startExtensionHosts() {}
		async setRemoteEnvironment(e) {}
		canAddExtension() {
			return !1;
		}
		canRemoveExtension() {
			return !1;
		}
	};
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/l10n.js
function mn(e) {
	return _n[e];
}
function hn() {
	return vn;
}
function gn() {
	return yn;
}
var _n, vn, yn, bn = e((() => {
	S(), _n = {};
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/extensions/common/extensionHostKind.js
function xn(e) {
	if (e === null) return "None";
	switch (e) {
		case Z.LocalProcess: return "LocalProcess";
		case Z.LocalWebWorker: return "LocalWebWorker";
		case Z.Remote: return "Remote";
	}
}
function Sn(e) {
	switch (e) {
		case Q.None: return "None";
		case Q.Local: return "Local";
		case Q.Remote: return "Remote";
	}
}
function Cn(e, t, n, r) {
	let i = wn(e, n), a = wn(t, n), o = /* @__PURE__ */ new Map(), s = (e) => {
		if (o.has(e.key)) return;
		let t = i.get(e.key) || null, n = a.get(e.key) || null, r = new En(t, n);
		o.set(r.key, r);
	};
	i.forEach((e) => s(e)), a.forEach((e) => s(e));
	let c = /* @__PURE__ */ new Map();
	return o.forEach((e) => {
		let t = !!e.local, n = !!e.remote, i = !!(e.local && e.local.isUnderDevelopment), a = !!(e.remote && e.remote.isUnderDevelopment), o = Q.None;
		i && !a ? o = Q.Local : a && !i && (o = Q.Remote), c.set(e.key, r(e.identifier, e.kind, t, n, o));
	}), c;
}
function wn(e, t) {
	let n = /* @__PURE__ */ new Map();
	return e.forEach((e) => {
		let r = new Tn(e, t(e));
		n.set(r.key, r);
	}), n;
}
var Z, Q, Tn, En, Dn = e((() => {
	ut(), (function(e) {
		e[e.LocalProcess = 1] = "LocalProcess", e[e.LocalWebWorker = 2] = "LocalWebWorker", e[e.Remote = 3] = "Remote";
	})(Z ||= {}), (function(e) {
		e[e.None = 0] = "None", e[e.Local = 1] = "Local", e[e.Remote = 2] = "Remote";
	})(Q ||= {}), Tn = class {
		constructor(e, t) {
			this.desc = e, this.kind = t;
		}
		get key() {
			return Je.toKey(this.desc.identifier);
		}
		get isUnderDevelopment() {
			return this.desc.isUnderDevelopment;
		}
	}, En = class {
		constructor(e, t) {
			this.local = e, this.remote = t;
		}
		get key() {
			return this.local ? this.local.key : this.remote.key;
		}
		get identifier() {
			return this.local ? this.local.desc.identifier : this.remote.desc.identifier;
		}
		get kind() {
			return this.local ? this.local.kind : this.remote.kind;
		}
	};
})), On, kn = e((() => {
	On = { exports: {} };
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/external/vscode-semver/semver.js
function An() {
	return jn ? On.exports : (jn = 1, (function(e, t) {
		t = e.exports = j;
		var n = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
			var e = Array.prototype.slice.call(arguments, 0);
			e.unshift("SEMVER"), console.log.apply(console, e);
		} : function() {};
		t.SEMVER_SPEC_VERSION = "2.0.0";
		var r = 256, i = 2 ** 53 - 1 || 9007199254740991, a = 16, o = t.re = [], s = t.src = [], c = 0, l = c++;
		s[l] = "0|[1-9]\\d*";
		var u = c++;
		s[u] = "[0-9]+";
		var d = c++;
		s[d] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
		var f = c++;
		s[f] = "(" + s[l] + ")\\.(" + s[l] + ")\\.(" + s[l] + ")";
		var p = c++;
		s[p] = "(" + s[u] + ")\\.(" + s[u] + ")\\.(" + s[u] + ")";
		var m = c++;
		s[m] = "(?:" + s[l] + "|" + s[d] + ")";
		var h = c++;
		s[h] = "(?:" + s[u] + "|" + s[d] + ")";
		var ee = c++;
		s[ee] = "(?:-(" + s[m] + "(?:\\." + s[m] + ")*))";
		var te = c++;
		s[te] = "(?:-?(" + s[h] + "(?:\\." + s[h] + ")*))";
		var g = c++;
		s[g] = "[0-9A-Za-z-]+";
		var _ = c++;
		s[_] = "(?:\\+(" + s[g] + "(?:\\." + s[g] + ")*))";
		var ne = c++, re = "v?" + s[f] + s[ee] + "?" + s[_] + "?";
		s[ne] = "^" + re + "$";
		var ie = "[v=\\s]*" + s[p] + s[te] + "?" + s[_] + "?", ae = c++;
		s[ae] = "^" + ie + "$";
		var v = c++;
		s[v] = "((?:<|>)?=?)";
		var oe = c++;
		s[oe] = s[u] + "|x|X|\\*";
		var y = c++;
		s[y] = s[l] + "|x|X|\\*";
		var b = c++;
		s[b] = "[v=\\s]*(" + s[y] + ")(?:\\.(" + s[y] + ")(?:\\.(" + s[y] + ")(?:" + s[ee] + ")?" + s[_] + "?)?)?";
		var x = c++;
		s[x] = "[v=\\s]*(" + s[oe] + ")(?:\\.(" + s[oe] + ")(?:\\.(" + s[oe] + ")(?:" + s[te] + ")?" + s[_] + "?)?)?";
		var se = c++;
		s[se] = "^" + s[v] + "\\s*" + s[b] + "$";
		var ce = c++;
		s[ce] = "^" + s[v] + "\\s*" + s[x] + "$";
		var S = c++;
		s[S] = "(?:^|[^\\d])(\\d{1," + a + "})(?:\\.(\\d{1," + a + "}))?(?:\\.(\\d{1," + a + "}))?(?:$|[^\\d])";
		var le = c++;
		s[le] = "(?:~>?)";
		var ue = c++;
		s[ue] = "(\\s*)" + s[le] + "\\s+", o[ue] = new RegExp(s[ue], "g");
		var de = "$1~", fe = c++;
		s[fe] = "^" + s[le] + s[b] + "$";
		var pe = c++;
		s[pe] = "^" + s[le] + s[x] + "$";
		var me = c++;
		s[me] = "(?:\\^)";
		var C = c++;
		s[C] = "(\\s*)" + s[me] + "\\s+", o[C] = new RegExp(s[C], "g");
		var he = "$1^", ge = c++;
		s[ge] = "^" + s[me] + s[b] + "$";
		var w = c++;
		s[w] = "^" + s[me] + s[x] + "$";
		var T = c++;
		s[T] = "^" + s[v] + "\\s*(" + ie + ")$|^$";
		var E = c++;
		s[E] = "^" + s[v] + "\\s*(" + re + ")$|^$";
		var D = c++;
		s[D] = "(\\s*)" + s[v] + "\\s*(" + ie + "|" + s[b] + ")", o[D] = new RegExp(s[D], "g");
		var _e = "$1$2$3", ve = c++;
		s[ve] = "^\\s*(" + s[b] + ")\\s+-\\s+(" + s[b] + ")\\s*$";
		var O = c++;
		s[O] = "^\\s*(" + s[x] + ")\\s+-\\s+(" + s[x] + ")\\s*$";
		var ye = c++;
		s[ye] = "(<|>)?=?\\s*\\*";
		for (var k = 0; k < c; k++) n(k, s[k]), o[k] || (o[k] = new RegExp(s[k]));
		t.parse = A;
		function A(e, t) {
			if (e instanceof j) return e;
			if (typeof e != "string" || e.length > r || !(t ? o[ae] : o[ne]).test(e)) return null;
			try {
				return new j(e, t);
			} catch {
				return null;
			}
		}
		t.valid = be;
		function be(e, t) {
			var n = A(e, t);
			return n ? n.version : null;
		}
		t.clean = xe;
		function xe(e, t) {
			var n = A(e.trim().replace(/^[=v]+/, ""), t);
			return n ? n.version : null;
		}
		t.SemVer = j;
		function j(e, t) {
			if (e instanceof j) {
				if (e.loose === t) return e;
				e = e.version;
			} else if (typeof e != "string") throw TypeError("Invalid Version: " + e);
			if (e.length > r) throw TypeError("version is longer than " + r + " characters");
			if (!(this instanceof j)) return new j(e, t);
			n("SemVer", e, t), this.loose = t;
			var a = e.trim().match(t ? o[ae] : o[ne]);
			if (!a) throw TypeError("Invalid Version: " + e);
			if (this.raw = e, this.major = +a[1], this.minor = +a[2], this.patch = +a[3], this.major > i || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > i || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > i || this.patch < 0) throw TypeError("Invalid patch version");
			a[4] ? this.prerelease = a[4].split(".").map(function(e) {
				if (/^[0-9]+$/.test(e)) {
					var t = +e;
					if (t >= 0 && t < i) return t;
				}
				return e;
			}) : this.prerelease = [], this.build = a[5] ? a[5].split(".") : [], this.format();
		}
		j.prototype.format = function() {
			return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), this.version;
		}, j.prototype.toString = function() {
			return this.version;
		}, j.prototype.compare = function(e) {
			return n("SemVer.compare", this.version, this.loose, e), e instanceof j || (e = new j(e, this.loose)), this.compareMain(e) || this.comparePre(e);
		}, j.prototype.compareMain = function(e) {
			return e instanceof j || (e = new j(e, this.loose)), P(this.major, e.major) || P(this.minor, e.minor) || P(this.patch, e.patch);
		}, j.prototype.comparePre = function(e) {
			if (e instanceof j || (e = new j(e, this.loose)), this.prerelease.length && !e.prerelease.length) return -1;
			if (!this.prerelease.length && e.prerelease.length) return 1;
			if (!this.prerelease.length && !e.prerelease.length) return 0;
			var t = 0;
			do {
				var r = this.prerelease[t], i = e.prerelease[t];
				if (n("prerelease compare", t, r, i), r === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (r === void 0) return -1;
				if (r === i) continue;
				return P(r, i);
			} while (++t);
		}, j.prototype.inc = function(e, t) {
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", t), this.inc("pre", t);
					break;
				case "major":
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case "pre":
					if (this.prerelease.length === 0) this.prerelease = [0];
					else {
						for (var n = this.prerelease.length; --n >= 0;) typeof this.prerelease[n] == "number" && (this.prerelease[n]++, n = -2);
						n === -1 && this.prerelease.push(0);
					}
					t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0]) : this.prerelease = [t, 0]);
					break;
				default: throw Error("invalid increment argument: " + e);
			}
			return this.format(), this.raw = this.version, this;
		}, t.inc = Se;
		function Se(e, t, n, r) {
			typeof n == "string" && (r = n, n = void 0);
			try {
				return new j(e, n).inc(t, r).version;
			} catch {
				return null;
			}
		}
		t.diff = M;
		function M(e, t) {
			if (z(e, t)) return null;
			var n = A(e), r = A(t);
			if (n.prerelease.length || r.prerelease.length) {
				for (var i in n) if ((i === "major" || i === "minor" || i === "patch") && n[i] !== r[i]) return "pre" + i;
				return "prerelease";
			}
			for (var i in n) if ((i === "major" || i === "minor" || i === "patch") && n[i] !== r[i]) return i;
		}
		t.compareIdentifiers = P;
		var N = /^[0-9]+$/;
		function P(e, t) {
			var n = N.test(e), r = N.test(t);
			return n && r && (e = +e, t = +t), n && !r ? -1 : r && !n ? 1 : e < t ? -1 : +(e > t);
		}
		t.rcompareIdentifiers = Ce;
		function Ce(e, t) {
			return P(t, e);
		}
		t.major = we;
		function we(e, t) {
			return new j(e, t).major;
		}
		t.minor = Te;
		function Te(e, t) {
			return new j(e, t).minor;
		}
		t.patch = F;
		function F(e, t) {
			return new j(e, t).patch;
		}
		t.compare = I;
		function I(e, t, n) {
			return new j(e, n).compare(new j(t, n));
		}
		t.compareLoose = Ee;
		function Ee(e, t) {
			return I(e, t, !0);
		}
		t.rcompare = De;
		function De(e, t, n) {
			return I(t, e, n);
		}
		t.sort = L;
		function L(e, n) {
			return e.sort(function(e, r) {
				return t.compare(e, r, n);
			});
		}
		t.rsort = Oe;
		function Oe(e, n) {
			return e.sort(function(e, r) {
				return t.rcompare(e, r, n);
			});
		}
		t.gt = R;
		function R(e, t, n) {
			return I(e, t, n) > 0;
		}
		t.lt = ke;
		function ke(e, t, n) {
			return I(e, t, n) < 0;
		}
		t.eq = z;
		function z(e, t, n) {
			return I(e, t, n) === 0;
		}
		t.neq = Ae;
		function Ae(e, t, n) {
			return I(e, t, n) !== 0;
		}
		t.gte = B;
		function B(e, t, n) {
			return I(e, t, n) >= 0;
		}
		t.lte = je;
		function je(e, t, n) {
			return I(e, t, n) <= 0;
		}
		t.cmp = V;
		function V(e, t, n, r) {
			var i;
			switch (t) {
				case "===":
					typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), i = e === n;
					break;
				case "!==":
					typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), i = e !== n;
					break;
				case "":
				case "=":
				case "==":
					i = z(e, n, r);
					break;
				case "!=":
					i = Ae(e, n, r);
					break;
				case ">":
					i = R(e, n, r);
					break;
				case ">=":
					i = B(e, n, r);
					break;
				case "<":
					i = ke(e, n, r);
					break;
				case "<=":
					i = je(e, n, r);
					break;
				default: throw TypeError("Invalid operator: " + t);
			}
			return i;
		}
		t.Comparator = H;
		function H(e, t) {
			if (e instanceof H) {
				if (e.loose === t) return e;
				e = e.value;
			}
			if (!(this instanceof H)) return new H(e, t);
			n("comparator", e, t), this.loose = t, this.parse(e), this.semver === U ? this.value = "" : this.value = this.operator + this.semver.version, n("comp", this);
		}
		var U = {};
		H.prototype.parse = function(e) {
			var t = this.loose ? o[T] : o[E], n = e.match(t);
			if (!n) throw TypeError("Invalid comparator: " + e);
			this.operator = n[1], this.operator === "=" && (this.operator = ""), n[2] ? this.semver = new j(n[2], this.loose) : this.semver = U;
		}, H.prototype.toString = function() {
			return this.value;
		}, H.prototype.test = function(e) {
			return n("Comparator.test", e, this.loose), this.semver === U ? !0 : (typeof e == "string" && (e = new j(e, this.loose)), V(e, this.operator, this.semver, this.loose));
		}, H.prototype.intersects = function(e, t) {
			if (!(e instanceof H)) throw TypeError("a Comparator is required");
			var n;
			if (this.operator === "") return n = new W(e.value, t), J(this.value, n, t);
			if (e.operator === "") return n = new W(this.value, t), J(e.semver, n, t);
			var r = (this.operator === ">=" || this.operator === ">") && (e.operator === ">=" || e.operator === ">"), i = (this.operator === "<=" || this.operator === "<") && (e.operator === "<=" || e.operator === "<"), a = this.semver.version === e.semver.version, o = (this.operator === ">=" || this.operator === "<=") && (e.operator === ">=" || e.operator === "<="), s = V(this.semver, "<", e.semver, t) && (this.operator === ">=" || this.operator === ">") && (e.operator === "<=" || e.operator === "<"), c = V(this.semver, ">", e.semver, t) && (this.operator === "<=" || this.operator === "<") && (e.operator === ">=" || e.operator === ">");
			return r || i || a && o || s || c;
		}, t.Range = W;
		function W(e, t) {
			if (e instanceof W) return e.loose === t ? e : new W(e.raw, t);
			if (e instanceof H) return new W(e.value, t);
			if (!(this instanceof W)) return new W(e, t);
			if (this.loose = t, this.raw = e, this.set = e.split(/\s*\|\|\s*/).map(function(e) {
				return this.parseRange(e.trim());
			}, this).filter(function(e) {
				return e.length;
			}), !this.set.length) throw TypeError("Invalid SemVer Range: " + e);
			this.format();
		}
		W.prototype.format = function() {
			return this.range = this.set.map(function(e) {
				return e.join(" ").trim();
			}).join("||").trim(), this.range;
		}, W.prototype.toString = function() {
			return this.range;
		}, W.prototype.parseRange = function(e) {
			var t = this.loose;
			e = e.trim(), n("range", e, t);
			var r = t ? o[O] : o[ve];
			e = e.replace(r, ze), n("hyphen replace", e), e = e.replace(o[D], _e), n("comparator trim", e, o[D]), e = e.replace(o[ue], de), e = e.replace(o[C], he), e = e.split(/\s+/).join(" ");
			var i = t ? o[T] : o[E], a = e.split(" ").map(function(e) {
				return G(e, t);
			}).join(" ").split(/\s+/);
			return this.loose && (a = a.filter(function(e) {
				return !!e.match(i);
			})), a = a.map(function(e) {
				return new H(e, t);
			}), a;
		}, W.prototype.intersects = function(e, t) {
			if (!(e instanceof W)) throw TypeError("a Range is required");
			return this.set.some(function(n) {
				return n.every(function(n) {
					return e.set.some(function(e) {
						return e.every(function(e) {
							return n.intersects(e, t);
						});
					});
				});
			});
		}, t.toComparators = Me;
		function Me(e, t) {
			return new W(e, t).set.map(function(e) {
				return e.map(function(e) {
					return e.value;
				}).join(" ").trim().split(" ");
			});
		}
		function G(e, t) {
			return n("comp", e), e = Pe(e, t), n("caret", e), e = q(e, t), n("tildes", e), e = Ie(e, t), n("xrange", e), e = Re(e, t), n("stars", e), e;
		}
		function K(e) {
			return !e || e.toLowerCase() === "x" || e === "*";
		}
		function q(e, t) {
			return e.trim().split(/\s+/).map(function(e) {
				return Ne(e, t);
			}).join(" ");
		}
		function Ne(e, t) {
			var r = t ? o[pe] : o[fe];
			return e.replace(r, function(t, r, i, a, o) {
				n("tilde", e, t, r, i, a, o);
				var s;
				return K(r) ? s = "" : K(i) ? s = ">=" + r + ".0.0 <" + (+r + 1) + ".0.0" : K(a) ? s = ">=" + r + "." + i + ".0 <" + r + "." + (+i + 1) + ".0" : o ? (n("replaceTilde pr", o), o.charAt(0) !== "-" && (o = "-" + o), s = ">=" + r + "." + i + "." + a + o + " <" + r + "." + (+i + 1) + ".0") : s = ">=" + r + "." + i + "." + a + " <" + r + "." + (+i + 1) + ".0", n("tilde return", s), s;
			});
		}
		function Pe(e, t) {
			return e.trim().split(/\s+/).map(function(e) {
				return Fe(e, t);
			}).join(" ");
		}
		function Fe(e, t) {
			n("caret", e, t);
			var r = t ? o[w] : o[ge];
			return e.replace(r, function(t, r, i, a, o) {
				n("caret", e, t, r, i, a, o);
				var s;
				return K(r) ? s = "" : K(i) ? s = ">=" + r + ".0.0 <" + (+r + 1) + ".0.0" : K(a) ? s = r === "0" ? ">=" + r + "." + i + ".0 <" + r + "." + (+i + 1) + ".0" : ">=" + r + "." + i + ".0 <" + (+r + 1) + ".0.0" : o ? (n("replaceCaret pr", o), o.charAt(0) !== "-" && (o = "-" + o), s = r === "0" ? i === "0" ? ">=" + r + "." + i + "." + a + o + " <" + r + "." + i + "." + (+a + 1) : ">=" + r + "." + i + "." + a + o + " <" + r + "." + (+i + 1) + ".0" : ">=" + r + "." + i + "." + a + o + " <" + (+r + 1) + ".0.0") : (n("no pr"), s = r === "0" ? i === "0" ? ">=" + r + "." + i + "." + a + " <" + r + "." + i + "." + (+a + 1) : ">=" + r + "." + i + "." + a + " <" + r + "." + (+i + 1) + ".0" : ">=" + r + "." + i + "." + a + " <" + (+r + 1) + ".0.0"), n("caret return", s), s;
			});
		}
		function Ie(e, t) {
			return n("replaceXRanges", e, t), e.split(/\s+/).map(function(e) {
				return Le(e, t);
			}).join(" ");
		}
		function Le(e, t) {
			e = e.trim();
			var r = t ? o[ce] : o[se];
			return e.replace(r, function(t, r, i, a, o, s) {
				n("xRange", e, t, r, i, a, o, s);
				var c = K(i), l = c || K(a), u = l || K(o), d = u;
				return r === "=" && d && (r = ""), c ? t = r === ">" || r === "<" ? "<0.0.0" : "*" : r && d ? (l && (a = 0), u && (o = 0), r === ">" ? (r = ">=", l ? (i = +i + 1, a = 0, o = 0) : u && (a = +a + 1, o = 0)) : r === "<=" && (r = "<", l ? i = +i + 1 : a = +a + 1), t = r + i + "." + a + "." + o) : l ? t = ">=" + i + ".0.0 <" + (+i + 1) + ".0.0" : u && (t = ">=" + i + "." + a + ".0 <" + i + "." + (+a + 1) + ".0"), n("xRange return", t), t;
			});
		}
		function Re(e, t) {
			return n("replaceStars", e, t), e.trim().replace(o[ye], "");
		}
		function ze(e, t, n, r, i, a, o, s, c, l, u, d, f) {
			return t = K(n) ? "" : K(r) ? ">=" + n + ".0.0" : K(i) ? ">=" + n + "." + r + ".0" : ">=" + t, s = K(c) ? "" : K(l) ? "<" + (+c + 1) + ".0.0" : K(u) ? "<" + c + "." + (+l + 1) + ".0" : d ? "<=" + c + "." + l + "." + u + "-" + d : "<=" + s, (t + " " + s).trim();
		}
		W.prototype.test = function(e) {
			if (!e) return !1;
			typeof e == "string" && (e = new j(e, this.loose));
			for (var t = 0; t < this.set.length; t++) if (Be(this.set[t], e)) return !0;
			return !1;
		};
		function Be(e, t) {
			for (var r = 0; r < e.length; r++) if (!e[r].test(t)) return !1;
			if (t.prerelease.length) {
				for (var r = 0; r < e.length; r++) if (n(e[r].semver), e[r].semver !== U && e[r].semver.prerelease.length > 0) {
					var i = e[r].semver;
					if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
				}
				return !1;
			}
			return !0;
		}
		t.satisfies = J;
		function J(e, t, n) {
			try {
				t = new W(t, n);
			} catch {
				return !1;
			}
			return t.test(e);
		}
		t.maxSatisfying = Ve;
		function Ve(e, t, n) {
			var r = null, i = null;
			try {
				var a = new W(t, n);
			} catch {
				return null;
			}
			return e.forEach(function(e) {
				a.test(e) && (!r || i.compare(e) === -1) && (r = e, i = new j(r, n));
			}), r;
		}
		t.minSatisfying = He;
		function He(e, t, n) {
			var r = null, i = null;
			try {
				var a = new W(t, n);
			} catch {
				return null;
			}
			return e.forEach(function(e) {
				a.test(e) && (!r || i.compare(e) === 1) && (r = e, i = new j(r, n));
			}), r;
		}
		t.validRange = Ue;
		function Ue(e, t) {
			try {
				return new W(e, t).range || "*";
			} catch {
				return null;
			}
		}
		t.ltr = We;
		function We(e, t, n) {
			return Ke(e, t, "<", n);
		}
		t.gtr = Ge;
		function Ge(e, t, n) {
			return Ke(e, t, ">", n);
		}
		t.outside = Ke;
		function Ke(e, t, n, r) {
			e = new j(e, r), t = new W(t, r);
			var i, a, o, s, c;
			switch (n) {
				case ">":
					i = R, a = je, o = ke, s = ">", c = ">=";
					break;
				case "<":
					i = ke, a = B, o = R, s = "<", c = "<=";
					break;
				default: throw TypeError("Must provide a hilo val of \"<\" or \">\"");
			}
			if (J(e, t, r)) return !1;
			for (var l = 0; l < t.set.length; ++l) {
				var u = t.set[l], d = null, f = null;
				if (u.forEach(function(e) {
					e.semver === U && (e = new H(">=0.0.0")), d ||= e, f ||= e, i(e.semver, d.semver, r) ? d = e : o(e.semver, f.semver, r) && (f = e);
				}), d.operator === s || d.operator === c || (!f.operator || f.operator === s) && a(e, f.semver) || f.operator === c && o(e, f.semver)) return !1;
			}
			return !0;
		}
		t.prerelease = qe;
		function qe(e, t) {
			var n = A(e, t);
			return n && n.prerelease.length ? n.prerelease : null;
		}
		t.intersects = Je;
		function Je(e, t, n) {
			return e = new W(e, n), t = new W(t, n), e.intersects(t);
		}
		t.coerce = Ye;
		function Ye(e) {
			if (e instanceof j) return e;
			if (typeof e != "string") return null;
			var t = e.match(o[S]);
			return t == null ? null : A((t[1] || "0") + "." + (t[2] || "0") + "." + (t[3] || "0"));
		}
	})(On, On.exports), On.exports);
}
var jn, Mn = e((() => {
	kn();
})), Nn, Pn = e((() => {
	Mn(), Nn = An();
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensions/common/extensionValidator.js
function Fn(e) {
	return e = e.trim(), e === "*" || Wn.test(e);
}
function In(e) {
	if (!Fn(e)) return null;
	if (e = e.trim(), e === "*") return {
		hasCaret: !1,
		hasGreaterEquals: !1,
		majorBase: 0,
		majorMustEqual: !1,
		minorBase: 0,
		minorMustEqual: !1,
		patchBase: 0,
		patchMustEqual: !1,
		preRelease: null
	};
	let t = e.match(Wn);
	return t ? {
		hasCaret: t[1] === "^",
		hasGreaterEquals: t[1] === ">=",
		majorBase: t[2] === "x" ? 0 : parseInt(t[2], 10),
		majorMustEqual: t[2] !== "x",
		minorBase: t[4] === "x" ? 0 : parseInt(t[4], 10),
		minorMustEqual: t[4] !== "x",
		patchBase: t[6] === "x" ? 0 : parseInt(t[6], 10),
		patchMustEqual: t[6] !== "x",
		preRelease: t[8] || null
	} : null;
}
function Ln(e) {
	if (!e) return null;
	let t = e.majorBase, n = e.majorMustEqual, r = e.minorBase, i = e.minorMustEqual, a = e.patchBase, o = e.patchMustEqual;
	e.hasCaret && (t === 0 || (i = !1), o = !1);
	let s = 0;
	if (e.preRelease) {
		let t = Gn.exec(e.preRelease);
		if (t) {
			let [, e, n, r] = t;
			s = Date.UTC(Number(e), Number(n) - 1, Number(r));
		}
	}
	return {
		majorBase: t,
		majorMustEqual: n,
		minorBase: r,
		minorMustEqual: i,
		patchBase: a,
		patchMustEqual: o,
		isMinimum: e.hasGreaterEquals,
		notBefore: s
	};
}
function Rn(e, t, n) {
	let r;
	r = typeof e == "string" ? Ln(In(e)) : e;
	let i;
	t instanceof Date ? i = t.getTime() : typeof t == "string" && (i = new Date(t).getTime());
	let a;
	if (a = typeof n == "string" ? Ln(In(n)) : n, !r || !a) return !1;
	let o = r.majorBase, s = r.minorBase, c = r.patchBase, l = a.majorBase, u = a.minorBase, d = a.patchBase, f = a.notBefore, p = a.majorMustEqual, m = a.minorMustEqual, h = a.patchMustEqual;
	return a.isMinimum ? o > l ? !0 : o < l ? !1 : s > u ? !0 : s < u || i && i < f ? !1 : c >= d : (o === 1 && l === 0 && (!p || !m || !h) && (l = 1, u = 0, d = 0, p = !0, m = !1, h = !1), o < l ? !1 : o > l ? !p : s < u ? !1 : s > u ? !m : c < d ? !1 : c > d ? !h : !(i && i < f));
}
function zn(e, t, n, r, i, a) {
	let o = [];
	if (r.publisher !== void 0 && typeof r.publisher != "string") return o.push([s.Error, d(1885, "property publisher must be of type `string`.")]), o;
	if (typeof r.name != "string") return o.push([s.Error, d(1886, "property `{0}` is mandatory and must be of type `string`", "name")]), o;
	if (typeof r.version != "string") return o.push([s.Error, d(1887, "property `{0}` is mandatory and must be of type `string`", "version")]), o;
	if (!r.engines) return o.push([s.Error, d(1888, "property `{0}` is mandatory and must be of type `object`", "engines")]), o;
	if (typeof r.engines.vscode != "string") return o.push([s.Error, d(1889, "property `{0}` is mandatory and must be of type `string`", "engines.vscode")]), o;
	if (r.extensionDependencies !== void 0 && !Un(r.extensionDependencies)) return o.push([s.Error, d(1890, "property `{0}` can be omitted or must be of type `string[]`", "extensionDependencies")]), o;
	if (r.activationEvents !== void 0) {
		if (!Un(r.activationEvents)) return o.push([s.Error, d(1891, "property `{0}` can be omitted or must be of type `string[]`", "activationEvents")]), o;
		if (r.main === void 0 && r.browser === void 0) return o.push([s.Error, d(1892, "property `{0}` should be omitted if the extension doesn't have a `{1}` or `{2}` property.", "activationEvents", "main", "browser")]), o;
	}
	if (r.extensionKind !== void 0 && r.main === void 0 && o.push([s.Warning, d(1893, "property `{0}` can be defined only if property `main` is also defined.", "extensionKind")]), r.main !== void 0) {
		if (typeof r.main != "string") return o.push([s.Error, d(1894, "property `{0}` can be omitted or must be of type `string`", "main")]), o;
		{
			let e = z(n, r.main);
			De(e, n) || o.push([s.Warning, d(1895, "Expected `main` ({0}) to be included inside extension's folder ({1}). This might make the extension non-portable.", e.path, n.path)]);
		}
	}
	if (r.browser !== void 0) {
		if (typeof r.browser != "string") return o.push([s.Error, d(1896, "property `{0}` can be omitted or must be of type `string`", "browser")]), o;
		{
			let e = z(n, r.browser);
			De(e, n) || o.push([s.Warning, d(1897, "Expected `browser` ({0}) to be included inside extension's folder ({1}). This might make the extension non-portable.", e.path, n.path)]);
		}
	}
	if (!Nn.valid(r.version)) return o.push([s.Error, d(1898, "Extension version is not semver compatible.")]), o;
	let c = [];
	if (!Bn(e, t, r, i, c)) for (let e of c) o.push([s.Error, e]);
	if (a && r.enabledApiProposals?.length) {
		let e = [];
		if (!Vn([...r.enabledApiProposals], e)) for (let t of e) o.push([s.Error, t]);
	}
	return o;
}
function Bn(e, t, n, r, i) {
	return r || n.main === void 0 && n.browser === void 0 ? !0 : Hn(e, t, n.engines.vscode, i);
}
function Vn(e, t) {
	if (e.length === 0) return !0;
	let n = Array.isArray(t) ? t : void 0, r = (Array.isArray(t) ? void 0 : t) ?? ct, i = [], a = lt(e);
	for (let { proposalName: e, version: t } of a) t && r[e]?.version !== t && i.push(e);
	return i.length ? (n && (i.length === 1 ? n.push(d(1899, "This extension is using the API proposal '{0}' that is not compatible with the current version of VS Code.", i[0])) : n.push(d(1900, "This extension is using the API proposals {0} and '{1}' that are not compatible with the current version of VS Code.", i.slice(0, i.length - 1).map((e) => `'${e}'`).join(", "), i[i.length - 1]))), !1) : !0;
}
function Hn(e, t, n, r = []) {
	let i = Ln(In(n));
	if (!i) return r.push(d(1901, "Could not parse `engines.vscode` value {0}. Please use, for example: ^1.22.0, ^1.22.x, etc.", n)), !1;
	if (i.majorBase === 0) {
		if (!i.majorMustEqual || !i.minorMustEqual) return r.push(d(1902, "Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions before 1.0.0, please define at a minimum the major and minor desired version. E.g. ^0.10.0, 0.10.x, 0.11.0, etc.", n)), !1;
	} else if (!i.majorMustEqual) return r.push(d(1903, "Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions after 1.0.0, please define at a minimum the major desired version. E.g. ^1.10.0, 1.10.x, 1.x.x, 2.x.x, etc.", n)), !1;
	return Rn(e, t, i) ? !0 : (r.push(d(1904, "Extension is not compatible with Code {0}. Extension requires: {1}.", e, n)), !1);
}
function Un(e) {
	if (!Array.isArray(e)) return !1;
	for (let t = 0, n = e.length; t < n; t++) if (typeof e[t] != "string") return !1;
	return !0;
}
var Wn, Gn, Kn = e((() => {
	y(), fe(), S(), Pn(), ut(), We(), Wn = /^(\^|>=)?((\d+)|x)\.((\d+)|x)\.((\d+)|x)(\-.*)?$/, Gn = /^-(\d{4})(\d{2})(\d{2})$/;
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensionManagement/common/extensionsProfileScannerService.js
function qn(e) {
	let t = e;
	return n(t) && Le(t.identifier) && (Jn(t.location) || O(t.location) && !!t.location) && (Ee(t.relativeLocation) || O(t.relativeLocation)) && !!t.version && O(t.version);
}
function Jn(e) {
	if (!e) return !1;
	let t = e;
	return typeof t?.path == "string" && typeof t?.scheme == "string";
}
var Yn, Xn, Zn, Qn = e((() => {
	r(), i(), pe(), ce(), Ae(), le(), G(), Ge(), Qt(), k(), be(), C(), gt(), te(), _(), D(), (function(e) {
		e.ERROR_PROFILE_NOT_FOUND = "ERROR_PROFILE_NOT_FOUND", e.ERROR_INVALID_CONTENT = "ERROR_INVALID_CONTENT";
	})(Yn ||= {}), Xn = class extends Error {
		constructor(e, t) {
			super(e), this.code = t;
		}
	}, Zn = class extends we {
		constructor(e, t, n, r, i) {
			super(), this.extensionsLocation = e, this.fileService = t, this.userDataProfilesService = n, this.uriIdentityService = r, this.logService = i, this._onAddExtensions = this._register(new B()), this.onAddExtensions = this._onAddExtensions.event, this._onDidAddExtensions = this._register(new B()), this.onDidAddExtensions = this._onDidAddExtensions.event, this._onRemoveExtensions = this._register(new B()), this.onRemoveExtensions = this._onRemoveExtensions.event, this._onDidRemoveExtensions = this._register(new B()), this.onDidRemoveExtensions = this._onDidRemoveExtensions.event, this.resourcesAccessQueueMap = new b();
		}
		scanProfileExtensions(e, t) {
			return this.withProfileExtensions(e, void 0, t);
		}
		async addExtensionsToProfile(e, t, n) {
			let r = [], i = [];
			try {
				return await this.withProfileExtensions(t, (a) => {
					let o = [];
					if (n) o.push(...a);
					else for (let t of a) e.some(([e]) => X(e.identifier, t.identifier) && e.manifest.version !== t.version) ? r.push(t) : o.push(t);
					for (let [t, n] of e) {
						let e = o.findIndex((e) => X(e.identifier, t.identifier) && e.version === t.manifest.version), r = {
							identifier: t.identifier,
							version: t.manifest.version,
							location: t.location,
							metadata: n
						};
						e === -1 ? (i.push(r), o.push(r)) : o.splice(e, 1, r);
					}
					return i.length && this._onAddExtensions.fire({
						extensions: i,
						profileLocation: t
					}), r.length && this._onRemoveExtensions.fire({
						extensions: r,
						profileLocation: t
					}), o;
				}), i.length && this._onDidAddExtensions.fire({
					extensions: i,
					profileLocation: t
				}), r.length && this._onDidRemoveExtensions.fire({
					extensions: r,
					profileLocation: t
				}), i;
			} catch (e) {
				throw i.length && this._onDidAddExtensions.fire({
					extensions: i,
					error: e,
					profileLocation: t
				}), r.length && this._onDidRemoveExtensions.fire({
					extensions: r,
					error: e,
					profileLocation: t
				}), e;
			}
		}
		async updateMetadata(e, t) {
			let n = [];
			return await this.withProfileExtensions(t, (t) => {
				let r = [];
				for (let i of t) {
					let t = e.find(([e]) => X({ id: e.identifier.id }, { id: i.identifier.id }) && e.manifest.version === i.version);
					t ? (i.metadata = {
						...i.metadata,
						...t[1]
					}, n.push(i), r.push(i)) : r.push(i);
				}
				return r;
			}), n;
		}
		async removeExtensionsFromProfile(e, t) {
			let n = [];
			try {
				await this.withProfileExtensions(t, (r) => {
					let i = [];
					for (let t of r) e.some((e) => X(t.identifier, e)) ? n.push(t) : i.push(t);
					return n.length && this._onRemoveExtensions.fire({
						extensions: n,
						profileLocation: t
					}), i;
				}), n.length && this._onDidRemoveExtensions.fire({
					extensions: n,
					profileLocation: t
				});
			} catch (e) {
				throw n.length && this._onDidRemoveExtensions.fire({
					extensions: n,
					error: e,
					profileLocation: t
				}), e;
			}
		}
		async withProfileExtensions(e, t, n) {
			return this.getResourceAccessQueue(e).queue(async () => {
				let r = [], i;
				try {
					let t = await this.fileService.readFile(e);
					i = JSON.parse(t.value.toString().trim() || "[]");
				} catch (t) {
					if (L(t) !== M.FILE_NOT_FOUND) throw t;
					if (this.uriIdentityService.extUri.isEqual(e, this.userDataProfilesService.defaultProfile.extensionsResource) && (i = await this.migrateFromOldDefaultProfileExtensionsLocation()), !i && n?.bailOutWhenFileNotFound) throw new Xn(E(t), Yn.ERROR_PROFILE_NOT_FOUND);
				}
				if (i) {
					Array.isArray(i) || this.throwInvalidConentError(e);
					let t = !1;
					for (let n of i) {
						qn(n) || this.throwInvalidConentError(e);
						let i;
						if (O(n.relativeLocation) && n.relativeLocation) i = this.resolveExtensionLocation(n.relativeLocation);
						else if (O(n.location)) {
							this.logService.warn(`Extensions profile: Ignoring extension with invalid location: ${n.location}`);
							continue;
						} else {
							i = V.revive(n.location);
							let e = this.toRelativePath(i);
							e && (t = !0, n.relativeLocation = e);
						}
						Ee(n.metadata?.hasPreReleaseVersion) && n.metadata?.preRelease && (t = !0, n.metadata.hasPreReleaseVersion = !0);
						let a = n.metadata?.id ?? n.identifier.uuid;
						r.push({
							identifier: a ? {
								id: n.identifier.id,
								uuid: a
							} : { id: n.identifier.id },
							location: i,
							version: n.version,
							metadata: n.metadata
						});
					}
					t && await this.fileService.writeFile(e, m.fromString(JSON.stringify(i)));
				}
				if (t) {
					r = t(r);
					let n = r.map((e) => ({
						identifier: e.identifier,
						version: e.version,
						location: e.location.toJSON(),
						relativeLocation: this.toRelativePath(e.location),
						metadata: e.metadata
					}));
					await this.fileService.writeFile(e, m.fromString(JSON.stringify(n)));
				}
				return r;
			});
		}
		throwInvalidConentError(e) {
			throw new Xn(`Invalid extensions content in ${e.toString()}`, Yn.ERROR_INVALID_CONTENT);
		}
		toRelativePath(e) {
			return this.uriIdentityService.extUri.isEqual(this.uriIdentityService.extUri.dirname(e), this.extensionsLocation) ? this.uriIdentityService.extUri.basename(e) : void 0;
		}
		resolveExtensionLocation(e) {
			return this.uriIdentityService.extUri.joinPath(this.extensionsLocation, e);
		}
		async migrateFromOldDefaultProfileExtensionsLocation() {
			return this._migrationPromise ||= (async () => {
				let e = this.uriIdentityService.extUri.joinPath(this.userDataProfilesService.defaultProfile.location, "extensions.json"), t = this.uriIdentityService.extUri.joinPath(this.extensionsLocation, ".init-default-profile-extensions"), n;
				try {
					n = (await this.fileService.readFile(e)).value.toString();
				} catch (e) {
					if (L(e) === M.FILE_NOT_FOUND) return;
					throw e;
				}
				this.logService.info("Migrating extensions from old default profile location", e.toString());
				let r;
				try {
					let e = JSON.parse(n);
					Array.isArray(e) && e.every((e) => qn(e)) ? r = e : this.logService.warn("Skipping migrating from old default profile locaiton: Found invalid data", e);
				} catch (e) {
					this.logService.error(e);
				}
				if (r) try {
					await this.fileService.createFile(this.userDataProfilesService.defaultProfile.extensionsResource, m.fromString(JSON.stringify(r)), { overwrite: !1 }), this.logService.info("Migrated extensions from old default profile location to new location", e.toString(), this.userDataProfilesService.defaultProfile.extensionsResource.toString());
				} catch (t) {
					if (L(t) === M.FILE_MODIFIED_SINCE) this.logService.info("Migration from old default profile location to new location is done by another window", e.toString(), this.userDataProfilesService.defaultProfile.extensionsResource.toString());
					else throw t;
				}
				try {
					await this.fileService.del(e);
				} catch (e) {
					L(e) !== M.FILE_NOT_FOUND && this.logService.error(e);
				}
				try {
					await this.fileService.del(t);
				} catch (e) {
					L(e) !== M.FILE_NOT_FOUND && this.logService.error(e);
				}
				return r;
			})(), this._migrationPromise;
		}
		getResourceAccessQueue(e) {
			let t = this.resourcesAccessQueueMap.get(e);
			return t || (t = new Te(), this.resourcesAccessQueueMap.set(e, t)), t;
		}
	}, Zn = v([
		N(1, xe),
		N(2, ht),
		N(3, R),
		N(4, g)
	], Zn);
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensionManagement/common/extensionNls.js
function $n(e, t, n, r) {
	try {
		er(e, t, n, r);
	} catch (t) {
		e.error(t?.message ?? t);
	}
	return t;
}
function er(e, t, r, i) {
	let a = (o, s, c) => {
		let l = o[s];
		if (O(l)) {
			let n = l, a = n.length;
			if (a > 1 && n[0] === "%" && n[a - 1] === "%") {
				let l = n.substr(1, a - 2), u = r[l];
				u === void 0 && i && (u = i[l]);
				let f = typeof u == "string" ? u : u?.message, p = i?.[l], m = typeof p == "string" ? p : p?.message;
				if (!f) {
					m || e.warn(`[${t.name}]: ${d(1879, "Couldn't find message for key {0}.", l)}`);
					return;
				}
				c && (s === "title" || s === "category") && m && m !== f ? o[s] = {
					value: f,
					original: m
				} : o[s] = f;
			}
		} else if (n(l)) for (let e in l) l.hasOwnProperty(e) && (e === "commands" ? a(l, e, !0) : a(l, e, c));
		else if (Array.isArray(l)) for (let e = 0; e < l.length; e++) a(l, e, c);
	};
	for (let e in t) t.hasOwnProperty(e) && a(t, e);
}
var tr = e((() => {
	_(), S();
})), nr, rr, ir, ar, or, sr, cr = e((() => {
	r(), oe(), i(), ie(), pe(), D(), K(), yt(), ce(), Oe(), U(), j(), y(), Pn(), fe(), G(), S(), l(), Qt(), ut(), Kn(), k(), be(), o(), C(), ze(), Ae(), P(), Qn(), St(), gt(), te(), tr(), Re(), (function(e) {
		function t(e, t) {
			if (e === t) return !0;
			let n = Object.keys(e), r = /* @__PURE__ */ new Set();
			for (let e of Object.keys(t)) r.add(e);
			if (n.length !== r.size) return !1;
			for (let i of n) {
				if (e[i] !== t[i]) return !1;
				r.delete(i);
			}
			return r.size === 0;
		}
		e.equals = t;
	})(nr ||= {}), rr = class extends we {
		constructor(e, t, n, r, i, a, o, s, c, l, u, d, f) {
			super(), this.systemExtensionsLocation = e, this.userExtensionsLocation = t, this.extensionsControlLocation = n, this.userDataProfilesService = i, this.extensionsProfileScannerService = a, this.extensionResourceLoaderService = o, this.fileService = s, this.logService = c, this.environmentService = l, this.productService = u, this.uriIdentityService = d, this.instantiationService = f, this._onDidChangeCache = this._register(new B()), this.onDidChangeCache = this._onDidChangeCache.event, this.initializeDefaultProfileExtensionsPromise = void 0, this.systemExtensionsCachedScanner = this._register(this.instantiationService.createInstance(sr, r)), this.userExtensionsCachedScanner = this._register(this.instantiationService.createInstance(sr, r)), this.extensionsScanner = this._register(this.instantiationService.createInstance(or)), this._register(this.systemExtensionsCachedScanner.onDidChangeCache(() => this._onDidChangeCache.fire(Y.System))), this._register(this.userExtensionsCachedScanner.onDidChangeCache(() => this._onDidChangeCache.fire(Y.User)));
		}
		getTargetPlatform() {
			return this._targetPlatformPromise ||= Jt(this.fileService, this.logService), this._targetPlatformPromise;
		}
		async scanAllExtensions(e, t) {
			let [n, r] = await Promise.all([this.scanSystemExtensions(e), this.scanUserExtensions(t)]);
			return this.dedupExtensions(n, r, [], await this.getTargetPlatform(), !0);
		}
		async scanSystemExtensions(e) {
			let t = [];
			t.push(this.scanDefaultSystemExtensions(e.language)), t.push(this.scanDevSystemExtensions(e.language, !!e.checkControlFile));
			let [n, r] = await Promise.all(t);
			return this.applyScanOptions([...n, ...r], Y.System, { pickLatest: !1 });
		}
		async scanUserExtensions(e) {
			this.logService.trace("Started scanning user extensions", e.profileLocation);
			let t = this.uriIdentityService.extUri.isEqual(e.profileLocation, this.userDataProfilesService.defaultProfile.extensionsResource) ? { bailOutWhenFileNotFound: !0 } : void 0, n = await this.createExtensionScannerInput(e.profileLocation, !0, Y.User, e.language, !0, t, e.productVersion ?? this.getProductVersion()), r = e.useCache && !n.devMode ? this.userExtensionsCachedScanner : this.extensionsScanner, i;
			try {
				i = await r.scanExtensions(n);
			} catch (e) {
				if (e instanceof Xn && e.code === Yn.ERROR_PROFILE_NOT_FOUND) await this.doInitializeDefaultProfileExtensions(), i = await r.scanExtensions(n);
				else throw e;
			}
			return i = await this.applyScanOptions(i, Y.User, {
				includeInvalid: e.includeInvalid,
				pickLatest: !0
			}), this.logService.trace("Scanned user extensions:", i.length), i;
		}
		async scanAllUserExtensions(e = {
			includeInvalid: !0,
			includeAllVersions: !0
		}) {
			let t = await this.createExtensionScannerInput(this.userExtensionsLocation, !1, Y.User, void 0, !0, void 0, this.getProductVersion()), n = await this.extensionsScanner.scanExtensions(t);
			return this.applyScanOptions(n, Y.User, {
				includeAllVersions: e.includeAllVersions,
				includeInvalid: e.includeInvalid
			});
		}
		async scanExtensionsUnderDevelopment(e, t) {
			if (this.environmentService.isExtensionDevelopment && this.environmentService.extensionDevelopmentLocationURI) {
				let n = (await Promise.all(this.environmentService.extensionDevelopmentLocationURI.filter((e) => e.scheme === A.file).map(async (n) => {
					let r = await this.createExtensionScannerInput(n, !1, Y.User, t.language, !1, void 0, this.getProductVersion());
					return (await this.extensionsScanner.scanOneOrMultipleExtensions(r)).map((t) => (t.type = e.find((e) => X(e.identifier, t.identifier))?.type ?? t.type, this.extensionsScanner.validate(t, r)));
				}))).flat();
				return this.applyScanOptions(n, "development", {
					includeInvalid: t.includeInvalid,
					pickLatest: !0
				});
			}
			return [];
		}
		async scanExistingExtension(e, t, n) {
			let r = await this.createExtensionScannerInput(e, !1, t, n.language, !0, void 0, this.getProductVersion()), i = await this.extensionsScanner.scanExtension(r);
			return !i || !n.includeInvalid && !i.isValid ? null : i;
		}
		async scanOneOrMultipleExtensions(e, t, n) {
			let r = await this.createExtensionScannerInput(e, !1, t, n.language, !0, void 0, this.getProductVersion()), i = await this.extensionsScanner.scanOneOrMultipleExtensions(r);
			return this.applyScanOptions(i, t, {
				includeInvalid: n.includeInvalid,
				pickLatest: !0
			});
		}
		async scanMultipleExtensions(e, t, n) {
			let r = [];
			return await Promise.all(e.map(async (e) => {
				let i = await this.scanOneOrMultipleExtensions(e, t, n);
				r.push(...i);
			})), this.applyScanOptions(r, t, {
				includeInvalid: n.includeInvalid,
				pickLatest: !0
			});
		}
		async updateManifestMetadata(e, t) {
			let n = z(e, "package.json"), r = await this.extensionResourceLoaderService.readExtensionResource(n), i = JSON.parse(r);
			i.__metadata = {
				...i.__metadata,
				...t
			}, await this.fileService.writeFile(z(e, "package.json"), m.fromString(JSON.stringify(i, null, "	")));
		}
		async initializeDefaultProfileExtensions() {
			try {
				await this.extensionsProfileScannerService.scanProfileExtensions(this.userDataProfilesService.defaultProfile.extensionsResource, { bailOutWhenFileNotFound: !0 });
			} catch (e) {
				if (e instanceof Xn && e.code === Yn.ERROR_PROFILE_NOT_FOUND) await this.doInitializeDefaultProfileExtensions();
				else throw e;
			}
		}
		async doInitializeDefaultProfileExtensions() {
			return this.initializeDefaultProfileExtensionsPromise ||= (async () => {
				try {
					this.logService.info("Started initializing default profile extensions in extensions installation folder.", this.userExtensionsLocation.toString());
					let e = await this.scanAllUserExtensions({ includeInvalid: !0 });
					if (e.length) await this.extensionsProfileScannerService.addExtensionsToProfile(e.map((e) => [e, e.metadata]), this.userDataProfilesService.defaultProfile.extensionsResource);
					else try {
						await this.fileService.createFile(this.userDataProfilesService.defaultProfile.extensionsResource, m.fromString(JSON.stringify([])));
					} catch (e) {
						L(e) !== M.FILE_NOT_FOUND && this.logService.warn("Failed to create default profile extensions manifest in extensions installation folder.", this.userExtensionsLocation.toString(), E(e));
					}
					this.logService.info("Completed initializing default profile extensions in extensions installation folder.", this.userExtensionsLocation.toString());
				} catch (e) {
					this.logService.error(e);
				} finally {
					this.initializeDefaultProfileExtensionsPromise = void 0;
				}
			})(), this.initializeDefaultProfileExtensionsPromise;
		}
		async applyScanOptions(e, t, n = {}) {
			return n.includeAllVersions || (e = this.dedupExtensions(t === Y.System ? e : void 0, t === Y.User ? e : void 0, t === "development" ? e : void 0, await this.getTargetPlatform(), !!n.pickLatest)), n.includeInvalid || (e = e.filter((e) => e.isValid)), e.sort((e, t) => {
				let n = W(e.location.fsPath), r = W(t.location.fsPath);
				return n < r ? -1 : +(n > r);
			});
		}
		dedupExtensions(e, t, n, r, i) {
			let a = (e, t, n) => {
				if (!n) {
					if (e.metadata?.isApplicationScoped && !t.metadata?.isApplicationScoped) return !1;
					if (!e.metadata?.isApplicationScoped && t.metadata?.isApplicationScoped) return !0;
				}
				if (e.isValid && !t.isValid) return !1;
				if (e.isValid === t.isValid) {
					if (i && Nn.gt(e.manifest.version, t.manifest.version)) return this.logService.debug(`Skipping extension ${t.location.path} with lower version ${t.manifest.version} in favour of ${e.location.path} with version ${e.manifest.version}`), !1;
					if (Nn.eq(e.manifest.version, t.manifest.version)) {
						if (e.type === Y.System) return this.logService.debug(`Skipping extension ${t.location.path} in favour of system extension ${e.location.path} with same version`), !1;
						if (e.targetPlatform === r) return this.logService.debug(`Skipping extension ${t.location.path} from different target platform ${t.targetPlatform}`), !1;
					}
				}
				return n ? this.logService.warn(`Overwriting user extension ${e.location.path} with ${t.location.path}.`) : this.logService.debug(`Overwriting user extension ${e.location.path} with ${t.location.path}.`), !0;
			}, o = new tt();
			return e?.forEach((e) => {
				let t = o.get(e.identifier.id);
				(!t || a(t, e, !1)) && o.set(e.identifier.id, e);
			}), t?.forEach((t) => {
				let n = o.get(t.identifier.id);
				if (!n && e && t.type === Y.System) {
					this.logService.debug(`Skipping obsolete system extension ${t.location.path}.`);
					return;
				}
				(!n || a(n, t, !1)) && o.set(t.identifier.id, t);
			}), n?.forEach((e) => {
				let t = o.get(e.identifier.id);
				(!t || a(t, e, !0)) && o.set(e.identifier.id, e), o.set(e.identifier.id, e);
			}), [...o.values()];
		}
		async scanDefaultSystemExtensions(e) {
			this.logService.trace("Started scanning system extensions");
			let t = await this.createExtensionScannerInput(this.systemExtensionsLocation, !1, Y.System, e, !0, void 0, this.getProductVersion()), n = await (t.devMode ? this.extensionsScanner : this.systemExtensionsCachedScanner).scanExtensions(t);
			return this.logService.trace("Scanned system extensions:", n.length), n;
		}
		async scanDevSystemExtensions(e, t) {
			let n = this.environmentService.isBuilt ? [] : this.productService.builtInExtensions;
			if (!n?.length) return [];
			this.logService.trace("Started scanning dev system extensions");
			let r = t ? await this.getBuiltInExtensionControl() : {}, i = [], a = V.file(c(u(je.asFileUri("").fsPath, "..", ".build", "builtInExtensions")));
			for (let e of n) {
				let t = r[e.name] || "marketplace";
				switch (t) {
					case "disabled": break;
					case "marketplace":
						i.push(z(a, e.name));
						break;
					default:
						i.push(V.file(t));
						break;
				}
			}
			let o = await Promise.all(i.map(async (t) => this.extensionsScanner.scanExtension(await this.createExtensionScannerInput(t, !1, Y.System, e, !0, void 0, this.getProductVersion()))));
			return this.logService.trace("Scanned dev system extensions:", o.length), ge(o);
		}
		async getBuiltInExtensionControl() {
			try {
				let e = await this.fileService.readFile(this.extensionsControlLocation);
				return JSON.parse(e.value.toString());
			} catch {
				return {};
			}
		}
		async createExtensionScannerInput(e, t, n, r, i, a, o) {
			let s = await this.getTranslations(r ?? w), c = await this.getMtime(e), l = t && !this.uriIdentityService.extUri.isEqual(e, this.userDataProfilesService.defaultProfile.extensionsResource) ? this.userDataProfilesService.defaultProfile.extensionsResource : void 0, u = l ? await this.getMtime(l) : void 0;
			return new ir(e, c, l, u, t, a, n, i, o.version, o.date, this.productService.commit, !this.environmentService.isBuilt, r, s);
		}
		async getMtime(e) {
			try {
				let t = await this.fileService.stat(e);
				if (typeof t.mtime == "number") return t.mtime;
			} catch {}
		}
		getProductVersion() {
			return {
				version: this.productService.version,
				date: this.productService.date
			};
		}
	}, rr = v([
		N(4, ht),
		N(5, xt),
		N(6, nt),
		N(7, xe),
		N(8, g),
		N(9, f),
		N(10, Ie),
		N(11, R),
		N(12, re)
	], rr), ir = class {
		constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			this.location = e, this.mtime = t, this.applicationExtensionslocation = n, this.applicationExtensionslocationMtime = r, this.profile = i, this.profileScanOptions = a, this.type = o, this.validate = s, this.productVersion = c, this.productDate = l, this.productCommit = u, this.devMode = d, this.language = f, this.translations = p;
		}
		static createNlsConfiguration(e) {
			return {
				language: e.language,
				pseudo: e.language === "pseudo",
				devMode: e.devMode,
				translations: e.translations
			};
		}
		static equals(e, t) {
			return ye(e.location, t.location) && e.mtime === t.mtime && ye(e.applicationExtensionslocation, t.applicationExtensionslocation) && e.applicationExtensionslocationMtime === t.applicationExtensionslocationMtime && e.profile === t.profile && p(e.profileScanOptions, t.profileScanOptions) && e.type === t.type && e.validate === t.validate && e.productVersion === t.productVersion && e.productDate === t.productDate && e.productCommit === t.productCommit && e.devMode === t.devMode && e.language === t.language && nr.equals(e.translations, t.translations);
		}
	}, ar = class extends we {
		constructor(e, t, n) {
			super(), this.extensionResourceLoaderService = e, this.fileService = t, this.logService = n;
		}
		async getLocalizedMessages(e, t, n) {
			let r = z(e, "package.nls.json"), i = (t, n) => {
				n.forEach((n) => {
					this.logService.error(this.formatMessage(e, d(1880, "Failed to parse {0}: {1}.", t?.path, bt(n.error))));
				});
			}, a = (t) => {
				this.logService.error(this.formatMessage(e, d(1881, "Invalid format {0}: JSON object expected.", t?.path)));
			}, o = `${t.publisher}.${t.name}`, s = n.translations[o];
			if (s) try {
				let e = V.parse(s), t = await this.extensionResourceLoaderService.readExtensionResource(e), n = [], o = T(t, n);
				return n.length > 0 ? (i(e, n), {
					values: void 0,
					default: r
				}) : H(o) === "object" ? {
					values: o.contents ? o.contents.package : void 0,
					default: r
				} : (a(e), {
					values: void 0,
					default: r
				});
			} catch {
				return {
					values: void 0,
					default: r
				};
			}
			else {
				if (!await this.fileService.exists(r)) return;
				let t;
				try {
					t = await this.findMessageBundles(e, n);
				} catch {
					return;
				}
				if (!t.localized) return {
					values: void 0,
					default: t.original
				};
				try {
					let e = await this.extensionResourceLoaderService.readExtensionResource(t.localized), n = [], r = T(e, n);
					return n.length > 0 ? (i(t.localized, n), {
						values: void 0,
						default: t.original
					}) : H(r) === "object" ? {
						values: r,
						default: t.original
					} : (a(t.localized), {
						values: void 0,
						default: t.original
					});
				} catch {
					return {
						values: void 0,
						default: t.original
					};
				}
			}
		}
		async translateManifest(e, t, n) {
			let r = await this.getLocalizedMessages(e, t, n);
			if (r) try {
				let n = [], i = await this.resolveOriginalMessageBundle(r.default, n);
				if (n.length > 0) return n.forEach((t) => {
					this.logService.error(this.formatMessage(e, d(1880, "Failed to parse {0}: {1}.", r.default?.path, bt(t.error))));
				}), t;
				if (H(r) !== "object") return this.logService.error(this.formatMessage(e, d(1881, "Invalid format {0}: JSON object expected.", r.default?.path))), t;
				let a = r.values || Object.create(null);
				return $n(this.logService, t, a, i);
			} catch {}
			return t;
		}
		async resolveOriginalMessageBundle(e, t) {
			if (e) try {
				return T(await this.extensionResourceLoaderService.readExtensionResource(e), t);
			} catch {}
		}
		findMessageBundles(e, t) {
			return new Promise((n, r) => {
				let i = (t) => {
					let r = z(e, `package.nls.${t}.json`);
					this.fileService.exists(r).then((a) => {
						a && n({
							localized: r,
							original: z(e, "package.nls.json")
						});
						let o = t.lastIndexOf("-");
						o === -1 ? n({
							localized: z(e, "package.nls.json"),
							original: null
						}) : (t = t.substring(0, o), i(t));
					});
				};
				if (t.devMode || t.pseudo || !t.language) return n({
					localized: z(e, "package.nls.json"),
					original: null
				});
				i(t.language);
			});
		}
		formatMessage(e, t) {
			return `[${e.path}]: ${t}`;
		}
	}, ar = v([
		N(0, nt),
		N(1, xe),
		N(2, g)
	], ar), or = class extends ar {
		constructor(e, t, n, r, i, a, o) {
			super(n, r, o), this.extensionsProfileScannerService = e, this.uriIdentityService = t, this.environmentService = a, this.extensionsEnabledWithApiProposalVersion = i.extensionsEnabledWithApiProposalVersion?.map((e) => e.toLowerCase()) ?? [];
		}
		async scanExtensions(e) {
			return e.profile ? this.scanExtensionsFromProfile(e) : this.scanExtensionsFromLocation(e);
		}
		async scanExtensionsFromLocation(e) {
			let t = await this.fileService.resolve(e.location);
			return t.children?.length ? ge(await Promise.all(t.children.map(async (t) => {
				if (!t.isDirectory || e.type === Y.User && me(t.resource).indexOf(".") === 0) return null;
				let n = new ir(t.resource, e.mtime, e.applicationExtensionslocation, e.applicationExtensionslocationMtime, e.profile, e.profileScanOptions, e.type, e.validate, e.productVersion, e.productDate, e.productCommit, e.devMode, e.language, e.translations);
				return this.scanExtension(n);
			}))).sort((e, t) => e.location.path < t.location.path ? -1 : 1) : [];
		}
		async scanExtensionsFromProfile(e) {
			let t = await this.scanExtensionsFromProfileResource(e.location, () => !0, e);
			if (e.applicationExtensionslocation && !this.uriIdentityService.extUri.isEqual(e.location, e.applicationExtensionslocation)) {
				t = t.filter((e) => !e.metadata?.isApplicationScoped);
				let n = await this.scanExtensionsFromProfileResource(e.applicationExtensionslocation, (e) => !!e.metadata?.isBuiltin || !!e.metadata?.isApplicationScoped, e);
				t.push(...n);
			}
			return t;
		}
		async scanExtensionsFromProfileResource(e, t, n) {
			let r = await this.extensionsProfileScannerService.scanProfileExtensions(e, n.profileScanOptions);
			return r.length ? ge(await Promise.all(r.map(async (e) => {
				if (t(e)) {
					let t = new ir(e.location, n.mtime, n.applicationExtensionslocation, n.applicationExtensionslocationMtime, n.profile, n.profileScanOptions, n.type, n.validate, n.productVersion, n.productDate, n.productCommit, n.devMode, n.language, n.translations);
					return this.scanExtension(t, e);
				}
				return null;
			}))) : [];
		}
		async scanOneOrMultipleExtensions(e) {
			try {
				if (await this.fileService.exists(z(e.location, "package.json"))) {
					let t = await this.scanExtension(e);
					return t ? [t] : [];
				} else return await this.scanExtensions(e);
			} catch (t) {
				return this.logService.error(`Error scanning extensions at ${e.location.path}:`, E(t)), [];
			}
		}
		async scanExtension(e, t) {
			let n = [], r = !0, i;
			try {
				i = await this.scanExtensionManifest(e.location);
			} catch (a) {
				if (t) {
					n.push([s.Error, E(a)]), r = !1;
					let [e, o] = t.identifier.id.split(".");
					i = {
						name: o,
						publisher: e,
						version: t.version,
						engines: { vscode: "" }
					};
				} else return e.type !== Y.System && this.logService.error(a), null;
			}
			i.publisher ||= Ke;
			let a;
			t ? a = {
				...t.metadata,
				size: i.__metadata?.size
			} : i.__metadata && (a = {
				installedTimestamp: i.__metadata.installedTimestamp,
				size: i.__metadata.size,
				targetPlatform: i.__metadata.targetPlatform
			}), delete i.__metadata;
			let o = Kt(i.publisher, i.name), c = a?.id ? {
				id: o,
				uuid: a.id
			} : { id: o }, l = a?.isSystem ? Y.System : e.type, u = l === Y.System || !!a?.isBuiltin;
			try {
				i = await this.translateManifest(e.location, i, ir.createNlsConfiguration(e));
			} catch (e) {
				this.logService.warn("Failed to translate manifest", E(e));
			}
			let d = {
				type: l,
				identifier: c,
				manifest: i,
				location: e.location,
				isBuiltin: u,
				targetPlatform: a?.targetPlatform ?? Ye.UNDEFINED,
				publisherDisplayName: a?.publisherDisplayName,
				metadata: a,
				isValid: r,
				validations: n,
				preRelease: !!a?.preRelease
			};
			return e.validate && (d = this.validate(d, e)), i.enabledApiProposals && (!this.environmentService.isBuilt || this.extensionsEnabledWithApiProposalVersion.includes(o.toLowerCase())) && (i.originalEnabledApiProposals = i.enabledApiProposals, i.enabledApiProposals = He([...i.enabledApiProposals])), d;
		}
		validate(e, t) {
			let n = e.isValid, r = this.environmentService.isBuilt && this.extensionsEnabledWithApiProposalVersion.includes(e.identifier.id.toLowerCase()), i = zn(t.productVersion, t.productDate, t.location, e.manifest, e.isBuiltin, r);
			for (let [e, r] of i) e === s.Error && (n = !1, this.logService.error(this.formatMessage(t.location, r)));
			return e.isValid = n, e.validations = [...e.validations, ...i], e;
		}
		async scanExtensionManifest(e) {
			let t = z(e, "package.json"), n;
			try {
				n = await this.extensionResourceLoaderService.readExtensionResource(t);
			} catch (n) {
				throw L(n) !== M.FILE_NOT_FOUND && this.logService.error(this.formatMessage(e, d(1882, "Cannot read file {0}: {1}.", t.path, n.message))), n;
			}
			let r;
			try {
				r = JSON.parse(n);
			} catch (r) {
				let i = [];
				T(n, i);
				for (let n of i) this.logService.error(this.formatMessage(e, d(1883, "Failed to parse {0}: [{1}, {2}] {3}.", t.path, n.offset, n.length, bt(n.error))));
				throw r;
			}
			if (H(r) !== "object") {
				let n = this.formatMessage(e, d(1884, "Invalid manifest file {0}: Not a JSON object.", t.path));
				throw this.logService.error(n), Error(n);
			}
			return r;
		}
	}, or = v([
		N(0, xt),
		N(1, R),
		N(2, nt),
		N(3, xe),
		N(4, Ie),
		N(5, f),
		N(6, g)
	], or), sr = class extends or {
		constructor(e, t, n, r, i, a, o, s, c) {
			super(n, r, i, a, o, s, c), this.currentProfile = e, this.userDataProfilesService = t, this.cacheValidatorThrottler = this._register(new Me(3e3)), this._onDidChangeCache = this._register(new B()), this.onDidChangeCache = this._onDidChangeCache.event;
		}
		async scanExtensions(e) {
			let t = this.getCacheFile(e), n = await this.readExtensionCache(t);
			if (this.input = e, n && n.input && ir.equals(n.input, this.input)) return this.logService.debug("Using cached extensions scan result", e.type === Y.System ? "system" : "user", e.location.toString()), this.cacheValidatorThrottler.trigger(() => this.validateCache()), n.result.map((e) => (e.location = V.revive(e.location), e));
			let r = await super.scanExtensions(e);
			return await this.writeExtensionCache(t, {
				input: e,
				result: r
			}), r;
		}
		async readExtensionCache(e) {
			try {
				let t = await this.fileService.readFile(e), n = JSON.parse(t.value.toString());
				return {
					result: n.result,
					input: _e(n.input)
				};
			} catch (t) {
				L(t) !== M.FILE_NOT_FOUND && this.logService.debug("Error while reading the extension cache file:", e.path, E(t));
			}
			return null;
		}
		async writeExtensionCache(e, t) {
			try {
				await this.fileService.writeFile(e, m.fromString(JSON.stringify(t)));
			} catch (t) {
				this.logService.debug("Error while writing the extension cache file:", e.path, E(t));
			}
		}
		async validateCache() {
			if (!this.input) return;
			let e = this.getCacheFile(this.input), t = await this.readExtensionCache(e);
			if (!t) return;
			let n = t.result, r = JSON.parse(JSON.stringify(await super.scanExtensions(this.input)));
			if (!p(r, n)) try {
				this.logService.info("Invalidating Cache", n, r), await this.fileService.del(e), this._onDidChangeCache.fire();
			} catch (e) {
				this.logService.error(e);
			}
		}
		getCacheFile(e) {
			let t = this.getProfile(e);
			return this.uriIdentityService.extUri.joinPath(t.cacheHome, e.type === Y.System ? $e : at);
		}
		getProfile(e) {
			return e.type === Y.System || !e.profile ? this.userDataProfilesService.defaultProfile : this.uriIdentityService.extUri.isEqual(e.location, this.currentProfile.extensionsResource) ? this.currentProfile : this.userDataProfilesService.profiles.find((t) => this.uriIdentityService.extUri.isEqual(e.location, t.extensionsResource)) ?? this.currentProfile;
		}
	}, sr = v([
		N(1, ht),
		N(2, xt),
		N(3, R),
		N(4, nt),
		N(5, xe),
		N(6, Ie),
		N(7, f),
		N(8, g)
	], sr);
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/extensions.js
function lr(e) {
	hr = e;
}
function ur(e) {
	gr = e;
}
function dr(e, t, n, r) {
	let i = new he();
	i.add(je.registerStaticBrowserUri(z(e, t), V.parse(n)));
	let a = typeof r == "string" ? { mimeType: r } : r;
	return i.add(qe(new Xe(z(e, t), n, a))), i;
}
function fr() {
	return $;
}
function pr(e) {
	return vr.get(e);
}
function mr(e, t, { path: n = "/extension", system: r = !1, readmePath: i, changelogPath: a } = {}) {
	let o = Wt(e.publisher, e.name), s = V.from({
		scheme: it.extensionFile,
		authority: o,
		path: n
	}), c = J(), l = {
		manifest: e,
		type: r ? Y.System : Y.User,
		isBuiltin: !0,
		identifier: { id: o },
		location: s,
		targetPlatform: Ye.WEB,
		isValid: !0,
		validations: [],
		readmeUrl: i == null ? void 0 : V.joinPath(s, i),
		changelogUrl: a == null ? void 0 : V.joinPath(s, a),
		preRelease: !1
	};
	t != null && vr.set(o, t), !Ze && t !== Z.Remote ? $.push(l) : c = c.then(async () => {
		let r = F.get(re), i = F.get(Bt), a = F.get(Pe);
		if (i.isEnabled(l) && a.canAddExtension(rn(l, !1))) {
			let i = F.get(dt).remoteAuthority, a = s;
			t === Z.Remote && (a = V.from({
				scheme: A.vscodeRemote,
				authority: i,
				path: n
			}));
			let o = r.createInstance(ar), c = {
				devMode: !1,
				language: w,
				pseudo: w === "pseudo",
				translations: mn(w) ?? {}
			}, u = {
				...l,
				manifest: await o.translateManifest(a, e, c)
			};
			await _r({
				toAdd: [u],
				toRemove: []
			});
		}
	});
	let u = {
		id: o,
		async whenReady() {
			await c;
		},
		async isEnabled() {
			await J();
			let e = F.get(Bt);
			return await c, e.isEnabled(l);
		},
		async dispose() {
			await c, $.indexOf(l) >= 0 && $.splice($.indexOf(l), 1), vr.delete(o), await _r({
				toAdd: [],
				toRemove: [l]
			});
		}
	};
	if (t !== Z.Remote) {
		function e(e, t, n) {
			return dr(s, e, t, n);
		}
		u = {
			...u,
			registerFileUrl: e
		};
	}
	if (t === Z.LocalProcess) {
		async function e() {
			if (await c, hr == null) throw Error("The local api can't be used without registering the local extension host by importing `vscode/localExtensionHost`");
			return await hr(o);
		}
		u = {
			...u,
			getApi: e,
			async setAsDefaultApi() {
				gr?.(await e());
			}
		};
	}
	return u;
}
var hr, gr, _r, vr, $, yr, br = e((() => {
	ut(), Qe(), G(), Qt(), ce(), y(), Oe(), Dn(), ft(), K(), be(), o(), Ht(), ke(), cr(), j(), rt(), ot(), vt(), bn(), pn(), _r = _t(async ({ toAdd: e, toRemove: t }) => {
		await J(), await F.get(Pe).deltaExtensions(e, t);
	}, (e, t) => ({
		toAdd: [...e.toAdd, ...t.toAdd],
		toRemove: [...e.toRemove, ...t.toRemove]
	}), 0), vr = /* @__PURE__ */ new Map(), $ = [], yr = gn(), yr != null && mr(yr, Z.LocalWebWorker, { system: !0 });
}));
//#endregion
export { At as $, un as A, Wt as B, mn as C, ln as D, dn as E, en as F, Rt as G, Ut as H, an as I, zt as J, Vt as K, nn as L, fn as M, tn as N, cn as O, pn as P, jt as Q, rn as R, Dn as S, bn as T, Qt as U, Kt as V, Yt as W, Nt as X, Ht as Y, Ft as Z, Z as _, mr as a, xt as at, xn as b, cr as c, Kn as d, Dt as et, Ln as f, Nn as g, Pn as h, ur as i, wt as it, on as j, sn as k, tr as l, zn as m, pr as n, It as nt, lr as o, St as ot, In as p, Bt as q, br as r, Tt as rt, ar as s, fr as t, Et as tt, $n as u, Q as v, hn as w, Sn as x, Cn as y, X as z };
