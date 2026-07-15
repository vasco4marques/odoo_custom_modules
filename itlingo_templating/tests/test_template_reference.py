import json
from unittest.mock import patch

from odoo.tests import TransactionCase, tagged

from odoo.addons.itlingo_dsl.services import grammar_describe


GRAMMAR = r"""
grammar CacheTest
entry Model: items+=Item*;
Item: 'item' name=ID;
hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
"""

MULTI_FILE_ENTRY = (
    "grammar MultiFile\n"
    "import './common/terms';\n"
    "entry Model: items+=Item*;\n"
    "Item: 'item' name=ID;\n"
)
MULTI_FILE_TERMS = (
    "hidden terminal WS: /\\s+/;\n"
    "terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;\n"
)


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

    def _multi_file_dsl(self):
        dsl = self.env["itlingo.dsl"].create({
            "name": "Template Reference Multi-file Test",
            "acronym": "TRMF",
            "version": "test-1.0",
            "status": "draft",
        })
        files = self.env["itlingo.dsl.file"]
        files._create_grammar_text(
            dsl, "Main.langium", MULTI_FILE_ENTRY, is_entry=True,
        )
        files._create_grammar_text(
            dsl, "common/terms.langium", MULTI_FILE_TERMS, is_entry=False,
        )
        return dsl

    def test_multi_file_grammar_is_described_from_flattened_text(self):
        dsl = self._multi_file_dsl()
        with patch.object(
            grammar_describe, "describe_grammar_text", return_value=inventory(),
        ) as describe:
            dsl._template_reference()

        described_text = describe.call_args.args[1]
        self.assertEqual(described_text, dsl._flattened_grammar_text())
        self.assertNotIn("import", described_text)
        self.assertIn("terminal ID", described_text)

    def test_multi_file_grammar_inventory_succeeds_with_real_describer(self):
        # Regression: raw entry text used to reach the describer, whose temp
        # file location broke relative imports (ENOENT /tmp/<name>.langium).
        dsl = self._multi_file_dsl()

        try:
            reference = dsl._template_reference(refresh=True)
        except grammar_describe.GrammarDescribeUnavailable as err:
            self.skipTest(str(err))

        self.assertTrue(reference["success"], reference.get("message"))
        self.assertEqual(reference["entry_type"], "Model")
        self.assertIn("Item", [item["name"] for item in reference["types"]])

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

    def test_module_does_not_seed_language_records(self):
        self.assertFalse(self.env.ref(
            "itlingo_dsl.dsl_rsl_1_0", raise_if_not_found=False,
        ))
        self.assertFalse(self.env.ref(
            "itlingo_dsl.dsl_asl_1_0", raise_if_not_found=False,
        ))
