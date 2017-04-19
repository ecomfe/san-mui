/**
 * @file IconMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './IconMenu.styl';
import Icon from '../Icon';
import Menu from './Menu';

let IconMenu = san.defineComponent({
    template: `
<div class="sm-iconmenu {{ className }}" style="{{ style | padStyles }}">
    <div class="sm-iconmenu-icon">
        <san-icon on-click="toggleMenu($event)">{{ icon }}</san-icon>
    </div>

    <div class="sm-menu-list {{ open | notOpen('list-hidden') }}"
        style="{{ menuStyleDefault | padStyles }}{{ menuStyle | padStyles }};">

        <slot></slot>
    </div>
    <div san-if="useLayerForClickAway" class="sm-layer-for-click {{ open | notOpen('list-hidden') }}" style="z-index:{{zIndex-1}}"></div>
</div>
    `,

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
    },

    computed: {
        menuStyleDefault() {
            return {
                'transform': this.data.get('transform'),
                'transform-origin': this.data.get('transformOrigin'),
                'left': this.data.get('left') + 'px',
                'top': this.data.get('top') + 'px',
                'max-height': this.data.get('maxHeight') + 'px',
                'z-index': this.data.get('zIndex')
            };
        }
    },
});
san.inherits(IconMenu, Menu);

export default IconMenu;
