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
                    `${entity.name}.${attribute.name}`,
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
