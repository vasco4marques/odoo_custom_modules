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

    def _authorization_headers(self):
        iv, ciphertext = self.settings._aes_encrypt(json.dumps({
            "user": "itoi-boundary-test",
        }))
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
