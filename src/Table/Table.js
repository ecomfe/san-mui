

import san from 'san';
import TR from './TR';
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

    static messages = {
        'UI:table-select': function (e) {
            let selected = e.value;
            if (this.thead) {
                this.thead.updateSelectAllState(
                    this.tbody.findChildTRs().length === selected.length
                );
            }

            this.fire('select', selected);
        },

        'UI:tbody-inited': function (e) {
            this.tbody = e.target;
            e.target.data.set('tableSelectable', this.data.get('selectable'));
        },

        'UI:thead-inited': function (e) {
            this.thead = e.target;
            e.target.data.set('tableSelectable', this.data.get('selectable'));
        },

        'UI:table-select-all': function (e) {
            let selected = [];
            let selectAll = e.value;

            this.tbody.eachItem(function (tr, index) {
                tr.data.set('selected', selectAll);
                if (selectAll) {
                    selected.push(index);
                }
            });

            this.fire('select', selected);
        }
    };

    static computed = {
        className() {
            return cx(this).build();
        }
    };


    initData() {
        return {
            // multi | single
            selectable: false,
        };
    }

    disposed() {
        this.tbody = this.thead = this.tfoot = null;
    }
}
