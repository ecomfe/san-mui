/**
 * @file services of Menu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

export default {

    /**
     * 获取元素的offset
     *
     * @param {string} selector 元素选择器
     * @param {string} prop 需获取的offset属性
     * @return {number} offset
     */
    getOffset(selector, prop = '') {
        if (!selector) {
            return;
        }

        prop = prop[0].toUpperCase() + prop.slice(1);
        return document.querySelector(selector)[`offset${prop}`];
    },

    /**
     * 属性类型转换
     *
     * @param {*} val 需要转换的值
     * @param {string} type 目标类型（b - boolean，n - number，s - string）
     * @return {*} 目标值
     */
    propConvert(val, type) {
        switch (type) {
            case 'b':
                if (val === 'true') {
                    return true;
                }
                if (val === 'false') {
                    return false;
                }
                return val;

            case 'n': return +val;

            case 's': return val + '';
        }

        return val;
    },

    /**
     * 判断浏览器是否某个css3属性
     *
     * @param {string} prop 属性
     * @return {boolean} 是否支持
     */
    isSupportCSS3(prop) {
        let prefix = ['webkit', 'ms', 'o', 'moz', ''];
        let htmlStyle = document.documentElement.style;
        let testProps = [];

        for (let p of prefix) {
            testProps.push(toUpper(p + '-' + prop));
        }

        for (let tProp of testProps) {
            if (tProp in htmlStyle) {
                return true;
            }

            return false;
        }
    }
};

function toUpper(string) {
    return string.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase());
}
