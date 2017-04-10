/**
 * @file Tabs
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import css from '../common/util/css';

export default san.defineComponent({

    template: `
        <div class="sm-tabs">
            <slot />
            <div class="sm-tabs-bar" style="{{barStyle}}"/>
        </div>
    `,

    initData() {
        return {
            activeIndex: 0
        };
    },

    computed: {
        barStyle() {
            let activeIndex = this.data.get('activeIndex');
            let total = this.data.get('total');
            return css({
                transform: `translateX(${activeIndex * 100}%)`,
                width: `${1 / total * 100}%`
            });
        }
    }

});
