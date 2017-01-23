/**
 * @file 去掉 tpl 中带有 src 属性的 script 标签，webpack dev/build 时会插入带有 hash 的标签
 * @author ielgnaw(wuji0223@gmail.com)
 */

import cheerio from 'cheerio';

export default class RemoveScriptTagPlugin {
    apply(compiler) {
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
                const $ = cheerio.load(htmlPluginData.html);

                // 去掉 tpl 中带有 replace 属性的 script 标签
                $('script[replace="1"]').remove();

                htmlPluginData.html = $.html({
                    decodeEntities: false
                });

                callback(null, htmlPluginData);
            });
        });
    }
};
