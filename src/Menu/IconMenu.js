/**
 * @file IconMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
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
            useLayerForClickAway: true,
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top'
            }
        }, this.defaultData());
    },

    attached() {
        this.rootClass = '.' + this.data.get('className');
        this.clickerClass = '.sm-iconmenu-icon';

        this.bindEvent();
    }
});
san.inherits(IconMenu, Menu);

export default IconMenu;
