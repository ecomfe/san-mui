/**
 * @file DropDownMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import Menu from './Menu';
import {TouchRipple} from '../Ripple';

let DropDownMenu = san.defineComponent({
    template: `
        <div
            class="{{ className }} sm-dropdown-menu {{ disabled | disabled }}"
            style="{{ style | padStyles }}"
        >

            <div class="sm-dropdown-menu-selected" 
                on-click="toggleMenu($event)" 
                style="{{ selectedMenuItemStyle | padStyles }}"
            >
                <p
                    class="sm-dropdown-menu-selected-label"
                    style="{{ labelStyle | padStyles }}"
                >{{ text }}</p>
                <slot name="iconButton"></slot>
                <div class="sm-dropdown-menu-underline" style="{{ underlineStyle | padStyles }}"></div>
                <san-touch-ripple />
            </div>

            <div class="sm-menu-list {{ open | notOpen('list-hidden') }}"
                style="{{menuStyleDefault | padStyles }}{{ menuStyle | padStyles }}">

                <slot></slot>
            </div>
            <div san-if="useLayerForClickAway" 
                class="sm-layer-for-click {{ open | notOpen('list-hidden') }}" 
                style="z-index:{{zIndex-1}}">
            </div>
        </div>
    `,

    components: {
        'san-touch-ripple': TouchRipple
    },

    initData() {
        return Object.assign({
            openImmediately: false
        }, this.defaultData());
    },

    attached() {
        if (this.data.get('openImmediately')) {
            this.toggleMenu();
        }

        this.data.set('text', this.data.get('text'));

        this.rootClass = '.' + this.data.get('className');
        this.clickerClass = '.sm-dropdown-menu-selected';

        this.bindEvent();
    }
});
san.inherits(DropDownMenu, Menu);

export default DropDownMenu;
