/**
 * @file TreeView
 * @author Lu Yuan(luyuan.china@gmail.com)
 */

import san from 'san';
import {Icon} from '../Icon';

export default san.defineComponent({

    template: `
        <div class="sm-tree-view {{treeViewClass}}">
            <slot></slot>
        </div>
    `,

    defaultData() {
        return {
            compact: false,
            wholeLineHighlight: false,
            alwaysHighlight: false
        };
    },

    components: {
        'san-icon': Icon
    },

    inited() {
        this.transBoolean('compact');
        this.data.set('compact', this.data.get('compact'));
        this.transBoolean('wholeLineHighlight');
        this.data.set('wholeLineHighlight',
            this.data.get('wholeLineHighlight'));
        this.transBoolean('alwaysHighlight');
        this.data.set('alwaysHighlight',
            this.data.get('alwaysHighlight'));
    },

    attached() {
    },

    messages: {
        'UI:tree-view-item-highlighted'(arg) {
            let highlightedItem = arg.value.highlighted;
        },
        'UI:query-compact-attribute'(arg) {
            let compact = this.data.get('compact');
            let target = arg.target;
            target.data.set('compact', compact);
            target.data.set('rippleMarginLeft', compact ? 16 : 32);
            target.data.set('contentMarginLeft', compact ? 22 : 48);
        },
        'UI:query-whole-line-highlight-attribute'(arg) {
            arg.target.data.set('wholeLineHighlight',
                this.data.get('wholeLineHighlight'));
        },
        'UI:query-always-highlight-attribute'(arg) {
            arg.target.data.set('alwaysHighlight',
                this.data.get('alwaysHighlight'));
        },
        'UI:set-highlighted-item'(arg) {
            this.data.set('highlightedItem', arg.target);
        },
        'UI:clear-highlighted-item'(arg) {
            let highlightedItem = this.data.get('highlightedItem');
            highlightedItem
                && typeof highlightedItem.clearHighlightClass === 'function'
                && highlightedItem.clearHighlightClass(false);
        }
    },

    computed: {
        treeViewClass() {
            return this.data.get('compact') ? 'compact ' : ''
        }
    },
    
    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value === 'false' ? false : !!value);
    }
});
