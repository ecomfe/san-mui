/**
 * @file FocusRipple
 * @author sparklewhy@gmail.com
 */

import san from 'san';
import {create} from '../common/util/cx';

const cx = create('focus-ripple');

export default san.defineComponent({

    template: `
        <div class="{{styleClass}}">
            <div class="${cx.getPartClassName('circle')}" style="{{circleStyle}}"></div>
        </div>
    `,

    initData() {
        return {
            styleClass: cx(this).build()
        };
    },

    computed: {
        circleStyle() {
            return {
                color: this.data.get('color'),
                opacity: this.data.get('opacity')
            };
        }
    }
});
