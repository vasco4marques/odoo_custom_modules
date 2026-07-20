import { a as e, n as t } from "./rolldown-runtime-B1bRi_D7.js";
import { $A as n, $T as r, $b as i, $g as a, $j as o, $k as s, $u as c, AA as l, AO as u, Ax as d, Ay as f, BA as p, BD as ee, Bb as te, Bd as ne, Bk as re, Bp as ie, Bt as ae, Bu as m, CA as oe, CM as se, Ca as ce, Cb as le, Cj as ue, Co as de, Cx as fe, DN as h, Do as pe, Du as me, Dx as he, Dy as ge, Ex as _e, Ey as ve, FA as g, FT as ye, Ft as be, GE as _, GT as xe, Gx as Se, HE as v, HT as y, Hi as Ce, Hk as we, Ht as Te, Hu as Ee, Hx as De, IA as Oe, IO as ke, IT as Ae, Ih as je, It as Me, Iu as Ne, Ix as b, Iy as Pe, JE as Fe, JT as Ie, Jh as Le, Ji as Re, Jj as ze, Ju as Be, KA as x, KT as Ve, Ki as He, Kx as Ue, LE as We, LT as Ge, Lb as Ke, Lt as qe, Ly as S, MA as Je, MO as Ye, MT as Xe, Md as Ze, Mx as Qe, My as $e, NE as et, NO as tt, Nb as nt, Nd as rt, Ni as it, Nx as C, OE as at, ON as w, Ou as ot, Ox as st, Oy as ct, PA as lt, PT as T, Pb as ut, Pu as dt, Px as E, QE as ft, QO as pt, QT as mt, Qb as ht, Qk as D, Qu as gt, Ri as _t, Rk as vt, Rp as yt, Rt as bt, Rx as xt, SA as St, SE as Ct, Sb as wt, Sh as Tt, Sx as O, UT as Et, Ud as Dt, Ug as Ot, Ui as kt, Ut as At, VA as jt, Vd as Mt, Vt as Nt, Vu as Pt, WE as Ft, WT as It, Wk as Lt, Wt as Rt, Wx as zt, XA as Bt, XE as k, XO as Vt, XT as Ht, Xa as Ut, Xb as Wt, Xi as Gt, Xu as Kt, YO as qt, YT as Jt, Yh as Yt, Yu as Xt, Yy as Zt, ZA as Qt, ZD as $t, ZE as en, ZT as tn, Za as nn, Zi as rn, Zu as an, _h as on, _j as sn, _x as A, aE as cn, ad as ln, ax as un, bc as dn, bd as fn, bj as pn, bx as mn, cd as hn, cj as j, cx as gn, dD as _n, dE as vn, dN as yn, dd as bn, dh as xn, dx as M, eA as Sn, eE as Cn, ed as wn, fh as Tn, fp as En, fx as Dn, gA as On, gD as kn, gN as An, gj as jn, gr as Mn, gv as Nn, gx as Pn, hD as Fn, hN as In, hd as Ln, hj as N, hr as Rn, hx as P, iE as zn, iN as Bn, id as Vn, ij as Hn, ix as Un, jA as Wn, jT as Gn, jk as Kn, jx as qn, jy as Jn, kN as F, kk as Yn, ko as Xn, kx as Zn, ky as Qn, lA as $n, lM as er, lN as tr, l_ as nr, lh as rr, ls as ir, mE as ar, mN as or, mx as sr, n as cr, nj as I, nx as lr, oD as ur, od as dr, pA as fr, pE as pr, ph as mr, px as L, qD as hr, qE as gr, qT as _r, qi as vr, r as yr, rN as br, rd as xr, rp as Sr, rx as Cr, sd as wr, sx as R, tD as z, tp as Tr, tx as Er, uD as B, uj as V, up as Dr, us as Or, ux as H, vE as kr, vr as Ar, vv as jr, vx as U, wA as Mr, wa as Nr, wb as Pr, wo as Fr, wu as Ir, wx as Lr, wy as Rr, xb as zr, xc as Br, xx as Vr, yA as Hr, y_ as Ur, yh as Wr, yr as Gr, yx as W, zb as Kr, zd as qr, zt as Jr, zx as Yr, zy as Xr } from "./standaloneServices-DUdtGggg.js";
import { $t as Zr, B as Qr, D as $r, E as ei, F as ti, G as ni, Gt as ri, H as ii, I as ai, Kt as oi, L as si, Lt as ci, M as li, N as ui, Ot as di, P as fi, Pt as pi, R as mi, St as hi, T as gi, U as _i, V as vi, a as yi, at as bi, bt as xi, c as Si, ct as Ci, d as wi, f as Ti, g as Ei, h as Di, i as Oi, jt as ki, l as Ai, n as G, o as ji, ot as Mi, r as Ni, s as Pi, st as Fi, t as Ii, u as Li, vt as Ri, x as zi, xt as Bi, y as Vi, yt as Hi, z as Ui } from "./textfiles-GCUcfhe8.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/base/common/policy.js
var Wi, Gi = t((() => {
	D(), (function(e) {
		e.Extensions = "Extensions", e.IntegratedTerminal = "IntegratedTerminal", e.InteractiveSession = "InteractiveSession", e.Telemetry = "Telemetry", e.Update = "Update";
	})(Wi ||= {});
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/remote/common/remoteHosts.js
function Ki(e) {
	return e.scheme === B.vscodeRemote ? e.authority : void 0;
}
function qi(e) {
	if (!e) return;
	let t = e.indexOf("+");
	return t < 0 ? e : e.substr(0, t);
}
var Ji = t((() => {
	_n();
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensions/common/extensions.js
function Yi(e, t) {
	if (t) {
		let n = `onResolveRemoteAuthority:${qi(t)}`;
		return !!e.activationEvents?.includes(n);
	}
	return !1;
}
function Xi(e) {
	return e.map((e) => {
		let [t, n] = e.split("@");
		return {
			proposalName: t,
			version: n ? parseInt(n) : void 0
		};
	});
}
function Zi(e) {
	return e.map((e) => e.split("@")[0]);
}
var Qi, $i, ea, ta, na, ra, K, q, ia, aa, oa, sa = t((() => {
	$t(), Ji(), Qi = "extensions.user.cache", $i = "extensions.builtin.cache", ea = "undefined_publisher", ta = [
		"ui",
		"workspace",
		"web"
	], na = [
		"AI",
		"Azure",
		"Chat",
		"Data Science",
		"Debuggers",
		"Extension Packs",
		"Education",
		"Formatters",
		"Keymaps",
		"Language Packs",
		"Linters",
		"Machine Learning",
		"Notebooks",
		"Programming Languages",
		"SCM Providers",
		"Snippets",
		"Testing",
		"Themes",
		"Visualization",
		"Other"
	], (function(e) {
		e[e.System = 0] = "System", e[e.User = 1] = "User";
	})(ra ||= {}), (function(e) {
		e.WIN32_X64 = "win32-x64", e.WIN32_ARM64 = "win32-arm64", e.LINUX_X64 = "linux-x64", e.LINUX_ARM64 = "linux-arm64", e.LINUX_ARMHF = "linux-armhf", e.ALPINE_X64 = "alpine-x64", e.ALPINE_ARM64 = "alpine-arm64", e.DARWIN_X64 = "darwin-x64", e.DARWIN_ARM64 = "darwin-arm64", e.WEB = "web", e.UNIVERSAL = "universal", e.UNKNOWN = "unknown", e.UNDEFINED = "undefined";
	})(K ||= {}), q = class {
		constructor(e) {
			this.value = e, this._lower = e.toLowerCase();
		}
		static equals(e, t) {
			return e == null ? t == null : t == null ? !1 : typeof e == "string" || typeof t == "string" ? ee(typeof e == "string" ? e : e.value, typeof t == "string" ? t : t.value) : e._lower === t._lower;
		}
		static toKey(e) {
			return typeof e == "string" ? e.toLowerCase() : e._lower;
		}
	}, ia = class {
		get size() {
			return this._set.size;
		}
		constructor(e) {
			if (this._set = /* @__PURE__ */ new Set(), e) for (let t of e) this.add(t);
		}
		add(e) {
			this._set.add(q.toKey(e));
		}
		delete(e) {
			return this._set.delete(q.toKey(e));
		}
		has(e) {
			return this._set.has(q.toKey(e));
		}
	}, aa = class {
		constructor() {
			this._map = /* @__PURE__ */ new Map();
		}
		clear() {
			this._map.clear();
		}
		delete(e) {
			this._map.delete(q.toKey(e));
		}
		get(e) {
			return this._map.get(q.toKey(e));
		}
		has(e) {
			return this._map.has(q.toKey(e));
		}
		set(e, t) {
			this._map.set(q.toKey(e), t);
		}
		values() {
			return this._map.values();
		}
		forEach(e) {
			this._map.forEach(e);
		}
		[Symbol.iterator]() {
			return this._map[Symbol.iterator]();
		}
	}, oa = class extends Error {
		constructor(e, t, n) {
			super(`Error in extension ${q.toKey(e)}: ${n ?? t.message}`, { cause: t }), this.name = "ExtensionError", this.extension = e;
		}
	};
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/extensionManagement/common/extensionManagement.js
function ca(e, t) {
	switch (e) {
		case Yn.Windows: return t === "x64" ? K.WIN32_X64 : t === "arm64" ? K.WIN32_ARM64 : K.UNKNOWN;
		case Yn.Linux: return t === "x64" ? K.LINUX_X64 : t === "arm64" ? K.LINUX_ARM64 : t === "arm" ? K.LINUX_ARMHF : K.UNKNOWN;
		case "alpine": return t === "x64" ? K.ALPINE_X64 : t === "arm64" ? K.ALPINE_ARM64 : K.UNKNOWN;
		case Yn.Mac: return t === "x64" ? K.DARWIN_X64 : t === "arm64" ? K.DARWIN_ARM64 : K.UNKNOWN;
		case Yn.Web: return K.WEB;
	}
}
function la(e) {
	let t = e;
	return !!t && typeof t == "object" && typeof t.id == "string" && (!t.uuid || typeof t.uuid == "string");
}
var ua, da, fa, pa, ma, ha, ga, _a, va, ya, ba, xa, Sa = t((() => {
	Kn(), Gi(), D(), Zt(), sa(), b(), Ue(), ua = "^([a-z0-9A-Z][a-z0-9-A-Z]*)\\.([a-z0-9A-Z][a-z0-9-A-Z]*)$", da = new RegExp(ua), (function(e) {
		e.COMMAND = "command", e.SETTINGS_SYNC = "settingsSync";
	})(fa ||= {}), (function(e) {
		e.NoneOrRelevance = "NoneOrRelevance", e.LastUpdatedDate = "LastUpdatedDate", e.Title = "Title", e.PublisherName = "PublisherName", e.InstallCount = "InstallCount", e.PublishedDate = "PublishedDate", e.AverageRating = "AverageRating", e.WeightedRating = "WeightedRating";
	})(pa ||= {}), (function(e) {
		e[e.Default = 0] = "Default", e[e.Ascending = 1] = "Ascending", e[e.Descending = 2] = "Descending";
	})(ma ||= {}), (function(e) {
		e.Category = "Category", e.ExtensionId = "ExtensionId", e.ExtensionName = "ExtensionName", e.ExcludeWithFlags = "ExcludeWithFlags", e.Featured = "Featured", e.SearchText = "SearchText", e.Tag = "Tag", e.Target = "Target";
	})(ha ||= {}), (function(e) {
		e.Install = "install", e.Uninstall = "uninstall";
	})(ga ||= {}), (function(e) {
		e[e.None = 1] = "None", e[e.Install = 2] = "Install", e[e.Update = 3] = "Update", e[e.Migrate = 4] = "Migrate";
	})(_a ||= {}), (function(e) {
		e.Timeout = "Timeout", e.Cancelled = "Cancelled", e.ClientError = "ClientError", e.ServerError = "ServerError", e.Failed = "Failed", e.DownloadFailedWriting = "DownloadFailedWriting", e.Offline = "Offline";
	})(va ||= {}), (function(e) {
		e.NotFound = "NotFound", e.Unsupported = "Unsupported", e.Deprecated = "Deprecated", e.Malicious = "Malicious", e.Incompatible = "Incompatible", e.IncompatibleApi = "IncompatibleApi", e.IncompatibleTargetPlatform = "IncompatibleTargetPlatform", e.ReleaseVersionNotFound = "ReleaseVersionNotFound", e.Invalid = "Invalid", e.Download = "Download", e.DownloadSignature = "DownloadSignature", e.DownloadFailedWriting = "DownloadFailedWriting", e.UpdateMetadata = "UpdateMetadata", e.Extract = "Extract", e.Scanning = "Scanning", e.ScanningExtension = "ScanningExtension", e.ReadRemoved = "ReadRemoved", e.UnsetRemoved = "UnsetRemoved", e.Delete = "Delete", e.Rename = "Rename", e.IntializeDefaultProfile = "IntializeDefaultProfile", e.AddToProfile = "AddToProfile", e.InstalledExtensionNotFound = "InstalledExtensionNotFound", e.PostInstall = "PostInstall", e.CorruptZip = "CorruptZip", e.IncompleteZip = "IncompleteZip", e.PackageNotSigned = "PackageNotSigned", e.SignatureVerificationInternal = "SignatureVerificationInternal", e.SignatureVerificationFailed = "SignatureVerificationFailed", e.NotAllowed = "NotAllowed", e.Gallery = "Gallery", e.Cancelled = "Cancelled", e.Unknown = "Unknown", e.Internal = "Internal";
	})(ya ||= {}), (function(e) {
		e.NotSigned = "NotSigned", e.Success = "Success", e.RequiredArgumentMissing = "RequiredArgumentMissing", e.InvalidArgument = "InvalidArgument", e.PackageIsUnreadable = "PackageIsUnreadable", e.UnhandledException = "UnhandledException", e.SignatureManifestIsMissing = "SignatureManifestIsMissing", e.SignatureManifestIsUnreadable = "SignatureManifestIsUnreadable", e.SignatureIsMissing = "SignatureIsMissing", e.SignatureIsUnreadable = "SignatureIsUnreadable", e.CertificateIsUnreadable = "CertificateIsUnreadable", e.SignatureArchiveIsUnreadable = "SignatureArchiveIsUnreadable", e.FileAlreadyExists = "FileAlreadyExists", e.SignatureArchiveIsInvalidZip = "SignatureArchiveIsInvalidZip", e.SignatureArchiveHasSameSignatureFile = "SignatureArchiveHasSameSignatureFile", e.PackageIntegrityCheckFailed = "PackageIntegrityCheckFailed", e.SignatureIsInvalid = "SignatureIsInvalid", e.SignatureManifestIsInvalid = "SignatureManifestIsInvalid", e.SignatureIntegrityCheckFailed = "SignatureIntegrityCheckFailed", e.EntryIsMissing = "EntryIsMissing", e.EntryIsTampered = "EntryIsTampered", e.Untrusted = "Untrusted", e.CertificateRevoked = "CertificateRevoked", e.SignatureIsNotValid = "SignatureIsNotValid", e.UnknownError = "UnknownError", e.PackageIsInvalidZip = "PackageIsInvalidZip", e.SignatureArchiveHasTooManyEntries = "SignatureArchiveHasTooManyEntries";
	})(ba ||= {}), Sn(1829, "Extensions"), Sn(1830, "Preferences"), xa = "extensions.allowed", Se.as(Xr.Configuration).registerConfiguration({
		id: "extensions",
		order: 30,
		title: s(1831, "Extensions"),
		type: "object",
		properties: { [xa]: {
			type: "object",
			markdownDescription: s(1832, "Specify a list of extensions that are allowed to use. This helps maintain a secure and consistent development environment by restricting the use of unauthorized extensions. For more information on how to configure this setting, please visit the [Configure Allowed Extensions](https://code.visualstudio.com/docs/setup/enterprise#_configure-allowed-extensions) section."),
			default: "*",
			defaultSnippets: [{
				body: {},
				description: s(1833, "No extensions are allowed.")
			}, {
				body: { "*": !0 },
				description: s(1834, "All extensions are allowed.")
			}],
			scope: S.APPLICATION,
			policy: {
				name: "AllowedExtensions",
				category: Wi.Extensions,
				minimumVersion: "1.96",
				localization: { description: {
					key: "extensions.allowed.policy",
					value: s(1835, "Specify a list of extensions that are allowed to use. This helps maintain a secure and consistent development environment by restricting the use of unauthorized extensions. More information: https://code.visualstudio.com/docs/setup/enterprise#_configure-allowed-extensions")
				} }
			},
			additionalProperties: !1,
			patternProperties: {
				"([a-z0-9A-Z][a-z0-9-A-Z]*)\\.([a-z0-9A-Z][a-z0-9-A-Z]*)$": { anyOf: [{
					type: ["boolean", "string"],
					enum: [
						!0,
						!1,
						"stable"
					],
					description: s(1836, "Allow or disallow the extension."),
					enumDescriptions: [
						s(1837, "Extension is allowed."),
						s(1838, "Extension is not allowed."),
						s(1839, "Allow only stable versions of the extension.")
					]
				}, {
					type: "array",
					items: { type: "string" },
					description: s(1840, "Allow or disallow specific versions of the extension. To specifcy a platform specific version, use the format `platform@1.2.3`, e.g. `win32-x64@1.2.3`. Supported platforms are `win32-x64`, `win32-arm64`, `linux-x64`, `linux-arm64`, `linux-armhf`, `alpine-x64`, `alpine-arm64`, `darwin-x64`, `darwin-arm64`")
				}] },
				"([a-z0-9A-Z][a-z0-9-A-Z]*)$": {
					type: ["boolean", "string"],
					enum: [
						!0,
						!1,
						"stable"
					],
					description: s(1841, "Allow or disallow all extensions from the publisher."),
					enumDescriptions: [
						s(1842, "All extensions from the publisher are allowed."),
						s(1843, "All extensions from the publisher are not allowed."),
						s(1844, "Allow only stable versions of the extensions from the publisher.")
					]
				},
				"\\*": {
					type: "boolean",
					enum: [!0, !1],
					description: s(1845, "Allow or disallow all extensions."),
					enumDescriptions: [s(1846, "Allow all extensions."), s(1847, "Disallow all extensions.")]
				}
			}
		} }
	});
})), Ca, wa, Ta = t((() => {
	or(), sa(), Ca = class {
		constructor() {
			this._generators = /* @__PURE__ */ new Map(), this._cache = /* @__PURE__ */ new WeakMap();
		}
		register(e, t) {
			this._generators.set(e, t);
		}
		readActivationEvents(e) {
			return this._cache.has(e) || this._cache.set(e, this._readActivationEvents(e)), this._cache.get(e);
		}
		createActivationEventsMap(e) {
			let t = Object.create(null);
			for (let n of e) {
				let e = this.readActivationEvents(n);
				e.length > 0 && (t[q.toKey(n.identifier)] = e);
			}
			return t;
		}
		_readActivationEvents(e) {
			if (e.main === void 0 && e.browser === void 0) return [];
			let t = Array.isArray(e.activationEvents) ? e.activationEvents.slice(0) : [];
			for (let n = 0; n < t.length; n++) t[n] === "onUri" && (t[n] = `onUri:${q.toKey(e.identifier)}`);
			if (!e.contributes) return t;
			for (let n in e.contributes) {
				let r = this._generators.get(n);
				if (!r) continue;
				let i = e.contributes[n], a = Array.isArray(i) ? i : [i];
				try {
					t.push(...r(a));
				} catch (e) {
					An(e);
				}
			}
			return t;
		}
	}, wa = new Ca();
})), Ea, Da = t((() => {
	g(), Ea = lt("extensionService");
})), Oa, ka = t((() => {
	g(), Oa = lt("productService");
})), Aa, ja = t((() => {
	Aa = Object.freeze({
		activeComment: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.activeComment.d.ts" },
		aiRelatedInformation: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.aiRelatedInformation.d.ts" },
		aiSettingsSearch: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.aiSettingsSearch.d.ts" },
		aiTextSearchProvider: {
			proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.aiTextSearchProvider.d.ts",
			version: 2
		},
		authIssuers: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.authIssuers.d.ts" },
		authLearnMore: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.authLearnMore.d.ts" },
		authProviderSpecific: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.authProviderSpecific.d.ts" },
		authSession: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.authSession.d.ts" },
		authenticationChallenges: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.authenticationChallenges.d.ts" },
		canonicalUriProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.canonicalUriProvider.d.ts" },
		chatContextProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatContextProvider.d.ts" },
		chatEditing: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatEditing.d.ts" },
		chatOutputRenderer: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatOutputRenderer.d.ts" },
		chatParticipantAdditions: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatParticipantAdditions.d.ts" },
		chatParticipantPrivate: {
			proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatParticipantPrivate.d.ts",
			version: 11
		},
		chatProvider: {
			proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatProvider.d.ts",
			version: 4
		},
		chatReferenceBinaryData: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatReferenceBinaryData.d.ts" },
		chatReferenceDiagnostic: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatReferenceDiagnostic.d.ts" },
		chatSessionsProvider: {
			proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts",
			version: 3
		},
		chatStatusItem: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatStatusItem.d.ts" },
		chatTab: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.chatTab.d.ts" },
		codeActionAI: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.codeActionAI.d.ts" },
		codeActionRanges: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.codeActionRanges.d.ts" },
		codiconDecoration: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.codiconDecoration.d.ts" },
		commentReactor: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.commentReactor.d.ts" },
		commentReveal: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.commentReveal.d.ts" },
		commentThreadApplicability: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.commentThreadApplicability.d.ts" },
		commentingRangeHint: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.commentingRangeHint.d.ts" },
		commentsDraftState: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.commentsDraftState.d.ts" },
		contribAccessibilityHelpContent: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribAccessibilityHelpContent.d.ts" },
		contribCommentEditorActionsMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribCommentEditorActionsMenu.d.ts" },
		contribCommentPeekContext: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribCommentPeekContext.d.ts" },
		contribCommentThreadAdditionalMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribCommentThreadAdditionalMenu.d.ts" },
		contribCommentsViewThreadMenus: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribCommentsViewThreadMenus.d.ts" },
		contribDebugCreateConfiguration: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribDebugCreateConfiguration.d.ts" },
		contribDiffEditorGutterToolBarMenus: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribDiffEditorGutterToolBarMenus.d.ts" },
		contribEditSessions: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribEditSessions.d.ts" },
		contribEditorContentMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribEditorContentMenu.d.ts" },
		contribLabelFormatterWorkspaceTooltip: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribLabelFormatterWorkspaceTooltip.d.ts" },
		contribLanguageModelToolSets: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribLanguageModelToolSets.d.ts" },
		contribMenuBarHome: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribMenuBarHome.d.ts" },
		contribMergeEditorMenus: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribMergeEditorMenus.d.ts" },
		contribMultiDiffEditorMenus: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribMultiDiffEditorMenus.d.ts" },
		contribNotebookStaticPreloads: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribNotebookStaticPreloads.d.ts" },
		contribRemoteHelp: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribRemoteHelp.d.ts" },
		contribShareMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribShareMenu.d.ts" },
		contribSourceControlArtifactGroupMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribSourceControlArtifactGroupMenu.d.ts" },
		contribSourceControlArtifactMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribSourceControlArtifactMenu.d.ts" },
		contribSourceControlHistoryItemMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribSourceControlHistoryItemMenu.d.ts" },
		contribSourceControlHistoryTitleMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribSourceControlHistoryTitleMenu.d.ts" },
		contribSourceControlInputBoxMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribSourceControlInputBoxMenu.d.ts" },
		contribSourceControlTitleMenu: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribSourceControlTitleMenu.d.ts" },
		contribStatusBarItems: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribStatusBarItems.d.ts" },
		contribViewContainerTitle: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribViewContainerTitle.d.ts" },
		contribViewsRemote: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribViewsRemote.d.ts" },
		contribViewsWelcome: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.contribViewsWelcome.d.ts" },
		customEditorMove: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.customEditorMove.d.ts" },
		dataChannels: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.dataChannels.d.ts" },
		debugVisualization: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.debugVisualization.d.ts" },
		defaultChatParticipant: {
			proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.defaultChatParticipant.d.ts",
			version: 4
		},
		devDeviceId: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.devDeviceId.d.ts" },
		diffCommand: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.diffCommand.d.ts" },
		diffContentOptions: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.diffContentOptions.d.ts" },
		documentFiltersExclusive: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.documentFiltersExclusive.d.ts" },
		editSessionIdentityProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.editSessionIdentityProvider.d.ts" },
		editorHoverVerbosityLevel: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.editorHoverVerbosityLevel.d.ts" },
		editorInsets: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.editorInsets.d.ts" },
		embeddings: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.embeddings.d.ts" },
		extensionRuntime: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.extensionRuntime.d.ts" },
		extensionsAny: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.extensionsAny.d.ts" },
		externalUriOpener: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.externalUriOpener.d.ts" },
		fileSearchProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.fileSearchProvider.d.ts" },
		fileSearchProvider2: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.fileSearchProvider2.d.ts" },
		findFiles2: {
			proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.findFiles2.d.ts",
			version: 2
		},
		findTextInFiles: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.findTextInFiles.d.ts" },
		findTextInFiles2: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.findTextInFiles2.d.ts" },
		fsChunks: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.fsChunks.d.ts" },
		inlineCompletionsAdditions: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.inlineCompletionsAdditions.d.ts" },
		interactive: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.interactive.d.ts" },
		interactiveWindow: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.interactiveWindow.d.ts" },
		ipc: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.ipc.d.ts" },
		languageModelCapabilities: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.languageModelCapabilities.d.ts" },
		languageModelProxy: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.languageModelProxy.d.ts" },
		languageModelSystem: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.languageModelSystem.d.ts" },
		languageModelThinkingPart: {
			proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.languageModelThinkingPart.d.ts",
			version: 1
		},
		languageModelToolResultAudience: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.languageModelToolResultAudience.d.ts" },
		languageStatusText: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.languageStatusText.d.ts" },
		mappedEditsProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.mappedEditsProvider.d.ts" },
		markdownAlertSyntax: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.markdownAlertSyntax.d.ts" },
		mcpToolDefinitions: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.mcpToolDefinitions.d.ts" },
		multiDocumentHighlightProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.multiDocumentHighlightProvider.d.ts" },
		nativeWindowHandle: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.nativeWindowHandle.d.ts" },
		newSymbolNamesProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.newSymbolNamesProvider.d.ts" },
		notebookCellExecution: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookCellExecution.d.ts" },
		notebookControllerAffinityHidden: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookControllerAffinityHidden.d.ts" },
		notebookDeprecated: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookDeprecated.d.ts" },
		notebookExecution: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookExecution.d.ts" },
		notebookKernelSource: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookKernelSource.d.ts" },
		notebookLiveShare: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookLiveShare.d.ts" },
		notebookMessaging: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookMessaging.d.ts" },
		notebookMime: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookMime.d.ts" },
		notebookReplDocument: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookReplDocument.d.ts" },
		notebookVariableProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.notebookVariableProvider.d.ts" },
		portsAttributes: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.portsAttributes.d.ts" },
		profileContentHandlers: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.profileContentHandlers.d.ts" },
		quickDiffProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.quickDiffProvider.d.ts" },
		quickInputButtonLocation: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.quickInputButtonLocation.d.ts" },
		quickPickItemTooltip: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.quickPickItemTooltip.d.ts" },
		quickPickSortByLabel: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.quickPickSortByLabel.d.ts" },
		remoteCodingAgents: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.remoteCodingAgents.d.ts" },
		resolvers: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.resolvers.d.ts" },
		scmActionButton: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.scmActionButton.d.ts" },
		scmArtifactProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.scmArtifactProvider.d.ts" },
		scmHistoryProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.scmHistoryProvider.d.ts" },
		scmMultiDiffEditor: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.scmMultiDiffEditor.d.ts" },
		scmProviderOptions: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.scmProviderOptions.d.ts" },
		scmSelectedProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.scmSelectedProvider.d.ts" },
		scmTextDocument: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.scmTextDocument.d.ts" },
		scmValidation: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.scmValidation.d.ts" },
		shareProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.shareProvider.d.ts" },
		speech: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.speech.d.ts" },
		statusBarItemTooltip: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.statusBarItemTooltip.d.ts" },
		tabInputMultiDiff: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.tabInputMultiDiff.d.ts" },
		tabInputTextMerge: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.tabInputTextMerge.d.ts" },
		taskExecutionTerminal: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.taskExecutionTerminal.d.ts" },
		taskPresentationGroup: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.taskPresentationGroup.d.ts" },
		taskProblemMatcherStatus: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.taskProblemMatcherStatus.d.ts" },
		telemetry: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.telemetry.d.ts" },
		terminalCompletionProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.terminalCompletionProvider.d.ts" },
		terminalDataWriteEvent: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.terminalDataWriteEvent.d.ts" },
		terminalDimensions: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.terminalDimensions.d.ts" },
		terminalExecuteCommandEvent: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.terminalExecuteCommandEvent.d.ts" },
		terminalQuickFixProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.terminalQuickFixProvider.d.ts" },
		terminalSelection: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.terminalSelection.d.ts" },
		terminalShellEnv: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.terminalShellEnv.d.ts" },
		testObserver: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.testObserver.d.ts" },
		testRelatedCode: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.testRelatedCode.d.ts" },
		textDocumentChangeReason: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.textDocumentChangeReason.d.ts" },
		textEditorDiffInformation: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.textEditorDiffInformation.d.ts" },
		textSearchComplete2: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.textSearchComplete2.d.ts" },
		textSearchProvider: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.textSearchProvider.d.ts" },
		textSearchProvider2: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.textSearchProvider2.d.ts" },
		timeline: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.timeline.d.ts" },
		tokenInformation: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.tokenInformation.d.ts" },
		toolProgress: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.toolProgress.d.ts" },
		treeItemMarkdownLabel: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.treeItemMarkdownLabel.d.ts" },
		treeViewActiveItem: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.treeViewActiveItem.d.ts" },
		treeViewMarkdownMessage: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.treeViewMarkdownMessage.d.ts" },
		treeViewReveal: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.treeViewReveal.d.ts" },
		tunnelFactory: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.tunnelFactory.d.ts" },
		tunnels: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.tunnels.d.ts" },
		valueSelectionInQuickPick: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.valueSelectionInQuickPick.d.ts" },
		workspaceTrust: { proposal: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.workspaceTrust.d.ts" }
	});
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/workspace/common/virtualWorkspace.js
function Ma(e) {
	return e.scheme !== B.file && e.scheme !== B.vscodeRemote;
}
function Na(e) {
	if (e.folders.length) return e.folders.every((e) => Ma(e.uri)) ? e.folders[0].uri : void 0;
	if (e.configuration && Ma(e.configuration)) return e.configuration;
}
function Pa(e) {
	return Na(e)?.scheme;
}
function Fa(e) {
	return Na(e) !== void 0;
}
var Ia = t((() => {
	_n();
})), La, Ra = t((() => {
	g(), La = lt("extensionResourceLoaderService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-files-service-override/vscode/src/vs/platform/files/common/io.js
async function za(e, t, n, r, i, a) {
	let o;
	try {
		await Ba(e, t, n, r, i, a);
	} catch (e) {
		o = e;
	} finally {
		o && i.errorTransformer && (o = i.errorTransformer(o)), o !== void 0 && n.error(o), n.end();
	}
}
async function Ba(e, t, n, r, i, a) {
	Va(a);
	let o = await e.open(t, { create: !1 });
	try {
		Va(a);
		let t = 0, s = 0, c = i && typeof i.length == "number" ? i.length : void 0, l = T.alloc(Math.min(i.bufferSize, typeof c == "number" ? c : i.bufferSize)), u = i && typeof i.position == "number" ? i.position : 0, d = 0;
		do
			s = await e.read(o, u, l.buffer, d, l.byteLength - d), u += s, d += s, t += s, typeof c == "number" && (c -= s), d === l.byteLength && (await n.write(r(l)), l = T.alloc(Math.min(i.bufferSize, typeof c == "number" ? c : i.bufferSize)), d = 0);
		while (s > 0 && (typeof c != "number" || c > 0) && Va(a) && Ha(t, i));
		if (d > 0) {
			let e = d;
			typeof c == "number" && (e = Math.min(d, c)), n.write(r(l.slice(0, e)));
		}
	} catch (e) {
		throw fe(e);
	} finally {
		await e.close(o);
	}
}
function Va(e) {
	if (e.isCancellationRequested) throw tr();
	return !0;
}
function Ha(e, t) {
	if (typeof t?.limits?.size == "number" && e > t.limits.size) throw O(s(1945, "File is too large to open"), A.FileTooLarge);
	return !0;
}
var Ua = t((() => {
	y(), or(), D(), b();
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-files-service-override/vscode/src/vs/platform/files/common/fileService.js
function Wa(e) {
	return e.scheme === B.file ? e.fsPath : e.toString(!0);
}
async function Ga(e, t, n) {
	let r = [];
	for (; !e.isEqual(n, e.dirname(n));) try {
		if (((await t.stat(n)).type & U.Directory) === 0) throw Error(s(1913, "Unable to create folder '{0}' that already exists but is not a directory", Wa(n)));
		break;
	} catch (t) {
		if (Yr(t) !== A.FileNotFound) throw t;
		r.push(e.basename(n)), n = e.dirname(n);
	}
	for (let i = r.length - 1; i >= 0; i--) {
		n = e.joinPath(n, r[i]);
		try {
			await t.mkdir(n);
		} catch (e) {
			if (Yr(e) !== A.FileExists) throw e;
		}
	}
}
var Ka, qa, Ja = t((() => {
	F(), se(), at(), y(), pt(), x(), Xe(), sn(), V(), zt(), _n(), dn(), k(), _r(), D(), b(), Ua(), Sr(), or(), qa = class extends n {
		static {
			Ka = this;
		}
		constructor(e) {
			super(), this.logService = e, this.BUFFER_SIZE = 256 * 1024, this._onDidChangeFileSystemProviderRegistrations = this._register(new p()), this.onDidChangeFileSystemProviderRegistrations = this._onDidChangeFileSystemProviderRegistrations.event, this._onWillActivateFileSystemProvider = this._register(new p()), this.onWillActivateFileSystemProvider = this._onWillActivateFileSystemProvider.event, this._onDidChangeFileSystemProviderCapabilities = this._register(new p()), this.onDidChangeFileSystemProviderCapabilities = this._onDidChangeFileSystemProviderCapabilities.event, this.provider = /* @__PURE__ */ new Map(), this._onDidRunOperation = this._register(new p()), this.onDidRunOperation = this._onDidRunOperation.event, this.internalOnDidFilesChange = this._register(new p()), this._onDidUncorrelatedFilesChange = this._register(new p()), this.onDidFilesChange = this._onDidUncorrelatedFilesChange.event, this._onDidWatchError = this._register(new p()), this.onDidWatchError = this._onDidWatchError.event, this.activeWatchers = /* @__PURE__ */ new Map(), this.writeQueue = this._register(new pr());
		}
		registerProvider(e, t) {
			if (this.provider.has(e)) throw Error(`A filesystem provider for the scheme '${e}' is already registered.`);
			Br(`code/registerFilesystem/${e}`);
			let n = new I();
			return this.provider.set(e, t), this._onDidChangeFileSystemProviderRegistrations.fire({
				added: !0,
				scheme: e,
				provider: t
			}), n.add(t.onDidChangeFile((e) => {
				let n = new gn(e, !this.isPathCaseSensitive(t));
				this.internalOnDidFilesChange.fire(n), n.hasCorrelation() || this._onDidUncorrelatedFilesChange.fire(n);
			})), typeof t.onDidWatchError == "function" && n.add(t.onDidWatchError((e) => this._onDidWatchError.fire(Error(e)))), n.add(t.onDidChangeCapabilities(() => this._onDidChangeFileSystemProviderCapabilities.fire({
				provider: t,
				scheme: e
			}))), N(() => {
				this._onDidChangeFileSystemProviderRegistrations.fire({
					added: !1,
					scheme: e,
					provider: t
				}), this.provider.delete(e), j(n);
			});
		}
		getProvider(e) {
			return this.provider.get(e);
		}
		async activateProvider(e) {
			let t = [];
			this._onWillActivateFileSystemProvider.fire({
				scheme: e,
				join(e) {
					t.push(e);
				}
			}), !this.provider.has(e) && await vn.settled(t);
		}
		async canHandleResource(e) {
			return await this.activateProvider(e.scheme), this.hasProvider(e);
		}
		hasProvider(e) {
			return this.provider.has(e.scheme);
		}
		hasCapability(e, t) {
			let n = this.provider.get(e.scheme);
			return !!(n && n.capabilities & t);
		}
		listCapabilities() {
			return jn.map(this.provider, ([e, t]) => ({
				scheme: e,
				capabilities: t.capabilities
			}));
		}
		async withProvider(e) {
			if (!en(e)) throw new M(s(1914, "Unable to resolve filesystem provider with relative file path '{0}'", this.resourceForError(e)), L.FILE_INVALID_PATH);
			await this.activateProvider(e.scheme);
			let t = this.provider.get(e.scheme);
			if (!t) {
				let t = new Bn();
				throw t.message = s(1915, "ENOPRO: No file system provider found for resource '{0}'", e.toString()), t;
			}
			return t;
		}
		async withReadProvider(e) {
			let t = await this.withProvider(e);
			if (C(t) || E(t) || qn(t)) return t;
			throw Error(`Filesystem provider for scheme '${e.scheme}' neither has FileReadWrite, FileReadStream nor FileOpenReadWriteClose capability which is needed for the read operation.`);
		}
		async withWriteProvider(e) {
			let t = await this.withProvider(e);
			if (C(t) || E(t)) return t;
			throw Error(`Filesystem provider for scheme '${e.scheme}' neither has FileReadWrite nor FileOpenReadWriteClose capability which is needed for the write operation.`);
		}
		async resolve(e, t) {
			try {
				return await this.doResolveFile(e, t);
			} catch (t) {
				throw Yr(t) === A.FileNotFound ? new M(s(1916, "Unable to resolve nonexistent file '{0}'", this.resourceForError(e)), L.FILE_NOT_FOUND) : fe(t);
			}
		}
		async doResolveFile(e, t) {
			let n = await this.withProvider(e), r = this.isPathCaseSensitive(n), i = t?.resolveTo, a = t?.resolveSingleChildDescendants, o = t?.resolveMetadata, s = await n.stat(e), c;
			return this.toFileStat(n, e, s, void 0, !!o, (t, n) => (c || (c = De.forUris(() => !r), c.set(e, !0), i && c.fill(!0, i)), c.get(t.resource) || c.findSuperstr(t.resource.with({
				query: null,
				fragment: null
			})) ? !0 : t.isDirectory && a ? n === 1 : !1));
		}
		async toFileStat(e, t, n, r, i, a) {
			let { providerExtUri: o } = this.getExtUri(e), s = {
				resource: t,
				name: o.basename(t),
				isFile: (n.type & U.File) !== 0,
				isDirectory: (n.type & U.Directory) !== 0,
				isSymbolicLink: (n.type & U.SymbolicLink) !== 0,
				mtime: n.mtime,
				ctime: n.ctime,
				size: n.size,
				readonly: !!((n.permissions ?? 0) & sr.Readonly) || !!(e.capabilities & P.Readonly),
				locked: !!((n.permissions ?? 0) & sr.Locked),
				executable: !!((n.permissions ?? 0) & sr.Executable),
				etag: Lr({
					mtime: n.mtime,
					size: n.size
				}),
				children: void 0
			};
			if (s.isDirectory && a(s, r)) {
				try {
					let n = await e.readdir(t);
					s.children = er(await vn.settled(n.map(async ([r, s]) => {
						try {
							let c = o.joinPath(t, r), l = i ? await e.stat(c) : { type: s };
							return await this.toFileStat(e, c, l, n.length, i, a);
						} catch (e) {
							return this.logService.trace(e), null;
						}
					})));
				} catch (e) {
					this.logService.trace(e), s.children = [];
				}
				return s;
			}
			return s;
		}
		async resolveAll(e) {
			return vn.settled(e.map(async (e) => {
				try {
					return {
						stat: await this.doResolveFile(e.resource, e.options),
						success: !0
					};
				} catch (e) {
					return this.logService.trace(e), {
						stat: void 0,
						success: !1
					};
				}
			}));
		}
		async stat(e) {
			let t = await this.withProvider(e), n = await t.stat(e);
			return this.toFileStat(t, e, n, void 0, !0, () => !1);
		}
		async realpath(e) {
			let t = await this.withProvider(e);
			if (Qe(t)) {
				let n = await t.realpath(e);
				return e.with({ path: n });
			}
		}
		async exists(e) {
			let t = await this.withProvider(e);
			try {
				return !!await t.stat(e);
			} catch {
				return !1;
			}
		}
		async canCreateFile(e, t) {
			try {
				await this.doValidateCreateFile(e, t);
			} catch (e) {
				return e;
			}
			return !0;
		}
		async doValidateCreateFile(e, t) {
			if (!t?.overwrite && await this.exists(e)) throw new M(s(1917, "Unable to create file '{0}' that already exists when overwrite flag is not set", this.resourceForError(e)), L.FILE_MODIFIED_SINCE, t);
		}
		async createFile(e, t = T.fromString(""), n) {
			await this.doValidateCreateFile(e, n);
			let r = await this.writeFile(e, t);
			return this._onDidRunOperation.fire(new Dn(e, H.CREATE, r)), r;
		}
		async writeFile(e, t, n) {
			let r = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(e), e), { providerExtUri: i } = this.getExtUri(r), a = n;
			if (st(r) && !a?.atomic) {
				let t = r.enforceAtomicWriteFile?.(e);
				t && (a = {
					...n,
					atomic: t
				});
			}
			try {
				let { stat: n, buffer: o } = await this.validateWriteFile(r, e, t, a);
				n || await this.mkdirp(r, i.dirname(e)), o ||= await this.peekBufferForWriting(r, t), !C(r) || E(r) && o instanceof T || E(r) && st(r) && a?.atomic ? await this.doWriteUnbuffered(r, e, a, o) : await this.doWriteBuffered(r, e, a, o instanceof T ? ye(o) : o), this._onDidRunOperation.fire(new Dn(e, H.WRITE));
			} catch (t) {
				throw new M(s(1918, "Unable to write file '{0}' ({1})", this.resourceForError(e), fe(t).toString()), xt(t), a);
			}
			return this.resolve(e, { resolveMetadata: !0 });
		}
		async peekBufferForWriting(e, t) {
			let n;
			if (E(e) && !(t instanceof T)) if (Jt(t)) {
				let e = await r(t, 3);
				n = e.ended ? T.concat(e.buffer) : e;
			} else n = mt(t, (e) => T.concat(e), 3);
			else n = t;
			return n;
		}
		async validateWriteFile(e, t, n, r) {
			let i = !!r?.unlock;
			if (i && !(e.capabilities & P.FileWriteUnlock)) throw Error(s(1919, "Unable to unlock file '{0}' because provider does not support it.", this.resourceForError(t)));
			if (r?.atomic) {
				if (!(e.capabilities & P.FileAtomicWrite)) throw Error(s(1920, "Unable to atomically write file '{0}' because provider does not support it.", this.resourceForError(t)));
				if (!(e.capabilities & P.FileReadWrite)) throw Error(s(1921, "Unable to atomically write file '{0}' because provider does not support unbuffered writes.", this.resourceForError(t)));
				if (i) throw Error(s(1922, "Unable to unlock file '{0}' because atomic write is enabled.", this.resourceForError(t)));
			}
			let a;
			try {
				a = await e.stat(t);
			} catch {
				return Object.create(null);
			}
			if ((a.type & U.Directory) !== 0) throw new M(s(1923, "Unable to write file '{0}' that is actually a directory", this.resourceForError(t)), L.FILE_IS_DIRECTORY, r);
			this.throwIfFileIsReadonly(t, a);
			let o;
			if (typeof r?.mtime == "number" && typeof r.etag == "string" && r.etag !== "" && typeof a.mtime == "number" && typeof a.size == "number" && r.mtime < a.mtime && r.etag !== Lr({
				mtime: r.mtime,
				size: a.size
			})) {
				if (o = await this.peekBufferForWriting(e, n), o instanceof T && o.byteLength === a.size) try {
					let { value: e } = await this.readFile(t, { limits: { size: a.size } });
					if (o.equals(e)) return {
						stat: a,
						buffer: o
					};
				} catch {}
				throw new M(s(1924, "File Modified Since"), L.FILE_MODIFIED_SINCE, r);
			}
			return {
				stat: a,
				buffer: o
			};
		}
		async readFile(e, t, n) {
			let r = await this.withReadProvider(e);
			return t?.atomic ? this.doReadFileAtomic(r, e, t, n) : this.doReadFile(r, e, t, n);
		}
		async doReadFileAtomic(e, t, n, r) {
			return new Promise((i, a) => {
				this.writeQueue.queueFor(t, async () => {
					try {
						i(await this.doReadFile(e, t, n, r));
					} catch (e) {
						a(e);
					}
				}, this.getExtUri(e).providerExtUri);
			});
		}
		async doReadFile(e, t, n, r) {
			let i = await this.doReadFileStream(e, t, {
				...n,
				preferUnbuffered: !0
			}, r);
			return {
				...i,
				value: await xe(i.value)
			};
		}
		async readFileStream(e, t, n) {
			let r = await this.withReadProvider(e);
			return this.doReadFileStream(r, e, t, n);
		}
		async doReadFileStream(e, t, n, r) {
			let i = new Vt(r), a = n;
			he(e) && e.enforceAtomicReadFile?.(t) && (a = {
				...n,
				atomic: !0
			});
			let o = this.validateReadFile(t, a).then((e) => e, (e) => {
				throw i.dispose(!0), e;
			}), s;
			try {
				return typeof a?.etag == "string" && a.etag !== "" && await o, s = a?.atomic && he(e) || !(C(e) || qn(e)) || E(e) && a?.preferUnbuffered ? this.readFileUnbuffered(e, t, a) : qn(e) ? this.readFileStreamed(e, t, i.token, a) : this.readFileBuffered(e, t, i.token, a), s.on("end", () => i.dispose()), s.on("error", () => i.dispose()), {
					...await o,
					value: s
				};
			} catch (e) {
				throw s && await Ve(s), this.restoreReadError(e, t, a);
			}
		}
		restoreReadError(e, t, n) {
			let r = s(1925, "Unable to read file '{0}' ({1})", this.resourceForError(t), fe(e).toString());
			return e instanceof mn ? new mn(r, e.stat, n) : e instanceof Vr ? new Vr(r, e.fileOperationResult, e.size, e.options) : new M(r, xt(e), n);
		}
		readFileStreamed(e, t, n, r = Object.create(null)) {
			return Cn(e.readFileStream(t, r, n), {
				data: (e) => e instanceof T ? e : T.wrap(e),
				error: (e) => this.restoreReadError(e, t, r)
			}, (e) => T.concat(e));
		}
		readFileBuffered(e, t, n, r = Object.create(null)) {
			let i = Et();
			return za(e, t, i, (e) => e, {
				...r,
				bufferSize: this.BUFFER_SIZE,
				errorTransformer: (e) => this.restoreReadError(e, t, r)
			}, n), i;
		}
		readFileUnbuffered(e, t, n) {
			let r = tn((e) => T.concat(e));
			return (async () => {
				try {
					let i;
					i = n?.atomic && he(e) ? await e.readFile(t, { atomic: !0 }) : await e.readFile(t), typeof n?.position == "number" && (i = i.slice(n.position)), typeof n?.length == "number" && (i = i.slice(0, n.length)), this.validateReadFileLimits(t, i.byteLength, n), r.end(T.wrap(i));
				} catch (e) {
					r.error(e), r.end();
				}
			})(), r;
		}
		async validateReadFile(e, t) {
			let n = await this.resolve(e, { resolveMetadata: !0 });
			if (n.isDirectory) throw new M(s(1926, "Unable to read file '{0}' that is actually a directory", this.resourceForError(e)), L.FILE_IS_DIRECTORY, t);
			if (typeof t?.etag == "string" && t.etag !== "" && t.etag === n.etag) throw new mn(s(1927, "File not modified since"), n, t);
			return this.validateReadFileLimits(e, n.size, t), n;
		}
		validateReadFileLimits(e, t, n) {
			if (typeof n?.limits?.size == "number" && t > n.limits.size) throw new Vr(s(1928, "Unable to read file '{0}' that is too large to open", this.resourceForError(e)), L.FILE_TOO_LARGE, t, n);
		}
		async canMove(e, t, n) {
			return this.doCanMoveCopy(e, t, "move", n);
		}
		async canCopy(e, t, n) {
			return this.doCanMoveCopy(e, t, "copy", n);
		}
		async doCanMoveCopy(e, t, n, r) {
			if (e.toString() !== t.toString()) try {
				let i = n === "move" ? this.throwIfFileSystemIsReadonly(await this.withWriteProvider(e), e) : await this.withReadProvider(e), a = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(t), t);
				await this.doValidateMoveCopy(i, e, a, t, n, r);
			} catch (e) {
				return e;
			}
			return !0;
		}
		async move(e, t, n) {
			let r = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(e), e), i = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(t), t), a = await this.doMoveCopy(r, e, i, t, "move", !!n), o = await this.resolve(t, { resolveMetadata: !0 });
			return this._onDidRunOperation.fire(new Dn(e, a === "move" ? H.MOVE : H.COPY, o)), o;
		}
		async copy(e, t, n) {
			let r = await this.withReadProvider(e), i = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(t), t), a = await this.doMoveCopy(r, e, i, t, "copy", !!n), o = await this.resolve(t, { resolveMetadata: !0 });
			return this._onDidRunOperation.fire(new Dn(e, a === "copy" ? H.COPY : H.MOVE, o)), o;
		}
		async doMoveCopy(e, t, n, r, i, a) {
			if (t.toString() === r.toString()) return i;
			let { exists: o, isSameResourceWithDifferentPathCase: s } = await this.doValidateMoveCopy(e, t, n, r, i, a);
			if (o && !s && a && await this.del(r, { recursive: !0 }), await this.mkdirp(n, this.getExtUri(n).providerExtUri.dirname(r)), i === "copy") {
				if (e === n && d(e)) await e.copy(t, r, { overwrite: a });
				else {
					let i = await this.resolve(t);
					i.isDirectory ? await this.doCopyFolder(e, i, n, r) : await this.doCopyFile(e, t, n, r);
				}
				return i;
			} else if (e === n) return await e.rename(t, r, { overwrite: a }), i;
			else return await this.doMoveCopy(e, t, n, r, "copy", a), await this.del(t, { recursive: !0 }), "copy";
		}
		async doCopyFile(e, t, n, r) {
			if (C(e) && C(n)) return this.doPipeBuffered(e, t, n, r);
			if (C(e) && E(n)) return this.doPipeBufferedToUnbuffered(e, t, n, r);
			if (E(e) && C(n)) return this.doPipeUnbufferedToBuffered(e, t, n, r);
			if (E(e) && E(n)) return this.doPipeUnbuffered(e, t, n, r);
		}
		async doCopyFolder(e, t, n, r) {
			await n.mkdir(r), Array.isArray(t.children) && await vn.settled(t.children.map(async (t) => {
				let i = this.getExtUri(n).providerExtUri.joinPath(r, t.name);
				return t.isDirectory ? this.doCopyFolder(e, await this.resolve(t.resource), n, i) : this.doCopyFile(e, t.resource, n, i);
			}));
		}
		async doValidateMoveCopy(e, t, n, r, i, a) {
			let o = !1;
			if (e === n) {
				let { providerExtUri: n, isPathCaseSensitive: a } = this.getExtUri(e);
				if (a || (o = n.isEqual(t, r)), o && i === "copy") throw Error(s(1929, "Unable to copy when source '{0}' is same as target '{1}' with different path case on a case insensitive file system", this.resourceForError(t), this.resourceForError(r)));
				if (!o && n.isEqualOrParent(r, t)) throw Error(s(1930, "Unable to move/copy when source '{0}' is parent of target '{1}'.", this.resourceForError(t), this.resourceForError(r)));
			}
			let c = await this.exists(r);
			if (c && !o) {
				if (!a) throw new M(s(1931, "Unable to move/copy '{0}' because target '{1}' already exists at destination.", this.resourceForError(t), this.resourceForError(r)), L.FILE_MOVE_CONFLICT);
				if (e === n) {
					let { providerExtUri: n } = this.getExtUri(e);
					if (n.isEqualOrParent(t, r)) throw Error(s(1932, "Unable to move/copy '{0}' into '{1}' since a file would replace the folder it is contained in.", this.resourceForError(t), this.resourceForError(r)));
				}
			}
			return {
				exists: c,
				isSameResourceWithDifferentPathCase: o
			};
		}
		getExtUri(e) {
			let t = this.isPathCaseSensitive(e);
			return {
				providerExtUri: t ? _ : gr,
				isPathCaseSensitive: t
			};
		}
		isPathCaseSensitive(e) {
			return !!(e.capabilities & P.PathCaseSensitive);
		}
		async createFolder(e) {
			let t = this.throwIfFileSystemIsReadonly(await this.withProvider(e), e);
			await this.mkdirp(t, e);
			let n = await this.resolve(e, { resolveMetadata: !0 });
			return this._onDidRunOperation.fire(new Dn(e, H.CREATE, n)), n;
		}
		async mkdirp(e, t) {
			let { providerExtUri: n } = this.getExtUri(e);
			return Ga(n, e, t);
		}
		async canDelete(e, t) {
			try {
				await this.doValidateDelete(e, t);
			} catch (e) {
				return e;
			}
			return !0;
		}
		async doValidateDelete(e, t) {
			let n = this.throwIfFileSystemIsReadonly(await this.withProvider(e), e), r = !!t?.useTrash;
			if (r && !(n.capabilities & P.Trash)) throw Error(s(1933, "Unable to delete file '{0}' via trash because provider does not support it.", this.resourceForError(e)));
			let i = t?.atomic;
			if (i && !(n.capabilities & P.FileAtomicDelete)) throw Error(s(1934, "Unable to delete file '{0}' atomically because provider does not support it.", this.resourceForError(e)));
			if (r && i) throw Error(s(1935, "Unable to atomically delete file '{0}' because using trash is enabled.", this.resourceForError(e)));
			let a;
			try {
				a = await n.stat(e);
			} catch {}
			if (a) this.throwIfFileIsReadonly(e, a);
			else throw new M(s(1936, "Unable to delete nonexistent file '{0}'", this.resourceForError(e)), L.FILE_NOT_FOUND);
			if (!t?.recursive) {
				let t = await this.resolve(e);
				if (t.isDirectory && Array.isArray(t.children) && t.children.length > 0) throw Error(s(1937, "Unable to delete non-empty folder '{0}'.", this.resourceForError(e)));
			}
			return n;
		}
		async del(e, t) {
			let n = await this.doValidateDelete(e, t), r = t;
			if (_e(n) && !r?.atomic) {
				let i = n.enforceAtomicDelete?.(e);
				i && (r = {
					...t,
					atomic: i
				});
			}
			let i = !!r?.useTrash, a = !!r?.recursive, o = r?.atomic ?? !1;
			await n.delete(e, {
				recursive: a,
				useTrash: i,
				atomic: o
			}), this._onDidRunOperation.fire(new Dn(e, H.DELETE));
		}
		async cloneFile(e, t) {
			let n = await this.withProvider(e), r = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(t), t);
			if (!(n === r && this.getExtUri(n).providerExtUri.isEqual(e, t))) return n === r && Zn(n) ? n.cloneFile(e, t) : (await this.mkdirp(r, this.getExtUri(r).providerExtUri.dirname(t)), n === r && d(n) ? this.writeQueue.queueFor(e, () => n.copy(e, t, { overwrite: !0 }), this.getExtUri(n).providerExtUri) : this.writeQueue.queueFor(e, () => this.doCopyFile(n, e, r, t), this.getExtUri(n).providerExtUri));
		}
		static {
			this.WATCHER_CORRELATION_IDS = 0;
		}
		createWatcher(e, t) {
			return this.watch(e, {
				...t,
				correlationId: Ka.WATCHER_CORRELATION_IDS++
			});
		}
		watch(e, t = {
			recursive: !1,
			excludes: []
		}) {
			let n = new I(), r = !1, i = () => {
				r = !0;
			};
			n.add(N(() => i())), (async () => {
				try {
					let n = await this.doWatch(e, t);
					r ? j(n) : i = () => j(n);
				} catch (e) {
					this.logService.error(e);
				}
			})();
			let a = t.correlationId;
			if (typeof a == "number") {
				let e = n.add(new p());
				return n.add(this.internalOnDidFilesChange.event((t) => {
					t.correlates(a) && e.fire(t);
				})), {
					onDidChange: e.event,
					dispose: () => n.dispose()
				};
			}
			return n;
		}
		async doWatch(e, t) {
			let n = await this.withProvider(e), r = Gn([this.getExtUri(n).providerExtUri.getComparisonKey(e), t]), i = this.activeWatchers.get(r);
			return i || (i = {
				count: 0,
				disposable: n.watch(e, t)
			}, this.activeWatchers.set(r, i)), i.count += 1, N(() => {
				i && (i.count--, i.count === 0 && (j(i.disposable), this.activeWatchers.delete(r)));
			});
		}
		dispose() {
			super.dispose();
			for (let [, e] of this.activeWatchers) j(e.disposable);
			this.activeWatchers.clear();
		}
		async doWriteBuffered(e, t, n, r) {
			return this.writeQueue.queueFor(t, async () => {
				let i = await e.open(t, {
					create: !0,
					unlock: n?.unlock ?? !1
				});
				try {
					Jt(r) || Ie(r) ? await this.doWriteStreamBufferedQueued(e, i, r) : await this.doWriteReadableBufferedQueued(e, i, r);
				} catch (e) {
					throw fe(e);
				} finally {
					await e.close(i);
				}
			}, this.getExtUri(e).providerExtUri);
		}
		async doWriteStreamBufferedQueued(e, t, n) {
			let r = 0, i;
			if (Ie(n)) {
				if (n.buffer.length > 0) {
					let i = T.concat(n.buffer);
					await this.doWriteBuffer(e, t, i, i.byteLength, r, 0), r += i.byteLength;
				}
				if (n.ended) return;
				i = n.stream;
			} else i = n;
			return new Promise((n, a) => {
				Ht(i, {
					onData: async (n) => {
						i.pause();
						try {
							await this.doWriteBuffer(e, t, n, n.byteLength, r, 0);
						} catch (e) {
							return a(e);
						}
						r += n.byteLength, setTimeout(() => i.resume());
					},
					onError: (e) => a(e),
					onEnd: () => n()
				});
			});
		}
		async doWriteReadableBufferedQueued(e, t, n) {
			let r = 0, i;
			for (; (i = n.read()) !== null;) await this.doWriteBuffer(e, t, i, i.byteLength, r, 0), r += i.byteLength;
		}
		async doWriteBuffer(e, t, n, r, i, a) {
			let o = 0;
			for (; o < r;) {
				let s = await e.write(t, i + o, n.buffer, a + o, r - o);
				o += s;
			}
		}
		async doWriteUnbuffered(e, t, n, r) {
			return this.writeQueue.queueFor(t, () => this.doWriteUnbufferedQueued(e, t, n, r), this.getExtUri(e).providerExtUri);
		}
		async doWriteUnbufferedQueued(e, t, n, r) {
			let i;
			i = r instanceof T ? r : Jt(r) ? await xe(r) : Ie(r) ? await Ge(r) : It(r), await e.writeFile(t, i.buffer, {
				create: !0,
				overwrite: !0,
				unlock: n?.unlock ?? !1,
				atomic: n?.atomic ?? !1
			});
		}
		async doPipeBuffered(e, t, n, r) {
			return this.writeQueue.queueFor(r, () => this.doPipeBufferedQueued(e, t, n, r), this.getExtUri(n).providerExtUri);
		}
		async doPipeBufferedQueued(e, t, n, r) {
			let i, a;
			try {
				i = await e.open(t, { create: !1 }), a = await n.open(r, {
					create: !0,
					unlock: !1
				});
				let o = T.alloc(this.BUFFER_SIZE), s = 0, c = 0, l = 0;
				do
					l = await e.read(i, s, o.buffer, c, o.byteLength - c), await this.doWriteBuffer(n, a, o, l, s, c), s += l, c += l, c === o.byteLength && (c = 0);
				while (l > 0);
			} catch (e) {
				throw fe(e);
			} finally {
				await vn.settled([typeof i == "number" ? e.close(i) : Promise.resolve(), typeof a == "number" ? n.close(a) : Promise.resolve()]);
			}
		}
		async doPipeUnbuffered(e, t, n, r) {
			return this.writeQueue.queueFor(r, () => this.doPipeUnbufferedQueued(e, t, n, r), this.getExtUri(n).providerExtUri);
		}
		async doPipeUnbufferedQueued(e, t, n, r) {
			return n.writeFile(r, await e.readFile(t), {
				create: !0,
				overwrite: !0,
				unlock: !1,
				atomic: !1
			});
		}
		async doPipeUnbufferedToBuffered(e, t, n, r) {
			return this.writeQueue.queueFor(r, () => this.doPipeUnbufferedToBufferedQueued(e, t, n, r), this.getExtUri(n).providerExtUri);
		}
		async doPipeUnbufferedToBufferedQueued(e, t, n, r) {
			let i = await n.open(r, {
				create: !0,
				unlock: !1
			});
			try {
				let r = await e.readFile(t);
				await this.doWriteBuffer(n, i, T.wrap(r), r.byteLength, 0, 0);
			} catch (e) {
				throw fe(e);
			} finally {
				await n.close(i);
			}
		}
		async doPipeBufferedToUnbuffered(e, t, n, r) {
			let i = await xe(this.readFileBuffered(e, t, qt.None));
			await this.doWriteUnbuffered(n, r, void 0, i);
		}
		throwIfFileSystemIsReadonly(e, t) {
			if (e.capabilities & P.Readonly) throw new M(s(1938, "Unable to modify read-only file '{0}'", this.resourceForError(t)), L.FILE_PERMISSION_DENIED);
			return e;
		}
		throwIfFileIsReadonly(e, t) {
			if ((t.permissions ?? 0) & sr.Readonly) throw new M(s(1938, "Unable to modify read-only file '{0}'", this.resourceForError(e)), L.FILE_PERMISSION_DENIED);
		}
		resourceForError(e) {
			return Wa(e);
		}
	}, qa = Ka = h([w(0, Tr)], qa);
})), Ya, Xa, Za, Qa = t((() => {
	y(), x(), V(), k(), _r(), b(), Ya = class {
		constructor(e) {
			this.type = U.File, this.ctime = Date.now(), this.mtime = Date.now(), this.size = 0, this.name = e;
		}
	}, Xa = class {
		constructor(e) {
			this.type = U.Directory, this.ctime = Date.now(), this.mtime = Date.now(), this.size = 0, this.name = e, this.entries = /* @__PURE__ */ new Map();
		}
	}, Za = class extends n {
		constructor() {
			super(...arguments), this.memoryFdCounter = 0, this.fdMemory = /* @__PURE__ */ new Map(), this._onDidChangeCapabilities = this._register(new p()), this.onDidChangeCapabilities = this._onDidChangeCapabilities.event, this._capabilities = P.FileReadWrite | P.PathCaseSensitive, this.root = new Xa(""), this._onDidChangeFile = this._register(new p()), this.onDidChangeFile = this._onDidChangeFile.event, this._bufferedChanges = [];
		}
		get capabilities() {
			return this._capabilities;
		}
		setReadOnly(e) {
			e !== !!(this._capabilities & P.Readonly) && (this._capabilities = e ? P.Readonly | P.PathCaseSensitive | P.FileReadWrite : P.FileReadWrite | P.PathCaseSensitive, this._onDidChangeCapabilities.fire());
		}
		async stat(e) {
			return this._lookup(e, !1);
		}
		async readdir(e) {
			let t = this._lookupAsDirectory(e, !1), n = [];
			return t.entries.forEach((e, t) => n.push([t, e.type])), n;
		}
		async readFile(e) {
			let t = this._lookupAsFile(e, !1).data;
			if (t) return t;
			throw O("file not found", A.FileNotFound);
		}
		readFileStream(e) {
			let t = this._lookupAsFile(e, !1).data, n = tn((e) => T.concat(e.map((e) => T.wrap(e))).buffer);
			return n.end(t), n;
		}
		async writeFile(e, t, n) {
			let r = v(e), i = this._lookupParentDirectory(e), a = i.entries.get(r);
			if (a instanceof Xa) throw O("file is directory", A.FileIsADirectory);
			if (!a && !n.create) throw O("file not found", A.FileNotFound);
			if (a && n.create && !n.overwrite) throw O("file exists already", A.FileExists);
			a || (a = new Ya(r), i.entries.set(r, a), this._fireSoon({
				type: R.ADDED,
				resource: e
			})), a.mtime = Date.now(), a.size = t.byteLength, a.data = t, this._fireSoon({
				type: R.UPDATED,
				resource: e
			});
		}
		open(e, t) {
			let n = this._lookupAsFile(e, !1).data;
			if (n) {
				let e = this.memoryFdCounter++;
				return this.fdMemory.set(e, n), Promise.resolve(e);
			}
			throw O("file not found", A.FileNotFound);
		}
		close(e) {
			return this.fdMemory.delete(e), Promise.resolve();
		}
		read(e, t, n, r, i) {
			let a = this.fdMemory.get(e);
			if (!a) throw O("No file with that descriptor open", A.Unavailable);
			let o = T.wrap(a).slice(t, t + i);
			return n.set(o.buffer, r), Promise.resolve(o.byteLength);
		}
		write(e, t, n, r, i) {
			let a = this.fdMemory.get(e);
			if (!a) throw O("No file with that descriptor open", A.Unavailable);
			let o = T.wrap(n).slice(r, r + i);
			return a.set(o.buffer, t), Promise.resolve(o.byteLength);
		}
		async rename(e, t, n) {
			if (!n.overwrite && this._lookup(t, !0)) throw O("file exists already", A.FileExists);
			let r = this._lookup(e, !1), i = this._lookupParentDirectory(e), a = this._lookupParentDirectory(t), o = v(t);
			i.entries.delete(r.name), r.name = o, a.entries.set(o, r), this._fireSoon({
				type: R.DELETED,
				resource: e
			}, {
				type: R.ADDED,
				resource: t
			});
		}
		async delete(e, t) {
			let n = Ft(e), r = v(e), i = this._lookupAsDirectory(n, !1);
			i.entries.delete(r) && (i.mtime = Date.now(), --i.size, this._fireSoon({
				type: R.UPDATED,
				resource: n
			}, {
				resource: e,
				type: R.DELETED
			}));
		}
		async mkdir(e) {
			if (this._lookup(e, !0)) throw O("file exists already", A.FileExists);
			let t = v(e), n = Ft(e), r = this._lookupAsDirectory(n, !1), i = new Xa(t);
			r.entries.set(i.name, i), r.mtime = Date.now(), r.size += 1, this._fireSoon({
				type: R.UPDATED,
				resource: n
			}, {
				type: R.ADDED,
				resource: e
			});
		}
		_lookup(e, t) {
			let n = e.path.split("/"), r = this.root;
			for (let e of n) {
				if (!e) continue;
				let n;
				if (r instanceof Xa && (n = r.entries.get(e)), !n) {
					if (t) return;
					throw O("file not found", A.FileNotFound);
				}
				r = n;
			}
			return r;
		}
		_lookupAsDirectory(e, t) {
			let n = this._lookup(e, t);
			if (n instanceof Xa) return n;
			throw O("file not a directory", A.FileNotADirectory);
		}
		_lookupAsFile(e, t) {
			let n = this._lookup(e, t);
			if (n instanceof Ya) return n;
			throw O("file is a directory", A.FileIsADirectory);
		}
		_lookupParentDirectory(e) {
			let t = Ft(e);
			return this._lookupAsDirectory(t, !1);
		}
		watch(e, t) {
			return n.None;
		}
		_fireSoon(...e) {
			this._bufferedChanges.push(...e), this._fireSoonHandle && clearTimeout(this._fireSoonHandle), this._fireSoonHandle = setTimeout(() => {
				this._onDidChangeFile.fire(this._bufferedChanges), this._bufferedChanges.length = 0;
			}, 5);
		}
		dispose() {
			super.dispose(), this.fdMemory.clear();
		}
	};
})), $a, eo, to = t((() => {
	(function(e) {
		function t(e) {
			return typeof e?.showDirectoryPicker == "function";
		}
		e.supported = t;
		function n(e) {
			let t = e;
			return t ? typeof t.kind == "string" && typeof t.queryPermission == "function" && typeof t.requestPermission == "function" : !1;
		}
		e.isFileSystemHandle = n;
		function r(e) {
			return e.kind === "file";
		}
		e.isFileSystemFileHandle = r;
		function i(e) {
			return e.kind === "directory";
		}
		e.isFileSystemDirectoryHandle = i;
	})($a ||= {}), (function(e) {
		function t(e) {
			return typeof e?.FileSystemObserver == "function";
		}
		e.supported = t;
	})(eo ||= {});
})), no, ro = t((() => {
	D(), kn(), y(), x(), V(), _n(), tt(), Kn(), k(), _r(), b(), to(), dt(), no = class extends n {
		get capabilities() {
			return this._capabilities || (this._capabilities = P.FileReadWrite | P.FileReadStream, vt && (this._capabilities |= P.PathCaseSensitive)), this._capabilities;
		}
		constructor(e, t, n) {
			super(), this.indexedDB = e, this.store = t, this.logService = n, this.onDidChangeCapabilities = jt.None, this.extUri = vt ? _ : gr, this._onDidChangeFileEmitter = this._register(new p()), this.onDidChangeFile = this._onDidChangeFileEmitter.event, this._files = /* @__PURE__ */ new Map(), this._directories = /* @__PURE__ */ new Map();
		}
		async stat(e) {
			try {
				let t = await this.getHandle(e);
				if (!t) throw this.createFileSystemProviderError(e, "No such file or directory, stat", A.FileNotFound);
				if ($a.isFileSystemFileHandle(t)) {
					let e = await t.getFile();
					return {
						type: U.File,
						mtime: e.lastModified,
						ctime: 0,
						size: e.size
					};
				}
				return {
					type: U.Directory,
					mtime: 0,
					ctime: 0,
					size: 0
				};
			} catch (e) {
				throw this.toFileSystemProviderError(e);
			}
		}
		async readdir(e) {
			try {
				let t = await this.getDirectoryHandle(e);
				if (!t) throw this.createFileSystemProviderError(e, "No such file or directory, readdir", A.FileNotFound);
				let n = [];
				for await (let [e, r] of t) n.push([e, $a.isFileSystemFileHandle(r) ? U.File : U.Directory]);
				return n;
			} catch (e) {
				throw this.toFileSystemProviderError(e);
			}
		}
		readFileStream(e, t, n) {
			let r = tn((e) => T.concat(e.map((e) => T.wrap(e))).buffer, { highWaterMark: 10 });
			return (async () => {
				try {
					let i = await this.getFileHandle(e);
					if (!i) throw this.createFileSystemProviderError(e, "No such file or directory, readFile", A.FileNotFound);
					let a = await i.getFile();
					if (typeof t.length == "number" || typeof t.position == "number") {
						let e = new Uint8Array(await a.arrayBuffer());
						typeof t?.position == "number" && (e = e.slice(t.position)), typeof t?.length == "number" && (e = e.slice(0, t.length)), r.end(e);
					} else {
						let e = a.stream().getReader(), t = await e.read();
						for (; !t.done && !(n.isCancellationRequested || (await r.write(t.value), n.isCancellationRequested));) t = await e.read();
						r.end(void 0);
					}
				} catch (e) {
					r.error(this.toFileSystemProviderError(e)), r.end();
				}
			})(), r;
		}
		async readFile(e) {
			try {
				let t = await this.getFileHandle(e);
				if (!t) throw this.createFileSystemProviderError(e, "No such file or directory, readFile", A.FileNotFound);
				let n = await t.getFile();
				return new Uint8Array(await n.arrayBuffer());
			} catch (e) {
				throw this.toFileSystemProviderError(e);
			}
		}
		async writeFile(e, t, n) {
			try {
				let r = await this.getFileHandle(e);
				if (!n.create || !n.overwrite) {
					if (r) {
						if (!n.overwrite) throw this.createFileSystemProviderError(e, "File already exists, writeFile", A.FileExists);
					} else if (!n.create) throw this.createFileSystemProviderError(e, "No such file, writeFile", A.FileNotFound);
				}
				if (!r) {
					let t = await this.getDirectoryHandle(this.extUri.dirname(e));
					if (!t) throw this.createFileSystemProviderError(e, "No such parent directory, writeFile", A.FileNotFound);
					if (r = await t.getFileHandle(this.extUri.basename(e), { create: !0 }), !r) throw this.createFileSystemProviderError(e, "Unable to create file , writeFile", A.Unknown);
				}
				let i = await r.createWritable();
				await i.write(t), await i.close();
			} catch (e) {
				throw this.toFileSystemProviderError(e);
			}
		}
		async mkdir(e) {
			try {
				let t = await this.getDirectoryHandle(this.extUri.dirname(e));
				if (!t) throw this.createFileSystemProviderError(e, "No such parent directory, mkdir", A.FileNotFound);
				await t.getDirectoryHandle(this.extUri.basename(e), { create: !0 });
			} catch (e) {
				throw this.toFileSystemProviderError(e);
			}
		}
		async delete(e, t) {
			try {
				let n = await this.getDirectoryHandle(this.extUri.dirname(e));
				if (!n) throw this.createFileSystemProviderError(e, "No such parent directory, delete", A.FileNotFound);
				return n.removeEntry(this.extUri.basename(e), { recursive: t.recursive });
			} catch (e) {
				throw this.toFileSystemProviderError(e);
			}
		}
		async rename(e, t, n) {
			try {
				if (this.extUri.isEqual(e, t)) return;
				let r = await this.getFileHandle(e);
				if (r) {
					let i = await r.getFile(), a = new Uint8Array(await i.arrayBuffer());
					await this.writeFile(t, a, {
						create: !0,
						overwrite: n.overwrite,
						unlock: !1,
						atomic: !1
					}), await this.delete(e, {
						recursive: !1,
						useTrash: !1,
						atomic: !1
					});
				} else throw this.createFileSystemProviderError(e, s(1905, "Rename is only supported for files."), A.Unavailable);
			} catch (e) {
				throw this.toFileSystemProviderError(e);
			}
		}
		watch(e, t) {
			let n = new I();
			return this.doWatch(e, t, n).catch((t) => this.logService.error(`[File Watcher ('FileSystemObserver')] Error: ${t} (${e})`)), n;
		}
		async doWatch(e, t, n) {
			if (!eo.supported(globalThis)) return;
			let r = await this.getHandle(e);
			if (!r || n.isDisposed) return;
			let i = new globalThis.FileSystemObserver((t) => {
				if (n.isDisposed) return;
				let r = [];
				for (let i of t) switch (this.logService.getLevel() === ot.Trace && this.logService.trace(`[File Watcher ('FileSystemObserver')] [${i.type}] ${z(e, ...i.relativePathComponents)}`), i.type) {
					case "appeared":
						r.push({
							resource: z(e, ...i.relativePathComponents),
							type: R.ADDED
						});
						break;
					case "disappeared":
						r.push({
							resource: z(e, ...i.relativePathComponents),
							type: R.DELETED
						});
						break;
					case "modified":
						r.push({
							resource: z(e, ...i.relativePathComponents),
							type: R.UPDATED
						});
						break;
					case "errored": this.logService.trace(`[File Watcher ('FileSystemObserver')] errored, disposing observer (${e})`), n.dispose();
				}
				r.length && this._onDidChangeFileEmitter.fire(r);
			});
			try {
				await i.observe(r, t.recursive ? { recursive: !0 } : void 0);
			} finally {
				n.isDisposed ? i.disconnect() : n.add(N(() => i.disconnect()));
			}
		}
		registerFileHandle(e) {
			return this.registerHandle(e, this._files);
		}
		registerDirectoryHandle(e) {
			return this.registerHandle(e, this._directories);
		}
		get directories() {
			return this._directories.values();
		}
		async registerHandle(e, t) {
			let n = `/${e.name}`;
			if (t.has(n) && !await t.get(n)?.isSameEntry(e)) {
				let r = Ye(e.name), i = u(e.name, r), a = 1;
				do
					n = `/${i}-${a++}${r}`;
				while (t.has(n) && !await t.get(n)?.isSameEntry(e));
			}
			t.set(n, e);
			try {
				await this.indexedDB?.runInTransaction(this.store, "readwrite", (t) => t.put(e, n));
			} catch (e) {
				this.logService.error(e);
			}
			return Fn.from({
				scheme: B.file,
				path: n
			});
		}
		async getHandle(e) {
			let t = await this.doGetHandle(e);
			if (!t) {
				let n = await this.getDirectoryHandle(this.extUri.dirname(e));
				if (n) {
					let r = _.basename(e);
					try {
						t = await n.getFileHandle(r);
					} catch {
						try {
							t = await n.getDirectoryHandle(r);
						} catch {}
					}
				}
			}
			return t;
		}
		async getFileHandle(e) {
			let t = await this.doGetHandle(e);
			if (t instanceof FileSystemFileHandle) return t;
			let n = await this.getDirectoryHandle(this.extUri.dirname(e));
			try {
				return await n?.getFileHandle(_.basename(e));
			} catch {
				return;
			}
		}
		async getDirectoryHandle(e) {
			let t = await this.doGetHandle(e);
			if (t instanceof FileSystemDirectoryHandle) return t;
			let n = this.extUri.dirname(e);
			if (this.extUri.isEqual(n, e)) return;
			let r = await this.getDirectoryHandle(n);
			try {
				return await r?.getDirectoryHandle(_.basename(e));
			} catch {
				return;
			}
		}
		async doGetHandle(e) {
			if (this.extUri.dirname(e).path !== "/") return;
			let t = e.path.replace(/\/$/, ""), n = this._files.get(t) ?? this._directories.get(t);
			if (n) return n;
			let r = await this.indexedDB?.runInTransaction(this.store, "readonly", (e) => e.get(t));
			if ($a.isFileSystemHandle(r)) {
				let e = await r.queryPermission() === "granted";
				try {
					e ||= await r.requestPermission() === "granted";
				} catch (e) {
					this.logService.error(e);
				}
				if (e) return $a.isFileSystemFileHandle(r) ? this._files.set(t, r) : $a.isFileSystemDirectoryHandle(r) && this._directories.set(t, r), r;
			}
			throw this.createFileSystemProviderError(e, "No file system handle registered", A.Unavailable);
		}
		toFileSystemProviderError(e) {
			if (e instanceof Pn) return e;
			let t = A.Unknown;
			return e.name === "NotAllowedError" && (e = Error(s(1906, "Insufficient permissions. Please retry and allow the operation.")), t = A.Unavailable), O(e, t);
		}
		createFileSystemProviderError(e, t, n) {
			return O(/* @__PURE__ */ Error(`${t} (${ke(e.path)})`), n);
		}
	};
})), io, ao = t((() => {
	St(), or(), x(), V(), io = class extends n {
		constructor(e) {
			if (super(), this.channelName = e, this._onDidReceiveData = this._register(new p()), this.onDidReceiveData = this._onDidReceiveData.event, "BroadcastChannel" in Mr) try {
				this.broadcastChannel = new BroadcastChannel(e);
				let t = (e) => {
					this._onDidReceiveData.fire(e.data);
				};
				this.broadcastChannel.addEventListener("message", t), this._register(N(() => {
					this.broadcastChannel && (this.broadcastChannel.removeEventListener("message", t), this.broadcastChannel.close());
				}));
			} catch (e) {
				console.warn("Error while creating broadcast channel. Falling back to localStorage.", yn(e));
			}
			this.broadcastChannel || (this.channelName = `BroadcastDataChannel.${e}`, this.createBroadcastChannel());
		}
		createBroadcastChannel() {
			let e = (e) => {
				e.key === this.channelName && e.newValue && this._onDidReceiveData.fire(JSON.parse(e.newValue));
			};
			Mr.addEventListener("storage", e), this._register(N(() => Mr.removeEventListener("storage", e)));
		}
		postData(e) {
			this.broadcastChannel ? this.broadcastChannel.postMessage(e) : (localStorage.removeItem(this.channelName), localStorage.setItem(this.channelName, JSON.stringify(e)));
		}
	};
})), oo = t((() => {
	at(), y(), x(), V(), k(), ue(), kn(), D(), b(), ao(), O(s(1907, "File does not exist"), A.FileNotFound), O(s(1908, "File is Directory"), A.FileIsADirectory), O(s(1909, "File is not a directory"), A.FileNotADirectory), O(s(1910, "Directory is not empty"), A.Unknown), O(s(1911, "File exceeds available storage quota"), A.FileExceedsStorageQuota);
})), so = t((() => {
	Wt(), or(), dn();
})), co, lo = t((() => {
	V(), dt(), co = class extends Ir {
		constructor(e = me) {
			super(), this.buffer = [], this._logger = void 0, this._logLevelDisposable = this._register(new Hn()), this.setLevel(e);
		}
		set logger(e) {
			this._logger = e, this.setLevel(e.getLevel()), this._logLevelDisposable.value = e.onDidChangeLogLevel(this.setLevel, this);
			for (let { level: t, message: n } of this.buffer) Ne(e, t, n);
			this.buffer = [];
		}
		log(e, t) {
			this._logger ? Ne(this._logger, e, t) : this.getLevel() <= e && this.buffer.push({
				level: e,
				message: t
			});
		}
		dispose() {
			this._logger?.dispose(), super.dispose();
		}
		flush() {
			this._logger?.flush();
		}
	};
})), uo, fo = t((() => {
	g(), uo = lt("workingCopyBackupService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/textfile/common/encoding.js
function po(e, t) {
	let n = t.minBytesRequiredForDetection ?? (t.guessEncoding ? Mo : jo);
	return new Promise((r, i) => {
		let a = tn((e) => e.join("")), o = [], s = 0, c, l = new Vt(), u = async () => {
			try {
				let e = await Co({
					buffer: T.concat(o),
					bytesRead: s
				}, t.guessEncoding, t.candidateGuessEncodings);
				if (e.seemsBinary && t.acceptTextOnly) throw new Fo("Stream is binary but only text is accepted for decoding", Po.STREAM_IS_BINARY);
				e.encoding = await t.overwriteEncoding(e.encoding), c = await Io.create(e.encoding);
				let n = c.write(T.concat(o).buffer);
				a.write(n), o.length = 0, s = 0, r({
					stream: a,
					detected: e
				});
			} catch (e) {
				l.cancel(), a.destroy(), i(e);
			}
		};
		Ht(e, {
			onData: async (t) => {
				c ? a.write(c.write(t.buffer)) : (o.push(t), s += t.byteLength, s >= n && (e.pause(), await u(), setTimeout(() => e.resume())));
			},
			onError: (e) => a.error(e),
			onEnd: async () => {
				c || await u(), a.end(c?.end());
			}
		}, l.token);
	});
}
async function mo(t, n, r) {
	let i = (await import("./iconv-lite-umd-1BxRKXrz.js").then((t) => /* @__PURE__ */ e(t.default, 1))).getEncoder(go(n), r), a = !1, o = !1;
	return { read() {
		if (o) return null;
		let e = t.read();
		if (typeof e != "string") {
			if (o = !0, !a && r?.addBOM) switch (n) {
				case J:
				case wo: return T.wrap(Uint8Array.from(ko));
				case To: return T.wrap(Uint8Array.from(Do));
				case Eo: return T.wrap(Uint8Array.from(Oo));
			}
			let e = i.end();
			return e && e.length > 0 ? (a = !0, T.wrap(e)) : null;
		}
		return a = !0, T.wrap(i.write(e));
	} };
}
async function ho(t) {
	return (await import("./iconv-lite-umd-1BxRKXrz.js").then((t) => /* @__PURE__ */ e(t.default, 1))).encodingExists(go(t));
}
function go(e) {
	return e === "utf8bom" || e === null ? J : e;
}
function _o(e, t) {
	if (!e || t < Do.length) return null;
	let n = e.readUInt8(0), r = e.readUInt8(1);
	if (n === Do[0] && r === Do[1]) return To;
	if (n === Oo[0] && r === Oo[1]) return Eo;
	if (t < ko.length) return null;
	let i = e.readUInt8(2);
	return n === ko[0] && r === ko[1] && i === ko[2] ? wo : null;
}
async function vo(t, n) {
	let r = await import("./jschardet-Bzgs_WTs.js").then((t) => /* @__PURE__ */ e(t.default, 1)), i = So(t.slice(0, No).buffer);
	n && (n = er(n.map((e) => xo(e))), n.length === 0 && (n = void 0));
	let a;
	try {
		a = r.detect(i, n ? { detectEncodings: n } : void 0);
	} catch {
		return null;
	}
	if (!a?.encoding) return null;
	let o = a.encoding.toLowerCase();
	return 0 <= Lo.indexOf(o) ? null : bo(a.encoding);
}
function yo(e) {
	return e.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}
function bo(e) {
	let t = yo(e);
	return Ro[t] || t;
}
function xo(e) {
	let t = yo(e), n = zo[t];
	return n ? n.guessableName : void 0;
}
function So(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
	return t;
}
function Co({ buffer: e, bytesRead: t }, n, r) {
	let i = _o(e, t), a = !1;
	if (i !== "utf16be" && i !== "utf16le" && e) {
		let n = !0, r = !0, o = !1;
		for (let i = 0; i < t && i < Ao; i++) {
			let t = i % 2 == 1, a = e.readUInt8(i) === 0;
			if (a && (o = !0), n && (t && !a || !t && a) && (n = !1), r && (t && a || !t && !a) && (r = !1), a && !n && !r) break;
		}
		o && (n ? i = Eo : r ? i = To : a = !0);
	}
	return n && !a && !i && e ? vo(e.slice(0, t), r).then((e) => ({
		seemsBinary: !1,
		encoding: e
	})) : {
		seemsBinary: a,
		encoding: i
	};
}
var J, wo, To, Eo, Do, Oo, ko, Ao, jo, Mo, No, Po, Fo, Io, Lo, Ro, Y, zo, Bo = t((() => {
	_r(), y(), pt(), se(), J = "utf8", wo = "utf8bom", To = "utf16be", Eo = "utf16le", Do = [254, 255], Oo = [255, 254], ko = [
		239,
		187,
		191
	], Ao = 512, jo = 512, Mo = 512 * 8, No = 512 * 128, (function(e) {
		e[e.STREAM_IS_BINARY = 1] = "STREAM_IS_BINARY";
	})(Po ||= {}), Fo = class extends Error {
		constructor(e, t) {
			super(e), this.decodeStreamErrorKind = t;
		}
	}, Io = class t {
		static async create(n) {
			let r;
			if (n !== "utf8") r = (await import("./iconv-lite-umd-1BxRKXrz.js").then((t) => /* @__PURE__ */ e(t.default, 1))).getDecoder(go(n));
			else {
				let e = new TextDecoder();
				r = {
					write(t) {
						return e.decode(t, { stream: !0 });
					},
					end() {
						return e.decode();
					}
				};
			}
			return new t(r);
		}
		constructor(e) {
			this.iconvLiteDecoder = e;
		}
		write(e) {
			return this.iconvLiteDecoder.write(e);
		}
		end() {
			return this.iconvLiteDecoder.end();
		}
	}, Lo = [
		"ascii",
		"utf-16",
		"utf-32"
	], Ro = {
		ibm866: "cp866",
		big5: "cp950"
	}, Y = {
		utf8: {
			labelLong: "UTF-8",
			labelShort: "UTF-8",
			order: 1,
			alias: "utf8bom",
			guessableName: "UTF-8"
		},
		utf8bom: {
			labelLong: "UTF-8 with BOM",
			labelShort: "UTF-8 with BOM",
			encodeOnly: !0,
			order: 2,
			alias: "utf8"
		},
		utf16le: {
			labelLong: "UTF-16 LE",
			labelShort: "UTF-16 LE",
			order: 3,
			guessableName: "UTF-16LE"
		},
		utf16be: {
			labelLong: "UTF-16 BE",
			labelShort: "UTF-16 BE",
			order: 4,
			guessableName: "UTF-16BE"
		},
		windows1252: {
			labelLong: "Western (Windows 1252)",
			labelShort: "Windows 1252",
			order: 5,
			guessableName: "windows-1252"
		},
		iso88591: {
			labelLong: "Western (ISO 8859-1)",
			labelShort: "ISO 8859-1",
			order: 6
		},
		iso88593: {
			labelLong: "Western (ISO 8859-3)",
			labelShort: "ISO 8859-3",
			order: 7
		},
		iso885915: {
			labelLong: "Western (ISO 8859-15)",
			labelShort: "ISO 8859-15",
			order: 8
		},
		macroman: {
			labelLong: "Western (Mac Roman)",
			labelShort: "Mac Roman",
			order: 9
		},
		cp437: {
			labelLong: "DOS (CP 437)",
			labelShort: "CP437",
			order: 10
		},
		windows1256: {
			labelLong: "Arabic (Windows 1256)",
			labelShort: "Windows 1256",
			order: 11
		},
		iso88596: {
			labelLong: "Arabic (ISO 8859-6)",
			labelShort: "ISO 8859-6",
			order: 12
		},
		windows1257: {
			labelLong: "Baltic (Windows 1257)",
			labelShort: "Windows 1257",
			order: 13
		},
		iso88594: {
			labelLong: "Baltic (ISO 8859-4)",
			labelShort: "ISO 8859-4",
			order: 14
		},
		iso885914: {
			labelLong: "Celtic (ISO 8859-14)",
			labelShort: "ISO 8859-14",
			order: 15
		},
		windows1250: {
			labelLong: "Central European (Windows 1250)",
			labelShort: "Windows 1250",
			order: 16,
			guessableName: "windows-1250"
		},
		iso88592: {
			labelLong: "Central European (ISO 8859-2)",
			labelShort: "ISO 8859-2",
			order: 17,
			guessableName: "ISO-8859-2"
		},
		cp852: {
			labelLong: "Central European (CP 852)",
			labelShort: "CP 852",
			order: 18
		},
		windows1251: {
			labelLong: "Cyrillic (Windows 1251)",
			labelShort: "Windows 1251",
			order: 19,
			guessableName: "windows-1251"
		},
		cp866: {
			labelLong: "Cyrillic (CP 866)",
			labelShort: "CP 866",
			order: 20,
			guessableName: "IBM866"
		},
		cp1125: {
			labelLong: "Cyrillic (CP 1125)",
			labelShort: "CP 1125",
			order: 21,
			guessableName: "IBM1125"
		},
		iso88595: {
			labelLong: "Cyrillic (ISO 8859-5)",
			labelShort: "ISO 8859-5",
			order: 22,
			guessableName: "ISO-8859-5"
		},
		koi8r: {
			labelLong: "Cyrillic (KOI8-R)",
			labelShort: "KOI8-R",
			order: 23,
			guessableName: "KOI8-R"
		},
		koi8u: {
			labelLong: "Cyrillic (KOI8-U)",
			labelShort: "KOI8-U",
			order: 24
		},
		iso885913: {
			labelLong: "Estonian (ISO 8859-13)",
			labelShort: "ISO 8859-13",
			order: 25
		},
		windows1253: {
			labelLong: "Greek (Windows 1253)",
			labelShort: "Windows 1253",
			order: 26,
			guessableName: "windows-1253"
		},
		iso88597: {
			labelLong: "Greek (ISO 8859-7)",
			labelShort: "ISO 8859-7",
			order: 27,
			guessableName: "ISO-8859-7"
		},
		windows1255: {
			labelLong: "Hebrew (Windows 1255)",
			labelShort: "Windows 1255",
			order: 28,
			guessableName: "windows-1255"
		},
		iso88598: {
			labelLong: "Hebrew (ISO 8859-8)",
			labelShort: "ISO 8859-8",
			order: 29,
			guessableName: "ISO-8859-8"
		},
		iso885910: {
			labelLong: "Nordic (ISO 8859-10)",
			labelShort: "ISO 8859-10",
			order: 30
		},
		iso885916: {
			labelLong: "Romanian (ISO 8859-16)",
			labelShort: "ISO 8859-16",
			order: 31
		},
		windows1254: {
			labelLong: "Turkish (Windows 1254)",
			labelShort: "Windows 1254",
			order: 32
		},
		iso88599: {
			labelLong: "Turkish (ISO 8859-9)",
			labelShort: "ISO 8859-9",
			order: 33
		},
		windows1258: {
			labelLong: "Vietnamese (Windows 1258)",
			labelShort: "Windows 1258",
			order: 34
		},
		gbk: {
			labelLong: "Simplified Chinese (GBK)",
			labelShort: "GBK",
			order: 35
		},
		gb18030: {
			labelLong: "Simplified Chinese (GB18030)",
			labelShort: "GB18030",
			order: 36
		},
		cp950: {
			labelLong: "Traditional Chinese (Big5)",
			labelShort: "Big5",
			order: 37,
			guessableName: "Big5"
		},
		big5hkscs: {
			labelLong: "Traditional Chinese (Big5-HKSCS)",
			labelShort: "Big5-HKSCS",
			order: 38
		},
		shiftjis: {
			labelLong: "Japanese (Shift JIS)",
			labelShort: "Shift JIS",
			order: 39,
			guessableName: "SHIFT_JIS"
		},
		eucjp: {
			labelLong: "Japanese (EUC-JP)",
			labelShort: "EUC-JP",
			order: 40,
			guessableName: "EUC-JP"
		},
		euckr: {
			labelLong: "Korean (EUC-KR)",
			labelShort: "EUC-KR",
			order: 41,
			guessableName: "EUC-KR"
		},
		windows874: {
			labelLong: "Thai (Windows 874)",
			labelShort: "Windows 874",
			order: 42
		},
		iso885911: {
			labelLong: "Latin/Thai (ISO 8859-11)",
			labelShort: "ISO 8859-11",
			order: 43
		},
		koi8ru: {
			labelLong: "Cyrillic (KOI8-RU)",
			labelShort: "KOI8-RU",
			order: 44
		},
		koi8t: {
			labelLong: "Tajik (KOI8-T)",
			labelShort: "KOI8-T",
			order: 45
		},
		gb2312: {
			labelLong: "Simplified Chinese (GB 2312)",
			labelShort: "GB 2312",
			order: 46,
			guessableName: "GB2312"
		},
		cp865: {
			labelLong: "Nordic DOS (CP 865)",
			labelShort: "CP 865",
			order: 47
		},
		cp850: {
			labelLong: "Western European DOS (CP 850)",
			labelShort: "CP 850",
			order: 48
		}
	}, zo = (() => {
		let e = {};
		for (let t in Y) Y[t].guessableName && (e[t] = Y[t]);
		return e;
	})();
})), Vo, Ho, Uo = t((() => {
	F(), Mi(), Pr(), wt(), x(), fo(), ve(), Dt(), Ti(), Li(), Qr(), ue(), ct(), En(), Bi(), $t(), Bo(), y(), Ci(), $e(), Ho = class extends bi {
		static {
			Vo = this;
		}
		static {
			this.FIRST_LINE_NAME_MAX_LENGTH = 40;
		}
		static {
			this.FIRST_LINE_NAME_CANDIDATE_MAX_LENGTH = this.FIRST_LINE_NAME_MAX_LENGTH * 10;
		}
		static {
			this.ACTIVE_EDITOR_LANGUAGE_ID = "${activeEditorLanguage}";
		}
		get name() {
			return this.configuredLabelFormat === "content" && !this.hasAssociatedFilePath && this.cachedModelFirstLineWords ? this.cachedModelFirstLineWords : this.labelService.getUriBasenameLabel(this.resource);
		}
		constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, ee, te) {
			super(o, a, ee, te), this.resource = e, this.hasAssociatedFilePath = t, this.initialValue = n, this.preferredLanguageId = r, this.preferredEncoding = i, this.workingCopyBackupService = s, this.textResourceConfigurationService = c, this.workingCopyService = l, this.textFileService = u, this.labelService = d, this.editorService = f, this._onDidChangeContent = this._register(new p()), this.onDidChangeContent = this._onDidChangeContent.event, this._onDidChangeName = this._register(new p()), this.onDidChangeName = this._onDidChangeName.event, this._onDidChangeDirty = this._register(new p()), this.onDidChangeDirty = this._onDidChangeDirty.event, this._onDidChangeEncoding = this._register(new p()), this.onDidChangeEncoding = this._onDidChangeEncoding.event, this._onDidSave = this._register(new p()), this.onDidSave = this._onDidSave.event, this._onDidRevert = this._register(new p()), this.onDidRevert = this._onDidRevert.event, this.typeId = "", this.capabilities = Ai.Untitled, this.configuredLabelFormat = "content", this.cachedModelFirstLineWords = void 0, this.ignoreDirtyOnModelContentChange = !1, this.dirty = this.hasAssociatedFilePath || !!this.initialValue, this._register(this.workingCopyService.registerWorkingCopy(this)), r && this.setLanguageId(r), this.onConfigurationChange(void 0, !1), this.registerListeners();
		}
		registerListeners() {
			this._register(this.textResourceConfigurationService.onDidChangeConfiguration((e) => this.onConfigurationChange(e, !0)));
		}
		onConfigurationChange(e, t) {
			if (!e || e.affectsConfiguration(this.resource, "files.encoding")) {
				let e = this.textResourceConfigurationService.getValue(this.resource, "files.encoding");
				this.configuredEncoding !== e && typeof e == "string" && (this.configuredEncoding = e, t && !this.preferredEncoding && this._onDidChangeEncoding.fire());
			}
			if (!e || e.affectsConfiguration(this.resource, "workbench.editor.untitled.labelFormat")) {
				let e = this.textResourceConfigurationService.getValue(this.resource, "workbench.editor.untitled.labelFormat");
				this.configuredLabelFormat !== e && (e === "content" || e === "name") && (this.configuredLabelFormat = e, t && this._onDidChangeName.fire());
			}
		}
		setLanguageId(e, t) {
			let n = e === Vo.ACTIVE_EDITOR_LANGUAGE_ID ? this.editorService.activeTextEditorLanguageId : e;
			this.preferredLanguageId = n, n && super.setLanguageId(n, t);
		}
		getLanguageId() {
			return this.textEditorModel ? this.textEditorModel.getLanguageId() : this.preferredLanguageId;
		}
		getEncoding() {
			return this.preferredEncoding || this.configuredEncoding;
		}
		async setEncoding(e) {
			let t = this.getEncoding();
			this.preferredEncoding = e, t !== this.preferredEncoding && this._onDidChangeEncoding.fire();
		}
		isDirty() {
			return this.dirty;
		}
		isModified() {
			return this.isDirty();
		}
		setDirty(e) {
			this.dirty !== e && (this.dirty = e, this._onDidChangeDirty.fire());
		}
		async save(e) {
			let t = await this.textFileService.save(this.resource, e);
			return t && this._onDidSave.fire({
				reason: e?.reason,
				source: e?.source
			}), !!t;
		}
		async revert() {
			this.ignoreDirtyOnModelContentChange = !0;
			try {
				this.updateTextEditorModel(qr(""));
			} finally {
				this.ignoreDirtyOnModelContentChange = !1;
			}
			this.setDirty(!1), this._onDidRevert.fire();
		}
		async backup(e) {
			let t;
			return this.isResolved() ? t = await this.textFileService.getEncodedReadable(this.resource, this.createSnapshot() ?? void 0, { encoding: J }) : typeof this.initialValue == "string" && (t = ye(T.fromString(this.initialValue))), { content: t };
		}
		async resolve() {
			let e = !1, t = !1;
			if (this.textEditorModel) this.updateTextEditorModel(void 0, this.preferredLanguageId);
			else {
				let n, r = await this.workingCopyBackupService.resolve(this);
				r ? (n = r.value, t = !0) : n = Ae(T.fromString(this.initialValue || ""));
				let i = await Mt(await this.textFileService.getDecodedStream(this.resource, n, { encoding: J }));
				this.createTextEditorModel(i, this.resource, this.preferredLanguageId), e = !0;
			}
			let n = pn(this.textEditorModel);
			return this.installModelListeners(n), e && ((t || this.initialValue) && this.updateNameFromFirstLine(n), this.setDirty(this.hasAssociatedFilePath || !!t || !!this.initialValue), (t || this.initialValue) && this._onDidChangeContent.fire()), super.resolve();
		}
		isResolved() {
			return !!this.textEditorModelHandle;
		}
		installModelListeners(e) {
			this._register(e.onDidChangeContent((t) => this.onModelContentChanged(e, t))), this._register(e.onDidChangeLanguage(() => this.onConfigurationChange(void 0, !0))), super.installModelListeners(e);
		}
		onModelContentChanged(e, t) {
			this.ignoreDirtyOnModelContentChange || (!this.hasAssociatedFilePath && e.getLineCount() === 1 && e.getLineLength(1) === 0 ? this.setDirty(!1) : this.setDirty(!0)), t.changes.some((e) => (e.range.startLineNumber === 1 || e.range.endLineNumber === 1) && e.range.startColumn <= Vo.FIRST_LINE_NAME_CANDIDATE_MAX_LENGTH) && this.updateNameFromFirstLine(e), this._onDidChangeContent.fire(), this.autoDetectLanguage();
		}
		updateNameFromFirstLine(e) {
			if (this.hasAssociatedFilePath) return;
			let t, n = e.getValueInRange({
				startLineNumber: 1,
				endLineNumber: 1,
				startColumn: 1,
				endColumn: Vo.FIRST_LINE_NAME_CANDIDATE_MAX_LENGTH + 1
			}).trim().replace(/\s+/g, " ").replace(/\u202E/g, "");
			n = n.substr(0, hr(n, Vo.FIRST_LINE_NAME_MAX_LENGTH)[0]), n && Dr().exec(n) && (t = n), t !== this.cachedModelFirstLineWords && (this.cachedModelFirstLineWords = t, this._onDidChangeName.fire());
		}
		isReadonly() {
			return !1;
		}
	}, Ho = Vo = h([
		w(5, le),
		w(6, zr),
		w(7, uo),
		w(8, Rr),
		w(9, wi),
		w(10, Ui),
		w(11, ge),
		w(12, xi),
		w(13, Fi),
		w(14, Jn)
	], Ho);
})), Wo, Go, Ko, qo, Jo, Yo = t((() => {
	F(), at(), pt(), V(), Fr(), (function(e) {
		e[e.Explorer = 1] = "Explorer", e[e.Scm = 3] = "Scm", e[e.Extensions = 5] = "Extensions", e[e.Window = 10] = "Window", e[e.Notification = 15] = "Notification", e[e.Dialog = 20] = "Dialog";
	})(Wo ||= {}), Go = Object.freeze({
		total() {},
		worked() {},
		done() {}
	}), Ko = class {
		static {
			this.None = Object.freeze({ report() {} });
		}
		get value() {
			return this._value;
		}
		constructor(e) {
			this.callback = e;
		}
		report(e) {
			this._value = e, this.callback(this._value);
		}
	}, qo = class extends n {
		constructor(e, t) {
			super(), this.deferred = new cn(), t.withProgress(e, (e) => (this.reporter = e, this.lastStep && e.report(this.lastStep), this.deferred.p)), this._register(N(() => this.deferred.complete()));
		}
		report(e) {
			this.reporter ? this.reporter.report(e) : this.lastStep = e;
		}
	}, qo = h([w(1, de)], qo), Jo = class extends n {
		constructor(e) {
			super(), this.progressIndicator = e, this.currentOperationId = 0, this.currentOperationDisposables = this._register(new I()), this.currentProgressTimeout = void 0;
		}
		start(e) {
			this.stop();
			let t = ++this.currentOperationId, n = new Vt();
			return this.currentProgressTimeout = setTimeout(() => {
				t === this.currentOperationId && (this.currentProgressRunner = this.progressIndicator.show(!0));
			}, e), this.currentOperationDisposables.add(N(() => clearTimeout(this.currentProgressTimeout))), this.currentOperationDisposables.add(N(() => n.cancel())), this.currentOperationDisposables.add(N(() => this.currentProgressRunner ? this.currentProgressRunner.done() : void 0)), {
				id: t,
				token: n.token,
				stop: () => this.doStop(t),
				isCurrent: () => this.currentOperationId === t
			};
		}
		stop() {
			this.doStop(this.currentOperationId);
		}
		doStop(e) {
			this.currentOperationId === e && this.currentOperationDisposables.clear();
		}
	};
})), Xo, Zo, Qo = t((() => {
	F(), D(), x(), dn(), ue(), ji(), Qr(), Zr(), Mi(), fo(), b(), f(), Pr(), wt(), at(), Sr(), tt(), Ti(), Li(), ii(), ct(), pt(), Bo(), Dt(), Ci(), ai(), k(), $e(), Pe(), Da(), Yo(), Fr(), or(), jr(), Zo = class extends bi {
		static {
			Xo = this;
		}
		static {
			this.TEXTFILE_SAVE_ENCODING_SOURCE = oi.registerSource("textFileEncoding.source", s(14310, "File Encoding Changed"));
		}
		static {
			this.UNDO_REDO_SAVE_PARTICIPANTS_AUTO_SAVE_THROTTLE_THRESHOLD = 500;
		}
		constructor(e, t, n, r, i, a, o, s, c, l, d, f, ee, te, ne, re, ie) {
			super(i, r, ee, te), this.resource = e, this.preferredEncoding = t, this.preferredLanguageId = n, this.fileService = a, this.textFileService = o, this.workingCopyBackupService = s, this.logService = c, this.workingCopyService = l, this.filesConfigurationService = d, this.labelService = f, this.pathService = ne, this.extensionService = re, this.progressService = ie, this._onDidChangeContent = this._register(new p()), this.onDidChangeContent = this._onDidChangeContent.event, this._onDidResolve = this._register(new p()), this.onDidResolve = this._onDidResolve.event, this._onDidChangeDirty = this._register(new p()), this.onDidChangeDirty = this._onDidChangeDirty.event, this._onDidSaveError = this._register(new p()), this.onDidSaveError = this._onDidSaveError.event, this._onDidSave = this._register(new p()), this.onDidSave = this._onDidSave.event, this._onDidRevert = this._register(new p()), this.onDidRevert = this._onDidRevert.event, this._onDidChangeEncoding = this._register(new p()), this.onDidChangeEncoding = this._onDidChangeEncoding.event, this._onDidChangeOrphaned = this._register(new p()), this.onDidChangeOrphaned = this._onDidChangeOrphaned.event, this._onDidChangeReadonly = this._register(new p()), this.onDidChangeReadonly = this._onDidChangeReadonly.event, this.typeId = "", this.capabilities = Ai.None, this.versionId = 0, this.ignoreDirtyOnModelContentChange = !1, this.ignoreSaveFromSaveParticipants = !1, this.lastModelContentChangeFromUndoRedo = void 0, this.saveSequentializer = new kr(), this.dirty = !1, this.inConflictMode = !1, this.inOrphanMode = !1, this.inErrorMode = !1, this.hasEncodingSetExplicitly = !1, this.name = u(this.labelService.getUriLabel(this.resource)), this.resourceHasExtension = !!_.extname(this.resource), this._register(this.workingCopyService.registerWorkingCopy(this)), this.registerListeners();
		}
		registerListeners() {
			this._register(this.fileService.onDidFilesChange((e) => this.onDidFilesChange(e))), this._register(this.filesConfigurationService.onDidChangeFilesAssociation(() => this.onDidChangeFilesAssociation())), this._register(this.filesConfigurationService.onDidChangeReadonly(() => this._onDidChangeReadonly.fire()));
		}
		async onDidFilesChange(e) {
			let t = !1, n;
			if (this.inOrphanMode ? e.contains(this.resource, R.ADDED) && (n = !1, t = !0) : e.contains(this.resource, R.DELETED) && (n = !0, t = !0), t && this.inOrphanMode !== n) {
				let e = !1;
				n && (await We(100, qt.None), e = this.isDisposed() ? !0 : !await this.fileService.exists(this.resource)), this.inOrphanMode !== e && !this.isDisposed() && this.setOrphaned(e);
			}
		}
		setOrphaned(e) {
			this.inOrphanMode !== e && (this.inOrphanMode = e, this._onDidChangeOrphaned.fire());
		}
		onDidChangeFilesAssociation() {
			if (!this.isResolved()) return;
			let e = this.getFirstLineText(this.textEditorModel), t = this.getOrCreateLanguage(this.resource, this.languageService, this.preferredLanguageId, e);
			this.textEditorModel.setLanguage(t);
		}
		setLanguageId(e, t) {
			super.setLanguageId(e, t), this.preferredLanguageId = e;
		}
		async backup(e) {
			let t;
			this.lastResolvedFileStat && (t = {
				mtime: this.lastResolvedFileStat.mtime,
				ctime: this.lastResolvedFileStat.ctime,
				size: this.lastResolvedFileStat.size,
				etag: this.lastResolvedFileStat.etag,
				orphaned: this.inOrphanMode
			});
			let n = await this.textFileService.getEncodedReadable(this.resource, this.createSnapshot() ?? void 0, { encoding: J });
			return {
				meta: t,
				content: n
			};
		}
		async revert(e) {
			if (!this.isResolved()) return;
			let t = this.dirty, n = this.doSetDirty(!1);
			if (!e?.soft) try {
				await this.forceResolveFromFile();
			} catch (e) {
				if (e.fileOperationResult !== L.FILE_NOT_FOUND) throw n(), e;
			}
			this._onDidRevert.fire(), t && this._onDidChangeDirty.fire();
		}
		async resolve(e) {
			if (this.trace("resolve() - enter"), Br("code/willResolveTextFileEditorModel"), this.isDisposed()) {
				this.trace("resolve() - exit - without resolving because model is disposed");
				return;
			}
			if (!e?.contents && (this.dirty || this.saveSequentializer.isRunning())) {
				this.trace("resolve() - exit - without resolving because model is dirty or being saved");
				return;
			}
			await this.doResolve(e), Br("code/didResolveTextFileEditorModel");
		}
		async doResolve(e) {
			if (e?.contents) return this.resolveFromBuffer(e.contents, e);
			if (!(!this.isResolved() && await this.resolveFromBackup(e))) return this.resolveFromFile(e);
		}
		async resolveFromBuffer(e, t) {
			this.trace("resolveFromBuffer()");
			let n, r, i, a;
			try {
				let e = await this.fileService.stat(this.resource);
				n = e.mtime, r = e.ctime, i = e.size, a = e.etag, this.setOrphaned(!1);
			} catch (e) {
				n = Date.now(), r = Date.now(), i = 0, a = "", this.setOrphaned(e.fileOperationResult === L.FILE_NOT_FOUND);
			}
			let o = await this.textFileService.encoding.getPreferredWriteEncoding(this.resource, this.preferredEncoding);
			this.resolveFromContent({
				resource: this.resource,
				name: this.name,
				mtime: n,
				ctime: r,
				size: i,
				etag: a,
				value: e,
				encoding: o.encoding,
				readonly: !1,
				locked: !1,
				executable: !1
			}, !0, t);
		}
		async resolveFromBackup(e) {
			let t = await this.workingCopyBackupService.resolve(this), n = J;
			return t && (n = (await this.textFileService.encoding.getPreferredWriteEncoding(this.resource, this.preferredEncoding)).encoding), this.isResolved() ? (this.trace("resolveFromBackup() - exit - without resolving because previously new model got created meanwhile"), !0) : t ? (await this.doResolveFromBackup(t, n, e), !0) : !1;
		}
		async doResolveFromBackup(e, t, n) {
			this.trace("doResolveFromBackup()"), this.resolveFromContent({
				resource: this.resource,
				name: this.name,
				mtime: e.meta ? e.meta.mtime : Date.now(),
				ctime: e.meta ? e.meta.ctime : Date.now(),
				size: e.meta ? e.meta.size : 0,
				etag: e.meta ? e.meta.etag : "",
				value: await Mt(await this.textFileService.getDecodedStream(this.resource, e.value, { encoding: J })),
				encoding: t,
				readonly: !1,
				locked: !1,
				executable: !1
			}, !0, n), e.meta?.orphaned && this.setOrphaned(!0);
		}
		async resolveFromFile(e) {
			this.trace("resolveFromFile()");
			let t = e?.forceReadFromFile, n = this.isResolved() || e?.allowBinary, r;
			t ? r = "" : this.lastResolvedFileStat && (r = this.lastResolvedFileStat.etag);
			let i = this.versionId;
			try {
				let t = await this.textFileService.readStream(this.resource, {
					acceptTextOnly: !n,
					etag: r,
					encoding: this.preferredEncoding,
					limits: e?.limits
				});
				if (this.setOrphaned(!1), i !== this.versionId) {
					this.trace("resolveFromFile() - exit - without resolving because model content changed");
					return;
				}
				return this.resolveFromContent(t, !1, e);
			} catch (e) {
				let n = e.fileOperationResult;
				if (this.setOrphaned(n === L.FILE_NOT_FOUND), this.isResolved() && n === L.FILE_NOT_MODIFIED_SINCE) {
					e instanceof mn && this.updateLastResolvedFileStat(e.stat);
					return;
				}
				if (this.isResolved() && n === L.FILE_NOT_FOUND && !t) return;
				throw e;
			}
		}
		resolveFromContent(e, t, n) {
			if (this.trace("resolveFromContent() - enter"), this.isDisposed()) {
				this.trace("resolveFromContent() - exit - because model is disposed");
				return;
			}
			this.updateLastResolvedFileStat({
				resource: this.resource,
				name: e.name,
				mtime: e.mtime,
				ctime: e.ctime,
				size: e.size,
				etag: e.etag,
				readonly: e.readonly,
				locked: e.locked,
				executable: !1,
				isFile: !0,
				isDirectory: !1,
				isSymbolicLink: !1,
				children: void 0
			});
			let r = this.contentEncoding;
			this.contentEncoding = e.encoding, this.preferredEncoding ? this.updatePreferredEncoding(this.contentEncoding) : r !== this.contentEncoding && this._onDidChangeEncoding.fire(), this.textEditorModel ? this.doUpdateTextModel(e.value, Nn.reloadFromDisk()) : this.doCreateTextModel(e.resource, e.value), this.setDirty(!!t), this._onDidResolve.fire(n?.reason ?? yi.OTHER);
		}
		doCreateTextModel(e, t) {
			this.trace("doCreateTextModel()");
			let n = this.createTextEditorModel(t, e, this.preferredLanguageId);
			this.installModelListeners(n), this.autoDetectLanguage();
		}
		doUpdateTextModel(e, t) {
			this.trace("doUpdateTextModel()"), this.ignoreDirtyOnModelContentChange = !0;
			try {
				this.updateTextEditorModel(e, this.preferredLanguageId, t);
			} finally {
				this.ignoreDirtyOnModelContentChange = !1;
			}
		}
		installModelListeners(e) {
			this._register(e.onDidChangeContent((t) => this.onModelContentChanged(e, t.isUndoing || t.isRedoing))), this._register(e.onDidChangeLanguage(() => this.onMaybeShouldChangeEncoding())), super.installModelListeners(e);
		}
		onModelContentChanged(e, t) {
			if (this.trace("onModelContentChanged() - enter"), this.versionId++, this.trace(`onModelContentChanged() - new versionId ${this.versionId}`), t && (this.lastModelContentChangeFromUndoRedo = Date.now()), !this.ignoreDirtyOnModelContentChange && !this.isReadonly()) if (e.getAlternativeVersionId() === this.bufferSavedVersionId) {
				this.trace("onModelContentChanged() - model content changed back to last saved version");
				let e = this.dirty;
				this.setDirty(!1), e && this._onDidRevert.fire();
			} else this.trace("onModelContentChanged() - model content changed and marked as dirty"), this.setDirty(!0);
			this._onDidChangeContent.fire(), this.autoDetectLanguage();
		}
		async autoDetectLanguage() {
			await this.extensionService?.whenInstalledExtensionsRegistered();
			let e = this.getLanguageId();
			if (this.resource.scheme === this.pathService.defaultUriScheme && (!e || e === "plaintext") && !this.resourceHasExtension) return super.autoDetectLanguage();
		}
		async forceResolveFromFile() {
			this.isDisposed() || await this.textFileService.files.resolve(this.resource, {
				reload: { async: !1 },
				forceReadFromFile: !0
			});
		}
		isDirty() {
			return this.dirty;
		}
		isModified() {
			return this.isDirty();
		}
		setDirty(e) {
			if (!this.isResolved()) return;
			let t = this.dirty;
			this.doSetDirty(e), e !== t && this._onDidChangeDirty.fire();
		}
		doSetDirty(e) {
			let t = this.dirty, n = this.inConflictMode, r = this.inErrorMode, i = this.bufferSavedVersionId;
			return e ? this.dirty = !0 : (this.dirty = !1, this.inConflictMode = !1, this.inErrorMode = !1, this.updateSavedVersionId()), () => {
				this.dirty = t, this.inConflictMode = n, this.inErrorMode = r, this.bufferSavedVersionId = i;
			};
		}
		async save(e = Object.create(null)) {
			return this.isResolved() ? this.isReadonly() ? (this.trace("save() - ignoring request for readonly resource"), !1) : (this.hasState(G.CONFLICT) || this.hasState(G.ERROR)) && (e.reason === ri.AUTO || e.reason === ri.FOCUS_CHANGE || e.reason === ri.WINDOW_CHANGE) ? (this.trace("save() - ignoring auto save request for model that is in conflict or error"), !1) : (this.trace("save() - enter"), await this.doSave(e), this.trace("save() - exit"), this.hasState(G.SAVED)) : !1;
		}
		async doSave(e) {
			typeof e.reason != "number" && (e.reason = ri.EXPLICIT);
			let t = this.versionId;
			if (this.trace(`doSave(${t}) - enter with versionId ${t}`), this.ignoreSaveFromSaveParticipants) {
				this.trace(`doSave(${t}) - exit - refusing to save() recursively from save participant`);
				return;
			}
			if (this.saveSequentializer.isRunning(t)) return this.trace(`doSave(${t}) - exit - found a running save for versionId ${t}`), this.saveSequentializer.running;
			if (!e.force && !this.dirty) {
				this.trace(`doSave(${t}) - exit - because not dirty and/or versionId is different (this.isDirty: ${this.dirty}, this.versionId: ${this.versionId})`);
				return;
			}
			if (this.saveSequentializer.isRunning()) return this.trace(`doSave(${t}) - exit - because busy saving`), this.saveSequentializer.cancelRunning(), this.saveSequentializer.queue(() => this.doSave(e));
			this.isResolved() && this.textEditorModel.pushStackElement();
			let n = new Vt();
			return this.progressService.withProgress({
				title: s(14311, "Saving '{0}'", this.name),
				location: Wo.Window,
				cancellable: !0,
				delay: this.isDirty() ? 3e3 : 5e3
			}, (r) => this.doSaveSequential(t, e, r, n), () => {
				n.cancel();
			}).finally(() => {
				n.dispose();
			});
		}
		doSaveSequential(e, t, n, r) {
			return this.saveSequentializer.run(e, (async () => {
				if (this.isResolved() && !t.skipSaveParticipants) try {
					if (t.reason === ri.AUTO && typeof this.lastModelContentChangeFromUndoRedo == "number") {
						let e = Date.now() - this.lastModelContentChangeFromUndoRedo;
						e < Xo.UNDO_REDO_SAVE_PARTICIPANTS_AUTO_SAVE_THROTTLE_THRESHOLD && await We(Xo.UNDO_REDO_SAVE_PARTICIPANTS_AUTO_SAVE_THROTTLE_THRESHOLD - e);
					}
					if (!r.token.isCancellationRequested) {
						this.ignoreSaveFromSaveParticipants = !0;
						try {
							await this.textFileService.files.runSaveParticipants(this, {
								reason: t.reason ?? ri.EXPLICIT,
								savedFrom: t.from
							}, n, r.token);
						} catch (e) {
							In(e) && !r.token.isCancellationRequested && r.cancel();
						} finally {
							this.ignoreSaveFromSaveParticipants = !1;
						}
					}
				} catch (t) {
					this.logService.error(`[text file model] runSaveParticipants(${e}) - resulted in an error: ${t.toString()}`, this.resource.toString());
				}
				if (r.token.isCancellationRequested || (r.dispose(), this.isDisposed()) || !this.isResolved()) return;
				e = this.versionId, this.inErrorMode = !1, n.report({ message: s(14312, "Writing into file...") }), this.trace(`doSave(${e}) - before write()`);
				let i = pn(this.lastResolvedFileStat), a = this;
				return this.saveSequentializer.run(e, (async () => {
					try {
						let n = await this.textFileService.write(i.resource, a.createSnapshot(), {
							mtime: i.mtime,
							encoding: this.getEncoding(),
							etag: t.ignoreModifiedSince || !this.filesConfigurationService.preventSaveConflicts(i.resource, a.getLanguageId()) ? "" : i.etag,
							unlock: t.writeUnlock,
							writeElevated: t.writeElevated
						});
						this.handleSaveSuccess(n, e, t);
					} catch (n) {
						this.handleSaveError(n, e, t);
					}
				})());
			})(), () => r.cancel());
		}
		handleSaveSuccess(e, t, n) {
			this.updateLastResolvedFileStat(e), t === this.versionId ? (this.trace(`handleSaveSuccess(${t}) - setting dirty to false because versionId did not change`), this.setDirty(!1)) : this.trace(`handleSaveSuccess(${t}) - not setting dirty to false because versionId did change meanwhile`), this.setOrphaned(!1), this._onDidSave.fire({
				reason: n.reason,
				stat: e,
				source: n.source
			});
		}
		handleSaveError(e, t, n) {
			if ((n.ignoreErrorHandler ? this.logService.trace : this.logService.error).apply(this.logService, [`[text file model] handleSaveError(${t}) - exit - resulted in a save error: ${e.toString()}`, this.resource.toString()]), n.ignoreErrorHandler) throw e;
			this.setDirty(!0), this.inErrorMode = !0, e.fileOperationResult === L.FILE_MODIFIED_SINCE && (this.inConflictMode = !0), this.textFileService.files.saveErrorHandler.onSaveError(e, this, n), this._onDidSaveError.fire();
		}
		updateSavedVersionId() {
			this.isResolved() && (this.bufferSavedVersionId = this.textEditorModel.getAlternativeVersionId());
		}
		updateLastResolvedFileStat(e) {
			let t = this.isReadonly();
			this.lastResolvedFileStat ? this.lastResolvedFileStat.mtime <= e.mtime ? this.lastResolvedFileStat = e : this.lastResolvedFileStat = {
				...this.lastResolvedFileStat,
				readonly: e.readonly,
				locked: e.locked
			} : this.lastResolvedFileStat = e, this.isReadonly() !== t && this._onDidChangeReadonly.fire();
		}
		hasState(e) {
			switch (e) {
				case G.CONFLICT: return this.inConflictMode;
				case G.DIRTY: return this.dirty;
				case G.ERROR: return this.inErrorMode;
				case G.ORPHAN: return this.inOrphanMode;
				case G.PENDING_SAVE: return this.saveSequentializer.isRunning();
				case G.SAVED: return !this.dirty;
			}
		}
		async joinState(e) {
			return this.saveSequentializer.running;
		}
		getLanguageId() {
			return this.textEditorModel ? this.textEditorModel.getLanguageId() : this.preferredLanguageId;
		}
		async onMaybeShouldChangeEncoding() {
			if (this.hasEncodingSetExplicitly) {
				this.trace("onMaybeShouldChangeEncoding() - ignoring because encoding was set explicitly");
				return;
			}
			if (this.contentEncoding === "utf8bom" || this.contentEncoding === "utf16be" || this.contentEncoding === "utf16le") {
				this.trace("onMaybeShouldChangeEncoding() - ignoring because content encoding has a BOM");
				return;
			}
			let { encoding: e } = await this.textFileService.encoding.getPreferredReadEncoding(this.resource);
			if (typeof e != "string" || !this.isNewEncoding(e)) {
				this.trace(`onMaybeShouldChangeEncoding() - ignoring because preferred encoding ${e} is not new`);
				return;
			}
			if (this.isDirty()) {
				this.trace("onMaybeShouldChangeEncoding() - ignoring because model is dirty");
				return;
			}
			return this.logService.info(`Adjusting encoding based on configured language override to '${e}' for ${this.resource.toString(!0)}.`), this.forceResolveFromFile();
		}
		setEncoding(e, t) {
			return this.hasEncodingSetExplicitly = !0, this.setEncodingInternal(e, t);
		}
		async setEncodingInternal(e, t) {
			if (t === Ii.Encode) this.updatePreferredEncoding(e), this.isDirty() || (this.versionId++, this.setDirty(!0)), this.inConflictMode || await this.save({ source: Xo.TEXTFILE_SAVE_ENCODING_SOURCE });
			else {
				if (!this.isNewEncoding(e)) return;
				if (this.isDirty()) throw Error("Cannot re-open a dirty text document with different encoding. Save it first.");
				this.updatePreferredEncoding(e), await this.forceResolveFromFile();
			}
		}
		updatePreferredEncoding(e) {
			this.isNewEncoding(e) && (this.preferredEncoding = e, this._onDidChangeEncoding.fire());
		}
		isNewEncoding(e) {
			return !(this.preferredEncoding === e || !this.preferredEncoding && this.contentEncoding === e);
		}
		getEncoding() {
			return this.preferredEncoding || this.contentEncoding;
		}
		trace(e) {
			this.logService.trace(`[text file model] ${e}`, this.resource.toString());
		}
		isResolved() {
			return !!this.textEditorModel;
		}
		isReadonly() {
			return this.filesConfigurationService.isReadonly(this.resource, this.lastResolvedFileStat);
		}
		dispose() {
			this.trace("dispose()"), this.inConflictMode = !1, this.inOrphanMode = !1, this.inErrorMode = !1, super.dispose();
		}
	}, Zo = Xo = h([
		w(3, le),
		w(4, zr),
		w(5, Qn),
		w(6, Ui),
		w(7, uo),
		w(8, Tr),
		w(9, wi),
		w(10, vi),
		w(11, ge),
		w(12, Fi),
		w(13, Jn),
		w(14, ti),
		w(15, Ea),
		w(16, de)
	], Zo);
})), $o, es = t((() => {
	F(), at(), pt(), Sr(), Yo(), Fr(), V(), Qt(), D(), Xn(), or(), $o = class extends n {
		constructor(e, t) {
			super(), this.logService = e, this.progressService = t, this.saveParticipants = new Bt();
		}
		addSaveParticipant(e) {
			let t = this.saveParticipants.push(e);
			return N(() => t());
		}
		async participate(e, t, n, r) {
			let i = new Vt(r);
			e.textEditorModel?.pushStackElement(), n.report({ message: s(14314, "Running Code Actions and Formatters...") });
			let a = !1;
			if (await this.progressService.withProgress({
				priority: pe.URGENT,
				location: Wo.Notification,
				cancellable: s(14315, "Skip"),
				delay: e.isDirty() ? 5e3 : 3e3
			}, async (n) => {
				let r = Array.from(this.saveParticipants).sort((e, t) => (e.ordinal ?? 0) - (t.ordinal ?? 0));
				for (let o of r) {
					if (i.token.isCancellationRequested || !e.textEditorModel) break;
					try {
						await et(o.participate(e, t, n, i.token), i.token);
					} catch (e) {
						In(e) ? i.token.isCancellationRequested || (i.cancel(), a = !0) : this.logService.error(e);
					}
				}
			}, () => {
				i.cancel();
			}), e.textEditorModel?.pushStackElement(), i.dispose(), a) throw new br();
		}
		dispose() {
			this.saveParticipants.clear(), super.dispose();
		}
	}, $o = h([w(0, Tr), w(1, de)], $o);
})), ts, ns = t((() => {
	g(), ts = lt("workingCopyFileService");
})), rs, is = t((() => {
	F(), D(), Wt(), x(), kn(), Qo(), V(), g(), o(), b(), f(), at(), or(), es(), Xt(), ns(), k(), Dt(), Pe(), rt(), rs = class extends n {
		get models() {
			return [...this.mapResourceToModel.values()];
		}
		constructor(e, t, n, r, i) {
			super(), this.instantiationService = e, this.fileService = t, this.notificationService = n, this.workingCopyFileService = r, this.uriIdentityService = i, this._onDidCreate = this._register(new p({ leakWarningThreshold: 500 })), this.onDidCreate = this._onDidCreate.event, this._onDidResolve = this._register(new p()), this.onDidResolve = this._onDidResolve.event, this._onDidRemove = this._register(new p()), this.onDidRemove = this._onDidRemove.event, this._onDidChangeDirty = this._register(new p()), this.onDidChangeDirty = this._onDidChangeDirty.event, this._onDidChangeReadonly = this._register(new p()), this.onDidChangeReadonly = this._onDidChangeReadonly.event, this._onDidChangeOrphaned = this._register(new p()), this.onDidChangeOrphaned = this._onDidChangeOrphaned.event, this._onDidSaveError = this._register(new p()), this.onDidSaveError = this._onDidSaveError.event, this._onDidSave = this._register(new p()), this.onDidSave = this._onDidSave.event, this._onDidRevert = this._register(new p()), this.onDidRevert = this._onDidRevert.event, this._onDidChangeEncoding = this._register(new p()), this.onDidChangeEncoding = this._onDidChangeEncoding.event, this.mapResourceToModel = new ze(), this.mapResourceToModelListeners = new ze(), this.mapResourceToDisposeListener = new ze(), this.mapResourceToPendingModelResolvers = new ze(), this.modelResolveQueue = this._register(new pr()), this.saveErrorHandler = (() => {
				let e = this.notificationService;
				return { onSaveError(t, n) {
					e.error(s(14313, "Failed to save '{0}': {1}", n.name, ht(t, !1)));
				} };
			})(), this.mapCorrelationIdToModelsToRestore = /* @__PURE__ */ new Map(), this.saveParticipants = this._register(this.instantiationService.createInstance($o)), this.registerListeners();
		}
		registerListeners() {
			this._register(this.fileService.onDidFilesChange((e) => this.onDidFilesChange(e))), this._register(this.fileService.onDidChangeFileSystemProviderCapabilities((e) => this.onDidChangeFileSystemProviderCapabilities(e))), this._register(this.fileService.onDidChangeFileSystemProviderRegistrations((e) => this.onDidChangeFileSystemProviderRegistrations(e))), this._register(this.workingCopyFileService.onWillRunWorkingCopyFileOperation((e) => this.onWillRunWorkingCopyFileOperation(e))), this._register(this.workingCopyFileService.onDidFailWorkingCopyFileOperation((e) => this.onDidFailWorkingCopyFileOperation(e))), this._register(this.workingCopyFileService.onDidRunWorkingCopyFileOperation((e) => this.onDidRunWorkingCopyFileOperation(e)));
		}
		onDidFilesChange(e) {
			for (let t of this.models) t.isDirty() || e.contains(t.resource, R.UPDATED, R.ADDED) && this.queueModelReload(t);
		}
		onDidChangeFileSystemProviderCapabilities(e) {
			this.queueModelReloads(e.scheme);
		}
		onDidChangeFileSystemProviderRegistrations(e) {
			e.added && this.queueModelReloads(e.scheme);
		}
		queueModelReloads(e) {
			for (let t of this.models) t.isDirty() || e === t.resource.scheme && this.queueModelReload(t);
		}
		queueModelReload(e) {
			this.modelResolveQueue.queueSize(e.resource) <= 1 && this.modelResolveQueue.queueFor(e.resource, async () => {
				try {
					await this.reload(e);
				} catch (e) {
					An(e);
				}
			});
		}
		onWillRunWorkingCopyFileOperation(e) {
			if (e.operation === H.MOVE || e.operation === H.COPY) {
				let t = [];
				for (let { source: n, target: r } of e.files) if (n) {
					if (this.uriIdentityService.extUri.isEqual(n, r)) continue;
					let e = [];
					for (let t of this.models) this.uriIdentityService.extUri.isEqualOrParent(t.resource, n) && e.push(t);
					for (let i of e) {
						let e = i.resource, a;
						a = this.uriIdentityService.extUri.isEqual(e, n) ? r : z(r, e.path.substr(n.path.length + 1));
						let o = i.getLanguageId();
						t.push({
							source: e,
							target: a,
							language: o ? {
								id: o,
								explicit: i.languageChangeSource === "user"
							} : void 0,
							encoding: i.getEncoding(),
							snapshot: i.isDirty() ? i.createSnapshot() : void 0
						});
					}
				}
				this.mapCorrelationIdToModelsToRestore.set(e.correlationId, t);
			}
		}
		onDidFailWorkingCopyFileOperation(e) {
			if (e.operation === H.MOVE || e.operation === H.COPY) {
				let t = this.mapCorrelationIdToModelsToRestore.get(e.correlationId);
				t && (this.mapCorrelationIdToModelsToRestore.delete(e.correlationId), t.forEach((e) => {
					e.snapshot && this.get(e.source)?.setDirty(!0);
				}));
			}
		}
		onDidRunWorkingCopyFileOperation(e) {
			switch (e.operation) {
				case H.CREATE:
					e.waitUntil((async () => {
						for (let { target: t } of e.files) {
							let e = this.get(t);
							e && !e.isDisposed() && await e.revert();
						}
					})());
					break;
				case H.MOVE:
				case H.COPY:
					e.waitUntil((async () => {
						let t = this.mapCorrelationIdToModelsToRestore.get(e.correlationId);
						t && (this.mapCorrelationIdToModelsToRestore.delete(e.correlationId), await vn.settled(t.map(async (e) => {
							let t = this.uriIdentityService.asCanonicalUri(e.target), n = await this.resolve(t, {
								reload: { async: !1 },
								contents: e.snapshot ? ne(e.snapshot) : void 0,
								encoding: e.encoding
							});
							e.language?.id && e.language.id !== "plaintext" && (e.language.explicit ? n.setLanguageId(e.language.id) : n.getLanguageId() === "plaintext" && Fe(t) !== ".txt" && n.updateTextEditorModel(void 0, e.language.id));
						})));
					})());
					break;
			}
		}
		get(e) {
			return this.mapResourceToModel.get(e);
		}
		has(e) {
			return this.mapResourceToModel.has(e);
		}
		async reload(e) {
			await this.joinPendingResolves(e.resource), !(e.isDirty() || e.isDisposed() || !this.has(e.resource)) && await this.doResolve(e, { reload: { async: !1 } });
		}
		async resolve(e, t) {
			let n = this.joinPendingResolves(e);
			return n && await n, this.doResolve(e, t);
		}
		async doResolve(e, t) {
			let n, r;
			Fn.isUri(e) ? (r = e, n = this.get(r)) : (r = e.resource, n = e);
			let i, a = !1;
			if (n) t?.contents ? i = n.resolve(t) : t?.reload ? t.reload.async ? (i = Promise.resolve(), (async () => {
				try {
					await n.resolve(t);
				} catch (e) {
					n.isDisposed() || An(e);
				}
			})()) : i = n.resolve(t) : i = Promise.resolve();
			else {
				a = !0;
				let e = n = this.instantiationService.createInstance(Zo, r, t ? t.encoding : void 0, t ? t.languageId : void 0);
				i = n.resolve(t), this.registerModel(e);
			}
			this.mapResourceToPendingModelResolvers.set(r, i), this.add(r, n), a && (this._onDidCreate.fire(n), n.isDirty() && this._onDidChangeDirty.fire(n));
			try {
				await i;
			} catch (e) {
				throw a && n.dispose(), e;
			} finally {
				this.mapResourceToPendingModelResolvers.delete(r);
			}
			return t?.languageId && n.setLanguageId(t.languageId), a && n.isDirty() && this._onDidChangeDirty.fire(n), n;
		}
		joinPendingResolves(e) {
			if (this.mapResourceToPendingModelResolvers.get(e)) return this.doJoinPendingResolves(e);
		}
		async doJoinPendingResolves(e) {
			let t;
			for (; this.mapResourceToPendingModelResolvers.has(e);) {
				let n = this.mapResourceToPendingModelResolvers.get(e);
				if (n === t) return;
				t = n;
				try {
					await n;
				} catch {}
			}
		}
		registerModel(e) {
			let t = new I();
			t.add(e.onDidResolve((t) => this._onDidResolve.fire({
				model: e,
				reason: t
			}))), t.add(e.onDidChangeDirty(() => this._onDidChangeDirty.fire(e))), t.add(e.onDidChangeReadonly(() => this._onDidChangeReadonly.fire(e))), t.add(e.onDidChangeOrphaned(() => this._onDidChangeOrphaned.fire(e))), t.add(e.onDidSaveError(() => this._onDidSaveError.fire(e))), t.add(e.onDidSave((t) => this._onDidSave.fire({
				model: e,
				...t
			}))), t.add(e.onDidRevert(() => this._onDidRevert.fire(e))), t.add(e.onDidChangeEncoding(() => this._onDidChangeEncoding.fire(e))), this.mapResourceToModelListeners.set(e.resource, t);
		}
		add(e, t) {
			this.mapResourceToModel.get(e) !== t && (this.mapResourceToDisposeListener.get(e)?.dispose(), this.mapResourceToModel.set(e, t), this.mapResourceToDisposeListener.set(e, t.onWillDispose(() => this.remove(e))));
		}
		remove(e) {
			let t = this.mapResourceToModel.delete(e), n = this.mapResourceToDisposeListener.get(e);
			n && (j(n), this.mapResourceToDisposeListener.delete(e));
			let r = this.mapResourceToModelListeners.get(e);
			r && (j(r), this.mapResourceToModelListeners.delete(e)), t && this._onDidRemove.fire(e);
		}
		addSaveParticipant(e) {
			return this.saveParticipants.addSaveParticipant(e);
		}
		runSaveParticipants(e, t, n, r) {
			return this.saveParticipants.participate(e, t, n, r);
		}
		canDispose(e) {
			return e.isDisposed() || !this.mapResourceToPendingModelResolvers.has(e.resource) && !e.isDirty() ? !0 : this.doCanDispose(e);
		}
		async doCanDispose(e) {
			let t = this.joinPendingResolves(e.resource);
			return t ? (await t, this.canDispose(e)) : e.isDirty() ? (await jt.toPromise(e.onDidChangeDirty), this.canDispose(e)) : !0;
		}
		dispose() {
			super.dispose(), this.mapResourceToModel.clear(), this.mapResourceToPendingModelResolvers.clear(), j(this.mapResourceToDisposeListener.values()), this.mapResourceToDisposeListener.clear(), j(this.mapResourceToModelListeners.values()), this.mapResourceToModelListeners.clear();
		}
	}, rs = h([
		w(0, Je),
		w(1, Qn),
		w(2, Be),
		w(3, ts),
		w(4, Ze)
	], rs);
})), as, os = t((() => {
	g(), as = lt("elevatedFileService");
})), ss, cs = t((() => {
	g(), ss = lt("IFileDecorationsService");
})), ls, us, ds, fs = t((() => {
	F(), D(), ji(), Zr(), ei(), b(), f(), V(), tt(), mi(), Hi(), Uo(), is(), g(), _n(), Dt(), wt(), k(), gt(), y(), ve(), Pe(), ii(), Mi(), Wn(), ai(), ns(), rt(), Ln(), dr(), Bo(), _r(), Pr(), Sr(), pt(), os(), cs(), x(), xn(), Ur(), nr(), Le(), Ot(), je(), Wr(), on(), Yt(), a(), mr(), Tn(), us = class extends n {
		static {
			ls = this;
		}
		static {
			this.TEXTFILE_SAVE_CREATE_SOURCE = oi.registerSource("textFileCreate.source", s(14297, "File Created"));
		}
		static {
			this.TEXTFILE_SAVE_REPLACE_SOURCE = oi.registerSource("textFileOverwrite.source", s(14298, "File Replaced"));
		}
		constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, ee, te, ne, re) {
			super(), this.fileService = e, this.lifecycleService = n, this.instantiationService = r, this.modelService = i, this.environmentService = a, this.dialogService = o, this.fileDialogService = s, this.textResourceConfigurationService = c, this.filesConfigurationService = l, this.codeEditorService = u, this.pathService = d, this.workingCopyFileService = f, this.uriIdentityService = p, this.languageService = ee, this.logService = te, this.elevatedFileService = ne, this.decorationsService = re, this.files = this._register(this.instantiationService.createInstance(rs)), this.untitled = t, this.provideDecorations();
		}
		provideDecorations() {
			let e = this._register(new class extends n {
				constructor(e) {
					super(), this.files = e, this.label = s(14299, "Text File Model Decorations"), this._onDidChange = this._register(new p()), this.onDidChange = this._onDidChange.event, this.registerListeners();
				}
				registerListeners() {
					this._register(this.files.onDidResolve(({ model: e }) => {
						(e.isReadonly() || e.hasState(G.ORPHAN)) && this._onDidChange.fire([e.resource]);
					})), this._register(this.files.onDidRemove((e) => this._onDidChange.fire([e]))), this._register(this.files.onDidChangeReadonly((e) => this._onDidChange.fire([e.resource]))), this._register(this.files.onDidChangeOrphaned((e) => this._onDidChange.fire([e.resource])));
				}
				provideDecorations(e) {
					let t = this.files.get(e);
					if (!t || t.isDisposed()) return;
					let n = t.isReadonly(), r = t.hasState(G.ORPHAN);
					if (n && r) return {
						color: Tt,
						letter: rr.lockSmall,
						strikethrough: !0,
						tooltip: s(14300, "Deleted, Read-only")
					};
					if (n) return {
						letter: rr.lockSmall,
						tooltip: s(14301, "Read-only")
					};
					if (r) return {
						color: Tt,
						strikethrough: !0,
						tooltip: s(14302, "Deleted")
					};
				}
			}(this.files));
			this._register(this.decorationsService.registerDecorationsProvider(e));
		}
		get encoding() {
			return this._encoding ||= this._register(this.instantiationService.createInstance(ds)), this._encoding;
		}
		async read(e, t) {
			let [n, r] = await this.doRead(e, {
				...t,
				preferUnbuffered: !0
			});
			return {
				...n,
				encoding: r.detected.encoding || "utf8",
				value: await Ve(r.stream, (e) => e.join(""))
			};
		}
		async readStream(e, t) {
			let [n, r] = await this.doRead(e, t);
			return {
				...n,
				encoding: r.detected.encoding || "utf8",
				value: await Mt(r.stream)
			};
		}
		async doRead(e, t) {
			let n = new Vt(), r;
			if (t?.preferUnbuffered) {
				let i = await this.fileService.readFile(e, t, n.token);
				r = {
					...i,
					value: Ae(i.value)
				};
			} else r = await this.fileService.readFileStream(e, t, n.token);
			try {
				let n = await this.doGetDecodedStream(e, r.value, t);
				return [r, n];
			} catch (e) {
				throw n.dispose(!0), e.decodeStreamErrorKind === Po.STREAM_IS_BINARY ? new Ni(s(14303, "File seems to be binary and cannot be opened as text"), Oi.FILE_IS_BINARY, t) : e;
			}
		}
		async create(e, t) {
			let n = await Promise.all(e.map(async (e) => {
				let t = await this.getEncodedReadable(e.resource, e.value);
				return {
					resource: e.resource,
					contents: t,
					overwrite: e.options?.overwrite
				};
			}));
			return this.workingCopyFileService.create(n, qt.None, t);
		}
		async write(e, t, n) {
			let r = await this.getEncodedReadable(e, t, n);
			return n?.writeElevated && this.elevatedFileService.isSupported(e) ? this.elevatedFileService.writeFileElevated(e, r, n) : this.fileService.writeFile(e, r, n);
		}
		async getEncodedReadable(e, t, n) {
			let { encoding: r, addBOM: i } = await this.encoding.getWriteEncoding(e, n);
			return r === "utf8" && !i ? t === void 0 ? void 0 : Si(t) : (t ||= "", mo(typeof t == "string" ? Pi(t) : t, r, { addBOM: i }));
		}
		async getDecodedStream(e, t, n) {
			return (await this.doGetDecodedStream(e, t, n)).stream;
		}
		doGetDecodedStream(e, t, n) {
			return po(t, {
				acceptTextOnly: n?.acceptTextOnly ?? !1,
				guessEncoding: n?.autoGuessEncoding || this.textResourceConfigurationService.getValue(e, "files.autoGuessEncoding"),
				candidateGuessEncodings: n?.candidateGuessEncodings || this.textResourceConfigurationService.getValue(e, "files.candidateGuessEncodings"),
				overwriteEncoding: async (t) => this.validateDetectedEncoding(e, t ?? void 0, n)
			});
		}
		getEncoding(e) {
			return (e.scheme === B.untitled ? this.untitled.get(e) : this.files.get(e))?.getEncoding() ?? this.encoding.getUnvalidatedEncodingForResource(e);
		}
		async resolveDecoding(e, t) {
			return {
				preferredEncoding: (await this.encoding.getPreferredReadEncoding(e, t, void 0)).encoding,
				guessEncoding: t?.autoGuessEncoding || this.textResourceConfigurationService.getValue(e, "files.autoGuessEncoding"),
				candidateGuessEncodings: t?.candidateGuessEncodings || this.textResourceConfigurationService.getValue(e, "files.candidateGuessEncodings")
			};
		}
		async validateDetectedEncoding(e, t, n) {
			let { encoding: r } = await this.encoding.getPreferredReadEncoding(e, n, t);
			return r;
		}
		resolveEncoding(e, t) {
			return this.encoding.getWriteEncoding(e, t);
		}
		async save(e, t) {
			if (e.scheme === B.untitled) {
				let n = this.untitled.get(e);
				if (n) {
					let r;
					if (r = n.hasAssociatedFilePath ? await this.suggestSavePath(e) : await this.fileDialogService.pickFileToSave(await this.suggestSavePath(e), t?.availableFileSystems), r) return this.saveAs(e, r, t);
				}
			} else {
				let n = this.files.get(e);
				if (n) return await n.save(t) ? e : void 0;
			}
		}
		async saveAs(e, t, n) {
			if (t ||= await this.fileDialogService.pickFileToSave(await this.suggestSavePath(n?.suggestedTarget ?? e), n?.availableFileSystems), t) {
				if (this.filesConfigurationService.isReadonly(t)) if (await this.confirmMakeWriteable(t)) this.filesConfigurationService.updateReadonly(t, !1);
				else return;
				return ft(e, t) ? this.save(e, {
					...n,
					force: !0
				}) : this.fileService.hasProvider(e) && this.uriIdentityService.extUri.isEqual(e, t) && await this.fileService.exists(e) ? (await this.workingCopyFileService.move([{ file: {
					source: e,
					target: t
				} }], qt.None), await this.save(e, n) || await this.save(t, n), t) : this.doSaveAs(e, t, n);
			}
		}
		async doSaveAs(e, t, n) {
			let r = !1, i;
			if (e.scheme !== B.untitled) {
				let t = this.files.get(e);
				t?.isResolved() && (i = t);
			} else {
				let t = this.untitled.get(e);
				t?.isResolved() && (i = t);
			}
			if (i) r = await this.doSaveAsTextFile(i, e, t, n);
			else if (this.fileService.hasProvider(e)) await this.fileService.copy(e, t, !0), r = !0;
			else {
				let i = this.modelService.getModel(e);
				i && (r = await this.doSaveAsTextFile(i, e, t, n));
			}
			if (r) {
				try {
					await this.revert(e);
				} catch (e) {
					this.logService.error(e);
				}
				return e.scheme === B.untitled && this.untitled.notifyDidSave(e, t), t;
			}
		}
		async doSaveAsTextFile(e, t, n, r) {
			let i, a = e;
			typeof a.getEncoding == "function" && (i = a.getEncoding());
			let o = !1, s = this.files.get(n);
			if (s?.isResolved()) o = !0;
			else {
				o = await this.fileService.exists(n), o || await this.create([{
					resource: n,
					value: ""
				}]);
				try {
					s = await this.files.resolve(n, { encoding: i });
				} catch (i) {
					if (o && (i.textFileOperationResult === Oi.FILE_IS_BINARY || i.fileOperationResult === L.FILE_TOO_LARGE)) return await this.fileService.del(n), this.doSaveAsTextFile(e, t, n, r);
					throw i;
				}
			}
			let c;
			if (c = e instanceof Ho && e.hasAssociatedFilePath && o && this.uriIdentityService.extUri.isEqual(n, ur(e.resource, this.environmentService.remoteAuthority, this.pathService.defaultUriScheme)) ? await this.confirmOverwrite(n) : !0, !c) return !1;
			let l;
			e instanceof bi ? e.isResolved() && (l = e.textEditorModel ?? void 0) : l = e;
			let u;
			if (s.isResolved() && (u = s.textEditorModel), l && u) {
				s.updatePreferredEncoding(i), this.modelService.updateModel(u, ne(l.createSnapshot()));
				let e = l.getLanguageId(), t = u.getLanguageId();
				e !== "plaintext" && t === "plaintext" && u.setLanguage(e);
				let n = this.codeEditorService.getTransientModelProperties(l);
				if (n) for (let [e, t] of n) this.codeEditorService.setTransientModelProperty(u, e, t);
			}
			return r?.source || (r = {
				...r,
				source: o ? ls.TEXTFILE_SAVE_REPLACE_SOURCE : ls.TEXTFILE_SAVE_CREATE_SOURCE
			}), s.save({
				...r,
				from: t
			});
		}
		async confirmOverwrite(e) {
			let { confirmed: t } = await this.dialogService.confirm({
				type: "warning",
				message: s(14304, "'{0}' already exists. Do you want to replace it?", v(e)),
				detail: s(14305, "A file or folder with the name '{0}' already exists in the folder '{1}'. Replacing it will overwrite its current contents.", v(e), v(Ft(e))),
				primaryButton: s(14306, "&&Replace")
			});
			return t;
		}
		async confirmMakeWriteable(e) {
			let { confirmed: t } = await this.dialogService.confirm({
				type: "warning",
				message: s(14307, "'{0}' is marked as read-only. Do you want to save anyway?", v(e)),
				detail: s(14308, "Paths can be configured as read-only via settings."),
				primaryButton: s(14309, "&&Save Anyway")
			});
			return t;
		}
		async suggestSavePath(e) {
			if (this.fileService.hasProvider(e)) return e;
			let t = this.environmentService.remoteAuthority, n = await this.fileDialogService.defaultFilePath(), r;
			if (e.scheme === B.untitled) {
				let i = this.untitled.get(e);
				if (i) {
					if (i.hasAssociatedFilePath) return ur(e, t, this.pathService.defaultUriScheme);
					let a;
					a = await this.pathService.hasValidBasename(z(n, i.name), i.name) ? i.name : v(e);
					let o = i.getLanguageId();
					r = o && o !== "plaintext" ? this.suggestFilename(o, a) : a;
				}
			}
			return r ||= v(e), z(n, r);
		}
		suggestFilename(e, t) {
			if (!this.languageService.getLanguageName(e)) return t;
			let n = Ye(t), r = this.languageService.getExtensions(e);
			if (r.includes(n)) return t;
			let i = r.at(0);
			if (i) return n ? `${t.substring(0, t.indexOf(n))}${i}` : `${t}${i}`;
			let a = this.languageService.getFilenames(e);
			return a.includes(t) ? t : a.at(0) ?? t;
		}
		async revert(e, t) {
			if (e.scheme === B.untitled) {
				let n = this.untitled.get(e);
				if (n) return n.revert(t);
			} else {
				let n = this.files.get(e);
				if (n && (n.isDirty() || t?.force)) return n.revert(t);
			}
		}
		isDirty(e) {
			let t = e.scheme === B.untitled ? this.untitled.get(e) : this.files.get(e);
			return t ? t.isDirty() : !1;
		}
	}, us = ls = h([
		w(0, Qn),
		w(1, Ri),
		w(2, gi),
		w(3, Je),
		w(4, zr),
		w(5, si),
		w(6, Kt),
		w(7, an),
		w(8, Rr),
		w(9, vi),
		w(10, l),
		w(11, ti),
		w(12, ts),
		w(13, Ze),
		w(14, le),
		w(15, Tr),
		w(16, as),
		w(17, ss)
	], us), ds = class extends n {
		get encodingOverrides() {
			return this._encodingOverrides;
		}
		set encodingOverrides(e) {
			this._encodingOverrides = e;
		}
		constructor(e, t, n, r) {
			super(), this.textResourceConfigurationService = e, this.environmentService = t, this.contextService = n, this.uriIdentityService = r, this._encodingOverrides = this.getDefaultEncodingOverrides(), this.registerListeners();
		}
		registerListeners() {
			this._register(this.contextService.onDidChangeWorkspaceFolders(() => this.encodingOverrides = this.getDefaultEncodingOverrides()));
		}
		getDefaultEncodingOverrides() {
			let e = [];
			return e.push({
				parent: this.environmentService.userRoamingDataHome,
				encoding: J
			}), e.push({
				extension: hn,
				encoding: J
			}), e.push({
				parent: this.environmentService.untitledWorkspacesHome,
				encoding: J
			}), this.contextService.getWorkspace().folders.forEach((t) => {
				e.push({
					parent: z(t.uri, ".vscode"),
					encoding: J
				});
			}), e;
		}
		async getWriteEncoding(e, t) {
			let { encoding: n, hasBOM: r } = await this.getPreferredWriteEncoding(e, t ? t.encoding : void 0);
			return {
				encoding: n,
				addBOM: r
			};
		}
		async getPreferredWriteEncoding(e, t) {
			let n = await this.getValidatedEncodingForResource(e, t);
			return {
				encoding: n,
				hasBOM: n === "utf16be" || n === "utf16le" || n === "utf8bom"
			};
		}
		async getPreferredReadEncoding(e, t, n) {
			let r;
			t?.encoding ? r = n === "utf8bom" && t.encoding === "utf8" ? wo : t.encoding : typeof n == "string" ? r = n : this.textResourceConfigurationService.getValue(e, "files.encoding") === "utf8bom" && (r = J);
			let i = await this.getValidatedEncodingForResource(e, r);
			return {
				encoding: i,
				hasBOM: i === "utf16be" || i === "utf16le" || i === "utf8bom"
			};
		}
		getUnvalidatedEncodingForResource(e, t) {
			let n;
			return n = this.getEncodingOverride(e) || t || this.textResourceConfigurationService.getValue(e, "files.encoding"), n || "utf8";
		}
		async getValidatedEncodingForResource(e, t) {
			let n = this.getUnvalidatedEncodingForResource(e, t);
			return n !== "utf8" && !await ho(n) && (n = J), n;
		}
		getEncodingOverride(e) {
			if (e && this.encodingOverrides?.length) {
				for (let t of this.encodingOverrides) if (t.parent && this.uriIdentityService.extUri.isEqualOrParent(e, t.parent) || t.extension && Fe(e) === `.${t.extension}`) return t.encoding;
			}
		}
	}, ds = h([
		w(0, Rr),
		w(1, si),
		w(2, ln),
		w(3, Ze)
	], ds);
})), ps, ms = t((() => {
	F(), fs(), ji(), g(), Ke(), mi(), Wn(), wt(), Pr(), ve(), gt(), f(), Sr(), os(), ii(), ei(), ai(), Hi(), rt(), ns(), cs(), ps = class extends us {
		constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, ee, te, ne, re) {
			super(e, t, n, r, i, a, o, s, c, l, u, d, f, p, ee, ne, te, re), this.registerListeners();
		}
		registerListeners() {
			this._register(this.lifecycleService.onBeforeShutdown((e) => e.veto(this.onBeforeShutdown(), "veto.textFiles")));
		}
		onBeforeShutdown() {
			return !!this.files.models.some((e) => e.hasState(G.PENDING_SAVE));
		}
	}, ps = h([
		w(0, Qn),
		w(1, Ri),
		w(2, gi),
		w(3, Je),
		w(4, zr),
		w(5, si),
		w(6, Kt),
		w(7, an),
		w(8, Rr),
		w(9, vi),
		w(10, l),
		w(11, ti),
		w(12, ts),
		w(13, Ze),
		w(14, le),
		w(15, as),
		w(16, Tr),
		w(17, ss)
	], ps);
})), hs, gs = t((() => {
	Ke(), g(), hs = class {
		isSupported(e) {
			return !1;
		}
		async writeFileElevated(e, t, n) {
			throw Error("Unsupported");
		}
	};
})), _s, vs = t((() => {
	g(), wn(), _s = Oe(c);
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/common/contextkeys.js
function ys(e) {
	return `view.${e}.visible`;
}
function bs(e, t, n) {
	if (!t) {
		e.set("");
		return;
	}
	let r = xs(t, n);
	e.set(r.join(","));
}
function xs(e, t) {
	if (e.resource?.scheme === B.untitled && e.editorId !== pi.id) return [];
	if (e instanceof _i) {
		let n = xs(e.original, t), r = new Set(xs(e.modified, t));
		return n.filter((e) => r.has(e));
	}
	return e.resource ? t.getEditors(e.resource).map((e) => e.id) : [];
}
var X, Ss, Cs, ws, Ts, Es, Ds, Os, ks, As, js, Ms, Ns, Ps, Fs, Is, Ls, Rs, zs, Bs, Vs, Hs, Us, Ws, Gs, Ks, qs, Js, Ys, Xs, Zs, Qs, $s, ec, tc, nc, rc, ic, ac, oc, sc, cc, lc, uc, dc, fc, pc, mc, hc, gc, _c, vc, yc, bc, xc, Sc, Cc, wc, Tc, Ec, Dc, Oc, kc, Ac, jc, Mc, Nc, Pc, Fc, Ic, Lc, Rc, zc = t((() => {
	F(), V(), D(), Pt(), Vn(), k(), Pr(), f(), wt(), _n(), Zr(), ni(), Ss = new m("workbenchState", void 0, {
		type: "string",
		description: s(3975, "The kind of workspace opened in the window, either 'empty' (no workspace), 'folder' (single folder) or 'workspace' (multi-root workspace)")
	}), Cs = new m("workspaceFolderCount", 0, s(3976, "The number of root folders in the workspace")), ws = new m("openFolderWorkspaceSupport", !0, !0), Ts = new m("enterMultiRootWorkspaceSupport", !0, !0), Es = new m("emptyWorkspaceSupport", !0, !0), Ds = new m("dirtyWorkingCopies", !1, s(3977, "Whether there are any working copies with unsaved changes")), Os = new m("remoteName", "", s(3978, "The name of the remote the window is connected to or an empty string if not connected to any remote")), ks = new m("virtualWorkspace", "", s(3979, "The scheme of the current workspace is from a virtual file system or an empty string.")), As = new m("temporaryWorkspace", !1, s(3980, "The scheme of the current workspace is from a temporary file system.")), js = new m("hasWebFileSystemAccess", !1, !0), Ms = new m("embedderIdentifier", void 0, s(3981, "The identifier of the embedder according to the product service, if one is defined")), Ns = new m("inAutomation", !1, s(3982, "Whether VS Code is running under automation/smoke test")), Ps = new m("isSandboxWorkspace", !1, !0), Fs = new m("isFullscreen", !1, s(3983, "Whether the main window is in fullscreen mode")), Is = new m("isAuxiliaryWindowFocusedContext", !1, s(3984, "Whether an auxiliary window is focused")), Ls = new m("isAuxiliaryWindow", !1, s(3985, "Window is an auxiliary window")), Rs = new m("activeEditorIsDirty", !1, s(3986, "Whether the active editor has unsaved changes")), zs = new m("activeEditorIsNotPreview", !1, s(3987, "Whether the active editor is not in preview mode")), Bs = new m("activeEditorIsFirstInGroup", !1, s(3988, "Whether the active editor is the first one in its group")), Vs = new m("activeEditorIsLastInGroup", !1, s(3989, "Whether the active editor is the last one in its group")), Hs = new m("activeEditorIsPinned", !1, s(3990, "Whether the active editor is pinned")), Us = new m("activeEditorIsReadonly", !1, s(3991, "Whether the active editor is read-only")), Ws = new m("activeCompareEditorCanSwap", !1, s(3992, "Whether the active compare editor can swap sides")), Gs = new m("activeEditorCanToggleReadonly", !0, s(3993, "Whether the active editor can toggle between being read-only or writeable")), Ks = new m("activeEditorCanRevert", !1, s(3994, "Whether the active editor can revert")), qs = new m("activeEditorCanSplitInGroup", !0), Js = new m("activeEditor", null, {
		type: "string",
		description: s(3995, "The identifier of the active editor")
	}), Ys = new m("activeEditorAvailableEditorIds", "", s(3996, "The available editor identifiers that are usable for the active editor")), Xs = new m("textCompareEditorVisible", !1, s(3997, "Whether a text compare editor is visible")), Zs = new m("textCompareEditorActive", !1, s(3998, "Whether a text compare editor is active")), Qs = new m("sideBySideEditorActive", !1, s(3999, "Whether a side by side editor is active")), $s = new m("groupEditorsCount", 0, s(4e3, "The number of opened editor groups")), ec = new m("activeEditorGroupEmpty", !1, s(4001, "Whether the active editor group is empty")), tc = new m("activeEditorGroupIndex", 0, s(4002, "The index of the active editor group")), nc = new m("activeEditorGroupLast", !1, s(4003, "Whether the active editor group is the last group")), rc = new m("activeEditorGroupLocked", !1, s(4004, "Whether the active editor group is locked")), ic = new m("multipleEditorGroups", !1, s(4005, "Whether there are multiple editor groups opened")), ac = new m("multipleEditorsSelectedInGroup", !1, s(4006, "Whether multiple editors have been selected in an editor group")), oc = new m("twoEditorsSelectedInGroup", !1, s(4007, "Whether exactly two editors have been selected in an editor group")), sc = new m("SelectedEditorsInGroupFileOrUntitledResourceContextKey", !0, s(4008, "Whether all selected editors in a group have a file or untitled resource associated")), cc = new m("editorPartMultipleEditorGroups", !1, s(4009, "Whether there are multiple editor groups opened in an editor part")), lc = new m("editorPartMaximizedEditorGroup", !1, s(4010, "Editor Part has a maximized group")), uc = new m("editorIsOpen", !1, s(4011, "Whether an editor is open")), dc = new m("inZenMode", !1, s(4012, "Whether Zen mode is enabled")), fc = new m("isCenteredLayout", !1, s(4013, "Whether centered layout is enabled for the main editor")), pc = new m("splitEditorsVertically", !1, s(4014, "Whether editors split vertically")), mc = new m("mainEditorAreaVisible", !0, s(4015, "Whether the editor area in the main window is visible")), hc = new m("editorTabsVisible", !0, s(4016, "Whether editor tabs are visible")), gc = new m("sideBarVisible", !1, s(4017, "Whether the sidebar is visible")), _c = new m("sideBarFocus", !1, s(4018, "Whether the sidebar has keyboard focus")), vc = new m("activeViewlet", "", s(4019, "The identifier of the active viewlet")), yc = new m("statusBarFocused", !1, s(4020, "Whether the status bar has keyboard focus")), bc = new m("titleBarStyle", "custom", s(4021, "Style of the window title bar")), xc = new m("titleBarVisible", !1, s(4022, "Whether the title bar is visible")), Sc = new m("isCompactTitleBar", !1, s(4023, "Title bar is in compact mode")), Cc = new m("bannerFocused", !1, s(4024, "Whether the banner has keyboard focus")), wc = new m("notificationFocus", !0, s(4025, "Whether a notification has keyboard focus")), Tc = new m("notificationCenterVisible", !1, s(4026, "Whether the notifications center is visible")), Ec = new m("notificationToastsVisible", !1, s(4027, "Whether a notification toast is visible")), Dc = new m("activeAuxiliary", "", s(4028, "The identifier of the active auxiliary panel")), Oc = new m("auxiliaryBarFocus", !1, s(4029, "Whether the auxiliary bar has keyboard focus")), kc = new m("auxiliaryBarVisible", !1, s(4030, "Whether the auxiliary bar is visible")), Ac = new m("auxiliaryBarMaximized", !1, s(4031, "Whether the auxiliary bar is maximized")), jc = new m("activePanel", "", s(4032, "The identifier of the active panel")), Mc = new m("panelFocus", !1, s(4033, "Whether the panel has keyboard focus")), Nc = new m("panelPosition", "bottom", s(4034, "The position of the panel, always 'bottom'")), Pc = new m("panelAlignment", "center", s(4035, "The alignment of the panel, either 'center', 'left', 'right' or 'justify'")), Fc = new m("panelVisible", !1, s(4036, "Whether the panel is visible")), Ic = new m("panelMaximized", !1, s(4037, "Whether the panel is maximized")), Lc = new m("focusedView", "", s(4038, "The identifier of the view that has keyboard focus")), Rc = class {
		static {
			X = this;
		}
		static {
			this.Scheme = new m("resourceScheme", void 0, {
				type: "string",
				description: s(4039, "The scheme of the resource")
			});
		}
		static {
			this.Filename = new m("resourceFilename", void 0, {
				type: "string",
				description: s(4040, "The file name of the resource")
			});
		}
		static {
			this.Dirname = new m("resourceDirname", void 0, {
				type: "string",
				description: s(4041, "The folder name the resource is contained in")
			});
		}
		static {
			this.Path = new m("resourcePath", void 0, {
				type: "string",
				description: s(4042, "The full path of the resource")
			});
		}
		static {
			this.LangId = new m("resourceLangId", void 0, {
				type: "string",
				description: s(4043, "The language identifier of the resource")
			});
		}
		static {
			this.Resource = new m("resource", void 0, {
				type: "URI",
				description: s(4044, "The full value of the resource including scheme and path")
			});
		}
		static {
			this.Extension = new m("resourceExtname", void 0, {
				type: "string",
				description: s(4045, "The extension name of the resource")
			});
		}
		static {
			this.HasResource = new m("resourceSet", void 0, {
				type: "boolean",
				description: s(4046, "Whether a resource is present or not")
			});
		}
		static {
			this.IsFileSystemResource = new m("isFileSystemResource", void 0, {
				type: "boolean",
				description: s(4047, "Whether the resource is backed by a file system provider")
			});
		}
		constructor(e, t, n, r) {
			this._contextKeyService = e, this._fileService = t, this._languageService = n, this._modelService = r, this._disposables = new I(), this._schemeKey = X.Scheme.bindTo(this._contextKeyService), this._filenameKey = X.Filename.bindTo(this._contextKeyService), this._dirnameKey = X.Dirname.bindTo(this._contextKeyService), this._pathKey = X.Path.bindTo(this._contextKeyService), this._langIdKey = X.LangId.bindTo(this._contextKeyService), this._resourceKey = X.Resource.bindTo(this._contextKeyService), this._extensionKey = X.Extension.bindTo(this._contextKeyService), this._hasResource = X.HasResource.bindTo(this._contextKeyService), this._isFileSystemResource = X.IsFileSystemResource.bindTo(this._contextKeyService), this._disposables.add(t.onDidChangeFileSystemProviderRegistrations(() => {
				let e = this.get();
				this._isFileSystemResource.set(!!(e && t.hasProvider(e)));
			})), this._disposables.add(r.onModelAdded((e) => {
				ft(e.uri, this.get()) && this._setLangId();
			})), this._disposables.add(r.onModelLanguageChanged((e) => {
				ft(e.model.uri, this.get()) && this._setLangId();
			}));
		}
		dispose() {
			this._disposables.dispose();
		}
		_setLangId() {
			let e = this.get();
			if (!e) {
				this._langIdKey.set(null);
				return;
			}
			let t = this._modelService.getModel(e)?.getLanguageId() ?? this._languageService.guessLanguageIdByFilepathOrFirstLine(e);
			this._langIdKey.set(t);
		}
		set(e) {
			e ??= void 0, !ft(this._value, e) && (this._value = e, this._contextKeyService.bufferChangeEvents(() => {
				this._resourceKey.set(e ? e.toString() : null), this._schemeKey.set(e ? e.scheme : null), this._filenameKey.set(e ? v(e) : null), this._dirnameKey.set(e ? this.uriToPath(Ft(e)) : null), this._pathKey.set(e ? this.uriToPath(e) : null), this._setLangId(), this._extensionKey.set(e ? Fe(e) : null), this._hasResource.set(!!e), this._isFileSystemResource.set(e ? this._fileService.hasProvider(e) : !1);
			}));
		}
		uriToPath(e) {
			return e.scheme === B.file ? e.fsPath : e.path;
		}
		reset() {
			this._value = void 0, this._contextKeyService.bufferChangeEvents(() => {
				this._resourceKey.reset(), this._schemeKey.reset(), this._filenameKey.reset(), this._dirnameKey.reset(), this._pathKey.reset(), this._langIdKey.reset(), this._extensionKey.reset(), this._hasResource.reset(), this._isFileSystemResource.reset();
			});
		}
		get() {
			return this._value;
		}
	}, Rc = X = h([
		w(0, xr),
		w(1, Qn),
		w(2, le),
		w(3, zr)
	], Rc);
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/layout/browser/layoutService.js
function Bc(e) {
	return e === Q.BOTTOM || e === Q.TOP;
}
function Vc(e) {
	switch (e) {
		case Q.LEFT: return "left";
		case Q.RIGHT: return "right";
		case Q.BOTTOM: return "bottom";
		case Q.TOP: return "top";
		default: return "bottom";
	}
}
function Hc(e) {
	return $c[e];
}
function Uc(e) {
	switch (e) {
		case $.ALWAYS: return "always";
		case $.NEVER: return "never";
		case $.REMEMBER_LAST: return "preserve";
		default: return "preserve";
	}
}
function Wc(e) {
	return el[e];
}
function Gc(e) {
	return e === Z.EDITOR_PART || e === Z.STATUSBAR_PART || e === Z.TITLEBAR_PART;
}
function Kc(e, t, n) {
	let r = fr(t), i = vr(e);
	if (!Lt) {
		let t = e.getValue(_t.CUSTOM_TITLE_BAR_VISIBILITY);
		if (t === it.NEVER && i || t === it.WINDOWED && r) return !1;
	}
	if (!qc(e)) return !0;
	if (i && He(e)) return !1;
	if (re && we) return !r;
	if (we && !r || On() && !r) return !0;
	switch (oe(t) ? "hidden" : Ce(e)) {
		case "classic": return !r || !!n;
		case "compact":
		case "hidden": return !1;
		case "toggle": return !!n;
		case "visible": return !0;
		default: return Lt ? !1 : !r || !!n;
	}
}
function qc(e) {
	if (e.getValue(Yc.COMMAND_CENTER)) return !1;
	let t = e.getValue(Yc.ACTIVITY_BAR_LOCATION);
	if (t === Xc.TOP || t === Xc.BOTTOM) return !1;
	let n = e.getValue(Yc.EDITOR_ACTIONS_LOCATION), r = e.getValue(Yc.EDITOR_TABS_MODE);
	return !(n === Qc.TITLEBAR || n === Qc.DEFAULT && r === Zc.NONE || e.getValue(Yc.LAYOUT_ACTIONS));
}
var Z, Jc, Yc, Xc, Zc, Qc, Q, $, $c, el, tl = t((() => {
	Kn(), St(), Re(), $n(), (function(e) {
		e.TITLEBAR_PART = "workbench.parts.titlebar", e.BANNER_PART = "workbench.parts.banner", e.ACTIVITYBAR_PART = "workbench.parts.activitybar", e.SIDEBAR_PART = "workbench.parts.sidebar", e.PANEL_PART = "workbench.parts.panel", e.AUXILIARYBAR_PART = "workbench.parts.auxiliarybar", e.EDITOR_PART = "workbench.parts.editor", e.STATUSBAR_PART = "workbench.parts.statusbar";
	})(Z ||= {}), (function(e) {
		e.SHOW_TABS = "zenMode.showTabs", e.HIDE_LINENUMBERS = "zenMode.hideLineNumbers", e.HIDE_STATUSBAR = "zenMode.hideStatusBar", e.HIDE_ACTIVITYBAR = "zenMode.hideActivityBar", e.CENTER_LAYOUT = "zenMode.centerLayout", e.FULLSCREEN = "zenMode.fullScreen", e.RESTORE = "zenMode.restore", e.SILENT_NOTIFICATIONS = "zenMode.silentNotifications";
	})(Jc ||= {}), (function(e) {
		e.ACTIVITY_BAR_LOCATION = "workbench.activityBar.location", e.EDITOR_TABS_MODE = "workbench.editor.showTabs", e.EDITOR_ACTIONS_LOCATION = "workbench.editor.editorActionsLocation", e.COMMAND_CENTER = "window.commandCenter", e.LAYOUT_ACTIONS = "workbench.layoutControl.enabled";
	})(Yc ||= {}), (function(e) {
		e.DEFAULT = "default", e.TOP = "top", e.BOTTOM = "bottom", e.HIDDEN = "hidden";
	})(Xc ||= {}), (function(e) {
		e.MULTIPLE = "multiple", e.SINGLE = "single", e.NONE = "none";
	})(Zc ||= {}), (function(e) {
		e.DEFAULT = "default", e.TITLEBAR = "titleBar", e.HIDDEN = "hidden";
	})(Qc ||= {}), (function(e) {
		e[e.LEFT = 0] = "LEFT", e[e.RIGHT = 1] = "RIGHT", e[e.BOTTOM = 2] = "BOTTOM", e[e.TOP = 3] = "TOP";
	})(Q ||= {}), (function(e) {
		e[e.ALWAYS = 0] = "ALWAYS", e[e.NEVER = 1] = "NEVER", e[e.REMEMBER_LAST = 2] = "REMEMBER_LAST";
	})($ ||= {}), $c = {
		[Vc(Q.LEFT)]: Q.LEFT,
		[Vc(Q.RIGHT)]: Q.RIGHT,
		[Vc(Q.BOTTOM)]: Q.BOTTOM,
		[Vc(Q.TOP)]: Q.TOP
	}, el = {
		[Uc($.ALWAYS)]: $.ALWAYS,
		[Uc($.NEVER)]: $.NEVER,
		[Uc($.REMEMBER_LAST)]: $.REMEMBER_LAST
	};
})), nl, rl = t((() => {
	g(), nl = lt("paneCompositePartService");
})), il, al = t((() => {
	F(), $n(), St(), V(), Kn(), ut(), Pt(), Vn(), Rt(), to(), ka(), Ji(), Re(), Ia(), Ln(), dr(), zc(), di(), fi(), Bi(), mi(), tl(), vs(), rl(), Ti(), il = class extends n {
		constructor(e, t, n, r, i, a, o, s, c, l) {
			super(), this.contextKeyService = e, this.contextService = t, this.configurationService = n, this.environmentService = r, this.productService = i, this.editorGroupService = a, this.editorService = o, this.layoutService = s, this.paneCompositeService = c, this.workingCopyService = l, bt.bindTo(this.contextKeyService), qe.bindTo(this.contextKeyService), Te.bindTo(this.contextKeyService), Nt.bindTo(this.contextKeyService), Jr.bindTo(this.contextKeyService), Me.bindTo(this.contextKeyService), ae.bindTo(this.contextKeyService), Os.bindTo(this.contextKeyService).set(qi(this.environmentService.remoteAuthority) || ""), this.virtualWorkspaceContext = ks.bindTo(this.contextKeyService), this.temporaryWorkspaceContext = As.bindTo(this.contextKeyService), this.updateWorkspaceContextKeys(), js.bindTo(this.contextKeyService).set($a.supported(Mr));
			let u = !this.environmentService.isBuilt || this.environmentService.isExtensionDevelopment;
			be.bindTo(this.contextKeyService).set(u), Ee(be.key, u), At.bindTo(this.contextKeyService).set(this.productService.quality || ""), Ms.bindTo(this.contextKeyService).set(i.embedderIdentifier), this.inAutomationContext = Ns.bindTo(this.contextKeyService), this.inAutomationContext.set(!!this.environmentService.enableSmokeTestDriver), this.activeEditorGroupEmpty = ec.bindTo(this.contextKeyService), this.activeEditorGroupIndex = tc.bindTo(this.contextKeyService), this.activeEditorGroupLast = nc.bindTo(this.contextKeyService), this.activeEditorGroupLocked = rc.bindTo(this.contextKeyService), this.multipleEditorGroupsContext = ic.bindTo(this.contextKeyService), this.editorsVisibleContext = uc.bindTo(this.contextKeyService), this.dirtyWorkingCopiesContext = Ds.bindTo(this.contextKeyService), this.dirtyWorkingCopiesContext.set(this.workingCopyService.hasDirty), this.workbenchStateContext = Ss.bindTo(this.contextKeyService), this.updateWorkbenchStateContextKey(), this.workspaceFolderCountContext = Cs.bindTo(this.contextKeyService), this.updateWorkspaceFolderCountContextKey(), this.openFolderWorkspaceSupportContext = ws.bindTo(this.contextKeyService), this.openFolderWorkspaceSupportContext.set(we || typeof this.environmentService.remoteAuthority == "string"), this.emptyWorkspaceSupportContext = Es.bindTo(this.contextKeyService), this.emptyWorkspaceSupportContext.set(we || typeof this.environmentService.remoteAuthority == "string"), this.enterMultiRootWorkspaceSupportContext = Ts.bindTo(this.contextKeyService), this.enterMultiRootWorkspaceSupportContext.set(we || typeof this.environmentService.remoteAuthority == "string"), this.splitEditorsVerticallyContext = pc.bindTo(this.contextKeyService), this.updateSplitEditorsVerticallyContext(), this.isMainWindowFullscreenContext = Fs.bindTo(this.contextKeyService), this.isAuxiliaryWindowFocusedContext = Is.bindTo(this.contextKeyService), this.inZenModeContext = dc.bindTo(this.contextKeyService), this.isMainEditorCenteredLayoutContext = fc.bindTo(this.contextKeyService), this.mainEditorAreaVisibleContext = mc.bindTo(this.contextKeyService), this.editorTabsVisibleContext = hc.bindTo(this.contextKeyService), this.sideBarVisibleContext = gc.bindTo(this.contextKeyService), this.titleAreaVisibleContext = xc.bindTo(this.contextKeyService), this.titleBarStyleContext = bc.bindTo(this.contextKeyService), this.updateTitleBarContextKeys(), this.panelPositionContext = Nc.bindTo(this.contextKeyService), this.panelPositionContext.set(Vc(this.layoutService.getPanelPosition())), this.panelVisibleContext = Fc.bindTo(this.contextKeyService), this.panelVisibleContext.set(this.layoutService.isVisible(Z.PANEL_PART)), this.panelMaximizedContext = Ic.bindTo(this.contextKeyService), this.panelMaximizedContext.set(this.layoutService.isPanelMaximized()), this.panelAlignmentContext = Pc.bindTo(this.contextKeyService), this.panelAlignmentContext.set(this.layoutService.getPanelAlignment()), this.auxiliaryBarVisibleContext = kc.bindTo(this.contextKeyService), this.auxiliaryBarVisibleContext.set(this.layoutService.isVisible(Z.AUXILIARYBAR_PART)), this.auxiliaryBarMaximizedContext = Ac.bindTo(this.contextKeyService), this.auxiliaryBarMaximizedContext.set(this.layoutService.isAuxiliaryBarMaximized()), Ps.bindTo(this.contextKeyService), this.registerListeners();
		}
		registerListeners() {
			this.editorGroupService.whenReady.then(() => {
				this.updateEditorAreaContextKeys(), this.updateActiveEditorGroupContextKeys(), this.updateVisiblePanesContextKeys();
			}), this._register(this.editorService.onDidActiveEditorChange(() => this.updateActiveEditorGroupContextKeys())), this._register(this.editorService.onDidVisibleEditorsChange(() => this.updateVisiblePanesContextKeys())), this._register(this.editorGroupService.onDidAddGroup(() => this.updateEditorGroupsContextKeys())), this._register(this.editorGroupService.onDidRemoveGroup(() => this.updateEditorGroupsContextKeys())), this._register(this.editorGroupService.onDidChangeGroupIndex(() => this.updateActiveEditorGroupContextKeys())), this._register(this.editorGroupService.onDidChangeGroupLocked(() => this.updateActiveEditorGroupContextKeys())), this._register(this.editorGroupService.onDidChangeEditorPartOptions(() => this.updateEditorAreaContextKeys())), this._register(this.contextService.onDidChangeWorkbenchState(() => this.updateWorkbenchStateContextKey())), this._register(this.contextService.onDidChangeWorkspaceFolders(() => {
				this.updateWorkspaceFolderCountContextKey(), this.updateWorkspaceContextKeys();
			})), this._register(this.configurationService.onDidChangeConfiguration((e) => {
				e.affectsConfiguration("workbench.editor.openSideBySideDirection") && this.updateSplitEditorsVerticallyContext();
			})), this._register(this.layoutService.onDidChangeZenMode((e) => this.inZenModeContext.set(e))), this._register(this.layoutService.onDidChangeActiveContainer(() => this.isAuxiliaryWindowFocusedContext.set(this.layoutService.activeContainer !== this.layoutService.mainContainer))), this._register(Hr((e) => {
				e === Mr.vscodeWindowId && this.isMainWindowFullscreenContext.set(fr(Mr));
			})), this._register(this.layoutService.onDidChangeMainEditorCenteredLayout((e) => this.isMainEditorCenteredLayoutContext.set(e))), this._register(this.layoutService.onDidChangePanelPosition((e) => this.panelPositionContext.set(e))), this._register(this.layoutService.onDidChangePanelAlignment((e) => this.panelAlignmentContext.set(e))), this._register(this.paneCompositeService.onDidPaneCompositeClose(() => this.updateSideBarContextKeys())), this._register(this.paneCompositeService.onDidPaneCompositeOpen(() => this.updateSideBarContextKeys())), this._register(this.layoutService.onDidChangePartVisibility(() => {
				this.mainEditorAreaVisibleContext.set(this.layoutService.isVisible(Z.EDITOR_PART, Mr)), this.panelVisibleContext.set(this.layoutService.isVisible(Z.PANEL_PART)), this.panelMaximizedContext.set(this.layoutService.isPanelMaximized()), this.auxiliaryBarVisibleContext.set(this.layoutService.isVisible(Z.AUXILIARYBAR_PART)), this.updateTitleBarContextKeys();
			})), this._register(this.layoutService.onDidChangeAuxiliaryBarMaximized(() => {
				this.auxiliaryBarMaximizedContext.set(this.layoutService.isAuxiliaryBarMaximized());
			})), this._register(this.workingCopyService.onDidChangeDirty((e) => this.dirtyWorkingCopiesContext.set(e.isDirty() || this.workingCopyService.hasDirty)));
		}
		updateVisiblePanesContextKeys() {
			this.editorService.visibleEditorPanes.length > 0 ? this.editorsVisibleContext.set(!0) : this.editorsVisibleContext.reset();
		}
		updateActiveEditorGroupContextKeys() {
			this.editorService.activeEditor ? this.activeEditorGroupEmpty.reset() : this.activeEditorGroupEmpty.set(!0);
			let e = this.editorGroupService.activeGroup;
			this.activeEditorGroupIndex.set(e.index + 1), this.activeEditorGroupLocked.set(e.isLocked), this.updateEditorGroupsContextKeys();
		}
		updateEditorGroupsContextKeys() {
			let e = this.editorGroupService.count;
			e > 1 ? this.multipleEditorGroupsContext.set(!0) : this.multipleEditorGroupsContext.reset();
			let t = this.editorGroupService.activeGroup;
			this.activeEditorGroupLast.set(t.index === e - 1);
		}
		updateEditorAreaContextKeys() {
			this.editorTabsVisibleContext.set(this.editorGroupService.partOptions.showTabs === "multiple");
		}
		updateWorkbenchStateContextKey() {
			this.workbenchStateContext.set(this.getWorkbenchStateString());
		}
		updateWorkspaceFolderCountContextKey() {
			this.workspaceFolderCountContext.set(this.contextService.getWorkspace().folders.length);
		}
		updateSplitEditorsVerticallyContext() {
			let e = ki(this.configurationService);
			this.splitEditorsVerticallyContext.set(e === hi.DOWN);
		}
		getWorkbenchStateString() {
			switch (this.contextService.getWorkbenchState()) {
				case bn.EMPTY: return "empty";
				case bn.FOLDER: return "folder";
				case bn.WORKSPACE: return "workspace";
			}
		}
		updateSideBarContextKeys() {
			this.sideBarVisibleContext.set(this.layoutService.isVisible(Z.SIDEBAR_PART));
		}
		updateTitleBarContextKeys() {
			this.titleAreaVisibleContext.set(this.layoutService.isVisible(Z.TITLEBAR_PART, Mr)), this.titleBarStyleContext.set(kt(this.configurationService));
		}
		updateWorkspaceContextKeys() {
			this.virtualWorkspaceContext.set(Pa(this.contextService.getWorkspace()) || ""), this.temporaryWorkspaceContext.set(fn(this.contextService.getWorkspace()));
		}
	}, il = h([
		w(0, xr),
		w(1, ln),
		w(2, nt),
		w(3, si),
		w(4, Oa),
		w(5, ui),
		w(6, xi),
		w(7, _s),
		w(8, nl),
		w(9, wi)
	], il);
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/lifecycle.js
function ol(e) {
	_l.push(e);
}
function sl(e) {
	yl.push(e);
}
async function cl(e) {
	await e.invokeFunction(async (e) => {
		await Promise.all(_l.map((t) => t(e)));
	}), await e.invokeFunction(async (t) => {
		nn((t, n) => e.createInstance(Rn, t, { instantHover: n }, {})), Nr(t.get(Ar));
		let n = t.get(gi);
		Se.as(Vi.Workbench).start(t), Se.as(ci.EditorFactory).start(t), await Promise.all(vl.map((e) => e(t))), n.phase = $r.Ready;
	}), await e.invokeFunction(async (e) => {
		await Promise.all(yl.map((t) => t(e)));
	}), hl.open(), gl.fire(), e.invokeFunction(async (e) => {
		let t = e.get(gi);
		ml((e) => {
			e.get(Je).createInstance(il);
		}), dl.fire(e), pl.fire(e), await Promise.race([e.get(_s).whenRestored, We(2e3)]), t.phase = $r.Restored, new ar(() => {
			Ct(window, () => {
				t.phase = $r.Eventually;
			}, 2500);
		}, 2500).schedule();
	});
}
async function ll() {
	await hl.wait();
}
function ul() {
	if (bl) throw Error("Services are already initialized");
}
var dl, fl, pl, ml, hl, gl, _l, vl, yl, bl, xl = t((() => {
	Ue(), zi(), li(), ei(), g(), at(), x(), Zr(), yr(), V(), vs(), Ut(), ce(), Mn(), Gr(), al(), dl = new p(), fl = dl.event, pl = new p(), ml = pl.event, hl = new zn(), gl = new p(), _l = [], vl = [], yl = [], bl = !1, cr.withServices(() => (bl = !0, n.None));
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/workspaces/browser/workspaces.js
function Sl(e) {
	return {
		id: wl(e),
		configPath: e
	};
}
function Cl(e) {
	return {
		id: wl(e),
		uri: e
	};
}
function wl(e) {
	return Gn(e.toString()).toString(16);
}
var Tl = t((() => {
	Xe();
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/workbench.js
function El() {
	return Ml;
}
function Dl() {
	return Nl;
}
function Ol() {
	return Pl;
}
function kl() {
	return Fl;
}
function Al(e) {
	let t;
	return e.workspaceProvider != null && (t = e.workspaceProvider.workspace), t != null && rn(t) ? Sl(t.workspaceUri) : t != null && Gt(t) ? Cl(t.folderUri) : wr;
}
function jl(e, t, n = {}) {
	Ml = e, Nl = t, Pl = n, Fl = Al(t);
}
var Ml, Nl, Pl, Fl, Il, Ll = t((() => {
	Ln(), Re(), Tl(), kn(), yt(), Ml = document.body, Nl = {}, Pl = {}, Fl = wr, Il = Fn.file(ie(/* @__PURE__ */ new Date()).replace(/-|:|\.\d+Z$/g, "")).with({ scheme: "vscode-log" });
})), Rl, zl, Bl = t((() => {
	Kn(), Or(), D(), Zt(), b(), Ue(), Bo(), Rl = Se.as(Xr.Configuration), zl = we ? {
		type: "string",
		scope: S.APPLICATION,
		enum: [
			W.OFF,
			W.ON_EXIT,
			W.ON_EXIT_AND_WINDOW_CLOSE
		],
		default: W.ON_EXIT,
		markdownEnumDescriptions: [
			s(8108, "Disable hot exit. A prompt will show when attempting to close a window with editors that have unsaved changes."),
			s(8109, "Hot exit will be triggered when the last window is closed on Windows/Linux or when the `workbench.action.quit` command is triggered (command palette, keybinding, menu). All windows without folders opened will be restored upon next launch. A list of previously opened windows with unsaved files can be accessed via `File > Open Recent > More...`"),
			s(8110, "Hot exit will be triggered when the last window is closed on Windows/Linux or when the `workbench.action.quit` command is triggered (command palette, keybinding, menu), and also for any window with a folder opened regardless of whether it's the last window. All windows without folders opened will be restored upon next launch. A list of previously opened windows with unsaved files can be accessed via `File > Open Recent > More...`")
		],
		markdownDescription: s(8111, "[Hot Exit](https://aka.ms/vscode-hot-exit) controls whether unsaved files are remembered between sessions, allowing the save prompt when exiting the editor to be skipped.", W.ON_EXIT, W.ON_EXIT_AND_WINDOW_CLOSE)
	} : {
		type: "string",
		scope: S.APPLICATION,
		enum: [W.OFF, W.ON_EXIT_AND_WINDOW_CLOSE],
		default: W.ON_EXIT_AND_WINDOW_CLOSE,
		markdownEnumDescriptions: [s(8108, "Disable hot exit. A prompt will show when attempting to close a window with editors that have unsaved changes."), s(8112, "Hot exit will be triggered when the browser quits or the window or tab is closed.")],
		markdownDescription: s(8111, "[Hot Exit](https://aka.ms/vscode-hot-exit) controls whether unsaved files are remembered between sessions, allowing the save prompt when exiting the editor to be skipped.", W.ON_EXIT, W.ON_EXIT_AND_WINDOW_CLOSE)
	}, Rl.registerConfiguration({
		id: "files",
		order: 9,
		title: s(8113, "Files"),
		type: "object",
		properties: {
			[lr]: {
				type: "object",
				markdownDescription: s(8114, "Configure [glob patterns](https://aka.ms/vscode-glob-patterns) for excluding files and folders. For example, the File Explorer decides which files and folders to show or hide based on this setting. Refer to the `#search.exclude#` setting to define search-specific excludes. Refer to the `#explorer.excludeGitIgnore#` setting for ignoring files based on your `.gitignore`."),
				default: {
					"**/.git": !0,
					"**/.svn": !0,
					"**/.hg": !0,
					"**/.DS_Store": !0,
					"**/Thumbs.db": !0,
					...Lt ? { "**/*.crswap": !0 } : void 0
				},
				scope: S.RESOURCE,
				additionalProperties: { anyOf: [{
					type: "boolean",
					enum: [!0, !1],
					enumDescriptions: [s(8115, "Enable the pattern."), s(8116, "Disable the pattern.")],
					description: s(8117, "The glob pattern to match file paths against. Set to true or false to enable or disable the pattern.")
				}, {
					type: "object",
					properties: { when: {
						type: "string",
						pattern: "\\w*\\$\\(basename\\)\\w*",
						default: "$(basename).ext",
						markdownDescription: s(8118, "Additional check on the siblings of a matching file. Use \\$(basename) as variable for the matching file name.")
					} }
				}] }
			},
			[Er]: {
				type: "object",
				markdownDescription: s(8119, "Configure [glob patterns](https://aka.ms/vscode-glob-patterns) of file associations to languages (for example `\"*.extension\": \"html\"`). Patterns will match on the absolute path of a file if they contain a path separator and will match on the name of the file otherwise. These have precedence over the default associations of the languages installed."),
				additionalProperties: { type: "string" }
			},
			"files.encoding": {
				type: "string",
				enum: Object.keys(Y),
				default: "utf8",
				description: s(8120, "The default character set encoding to use when reading and writing files. This setting can also be configured per language."),
				scope: S.LANGUAGE_OVERRIDABLE,
				enumDescriptions: Object.keys(Y).map((e) => Y[e].labelLong),
				enumItemLabels: Object.keys(Y).map((e) => Y[e].labelLong)
			},
			"files.autoGuessEncoding": {
				type: "boolean",
				default: !1,
				markdownDescription: s(8121, "When enabled, the editor will attempt to guess the character set encoding when opening files. This setting can also be configured per language. Note, this setting is not respected by text search. Only {0} is respected.", "`#files.encoding#`"),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.candidateGuessEncodings": {
				type: "array",
				items: {
					type: "string",
					enum: Object.keys(zo),
					enumDescriptions: Object.keys(zo).map((e) => zo[e].labelLong)
				},
				default: [],
				markdownDescription: s(8122, "List of character set encodings that the editor should attempt to guess in the order they are listed. In case it cannot be determined, {0} is respected", "`#files.encoding#`"),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.eol": {
				type: "string",
				enum: [
					"\n",
					"\r\n",
					"auto"
				],
				enumDescriptions: [
					s(8123, "LF"),
					s(8124, "CRLF"),
					s(8125, "Uses operating system specific end of line character.")
				],
				default: "auto",
				description: s(8126, "The default end of line character."),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.enableTrash": {
				type: "boolean",
				default: !0,
				description: s(8127, "Moves files/folders to the OS trash (recycle bin on Windows) when deleting. Disabling this will delete files/folders permanently.")
			},
			"files.trimTrailingWhitespace": {
				type: "boolean",
				default: !1,
				description: s(8128, "When enabled, will trim trailing whitespace when saving a file."),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.trimTrailingWhitespaceInRegexAndStrings": {
				type: "boolean",
				default: !0,
				description: s(8129, "When enabled, trailing whitespace will be removed from multiline strings and regexes will be removed on save or when executing 'editor.action.trimTrailingWhitespace'. This can cause whitespace to not be trimmed from lines when there isn't up-to-date token information."),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.insertFinalNewline": {
				type: "boolean",
				default: !1,
				description: s(8130, "When enabled, insert a final new line at the end of the file when saving it."),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.trimFinalNewlines": {
				type: "boolean",
				default: !1,
				description: s(8131, "When enabled, will trim all new lines after the final new line at the end of the file when saving it."),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.autoSave": {
				type: "string",
				enum: [
					i.OFF,
					i.AFTER_DELAY,
					i.ON_FOCUS_CHANGE,
					i.ON_WINDOW_CHANGE
				],
				markdownEnumDescriptions: [
					s(8132, "An editor with changes is never automatically saved."),
					s(8133, "An editor with changes is automatically saved after the configured `#files.autoSaveDelay#`."),
					s(8134, "An editor with changes is automatically saved when the editor loses focus."),
					s(8135, "An editor with changes is automatically saved when the window loses focus.")
				],
				default: Lt ? i.AFTER_DELAY : i.OFF,
				markdownDescription: s(8136, "Controls [auto save](https://code.visualstudio.com/docs/editor/codebasics#_save-auto-save) of editors that have unsaved changes.", i.OFF, i.AFTER_DELAY, i.ON_FOCUS_CHANGE, i.ON_WINDOW_CHANGE, i.AFTER_DELAY),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.autoSaveDelay": {
				type: "number",
				default: 1e3,
				minimum: 0,
				markdownDescription: s(8137, "Controls the delay in milliseconds after which an editor with unsaved changes is saved automatically. Only applies when `#files.autoSave#` is set to `{0}`.", i.AFTER_DELAY),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.autoSaveWorkspaceFilesOnly": {
				type: "boolean",
				default: !1,
				markdownDescription: s(8138, "When enabled, will limit [auto save](https://code.visualstudio.com/docs/editor/codebasics#_save-auto-save) of editors to files that are inside the opened workspace. Only applies when {0} is enabled.", "`#files.autoSave#`"),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.autoSaveWhenNoErrors": {
				type: "boolean",
				default: !1,
				markdownDescription: s(8139, "When enabled, will limit [auto save](https://code.visualstudio.com/docs/editor/codebasics#_save-auto-save) of editors to files that have no errors reported in them at the time the auto save is triggered. Only applies when {0} is enabled.", "`#files.autoSave#`"),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.watcherExclude": {
				type: "object",
				patternProperties: { ".*": { type: "boolean" } },
				default: {
					"**/.git/objects/**": !0,
					"**/.git/subtree-cache/**": !0,
					"**/.hg/store/**": !0
				},
				markdownDescription: s(8140, "Configure paths or [glob patterns](https://aka.ms/vscode-glob-patterns) to exclude from file watching. Paths can either be relative to the watched folder or absolute. Glob patterns are matched relative from the watched folder. When you experience the file watcher process consuming a lot of CPU, make sure to exclude large folders that are of less interest (such as build output folders)."),
				scope: S.RESOURCE
			},
			"files.watcherInclude": {
				type: "array",
				items: { type: "string" },
				default: [],
				description: s(8141, "Configure extra paths to watch for changes inside the workspace. By default, all workspace folders will be watched recursively, except for folders that are symbolic links. You can explicitly add absolute or relative paths to support watching folders that are symbolic links. Relative paths will be resolved to an absolute path using the currently opened workspace."),
				scope: S.RESOURCE
			},
			"files.hotExit": zl,
			"files.defaultLanguage": {
				type: "string",
				markdownDescription: s(8142, "The default language identifier that is assigned to new files. If configured to `${activeEditorLanguage}`, will use the language identifier of the currently active text editor if any.")
			},
			[un]: {
				type: "object",
				patternProperties: { ".*": { type: "boolean" } },
				default: {},
				markdownDescription: s(8143, "Configure paths or [glob patterns](https://aka.ms/vscode-glob-patterns) to mark as read-only. Glob patterns are always evaluated relative to the path of the workspace folder unless they are absolute paths. You can exclude matching paths via the `#files.readonlyExclude#` setting. Files from readonly file system providers will always be read-only independent of this setting."),
				scope: S.RESOURCE
			},
			[Cr]: {
				type: "object",
				patternProperties: { ".*": { type: "boolean" } },
				default: {},
				markdownDescription: s(8144, "Configure paths or [glob patterns](https://aka.ms/vscode-glob-patterns) to exclude from being marked as read-only if they match as a result of the `#files.readonlyInclude#` setting. Glob patterns are always evaluated relative to the path of the workspace folder unless they are absolute paths. Files from readonly file system providers will always be read-only independent of this setting."),
				scope: S.RESOURCE
			},
			[Un]: {
				type: "boolean",
				markdownDescription: s(8145, "Marks files as read-only when their file permissions indicate as such. This can be overridden via `#files.readonlyInclude#` and `#files.readonlyExclude#` settings."),
				default: !1
			},
			"files.restoreUndoStack": {
				type: "boolean",
				description: s(8146, "Restore the undo stack when a file is reopened."),
				default: !0
			},
			"files.saveConflictResolution": {
				type: "string",
				enum: ["askUser", "overwriteFileOnDisk"],
				enumDescriptions: [s(8147, "Will refuse to save and ask for resolving the save conflict manually."), s(8148, "Will resolve the save conflict by overwriting the file on disk with the changes in the editor.")],
				description: s(8149, "A save conflict can occur when a file is saved to disk that was changed by another program in the meantime. To prevent data loss, the user is asked to compare the changes in the editor with the version on disk. This setting should only be changed if you frequently encounter save conflict errors and may result in data loss if used without caution."),
				default: "askUser",
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"files.dialog.defaultPath": {
				type: "string",
				pattern: "^((\\/|\\\\\\\\|[a-zA-Z]:\\\\).*)?$",
				patternErrorMessage: s(8150, "Default path for file dialogs must be an absolute path (e.g. C:\\\\myFolder or /myFolder)."),
				description: s(8151, "Default path for file dialogs, overriding user's home path. Only used in the absence of a context-specific path, such as most recently opened file or folder."),
				scope: S.MACHINE
			},
			"files.simpleDialog.enable": {
				type: "boolean",
				description: s(8152, "Enables the simple file dialog for opening and saving files and folders. The simple file dialog replaces the system file dialog when enabled."),
				default: !1
			},
			"files.participants.timeout": {
				type: "number",
				default: 6e4,
				markdownDescription: s(8153, "Timeout in milliseconds after which file participants for create, rename, and delete are cancelled. Use `0` to disable participants.")
			}
		}
	}), Rl.registerConfiguration({
		...ir,
		properties: {
			"editor.formatOnSave": {
				type: "boolean",
				markdownDescription: s(8154, "Format a file on save. A formatter must be available and the editor must not be shutting down. When {0} is set to `afterDelay`, the file will only be formatted when saved explicitly.", "`#files.autoSave#`"),
				scope: S.LANGUAGE_OVERRIDABLE
			},
			"editor.formatOnSaveMode": {
				type: "string",
				default: "file",
				enum: [
					"file",
					"modifications",
					"modificationsIfAvailable"
				],
				enumDescriptions: [
					s(8155, "Format the whole file."),
					s(8156, "Format modifications. Requires source control and a formatter that supports 'Format Selection'."),
					s(8157, "Will attempt to format modifications only (requires source control and a formatter that supports 'Format Selection'). If source control can't be used, then the whole file will be formatted.")
				],
				markdownDescription: s(8158, "Controls if format on save formats the whole file or only modifications. Only applies when `#editor.formatOnSave#` is enabled."),
				scope: S.LANGUAGE_OVERRIDABLE
			}
		}
	});
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-files-service-override/index.js
function Vl(e) {
	return e instanceof Uint8Array ? e : Xl.encode(e);
}
function Hl(e) {
	return e.status === "fulfilled";
}
function Ul(e = {}) {
	return {
		[Qn.toString()]: new Kr(au, [ou, e], !0),
		[Ui.toString()]: new Kr(ps, [], !0),
		[vi.toString()]: new Kr(Di, [], !0),
		[as.toString()]: new Kr(hs, [], !0)
	};
}
function Wl(e) {
	return tu.registerFile(e);
}
async function Gl(e, t, n) {
	ul();
	let r = iu[e.scheme];
	if (r == null || r.writeFile == null) throw Error(`${e.scheme} provider doesn't exist or doesn't support writing files`);
	if (!(n?.overwrite ?? !1)) try {
		await r.stat(e);
		return;
	} catch (e) {
		(!(e instanceof Pn) || e.code !== A.FileNotFound) && console.error("Unable to check if file exists", e);
	}
	await r.writeFile(e, Vl(t), {
		atomic: !1,
		create: !0,
		overwrite: !1,
		unlock: !1,
		...n
	});
}
function Kl(e, t) {
	let n = iu.file;
	if (!(n instanceof $l)) throw Error("The overlay filesystem provider was replaced");
	return n.register(e, t);
}
var ql, Jl, Yl, Xl, Zl, Ql, $l, eu, tu, nu, ru, iu, au, ou, su = t((() => {
	yr(), te(), Ja(), dt(), Sr(), Qa(), kn(), f(), b(), V(), k(), x(), ro(), _n(), oo(), so(), lo(), Qr(), ms(), Ei(), ii(), gs(), os(), y(), _r(), pt(), xl(), Ll(), Bl(), ql = class {
		constructor() {
			this.type = U.Directory, this._onDidChange = new p(), this.onDidChange = this._onDidChange.event, this._onDidDelete = new p(), this.onDidDelete = this._onDidDelete.event, this.ctime = Date.now(), this.mtime = Date.now(), this.type = U.Directory, this.entries = /* @__PURE__ */ new Map();
		}
		async stats() {
			return {
				ctime: this.ctime,
				mtime: this.mtime,
				size: 0,
				type: U.Directory
			};
		}
		delete() {
			this._onDidDelete.fire();
		}
		addChild(e, t) {
			this.entries.set(e, t), this._onDidChange.fire();
			let n = { dispose: () => {
				this.deleteChild(e);
			} };
			return t.onDidDelete(() => {
				n.dispose();
			}), n;
		}
		deleteChild(e) {
			return this.entries.delete(e) ? (this.mtime = Date.now(), this._onDidChange.fire(), this.entries.size === 0 && this.delete(), !0) : !1;
		}
		getChildren(e) {
			return this.entries.get(e);
		}
		read() {
			return Array.from(this.entries.entries()).map(([e, t]) => [e, t.type]);
		}
	}, Jl = class {
		constructor(e, t) {
			this.uri = e, this.readonly = t, this.type = U.File, this._onDidChange = new p(), this.onDidChange = this._onDidChange.event, this._onDidDelete = new p(), this.onDidDelete = this._onDidDelete.event, this.ctime = Date.now(), this.mtime = Date.now(), this.onDidChange(() => {
				this.mtime = Date.now();
			});
		}
		async stats() {
			return {
				ctime: this.ctime,
				mtime: this.mtime,
				size: await this.getSize(),
				type: U.File,
				permissions: this.readonly ? sr.Readonly : void 0
			};
		}
		async delete() {
			if (this.readonly) throw O("Not allowed", A.FileWriteLocked);
			this._onDidDelete.fire();
		}
	}, Yl = class extends Jl {
		constructor(e, t, n) {
			super(e, !0), this.url = t, this.metadata = n;
		}
		async fetch() {
			let e = await fetch(this.url, { headers: this.metadata?.mimeType == null ? {} : { Accept: this.metadata.mimeType } });
			if (e.status !== 200) throw Error(e.statusText);
			return e;
		}
		async getSize() {
			return this.metadata?.size ?? 0;
		}
		async read() {
			let e = await this.fetch();
			return new Uint8Array(await e.arrayBuffer());
		}
		async readStream() {
			return (await this.fetch()).body;
		}
		write() {
			throw O("Not allowed", A.FileWriteLocked);
		}
		async delete() {
			throw O("Not allowed", A.FileWriteLocked);
		}
	}, Xl = new TextEncoder(), Zl = class extends Jl {
		constructor(e, t) {
			super(e, !1), this.content = Vl(t);
		}
		async getSize() {
			return this.content.length;
		}
		async read() {
			return this.content;
		}
		async write(e) {
			this.content = e, this._onDidChange.fire();
		}
	}, Ql = class extends n {
		constructor(e) {
			super(), this.memoryFdCounter = 0, this.fdMemory = /* @__PURE__ */ new Map(), this.onDidChangeCapabilities = jt.None, this._onDidChangeFile = new p(), this.onDidChangeFile = this._onDidChangeFile.event, this._bufferedChanges = [], this.rootByAuthority = /* @__PURE__ */ new Map(), this.capabilities = P.FileReadWrite | P.PathCaseSensitive | P.FileReadStream, e && (this.capabilities |= P.Readonly);
		}
		async open(e) {
			let t = await this.readFile(e), n = this.memoryFdCounter++;
			return this.fdMemory.set(n, t), n;
		}
		async close(e) {
			this.fdMemory.delete(e);
		}
		async read(e, t, n, r, i) {
			let a = this.fdMemory.get(e);
			if (a == null) throw O("No file with that descriptor open", A.Unavailable);
			let o = T.wrap(a).slice(t, t + i);
			return n.set(o.buffer, r), o.byteLength;
		}
		write(e, t, n, r, i) {
			let a = this.fdMemory.get(e);
			if (a == null) throw O("No file with that descriptor open", A.Unavailable);
			let o = T.wrap(n).slice(r, r + i);
			return a.set(o.buffer, t), Promise.resolve(o.byteLength);
		}
		_lookupRoot(e) {
			let t = e.toLowerCase(), n = this.rootByAuthority.get(t);
			return n ?? (n = new ql(), this.rootByAuthority.set(t, n)), n;
		}
		_lookup(e, t) {
			let n = e.path.split("/"), r = this._lookupRoot(e.authority);
			for (let e of n) {
				if (e.length === 0) continue;
				let n;
				if (r instanceof ql && (n = r.getChildren(e)), n == null) {
					if (t) return;
					throw O("file not found", A.FileNotFound);
				}
				r = n;
			}
			return r;
		}
		_lookupAsDirectory(e, t) {
			let n = this._lookup(e, t);
			if (n instanceof ql) return n;
			throw O("file not a directory", A.FileNotADirectory);
		}
		_lookupAsFile(e, t) {
			let n = this._lookup(e, t);
			if (n != null && n.type === U.File) return n;
			throw O("file is a directory", A.FileIsADirectory);
		}
		registerFile(e) {
			let t = e.uri.path.split("/"), n = this._lookupRoot(e.uri.authority), r = e.uri.with({ path: "/" });
			for (let e of t.slice(0, -1)) {
				if (e === "") continue;
				r = _.joinPath(r, e);
				let t = n.getChildren(e);
				if (t ??= this.mkdirSync(r), !(t instanceof ql)) throw Error(`file '${r.toString()}' is not a directory`);
				n = t;
			}
			let i = t[t.length - 1];
			if (n.getChildren(i) != null) throw Error(`file '${_.joinPath(r, i).toString()}/' already exists`);
			let a = new I();
			return a.add(N(() => {
				this._fireSoon({
					resource: e.uri,
					type: R.DELETED
				});
			})), a.add(e.onDidDelete(() => {
				a.dispose();
			})), a.add(e.onDidChange(() => {
				this._fireSoon({
					resource: e.uri,
					type: R.UPDATED
				});
			})), a.add(n.addChild(i, e)), this._fireSoon({
				resource: e.uri,
				type: R.ADDED
			}), a;
		}
		async stat(e) {
			return await this._lookup(e, !1).stats();
		}
		readdirSync(e) {
			return this._lookupAsDirectory(e, !1).read();
		}
		async readdir(e) {
			return this.readdirSync(e);
		}
		async readFile(e) {
			return await this._lookupAsFile(e, !1).read();
		}
		readFileStream(e, t, n) {
			let r = this._lookupAsFile(e, !1), i = tn((e) => T.concat(e.map((e) => T.wrap(e))).buffer, { highWaterMark: 10 });
			return (async () => {
				try {
					if (r.readStream == null || typeof t.length == "number" || typeof t.position == "number") {
						let e = await r.read();
						(typeof t.position == "number" || typeof t.length == "number") && (e = e.slice(t.position ?? 0, t.length)), i.end(e);
					} else {
						let e = (await r.readStream()).getReader(), t = await e.read();
						for (; !t.done && !(n.isCancellationRequested || (await i.write(t.value), n.isCancellationRequested));) t = await e.read();
						i.end(void 0);
					}
				} catch (e) {
					i.error(O(e, A.Unknown)), i.end();
				}
			})(), i;
		}
		watch() {
			return n.None;
		}
		async writeFile(e, t, n) {
			let r = this._lookup(e, !0);
			if (r != null && !(r instanceof Jl)) throw O("file is directory", A.FileIsADirectory);
			if (r == null) throw O("file not found", A.FileNotFound);
			if (!n.overwrite) throw O("file exists already", A.FileExists);
			await r.write(t);
		}
		async rename() {
			throw O("Not allowed", A.NoPermissions);
		}
		mkdirSync(e) {
			if (this._lookup(e, !0) != null) throw O("file exists already", A.FileExists);
			let t = v(e), n = Ft(e), r = this._lookupAsDirectory(n, !1), i = new ql(), a = new I();
			return a.add(i.onDidDelete(() => {
				a.dispose(), this._fireSoon({
					resource: e,
					type: R.DELETED
				});
			})), a.add(i.onDidChange(() => {
				this._fireSoon({
					resource: e,
					type: R.UPDATED
				});
			})), r.addChild(t, i), this._fireSoon({
				type: R.ADDED,
				resource: e
			}), i;
		}
		async mkdir() {
			throw O("Can' create a directory", A.NoPermissions);
		}
		deleteSync(e) {
			let t = this._lookup(e, !0);
			if (t == null) throw O("Not found", A.FileNotFound);
			if (t.type === U.Directory) throw O("Can't delete a directory", A.NoPermissions);
			t.delete();
		}
		async delete(e) {
			this.deleteSync(e);
		}
		_fireSoon(...e) {
			this._bufferedChanges.push(...e), this._fireSoonHandle != null && (clearTimeout(this._fireSoonHandle), this._fireSoonHandle = void 0), this._fireSoonHandle = window.setTimeout(() => {
				this._onDidChangeFile.fire(this._bufferedChanges), this._bufferedChanges.length = 0;
			}, 5);
		}
	}, $l = class {
		constructor() {
			this.providers = [], this.onDidChangeCapabilities = jt.None, this._onDidChangeFile = new p(), this.onDidChangeFile = this._onDidChangeFile.event, this._onDidChangeOverlays = new p(), this.onDidChangeOverlays = this._onDidChangeOverlays.event, this.capabilities = P.FileReadWrite | P.PathCaseSensitive | P.FileReadStream;
		}
		register(e, t) {
			let n = {
				priority: e,
				provider: t
			};
			this.providers.push(n), this.providers.sort((e, t) => t.priority - e.priority);
			let r = new I();
			return r.add(t.onDidChangeFile((e) => {
				this._onDidChangeFile.fire(e);
			})), r.add({ dispose: () => {
				let e = this.providers.indexOf(n);
				e >= 0 && (this.providers.splice(e, 1), this._onDidChangeOverlays.fire());
			} }), this._onDidChangeOverlays.fire(), r;
		}
		get delegates() {
			return this.providers.map(({ provider: e }) => e);
		}
		async readFromDelegates(e, t) {
			if (this.delegates.length === 0) throw O("No delegate", A.Unavailable);
			let n;
			for (let r of this.delegates) {
				if (t != null && t.isCancellationRequested) throw Error("Cancelled");
				try {
					return await e(r);
				} catch (e) {
					if (n ??= e, e instanceof Pn && [
						A.NoPermissions,
						A.FileNotFound,
						A.Unavailable
					].includes(e.code)) continue;
					throw e;
				}
			}
			throw n;
		}
		async writeToDelegates(e, t) {
			if (this.delegates.length === 0) throw O("No delegate", A.Unavailable);
			for (let n of this.delegates) if (!((n.capabilities & P.Readonly) > 0)) {
				try {
					await Ga(_, n, _.dirname(e));
				} catch {}
				try {
					return await t(n);
				} catch (e) {
					if (e instanceof Pn && [
						A.NoPermissions,
						A.FileNotFound,
						A.Unavailable
					].includes(e.code)) continue;
					throw e;
				}
			}
			throw O("Not allowed", A.NoPermissions);
		}
		async stat(e) {
			return await this.readFromDelegates(async (t) => {
				let n = await t.stat(e), r = (t.capabilities & P.Readonly) > 0;
				return {
					...n,
					permissions: n.permissions ?? (r ? sr.Readonly : void 0)
				};
			});
		}
		async readFile(e) {
			return await this.readFromDelegates((t) => t.readFile(e));
		}
		readFileStream(e, t, n) {
			let r = tn((e) => T.concat(e.map((e) => T.wrap(e))).buffer);
			return this.readFromDelegates(async (i) => {
				if (qn(i)) {
					let a = i.readFileStream(e, t, n);
					await new Promise((e, t) => {
						let i = !1;
						Ht(a, {
							onData(e) {
								i = !0, r.write(e);
							},
							onEnd() {
								r.end(), e();
							},
							onError(e) {
								i ? r.error(e) : t(e);
							}
						}, n);
					});
				} else {
					let n = await this.readFile(e);
					return (typeof t.position == "number" || typeof t.length == "number") && (n = n.slice(t.position ?? 0, t.length)), r.end(n);
				}
			}, n).catch((e) => {
				r.error(e);
			}), r;
		}
		async readdir(e) {
			let t = await Promise.allSettled(this.delegates.map(async (t) => await t.readdir(e)));
			if (!t.some(Hl)) throw t[0].reason;
			return Object.entries(Object.fromEntries(t.filter(Hl).map((e) => e.value).flat()));
		}
		watch(e, t) {
			let n = new I();
			for (let r of this.delegates) n.add(r.watch(e, t));
			return n;
		}
		async writeFile(e, t, n) {
			await this.writeToDelegates(e, async (r) => {
				let i;
				try {
					i = await r.stat(e);
				} catch {}
				if (i != null && ((i.permissions ?? 0) & sr.Readonly) > 0) throw O("Not allowed", A.NoPermissions);
				return await r.writeFile(e, t, n);
			});
		}
		async mkdir(e) {
			await this.writeToDelegates(e, (t) => t.mkdir(e));
		}
		async delete(e, t) {
			await this.writeToDelegates(e, (n) => n.delete(e, t));
		}
		async rename(e, t, n) {
			await this.writeToDelegates(t, (r) => r.rename(e, t, n));
		}
	}, eu = new $l(), eu.register(0, new Za()), tu = new Ql(!0), nu = new Za(), nu.mkdir(Fn.from({
		scheme: B.vscodeUserData,
		path: "/User/"
	})), (function(e) {
		e.extensionFile = "extension-file";
	})(ru ||= {}), iu = {
		[ru.extensionFile]: tu,
		[Il.scheme]: new Za(),
		[B.vscodeUserData]: nu,
		[B.tmp]: new Za(),
		[B.file]: eu
	}, au = class extends qa {
		constructor(e, t) {
			super(e), this.options = t;
			for (let [e, t] of Object.entries(iu)) {
				let n = this.registerProvider(e, t);
				t instanceof $l && t.onDidChangeOverlays(() => {
					n.dispose(), n = this.registerProvider(e, t);
				});
			}
		}
		async withProvider(e) {
			if (e.scheme === "data") {
				let e = this.getProvider("http");
				if (e != null) return e;
			}
			return super.withProvider(e);
		}
		async toFileStat(e, t, n, r, i, a) {
			let o = async () => await super.toFileStat(e, t, n, r, i, a);
			return this.options.statMiddleware?.(t, o) ?? o();
		}
	}, au.$di$dependencies = [], ou = new co(), ol(async (e) => {
		ou.logger = e.get(Tr);
	});
}));
//#endregion
export { Js as $, ua as $n, xc as $t, nl as A, co as An, ic as At, tl as B, Na as Bn, Fc as Bt, sl as C, Y as Cn, Ji as Cr, Ls as Ct, bl as D, mo as Dn, Fs as Dt, gl as E, po as En, fc as Et, Yc as F, ro as Fn, ws as Ft, Vc as G, Aa as Gn, Qs as Gt, Gc as H, Ia as Hn, Rc as Ht, $ as I, $a as In, Pc as It, Ws as J, ka as Jn, yc as Jt, Kc as K, ja as Kn, _c as Kt, Z as L, to as Ln, Mc as Lt, Xc as M, io as Mn, wc as Mt, Qc as N, ao as Nn, Tc as Nt, cl as O, uo as On, Ps as Ot, Zc as P, no as Pn, Ec as Pt, Gs as Q, Ta as Qn, bc as Qt, Q as R, La as Rn, Ic as Rt, ml as S, Uo as Sn, qi as Sr, dc as St, hl as T, Bo as Tn, Gi as Tr, Sc as Tt, Wc as U, Ma as Un, sc as Ut, Bc as V, Pa as Vn, Os as Vt, Hc as W, Fa as Wn, gc as Wt, Ks as X, Da as Xn, Zs as Xt, Ys as Y, Ea as Yn, As as Yt, qs as Z, wa as Zn, Xs as Zt, Sl as _, Ko as _n, sa as _r, hc as _t, Ul as a, zc as an, la as ar, zs as at, xl as b, Yo as bn, Zi as br, Lc as bt, Wl as c, ss as cn, na as cr, jc as ct, Dl as d, os as dn, aa as dr, Ac as dt, oc as en, da as er, Rs as et, El as f, ts as fn, ia as fr, kc as ft, Il as g, Jo as gn, Qi as gr, cc as gt, jl as h, Qo as hn, ea as hr, lc as ht, Yl as i, ys as in, Sa as ir, Vs as it, rl as j, lo as jn, ac as jt, ll as k, fo as kn, mc as kt, Kl as l, cs as ln, oa as lr, vc as lt, Ll as m, Zo as mn, K as mr, $s as mt, Ql as n, Cs as nn, pa as nr, ec as nt, Gl as o, _s as on, ta as or, Us as ot, kl as p, ns as pn, ra as pr, Cc as pt, Dc as q, Oa as qn, pc as qt, Zl as r, bs as rn, ca as rr, rc as rt, su as s, vs as sn, $i as sr, Hs as st, ru as t, Ss as tn, _a as tr, Bs as tt, Ol as u, as as un, q as ur, Oc as ut, Tl as v, Wo as vn, Yi as vr, Es as vt, ol as w, J as wn, Wi as wr, Is as wt, fl as x, Ho as xn, Ki as xr, Ns as xt, ul as y, Go as yn, Xi as yr, Ts as yt, Jc as z, Ra as zn, Nc as zt };
