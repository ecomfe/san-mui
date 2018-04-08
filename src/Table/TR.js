/**
 * @file 表格 - tr
 * @author errorrik<errorrik@gmail.com>
 * @author jinzhubaofu <leonlu@outlook.com>
 */

import san, {DataTypes} from 'san';
import TD from './TD';
import TH from './TH';
import Checkbox from '../Checkbox';
import Radio from '../Radio';

export default class TR extends san.Component {
    static components = {
        'sm-td': TD,
        'sm-th': TH,
        'sm-checkbox': Checkbox,
        'sm-radio': Radio
    };

    static template = `
        <tr class="{{selected && pos === 'tbody' ? 'sm-table-row-selected' : ''}}">
            <sm-th
                san-if="tableSelectable === 'multi'"
                class="sm-table-col-select">
                <sm-checkbox
                    s-ref="checkbox"
                    checked="{{checked}}"
                    indeterminate="{{indeterminate}}"
                    value="ON"
                    disabled="{{!!disabled}}"
                    on-input-change="select($event)"/>
            </sm-th>
            <sm-th
                san-if="tableSelectable === 'single'"
                class="sm-table-col-select">
                <sm-radio
                    s-if="tableSelectable && pos === 'tbody'"
                    checked="{{checked}}"
                    value="ON"
                    on-input-change="select($event)" />
            </sm-th>
            <slot></slot>
        </tr>
    `;

    static computed = {
        checked() {
            let selected = this.data.get('selected');
            let tableSelectable = this.data.get('tableSelectable');
            switch (tableSelectable) {
                case 'single':
                    return selected ? 'ON' : '';
                case 'multi':
                    return selected ? ['ON'] : [];
            }
        }
    };

    static dataTypes = {
        pos: DataTypes.oneOf(['tbody', 'thead', 'tfoot']),
        selected: DataTypes.bool,
        indeterminate: DataTypes.bool
    };

    initData() {
        return {
            pos: 'tbody',
            selected: false,
            indeterminate: false,
            disable: false
        };
    }

    inited() {
        this.dispatch('UI:tr-inited');
    }

    attached() {
        this.dispatch('UI:tr-attached');
    }

    /**
     * 选中
     *
     * @note 这里把数据变化丢给 table，table 会更新 tr 的 selected 值（修改后直接在这里改变tr的selected值）
     * @param  {Array<string>} checked checkbox的当前选中值
     */
    select(checked) {


        let {selected, pos} = this.data.get();
        let nextSelected = !!checked.length;

        if (selected === nextSelected) {
            return;
        }

        this.data.set('selected', nextSelected);

        this.dispatch(
            `UI:table-select-${pos === 'tbody' ? 'item' : 'head'}`,
            nextSelected
        );

    }

    detached() {
        this.dispatch('UI:tr-detached');
    }


}
