/**
 * @file ColorPicker
 * @author malingyang(malingyang@baidu.com)
 */

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
                        style="{{indicatorComputedStyle}}"
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
                width="{{dialogComputedStyle}}",
                closeOnClickMask="{{closeOnClickMask}}"
            >
                <div class="${cx.getPartClassName('hsv-wrapper')}">
                    <div 
                        class="${cx.getPartClassName('color-sv')}"
                        on-click="handleSv($event)"
                        on-mousedown="handleSvMouseDown($event)"
                        on-mouseup="handleSvMouseUp($event)"
                        on-mousemove="handleSvMouseMove($event)"
                        on-mouseleave="handleSvMouseUp($event)"
                        style="{{colorComputedStyle}}"
                    >
                        <span 
                            class="${cx.getPartClassName('sv-chooser')}"
                            style="{{svChooseComputedStyle}}"
                        >
                        </span>
                        <div class="${cx.getPartClassName('sv-white')}"></div>
                        <div class="${cx.getPartClassName('sv-black')}"></div>
                    </div>
                    <div 
                        class="${cx.getPartClassName('color-hua')}"
                        on-click="handleHua($event)"
                        on-mousedown="handleHuaMouseDown($event)"
                        on-mouseup="handleHuaMouseUp($event)"
                        on-mousemove="handleHuaMouseMove($event)"
                        on-mouseleave="handleHuaMouseUp($event)"
                    >
                        <span 
                            class="${cx.getPartClassName('hua-chooser')}"
                            style="{{huaChooseComputedStyle}}"                        
                        >
                        </span>
                    </div>
                    <div 
                        class="${cx.getPartClassName('color-alpha')}"
                        on-click="handleAlpha($event)"
                        on-mousedown="handleAlphaMouseDown($event)"
                        on-mouseup="handleAlphaMouseUp($event)"
                        on-mousemove="handleAlphaMouseMove($event)" 
                        on-mouseleave="handleAlphaMouseUp($event)"
                        san-if="alpha"
                    >
                        <div 
                            class="${cx.getPartClassName('alpha-basic')}"
                            style="{{alphaComputedStyle}}"
                        >
                        </div>
                        <span
                            class="${cx.getPartClassName('alpha-chooser')}"
                            style="{{alphaChooseComputedStyle}}"
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
                            inputValue="{=r=}"
                            on-input-change="handleInput(r, 'r')"
                        />
                    </div>
                    <div class="${cx.getPartClassName('rgb-wrapper')}">
                        <san-text-field
                            label="G"
                            inputClass="${cx.getPartClassName('rgb-input-width')}"
                            underlineClass="${cx.getPartClassName('rgb-input-width')}"
                            inputValue="{=g=}"
                            on-input-change="handleInput(g, 'g')"
                        />
                    </div>
                    <div class="${cx.getPartClassName('rgb-wrapper')}">
                        <san-text-field
                            label="B"
                            inputClass="${cx.getPartClassName('rgb-input-width')}"
                            underlineClass="${cx.getPartClassName('rgb-input-width')}"
                            inputValue="{=b=}"
                            on-input-change="handleInput(b, 'b')"
                        />
                    </div>
                    <div class="${cx.getPartClassName('rgb-wrapper')}">
                        <san-text-field
                            label="A"
                            inputClass="${cx.getPartClassName('rgb-input-width')}"
                            underlineClass="${cx.getPartClassName('rgb-input-width')}"
                            inputValue="{=a=}"
                            on-input-change="handleAlphaInput(a)"
                        />
                    </div>
                </div>
                <div class="${cx.getPartClassName('hex-wrapper')}" san-if="!alpha">
                    <san-text-field
                        inputClass="${cx.getPartClassName('hex-input-width')}"
                        underlineClass="${cx.getPartClassName('hex-input-width')}"
                        label="hex"
                        inputValue="{=hex=}"
                        on-input-change="handleHexInput(hex)"
                    />
                </div>
                <div slot="actions">
                    <san-button on-click="handleCancel" variants="danger">取消</san-button>
                    <san-button on-click="handleEnsure" variants="info">确定</san-button>
                </div>
            </san-dialog>
        </div>
    `,

    initData() {
        return {
            color: '#ffffff',
            alpha: false,
            h: 0,
            s: 0,
            v: 0,
            a: 0,
            r: 0,
            g: 0,
            b: 0,
            hex: '',
            svDraggable: false,
            hDraggable: false,
            aDraggable: false
        };
    },
    attached() {
        let color = this.data.get('color');
        color = color ? color : '#ffffff';
        let k = kolor(color);
        let [h, s, v, a] = k.hsva().toArray();
        let [r, g, b] = k.rgb().toArray();
        let hex = k.hex();
        this.data.set('h', h);
        this.data.set('s', s);
        this.data.set('v', v);
        this.data.set('a', a);
        this.data.set('r', r);
        this.data.set('g', g);
        this.data.set('b', b);
        this.data.set('hex', hex);
        if (this.data.get('alpha')) {
            this.data.set('color', k.rgba().css());
        } else {
            this.data.set('color', k.hex());
        }
    },
    computed: {
        computedClass() {
            return cx(this).build();
        },
        dialogComputedStyle() {
            return this.data.get('alpha') ? 278 : 258;
        },
        indicatorComputedStyle() {
            let color = this.data.get('color');
            return {
                'background-color': color
            };
        },
        colorComputedStyle() {
            let h = this.data.get('h');
            let color = kolor.hsva(h, 1, 1, 1).hex();
            return {
                'background-color': color
            };
        },
        svChooseComputedStyle() {
            let left = this.data.get('s') * 200 - 3;
            let top = (1 - this.data.get('v')) * 200 - 3;
            return {
                top: top + 'px',
                left: left + 'px'
            };
        },
        huaChooseComputedStyle() {
            let top = this.data.get('h') / 360 * 200 - 3;
            return {
                top: top + 'px'
            };
        },
        alphaComputedStyle() {
            let h = this.data.get('h');
            let s = this.data.get('s');
            let v = this.data.get('v');
            let colorBegin = kolor.hsva(h, s, v, 1).rgba().css();
            let colorEnd = kolor.hsva(h, s, v, 0).rgba().css();
            let color = 'linear-gradient(0deg, ' + colorBegin + ', ' + colorEnd + ')';
            return {
                'background': color
            };
        },
        alphaChooseComputedStyle() {
            let top = this.data.get('a') * 200 - 3;
            return {
                top: top + 'px'
            };
        }
    },
    rgbTohsv() {
        let r = this.data.get('r');
        let g = this.data.get('g');
        let b = this.data.get('b');
        let k = kolor.rgb(r, g, b).hsv();
        let [h, s, v] = k.toArray();
        s = s.toFixed(3);
        v = v.toFixed(3);
        this.data.set('h', h);
        this.data.set('s', s);
        this.data.set('v', v);
    },
    hsvTorgb() {
        let h = this.data.get('h');
        let s = this.data.get('s');
        let v = this.data.get('v');
        let k = kolor.hsv(h, s, v).rgb();
        let [r, g, b] = k.toArray();
        let hex = k.hex();
        this.data.set('r', r);
        this.data.set('g', g);
        this.data.set('b', b);
        this.data.set('hex', hex);
    },
    hexTohsv() {
        let hex = this.data.get('hex');
        let [h, s, v] = kolor(hex).hsv().toArray();
        s = s.toFixed(3);
        v = v.toFixed(3);
        this.data.set('h', h);
        this.data.set('s', s);
        this.data.set('v', v);
    },
    handleClick(e) {
        this.data.set('focus', !this.data.get('focus'));
        this.data.set('open', true);
        if (this.data.get('alpha')) {
            let k = kolor(this.data.get('color'));
            let [r, g, b, a] = k.rgba().toArray();
            this.data.set('r', r);
            this.data.set('g', g);
            this.data.set('b', b);
            this.data.set('a', a);
        } else {
            let hex = this.data.get('color');
            this.data.set('hex', hex);
        }
    },
    handleEnsure(e) {
        this.data.set('focus', !this.data.get('focus'));
        this.data.set('open', false);
        let h = this.data.get('h');
        let s = this.data.get('s');
        let v = this.data.get('v');
        let color;
        if (this.data.get('alpha')) {
            let a = parseFloat(this.data.get('a')).toFixed(2);
            color = kolor.hsva(h, s, v, a).rgba().css();
        } else {
            color = kolor.hsv(h, s, v).hex();
        }
        this.data.set('color', color);
        this.fire('color-change');
    },
    handleCancel(e) {
        this.data.set('focus', !this.data.get('focus'));
        this.data.set('open', false);
    },
    handleSv(e) {
        let target = e.currentTarget;
        let outX = target.offsetLeft;
        let outY = target.offsetTop;
        let clientX = e.clientX;
        let clientY = e.clientY;
        let s = ((clientX - outX) / 200).toFixed(3);
        let v = (1 - (clientY - outY) / 200).toFixed(3);
        if (s > 1) {
            s = 1;
        } else if (s < 0) {
            s = 0;
        }
        if (v > 1) {
            v = 1;
        } else if (v < 0) {
            v = 0;
        }
        this.data.set('s', s);
        this.data.set('v', v);
        this.hsvTorgb();
    },
    handleSvMouseDown(e) {
        e.preventDefault();
        this.data.set('svDraggable', true);
    },
    handleSvMouseUp(e) {
        e.preventDefault();
        this.data.set('svDraggable', false);
    },
    handleSvMouseMove(e) {
        e.preventDefault();
        if (this.data.get('svDraggable')) {
            this.handleSv(e);
        }
    },
    handleHua(e) {
        let target = e.currentTarget;
        let outY = target.offsetTop;
        let clientY = e.clientY;
        let h = (clientY - outY) / 200 * 360;
        if (h > 360) {
            h = 360;
        } else if (h < 0) {
            h = 0;
        }
        this.data.set('h', h);
        this.hsvTorgb();
    },
    handleHuaMouseDown(e) {
        e.preventDefault();
        this.data.set('hDraggable', true);
    },
    handleHuaMouseUp(e) {
        e.preventDefault();
        this.data.set('hDraggable', false);
    },
    handleHuaMouseMove(e) {
        e.preventDefault();
        if (this.data.get('hDraggable')) {
            this.handleHua(e);
        }
    },
    handleAlpha(e) {
        let target = e.currentTarget;
        let outY = target.offsetTop;
        let clientY = e.clientY;
        let a = ((clientY - outY) / 200).toFixed(2);
        if (a > 1) {
            a = 1;
        } else if (a < 0) {
            a = 0;
        }
        this.data.set('a', a);
    },
    handleAlphaMouseDown(e) {
        e.preventDefault();
        this.data.set('aDraggable', true);
    },
    handleAlphaMouseUp(e) {
        e.preventDefault();
        this.data.set('aDraggable', false);
    },
    handleAlphaMouseMove(e) {
        e.preventDefault();
        if (this.data.get('aDraggable')) {
            this.handleAlpha(e);
        }
    },
    handleInput(val, type) {
        let formatVal = parseInt(val, 10);
        if (isNaN(formatVal)) {
            this.data.set(type, '');
        } else {
            formatVal = formatVal >= 255 ? 255 : formatVal;
            this.data.set(type, formatVal);
        }
        this.rgbTohsv();
    },
    handleAlphaInput(val) {
        if (val.indexOf('.') === val.length - 1) {
            return;
        }
        let formatVal;
        if (val.length > 4) {
            formatVal = parseFloat(val.substring(0, 4));
        } else {
            formatVal = parseFloat(val);
        }
        if (isNaN(formatVal)) {
            this.data.set('a', '');
        } else {
            formatVal = formatVal >= 1 ? 1 : formatVal;
            this.data.set('a', formatVal);
        }
    },
    handleHexInput(val) {
        let reg = /^\#[0-9a-fA-F]{6}$/;
        if (reg.test(val)) {
            this.data.set('hex', val);
            this.hexTohsv();
        }
    }
});

