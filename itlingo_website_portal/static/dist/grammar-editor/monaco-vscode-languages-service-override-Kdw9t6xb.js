import { $O as e, $j as t, Ab as n, Bb as r, Ej as i, H_ as a, IO as o, Kj as s, Lb as c, NC as l, Ob as u, PC as d, Qp as ee, Sy as f, TA as p, Tj as m, U_ as h, bo as g, db as _, em as v, fb as y, kb as b, mA as x, nA as S, nv as C, rv as w, sA as T, tm as E, vo as D, xy as O, yo as k } from "./standaloneServices-C51B94Xh.js";
import { i as A, n as j } from "./languageConfiguration-pd_q6saV.js";
import { At as M, Jt as N, a as P, jt as F, qt as I, s as te } from "./monaco-vscode-files-service-override-DGMr6mGW.js";
import { b as L, v as R, y as z } from "./filesConfigurationService-CxZOIrXS.js";
import { i as B, n as V, r as H, t as U } from "./languageStatusService.service-dYnhaUee.js";
import { n as W, t as G } from "./languageService-CNIR0xe2.js";
import { n as K, t as q } from "./jsonErrorMessages-CboTgU8y.js";
s(), m(), p(), n(), y(), w(), E(), F(), W(), T(), e(), B(), ee(), r();
var J = class {
	constructor() {
		this._provider = new H(), this.onDidChange = S.map(this._provider.onDidChange, () => void 0);
	}
	addStatus(e) {
		return this._provider.register(e.selector, e);
	}
	getLanguageStatus(e) {
		return this._provider.ordered(e).sort((e, t) => {
			let n = t.severity - e.severity;
			return n === 0 && (n = o(e.source, t.source)), n === 0 && (n = o(e.id, t.id)), n;
		});
	}
};
V(), te(), k(), A(), f(), h(), K(), N(), d(), z(), r();
var Y;
function X(e) {
	if (!Array.isArray(e)) return !1;
	for (let t = 0, n = e.length; t < n; t++) if (typeof e[t] != "string") return !1;
	return !0;
}
function Z(e) {
	return X(e) && e.length === 2;
}
var Q = Y = class extends x {
	constructor(e, t, n, r) {
		super(), this._languageService = e, this._extensionResourceLoaderService = t, this._extensionService = n, this._languageConfigurationService = r, this._done = /* @__PURE__ */ new Map(), this._register(this._languageService.onDidRequestBasicLanguageFeatures(async (e) => {
			this._extensionService.whenInstalledExtensionsRegistered().then(() => {
				this._loadConfigurationsForMode(e);
			});
		})), this._register(this._languageService.onDidChange(() => {
			for (let [e] of this._done) this._loadConfigurationsForMode(e);
		}));
	}
	async _loadConfigurationsForMode(e) {
		let t = this._languageService.getConfigurationFiles(e), n = l(t.map((e) => e.toString()));
		if (this._done.get(e) === n) return;
		this._done.set(e, n);
		let r = await Promise.all(t.map((e) => this._readConfigFile(e)));
		for (let t of r) this._handleConfig(e, t);
	}
	async _readConfigFile(e) {
		try {
			let t = await this._extensionResourceLoaderService.readExtensionResource(e), n = [], r = g(t, n);
			return n.length && console.error(i(6215, "Errors parsing {0}: {1}", e.toString(), n.map((e) => `[${e.offset}, ${e.length}] ${q(e.error)}`).join("\n"))), D(r) !== "object" && (console.error(i(6216, "{0}: Invalid format, JSON object expected.", e.toString())), r = {}), r;
		} catch (e) {
			return console.error(e), {};
		}
	}
	static _extractValidCommentRule(e, n) {
		let r = n.comments;
		if (r === void 0) return;
		if (!t(r)) {
			console.warn(`[${e}]: language configuration: expected \`comments\` to be an object.`);
			return;
		}
		let i;
		if (r.lineComment !== void 0) if (typeof r.lineComment == "string") i ||= {}, i.lineComment = r.lineComment;
		else if (t(r.lineComment)) {
			let t = r.lineComment;
			typeof t.comment == "string" ? (i ||= {}, i.lineComment = {
				comment: t.comment,
				noIndent: t.noIndent
			}) : console.warn(`[${e}]: language configuration: expected \`comments.lineComment.comment\` to be a string.`);
		} else console.warn(`[${e}]: language configuration: expected \`comments.lineComment\` to be a string or an object with comment property.`);
		return r.blockComment !== void 0 && (Z(r.blockComment) ? (i ||= {}, i.blockComment = r.blockComment) : console.warn(`[${e}]: language configuration: expected \`comments.blockComment\` to be an array of two strings.`)), i;
	}
	static _extractValidBrackets(e, t) {
		let n = t.brackets;
		if (n === void 0) return;
		if (!Array.isArray(n)) {
			console.warn(`[${e}]: language configuration: expected \`brackets\` to be an array.`);
			return;
		}
		let r;
		for (let t = 0, i = n.length; t < i; t++) {
			let i = n[t];
			if (!Z(i)) {
				console.warn(`[${e}]: language configuration: expected \`brackets[${t}]\` to be an array of two strings.`);
				continue;
			}
			r ||= [], r.push(i);
		}
		return r;
	}
	static _extractValidAutoClosingPairs(e, n) {
		let r = n.autoClosingPairs;
		if (r === void 0) return;
		if (!Array.isArray(r)) {
			console.warn(`[${e}]: language configuration: expected \`autoClosingPairs\` to be an array.`);
			return;
		}
		let i;
		for (let n = 0, a = r.length; n < a; n++) {
			let a = r[n];
			if (Array.isArray(a)) {
				if (!Z(a)) {
					console.warn(`[${e}]: language configuration: expected \`autoClosingPairs[${n}]\` to be an array of two strings or an object.`);
					continue;
				}
				i ||= [], i.push({
					open: a[0],
					close: a[1]
				});
			} else {
				if (!t(a)) {
					console.warn(`[${e}]: language configuration: expected \`autoClosingPairs[${n}]\` to be an array of two strings or an object.`);
					continue;
				}
				if (typeof a.open != "string") {
					console.warn(`[${e}]: language configuration: expected \`autoClosingPairs[${n}].open\` to be a string.`);
					continue;
				}
				if (typeof a.close != "string") {
					console.warn(`[${e}]: language configuration: expected \`autoClosingPairs[${n}].close\` to be a string.`);
					continue;
				}
				if (a.notIn !== void 0 && !X(a.notIn)) {
					console.warn(`[${e}]: language configuration: expected \`autoClosingPairs[${n}].notIn\` to be a string array.`);
					continue;
				}
				i ||= [], i.push({
					open: a.open,
					close: a.close,
					notIn: a.notIn
				});
			}
		}
		return i;
	}
	static _extractValidSurroundingPairs(e, n) {
		let r = n.surroundingPairs;
		if (r === void 0) return;
		if (!Array.isArray(r)) {
			console.warn(`[${e}]: language configuration: expected \`surroundingPairs\` to be an array.`);
			return;
		}
		let i;
		for (let n = 0, a = r.length; n < a; n++) {
			let a = r[n];
			if (Array.isArray(a)) {
				if (!Z(a)) {
					console.warn(`[${e}]: language configuration: expected \`surroundingPairs[${n}]\` to be an array of two strings or an object.`);
					continue;
				}
				i ||= [], i.push({
					open: a[0],
					close: a[1]
				});
			} else {
				if (!t(a)) {
					console.warn(`[${e}]: language configuration: expected \`surroundingPairs[${n}]\` to be an array of two strings or an object.`);
					continue;
				}
				if (typeof a.open != "string") {
					console.warn(`[${e}]: language configuration: expected \`surroundingPairs[${n}].open\` to be a string.`);
					continue;
				}
				if (typeof a.close != "string") {
					console.warn(`[${e}]: language configuration: expected \`surroundingPairs[${n}].close\` to be a string.`);
					continue;
				}
				i ||= [], i.push({
					open: a.open,
					close: a.close
				});
			}
		}
		return i;
	}
	static _extractValidColorizedBracketPairs(e, t) {
		let n = t.colorizedBracketPairs;
		if (n === void 0) return;
		if (!Array.isArray(n)) {
			console.warn(`[${e}]: language configuration: expected \`colorizedBracketPairs\` to be an array.`);
			return;
		}
		let r = [];
		for (let t = 0, i = n.length; t < i; t++) {
			let i = n[t];
			if (!Z(i)) {
				console.warn(`[${e}]: language configuration: expected \`colorizedBracketPairs[${t}]\` to be an array of two strings.`);
				continue;
			}
			r.push([i[0], i[1]]);
		}
		return r;
	}
	static _extractValidOnEnterRules(e, n) {
		let r = n.onEnterRules;
		if (r === void 0) return;
		if (!Array.isArray(r)) {
			console.warn(`[${e}]: language configuration: expected \`onEnterRules\` to be an array.`);
			return;
		}
		let i;
		for (let n = 0, a = r.length; n < a; n++) {
			let a = r[n];
			if (!t(a)) {
				console.warn(`[${e}]: language configuration: expected \`onEnterRules[${n}]\` to be an object.`);
				continue;
			}
			if (!t(a.action)) {
				console.warn(`[${e}]: language configuration: expected \`onEnterRules[${n}].action\` to be an object.`);
				continue;
			}
			let o;
			if (a.action.indent === "none") o = j.None;
			else if (a.action.indent === "indent") o = j.Indent;
			else if (a.action.indent === "indentOutdent") o = j.IndentOutdent;
			else if (a.action.indent === "outdent") o = j.Outdent;
			else {
				console.warn(`[${e}]: language configuration: expected \`onEnterRules[${n}].action.indent\` to be 'none', 'indent', 'indentOutdent' or 'outdent'.`);
				continue;
			}
			let s = { indentAction: o };
			a.action.appendText && (typeof a.action.appendText == "string" ? s.appendText = a.action.appendText : console.warn(`[${e}]: language configuration: expected \`onEnterRules[${n}].action.appendText\` to be undefined or a string.`)), a.action.removeText && (typeof a.action.removeText == "number" ? s.removeText = a.action.removeText : console.warn(`[${e}]: language configuration: expected \`onEnterRules[${n}].action.removeText\` to be undefined or a number.`));
			let c = this._parseRegex(e, `onEnterRules[${n}].beforeText`, a.beforeText);
			if (!c) continue;
			let l = {
				beforeText: c,
				action: s
			};
			if (a.afterText) {
				let t = this._parseRegex(e, `onEnterRules[${n}].afterText`, a.afterText);
				t && (l.afterText = t);
			}
			if (a.previousLineText) {
				let t = this._parseRegex(e, `onEnterRules[${n}].previousLineText`, a.previousLineText);
				t && (l.previousLineText = t);
			}
			i ||= [], i.push(l);
		}
		return i;
	}
	static extractValidConfig(e, t) {
		let n = this._extractValidCommentRule(e, t), r = this._extractValidBrackets(e, t), i = this._extractValidAutoClosingPairs(e, t), a = this._extractValidSurroundingPairs(e, t), o = this._extractValidColorizedBracketPairs(e, t), s = typeof t.autoCloseBefore == "string" ? t.autoCloseBefore : void 0, c = t.wordPattern ? this._parseRegex(e, "wordPattern", t.wordPattern) : void 0, l = t.indentationRules ? this._mapIndentationRules(e, t.indentationRules) : void 0, u;
		if (t.folding) {
			let n = t.folding.markers, r = n && n.start ? this._parseRegex(e, "folding.markers.start", n.start) : void 0, i = n && n.end ? this._parseRegex(e, "folding.markers.end", n.end) : void 0, a = r && i ? {
				start: r,
				end: i
			} : void 0;
			u = {
				offSide: t.folding.offSide,
				markers: a
			};
		}
		return {
			comments: n,
			brackets: r,
			wordPattern: c,
			indentationRules: l,
			onEnterRules: this._extractValidOnEnterRules(e, t),
			autoClosingPairs: i,
			surroundingPairs: a,
			colorizedBracketPairs: o,
			autoCloseBefore: s,
			folding: u,
			__electricCharacterSupport: void 0
		};
	}
	_handleConfig(e, t) {
		let n = Y.extractValidConfig(e, t);
		this._languageConfigurationService.register(e, n, 50);
	}
	static _parseRegex(e, n, r) {
		if (typeof r == "string") try {
			return new RegExp(r, "");
		} catch (t) {
			console.warn(`[${e}]: Invalid regular expression in \`${n}\`: `, t);
			return;
		}
		if (t(r)) {
			if (typeof r.pattern != "string") {
				console.warn(`[${e}]: language configuration: expected \`${n}.pattern\` to be a string.`);
				return;
			}
			if (r.flags !== void 0 && typeof r.flags != "string") {
				console.warn(`[${e}]: language configuration: expected \`${n}.flags\` to be a string.`);
				return;
			}
			try {
				return new RegExp(r.pattern, r.flags);
			} catch (t) {
				console.warn(`[${e}]: Invalid regular expression in \`${n}\`: `, t);
				return;
			}
		}
		console.warn(`[${e}]: language configuration: expected \`${n}\` to be a string or an object.`);
	}
	static _mapIndentationRules(e, t) {
		let n = this._parseRegex(e, "indentationRules.increaseIndentPattern", t.increaseIndentPattern);
		if (!n) return;
		let r = this._parseRegex(e, "indentationRules.decreaseIndentPattern", t.decreaseIndentPattern);
		if (!r) return;
		let i = {
			increaseIndentPattern: n,
			decreaseIndentPattern: r
		};
		return t.indentNextLinePattern && (i.indentNextLinePattern = this._parseRegex(e, "indentationRules.indentNextLinePattern", t.indentNextLinePattern)), t.unIndentedLinePattern && (i.unIndentedLinePattern = this._parseRegex(e, "indentationRules.unIndentedLinePattern", t.unIndentedLinePattern)), i;
	}
};
Q = Y = u([
	b(0, C),
	b(1, I),
	b(2, M),
	b(3, O)
], Q);
var ne = "vscode://schemas/language-configuration", re = {
	allowComments: !0,
	allowTrailingCommas: !0,
	default: {
		comments: {
			blockComment: ["/*", "*/"],
			lineComment: "//"
		},
		brackets: [
			["(", ")"],
			["[", "]"],
			["{", "}"]
		],
		autoClosingPairs: [
			["(", ")"],
			["[", "]"],
			["{", "}"]
		],
		surroundingPairs: [
			["(", ")"],
			["[", "]"],
			["{", "}"]
		]
	},
	definitions: {
		openBracket: {
			type: "string",
			description: i(6217, "The opening bracket character or string sequence.")
		},
		closeBracket: {
			type: "string",
			description: i(6218, "The closing bracket character or string sequence.")
		},
		bracketPair: {
			type: "array",
			items: [{ $ref: "#/definitions/openBracket" }, { $ref: "#/definitions/closeBracket" }]
		}
	},
	properties: {
		comments: {
			default: {
				blockComment: ["/*", "*/"],
				lineComment: {
					comment: "//",
					noIndent: !1
				}
			},
			description: i(6219, "Defines the comment symbols"),
			type: "object",
			properties: {
				blockComment: {
					type: "array",
					description: i(6220, "Defines how block comments are marked."),
					items: [{
						type: "string",
						description: i(6221, "The character sequence that starts a block comment.")
					}, {
						type: "string",
						description: i(6222, "The character sequence that ends a block comment.")
					}]
				},
				lineComment: {
					type: "object",
					description: i(6223, "Configuration for line comments."),
					properties: {
						comment: {
							type: "string",
							description: i(6224, "The character sequence that starts a line comment.")
						},
						noIndent: {
							type: "boolean",
							description: i(6225, "Whether the comment token should not be indented and placed at the first column. Defaults to false."),
							default: !1
						}
					},
					required: ["comment"],
					additionalProperties: !1
				}
			}
		},
		brackets: {
			default: [
				["(", ")"],
				["[", "]"],
				["{", "}"]
			],
			markdownDescription: i(6226, "Defines the bracket symbols that increase or decrease the indentation. When bracket pair colorization is enabled and {0} is not defined, this also defines the bracket pairs that are colorized by their nesting level.", "`colorizedBracketPairs`"),
			type: "array",
			items: { $ref: "#/definitions/bracketPair" }
		},
		colorizedBracketPairs: {
			default: [
				["(", ")"],
				["[", "]"],
				["{", "}"]
			],
			markdownDescription: i(6227, "Defines the bracket pairs that are colorized by their nesting level if bracket pair colorization is enabled. Any brackets included here that are not included in {0} will be automatically included in {0}.", "`brackets`"),
			type: "array",
			items: { $ref: "#/definitions/bracketPair" }
		},
		autoClosingPairs: {
			default: [
				["(", ")"],
				["[", "]"],
				["{", "}"]
			],
			description: i(6228, "Defines the bracket pairs. When a opening bracket is entered, the closing bracket is inserted automatically."),
			type: "array",
			items: { oneOf: [{ $ref: "#/definitions/bracketPair" }, {
				type: "object",
				properties: {
					open: { $ref: "#/definitions/openBracket" },
					close: { $ref: "#/definitions/closeBracket" },
					notIn: {
						type: "array",
						description: i(6229, "Defines a list of scopes where the auto pairs are disabled."),
						items: { enum: ["string", "comment"] }
					}
				}
			}] }
		},
		autoCloseBefore: {
			default: ";:.,=}])> \n	",
			description: i(6230, "Defines what characters must be after the cursor in order for bracket or quote autoclosing to occur when using the 'languageDefined' autoclosing setting. This is typically the set of characters which can not start an expression."),
			type: "string"
		},
		surroundingPairs: {
			default: [
				["(", ")"],
				["[", "]"],
				["{", "}"]
			],
			description: i(6231, "Defines the bracket pairs that can be used to surround a selected string."),
			type: "array",
			items: { oneOf: [{ $ref: "#/definitions/bracketPair" }, {
				type: "object",
				properties: {
					open: { $ref: "#/definitions/openBracket" },
					close: { $ref: "#/definitions/closeBracket" }
				}
			}] }
		},
		wordPattern: {
			default: "",
			description: i(6232, "Defines what is considered to be a word in the programming language."),
			type: ["string", "object"],
			properties: {
				pattern: {
					type: "string",
					description: i(6233, "The RegExp pattern used to match words."),
					default: ""
				},
				flags: {
					type: "string",
					description: i(6234, "The RegExp flags used to match words."),
					default: "g",
					pattern: "^([gimuy]+)$",
					patternErrorMessage: i(6235, "Must match the pattern `/^([gimuy]+)$/`.")
				}
			}
		},
		indentationRules: {
			default: {
				increaseIndentPattern: "",
				decreaseIndentPattern: ""
			},
			description: i(6236, "The language's indentation settings."),
			type: "object",
			properties: {
				increaseIndentPattern: {
					type: ["string", "object"],
					description: i(6237, "If a line matches this pattern, then all the lines after it should be indented once (until another rule matches)."),
					properties: {
						pattern: {
							type: "string",
							description: i(6238, "The RegExp pattern for increaseIndentPattern."),
							default: ""
						},
						flags: {
							type: "string",
							description: i(6239, "The RegExp flags for increaseIndentPattern."),
							default: "",
							pattern: "^([gimuy]+)$",
							patternErrorMessage: i(6240, "Must match the pattern `/^([gimuy]+)$/`.")
						}
					}
				},
				decreaseIndentPattern: {
					type: ["string", "object"],
					description: i(6241, "If a line matches this pattern, then all the lines after it should be unindented once (until another rule matches)."),
					properties: {
						pattern: {
							type: "string",
							description: i(6242, "The RegExp pattern for decreaseIndentPattern."),
							default: ""
						},
						flags: {
							type: "string",
							description: i(6243, "The RegExp flags for decreaseIndentPattern."),
							default: "",
							pattern: "^([gimuy]+)$",
							patternErrorMessage: i(6244, "Must match the pattern `/^([gimuy]+)$/`.")
						}
					}
				},
				indentNextLinePattern: {
					type: ["string", "object"],
					description: i(6245, "If a line matches this pattern, then **only the next line** after it should be indented once."),
					properties: {
						pattern: {
							type: "string",
							description: i(6246, "The RegExp pattern for indentNextLinePattern."),
							default: ""
						},
						flags: {
							type: "string",
							description: i(6247, "The RegExp flags for indentNextLinePattern."),
							default: "",
							pattern: "^([gimuy]+)$",
							patternErrorMessage: i(6248, "Must match the pattern `/^([gimuy]+)$/`.")
						}
					}
				},
				unIndentedLinePattern: {
					type: ["string", "object"],
					description: i(6249, "If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules."),
					properties: {
						pattern: {
							type: "string",
							description: i(6250, "The RegExp pattern for unIndentedLinePattern."),
							default: ""
						},
						flags: {
							type: "string",
							description: i(6251, "The RegExp flags for unIndentedLinePattern."),
							default: "",
							pattern: "^([gimuy]+)$",
							patternErrorMessage: i(6252, "Must match the pattern `/^([gimuy]+)$/`.")
						}
					}
				}
			}
		},
		folding: {
			type: "object",
			description: i(6253, "The language's folding settings."),
			properties: {
				offSide: {
					type: "boolean",
					description: i(6254, "A language adheres to the off-side rule if blocks in that language are expressed by their indentation. If set, empty lines belong to the subsequent block.")
				},
				markers: {
					type: "object",
					description: i(6255, "Language specific folding markers such as '#region' and '#endregion'. The start and end regexes will be tested against the contents of all lines and must be designed efficiently"),
					properties: {
						start: {
							type: "string",
							description: i(6256, "The RegExp pattern for the start marker. The regexp must start with '^'.")
						},
						end: {
							type: "string",
							description: i(6257, "The RegExp pattern for the end marker. The regexp must start with '^'.")
						}
					}
				}
			}
		},
		onEnterRules: {
			type: "array",
			description: i(6258, "The language's rules to be evaluated when pressing Enter."),
			items: {
				type: "object",
				description: i(6258, "The language's rules to be evaluated when pressing Enter."),
				required: ["beforeText", "action"],
				properties: {
					beforeText: {
						type: ["string", "object"],
						description: i(6259, "This rule will only execute if the text before the cursor matches this regular expression."),
						properties: {
							pattern: {
								type: "string",
								description: i(6260, "The RegExp pattern for beforeText."),
								default: ""
							},
							flags: {
								type: "string",
								description: i(6261, "The RegExp flags for beforeText."),
								default: "",
								pattern: "^([gimuy]+)$",
								patternErrorMessage: i(6262, "Must match the pattern `/^([gimuy]+)$/`.")
							}
						}
					},
					afterText: {
						type: ["string", "object"],
						description: i(6263, "This rule will only execute if the text after the cursor matches this regular expression."),
						properties: {
							pattern: {
								type: "string",
								description: i(6264, "The RegExp pattern for afterText."),
								default: ""
							},
							flags: {
								type: "string",
								description: i(6265, "The RegExp flags for afterText."),
								default: "",
								pattern: "^([gimuy]+)$",
								patternErrorMessage: i(6266, "Must match the pattern `/^([gimuy]+)$/`.")
							}
						}
					},
					previousLineText: {
						type: ["string", "object"],
						description: i(6267, "This rule will only execute if the text above the line matches this regular expression."),
						properties: {
							pattern: {
								type: "string",
								description: i(6268, "The RegExp pattern for previousLineText."),
								default: ""
							},
							flags: {
								type: "string",
								description: i(6269, "The RegExp flags for previousLineText."),
								default: "",
								pattern: "^([gimuy]+)$",
								patternErrorMessage: i(6270, "Must match the pattern `/^([gimuy]+)$/`.")
							}
						}
					},
					action: {
						type: ["string", "object"],
						description: i(6271, "The action to execute."),
						required: ["indent"],
						default: { indent: "indent" },
						properties: {
							indent: {
								type: "string",
								description: i(6272, "Describe what to do with the indentation"),
								default: "indent",
								enum: [
									"none",
									"indent",
									"indentOutdent",
									"outdent"
								],
								markdownEnumDescriptions: [
									i(6273, "Insert new line and copy the previous line's indentation."),
									i(6274, "Insert new line and indent once (relative to the previous line's indentation)."),
									i(6275, "Insert two new lines:\n - the first one indented which will hold the cursor\n - the second one at the same indentation level"),
									i(6276, "Insert new line and outdent once (relative to the previous line's indentation).")
								]
							},
							appendText: {
								type: "string",
								description: i(6277, "Describes text to be appended after the new line and after the indentation."),
								default: ""
							},
							removeText: {
								type: "number",
								description: i(6278, "Describes the number of characters to remove from the new line's indentation."),
								default: 0
							}
						}
					}
				}
			}
		}
	}
};
_.as(a.JSONContribution).registerSchema(ne, re);
var $ = class {
	static {
		this.ID = "workbench.contrib.languageConfigurationExtensionPoint";
	}
	constructor(e) {
		this.instantiationService = e, this.instantiationService.createInstance(Q);
	}
};
//#endregion
//#region node_modules/@codingame/monaco-vscode-languages-service-override/index.js
$ = u([b(0, c)], $), L($.ID, $, R.BlockStartup), w();
function ie() {
	return {
		...P(),
		[C.toString()]: new v(G, [], !1),
		[U.toString()]: new v(J, [], !0)
	};
}
//#endregion
export { ie as default };
