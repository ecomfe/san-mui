/**
 * @file textFieldLabel component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import classNames from 'classnames';

export default san.defineComponent({
    template: `
        <div>
            <hr class="{{computedClass}}"/>
            <hr san-if="!disabled"
                class="{{focusLineClass}}"
                style="{{errorColor ? ('background-color:' + errorColor) : ''}}"/>
        </div>
    `,
    initData() {
        return {
            focus: false,
            error: false,
            errorColor: '',
            disabled: false,
            normalClass: '',
            focusClass: '',
            focusLineClass: '',
            lineClass: ''
        };
    },

    computed: {
        computedClass() {
            // computed lineClass value
            let disabled = this.data.get('disabled');
            let normalClass = this.data.get('normalClass');
            return classNames(
                'sm-text-field-line',
                {disabled},
                normalClass ? normalClass : ''
            );
        },

        focusLineClass() {
            let error = this.data.get('error');
            let focus = this.data.get('focus');
            let focusClass = this.data.get('focusClass');
            let normalClass = this.data.get('normalClass');
            return classNames(
                'sm-text-field-focus-line',
                normalClass ? normalClass : '',
                {error},
                {focus},
                focus ? focusClass : ''
            );
        }
    }
});
