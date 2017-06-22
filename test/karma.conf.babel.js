/**
 * @file Karma config
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import webpack from 'webpack';
import {assetsPath} from '../tool/util';

const SRC_ROOT = path.resolve(__dirname, '../src');

export default function (config) {
    config.set({
        basePath: '../',
        frameworks: ['mocha', 'chai'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            {
                pattern: 'test/karma.adapter.js',
                watched: false,
                served: true,
                included: true
            }
        ],
        plugins: [
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-babel-preprocessor'
        ],
        exclude: [],
        preprocessors: {
            'test/karma.adapter.js': ['webpack', 'sourcemap']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: process.env.NODE_ENV !== 'test',
        concurrency: Infinity,
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['', '.js', '.san'],
                fallback: [path.join(__dirname, '../node_modules')],
                alias: {
                    src: SRC_ROOT
                }
            },
            module: {
                loaders: [
                    {
                        test: /\.san$/,
                        loader: 'san-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.js?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015', 'stage-1'],
                            plugins: [
                                ['transform-runtime', {
                                    polyfill: false,
                                    regenerator: false
                                }]
                            ]
                        }
                    },
                    {
                        test: /\.json$/,
                        loader: 'json-loader'
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                        loader: 'url-loader',
                        query: {
                            limit: 100000,
                            name: assetsPath('img/[name].[hash:7].[ext]')
                        }
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                        loader: 'url-loader',
                        query: {
                            limit: 100000,
                            name: assetsPath('fonts/[name].[hash:7].[ext]')
                        }
                    }
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('test')
                })
            ]
        },
        webpackServer: {
            noInfo: true
        }
    });
}
