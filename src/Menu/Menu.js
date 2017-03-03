/**
 * @file Menu Base
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import {padStyles} from './filters';
import service from './service';

export default san.defineComponent({

    defaultData() {
        return {
            open: false,
            animated: true,
            disabled: false,
            autoWidth: true,
            maxHeight: 500,
            scroller: window,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
            },
            multiple: false
        };
    },

    filters: {
        padStyles
    },

    bindEvents() {
        let me = this;

        document.body.addEventListener('click', (event) => {
            if (me.toggleAction) {
                me.toggleAction--;
                return;
            }

            me.toggleMenu(true);
        });

        this.data.get('scroller').addEventListener('scroll', (event) => {
            // if 上边缘 到顶/底，hide
            // if 下边缘 到底
            //     if targetOrigin 在左上角，换到左下角
            //     else 换回左上角
            //          if 这种情况下往上滚，第一个item露出全貌 ，换回左下角

        });
    },

    /**
     * menu开关toggle
     *
     * @param {boolean} toClose 是否关闭menu
     */
    toggleMenu(toClose) {

        let open = !this.data.get('open');
        if (typeof toClose !== 'undefined') {
            open = !toClose;
        }

        open && (this.toggleAction = 2);

        if (this.data.get('animated')) {
            let animation = this.animation;

            // 定制动画
            if (this.data.get('animation') && typeof this.data.get('animation') === 'function') {
                animation = this.data.get('animation');
            }

            animation.call(this, open);
        }
        else {
            this.data.set('open', open);
            setTimeout(() => this.adjustPos(), 0);
        }
    },

    /**
     * 开关menu的默认动画
     *
     * @param {boolean} open 是否打开menu
     */
    animation(open) {
        this.data.set('maxHeightS', 0);
        this.data.set('opacity', 0);

        // hide
        if (!open) {
            this.data.set('open', false);
            return;
        }

        // show
        this.data.set('open', true);

        setTimeout(() => {
            let childrenNum = document.querySelectorAll(`${this.rootClass} .sm-menu-item`).length;
            let heightSolo = service.getOffset(`${this.rootClass} .sm-menu-item`, 'height');

            this.adjustPos();
            this.data.set('opacity', 1);
            this.data.set(
                'maxHeightS',
                Math.min(childrenNum * heightSolo, this.data.get('maxHeight'))
            );
        }, 0);
    },

    /**
     * 根据anchorOrigin和targetOrigin调整menu的显示位置
     *
     * @param {Object} anchorOrigin 组件内部操作时自定义的anchor
     * @param {Object} targetOrigin 组件内部操作时自定义的target
     */
    adjustPos(anchorOrigin, targetOrigin) {
        let [left, top, root, clicker] = [0, 0, this.rootClass, this.clickerClass];

        let {
            horizontal: anchorHoriz,
            vertical: anchorVerti
        } = anchorOrigin || this.data.get('anchorOrigin') || {};

        let {
            horizontal: targetHoriz,
            vertical: targetVerti
        } = targetOrigin || this.data.get('targetOrigin') || {};

        let [clickerW, clickerH, menuW, menuH] = [
            service.getOffset(`${root} ${clicker}`, 'width'),
            service.getOffset(`${root} ${clicker}`, 'height'),
            service.getOffset(`${root} .sm-menu-list`, 'width'),
            service.getOffset(`${root} .sm-menu-list`, 'height')
        ];

        switch (anchorHoriz) {
            case 'left': left += 0; break;
            case 'center': left += clickerW / 2; break;
            case 'right': left += clickerW;
        };

        switch (anchorVerti) {
            case 'top': top += 0; break;
            case 'middle': top += clickerH / 2; break;
            case 'bottom': top += clickerH;
        };

        switch (targetHoriz) {
            case 'left': left -= 0; break;
            case 'center': left -= menuW / 2; break;
            case 'right': left -= menuW;
        };

        switch (targetVerti) {
            case 'top': top -= 0; break;
            case 'middle': top -= menuH / 2; break;
            case 'bottom': top -= menuH;
        };

        this.data.set('left', left);
        this.data.set('top', top);
    }
});
