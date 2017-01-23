/**
 * @file Karma config
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import webpack from 'webpack';


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
                included: true,
            }
        ],
        plugins: [
            'karma-coverage',
            'karma-chrome-launcher',
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
            // 'src/**/*.js': ['coverage'],
            // 'src/**/*.san': ['coverage'],
            // 'test/**/*.js': ['webpack', 'sourcemap']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                    {test: /\.san$/, exclude: /node_modules/, loader: 'san-loader'}
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
};
