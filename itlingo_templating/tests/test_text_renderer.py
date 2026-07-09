import unittest

from odoo.addons.itlingo_templating.services.rendering import render_filename
from odoo.addons.itlingo_templating.services.text_renderer import render_text


class TestTextRenderer(unittest.TestCase):

    def test_renders_utf8_jinja_template(self):
        output = render_text(
            "# {{ project.name }}\n{{ missing.value }}\n".encode("utf-8"),
            {"project": {"name": "Caf\u00e9"}},
        )

        self.assertEqual(output.decode("utf-8"), "# Caf\u00e9\n\n")

    def test_rejects_non_utf8_template_bytes(self):
        with self.assertRaises(UnicodeDecodeError):
            render_text(b"\xff\xfe", {})

    def test_filename_replaces_any_supported_template_extension(self):
        filename = render_filename("output.docx", {}, "generated", ".json")

        self.assertEqual(filename, "output.json")
