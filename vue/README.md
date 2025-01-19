# Vue 3 in Laravel with router, stores and locales

How To Install Vue 3 in Laravel 11 with Vite (router, locales, stores).

## Create project

Copy files from **vue** to laravel-project directory.

```sh
composer create-project --prefer-dist laravel/laravel:^11 laravel-project

cd laravel-project
```

### Add in routes/web.php

```php
<?php
// Laravel routes
// ...

// Vue routes
Route::get('/', function () {
    return view('welcome');
});

// Vue Last route
Route::fallback(function() {
    return view('welcome');
});
```

## Install

```sh
npm install
npm install vue@latest
npm install --save-dev @vitejs/plugin-vue
npm install axios
npm install pinia
npm install vue-i18n@9
npm install vue-router@4
npm install @googlemaps/js-api-loader
```

## Build and run

```sh
npm run build
php artisan serve
php artisan serve --host=localhost --port=8000
```

### Change in .env

```sh
# Dev server only
APP_URL=http://localhost:8000
```
