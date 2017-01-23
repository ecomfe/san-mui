/**
 * @file webpack prod config
 * @author ielgnaw(wuji0223@gmail.com)
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';

import RemoveScriptTagPlugin from './remove-script-tag-plugin';
import config from './config';
import {assetsPath, styleLoaders} from './util';
import baseWebpackConfig from './webpack.base.conf';

const env = config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        main: './src/index.js'
    },
    module: {
        loaders: styleLoaders({sourceMap: config.build.productionSourceMap, extract: true})
    },
    devtool: config.build.productionSourceMap ? '#eval-source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: 'san-mui.js',
        library: 'san-mui',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        san: {
            root: 'san',
            commonjs: 'san',
            commonjs2: 'san',
            amd: 'san'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
});

if (config.build.productionGzip) {
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

export default webpackConfig
