import base64
import hashlib
import json

from odoo.tests import HttpCase, tagged


@tagged("post_install", "-at_install")
class TestGetDsls(HttpCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.File = cls.env["itlingo.dsl.file"]
        cls.dsl = cls.env["itlingo.dsl"].create({
            "name": "ITOI multi-file grammar",
            "acronym": "ITOIMF",
            "version": "test-1",
            "status": "draft",
            "file_extensions": ".imf",
        })
        cls.File._create_grammar_text(
            cls.dsl,
            "Main.langium",
            "grammar ITOIMF\n"
            "import './shared/Terminals'\n"
            "entry Model: 'model' name=ID;\n",
            is_entry=True,
        )
        cls.File._create_grammar_text(
            cls.dsl,
            "shared/Terminals.langium",
            "hidden terminal WS: /\\s+/;\n"
            "terminal ID: /[_a-zA-Z][\\w_]*/;\n",
            is_entry=False,
        )
        cls.services_compiled = "export default function () { return {}; }\n"
        cls.services_digest = hashlib.sha256(
            cls.services_compiled.encode("utf-8")
        ).hexdigest()
        cls.dsl.write({
            "services_compiled": cls.services_compiled,
            "services_compiled_digest": cls.services_digest,
        })
        cls.plain_dsl = cls.env["itlingo.dsl"].create({
            "name": "ITOI grammar without custom services",
            "acronym": "ITOINOSERVICES",
            "version": "test-1",
            "status": "draft",
            "file_extensions": ".ins",
        })
        cls.File._create_grammar_text(
            cls.plain_dsl,
            "Main.langium",
            "grammar ITOINOSERVICES\nentry Model: 'model';\n",
            is_entry=True,
        )
        cls.broken_dsl = cls.env["itlingo.dsl"].create({
            "name": "ITOI broken grammar",
            "acronym": "ITOIBROKEN",
            "version": "test-1",
            "status": "draft",
        })
        cls.File._create_grammar_text(
            cls.broken_dsl,
            "Main.langium",
            "grammar ITOIBROKEN\nimport './Missing'\nentry Model: 'model';\n",
            is_entry=True,
        )
        cls.settings = (
            cls.env["itlingo.integration.settings"].sudo()._get_settings()
        )
        cls.settings.write({"encryption_key": "test-key-for-itoi-boundary-00001"})
        cls.organization = cls.env["itlingo.organization"].create({
            "name": "ITOI DSL source test organization",
        })
        cls.workspace = cls.env["itlingo.workspace"].create({
            "name": "ITOI DSL source test workspace",
            "organization_id": cls.organization.id,
        })
        cls.env["itlingo.project.role"].create({
            "user_id": cls.env.user.id,
            "project_id": cls.workspace.id,
            "role": "ws_member",
            "state": "accepted",
        })
        doc_type = cls.env.ref("itlingo_documents.doc_type_specification")
        cls.workspace_source = cls.env["itlingo.document"].create({
            "name": "Billing ASL",
            "document_type_id": doc_type.id,
            "organization_id": cls.organization.id,
            "project_id": cls.workspace.id,
            "dsl_id": cls.dsl.id,
            "file_name": "billing.imf",
            "document_file": base64.b64encode(
                b"Package p_Billing System Billing"
            ),
        })
        cls.organization_source = cls.env["itlingo.document"].create({
            "name": "Shared ASL",
            "document_type_id": doc_type.id,
            "organization_id": cls.organization.id,
            "dsl_id": cls.dsl.id,
            "file_name": "shared.imf",
            "document_file": base64.b64encode(
                b"Package p_Shared System Shared"
            ),
        })
        foreign_org = cls.env["itlingo.organization"].create({
            "name": "Foreign DSL source organization",
        })
        cls.foreign_source = cls.env["itlingo.document"].create({
            "name": "Foreign ASL",
            "document_type_id": doc_type.id,
            "organization_id": foreign_org.id,
            "dsl_id": cls.dsl.id,
            "file_name": "foreign.imf",
            "document_file": base64.b64encode(
                b"Package p_Foreign System Foreign"
            ),
        })

    def _authorization_headers(self, payload=None):
        iv, ciphertext = self.settings._aes_encrypt(json.dumps(
            payload or {"user": "itoi-boundary-test"}
        ))
        return {"Authorization": "Bearer %s:%s" % (iv, ciphertext)}

    def test_get_dsls_emits_flattened_grammar_and_matching_digest(self):
        response = self.url_open(
            "/token_api/get-dsls", headers=self._authorization_headers(),
        )

        self.assertEqual(response.status_code, 200)
        payload = json.loads(response.text)
        result = next(
            item for item in payload["dsls"] if item["acronym"] == "ITOIMF"
        )
        expected = self.dsl._flattened_grammar_text()
        self.assertEqual(result["grammar"], expected)
        self.assertNotIn("import './shared/Terminals'", result["grammar"])
        self.assertIn("terminal ID", result["grammar"])
        self.assertEqual(
            result["digest"], hashlib.sha256(expected.encode("utf-8")).hexdigest(),
        )
        self.assertEqual(result["services"], self.services_compiled)
        self.assertEqual(result["services_digest"], self.services_digest)
        self.assertEqual(result["id"], self.dsl.id)

        plain_result = next(
            item
            for item in payload["dsls"]
            if item["acronym"] == "ITOINOSERVICES"
        )
        self.assertEqual(plain_result["services"], "")
        self.assertEqual(plain_result["services_digest"], "")
        self.assertNotIn(
            "ITOIBROKEN", {item["acronym"] for item in payload["dsls"]},
        )

    def test_get_dsl_sources_is_limited_to_launch_workspace_and_organization(self):
        response = self.url_open(
            "/token_api/get-dsl-sources/%s" % self.dsl.id,
            headers=self._authorization_headers({
                "user": self.env.user.login,
                "wsid": self.workspace.id,
            }),
        )

        self.assertEqual(response.status_code, 200)
        payload = json.loads(response.text)
        source_ids = {item["id"] for item in payload["sources"]}
        self.assertEqual(source_ids, {
            self.workspace_source.id,
            self.organization_source.id,
        })
        self.assertNotIn(self.foreign_source.id, source_ids)
        billing = next(
            item for item in payload["sources"]
            if item["id"] == self.workspace_source.id
        )
        self.assertEqual(
            billing["content"], "Package p_Billing System Billing",
        )
        self.assertEqual(billing["packages"], ["p_Billing"])
        self.assertEqual(payload["conflicting_packages"], [])
