import hashlib
from unittest.mock import patch

from odoo.exceptions import ValidationError
from odoo.tests import TransactionCase, tagged

from ..services.services_compiler import ServicesCompilationUnavailable


OK_RESULT = {
    "ok": True,
    "js": "export default function createDslModule() { return {}; }\n",
    "diagnostics": [],
    "compiler_version": "test-compiler",
}

ERROR_RESULT = {
    "ok": False,
    "js": "",
    "diagnostics": [{
        "severity": "error",
        "message": "Expected identifier",
        "path": "services.ts",
        "line": 2,
        "column": 4,
        "code": "esbuild",
    }],
    "compiler_version": "test-compiler",
}


@tagged("post_install", "-at_install")
class TestServicesCompilation(TransactionCase):

    def setUp(self):
        super().setUp()
        self.File = self.env["itlingo.dsl.file"]
        self.dsl = self.env["itlingo.dsl"].create({
            "name": "Services Compiler Test Language",
            "acronym": "SCT",
            "version": self._testMethodName,
            "status": "draft",
        })

    def _create_services(self, content="export default () => ({});\n"):
        return self.File._create_services_text(
            self.dsl, "services.ts", content,
        )

    @patch(
        "odoo.addons.itlingo_dsl.services.services_compiler.compile_services",
        return_value=OK_RESULT,
    )
    def test_services_save_stores_artifact_and_digests(self, compile_mock):
        services = self._create_services()

        self.assertEqual(self.dsl.services_compile_result, "ok")
        self.assertEqual(self.dsl.services_compiled, OK_RESULT["js"])
        self.assertEqual(
            self.dsl.services_compiled_digest,
            hashlib.sha256(OK_RESULT["js"].encode()).hexdigest(),
        )
        self.assertEqual(
            self.dsl.services_source_digest,
            self.dsl._services_source_digest(),
        )
        self.assertEqual(self.dsl.services_compile_diagnostics or [], [])
        self.assertTrue(self.dsl.services_compile_time)
        compile_mock.assert_called_once_with(
            self.env,
            {"services.ts": services._read_text_utf8()},
            "services.ts",
        )

    @patch(
        "odoo.addons.itlingo_dsl.services.services_compiler.compile_services",
        side_effect=[OK_RESULT, ERROR_RESULT],
    )
    def test_failed_save_replaces_old_artifact_and_surfaces_diagnostics(
        self, _compile_mock,
    ):
        services = self._create_services()
        old_source_digest = self.dsl.services_source_digest

        services._write_text_utf8("export default function broken( {\n")

        self.assertEqual(self.dsl.services_compile_result, "error")
        self.assertNotEqual(self.dsl.services_source_digest, old_source_digest)
        self.assertEqual(
            self.dsl.services_source_digest, self.dsl._services_source_digest(),
        )
        self.assertFalse(self.dsl.services_compiled)
        self.assertFalse(self.dsl.services_compiled_digest)
        self.assertEqual(
            self.dsl.services_compile_diagnostics, ERROR_RESULT["diagnostics"],
        )

    @patch(
        "odoo.addons.itlingo_dsl.services.services_compiler.compile_services",
        return_value=ERROR_RESULT,
    )
    def test_publish_recompiles_and_blocks_compile_errors(self, compile_mock):
        self._create_services("export default function broken( {\n")

        with self.assertRaisesRegex(
            ValidationError, r"services\.ts:2:4: Expected identifier",
        ):
            self.dsl.action_publish()

        self.assertEqual(self.dsl.status, "draft")
        self.assertEqual(compile_mock.call_count, 2)

    @patch(
        "odoo.addons.itlingo_dsl.services.services_compiler.compile_services",
        side_effect=ServicesCompilationUnavailable("Node is unavailable"),
    )
    def test_unavailable_compiler_is_recorded_without_rejecting_save(
        self, _compile_mock,
    ):
        self._create_services()

        self.assertEqual(self.dsl.services_compile_result, "error")
        self.assertFalse(self.dsl.services_compiled)
        diagnostic = self.dsl.services_compile_diagnostics[0]
        self.assertEqual(diagnostic["code"], "services-compiler-unavailable")
        self.assertIn("Node is unavailable", diagnostic["message"])

    @patch(
        "odoo.addons.itlingo_dsl.services.services_compiler.compile_services",
        return_value=OK_RESULT,
    )
    def test_deleting_last_services_file_clears_compilation(self, _compile_mock):
        services = self._create_services()
        self.assertEqual(self.dsl.services_compile_result, "ok")

        services.unlink()

        self.assertFalse(self.dsl._services_files())
        self.assertFalse(self.dsl.services_source_digest)
        self.assertFalse(self.dsl.services_compiled)
        self.assertFalse(self.dsl.services_compiled_digest)
        self.assertFalse(self.dsl.services_compile_result)
        self.assertFalse(self.dsl.services_compile_diagnostics)
        self.assertFalse(self.dsl.services_compile_time)
