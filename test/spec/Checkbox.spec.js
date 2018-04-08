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

    it('checkbox element', () => {
        let component = new Checkbox();
        component.attach(viewport);
        expect(component.el.tagName).to.equal('LABEL');
        expect(component.el.className).to.includes('sm-checkbox');
        expect(component.el.querySelector('input').checked).to.equal(false);
        expect(component.data.get('disabled')).to.equal(false);
        component.dispose();
    });

    it('simple use', done => {
        let component = createComponent({
            template: `<div>
            <ui-checkbox label="最简单的"
                value="{{value}}"
                s-ref="checkbox"
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
        let el = component.ref('checkbox').el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.checked).to.equal(true);
        el.click();
        // setTimeout为了等待CenterRipple animationend，触发对应方法，提高覆盖率。
        setTimeout(() => {
            expect(inputElement.checked).to.equal(false);
            expect(component.data.get('inputValue').length).to.equal(0);
            component.dispose();
            done();
        }, 800);
    });

    it('checked and disabled', done => {
        let component = createComponent({
            template: `<div>
            <ui-checkbox label="最简单的"
                value="{{value}}"
                s-ref="checkbox"
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
        let el = component.ref('checkbox').el;
        let inputElement = el.querySelector('input');
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
                s-ref="checkbox"
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    value: 'ON'
                };
            }
        });
        let el = component.ref('checkbox').el;
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

    // support string|number
    it('number and string value', done => {
        let component = createComponent({
            template: `<div>
                <ui-checkbox label="num1"
                    value="{{num1}}"
                    s-ref="checkbox1"
                    checked="{=inputValueNum=}"/>
                <ui-checkbox label="num2"
                    value="{{num2}}"
                    s-ref="checkbox2"
                    checked="{=inputValueNum=}"/>
                <br>
                <ui-checkbox label="str1"
                    value="{{str1}}"
                    s-ref="checkbox3"
                    checked="{=inputValueStr=}"/>
                <ui-checkbox label="str2"
                    value="{{str2}}"
                    s-ref="checkbox4"
                    checked="{=inputValueStr=}"/>
            </div>`,

            initData() {
                return {
                    num1: 1,
                    num2: 2,
                    inputValueNum: [1],
                    str1: '1',
                    str2: '2',
                    inputValueStr: ['2']
                };
            }
        });
        const cb1 = component.ref('checkbox1');
        const cb2 = component.ref('checkbox2');
        const cb3 = component.ref('checkbox3');
        const cb4 = component.ref('checkbox4');
        expect(cb1.el.querySelector('input').checked).to.equal(true);
        expect(cb2.el.querySelector('input').checked).to.equal(false);
        expect(cb3.el.querySelector('input').checked).to.equal(false);
        expect(cb4.el.querySelector('input').checked).to.equal(true);
        cb1.el.click();
        cb3.el.click();
        component.nextTick(() => {
            expect(component.data.get('inputValueNum')).to.deep.equal([]);
            expect(cb1.el.querySelector('input').checked).to.equal(false);
            cb2.el.click();
            component.nextTick(() => {
                expect(component.data.get('inputValueNum')).to.deep.equal([2]);
                expect(cb2.el.querySelector('input').checked).to.equal(true);
                component.dispose();
                done();
            });
            expect(component.data.get('inputValueStr')).to.deep.equal(['2', '1']);
            expect(cb3.el.querySelector('input').checked).to.equal(true);
        });
    });

    // support string|number
    it('`checked` value type error', done => {
        const option = {
            template : `<div>
                <ui-checkbox label="num"
                    value="{{num}}"
                    checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    num: '1',
                    inputValue: [true]
                }
            }
        };

        try {
            createComponent(option);
        } catch (err) {
            expect(err.message).to.include('Invalid prop');
            done();
        }
    });

    it('number and string value mix error', done => {
        const option = {
            template: `<div>
                <ui-checkbox label="num"
                    value="{{num}}"
                    checked="{=inputValue=}"/>
                <ui-checkbox label="str"
                    value="{{str}}"
                    checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    num: 1,
                    str: '1',
                    inputValue: [1]
                };
            }
        };

        try {
            createComponent(option);
        }
        catch (err) {
            expect(err.message).to.include('[SAN-MUI ERROR]');
            done();
        }
    });

    it('set indeterminate', done => {
        let component = createComponent({
            template: `<div>
            <ui-checkbox label="最简单的"
                value="{{value}}"
                class="demo-checkbox"
                s-ref="checkbox"
                indeterminate="{=indeterminate=}"
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    indeterminate: true,
                    value: 'ON',
                    inputValue: ['ON']
                };
            }
        });
        let el = component.ref('checkbox').el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.indeterminate).to.equal(true);
        expect(inputElement.checked).to.equal(true);
        component.data.set('indeterminate', false);
        setTimeout(() => {
            expect(inputElement.indeterminate).to.equal(false);
            expect(inputElement.checked).to.equal(true);
            component.dispose();
            done();
        }, 100);
    });

    it('click to change checked and indeterminate', done => {
        let component = createComponent({
            template: `<div>
            <ui-checkbox label="indeterminate test"
                value="{{value}}"
                s-ref="checkbox"
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
        let el = component.ref('checkbox').el;
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
            }, 100);
        }, 100);
    });
});
