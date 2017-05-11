/**
 * @file DropDownMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import MenuBase from './MenuBase';
import {TouchRipple} from '../Ripple';
import Menu from './Menu';

let DropDownMenu = san.defineComponent({
    template: `
        <div
            class="{{ className }} sm-dropdown-menu {{ disabled | yesToBe('disabled') }}"
            style="{{ dropDownMenuStyle }}">
            <div class="sm-dropdown-menu-selected" 
                on-click="toggleMenu($event)" 
                style="{{ selectedMenuItemStyle }}">
                <p
                    class="sm-dropdown-menu-selected-label"
                    style="{{ labelStyle }}"
                >{{ text }}</p>
                <slot name="iconButton"></slot>
                <div class="sm-dropdown-menu-underline" style="{{ underlineStyle }}"></div>
                <san-touch-ripple />
            </div>
            <san-menu 
                open="{{ open }}" 
                maxHeight="{{ maxHeight }}" 
                useLayerForClickAway="{{ useLayerForClickAway }}" 
                anchorOrigin="{{ anchorOrigin }}" 
                targetOrigin="{{ targetOrigin }}"
                openImmediately="{{ openImmediately }}"
                menuStyle="{{ menuStyle }}"
                >
                <slot></slot>
            </san-menu>
            <div san-if="useLayerForClickAway" 
                class="sm-layer-for-click {{ !open | yesToBe('list-hidden') }}" 
            ></div>
        </div>
    `,

    components: {
        'san-touch-ripple': TouchRipple,
        'san-menu': Menu
    },

    initData() {
        return Object.assign({
            openImmediately: false
        }, this.defaultData());
    },

    attached() {
        this.data.set('text', this.data.get('text'));
        this.bindEvent();
    }
});
san.inherits(DropDownMenu, MenuBase);

export default DropDownMenu;
