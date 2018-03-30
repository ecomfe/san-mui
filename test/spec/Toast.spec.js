/**
 * @file toast test case
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 */

import {expect} from 'chai';
import san from 'san';
import Toast from 'src/Toast';
import 'src/Toast/index.styl';

describe('Toast', () => {
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

    it('toast element', () => {
        const component = new Toast();
        component.attach(viewport);
        expect(component.el.tagName).to.equal('DIV');
        expect(component.el.className).to.equal('sm-toast variant-rightBottom state-hidden');
        expect(component.data.get('position')).to.equal('rightBottom');
        expect(component.data.get('open')).to.equal(false);
        component.dispose();
    });

    it('component toast', () => {
        let component = createComponent({
            template: '<div>toast</div>',
            initData() {
                return {
                    open: true
                };
            },
            attached() {
                expect(this.data.get('open')).to.equal(true);
            }
        });
        component.dispose();
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
        component.nextTick(() => {
            expect(component.children[0].data.get('open')).to.equal(true);
            component.dispose();
            done();
        });
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
        component.nextTick(() => {
            expect(component.children[0].data.get('open')).to.equal(true);
            viewport.click();
            component.nextTick(() => {
                expect(component.children[0].data.get('open')).to.equal(false);
                component.dispose();
                done();
            });
        });
    });
});
