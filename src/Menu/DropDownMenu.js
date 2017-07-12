/**
 * @file DropDownMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import {Component} from 'san';
import {TouchRipple} from '../Ripple';
import Menu from './Menu';
import Popover from '../Popover';
import TextField from '../TextField';
import {create} from '../common/util/cx';
import Paper from '../Paper';
import Icon from '../Icon';
import * as C from './constant';

const cx = create('dropdown-menu');

export default class DropDownMenu extends Component {

    static template = `
        <div
            class="{{mainClassName}}"
            style="{{dropDownMenuStyle}}"
            on-click="openPopover">
            <sm-popover
                open="{=open=}"
                maxHeight={{maxHeight}}
                useLayerForClickAway="{{!1}}"
                anchorOrigin="tl"
                targetOrigin="tl"
                getAnchor="{{getAnchor}}"
                matchAnchorWidth="{{!autoWidth}}">
                <sm-paper style="{{autoWidth ? '' : 'display: block'}}">
                    <slot />
                </sm-paper>
            </sm-popover>
            <sm-text-field
                readOnly
                inputValue="{{displayText}}"
                disabled="{{disabled}}" />
            <div class="${cx.getPartClassName('icon')}" fullWidth>
                <sm-icon>arrow_drop_down</sm-icon>
            </div>
        </div>
    `;

    static computed = {
        mainClassName() {
            return cx(this).build();
        }
    };

    static components = {
        'sm-touch-ripple': TouchRipple,
        'sm-menu': Menu,
        'sm-popover': Popover,
        'sm-text-field': TextField,
        'sm-paper': Paper,
        'sm-icon': Icon
    };

    static messages = {
        [C.MENU_ITEM_INITED](e) {
            this.items.push(e.target);
            let targetData = e.target.data;
            let {value, label, title} = targetData.get();
            let selected = this.data.get('value') === value;

            targetData.set('type', 'option');
            targetData.set('selected', selected);

            if (selected) {
                this.data.set('displayText', label || title || value);
            }

        },
        [C.MENU_ITEM_OPTION_SELECTED]({target}) {
            let {value, label, title} = target.data.get();
            if (this.data.get('value') === value) {
                return;
            }
            this.data.set('value', value);
            this.data.set('displayText', label || title || value);
            this.items.forEach(item => {
                if (item !== target) {
                    item.data.set('selected', false);
                }
            });
            this.data.set('open', false);
            this.fire('change', value);
        }
    };

    initData() {
        return {
            autoWidth: true,
            readOnly: false,
            disabled: false,

            /**
             * 是否打开弹窗
             * @type {boolean}
             */
            open: false,

            /**
             * 显示已选中选项的文本
             *
             * @type {String}
             */
            displayText: '',

            /**
             * 给 popover 使用的获取定位元素的谢谢老婆
             *
             * @private
             * @type {Function}
             */
            getAnchor: this.getAnchor.bind(this)
        };
    }

    inited() {
        this.items = [];
    }

    attached() {
        this.watch('value', nextValue => {
            let nextDisplayText = '';
            for (let item of this.items) {
                let {title, label, value} = item.data.get();
                if (nextValue === value) {
                    item.data.set('selected', true);
                    nextDisplayText = label || title || value;
                }
                else {
                    item.data.set('selected', false);
                }
            }
            this.data.set('displayText', nextDisplayText);
        });
    }

    detached() {
        this.items.length = 0;
        this.items = null;
    }

    getAnchor() {
        return this.el;
    }

    openPopover() {
        let {readOnly, disabled} = this.data.get();
        if (!readOnly && !disabled) {
            this.data.set('open', true);
        }
    }

}
