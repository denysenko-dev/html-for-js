const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const cleanCSS = require('gulp-clean-css');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const terser = require('gulp-terser');


function clear() {
    return src('./build/*', {
        read: false,
        allowEmpty: true
    })
        .pipe(clean());
}

// CSS 

function css() {
    const source = './src/css/*';

    return src(source)
        .pipe(changed(source))
        .pipe(cleanCSS())
        .pipe(dest('./build/css/'))
        .pipe(browsersync.stream());
}

// JS

function js() {
    const source = './src/js/*';

    return src(source)
        .pipe(changed(source))
        .pipe(terser())
        .pipe(dest('./build/js/'))
        .pipe(browsersync.stream());
}

// Vendor

function vendor() {
    return src([
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    ])
        .pipe(dest('./build/js/'))
        .pipe(browsersync.stream());
}

// Optimize images

function img() {
    return src('./src/images/*')
        .pipe(imagemin())
        .pipe(dest('./build/images'));
}

// html

function html() {
    return src('./src/*.html')
        .pipe(dest('./build/'))
        .pipe(browsersync.stream());
}

// Fonts

function fonts() {
    return src([
        // Roboto
        './node_modules/@fontsource/roboto/files/roboto-cyrillic-400-normal.woff2',
        './node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff2',
        './node_modules/@fontsource/roboto/files/roboto-cyrillic-400-italic.woff2',
        './node_modules/@fontsource/roboto/files/roboto-latin-400-italic.woff2',
        './node_modules/@fontsource/roboto/files/roboto-cyrillic-700-normal.woff2',
        './node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff2',

        // IBM Plex Serif
        './node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-cyrillic-400-normal.woff2',
        './node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-400-normal.woff2',
        './node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-cyrillic-700-normal.woff2',
        './node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-700-normal.woff2'
    ])
        .pipe(dest('./build/fonts/'))
        .pipe(browsersync.stream());
}

// Watch files

function watchFiles() {
    watch('./src/css/*', css);
    watch('./src/js/*', js);
    watch('./src/*.html', html);
    watch('./src/images/*', img);
}

// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    });
}

exports.watch = series(clear, parallel(html, js, vendor, css, img, fonts), parallel(watchFiles, browserSync));
exports.default = series(clear, parallel(html, js, vendor, css, img, fonts));