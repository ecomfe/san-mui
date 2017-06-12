/**
 * @file Tabs
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import css from '../common/util/css';
import {TAB_INIT, TAB_ACTIVE, TAB_DISPOSE} from './constant';

export default san.defineComponent({

    template: `
        <div class="sm-tabs">
            <slot />
            <div class="sm-tabs-bar" style="{{barStyle}}"/>
        </div>
    `,

    initData() {
        return {
            items: []
        };
    },

    inited() {

        this.items = [];

        // 当 value 变化时，需要同步给 items
        this.watch('value', value => this.setActiveTab(value));

    },

    attached() {
        // 启动时自动同步
        this.setActiveTab(this.data.get('value'));
    },

    disposed() {
        this.items.length = 0;
        this.items = null;
    },

    addItem(itemComponent) {
        this.items.push(itemComponent);
        this.data.push('items', itemComponent.data.get('value'));
    },

    removeItem(itemComponent) {
        this.items = this.items.filter(item => item !== itemComponent);
        if (this.data) {
            this.data.remove('items', itemComponent.data.get('value'));
        }
    },

    computed: {
        barStyle() {

            let items = this.data.get('items');
            let value = this.data.get('value');
            let total = items.length;
            let activeIndex = items.findIndex(
                item => item === value
            );

            if (activeIndex < 0) {
                activeIndex = 0;
            }

            return css({
                transform: `translateX(${activeIndex * 100}%)`,
                width: `${1 / total * 100}%`
            });

        }
    },

    /**
     * 同步当前的激活 tab
     *
     * @param {string} value 值
     */
    setActiveTab(value) {
        this.items.forEach(item => {
            item.data.set('active', item.data.get('value') === value);
        });
    },

    messages: {
        [TAB_INIT]({target}) {
            this.addItem(target);
        },
        [TAB_ACTIVE]({target}) {
            let currentValue = target.data.get('value');
            this.data.set('value', currentValue);
            this.fire('change', currentValue);
        },
        [TAB_DISPOSE]({target}) {
            this.removeItem(target);
        }
    }

});
