// Langium grammar type inventory CLI.
//
// Usage: node describe.mjs <grammarPath>
// Prints the versioned template-reference schema on stdout. Grammar imports
// are inlined before parsing so the CLI does not require a Langium workspace.

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { EmptyFileSystem, URI } from 'langium';
import {
    collectAst,
    createLangiumGrammarServices,
    getTypeNameWithoutError,
    isArrayType,
    isPrimitiveType,
    isPropertyUnion,
    isReferenceType,
    isStringType,
    isUnionType,
    isValueType,
} from 'langium/grammar';

// Keep in sync with the pinned "langium" version in package.json.
const LANGIUM_VERSION = '4.3.1';
const BUNDLE_VERSION = '1.1.0';
const SCHEMA_VERSION = '1.1';
const MAX_LITERAL_VALUES = 20;
const DESCRIBER_VERSION = `langium ${LANGIUM_VERSION} / describer ${BUNDLE_VERSION}`;
const SEVERITIES = { 1: 'error', 2: 'warning', 3: 'info', 4: 'hint' };

export function loadGrammar(grammarPath, seen = new Set()) {
    const absolutePath = resolve(grammarPath);
    if (seen.has(absolutePath)) {
        throw new Error(`Circular grammar import: ${absolutePath}`);
    }
    seen.add(absolutePath);

    const source = readFileSync(absolutePath, 'utf-8');
    const baseDir = dirname(absolutePath);
    const imports = [];
    const grammarWithoutImports = source.replace(
        /^(\s*)import\s+['"]([^'"]+)['"]\s*;?\s*$/gm,
        (_match, _indent, importedPath) => {
            const fileName = importedPath.endsWith('.langium')
                ? importedPath
                : `${importedPath}.langium`;
            imports.push(loadGrammar(resolve(baseDir, fileName), seen));
            return '';
        },
    );
    return [grammarWithoutImports, ...imports].join('\n');
}

function primitiveName(name) {
    if (name === 'boolean') {
        return 'boolean';
    }
    if (name === 'number' || name === 'bigint') {
        return 'number';
    }
    return 'string';
}

function alternativesOf(propertyType, visited = new Set()) {
    if (!propertyType || visited.has(propertyType)) {
        return [];
    }
    visited.add(propertyType);
    if (isArrayType(propertyType)) {
        return alternativesOf(propertyType.elementType, visited);
    }
    if (isReferenceType(propertyType)) {
        return alternativesOf(propertyType.referenceType, visited);
    }
    if (isPropertyUnion(propertyType)) {
        return propertyType.types.flatMap((type) => alternativesOf(type, visited));
    }
    if (isValueType(propertyType)) {
        const value = propertyType.value;
        if (isUnionType(value) && value.dataType) {
            return alternativesOf(value.type, visited);
        }
        return value?.name ? [value.name] : [];
    }
    if (isPrimitiveType(propertyType)) {
        return [primitiveName(propertyType.primitive)];
    }
    if (isStringType(propertyType)) {
        return ['string'];
    }
    return [];
}

function inspectPropertyType(propertyType, state = { list: false, reference: false }) {
    if (isArrayType(propertyType)) {
        return inspectPropertyType(propertyType.elementType, { ...state, list: true });
    }
    if (isReferenceType(propertyType)) {
        return inspectPropertyType(propertyType.referenceType, { ...state, reference: true });
    }
    if (isPropertyUnion(propertyType)) {
        const descriptions = propertyType.types.map((type) => inspectPropertyType(type, state));
        const objectDescription = descriptions.find((item) => item.target);
        if (objectDescription) {
            const targets = [...new Set(descriptions.flatMap((item) => item.target ? [item.target] : []))];
            return {
                kind: state.reference ? 'reference' : 'containment',
                target: targets.join(' | '),
                list: state.list || descriptions.some((item) => item.list),
            };
        }
        const primitiveTypes = [...new Set(descriptions.map((item) => item.type).filter(Boolean))];
        return {
            kind: 'primitive',
            type: primitiveTypes.join(' | ') || 'string',
            list: state.list || descriptions.some((item) => item.list),
        };
    }
    if (isValueType(propertyType)) {
        const value = propertyType.value;
        if (isUnionType(value) && value.dataType) {
            const description = inspectPropertyType(value.type, state);
            return description.kind === 'primitive'
                ? description
                : { kind: 'primitive', type: primitiveName(value.dataType), list: state.list };
        }
        return {
            kind: state.reference ? 'reference' : 'containment',
            target: value?.name ?? 'unknown',
            list: state.list,
        };
    }
    if (isPrimitiveType(propertyType)) {
        return { kind: 'primitive', type: primitiveName(propertyType.primitive), list: state.list };
    }
    if (isStringType(propertyType)) {
        return { kind: 'primitive', type: 'string', list: state.list };
    }
    return { kind: 'primitive', type: 'string', list: state.list };
}

