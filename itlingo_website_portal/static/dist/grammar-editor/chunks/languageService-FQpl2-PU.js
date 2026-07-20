import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { $A as t, $k as n, Bb as r, CM as i, Cj as a, DN as o, FA as s, Fd as c, Gx as l, Ix as u, Kx as d, Lb as f, Nb as p, ON as m, Pb as h, Pd as g, Qk as _, SM as v, XE as y, ao as b, el as x, jj as S, kN as C, nl as w, no as T, oo as E, ro as D, rp as O, tD as k, to as A, tp as j, uj as M, zb as N } from "./standaloneServices-DUdtGggg.js";
import { Xn as P, Yn as F } from "./monaco-vscode-files-service-override-7u1fRyMX.js";
import { a as I, i as L, n as R, r as z } from "./extensionsRegistry-DZ5POuBG.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/language/common/languageService.js
function B(e) {
	return e === void 0 ? !0 : Array.isArray(e) ? e.every((e) => typeof e == "string") : !1;
}
function V(e, t) {
	return e ? typeof e.id == "string" ? B(e.extensions) ? B(e.filenames) ? e.firstLine !== void 0 && typeof e.firstLine != "string" ? (t?.error(n(14178, "property `{0}` can be omitted and must be of type `string`", "firstLine")), !1) : e.configuration !== void 0 && typeof e.configuration != "string" ? (t?.error(n(14179, "property `{0}` can be omitted and must be of type `string`", "configuration")), !1) : B(e.aliases) ? B(e.mimetypes) ? e.icon !== void 0 && (typeof e.icon != "object" || typeof e.icon.light != "string" || typeof e.icon.dark != "string") ? (t?.error(n(14182, "property `{0}` can be omitted and must be of type `object` with properties `{1}` and `{2}` of type `string`", "icon", "light", "dark")), !1) : !0 : (t?.error(n(14181, "property `{0}` can be omitted and must be of type `string[]`", "mimetypes")), !1) : (t?.error(n(14180, "property `{0}` can be omitted and must be of type `string[]`", "aliases")), !1) : (t?.error(n(14177, "property `{0}` can be omitted and must be of type `string[]`", "filenames")), !1) : (t?.error(n(14176, "property `{0}` can be omitted and must be of type `string[]`", "extensions")), !1) : (t?.error(n(14175, "property `{0}` is mandatory and must be of type `string`", "id")), !1) : (t?.error(n(14174, "Empty value for `contributes.{0}`", H.name)), !1);
}
var H, U, W, G = e((() => {
	C(), _(), b(), y(), s(), T(), h(), c(), u(), P(), z(), f(), O(), M(), I(), d(), r(), i(), w(), a(), H = R.registerExtensionPoint({
		extensionPoint: "languages",
		jsonSchema: {
			description: n(14155, "Contributes language declarations."),
			type: "array",
			items: {
				type: "object",
				defaultSnippets: [{ body: {
					id: "${1:languageId}",
					aliases: ["${2:label}"],
					extensions: ["${3:extension}"],
					configuration: "./language-configuration.json"
				} }],
				properties: {
					id: {
						description: n(14156, "ID of the language."),
						type: "string"
					},
					aliases: {
						description: n(14157, "Name aliases for the language."),
						type: "array",
						items: { type: "string" }
					},
					extensions: {
						description: n(14158, "File extensions associated to the language."),
						default: [".foo"],
						type: "array",
						items: { type: "string" }
					},
					filenames: {
						description: n(14159, "File names associated to the language."),
						type: "array",
						items: { type: "string" }
					},
					filenamePatterns: {
						description: n(14160, "File name glob patterns associated to the language."),
						type: "array",
						items: { type: "string" }
					},
					mimetypes: {
						description: n(14161, "Mime types associated to the language."),
						type: "array",
						items: { type: "string" }
					},
					firstLine: {
						description: n(14162, "A regular expression matching the first line of a file of the language."),
						type: "string"
					},
					configuration: {
						description: n(14163, "A relative path to a file containing configuration options for the language."),
						type: "string",
						default: "./language-configuration.json"
					},
					icon: {
						type: "object",
						description: n(14164, "A icon to use as file icon, if no icon theme provides one for the language."),
						properties: {
							light: {
								description: n(14165, "Icon path when a light theme is used"),
								type: "string"
							},
							dark: {
								description: n(14166, "Icon path when a dark theme is used"),
								type: "string"
							}
						}
					}
				}
			}
		},
		activationEventsGenerator: function* (e) {
			for (let t of e) t.id && t.configuration && (yield `onLanguage:${t.id}`);
		}
	}), U = class extends t {
		constructor() {
			super(...arguments), this.type = "table";
		}
		shouldRender(e) {
			return !!e.contributes?.languages;
		}
		render(e) {
			let t = e.contributes, r = t?.languages || [], i = [];
			for (let e of r) V(e) && i.push({
				id: e.id,
				name: (e.aliases || [])[0] || e.id,
				extensions: e.extensions || [],
				hasGrammar: !1,
				hasSnippets: !1
			});
			let a = v(i, (e) => e.id);
			return (t?.grammars || []).forEach((e) => {
				if (!S(e.language)) return;
				let t = a[e.language];
				t ? t.hasGrammar = !0 : (t = {
					id: e.language,
					name: e.language,
					extensions: [],
					hasGrammar: !0,
					hasSnippets: !1
				}, a[t.id] = t, i.push(t));
			}), (t?.snippets || []).forEach((e) => {
				if (!S(e.language)) return;
				let t = a[e.language];
				t ? t.hasSnippets = !0 : (t = {
					id: e.language,
					name: e.language,
					extensions: [],
					hasGrammar: !1,
					hasSnippets: !0
				}, a[t.id] = t, i.push(t));
			}), i.length ? {
				data: {
					headers: [
						n(14167, "ID"),
						n(14168, "Name"),
						n(14169, "File Extensions"),
						n(14170, "Grammar"),
						n(14171, "Snippets")
					],
					rows: i.sort((e, t) => e.id.localeCompare(t.id)).map((e) => [
						e.id,
						e.name,
						new x().appendMarkdown(`${e.extensions.map((e) => `\`${e}\``).join("&nbsp;")}`),
						e.hasGrammar ? "✔︎" : "—",
						e.hasSnippets ? "✔︎" : "—"
					])
				},
				dispose: () => {}
			} : {
				data: {
					headers: [],
					rows: []
				},
				dispose: () => {}
			};
		}
	}, l.as(L.ExtensionFeaturesRegistry).registerExtensionFeature({
		id: "languages",
		label: n(14172, "Programming Languages"),
		access: { canToggle: !1 },
		renderer: new N(U)
	}), W = class extends A {
		constructor(e, t, r, i) {
			super(r.verbose || r.isExtensionDevelopment || !r.isBuilt), this.logService = i, this._configurationService = t, this._extensionService = e, H.setHandler((e) => {
				let t = [];
				for (let r = 0, i = e.length; r < i; r++) {
					let i = e[r];
					if (!Array.isArray(i.value)) {
						i.collector.error(n(14173, "Invalid `contributes.{0}`. Expected an array.", H.name));
						continue;
					}
					for (let e = 0, n = i.value.length; e < n; e++) {
						let n = i.value[e];
						if (V(n, i.collector)) {
							let e;
							n.configuration && (e = k(i.description.extensionLocation, n.configuration)), t.push({
								id: n.id,
								extensions: n.extensions,
								filenames: n.filenames,
								filenamePatterns: n.filenamePatterns,
								firstLine: n.firstLine,
								aliases: n.aliases,
								mimetypes: n.mimetypes,
								configuration: e,
								icon: n.icon && {
									light: k(i.description.extensionLocation, n.icon.light),
									dark: k(i.description.extensionLocation, n.icon.dark)
								}
							});
						}
					}
				}
				this._registry.setDynamicLanguages(t);
			}), this.updateMime(), this._register(this._configurationService.onDidChangeConfiguration((e) => {
				e.affectsConfiguration("files.associations") && this.updateMime();
			})), this._extensionService.whenInstalledExtensionsRegistered().then(() => {
				this.updateMime();
			}), this._register(this.onDidRequestRichLanguageFeatures((e) => {
				this._extensionService.activateByEvent(`onLanguage:${e}`), this._extensionService.activateByEvent("onLanguage");
			}));
		}
		updateMime() {
			let e = this._configurationService.getValue();
			D(), e.files?.associations && Object.keys(e.files.associations).forEach((t) => {
				let n = e.files.associations[t];
				if (typeof n != "string") {
					this.logService.warn(`Ignoring configured 'files.associations' for '${t}' because its type is not a string but '${typeof n}'`);
					return;
				}
				E({
					id: n,
					mime: this.getMimeType(n) || `text/x-${n}`,
					filepattern: t
				});
			}), this._onDidChange.fire();
		}
	}, W = o([
		m(0, F),
		m(1, p),
		m(2, g),
		m(3, j)
	], W);
}));
//#endregion
export { G as n, H as r, W as t };
