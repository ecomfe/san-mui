/**
 * @file utils
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import config from './config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export function assetsPath(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'prod'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(config.build.assetsSubDirectory, _path);
}

export function cssLoaders(options = {}) {
    const generateLoaders = (loaders) => {
        const sourceLoader = loaders.map((loader) => {
            let extraParamChar;
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?');
                extraParamChar = '&';
            }
            else {
                loader = loader + '-loader';
                extraParamChar = '?';
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
        }).join('!');

        if (options.extract) {
            return ExtractTextPlugin.extract('style-loader', sourceLoader);
        }
        else {
            return ['style-loader', sourceLoader].join('!');
        }
    };
    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'postcss', 'stylus']),
        styl: generateLoaders(['css', 'postcss', 'stylus'])
    };
}

export function styleLoaders(options) {
    const output = [];
    const loaders = cssLoaders(options);
    for (const extension in loaders) {
        if (loaders.hasOwnProperty(extension)) {
            const loader = loaders[extension];
            output.push({
                test: new RegExp('\\.' + extension + '$'),
                loader: loader
            });
        }
    }
    return output;
}

export function getIP() {
    const ifaces = require('os').networkInterfaces();
    const defultAddress = '127.0.0.1';
    let ip = defultAddress;

    for (const dev in ifaces) {
        if (ifaces.hasOwnProperty(dev)) {
            /* jshint loopfunc: true */
            ifaces[dev].forEach(details => {
                if (ip === defultAddress && details.family === 'IPv4') {
                    ip = details.address;
                }
            });
        }
    }
    return ip;
}
