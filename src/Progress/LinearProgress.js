/**
 * @file Progress
 * @author leon <ludafa@outlook.com>
 */

import san, {DataTypes} from 'san';
import {create} from '../common/util/cx';
import css from '../common/util/css';

const cx = create('linear-progress');

export default san.defineComponent({

    template: `
        <div class="{{computedClassName}}">
            <div class="${cx.getPartClassName('bar')}" style="{{barStyle}}"/>
        </div>
    `,

    dataTypes: {
        mode: DataTypes.oneOf(['indeterminate', 'determinate']),
        value: DataTypes.number,
        max: DataTypes.number,
        min: DataTypes.number
    },

    initData() {
        return {
            mode: 'indeterminate',
            value: 0,
            max: 100,
            min: 0
        };
    },

    computed: {
        computedClassName() {
            let mode = this.data.get('mode');
            return cx(this).addVariants(mode).build();
        },
        barStyle() {

            let mode = this.data.get('mode');
            let value = this.data.get('value');
            let max = this.data.get('max');
            let min = this.data.get('min');

            return mode === 'determinate'
                ? css({
                    width: `${(value - min) / (max - min) * 100}%`
                })
                : '';
        }
    }

});
