import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { Ab as t, Bb as n, Dl as r, Ej as i, El as a, Jy as o, Kj as s, NM as c, Ob as l, PM as u, Qp as d, Qw as f, TA as p, Tj as m, Xy as h, db as g, eM as _, e_ as v, ec as y, em as b, fb as x, ga as S, ha as C, jc as w, kb as T, kc as E, mA as D, ma as O, rT as k, t_ as A, tm as j, va as M, ya as N } from "./standaloneServices-C51B94Xh.js";
import { At as P, jt as F } from "./monaco-vscode-files-service-override-DGMr6mGW.js";
import { a as I, i as L, n as R, t as z } from "./extensionFeatures-CMMcwnLr.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/workbench/services/language/common/languageService.js
function B(e) {
	return e === void 0 ? !0 : Array.isArray(e) ? e.every((e) => typeof e == "string") : !1;
}
function V(e, t) {
	return e ? typeof e.id == "string" ? B(e.extensions) ? B(e.filenames) ? e.firstLine !== void 0 && typeof e.firstLine != "string" ? (t?.error(i(14178, "property `{0}` can be omitted and must be of type `string`", "firstLine")), !1) : e.configuration !== void 0 && typeof e.configuration != "string" ? (t?.error(i(14179, "property `{0}` can be omitted and must be of type `string`", "configuration")), !1) : B(e.aliases) ? B(e.mimetypes) ? e.icon !== void 0 && (typeof e.icon != "object" || typeof e.icon.light != "string" || typeof e.icon.dark != "string") ? (t?.error(i(14182, "property `{0}` can be omitted and must be of type `object` with properties `{1}` and `{2}` of type `string`", "icon", "light", "dark")), !1) : !0 : (t?.error(i(14181, "property `{0}` can be omitted and must be of type `string[]`", "mimetypes")), !1) : (t?.error(i(14180, "property `{0}` can be omitted and must be of type `string[]`", "aliases")), !1) : (t?.error(i(14177, "property `{0}` can be omitted and must be of type `string[]`", "filenames")), !1) : (t?.error(i(14176, "property `{0}` can be omitted and must be of type `string[]`", "extensions")), !1) : (t?.error(i(14175, "property `{0}` is mandatory and must be of type `string`", "id")), !1) : (t?.error(i(14174, "Empty value for `contributes.{0}`", H.name)), !1);
}
var H, U, W, G = e((() => {
	t(), m(), M(), f(), n(), C(), A(), r(), y(), F(), I(), d(), h(), p(), R(), x(), j(), u(), w(), s(), H = L.registerExtensionPoint({
		extensionPoint: "languages",
		jsonSchema: {
			description: i(14155, "Contributes language declarations."),
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
						description: i(14156, "ID of the language."),
						type: "string"
					},
					aliases: {
						description: i(14157, "Name aliases for the language."),
						type: "array",
						items: { type: "string" }
					},
					extensions: {
						description: i(14158, "File extensions associated to the language."),
						default: [".foo"],
						type: "array",
						items: { type: "string" }
					},
					filenames: {
						description: i(14159, "File names associated to the language."),
						type: "array",
						items: { type: "string" }
					},
					filenamePatterns: {
						description: i(14160, "File name glob patterns associated to the language."),
						type: "array",
						items: { type: "string" }
					},
					mimetypes: {
						description: i(14161, "Mime types associated to the language."),
						type: "array",
						items: { type: "string" }
					},
					firstLine: {
						description: i(14162, "A regular expression matching the first line of a file of the language."),
						type: "string"
					},
					configuration: {
						description: i(14163, "A relative path to a file containing configuration options for the language."),
						type: "string",
						default: "./language-configuration.json"
					},
					icon: {
						type: "object",
						description: i(14164, "A icon to use as file icon, if no icon theme provides one for the language."),
						properties: {
							light: {
								description: i(14165, "Icon path when a light theme is used"),
								type: "string"
							},
							dark: {
								description: i(14166, "Icon path when a dark theme is used"),
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
	}), U = class extends D {
		constructor() {
			super(...arguments), this.type = "table";
		}
		shouldRender(e) {
			return !!e.contributes?.languages;
		}
		render(e) {
			let t = e.contributes, n = t?.languages || [], r = [];
			for (let e of n) V(e) && r.push({
				id: e.id,
				name: (e.aliases || [])[0] || e.id,
				extensions: e.extensions || [],
				hasGrammar: !1,
				hasSnippets: !1
			});
			let a = c(r, (e) => e.id);
			return (t?.grammars || []).forEach((e) => {
				if (!_(e.language)) return;
				let t = a[e.language];
				t ? t.hasGrammar = !0 : (t = {
					id: e.language,
					name: e.language,
					extensions: [],
					hasGrammar: !0,
					hasSnippets: !1
				}, a[t.id] = t, r.push(t));
			}), (t?.snippets || []).forEach((e) => {
				if (!_(e.language)) return;
				let t = a[e.language];
				t ? t.hasSnippets = !0 : (t = {
					id: e.language,
					name: e.language,
					extensions: [],
					hasGrammar: !1,
					hasSnippets: !0
				}, a[t.id] = t, r.push(t));
			}), r.length ? {
				data: {
					headers: [
						i(14167, "ID"),
						i(14168, "Name"),
						i(14169, "File Extensions"),
						i(14170, "Grammar"),
						i(14171, "Snippets")
					],
					rows: r.sort((e, t) => e.id.localeCompare(t.id)).map((e) => [
						e.id,
						e.name,
						new E().appendMarkdown(`${e.extensions.map((e) => `\`${e}\``).join("&nbsp;")}`),
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
	}, g.as(z.ExtensionFeaturesRegistry).registerExtensionFeature({
		id: "languages",
		label: i(14172, "Programming Languages"),
		access: { canToggle: !1 },
		renderer: new b(U)
	}), W = class extends O {
		constructor(e, t, n, r) {
			super(n.verbose || n.isExtensionDevelopment || !n.isBuilt), this.logService = r, this._configurationService = t, this._extensionService = e, H.setHandler((e) => {
				let t = [];
				for (let n = 0, r = e.length; n < r; n++) {
					let r = e[n];
					if (!Array.isArray(r.value)) {
						r.collector.error(i(14173, "Invalid `contributes.{0}`. Expected an array.", H.name));
						continue;
					}
					for (let e = 0, n = r.value.length; e < n; e++) {
						let n = r.value[e];
						if (V(n, r.collector)) {
							let e;
							n.configuration && (e = k(r.description.extensionLocation, n.configuration)), t.push({
								id: n.id,
								extensions: n.extensions,
								filenames: n.filenames,
								filenamePatterns: n.filenamePatterns,
								firstLine: n.firstLine,
								aliases: n.aliases,
								mimetypes: n.mimetypes,
								configuration: e,
								icon: n.icon && {
									light: k(r.description.extensionLocation, n.icon.light),
									dark: k(r.description.extensionLocation, n.icon.dark)
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
			S(), e.files?.associations && Object.keys(e.files.associations).forEach((t) => {
				let n = e.files.associations[t];
				if (typeof n != "string") {
					this.logService.warn(`Ignoring configured 'files.associations' for '${t}' because its type is not a string but '${typeof n}'`);
					return;
				}
				N({
					id: n,
					mime: this.getMimeType(n) || `text/x-${n}`,
					filepattern: t
				});
			}), this._onDidChange.fire();
		}
	}, W = l([
		T(0, P),
		T(1, v),
		T(2, a),
		T(3, o)
	], W);
}));
//#endregion
export { G as n, H as r, W as t };
