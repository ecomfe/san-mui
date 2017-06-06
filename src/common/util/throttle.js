/**
* Copyright 2016 Baidu Inc. All rights reserved.
*
* @file function 相关的小工具
* @author leon <ludafa@outlook.com>
*/


/**
 * 限流
 *
 * @param  {Function} func       被限流的原函数
 * @param  {number}   wait       限流时间阀
 * @param  {Object}   options    选项
 * @return {Function}
 */
export function throttle(func, wait, options = {}) {

    let timeout;
    let context;
    let args;
    let result;
    let previous = 0;

    const later = function () {

        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);

        if (!timeout) {
            context = args = null;
        }

    };

    const throttled = function (...argus) {

        const now = new Date();

        if (!previous && options.leading === false) {
            previous = now;
        }

        const remaining = wait - (now - previous);

        context = this;
        args = argus;

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }

        return result;
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;

}