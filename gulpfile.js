'use strict';
const gulp   = require('gulp');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const streamify = require('gulp-streamify');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');

const budo = require('budo');
const hbsfy = require('hbsfy');
const browserify = require('browserify');
const es2015 = require('babel-preset-es2015');
const babelify = require('babelify').configure({
    presets: [es2015]
});

gulp.task('default', ['budo']);

gulp.task('watch', function () {
    gulp.watch(['src/index.js', 'src/js/**/*.js'], ['jshint']);    
});

gulp.task('jshint', function () {
    return gulp.src(['src/index.js', 'src/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('budo',['watch'], function(){
    budo('./src/index.js', {
        serve: 'js/bundle.js',
        stream: process.stdout,
        live: true,
        dir: 'app',
        open: true,
        transform: [hbsfy, babelify] 
    });
});

gulp.task('browserify', function(){
    let bundler = browserify('./src/index.js', { 
            transform: [hbsfy, babelify] 
        }).bundle();
    return bundler
        .pipe(source('index.js'))
        .pipe(streamify(uglify()))
        .pipe(rename('js/bundle.js'))
        .pipe(gulp.dest('./app'))
});
