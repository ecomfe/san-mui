/**
 * @file ListItem
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import {TouchRipple, CenterRipple} from '../Ripple';
import Icon from '../Icon';
import padStyles from '../filters/padStyles';

export default san.defineComponent({

    template: `
        <div class="sm-list-item {{listItemClass}}"
            on-click="toggleList($event)"
            style="{{ itemStyle | padStyles }}{{ style | padStyles }}"
        >
            <div class="sm-list-left-avatar"><slot name="leftAvatar"></slot></div>
            <div class="sm-list-right-avatar"><slot name="rightAvatar"></slot></div>
            <div class="sm-list-item-content" style="{{ itemContentStyle | padStyles }}">
                <div class="sm-list-item-left"><slot name="left"></slot></div>
                <p class="sm-list-item-primary-text" san-if="primaryText">{{ primaryText }}</p>
                <p class="sm-list-item-secondary-text" style="{{ secondaryTextStyle | padStyles }}" san-if="secondaryText">{{ secondaryText | raw }}</p>
            </div>
            <san-touch-ripple san-if="!disableRipple && !disabled" />
            <div class="sm-list-item-right" san-if="!toggleNested"><slot name="right"></slot></div>
            <div class="sm-list-item-expand" san-if="toggleNested">
                <san-icon>expand_{{ open | listOpenIcon }}</san-icon>
                <san-center-ripple />
            </div>
            <div class="sm-list-item-nested {{ open | listOpen }}" style="{{ nestedListStyle | padStyles }}">
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
            secondaryTextLines: 1
        };
    },

    filters: {
        padStyles,

        listOpenIcon(open) {
            return open ? 'less' : 'more';
        },
        listOpen(open) {
            return open ? '' : 'hide';
        }
    },

    computed: {
        itemStyle() {
            return {
                paddingLeft: this.data.get('inset') ? '56px' : 0
            };
        },
        itemContentStyle() {
            return {
                marginLeft: (this.data.get('nestedLevel') - 1) * 16 + 'px',
                paddingLeft: this.data.get('hasLeft') ? '72px' : '16px'
            };
        },
        listItemClass() {
            return (this.data.get('disabled') ? 'disabled ' : '')
                + (this.data.get('toggleNested') ? 'nested' : '');
        },
        secondaryTextStyle() {
            return {
                '-webkit-line-clamp': this.data.get('secondaryTextLines')
            }
        }
    },

    inited() {
        this.transBoolean('inset');
        this.transBoolean('disabled');
        this.transBoolean('toggleNested');
        this.transBoolean('disableRipple');
        this.transBoolean('primaryTogglesNestedList');
        this.transBoolean('initiallyOpen');
        this.data.set('open', this.data.get('initiallyOpen'));

        this.dispatch('UI:nested-counter', this.data);
    },


    attached() {
        let slotChilds = this.slotChilds;
        let hasLeft = 2;

        for (let slot of slotChilds) {
            if (slot.name === 'left' || slot.name === 'leftAvatar') {
                hasLeft--;
            }
        }

        this.data.set('hasLeft', hasLeft > 0);
    },

    toggleList(evt) {
        evt.stopPropagation();

        if (this.data.get('disabled')) {
            return;
        }

        let open = this.data.get('open');
        this.data.set('open', !open);

        this.fire('nestedListToggle');
    },

    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value === 'false' ? false : !!value);
    }
});
