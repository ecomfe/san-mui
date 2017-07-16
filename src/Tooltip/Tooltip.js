/**
 * @file Tooltip
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import {create} from '../common/util/cx';
import Popover from '../Popover/Popover';

const cx = create('tooltip');

/**
 * 被移动的对齐角映射
 *
 * @const
 * @type {Object}
 */
const SOURCE_ORIGIN_MAP = {
    left: 'cr',
    right: 'cl',
    top: 'bc',
    bottom: 'tc'
};

/**
 * 目标对齐角映射
 *
 * @const
 * @type {Object}
 */
const TARGET_ORIGIN_MAP = {
    left: 'cl',
    right: 'cr',
    top: 'tc',
    bottom: 'bc'
};

/**
 * 对应各种位置的位移
 *
 * @const
 * @type {Object}
 */
const OFFSET_MAP = {
    left: [-1, 0],
    right: [1, 0],
    top: [0, -1],
    bottom: [0, 1]
};

export default class Tooltip extends Component {

    static template = `
        <div
            class="sm-tooltip"
            on-click="onClick"
            on-mouseenter="onMouseEnter"
            on-mouseleave="onMouseLeave">
            <sm-popover
                variants="tooltip"
                anchorOrigin="{{anchorOrigin}}"
                targetOrigin="{{targetOrigin}}"
                getAnchor="{{getAnchor}}"
                open="{=open=}"
                maxWidth="{{maxWidth}}"
                maxHeight="{{maxHeight}}"
                offsetX="{{offsetX}}"
                offsetY="{{offsetY}}">
                <slot name="title">{{title}}</slot>
            </sm-popover>
            <slot />
        </div>
    `;

    static computed = {
        className() {
            return cx(this)
                .addStates({
                    fluid: this.data.get('fullWidth')
                })
                .build();
        },
        anchorOrigin() {
            return TARGET_ORIGIN_MAP[this.data.get('position')];
        },
        targetOrigin() {
            return SOURCE_ORIGIN_MAP[this.data.get('position')];
        },
        offsetX() {
            let position = this.data.get('position');
            let offset = this.data.get('offset');
            let rate = OFFSET_MAP[position];
            return rate[0] * offset;
        },
        offsetY() {
            let position = this.data.get('position');
            let offset = this.data.get('offset');
            let rate = OFFSET_MAP[position];
            return rate[1] * offset;
        }
    };

    static components = {
        'sm-popover': Popover
    };

    initData() {
        return {
            open: false,
            mode: 'click',
            position: 'bottom',
            maxWidth: null,
            maxHeight: null,
            offset: 8,
            getAnchor: this.getPopoverAnchor.bind(this)
        };
    }

    /**
     * 获取 Popover 对齐锚点
     *
     * @private
     * @return {DOMElement}
     */
    getPopoverAnchor() {
        return this.el;
    }

    /**
     * 当鼠标移入 button
     *
     * @private
     */
    onMouseEnter() {
        if (this.data.get('mode') === 'hover') {
            this.showPopover();
        }
    }

    /**
     * 当鼠标移出
     *
     * @private
     */
    onMouseLeave() {
        if (this.data.get('mode') === 'hover') {
            this.hidePopover();
        }
    }

    /**
     * 点击事件处理
     *
     * @private
     */
    onClick() {
        if (this.data.get('mode') === 'click') {
            this.data.get('open') ? this.hidePopover() : this.showPopover();
        }
    }

    showPopover() {
        this.data.set('open', true);
    }

    hidePopover() {
        this.data.set('open', false);
    }

}
