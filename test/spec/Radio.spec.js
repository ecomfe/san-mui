/**
 * @file Checkbox test case
 * @author asd123freedom@gmail.com
 */

import {expect} from 'chai';
import san from 'san';
import Radio from 'src/Radio';

describe('Checkbox', () => {
    const viewport = document.createElement('div');
    const createComponent = function (options) {
        let Component = san.defineComponent(
            Object.assign({
                components: {
                    'ui-radio': Radio
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
            <ui-radio label="单选1"
                value="simple1"
                name="group"
                checked="{=inputValue=}"/>
            <ui-radio label="单选2"
                value="simple2"
                name="group"
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    inputValue: 'simple1'
                };
            }
        });
        component.attach(viewport);
        let firstRadio = component.childs[0].el;
        let secondRadio = component.childs[1].el;
        let firstInput = firstRadio.querySelector('input');
        let secondInput = secondRadio.querySelector('input');
        expect(firstRadio.tagName).to.equal('LABEL');
        expect(secondRadio.tagName).to.equal('LABEL');
        expect(firstInput.checked).to.equal(true);
        expect(secondInput.checked).to.equal(false);
        secondRadio.click();
        setTimeout(() => {
            expect(firstInput.checked).to.equal(false);
            expect(secondInput.checked).to.equal(true);
            done();
        }, 100);
    });

    it('disabled', done => {
        let component = createComponent({
            template: `<div>
            <ui-radio label="单选1"
                value="simple1"
                name="group"
                disabled
                checked="{=inputValue=}"/>
            <ui-radio label="单选2"
                value="simple2"
                disabled
                name="group"
                checked="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    inputValue: 'simple1'
                };
            }
        });
        component.attach(viewport);
        let firstRadio = component.childs[0].el;
        let secondRadio = component.childs[1].el;
        let firstInput = firstRadio.querySelector('input');
        let secondInput = secondRadio.querySelector('input');
        expect(firstRadio.tagName).to.equal('LABEL');
        expect(secondRadio.tagName).to.equal('LABEL');
        expect(firstInput.checked).to.equal(true);
        expect(secondInput.checked).to.equal(false);
        expect(firstInput.disabled).to.equal(true);
        secondRadio.click();
        setTimeout(() => {
            expect(firstInput.checked).to.equal(true);
            expect(secondInput.checked).to.equal(false);
            done();
        }, 500);
    });
});