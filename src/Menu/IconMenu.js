/**
 * @file IconMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './IconMenu.styl';
import template from './IconMenu.tpl';
import Icon from '../Icon';
import service from './service';

export default san.defineComponent({
    template,

    components: {
        'san-icon': Icon
    },

    initData() {
        return {
            // 可定制的属性
            open: false,
            animated: false,
            itemClickClose: true,
            anchorOrigin: {
                horizontal: 'left',
                vertical: 'top'
            },
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top'
            },
            maxHeight: 500,
            multiple: false,
            scroller: window
        };
    },

    attached() {
        let me = this;
        let lastMove;

        this.data.get('scroller').addEventListener('scroll', (event) => {
            lastMove = lastMove || document.body.scrollTop || document.documentElement.scrollTop;
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            let downward = scrollTop - lastMove > 0;

            // TODO
            let menuOffsetTop = document.querySelector('.sm-iconmenu').offsetTop + (this.data.get('top') || 0);
            let menuOffsetBottom = menuOffsetTop + service.getOffset('.sm-iconmenu .sm-menu-list', 'height');

            // 上边缘 到顶/底，hide
            if (scrollTop >= menuOffsetTop && downward) {
                me.toggleMenu(true);
            }
            if (scrollTop + screen.availHeight <= menuOffsetTop && !downward) {
                me.toggleMenu(true);
            }

            // 下边缘 到底，切换origin，反弹
            if (scrollTop + screen.availHeight <= menuOffsetBottom && !downward) {
                let anchorOrigin = me.data.get('anchorOrigin');
                let targetOrigin = me.data.get('targetOrigin') || {
                    vertical: 'top',
                    horizontal: 'left'
                };

                anchorOrigin.vertical = 'bottom';
                targetOrigin.vertical = 'bottom';
                me.adjustPos(anchorOrigin, targetOrigin);
            }

            lastMove = scrollTop;

        });
    },

    /**
     * menu开关toggle
     */
    toggleMenu() {

        let open = !this.data.get('open');

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
            let childrenNum = document.querySelectorAll('.sm-iconmenu .sm-menu-item').length;
            let heightSolo = service.getOffset('.sm-iconmenu .sm-menu-item', 'height');

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
     */
    adjustPos(anchorOrigin, targetOrigin) {
        let [left, top] = [0, 0];
        let {
            horizontal: anchorHoriz,
            vertical: anchorVerti
        } = anchorOrigin || this.data.get('anchorOrigin') || {};

        let {
            horizontal: targetHoriz,
            vertical: targetVerti
        } = targetOrigin || this.data.get('targetOrigin') || {};

        let [iconW, iconH, menuW, menuH] = [
            service.getOffset('.sm-iconmenu .sm-iconmenu-icon', 'width'),
            service.getOffset('.sm-iconmenu .sm-iconmenu-icon', 'height'),
            service.getOffset('.sm-iconmenu .sm-menu-list', 'width'),
            service.getOffset('.sm-iconmenu .sm-menu-list', 'height')
        ];

        switch (anchorHoriz) {
            case 'left': left += 0; break;
            case 'center': left += iconW / 2; break;
            case 'right': left += iconW;
        };

        switch (anchorVerti) {
            case 'top': top += 0; break;
            case 'middle': top += iconH / 2; break;
            case 'bottom': top += iconH;
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