function describeProperty(property, values = []) {
    const description = {
        name: property.name,
        ...inspectPropertyType(property.type),
        optional: property.optional,
    };
    if (description.kind === 'primitive' && values.length) {
        description.values = values;
    }
    return description;
}

function keywordAlternatives(terminal) {
    if (!terminal || terminal.$type !== 'Alternatives') {
        return [];
    }
    const elements = terminal.elements ?? [];
    if (!elements.length || elements.some((element) => element.$type !== 'Keyword')) {
        return [];
    }
    const values = [...new Set(elements.map((element) => element.value))];
    return values.length <= MAX_LITERAL_VALUES ? values.sort() : [];
}

function literalAssignments(node, result = new Map(), visited = new Set()) {
    if (!node || typeof node !== 'object' || visited.has(node)) {
        return result;
    }
    visited.add(node);
    if (node.$type === 'Assignment') {
        const values = keywordAlternatives(node.terminal);
        if (values.length) {
            const existing = result.get(node.feature) ?? [];
            result.set(node.feature, [...new Set([...existing, ...values])].sort());
        }
    }
    for (const [key, value] of Object.entries(node)) {
        if (key.startsWith('$')) {
            continue;
        }
        if (Array.isArray(value)) {
            for (const item of value) {
                literalAssignments(item, result, visited);
            }
        } else if (value && typeof value === 'object') {
            literalAssignments(value, result, visited);
        }
    }
    return result;
}

function supportsString(propertyType, visited = new Set()) {
    if (!propertyType || visited.has(propertyType)) {
        return false;
    }
    visited.add(propertyType);
    if (isArrayType(propertyType)) {
        return supportsString(propertyType.elementType, visited);
    }
    if (isReferenceType(propertyType)) {
        return false;
    }
    if (isPropertyUnion(propertyType)) {
        return propertyType.types.some((type) => supportsString(type, visited));
    }
    if (isPrimitiveType(propertyType)) {
        return primitiveName(propertyType.primitive) === 'string';
    }
    if (isStringType(propertyType)) {
        return true;
    }
    if (isValueType(propertyType) && isUnionType(propertyType.value) && propertyType.value.dataType) {
        return propertyType.value.dataType === 'string'
            || supportsString(propertyType.value.type, visited);
    }
    return false;
}

function diagnosticPayload(document) {
    const diagnostics = (document.diagnostics ?? []).map((diagnostic) => ({
        severity: SEVERITIES[diagnostic.severity] ?? 'error',
        message: diagnostic.message,
        line: diagnostic.range.start.line + 1,
        column: diagnostic.range.start.character + 1,
    }));
    for (const error of document.parseResult?.lexerErrors ?? []) {
        diagnostics.push({
            severity: 'error',
            message: error.message,
            line: error.line ?? null,
            column: error.column ?? null,
        });
    }
    for (const error of document.parseResult?.parserErrors ?? []) {
        diagnostics.push({
            severity: 'error',
            message: error.message,
            line: error.token?.startLine ?? null,
            column: error.token?.startColumn ?? null,
        });
    }
    return diagnostics;
}

