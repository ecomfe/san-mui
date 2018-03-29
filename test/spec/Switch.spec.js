/**
 * @file Checkbox test case
 * @author asd123freedom@gmail.com
 */

import {expect} from 'chai';
import san from 'san';
import Switch from 'src/Switch';

describe('Switch', () => {
    const viewport = document.createElement('div');
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

    beforeEach(() => {
        document.body.appendChild(viewport);
    });
    afterEach(() => {
        viewport.remove();
    });

    it('simple use', done => {
        let component = createComponent({
            template: `<div>
            <ui-switch
                label="开关"
                value="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    inputValue: 'ON'
                };
            }
        });
        component.attach(viewport);
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        setTimeout(() => {
            expect(inputElement.checked).to.equal(true);
            el.click();
            setTimeout(() => {
                expect(inputElement.checked).to.equal(false);
                expect(component.data.get('inputValue')).to.equal('OFF');
                done();
            }, 300);
        }, 100);
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
        component.attach(viewport);
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        expect(inputElement.disabled).to.equal(true);
        el.click();
        setTimeout(() => {
            expect(inputElement.checked).to.equal(true);
            done();
        }, 100);
    });
});