/**
 * @file IconMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './IconMenu.styl';
import template from './IconMenu.tpl';
import Icon from '../Icon';
import Menu from './Menu';

let IconMenu = san.defineComponent({
    template,

    components: {
        'san-icon': Icon
    },

    initData() {
        return Object.assign({
            itemClickClose: true,
            useLayerForClickAway: false,
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top'
            },
            zIndex: 101,
        }, this.defaultData());
    },

    attached() {
        this.rootClass = '.' + this.data.get('className');
        this.clickerClass = '.sm-iconmenu-icon';

        if (!this.data.get('useLayerForClickAway')) {
            this.data.set('zIndex', 1);
        }

        this.bindEvent();
    }
});
san.inherits(IconMenu, Menu);

export default IconMenu;
