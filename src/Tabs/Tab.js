/**
 * @file Tab
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {TouchRipple} from '../Ripple';
import {create} from '../common/util/cx';

import {TAB_INIT, TAB_ACTIVE, TAB_DISPOSE} from './constant';

const cx = create('tab');

export default san.defineComponent({

    components: {
        'san-touch-ripple': TouchRipple
    },

    template: `
        <div class="{{computedClassName}}" on-click="click">
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
    },

    inited() {
        this.dispatch(TAB_INIT);
    },

    click() {
        if (!this.data.get('active')) {
            this.dispatch(TAB_ACTIVE);
        }
    },

    detached() {
        this.dispatch(TAB_DISPOSE);
    }

});
