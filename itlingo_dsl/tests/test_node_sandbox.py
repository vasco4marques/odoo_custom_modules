import json
import os
from odoo.tests import BaseCase, tagged

from ..services.node_sandbox import (
    build_node_sandbox_command,
    run_node_sandbox,
)


@tagged("post_install", "-at_install")
class TestNodeSandbox(BaseCase):

    def test_real_sandbox_blocks_host_environment_filesystem_and_network(self):
        compiler_dir = os.path.realpath(os.path.join(
            os.path.dirname(__file__), "..", "services_compiler",
        ))
        workspace = os.path.join(compiler_dir, "test")
        probe = os.path.join(workspace, "sandbox_probe.mjs")
        command = build_node_sandbox_command(
            "node",
            compiler_dir,
            workspace,
            probe,
            [],
            memory_limit_mb=2048,
            node_heap_mb=256,
            cpu_limit_seconds=5,
        )
        proc = run_node_sandbox(
            command,
            timeout=10,
            cwd=workspace,
        )
        self.assertEqual(proc.returncode, 0, proc.stderr.decode("utf-8", "replace"))

        result = json.loads(proc.stdout.decode("utf-8"))
        self.assertEqual(result, {
            "unprivileged": True,
            "environmentCleared": True,
            "hostFilesystemBlocked": True,
            "workspaceReadOnly": True,
            "privateTempWritable": True,
            "networkIsolated": True,
        })
