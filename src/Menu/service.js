/**
 * @file services of Menu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

export default {

    getStyle(selector, propName, isNum = true, clearRegFilter = 'px') {
        let computedStyle
            = window.getComputedStyle(
                document.querySelector(selector)
            )[propName]
            .replace(new RegExp(clearRegFilter), '');

        return isNum ? +computedStyle : computedStyle;
    }
}