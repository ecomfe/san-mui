/**
 * @file babel directory index plugin
 * @author leon <ludafa@outlook.com>
 */

// 将 import Button from './Button' 转成 import Button from './Button/index';

const path = require('path');
const fs = require('fs');



module.exports = function ({types: t}) {
    return {
        visitor: {
            ImportDeclaration({node}, state) {

                let source = node.source.value;

                // 不是相对引入不管
                if (!source.startsWith('.')) {
                    return;
                }

                if (path.extname(source)) {
                    console.error(`${state.file.opts.filename} 引入了 ${source} 文件！`);
                    throw new Error('');
                }

                // 得到依赖模块的位置
                let sourceFilePath = path.join(
                    path.dirname(state.file.opts.filename),
                    source
                );

                // 假如 import Button from './Button' 指定 ./Button.js 存在
                // 那么说明这不是一个目录，直接返回
                if (fs.existsSync(`${sourceFilePath}.js`)) {
                    return;
                }

                node.source.value = `${source}/index`;

            }
        }
    };
};
