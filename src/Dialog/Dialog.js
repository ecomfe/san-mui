/**
 * @file Dialog component
 * @author zhouqinghuai@baidu.com
 */

import san from 'san';
import './Dialog.styl';
import template from './Dialog.tpl';

export default san.defineComponent({
    template,
    initData() {
        let options = {
            title: 'this is a title!',
            open: false,
            showTitle: false,
            dialogClass: '',
            titleClass: '',
            contentClass: '',
            footerClass: ''
        };
        return options;
    }
});
