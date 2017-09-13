/**
 * @file Slider component
 * @author hanbingbing@baidu.com
 */

import san, {DataTypes} from 'san';
import FocusRipple from '../Ripple/FocusRipple';
import {create} from '../common/util/cx';

const cx = create('slider');

export default san.defineComponent({
    template: `
        <div class="{{styleClassName}}" tabindex="0"
            on-focus="handleFocus($event)"
            on-blur="handleBlur($event)"
            on-touchstart="handleTouchStart($event)"
            on-touchend="handleTouchEnd($event)"
            on-touchcancel="handleTouchEnd($event)"
            on-mousedown="handleMouseDown($event)"
            on-mouseup="handleMouseUp($event)"
            on-mouseenter="handleMouseEnter($event)"
            on-mouseleave="handleMouseLeave($event)">
            <input type="hidden" disabled="{{disabled ? ' disabled' : ''}}" name="{{name}}" value="{{value}}">
            <div class="${cx.getPartClassName('bg')}"></div>
            <div class="${cx.getPartClassName('fill')}" style="{{fillStyle}}"></div>
            <div class="${cx.getPartClassName('thumb')}"
                style="{{thumbStyle}}"
                title="值：{{value}}；占比：{{percent + '%'}}">
                <san-focus-ripple san-if="{{showRipple}}"></san-focus-ripple>
            </div>
        </div>
    `,

    components: {
        'san-focus-ripple': FocusRipple
    },

    initData() {
        return {
            max: 100, // 最大值
            min: 0, // 最小值
            step: 1, // 最小步数
            value: 0, // 当前值

            // 内部状态数据
            dragRunning: false,
            dragging: false, // 正在拖拽
            active: 0, // 是否激活
            focus: 0, // 是否focus
            hover: 0 // 是否hover
        };
    },

    dataTypes: {
        max: DataTypes.oneOfType([DataTypes.number, DataTypes.string]), // 最大值
        min: DataTypes.oneOfType([DataTypes.number, DataTypes.string]), // 最小值
        step: DataTypes.oneOfType([DataTypes.number, DataTypes.string]), // 最小步数
        value: DataTypes.oneOfType([DataTypes.number, DataTypes.string]) // 当前值
    },

    computed: {
        percent() {
            let min = this.data.get('min');
            let max = this.data.get('max');
            let value = this.data.get('value');
            let range = max - min;
            let percentNum = range > 0
                ? (value - min) / range * 100
                : 0;

            return percentNum > 100
                ? 100
                : (percentNum < 0 ? 0 : percentNum);
        },

        styleClassName() {
            return cx(this).build();
        },

        fillStyle() {
            return {
                width: this.data.get('percent') + '%'
            };
        },

        thumbStyle() {
            return {
                left: this.data.get('percent') + '%'
            };
        },

        variants() {
            let result = [];
            if (this.data.get('value') <= this.data.get('min')) {
                result.push('start');
            }

            if (this.data.get('active')) {
                result.push('active');
            }

            return result;
        },

        showRipple() {
            let data = this.data;
            return (data.get('focus') || data.get('hover'))
                && !data.get('active');
        }
    },

    created() {
        this.handleDragMouseMove = this.handleDragMouseMove.bind(this);
        this.handleMouseEnd = this.handleMouseEnd.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    },

    getData() {
        const data = this.data;
        return {
            min: +data.get('min'),
            max: +data.get('max'),
            step: +data.get('step'),
            value: +data.get('value')
        };
    },

    setData(obj) {
        const data = this.data;
        /* eslint-disable fecs-use-for-of */
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                data.set(i, obj[i]);
            }
        }
        /* eslint-enable fecs-use-for-of */
    },

    handleFocus(e) {
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('focus', 1);
    },

    handleBlur(e) {
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('focus', 0);
    },

    handleTouchStart(e) {
        if (this.data.get('disabled')) {
            return;
        }
        this.setValue(e.touches[0]);

        let me = this;
        document.addEventListener('touchmove', me.handleTouchMove);
        document.addEventListener('touchup', me.handleTouchEnd);
        document.addEventListener('touchend', me.handleTouchEnd);
        document.addEventListener('touchcancel', me.handleTouchEnd);

        e.preventDefault();
        this.onDragStart(e);
    },

    handleTouchEnd(e) {
        if (this.data.get('disabled')) {
            return;
        }

        let me = this;
        document.removeEventListener('touchmove', me.handleTouchMove);
        document.removeEventListener('touchup', me.handleTouchEnd);
        document.removeEventListener('touchend', me.handleTouchEnd);
        document.removeEventListener('touchcancel', me.handleTouchEnd);

        this.onDragStop(e);
    },

    handleTouchMove(e) {
        this.onDragUpdate(e.touches[0]);
    },

    handleMouseDown(e) {
        if (this.data.get('disabled')) {
            return;
        }

        this.setValue(e);

        let me = this;
        document.addEventListener('mousemove', me.handleDragMouseMove);
        document.addEventListener('mouseup', me.handleMouseEnd);

        e.preventDefault();
        this.el.focus();
        this.onDragStart(e);
    },

    onDragStart(e) {
        this.data.set('dragging', 1);
        this.data.set('active', 1);

        this.fire('dragStart', e);
    },

    onDragStop(e) {
        this.data.set('dragging', 0);
        this.data.set('active', 0);

        this.fire('dragStop', e);
    },

    handleMouseEnd(e) {
        let me = this;
        document.removeEventListener('mousemove', me.handleDragMouseMove);
        document.removeEventListener('mouseup', me.handleMouseEnd);

        this.onDragStop(e);
    },

    handleDragMouseMove(e) {
        this.onDragUpdate(e);
    },

    onDragUpdate(e) {
        const data = this.data;
        if (data.get('dragRunning')) {
            return;
        }
        data.set('dragRunning', 1);

        let me = this;
        window.requestAnimationFrame(() => {
            data.set('dragRunning', 0);
            if (!data.get('disable')) {
                me.setValue(e);
            }
        });
    },

    handleMouseUp(e) {
        if (this.data.get('disabled')) {
            return;
        }

        this.data.set('active', 0);
    },

    handleMouseEnter(e) {
        if (this.data.get('disabled')) {
            return;
        }

        this.data.set('hover', 1);
    },

    handleMouseLeave(e) {
        if (this.data.get('disabled')) {
            return;
        }

        this.data.set('hover', 0);
    },

    setValue(e) {
        let {max, min, value, step} = this.getData();
        let oldValue = value;
        let elLeft = this.el.getBoundingClientRect().left;
        let elWidth = this.el.offsetWidth;
        let range = max - min;

        value = elWidth && ((e.clientX - elLeft) / elWidth * range);
        value = Math.round(value / step) * step + min;
        value = parseFloat(value.toFixed(5));

        if (value > max) {
            value = max;
        }
        else if (value < min) {
            value = min;
        }

        if (value !== oldValue) {
            this.setData({value});
            this.fire('change', value);
        }
    }
});
