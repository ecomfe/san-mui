/**
 * @file Slider component
 * @author hanbingbing@baidu.com
 */

import san from 'san';
import './Slider.styl';

export default san.defineComponent({
    template: `
        <div class="san-slider {{themeClass}} {{disable | yesToBe('san-slider-disable')}}"
            on-focus="handleFocus($event)"
            on-blur="handleBlur($event)"
            on-touchstart="handleTouchStart($event)"
            on-touchend="handleTouchEnd($event)"
            on-touchcancel="handleTouchEnd($event)"
            on-mousedown="handleMouseDown($event)"
            on-mouseup="handleMouseUp($event)"
            on-mouseenter="handleMouseEnter($event)"
            on-mouseleave="handleMouseLeave($event)"
            on-click="handleClick($event)">
            <div class="san-slider-bg"></div>
            <div class="san-slider-fill" style="width: {{percent * 100 + '%'}}"></div>
            <div class="san-slider-thumb"
                style="left: {{percent * 100 + '%'}}"
                title="值：{{value}}；占比：{{percent * 100 + '%'}}">
            </div>
        </div>
    `,
    initData() {
        let config = {
            themeClass: '', // 主题
            max: 0, // 最大值
            min: 0, // 最小值
            step: 0, // 最小步数
            disable: 0, // 禁用
            value: 0, // 当前值
            percent: 0, // 百分比,
            dragRunning: 0, // 正在拖拽
            hasCounted: 0, // 是否计算过元素宽度和左視边距,
            focused: 0, // 是否focus
            hovered: 0 // 是否hover
        };

        return config;
    },
    test() {
    },
    inited() {
    },
    compiled() {
    },
    created() {
        this.formatInitValue();
        this.handleDragMouseMove = this.handleDragMouseMove.bind(this);
        this.handleMouseEnd = this.handleMouseEnd.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    },
    attached() {
    },
    detached() {
    },
    disposed() {
    },
    formatInitValue() {
        let {max, min, percent, value, step} = this.getData();
        if (min < 0) min = 0; 
        if (max < min) max = min;
        if (step > max) step = max;
        else if (step < 0) step = 1;

        let minus = value - min;
        if (minus <= 0) {
            value = minus = min;
        }
        value = Math.floor(value / step) * step;
        percent = (value - min) / (max - min);

        let disable = +this.data.get('disable');
        this.setData({max, min, value, step, percent, disable});
        // console.log('max: '+ max + 'min: '+ min + 'step: '+ step + 'value:' +value + 'per:' + percent );
    },
    getData() {
        const data = this.data;
        return {
            min: +data.get('min'),
            max: +data.get('max'),
            step: +data.get('step'),
            value: +data.get('value'),
            percent: +data.get('percent'),
            left: +data.get('left'),
            width: +data.get('width')
        };
    },
    setData(obj) {
        const data = this.data;
        obj = obj || {};
        for (var i in obj) {
            data.set(i, obj[i]);
        }
    },
    handleClick(e) {
        if (this.data.get('disabled')) return
        this.setValue(e);
    },
    handleFocus(e) {
        if (this.data.get('disable')) return
        this.data.set('focused', 1);
    },
    handleBlur(e) {
        if (this.data.get('disable')) return
        this.data.set('focused', 0);
    },
    handleTouchStart(e) {
        if (+this.data.get('disabled')) return
        this.setValue(e.touches[0]);

        var me = this;
        document.addEventListener('touchmove', me.handleTouchMove);
        document.addEventListener('touchup', me.handleTouchEnd);
        document.addEventListener('touchend', me.handleTouchEnd);
        document.addEventListener('touchcancel', me.handleTouchEnd);
        e.preventDefault();
        this.onDragStart(e);
    },
    handleTouchEnd(e) {
        if (+this.data.get('disabled')) return

        var me = this;
        document.removeEventListener('touchmove', me.handleTouchMove);
        document.removeEventListener('touchup', me.handleTouchEnd);
        document.removeEventListener('touchend', me.handleTouchEnd);
        document.removeEventListener('touchcancel', me.handleTouchEnd);
        this.onDragStop(e)
    },
    handleTouchMove(e) {
        this.onDragUpdate(e.touches[0]);
    },
    handleMouseDown(e) {
        if (this.data.get('disabled')) return
        e.preventDefault();
        var me = this;
        document.addEventListener('mousemove', me.handleDragMouseMove);
        document.addEventListener('mouseup', me.handleMouseEnd);

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
        var me = this;
        document.removeEventListener('mousemove', me.handleDragMouseMove);
        document.removeEventListener('mouseup', me.handleMouseEnd);
        this.onDragStop(e);

    },
    handleDragMouseMove(e) {
        this.onDragUpdate(e);
    },
    onDragUpdate(e) {
        const data = this.data;
        if (data.get('dragRunning')) return
        data.set('dragRunning', 1);
        var me = this;

        window.requestAnimationFrame(() => {
            data.set('dragRunning', 0);
            if (!data.get('disable')) me.setValue(e)
        })
    },
    handleMouseUp(e) {
        if (this.data.get('disable')) return
    },
    handleMouseEnter(e) {
        if (this.data.get('disable')) return
        this.data.set('hovered', 1);
    },
    handleMouseLeave(e) {
        if (this.data.get('disable')) return
        this.data.set('hovered', 0);
    },
    setValue(e) {
        const $el = this.el;
        if (!this.data.get('hasCounted')) {
            this.setData({
                left: $el.getBoundingClientRect().left,
                width: $el.offsetWidth
            });
            this.data.set('hasCounted', 1);
        }
        let {max, min, percent, value, step, left, width} = this.getData();

        value = (e.clientX - left) / width * (max - min);

        value = Math.round(value / step) * step + min;
        value = parseFloat(value.toFixed(5));
        if (value > max) {
            value = max;
        }
        else if (value < min) {
            value = min;
        }

        percent = (value - min) / (max - min);
        this.setData({value: value, percent: percent});
        this.fire('change', value);

    }
});
