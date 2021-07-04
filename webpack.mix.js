let mix = require('laravel-mix');

mix.ts('resources/js/app.ts', 'dist/').vue()
    .sass('resources/scss/app.scss', 'dist/');
