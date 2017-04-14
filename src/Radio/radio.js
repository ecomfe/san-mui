/**
 * @file radio component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import icon from '../Icon';
import './radio.styl';
import template from './index.tpl';

export default san.defineComponent({
    template,
    components: {
        'sm-icon': icon
    },
    initData() {
        return {
            name: '',
            value: '',
            nativeValue: '',
            label: '',
            labelLeft: false,
            labelClass: '',
            disabled: false,
            uncheckIcon: '',
            checkedIcon: '',
            iconClass: '',
            inputValue: ''
        };
    },
    handleClick() {
      // 阻止事件冒泡，放置外部控制的时候触发两次 click
    },
    handleTouchStart(event) {
    },
    handleTouchEnd() {
    },
    handleChange() {
        let inputValue = this.data.get('inputValue');
        this.fire('change', inputValue);
    }
});
