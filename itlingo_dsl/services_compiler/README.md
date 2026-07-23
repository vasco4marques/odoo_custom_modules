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

## Mandatory runtime sandbox

The Odoo wrapper never invokes this CLI directly. It uses Bubblewrap to create
new user, mount, PID, IPC, UTS, cgroup, and network namespaces; clears the Odoo
environment; mounts this runtime and the source workspace read-only; provides a
private `/tmp`; drops capabilities; switches to namespace UID/GID 65534; and
applies `prlimit` CPU, address-space, process, open-file, output-file, and core
limits. If Bubblewrap, `prlimit`, Node, or a required runtime path is missing,
compilation fails closed and the DSL cannot publish.

The production Dockerfile installs Bubblewrap in its supported setuid mode.
Docker Compose grants Bubblewrap's minimal required `NET_ADMIN`, `SYS_ADMIN`,
and `SYS_PTRACE` capability set, unconfined seccomp, and unmasked system paths
so the helper can create nested namespaces while the Odoo process still runs
as UID 110. Bubblewrap drops every capability, masks its own setuid executable,
and enables `no_new_privs` before starting Node. These Compose settings are
load-bearing: without them the compiler fails closed. `deploy.sh` uploads the
matching Compose file before restarting the service. Verify deployment by
saving a services draft and confirming its compile result is `ok`.

Optional Odoo system parameters:

- `itlingo_dsl.services_sandbox_path` (default `/usr/bin/bwrap`)
- `itlingo_dsl.services_compile_timeout` (default `30` seconds)
- `itlingo_dsl.services_memory_limit_mb` (default `2048`, address-space limit)
- `itlingo_dsl.services_node_heap_mb` (default `384`)
- `itlingo_dsl.services_cpu_limit_seconds` (default `20`)
