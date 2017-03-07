/**
 * @file MenuItem component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './MenuItem.styl';
import padStyles from '../filters/padStyles';
import template from './MenuItem.tpl';
import Icon from '../Icon';

function getSelectedText(title, label) {
    return label ? label : title;
}

export default san.defineComponent({
    template,

    components: {
        'san-icon': Icon
    },

    filters: {
        padStyles
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

    select() {
        let value = this.data.get('value');

        this.dispatch('UI:menu-item-selected', value);
        this.dispatch('UI:menu-item-selected-text',
            getSelectedText(
                this.data.get('title'),
                this.data.get('label')
            )
        );

        this.fire('change');
    }
});
