import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
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
	// Change base default url /build directory
	base: './',
	build: {
		emptyOutDir: true,
	},
	// Or change assets dir
	// build: {
	// 	rollupOptions: {
	// 		output: {
	// 			assetFileNames: 'assets/[ext]/[name].[hash].[extname]',
	// 			chunkFileNames: 'chunks/[name].[hash].js',
	// 			entryFileNames: 'js/[name].[hash].js',
	// 		},
	// 	},
	// },
})
