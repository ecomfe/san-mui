/**
 * @file ColorPicker
 * @author malingyang(malingyang@baidu.com)
 */

/* eslint-disable fecs-prefer-destructure */

import {create} from '../common/util/cx';
import san from 'san';
import UnderLine from '../TextField/TextFieldUnderline';
import TextField from '../TextField';
import Dialog from '../Dialog';
import Button from '../Button';
import kolor from 'kolor';

const cx = create('color-picker');

export default san.defineComponent({
    components: {
        'san-underline': UnderLine,
        'san-dialog': Dialog,
        'san-button': Button,
        'san-text-field': TextField
    },
    template: `
        <div class="{{computedClass}}">
            <span
                class="${cx.getPartClassName('indicator-wrapper')}"
                on-click="handleClick($event)"
            >
                <span
                >
                    <i
                        class="${cx.getPartClassName('indicator')}"
                        style="background-color: {{color}}"
                    >
                    </i>
                </span>
                {{color}}
            </span>
            <san-underline
                focus="{{focus}}"
            >
            </san-underline>
            <san-dialog
                open="{{open}}"
                width="{{alpha ? 307 : 277}}"
                closeOnClickMask="{{closeOnClickMask}}"
            >
                <div class="${cx.getPartClassName('hsv-wrapper')}">
                    <div
                        class="${cx.getPartClassName('color-sv')}"
                        on-click="handleSvChange($event)"
                        on-mousedown="handleMouseDown($event, 'sv')"
                        on-mouseup="handleMouseUp($event, 'sv')"
                        on-mousemove="handleSvMouseMove($event)"
                        on-mouseleave="handleMouseUp($event, 'sv')"
                        style="{{colorComputedStyle}}"
                    >
                        <span
                            class="${cx.getPartClassName('sv-chooser')}"
                            style="left: {{hsv[1] * 200 - 3}}px; top: {{(1 - hsv[2]) * 200 - 3}}px"
                        >
                        </span>
                        <div class="${cx.getPartClassName('sv-white')}"></div>
                        <div class="${cx.getPartClassName('sv-black')}"></div>
                    </div>
                    <div
                        class="${cx.getPartClassName('color-hua')}"
                        on-click="handleHuaChange($event)"
                        on-mousedown="handleMouseDown($event, 'h')"
                        on-mouseup="handleMouseUp($event, 'h')"
                        on-mousemove="handleHuaMouseMove($event)"
                        on-mouseleave="handleMouseUp($event, 'h')"
                    >
                        <span
                            class="${cx.getPartClassName('hua-chooser')}"
                            style="top: {{(hsv[0] / 360) * 200 - 3}}px"
                        >
                        </span>
                    </div>
                    <div
                        class="${cx.getPartClassName('color-alpha')}"
                        on-click="handleAlphaChange($event)"
                        on-mousedown="handleMouseDown($event, 'a')"
                        on-mouseup="handleMouseUp($event, 'a')"
                        on-mousemove="handleAlphaMouseMove($event)" 
                        on-mouseleave="handleMouseUp($event, 'a')"
                        san-if="alpha"
                    >
                        <div
                            class="${cx.getPartClassName('alpha-basic')}"
                            style="{{alphaComputedStyle}}"
                        >
                        </div>
                        <span
                            class="${cx.getPartClassName('alpha-chooser')}"
                            style="top: {{rgba[3] * 200 - 3}}px"
                        >
                        </span>
                    </div>
                </div>
                <div class="${cx.getPartClassName('rgb-whole-wrapper')}" san-if="alpha">
                    <div class="${cx.getPartClassName('rgb-wrapper')}">
                        <san-text-field
                            label="R"
                            inputClass="${cx.getPartClassName('rgb-input-width')}"
                            underlineClass="${cx.getPartClassName('rgb-input-width')}"
                            inputValue="{{rgba[0]}}"
                            on-input-change="handleRgbInput($event, 0)"
                        />
                    </div>
                    <div class="${cx.getPartClassName('rgb-wrapper')}">
                        <san-text-field
                            label="G"
                            inputClass="${cx.getPartClassName('rgb-input-width')}"
                            underlineClass="${cx.getPartClassName('rgb-input-width')}"
                            inputValue="{{rgba[1]}}"
                            on-input-change="handleRgbInput($event, 1)"
                        />
                    </div>
                    <div class="${cx.getPartClassName('rgb-wrapper')}">
                        <san-text-field
                            label="B"
                            inputClass="${cx.getPartClassName('rgb-input-width')}"
                            underlineClass="${cx.getPartClassName('rgb-input-width')}"
                            inputValue="{{rgba[2]}}"
                            on-input-change="handleRgbInput($event, 2)"
                        />
                    </div>
                    <div class="${cx.getPartClassName('rgb-wrapper')}">
                        <san-text-field
                            label="A"
                            inputClass="${cx.getPartClassName('rgb-input-width')}"
                            underlineClass="${cx.getPartClassName('rgb-input-width')}"
                            inputValue="{{rgba[3]}}"
                            on-input-change="handleAlphaInput($event)"
                        />
                    </div>
                </div>
                <div class="${cx.getPartClassName('hex-wrapper')}" san-if="!alpha">
                    <san-text-field
                        inputClass="${cx.getPartClassName('hex-input-width')}"
                        underlineClass="${cx.getPartClassName('hex-input-width')}"
                        label="hex"
                        inputValue="{{hex}}"
                        on-input-change="handleHexInput($event)"
                    />
                </div>
                <div slot="actions">
                    <san-button on-click="handleCancel" variants="danger">取消</san-button>
                    <san-button on-click="handleConfirm" variants="info">确定</san-button>
                </div>
            </san-dialog>
        </div>
    `,

    initData() {
        return {
            color: '#ffffff',
            alpha: false,
            hsv: [0, 0, 0],
            rgba: [0, 0, 0, 0],
            hex: '',
            svDraggable: false,
            hDraggable: false,
            aDraggable: false
        };
    },

    attached() {
        let color = this.data.get('color') || '#ffffff';
        this.initColorParam(color);
    },

    computed: {
        computedClass() {
            return cx(this).build();
        },
        colorComputedStyle() {
            let h = this.data.get('hsv[0]');
            let color = kolor.hsva(h, 1, 1, 1).hex();
            return {
                'background-color': color
            };
        },
        alphaComputedStyle() {
            // 根据hsv计算出alpha颜色选取条的样式
            let [h, s, v] = this.data.get('hsv');
            let colorBegin = kolor.hsva(h, s, v, 1).rgba().css();
            let colorEnd = kolor.hsva(h, s, v, 0).rgba().css();
            let color = 'linear-gradient(0deg, ' + colorBegin + ', ' + colorEnd + ')';
            return {
                background: color
            };
        }
    },

    /**
     * 给定color值，初始化设定h,s,v,r,g,b,a的值
     *
     * @param {string} color 颜色的字符串代码，hex或者rgba形式
     */
    initColorParam(color) {
        let k = kolor(color);
        let hsv = k.hsv().toArray();
        let rgba = k.rgba().toArray();
        let hex = k.hex();

        this.data.set('hsv', hsv);
        this.data.set('rgba', rgba);
        this.data.set('hex', hex);
        this.data.get('alpha') ? this.data.set('color', k.rgba().css())
            : this.data.set('color', hex);
    },

    /**
     * 给定rgb，计算对应的hsv
     */
    rgbTohsv() {
        let [r, g, b] = this.data.get('rgba');
        let k = kolor.rgb(r, g, b).hsv();

        let hsv = k.toArray();
        hsv[1] = hsv[1].toFixed(3);
        hsv[2] = hsv[2].toFixed(3);
        this.data.set('hsv', hsv);
    },

    /**
     * 给定hsv，计算对应的rgb
     */
    hsvTorgb() {
        let [h, s, v] = this.data.get('hsv');
        let k = kolor.hsv(h, s, v).rgb();
        let [r, g, b] = k.toArray();
        let hex = k.hex();
        this.data.set('rgba[0]', r);
        this.data.set('rgba[1]', g);
        this.data.set('rgba[2]', b);
        this.data.set('hex', hex);
    },

    /**
     * 给定颜色hex，计算对应的hsv
     */
    hexTohsv() {
        let hex = this.data.get('hex');
        let hsv = kolor(hex).hsv().toArray();
        hsv[1] = hsv[1].toFixed(3);
        hsv[2] = hsv[2].toFixed(3);
        this.data.set('hsv', hsv);
    },

    /**
     * 打开颜色选择板
     */
    openPanel() {
        this.data.set('focus', true);
        this.data.set('open', true);
    },

    /**
     * 关闭颜色选择板
     */
    closePanel() {
        this.data.set('focus', false);
        this.data.set('open', false);
    },

    /**
     * 点击颜色输入框，调起选择板
     *
     * @param {Object} e 事件参数
     */
    handleClick(e) {
        this.openPanel();
        this.initColorParam(this.data.get('color'));
    },

    /**
     * 点击确定，改变输入框的颜色值
     *
     * @param {Object} e 事件参数
     */
    handleConfirm(e) {
        this.closePanel();
        let [h, s, v] = this.data.get('hsv');
        let color;
        if (this.data.get('alpha')) {
            let a = parseFloat(this.data.get('rgba[3]')).toFixed(2);
            color = kolor.hsva(h, s, v, a).rgba().css();
        }
        else {
            color = kolor.hsv(h, s, v).hex();
        }
        this.data.set('color', color);
        this.fire('color-change');
    },

    /**
     * 点击取消，不改变输入框的颜色值
     *
     * @param {Object} e 事件参数
     */
    handleCancel(e) {
        this.closePanel();
    },

    /**
     * 处理鼠标按下事件, 此时滑块可滑动
     *
     * @param {Object} e 事件参数
     * @param {string} prefix 滑动标识的前缀
     */
    handleMouseDown(e, prefix) {
        e.preventDefault();
        let key = prefix + 'Draggable';
        this.data.set(key, true);
    },

    /**
     * 处理鼠标松开事件, 此时滑块不可滑动
     *
     * @param {Object} e 事件参数
     * @param {string} prefix 滑动标识的前缀
     */
    handleMouseUp(e, prefix) {
        e.preventDefault();
        let key = prefix + 'Draggable';
        this.data.set(key, false);
    },

    /**
     * 处理sv区域鼠标滑动事件
     *
     * @param {Object} e 事件参数
     */
    handleSvMouseMove(e) {
        e.preventDefault();
        if (this.data.get('svDraggable')) {
            this.handleSvChange(e);
        }
    },

    /**
     * 处理hua区域鼠标滑动事件
     *
     * @param {Object} e 事件参数
     */
    handleHuaMouseMove(e) {
        e.preventDefault();
        if (this.data.get('hDraggable')) {
            this.handleHuaChange(e);
        }
    },

    /**
     * 处理alpha区域鼠标滑动事件
     *
     * @param {Object} e 事件参数
     */
    handleAlphaMouseMove(e) {
        e.preventDefault();
        if (this.data.get('aDraggable')) {
            this.handleAlphaChange(e);
        }
    },

    /**
     * 处理sv选择框鼠标点击事件
     *
     * @param {Object} e 事件参数
     */
    handleSvChange(e) {
        let target = e.currentTarget;
        let outX = target.offsetLeft;
        let outY = target.offsetTop;
        let clientX = e.clientX;
        let clientY = e.clientY;
        let s = ((clientX - outX) / 200).toFixed(3);
        let v = (1 - (clientY - outY) / 200).toFixed(3);
        // s，v合法性校验，防止大于1或者小于0
        s = s > 1 ? 1 : s < 0 ? 0 : s;
        v = v > 1 ? 1 : v < 0 ? 0 : v;
        this.data.set('hsv[1]', s);
        this.data.set('hsv[2]', v);
        this.hsvTorgb();
    },

    /**
     * 处理hua框鼠标点击事件
     *
     * @param {Object} e 事件参数
     */
    handleHuaChange(e) {
        let target = e.currentTarget;
        let outY = target.offsetTop;
        let clientY = e.clientY;
        let h = (clientY - outY) / 200 * 360;
        // h合法性校验，防止大于360或者小于0
        h = h > 360 ? 360 : h < 0 ? 0 : h;
        this.data.set('hsv[0]', h);
        this.hsvTorgb();
    },

    /**
     * 处理alpha框鼠标点击事件
     *
     * @param {Object} e 事件参数
     */
    handleAlphaChange(e) {
        let target = e.currentTarget;
        let outY = target.offsetTop;
        let clientY = e.clientY;
        let a = ((clientY - outY) / 200).toFixed(2);
        // a合法性校验，防止大于1或者小于0
        a = a > 1 ? 1 : a < 0 ? 0 : a;
        this.data.set('rgba[3]', a);
    },

    /**
     * 处理rgb输入事件
     *
     * @param {Object} e 事件参数
     * @param {string} index r,g,b在rgba变量中的索引
     */
    handleRgbInput(e, index) {
        let val = e.target.value;
        // rgb输入合法性校验
        let formatVal = parseInt(val, 10);
        let value = isNaN(formatVal) ? '' : Math.min(255, formatVal);
        this.data.set('rgba[' + index + ']', value);
        e.target.value = value;
        this.rgbTohsv();
    },

    /**
     * 处理alpha输入事件
     *
     * @param {Object} e 事件参数
     */
    handleAlphaInput(e) {
        let val = e.target.value;
        if (val.indexOf('.') === val.length - 1) {
            return;
        }

        // a输入合法性校验
        let formatVal = parseFloat(val.substring(0, 4));
        if (isNaN(formatVal)) {
            this.data.set('rgba[3]', '');
            e.target.value = '';
        }
        else {
            formatVal = formatVal >= 1 ? 1 : formatVal;
            this.data.set('rgba[3]', formatVal);
            e.target.value = formatVal;
        }
    },

    /**
     * 处理hex颜色代码输入事件
     *
     * @param {Object} e 事件参数
     */
    handleHexInput(e) {
        let val = e.target.value;
        this.data.set('hex', val);
        // hex输入合法性校验
        let reg = /^\#[0-9a-fA-F]{6}$/;
        if (reg.test(val)) {
            this.hexTohsv();
        }

    }

});
