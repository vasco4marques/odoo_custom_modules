import hashlib

from odoo.addons.itlingo_templating.services.dsl_parser import (
    DslParseError,
    parse_dsl,
)
from odoo.addons.itlingo_templating.services.spec_flattener import SpecSource
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

CROSS_FILE_GRAMMAR = r"""
grammar CrossFile

entry Model:
    packages+=PackageSystem*;

PackageSystem:
    'Package' name=QualifiedName imports+=Import* system=System;

Import:
    'Import' importedNamespace=QualifiedNameWithWildcard;

System:
    'System' name=ID concepts+=(Entity | Derived)*;

Entity:
    'Entity' name=ID '{' attributes+=Attribute* '}';

Attribute:
    'attribute' name=ID;

Derived:
    'derived' from=[Attribute:QualifiedName];

QualifiedName returns string:
    ID ('.' ID)*;

QualifiedNameWithWildcard returns string:
    QualifiedName '.*'?;

hidden terminal WS: /\s+/;
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
"""

CROSS_FILE_SCOPE_SERVICES = r"""
import {
    AstUtils, DefaultNameProvider, DefaultScopeComputation,
    DefaultScopeProvider, EMPTY_SCOPE, interruptAndCheck, isNamed, stream,
    StreamScope,
} from 'langium';
const { getContainerOfType, getDocument, streamAllContents } = AstUtils;

class QualifiedNames extends DefaultNameProvider {
    getQualifiedName(node) {
        if (!node.$container) return '';
        const parent = this.getQualifiedName(node.$container);
        const name = this.getName(node);
        return name ? (parent ? parent + '.' + name : name) : parent;
    }
}

class QualifiedExports extends DefaultScopeComputation {
    async collectExportedSymbols(document, token) {
        const result = [];
        for (const node of streamAllContents(document.parseResult.value)) {
            if (token) await interruptAndCheck(token);
            if (!isNamed(node)) continue;
            const name = this.nameProvider.getQualifiedName(node);
            if (name) {
                result.push(this.descriptions.createDescription(node, name, document));
            }
        }
        return result;
    }
}

function matches(imp, name) {
    const imported = String(imp.importedNamespace).split('.');
    const qualified = name.split('.');
    return imported.every(
        (part, index) => part === '*' || part === qualified[index]
    );
}

function normalize(imp, name) {
    const parts = String(imp.importedNamespace).split('.');
    if (parts.at(-1) === '*') parts.pop();
    return name.replace(parts.join('.') + '.', '');
}

class ImportScopes extends DefaultScopeProvider {
    getGlobalScope(type, context) {
        const system = getContainerOfType(
            context.container, node => node.$type === 'System'
        );
        const pkg = getContainerOfType(
            context.container, node => node.$type === 'PackageSystem'
        );
        if (!pkg) return EMPTY_SCOPE;
        const contextUri = getDocument(context.container).uri.toString();
        const local = system ? this.nameProvider.getQualifiedName(system) : '';
        const elements = this.indexManager.allElements(type).map(description => {
            const imp = pkg.imports.find(item => matches(item, description.name));
            let name = imp ? normalize(imp, description.name) : description.name;
            const targetSystem = getContainerOfType(
                description.node, node => node.$type === 'System'
            );
            if (imp && targetSystem) {
                const systemName = normalize(
                    imp, this.nameProvider.getQualifiedName(targetSystem)
                );
                if (systemName && name.startsWith(systemName + '.')) {
                    name = name.slice(systemName.length + 1);
                }
            }
            if (
                !imp
                && description.documentUri.toString() === contextUri
                && local
                && name.startsWith(local + '.')
            ) {
                name = name.slice(local.length + 1);
            } else if (!imp) {
                return undefined;
            }
            return { ...description, name };
        }).filter(Boolean).toArray();
        return elements.length ? new StreamScope(stream(elements)) : EMPTY_SCOPE;
    }
}

export default () => ({ references: {
    NameProvider: () => new QualifiedNames(),
    ScopeComputation: services => new QualifiedExports(services),
    ScopeProvider: services => new ImportScopes(services),
}});
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

    def test_flattens_imported_spec_and_resolves_cross_file_reference(self):
        dsl = _Dsl(
            grammar=CROSS_FILE_GRAMMAR,
            services=CROSS_FILE_SCOPE_SERVICES,
        )
        billing = SpecSource(
            identifier="billing",
            name="billing.cat",
            text=(
                "Package p_Billing System Billing "
                "Entity e_VAT { attribute VATValue }"
            ),
        )
        source = (
            b"Package p_Ordering Import p_Billing.* System Ordering "
            b"derived e_VAT.VATValue"
        )

        ast = parse_dsl(
            _Env(), dsl, source, import_sources=[billing],
            source_name="ordering.cat",
        )

        self.assertEqual(len(ast["packages"]), 2)
        self.assertEqual(
            ast["packages"][0]["system"]["concepts"][0]["from"],
            {"$ref": "e_VAT.VATValue"},
        )

        with self.assertRaises(DslParseError) as raised:
            parse_dsl(
                _Env(),
                dsl,
                source.replace(b"VATValue", b"Nope"),
                import_sources=[billing],
                source_name="ordering.cat",
            )
        self.assertTrue(any(
            "Could not resolve reference to Attribute named 'e_VAT.Nope'"
            in diagnostic["message"]
            for diagnostic in raised.exception.diagnostics
        ))

    def test_reports_missing_spec_import_before_parsing(self):
        dsl = _Dsl(
            grammar=CROSS_FILE_GRAMMAR,
            services=CROSS_FILE_SCOPE_SERVICES,
        )
        with self.assertRaisesRegex(
            DslParseError, "cannot be resolved from specifications",
        ) as raised:
            parse_dsl(
                _Env(),
                dsl,
                b"Package p_Ordering Import p_Missing.* System Ordering",
                import_sources=[],
                source_name="ordering.cat",
            )
        self.assertEqual(raised.exception.diagnostics[0]["line"], 1)

    def test_rejects_services_with_non_current_compile_result(self):
        dsl = _Dsl(services="export default () => ({});")
        dsl.services_compile_result = "error"

        with self.assertRaisesRegex(
            RuntimeError, "current compiled services module",
        ):
            parse_dsl(_Env(), dsl, b"catalog demo")
