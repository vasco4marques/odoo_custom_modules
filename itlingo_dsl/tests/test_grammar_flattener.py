import hashlib
import json
from unittest.mock import patch

from odoo.exceptions import UserError, ValidationError
from odoo.tests import TransactionCase, tagged

from ..models.itlingo_dsl_file import (
    GRAMMAR_PATH_MAX_DEPTH,
    GRAMMAR_PATH_MAX_LENGTH,
)
from ..services.grammar_flattener import GrammarFlattenError, flatten_grammar


ENTRY_TEXT = "grammar Multi\nimport './common/Terms';\nentry Model: name=ID;\n"
TERMINALS_TEXT = "terminal ID: /[a-z]+/;\n"


@tagged("post_install", "-at_install")
class TestGrammarFlattener(TransactionCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.File = cls.env["itlingo.dsl.file"]

    def _dsl(self, acronym="MFLAT"):
        return self.env["itlingo.dsl"].create({
            "name": "Multi-file grammar",
            "acronym": acronym,
            "version": "test-1",
            "status": "draft",
        })

    def test_path_normalization_accepts_nested_posix_path(self):
        self.assertEqual(
            self.File._normalize_grammar_path("  common/Terms.langium  "),
            "common/Terms.langium",
        )

    def test_path_normalization_rejects_unsafe_and_oversized_paths(self):
        invalid_paths = [
            "", "\x00.langium", "folder\\Terms.langium", "/root.langium",
            "folder//Terms.langium", "./Terms.langium", "../Terms.langium",
            "folder/../Terms.langium", "Terms.txt",
            "a" * (GRAMMAR_PATH_MAX_LENGTH + 1) + ".langium",
            "/".join(["a"] * GRAMMAR_PATH_MAX_DEPTH + ["Terms.langium"]),
        ]
        for path in invalid_paths:
            with self.subTest(path=path), self.assertRaises(ValidationError):
                self.File._normalize_grammar_path(path)

    def test_single_file_flattening_is_byte_for_byte_identity(self):
        source = "grammar Solo\r\nentry Model: name=ID;\r\n"
        text, reached, unreachable = flatten_grammar(
            {"Solo.langium": source}, "Solo.langium",
        )
        self.assertEqual(text, source)
        self.assertEqual(reached, {"Solo.langium"})
        self.assertEqual(unreachable, set())

    def test_nested_imports_and_unreachable_files(self):
        files = {
            "main.langium": "grammar Main\nimport './shared/Middle'\nentry Model: ID;",
            "shared/Middle.langium": "import './deep/Terms.langium';\nMiddle: ID;",
            "shared/deep/Terms.langium": TERMINALS_TEXT,
            "unused.langium": "Unused: 'unused';",
        }
        text, reached, unreachable = flatten_grammar(files, "main.langium")
        self.assertNotIn("import ", text)
        self.assertIn("Middle: ID;", text)
        self.assertIn("terminal ID", text)
        self.assertEqual(reached, set(files) - {"unused.langium"})
        self.assertEqual(unreachable, {"unused.langium"})

    def test_diamond_import_is_deduplicated(self):
        files = {
            "main.langium": "import 'left'\nimport 'right'\nMain: Shared;",
            "left.langium": "import 'shared'\nLeft: Shared;",
            "right.langium": "import 'shared'\nRight: Shared;",
            "shared.langium": "Shared: 'shared';",
        }
        text, reached, unreachable = flatten_grammar(files, "main.langium")
        self.assertEqual(text.count("Shared: 'shared';"), 1)
        self.assertEqual(reached, set(files))
        self.assertFalse(unreachable)

    def test_structural_errors_have_stable_codes(self):
        cases = [
            ({"main.langium": "Main: 'main';"}, None, "no-entry"),
            ({"main.langium": "import 'missing'"}, "main.langium", "missing-import"),
            ({
                "a.langium": "import 'b'",
                "b.langium": "import 'a'",
            }, "a.langium", "cycle"),
        ]
        for files, entry, code in cases:
            with self.subTest(code=code), self.assertRaises(GrammarFlattenError) as raised:
                flatten_grammar(files, entry)
            self.assertEqual(raised.exception.code, code)

    def test_multiple_files_require_unique_paths_and_one_entry(self):
        dsl = self._dsl("MFINV")
        entry = self.File._create_grammar_text(
            dsl, "Main.langium", ENTRY_TEXT, is_entry=True,
        )
        supporting = self.File._create_grammar_text(
            dsl, "common/Terms.langium", TERMINALS_TEXT, is_entry=False,
        )
        self.assertEqual(dsl._grammar_file(), entry)
        self.assertEqual(
            dsl._grammar_files().mapped("relative_path"),
            ["Main.langium", "common/Terms.langium"],
        )

        with self.assertRaisesRegex(ValidationError, "unique"), self.cr.savepoint():
            self.File._create_grammar_text(
                dsl, "COMMON/terms.langium", TERMINALS_TEXT, is_entry=False,
            )
        with self.assertRaisesRegex(ValidationError, "exactly one"), self.cr.savepoint():
            supporting.is_entry = True

    def test_draft_copy_preserves_workspace_metadata(self):
        dsl = self._dsl("MFCOPY")
        self.File._create_grammar_text(
            dsl, "z/Main.langium", "grammar Copy\nentry Model: 'copy';\n",
            is_entry=True,
        )
        self.File._create_grammar_text(
            dsl, "a/Terms.langium", TERMINALS_TEXT, is_entry=False,
        )
        draft = dsl.action_create_draft_version()
        self.assertEqual(
            [(item.relative_path, item.is_entry) for item in draft._grammar_files()],
            [(item.relative_path, item.is_entry) for item in dsl._grammar_files()],
        )

    def test_flattened_digest_tracks_reachable_file_edits(self):
        dsl = self._dsl("MFDIG")
        self.File._create_grammar_text(
            dsl, "Main.langium", ENTRY_TEXT, is_entry=True,
        )
        terms = self.File._create_grammar_text(
            dsl, "common/Terms.langium", TERMINALS_TEXT, is_entry=False,
        )
        flattened = dsl._flattened_grammar_text()
        self.assertEqual(
            dsl._grammar_digest(), hashlib.sha256(flattened.encode()).hexdigest(),
        )
        validator_result = {
            "valid": True,
            "diagnostics": [],
            "validator_version": "test-validator",
        }
        with patch(
            "odoo.addons.itlingo_dsl.services.grammar_validator.validate_grammar_text",
            return_value=validator_result,
        ):
            dsl._run_grammar_validation()
        self.assertTrue(dsl.grammar_validation_is_current)
        terms._write_text_utf8(TERMINALS_TEXT + "// changed\n")
        self.assertFalse(dsl.grammar_validation_is_current)

    def test_validation_warns_for_each_unreachable_file(self):
        dsl = self._dsl("MFWARN")
        self.File._create_grammar_text(
            dsl, "Main.langium", "grammar Warn\nentry Model: 'ok';\n", is_entry=True,
        )
        self.File._create_grammar_text(
            dsl, "unused.langium", "Unused: 'unused';\n", is_entry=False,
        )
        with patch(
            "odoo.addons.itlingo_dsl.services.grammar_validator.validate_grammar_text",
            return_value={
                "valid": True, "diagnostics": [], "validator_version": "test",
            },
        ):
            result = dsl._run_grammar_validation()
        warnings = [
            diagnostic for diagnostic in result["diagnostics"]
            if diagnostic.get("code") == "unreachable-grammar-file"
        ]
        self.assertEqual(len(warnings), 1)
        self.assertIn("unused.langium", warnings[0]["message"])
        self.assertEqual(
            json.loads(dsl.grammar_validation_diagnostics), result["diagnostics"],
        )

    def test_flatten_failure_stales_digest_and_blocks_publish(self):
        dsl = self._dsl("MFBLOCK")
        self.File._create_grammar_text(
            dsl, "Main.langium", "grammar Broken\nimport 'missing'\n", is_entry=True,
        )
        self.assertFalse(dsl._grammar_digest())
        with self.assertRaisesRegex(UserError, "missing-import"):
            dsl.action_publish()
        self.assertEqual(dsl.status, "draft")
