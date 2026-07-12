import json
from unittest.mock import patch

from odoo.tests import TransactionCase, tagged

from odoo.addons.itlingo_dsl.services import grammar_describe
from odoo.addons.itlingo_templating.services import template_reference


GRAMMAR = r"""
grammar CacheTest
entry Model: items+=Item*;
Item: 'item' name=ID;
hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
"""


def inventory(type_name="Item"):
    return {
        "success": True,
        "schema_version": "1.1",
        "entry_type": "Model",
        "types": [{
            "name": type_name,
            "indexed": True,
            "abstract": False,
            "super_types": [],
            "properties": [{
                "name": "name",
                "kind": "primitive",
                "type": "string",
                "list": False,
                "optional": False,
            }],
        }],
        "unions": [],
        "describer_version": "langium 4.3.1 / describer 1.1.0",
    }


@tagged("post_install", "-at_install")
class TestTemplateReference(TransactionCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.dsl = cls.env["itlingo.dsl"].create({
            "name": "Template Reference Cache Test",
            "acronym": "TRCT",
            "version": "test-1.0",
            "status": "draft",
        })
        cls.grammar = cls.env["itlingo.dsl.file"]._create_grammar_text(
            cls.dsl, "TRCT.langium", GRAMMAR,
        )

    def setUp(self):
        super().setUp()
        template_reference.clear_builtin_reference_cache()

    def test_custom_inventory_is_cached_until_grammar_changes(self):
        with patch.object(
            grammar_describe, "describe_grammar_text", return_value=inventory(),
        ) as describe:
            first = self.dsl._template_reference()
            second = self.dsl._template_reference()

            self.assertEqual(first, second)
            self.assertEqual(describe.call_count, 1)
            self.assertEqual(
                self.dsl.template_reference_digest,
                "1.1:%s" % self.dsl._grammar_digest(),
            )

            self.grammar._write_text_utf8(GRAMMAR.replace("'item'", "'entry'"))
            third = self.dsl._template_reference()

            self.assertTrue(third["success"])
            self.assertEqual(describe.call_count, 2)
            self.assertEqual(
                self.dsl.template_reference_digest,
                "1.1:%s" % self.dsl._grammar_digest(),
            )

    def test_custom_cache_invalidates_when_schema_version_changes(self):
        old_digest = "1.0:%s" % self.dsl._grammar_digest()
        self.dsl.write({
            "template_reference_json": json.dumps(inventory()),
            "template_reference_digest": old_digest,
        })
        with patch.object(
            grammar_describe, "describe_grammar_text", return_value=inventory(),
        ) as describe:
            self.dsl._template_reference()

        describe.assert_called_once()
        self.assertEqual(
            self.dsl.template_reference_digest,
            "1.1:%s" % self.dsl._grammar_digest(),
        )

    def test_infrastructure_failure_returns_degraded_context(self):
        with patch.object(
            grammar_describe,
            "describe_grammar_text",
            side_effect=grammar_describe.GrammarDescribeUnavailable(
                "Node is unavailable"
            ),
        ):
            context = self.dsl._template_reference_context(refresh=True)

        self.assertFalse(context["success"])
        self.assertTrue(context["unavailable"])
        self.assertIn("temporarily unavailable", context["message"])
        self.assertIn("profile", context)

    def test_builtin_rsl_asl_inventory_and_static_collections_are_cached(self):
        with patch.object(
            grammar_describe, "describe_grammar_file", return_value=inventory(),
        ) as describe:
            references = {}
            for key, xml_id in (
                ("RSL", "itlingo_dsl.dsl_rsl_1_0"),
                ("ASL", "itlingo_dsl.dsl_asl_1_0"),
            ):
                dsl = self.env.ref(xml_id)
                references[key] = dsl._template_reference()
                dsl._template_reference()

        self.assertEqual(describe.call_count, 2)
        self.assertEqual(references["RSL"]["types"][0]["name"], "Item")
        self.assertEqual(references["ASL"]["types"][0]["name"], "Item")
        rsl_names = {
            item["name"] for item in references["RSL"]["compatibility_collections"]
        }
        asl_names = {
            item["name"] for item in references["ASL"]["compatibility_collections"]
        }
        self.assertIn("functional_requirements", rsl_names)
        self.assertIn("system_concepts", asl_names)
        self.assertIn("ui_events", asl_names)

    def test_profile_is_merged_at_render_time_without_redescribe(self):
        self.dsl.template_profile = json.dumps({
            "bucket_aliases": {"Item": "things"},
            "root_alias": "catalog",
            "title_fields": {"Item": ["label"]},
        })
        with patch.object(
            grammar_describe, "describe_grammar_text", return_value=inventory(),
        ) as describe:
            first = self.dsl._template_reference_context(refresh=True)
            self.dsl.template_profile = json.dumps({
                "bucket_aliases": {"Item": "entries"},
                "root_alias": "directory",
                "title_fields": {"Item": ["display_name"]},
            })
            second = self.dsl._template_reference_context()

        self.assertEqual(describe.call_count, 1)
        self.assertEqual(first["profile_aliases"], [{
            "alias": "things", "type_name": "Item",
        }])
        self.assertEqual(second["profile_aliases"], [{
            "alias": "entries", "type_name": "Item",
        }])
        self.assertEqual(second["root_alias"], "directory")
        self.assertEqual(second["title_fields"], {"Item": ["display_name"]})

    def test_builtin_cache_invalidates_when_grammar_tree_digest_changes(self):
        rsl = self.env.ref("itlingo_dsl.dsl_rsl_1_0")
        with patch.object(
            template_reference,
            "_grammar_tree_digest",
            side_effect=["digest-a", "digest-a", "digest-b"],
        ), patch.object(
            grammar_describe, "describe_grammar_file", return_value=inventory(),
        ) as describe:
            rsl._template_reference()
            rsl._template_reference()
            rsl._template_reference()

        self.assertEqual(describe.call_count, 2)

    def test_builtin_cache_invalidates_when_schema_version_changes(self):
        rsl = self.env.ref("itlingo_dsl.dsl_rsl_1_0")
        with patch.object(
            template_reference, "_grammar_tree_digest", return_value="digest-a",
        ), patch.object(
            grammar_describe, "describe_grammar_file", return_value=inventory(),
        ) as describe:
            with patch.object(grammar_describe, "SCHEMA_VERSION", "1.0"):
                rsl._template_reference()
            with patch.object(grammar_describe, "SCHEMA_VERSION", "1.1"):
                rsl._template_reference()

        self.assertEqual(describe.call_count, 2)

    def test_actual_bundled_grammars_produce_type_inventories(self):
        for key, xml_id in (
            ("RSL", "itlingo_dsl.dsl_rsl_1_0"),
            ("ASL", "itlingo_dsl.dsl_asl_1_0"),
        ):
            reference = self.env.ref(xml_id)._template_reference(refresh=True)

            self.assertTrue(reference["success"], key)
            self.assertEqual(reference["entry_type"], "Model")
            self.assertTrue(reference["types"])
            self.assertTrue(reference["compatibility_collections"])
