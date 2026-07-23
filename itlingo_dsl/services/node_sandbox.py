"""Build commands for running untrusted Node code inside Bubblewrap.

DSL services modules are ordinary JavaScript and therefore cannot be safely
restricted inside the Node process that loads them.  This wrapper creates a
separate user/mount/PID/network namespace, exposes only the Node runtime, the
requested application runtime, and the input workspace, and clears the Odoo
process environment before starting Node.
"""

import os
import shutil
import subprocess
import tempfile


DEFAULT_BWRAP_PATH = "/usr/bin/bwrap"
DEFAULT_MEMORY_LIMIT_MB = 2048
DEFAULT_NODE_HEAP_MB = 384
DEFAULT_CPU_LIMIT_SECONDS = 20
DEFAULT_PROCESS_LIMIT = 64
DEFAULT_OPEN_FILES_LIMIT = 128
DEFAULT_OUTPUT_LIMIT_BYTES = 32 * 1024 * 1024
_SANDBOX_UID = 65534
_SANDBOX_GID = 65534


class NodeSandboxUnavailable(RuntimeError):
    """Raised when the mandatory Node sandbox cannot be constructed."""


def _resolve_executable(executable, label):
    resolved = shutil.which(executable) if executable else None
    if not resolved:
        raise NodeSandboxUnavailable("%s executable '%s' was not found." % (
            label, executable,
        ))
    return os.path.realpath(resolved)


def _positive_int(value, default, minimum=1):
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        return default
    return parsed if parsed >= minimum else default


def build_node_sandbox_command(
    node_path,
    runtime_dir,
    workspace_dir,
    script_path,
    script_args,
    *,
    bwrap_path=DEFAULT_BWRAP_PATH,
    memory_limit_mb=DEFAULT_MEMORY_LIMIT_MB,
    node_heap_mb=DEFAULT_NODE_HEAP_MB,
    cpu_limit_seconds=DEFAULT_CPU_LIMIT_SECONDS,
):
    """Return a fail-closed Bubblewrap command for one Node invocation."""
    bubblewrap = _resolve_executable(bwrap_path, "Bubblewrap")
    node = _resolve_executable(node_path, "Node.js")
    prlimit = _resolve_executable("/usr/bin/prlimit", "prlimit")

    runtime = os.path.realpath(runtime_dir)
    workspace = os.path.realpath(workspace_dir)
    script = os.path.realpath(script_path)
    if not os.path.isdir(runtime):
        raise NodeSandboxUnavailable(
            "The Node sandbox runtime directory is missing: %s" % runtime
        )
    if not os.path.isdir(workspace):
        raise NodeSandboxUnavailable(
            "The Node sandbox workspace is missing: %s" % workspace
        )
    if not os.path.isfile(script) or os.path.commonpath([runtime, script]) != runtime:
        raise NodeSandboxUnavailable(
            "The sandboxed Node script must be a file inside its runtime directory."
        )

    memory_mb = _positive_int(
        memory_limit_mb, DEFAULT_MEMORY_LIMIT_MB, minimum=512,
    )
    heap_mb = min(
        _positive_int(node_heap_mb, DEFAULT_NODE_HEAP_MB, minimum=64),
        max(64, memory_mb // 2),
    )
    cpu_seconds = _positive_int(
        cpu_limit_seconds, DEFAULT_CPU_LIMIT_SECONDS,
    )

    command = [
        bubblewrap,
        "--die-with-parent",
        "--new-session",
        "--as-pid-1",
        "--unshare-all",
        "--ro-bind", "/usr", "/usr",
    ]
    for system_path in ("/lib", "/lib64"):
        if os.path.exists(system_path):
            command.extend(["--ro-bind", system_path, system_path])

    # Development Node installations (for example nvm) live outside /usr.
    # Bind only that version's prefix, never the containing home directory.
    if not (node == "/usr" or node.startswith("/usr/")):
        node_prefix = os.path.dirname(os.path.dirname(node))
        command.extend(["--ro-bind", node_prefix, node_prefix])

    command.extend([
        "--proc", "/proc",
        "--dev", "/dev",
        # Do not expose the outer setuid sandbox launcher to author code.
        "--ro-bind", "/dev/null", bubblewrap,
        "--tmpfs", "/tmp",
        "--chmod", "1777", "/tmp",
        "--ro-bind", runtime, runtime,
        "--ro-bind", workspace, workspace,
        "--chdir", workspace,
        "--clearenv",
        "--setenv", "HOME", "/tmp",
        "--setenv", "TMPDIR", "/tmp",
        "--setenv", "NODE_ENV", "production",
        "--setenv", "NODE_OPTIONS", "--max-old-space-size=%s" % heap_mb,
        "--uid", str(_SANDBOX_UID),
        "--gid", str(_SANDBOX_GID),
        "--cap-drop", "ALL",
        prlimit,
        "--as=%s" % (memory_mb * 1024 * 1024),
        "--cpu=%s" % cpu_seconds,
        "--nofile=%s" % DEFAULT_OPEN_FILES_LIMIT,
        "--nproc=%s" % DEFAULT_PROCESS_LIMIT,
        "--fsize=%s" % DEFAULT_OUTPUT_LIMIT_BYTES,
        "--core=0",
        "--",
        node,
        script,
        *[str(argument) for argument in script_args],
    ])
    return command


def sanitized_subprocess_environment():
    """Return the only host environment values visible to Bubblewrap itself."""
    return {
        "PATH": "/usr/local/bin:/usr/bin:/bin",
        "LANG": "C.UTF-8",
    }


def run_node_sandbox(
    command,
    *,
    timeout,
    cwd,
    output_limit_bytes=DEFAULT_OUTPUT_LIMIT_BYTES,
):
    """Run a sandbox command without allowing pipe output to exhaust Odoo."""
    limit = _positive_int(
        output_limit_bytes, DEFAULT_OUTPUT_LIMIT_BYTES, minimum=1024,
    )
    with tempfile.TemporaryFile() as stdout_file, tempfile.TemporaryFile() as stderr_file:
        proc = subprocess.run(
            command,
            stdout=stdout_file,
            stderr=stderr_file,
            timeout=timeout,
            cwd=cwd,
            env=sanitized_subprocess_environment(),
            stdin=subprocess.DEVNULL,
        )
        stdout_file.seek(0)
        stderr_file.seek(0)
        stdout = stdout_file.read(limit + 1)
        stderr = stderr_file.read(limit + 1)
    if len(stdout) > limit or len(stderr) > limit:
        raise NodeSandboxUnavailable(
            "Sandboxed Node output exceeded the %s-byte limit." % limit
        )
    # Preserve the CompletedProcess interface expected by existing callers.
    proc.stdout = stdout
    proc.stderr = stderr
    return proc
