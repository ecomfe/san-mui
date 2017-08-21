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
        let el = component.childs[0].el;
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

    it('use label',done => {
        let component = createComponent({
            template: '<div><ui-input label="标签文字" labelFocusClass="focusClass"/></div>'
        });
        component.attach(viewport);
        let el = component.childs[0].el;
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
        let el = component.childs[0].el;
        let inputElement = el.querySelector('input');
        let labelElement = el.querySelector('.sm-text-field-label');
        expect(el.tagName).to.equal('DIV');
        expect(labelElement.classList.contains('float')).to.equal(true);
        expect(labelElement.innerText.trim()).to.equal('标签文字');
        inputElement.focus();
        setTimeout(() => {
            expect(labelElement.classList.contains('float')).to.equal(false);
            component.dispose();
            done();
        }, 1);
    });

    it('set type', () => {
        let component = createComponent({
            template: '<div><ui-input type="password" label="标签文字"/></div>'
        });
        component.attach(viewport);
        let el = component.childs[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('DIV');
        expect(inputElement.getAttribute('type')).to.equal('password');
    });

    it('set full width', () => {
        let component = createComponent({
            template: '<div><ui-input fullWidth label="标签文字"/></div>'
        });
        component.attach(viewport);
        let el = component.childs[0].el;
        expect(getComputedStyle(el, null)['width']).to.equal(getComputedStyle(component.el, null)['width']);
    });
});
