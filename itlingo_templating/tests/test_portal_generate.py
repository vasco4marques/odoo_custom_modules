import base64
import json
import re

from odoo.tests import HttpCase, tagged
from odoo.tests.common import new_test_user

from odoo.addons.itlingo_templating.controllers.portal_generate import (
    ItlingoTemplatingPortal,
)
from odoo.addons.itlingo_templating.services.text_renderer import render_text


SOURCE_GRAMMAR = r"""
grammar TemplateSource
entry Specification:
    'specification' name=ID requirements+=Requirement*;
Requirement:
    'requirement' name=ID;
hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
"""


@tagged("post_install", "-at_install")
class TestPortalGenerate(HttpCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.portal_user = new_test_user(
            cls.env,
            login="template_portal",
            groups="base.group_portal",
        )
        cls.organization = cls.env["itlingo.organization"].create({
            "name": "Template Portal Test",
        })
        cls.env["itlingo.organization.role"].create({
            "user_id": cls.portal_user.id,
            "organization_id": cls.organization.id,
            "role": "org_manager",
            "state": "accepted",
        })
        cls.dsl = cls.env["itlingo.dsl"].create({
            "name": "Template Source Language",
            "acronym": "TSL",
            "version": "test-1.0",
            "status": "draft",
            "file_extensions": ".tsl",
            "template_profile": json.dumps({
                "bucket_aliases": {"Requirement": "requirements"},
            }),
        })
        cls.env["itlingo.dsl.file"]._create_grammar_text(
            cls.dsl, "TSL.langium", SOURCE_GRAMMAR,
        )
        cls.dsl.action_publish()
        cls.document = cls.env["itlingo.document"].create({
            "name": "Requirements report",
            "organization_id": cls.organization.id,
            "document_type_id": cls.env.ref(
                "itlingo_documents.doc_type_template"
            ).id,
            "dsl_id": cls.dsl.id,
            "document_file": base64.b64encode(b"{{ specification.name }}"),
            "file_name": "requirements.txt",
            "status": "published",
            "creator_id": cls.portal_user.id,
        })
        cls.detail_url = (
            f"/my/organizations/{cls.organization.id}/documents/{cls.document.id}"
        )
        cls.workspace = cls.env["itlingo.workspace"].create({
            "name": "Template Workspace Test",
            "organization_id": cls.organization.id,
        })
        cls.env["itlingo.project.role"].create({
            "user_id": cls.portal_user.id,
            "project_id": cls.workspace.id,
            "role": "ws_manager",
            "state": "accepted",
        })
        cls.workspace_document = cls.env["itlingo.document"].create({
            "name": "Workspace report",
            "project_id": cls.workspace.id,
            "document_type_id": cls.env.ref(
                "itlingo_documents.doc_type_template"
            ).id,
            "dsl_id": cls.dsl.id,
            "document_file": base64.b64encode(b"{{ specification.name }}"),
            "file_name": "workspace-report.txt",
            "status": "published",
            "creator_id": cls.portal_user.id,
        })
        cls.workspace_detail_url = (
            f"/my/workspaces/{cls.workspace.id}/documents/"
            f"{cls.workspace_document.id}"
        )

    def setUp(self):
        super().setUp()
        self.authenticate("template_portal", "template_portal")

    def test_template_detail_embeds_generation_form(self):
        response = self.url_open(self.detail_url)

        self.assertEqual(response.status_code, 200)
        self.assertIn("Generate a document", response.text)
        self.assertIn("Generate and download", response.text)
        self.assertIn("Template information", response.text)
        self.assertIn("Check template", response.text)
        self.assertIn(".tsl", response.text)
        self.assertIn(
            f"/dsl/{self.document.dsl_id.id}/template-reference",
            response.text,
        )

    def test_generation_error_stays_in_document_detail(self):
        detail_response = self.url_open(self.detail_url)
        csrf_token = re.search(
            r'name="csrf_token" value="([^"]+)"', detail_response.text,
        ).group(1)

        response = self.url_open(
            self.detail_url + "/generate",
            data={"csrf_token": csrf_token},
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("Please upload a TSL specification file.", response.text)
        self.assertIn("Template information", response.text)
        self.assertIn("Documents", response.text)

    def test_legacy_generate_get_redirects_to_detail(self):
        response = self.url_open(
            self.detail_url + "/generate", allow_redirects=False,
        )

        self.assertEqual(response.status_code, 303)
        self.assertEqual(response.headers["Location"], self.detail_url + "#generate")

    def test_workspace_generation_error_uses_workspace_detail(self):
        detail_response = self.url_open(self.workspace_detail_url)
        csrf_token = re.search(
            r'name="csrf_token" value="([^"]+)"', detail_response.text,
        ).group(1)

        response = self.url_open(
            self.workspace_detail_url + "/generate",
            data={"csrf_token": csrf_token},
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("Please upload a TSL specification file.", response.text)
        self.assertIn("Template Workspace Test", response.text)
        self.assertIn("Workspace report", response.text)

    def test_template_check_renders_advisory_findings_without_spec(self):
        self.document.document_file = base64.b64encode(
            b"{% for requirement in requirements %}"
            b"{{ requirement.titel|lenght }}{% endfor %}"
        )
        detail_response = self.url_open(self.detail_url)
        csrf_token = re.search(
            r'name="csrf_token" value="([^"]+)"', detail_response.text,
        ).group(1)

        response = self.url_open(
            self.detail_url + "/check", data={"csrf_token": csrf_token},
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("Advisory template finding", response.text)
        self.assertIn("titel", response.text)
        self.assertIn("title", response.text)
        self.assertIn("Unknown Jinja filter `lenght`", response.text)
        self.assertLess(
            response.text.index('data-category="filter"'),
            response.text.index('data-category="dsl"'),
        )
        self.assertIn("Generate and download", response.text)

    def test_record_profile_alias_and_acronym_render_in_context(self):
        context = ItlingoTemplatingPortal._build_context(self.dsl, {
            "$type": "Specification",
            "name": "demo",
            "requirements": [{"$type": "Requirement", "name": "first"}],
        })

        output = render_text(
            b"{{ dsl }}:{% for item in requirements %}{{ item.id }}{% endfor %}",
            context,
        )

        self.assertEqual(output, b"TSL:first")
