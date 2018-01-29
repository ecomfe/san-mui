/**
 * @file Checkbox test case
 * @author asd123freedom@gmail.com
 */

import {expect} from 'chai';
import san from 'san';
import Switch from 'src/Switch';
import 'src/Switch/index.styl';

describe('Switch', () => {
    // prepare for testing
    const viewport = document.createElement('div');
    viewport.id = 'test';

    before(() => {
        document.body.appendChild(viewport);
    });

    after(() => {
        viewport.remove();
    });

    const createComponent = function (options) {
        let Component = san.defineComponent(
            Object.assign({
                components: {
                    'ui-switch': Switch
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

    it('switch element', done => {
        let component = new Switch();
        component.attach(viewport);
        expect(component.el.tagName).to.equal('LABEL');
        expect(component.el.querySelector('input').type).to.equal('checkbox');
        expect(component.el.querySelector('input').checked).to.equal(false);
        expect(component.data.get('disabled')).to.equal(false);
        let el = component.el;
        let inputElement = el.querySelector('input');
        el.click();
        component.nextTick(() => {
            expect(inputElement.checked).to.equal(true);
            expect(component.data.get('value')).to.equal('ON');
            component.dispose();
            done();
        });
    });

    it('simple use', done => {
        let component = createComponent({
            template: `<div>
            <ui-switch
                label="swith simple use"
                onValue="111"
                offValue="222"
                value="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    inputValue: '111'
                };
            }
        });
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        component.nextTick(() => {
            expect(inputElement.checked).to.equal(true);
            el.click();
            component.nextTick(() => {
                expect(inputElement.checked).to.equal(false);
                expect(component.data.get('inputValue')).to.equal('222');
                component.dispose();
                done();
            });
        });
    });

    it('disabled', done => {
        let component = createComponent({
            template: `<div>
            <ui-switch
                disabled
                label="开关"
                value="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    inputValue: 'ON'
                };
            }
        });
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.disabled).to.equal(true);
        el.click();
        component.nextTick(() => {
            expect(inputElement.checked).to.equal(true);
            component.dispose();
            done();
        });
    });

    it('boolean value', done => {
        let component = createComponent({
            template: `<div>
            <ui-switch
                label="boolean value"
                onValue="{{onValue}}"
                offValue="{{offValue}}"
                value="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    onValue: true,
                    offValue: false,
                    inputValue: true
                };
            }
        });
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        component.nextTick(() => {
            expect(inputElement.checked).to.equal(true);
            component.data.set('inputValue', false);
            component.nextTick(() => {
                expect(component.data.get('inputValue')).to.equal(false);
                component.dispose();
                done();
            });
        });
    });

    it('value data type error', done => {
        let option = {
            template: `<div>
            <ui-switch
                label="value data type error"
                onValue="{{onValue}}"
                offValue="{{offValue}}"
                value="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    onValue: true,
                    offValue: 'false',
                    inputValue: true
                };
            }
        };

        try {
            createComponent(option);
        } catch (err) {
            expect(err.message).to.include('[SAN-MUI ERROR]');
            done();
        }

    });
});
