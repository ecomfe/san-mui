/**
 * @file 构建文档
 * @author junmer
 */

const webpack = require('webpack');
const rm = require('rimraf');
const ora = require('ora');
const chalk = require('chalk');
const webpackConfig = require('./webpack.doc.conf');

const spinner = ora('building for doc...');
spinner.start();

rm(webpackConfig.output.path, err => {

    if (err) {
        throw err;
    }

    webpack(webpackConfig, (err, stats) => {

        spinner.stop();

        if (err) {
            throw err;
        }

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow(''
            + '  Tip: built files are meant to be served over an HTTP server.\n'
            + '  Opening index.html over file:// won\'t work.\n'
        ));
    });

});
