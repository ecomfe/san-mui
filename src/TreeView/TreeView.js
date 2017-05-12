/**
 * @file TreeView
 * @author Lu Yuan(luyuan.china@gmail.com)
 */

import san from 'san';
import {Icon} from '../Icon';
import TextField from '../TextField';

export default san.defineComponent({

    template: `
        <div class="sm-tree-view {{treeViewClass}}">
            <div
                class="sm-tree-view-filter-bar {{treeViewClass}}"
                san-if="filterBar"
            >
                <san-text-field
                    hintText="{=filterBarHintText=}"
                    inputValue="{=filterText=}"
                    fullWidth
                    on-input-keypress="doHighlight($event)"
                    on-input-focus="captureFilterInput($event)"
                />
            </div>
            <slot></slot>
        </div>
    `,

    defaultData() {
        return {
            compact: false,
            wholeLineSelected: false,
            keepingSelected: false,
            filterBar: false,
            filterBarHintText: ''
        };
    },

    components: {
        'san-icon': Icon,
        'san-text-field': TextField
    },

    inited() {
        this.transBoolean('compact');
        this.transBoolean('wholeLineSelected');
        this.transBoolean('keepingSelected');
        this.transBoolean('filterBar');
        this.items = [];
        this.highlightItems = [];
        this.filterInput = null;
    },

    initData() {
        return {
            filterText: '',
            lastFilterText: '',
        };
    },

    attached() {
        this.watch('filterText', (value, obj) => {
            this.filterItems(value, this.data.get('lastFilterText'));
            this.data.set('lastFilterText', value);
        });
    },

    messages: {
        'UI:tree-view-item-highlighted'(arg) {
            let highlightedItem = arg.value.highlighted;
        },
        'UI:tree-view-item-attached'(arg) {
            if (!arg.value) {
                return;
            }
            this.items.push(arg.value);
        },
        'UI:tree-view-item-detached'(arg) {
            if (!arg.value) {
                return;
            }
            let index = this.items.indexOf(arg.value);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },
        'UI:query-compact-attribute'(arg) {
            let compact = this.data.get('compact');
            let target = arg.target;
            target && target.data.set('compact', compact);
            target && target.data.set('rippleMarginLeft', compact ? 16 : 32);
            target && target.data.set('contentMarginLeft', compact ? 22 : 48);
        },
        'UI:query-whole-line-selected-attribute'(arg) {
            arg.target && arg.target.data && arg.target.data.set(
                'wholeLineSelected', this.data.get('wholeLineSelected'));
        },
        'UI:query-keeping-selected-attribute'(arg) {
            arg.target && arg.target.data && arg.target.data.set(
                'keepingSelected', this.data.get('keepingSelected'));
        },
        'UI:record-selected-item'(arg) {
            this.data.set('selectedItem', arg.target);
        },
        'UI:clear-selected-item'(arg) {
            let selectedItem = this.data.get('selectedItem');
            selectedItem && selectedItem.clearSelectedClass(false);
        },
        'UI:query-filter-bar-attribute'(arg) {
            arg.target && arg.target.data && arg.target.data.set(
                'filterBar', this.data.get('filterBar'));
        },
        'UI:query-filter-text-attribute'(arg) {
            arg.target && arg.target.data && arg.target.data.set(
                'filterText', this.data.get('filterText'));
        }
    },

    computed: {
        treeViewClass() {
            return this.data.get('compact') ? 'compact ' : ''
        }
    },

    filterItems(value, oldValue) {
        let filterText = value.toLowerCase();
        if (filterText === '') {
            this.highlightItems.forEach((item) => {
                item.highlight(null, this.filterInput);
            });
            this.items.forEach((item) => {
                item.data.set('hidden', false);
                if (value === '') {
                    item.data.set('open', item.data.get('lastExpandingState'));
                    item.data.set('lastExpandingState', null);
                }
            });
            return;
        }
        this.highlightItems.splice(0, this.highlightItems.length);
        this.items.forEach((item) => {
            let text = (item.data.get('primaryText')
                + item.data.get('secondaryText')).toLowerCase();
            if (text.indexOf(filterText) === -1 || (item.data.get('disabled') && filterText !== '')) {
                item.data.set('hidden', item.data.get('children') > 0
                    ? true && item.data.get('hidden')
                    : true);
            } else {
                item.data.set('hidden', false);
                this.highlightItems.push(item);
            }
            if (filterText !== '') {
                item.dispatch('UI:tree-view-item-hidden');
                item.dispatch('UI:expand-parent-tree-view-item', {
                    new: filterText, 
                    old: oldValue
                });
            }
        });
    },

    doHighlight(evt) {
        if (evt.keyCode !== 13) {
            return;
        }
        let filterText = this.data.get('filterText');
        this.highlightItems.forEach((item) => {
            item.highlight(null, this.filterInput);
            filterText !== '' && item.highlight(filterText, this.filterInput);
        });
    },

    captureFilterInput(evt) {
        !this.filterInput && (this.filterInput = evt.target);
    },

    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value !== undefined);
    }
});
