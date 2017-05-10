/**
 * @file webpack doc config
 * @author junmer
 */

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
        'process.env': config.build.env
    }),

    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '../example/index.html'),
        inject: true
    }),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),

    new RemoveScriptTagPlugin()

];

export default merge(baseWebpackConfig, {
    output: {
        path: path.join(__dirname, '../public')
    },
    entry: {
        index: './example/index'
    },
    module: {
        loaders: styleLoaders({sourceMap: false})
    },
    devtool: false,
    plugins: webpackPluginList
});
