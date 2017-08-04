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

                if (!source.startsWith('.')) {
                    return;
                }

                let sourceFilePath = path.join(
                    path.dirname(state.file.opts.filename),
                    node.source.value
                );

                if (fs.existsSync(`${sourceFilePath}.js`)) {
                    return;
                }

                node.source.value = `${source}/index`;

            }
        }
    };
};
