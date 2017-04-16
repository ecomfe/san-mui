/**
 * @file MontCarousel
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {create} from '../common/util/cx';
import Icon from '../Icon';
import {CenterRipple} from '../Ripple';
import moment from 'moment';
import {FORMAT} from './constant';

const cx = create('date-picker-month-carousel');

export default san.defineComponent({

    components: {
        'san-icon': Icon,
        'san-center-ripple': CenterRipple
    },

    template: `
        <div class="${cx.getPartClassName()}">
            <div class="${cx.getPartClassName('prev')}" on-click="prev">
                <san-icon>keyboard_arrow_left</san-icon>
                <san-center-ripple />
            </div>
            <label>{{text}}</label>
            <div class="${cx.getPartClassName('next')}" on-click="next">
                <san-icon>keyboard_arrow_right</san-icon>
                <san-center-ripple />
            </div>
        </div>
    `,

    computed: {
        text() {
            let date = this.data.get('date');
            return moment(date).format('YYYY 年 MM 月');
        }
    },

    prev() {
        let date = moment(this.data.get('date')).subtract(1, 'month').format(FORMAT);
        this.data.set('date', date);
    },

    next() {
        let date = moment(this.data.get('date')).add(1, 'month').format(FORMAT);
        this.data.set('date', date);
    }

});
