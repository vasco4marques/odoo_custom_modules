import unittest

from odoo.addons.itlingo_templating.services.canonical_model import (
    ASL_PROFILE,
    RSL_PROFILE,
    build_generic_model,
)


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

    def test_rsl_profile_preserves_friendly_project_and_bucket_keys(self):
        ast = {"$type": "Model", "packages": [{
            "$type": "PackageSystem", "name": "pkg", "system": {
                "$type": "System", "name": "SYS", "nameAlias": "My System",
                "systemConcepts": [{"$type": "FR", "name": "fr_one"}],
            },
        }]}

        model = build_generic_model(ast, RSL_PROFILE)

        self.assertEqual(model["project"].code, "SYS")
        self.assertEqual(model["project"].name, "My System")
        self.assertEqual(model["functional_requirements"][0].id, "fr_one")
        self.assertEqual(model["other"], [])

    def test_asl_profile_indexes_nested_concepts_and_qualified_ids(self):
        ast = {"$type": "Model", "packages": [{
            "$type": "PackageSystem", "name": "pkg", "system": {
                "$type": "System", "name": "APP", "systemConcepts": [{
                    "$type": "DataEntity", "name": "Customer", "attributes": [
                        {"$type": "DataAttribute", "name": "email"},
                    ],
                }],
            },
        }]}

        model = build_generic_model(ast, ASL_PROFILE)

        self.assertEqual(model["system"].id, "APP")
        self.assertEqual(model["data_attributes"][0].id, "email")
        self.assertIs(model["by_id"]["Customer.email"], model["by_id"]["email"])
