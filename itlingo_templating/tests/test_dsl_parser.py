import hashlib

from odoo.addons.itlingo_templating.services.dsl_parser import (
    parse_dsl,
)
from odoo.tests import BaseCase, tagged


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

    def __init__(self, grammar=GRAMMAR, flattened_grammar=None):
        self.grammar = grammar
        self.flattened_grammar = flattened_grammar or grammar
        self.published_digest = self._grammar_digest()

    def _grammar_file(self):
        return _GrammarFile(self.grammar)

    def _flattened_grammar_text(self):
        return self.flattened_grammar

    def _grammar_digest(self):
        return hashlib.sha256(self.flattened_grammar.encode()).hexdigest()


@tagged("post_install", "-at_install")
class TestRecordSourcedDslParser(BaseCase):

    def test_parses_generic_dsl_from_record_grammar(self):
        ast = parse_dsl(
            _Env(), _Dsl(), b"catalog demo item ana item review owner ana",
        )

        self.assertEqual(ast["$type"], "Catalog")
        self.assertEqual(ast["items"][1]["owner"], {"$ref": "ana"})

    def test_parses_record_sourced_flattened_multifile_grammar(self):
        entry = (
            "grammar Catalog\n"
            "import './Terminals'\n"
            "entry Catalog: 'catalog' name=ID items+=Item*;\n"
            "Item: 'item' name=ID ('owner' owner=[Item])?;\n"
        )
        terminals = (
            "hidden terminal WS: /\\s+/;\n"
            "terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;\n"
        )
        flattened = entry.replace("import './Terminals'\n", "") + "\n" + terminals
        dsl = _Dsl(entry, flattened_grammar=flattened)

        ast = parse_dsl(
            _Env(), dsl, b"catalog demo item ana item review owner ana",
        )

        self.assertEqual(ast["$type"], "Catalog")
        self.assertIn("import './Terminals'", dsl._grammar_file()._read_text_utf8())
        self.assertNotIn("import ", dsl._flattened_grammar_text())

    def test_rejects_record_grammar_imports_clearly(self):
        with self.assertRaisesRegex(RuntimeError, "must be self-contained"):
            parse_dsl(
                _Env(), _Dsl("grammar Catalog\nimport './Terminals'"),
                b"catalog demo",
            )
