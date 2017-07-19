/**
 * @file TouchRipple
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import Ripple from './Ripple';

export default san.defineComponent({

    components: {
        'san-ripple': Ripple
    },

    template: `
        <div
            class="sm-touch-ripple"
            on-click="click($event)">
            <san-ripple
                san-for="ripple, index in ripples"
                left="{{ripple.x}}"
                top="{{ripple.y}}"
                width="{{ripple.width}}"
                height="{{ripple.height}}"
                color="{{color}}"
                on-animate-end="onRippleAnimateEnd(index)" />
        </div>
    `,

    initData() {
        return {
            ripples: []
        };
    },

    click(e) {
        let {clientX, clientY} = e;
        let {top, left, width, height} = this.el.getBoundingClientRect();
        this.data.push('ripples', {
            x: clientX - left,
            y: clientY - top,
            width,
            height
        });
    },

    onRippleAnimateEnd(rippleIndex) {
        this.data.removeAt('ripples', rippleIndex);
    }

});
