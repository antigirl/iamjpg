'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('./styles/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./styles/**/*.scss', ['sass']);
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
  gulp.watch('./scripts/*.js', ['scripts']);
});

gulp.task('default', ['sass:watch','scripts:watch']);
gulp.task('build', ['sass','minify-css','scripts']);
