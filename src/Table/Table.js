

import san from 'san';

import {create} from '../common/util/cx';

const cx = create('table');

export default class Table extends san.Component {
    static template = `
        <table class="{{className}}">
            <slot name="header"></slot>
            <slot></slot>
            <slot name="footer"></slot>
        </table>
    `;

    initData() {
        return {
            // multi | single
            selectable: false,
            className: cx(this).build()
        };
    }
}
