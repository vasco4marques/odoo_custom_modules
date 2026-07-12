from odoo.tests.common import BaseCase, tagged

from odoo.addons.itlingo_templating.services.starter_template import (
    MAX_FIELDS_PER_TYPE,
    MAX_TYPES,
    build_starter_template,
)


@tagged("post_install", "-at_install")
class TestStarterTemplate(BaseCase):

    def test_uses_aliases_and_formats_scalar_and_relationship_fields(self):
        starter = build_starter_template({
            "root_alias": "catalog",
            "profile_aliases": [{
                "type_name": "Requirement", "alias": "requirements",
            }],
            "types": [{
                "name": "Requirement",
                "indexed": True,
                "properties": [
                    {"name": "priority", "kind": "primitive"},
                    {"name": "owner", "kind": "reference"},
                    {"name": "children", "kind": "containment", "list": True},
                ],
            }, {
                "name": "Embedded", "indexed": False, "properties": [],
            }],
        }, "RDL")

        self.assertIn("# {{ catalog.title }}", starter)
        self.assertIn("{% for item in requirements %}", starter)
        self.assertIn("{{ item.priority }}", starter)
        self.assertIn("{{ item.owner.title }}", starter)
        self.assertIn("item.children | map(attribute='title')", starter)
        self.assertNotIn("## Embedded", starter)

    def test_caps_types_and_fields(self):
        reference = {"types": [{
            "name": "Type%s" % type_index,
            "indexed": True,
            "properties": [
                {"name": "field%s" % field_index, "kind": "primitive"}
                for field_index in range(MAX_FIELDS_PER_TYPE + 2)
            ],
        } for type_index in range(MAX_TYPES + 2)]}
        starter = build_starter_template(reference)

        self.assertIn("## Type%s" % (MAX_TYPES - 1), starter)
        self.assertNotIn("## Type%s" % MAX_TYPES, starter)
        self.assertIn("field%s" % (MAX_FIELDS_PER_TYPE - 1), starter)
        self.assertNotIn("field%s" % MAX_FIELDS_PER_TYPE, starter)
