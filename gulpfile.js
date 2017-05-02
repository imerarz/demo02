'use strict';
const gulp   = require('gulp');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['watch']);

gulp.task('watch', function () {
    gulp.watch(['src/index.js', 'src/js/**/*.js'], ['jshint'])
});

gulp.task('jshint', function () {
    return gulp.src(['src/index.js', 'src/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
    return gulp.src(['src/index.js', 'src/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js'));
});