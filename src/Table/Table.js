/**
 * @file 表格
 * @author errorrik<errorrik@gmail.com>
 * @author jinzhubaofu <leonlu@outlook.com>
 */

import san, {DataTypes} from 'san';
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
        'UI:tbody-inited'(e) {
            this.tbody = e.target;
            e.target.data.set('tableSelectable', this.data.get('selectable'));
        },
        'UI:thead-inited'(e) {
            this.thead = e.target;
            e.target.data.set('tableSelectable', this.data.get('selectable'));
        },
        'UI:table-select-head'(e) {
            let selected = [];
            let selectAll = e.value;

            this.tbody.eachItem((tr, index) => {
                let trDisabled = tr.data.get('disabled');
                if (!trDisabled) {
                    tr.data.set('selected', selectAll);
                    if (selectAll) {
                        selected.push(index);
                    }
                }
                else {
                    let trSelected = tr.data.get('selected');
                    if (trSelected) {
                        selected.push(index);
                    }
                }
            });

            this.fire('select', selected);
        },
        'UI:table-select-body'(e) {
            if (this.thead) {
                this.thead.updateSelectAllState(this.isAllSelected());
            }
            this.fire('select', e.value);
        }
    };

    static computed = {
        className() {
            return cx(this).build();
        }
    };

    static dataTypes = {
        selectable: DataTypes.oneOf([false, 'multi', 'single'])
    };

    initData() {
        return {
            // multi | single
            selectable: false
        };
    }

    attached() {

        // 当所有的行都初始化完成，我们算一下是不是所有的行都是被选中的

        let selectable = this.data.get('selectable');

        if (!selectable) {
            return;
        }

        if (this.thead) {
            this.thead.updateSelectAllState(this.isAllSelected());
        }

    }

    isAllSelected() {
        let rows = this.tbody.findChildTRs();
        let len = rows.length;
        let isAllSelected = true;

        // 当tbody有数据时再遍历有没有全选
        if (len > 0) {
            for (let i = 0, len = rows.length; i < len; i++) {
                let row = rows[i];
                if (!row.data.get('selected')) {
                    isAllSelected = false;
                    break;
                }
            }
        }
        else {
            isAllSelected = false;
        }
        return isAllSelected;
    }


    disposed() {
        this.tbody = this.thead = this.tfoot = null;
    }
}
