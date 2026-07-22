import { a as e, c as t, i as n, l as r, o as i, s as a, t as o } from "./monaco.contribution-Vkef_mmh.js";
//#region node_modules/@codingame/monaco-vscode-standalone-typescript-language-features/common/workers.js
function s(e, t) {
	let n = globalThis.MonacoEnvironment;
	if (n?.createTrustedTypesPolicy) try {
		return n.createTrustedTypesPolicy(e, t);
	} catch (e) {
		console.error(e);
		return;
	}
	try {
		return globalThis.trustedTypes?.createPolicy(e, t);
	} catch (e) {
		console.error(e);
		return;
	}
}
var c = typeof self == "object" && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope" && globalThis.workerttPolicy !== void 0 ? globalThis.workerttPolicy : s("defaultWorkerFactory", { createScriptURL: (e) => e });
function l(e) {
	let t = e.label, n = globalThis.MonacoEnvironment;
	if (n) {
		if (typeof n.getWorker == "function") return n.getWorker("workerMain.js", t);
		if (typeof n.getWorkerUrl == "function") {
			let e = n.getWorkerUrl("workerMain.js", t);
			return new Worker(c ? c.createScriptURL(e) : e, {
				name: t,
				type: "module"
			});
		}
	}
	if (e.createWorker) return e.createWorker();
	throw Error("You must define a function MonacoEnvironment.getWorkerUrl or MonacoEnvironment.getWorker");
}
function u(e) {
	let n = Promise.resolve(l({
		label: e.label ?? "monaco-editor-worker",
		moduleId: e.moduleId,
		createWorker: e.createWorker
	})).then((t) => (t.postMessage("ignore"), t.postMessage(e.createData), t));
	return t.createWebWorker({
		worker: n,
		host: e.host,
		keepIdleModels: e.keepIdleModels
	});
}
//#endregion
//#region node_modules/@codingame/monaco-vscode-standalone-typescript-language-features/language/typescript/workerManager.js
var d = class {
	constructor(e, t) {
		this._modeId = e, this._defaults = t, this._worker = null, this._client = null, this._configChangeListener = this._defaults.onDidChange(() => this._stopWorker()), this._updateExtraLibsToken = 0, this._extraLibsChangeListener = this._defaults.onDidExtraLibsChange(() => this._updateExtraLibs());
	}
	dispose() {
		this._configChangeListener.dispose(), this._extraLibsChangeListener.dispose(), this._stopWorker();
	}
	_stopWorker() {
		this._worker &&= (this._worker.dispose(), null), this._client = null;
	}
	async _updateExtraLibs() {
		if (!this._worker) return;
		let e = ++this._updateExtraLibsToken, t = await this._worker.getProxy();
		this._updateExtraLibsToken === e && t.updateExtraLibs(this._defaults.getExtraLibs());
	}
	_getClient() {
		return this._client ||= (async () => (this._worker = u({
			moduleId: "vs/language/typescript/tsWorker",
			createWorker: () => new Worker("./ts.worker.js", { type: "module" }),
			label: this._modeId,
			keepIdleModels: !0,
			createData: {
				compilerOptions: this._defaults.getCompilerOptions(),
				extraLibs: this._defaults.getExtraLibs(),
				customWorkerPath: this._defaults.workerOptions.customWorkerPath,
				inlayHintsOptions: this._defaults.inlayHintsOptions
			}
		}), this._defaults.getEagerModelSync() ? await this._worker.withSyncedResources(t.getModels().filter((e) => e.getLanguageId() === this._modeId).map((e) => e.uri)) : await this._worker.getProxy()))(), this._client;
	}
	async getLanguageServiceWorker(...e) {
		let t = await this._getClient();
		return this._worker && await this._worker.withSyncedResources(e), t;
	}
}, f = {};
f["lib.d.ts"] = !0, f["lib.decorators.d.ts"] = !0, f["lib.decorators.legacy.d.ts"] = !0, f["lib.dom.asynciterable.d.ts"] = !0, f["lib.dom.d.ts"] = !0, f["lib.dom.iterable.d.ts"] = !0, f["lib.es2015.collection.d.ts"] = !0, f["lib.es2015.core.d.ts"] = !0, f["lib.es2015.d.ts"] = !0, f["lib.es2015.generator.d.ts"] = !0, f["lib.es2015.iterable.d.ts"] = !0, f["lib.es2015.promise.d.ts"] = !0, f["lib.es2015.proxy.d.ts"] = !0, f["lib.es2015.reflect.d.ts"] = !0, f["lib.es2015.symbol.d.ts"] = !0, f["lib.es2015.symbol.wellknown.d.ts"] = !0, f["lib.es2016.array.include.d.ts"] = !0, f["lib.es2016.d.ts"] = !0, f["lib.es2016.full.d.ts"] = !0, f["lib.es2016.intl.d.ts"] = !0, f["lib.es2017.arraybuffer.d.ts"] = !0, f["lib.es2017.d.ts"] = !0, f["lib.es2017.date.d.ts"] = !0, f["lib.es2017.full.d.ts"] = !0, f["lib.es2017.intl.d.ts"] = !0, f["lib.es2017.object.d.ts"] = !0, f["lib.es2017.sharedmemory.d.ts"] = !0, f["lib.es2017.string.d.ts"] = !0, f["lib.es2017.typedarrays.d.ts"] = !0, f["lib.es2018.asyncgenerator.d.ts"] = !0, f["lib.es2018.asynciterable.d.ts"] = !0, f["lib.es2018.d.ts"] = !0, f["lib.es2018.full.d.ts"] = !0, f["lib.es2018.intl.d.ts"] = !0, f["lib.es2018.promise.d.ts"] = !0, f["lib.es2018.regexp.d.ts"] = !0, f["lib.es2019.array.d.ts"] = !0, f["lib.es2019.d.ts"] = !0, f["lib.es2019.full.d.ts"] = !0, f["lib.es2019.intl.d.ts"] = !0, f["lib.es2019.object.d.ts"] = !0, f["lib.es2019.string.d.ts"] = !0, f["lib.es2019.symbol.d.ts"] = !0, f["lib.es2020.bigint.d.ts"] = !0, f["lib.es2020.d.ts"] = !0, f["lib.es2020.date.d.ts"] = !0, f["lib.es2020.full.d.ts"] = !0, f["lib.es2020.intl.d.ts"] = !0, f["lib.es2020.number.d.ts"] = !0, f["lib.es2020.promise.d.ts"] = !0, f["lib.es2020.sharedmemory.d.ts"] = !0, f["lib.es2020.string.d.ts"] = !0, f["lib.es2020.symbol.wellknown.d.ts"] = !0, f["lib.es2021.d.ts"] = !0, f["lib.es2021.full.d.ts"] = !0, f["lib.es2021.intl.d.ts"] = !0, f["lib.es2021.promise.d.ts"] = !0, f["lib.es2021.string.d.ts"] = !0, f["lib.es2021.weakref.d.ts"] = !0, f["lib.es2022.array.d.ts"] = !0, f["lib.es2022.d.ts"] = !0, f["lib.es2022.error.d.ts"] = !0, f["lib.es2022.full.d.ts"] = !0, f["lib.es2022.intl.d.ts"] = !0, f["lib.es2022.object.d.ts"] = !0, f["lib.es2022.regexp.d.ts"] = !0, f["lib.es2022.string.d.ts"] = !0, f["lib.es2023.array.d.ts"] = !0, f["lib.es2023.collection.d.ts"] = !0, f["lib.es2023.d.ts"] = !0, f["lib.es2023.full.d.ts"] = !0, f["lib.es2023.intl.d.ts"] = !0, f["lib.es2024.arraybuffer.d.ts"] = !0, f["lib.es2024.collection.d.ts"] = !0, f["lib.es2024.d.ts"] = !0, f["lib.es2024.full.d.ts"] = !0, f["lib.es2024.object.d.ts"] = !0, f["lib.es2024.promise.d.ts"] = !0, f["lib.es2024.regexp.d.ts"] = !0, f["lib.es2024.sharedmemory.d.ts"] = !0, f["lib.es2024.string.d.ts"] = !0, f["lib.es5.d.ts"] = !0, f["lib.es6.d.ts"] = !0, f["lib.esnext.array.d.ts"] = !0, f["lib.esnext.collection.d.ts"] = !0, f["lib.esnext.d.ts"] = !0, f["lib.esnext.decorators.d.ts"] = !0, f["lib.esnext.disposable.d.ts"] = !0, f["lib.esnext.error.d.ts"] = !0, f["lib.esnext.float16.d.ts"] = !0, f["lib.esnext.full.d.ts"] = !0, f["lib.esnext.intl.d.ts"] = !0, f["lib.esnext.iterator.d.ts"] = !0, f["lib.esnext.promise.d.ts"] = !0, f["lib.esnext.sharedmemory.d.ts"] = !0, f["lib.scripthost.d.ts"] = !0, f["lib.webworker.asynciterable.d.ts"] = !0, f["lib.webworker.d.ts"] = !0, f["lib.webworker.importscripts.d.ts"] = !0, f["lib.webworker.iterable.d.ts"] = !0;
//#endregion
//#region node_modules/@codingame/monaco-vscode-standalone-typescript-language-features/language/typescript/languageFeatures.js
function p(e, t, n = 0) {
	if (typeof e == "string") return e;
	if (e === void 0) return "";
	let r = "";
	if (n) {
		r += t;
		for (let e = 0; e < n; e++) r += "  ";
	}
	if (r += e.messageText, n++, e.next) for (let i of e.next) r += p(i, t, n);
	return r;
}
function m(e) {
	return e ? e.map((e) => e.text).join("") : "";
}
var h = class {
	constructor(e) {
		this._worker = e;
	}
	_textSpanToRange(e, t) {
		let n = e.getPositionAt(t.start), r = e.getPositionAt(t.start + t.length), { lineNumber: i, column: a } = n, { lineNumber: o, column: s } = r;
		return {
			startLineNumber: i,
			startColumn: a,
			endLineNumber: o,
			endColumn: s
		};
	}
}, g = class {
	constructor(e) {
		this._worker = e, this._libFiles = {}, this._hasFetchedLibFiles = !1, this._fetchLibFilesPromise = null;
	}
	isLibFile(e) {
		return e ? e.path.indexOf("/lib.") === 0 && !!f[e.path.slice(1)] : !1;
	}
	getOrCreateModel(e) {
		let n = a.parse(e), r = t.getModel(n);
		if (r) return r;
		if (this.isLibFile(n) && this._hasFetchedLibFiles) return t.createModel(this._libFiles[n.path.slice(1)], "typescript", n);
		let i = o.getExtraLibs()[e];
		return i ? t.createModel(i.content, "typescript", n) : null;
	}
	_containsLibFile(e) {
		for (let t of e) if (this.isLibFile(t)) return !0;
		return !1;
	}
	async fetchLibFilesIfNecessary(e) {
		this._containsLibFile(e) && await this._fetchLibFiles();
	}
	_fetchLibFiles() {
		return this._fetchLibFilesPromise ||= this._worker().then((e) => e.getLibFiles()).then((e) => {
			this._hasFetchedLibFiles = !0, this._libFiles = e;
		}), this._fetchLibFilesPromise;
	}
}, _ = class extends h {
	constructor(e, n, r, i) {
		super(i), this._libFiles = e, this._defaults = n, this._selector = r, this._disposables = [], this._listener = /* @__PURE__ */ Object.create(null);
		let a = (e) => {
			if (e.getLanguageId() !== r) return;
			let n = () => {
				let { onlyVisible: t } = this._defaults.getDiagnosticsOptions();
				t ? e.isAttachedToEditor() && this._doValidate(e) : this._doValidate(e);
			}, i, a = e.onDidChangeContent(() => {
				clearTimeout(i), i = window.setTimeout(n, 500);
			}), o = e.onDidChangeAttached(() => {
				let { onlyVisible: r } = this._defaults.getDiagnosticsOptions();
				r && (e.isAttachedToEditor() ? n() : t.setModelMarkers(e, this._selector, []));
			});
			this._listener[e.uri.toString()] = { dispose() {
				a.dispose(), o.dispose(), clearTimeout(i);
			} }, n();
		}, o = (e) => {
			t.setModelMarkers(e, this._selector, []);
			let n = e.uri.toString();
			this._listener[n] && (this._listener[n].dispose(), delete this._listener[n]);
		};
		this._disposables.push(t.onDidCreateModel((e) => a(e))), this._disposables.push(t.onWillDisposeModel(o)), this._disposables.push(t.onDidChangeModelLanguage((e) => {
			o(e.model), a(e.model);
		})), this._disposables.push({ dispose() {
			for (let e of t.getModels()) o(e);
		} });
		let s = () => {
			for (let e of t.getModels()) o(e), a(e);
		};
		this._disposables.push(this._defaults.onDidChange(s)), this._disposables.push(this._defaults.onDidExtraLibsChange(s)), t.getModels().forEach((e) => a(e));
	}
	dispose() {
		this._disposables.forEach((e) => e && e.dispose()), this._disposables = [];
	}
	async _doValidate(e) {
		let n = await this._worker(e.uri);
		if (e.isDisposed()) return;
		let r = [], { noSyntaxValidation: i, noSemanticValidation: o, noSuggestionDiagnostics: s } = this._defaults.getDiagnosticsOptions();
		i || r.push(n.getSyntacticDiagnostics(e.uri.toString())), o || r.push(n.getSemanticDiagnostics(e.uri.toString())), s || r.push(n.getSuggestionDiagnostics(e.uri.toString()));
		let c = await Promise.all(r);
		if (!c || e.isDisposed()) return;
		let l = c.reduce((e, t) => t.concat(e), []).filter((e) => (this._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore || []).indexOf(e.code) === -1), u = l.map((e) => e.relatedInformation || []).reduce((e, t) => t.concat(e), []).map((e) => e.file ? a.parse(e.file.fileName) : null);
		await this._libFiles.fetchLibFilesIfNecessary(u), !e.isDisposed() && t.setModelMarkers(e, this._selector, l.map((t) => this._convertDiagnostics(e, t)));
	}
	_convertDiagnostics(t, n) {
		let r = n.start || 0, i = n.length || 1, { lineNumber: a, column: o } = t.getPositionAt(r), { lineNumber: s, column: c } = t.getPositionAt(r + i), l = [];
		return n.reportsUnnecessary && l.push(e.Unnecessary), n.reportsDeprecated && l.push(e.Deprecated), {
			severity: this._tsDiagnosticCategoryToMarkerSeverity(n.category),
			startLineNumber: a,
			startColumn: o,
			endLineNumber: s,
			endColumn: c,
			message: p(n.messageText, "\n"),
			code: n.code.toString(),
			tags: l,
			relatedInformation: this._convertRelatedInformation(t, n.relatedInformation)
		};
	}
	_convertRelatedInformation(e, t) {
		if (!t) return [];
		let n = [];
		return t.forEach((t) => {
			let r = e;
			if (t.file && (r = this._libFiles.getOrCreateModel(t.file.fileName)), !r) return;
			let i = t.start || 0, a = t.length || 1, { lineNumber: o, column: s } = r.getPositionAt(i), { lineNumber: c, column: l } = r.getPositionAt(i + a);
			n.push({
				resource: r.uri,
				startLineNumber: o,
				startColumn: s,
				endLineNumber: c,
				endColumn: l,
				message: p(t.messageText, "\n")
			});
		}), n;
	}
	_tsDiagnosticCategoryToMarkerSeverity(e) {
		switch (e) {
			case 1: return n.Error;
			case 3: return n.Info;
			case 0: return n.Warning;
			case 2: return n.Hint;
		}
		return n.Info;
	}
}, v = class e extends h {
	get triggerCharacters() {
		return ["."];
	}
	async provideCompletionItems(t, n, a, o) {
		let s = t.getWordUntilPosition(n), c = new i(n.lineNumber, s.startColumn, n.lineNumber, s.endColumn), l = t.uri, u = t.getOffsetAt(n), d = await this._worker(l);
		if (t.isDisposed()) return;
		let f = await d.getCompletionsAtPosition(l.toString(), u);
		if (!(!f || t.isDisposed())) return { suggestions: f.entries.map((a) => {
			let o = c;
			if (a.replacementSpan) {
				let e = t.getPositionAt(a.replacementSpan.start), n = t.getPositionAt(a.replacementSpan.start + a.replacementSpan.length);
				o = new i(e.lineNumber, e.column, n.lineNumber, n.column);
			}
			let s = [];
			return a.kindModifiers !== void 0 && a.kindModifiers.indexOf("deprecated") !== -1 && s.push(r.CompletionItemTag.Deprecated), {
				uri: l,
				position: n,
				offset: u,
				range: o,
				label: a.name,
				insertText: a.name,
				sortText: a.sortText,
				kind: e.convertKind(a.kind),
				tags: s
			};
		}) };
	}
	async resolveCompletionItem(t, n) {
		let r = t, i = r.uri, a = r.position, o = r.offset, s = await (await this._worker(i)).getCompletionEntryDetails(i.toString(), o, r.label);
		return s ? {
			uri: i,
			position: a,
			label: s.name,
			kind: e.convertKind(s.kind),
			detail: m(s.displayParts),
			documentation: { value: e.createDocumentationString(s) }
		} : r;
	}
	static convertKind(e) {
		switch (e) {
			case E.primitiveType:
			case E.keyword: return r.CompletionItemKind.Keyword;
			case E.variable:
			case E.localVariable: return r.CompletionItemKind.Variable;
			case E.memberVariable:
			case E.memberGetAccessor:
			case E.memberSetAccessor: return r.CompletionItemKind.Field;
			case E.function:
			case E.memberFunction:
			case E.constructSignature:
			case E.callSignature:
			case E.indexSignature: return r.CompletionItemKind.Function;
			case E.enum: return r.CompletionItemKind.Enum;
			case E.module: return r.CompletionItemKind.Module;
			case E.class: return r.CompletionItemKind.Class;
			case E.interface: return r.CompletionItemKind.Interface;
			case E.warning: return r.CompletionItemKind.File;
		}
		return r.CompletionItemKind.Property;
	}
	static createDocumentationString(e) {
		let t = m(e.documentation);
		if (e.tags) for (let n of e.tags) t += `

${y(n)}`;
		return t;
	}
};
function y(e) {
	let t = `*@${e.name}*`;
	if (e.name === "param" && e.text) {
		let [n, ...r] = e.text;
		t += `\`${n.text}\``, r.length > 0 && (t += ` \u2014 ${r.map((e) => e.text).join(" ")}`);
	} else Array.isArray(e.text) ? t += ` \u2014 ${e.text.map((e) => e.text).join(" ")}` : e.text && (t += ` \u2014 ${e.text}`);
	return t;
}
var b = class e extends h {
	constructor() {
		super(...arguments), this.signatureHelpTriggerCharacters = ["(", ","];
	}
	static _toSignatureHelpTriggerReason(e) {
		switch (e.triggerKind) {
			case r.SignatureHelpTriggerKind.TriggerCharacter: return e.triggerCharacter ? e.isRetrigger ? {
				kind: "retrigger",
				triggerCharacter: e.triggerCharacter
			} : {
				kind: "characterTyped",
				triggerCharacter: e.triggerCharacter
			} : { kind: "invoked" };
			case r.SignatureHelpTriggerKind.ContentChange: return e.isRetrigger ? { kind: "retrigger" } : { kind: "invoked" };
			case r.SignatureHelpTriggerKind.Invoke:
			default: return { kind: "invoked" };
		}
	}
	async provideSignatureHelp(t, n, r, i) {
		let a = t.uri, o = t.getOffsetAt(n), s = await this._worker(a);
		if (t.isDisposed()) return;
		let c = await s.getSignatureHelpItems(a.toString(), o, { triggerReason: e._toSignatureHelpTriggerReason(i) });
		if (!c || t.isDisposed()) return;
		let l = {
			activeSignature: c.selectedItemIndex,
			activeParameter: c.argumentIndex,
			signatures: []
		};
		return c.items.forEach((e) => {
			let t = {
				label: "",
				parameters: []
			};
			t.documentation = { value: m(e.documentation) }, t.label += m(e.prefixDisplayParts), e.parameters.forEach((n, r, i) => {
				let a = m(n.displayParts), o = {
					label: a,
					documentation: { value: m(n.documentation) }
				};
				t.label += a, t.parameters.push(o), r < i.length - 1 && (t.label += m(e.separatorDisplayParts));
			}), t.label += m(e.suffixDisplayParts), l.signatures.push(t);
		}), {
			value: l,
			dispose() {}
		};
	}
}, x = class extends h {
	async provideHover(e, t, n) {
		let r = e.uri, i = e.getOffsetAt(t), a = await this._worker(r);
		if (e.isDisposed()) return;
		let o = await a.getQuickInfoAtPosition(r.toString(), i);
		if (!o || e.isDisposed()) return;
		let s = m(o.documentation), c = o.tags ? o.tags.map((e) => y(e)).join("  \n\n") : "", l = m(o.displayParts);
		return {
			range: this._textSpanToRange(e, o.textSpan),
			contents: [{ value: "```typescript\n" + l + "\n```\n" }, { value: s + (c ? "\n\n" + c : "") }]
		};
	}
}, S = class extends h {
	async provideDocumentHighlights(e, t, n) {
		let i = e.uri, a = e.getOffsetAt(t), o = await this._worker(i);
		if (e.isDisposed()) return;
		let s = await o.getDocumentHighlights(i.toString(), a, [i.toString()]);
		if (!(!s || e.isDisposed())) return s.flatMap((t) => t.highlightSpans.map((t) => ({
			range: this._textSpanToRange(e, t.textSpan),
			kind: t.kind === "writtenReference" ? r.DocumentHighlightKind.Write : r.DocumentHighlightKind.Text
		})));
	}
}, C = class extends h {
	constructor(e, t) {
		super(t), this._libFiles = e;
	}
	async provideDefinition(e, t, n) {
		let r = e.uri, i = e.getOffsetAt(t), o = await this._worker(r);
		if (e.isDisposed()) return;
		let s = await o.getDefinitionAtPosition(r.toString(), i);
		if (!s || e.isDisposed() || (await this._libFiles.fetchLibFilesIfNecessary(s.map((e) => a.parse(e.fileName))), e.isDisposed())) return;
		let c = [];
		for (let e of s) {
			let t = this._libFiles.getOrCreateModel(e.fileName);
			t && c.push({
				uri: t.uri,
				range: this._textSpanToRange(t, e.textSpan)
			});
		}
		return c;
	}
}, w = class extends h {
	constructor(e, t) {
		super(t), this._libFiles = e;
	}
	async provideReferences(e, t, n, r) {
		let i = e.uri, o = e.getOffsetAt(t), s = await this._worker(i);
		if (e.isDisposed()) return;
		let c = await s.getReferencesAtPosition(i.toString(), o);
		if (!c || e.isDisposed() || (await this._libFiles.fetchLibFilesIfNecessary(c.map((e) => a.parse(e.fileName))), e.isDisposed())) return;
		let l = [];
		for (let e of c) {
			let t = this._libFiles.getOrCreateModel(e.fileName);
			t && l.push({
				uri: t.uri,
				range: this._textSpanToRange(t, e.textSpan)
			});
		}
		return l;
	}
}, T = class extends h {
	async provideDocumentSymbols(e, t) {
		let n = e.uri, i = await this._worker(n);
		if (e.isDisposed()) return;
		let a = await i.getNavigationTree(n.toString());
		if (!a || e.isDisposed()) return;
		let o = (t, n) => ({
			name: t.text,
			detail: "",
			kind: D[t.kind] || r.SymbolKind.Variable,
			range: this._textSpanToRange(e, t.spans[0]),
			selectionRange: this._textSpanToRange(e, t.spans[0]),
			tags: [],
			children: t.childItems?.map((e) => o(e, t.text)),
			containerName: n
		});
		return a.childItems ? a.childItems.map((e) => o(e)) : [];
	}
}, E = class {};
E.unknown = "", E.keyword = "keyword", E.script = "script", E.module = "module", E.class = "class", E.interface = "interface", E.type = "type", E.enum = "enum", E.variable = "var", E.localVariable = "local var", E.function = "function", E.localFunction = "local function", E.memberFunction = "method", E.memberGetAccessor = "getter", E.memberSetAccessor = "setter", E.memberVariable = "property", E.constructorImplementation = "constructor", E.callSignature = "call", E.indexSignature = "index", E.constructSignature = "construct", E.parameter = "parameter", E.typeParameter = "type parameter", E.primitiveType = "primitive type", E.label = "label", E.alias = "alias", E.const = "const", E.let = "let", E.warning = "warning";
var D = /* @__PURE__ */ Object.create(null);
D[E.module] = r.SymbolKind.Module, D[E.class] = r.SymbolKind.Class, D[E.enum] = r.SymbolKind.Enum, D[E.interface] = r.SymbolKind.Interface, D[E.memberFunction] = r.SymbolKind.Method, D[E.memberVariable] = r.SymbolKind.Property, D[E.memberGetAccessor] = r.SymbolKind.Property, D[E.memberSetAccessor] = r.SymbolKind.Property, D[E.variable] = r.SymbolKind.Variable, D[E.const] = r.SymbolKind.Variable, D[E.localVariable] = r.SymbolKind.Variable, D[E.variable] = r.SymbolKind.Variable, D[E.function] = r.SymbolKind.Function, D[E.localFunction] = r.SymbolKind.Function;
var O = class extends h {
	static _convertOptions(e) {
		return {
			ConvertTabsToSpaces: e.insertSpaces,
			TabSize: e.tabSize,
			IndentSize: e.tabSize,
			IndentStyle: 2,
			NewLineCharacter: "\n",
			InsertSpaceAfterCommaDelimiter: !0,
			InsertSpaceAfterSemicolonInForStatements: !0,
			InsertSpaceBeforeAndAfterBinaryOperators: !0,
			InsertSpaceAfterKeywordsInControlFlowStatements: !0,
			InsertSpaceAfterFunctionKeywordForAnonymousFunctions: !0,
			InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: !1,
			InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: !1,
			InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: !1,
			PlaceOpenBraceOnNewLineForControlBlocks: !1,
			PlaceOpenBraceOnNewLineForFunctions: !1
		};
	}
	_convertTextChanges(e, t) {
		return {
			text: t.newText,
			range: this._textSpanToRange(e, t.span)
		};
	}
}, k = class extends O {
	constructor() {
		super(...arguments), this.canFormatMultipleRanges = !1;
	}
	async provideDocumentRangeFormattingEdits(e, t, n, r) {
		let i = e.uri, a = e.getOffsetAt({
			lineNumber: t.startLineNumber,
			column: t.startColumn
		}), o = e.getOffsetAt({
			lineNumber: t.endLineNumber,
			column: t.endColumn
		}), s = await this._worker(i);
		if (e.isDisposed()) return;
		let c = await s.getFormattingEditsForRange(i.toString(), a, o, O._convertOptions(n));
		if (!(!c || e.isDisposed())) return c.map((t) => this._convertTextChanges(e, t));
	}
}, A = class extends O {
	get autoFormatTriggerCharacters() {
		return [
			";",
			"}",
			"\n"
		];
	}
	async provideOnTypeFormattingEdits(e, t, n, r, i) {
		let a = e.uri, o = e.getOffsetAt(t), s = await this._worker(a);
		if (e.isDisposed()) return;
		let c = await s.getFormattingEditsAfterKeystroke(a.toString(), o, n, O._convertOptions(r));
		if (!(!c || e.isDisposed())) return c.map((t) => this._convertTextChanges(e, t));
	}
}, j = class extends O {
	async provideCodeActions(e, t, n, r) {
		let i = e.uri, a = e.getOffsetAt({
			lineNumber: t.startLineNumber,
			column: t.startColumn
		}), o = e.getOffsetAt({
			lineNumber: t.endLineNumber,
			column: t.endColumn
		}), s = O._convertOptions(e.getOptions()), c = n.markers.filter((e) => e.code).map((e) => e.code).map(Number), l = await this._worker(i);
		if (e.isDisposed()) return;
		let u = await l.getCodeFixesAtPosition(i.toString(), a, o, c, s);
		return !u || e.isDisposed() ? {
			actions: [],
			dispose: () => {}
		} : {
			actions: u.filter((e) => e.changes.filter((e) => e.isNewFile).length === 0).map((t) => this._tsCodeFixActionToMonacoCodeAction(e, n, t)),
			dispose: () => {}
		};
	}
	_tsCodeFixActionToMonacoCodeAction(e, t, n) {
		let r = [];
		for (let t of n.changes) for (let n of t.textChanges) r.push({
			resource: e.uri,
			versionId: void 0,
			textEdit: {
				range: this._textSpanToRange(e, n.span),
				text: n.newText
			}
		});
		return {
			title: n.description,
			edit: { edits: r },
			diagnostics: t.markers,
			kind: "quickfix"
		};
	}
}, M = class extends h {
	constructor(e, t) {
		super(t), this._libFiles = e;
	}
	async provideRenameEdits(e, t, n, r) {
		let i = e.uri, a = i.toString(), o = e.getOffsetAt(t), s = await this._worker(i);
		if (e.isDisposed()) return;
		let c = await s.getRenameInfo(a, o, { allowRenameOfImportPath: !1 });
		if (c.canRename === !1) return {
			edits: [],
			rejectReason: c.localizedErrorMessage
		};
		if (c.fileToRename !== void 0) throw Error("Renaming files is not supported.");
		let l = await s.findRenameLocations(a, o, !1, !1, !1);
		if (!l || e.isDisposed()) return;
		let u = [];
		for (let e of l) {
			let t = this._libFiles.getOrCreateModel(e.fileName);
			if (t) u.push({
				resource: t.uri,
				versionId: void 0,
				textEdit: {
					range: this._textSpanToRange(t, e.textSpan),
					text: n
				}
			});
			else throw Error(`Unknown file ${e.fileName}.`);
		}
		return { edits: u };
	}
}, N = class extends h {
	async provideInlayHints(e, t, n) {
		let r = e.uri, i = r.toString(), a = e.getOffsetAt({
			lineNumber: t.startLineNumber,
			column: t.startColumn
		}), o = e.getOffsetAt({
			lineNumber: t.endLineNumber,
			column: t.endColumn
		}), s = await this._worker(r);
		return e.isDisposed() ? null : {
			hints: (await s.provideInlayHints(i, a, o)).map((t) => ({
				...t,
				label: t.text,
				position: e.getPositionAt(t.position),
				kind: this._convertHintKind(t.kind)
			})),
			dispose: () => {}
		};
	}
	_convertHintKind(e) {
		switch (e) {
			case "Parameter": return r.InlayHintKind.Parameter;
			case "Type": return r.InlayHintKind.Type;
			default: return r.InlayHintKind.Type;
		}
	}
}, P, F;
function I(e) {
	F = B(e, "typescript");
}
function L(e) {
	P = B(e, "javascript");
}
function R() {
	return new Promise((e, t) => {
		if (!P) return t("JavaScript not registered!");
		e(P);
	});
}
function z() {
	return new Promise((e, t) => {
		if (!F) return t("TypeScript not registered!");
		e(F);
	});
}
function B(e, t) {
	let n = [], i = new d(t, e), a = (...e) => i.getLanguageServiceWorker(...e), o = new g(a);
	function s() {
		let { modeConfiguration: i } = e;
		V(n), i.completionItems && n.push(r.registerCompletionItemProvider(t, new v(a))), i.signatureHelp && n.push(r.registerSignatureHelpProvider(t, new b(a))), i.hovers && n.push(r.registerHoverProvider(t, new x(a))), i.documentHighlights && n.push(r.registerDocumentHighlightProvider(t, new S(a))), i.definitions && n.push(r.registerDefinitionProvider(t, new C(o, a))), i.references && n.push(r.registerReferenceProvider(t, new w(o, a))), i.documentSymbols && n.push(r.registerDocumentSymbolProvider(t, new T(a))), i.rename && n.push(r.registerRenameProvider(t, new M(o, a))), i.documentRangeFormattingEdits && n.push(r.registerDocumentRangeFormattingEditProvider(t, new k(a))), i.onTypeFormattingEdits && n.push(r.registerOnTypeFormattingEditProvider(t, new A(a))), i.codeActions && n.push(r.registerCodeActionProvider(t, new j(a))), i.inlayHints && n.push(r.registerInlayHintsProvider(t, new N(a))), i.diagnostics && n.push(new _(o, e, t, a));
	}
	return s(), a;
}
function V(e) {
	for (; e.length;) e.pop().dispose();
}
//#endregion
export { h as Adapter, j as CodeActionAdaptor, C as DefinitionAdapter, _ as DiagnosticsAdapter, S as DocumentHighlightAdapter, k as FormatAdapter, O as FormatHelper, A as FormatOnTypeAdapter, N as InlayHintsAdapter, E as Kind, g as LibFiles, T as OutlineAdapter, x as QuickInfoAdapter, w as ReferenceAdapter, M as RenameAdapter, b as SignatureHelpAdapter, v as SuggestAdapter, d as WorkerManager, p as flattenDiagnosticMessageText, R as getJavaScriptWorker, z as getTypeScriptWorker, L as setupJavaScript, I as setupTypeScript };
