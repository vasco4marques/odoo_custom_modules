import { n as e } from "./rolldown-runtime-B1bRi_D7.js";
import { FA as t, PA as n } from "./standaloneServices-DUdtGggg.js";
//#region node_modules/@codingame/monaco-vscode-api/vscode/src/vs/platform/userDataProfile/common/userDataProfile.service.js
var r, i = e((() => {
	t(), r = n("IUserDataProfilesService");
}));
//#endregion
//#region node_modules/@codingame/monaco-vscode-api/tools.js
function a() {
	throw Error("unsupported");
}
function o(e) {
	let t = null;
	return (...n) => (t ??= e(...n), t);
}
function s(e) {
	return new Proxy(e, { construct: o((t, n) => Reflect.construct(e, n)) });
}
async function c(e) {
	await new Promise((t) => setTimeout(t, e));
}
function l(e, t, n) {
	let r = Promise.resolve(), i = null;
	return async (a) => {
		i == null ? (i = a, r = r.then(async () => await c(n)).then(async () => {
			let t = i;
			i = null, await e(t);
		})) : i = t(i, a), await r;
	};
}
var u = e((() => {}));
//#endregion
export { r as a, a as i, s as n, i as o, l as r, u as t };
