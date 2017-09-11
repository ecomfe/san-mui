/**
 * @file enhancedTextarea component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <div class="sm-text-field-multiline">
            <textarea class="sm-text-field-textarea-hide sm-text-field-input" value="{= value =}"></textarea>
            <textarea class="sm-text-field-input sm-text-field-textarea {{normalClass}}"
                value="{= value =}"
                on-input="handleInput($event)"
                on-focus="handleFocus($event)"
                on-blur="handleBlur($event)"
                placeholder="{{placeholder}}"
                readonly="{{readOnly}}"
                disabled="{{disabled}}"/>
        </div>
    `,
    initData() {
        return {
            placeholder: '',
            value: '',
            rows: 0,
            rowsMax: 0,
            disabled: false,
            normalClass: ''
        };
    },
    resizeTextarea() {
        let element = null;
        let textareas = document.getElementsByClassName('sm-text-field-textarea');
        Array.prototype.forEach.call(textareas, item => {
            if (this.el.contains(item)) {
                if (this.el.contains(item)) {
                    element = item;
                }
            }
        });
        if (!element) {
            return;
        }
        let hiddenEl = null;
        let hiddenTextareas = document.getElementsByClassName('sm-text-field-textarea-hide');
        Array.prototype.forEach.call(hiddenTextareas, item => {
            if (this.el.contains(item)) {
                if (this.el.contains(item)) {
                    hiddenEl = item;
                }
            }
        });
        let lineHeight = window.getComputedStyle(element, null).getPropertyValue('line-height');
        lineHeight = +lineHeight.replace(/[^\d]*/g, '');
        let pt = window.getComputedStyle(element, null).getPropertyValue('padding-top');
        pt = +pt.replace(/[^\d]*/g, '');
        let pd = window.getComputedStyle(element, null).getPropertyValue('padding-bottom');
        pd = +pd.replace(/[^\d]*/g, '');
        let rows = this.data.get('rows') || 0;
        let rowsMax = this.data.get('rowsMax') || 0;
        let minHeight = pd + pt + lineHeight * rows;
        let maxHeight = pd + pt + lineHeight * rowsMax;
        let height = hiddenEl.scrollHeight;
        let styleHeight = height < minHeight
            ? minHeight : height > maxHeight && maxHeight > 0 ? maxHeight : height;
        element.style.height = `${styleHeight}px`;
    },
    handleInput(e) {
        this.fire('change', e.target.value);
    },
    handleFocus(e) {
        this.fire('focus', e);
    },
    handleBlur(e) {
        this.fire('blur', e);
    },

    attached() {
        this.resizeTextarea();
        this.watch('value', value => {
            setTimeout(() => {
                this.resizeTextarea();
            }, 1);
        });
    }
});
