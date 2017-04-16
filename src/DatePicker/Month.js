/**
 * @file Month
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import moment from 'moment';
import {create} from '../common/util/cx';
import DatePickerDate from './Date';
import Icon from '../Icon';
import {CenterRipple} from '../Ripple';

const cx = create('date-picker-month');

const FORMAT = 'YYYY-MM-DD';

export default class Month extends Component {

    static template = `
        <div class="sm-date-picker-month">
            <san-date-picker-date
                san-for="date in dates"
                date="{{date.value}}"
                weekend="{{date.weekend}}"
                active="{{date.active}}"
                today="{{date.today}}"
                part="{{date.part}}"
                on-click="{{setDate(date.value)}}"/>
        </div>
    `;

    static components = {
        'san-date-picker-date': DatePickerDate,
        'san-icon': Icon,
        'san-center-ripple': CenterRipple
    };

    static computed = {
        dates() {
            let today = moment();
            let value = moment(this.data.get('value'));
            let date = moment(this.data.get('date'));
            let monthBegin = moment(date).startOf('month');
            let monthEnd = moment(date).endOf('month');
            let begin = moment(monthBegin).startOf('week');
            let end = moment(monthEnd).endOf('week');

            let dates = [];

            while (begin.isBefore(end)) {

                dates.push({
                    value: begin.date(),
                    weekend: begin.weekday() > 4,
                    active: begin.isSame(value, 'd'),
                    today: begin.isSame(today, 'd'),
                    part: begin.isBefore(monthBegin)
                        ? 'before'
                        : begin.isAfter(monthEnd) ? 'after' : ''
                });

                begin.add(1, 'd');
            }

            return dates;

        }
    };

    initData() {
        return {
            month: moment().format(FORMAT),
            format: FORMAT
        };
    }

    setDate(date) {
        this.data.set(
            'value',
            moment(this.data.get('date')).date(date).format(FORMAT)
        );
    }

}
