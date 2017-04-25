/**
 * @file IconMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import Icon from '../Icon';
import MenuBase from './MenuBase';
import {CenterRipple} from '../Ripple';
import Menu from './Menu';

let IconMenu = san.defineComponent({
    template: `
        <div class="sm-iconmenu {{ className }}" style="{{ iconMenuStyle }}">
            <div class="sm-iconmenu-icon-wrapper"
                on-click="toggleMenu($event)" 
                className="sm-iconmenu-icon"
                on-mouseenter="handleMouseEnter($event)"
                on-mouseleave="handleMouseLeave($event)"
            >
                <san-icon>{{ icon }}</san-icon>
                <san-center-ripple />
            </div>
            <san-menu 
                open="{{ open }}" 
                maxHeight="{{ maxHeight }}" 
                useLayerForClickAway="{{ useLayerForClickAway }}" 
                anchorOrigin="{{ anchorOrigin }}" 
                targetOrigin="{{ targetOrigin }}"
                >
                <slot></slot>
            </san-menu>
            <p class="sm-iconmenu-tooltip {{ tooltipShow | yesToBe('show') }}">{{ tooltip }}</p>
            <div san-if="useLayerForClickAway" 
                class="sm-layer-for-click {{ !open | yesToBe('hidden') }}"
            ></div>
        </div>
    `,

    components: {
        'san-icon': Icon,
        'san-menu': Menu,
        'san-center-ripple': CenterRipple
    },

    initData() {
        return Object.assign({
            tooltipShow: false
        }, this.defaultData());
    },

    attached() {
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
san.inherits(IconMenu, MenuBase);

export default IconMenu;