export async function describeGrammar(grammarText) {
    const services = createLangiumGrammarServices(EmptyFileSystem);
    const document = services.shared.workspace.LangiumDocumentFactory.fromString(
        grammarText,
        URI.parse('file:///grammar.langium'),
    );
    services.shared.workspace.LangiumDocuments.addDocument(document);
    await services.shared.workspace.DocumentBuilder.build([document], { validation: true });

    const diagnostics = diagnosticPayload(document);
    // Langium 4.3.1's grammar validator reports guarded assignments as an
    // unsupported type-collector feature even though the runtime grammar
    // loader consumes those predicates successfully. collectAst can likewise
    // describe them. Keep every other grammar error fatal, especially syntax
    // and unresolved-reference diagnostics.
    const errors = diagnostics.filter((diagnostic) => (
        diagnostic.severity === 'error'
        && diagnostic.message !== 'Predicates are currently not supported.'
    ));
    if (errors.length) {
        const first = errors[0];
        const location = first.line ? ` at ${first.line}:${first.column ?? 1}` : '';
        throw new Error(`Invalid grammar${location}: ${first.message}`);
    }

    const grammar = document.parseResult.value;
    const astTypes = collectAst(grammar, {
        services: services.grammar,
        filterNonAstTypeUnions: true,
    });
    const entryRule = grammar.rules.find(
        (rule) => rule.$type === 'ParserRule' && rule.entry,
    );
    if (!entryRule) {
        throw new Error('Invalid grammar: no entry parser rule found.');
    }

    const literalValuesByType = new Map();
    for (const rule of grammar.rules) {
        if (rule.$type !== 'ParserRule') {
            continue;
        }
        const typeName = getTypeNameWithoutError(rule) ?? rule.name;
        const assignments = literalAssignments(rule.definition);
        if (assignments.size) {
            literalValuesByType.set(typeName, assignments);
        }
    }

    const types = astTypes.interfaces.map((interfaceType) => {
        const properties = interfaceType.allProperties;
        const nameProperty = properties.find((property) => property.name === 'name');
        const literalValues = literalValuesByType.get(interfaceType.name) ?? new Map();
        return {
            name: interfaceType.name,
            indexed: Boolean(nameProperty && supportsString(nameProperty.type)),
            abstract: interfaceType.abstract,
            super_types: [...interfaceType.superTypes].map((type) => type.name).sort(),
            properties: properties.map((property) => describeProperty(
                property, literalValues.get(property.name) ?? [],
            )).sort((a, b) => a.name.localeCompare(b.name)),
        };
    }).sort((a, b) => a.name.localeCompare(b.name));

    const unions = astTypes.unions.map((unionType) => ({
        name: unionType.name,
        alternatives: [...new Set(alternativesOf(unionType.type))].sort(),
    })).sort((a, b) => a.name.localeCompare(b.name));

    return {
        success: true,
        schema_version: SCHEMA_VERSION,
        entry_type: getTypeNameWithoutError(entryRule) ?? entryRule.name,
        types,
        unions,
        describer_version: DESCRIBER_VERSION,
    };
}

function output(payload) {
    process.stdout.write(JSON.stringify(payload));
}

async function main() {
    const grammarPath = process.argv[2];
    if (!grammarPath) {
        output({
            success: false,
            schema_version: SCHEMA_VERSION,
            message: 'Usage: node describe.mjs <grammarPath>',
            describer_version: DESCRIBER_VERSION,
        });
        process.exitCode = 2;
        return;
    }

    try {
        const grammarText = loadGrammar(grammarPath);
        output(await describeGrammar(grammarText));
    } catch (error) {
        output({
            success: false,
            schema_version: SCHEMA_VERSION,
            message: error && error.message ? error.message : String(error),
            describer_version: DESCRIBER_VERSION,
        });
        process.exitCode = 1;
    }
}

if (process.argv[1] && import.meta.url === URI.file(resolve(process.argv[1])).toString()) {
    main();
}
