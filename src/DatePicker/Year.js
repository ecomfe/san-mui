/**
 * @file DatePickerYear
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import {create} from '../common/util/cx';
import moment from 'moment';
import {FORMAT} from './constant';

const cx = create('date-picker-year');
const years = Array.apply(null, new Array(200)).map((_, i) => i + 1900);

export default class DatePickerYear extends Component {

    static template = `
        <div class="${cx.getPartClassName()}">
            <div
                san-for="y in years"
                data-year="{{y}}"
                on-click="click(y)"
                class="${cx.getPartClassName('item')} {{year === y ? 'state-active' : ''}}">
                {{y}}
            </div>
        </div>
    `;

    static computed = {
        year() {
            return moment(this.data.get('date')).year();
        }
    };

    initData() {
        return {
            years
        };
    }

    attached() {
        let year = this.data.get('year');
        let main = this.el;
        let target = main.querySelector(`[data-year='${year}']`);
        if (target) {
            main.scrollTop = target.offsetTop - main.offsetHeight / 2;
        }
    }

    click(year) {
        let date = moment(this.data.get('date')).year(year);
        this.data.set('date', date.format(FORMAT));
        this.fire('select');
    }

}
