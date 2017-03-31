/**
 * @file DialogButton component
 * @author zhouqinghuai@baidu.com
 */

import san from 'san';
import './Dialog.styl';

export default san.defineComponent({
    template: `
        <div class="sm-dialog-button">
            <slot></slot>
        </div>`
});
