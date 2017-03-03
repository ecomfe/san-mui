/**
 * @file MenuItem component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './MenuItem.styl';
import {padStyles} from './filters';
import template from './MenuItem.tpl';
import Icon from '../Icon';

let getValue = (title, label) => {
    return label ? label : title;
};

export default san.defineComponent({
    template,

    components: {
        'san-icon': Icon
    },

    filters: {
        padStyles
    },

    attached() {
        // TODO 是否应该通过判断当前item有无value来决定是否需要selected
        if (!this.data.get('value')) {
            return;
        }

        // TODO 不应该跟owner对比，应该跟父menu对比，可是目前取不到父组件
        // let selected = this.data.get('value') === this.owner.data.get('value');
        let selected = String(this.owner.data.get('value')).indexOf(this.data.get('value')) !== -1;
        this.data.set('selected', selected);

        // if (selected) {
        //     this.fire('change', [
        //         this.data.get('value'),
        //         getValue(this.data.get('title'), this.data.get('label'))
        //     ]);
        // }
    },

    select() {
        let value = this.data.get('value');

        if (!value) {
            // TODO 做特定事情的item，触发change是否需要什么参数？
            this.fire('change');
            return;
        }

        this.fire('change', [
            this.data.get('value'),
            getValue(this.data.get('title'), this.data.get('label'))
        ]);

        for (let item of this.parent.childs) {
            // item.data && item.data.set('selected', item.data.get('value') === value);
            item.data
            && item.data.set('selected', String(this.owner.data.get('value')).indexOf(item.data.get('value')) !== -1);
        }
    }
});
