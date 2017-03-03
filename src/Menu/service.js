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
     * 获取元素的computedStyle
     *
     * @param {string} selector 元素选择器
     * @param {string} prop 需获取的属性
     * @return {number|*} 属性值，主要为宽高等信息
     */
    getComputedStyle(selector, prop) {
        return +window.getComputedStyle(
            document.querySelector(selector)
        )[prop].replace('px', '');
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

        let toUpper = (string) => {
            return string.replace(/-(\w)/g, ($0, $1) => {
                return $1.toUpperCase();
            });
        };

        for (let i in prefix) {
            let str = toUpper(prefix[i] + '-' + prop);
            testProps.push(str);
        }

        for (let i in testProps) {
            if (testProps[i] in htmlStyle) {
                return true;
            }

            return false;
        } 
    }  
};
