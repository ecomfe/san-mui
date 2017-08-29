/**
 * @file toast test case
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 */

import {expect} from 'chai';
import san from 'san';
import Toast from 'src/Toast';

describe('Toast', () => {
    const viewport = document.createElement('div');
    const createComponent = function (options) {
        const Component = san.defineComponent(
            Object.assign({
                components: {
                    'sm-toast': Toast
                },
                initData() {
                    return {};
                }
            }, options)
        );
        const component = new Component();
        component.attach(viewport);
        return component;
    };

    beforeEach(() => {
        document.body.appendChild(viewport);
    });
    afterEach(() => {
        viewport.remove();
    });

    it('toast element', () => {
        const component = new Toast();
        component.attach(viewport);
        expect(component.el.tagName).to.equal('DIV');
        expect(component.el.className).to.equal('sm-toast variant-rightBottom state-hidden');
        expect(component.data.get('position')).to.equal('rightBottom');
        expect(component.data.get('open')).to.equal(false);
        component.dispose();
    });

    it('component toast', done => {
        let component = createComponent({
            template: '<div>toast</div>',
            initData() {
                return {
                    open: true
                };
            },
            attached() {
                expect(this.data.get('open')).to.equal(true);
                done();
            }
        });
    });

    it('should opened toast state is true', done => {
        let component = createComponent({
            template: '<div><sm-toast open="{=open=}">这是toast</sm-toast></div>',
            initData() {
                return {
                    open: false
                };
            },
            attached() {
                this.data.set('open', true);
            }
        });
        setTimeout(() => {
            expect(component.childs[0].data.get('open')).to.equal(true);
            done();
        }, 10);
    });

    it('should opened toast clickoutside', done => {
        let component = createComponent({
            template: '<div><sm-toast open="{=open=}">这是toast</sm-toast></div>',
            initData() {
                return {
                    open: false
                };
            },
            attached() {
                this.data.set('open', true);
            }
        });
        setTimeout(() => {
            viewport.click();
            setTimeout(() => {
                expect(component.childs[0].data.get('open')).to.equal(false);
                done();
            }, 10);
        }, 100);
    });
});
