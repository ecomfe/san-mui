/**
 * @file MenuItem component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import Icon from '../Icon';
import {TouchRipple} from '../Ripple';

function getSelectedText(title, label) {
    return label ? label : title;
}

export default san.defineComponent({
    template: `
        <div
            on-click="select($event)"
            class="sm-menuitem
                    {{ selected | yesToBe(' selected') }}
                    {{ hasLeft | yesToBe('has-left') }}"
            value="{{value}}"
            style="{{ menuItemstyle }}"
        >
            <div class="sm-menuitem-left-icon"><slot name="leftIcon"></slot></div>
            <p style="{{ titleStyle }}">{{ title }}</p>
            <div class="sm-menuitem-right-icon-group">
                <slot name="rightIcon"></slot>
            </div>
            <san-touch-ripple />
        </div>
    `,

    components: {
        'san-icon': Icon,
        'san-touch-ripple': TouchRipple
    },

    filters: {
        yesToBe(prop, className) {
            return prop ? className : '';
        }
    },

    attached() {
        let slotChilds = this.slotChilds;
        let hasLeft = true;

        for (let slot of slotChilds) {
            if (slot.name === 'leftIcon') {
                hasLeft = false;
                break;
            }
        }
        this.data.set('hasLeft', hasLeft);

        // 改变其已选状态
        this.watch('selectValue', () => {
            let value = this.data.get('value');
            let selectValue = this.data.get('selectValue');
            let selected = false;

            if (!value) {
                return;
            }

            if (selectValue && selectValue.constructor === Array) {

                let len = selectValue.length;
                while (len--) {
                    if (value === selectValue[len]) {
                        selected = true;
                        break;
                    }
                }
            }
            else {
                selected = value === selectValue;
            }

            this.data.set('selected', selected);

            if (selected) {
                this.dispatch('UI:menu-item-selected-text',
                    getSelectedText(
                        this.data.get('title'),
                        this.data.get('label')
                    )
                );
            }
        });

        this.dispatch('UI:menu-item-attached');
    },

    detached() {
        this.dispatch('UI:menu-item-detached');
    },

    select(evt) {
        let value = this.data.get('value');

        this.dispatch('UI:menu-item-selected', {
            value,
            evt
        });
        this.dispatch('UI:menu-item-selected-text',
            getSelectedText(
                this.data.get('title'),
                this.data.get('label')
            )
        );

        this.fire('change');
    }
});
