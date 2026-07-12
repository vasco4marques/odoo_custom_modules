import {defineConfig} from 'vite';

const outDir = new URL('../../static/dist/grammar-editor', import.meta.url).pathname;

export default defineConfig({
    base: '/itlingo_website_portal/static/dist/grammar-editor/',
    build: {
        outDir,
        emptyOutDir: true,
        sourcemap: false,
        lib: {
            entry: 'src/main.ts',
            formats: ['es'],
            fileName: () => 'grammar-editor.js',
            cssFileName: 'grammar-editor',
        },
    },
    worker: {
        format: 'es',
        rollupOptions: {
            output: {
                entryFileNames: (chunk) => (
                    chunk.name.includes('langium-server')
                        ? 'langium-grammar-server.worker.js'
                        : chunk.name.includes('editor.worker')
                            ? 'editor.worker.js'
                            : '[name]-[hash].js'
                ),
            },
        },
    },
});
