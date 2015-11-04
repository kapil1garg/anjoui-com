// Load gulp and other required modules
var gulp = require('gulp'),
    del = require('del'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jshint = require('gulp-jshint');

// Lint javascript code
gulp.task('lint', function () {
  gulp.src(['./assets/js/**/*.js',
            '!./assets/js/vendor/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Remove the dist directory
gulp.task('clean', function (cb) {
    del(['dist'], cb);
    console.log("Beginning minification and optimization process...");
});

// Copy all files to the cleaned dist directory
gulp.task('copy', ['clean'], function () {
    return gulp.src(['./assets/**', './index.html'], {base: './'})
          .pipe(gulp.dest('dist/'))
          .pipe(size());
});

// Minify vendor JS files
gulp.task('js-vendor', ['copy'], function () {
    return gulp.src('dist/assets/js/vendor/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('dist/assets/js/vendor'));
});

// Minify non-vendor JS files and generate associated map files
gulp.task('js-non-vendor', ['copy'], function () {
    return gulp.src(['dist/assets/js/**/*.js',
              '!dist/assets/js/vendor/*.js'])
          .pipe(sourcemaps.init())
          .pipe(uglify())
          .pipe(sourcemaps.write("./"))
          .pipe(gulp.dest('dist/assets/js'));
});

// Minify vendor CSS files
gulp.task('css-vendor', ['copy'], function () {
    return gulp.src('dist/assets/css/vendor/*.css')
          .pipe(minifycss())
          .pipe(gulp.dest('dist/assets/css/vendor'));
});

// Minify non-vendor CSS files and generate associated map files
gulp.task('css-non-vendor', ['copy'], function () {
    return gulp.src(['dist/assets/css/**/*.css',
              '!dist/assets/css/vendor/*.css'])
          .pipe(sourcemaps.init())
          .pipe(minifycss())
          .pipe(sourcemaps.write("./"))
          .pipe(gulp.dest('dist/assets/css'));
});

// Optimize images
gulp.task('image-optimization', ['copy'], function () {
    return gulp.src('dist/assets/**/*')
          .pipe(imagemin({
              progressive: true,
              interlaced: true,
              use: [pngquant()]
          }))
          .pipe(gulp.dest('dist/assets/'));
});

// Size of dist directory
gulp.task('size', function () {
    return gulp.src('dist/**').pipe(size());
});

// Run all tasks once copying is done.
// Allows build system to be called using 'gulp' and will print final file size
gulp.task('default',
        ['copy', 'js-vendor', 'js-non-vendor', 'css-vendor', 'css-non-vendor',
        'image-optimization'],
        function () {
    console.log('Anjoui build complete. Ready for deployment.');
    gulp.start('size');
});
