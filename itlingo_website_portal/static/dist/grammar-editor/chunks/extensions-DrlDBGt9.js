import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { $A as t, $j as n, $k as r, AO as i, Aj as a, Ay as o, BA as s, CM as c, Cj as l, DN as u, FA as d, FD as f, FO as p, Fd as m, GO as h, HE as ee, HO as te, HT as ne, Hb as g, IA as re, IO as ie, Ix as ae, Jj as oe, KA as _, Kv as se, MA as ce, Md as v, NO as y, Nd as le, Nj as ue, OE as de, ON as b, PA as x, PT as S, Pd as fe, QE as pe, Qk as C, Rk as me, Rx as w, VA as T, Vb as E, XE as D, Yk as he, ZD as O, _c as ge, as as _e, bS as ve, bo as k, cD as A, dD as j, dN as M, eD as ye, fE as N, gD as P, go as be, hD as F, hc as I, jj as L, jk as xe, kN as Se, ky as R, lM as z, mN as Ce, mS as we, n as B, nj as Te, os as V, px as H, qk as U, r as Ee, rp as De, ss as W, tD as G, tp as K, uD as q, uj as J, vS as Oe, vo as ke, xo as Y, yE as Ae, yo as je } from "./standaloneServices-DUdtGggg.js";
import { L as Me, R as Ne } from "./textfiles-GCUcfhe8.js";
import { a as Pe, o as Fe, r as Ie, t as Le } from "./tools-DMW4ALLH.js";
import { Cr as Re, D as ze, Gn as Be, Jn as Ve, Kn as He, Qn as Ue, Rn as We, Sr as Ge, Xn as Ke, Yn as qe, Zn as Je, _r as Ye, ar as Xe, b as Ze, br as Qe, c as $e, dr as et, fr as tt, gr as nt, hr as rt, i as it, ir as at, k as ot, mr as st, pr as X, qn as ct, rr as lt, s as ut, sr as dt, t as ft, ur as pt, yr as mt, zn as ht } from "./monaco-vscode-files-service-override-7u1fRyMX.js";
import { o as gt, r as _t } from "./extensionManagement.service-CKYvSe93.js";
import { n as vt, t as yt } from "./jsonErrorMessages-C1DjKtCD.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/telemetry/common/commonProperties.js
var bt = e((() => {
	xe(), h(), se();
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/telemetry/common/telemetryUtils.js
function xt(e, t) {
	return !t.isBuilt && !t.disableTelemetry || !(t.disableTelemetry || !e.enableTelemetry);
}
function St(e, t) {
	return t.extensionTestsLocationURI ? !0 : !(t.isBuilt || t.disableTelemetry || e.enableTelemetry && e.aiConfig?.ariaKey);
}
function Ct(e) {
	let t = e.getValue(ke), n = e.getValue(be);
	if (e.getValue("telemetry.enableTelemetry") === !1 || n === !1) return k.NONE;
	switch (t ?? je.ON) {
		case je.ON: return k.USAGE;
		case je.ERROR: return k.ERROR;
		case je.CRASH: return k.CRASH;
		case je.OFF: return k.NONE;
	}
}
function wt(e, t) {
	if (!e) return "none";
	let n = Ge(e), r = t?.remoteExtensionTips;
	if (r && Object.prototype.hasOwnProperty.call(r, n)) return n;
	let i = t?.virtualWorkspaceExtensionTips;
	return i && Object.prototype.hasOwnProperty.call(i, n) ? n : "other";
}
function Tt(e, t) {
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
function Et(e) {
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
function Dt(e, t) {
	return e ? we(e, (e) => {
		if (e instanceof Ot || Object.hasOwnProperty.call(e, "isTrustedTelemetryValue")) return e.value;
		if (typeof e == "string") {
			let n = e.replaceAll("%20", " ");
			n = Tt(n, t);
			for (let e of t) n = n.replace(e, "");
			return n = Et(n), n;
		}
	}) : {};
}
var Ot, kt, At, jt, Mt, Nt = e((() => {
	ve(), l(), C(), Re(), bt(), Y(), Ot = class {
		constructor(e) {
			this.value = e, this.isTrustedTelemetryValue = !0;
		}
	}, kt = class {
		constructor() {
			this.telemetryLevel = k.NONE, this.sessionId = "someValue.sessionId", this.machineId = "someValue.machineId", this.sqmId = "someValue.sqmId", this.devDeviceId = "someValue.devDeviceId", this.firstSessionDate = "someValue.firstSessionDate", this.sendErrorTelemetry = !1;
		}
		publicLog() {}
		publicLog2() {}
		publicLogError() {}
		publicLogError2() {}
		setExperimentProperty() {}
	}, new kt(), At = class {
		async publicLog(e, t, n) {}
		async publicLogError(e, t, n) {}
	}, jt = "telemetry", Mt = {
		id: jt,
		name: r(2082, "Telemetry")
	};
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensionManagement/common/extensionManagementUtil.js
function Z(e, t) {
	return e.uuid && t.uuid ? e.uuid === t.uuid : e.id === t.id || f(e.id, t.id) === 0;
}
function Pt(e) {
	let t = Ht.exec(e);
	return t && t[1] ? [It(t[1]), t[2]] : [It(e), void 0];
}
function Ft(e, t) {
	return `${e}.${t}`;
}
function It(e) {
	return e.toLowerCase();
}
function Lt(e, t) {
	return It(Ft(e ?? "undefined_publisher", t));
}
async function Rt(e, t) {
	if (!me) return !1;
	let n;
	try {
		n = (await e.readFile(F.file("/etc/os-release"))).value.toString();
	} catch {
		try {
			n = (await e.readFile(F.file("/usr/lib/os-release"))).value.toString();
		} catch (e) {
			t.debug("Error while getting the os-release file.", M(e));
		}
	}
	return !!n && (n.match(/^ID=([^\u001b\r\n]*)/m) || [])[1] === "alpine";
}
async function zt(e, t) {
	let n = lt(await Rt(e, t) ? "alpine" : he, te);
	return t.debug("ComputeTargetPlatform:", n), n;
}
function Bt(e, t) {
	return Vt(e, t) !== void 0;
}
function Vt(e, t) {
	return t.find(({ extensionOrPublisher: t }) => L(t) ? f(e.id.split(".")[0], t) === 0 : Z(e, t));
}
var Ht, Ut = e((() => {
	O(), at(), Ye(), xe(), P(), Ce(), h(), Nt(), l(), Ht = /^([^.]+\..+)@((prerelease)|(\d+\.\d+\.\d+(-.*)?))$/, new pt("pprice.better-merge");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/extensions/common/extensions.js
function Wt(e) {
	let t = new et();
	for (let n of e) t.set(n.identifier, n);
	return t;
}
function Gt(e, t) {
	return e.enabledApiProposals ? e.enabledApiProposals.includes(t) : !1;
}
function Kt(e, t) {
	if (!Gt(e, t)) throw Error(`Extension '${e.identifier.value}' CANNOT use API proposal: ${t}.\nIts package.json#enabledApiProposals-property declares: ${e.enabledApiProposals?.join(", ") ?? "[]"} but NOT ${t}.\n The missing proposal MUST be added and you must start in extension development mode or use the following command line switch: --enable-proposed-api ${e.identifier.value}`);
}
function qt(e) {
	return {
		type: e.isBuiltin ? X.System : X.User,
		isBuiltin: e.isBuiltin || e.isUserBuiltin,
		identifier: {
			id: Lt(e.publisher, e.name),
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
function Jt(e, t) {
	let n = Ft(e.manifest.publisher, e.manifest.name);
	return {
		id: n,
		identifier: new pt(n),
		isBuiltin: e.type === X.System,
		isUserBuiltin: e.type === X.User && e.isBuiltin,
		isUnderDevelopment: !!t,
		extensionLocation: e.location,
		uuid: e.identifier.uuid,
		targetPlatform: e.targetPlatform,
		publisherDisplayName: e.publisherDisplayName,
		preRelease: e.preRelease,
		...e.manifest
	};
}
var Yt, Xt, Zt, Qt, $t, en, tn, nn, rn = e((() => {
	_(), P(), Ut(), Ue(), Ye(), Yt = Object.freeze({
		identifier: new pt("nullExtensionDescription"),
		name: "Null Extension Description",
		version: "0.0.0",
		publisher: "vscode",
		engines: { vscode: "" },
		extensionLocation: F.parse("void:location"),
		isBuiltin: !1,
		targetPlatform: st.UNDEFINED,
		isUserBuiltin: !1,
		isUnderDevelopment: !1,
		preRelease: !1
	}), Xt = class {
		constructor(e) {
			this.dependency = e;
		}
	}, (function(e) {
		e[e.EagerAutoStart = 1] = "EagerAutoStart", e[e.EagerManualStart = 2] = "EagerManualStart", e[e.LazyAutoStart = 3] = "LazyAutoStart";
	})(Zt ||= {}), Qt = class {
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
				activationEvents: Je.createActivationEventsMap(this._allExtensions)
			};
		}
		set(e, t, n) {
			if (this._versionId > e) throw Error(`ExtensionHostExtensions: invalid versionId ${e} (current: ${this._versionId})`);
			let r = [], i = [], a = [], o = [], s = Wt(this._allExtensions), c = Wt(t), l = (e, t) => e.extensionLocation.toString() === t.extensionLocation.toString() || e.isBuiltin === t.isBuiltin || e.isUserBuiltin === t.isUserBuiltin || e.isUnderDevelopment === t.isUnderDevelopment;
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
			let u = new tt(this._myExtensions), d = new tt(n);
			for (let e of this._myExtensions) d.has(e) || a.push(e);
			for (let e of n) u.has(e) || o.push(e);
			let f = {
				versionId: e,
				toRemove: r,
				toAdd: i,
				addActivationEvents: Je.createActivationEventsMap(i),
				myToRemove: a,
				myToAdd: o
			};
			return this.delta(f), f;
		}
		delta(e) {
			if (this._versionId >= e.versionId) return null;
			let { toRemove: t, toAdd: n, myToRemove: r, myToAdd: i } = e, a = new tt(t), o = new tt(r);
			for (let e = 0; e < this._allExtensions.length; e++) a.has(this._allExtensions[e].identifier) && (this._allExtensions.splice(e, 1), e--);
			for (let e = 0; e < this._myExtensions.length; e++) o.has(this._myExtensions[e]) && (this._myExtensions.splice(e, 1), e--);
			for (let e of n) this._allExtensions.push(e);
			for (let e of i) this._myExtensions.push(e);
			return this._myActivationEvents = null, e;
		}
		containsExtension(e) {
			for (let t of this._myExtensions) if (pt.equals(t, e)) return !0;
			return !1;
		}
		containsActivationEvent(e) {
			return this._myActivationEvents ||= this._readMyActivationEvents(), this._myActivationEvents.has(e);
		}
		_readMyActivationEvents() {
			let e = /* @__PURE__ */ new Set();
			for (let t of this._allExtensions) {
				if (!this.containsExtension(t.identifier)) continue;
				let n = Je.readActivationEvents(t);
				for (let t of n) e.add(t);
			}
			return e;
		}
	}, $t = class {
		constructor(e, t, n, r) {
			this.codeLoadingTime = e, this.activateCallTime = t, this.activateResolvedTime = n, this.activationReason = r;
		}
	}, en = class {
		constructor(e, t) {
			this.description = e, this.value = t;
		}
	}, (function(e) {
		e[e.Normal = 0] = "Normal", e[e.Immediate = 1] = "Immediate";
	})(tn ||= {}), nn = class {
		constructor() {
			this.onDidRegisterExtensions = T.None, this.onDidChangeExtensionsStatus = T.None, this.onDidChangeExtensions = T.None, this.onWillActivateByEvent = T.None, this.onDidChangeResponsiveChange = T.None, this.onWillStop = T.None, this.extensions = [];
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
})), an, on, sn, cn, ln, un = e((() => {
	gt(), d(), an = re(_t), on = x("extensionManagementServerService"), sn = re(an), cn = x("extensionEnablementService"), ln = x("IWebExtensionsScannerService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/extensions/common/extensionHostKind.js
function dn(e) {
	if (e === null) return "None";
	switch (e) {
		case Q.LocalProcess: return "LocalProcess";
		case Q.LocalWebWorker: return "LocalWebWorker";
		case Q.Remote: return "Remote";
	}
}
function fn(e) {
	switch (e) {
		case $.None: return "None";
		case $.Local: return "Local";
		case $.Remote: return "Remote";
	}
}
function pn(e, t, n, r) {
	let i = mn(e, n), a = mn(t, n), o = /* @__PURE__ */ new Map(), s = (e) => {
		if (o.has(e.key)) return;
		let t = i.get(e.key) || null, n = a.get(e.key) || null, r = new gn(t, n);
		o.set(r.key, r);
	};
	i.forEach((e) => s(e)), a.forEach((e) => s(e));
	let c = /* @__PURE__ */ new Map();
	return o.forEach((e) => {
		let t = !!e.local, n = !!e.remote, i = !!(e.local && e.local.isUnderDevelopment), a = !!(e.remote && e.remote.isUnderDevelopment), o = $.None;
		i && !a ? o = $.Local : a && !i && (o = $.Remote), c.set(e.key, r(e.identifier, e.kind, t, n, o));
	}), c;
}
function mn(e, t) {
	let n = /* @__PURE__ */ new Map();
	return e.forEach((e) => {
		let r = new hn(e, t(e));
		n.set(r.key, r);
	}), n;
}
var Q, $, hn, gn, _n = e((() => {
	Ye(), (function(e) {
		e[e.LocalProcess = 1] = "LocalProcess", e[e.LocalWebWorker = 2] = "LocalWebWorker", e[e.Remote = 3] = "Remote";
	})(Q ||= {}), (function(e) {
		e[e.None = 0] = "None", e[e.Local = 1] = "Local", e[e.Remote = 2] = "Remote";
	})($ ||= {}), hn = class {
		constructor(e, t) {
			this.desc = e, this.kind = t;
		}
		get key() {
			return pt.toKey(this.desc.identifier);
		}
		get isUnderDevelopment() {
			return this.desc.isUnderDevelopment;
		}
	}, gn = class {
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
})), vn, yn = e((() => {
	vn = { exports: {} };
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/external/vscode-semver/semver.js
function bn() {
	return xn ? vn.exports : (xn = 1, (function(e, t) {
		t = e.exports = N;
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
		var ne = c++;
		s[ne] = "[0-9A-Za-z-]+";
		var g = c++;
		s[g] = "(?:\\+(" + s[ne] + "(?:\\." + s[ne] + ")*))";
		var re = c++, ie = "v?" + s[f] + s[ee] + "?" + s[g] + "?";
		s[re] = "^" + ie + "$";
		var ae = "[v=\\s]*" + s[p] + s[te] + "?" + s[g] + "?", oe = c++;
		s[oe] = "^" + ae + "$";
		var _ = c++;
		s[_] = "((?:<|>)?=?)";
		var se = c++;
		s[se] = s[u] + "|x|X|\\*";
		var ce = c++;
		s[ce] = s[l] + "|x|X|\\*";
		var v = c++;
		s[v] = "[v=\\s]*(" + s[ce] + ")(?:\\.(" + s[ce] + ")(?:\\.(" + s[ce] + ")(?:" + s[ee] + ")?" + s[g] + "?)?)?";
		var y = c++;
		s[y] = "[v=\\s]*(" + s[se] + ")(?:\\.(" + s[se] + ")(?:\\.(" + s[se] + ")(?:" + s[te] + ")?" + s[g] + "?)?)?";
		var le = c++;
		s[le] = "^" + s[_] + "\\s*" + s[v] + "$";
		var ue = c++;
		s[ue] = "^" + s[_] + "\\s*" + s[y] + "$";
		var de = c++;
		s[de] = "(?:^|[^\\d])(\\d{1," + a + "})(?:\\.(\\d{1," + a + "}))?(?:\\.(\\d{1," + a + "}))?(?:$|[^\\d])";
		var b = c++;
		s[b] = "(?:~>?)";
		var x = c++;
		s[x] = "(\\s*)" + s[b] + "\\s+", o[x] = new RegExp(s[x], "g");
		var S = "$1~", fe = c++;
		s[fe] = "^" + s[b] + s[v] + "$";
		var pe = c++;
		s[pe] = "^" + s[b] + s[y] + "$";
		var C = c++;
		s[C] = "(?:\\^)";
		var me = c++;
		s[me] = "(\\s*)" + s[C] + "\\s+", o[me] = new RegExp(s[me], "g");
		var w = "$1^", T = c++;
		s[T] = "^" + s[C] + s[v] + "$";
		var E = c++;
		s[E] = "^" + s[C] + s[y] + "$";
		var D = c++;
		s[D] = "^" + s[_] + "\\s*(" + ae + ")$|^$";
		var he = c++;
		s[he] = "^" + s[_] + "\\s*(" + ie + ")$|^$";
		var O = c++;
		s[O] = "(\\s*)" + s[_] + "\\s*(" + ae + "|" + s[v] + ")", o[O] = new RegExp(s[O], "g");
		var ge = "$1$2$3", _e = c++;
		s[_e] = "^\\s*(" + s[v] + ")\\s+-\\s+(" + s[v] + ")\\s*$";
		var ve = c++;
		s[ve] = "^\\s*(" + s[y] + ")\\s+-\\s+(" + s[y] + ")\\s*$";
		var k = c++;
		s[k] = "(<|>)?=?\\s*\\*";
		for (var A = 0; A < c; A++) n(A, s[A]), o[A] || (o[A] = new RegExp(s[A]));
		t.parse = j;
		function j(e, t) {
			if (e instanceof N) return e;
			if (typeof e != "string" || e.length > r || !(t ? o[oe] : o[re]).test(e)) return null;
			try {
				return new N(e, t);
			} catch {
				return null;
			}
		}
		t.valid = M;
		function M(e, t) {
			var n = j(e, t);
			return n ? n.version : null;
		}
		t.clean = ye;
		function ye(e, t) {
			var n = j(e.trim().replace(/^[=v]+/, ""), t);
			return n ? n.version : null;
		}
		t.SemVer = N;
		function N(e, t) {
			if (e instanceof N) {
				if (e.loose === t) return e;
				e = e.version;
			} else if (typeof e != "string") throw TypeError("Invalid Version: " + e);
			if (e.length > r) throw TypeError("version is longer than " + r + " characters");
			if (!(this instanceof N)) return new N(e, t);
			n("SemVer", e, t), this.loose = t;
			var a = e.trim().match(t ? o[oe] : o[re]);
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
		N.prototype.format = function() {
			return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), this.version;
		}, N.prototype.toString = function() {
			return this.version;
		}, N.prototype.compare = function(e) {
			return n("SemVer.compare", this.version, this.loose, e), e instanceof N || (e = new N(e, this.loose)), this.compareMain(e) || this.comparePre(e);
		}, N.prototype.compareMain = function(e) {
			return e instanceof N || (e = new N(e, this.loose)), I(this.major, e.major) || I(this.minor, e.minor) || I(this.patch, e.patch);
		}, N.prototype.comparePre = function(e) {
			if (e instanceof N || (e = new N(e, this.loose)), this.prerelease.length && !e.prerelease.length) return -1;
			if (!this.prerelease.length && e.prerelease.length) return 1;
			if (!this.prerelease.length && !e.prerelease.length) return 0;
			var t = 0;
			do {
				var r = this.prerelease[t], i = e.prerelease[t];
				if (n("prerelease compare", t, r, i), r === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (r === void 0) return -1;
				if (r === i) continue;
				return I(r, i);
			} while (++t);
		}, N.prototype.inc = function(e, t) {
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
		}, t.inc = P;
		function P(e, t, n, r) {
			typeof n == "string" && (r = n, n = void 0);
			try {
				return new N(e, n).inc(t, r).version;
			} catch {
				return null;
			}
		}
		t.diff = be;
		function be(e, t) {
			if (U(e, t)) return null;
			var n = j(e), r = j(t);
			if (n.prerelease.length || r.prerelease.length) {
				for (var i in n) if ((i === "major" || i === "minor" || i === "patch") && n[i] !== r[i]) return "pre" + i;
				return "prerelease";
			}
			for (var i in n) if ((i === "major" || i === "minor" || i === "patch") && n[i] !== r[i]) return i;
		}
		t.compareIdentifiers = I;
		var F = /^[0-9]+$/;
		function I(e, t) {
			var n = F.test(e), r = F.test(t);
			return n && r && (e = +e, t = +t), n && !r ? -1 : r && !n ? 1 : e < t ? -1 : +(e > t);
		}
		t.rcompareIdentifiers = L;
		function L(e, t) {
			return I(t, e);
		}
		t.major = xe;
		function xe(e, t) {
			return new N(e, t).major;
		}
		t.minor = Se;
		function Se(e, t) {
			return new N(e, t).minor;
		}
		t.patch = R;
		function R(e, t) {
			return new N(e, t).patch;
		}
		t.compare = z;
		function z(e, t, n) {
			return new N(e, n).compare(new N(t, n));
		}
		t.compareLoose = Ce;
		function Ce(e, t) {
			return z(e, t, !0);
		}
		t.rcompare = we;
		function we(e, t, n) {
			return z(t, e, n);
		}
		t.sort = B;
		function B(e, n) {
			return e.sort(function(e, r) {
				return t.compare(e, r, n);
			});
		}
		t.rsort = Te;
		function Te(e, n) {
			return e.sort(function(e, r) {
				return t.rcompare(e, r, n);
			});
		}
		t.gt = V;
		function V(e, t, n) {
			return z(e, t, n) > 0;
		}
		t.lt = H;
		function H(e, t, n) {
			return z(e, t, n) < 0;
		}
		t.eq = U;
		function U(e, t, n) {
			return z(e, t, n) === 0;
		}
		t.neq = Ee;
		function Ee(e, t, n) {
			return z(e, t, n) !== 0;
		}
		t.gte = De;
		function De(e, t, n) {
			return z(e, t, n) >= 0;
		}
		t.lte = W;
		function W(e, t, n) {
			return z(e, t, n) <= 0;
		}
		t.cmp = G;
		function G(e, t, n, r) {
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
					i = U(e, n, r);
					break;
				case "!=":
					i = Ee(e, n, r);
					break;
				case ">":
					i = V(e, n, r);
					break;
				case ">=":
					i = De(e, n, r);
					break;
				case "<":
					i = H(e, n, r);
					break;
				case "<=":
					i = W(e, n, r);
					break;
				default: throw TypeError("Invalid operator: " + t);
			}
			return i;
		}
		t.Comparator = K;
		function K(e, t) {
			if (e instanceof K) {
				if (e.loose === t) return e;
				e = e.value;
			}
			if (!(this instanceof K)) return new K(e, t);
			n("comparator", e, t), this.loose = t, this.parse(e), this.semver === q ? this.value = "" : this.value = this.operator + this.semver.version, n("comp", this);
		}
		var q = {};
		K.prototype.parse = function(e) {
			var t = this.loose ? o[D] : o[he], n = e.match(t);
			if (!n) throw TypeError("Invalid comparator: " + e);
			this.operator = n[1], this.operator === "=" && (this.operator = ""), n[2] ? this.semver = new N(n[2], this.loose) : this.semver = q;
		}, K.prototype.toString = function() {
			return this.value;
		}, K.prototype.test = function(e) {
			return n("Comparator.test", e, this.loose), this.semver === q ? !0 : (typeof e == "string" && (e = new N(e, this.loose)), G(e, this.operator, this.semver, this.loose));
		}, K.prototype.intersects = function(e, t) {
			if (!(e instanceof K)) throw TypeError("a Comparator is required");
			var n;
			if (this.operator === "") return n = new J(e.value, t), ze(this.value, n, t);
			if (e.operator === "") return n = new J(this.value, t), ze(e.semver, n, t);
			var r = (this.operator === ">=" || this.operator === ">") && (e.operator === ">=" || e.operator === ">"), i = (this.operator === "<=" || this.operator === "<") && (e.operator === "<=" || e.operator === "<"), a = this.semver.version === e.semver.version, o = (this.operator === ">=" || this.operator === "<=") && (e.operator === ">=" || e.operator === "<="), s = G(this.semver, "<", e.semver, t) && (this.operator === ">=" || this.operator === ">") && (e.operator === "<=" || e.operator === "<"), c = G(this.semver, ">", e.semver, t) && (this.operator === "<=" || this.operator === "<") && (e.operator === ">=" || e.operator === ">");
			return r || i || a && o || s || c;
		}, t.Range = J;
		function J(e, t) {
			if (e instanceof J) return e.loose === t ? e : new J(e.raw, t);
			if (e instanceof K) return new J(e.value, t);
			if (!(this instanceof J)) return new J(e, t);
			if (this.loose = t, this.raw = e, this.set = e.split(/\s*\|\|\s*/).map(function(e) {
				return this.parseRange(e.trim());
			}, this).filter(function(e) {
				return e.length;
			}), !this.set.length) throw TypeError("Invalid SemVer Range: " + e);
			this.format();
		}
		J.prototype.format = function() {
			return this.range = this.set.map(function(e) {
				return e.join(" ").trim();
			}).join("||").trim(), this.range;
		}, J.prototype.toString = function() {
			return this.range;
		}, J.prototype.parseRange = function(e) {
			var t = this.loose;
			e = e.trim(), n("range", e, t);
			var r = t ? o[ve] : o[_e];
			e = e.replace(r, Le), n("hyphen replace", e), e = e.replace(o[O], ge), n("comparator trim", e, o[O]), e = e.replace(o[x], S), e = e.replace(o[me], w), e = e.split(/\s+/).join(" ");
			var i = t ? o[D] : o[he], a = e.split(" ").map(function(e) {
				return ke(e, t);
			}).join(" ").split(/\s+/);
			return this.loose && (a = a.filter(function(e) {
				return !!e.match(i);
			})), a = a.map(function(e) {
				return new K(e, t);
			}), a;
		}, J.prototype.intersects = function(e, t) {
			if (!(e instanceof J)) throw TypeError("a Range is required");
			return this.set.some(function(n) {
				return n.every(function(n) {
					return e.set.some(function(e) {
						return e.every(function(e) {
							return n.intersects(e, t);
						});
					});
				});
			});
		}, t.toComparators = Oe;
		function Oe(e, t) {
			return new J(e, t).set.map(function(e) {
				return e.map(function(e) {
					return e.value;
				}).join(" ").trim().split(" ");
			});
		}
		function ke(e, t) {
			return n("comp", e), e = Me(e, t), n("caret", e), e = Ae(e, t), n("tildes", e), e = Pe(e, t), n("xrange", e), e = Ie(e, t), n("stars", e), e;
		}
		function Y(e) {
			return !e || e.toLowerCase() === "x" || e === "*";
		}
		function Ae(e, t) {
			return e.trim().split(/\s+/).map(function(e) {
				return je(e, t);
			}).join(" ");
		}
		function je(e, t) {
			var r = t ? o[pe] : o[fe];
			return e.replace(r, function(t, r, i, a, o) {
				n("tilde", e, t, r, i, a, o);
				var s;
				return Y(r) ? s = "" : Y(i) ? s = ">=" + r + ".0.0 <" + (+r + 1) + ".0.0" : Y(a) ? s = ">=" + r + "." + i + ".0 <" + r + "." + (+i + 1) + ".0" : o ? (n("replaceTilde pr", o), o.charAt(0) !== "-" && (o = "-" + o), s = ">=" + r + "." + i + "." + a + o + " <" + r + "." + (+i + 1) + ".0") : s = ">=" + r + "." + i + "." + a + " <" + r + "." + (+i + 1) + ".0", n("tilde return", s), s;
			});
		}
		function Me(e, t) {
			return e.trim().split(/\s+/).map(function(e) {
				return Ne(e, t);
			}).join(" ");
		}
		function Ne(e, t) {
			n("caret", e, t);
			var r = t ? o[E] : o[T];
			return e.replace(r, function(t, r, i, a, o) {
				n("caret", e, t, r, i, a, o);
				var s;
				return Y(r) ? s = "" : Y(i) ? s = ">=" + r + ".0.0 <" + (+r + 1) + ".0.0" : Y(a) ? s = r === "0" ? ">=" + r + "." + i + ".0 <" + r + "." + (+i + 1) + ".0" : ">=" + r + "." + i + ".0 <" + (+r + 1) + ".0.0" : o ? (n("replaceCaret pr", o), o.charAt(0) !== "-" && (o = "-" + o), s = r === "0" ? i === "0" ? ">=" + r + "." + i + "." + a + o + " <" + r + "." + i + "." + (+a + 1) : ">=" + r + "." + i + "." + a + o + " <" + r + "." + (+i + 1) + ".0" : ">=" + r + "." + i + "." + a + o + " <" + (+r + 1) + ".0.0") : (n("no pr"), s = r === "0" ? i === "0" ? ">=" + r + "." + i + "." + a + " <" + r + "." + i + "." + (+a + 1) : ">=" + r + "." + i + "." + a + " <" + r + "." + (+i + 1) + ".0" : ">=" + r + "." + i + "." + a + " <" + (+r + 1) + ".0.0"), n("caret return", s), s;
			});
		}
		function Pe(e, t) {
			return n("replaceXRanges", e, t), e.split(/\s+/).map(function(e) {
				return Fe(e, t);
			}).join(" ");
		}
		function Fe(e, t) {
			e = e.trim();
			var r = t ? o[ue] : o[le];
			return e.replace(r, function(t, r, i, a, o, s) {
				n("xRange", e, t, r, i, a, o, s);
				var c = Y(i), l = c || Y(a), u = l || Y(o), d = u;
				return r === "=" && d && (r = ""), c ? t = r === ">" || r === "<" ? "<0.0.0" : "*" : r && d ? (l && (a = 0), u && (o = 0), r === ">" ? (r = ">=", l ? (i = +i + 1, a = 0, o = 0) : u && (a = +a + 1, o = 0)) : r === "<=" && (r = "<", l ? i = +i + 1 : a = +a + 1), t = r + i + "." + a + "." + o) : l ? t = ">=" + i + ".0.0 <" + (+i + 1) + ".0.0" : u && (t = ">=" + i + "." + a + ".0 <" + i + "." + (+a + 1) + ".0"), n("xRange return", t), t;
			});
		}
		function Ie(e, t) {
			return n("replaceStars", e, t), e.trim().replace(o[k], "");
		}
		function Le(e, t, n, r, i, a, o, s, c, l, u, d, f) {
			return t = Y(n) ? "" : Y(r) ? ">=" + n + ".0.0" : Y(i) ? ">=" + n + "." + r + ".0" : ">=" + t, s = Y(c) ? "" : Y(l) ? "<" + (+c + 1) + ".0.0" : Y(u) ? "<" + c + "." + (+l + 1) + ".0" : d ? "<=" + c + "." + l + "." + u + "-" + d : "<=" + s, (t + " " + s).trim();
		}
		J.prototype.test = function(e) {
			if (!e) return !1;
			typeof e == "string" && (e = new N(e, this.loose));
			for (var t = 0; t < this.set.length; t++) if (Re(this.set[t], e)) return !0;
			return !1;
		};
		function Re(e, t) {
			for (var r = 0; r < e.length; r++) if (!e[r].test(t)) return !1;
			if (t.prerelease.length) {
				for (var r = 0; r < e.length; r++) if (n(e[r].semver), e[r].semver !== q && e[r].semver.prerelease.length > 0) {
					var i = e[r].semver;
					if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
				}
				return !1;
			}
			return !0;
		}
		t.satisfies = ze;
		function ze(e, t, n) {
			try {
				t = new J(t, n);
			} catch {
				return !1;
			}
			return t.test(e);
		}
		t.maxSatisfying = Be;
		function Be(e, t, n) {
			var r = null, i = null;
			try {
				var a = new J(t, n);
			} catch {
				return null;
			}
			return e.forEach(function(e) {
				a.test(e) && (!r || i.compare(e) === -1) && (r = e, i = new N(r, n));
			}), r;
		}
		t.minSatisfying = Ve;
		function Ve(e, t, n) {
			var r = null, i = null;
			try {
				var a = new J(t, n);
			} catch {
				return null;
			}
			return e.forEach(function(e) {
				a.test(e) && (!r || i.compare(e) === 1) && (r = e, i = new N(r, n));
			}), r;
		}
		t.validRange = He;
		function He(e, t) {
			try {
				return new J(e, t).range || "*";
			} catch {
				return null;
			}
		}
		t.ltr = Ue;
		function Ue(e, t, n) {
			return Ge(e, t, "<", n);
		}
		t.gtr = We;
		function We(e, t, n) {
			return Ge(e, t, ">", n);
		}
		t.outside = Ge;
		function Ge(e, t, n, r) {
			e = new N(e, r), t = new J(t, r);
			var i, a, o, s, c;
			switch (n) {
				case ">":
					i = V, a = W, o = H, s = ">", c = ">=";
					break;
				case "<":
					i = H, a = De, o = V, s = "<", c = "<=";
					break;
				default: throw TypeError("Must provide a hilo val of \"<\" or \">\"");
			}
			if (ze(e, t, r)) return !1;
			for (var l = 0; l < t.set.length; ++l) {
				var u = t.set[l], d = null, f = null;
				if (u.forEach(function(e) {
					e.semver === q && (e = new K(">=0.0.0")), d ||= e, f ||= e, i(e.semver, d.semver, r) ? d = e : o(e.semver, f.semver, r) && (f = e);
				}), d.operator === s || d.operator === c || (!f.operator || f.operator === s) && a(e, f.semver) || f.operator === c && o(e, f.semver)) return !1;
			}
			return !0;
		}
		t.prerelease = Ke;
		function Ke(e, t) {
			var n = j(e, t);
			return n && n.prerelease.length ? n.prerelease : null;
		}
		t.intersects = qe;
		function qe(e, t, n) {
			return e = new J(e, n), t = new J(t, n), e.intersects(t);
		}
		t.coerce = Je;
		function Je(e) {
			if (e instanceof N) return e;
			if (typeof e != "string") return null;
			var t = e.match(o[de]);
			return t == null ? null : j((t[1] || "0") + "." + (t[2] || "0") + "." + (t[3] || "0"));
		}
	})(vn, vn.exports), vn.exports);
}
var xn, Sn = e((() => {
	yn();
})), Cn, wn = e((() => {
	Sn(), Cn = bn();
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensions/common/extensionValidator.js
function Tn(e) {
	return e = e.trim(), e === "*" || Pn.test(e);
}
function En(e) {
	if (!Tn(e)) return null;
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
	let t = e.match(Pn);
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
function Dn(e) {
	if (!e) return null;
	let t = e.majorBase, n = e.majorMustEqual, r = e.minorBase, i = e.minorMustEqual, a = e.patchBase, o = e.patchMustEqual;
	e.hasCaret && (t === 0 || (i = !1), o = !1);
	let s = 0;
	if (e.preRelease) {
		let t = Fn.exec(e.preRelease);
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
function On(e, t, n) {
	let r;
	r = typeof e == "string" ? Dn(En(e)) : e;
	let i;
	t instanceof Date ? i = t.getTime() : typeof t == "string" && (i = new Date(t).getTime());
	let a;
	if (a = typeof n == "string" ? Dn(En(n)) : n, !r || !a) return !1;
	let o = r.majorBase, s = r.minorBase, c = r.patchBase, l = a.majorBase, u = a.minorBase, d = a.patchBase, f = a.notBefore, p = a.majorMustEqual, m = a.minorMustEqual, h = a.patchMustEqual;
	return a.isMinimum ? o > l ? !0 : o < l ? !1 : s > u ? !0 : s < u || i && i < f ? !1 : c >= d : (o === 1 && l === 0 && (!p || !m || !h) && (l = 1, u = 0, d = 0, p = !0, m = !1, h = !1), o < l ? !1 : o > l ? !p : s < u ? !1 : s > u ? !m : c < d ? !1 : c > d ? !h : !(i && i < f));
}
function kn(e, t, n, i, a, o) {
	let s = [];
	if (i.publisher !== void 0 && typeof i.publisher != "string") return s.push([E.Error, r(1885, "property publisher must be of type `string`.")]), s;
	if (typeof i.name != "string") return s.push([E.Error, r(1886, "property `{0}` is mandatory and must be of type `string`", "name")]), s;
	if (typeof i.version != "string") return s.push([E.Error, r(1887, "property `{0}` is mandatory and must be of type `string`", "version")]), s;
	if (!i.engines) return s.push([E.Error, r(1888, "property `{0}` is mandatory and must be of type `object`", "engines")]), s;
	if (typeof i.engines.vscode != "string") return s.push([E.Error, r(1889, "property `{0}` is mandatory and must be of type `string`", "engines.vscode")]), s;
	if (i.extensionDependencies !== void 0 && !Nn(i.extensionDependencies)) return s.push([E.Error, r(1890, "property `{0}` can be omitted or must be of type `string[]`", "extensionDependencies")]), s;
	if (i.activationEvents !== void 0) {
		if (!Nn(i.activationEvents)) return s.push([E.Error, r(1891, "property `{0}` can be omitted or must be of type `string[]`", "activationEvents")]), s;
		if (i.main === void 0 && i.browser === void 0) return s.push([E.Error, r(1892, "property `{0}` should be omitted if the extension doesn't have a `{1}` or `{2}` property.", "activationEvents", "main", "browser")]), s;
	}
	if (i.extensionKind !== void 0 && i.main === void 0 && s.push([E.Warning, r(1893, "property `{0}` can be defined only if property `main` is also defined.", "extensionKind")]), i.main !== void 0) {
		if (typeof i.main != "string") return s.push([E.Error, r(1894, "property `{0}` can be omitted or must be of type `string`", "main")]), s;
		{
			let e = G(n, i.main);
			ye(e, n) || s.push([E.Warning, r(1895, "Expected `main` ({0}) to be included inside extension's folder ({1}). This might make the extension non-portable.", e.path, n.path)]);
		}
	}
	if (i.browser !== void 0) {
		if (typeof i.browser != "string") return s.push([E.Error, r(1896, "property `{0}` can be omitted or must be of type `string`", "browser")]), s;
		{
			let e = G(n, i.browser);
			ye(e, n) || s.push([E.Warning, r(1897, "Expected `browser` ({0}) to be included inside extension's folder ({1}). This might make the extension non-portable.", e.path, n.path)]);
		}
	}
	if (!Cn.valid(i.version)) return s.push([E.Error, r(1898, "Extension version is not semver compatible.")]), s;
	let c = [];
	if (!An(e, t, i, a, c)) for (let e of c) s.push([E.Error, e]);
	if (o && i.enabledApiProposals?.length) {
		let e = [];
		if (!jn([...i.enabledApiProposals], e)) for (let t of e) s.push([E.Error, t]);
	}
	return s;
}
function An(e, t, n, r, i) {
	return r || n.main === void 0 && n.browser === void 0 ? !0 : Mn(e, t, n.engines.vscode, i);
}
function jn(e, t) {
	if (e.length === 0) return !0;
	let n = Array.isArray(t) ? t : void 0, i = (Array.isArray(t) ? void 0 : t) ?? Be, a = [], o = mt(e);
	for (let { proposalName: e, version: t } of o) t && i[e]?.version !== t && a.push(e);
	return a.length ? (n && (a.length === 1 ? n.push(r(1899, "This extension is using the API proposal '{0}' that is not compatible with the current version of VS Code.", a[0])) : n.push(r(1900, "This extension is using the API proposals {0} and '{1}' that are not compatible with the current version of VS Code.", a.slice(0, a.length - 1).map((e) => `'${e}'`).join(", "), a[a.length - 1]))), !1) : !0;
}
function Mn(e, t, n, i = []) {
	let a = Dn(En(n));
	if (!a) return i.push(r(1901, "Could not parse `engines.vscode` value {0}. Please use, for example: ^1.22.0, ^1.22.x, etc.", n)), !1;
	if (a.majorBase === 0) {
		if (!a.majorMustEqual || !a.minorMustEqual) return i.push(r(1902, "Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions before 1.0.0, please define at a minimum the major and minor desired version. E.g. ^0.10.0, 0.10.x, 0.11.0, etc.", n)), !1;
	} else if (!a.majorMustEqual) return i.push(r(1903, "Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions after 1.0.0, please define at a minimum the major desired version. E.g. ^1.10.0, 1.10.x, 1.x.x, 2.x.x, etc.", n)), !1;
	return On(e, t, a) ? !0 : (i.push(r(1904, "Extension is not compatible with Code {0}. Extension requires: {1}.", e, n)), !1);
}
function Nn(e) {
	if (!Array.isArray(e)) return !1;
	for (let t = 0, n = e.length; t < n; t++) if (typeof e[t] != "string") return !1;
	return !0;
}
var Pn, Fn, In = e((() => {
	D(), g(), C(), wn(), Ye(), He(), Pn = /^(\^|>=)?((\d+)|x)\.((\d+)|x)\.((\d+)|x)(\-.*)?$/, Fn = /^-(\d{4})(\d{2})(\d{2})$/;
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensionManagement/common/extensionsProfileScannerService.js
function Ln(e) {
	let t = e;
	return a(t) && Xe(t.identifier) && (Rn(t.location) || L(t.location) && !!t.location) && (ue(t.relativeLocation) || L(t.relativeLocation)) && !!t.version && L(t.version);
}
function Rn(e) {
	if (!e) return !1;
	let t = e;
	return typeof t?.path == "string" && typeof t?.scheme == "string";
}
var zn, Bn, Vn, Hn = e((() => {
	Se(), de(), ne(), J(), _(), n(), P(), at(), Ut(), ae(), o(), De(), Fe(), le(), l(), Ce(), (function(e) {
		e.ERROR_PROFILE_NOT_FOUND = "ERROR_PROFILE_NOT_FOUND", e.ERROR_INVALID_CONTENT = "ERROR_INVALID_CONTENT";
	})(zn ||= {}), Bn = class extends Error {
		constructor(e, t) {
			super(e), this.code = t;
		}
	}, Vn = class extends t {
		constructor(e, t, n, r, i) {
			super(), this.extensionsLocation = e, this.fileService = t, this.userDataProfilesService = n, this.uriIdentityService = r, this.logService = i, this._onAddExtensions = this._register(new s()), this.onAddExtensions = this._onAddExtensions.event, this._onDidAddExtensions = this._register(new s()), this.onDidAddExtensions = this._onDidAddExtensions.event, this._onRemoveExtensions = this._register(new s()), this.onRemoveExtensions = this._onRemoveExtensions.event, this._onDidRemoveExtensions = this._register(new s()), this.onDidRemoveExtensions = this._onDidRemoveExtensions.event, this.resourcesAccessQueueMap = new oe();
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
					else for (let t of a) e.some(([e]) => Z(e.identifier, t.identifier) && e.manifest.version !== t.version) ? r.push(t) : o.push(t);
					for (let [t, n] of e) {
						let e = o.findIndex((e) => Z(e.identifier, t.identifier) && e.version === t.manifest.version), r = {
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
					let t = e.find(([e]) => Z({ id: e.identifier.id }, { id: i.identifier.id }) && e.manifest.version === i.version);
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
					for (let t of r) e.some((e) => Z(t.identifier, e)) ? n.push(t) : i.push(t);
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
					if (w(t) !== H.FILE_NOT_FOUND) throw t;
					if (this.uriIdentityService.extUri.isEqual(e, this.userDataProfilesService.defaultProfile.extensionsResource) && (i = await this.migrateFromOldDefaultProfileExtensionsLocation()), !i && n?.bailOutWhenFileNotFound) throw new Bn(M(t), zn.ERROR_PROFILE_NOT_FOUND);
				}
				if (i) {
					Array.isArray(i) || this.throwInvalidConentError(e);
					let t = !1;
					for (let n of i) {
						Ln(n) || this.throwInvalidConentError(e);
						let i;
						if (L(n.relativeLocation) && n.relativeLocation) i = this.resolveExtensionLocation(n.relativeLocation);
						else if (L(n.location)) {
							this.logService.warn(`Extensions profile: Ignoring extension with invalid location: ${n.location}`);
							continue;
						} else {
							i = F.revive(n.location);
							let e = this.toRelativePath(i);
							e && (t = !0, n.relativeLocation = e);
						}
						ue(n.metadata?.hasPreReleaseVersion) && n.metadata?.preRelease && (t = !0, n.metadata.hasPreReleaseVersion = !0);
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
					t && await this.fileService.writeFile(e, S.fromString(JSON.stringify(i)));
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
					await this.fileService.writeFile(e, S.fromString(JSON.stringify(n)));
				}
				return r;
			});
		}
		throwInvalidConentError(e) {
			throw new Bn(`Invalid extensions content in ${e.toString()}`, zn.ERROR_INVALID_CONTENT);
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
					if (w(e) === H.FILE_NOT_FOUND) return;
					throw e;
				}
				this.logService.info("Migrating extensions from old default profile location", e.toString());
				let r;
				try {
					let e = JSON.parse(n);
					Array.isArray(e) && e.every((e) => Ln(e)) ? r = e : this.logService.warn("Skipping migrating from old default profile locaiton: Found invalid data", e);
				} catch (e) {
					this.logService.error(e);
				}
				if (r) try {
					await this.fileService.createFile(this.userDataProfilesService.defaultProfile.extensionsResource, S.fromString(JSON.stringify(r)), { overwrite: !1 }), this.logService.info("Migrated extensions from old default profile location to new location", e.toString(), this.userDataProfilesService.defaultProfile.extensionsResource.toString());
				} catch (t) {
					if (w(t) === H.FILE_MODIFIED_SINCE) this.logService.info("Migration from old default profile location to new location is done by another window", e.toString(), this.userDataProfilesService.defaultProfile.extensionsResource.toString());
					else throw t;
				}
				try {
					await this.fileService.del(e);
				} catch (e) {
					w(e) !== H.FILE_NOT_FOUND && this.logService.error(e);
				}
				try {
					await this.fileService.del(t);
				} catch (e) {
					w(e) !== H.FILE_NOT_FOUND && this.logService.error(e);
				}
				return r;
			})(), this._migrationPromise;
		}
		getResourceAccessQueue(e) {
			let t = this.resourcesAccessQueueMap.get(e);
			return t || (t = new N(), this.resourcesAccessQueueMap.set(e, t)), t;
		}
	}, Vn = u([
		b(1, R),
		b(2, Pe),
		b(3, v),
		b(4, K)
	], Vn);
})), Un, Wn = e((() => {
	d(), Un = x("IExtensionsProfileScannerService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensionManagement/common/extensionNls.js
function Gn(e, t, n, r) {
	try {
		Kn(e, t, n, r);
	} catch (t) {
		e.error(t?.message ?? t);
	}
	return t;
}
function Kn(e, t, n, i) {
	let o = (s, c, l) => {
		let u = s[c];
		if (L(u)) {
			let a = u, o = a.length;
			if (o > 1 && a[0] === "%" && a[o - 1] === "%") {
				let u = a.substr(1, o - 2), d = n[u];
				d === void 0 && i && (d = i[u]);
				let f = typeof d == "string" ? d : d?.message, p = i?.[u], m = typeof p == "string" ? p : p?.message;
				if (!f) {
					m || e.warn(`[${t.name}]: ${r(1879, "Couldn't find message for key {0}.", u)}`);
					return;
				}
				l && (c === "title" || c === "category") && m && m !== f ? s[c] = {
					value: f,
					original: m
				} : s[c] = f;
			}
		} else if (a(u)) for (let e in u) u.hasOwnProperty(e) && (e === "commands" ? o(u, e, !0) : o(u, e, l));
		else if (Array.isArray(u)) for (let e = 0; e < u.length; e++) o(u, e, l);
	};
	for (let e in t) t.hasOwnProperty(e) && o(t, e);
}
var qn = e((() => {
	l(), C();
})), Jn, Yn, Xn, Zn, Qn, $n, er = e((() => {
	Se(), c(), de(), ve(), ne(), Ce(), V(), vt(), J(), j(), y(), xe(), D(), wn(), g(), P(), C(), m(), Ut(), Ye(), In(), ae(), o(), d(), De(), Ve(), _(), I(), Hn(), Wn(), Fe(), le(), qn(), ht(), (function(e) {
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
	})(Jn ||= {}), Yn = class extends t {
		constructor(e, t, n, r, i, a, o, c, l, u, d, f, p) {
			super(), this.systemExtensionsLocation = e, this.userExtensionsLocation = t, this.extensionsControlLocation = n, this.userDataProfilesService = i, this.extensionsProfileScannerService = a, this.extensionResourceLoaderService = o, this.fileService = c, this.logService = l, this.environmentService = u, this.productService = d, this.uriIdentityService = f, this.instantiationService = p, this._onDidChangeCache = this._register(new s()), this.onDidChangeCache = this._onDidChangeCache.event, this.initializeDefaultProfileExtensionsPromise = void 0, this.systemExtensionsCachedScanner = this._register(this.instantiationService.createInstance($n, r)), this.userExtensionsCachedScanner = this._register(this.instantiationService.createInstance($n, r)), this.extensionsScanner = this._register(this.instantiationService.createInstance(Qn)), this._register(this.systemExtensionsCachedScanner.onDidChangeCache(() => this._onDidChangeCache.fire(X.System))), this._register(this.userExtensionsCachedScanner.onDidChangeCache(() => this._onDidChangeCache.fire(X.User)));
		}
		getTargetPlatform() {
			return this._targetPlatformPromise ||= zt(this.fileService, this.logService), this._targetPlatformPromise;
		}
		async scanAllExtensions(e, t) {
			let [n, r] = await Promise.all([this.scanSystemExtensions(e), this.scanUserExtensions(t)]);
			return this.dedupExtensions(n, r, [], await this.getTargetPlatform(), !0);
		}
		async scanSystemExtensions(e) {
			let t = [];
			t.push(this.scanDefaultSystemExtensions(e.language)), t.push(this.scanDevSystemExtensions(e.language, !!e.checkControlFile));
			let [n, r] = await Promise.all(t);
			return this.applyScanOptions([...n, ...r], X.System, { pickLatest: !1 });
		}
		async scanUserExtensions(e) {
			this.logService.trace("Started scanning user extensions", e.profileLocation);
			let t = this.uriIdentityService.extUri.isEqual(e.profileLocation, this.userDataProfilesService.defaultProfile.extensionsResource) ? { bailOutWhenFileNotFound: !0 } : void 0, n = await this.createExtensionScannerInput(e.profileLocation, !0, X.User, e.language, !0, t, e.productVersion ?? this.getProductVersion()), r = e.useCache && !n.devMode ? this.userExtensionsCachedScanner : this.extensionsScanner, i;
			try {
				i = await r.scanExtensions(n);
			} catch (e) {
				if (e instanceof Bn && e.code === zn.ERROR_PROFILE_NOT_FOUND) await this.doInitializeDefaultProfileExtensions(), i = await r.scanExtensions(n);
				else throw e;
			}
			return i = await this.applyScanOptions(i, X.User, {
				includeInvalid: e.includeInvalid,
				pickLatest: !0
			}), this.logService.trace("Scanned user extensions:", i.length), i;
		}
		async scanAllUserExtensions(e = {
			includeInvalid: !0,
			includeAllVersions: !0
		}) {
			let t = await this.createExtensionScannerInput(this.userExtensionsLocation, !1, X.User, void 0, !0, void 0, this.getProductVersion()), n = await this.extensionsScanner.scanExtensions(t);
			return this.applyScanOptions(n, X.User, {
				includeAllVersions: e.includeAllVersions,
				includeInvalid: e.includeInvalid
			});
		}
		async scanExtensionsUnderDevelopment(e, t) {
			if (this.environmentService.isExtensionDevelopment && this.environmentService.extensionDevelopmentLocationURI) {
				let n = (await Promise.all(this.environmentService.extensionDevelopmentLocationURI.filter((e) => e.scheme === q.file).map(async (n) => {
					let r = await this.createExtensionScannerInput(n, !1, X.User, t.language, !1, void 0, this.getProductVersion());
					return (await this.extensionsScanner.scanOneOrMultipleExtensions(r)).map((t) => (t.type = e.find((e) => Z(e.identifier, t.identifier))?.type ?? t.type, this.extensionsScanner.validate(t, r)));
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
			let n = G(e, "package.json"), r = await this.extensionResourceLoaderService.readExtensionResource(n), i = JSON.parse(r);
			i.__metadata = {
				...i.__metadata,
				...t
			}, await this.fileService.writeFile(G(e, "package.json"), S.fromString(JSON.stringify(i, null, "	")));
		}
		async initializeDefaultProfileExtensions() {
			try {
				await this.extensionsProfileScannerService.scanProfileExtensions(this.userDataProfilesService.defaultProfile.extensionsResource, { bailOutWhenFileNotFound: !0 });
			} catch (e) {
				if (e instanceof Bn && e.code === zn.ERROR_PROFILE_NOT_FOUND) await this.doInitializeDefaultProfileExtensions();
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
						await this.fileService.createFile(this.userDataProfilesService.defaultProfile.extensionsResource, S.fromString(JSON.stringify([])));
					} catch (e) {
						w(e) !== H.FILE_NOT_FOUND && this.logService.warn("Failed to create default profile extensions manifest in extensions installation folder.", this.userExtensionsLocation.toString(), M(e));
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
			return n.includeAllVersions || (e = this.dedupExtensions(t === X.System ? e : void 0, t === X.User ? e : void 0, t === "development" ? e : void 0, await this.getTargetPlatform(), !!n.pickLatest)), n.includeInvalid || (e = e.filter((e) => e.isValid)), e.sort((e, t) => {
				let n = i(e.location.fsPath), r = i(t.location.fsPath);
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
					if (i && Cn.gt(e.manifest.version, t.manifest.version)) return this.logService.debug(`Skipping extension ${t.location.path} with lower version ${t.manifest.version} in favour of ${e.location.path} with version ${e.manifest.version}`), !1;
					if (Cn.eq(e.manifest.version, t.manifest.version)) {
						if (e.type === X.System) return this.logService.debug(`Skipping extension ${t.location.path} in favour of system extension ${e.location.path} with same version`), !1;
						if (e.targetPlatform === r) return this.logService.debug(`Skipping extension ${t.location.path} from different target platform ${t.targetPlatform}`), !1;
					}
				}
				return n ? this.logService.warn(`Overwriting user extension ${e.location.path} with ${t.location.path}.`) : this.logService.debug(`Overwriting user extension ${e.location.path} with ${t.location.path}.`), !0;
			}, o = new et();
			return e?.forEach((e) => {
				let t = o.get(e.identifier.id);
				(!t || a(t, e, !1)) && o.set(e.identifier.id, e);
			}), t?.forEach((t) => {
				let n = o.get(t.identifier.id);
				if (!n && e && t.type === X.System) {
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
			let t = await this.createExtensionScannerInput(this.systemExtensionsLocation, !1, X.System, e, !0, void 0, this.getProductVersion()), n = await (t.devMode ? this.extensionsScanner : this.systemExtensionsCachedScanner).scanExtensions(t);
			return this.logService.trace("Scanned system extensions:", n.length), n;
		}
		async scanDevSystemExtensions(e, t) {
			let n = this.environmentService.isBuilt ? [] : this.productService.builtInExtensions;
			if (!n?.length) return [];
			this.logService.trace("Started scanning dev system extensions");
			let r = t ? await this.getBuiltInExtensionControl() : {}, i = [], a = F.file(ie(p(A.asFileUri("").fsPath, "..", ".build", "builtInExtensions")));
			for (let e of n) {
				let t = r[e.name] || "marketplace";
				switch (t) {
					case "disabled": break;
					case "marketplace":
						i.push(G(a, e.name));
						break;
					default:
						i.push(F.file(t));
						break;
				}
			}
			let o = await Promise.all(i.map(async (t) => this.extensionsScanner.scanExtension(await this.createExtensionScannerInput(t, !1, X.System, e, !0, void 0, this.getProductVersion()))));
			return this.logService.trace("Scanned dev system extensions:", o.length), z(o);
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
			let s = await this.getTranslations(r ?? U), c = await this.getMtime(e), l = t && !this.uriIdentityService.extUri.isEqual(e, this.userDataProfilesService.defaultProfile.extensionsResource) ? this.userDataProfilesService.defaultProfile.extensionsResource : void 0, u = l ? await this.getMtime(l) : void 0;
			return new Xn(e, c, l, u, t, a, n, i, o.version, o.date, this.productService.commit, !this.environmentService.isBuilt, r, s);
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
	}, Yn = u([
		b(4, Pe),
		b(5, Un),
		b(6, We),
		b(7, R),
		b(8, K),
		b(9, fe),
		b(10, ct),
		b(11, v),
		b(12, ce)
	], Yn), Xn = class {
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
			return pe(e.location, t.location) && e.mtime === t.mtime && pe(e.applicationExtensionslocation, t.applicationExtensionslocation) && e.applicationExtensionslocationMtime === t.applicationExtensionslocationMtime && e.profile === t.profile && Oe(e.profileScanOptions, t.profileScanOptions) && e.type === t.type && e.validate === t.validate && e.productVersion === t.productVersion && e.productDate === t.productDate && e.productCommit === t.productCommit && e.devMode === t.devMode && e.language === t.language && Jn.equals(e.translations, t.translations);
		}
	}, Zn = class extends t {
		constructor(e, t, n) {
			super(), this.extensionResourceLoaderService = e, this.fileService = t, this.logService = n;
		}
		async getLocalizedMessages(e, t, n) {
			let i = G(e, "package.nls.json"), a = (t, n) => {
				n.forEach((n) => {
					this.logService.error(this.formatMessage(e, r(1880, "Failed to parse {0}: {1}.", t?.path, yt(n.error))));
				});
			}, o = (t) => {
				this.logService.error(this.formatMessage(e, r(1881, "Invalid format {0}: JSON object expected.", t?.path)));
			}, s = `${t.publisher}.${t.name}`, c = n.translations[s];
			if (c) try {
				let e = F.parse(c), t = await this.extensionResourceLoaderService.readExtensionResource(e), n = [], r = W(t, n);
				return n.length > 0 ? (a(e, n), {
					values: void 0,
					default: i
				}) : _e(r) === "object" ? {
					values: r.contents ? r.contents.package : void 0,
					default: i
				} : (o(e), {
					values: void 0,
					default: i
				});
			} catch {
				return {
					values: void 0,
					default: i
				};
			}
			else {
				if (!await this.fileService.exists(i)) return;
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
					let e = await this.extensionResourceLoaderService.readExtensionResource(t.localized), n = [], r = W(e, n);
					return n.length > 0 ? (a(t.localized, n), {
						values: void 0,
						default: t.original
					}) : _e(r) === "object" ? {
						values: r,
						default: t.original
					} : (o(t.localized), {
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
			let i = await this.getLocalizedMessages(e, t, n);
			if (i) try {
				let n = [], a = await this.resolveOriginalMessageBundle(i.default, n);
				if (n.length > 0) return n.forEach((t) => {
					this.logService.error(this.formatMessage(e, r(1880, "Failed to parse {0}: {1}.", i.default?.path, yt(t.error))));
				}), t;
				if (_e(i) !== "object") return this.logService.error(this.formatMessage(e, r(1881, "Invalid format {0}: JSON object expected.", i.default?.path))), t;
				let o = i.values || Object.create(null);
				return Gn(this.logService, t, o, a);
			} catch {}
			return t;
		}
		async resolveOriginalMessageBundle(e, t) {
			if (e) try {
				return W(await this.extensionResourceLoaderService.readExtensionResource(e), t);
			} catch {}
		}
		findMessageBundles(e, t) {
			return new Promise((n, r) => {
				let i = (t) => {
					let r = G(e, `package.nls.${t}.json`);
					this.fileService.exists(r).then((a) => {
						a && n({
							localized: r,
							original: G(e, "package.nls.json")
						});
						let o = t.lastIndexOf("-");
						o === -1 ? n({
							localized: G(e, "package.nls.json"),
							original: null
						}) : (t = t.substring(0, o), i(t));
					});
				};
				if (t.devMode || t.pseudo || !t.language) return n({
					localized: G(e, "package.nls.json"),
					original: null
				});
				i(t.language);
			});
		}
		formatMessage(e, t) {
			return `[${e.path}]: ${t}`;
		}
	}, Zn = u([
		b(0, We),
		b(1, R),
		b(2, K)
	], Zn), Qn = class extends Zn {
		constructor(e, t, n, r, i, a, o) {
			super(n, r, o), this.extensionsProfileScannerService = e, this.uriIdentityService = t, this.environmentService = a, this.extensionsEnabledWithApiProposalVersion = i.extensionsEnabledWithApiProposalVersion?.map((e) => e.toLowerCase()) ?? [];
		}
		async scanExtensions(e) {
			return e.profile ? this.scanExtensionsFromProfile(e) : this.scanExtensionsFromLocation(e);
		}
		async scanExtensionsFromLocation(e) {
			let t = await this.fileService.resolve(e.location);
			return t.children?.length ? z(await Promise.all(t.children.map(async (t) => {
				if (!t.isDirectory || e.type === X.User && ee(t.resource).indexOf(".") === 0) return null;
				let n = new Xn(t.resource, e.mtime, e.applicationExtensionslocation, e.applicationExtensionslocationMtime, e.profile, e.profileScanOptions, e.type, e.validate, e.productVersion, e.productDate, e.productCommit, e.devMode, e.language, e.translations);
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
			return r.length ? z(await Promise.all(r.map(async (e) => {
				if (t(e)) {
					let t = new Xn(e.location, n.mtime, n.applicationExtensionslocation, n.applicationExtensionslocationMtime, n.profile, n.profileScanOptions, n.type, n.validate, n.productVersion, n.productDate, n.productCommit, n.devMode, n.language, n.translations);
					return this.scanExtension(t, e);
				}
				return null;
			}))) : [];
		}
		async scanOneOrMultipleExtensions(e) {
			try {
				if (await this.fileService.exists(G(e.location, "package.json"))) {
					let t = await this.scanExtension(e);
					return t ? [t] : [];
				} else return await this.scanExtensions(e);
			} catch (t) {
				return this.logService.error(`Error scanning extensions at ${e.location.path}:`, M(t)), [];
			}
		}
		async scanExtension(e, t) {
			let n = [], r = !0, i;
			try {
				i = await this.scanExtensionManifest(e.location);
			} catch (a) {
				if (t) {
					n.push([E.Error, M(a)]), r = !1;
					let [e, o] = t.identifier.id.split(".");
					i = {
						name: o,
						publisher: e,
						version: t.version,
						engines: { vscode: "" }
					};
				} else return e.type !== X.System && this.logService.error(a), null;
			}
			i.publisher ||= rt;
			let a;
			t ? a = {
				...t.metadata,
				size: i.__metadata?.size
			} : i.__metadata && (a = {
				installedTimestamp: i.__metadata.installedTimestamp,
				size: i.__metadata.size,
				targetPlatform: i.__metadata.targetPlatform
			}), delete i.__metadata;
			let o = Lt(i.publisher, i.name), s = a?.id ? {
				id: o,
				uuid: a.id
			} : { id: o }, c = a?.isSystem ? X.System : e.type, l = c === X.System || !!a?.isBuiltin;
			try {
				i = await this.translateManifest(e.location, i, Xn.createNlsConfiguration(e));
			} catch (e) {
				this.logService.warn("Failed to translate manifest", M(e));
			}
			let u = {
				type: c,
				identifier: s,
				manifest: i,
				location: e.location,
				isBuiltin: l,
				targetPlatform: a?.targetPlatform ?? st.UNDEFINED,
				publisherDisplayName: a?.publisherDisplayName,
				metadata: a,
				isValid: r,
				validations: n,
				preRelease: !!a?.preRelease
			};
			return e.validate && (u = this.validate(u, e)), i.enabledApiProposals && (!this.environmentService.isBuilt || this.extensionsEnabledWithApiProposalVersion.includes(o.toLowerCase())) && (i.originalEnabledApiProposals = i.enabledApiProposals, i.enabledApiProposals = Qe([...i.enabledApiProposals])), u;
		}
		validate(e, t) {
			let n = e.isValid, r = this.environmentService.isBuilt && this.extensionsEnabledWithApiProposalVersion.includes(e.identifier.id.toLowerCase()), i = kn(t.productVersion, t.productDate, t.location, e.manifest, e.isBuiltin, r);
			for (let [e, r] of i) e === E.Error && (n = !1, this.logService.error(this.formatMessage(t.location, r)));
			return e.isValid = n, e.validations = [...e.validations, ...i], e;
		}
		async scanExtensionManifest(e) {
			let t = G(e, "package.json"), n;
			try {
				n = await this.extensionResourceLoaderService.readExtensionResource(t);
			} catch (n) {
				throw w(n) !== H.FILE_NOT_FOUND && this.logService.error(this.formatMessage(e, r(1882, "Cannot read file {0}: {1}.", t.path, n.message))), n;
			}
			let i;
			try {
				i = JSON.parse(n);
			} catch (i) {
				let a = [];
				W(n, a);
				for (let n of a) this.logService.error(this.formatMessage(e, r(1883, "Failed to parse {0}: [{1}, {2}] {3}.", t.path, n.offset, n.length, yt(n.error))));
				throw i;
			}
			if (_e(i) !== "object") {
				let n = this.formatMessage(e, r(1884, "Invalid manifest file {0}: Not a JSON object.", t.path));
				throw this.logService.error(n), Error(n);
			}
			return i;
		}
	}, Qn = u([
		b(0, Un),
		b(1, v),
		b(2, We),
		b(3, R),
		b(4, ct),
		b(5, fe),
		b(6, K)
	], Qn), $n = class extends Qn {
		constructor(e, t, n, r, i, a, o, c, l) {
			super(n, r, i, a, o, c, l), this.currentProfile = e, this.userDataProfilesService = t, this.cacheValidatorThrottler = this._register(new Ae(3e3)), this._onDidChangeCache = this._register(new s()), this.onDidChangeCache = this._onDidChangeCache.event;
		}
		async scanExtensions(e) {
			let t = this.getCacheFile(e), n = await this.readExtensionCache(t);
			if (this.input = e, n && n.input && Xn.equals(n.input, this.input)) return this.logService.debug("Using cached extensions scan result", e.type === X.System ? "system" : "user", e.location.toString()), this.cacheValidatorThrottler.trigger(() => this.validateCache()), n.result.map((e) => (e.location = F.revive(e.location), e));
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
					input: ge(n.input)
				};
			} catch (t) {
				w(t) !== H.FILE_NOT_FOUND && this.logService.debug("Error while reading the extension cache file:", e.path, M(t));
			}
			return null;
		}
		async writeExtensionCache(e, t) {
			try {
				await this.fileService.writeFile(e, S.fromString(JSON.stringify(t)));
			} catch (t) {
				this.logService.debug("Error while writing the extension cache file:", e.path, M(t));
			}
		}
		async validateCache() {
			if (!this.input) return;
			let e = this.getCacheFile(this.input), t = await this.readExtensionCache(e);
			if (!t) return;
			let n = t.result, r = JSON.parse(JSON.stringify(await super.scanExtensions(this.input)));
			if (!Oe(r, n)) try {
				this.logService.info("Invalidating Cache", n, r), await this.fileService.del(e), this._onDidChangeCache.fire();
			} catch (e) {
				this.logService.error(e);
			}
		}
		getCacheFile(e) {
			let t = this.getProfile(e);
			return this.uriIdentityService.extUri.joinPath(t.cacheHome, e.type === X.System ? dt : nt);
		}
		getProfile(e) {
			return e.type === X.System || !e.profile ? this.userDataProfilesService.defaultProfile : this.uriIdentityService.extUri.isEqual(e.location, this.currentProfile.extensionsResource) ? this.currentProfile : this.userDataProfilesService.profiles.find((t) => this.uriIdentityService.extUri.isEqual(e.location, t.extensionsResource)) ?? this.currentProfile;
		}
	}, $n = u([
		b(1, Pe),
		b(2, Un),
		b(3, v),
		b(4, We),
		b(5, R),
		b(6, ct),
		b(7, fe),
		b(8, K)
	], $n);
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/l10n.js
function tr(e) {
	return ir[e];
}
function nr() {
	return ar;
}
function rr() {
	return or;
}
var ir, ar, or, sr = e((() => {
	C(), ir = {};
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/extensions.js
function cr(e) {
	mr = e;
}
function lr(e) {
	hr = e;
}
function ur(e, t, n, r) {
	let i = new Te();
	i.add(A.registerStaticBrowserUri(G(e, t), F.parse(n)));
	let a = typeof r == "string" ? { mimeType: r } : r;
	return i.add($e(new it(G(e, t), n, a))), i;
}
function dr() {
	return vr;
}
function fr(e) {
	return _r.get(e);
}
function pr(e, t, { path: n = "/extension", system: r = !1, readmePath: i, changelogPath: a } = {}) {
	let o = Ft(e.publisher, e.name), s = F.from({
		scheme: ft.extensionFile,
		authority: o,
		path: n
	}), c = ot(), l = {
		manifest: e,
		type: r ? X.System : X.User,
		isBuiltin: !0,
		identifier: { id: o },
		location: s,
		targetPlatform: st.WEB,
		isValid: !0,
		validations: [],
		readmeUrl: i == null ? void 0 : F.joinPath(s, i),
		changelogUrl: a == null ? void 0 : F.joinPath(s, a),
		preRelease: !1
	};
	t != null && _r.set(o, t), !ze && t !== Q.Remote ? vr.push(l) : c = c.then(async () => {
		let r = B.get(ce), i = B.get(cn), a = B.get(qe);
		if (i.isEnabled(l) && a.canAddExtension(Jt(l, !1))) {
			let i = B.get(Me).remoteAuthority, a = s;
			t === Q.Remote && (a = F.from({
				scheme: q.vscodeRemote,
				authority: i,
				path: n
			}));
			let o = r.createInstance(Zn), c = {
				devMode: !1,
				language: U,
				pseudo: U === "pseudo",
				translations: tr(U) ?? {}
			}, u = {
				...l,
				manifest: await o.translateManifest(a, e, c)
			};
			await gr({
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
			await ot();
			let e = B.get(cn);
			return await c, e.isEnabled(l);
		},
		async dispose() {
			await c, vr.indexOf(l) >= 0 && vr.splice(vr.indexOf(l), 1), _r.delete(o), await gr({
				toAdd: [],
				toRemove: [l]
			});
		}
	};
	if (t !== Q.Remote) {
		function e(e, t, n) {
			return ur(s, e, t, n);
		}
		u = {
			...u,
			registerFileUrl: e
		};
	}
	if (t === Q.LocalProcess) {
		async function e() {
			if (await c, mr == null) throw Error("The local api can't be used without registering the local extension host by importing `vscode/localExtensionHost`");
			return await mr(o);
		}
		u = {
			...u,
			getApi: e,
			async setAsDefaultApi() {
				hr?.(await e());
			}
		};
	}
	return u;
}
var mr, hr, gr, _r, vr, yr, br = e((() => {
	Ye(), Ke(), P(), Ut(), J(), D(), j(), _n(), Ne(), V(), o(), d(), un(), Ee(), er(), xe(), ut(), Ze(), Le(), sr(), rn(), gr = Ie(async ({ toAdd: e, toRemove: t }) => {
		await ot(), await B.get(qe).deltaExtensions(e, t);
	}, (e, t) => ({
		toAdd: [...e.toAdd, ...t.toAdd],
		toRemove: [...e.toRemove, ...t.toRemove]
	}), 0), _r = /* @__PURE__ */ new Map(), vr = [], yr = rr(), yr != null && pr(yr, Q.LocalWebWorker, { system: !0 });
}));
//#endregion
export { Mt as $, cn as A, Kt as B, $ as C, _n as D, fn as E, Qt as F, Jt as G, Gt as H, Zt as I, Lt as J, Z as K, en as L, un as M, tn as N, on as O, $t as P, At as Q, Xt as R, Q as S, dn as T, Yt as U, rn as V, qt as W, Ut as X, Pt as Y, Bt as Z, Dn as _, pr as a, St as at, wn as b, nr as c, er as d, Ot as et, qn as f, In as g, Wn as h, lr as i, Nt as it, sn as j, ln as k, sr as l, Un as m, fr as n, wt as nt, cr as o, xt as ot, Gn as p, Ft as q, br as r, Ct as rt, tr as s, dr as t, Dt as tt, Zn as u, En as v, pn as w, Cn as x, kn as y, nn as z };
