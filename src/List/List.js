/**
 * @file List
 * @author qiusiqi(qiusiqi@baidu.com)
 * @update solvan <sunwei11@baidu.com>
 */

import san from 'san';
import {create} from '../common/util/cx';

const cx = create('list');
export default san.defineComponent({

    template: `
        <div class="{{computedClassName}}">
            <slot></slot>
        </div>
    `,

    inited() {
        let selectable = this.data.get('selectable');
        this.data.set('selectable', selectable === 'false' ? false : !!selectable);

        this.items = [];
    },
    attached() {
        this.watch('value', function (value) {
            this.setSelectValue(value);
            this.fire('change', value);
        });
    },

    computed: {
        computedClassName() {
            return cx(this).build();
        }
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

            this.setSelectValue(newSelectValue);
        }
    },
    setSelectValue(value) {
        let len = this.items.length;
        while (len--) {
            this.items[len].data.set('selectValue', value);
        }
    }
});
