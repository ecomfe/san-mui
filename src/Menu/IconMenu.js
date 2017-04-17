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
                <san-icon value="{{ icon }}" on-click="toggleMenu" />
            </div>

            <div class="sm-menu-list depth-2 {{ open | notOpen('list-hidden') }}"
                style="transform:{{ transform }};transform-origin:{{ transformOrigin }};left:{{ left }}px;top:{{ top }}px;{{ menuStyle | padStyles }};">

                <slot></slot>
            </div>
            <div san-if="useLayerForClickAway" class="sm-layer-for-click {{ open | notOpen('list-hidden') }}"></div>
        </div>
    `,

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
