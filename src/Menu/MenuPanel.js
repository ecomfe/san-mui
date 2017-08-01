/**
 * @file Menu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import {Component} from 'san';
import Popover from '../Popover';
import Paper from '../Paper';
import * as C from './constant';
import {create} from '../common/util/cx';
import Menu from './Menu';
import MenuItem from './MenuItem';

const cx = create('menu-panel');

export default class MenuPanel extends Component {

    static template = `
    <div class="{{className}}">
        <sm-menu style="min-width: 15rem; max-height: 20rem;overflow: auto">
            <sm-menu-item
                s-ref="menu"
                s-for="item, index in data"
                value="{{item.value}}"
                title="{{item.title}}"
                popupAlignToParentMenu
                menuIndex="{{index}}"
                cascade="{{item.children && item.children.length}}">
            </sm-menu-item>
        </san-menu>
        <sm-popover
            san-if="data && data.length"
            open="{=subMenuOpen=}"
            getAnchor="{{getAnchor}}"
            anchorOrigin="tr"
            offsetX="{{2}}">
            <sm-menu-panel level="{{level + 1}}" data="{{subList}}"></sm-menu-panel>
        </sm-popover>
    </div>
    `;

    static computed = {
        className() {
            return cx(this).build();
        }
    };

    static messages = {
        [C.MENU_ITEM_COLLAPSE](msg) {
            this.data.set('subList', []);
            // msg.target.data.set('subMenuOpen', false);
            this.data.set('subMenuOpen', false);
        },
        [C.MENU_ITEM_EXPAND](msg) {
            this.data.set('subList', []);
            this.data.set('subMenuOpen', false);
            let target = msg.value;
            let index = target.data.get('menuIndex');
            let children = this.data.get(`data[${index}]`).children;

            // 增加一些延时，这样在同级的子菜单在切换时有展开的效果
            this.timer = setTimeout(() => {
                this.data.set('subList', children);
                this.data.set('subMenuOpen', true);
            }, 100);
        }
    };

    static components = {
        'sm-popover': Popover,
        'sm-paper': Paper,
        'sm-menu': Menu,
        'sm-menu-item': MenuItem,
        'sm-menu-panel': 'self'
    };

    attached() {

        // 自己作为子菜单的数据为空时，将自己的子菜单的数据也清空并且关闭，将关闭的效果传播下去
        this.watch('data', val => {
            if (!val || !val.length) {
                this.data.set('subList', []);
                this.data.set('subMenuOpen', false);
            }
        });
    }

    initData() {
        return {
            level: 0,
            getAnchor: this.getAnchor.bind(this)
        };
    }

    getAnchor() {
        return this.el;
    }

    disposed() {
        clearTimeout(this.timer);
    }
}
