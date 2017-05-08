/**
 * @file TreeViewItem
 * @author Lu Yuan(luyuan.china@gmail.com)
 */

import san from 'san';
import {TouchRipple} from '../Ripple';
import Icon from '../Icon';
//import padStyles from '../filters/padStyles';

export default san.defineComponent({

    template: `
        <div class="sm-tree-view-item {{treeViewItemClass}} {{touchRippleClass}}
                    {{hoverClass}}"
            on-click="toggleTreeView($event)"
            on-mouseenter="handleMouseEnter($event)"
            on-mouseleave="handleMouseLeave($event)"
            style="{{itemStyle}}"
        >
            <div class="sm-tree-view-item-content {{touchRippleClass}}
                        {{hoverClass}}"
                style="{{itemContentStyle}}"
            >
                <div class="sm-tree-view-item-left">
                    <slot name="left"></slot>
                </div>
                <p class="sm-tree-view-item-primary-text" 
                    san-if="primaryText"
                >{{ primaryText }}</p>
                <p class="sm-tree-view-item-secondary-text" 
                    style="{{secondaryTextStyle}}" 
                    san-if="secondaryText"
                >{{ secondaryText | raw }}</p>
                <div class="sm-tree-view-item-right" san-if="!toggleNested">
                    <slot name="right"></slot>
                </div>
            </div>
            <san-touch-ripple san-if="!disableRipple && !disabled"
                style="{{touchRippleStyle}}"
                class="{{touchRippleClass}}"
                on-click="toggleRipple()"
            />
            
            <div class="sm-tree-view-item-expand {{touchRippleClass}}" 
                san-if="toggleNested" 
                on-click="toggleTreeView($event, 'EXPAND')"
                style="{{expandStyle}}"
            >
                <san-icon>arrow_drop_{{ open | treeViewOpenIcon }}</san-icon>
                <san-center-ripple />
            </div>
            <div class="sm-tree-view-item-nested {{ open | treeViewOpen }}"
                style="{{nestedTreeViewStyle}}"
            >
                <slot name="nested"></slot>
            </div>
        </div>
    `,

    defaultData() {
        return {
            disabled: false,
            highlighted: false,
            hover: false,
            disableRipple: false,
            primaryTogglesNestedTreeView: true,
            initiallyOpen: false
        };
    },

    components: {
        'san-touch-ripple': TouchRipple,
        'san-icon': Icon
    },

    messages: {
        'UI:nested-counter'(arg) {
            let target = arg.value;

            target.set('nestedLevel', target.get('nestedLevel') + 1);
            this.dispatch('UI:nested-counter', target);
        },
        'UI:child-hover'(arg) {
            let hover = arg.value;
            if (hover) {
                this.data.set('hover', '');
                this.dispatch('UI:child-hover', hover);
            } else {
                this.data.set('hover', 'hover');
            }
        }
    },

    initData() {
        return {
            nestedLevel: 1,
            secondaryTextLines: 1
        };
    },

    filters: {
        //padStyles,
        treeViewOpenIcon(open) {
            return open ? 'down' : 'up';
        },
        treeViewOpen(open) {
            return open ? '' : 'hide';
        }
    },

    computed: {
        itemStyle() {
            return {
                'margin-left': this.data.get('nestedLevel') === 1
                    ? 0
                    : this.data.get('rippleMarginLeft') + 'px'
            };
        },
        itemContentStyle() {
            let paddingLeftHasLeft =
                this.data.get('compact') ? '32px' : '64px';
            let paddingLeftWithoutLeft =
                this.data.get('compact') ? '6px' : '16px';
            return {
                'margin-left': this.data.get('contentMarginLeft') + 'px',
                'padding-left': this.data.get('hasLeft')
                    ? paddingLeftHasLeft
                    : paddingLeftWithoutLeft
            };
        },
        expandStyle() {
            return {
                'transform': this.data.get('open') ? 'rotate(0)' : 'rotate(90deg)'
            }
        },
        touchRippleStyle() {
            let level = this.data.get('nestedLevel');
            let leftNormal = this.data.get('wholeLineHighlight')
                ? ((1 - level) * this.data.get('rippleMarginLeft'))
                : this.data.get('contentMarginLeft');
            let leftCompact = this.data.get('wholeLineHighlight')
                ? ((1 - level) * this.data.get('rippleMarginLeft'))
                : this.data.get('contentMarginLeft');
            if (!leftNormal || !leftCompact) {
                return;
            }

            return {
                'left': this.data.get('compact')
                    ? leftCompact + 'px'
                    : leftNormal + 'px'
            }
        },
        touchRippleClass() {
            return this.data.get('highlighted') ? 'highlighted': '';
        },
        hoverClass() {
            return this.data.get('hover') ? 'hover' : '';
        },
        treeViewItemClass() {
            return (this.data.get('disabled') ? 'disabled ' : '')
                + (this.data.get('toggleNested') ? 'nested ' : '')
                + (this.data.get('compact') ? 'compact' : '');
        },
        secondaryTextStyle() {
            return {
                '-webkit-line-clamp': this.data.get('secondaryTextLines')
            }
        }
    },

    inited() {
        this.transBoolean('disabled');
        this.transBoolean('toggleNested');
        this.transBoolean('disableRipple');
        this.transBoolean('primaryTogglesNestedTreeView');
        this.transBoolean('initiallyOpen');
        this.data.set('open', this.data.get('initiallyOpen'));

        this.dispatch('UI:nested-counter', this.data);

        this.dispatch('UI:query-compact-attribute');
        this.dispatch('UI:query-whole-line-highlight-attribute');
        this.dispatch('UI:query-always-highlight-attribute');
    },

    attached() {
        let slotChilds = this.slotChilds;
        let hasLeft = 1;

        for (let slot of slotChilds) {
            if (slot.name === 'left' || slot.name === 'leftAvatar') {
                hasLeft--;
            }
        }

        this.data.set('hasLeft', hasLeft > 0);

        this.watch('highlighted', () => {
            this.fire('highlightToggle', this.data.get('highlighted'));
        });
        this.watch('hover', () => {
            this.fire('hoverToggle', this.data.get('hover'));
        });
      },

    toggleTreeView(evt, driver) {
        evt.stopPropagation();

        if (this.data.get('disabled')) {
            return;
        }
        (driver === 'EXPAND') && this.toggleRipple();
        if (driver !== 'EXPAND'
                && !this.data.get('primaryTogglesNestedTreeView')) {
            return;
        }

        let open = this.data.get('open');
        this.data.set('open', !open);

        this.fire('nestedTreeViewToggle', open);
    },

    handleMouseEnter(evt) {
        evt.stopPropagation();
        this.data.set('hover', 'hover');
        this.dispatch('UI:child-hover', this.data.get('hover'));
    },

    handleMouseLeave(evt) {
        evt.stopPropagation();
        this.data.set('hover', '');
        this.dispatch('UI:child-hover', this.data.get('hover'));
    },

    clearHighlightClass(isSend) {
        (this.data.get('highlighted') === true)
            && this.data.set('highlighted', false);
        isSend && this.dispatch('UI:clear-highlighted-item');
    },

    toggleRipple() {
        if (this.data.get('alwaysHighlight')) {
            this.clearHighlightClass(true);
            this.data.set('highlighted', true);
            this.dispatch('UI:set-highlighted-item');
        }
    },

    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value === 'false' ? false : !!value);
    }
});
