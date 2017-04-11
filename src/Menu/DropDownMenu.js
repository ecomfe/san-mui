/**
 * @file DropDownMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './DropDownMenu.styl';
import template from './DropDownMenu.tpl';
import Menu from './Menu';
import {TouchRipple} from '../Ripple';

let DropDownMenu = san.defineComponent({
    template,

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
