import unittest

from odoo.addons.itlingo_templating.services.canonical_model import (
    build_generic_model,
)


PROJECT_PROFILE = {
    "bucket_aliases": {"Requirement": "requirements"},
    "root_path": "packages.0.project",
    "root_alias": "project",
    "root_fields": {"code": ["name"], "name": ["label", "name"]},
    "ignored_types": ["Package", "Project"],
    "other_alias": "other",
}

NESTED_PROFILE = {
    "bucket_aliases": {"Attribute": "attributes"},
    "root_path": "packages.0.project",
    "root_alias": "project",
    "qualified_parent_types": ["Entity"],
}


class TestGenericCanonicalModel(unittest.TestCase):

    def test_indexes_named_nodes_by_type_and_resolves_references(self):
        ast = {
            "$type": "Catalog",
            "name": "demo",
            "items": [
                {"$type": "Person", "name": "ana", "label": "Ana"},
                {"$type": "Task", "name": "review", "owner": {"$ref": "ana"}},
            ],
        }

        model = build_generic_model(ast, {
            "bucket_aliases": {"Task": "tasks"},
            "title_fields": {"Person": "label"},
        })

        self.assertEqual(model["root"].id, "demo")
        self.assertEqual([item.id for item in model["by_type"]["Task"]], ["review"])
        self.assertIs(model["by_id"]["review"].owner, model["by_id"]["ana"])
        self.assertEqual(str(model["by_id"]["ana"]), "Ana")
        self.assertIs(model["tasks"], model["by_type"]["Task"])

    def test_profile_adds_friendly_project_and_bucket_keys(self):
        ast = {"$type": "Model", "packages": [{
            "$type": "Package", "name": "pkg", "project": {
                "$type": "Project", "name": "PRJ", "label": "My Project",
                "items": [{"$type": "Requirement", "name": "req_one"}],
            },
        }]}

        model = build_generic_model(ast, PROJECT_PROFILE)

        self.assertEqual(model["project"].code, "PRJ")
        self.assertEqual(model["project"].name, "My Project")
        self.assertEqual(model["requirements"][0].id, "req_one")
        self.assertEqual(model["other"], [])

    def test_profile_indexes_nested_concepts_and_qualified_ids(self):
        ast = {"$type": "Model", "packages": [{
            "$type": "Package", "name": "pkg", "project": {
                "$type": "Project", "name": "APP", "items": [{
                    "$type": "Entity", "name": "Customer", "attributes": [
                        {"$type": "Attribute", "name": "email"},
                    ],
                }],
            },
        }]}

        model = build_generic_model(ast, NESTED_PROFILE)

        self.assertEqual(model["project"].id, "APP")
        self.assertEqual(model["attributes"][0].id, "email")
        self.assertIs(model["by_id"]["Customer.email"], model["by_id"]["email"])
