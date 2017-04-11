/**
 * @file Popover/index.js Popover component for San
 * @author zhangzhiqiang(zhiqiangzhang37@gmail.com)
 */

import './index.styl';
import san from 'san';
import template from './index.tpl';

const openKey = 'open';
const animationKey = 'animation';
const showArrowKey = 'showArrow';
const placementKey = 'placement';
const triggerKey = 'triggerEleId';
const triggerOperationKey = 'triggerOperation';
const defaultPlacement = 'bottom';
const defaultTriggerOperation = 'click';
const placementType = [defaultPlacement, 'right', 'top', 'left'];
const triggerOperationType = [defaultTriggerOperation, 'focus'];

function getOffset(ele) {

    if (!ele) {
        return {};
    }

    let res = {
        offsetTop: 0,
        offsetLeft: 0,
        offsetWidth: ele.offsetWidth,
        offsetHeight: ele.offsetHeight
    };
    while (ele) {
        res.offsetTop += ele.offsetTop;
        res.offsetLeft += ele.offsetLeft;
        ele = ele.offsetParent;
    }

    return res;
}

export default san.defineComponent({

    template,

    initData() {
        // default data
        return {
            [openKey]: false,
            [showArrowKey]: true,
            [animationKey]: true,
            [placementKey]: defaultPlacement,
            [triggerOperationKey]: defaultTriggerOperation
        };
    },
    inited() {
        // 处理一些初始化数据
        this.transBoolean(animationKey);
        this.transBoolean(showArrowKey);
        this.transBoolean(openKey);
        this.compatErrorData(triggerOperationKey, triggerOperationType);
        this.compatErrorData(placementKey, placementType);
    },
    created() {
        document.body.appendChild(this.el);
        // 默认显示
        if (this.data.get(openKey)) {
            this.show();
        }
        this.bindEvent();
    },
    show() {
        let triggerEle = this.getTriggerEle();

        if (!triggerEle) {
            return;
        }

        if (!this.data.get(openKey)) {
            this.data.set(openKey, true);
            this.setPosition(triggerEle);
            this.fire('show');
        }
    },
    setPosition(triggerEle) {

        let posTop;
        let posLeft;
        let placement = this.data.get(placementKey);
        let {
            offsetTop: triggerEleOffsetTop,
            offsetLeft: triggerEleOffsetLeft,
            offsetWidth: triggerEleOffsetWidth,
            offsetHeight: triggerEleOffsetHeight
        } = getOffset(triggerEle);
        let {
            offsetWidth: popoverEleOffsetWidth,
            offsetHeight: popoverEleOffsetHeight
        } = getOffset(this.el);
        let horizonPosTop = triggerEleOffsetTop + triggerEleOffsetHeight / 2 - popoverEleOffsetHeight / 2;
        let verticalPosLeft = triggerEleOffsetLeft + triggerEleOffsetWidth / 2 - popoverEleOffsetWidth / 2;

        switch (placement) {
            case 'right':
                posLeft = triggerEleOffsetLeft + triggerEleOffsetWidth;
                posTop = horizonPosTop;
                break;
            case 'bottom':
                posLeft = verticalPosLeft;
                posTop = triggerEleOffsetTop + triggerEleOffsetHeight;
                break;
            case 'left':
                posLeft = triggerEleOffsetLeft - popoverEleOffsetWidth;
                posTop = horizonPosTop;
                break;
            default:
                posLeft = verticalPosLeft;
                posTop = triggerEleOffsetTop - popoverEleOffsetHeight;
                break;
        }

        this.data.set('posLeft', posLeft);
        this.data.set('posTop', posTop);
    },
    hide() {
        if (this.data && this.data.get(openKey)) {
            this.data.set(openKey, false);
            this.fire('hide');
        }
    },
    toggle() {

        if (this.data.get(openKey)) {
            this.hide();
        }
        else {
            this.show();
        }

    },
    bindEvent() {
        let me = this;
        let triggerEle = me.getTriggerEle();

        if (!triggerEle) {
            return;
        }

        let hide = me.hide.bind(me);
        let triggerOperation = me.data.get(triggerOperationKey);
        // 注册显示popover的事件
        triggerEle.addEventListener(triggerOperation, () => {
            if (!me.data.get(openKey)) {
                me.show();
                me.data.clickNoHide = true;
            }
        });

        // 注册隐藏popover事件
        if (triggerOperation === 'focus') {
            triggerEle.addEventListener('blur', hide);
        }
        else {
            // 除了点击popover浮层，点击其他地方都隐藏浮层
            me.el.addEventListener(defaultTriggerOperation, () => {
                me.data.clickNoHide = true;
            });
            document.addEventListener(defaultTriggerOperation, () => {
                if (!me.data || !me.data.clickNoHide) {
                    hide();
                }
                if (me.data) {
                    me.data.clickNoHide = false;
                }
            });
            // 如果是iOS系统，处理全局点击无法代理监听的问题
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                let isTouchMove;
                let isMoving;
                me.el.addEventListener('touchstart', e => {
                    e.stopPropagation();
                });
                triggerEle.addEventListener('touchstart', e => {
                    e.stopPropagation();
                });
                document.addEventListener('touchstart', () => {
                    setTimeout(() => {
                        if (!isTouchMove && !isMoving) {
                            hide();
                        }
                    }, 100);
                });
                document.addEventListener('touchmove', () => {
                    isMoving = true;
                    isTouchMove = true;
                });
                document.addEventListener('touchend', () => {
                    isMoving = false;
                    setTimeout(() => {
                        if (!isMoving) {
                            isTouchMove = false;
                        }
                    }, 200);
                });
            }
        }

    },
    getTriggerEle() {
        let triggerEleId = this.data.get(triggerKey);
        let triggerEle = document.getElementById(triggerEleId);

        if (!triggerEleId || !triggerEle) {
            console.error('Please provide trigger');
            return;
        }

        return triggerEle;
    },

    /**
     * 布尔值转换，字符串false转换为布尔值false，其他则按正常转换进行转换
     *
     * @param  {string} key 要转换的数据key
     */
    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value === 'false' ? false : !!value);
    },

    /**
     * 数据容错，不在可支持列表里就兼容为默认值
     *
     * @param  {string} key 要容错的数据key
     * @param  {Array} supportList 数据支持列表
     */
    compatErrorData(key, supportList) {

        let value = this.data.get(key);

        if (supportList) {
            this.data.set(key, supportList.includes(value) ? value : supportList[0]);
        }
    }
});
