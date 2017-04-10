/**
 * @file san-mui/Button
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {create} from '../common/util/cx';
import {TouchRipple} from '../Ripple';

console.log(TouchRipple);

const cx = create('button');

export default san.defineComponent({

    components: {
        'san-touch-ripple': TouchRipple
    },

    template: `
        <button
            class="{{computedClassName}}"
            disabled="{{disabled}}">
            <slot></slot>
            <san-touch-ripple />
        </button>
    `,

    computed: {
        computedClassName() {
            return cx(this).build();
        }
    }

});
