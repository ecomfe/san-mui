/**
 * @file DropDownMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import './DropDownMenu.styl';
import template from './DropDownMenu.tpl';
import {padStyles} from './filters';
import service from './service';

const animationDuration = 450;

export default san.defineComponent({
    template,

    initData() {
        let defaultConfig = {
            opacity: 0,
            height: 0,
            isHidden: true,
            // open to customize
            animated: true,
            disabled: false,
            autoWidth: true,
            openImmediately: false,
            className: 'drop-down-menu',
            maxHeight: 500,
            scroller: window,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            },
            multiple: false
        };

        return defaultConfig;
    },

    filters: {
        padStyles
    },

    attached() {
        if (this.data.get('openImmediately')) {
            this.toggleMenu();
        }

        this.watch('value', () => {
            this.toggleMenu();
            // this.fire('menuchange');
        });

    },

    toggleMenu() {
        if (this.data.get('disabled')) {
            return;
        }

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
            let childrenNum = document.querySelectorAll('.sm-dropdown-menu .sm-menu-item').length;
            let heightSolo = service.getStyle('.sm-dropdown-menu .sm-menu-item', 'height');

            this.data.set('height', childrenNum * heightSolo + 'px');
            this.data.set('opacity', 1);
        }, 0);
    },

    getValue(item = {}) {
        return item.label ? item.label : item.text;
    }
});
