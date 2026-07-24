"""Compile author-supplied Langium services TypeScript workspaces.

The compiler runs in a local Node subprocess and returns structured output.  It
is intentionally separate from the runtimes that will eventually load the
compiled module: esbuild leaves ``langium`` external so those runtimes supply
their own, shared Langium instance.
"""

import json
import logging
import os
import subprocess
import tempfile


_logger = logging.getLogger(__name__)

_MODULE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_COMPILER_JS = os.path.join(
    _MODULE_DIR, "services_compiler", "dist", "compile.mjs",
)

_DEFAULT_NODE_PATH = "node"
_DEFAULT_TIMEOUT = 30


class ServicesCompilationUnavailable(Exception):
    """Raised when the services compilation infrastructure cannot run."""


def _config(env):
    params = env["ir.config_parameter"].sudo()
    node_path = params.get_param("itlingo_dsl.node_path", _DEFAULT_NODE_PATH)
    try:
        timeout = int(params.get_param(
            "itlingo_dsl.services_compile_timeout", _DEFAULT_TIMEOUT,
        ))
    except (TypeError, ValueError):
        timeout = _DEFAULT_TIMEOUT
    return node_path, timeout


def _write_workspace(root, files):
    for relative_path, content in files.items():
        destination = os.path.join(root, *relative_path.split("/"))
        os.makedirs(os.path.dirname(destination), exist_ok=True)
        with open(destination, "w", encoding="utf-8", newline="") as source_file:
            source_file.write(content)


def compile_services(env, files, entry_path):
    """Bundle a TypeScript services workspace into one ESM artifact.

    ``files`` maps validated POSIX-relative ``.ts`` paths to UTF-8 strings and
    ``entry_path`` identifies the single entry file.  Returns
    ``{ok, js, diagnostics, compiler_version}``.  Source validation belongs to
    ``itlingo.dsl.file``; this service only materializes already-valid records.
    """
    if not os.path.exists(_COMPILER_JS):
        raise ServicesCompilationUnavailable(
            "Services compiler bundle is missing (%s). Rebuild it with "
            "`npm ci && npm run build` in the services_compiler/ folder."
            % _COMPILER_JS
        )
    if not files or entry_path not in files:
        raise ServicesCompilationUnavailable(
            "The services workspace has no valid entry file."
        )

    node_path, timeout = _config(env)
    try:
        with tempfile.TemporaryDirectory(prefix="itlingo-services-") as workspace:
            _write_workspace(workspace, files)
            proc = subprocess.run(
                [node_path, _COMPILER_JS, workspace, entry_path],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                stdin=subprocess.DEVNULL,
                cwd=workspace,
                timeout=timeout,
            )
    except FileNotFoundError as err:
        raise ServicesCompilationUnavailable(
            "The services compiler Node executable was not found: %s" % err
        ) from err
    except subprocess.TimeoutExpired as err:
        raise ServicesCompilationUnavailable(
            "Services compilation timed out after %ss." % timeout
        ) from err
    except OSError as err:
        raise ServicesCompilationUnavailable(
            "The services compiler workspace could not be prepared or run: %s"
            % err
        ) from err

    stdout = (proc.stdout or b"").decode("utf-8", "replace").strip()
    try:
        result = json.loads(stdout)
    except json.JSONDecodeError as err:
        stderr = (proc.stderr or b"").decode("utf-8", "replace")
        _logger.error(
            "Services compiler produced invalid output: %s\n%s", stdout, stderr,
        )
        raise ServicesCompilationUnavailable(
            "The services compiler returned an unexpected response."
        ) from err

    if not isinstance(result, dict) or "ok" not in result:
        raise ServicesCompilationUnavailable(
            "The services compiler returned an unexpected response."
        )

    return {
        "ok": bool(result.get("ok")),
        "js": result.get("js") or "",
        "diagnostics": result.get("diagnostics") or [],
        "compiler_version": result.get("compilerVersion") or "unknown",
    }
