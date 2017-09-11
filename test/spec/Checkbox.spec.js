/**
 * @file Checkbox test case
 * @author asd123freedom@gmail.com
 */

import {expect} from 'chai';
import san from 'san';
import Checkbox from 'src/Checkbox';

describe('Checkbox', () => {
    const viewport = document.createElement('div');
    const createComponent = function (options) {
        let Component = san.defineComponent(
            Object.assign({
                components: {
                    'ui-checkbox': Checkbox
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
            template: `<div>
            <ui-checkbox label="最简单的"
                value="{{value}}"
                class="demo-checkbox"
                on-input-change="handleChange($event)"
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    value: 'ON',
                    inputValue: ['ON']
                };
            }
        });
        component.attach(viewport);
        let el = component.childs[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.checked).to.equal(true);
        el.click();
        setTimeout(() => {
            expect(inputElement.checked).to.equal(false);
            expect(component.data.get('inputValue').length).to.equal(0);
            done();
        }, 1);
    });
    it('checked and disabled', done => {
        let component = createComponent({
            template: `<div>
            <ui-checkbox label="最简单的"
                value="{{value}}"
                class="demo-checkbox"
                disabled
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    value: 'ON',
                    inputValue: ['ON']
                };
            }
        });
        component.attach(viewport);
        let el = component.childs[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.checked).to.equal(true);
        expect(inputElement.disabled).to.equal(true);
        el.click();
        setTimeout(() => {
            expect(inputElement.checked).to.equal(true);
            done();
        }, 1);
    });
    it('unchecked and disabled', done => {
        let component = createComponent({
            template: `<div>
            <ui-checkbox label="最简单的"
                value="{{value}}"
                class="demo-checkbox"
                disabled
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    value: 'ON'
                };
            }
        });
        component.attach(viewport);
        let el = component.childs[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.checked).to.equal(false);
        expect(inputElement.disabled).to.equal(true);
        el.click();
        setTimeout(() => {
            expect(inputElement.checked).to.equal(false);
            done();
        }, 1);
    });

    it('set indeterminate', done => {
        let component = createComponent({
            template: `<div>
            <ui-checkbox label="最简单的"
                value="{{value}}"
                class="demo-checkbox"
                indeterminate="{=indeterminate=}"
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    value: 'ON'
                };
            }
        });
        component.attach(viewport);
        let el = component.childs[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.indeterminate).to.equal(false);
        component.data.set('indeterminate', true);
        setTimeout(() => {
            expect(inputElement.indeterminate).to.equal(true);
            done();
        }, 1);
    });

    it('click to change checked and indeterminate', done => {
        let component = createComponent({
            template: `<div>
            <ui-checkbox label="最简单的"
                value="{{value}}"
                class="demo-checkbox"
                canClickToSwitchToIndeterminate
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    value: 'ON'
                };
            }
        });
        component.attach(viewport);
        let el = component.childs[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        el.click();
        setTimeout(() => {
            expect(inputElement.indeterminate).to.equal(true);
            el.click();
            setTimeout(() => {
                expect(inputElement.checked).to.equal(true);
                done();
            }, 300);
        });
    });
});
