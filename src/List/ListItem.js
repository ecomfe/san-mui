/**
 * @file ListItem
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san, {DataTypes} from 'san';
import {TouchRipple, CenterRipple} from '../Ripple';
import Icon from '../Icon';

export default san.defineComponent({

    template: `
        <div
            class="sm-list-item {{listItemClass}}"
            on-click="toggleList($event)"
            style="{{listItemStyle}}">
            <div class="sm-list-item-content" style="{{itemContentStyle}}">
                <div class="sm-list-item-left">
                    <slot name="left" />
                </div>
                <p
                    san-if="primaryText"
                    class="sm-list-item-primary-text">
                    {{primaryText}}
                </p>
                <p class="sm-list-item-secondary-text"
                    style="{{secondaryTextStyle}}"
                    san-if="secondaryText">
                    {{secondaryText | raw}}
                </p>
            </div>
            <san-touch-ripple san-if="!disableRipple && !disabled" />
            <div
                class="sm-list-item-right"
                san-if="!toggleNested">
                <slot name="right"></slot>
            </div>
            <div class="sm-list-item-expand"
                san-if="toggleNested"
                on-click="toggleList($event, 'EXPAND')">
                <san-icon>expand_{{open | listOpenIcon}}</san-icon>
                <san-center-ripple />
            </div>
            <div
                class="sm-list-item-nested {{open | listOpen}}"
                style="{{nestedListStyle}}">
                <slot name="nested"></slot>
            </div>

        </div>
    `,

    components: {
        'san-touch-ripple': TouchRipple,
        'san-center-ripple': CenterRipple,
        'san-icon': Icon
    },

    messages: {
        'UI:nested-counter'(arg) {
            let target = arg.value;

            target.set('nestedLevel', target.get('nestedLevel') + 1);
            this.dispatch('UI:nested-counter', target);
        }
    },

    initData() {
        return {
            nestedLevel: 1,
            secondaryTextLines: 1,
            toggleNested: false
        };
    },

    dataTypes: {
        open: DataTypes.bool,
        disabled: DataTypes.bool,
        inset: DataTypes.bool,
        // selectValue: DataTypes.any,
        // value: DataTypes.any,
        nestedLevel: DataTypes.number,
        toggleNested: DataTypes.bool,
        secondaryTextLines: DataTypes.number
    },

    filters: {
        listOpenIcon(open) {
            return open ? 'less' : 'more';
        },
        listOpen(open) {
            return open ? '' : 'hide';
        }
    },

    computed: {
        listItemClass() {
            return (this.data.get('disabled') ? 'disabled' : '')
                + (this.data.get('inset') ? ' inset' : '')
                + (this.data.get('secondaryTextLines') > 1 ? ' three-lines' : '')
                + (
                    this.data.get('selectValue')
                    && this.data.get('selectValue') === this.data.get('value') ? ' selected' : ''
                );
        },
        itemContentStyle() {
            return {
                'margin-left': (this.data.get('nestedLevel') - 1) * 16 + 'px',
                'padding-left': this.data.get('hasLeft') ? '72px' : '16px',
                'padding-right': this.data.get('hasRight') ? '56px' : '16px'
            };
        },
        secondaryTextStyle() {
            return {
                '-webkit-line-clamp': this.data.get('secondaryTextLines')
            };
        }
    },

    inited() {
        this.data.set('open', this.data.get('initiallyOpen'));
        this.dispatch('UI:nested-counter', this.data);
        this.dispatch('UI:list-item-attached');
    },

    attached() {

        let slotChilds = this.slotChilds || this.slotChildren;

        let hasLeft = false;
        let hasRight = false;

        for (let slot of slotChilds) {
            if (slot.name === 'left') {
                hasLeft = true;
            }
            if (slot.name === 'right') {
                hasRight = true;
            }
        }

        this.data.set('hasLeft', hasLeft);
        this.data.set('hasRight', hasRight);

    },

    toggleList(evt, driver) {

        evt.stopPropagation();

        if (this.data.get('disabled')) {
            return;
        }

        let {toggleNested, primaryTogglesNestedList, open} = this.data.get();

        if (!toggleNested) {
            this.dispatch('UI:list-item-selected');
            this.fire('click');
            return;
        }

        if (driver !== 'EXPAND') {
            this.dispatch('UI:list-item-selected');
            if (!primaryTogglesNestedList) {
                return;
            }
        }

        this.data.set('open', !open);
        this.fire('nestedListToggle', !open);
    }

});
