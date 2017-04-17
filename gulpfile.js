/**
 * @file build
 * @author ielgnaw(wuji0223@gmail.com)
 */

/* eslint-disable fecs-no-require */
/* eslint-disable fecs-arrow-body-style */

const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const babelHelpers = require('gulp-babel-external-helpers');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const path = require('path');

gulp.task('babel', () => {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(babelHelpers('babelHelpers.js', 'umd'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib'));
});

gulp.task('stylus', () => {
    return gulp.src('src/**/*.styl').pipe(gulp.dest('lib'));
});

gulp.task('css', () => {
    return gulp
        .src('src/**/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            'include css': true,
            'resolve url': true,
            'paths': [
                path.join(__dirname, './node_modules')
            ]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib'));
});

gulp.task('font', () => {
    return gulp.src('src/common/font/*').pipe(gulp.dest('lib/common/font'));
});

gulp.task('pkg', () => {
    return gulp.src([
        'package.json',
        'readme.md'
    ]).pipe(gulp.dest('lib'));
});

gulp.task('build', ['babel', 'stylus', 'font', 'pkg', 'css']);

gulp.task('clean', () => {
    return gulp.src('lib', {read: false}).pipe(clean());
});

gulp.task('rebuild', ['clean', 'build']);
