/**
 * @file testfield component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san, {DataTypes} from 'san';
import Underline from './TextFieldUnderline';
import TextFieldLabel from './TextFieldLabel';
import TextFieldHint from './TextFieldHint';
import EnhancedTextarea from './TextFieldEnhancedTextarea';
import Icon from '../Icon';
import classNames from 'classnames';

export default san.defineComponent({
    template: `
<div class="{{computedClass}}"
    style="{{errorColor ? 'color:' + errorColor : ''}}">
    <sm-icon san-if="{{icon}}" class="sm-text-field-icon">{{icon}}</sm-icon>
    <div on-click="handleLabelClick" class="sm-text-field-content">
        <text-field-label
            san-if="{{label}}"
            float="{{getFloatValue}}"
            focus="{{focus}}"
            normalClass="{{labelClass}}"
            focusClass="{{labelFocusClass}}">
            <span>{{label}}</span>
        </text-field-label>
        <text-field-hint
            san-if="{{hintText}}"
            text="{{hintText}}"
            hintTextClass="{{hintTextClass}}"
            show="{{isHintShow}}">
        </text-field-hint>
            <slot>
                <input
                    san-if="!multiLine"
                    type="{{type}}"
                    value="{= inputValue =}"
                    disabled="{{disabled}}"
                    readonly="{{readOnly}}"
                    on-focus="handleFocus($event)"
                    on-input="handleChange($event)"
                    on-blur="handleBlur($event)"
                    on-keyup="handleKeyup($event)"
                    on-keypress="handleKeypress($event)"
                    on-keydown="handleKeydown($event)"
                    class="sm-text-field-input {{inputClass}}"/>
                <enhanced-textarea
                    san-if="multiLine"
                    normalClass="{{inputClass}}"
                    value="{= inputValue =}"
                    disabled="{{disabled}}"
                    readOnly="{{readOnly}}"
                    rows="{{rows}}"
                    rowsMax="{{rowsMax}}"
                    on-change="handleChange($event)"
                    on-focus="handleFocus($event)"
                    on-blur="handleBlur($event)"></enhanced-textarea>
            </slot>
        <underline
            san-if="underlineShow"
            error="{{!!errorText}}"
            disabled="{{disabled}}"
            errorColor="{{errorColor}}"
            focus="{{focus}}"
            normalClass="{{underlineClass}}"
            focusClass="{{underlineFocusClass}}">
        </underline>
        <div
            class="{{ComputedhelpTextClass}}"
            style="{{errorColor ? ('color:' + errorColor) : ''}}"
            san-if="errorText || helpText || maxLength > 0">
            <div>
                {{errorText || helpText}}
            </div>
            <div san-if="maxLength > 0">
                {{charLength}}/{{maxLength}}
            </div>
        </div>
    </div>
</div>
`,

    initData() {
        return {
            type: 'text',
            label: '',
            labelFloat: false,
            labelClass: '',
            labelFocusClass: '',
            hintText: '',
            hintTextClass: '',
            inputClass: '',
            errorText: '',
            errorColor: '',
            helpText: '',
            helpTextClass: '',
            maxLength: 0,
            disabled: false,
            readOnly: false,
            fullWidth: false,
            underlineShow: true,
            underlineClass: '',
            underlineFocusClass: '',
            focus: false,
            inputValue: '',
            charLength: 0,
            multiLine: false,
            icon: ''
        };
    },

    dataTypes: {
        type: DataTypes.string,
        label: DataTypes.string,
        labelFloat: DataTypes.bool,
        labelClass: DataTypes.string,
        labelFocusClass: DataTypes.string,
        hintText: DataTypes.string,
        hintTextClass: DataTypes.string,
        inputClass: DataTypes.string,
        errorText: DataTypes.string,
        errorColor: DataTypes.string,
        helpText: DataTypes.string,
        helpTextClass: DataTypes.string,
        maxLength: DataTypes.number,
        disabled: DataTypes.bool,
        readOnly: DataTypes.bool,
        fullWidth: DataTypes.bool,
        underlineShow: DataTypes.bool,
        underlineClass: DataTypes.string,
        underlineFocusClass: DataTypes.string,
        focus: DataTypes.bool,
        inputValue: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        charLength: DataTypes.number,
        multiLine: DataTypes.bool,
        icon: DataTypes.string
    },

    computed: {
        computedClass() {
            let focus = this.data.get('focus');
            let label = this.data.get('label');
            let errorText = this.data.get('errorText');
            let disabled = this.data.get('disabled');
            let fullWidth = this.data.get('fullWidth');
            let multiLine = this.data.get('multiLine');
            let icon = this.data.get('icon');
            return classNames(
                'sm-text-field',
                focus ? 'focus-state' : '',
                label ? 'has-label' : '',
                errorText ? 'error' : '',
                disabled ? 'disabled' : '',
                fullWidth ? 'full-width' : '',
                multiLine ? 'multi-line' : '',
                icon ? 'has-icon' : ''
            );
        },
        isHintShow() {
            let focus = this.data.get('focus');
            let inputValue = this.data.get('inputValue');
            let labelFloat = this.data.get('labelFloat');
            if ((!labelFloat || focus) && !inputValue && inputValue !== 0) {
                return true;
            }
            return false;
        },
        getFloatValue() {
            let focus = this.data.get('focus');
            let inputValue = this.data.get('inputValue');
            let labelFloat = this.data.get('labelFloat');
            if (labelFloat && !focus && !inputValue && inputValue !== 0) {
                return true;
            }
            return false;
        },
        ComputedhelpTextClass() {
            let helpTextClass = this.data.get('helpTextClass');
            return classNames(
                'sm-text-field-help',
                helpTextClass ? helpTextClass : ''
            );
        }
    },

    inited() {
        this.transBoolean('multiLine');
        this.transBoolean('labelFloat');
        this.transBoolean('fullWidth');
        this.transBoolean('disabled');
        let inputValue = this.data.get('inputValue');
        this.calcCharLength(inputValue);
    },

    attached() {
        this.watch('inputValue', val => {
            this.calcCharLength(val);
        });
    },

    calcCharLength(val) {
        val = val + '';
        let charLength = 0;
        let maxLength = +this.data.get('maxLength');
        charLength = maxLength && val ? val.length : 0;
        this.data.set('charLength', charLength);
        let isTextOverflow = this.data.get('isTextOverflow');
        if (charLength > maxLength && !isTextOverflow) {
            this.data.set('isTextOverflow', true);
            this.fire('textOverflow', 'true');
        }
        if (isTextOverflow && charLength <= maxLength) {
            this.data.set('isTextOverflow', false);
            this.fire('textOverflow', 'false');
        }
    },

    handleFocus(event) {
        this.data.set('focus', true);
        this.fire('input-focus', event);
    },
    handleBlur(event) {
        this.data.set('focus', false);
        this.fire('input-blur', event);
    },
    handleChange(event) {
        this.fire('input-change', event);
    },
    handleKeyup(event) {
        this.fire('input-keyup', event);
    },
    handleKeypress(event) {
        this.fire('input-keypress', event);
    },
    handleKeydown(event) {
        this.fire('input-keydown', event);
    },

    /**
     * 布尔值转换，字符串false转换为布尔值false，其他则按正常转换进行转换
     *
     * @param  {string} key 要转换的数据key
     */
    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value === 'false' ? false : !!value);
    },
    components: {
        'sm-icon': Icon,
        'underline': Underline,
        'enhanced-textarea': EnhancedTextarea,
        'text-field-label': TextFieldLabel,
        'text-field-hint': TextFieldHint
    }
});
