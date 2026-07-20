import base64

from odoo.exceptions import ValidationError
from odoo.tests import TransactionCase, tagged


@tagged("post_install", "-at_install")
class TestUnifiedTemplateModel(TransactionCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.template_type = cls.env.ref(
            "itlingo_documents.doc_type_template"
        )
        cls.dsl = cls.env["itlingo.dsl"].create({
            "name": "Unified Template Test DSL",
            "acronym": "UTT",
            "version": "test-1",
            "status": "draft",
            "file_extensions": ".utt",
        })

    def test_template_type_uses_unified_code(self):
        self.assertEqual(self.template_type.name, "Template")
        self.assertEqual(self.template_type.type_code, "template")

    def test_template_requires_a_dsl(self):
        with self.assertRaisesRegex(ValidationError, "exactly one DSL"):
            self.env["itlingo.document"].create({
                "name": "Missing DSL",
                "document_type_id": self.template_type.id,
            })

    def test_template_rejects_unsupported_file_format(self):
        with self.assertRaisesRegex(ValidationError, "format is not supported"):
            self.env["itlingo.document"].create({
                "name": "Unsupported Template",
                "document_type_id": self.template_type.id,
                "dsl_id": self.dsl.id,
                "file_name": "template.pdf",
                "document_file": base64.b64encode(b"not a template"),
            })

    def test_template_accepts_supported_file_format(self):
        document = self.env["itlingo.document"].create({
            "name": "Supported Template",
            "document_type_id": self.template_type.id,
            "dsl_id": self.dsl.id,
            "file_name": "template.md",
            "document_file": base64.b64encode(b"# {{ specification.name }}"),
        })

        self.assertTrue(document.is_template)
