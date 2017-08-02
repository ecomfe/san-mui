/**
 * @file MultiLevelDropdownMenu
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import {create} from '../common/util/cx';
import Menu from './Menu';
import Popover from '../Popover';
import TextField from '../TextField';

const cx = create('multi-level-dropdown-menu');

export default class MultiLevelDropdownMenu extends Component {

    static template = `
        <div
            class="{{mainClassName}}"
            style="{{dropDownMenuStyle}}"
            on-click="openPopover">
            <sm-popover
                ref="popover"
                open="{=open=}"
                maxHeight="{{maxHeight}}"
                useLayerForClickAway="{{!1}}"
                anchorOrigin="tl"
                targetOrigin="tl"
                getAnchor="{{getAnchor}}"
                matchAnchorWidth="{{!autoWidth}}"
                on-open-complete="{{adjustMenuItemPosition}}">
                <div style="display: flex;overflow:hidden;max-height:20rem;align-items:stretch">
                    <div class="${cx.getPartClassName('level1')}" style="overflow:auto">
                        <slot name="level1" />
                    </div>
                    <div class="${cx.getPartClassName('level2')}" style="overflow:auto">
                        <slot name="level2" />
                    </div>
                    <div class="${cx.getPartClassName('level3')}" style="overflow:auto">
                        <slot name="level3" />
                    </div
                </div>
            </sm-popover>
            <sm-text-field
                readOnly
                inputValue="{{displayText}}"
                disabled="{{disabled}}" />
        </div>
    `;

    static computed = {
        mainClassName() {
            return cx(this).build();
        }
    };

    static components = {
        'sm-menu': Menu,
        'sm-popover': Popover,
        'sm-text-field': TextField
    };

    initData() {
        return {
            autoWidth: true,
            readOnly: false,
            disabled: false,
            maxHeight: null,

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

    getAnchor() {
        return this.el;
    }

    openPopover() {

        let {readOnly, disabled} = this.data.get();
        if (readOnly || disabled) {
            return;
        }

        this.data.set('open', true);

    }

}
