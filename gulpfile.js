// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var minifycss  = require('gulp-cssnano');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
     gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('stylesheets'))
        .pipe(minifycss())
        .pipe(gulp.dest('stylesheets'))
        livereload.listen();
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch(['js/*.js', 'scss/**/*.scss', '*.html']).on('change', livereload.changed);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);