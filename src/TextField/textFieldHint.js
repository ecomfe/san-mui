/**
 * @file textFieldHint component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import './styles/hint.styl';

export default san.defineComponent({
    template: `
        <div class="sm-text-field-hint {{show | yesToBe('show')}} {{hintTextClass}}">
            {{text}}
        </div>
    `,
    initData() {
        return {
            text: '',
            show: true
        }
    }
});
