/**
 * @file List
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';

export default san.defineComponent({

    template: `
        <div class="sm-list">
            <slot></slot>
        </div>
    `,

    inited() {
        let selectable = this.data.get('selectable');
        this.data.set('selectable', selectable === 'false' ? false : !!selectable);

        this.items = [];
    },

    messages: {
        'UI:list-item-attached'(arg) {
            if (!this.data.get('selectable')) {
                return;
            }

            this.items.push(arg.target);
            arg.target.data.set('selectValue', this.data.get('value'));
        },

        'UI:list-item-selected'(arg) {
            if (!this.data.get('selectable')) {
                return;
            }

            let newSelectValue = arg.target.data.get('value');

            this.data.set('value', newSelectValue);

            let len = this.items.length;
            while (len--) {
                this.items[len].data.set('selectValue', newSelectValue);
            }

            this.fire('change', newSelectValue);
        }
    }
});
