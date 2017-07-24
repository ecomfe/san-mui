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
        [C.MENU_INITED](e) {
            e.target.data.set('level', this.data.get('level') + 1);
        },
        [C.MENU_COLLAPSE](e) {
            this.items.forEach(item => {
                item.data.set('subMenuOpen', false);
            });
            if (this.data.get('level') > 0) {
                this.dispatch(C.MENU_COLLAPSE);
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
        this.dispatch(C.MENU_INITED);
    }

    attached() {
        this.updateLeftPadding();
    }

    detached() {
        this.items.length = 0;
        this.items = null;
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

}
