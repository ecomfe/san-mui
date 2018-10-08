/**
 * @file enhancedTextarea component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <div class="sm-text-field-multiline">
            <textarea s-ref="text-field-hidden" class="sm-text-field-textarea-hide sm-text-field-input" value="{=value=}"></textarea>
            <textarea s-ref="text-field" class="sm-text-field-input sm-text-field-textarea {{normalClass}}"
                value="{= value =}"
                on-input="handleInput($event)"
                on-focus="handleFocus($event)"
                on-blur="handleBlur($event)"
                on-keyup="handleKeyup($event)"
                on-keypress="handleKeypress($event)"
                on-keydown="handleKeydown($event)"
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
        let element = this.ref('text-field');
        let hiddenEl = this.ref('text-field-hidden');
        let lineHeight = window.getComputedStyle(element, null).getPropertyValue('line-height');
        lineHeight = parseFloat(lineHeight);
        let pt = window.getComputedStyle(element, null).getPropertyValue('padding-top');
        pt = parseFloat(pt);
        let pd = window.getComputedStyle(element, null).getPropertyValue('padding-bottom');
        pd = parseFloat(pd);
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
        this.fire('input', e);
    },
    handleFocus(e) {
        this.fire('focus', e);
    },
    handleBlur(e) {
        this.fire('blur', e);
    },
    handleKeydown(e) {
        this.fire('keydown', e);
    },
    handleKeyup(e) {
        this.fire('keyup', e);
    },
    handleKeypress(e) {
        this.fire('keypress', e);
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
