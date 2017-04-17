/**
 * @file build
 * @author ielgnaw(wuji0223@gmail.com)
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import babelHelpers from 'gulp-babel-external-helpers';
import sourcemaps from 'gulp-sourcemaps';

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
