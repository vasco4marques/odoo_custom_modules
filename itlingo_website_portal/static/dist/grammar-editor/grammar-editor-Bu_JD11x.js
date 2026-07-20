//#region src/bootstrap.ts
var e = document.querySelector("#itlingo-grammar-editor"), t;
function n(e, t) {
	return e instanceof Error && e.message ? e.message : typeof e == "object" && e && "message" in e ? String(e.message || t) : t;
}
function r(t, r, i = "bootstrap") {
	if (!e) return;
	let a = e.querySelector("[data-grammar-error]");
	a && (a.textContent = n(t, r), a.classList.remove("d-none")), e.dataset.grammarErrorKind = i, console.error("[ITLingo Grammar Editor]", t);
}
function i(e) {
	return e instanceof PromiseRejectionEvent ? e.reason : e.error || e.message;
}
function a(e) {
	return n(e, String(e || "")).includes("ResizeObserver loop");
}
function o(t) {
	if (!e) return;
	let n = i(t);
	if (a(n) || a(t)) {
		t.preventDefault(), t.stopImmediatePropagation();
		return;
	}
	r(n, "The Grammar Editor stopped unexpectedly. Reload the page to try again.", "uncaught"), t.preventDefault(), t.stopImmediatePropagation();
}
function s() {
	if (!("Worker" in window)) return !1;
	let e = !1, t = URL.createObjectURL(new Blob(["export {};"], { type: "text/javascript" }));
	try {
		new Worker(t, { get type() {
			return e = !0, "module";
		} }).terminate();
	} catch {
		return !1;
	} finally {
		URL.revokeObjectURL(t);
	}
	return e;
}
e && (window.addEventListener("error", o, { capture: !0 }), window.addEventListener("unhandledrejection", o, { capture: !0 }), s() ? import("./chunks/main-CLdE-ogS.js").then((n) => (t = n.mountGrammarEditor(e), t?.start())).catch((e) => {
	r(e, "Could not start the Grammar Editor.");
}) : r(/* @__PURE__ */ Error("This browser cannot run module workers. Please use a current version of Firefox, Chrome, Edge, or Safari."), "This browser is not supported by the Grammar Editor.", "unsupported-browser"));
//#endregion
export { t as grammarEditorApp };
