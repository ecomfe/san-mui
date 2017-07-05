/**
 * @file config
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import prodEnv from './prod.env';
import devEnv from './dev.env';

export default {
    build: {
        env: prodEnv,
        index: path.resolve(__dirname, '../example/index.html'),
        assetsRoot: path.resolve(__dirname, '../lib'),
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: devEnv,
        port: 8005,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false,
    }
}
