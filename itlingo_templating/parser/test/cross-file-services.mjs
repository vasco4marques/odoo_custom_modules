import {
    AstUtils,
    DefaultNameProvider,
    DefaultScopeComputation,
    DefaultScopeProvider,
    EMPTY_SCOPE,
    interruptAndCheck,
    isNamed,
    stream,
    StreamScope,
} from 'langium';

const { getContainerOfType, getDocument, streamAllContents } = AstUtils;

class QualifiedNames extends DefaultNameProvider {
    getQualifiedName(node) {
        if (!node.$container) return '';
        const parent = this.getQualifiedName(node.$container);
        const name = this.getName(node);
        return name ? (parent ? `${parent}.${name}` : name) : parent;
    }
}

class QualifiedExports extends DefaultScopeComputation {
    async collectExportedSymbols(document, cancelToken) {
        const result = [];
        for (const node of streamAllContents(document.parseResult.value)) {
            if (cancelToken) await interruptAndCheck(cancelToken);
            if (!isNamed(node)) continue;
            const name = this.nameProvider.getQualifiedName(node);
            if (name) {
                result.push(
                    this.descriptions.createDescription(node, name, document),
                );
            }
        }
        return result;
    }
}

function matches(imp, name) {
    const imported = String(imp.importedNamespace).split('.');
    const qualified = name.split('.');
    return imported.every(
        (part, index) => part === '*' || part === qualified[index],
    );
}

function normalize(imp, name) {
    const parts = String(imp.importedNamespace).split('.');
    if (parts.at(-1) === '*') parts.pop();
    return name.replace(`${parts.join('.')}.`, '');
}

class ImportScopes extends DefaultScopeProvider {
    getGlobalScope(type, context) {
        const system = getContainerOfType(
            context.container, node => node.$type === 'System',
        );
        const pkg = getContainerOfType(
            context.container, node => node.$type === 'PackageSystem',
        );
        if (!pkg) return EMPTY_SCOPE;
        const contextUri = getDocument(context.container).uri.toString();
        const local = system ? this.nameProvider.getQualifiedName(system) : '';
        const elements = [];
        for (const description of this.indexManager.allElements(type)) {
            const imp = pkg.imports.find(item => matches(item, description.name));
            let name = imp ? normalize(imp, description.name) : description.name;
            const targetSystem = getContainerOfType(
                description.node, node => node.$type === 'System',
            );
            if (imp && targetSystem) {
                const systemName = normalize(
                    imp, this.nameProvider.getQualifiedName(targetSystem),
                );
                if (systemName && name.startsWith(`${systemName}.`)) {
                    name = name.slice(systemName.length + 1);
                }
            } else if (
                !imp
                && description.documentUri.toString() === contextUri
                && local
                && name.startsWith(`${local}.`)
            ) {
                name = name.slice(local.length + 1);
            } else if (!imp) {
                continue;
            }
            elements.push({ ...description, name });
        }
        return elements.length
            ? new StreamScope(stream(elements))
            : EMPTY_SCOPE;
    }
}

export default () => ({
    references: {
        NameProvider: () => new QualifiedNames(),
        ScopeComputation: services => new QualifiedExports(services),
        ScopeProvider: services => new ImportScopes(services),
    },
});
