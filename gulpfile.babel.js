/**
 * @file build
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import gulp from 'gulp';
import clean from 'gulp-clean';
import sourcemaps from 'gulp-sourcemaps';
import gulpWebpack from 'gulp-webpack';
import merge from 'webpack-merge';
import config from './tool/config';
import {assetsPath, styleLoaders} from './tool/util';
import buildWebpackConfig from './tool/webpack.build.conf';

const env = config.build.env;

const EXAMPLE_ROOT = path.resolve(__dirname, './example');
const SRC_ROOT = path.resolve(__dirname, './src');

gulp.task('babel', () => {
    return gulp.src('src/**/*.js')
        .pipe(gulpWebpack(buildWebpackConfig))
        .pipe(sourcemaps.init())
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
