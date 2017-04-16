/**
 * @file switch component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import './switch.styl';
import template from './index.tpl';
import {CenterRipple} from '../Ripple';

export default san.defineComponent({
    template,
    initData() {
        return {
            name: '',
            value: 'ON',
            label: '',
            labelLeft: '',
            labelClass: '',
            trackClass: '',
            thumbClass: '',
            disabled: false,
            inputValue: []
        };
    },

    components: {
        'sm-center-ripple': CenterRipple
    },

    attached() {
    },

    handleClick(e) {
        // 阻止事件冒泡，放置外部控制的时候触发两次 click
        this.ref('ripple').click();
    },
    handleMouseUp() {
    },
    handleMouseLeave() {
    },
    handleTouchStart(event) {
    },
    handleTouchEnd() {
    },
    handleChange(event) {
        let inputValue = this.data.get('inputValue');
        this.fire('change', inputValue);
    }
});
