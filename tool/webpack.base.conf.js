/**
 * @file webpack base config
 * @author ielgnaw(wuji0223@gmail.com)
 */

/* eslint-disable fecs-no-require */

import path from 'path';
import autoprefixer from 'autoprefixer';
import rider from 'rider';

import config from './config';
import {assetsPath} from './util';
import webpack from 'webpack';

const EXAMPLE_ROOT = path.resolve(__dirname, '../example');
const SRC_ROOT = path.resolve(__dirname, '../src');

export default {
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.san'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            src: SRC_ROOT,
            san: 'san/src/main'
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    postcss: [
        autoprefixer({
            browsers: ['iOS >= 7', 'Android >= 4.0']
        })
    ],
    stylus: {
        use: [rider()]
    },
    plugins: [
        new webpack.WatchIgnorePlugin([
            /\.cache/
        ])
    ],
    module: {
        loaders: [
            {
                test: /\.san$/,
                loader: 'san-loader'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: [
                    EXAMPLE_ROOT,
                    SRC_ROOT,
                    path.resolve(__dirname) // for dev-client.js es6 syntax
                ]
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
                test: /\.(html|tpl)(\?.*)?$/,
                loader: 'html-loader'
            },
            {
                test: /\.md$/,
                loader: 'san-markdown-loader'
            }
        ]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    }
};
