/**
 * @file DropDownMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './DropDownMenu.styl';
import template from './DropDownMenu.tpl';
import Menu from './Menu';

function DropDownMenu() {
    Menu.call(this, {});
}
san.inherits(DropDownMenu, Menu);

DropDownMenu.prototype.template = template;

DropDownMenu.prototype.initData = function () {
    return Object.assign({
        openImmediately: false,
        className: 'drop-down-menu'
    }, this.defaultData());
};

DropDownMenu.prototype.attached = function () {
    console.log(this.data)
    if (this.data.get('openImmediately')) {
        this.toggleMenu();
    }

    this.watch('text', () => {
        this.toggleMenu(true);
    });

    this.bindEvents();
};

export default DropDownMenu;
