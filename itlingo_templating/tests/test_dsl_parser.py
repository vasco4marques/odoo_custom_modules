import hashlib
import unittest

from odoo.addons.itlingo_templating.services.dsl_parser import (
    parse_dsl,
)


GRAMMAR = r"""
grammar Catalog

entry Catalog:
    'catalog' name=ID items+=Item*;

Item:
    'item' name=ID ('owner' owner=[Item])?;

hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
"""


class _Params:
    def sudo(self):
        return self

    def get_param(self, _name, default=None):
        return default


class _Env:
    def ref(self, _xml_id, raise_if_not_found=False):
        return False

    def __getitem__(self, model):
        if model == "ir.config_parameter":
            return _Params()
        raise KeyError(model)


class _GrammarFile:
    def __init__(self, text):
        self.text = text

    def _read_text_utf8(self):
        return self.text


class _Dsl:
    id = 42
    status = "active"
    grammar_validation_result = "valid"
    grammar_validation_is_current = True
    acronym = "CAT"
    name = "Catalog"
    file_extensions = ".cat"

    def __init__(self, grammar=GRAMMAR):
        self.grammar = grammar
        self.published_digest = self._grammar_digest()

    def _grammar_file(self):
        return _GrammarFile(self.grammar)

    def _flattened_grammar_text(self):
        return self.grammar

    def _grammar_digest(self):
        return hashlib.sha256(self.grammar.encode()).hexdigest()


class TestRecordSourcedDslParser(unittest.TestCase):

    def test_parses_generic_dsl_from_record_grammar(self):
        ast = parse_dsl(
            _Env(), _Dsl(), b"catalog demo item ana item review owner ana",
        )

        self.assertEqual(ast["$type"], "Catalog")
        self.assertEqual(ast["items"][1]["owner"], {"$ref": "ana"})

    def test_parses_record_sourced_flattened_multifile_grammar(self):
        entry = (
            "grammar Catalog\n"
            "entry Catalog: 'catalog' name=ID items+=Item*;\n"
            "Item: 'item' name=ID ('owner' owner=[Item])?;\n"
        )
        terminals = (
            "hidden terminal WS: /\\s+/;\n"
            "terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;\n"
        )
        dsl = _Dsl(entry + "\n" + terminals)

        ast = parse_dsl(
            _Env(), dsl, b"catalog demo item ana item review owner ana",
        )

        self.assertEqual(ast["$type"], "Catalog")
        self.assertNotIn("import ", dsl._flattened_grammar_text())

    def test_rejects_record_grammar_imports_clearly(self):
        with self.assertRaisesRegex(RuntimeError, "must be self-contained"):
            parse_dsl(
                _Env(), _Dsl("grammar Catalog\nimport './Terminals'"),
                b"catalog demo",
            )
