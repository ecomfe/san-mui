/**
 * @file DialogButton component
 * @author zhouqinghuai@baidu.com
 */

import san from 'san';
import './Dialog.styl';

export default san.defineComponent({
    template: `
        <div class="sm-dialog-mask{{open | yesToBe(' sm-mask-show')}} {{!open | yesToBe('sm-mask-hide')}}"
        on-click="handleClick">
        </div>`,
    initData() {
        return {
            open: false
        };
    },
    handleClick() {
        this.data.set('open', false);
    }
});
