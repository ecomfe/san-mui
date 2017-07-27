/**
 * @file FocusRipple
 * @author sparklewhy@gmail.com
 */

import san, {DataTypes} from 'san';
import {create} from '../common/util/cx';

const cx = create('focus-ripple');

export default san.defineComponent({

    template: `
        <div class="{{styleClass}}">
            <div class="${cx.getPartClassName('circle')}" style="{{circleStyle}}"></div>
        </div>
    `,

    computed: {
        circleStyle() {
            return {
                color: this.data.get('color'),
                opacity: this.data.get('opacity')
            };
        },
        styleClass() {
            return cx(this).build();
        }
    },
    dataTypes: {
        color: DataTypes.string,
        opacity: DataTypes.string
    }
});
