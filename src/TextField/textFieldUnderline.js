/**
 * @file textFieldLabel component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import './styles/underline.styl';

export default san.defineComponent({
    template: `
        <div>
            <hr class="sm-text-field-line {{lineClass}}"/>
            <hr san-if="!disabled"
                class="sm-text-field-focus-line {{focusLineClass}}"
                style="{{errorColor | yesToBe('background-color:' + errorColor)}}"/>
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
        }
    },

    inited() {
    },
    compute() {
        // computed lineClass value
        let lineClass = '';
        lineClass += this.data.get('normalClass') + '';
        if (this.data.get('disabled')) {
            lineClass += 'disabled ';
        }
        this.data.set('lineClass', lineClass);
        // computed focusLineClass value
        let focusLineClass = '';
        if (this.data.get('error')) {
            focusLineClass += 'error ';
        }
        if (this.data.get('focus')) {
            focusLineClass += 'focus';
        }
        focusLineClass += this.data.get('focusClass') + ' ' + this.data.get('normalClass') + ' ';
        this.data.set('focusLineClass', focusLineClass);
    },
    attached() {
        this.compute();
        this.watch('focus', val => {
            this.compute();
        });
        this.watch('error', val => {
            this.compute();
        });
    }
});
