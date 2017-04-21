/**
 * @file IconMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import Icon from '../Icon';
import Menu from './Menu';

let IconMenu = san.defineComponent({
    template: `
        <div class="sm-iconmenu {{ className }}" 
            style="{{ style | padStyles }}"
            on-mouseenter="handleMouseEnter($event)"
            on-mouseleave="handleMouseLeave($event)">
            <p class="sm-iconmenu-tooltip {{ tooltipShow | yesToBe('show') }}">{{ tooltip }}</p>
            <san-icon on-click="toggleMenu($event)" className="sm-iconmenu-icon">{{ icon }}</san-icon>
            <div class="sm-menu-list {{ !open | yesToBe('list-hidden') }}"
                style="{{ menuStyleDefault | padStyles }}{{ menuStyle | padStyles }}">

                <slot></slot>
            </div>
            <div san-if="useLayerForClickAway" 
                class="sm-layer-for-click {{ !open | yesToBe('list-hidden') }}" 
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
            tooltipShow: false
        }, this.defaultData());
    },

    attached() {
        this.rootClass = '.' + this.data.get('className');
        this.clickerClass = '.sm-iconmenu-icon';

        this.bindEvent();

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    },

    beforeToggleMenu() {
        this.data.set('tooltipShow', false);
    },
    handleMouseEnter(evt) {
        this.data.set('tooltipShow', true);
    },
    handleMouseLeave(evt) {
        this.data.set('tooltipShow', false);
    }

});
san.inherits(IconMenu, Menu);

export default IconMenu;
