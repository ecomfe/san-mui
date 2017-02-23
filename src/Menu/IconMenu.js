/**
 * @file IconMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './IconMenu.styl';
import template from './IconMenu.tpl';
import Icon from '../Icon';
import service from './service';

const animationDuration = 450;

export default san.defineComponent({
    template,

    components: {
        'san-icon': Icon
    },

    initData() {
        return {
            opacity: 0,
            height: 0,
            isHidden: true,
            // open to customize
            animated: true,
            itemClickClose: true,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            },
            targetOrigin: {
                vertical: 'top',
                horizontal: 'center'
            }
        };
    },

    inited() {
        let targetOrigin = this.data.get('targetOrigin');
        let position = 'leftTop';

        if (targetOrigin) {
            position = targetOrigin.horizontal + targetOrigin.vertical.replace(/^(.)(.*)$/, function (str, $0, $1) {
                return $0.toUpperCase() + $1;
            });
        }
        this.data.set('position', position);
    },

    toggleMenu() {
        this.adjustPos();

        let isHidden = !this.data.get('isHidden');

        if (this.data.get('animated')) {
            // default animation
            let animation = this.animation;

            if (this.data.animation && typeof this.data.animation === 'function') {
                // customized animation
                animation = this.data.animation;
            }

            animation.call(this, isHidden);
        }
        else {
            this.data.set('isHidden', isHidden);
        }
    },

    animation(isHidden) {
        // hide
        if (isHidden) {
            this.data.set('height', 0);
            this.data.set('opacity', 0);

            setTimeout(() => {
                this.data.set('isHidden', true);
                this.fire('menuclose');
            }, animationDuration);
            return;
        }

        // show
        this.data.set('isHidden', false);

        setTimeout(() => {
            let childrenNum = document.querySelectorAll('.sm-iconmenu .sm-menu-item').length;
            let heightSolo = service.getStyle('.sm-iconmenu .sm-menu-item', 'height');

            this.data.set('height', childrenNum * heightSolo + 'px');
            this.data.set('opacity', 1);
        }, 0);
    },

    adjustPos() {
        if (this.data.get('targetOrigin').horizontal !== 'center') {
            return;
        }
    }
});
