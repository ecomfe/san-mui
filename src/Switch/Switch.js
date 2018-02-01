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
            onValue: 'ON',
            offValue: 'OFF',
            value: 'OFF',
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
        onValue: DataTypes.oneOfType([DataTypes.string, DataTypes.bool]),
        offValue: DataTypes.oneOfType([DataTypes.string, DataTypes.bool]),
        value: DataTypes.oneOfType([DataTypes.string, DataTypes.bool]),
        label: DataTypes.string,
        labelLeft: DataTypes.bool,
        labelClass: DataTypes.string,
        trackClass: DataTypes.string,
        thumbClass: DataTypes.string,
        disabled: DataTypes.bool,
        inputValue: DataTypes.arrayOf(DataTypes.string)
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
        let {
            value,
            inputValue,
            onValue,
            offValue
        } = this.data.get();

        if (value === onValue && !inputValue[0]) {
            this.data.set('inputValue[0]', 'ON');
        }

        if (value === offValue && inputValue[0]) {
            this.data.set('inputValue', []);
        }
    },

    checkInputDataType() {
        const {onValue, offValue, value} = this.data.get();
        this.currentDataType = typeof onValue;
        if (this.currentDataType !== typeof offValue || this.currentDataType !== typeof value) {
            throw new Error(
                '[SAN-MUI ERROR] the data type of ("onValue", "offValue", "value") '
                + ' must be all the same in SWITCH component. '
            );
        }
    },

    attached() {
        this.checkInputDataType();
        this.dealInput();

        this.watch('value', val => {
            this.fire('input-change', val);
            this.checkInputDataType();
            this.dealInput();
        });
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
        if (this.data.get('disabled')) {
            return;
        }
        // 点击label，同时也会出发INPUT的点击事件。这里需要过滤一下，否则ripple会click两次
        if (e.target.tagName === 'INPUT') {
            return;
        }
        this.ref('ripple').click();
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
