/**
 * @file check component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import icon from '../Icon';
import {CenterRipple} from '../Ripple';

export default san.defineComponent({
    template: `
        <label on-click="handleClick"
            class="sm-checkbox {{labelLeft ? 'label-left' : '')}} {{disabled ? 'disabled' : ''}} {{!label ? 'no-label' : ''}}">
            <input type="checkbox"
                disabled="{{disabled}}"
                name="{{name}}"
                value="{{nativeValue}}"
                on-change="handleChange"
                checked="{=inputValue=}">
            <div class="sm-checkbox-wrapper">
                <div class="sm-checkbox-label {{labelClass}}" san-if="label && labelLeft">{{label}}</div>
                <div class="sm-checkbox-icon">
                    <sm-center-ripple class="sm-checkbox-ripple-wrapper" san-ref="ripple"></sm-center-ripple>
                    <svg class="sm-checkbox-icon-uncheck sm-checkbox-svg-icon {{iconClass}}" san-if="!checkedIcon" viewBox="0 0 24 24">
                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <svg class="sm-checkbox-icon-checked sm-checkbox-svg-icon {{iconClass}}" san-if="!uncheckIcon" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                <sm-icon san-if="uncheckIcon" class="sm-checkbox-icon-uncheck {{iconClass}}">{{uncheckIcon}}</sm-icon>
                <sm-icon san-if="checkedIcon" class="sm-checkbox-icon-checked {{iconClass}}">{{checkedIcon}}</sm-icon>
                </div>
                <div class="sm-checkbox-label {{labelClass}}" san-if="label && !labelLeft">{{label}}</div>
                </div>
        </label>
    `,
    components: {
        'sm-icon': icon,
        'sm-center-ripple': CenterRipple
    },
    initData() {
        return {
            name: '',
            value: '',
            nativeValue: '',
            label: '',
            labelLeft: false,
            labelClass: '',
            uncheckIcon: '',
            checkedIcon: '',
            iconClass: '',
            inputValue: ''
        };
    },
    handleClick(e) {
        // 阻止事件冒泡，放置外部控制的时候触发两次 click
        this.ref('ripple').click();
    },
    handleTouchStart(event) {
    },
    handleTouchEnd() {
    },
    handleChange() {
        let inputValue = this.data.get('inputValue');
        this.fire('change', inputValue);
    },
    attached() {
    }
});
