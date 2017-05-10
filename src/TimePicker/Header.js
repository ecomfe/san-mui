/**
 * @file Time Picker Header
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';

export default class Header extends san.Component {

    static template = `
        <div class="sm-time-picker-header">
            <span
                class="sm-time-picker-header-text {{panel !== 'minute' ? 'state-selected' : ''}}"
                on-click="setClockToHour">
                {{_hour}}
            </span>
            <b>:</b>
            <span
                class="sm-time-picker-header-text {{panel === 'minute' ? 'state-selected' : ''}}"
                on-click="setClockToMinute">
                {{minute}}
            </span>
            <div
                san-if="type === '12hour'"
                class="sm-time-picker-header-meridiem">
                <span
                    class="{{meridiem === 'ante' ? 'state-active' : ''}}"
                    on-click="setAM">
                    AM
                </span>
                <span
                    class="{{meridiem === 'post' ? 'state-active' : ''}}"
                    on-click="setPM">
                    PM
                </span>
            </div>
        </div>
    `;

    static computed = {
        /* eslint-disable fecs-camelcase */
        _hour() {
            let hour = this.data.get('hour');
            let type = this.data.get('type');
            return type === '12hour' && +hour === 0 ? '12' : hour;
        }
        /* eslint-enable fecs-camelcase */
    };

    initData() {
        return {
            meridiem: 'am'
        };
    }

    setClockToHour() {
        this.fire('change', 'hour');
    }

    setClockToMinute() {
        this.fire('change', 'minute');
    }

    setAM() {
        this.fire('change-meridiem', 'ante');
    }

    setPM() {
        this.fire('change-meridiem', 'post');
    }

}
