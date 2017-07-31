/**
 * @file webpack dev config
 * @author ielgnaw(wuji0223@gmail.com)
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

module.exports = merge(baseWebpackConfig, {
    entry: {
        index: ['./tool/dev-client', './example/index']
    },
    module: {
        loaders: styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    devtool: '#eval-source-map',
    plugins: webpackPluginList.concat(new RemoveScriptTagPlugin())
});
