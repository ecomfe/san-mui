/**
 * @file DropDownMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './DropDownMenu.styl';
import Menu from './Menu';
import {TouchRipple} from '../Ripple';

let DropDownMenu = san.defineComponent({
    template: `
<div
    class="{{ className }} sm-dropdown-menu {{ disabled | disabled }}"
    style="{{ style | padStyles }}"
    >

    <div class="sm-dropdown-menu-selected" on-click="toggleMenu($event)" style="{{ selectedMenuItemStyle | padStyles }}">
        <p
            class="sm-dropdown-menu-selected-label"
            style="{{ labelStyle | padStyles }}"
        >{{ text }}</p>
        <slot name="iconButton"></slot>
        <div class="sm-dropdown-menu-underline" style="{{ underlineStyle | padStyles }}"></div>
        <san-touch-ripple />
    </div>

    <div class="sm-menu-list {{ open | notOpen('list-hidden') }}"
        style="{{menuStyleDefault | padStyles }};{{ menuStyle | padStyles }};">

        <slot></slot>
    </div>
</div>
    `,

    components: {
        'san-touch-ripple': TouchRipple
    },

    computed: {
        menuStyleDefault() {
            return {
                'transform': this.data.get('transform'),
                'transform-origin': this.data.get('transformOrigin'),
                'left': this.data.get('left') + 'px',
                'top': this.data.get('top') + 'px',
                'max-height': this.data.get('maxHeight') + 'px'
            };
        }
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
