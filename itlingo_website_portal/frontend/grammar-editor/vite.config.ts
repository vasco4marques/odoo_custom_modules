import {defineConfig} from 'vite';

const outDir = new URL('../../static/dist/grammar-editor', import.meta.url).pathname;

export default defineConfig({
    base: '/itlingo_website_portal/static/dist/grammar-editor/',
    build: {
        outDir,
        emptyOutDir: true,
        manifest: 'manifest.json',
        sourcemap: false,
        lib: {
            entry: 'src/bootstrap.ts',
            formats: ['es'],
            fileName: () => 'grammar-editor',
            cssFileName: 'grammar-editor',
        },
        rollupOptions: {
            output: {
                entryFileNames: 'grammar-editor-[hash].js',
                chunkFileNames: 'chunks/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },
    worker: {
        format: 'es',
        rollupOptions: {
            output: {
                entryFileNames: (chunk) => (
                    chunk.name.includes('langium-server')
                        ? 'langium-grammar-server-[hash].worker.js'
                        : chunk.name.includes('editor.worker')
                            ? 'editor-[hash].worker.js'
                            : '[name]-[hash].js'
                ),
                chunkFileNames: '[name]-[hash].js',
            },
        },
    },
});
