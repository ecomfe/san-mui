/**
 * @file Tab
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {TouchRipple} from '../Ripple';
import {create} from '../common/util/cx';

const cx = create('tab');

export default san.defineComponent({

    components: {
        'san-touch-ripple': TouchRipple
    },

    template: `
        <div class="{{computedClassName}}">
            <slot name="icon" />
            <slot name="label" />
            <san-touch-ripple />
        </div>
    `,

    computed: {
        computedClassName() {
            let active = this.data.get('active');
            return cx(this).addStates({active}).build();
        }
    }

});
