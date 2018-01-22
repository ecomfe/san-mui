/**
 * @file Checkbox test case
 * @author asd123freedom@gmail.com
 */

import {expect} from 'chai';
import san from 'san';
import Checkbox from 'src/Checkbox';
import 'src/Checkbox/Checkbox.styl';

describe('Checkbox', () => {
    // prepare for testing
    const viewport = document.createElement('div');
    viewport.id = 'test';

    before(() => {
        document.body.appendChild(viewport);
    });

    after(() => {
        viewport.remove();
    });

    // testing component
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
            },
            handleChange(e) {}
        });
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.checked).to.equal(true);
        el.click();
        component.nextTick(() => {
            expect(inputElement.checked).to.equal(false);
            expect(component.data.get('inputValue').length).to.equal(0);
            component.dispose();
            done();
        });
    });

    it('checked and disabled', done => {
        let component = createComponent({
            template: `<div>
            <ui-checkbox label="最简单的"
                value="{{value}}"
                class="demo-checkbox"
                disabled="{{disabled}}"
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    disabled: true,
                    value: 'ON',
                    inputValue: ['ON']
                };
            }
        });
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        window.i = inputElement;
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.checked).to.equal(true);
        expect(inputElement.disabled).to.equal(true);
        el.click();
        component.nextTick(() => {
            expect(inputElement.checked).to.equal(true);
            component.data.set('disabled', false);
            el.click();
            component.nextTick(() => {
                expect(inputElement.checked).to.equal(true);
                expect(inputElement.disabled).to.equal(false);
                component.dispose();
                done();
            });
        });
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
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.checked).to.equal(false);
        expect(inputElement.disabled).to.equal(true);
        el.click();
        component.nextTick(() => {
            expect(inputElement.checked).to.equal(false);
            component.dispose();
            done();
        });
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
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.indeterminate).to.equal(false);
        component.data.set('indeterminate', true);
        setTimeout(() => {
            expect(inputElement.indeterminate).to.equal(true);
            component.dispose();
            done();
        }, 10);
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
                    value: 'ON',
                    inputValue: []
                };
            }
        });
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.indeterminate).to.equal(false);
        expect(inputElement.checked).to.equal(false);
        el.click();
        setTimeout(() => {
            expect(inputElement.indeterminate).to.equal(true);
            expect(inputElement.checked).to.equal(true);
            el.click();
            setTimeout(() => {
                expect(inputElement.indeterminate).to.equal(false);
                expect(inputElement.checked).to.equal(true);
                component.dispose();
                done();
            }, 10);
        }, 10);
    });
});
