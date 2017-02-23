/**
 * @file MenuItem component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './MenuItem.styl';
import {padStyles} from './filters';
import template from './MenuItem.tpl';

export default san.defineComponent({
    template,

    filters: {
        getValue(title, label) {
            return label ? label : title;
        },
        padStyles
    },

    attached() {
        let selected = this.data.get('value') === this.owner.data.get('value'); // TODO
        this.data.set('selected', selected);

        if (selected) {
            // update menu label
        }
    },

    select() {
        let title = this.data.get('title');

        for (let item of this.parent.childs) {
            item.data.set('selected', item.data.get('title') === title);
        }

        // do sth
    }
});
