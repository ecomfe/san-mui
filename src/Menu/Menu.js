/**
 * @file Menu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <div class="{{ className }} sm-menu-list{{ menuListClass }}" style="{{ menuListStyle }}">
            <slot></slot>
        </div>
    `,
    initData() {
        return {
            left: 0,
            top: 0,
            transformOrigin: 'center center'
        };
    },
    computed: {
        menuListClass() {
            return this.data.get('useLayerForClickAway') ? ' on-layer' : '';
        },
        menuListStyle() {
            return Object.assign(this.data.get('menuStyle') || {}, {
                'transform-origin': this.data.get('transformOrigin'),
                'transform': this.data.get('open') ? 'scale(1,1)' : 'scale(1,0)',
                'left': this.data.get('left') + 'px',
                'top': this.data.get('top') + 'px',
                'max-height': this.data.get('maxHeight') + 'px'
            });
        }
    },

    created() {
        this.handleMenuPos = this.handleMenuPos.bind(this);
    },
    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }

        this.dispatch('UI:menu-panel-attached');

        this.parentMenu = document.getElementsByClassName(this.parentMenu)[0];
        this.sibClicker = this.parentMenu.children[0];

        this.watch('open', () => {
            this.data.get('open') && this.handleMenuPos('OPEN');
            this.dispatch('UI:menu-open', this.data.get('open'));
        });

        if (this.data.get('openImmediately')) {
            // FIXME: 渲染过程中menu位置会改变
            this.openTimer = setTimeout(() => {
                this.setPos();
                this.dispatch('UI:menu-panel-status-changed', {
                    open: true
                });
            }, 500);
        }

        window.addEventListener('scroll', this.handleMenuPos);
    },

    setPos(anchorOrigin, targetOrigin) {
        this.domAlign(this.el, this.sibClicker, {
            points: [
                anchorOrigin || this.data.get('anchorOrigin'),
                targetOrigin || this.data.get('targetOrigin')
            ]
        });
    },

    handleMenuPos(driver) {
        if (!this.data.get('open')) {
            return;
        }

        let lastMove = this.lastMove || document.body.scrollTop || document.documentElement.scrollTop;
        // 已滚动高度
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // 上滑or下滑
        let downward = scrollTop - lastMove > 0;

        // let menuOffsetTop = driver === 'OPEN' ? this.parentMenu.offsetTop : this.el.offsetTop;
        driver === 'OPEN' && this.setPos();
        let menuOffsetTop = this.data.get('top');
        let menuOffsetBottom = menuOffsetTop + this.el.offsetHeight;

        let anchorOrigin = Object.assign({}, this.data.get('anchorOrigin'));
        let targetOrigin = Object.assign({}, this.data.get('targetOrigin'));

        // menu上边缘到顶
        if (scrollTop >= menuOffsetTop) {
            // open操作，调整menu位置
            if (driver === 'OPEN') {
                anchorOrigin.vertical = 'top';
                targetOrigin.vertical = 'top';
            }
            // 上滑操作，hide menu
            else if (downward) {
                this.dispatch('UI:menu-panel-status-changed', {
                    driver: 'POS',
                    open: false
                });
            }
        }
        // 下滑操作致menu上边缘到底，hide menu
        if (scrollTop + window.innerHeight <= menuOffsetTop && !downward) {
            this.dispatch('UI:menu-panel-status-changed', {
                driver: 'POS',
                open: false
            });
        }
        // menu下边缘到底，切换origin，反弹
        if (scrollTop + window.innerHeight <= menuOffsetBottom) {
            if (driver === 'OPEN' || (driver !== 'OPEN' && !downward)) {
                anchorOrigin.vertical = 'bottom';
                targetOrigin.vertical = 'bottom';
                this.setPos(anchorOrigin, targetOrigin);
            }
        }

        driver === 'OPEN' && this.setPos(anchorOrigin, targetOrigin);
        this.lastMove = scrollTop;
    },

    domAlign(sourceNode, targetNode, alignConfig) {
        let left = 0;
        let top = 0;
        let [anchorOrigin, targetOrigin] = alignConfig.points;

        let [clickerW, clickerH, panelW, panelH] = [
            targetNode.offsetWidth,
            targetNode.offsetHeight,
            sourceNode.offsetWidth,
            sourceNode.offsetHeight
        ];
        let {top: menuT, left: menuL} = this.parentMenu.getBoundingClientRect();
        menuT += document.body.scrollTop || document.documentElement.scrollTop;

        switch (anchorOrigin.horizontal) {
            case 'left':
                left += 0;
                break;
            case 'middle':
                left += clickerW / 2;
                break;
            case 'right':
                left += clickerW;
        }
        switch (anchorOrigin.vertical) {
            case 'top':
                top += 0;
                break;
            case 'center':
                top += clickerH / 2;
                break;
            case 'bottom': top += clickerH;
        }
        switch (targetOrigin.horizontal) {
            case 'left':
                left -= 0;
                break;
            case 'middle':
                left -= panelW / 2;
                break;
            case 'right':
                left -= panelW;
        }
        switch (targetOrigin.vertical) {
            case 'top':
                top -= 0;
                break;
            case 'center':
                top -= panelH / 2;
                break;
            case 'bottom':
                top -= panelH;
        }

        left += menuL;
        if (left < 0) {
            left = 0;
        }
        else if (left + panelW > document.body.clientWidth) {
            left = document.body.clientWidth - panelW;
        }

        this.data.set('left', left);
        this.data.set('top', top + menuT);
        this.data.set('transformOrigin', `${targetOrigin.horizontal} ${targetOrigin.vertical}`);
    },

    disposed() {
        window.removeEventListener('scroll', this.handleMenuPos);
        clearTimeout(this.openTimer);
    }

});
