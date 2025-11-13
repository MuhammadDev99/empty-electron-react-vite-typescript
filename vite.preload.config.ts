import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/preload.ts'),
            formats: ['es'], // ← output ESM format
            fileName: () => 'preload.js',
        },
        outDir: '.vite/build',
        emptyOutDir: false,
        rollupOptions: {
            external: ['electron'],
        },
    },
});