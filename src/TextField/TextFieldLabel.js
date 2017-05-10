/**
 * @file textFieldLabel component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <div class="sm-text-field-label {{labelClass}}">
          <slot></slot>
        </div>
    `,
    initData() {
        return {
            text: '',
            show: true,
            labelClass: ''
        };
    },

    computed: {
        labelClass() {
            let float = this.data.get('float');
            let focus = this.data.get('focus');
            let focusClass = this.data.get('focusClass');
            let labelClass = this.data.get('normalClass');
            if (float) {
                labelClass = labelClass + ' float';
            }
            if (focus && focusClass) {
                labelClass = labelClass + ' ' + focusClass;
            }
            return labelClass;
        }
    },

    created() {
    },

    attached() {
    }
});
