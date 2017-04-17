
import san from 'san';
import TD from './TD';
import TH from './TH';


export default class TR extends san.Component {
    static components = {
        'ui-td': TD,
        'ui-th': TH
    };

    static template = `<tr class="{{selected && pos === 'tbody' ? 'sm-table-row-selected' : ''}}">
        <ui-th san-if="tableSelectable === 'multi' && pos === 'thead'" class="sm-table-col-select">
            <input type="checkbox" on-click="selectAll($event)">
        </ui-th>

        <ui-th san-if="tableSelectable === 'single' && pos === 'thead'" class="sm-table-col-select">
        </ui-th>

        <ui-td san-if="tableSelectable === 'multi' && pos === 'tbody'" class="sm-table-col-select">
            <input type="checkbox" on-click="selectItem($event)">
        </ui-td>

        <ui-td san-if="tableSelectable === 'single' && pos === 'tbody'" class="sm-table-col-select">
            <input type="radio" on-click="selectItem($event)">
        </ui-td>
        <slot></slot>
    </tr>`;

    initData() {
        return {
            pos: 'tbody'
        };
    }

    inited() {
        this.dispatch('UI:tr-inited');
    }

    selectAll(e) {
        this.dispatch('UI:table-select-all', e.target.checked);
    }

    selectItem(e) {
        this.data.set('selected', e.target.checked);
        this.dispatch('UI:table-select-item', e.target.checked);
    }

    attached() {
        this.watch('selected', function (value) {
            let input = this.getSelectableInput();
            if (input){
                input.checked = !!value;
            }
        });
    }

    getSelectableInput() {
        return this.el.getElementsByTagName('input')[0];
    }
}
