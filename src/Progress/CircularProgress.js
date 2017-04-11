/**
 * @file CircularProgress
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {create} from '../common/util/cx';
import css from '../common/util/css';

const cx = create('circular-progress');

const CIRCLE_SVG_ANIMATION_MAP = {

    0: {
        strokeLengthPercent: 0,
        strokeOffsetPercent: 0,
        transitionDuration: 0
    },

    1: {
        strokeLengthPercent: 0.7,
        strokeOffsetPercent: -0.3,
        transitionDuration: 750
    },

    2: {
        strokeLengthPercent: 0.7,
        strokeOffsetPercent: -1,
        transitionDuration: 850
    }

};

function getCircleSVGStyle(step, size, strokeWidth) {

    let {
        strokeLengthPercent,
        strokeOffsetPercent,
        transitionDuration
    } = CIRCLE_SVG_ANIMATION_MAP[step];

    let total = Math.PI * (size - strokeWidth);
    let length = total * strokeLengthPercent;

    let result = {
        strokeDashoffset: (total * strokeOffsetPercent).toFixed(2),
        strokeDasharray: `${length.toFixed(2)}, ${total.toFixed(2)}`,
        transitionDuration: `${transitionDuration}ms`
    };

    return result;

}

export default san.defineComponent({

    template: `
        <div class="{{computedClassName}}" style="{{mainStyle}}">
            <div class="${cx.getPartClassName('content')}">
                <svg class="${cx.getPartClassName('svg')}">
                    <circle
                        cx="{{size / 2}}"
                        cy="{{size / 2}}"
                        r="{{(size - strokeWidth) / 2}}"
                        class="${cx.getPartClassName('path')}"
                        style="{{circleStyle}}"
                        fill="none"
                        stroke-width="{{strokeWidth}}"
                        stroke-miterlimit="10" />
                </svg>
            </div>
        </div>
    `,

    computed: {
        computedClassName() {
            let mode = this.data.get('mode');
            return cx(this).addVariants(mode).build();
        },
        mainStyle() {
            let size = this.data.get('size');
            return css({
                width: `${size}px`,
                height: `${size}px`
            });
        },
        circleStyle() {

            let mode = this.data.get('mode');
            let size = this.data.get('size');

            if (mode === 'determinate') {
                let value = this.data.get('value');
                let min = this.data.get('min');
                let max = this.data.get('max');

                let total = max - min;
                let percent = value - min;

                let totalLength = Math.PI * size;
                let percentLength = percent / total * totalLength;

                return css({
                    strokeDasharray: `${percentLength}, ${totalLength}`
                });

            }

            let step = this.data.get('step');
            let strokeWidth = this.data.get('strokeWidth');
            return css(getCircleSVGStyle(step, size, strokeWidth));

        }
    },

    initData() {
        return {
            step: 2,
            size: 32,
            strokeWidth: 2,
            mode: 'indeterminate',
            max: 100,
            min: 0,
            value: 0
        };
    },

    inited() {
        this.animate = this.animate.bind(this);
    },

    attached() {

        let mode = this.data.get('mode');

        if (mode === 'indeterminate') {
            this.startAnimation();
        }

    },

    startAnimation() {
        if (!this.animateTimer) {
            this.animateTimer = setTimeout(
                this.animate,
                CIRCLE_SVG_ANIMATION_MAP[0].transitionDuration
            );
        }
    },

    stopAnimation() {
        if (this.animateTimer) {
            clearTimeout(this.animateTimer);
            this.animateTimer = null;
        }
    },

    animate() {

        let step = this.data.get('step');
        let nextStep = (step + 1) % 3;

        this.data.set('step', nextStep);

        this.animateTimer = setTimeout(
            this.animate,
            step ? 750 : 250
        );

    },

    detached() {
        this.stopAnimation();
    }

});
