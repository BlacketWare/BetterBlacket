import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            'internals': '/src/internals',
            'utils': '/src/utils'
        }
    },

    build: {
        target: 'es2020',
        outDir: './dist',
        assetsDir: './',
        emptyOutDir: true,
        rollupOptions: {
            input: './src/main.js',
            output: {
                entryFileNames: 'bb.min.js',
                compact: true
            },
            onwarn: () => {}
        },
        minify: false
    }
});