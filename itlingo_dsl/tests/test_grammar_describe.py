import subprocess
from unittest.mock import patch

from odoo.tests import TransactionCase, tagged

from ..services import grammar_describe


VALID_GRAMMAR = r"""
grammar DescribeTest
entry Model: items+=Item*;
Item: 'item' name=ID;
hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
"""


@tagged("post_install", "-at_install")
class TestGrammarDescribeService(TransactionCase):

    def test_describes_valid_grammar_text(self):
        result = grammar_describe.describe_grammar_text(self.env, VALID_GRAMMAR)

        self.assertTrue(result["success"])
        self.assertEqual(result["schema_version"], "1.0")
        self.assertEqual(result["entry_type"], "Model")
        item = next(item for item in result["types"] if item["name"] == "Item")
        self.assertTrue(item["indexed"])

    def test_invalid_grammar_is_a_structured_result(self):
        result = grammar_describe.describe_grammar_text(
            self.env, "grammar Broken\nentry Model: values+=Missing*;",
        )

        self.assertFalse(result["success"])
        self.assertIn("Invalid grammar", result["message"])

    def test_timeout_is_infrastructure_failure(self):
        with patch.object(
            grammar_describe.subprocess,
            "run",
            side_effect=subprocess.TimeoutExpired("node", 30),
        ):
            with self.assertRaisesRegex(
                grammar_describe.GrammarDescribeUnavailable, "timed out",
            ):
                grammar_describe.describe_grammar_text(self.env, VALID_GRAMMAR)

    def test_malformed_output_never_becomes_empty_inventory(self):
        completed = subprocess.CompletedProcess(
            args=["node"], returncode=0, stdout=b"not-json", stderr=b"",
        )
        with patch.object(
            grammar_describe.subprocess, "run", return_value=completed,
        ):
            with self.assertRaisesRegex(
                grammar_describe.GrammarDescribeUnavailable,
                "unexpected response",
            ):
                grammar_describe.describe_grammar_text(self.env, VALID_GRAMMAR)
