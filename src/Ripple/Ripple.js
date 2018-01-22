/**
 * @file Ripple
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {create} from '../common/util/cx';
import {
    requestAnimationFrame,
    cancelAnimationFrame
} from '../common/help';

const cx = create('ripple');

function getTimingValue([start, stop], progress) {
    return start + (stop - start) * progress;
}

export default san.defineComponent({

    template: `
        <div>
            <div class="${cx.getPartClassName()}" style="{{style}}" s-transition="opacityTrans"></div>
        <div>
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

    opacityTrans() {
        return {
            enter: (el, done) => {
                let opacity = this.data.get('opacity'); // default opacity
                let scale = this.data.get('scale');
                let step = this.data.get('step');
                let steps = this.data.get('steps');
                let top = this.data.get('top');
                let left = this.data.get('left');
                let width = this.data.get('width');
                let height = this.data.get('height');
                let color = this.data.get('color');
                let radius = Math.max(width, height);

                // set immutable style of el
                el.style.top = `${top - radius}px`;
                el.style.left = `${left - radius}px`;
                el.style.width = `${radius * 2}px`;
                el.style.height = `${radius * 2}px`;
                el.style.backgroundColor = color;

                let goStep = () => {
                    if (step >= steps) {
                        // fire animate-end
                        this.fire('animate-end');
                        done();
                        return;
                    }

                    let progress = step++ / steps;
                    let curOpacity = getTimingValue(opacity, progress);
                    let curScale = getTimingValue(scale, progress);
                    el.style.opacity = curOpacity;
                    el.style.transform = `scale(${curScale}, ${curScale})`;
                    this.requestAnimationId = requestAnimationFrame(goStep);
                };

                // fire animate start
                this.fire('animate-start');
                goStep();
            }
        };
    },

    stopAnimation() {
        if (this.requestAnimationId) {
            cancelAnimationFrame(this.requestAnimationId);
        }
    },

    detached() {
        this.stopAnimation();
    },

    disposed() {
        this.requestAnimationId = null;
    }

});
