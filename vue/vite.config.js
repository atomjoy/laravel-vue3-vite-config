import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({    
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    // Change base url
    // base: './', // Default url path is /build directory
    // Or change assets dir
	build: {
		rollupOptions: {
			output: {
				assetFileNames: 'assets/[ext]/[name][extname]',
			},
		},
	},
});
