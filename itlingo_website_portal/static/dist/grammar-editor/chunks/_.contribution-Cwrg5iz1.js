//#region node_modules/@codingame/monaco-vscode-keybindings-service-override/vscode/src/vs/workbench/services/keybinding/browser/keyboardLayouts/_.contribution.js
var e = class e {
	static {
		this.INSTANCE = new e();
	}
	get layoutInfos() {
		return this._layoutInfos;
	}
	constructor() {
		this._layoutInfos = [];
	}
	registerKeyboardLayout(e) {
		this._layoutInfos.push(e);
	}
};
//#endregion
export { e as t };
