import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { Bd as t, Ej as n, H_ as r, Tj as i, U_ as a, Vd as o, dN as s, db as c, fb as l, pN as u } from "./standaloneServices-C51B94Xh.js";
import { It as d, Mt as f, Nt as p, Tt as m, Vt as h, mr as g, ur as _, wt as v, yr as y } from "./monaco-vscode-files-service-override-DGMr6mGW.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/product/common/productService.js
var b, x = e((() => {
	b = "vscode://schemas/vscode-product";
})), S, C, w, T, E, D, O, k, A, j, M = e((() => {
	i(), s(), o(), h(), a(), l(), y(), x(), p(), m(), S = c.as(r.JSONContribution), C = class {
		constructor(e, t, n) {
			this._messageHandler = e, this._extension = t, this._extensionPointId = n;
		}
		_msg(e, t) {
			this._messageHandler({
				type: e,
				message: t,
				extensionId: this._extension.identifier,
				extensionPointId: this._extensionPointId
			});
		}
		error(e) {
			this._msg(t.Error, e);
		}
		warn(e) {
			this._msg(t.Warning, e);
		}
		info(e) {
			this._msg(t.Info, e);
		}
	}, w = class e {
		static _toSet(e) {
			let t = new g();
			for (let n = 0, r = e.length; n < r; n++) t.add(e[n].description.identifier);
			return t;
		}
		static compute(t, n) {
			if (!t || !t.length) return new e(n, []);
			if (!n || !n.length) return new e([], t);
			let r = this._toSet(t), i = this._toSet(n), a = n.filter((e) => !r.has(e.description.identifier)), o = t.filter((e) => !i.has(e.description.identifier));
			return new e(a, o);
		}
		constructor(e, t) {
			this.added = e, this.removed = t;
		}
	}, T = class {
		constructor(e, t, n) {
			this.name = e, this.defaultExtensionKind = t, this.canHandleResolver = n, this._handler = null, this._users = null, this._delta = null;
		}
		setHandler(e) {
			if (this._handler !== null) throw Error("Handler already set!");
			return this._handler = e, this._handle(), { dispose: () => {
				this._handler = null;
			} };
		}
		acceptUsers(e) {
			this._delta = w.compute(this._users, e), this._users = e, this._handle();
		}
		_handle() {
			if (!(this._handler === null || this._users === null || this._delta === null)) try {
				this._handler(this._users, this._delta);
			} catch (e) {
				u(e);
			}
		}
	}, E = {
		type: "string",
		enum: ["ui", "workspace"],
		enumDescriptions: [n(14009, "UI extension kind. In a remote window, such extensions are enabled only when available on the local machine."), n(14010, "Workspace extension kind. In a remote window, such extensions are enabled only when available on the remote.")]
	}, D = "vscode://schemas/vscode-extensions", O = { properties: {
		engines: {
			type: "object",
			description: n(14011, "Engine compatibility."),
			properties: { vscode: {
				type: "string",
				description: n(14012, "For VS Code extensions, specifies the VS Code version that the extension is compatible with. Cannot be *. For example: ^0.10.5 indicates compatibility with a minimum VS Code version of 0.10.5."),
				default: "^1.22.0"
			} }
		},
		publisher: {
			description: n(14013, "The publisher of the VS Code extension."),
			type: "string"
		},
		displayName: {
			description: n(14014, "The display name for the extension used in the VS Code gallery."),
			type: "string"
		},
		categories: {
			description: n(14015, "The categories used by the VS Code gallery to categorize the extension."),
			type: "array",
			uniqueItems: !0,
			items: { oneOf: [{
				type: "string",
				enum: _
			}, {
				type: "string",
				const: "Languages",
				deprecationMessage: n(14016, "Use 'Programming  Languages' instead")
			}] }
		},
		galleryBanner: {
			type: "object",
			description: n(14017, "Banner used in the VS Code marketplace."),
			properties: {
				color: {
					description: n(14018, "The banner color on the VS Code marketplace page header."),
					type: "string"
				},
				theme: {
					description: n(14019, "The color theme for the font used in the banner."),
					type: "string",
					enum: ["dark", "light"]
				}
			}
		},
		contributes: {
			description: n(14020, "All contributions of the VS Code extension represented by this package."),
			type: "object",
			properties: {},
			default: {}
		},
		preview: {
			type: "boolean",
			description: n(14021, "Sets the extension to be flagged as a Preview in the Marketplace.")
		},
		enableProposedApi: {
			type: "boolean",
			deprecationMessage: n(14022, "Use `enabledApiProposals` instead.")
		},
		enabledApiProposals: {
			markdownDescription: n(14023, "Enable API proposals to try them out. Only valid **during development**. Extensions **cannot be published** with this property. For more details visit: https://code.visualstudio.com/api/advanced-topics/using-proposed-api"),
			type: "array",
			uniqueItems: !0,
			items: {
				type: "string",
				enum: Object.keys(v).map((e) => e),
				markdownEnumDescriptions: Object.values(v).map((e) => e.proposal)
			}
		},
		api: {
			markdownDescription: n(14024, "Describe the API provided by this extension. For more details visit: https://code.visualstudio.com/api/advanced-topics/remote-extensions#handling-dependencies-with-remote-extensions"),
			type: "string",
			enum: ["none"],
			enumDescriptions: [n(14025, "Give up entirely the ability to export any APIs. This allows other extensions that depend on this extension to run in a separate extension host process or in a remote machine.")]
		},
		activationEvents: {
			description: n(14026, "Activation events for the VS Code extension."),
			type: "array",
			items: {
				type: "string",
				defaultSnippets: [
					{
						label: "onWebviewPanel",
						description: n(14027, "An activation event emmited when a webview is loaded of a certain viewType"),
						body: "onWebviewPanel:viewType"
					},
					{
						label: "onLanguage",
						description: n(14028, "An activation event emitted whenever a file that resolves to the specified language gets opened."),
						body: "onLanguage:${1:languageId}"
					},
					{
						label: "onCommand",
						description: n(14029, "An activation event emitted whenever the specified command gets invoked."),
						body: "onCommand:${2:commandId}"
					},
					{
						label: "onDebug",
						description: n(14030, "An activation event emitted whenever a user is about to start debugging or about to setup debug configurations."),
						body: "onDebug"
					},
					{
						label: "onDebugInitialConfigurations",
						description: n(14031, "An activation event emitted whenever a \"launch.json\" needs to be created (and all provideDebugConfigurations methods need to be called)."),
						body: "onDebugInitialConfigurations"
					},
					{
						label: "onDebugDynamicConfigurations",
						description: n(14032, "An activation event emitted whenever a list of all debug configurations needs to be created (and all provideDebugConfigurations methods for the \"dynamic\" scope need to be called)."),
						body: "onDebugDynamicConfigurations"
					},
					{
						label: "onDebugResolve",
						description: n(14033, "An activation event emitted whenever a debug session with the specific type is about to be launched (and a corresponding resolveDebugConfiguration method needs to be called)."),
						body: "onDebugResolve:${6:type}"
					},
					{
						label: "onDebugAdapterProtocolTracker",
						description: n(14034, "An activation event emitted whenever a debug session with the specific type is about to be launched and a debug protocol tracker might be needed."),
						body: "onDebugAdapterProtocolTracker:${6:type}"
					},
					{
						label: "workspaceContains",
						description: n(14035, "An activation event emitted whenever a folder is opened that contains at least a file matching the specified glob pattern."),
						body: "workspaceContains:${4:filePattern}"
					},
					{
						label: "onStartupFinished",
						description: n(14036, "An activation event emitted after the start-up finished (after all `*` activated extensions have finished activating)."),
						body: "onStartupFinished"
					},
					{
						label: "onTaskType",
						description: n(14037, "An activation event emitted whenever tasks of a certain type need to be listed or resolved."),
						body: "onTaskType:${1:taskType}"
					},
					{
						label: "onFileSystem",
						description: n(14038, "An activation event emitted whenever a file or folder is accessed with the given scheme."),
						body: "onFileSystem:${1:scheme}"
					},
					{
						label: "onEditSession",
						description: n(14039, "An activation event emitted whenever an edit session is accessed with the given scheme."),
						body: "onEditSession:${1:scheme}"
					},
					{
						label: "onSearch",
						description: n(14040, "An activation event emitted whenever a search is started in the folder with the given scheme."),
						body: "onSearch:${7:scheme}"
					},
					{
						label: "onView",
						body: "onView:${5:viewId}",
						description: n(14041, "An activation event emitted whenever the specified view is expanded.")
					},
					{
						label: "onUri",
						body: "onUri",
						description: n(14042, "An activation event emitted whenever a system-wide Uri directed towards this extension is open.")
					},
					{
						label: "onOpenExternalUri",
						body: "onOpenExternalUri",
						description: n(14043, "An activation event emitted whenever a external uri (such as an http or https link) is being opened.")
					},
					{
						label: "onCustomEditor",
						body: "onCustomEditor:${9:viewType}",
						description: n(14044, "An activation event emitted whenever the specified custom editor becomes visible.")
					},
					{
						label: "onNotebook",
						body: "onNotebook:${1:type}",
						description: n(14045, "An activation event emitted whenever the specified notebook document is opened.")
					},
					{
						label: "onAuthenticationRequest",
						body: "onAuthenticationRequest:${11:authenticationProviderId}",
						description: n(14046, "An activation event emitted whenever sessions are requested from the specified authentication provider.")
					},
					{
						label: "onRenderer",
						description: n(14047, "An activation event emitted whenever a notebook output renderer is used."),
						body: "onRenderer:${11:rendererId}"
					},
					{
						label: "onTerminalProfile",
						body: "onTerminalProfile:${1:terminalId}",
						description: n(14048, "An activation event emitted when a specific terminal profile is launched.")
					},
					{
						label: "onTerminalQuickFixRequest",
						body: "onTerminalQuickFixRequest:${1:quickFixId}",
						description: n(14049, "An activation event emitted when a command matches the selector associated with this ID")
					},
					{
						label: "onWalkthrough",
						body: "onWalkthrough:${1:walkthroughID}",
						description: n(14050, "An activation event emitted when a specified walkthrough is opened.")
					},
					{
						label: "onIssueReporterOpened",
						body: "onIssueReporterOpened",
						description: n(14051, "An activation event emitted when the issue reporter is opened.")
					},
					{
						label: "onChatParticipant",
						body: "onChatParticipant:${1:participantId}",
						description: n(14052, "An activation event emitted when the specified chat participant is invoked.")
					},
					{
						label: "onLanguageModelChatProvider",
						body: "onLanguageModelChatProvider:${1:vendor}",
						description: n(14053, "An activation event emitted when a chat model provider for the given vendor is requested.")
					},
					{
						label: "onLanguageModelTool",
						body: "onLanguageModelTool:${1:toolId}",
						description: n(14054, "An activation event emitted when the specified language model tool is invoked.")
					},
					{
						label: "onTerminal",
						body: "onTerminal:{1:shellType}",
						description: n(14055, "An activation event emitted when a terminal of the given shell type is opened.")
					},
					{
						label: "onTerminalShellIntegration",
						body: "onTerminalShellIntegration:${1:shellType}",
						description: n(14056, "An activation event emitted when terminal shell integration is activated for the given shell type.")
					},
					{
						label: "onMcpCollection",
						description: n(14057, "An activation event emitted whenver a tool from the MCP server is requested."),
						body: "onMcpCollection:${2:collectionId}"
					},
					{
						label: "*",
						description: n(14058, "An activation event emitted on VS Code startup. To ensure a great end user experience, please use this activation event in your extension only when no other activation events combination works in your use-case."),
						body: "*"
					}
				]
			}
		},
		badges: {
			type: "array",
			description: n(14059, "Array of badges to display in the sidebar of the Marketplace's extension page."),
			items: {
				type: "object",
				required: [
					"url",
					"href",
					"description"
				],
				properties: {
					url: {
						type: "string",
						description: n(14060, "Badge image URL.")
					},
					href: {
						type: "string",
						description: n(14061, "Badge link.")
					},
					description: {
						type: "string",
						description: n(14062, "Badge description.")
					}
				}
			}
		},
		markdown: {
			type: "string",
			description: n(14063, "Controls the Markdown rendering engine used in the Marketplace. Either github (default) or standard."),
			enum: ["github", "standard"],
			default: "github"
		},
		qna: {
			default: "marketplace",
			description: n(14064, "Controls the Q&A link in the Marketplace. Set to marketplace to enable the default Marketplace Q & A site. Set to a string to provide the URL of a custom Q & A site. Set to false to disable Q & A altogether."),
			anyOf: [{
				type: ["string", "boolean"],
				enum: ["marketplace", !1]
			}, { type: "string" }]
		},
		extensionDependencies: {
			description: n(14065, "Dependencies to other extensions. The identifier of an extension is always ${publisher}.${name}. For example: vscode.csharp."),
			type: "array",
			uniqueItems: !0,
			items: {
				type: "string",
				pattern: d
			}
		},
		extensionPack: {
			description: n(14066, "A set of extensions that can be installed together. The identifier of an extension is always ${publisher}.${name}. For example: vscode.csharp."),
			type: "array",
			uniqueItems: !0,
			items: {
				type: "string",
				pattern: d
			}
		},
		extensionKind: {
			description: n(14067, "Define the kind of an extension. `ui` extensions are installed and run on the local machine while `workspace` extensions run on the remote."),
			type: "array",
			items: E,
			default: ["workspace"],
			defaultSnippets: [
				{
					body: ["ui"],
					description: n(14068, "Define an extension which can run only on the local machine when connected to remote window.")
				},
				{
					body: ["workspace"],
					description: n(14069, "Define an extension which can run only on the remote machine when connected remote window.")
				},
				{
					body: ["ui", "workspace"],
					description: n(14070, "Define an extension which can run on either side, with a preference towards running on the local machine.")
				},
				{
					body: ["workspace", "ui"],
					description: n(14071, "Define an extension which can run on either side, with a preference towards running on the remote machine.")
				},
				{
					body: [],
					description: n(14072, "Define an extension which cannot run in a remote context, neither on the local, nor on the remote machine.")
				}
			]
		},
		capabilities: {
			description: n(14073, "Declare the set of supported capabilities by the extension."),
			type: "object",
			properties: {
				virtualWorkspaces: {
					description: n(14074, "Declares whether the extension should be enabled in virtual workspaces. A virtual workspace is a workspace which is not backed by any on-disk resources. When false, this extension will be automatically disabled in virtual workspaces. Default is true."),
					type: ["boolean", "object"],
					defaultSnippets: [{
						label: "limited",
						body: {
							supported: "${1:limited}",
							description: "${2}"
						}
					}, {
						label: "false",
						body: {
							supported: !1,
							description: "${2}"
						}
					}],
					default: (!0).valueOf,
					properties: {
						supported: {
							markdownDescription: n(14075, "Declares the level of support for virtual workspaces by the extension."),
							type: ["string", "boolean"],
							enum: [
								"limited",
								!0,
								!1
							],
							enumDescriptions: [
								n(14076, "The extension will be enabled in virtual workspaces with some functionality disabled."),
								n(14077, "The extension will be enabled in virtual workspaces with all functionality enabled."),
								n(14078, "The extension will not be enabled in virtual workspaces.")
							]
						},
						description: {
							type: "string",
							markdownDescription: n(14079, "A description of how virtual workspaces affects the extensions behavior and why it is needed. This only applies when `supported` is not `true`.")
						}
					}
				},
				untrustedWorkspaces: {
					description: n(14080, "Declares how the extension should be handled in untrusted workspaces."),
					type: "object",
					required: ["supported"],
					defaultSnippets: [{ body: {
						supported: "${1:limited}",
						description: "${2}"
					} }],
					properties: {
						supported: {
							markdownDescription: n(14081, "Declares the level of support for untrusted workspaces by the extension."),
							type: ["string", "boolean"],
							enum: [
								"limited",
								!0,
								!1
							],
							enumDescriptions: [
								n(14082, "The extension will be enabled in untrusted workspaces with some functionality disabled."),
								n(14083, "The extension will be enabled in untrusted workspaces with all functionality enabled."),
								n(14084, "The extension will not be enabled in untrusted workspaces.")
							]
						},
						restrictedConfigurations: {
							description: n(14085, "A list of configuration keys contributed by the extension that should not use workspace values in untrusted workspaces."),
							type: "array",
							items: { type: "string" }
						},
						description: {
							type: "string",
							markdownDescription: n(14086, "A description of how workspace trust affects the extensions behavior and why it is needed. This only applies when `supported` is not `true`.")
						}
					}
				}
			}
		},
		sponsor: {
			description: n(14087, "Specify the location from where users can sponsor your extension."),
			type: "object",
			defaultSnippets: [{ body: { url: "${1:https:}" } }],
			properties: { url: {
				description: n(14088, "URL from where users can sponsor your extension. It must be a valid URL with a HTTP or HTTPS protocol. Example value: https://github.com/sponsors/nvaccess"),
				type: "string"
			} }
		},
		scripts: {
			type: "object",
			properties: {
				"vscode:prepublish": {
					description: n(14089, "Script executed before the package is published as a VS Code extension."),
					type: "string"
				},
				"vscode:uninstall": {
					description: n(14090, "Uninstall hook for VS Code extension. Script that gets executed when the extension is completely uninstalled from VS Code which is when VS Code is restarted (shutdown and start) after the extension is uninstalled. Only Node scripts are supported."),
					type: "string"
				}
			}
		},
		icon: {
			type: "string",
			description: n(14091, "The path to a 128x128 pixel icon.")
		},
		l10n: {
			type: "string",
			description: n(14092, "The relative path to a folder containing localization (bundle.l10n.*.json) files. Must be specified if you are using the vscode.l10n API.")
		},
		pricing: {
			type: "string",
			markdownDescription: n(14093, "The pricing information for the extension. Can be Free (default) or Trial. For more details visit: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#extension-pricing-label"),
			enum: ["Free", "Trial"],
			default: "Free"
		}
	} }, k = class {
		constructor() {
			this._extensionPoints = /* @__PURE__ */ new Map();
		}
		registerExtensionPoint(e) {
			if (this._extensionPoints.has(e.extensionPoint)) throw Error("Duplicate extension point: " + e.extensionPoint);
			let t = new T(e.extensionPoint, e.defaultExtensionKind, e.canHandleResolver);
			return this._extensionPoints.set(e.extensionPoint, t), e.activationEventsGenerator && f.register(e.extensionPoint, e.activationEventsGenerator), O.properties.contributes.properties[e.extensionPoint] = e.jsonSchema, S.registerSchema(D, O), t;
		}
		getExtensionPoints() {
			return Array.from(this._extensionPoints.values());
		}
	}, A = { ExtensionsRegistry: "ExtensionsRegistry" }, c.add(A.ExtensionsRegistry, new k()), j = c.as(A.ExtensionsRegistry), S.registerSchema(D, O), S.registerSchema(b, { properties: { extensionEnabledApiProposals: {
		description: n(14094, "API proposals that the respective extensions can freely use."),
		type: "object",
		properties: {},
		additionalProperties: { anyOf: [{
			type: "array",
			uniqueItems: !0,
			items: {
				type: "string",
				enum: Object.keys(v),
				markdownEnumDescriptions: Object.values(v).map((e) => e.proposal)
			}
		}] }
	} } });
})), N, P, F = e((() => {
	l(), (function(e) {
		e.ExtensionFeaturesRegistry = "workbench.registry.extensionFeatures";
	})(N ||= {}), P = class {
		constructor() {
			this.extensionFeatures = /* @__PURE__ */ new Map();
		}
		registerExtensionFeature(e) {
			if (this.extensionFeatures.has(e.id)) throw Error(`Extension feature with id '${e.id}' already exists`);
			return this.extensionFeatures.set(e.id, e), { dispose: () => this.extensionFeatures.delete(e.id) };
		}
		getExtensionFeature(e) {
			return this.extensionFeatures.get(e);
		}
		getExtensionFeatures() {
			return Array.from(this.extensionFeatures.values());
		}
	}, c.add(N.ExtensionFeaturesRegistry, new P());
}));
//#endregion
export { M as a, j as i, F as n, C as r, N as t };
