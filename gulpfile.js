'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var gm = require('gulp-gm');
var imagemin = require('gulp-imagemin');

gulp.task('connect', function() {
  connect.server({
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
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./styles/**/*.scss', ['sass'])
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

gulp.task('images-min', function () {
    gulp.src('./images/**/*.jpg', {base: './images'})
        .pipe(imagemin({
            progressive: true,
        }))
        .pipe(gulp.dest('./dist/images/photos'));
});

gulp.task('images-lqt', function() {
    gulp.src('./images/**/*.jpg', {base: './images'})
    .pipe(gm(function(gmfile) {
        return gmfile.quality(10);
    }, {
        imageMagick: true
    }))
    .pipe(gulp.dest('./dist/images/lqt'));
});

gulp.task('images-mobile', function() {
    gulp.src('./images/**/*.jpg', {base: './images'})
    .pipe(gm(function(gmfile) {
        return gmfile.resize(null, 300);
    }, {
        imageMagick: true
    }))
    .pipe(gulp.dest('./dist/images/mobile'));
});

gulp.task('default', ['connect','sass:watch', 'html:watch', 'scripts:watch']);
gulp.task('build', ['sass','scripts']);
gulp.task('images', ['images-min','images-mobile','images-lqt']);
