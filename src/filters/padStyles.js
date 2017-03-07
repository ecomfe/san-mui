/**
 * @file 展开styles对象
 * @author qiusiqi(qiusiqi@baidu.com)
 */

// eg: A -> -a
let nameReseter = (str = '') => str.replace(/([A-Z])/g, '-$1').toLowerCase();

/**
 * 根据用户定制样式，打平为style可用属性及属性值对
 *
 * @param {Object} styles 用户定制样式
 * @return {string} style
 */
export default function (styles = null) {
    if (!styles) {
        return;
    }

    let result = '';
    for (let key of Object.keys(styles)) {
        result += `${nameReseter(key)}:${styles[key]};`;
    }

    return result;
}
