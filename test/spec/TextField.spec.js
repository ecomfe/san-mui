/**
 * @file textfield test case
 * @author asd123freedom@gmail.com
 */

import {expect} from 'chai';
import san from 'san';
import TextField from 'src/TextField';

describe('TextField', () => {
    const viewport = document.createElement('div');
    const createComponent = function (options) {
        let Component = san.defineComponent(
            Object.assign({
                components: {
                    'ui-input': TextField
                },
                initData() {
                    return {};
                }
            }, options)
        );
        let component = new Component();
        component.attach(viewport);
        return component;
    };

    beforeEach(() => {
        document.body.appendChild(viewport);
    });
    afterEach(() => {
        viewport.remove();
    });

    it('simple use', done => {
        let component = createComponent({
            template: '<div><ui-input hintText="提示文字"/></div>'
        });
        component.attach(viewport);
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        let hintElement = el.querySelector('.sm-text-field-hint');
        let focusLineElement = el.querySelector('.sm-text-field-focus-line');
        expect(el.tagName).to.equal('DIV');
        expect(el.className).to.equal('sm-text-field');
        expect(hintElement.innerText.trim()).to.equal('提示文字');
        inputElement.focus();
        setTimeout(() => {
            expect(el.classList.contains('focus-state')).to.equal(true);
            expect(focusLineElement.classList.contains('focus')).to.equal(true);
            component.dispose();
            done();
        }, 1);
    });

    it('multi lines use', () => {
        let component = createComponent({
            template: '<div><ui-input hintText="提示文字" multiLine rows="{{3}}" rowsMax="{{6}}"/></div>'
        });
        component.attach(viewport);
        let el = component.children[0].el;
        let inputElement = el.querySelector('textarea');
        expect(inputElement).to.not.equal(null);
    });

    it('use label', done => {
        let component = createComponent({
            template: '<div><ui-input label="标签文字" labelFocusClass="focusClass"/></div>'
        });
        component.attach(viewport);
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        let labelElement = el.querySelector('.sm-text-field-label');
        expect(el.tagName).to.equal('DIV');
        expect(labelElement.innerText.trim()).to.equal('标签文字');
        expect(labelElement.classList.contains('focusClass')).to.equal(false);
        inputElement.focus();
        setTimeout(() => {
            expect(el.classList.contains('focus-state')).to.equal(true);
            expect(labelElement.classList.contains('focusClass')).to.equal(true);
            component.dispose();
            done();
        }, 1);
    });

    it('use float label', done => {
        let component = createComponent({
            template: '<div><ui-input labelFloat label="标签文字"/></div>'
        });
        component.attach(viewport);
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        let labelElement = el.querySelector('.sm-text-field-label');
        expect(el.tagName).to.equal('DIV');
        expect(labelElement.classList.contains('state-float')).to.equal(true);
        expect(labelElement.innerText.trim()).to.equal('标签文字');
        inputElement.focus();
        setTimeout(() => {
            expect(labelElement.classList.contains('state-float')).to.equal(false);
            component.dispose();
            done();
        }, 1);
    });

    it('set type', () => {
        let component = createComponent({
            template: '<div><ui-input type="password" label="标签文字"/></div>'
        });
        component.attach(viewport);
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('DIV');
        expect(inputElement.getAttribute('type')).to.equal('password');
        component.dispose();
    });

    it('set full width', () => {
        let component = createComponent({
            template: '<div><ui-input fullWidth label="标签文字"/></div>'
        });
        component.attach(viewport);
        let el = component.children[0].el;
        expect(getComputedStyle(el, null)['width']).to.equal(getComputedStyle(component.el, null)['width']);
        component.dispose();
    });

    it('error text', done => {
        let component = createComponent({
            template: '<div><ui-input hintText="标签文字" errorText="错误文字"/></div>'
        });
        component.attach(viewport);
        let el = component.children[0].el;
        let focusLineElement = el.querySelector('.sm-text-field-focus-line');
        expect(el.classList.contains('error')).to.equal(true);
        expect(focusLineElement.classList.contains('error')).to.equal(true);
        done();
    });

    it('error color', done => {
        let component = createComponent({
            template: '<div><ui-input hintText="标签文字" errorText="错误文字" errorColor="#2196f3"/></div>'
        });
        component.attach(viewport);
        let el = component.children[0].el;
        let focusLineElement = el.querySelector('.sm-text-field-focus-line');
        expect(el.classList.contains('error')).to.equal(true);
        expect(el.style.color).to.equal('rgb(33, 150, 243)');
        expect(focusLineElement.classList.contains('error')).to.equal(true);
        done();
    });

    it('disabled input', done => {
        let component = createComponent({
            template: '<div><ui-input hintText="提示文字" disabled/></div>'
        });
        component.attach(viewport);
        let el = component.children[0].el;
        let UnderLineElement = el.querySelector('.sm-text-field-line');
        let inputElement = el.querySelector('input');
        expect(el.classList.contains('disabled')).to.equal(true);
        expect(inputElement.disabled).to.equal(true);
        expect(UnderLineElement.classList.contains('disabled')).to.equal(true);
        done();
    });

    it('character count', done => {
        let component = createComponent({
            template: `<div>
                <ui-input
                    inputValue="{=inputValue=}"
                    hintText="最多不超过10个字符"
                    errorText="{{inputErrorText}}"
                    on-textOverflow="handleInputOverflow($event)"
                    maxLength="{{9}}"/>
            </div>`,

            handleInputOverflow(isOverflow) {
                this.data.set('inputErrorText', isOverflow === 'true' ? 'overflow' : '');
            }
        });
        component.attach(viewport);
        component.data.set('inputValue', '1234567890');
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        let helpElement = el.querySelector('.sm-text-field-help');
        inputElement.focus();
        let focusLineElement = el.querySelector('.sm-text-field-focus-line');
        setTimeout(() => {
            let children = helpElement.children;
            children = Array.prototype.slice.call(children);
            let charElement = children[0];
            let numElement = children[1];
            expect(charElement.innerText).to.equal('overflow');
            expect(numElement.innerText).to.equal('10/9');
            expect(el.classList.contains('error')).to.equal(true);
            expect(focusLineElement.classList.contains('error')).to.equal(true);
            done();
        }, 300);
    });
});
