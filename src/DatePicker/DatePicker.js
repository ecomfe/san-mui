/**
 * @file DatePicker
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {create} from '../common/util/cx';

const cx = create('date-picker');

export default san.defineComponent({

    template: `
        <div class="{{computedClassName}}" ref="anchor">
            <div class="${cx.getPartClassName('value')}">{{placeholder || value}}</div>
            <san-layer open="{{open}}" anchor="{{anchor}}">
                <san-month-view month="" />
            </san-layer>
        </div>
    `,

    computed: {
        computedClassName() {
            return cx(this).build();
        }
    },

    initData() {
        return {
            open: false,
            placeholder: '选择日期'
        };
    }

});
