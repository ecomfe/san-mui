/**
 * @file MenuItem component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './MenuItem.styl';
import padStyles from '../filters/padStyles';
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
            {{ leftIcon | yesToBe('has-left') }}"
    value="{{value}}"
>
    <div class="sm-menuitem-left-icon" san-if="{{ leftIcon }}"><san-icon>{{ leftIcon }}</san-icon></div>
    <p>{{ title }}</p>
    <div class="sm-menuitem-right-icon-group">
        <san-icon san-for="ri in rightIcons">{{ ri }}</san-icon>
    </div>
    <san-touch-ripple />
</div>
    `,

    components: {
        'san-icon': Icon,
        'san-touch-ripple': TouchRipple
    },

    filters: {
        padStyles,

        yesToBe(prop, className) {
            return prop ? className : '';
        }
    },

    inited() {
        this.data.set('rightIcons', (this.data.get('rightIcon') || '').split(','));
    },

    attached() {

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
