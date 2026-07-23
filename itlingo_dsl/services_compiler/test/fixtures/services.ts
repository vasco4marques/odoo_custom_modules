import { DefaultNameProvider } from 'langium';

export default function createDslModule() {
    return {
        references: {
            NameProvider: services => new DefaultNameProvider(services),
        },
    };
}
