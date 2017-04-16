/**
 * @file testfield component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import './styles/textField.styl';
import Underline from './TextFieldUnderline';
import TextFieldLabel from './TextFieldLabel';
import TextFieldHint from './TextFieldHint';
import template from './TextField.tpl';
import EnhancedTextarea from './TextFieldEnhancedTextarea';
import Icon from '../Icon';
export default san.defineComponent({
    template,
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
            fullWidth: 0,
            underlineShow: true,
            underlineClass: '',
            underlineFocusClass: '',
            focus: false,
            inputValue: '',
            charLength: 0,
            float: '',
            multiLine: false,
            icon: ''
        };
    },
    filters: {
        isHintShow(focus, inputValue) {
            let labelFloat = this.data.get('labelFloat');
            if ((!labelFloat || focus) && !inputValue && inputValue !== 0) {
                return true;
            }
            return false;
        },
        isFieldLabelShow(labelFloat, focus, inputValue) {
            if (labelFloat === 'false') {
                labelFloat = false;
            }
            else {
                labelFloat = !!labelFloat;
            }
            if ((!labelFloat || focus) && !inputValue && inputValue !== 0) {
                return 'show';
            }
            return '';
        },
        getFloatValue(labelFloat, focus, inputValue) {
            if (labelFloat && !focus && !inputValue && inputValue !== 0) {
                return true;
            }
            return false;
        }

    },

    inited() {
        this.transBoolean('multiLine');
        this.transBoolean('labelFloat');
        this.transBoolean('fullWidth');
        this.transBoolean('disabled');
    },

    attached() {
        this.watch('inputValue', val => {
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
            // this.fire('input', val);
        });
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
