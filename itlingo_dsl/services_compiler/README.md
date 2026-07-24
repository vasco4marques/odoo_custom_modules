# ITLingo DSL services compiler

This Node CLI bundles the TypeScript services workspace attached to an
`itlingo.dsl` record. The generated ESM keeps `langium` and
`vscode-languageserver-types` external so the module uses the exact package
instances supplied by the loading runtime.

Install and verify it after deploying or changing its lockfile:

```bash
npm ci
npm test
```

The Odoo wrapper uses `dist/compile.mjs`; `npm run build` regenerates that file.
Compilation includes a smoke-load of the artifact against Langium 4.3.1, so
the compiler requires Node 22 or newer. The production Dockerfile installs this
directory's locked production dependencies in a `node:22-bookworm-slim` build
stage and copies the resulting `node_modules` into the Odoo image. The local
directory is excluded from the Docker context, ensuring esbuild's executable
matches the container platform and glibc runtime.

## Runtime invocation

The Odoo wrapper never invokes this CLI directly; it runs `dist/compile.mjs` as
a plain local Node subprocess against a temporary workspace holding the
author-supplied `.ts` files. Author-supplied services modules are trusted: they
run with the same privileges as the Odoo process, so only authors who
understand the code they publish should be granted the ability to write them.

Optional Odoo system parameters:

- `itlingo_dsl.node_path` (default `node`)
- `itlingo_dsl.services_compile_timeout` (default `30` seconds)
