/**
 * @file Toast
 *@author zhangsiyuan<zhangsiuan@baidu.com>
 */

import {create} from '../common/util/cx';
import css from '../common/util/css';
import Layer from '../Layer';

const cx = create('toast');

const POSITION_BASE_MAP = {
    leftTop: {
        left: '24px',
        top: '-24px'
    },
    rightTop: {
        right: '24px',
        top: '-24px'
    },
    leftBottom: {
        left: '24px',
        bottom: '-24px'
    },
    rightBottom: {
        right: '24px',
        bottom: '-24px'
    }
};

const POSITION_TRANSLATE_MAP = {
    leftTop: 1,
    rightTop: 1,
    leftBottom: -1,
    rightBottom: -1
};

export default class Toast extends Layer {

    static template = `
        <div
            class="{{computedClassName}}"
            style="{{wrapperStyle}}">

            <span
                class="${cx.getPartClassName('content')}"
                style="{{contentStyle}}">
                {{message}}
            </span>
            <slot></slot>
        </div>
    `;

    initData() {
        return {
            open: false,
            position: 'rightBottom',
            duration: 2000
        };
    }

    static computed = {
        computedClassName() {
            let open = this.data.get('open');
            let position = this.data.get('position');
            return cx(this)
                .addStates({
                    open,
                    hidden: !open
                })
                .addVariants(position)
                .build();
        },
        wrapperStyle() {
            let open = this.data.get('open');
            let position = this.data.get('position');
            let visibility = open ? 'visible' : 'hidden';
            let transform = open ? `translate(0, ${POSITION_TRANSLATE_MAP[position] * 48}px)` : '';
            let opacity = open ? 1 : 0;

            return css({
                ...POSITION_BASE_MAP[position],
                transform,
                visibility,
                opacity
            });
        },
        contentStyle() {
            let open = this.data.get('open');
            let opacity = open ? 1 : 0;

            return css({
                opacity
            });
        }
    };

    onClickAway(e) {

        let el = this.el;

        if (e.target !== el && !el.contains(e.target)) {
            this.data.set('open', false);
            this.clearHideTimer();
        }

    }

    bindToWindow() {
        // 这里用 capture 模式方便一点
        // 用冒泡模式需要停止向上冒泡
        window.addEventListener('click', this.onClickAway, true);
    }

    unbindToWindow() {
        window.removeEventListener('click', this.onClickAway, true);
    }

    clearHideTimer() {
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
    }

    inited() {
        this.onClickAway = this.onClickAway.bind(this);
    }

    attached() {
        super.attached();
        this.watch('open', open => {

            if (!open) {
                this.clearHideTimer();
                this.unbindToWindow();
                return;
            }

            this.bindToWindow();

            // 移除之前存在的计时器 && 设置新的计时器，到时后改变open状态并移除clickoutside监听
            this.clearHideTimer();

            this.hideTimer = setTimeout(
                () => {
                    this.data.set('open', false);
                    this.unbindToWindow();
                },
                this.data.get('duration')
            );

        });

    }

    detached() {
        this.clearHideTimer();
        this.unbindToWindow();
    }

}
