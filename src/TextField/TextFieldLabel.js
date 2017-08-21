/**
 * @file textFieldLabel component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import classNames from 'classNames';

export default san.defineComponent({
    template: `
        <div class="{{labelClass}}">
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
            return classNames(
                'sm-text-field-label',
                {float},
                focus ? focusClass : '',
                labelClass ? labelClass : ''
            )
        }
    }
});
