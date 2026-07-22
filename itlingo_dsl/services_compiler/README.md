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
The production Dockerfile installs this directory's locked production
dependencies in a `node:20-bookworm-slim` build stage and copies the resulting
`node_modules` into the Odoo image. The local directory is excluded from the
Docker context, ensuring esbuild's executable matches the container platform
and glibc runtime.
