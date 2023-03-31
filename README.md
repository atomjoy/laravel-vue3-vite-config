# Vue 3 in Laravel

How To Install Vue 3 in Laravel 10 with Vite.

## Create project

```sh
composer create-project --prefer-dist laravel/laravel:^10.0 laravel-vue
cd laravel-vue
```

## Install

```sh
npm install
npm install vue@next vue-loader@next
npm install @vitejs/plugin-vue
```

## Config

### vite.config.js

```js
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		laravel({
			input: ['resources/css/app.css', 'resources/js/app.js'],
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
	// Change default url /build directory
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
});
```

### resources/js/app.js

```js
require('./bootstrap');

import {createApp} from 'vue'

import App from './App.vue'

createApp(App).mount("#app")
```

### resources/js/App.vue

```vue
<template>
    How To Install Vue 3 in Laravel 10 with Vite.
</template>
<script setup></script>
```

### welcome.blade.php

```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>How To Install Vue 3 in Laravel 10 with Vite</title>

    @vite('resources/css/app.css')
</head>
<body>
    <div id="app"></div>

    @vite('resources/js/app.js')
</body>
</html>
```

### .env

```sh
APP_URL=http://localhost:8000
```

### routes/web.php

```php
<?php

// Last route
Route::fallback(function() {
    return view('welcome');
});
```

## Build and run

```sh
npm run build
php artisan serve
```

## Install optional packages

```sh
npm install axios
npm install pinia
npm install vue-i18n@9
npm install vue-router@4
npm install @googlemaps/js-api-loader
```

## Override ** /build ** dir in page url
```
# Add this in vue router/index.js
history: createWebHistory('/')

# Or add in vite.config.js
base: './', 
```

## Links

- <https://router.vuejs.org/guide>
- <https://router.vuejs.org/guide/advanced/composition-api.html>
- <https://pinia.vuejs.org/getting-started.html>
