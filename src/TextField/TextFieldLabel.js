/**
 * @file textFieldLabel component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import './styles/label.styl';

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

    computeClass() {
        let float = this.data.get('float');
        let focus = this.data.get('focus');
        let focusClass = this.data.get('focusClass');
        let labelClass = '';
        if (float) {
            labelClass = labelClass + ' float';
        }
        if (focus && focusClass) {
            labelClass = labelClass + ' ' + focusClass;
        }
        this.data.set('labelClass', labelClass);
    },

    created() {
        this.watch('focus', val => {
            this.computeClass();
        });
    },

    attached() {
        this.computeClass();
    }
});
