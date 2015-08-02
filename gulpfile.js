// Load gulp and other required modules
var gulp 		= require('gulp'),
	del 		= require('del'),
	image		= require('gulp-imagemin'),
	size 		= require('gulp-size'),
	sourcemaps	= require('gulp-sourcemaps'),
	uglify		= require('gulp-uglify'),
	jsonminify	= require('gulp-jsonminify'),
	minifycss	= require('gulp-minify-css'),
	imagemin   	= require('gulp-imagemin'),
	pngquant 	= require('imagemin-pngquant');

console.log("Beginning minification and optimization process...");

// Remove the production directory
gulp.task('clean', function (cb) {
	del(['production'], cb);
});

// Copy all files to the cleaned production directory
gulp.task('copy', ['clean'], function () {
	return gulp.src(['./assets/**', './index.html'], { base: './'})
			   .pipe(gulp.dest('production/'))
			   .pipe(size());
});

// Minify vendor JS files
gulp.task('js-vendor', ['copy'], function () {
	return gulp.src('production/assets/js/vendor/*.js')
               .pipe(uglify())
               .pipe(gulp.dest('production/assets/js/vendor'))
});

// Minify non-vendor JS files and generate associated map files
gulp.task('js-non-vendor', ['copy'], function () {
	return gulp.src(['production/assets/js/**/*.js',
					 '!production/assets/js/vendor/*.js'])
               .pipe(sourcemaps.init())
               .pipe(uglify())
               .pipe(sourcemaps.write("./"))
               .pipe(gulp.dest('production/assets/js'))
});

// Minify vendor CSS files
gulp.task('css-vendor', ['copy'], function () {
	return gulp.src('production/assets/css/vendor/*.css')
               .pipe(minifycss())
               .pipe(gulp.dest('production/assets/css/vendor'))
});

// Minify non-vendor CSS files and generate associated map files
gulp.task('css-non-vendor', ['copy'], function () {
	return gulp.src(['production/assets/css/**/*.css',
					 '!production/assets/css/vendor/*.css'])
               .pipe(sourcemaps.init())
               .pipe(minifycss())
               .pipe(sourcemaps.write("./"))
               .pipe(gulp.dest('production/assets/css'))
});

// Optimize images
gulp.task('image-optimization', ['copy'], function () {
	return gulp.src('production/assets/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('production/assets/'));
});

// Size of production directory
gulp.task('size', function () {
	return gulp.src('production/**').pipe(size());
});

// Run all tasks once copying is done.
// Allows build system to be called using 'gulp' and will print final file size
gulp.task('default',
		  ['copy', 'js-vendor', 'js-non-vendor',
		   'css-vendor', 'css-non-vendor',
		   'image-optimization'],
		  function () {
		  	console.log("Armada build complete. Ready for deployment.");
		  	gulp.start('size');
});