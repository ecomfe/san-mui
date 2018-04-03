/**
 * @file Date
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {create} from '../common/util/cx';

const cx = create('date-picker-date');

export default san.defineComponent({

    template: `
        <div class="{{computedClassName}}" on-click="click">
            <div class="${cx.getPartClassName('cell')}">
                {{part ? '' : date }}
            </div>
        </div>
    `,

    computed: {
        computedClassName() {
            let weekend = this.data.get('weekend');
            let active = this.data.get('active');
            let today = this.data.get('today');
            let part = this.data.get('part');
            let disabled = this.data.get('disabled');
            return cx(this)
                .addVariants(part)
                .addStates({
                    weekend,
                    active,
                    today,
                    disabled
                }).build();
        }
    },

    click() {
        if (!this.data.get('disabled')) {
            this.fire('pick');
        }
    }
});
