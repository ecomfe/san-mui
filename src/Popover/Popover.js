/**
 * @file Popover
 * @author leon <ludafa@outlook.com>
 */

import Layer from '../Layer';
import {create} from '../common/util/cx';
import align from 'dom-align';

const cx = create('popover');
const INITIAL_POSITION_STYLE = 'top: -9999px; left: -9999px';
const ORIGIN_STYLE_MAP = {
    t: 'top',
    c: 'center',
    b: 'bottom',
    l: 'left',
    r: 'right'
};

export default class Popover extends Layer {

    static template = `
        <div class="{{className}}" on-click="click($event)">
            <div
                class="${cx.getPartClassName('content')}"
                style="${INITIAL_POSITION_STYLE}"
                on-transitionend="transitionEnd">
                <slot />
            </div>
        </div>
    `;

    static computed = {
        className() {
            let closing = this.data.get('closing');
            let open = this.data.get('open');
            return cx(this)
                .addStates({
                    open: !closing && open
                })
                .build();
        }
    };

    initData() {
        return {
            open: false,
            anchorOrigin: 'tl',
            targetOrigin: 'tl',
            offsetX: 0,
            offsetY: 0,
            closing: false
        };
    }

    inited() {
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        // this.hideIfScrollOutVision = this.hideIfScrollOutVision.bind(this);
    }

    attached() {
        super.attached();
        this.watch('open', this.updateStatus);
        if (this.data.get('open')) {
            this.show();
        }
    }

    updateStatus(open) {
        this[open ? 'show' : 'hide']();
    }

    getContent() {
        return this.el.firstElementChild;
    }

    getTransfromOrigin(origin) {
        let [top, left] = origin;
        return `${ORIGIN_STYLE_MAP[top]} ${ORIGIN_STYLE_MAP[left]}`;
    }

    show() {

        let {
            getAnchor,
            targetOrigin,
            anchorOrigin,
            offsetX,
            offsetY,
            matchAnchorWidth
        } = this.data.get();

        let anchor = typeof getAnchor === 'function' && getAnchor();

        if (!anchor) {
            return;
        }

        let content = this.getContent();

        if (matchAnchorWidth) {
            content.style.width = `${anchor.offsetWidth}px`;
        }

        // 这里要把 closing 清理掉，要不然在快速点击时有残留；
        this.data.set('closing', false);

        // 设置缩放动画的起点
        content.style.transformOrigin = this.getTransfromOrigin(targetOrigin);

        // 对齐元素
        align(
            this.el.firstElementChild,
            anchor,
            {
                points: [targetOrigin, anchorOrigin],
                offset: [offsetX, offsetY],
                overflow: {
                    adjustX: true,
                    adjustY: true
                },
                useCssTransform: false
            }
        );

        // 绑定 clickAway 处理
        // @hack: 这里延迟绑定 click 事件，已免此次点击事件冒泡到 body 误触发 hide
        setTimeout(() => {
            if (this.data.get('open')) {
                window.addEventListener('click', this.hide);
            }
        }, 1);

        // 滚出视野关闭处理
        // @TODO
        // window.addEventListener('scroll', this.hideIfScrollOutVision);

    }

    hide() {
        window.removeEventListener('click', this.hide);
        this.data.set('open', false);
        this.data.set('closing', true);
        // window.removeEventListener('scroll', this.hideIfScrollOutVision);
    }

    click(e) {
        e.stopPropagation();
    }

    transitionEnd() {
        if (this.data.get('open')) {
            return;
        }
        this.data.set('closing', false);
        this.data.set('open', false);
        let content = this.getContent();
        content.style.top = 0;
        content.style.left = '-10000px';
    }

    // hideIfScrollOutVision() {
    //     // if (!this.data.get('open')) {
    //     //     return;
    //     // }
    //     //
    //     // let lastMove = this.lastMove || document.body.scrollTop || document.documentElement.scrollTop;
    //     // // 已滚动高度
    //     // let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //     // // 上滑or下滑
    //     // let downward = scrollTop - lastMove > 0;
    //     //
    //     // // let menuOffsetTop = driver === 'OPEN' ? this.parentMenu.offsetTop : this.el.offsetTop;
    //     // driver === 'OPEN' && this.setPos();
    //     // let menuOffsetTop = this.data.get('top');
    //     // let menuOffsetBottom = menuOffsetTop + this.el.offsetHeight;
    //     //
    //     // let anchorOrigin = Object.assign({}, this.data.get('anchorOrigin'));
    //     // let targetOrigin = Object.assign({}, this.data.get('targetOrigin'));
    //     //
    //     // // menu上边缘到顶
    //     // if (scrollTop >= menuOffsetTop) {
    //     //     // open操作，调整menu位置
    //     //     if (driver === 'OPEN') {
    //     //         anchorOrigin.vertical = 'top';
    //     //         targetOrigin.vertical = 'top';
    //     //     }
    //     //     // 上滑操作，hide menu
    //     //     else if (downward) {
    //     //         this.dispatch('UI:menu-panel-status-changed', {
    //     //             driver: 'POS',
    //     //             open: false
    //     //         });
    //     //     }
    //     // }
    //     // // 下滑操作致menu上边缘到底，hide menu
    //     // if (scrollTop + window.innerHeight <= menuOffsetTop && !downward) {
    //     //     this.dispatch('UI:menu-panel-status-changed', {
    //     //         driver: 'POS',
    //     //         open: false
    //     //     });
    //     // }
    //     // // menu下边缘到底，切换origin，反弹
    //     // if (scrollTop + window.innerHeight <= menuOffsetBottom) {
    //     //     if (driver === 'OPEN' || (driver !== 'OPEN' && !downward)) {
    //     //         anchorOrigin.vertical = 'bottom';
    //     //         targetOrigin.vertical = 'bottom';
    //     //         this.setPos(anchorOrigin, targetOrigin);
    //     //     }
    //     // }
    //     //
    //     // driver === 'OPEN' && this.setPos(anchorOrigin, targetOrigin);
    //     // this.lastMove = scrollTop;
    // }

}
