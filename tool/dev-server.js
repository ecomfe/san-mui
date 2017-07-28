/**
 * @file dev server
 * @author ielgnaw(wuji0223@gmail.com)
 */

/* eslint-disable fecs-no-require */
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const proxyMiddleware = require('http-proxy-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./config');
const ajaxMiddleware = require('./ajax-middleware');
const {getIP} = require('./util');
const devConf = require('./webpack.dev.conf');

const webpackConfig = devConf;

const port = process.env.PORT || config.dev.port;
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

const hotMiddleware = webpackHotMiddleware(compiler);
compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({action: 'reload'});
        cb();
    });
});

Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options
        };
    }
    app.use(proxyMiddleware(context, options));
});

app.use(devMiddleware);

app.use(hotMiddleware);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(ajaxMiddleware);

app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + ' or http://' + getIP() + ':' + port + '\n');
});
