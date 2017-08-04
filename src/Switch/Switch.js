/**
 * @file switch component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san, {DataTypes} from 'san';
import {CenterRipple} from '../Ripple';
import cx from 'classnames';

export default san.defineComponent({
    template: `
        <label
            class="{{mainClass}}"
            on-click="handleClick">
            <input type="checkbox"
                disabled="{{disabled}}"
                value="ON"
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
            nativeValue: 'ON',
            onValue: 'ON',
            offValue: 'OFF',
            label: '',
            labelLeft: false,
            labelClass: '',
            trackClass: '',
            thumbClass: '',
            disabled: false,
            inputValue: []
        };
    },

    dataTypes: {
        name: DataTypes.string,
        nativeValue: DataTypes.string,
        onValue: DataTypes.string,
        offValue: DataTypes.string,
        label: DataTypes.string,
        labelLeft: DataTypes.bool,
        labelClass: DataTypes.string,
        trackClass: DataTypes.string,
        thumbClass: DataTypes.string,
        disabled: DataTypes.bool,
        inputValue: DataTypes.array
    },

    components: {
        'sm-center-ripple': CenterRipple
    },

    computed: {
        mainClass() {
            return cx(
                'sm-switch',
                {
                    'label-left': this.data.get('labelLeft'),
                    'disabled': this.data.get('disabled'),
                    'no-label': !this.data.get('label')
                }
            );
        }
    },

    dealInput() {
        let value = this.data.get('value');
        let inputValue = this.data.get('inputValue');
        let onValue = this.data.get('onValue');
        let offValue = this.data.get('offValue');
        let nativeValue = this.data.get('nativeValue');
        if (value === onValue && !inputValue[0]) {
            this.data.set('inputValue[0]', nativeValue);
        }
        if (value === offValue && inputValue[0]) {
            this.data.set('inputValue[0]', '');
        }
    },

    attached() {
        this.watch('value', val => {
            this.fire('input-change', val);
            this.dealInput();
        });
        this.dealInput();
        this.watch('inputValue', val => {
            let onValue = this.data.get('onValue');
            let offValue = this.data.get('offValue');
            if (val && val[0]) {
                this.data.set('value', onValue);
                return;
            }
            this.data.set('value', offValue);
        });
    },

    handleClick(e) {
        // 阻止事件冒泡，放置外部控制的时候触发两次 click
        if (!this.data.get('disabled')) {
            this.ref('ripple').click();
        }
    },
    handleChange(e) {
        this.fire('change', e);
    },
    handleMouseUp() {
    },
    handleMouseLeave() {
    },
    handleTouchStart(event) {
    },
    handleTouchEnd() {
    }
});
