/**
 * @file dev env
 * @author leon <ludafa@outlook.com>
 */

const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: JSON.stringify('dev')
});
