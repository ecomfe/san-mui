/**
 * @file IconMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import Icon from '../Icon';
import Menu from './Menu';

let IconMenu = san.defineComponent({
    template: `
        <div class="sm-iconmenu {{ className }}" style="{{ style | padStyles }}">
            <div class="sm-iconmenu-icon">
                <san-icon on-click="toggleMenu($event)">{{ icon }}</san-icon>
            </div>

            <div class="sm-menu-list {{ open | notOpen('list-hidden') }}"
                style="{{ menuStyleDefault | padStyles }}{{ menuStyle | padStyles }}">

                <slot></slot>
            </div>
            <div san-if="useLayerForClickAway" 
                class="sm-layer-for-click {{ open | notOpen('list-hidden') }}" 
                style="z-index:{{zIndex-1}}">
            </div>
        </div>
    `,

    components: {
        'san-icon': Icon
    },

    initData() {
        return Object.assign({
            itemClickClose: true,
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top'
            },
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
