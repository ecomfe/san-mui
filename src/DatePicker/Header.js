/**
 * @file Header
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import {create} from '../common/util/cx';
import moment from 'moment';
// import
const cx = create('date-picker-header');

export default class DatePickerHeader extends Component {

    static template = `
        <header class="{{computedClassName}}">
            <div
                class="${cx.getPartClassName('year')}"
                on-click="onYearClick">
                {{year}}
            </div>
            <p class="${cx.getPartClassName('label')}">{{label}}</p>
        </header>
    `;

    static computed = {
        computedClassName() {
            return cx(this).build();
        },
        year() {
            return moment(this.data.get('date')).format('YYYY年');
        },
        label() {
            return moment(this.data.get('date')).locale('zh-cn').format('MM月DD日 dddd');
        }
    };

    onYearClick() {
        this.fire('open');
    }

}
