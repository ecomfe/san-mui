/**
 * @file switch component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import {CenterRipple} from '../Ripple';

export default san.defineComponent({
    template: `
        <label
            class="sm-switch {{labelLeft ? 'label-left' : '')}} {{disabled ? 'disabled' : ''}} {{!label ? 'no-label' : ''}}"
            on-click="handleClick">
            <input type="checkbox"
                disabled="{{disabled}}"
                value="{{value}}"
                on-change="handleChange($event)"
                checked="{= inputValue =}">
            <div class="sm-switch-wrapper">
                <div class="sm-switch-label {{labelClass}}" san-if="label && labelLeft">{{label}}</div>
                <div class="sm-switch-container">
                    <div class="sm-switch-track {{trackClass}}"></div>
                    <div class="sm-switch-thumb {{thumbClass}}">
                        <sm-center-ripple class="sm-switch-ripple-wrapper" san-ref="ripple"></sm-center-ripple>
                    </div>
                </div>
                <div class="sm-switch-label {{labelClass}}" san-if="label && !labelLeft">{{label}}</div>
            </div>
        </label>

    `,
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
