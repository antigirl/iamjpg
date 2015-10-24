'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
// var uglify = require('gulp-uglify');

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('html:watch', function () {
  gulp.watch(['./*.html'], ['html']);
});

gulp.task('sass', function () {
  gulp.src('./styles/styles.scss')
    .pipe(connect.reload())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./styles/**/*.scss', ['sass'])
});

gulp.task('minify-css', function() {
  return gulp.src('./dist/styles/*.css')
    .pipe(gulp.dest('dist'));
});


gulp.task('scripts', function() {
  browserify('./scripts/index.js')
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('scripts:watch', function () {
  gulp.watch('./scripts/**/*.js', ['scripts']);
});


gulp.task('default', ['connect','sass:watch', 'html:watch', 'scripts:watch']);
gulp.task('build', ['sass','minify-css','scripts']);
