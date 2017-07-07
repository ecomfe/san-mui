/**
 * @file Ripple
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {create} from '../common/util/cx';

const cx = create('ripple');

function getTimingValue([start, stop], progress) {
    return start + (stop - start) * progress;
}

export default san.defineComponent({

    template: `
        <div class="${cx.getPartClassName()}" style="{{style}}"></div>
    `,

    initData() {
        return {
            step: 0,
            steps: 40,
            opacity: [0.1, 0],
            scale: [0, 2],
            animating: false,
            color: null
        };
    },

    computed: {
        style() {

            let step = this.data.get('step');
            let steps = this.data.get('steps');
            let progress = step / steps;
            let opacity = getTimingValue(this.data.get('opacity'), progress);
            let scale = getTimingValue(this.data.get('scale'), progress);
            let top = this.data.get('top');
            let left = this.data.get('left');
            let width = this.data.get('width');
            let height = this.data.get('height');
            let color = this.data.get('color');
            let radius = Math.max(width, height);

            return {
                'top': `${top - radius}px`,
                'left': `${left - radius}px`,
                'width': `${radius * 2}px`,
                'height': `${radius * 2}px`,
                'transform': `scale(${scale}, ${scale})`,
                'opacity': opacity,
                'background-color': color
            };

        }
    },

    inited() {
        this.animate = this.animate.bind(this);
    },

    attached() {
        this.startAnimation();
    },

    startAnimation() {

        let animating = this.data.get('animating');

        if (animating) {
            return;
        }

        this.data.set('animating', true);
        this.animation = requestAnimationFrame(this.animate);

        this.fire('animate-start');

    },

    animate() {

        let steps = this.data.get('steps');
        let step = this.data.get('step');

        this.data.set('step', step + 1);

        if (step < steps) {
            this.animation = requestAnimationFrame(this.animate);
            return;
        }

        this.animation = null;
        this.data.set('animating', false);
        this.fire('animate-end');

    },

    stopAnimation() {
        if (this.animation) {
            cancelAnimationFrame(this.animation);
        }
    },

    detached() {
        this.stopAnimation();
    }

});
