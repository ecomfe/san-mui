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

    it('simple use', done => {
        let component = createComponent({
            template: `<div>
            <ui-switch
                label="开关1"
                onValue="332"
                offValue="ddaa"
                value="{=inputValue=}"/>
            </div>`,

            initData() {
                return {
                    inputValue: 'ONNN'
                };
            }
        });
        window.d = component;
        let el = component.children[0].el;
        let inputElement = el.querySelector('input');
        expect(el.tagName).to.equal('LABEL');
        component.nextTick(() => {
            // console.log('test:', component.data.get('value'));
            // expect(inputElement.checked).to.equal(true);
            // el.click();
            // component.nextTick(() => {
            //     expect(inputElement.checked).to.equal(false);
            //     expect(component.data.get('inputValue')).to.equal('OFF');
            //     done();
            // });
            component.dispose();
            done();
        });
    });

    // it('disabled', done => {
    //     let component = createComponent({
    //         template: `<div>
    //         <ui-switch
    //             disabled
    //             label="开关"
    //             value="{=inputValue=}"/>
    //         </div>`,
    //
    //         initData() {
    //             return {
    //                 inputValue: 'ON'
    //             };
    //         }
    //     });
    //     let el = component.children[0].el;
    //     let inputElement = el.querySelector('input');
    //     expect(el.tagName).to.equal('LABEL');
    //     expect(inputElement.disabled).to.equal(true);
    //     el.click();
    //     component.nextTick(() => {
    //         expect(inputElement.checked).to.equal(true);
    //         done();
    //     });
    // });
});
