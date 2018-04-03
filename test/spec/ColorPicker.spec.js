/**
 * @file colorpicker test case
 * @author malingyang(malingyang@baidu.com)
 */

import {expect} from 'chai';
import san from 'san';
import ColorPicker from 'src/ColorPicker';

describe('ColorPicker', () => {
    const viewport = document.createElement('div');

    const createComponent = function (options) {
        let Component = san.defineComponent(
            Object.assign({
                components: {
                    'ui-color-picker': ColorPicker
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

    it('colorpicker element', () => {
        let component = new ColorPicker();
        component.attach(viewport);
        expect(component.el.tagName).to.equal('DIV');
        expect(component.el.className).to.equal('sm-color-picker');
        expect(component.data.get('color')).to.equal('#ffffff');
        expect(component.data.get('alpha')).to.equal(false);
        component.dispose();
    });

    it('toggle colorpicker window', done => {
        let component = createComponent({
            template: `
                <div><ui-color-picker s-ref="color-picker"></ui-color-picker></div>
            `
        });
        let colorpicker = component.ref('color-picker');
        colorpicker.el.querySelector('.sm-color-picker-indicator-wrapper').click();
        setTimeout(() => {
            expect(colorpicker.data.get('open')).to.equal(true);
            document.querySelector('.sm-dialog-actions .variant-info').click();
            setTimeout(() => {
                expect(colorpicker.data.get('open')).to.equal(false);
                done();
            }, 0);
        }, 0);
    });

    it('change color in hex mode using input', done => {
        let component = createComponent({
            template: `
                <div><ui-color-picker s-ref="color-picker" alpha="{{alpha}}"></ui-color-picker></div>
            `,
            initData() {
                return {
                    alpha: false
                };
            }
        });
        let colorpicker = component.ref('color-picker');
        let e = {
            target: {
                value: '#7ab1cc'
            }
        };
        colorpicker.handleHexInput(e);
        colorpicker.handleConfirm();
        setTimeout(() => {
            expect(colorpicker.data.get('color')).to.equal('#7ab1cc');
            let e = {
                target: {
                    value: '#123456'
                }
            };
            colorpicker.handleHexInput(e);
            colorpicker.handleClick();
            setTimeout(() => {
                expect(colorpicker.data.get('color')).to.equal('#7ab1cc');
                done();
            }, 0);
        }, 100);
    });

    it('change color in rgba mode using input', done => {
        let component = createComponent({
            template: `
                <div><ui-color-picker s-ref="color-picker" alpha="{{alpha}}"></ui-color-picker></div>
            `,
            initData() {
                return {
                    alpha: true
                };
            }
        });
        let colorpicker = component.ref('color-picker');
        let eventR = {
            target: {
                value: '144'
            }
        };
        let eventG = {
            target: {
                value: '144'
            }
        };
        let eventB = {
            target: {
                value: '144'
            }
        };
        let eventA = {
            target: {
                value: '0.8'
            }
        };
        colorpicker.handleRgbInput(eventR, 0);
        colorpicker.handleRgbInput(eventG, 1);
        colorpicker.handleRgbInput(eventB, 2);
        colorpicker.handleAlphaInput(eventA);
        colorpicker.handleConfirm();
        setTimeout(() => {
            expect(colorpicker.data.get('color')).to.equal('rgba(144, 144, 144, 0.8)');
            eventA = {
                target: {
                    value: '0.2'
                }
            };
            colorpicker.handleAlphaInput(eventA);
            colorpicker.handleClick();
            setTimeout(() => {
                expect(colorpicker.data.get('color')).to.equal('rgba(144, 144, 144, 0.8)');
                done();
            }, 0);
        }, 0);
    });

    it('change color in hex mode using mouse', done => {
        let component = createComponent({
            template: `
                <div><ui-color-picker s-ref="color-picker" alpha="{{alpha}}"></ui-color-picker></div>
            `,
            initData() {
                return {
                    alpha: false
                };
            }
        });
        let colorpicker = component.ref('color-picker');
        let eventSv = {
            clientX: 100,
            clientY: 100,
            currentTarget: {
                offsetLeft: 20,
                offsetTop: 60
            }
        };
        let eventHua = {
            clientY: 111.111111,
            currentTarget: {
                offsetTop: 0
            }
        };
        colorpicker.handleSvChange(eventSv);
        colorpicker.handleHuaChange(eventHua);
        // document.querySelector('.sm-dialog-actions .variant-info').click();
        colorpicker.handleConfirm();
        setTimeout(() => {
            expect(colorpicker.data.get('color')).to.equal('#7ab1cc');
            done();
        }, 0);
    });

    it('change color in rgba mode using mouse', done => {
        let component = createComponent({
            template: `
                <div><ui-color-picker s-ref="color-picker" alpha="{{alpha}}"></ui-color-picker></div>
            `,
            initData() {
                return {
                    alpha: true
                };
            }
        });
        let colorpicker = component.ref('color-picker');
        let eventSv = {
            clientX: 100,
            clientY: 100,
            currentTarget: {
                offsetLeft: 20,
                offsetTop: 60
            }
        };
        let eventHua = {
            clientY: 111.111111,
            currentTarget: {
                offsetTop: 0
            }
        };
        let eventAlpha = {
            clientY: 200,
            currentTarget: {
                offsetTop: 100
            }
        };
        colorpicker.handleSvChange(eventSv);
        colorpicker.handleHuaChange(eventHua);
        colorpicker.handleAlphaChange(eventAlpha);
        // document.querySelector('.sm-dialog-actions .variant-info').click();
        colorpicker.handleConfirm();
        setTimeout(() => {
            expect(colorpicker.data.get('color')).to.equal('rgba(122, 177, 204, 0.5)');
            done();
        }, 0);
    });

});
