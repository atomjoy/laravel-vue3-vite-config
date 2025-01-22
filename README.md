# Vue 3 in Laravel 11 with Vite

How To Install Vue 3 in Laravel with Vite (vue-router, i18n locale translation, pinia store).

## Full SPA example

Full example with router, i18n translation and pinia store in **vue** directory <https://github.com/atomjoy/laravel-vue3-vite-config/tree/main/vue>.

## Minimal SPA example (landing page)

Create Laravel project with composer.

```sh
composer create-project laravel/laravel laravel-vue --prefer-dist

cd laravel-vue
```

### Vue, Vite plugins

Minimal SPA application.

```sh
npm install
npm install vue@latest
npm install --save-dev @vitejs/plugin-vue
npm install axios
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
import './bootstrap';

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

### routes/web.php

```php
<?php
// Laravel routes
// ...

// Vue routes
Route::get('/', function () {
    return view('welcome');
});

// Vue Last route
if (!app()->runningUnitTests()) {
	Route::fallback(function() {
	    return view('welcome');
	});
}
```

### Build and run

```sh
npm run build
php artisan serve
php artisan serve --host=localhost --port=8000
```

## Override /build dir in page url (errors)

```js
// Add this in vue router/index.js
history: createWebHistory('/')

// Or add in vite.config.js
base: './', 
```

## App url in .env

```sh
# Dev server only
APP_URL=http://localhost:8000
```

## Links

- <https://router.vuejs.org/guide>
- <https://router.vuejs.org/guide/advanced/composition-api.html>
- <https://pinia.vuejs.org/getting-started.html>
