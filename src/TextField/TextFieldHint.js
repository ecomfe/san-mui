/**
 * @file textFieldHint component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import classNames from 'classnames';
import {create} from '../common/util/cx';
const cx = create('text-field-hint');

export default san.defineComponent({
    template: `
        <div class="{{computedClass}}">
            {{text}}
        </div>
    `,
    initData() {
        return {
            text: '',
            show: true
        };
    },
    computed: {
        computedClass() {
            let show = this.data.get('show');
            let hintTextClass = this.data.get('hintTextClass');
            return classNames(
                cx(this).addStates({show}).build(),
                hintTextClass ? hintTextClass : ''
            );
        }
    }
});
