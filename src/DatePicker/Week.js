/**
 * @file week
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';

const WEEKS = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '日'
];

export default san.defineComponent({

    template: `
        <div class="sm-date-picker-week">
            <i san-for="week in weeks">{{week}}</i>
        </div>
    `,

    initData() {
        return {
            weeks: WEEKS
        };
    }

});
