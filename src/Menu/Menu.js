/**
 * @file Menu Base
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import padStyles from '../filters/padStyles';
import service from './service';

export default san.defineComponent({

    defaultData() {
        return {
            open: false,
            disabled: false,
            multiple: false,
            autoWidth: true,
            maxHeight: 500,
            scroller: 'window',
            className: 'menu-' + Date.now(),
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }
        };
    },

    filters: {
        padStyles,

        notOpen(open, className) {
            return open ? '' : className;
        },

        disabled(disabled) {
            return disabled ? 'disabled' : '';
        }
    },

    inited() {
        this.data.set('open', service.propConvert(this.data.get('open'), 'b'));
        this.data.set('multiple', service.propConvert(this.data.get('multiple'), 'b'));
        this.data.set('disabled', service.propConvert(this.data.get('disabled'), 'b'));
        this.data.set('autoWidth', service.propConvert(this.data.get('autoWidth'), 'b'));
        this.data.set('itemClickClose', service.propConvert(this.data.get('itemClickClose'), 'b'));
        this.data.set('openImmediately', service.propConvert(this.data.get('openImmediately'), 'b'));
        this.data.set('useLayerForClickAway', service.propConvert(this.data.get('useLayerForClickAway'), 'b'));

        let scrollerName = this.data.get('scroller');
        this.scroller = document.getElementsByTagName(scrollerName)[0]
            || document.getElementsByClassName(scrollerName)[0]
            || document.getElementById(scrollerName)
            || window;

        this.items = [];
    },

    created() {
        this.handleClickOff = this.handleClickOff.bind(this);
        this.handleMenuPos = this.handleMenuPos.bind(this);
    },

    messages: {
        'UI:menu-item-selected'(arg) {
            let value = arg.value.value;
            let selectValue = this.data.get('value');

            // 多选
            if (this.data.get('multiple')) {

                let len = selectValue.length;
                let hasSelected = false;

                while (len--) {
                    if (selectValue[len] === value) {
                        selectValue.splice(len, 1);
                        hasSelected = true;
                        break;
                    }
                }

                if (!hasSelected) {
                    selectValue.push(value);
                }
            }
            // 单选
            else {
                selectValue = value;
            }

            this.data.set('value', selectValue);

            // 通过改变为每一个menu item的selectValue值，改变其已选状态
            let len = this.items.length;
            while (len--) {
                this.items[len].data.set('selectValue', selectValue);
            }

            // 触发owner的onChange
            this.fire('change', selectValue);
            // 收起menu
            this.toggleMenu(arg.value.evt, true, 'ITEM');
        },

        'UI:menu-item-selected-text'(arg) {
            this.data.set('text', arg.value);
        },

        'UI:menu-item-attached'(arg) {
            this.items.push(arg.target);
            // 没有value默认填充第一个item的值
            // arg.target.data.set('selectValue', this.data.get('value'));
            arg.target.data.set('selectValue', this.data.get('value') || this.items[0].data.get('value'));
        },

        'UI:menu-item-detached'(arg) {
            let len = this.items.length;

            while (len--) {
                if (this.items[len] === arg.target) {
                    this.items.splice(len, 1);
                }
            }
        }
    },

    /**
     * 事件绑定
     */
    bindEvent() {

        // 点击menu外位置隐藏menu
        document.body.addEventListener('click', this.handleClickOff);

        // 页面滚动过程中调整menu位置
        this.scroller.addEventListener('scroll', this.handleMenuPos);
    },

    handleClickOff(e) {
        e.stopPropagation();
        e.preventDefault();

        if (!this.toggleAction) {
            return;
        }
        this.toggleAction--;

        this.toggleMenu(null, true, 'BODY');
    },

    handleMenuPos() {
        let lastMove = this.lastMove || document.body.scrollTop || document.documentElement.scrollTop;
        // 已滚动高度
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // 上滑or下滑
        let downward = scrollTop - lastMove > 0;
        // menu上下边缘的offset
        let menuOffsetTop = document.querySelector(this.rootClass).offsetTop + (this.data.get('top') || 0);
        let menuOffsetBottom = menuOffsetTop + service.getOffset(`${this.rootClass} .sm-menu-list`, 'height');

        // 当上边缘 到顶/底，hide
        if (scrollTop >= menuOffsetTop && downward) {
            this.toggleMenu(null, true, 'POS');
        }
        if (scrollTop + screen.availHeight <= menuOffsetTop && !downward) {
            this.toggleMenu(null, true, 'POS');
        }

        // 当下边缘 到底，切换origin，反弹
        if (scrollTop + screen.availHeight <= menuOffsetBottom && !downward) {
            let anchorOrigin = Object.assign({}, this.data.get('anchorOrigin'));
            let targetOrigin = Object.assign({}, this.data.get('targetOrigin') || {
                vertical: 'top',
                horizontal: 'left'
            });

            anchorOrigin.vertical = 'bottom';
            targetOrigin.vertical = 'bottom';
            this.setPos(anchorOrigin, targetOrigin);
        }

        lastMove = scrollTop;       
    },

    /**
     * menu开关toggle
     *
     * @param {Object} evt event
     * @param {boolean} toClose 是否关闭menu
     * @param {string} driver 开关驱动者
     */
    toggleMenu(evt, toClose, driver) {
        evt && evt.stopPropagation();

        if (this.data.get('disabled')) {
            return;
        }

        let open = !this.data.get('open');
        if (typeof toClose !== 'undefined') {
            open = !toClose;
        }

        if (!open && driver === 'ITEM' && this.data.get('itemClickClose') === false) {
            return;
        }
        else if (open) {
            this.toggleAction = 1;
        }

        // toggle效果
        this.data.set('transform', 'scale(1, 0)');

        // hide
        if (!open) {
            this.data.set('open', false);
            this.fire('close');
            return;
        }

        // show
        this.data.set('open', true);
        setTimeout(() => {
            this.setProperPos();
            this.data.set('transform', 'scale(1, 1)');
        }, 0);
    },

    setProperPos() {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        // menu上下边缘的offset
        let menuOffsetTop = document.querySelector(this.rootClass).offsetTop;
        let menuOffsetBottom = menuOffsetTop + service.getOffset(`${this.rootClass} .sm-menu-list`, 'height');

        let anchorOrigin = Object.assign({}, this.data.get('anchorOrigin'));
        let targetOrigin = Object.assign({}, this.data.get('targetOrigin') || {
            vertical: 'top',
            horizontal: 'left'
        });

        // 当上边缘 到顶
        if (scrollTop >= menuOffsetTop) {
            anchorOrigin.vertical = 'top';
            targetOrigin.vertical = 'top';
        }
        // 当下边缘 到底
        if (scrollTop + screen.availHeight <= menuOffsetBottom) {
            anchorOrigin.vertical = 'bottom';
            targetOrigin.vertical = 'bottom';
        }

        this.data.set('transformOrigin', `${targetOrigin.horizontal} ${targetOrigin.vertical}`);
        this.setPos(anchorOrigin, targetOrigin);
    },

    /**
     * 根据anchorOrigin和targetOrigin调整menu的显示位置
     *
     * @param {Object} anchorOrigin 组件内部操作时自定义的anchor
     * @param {Object} targetOrigin 组件内部操作时自定义的target
     */
    setPos(anchorOrigin, targetOrigin) {
        let left = 0;
        let top = 0;
        let root = this.rootClass;
        let clicker = this.clickerClass;

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
            case 'left':
                left += 0;
                break;
            case 'center':
                left += clickerW / 2;
                break;
            case 'right':
                left += clickerW;
        }

        switch (anchorVerti) {
            case 'top':
                top += 0;
                break;
            case 'middle':
                top += clickerH / 2;
                break;
            case 'bottom':
                top += clickerH;
        }

        switch (targetHoriz) {
            case 'left':
                left -= 0;
                break;
            case 'center':
                left -= menuW / 2;
                break;
            case 'right':
                left -= menuW;
        }

        switch (targetVerti) {
            case 'top':
                top -= 0;
                break;
            case 'middle':
                top -= menuH / 2;
                break;
            case 'bottom':
                top -= menuH;
        }

        this.data.set('left', left);
        this.data.set('top', top);
    },

    disposed() {
        document.body.removeEventListener('click', this.handleClickOff);
        this.scroller.removeEventListener('scroll', this.handleMenuPos);
    }
});
