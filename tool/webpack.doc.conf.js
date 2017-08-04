/**
 * @file webpack doc config
 * @author junmer
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {styleLoaders} = require('./util');
const config = require('./config');
const baseWebpackConfig = require('./webpack.base.conf');
const RemoveScriptTagPlugin = require('./remove-script-tag-plugin');

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

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.join(__dirname, '../public'),
        publicPath: ''
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
