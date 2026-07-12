import { Aw as e, Ej as t, H_ as n, TA as r, Tj as i, U_ as a, bv as o, db as s, fb as c, gv as l, gw as u, mA as d, sA as f, tA as p } from "./standaloneServices-C51B94Xh.js";
e(), o(), f(), r(), i(), a(), c();
var m = "*", h = ":", g = ".", _ = "\\w+[-_\\w+]*", v = `^${_}$`, y = `^(${_}|\\*)(\\${g}${_})*(${h}${_})?$`, b = "^(\\s*(italic|bold|underline|strikethrough))*\\s*$", x = class {
	constructor(e, t, n, r, i) {
		this.foreground = e, this.bold = t, this.underline = n, this.strikethrough = r, this.italic = i;
	}
};
(function(e) {
	function t(e) {
		return {
			_foreground: e.foreground === void 0 ? null : l.Format.CSS.formatHexA(e.foreground, !0),
			_bold: e.bold === void 0 ? null : e.bold,
			_underline: e.underline === void 0 ? null : e.underline,
			_italic: e.italic === void 0 ? null : e.italic,
			_strikethrough: e.strikethrough === void 0 ? null : e.strikethrough
		};
	}
	e.toJSONObject = t;
	function n(t) {
		if (t) {
			let n = (e) => typeof e == "boolean" ? e : void 0;
			return new e(((e) => typeof e == "string" ? l.fromHex(e) : void 0)(t._foreground), n(t._bold), n(t._underline), n(t._strikethrough), n(t._italic));
		}
	}
	e.fromJSONObject = n;
	function r(e, t) {
		return e === t || e !== void 0 && t !== void 0 && (e.foreground instanceof l ? e.foreground.equals(t.foreground) : t.foreground === void 0) && e.bold === t.bold && e.underline === t.underline && e.strikethrough === t.strikethrough && e.italic === t.italic;
	}
	e.equals = r;
	function i(t) {
		return t instanceof e;
	}
	e.is = i;
	function a(t) {
		return new e(t.foreground, t.bold, t.underline, t.strikethrough, t.italic);
	}
	e.fromData = a;
	function o(t, n, r, i, a, o) {
		let s;
		if (t !== void 0 && (s = l.fromHex(t)), n !== void 0) {
			r = o = i = a = !1;
			let e = /italic|bold|underline|strikethrough/g, t;
			for (; t = e.exec(n);) switch (t[0]) {
				case "bold":
					r = !0;
					break;
				case "italic":
					o = !0;
					break;
				case "underline":
					i = !0;
					break;
				case "strikethrough":
					a = !0;
					break;
			}
		}
		return new e(s, r, i, a, o);
	}
	e.fromSettings = o;
})(x ||= {});
var S;
(function(e) {
	function t(e, t) {
		if (t && typeof t._selector == "string" && t._style) {
			let n = x.fromJSONObject(t._style);
			if (n) try {
				return {
					selector: e.parseTokenSelector(t._selector),
					style: n
				};
			} catch {}
		}
	}
	e.fromJSONObject = t;
	function n(e) {
		return {
			_selector: e.selector.id,
			_style: x.toJSONObject(e.style)
		};
	}
	e.toJSONObject = n;
	function r(e, t) {
		return e === t || e !== void 0 && t !== void 0 && e.selector && t.selector && e.selector.id === t.selector.id && x.equals(e.style, t.style);
	}
	e.equals = r;
	function i(e) {
		return e && e.selector && typeof e.selector.id == "string" && x.is(e.style);
	}
	e.is = i;
})(S ||= {});
var C = { TokenClassificationContribution: "base.contributions.tokenClassification" }, w = class extends d {
	constructor() {
		super(), this._onDidChangeSchema = this._register(new p()), this.onDidChangeSchema = this._onDidChangeSchema.event, this.currentTypeNumber = 0, this.currentModifierBit = 1, this.tokenStylingDefaultRules = [], this.tokenStylingSchema = {
			type: "object",
			properties: {},
			patternProperties: { [y]: j() },
			additionalProperties: !1,
			definitions: { style: {
				type: "object",
				description: t(2383, "Colors and styles for the token."),
				properties: {
					foreground: {
						type: "string",
						description: t(2384, "Foreground color for the token."),
						format: "color-hex",
						default: "#ff0000"
					},
					background: {
						type: "string",
						deprecationMessage: t(2385, "Token background colors are currently not supported.")
					},
					fontStyle: {
						type: "string",
						description: t(2386, "Sets the all font styles of the rule: 'italic', 'bold', 'underline' or 'strikethrough' or a combination. All styles that are not listed are unset. The empty string unsets all styles."),
						pattern: b,
						patternErrorMessage: t(2387, "Font style must be 'italic', 'bold', 'underline' or 'strikethrough' or a combination. The empty string unsets all styles."),
						defaultSnippets: [
							{
								label: t(2388, "None (clear inherited style)"),
								bodyText: "\"\""
							},
							{ body: "italic" },
							{ body: "bold" },
							{ body: "underline" },
							{ body: "strikethrough" },
							{ body: "italic bold" },
							{ body: "italic underline" },
							{ body: "italic strikethrough" },
							{ body: "bold underline" },
							{ body: "bold strikethrough" },
							{ body: "underline strikethrough" },
							{ body: "italic bold underline" },
							{ body: "italic bold strikethrough" },
							{ body: "italic underline strikethrough" },
							{ body: "bold underline strikethrough" },
							{ body: "italic bold underline strikethrough" }
						]
					},
					bold: {
						type: "boolean",
						description: t(2389, "Sets or unsets the font style to bold. Note, the presence of 'fontStyle' overrides this setting.")
					},
					italic: {
						type: "boolean",
						description: t(2390, "Sets or unsets the font style to italic. Note, the presence of 'fontStyle' overrides this setting.")
					},
					underline: {
						type: "boolean",
						description: t(2391, "Sets or unsets the font style to underline. Note, the presence of 'fontStyle' overrides this setting.")
					},
					strikethrough: {
						type: "boolean",
						description: t(2392, "Sets or unsets the font style to strikethrough. Note, the presence of 'fontStyle' overrides this setting.")
					}
				},
				defaultSnippets: [{ body: {
					foreground: "${1:#FF0000}",
					fontStyle: "${2:bold}"
				} }]
			} }
		}, this.tokenTypeById = Object.create(null), this.tokenModifierById = Object.create(null), this.typeHierarchy = Object.create(null);
	}
	registerTokenType(e, t, n, r) {
		if (!e.match(v)) throw Error("Invalid token type id.");
		if (n && !n.match(v)) throw Error("Invalid token super type id.");
		let i = {
			num: this.currentTypeNumber++,
			id: e,
			superType: n,
			description: t,
			deprecationMessage: r
		};
		this.tokenTypeById[e] = i;
		let a = j(t, r);
		this.tokenStylingSchema.properties[e] = a, this.typeHierarchy = Object.create(null);
	}
	registerTokenModifier(e, t, n) {
		if (!e.match(v)) throw Error("Invalid token modifier id.");
		let r = this.currentModifierBit;
		this.currentModifierBit *= 2;
		let i = {
			num: r,
			id: e,
			description: t,
			deprecationMessage: n
		};
		this.tokenModifierById[e] = i, this.tokenStylingSchema.properties[`*.${e}`] = j(t, n);
	}
	parseTokenSelector(e, t) {
		let n = D(e, t);
		return n.type ? {
			match: (e, t, r) => {
				let i = 0;
				if (n.language !== void 0) {
					if (n.language !== r) return -1;
					i += 10;
				}
				if (n.type !== m) {
					let t = this.getTypeHierarchy(e).indexOf(n.type);
					if (t === -1) return -1;
					i += 100 - t;
				}
				for (let e of n.modifiers) if (t.indexOf(e) === -1) return -1;
				return i + n.modifiers.length * 100;
			},
			id: `${[n.type, ...n.modifiers.sort()].join(".")}${n.language === void 0 ? "" : ":" + n.language}`
		} : {
			match: () => -1,
			id: "$invalid"
		};
	}
	registerTokenStyleDefault(e, t) {
		this.tokenStylingDefaultRules.push({
			selector: e,
			defaults: t
		});
	}
	deregisterTokenStyleDefault(e) {
		let t = e.id;
		this.tokenStylingDefaultRules = this.tokenStylingDefaultRules.filter((e) => e.selector.id !== t);
	}
	deregisterTokenType(e) {
		delete this.tokenTypeById[e], delete this.tokenStylingSchema.properties[e], this.typeHierarchy = Object.create(null);
	}
	deregisterTokenModifier(e) {
		delete this.tokenModifierById[e], delete this.tokenStylingSchema.properties[`*.${e}`];
	}
	getTokenTypes() {
		return Object.keys(this.tokenTypeById).map((e) => this.tokenTypeById[e]);
	}
	getTokenModifiers() {
		return Object.keys(this.tokenModifierById).map((e) => this.tokenModifierById[e]);
	}
	getTokenStylingSchema() {
		return this.tokenStylingSchema;
	}
	getTokenStylingDefaultRules() {
		return this.tokenStylingDefaultRules;
	}
	getTypeHierarchy(e) {
		let t = this.typeHierarchy[e];
		if (!t) {
			this.typeHierarchy[e] = t = [e];
			let n = this.tokenTypeById[e];
			for (; n && n.superType;) t.push(n.superType), n = this.tokenTypeById[n.superType];
		}
		return t;
	}
	toString() {
		return Object.keys(this.tokenTypeById).sort((e, t) => {
			let n = e.indexOf(".") === -1 ? 0 : 1, r = t.indexOf(".") === -1 ? 0 : 1;
			return n === r ? e.localeCompare(t) : n - r;
		}).map((e) => `- \`${e}\`: ${this.tokenTypeById[e].description}`).join("\n");
	}
}, T = h.charCodeAt(0), E = g.charCodeAt(0);
function D(e, t) {
	let n = e.length, r = t, i = [];
	for (let t = n - 1; t >= 0; t--) {
		let a = e.charCodeAt(t);
		if (a === T || a === E) {
			let o = e.substring(t + 1, n);
			n = t, a === T ? r = o : i.push(o);
		}
	}
	return {
		type: e.substring(0, n),
		modifiers: i,
		language: r
	};
}
var O = k();
s.add(C.TokenClassificationContribution, O);
function k() {
	let e = new w();
	function n(t, n, i = [], a, o) {
		return e.registerTokenType(t, n, a, o), i && r(t, i), t;
	}
	function r(t, n) {
		try {
			let r = e.parseTokenSelector(t);
			e.registerTokenStyleDefault(r, { scopesToProbe: n });
		} catch (e) {
			console.log(e);
		}
	}
	return n("comment", t(2393, "Style for comments."), [["comment"]]), n("string", t(2394, "Style for strings."), [["string"]]), n("keyword", t(2395, "Style for keywords."), [["keyword.control"]]), n("number", t(2396, "Style for numbers."), [["constant.numeric"]]), n("regexp", t(2397, "Style for expressions."), [["constant.regexp"]]), n("operator", t(2398, "Style for operators."), [["keyword.operator"]]), n("namespace", t(2399, "Style for namespaces."), [["entity.name.namespace"]]), n("type", t(2400, "Style for types."), [["entity.name.type"], ["support.type"]]), n("struct", t(2401, "Style for structs."), [["entity.name.type.struct"]]), n("class", t(2402, "Style for classes."), [["entity.name.type.class"], ["support.class"]]), n("interface", t(2403, "Style for interfaces."), [["entity.name.type.interface"]]), n("enum", t(2404, "Style for enums."), [["entity.name.type.enum"]]), n("typeParameter", t(2405, "Style for type parameters."), [["entity.name.type.parameter"]]), n("function", t(2406, "Style for functions"), [["entity.name.function"], ["support.function"]]), n("member", t(2407, "Style for member functions"), [], "method", "Deprecated use `method` instead"), n("method", t(2408, "Style for method (member functions)"), [["entity.name.function.member"], ["support.function"]]), n("macro", t(2409, "Style for macros."), [["entity.name.function.preprocessor"]]), n("variable", t(2410, "Style for variables."), [["variable.other.readwrite"], ["entity.name.variable"]]), n("parameter", t(2411, "Style for parameters."), [["variable.parameter"]]), n("property", t(2412, "Style for properties."), [["variable.other.property"]]), n("enumMember", t(2413, "Style for enum members."), [["variable.other.enummember"]]), n("event", t(2414, "Style for events."), [["variable.other.event"]]), n("decorator", t(2415, "Style for decorators & annotations."), [["entity.name.decorator"], ["entity.name.function"]]), n("label", t(2416, "Style for labels. "), void 0), e.registerTokenModifier("declaration", t(2417, "Style for all symbol declarations."), void 0), e.registerTokenModifier("documentation", t(2418, "Style to use for references in documentation."), void 0), e.registerTokenModifier("static", t(2419, "Style to use for symbols that are static."), void 0), e.registerTokenModifier("abstract", t(2420, "Style to use for symbols that are abstract."), void 0), e.registerTokenModifier("deprecated", t(2421, "Style to use for symbols that are deprecated."), void 0), e.registerTokenModifier("modification", t(2422, "Style to use for write accesses."), void 0), e.registerTokenModifier("async", t(2423, "Style to use for symbols that are async."), void 0), e.registerTokenModifier("readonly", t(2424, "Style to use for symbols that are read-only."), void 0), r("variable.readonly", [["variable.other.constant"]]), r("property.readonly", [["variable.other.constant.property"]]), r("type.defaultLibrary", [["support.type"]]), r("class.defaultLibrary", [["support.class"]]), r("interface.defaultLibrary", [["support.class"]]), r("variable.defaultLibrary", [["support.variable"], ["support.other.variable"]]), r("variable.defaultLibrary.readonly", [["support.constant"]]), r("property.defaultLibrary", [["support.variable.property"]]), r("property.defaultLibrary.readonly", [["support.constant.property"]]), r("function.defaultLibrary", [["support.function"]]), r("member.defaultLibrary", [["support.function"]]), e;
}
function A() {
	return O;
}
function j(e, t) {
	return {
		description: e,
		deprecationMessage: t,
		defaultSnippets: [{ body: "${1:#ff0000}" }],
		anyOf: [{
			type: "string",
			format: "color-hex"
		}, { $ref: "#/definitions/style" }]
	};
}
var M = "vscode://schemas/token-styling", N = s.as(n.JSONContribution);
N.registerSchema(M, O.getTokenStylingSchema());
var P = new u(() => N.notifySchemaChanged(M), 200);
O.onDidChangeSchema(() => {
	P.isScheduled() || P.schedule();
});
//#endregion
export { M as a, D as i, x as n, v as o, A as r, S as t };
