/**
 * @file webpack dev config
 * @author ielgnaw(wuji0223@gmail.com)
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import {styleLoaders} from './util';
import config from './config';
import baseWebpackConfig from './webpack.base.conf';
import RemoveScriptTagPlugin from './remove-script-tag-plugin';

/**
 * webpack plugin 集合
 *
 * @type {Array}
 */
const webpackPluginList = [
    new webpack.DefinePlugin({
        'process.env': config.dev.env
    }),

    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoErrorsPlugin(),

    new webpack.optimize.DedupePlugin(),

    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '../example/index.html'),
        inject: true
    })
];

export default merge(baseWebpackConfig, {
    entry: {
        index: ['./tool/dev-client', './example/index']
    },
    module: {
        loaders: styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    devtool: '#eval-source-map',
    plugins: webpackPluginList.concat(new RemoveScriptTagPlugin())
});
