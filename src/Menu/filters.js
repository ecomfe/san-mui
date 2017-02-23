/**
 * @file filters of Menu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

let nameReseter = (str = '') => str.replace(/([A-Z])/g, '-$1').toLowerCase();

export const padStyles = (styles = null, result = '') => {
    if (!styles) {
        return;
    }

    for (let key of Object.keys(styles)) {
        result += `${nameReseter(key)}:${styles[key]};`;
    }

    return result;
};
