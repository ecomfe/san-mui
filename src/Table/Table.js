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
            this.fire('select', e.value);
        }
    };

    static computed = {
        className() {
            return cx(this).build();
        }
    };

    static dataTypes = {
        // 这里的data需要跟selectable的multi配合使用。即当selectable为multi时，data属性必须提供
        data: DataTypes.array,
        selectable: DataTypes.oneOf([false, 'multi', 'single'])
    };

    initData() {
        return {
            // multi | single
            selectable: false,
            data: []
        };
    }

    attached() {

        // 当所有的行都初始化完成，我们算一下是不是所有的行都是被选中的

        let {
            selectable,
            data
        } = this.data.get();

        if (!selectable) {
            return;
        }

        if (this.thead && data) {
            const type = this.checkTHeadState(data);
            this.thead.updateSelectedState(type);
        }

        this.watch('data', val => {
            const type = this.checkTHeadState(val);
            this.thead.updateSelectedState(type);
        });

    }

    checkTHeadState(val) {
        const total = val.filter(item => !item.disabled);
        const selected = val.filter(item => !item.disabled && item.selected);
        let type;
        if (selected.length === 0) {
            type = 'none';
        }
        else if (selected.length === total.length) {
            type = 'all';
        }
        else {
            type = 'indeterminate';
        }
        return type;
    }

    disposed() {
        this.tbody = this.thead = this.tfoot = null;
    }
}
