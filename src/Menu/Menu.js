/**
 * @file Menu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import {Component} from 'san';
import * as C from './constant';
import {create} from '../common/util/cx';

const cx = create('menu');

export default class Menu extends Component {

    static template = `
        <div class="{{className}}" data-level="{{level}}">
            <slot></slot>
        </div>
    `;

    static computed = {
        className() {
            return cx(this).build();
        }
    };

    static messages = {
        [C.MENU_ITEM_INITED](e) {
            let item = e.target;
            // 在 item inited 时设置它的 level，这样 item 可以把 level 传递给自己的 submenu
            // 这里 menu 和自己的 menu-item 保持同级，menu-item 的 submenu 是 menu-item 的 level + 1
            item.data.set('level', this.data.get('level'));
            this.items.push(e.target);
        },
        [C.MENU_ITEM_DETACHED](e) {
            this.items = this.items.filter(item => item !== e.target);
        },
        [C.MENU_ITEM_EXPAND](e) {
            this.items.forEach(item => {
                if (item !== e.target) {
                    item.data.set('subMenuOpen', false);
                }
            });
        },
        [C.MENU_ITEM_CLICK](e) {
            // 这里是点击某个 command item 之后触发的逐级关闭处理
            this.items.forEach(item => item.data.set('subMenuOpen', false));
            if (this.data.get('level') > 0) {
                this.dispatch(C.MENU_ITEM_CLICK);
            }
        }
    };

    initData() {
        return {

            /**
             * 嵌套层级
             *
             * @protected
             * @type {number}
             */
            level: 0
        };
    }

    inited() {
        this.items = [];
        this.menus = [];
        this.dispatch(C.MENU_INITED);
    }

    attached() {
        this.updateLeftPadding();
    }

    detached() {
        this.items.length = 0;
        this.items = null;
        this.dispatch(C.MENU_DETACH);
    }

    /**
     * 对左侧缩进做处理
     *
     * 由于如果 menu 中的 item 有任意一个带有 icon，那么整个 menu 都需要有左侧缩进
     * 因此在此处处理
     */
    updateLeftPadding() {
        let hasLeft = false;
        for (let item of this.items) {
            if (item.data.get('hasLeft')) {
                hasLeft = true;
                break;
            }
        }
        for (let item of this.items) {
            item.data.set('hasLeft', hasLeft);
        }
    }

    closeAllItems() {
        this.items.forEach(item => {
            if (item.data.get('subMenuOpen')) {
                item.data.set('subMenuOpen', false);
            }
        });
    }

}
