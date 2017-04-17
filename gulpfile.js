/**
 * @file build
 * @author ielgnaw(wuji0223@gmail.com)
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const babelHelpers = require('gulp-babel-external-helpers');
const sourcemaps = require('gulp-sourcemaps');

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

gulp.task('font', () => {
    return gulp.src('src/font/*').pipe(gulp.dest('lib/font'));
});

gulp.task('pkg', () => {
    return gulp.src([
        'package.json',
        'readme.md'
    ]).pipe(gulp.dest('lib'));
});

gulp.task('build', ['babel', 'stylus', 'font', 'pkg']);

gulp.task('clean', () => {
    return gulp.src('lib', {read: false}).pipe(clean());
});

gulp.task('rebuild', ['clean', 'build']);
