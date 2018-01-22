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
            'karma-chrome-launcher',
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
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            reporters: [
                {type: 'text', dir: path.join(__dirname, './coverage')},
                {type: 'text-summary', dir: path.join(__dirname, './coverage')},
                {type: 'lcov', dir: path.join(__dirname, './coverage'), subdir: 'report-html'}
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [process.env.TRAVIS ? 'PhantomJS' : 'Chrome'],
        singleRun: true,
        concurrency: Infinity,
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['', '.js', '.san', '.styl'],
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
                    },
                    {
                        test: /\.styl$/,
                        loader: 'style-loader!css-loader!stylus-loader'
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
