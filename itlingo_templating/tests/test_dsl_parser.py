import hashlib

from odoo.addons.itlingo_templating.services.dsl_parser import (
    DslParseError,
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

QUALIFIED_REFERENCE_GRAMMAR = r"""
grammar QualifiedReference

entry Model:
    entities+=Entity*
    uses+=Derived*;

Entity:
    'entity' name=ID '{' attributes+=Attribute* '}';

Attribute:
    'attribute' name=ID;

Derived:
    'derived' from=[Attribute:QualifiedName];

QualifiedName returns string:
    ID ('.' ID)*;

hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
"""

QUALIFIED_SCOPE_SERVICES = r"""
import { DefaultScopeProvider } from 'langium';

class QualifiedAttributeScopeProvider extends DefaultScopeProvider {
    getScope(context) {
        if (context.property !== 'from') {
            return super.getScope(context);
        }
        let model = context.container;
        while (model.$container) {
            model = model.$container;
        }
        const descriptions = model.entities.flatMap(entity =>
            entity.attributes.map(attribute =>
                this.descriptions.createDescription(
                    attribute,
                    entity.name + '.' + attribute.name,
                ),
            ),
        );
        return this.createScope(descriptions, super.getScope(context));
    }
}

export default function createDslModule() {
    return {
        references: {
            ScopeProvider: services =>
                new QualifiedAttributeScopeProvider(services),
        },
    };
}
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
    templating_validation_level = "all"

    def __init__(
        self, grammar=GRAMMAR, flattened_grammar=None, validation_level="all",
        services="",
    ):
        self.grammar = grammar
        self.flattened_grammar = flattened_grammar or grammar
        self.templating_validation_level = validation_level
        self.published_digest = self._grammar_digest()
        self.services_compiled = services
        self.services_compile_result = "ok" if services else False
        self.services_compiled_digest = (
            hashlib.sha256(services.encode()).hexdigest() if services else False
        )
        self.services_source_digest = (
            self._services_source_digest() if services else False
        )

    def _grammar_file(self):
        return _GrammarFile(self.grammar)

    def _flattened_grammar_text(self):
        return self.flattened_grammar

    def _grammar_digest(self):
        return hashlib.sha256(self.flattened_grammar.encode()).hexdigest()

    def _services_files(self):
        return [object()] if self.services_compiled else []

    def _services_source_digest(self):
        return "test-services-source"


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

    def test_record_can_choose_syntax_only_validation(self):
        source = b"catalog demo item review owner missing"
        with self.assertRaises(DslParseError):
            parse_dsl(_Env(), _Dsl(), source)

        ast = parse_dsl(
            _Env(), _Dsl(validation_level="syntax"), source,
        )

        self.assertEqual(ast["items"][0]["owner"], {"$ref": "missing"})

    def test_injects_author_services_module(self):
        services = """
import { ValidationRegistry } from 'langium';

class CatalogValidationRegistry extends ValidationRegistry {
    constructor(services) {
        super(services);
        this.register({
            Catalog: (node, accept) => {
                if (node.name === 'blocked') {
                    accept('error', 'Name rejected by custom services', {
                        node,
                        property: 'name',
                    });
                }
            },
        }, this);
    }
}

export default function createDslModule() {
    return {
        validation: {
            ValidationRegistry: services =>
                new CatalogValidationRegistry(services),
        },
    };
}
"""
        with self.assertRaisesRegex(
            DslParseError, "CAT specification has errors",
        ) as raised:
            parse_dsl(
                _Env(),
                _Dsl(services=services),
                b"catalog blocked",
            )

        self.assertTrue(any(
            diagnostic["message"] == "Name rejected by custom services"
            for diagnostic in raised.exception.diagnostics
        ))

        ast = parse_dsl(
            _Env(),
            _Dsl(validation_level="syntax", services=services),
            b"catalog blocked",
        )
        self.assertEqual(ast["name"], "blocked")

    def test_author_scope_provider_resolves_qualified_reference_round_trip(self):
        dsl = _Dsl(
            grammar=QUALIFIED_REFERENCE_GRAMMAR,
            services=QUALIFIED_SCOPE_SERVICES,
        )
        ast = parse_dsl(
            _Env(),
            dsl,
            b"entity e_VAT { attribute VATValue } derived e_VAT.VATValue",
        )

        self.assertEqual(ast["uses"][0]["from"], {"$ref": "e_VAT.VATValue"})

        with self.assertRaises(DslParseError) as raised:
            parse_dsl(
                _Env(),
                dsl,
                b"entity e_VAT { attribute VATValue } derived e_VAT.Nope",
            )
        self.assertTrue(any(
            "Could not resolve reference to Attribute named 'e_VAT.Nope'"
            in diagnostic["message"]
            for diagnostic in raised.exception.diagnostics
        ))

    def test_rejects_services_with_non_current_compile_result(self):
        dsl = _Dsl(services="export default () => ({});")
        dsl.services_compile_result = "error"

        with self.assertRaisesRegex(
            RuntimeError, "current compiled services module",
        ):
            parse_dsl(_Env(), dsl, b"catalog demo")
