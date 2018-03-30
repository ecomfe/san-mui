/**
 * @file button test case
 * @author mengke01(kekee000@gmail.com)
 */

import {expect} from 'chai';
import san from 'san';
import Icon from 'src/Icon';
import 'src/Icon/Icon.styl'

describe('Icon', () => {
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
                    'ui-icon': Icon
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

    it('icon element', () => {
        let component = new Icon();
        component.attach(viewport);
        expect(component.el.tagName).to.equal('I');
        expect(component.el.className).to.equal('sm-icon');
        expect(component.data.get('size')).to.equal(24);
        component.dispose();
    });

    it('component icon', done => {
        let component = createComponent({
            template: '<div><ui-icon size="{{size}}">keyboard_arrow_down</ui-icon></div>',
            initData() {
                return {
                    size: 100
                };
            }
        });
        expect(component.children[0].el.innerText.trim()).to.equal('keyboard_arrow_down');
        expect(component.children[0].el.style.fontSize).to.equal('100px');
        component.data.set('size', 200);
        component.nextTick(() => {
            expect(component.children[0].el.style.fontSize).to.equal('200px');
            component.dispose();
            done();
        });
    });

    it('error size', done => {
        try {
            let component = createComponent({
                template: '<div><ui-icon size="{{size}}">keyboard_arrow_down</ui-icon></div>',
                initData() {
                    return {
                        size: {}
                    };
                }
            });
        }
        catch(e) {
            expect(e.message.indexOf('[SAN ERROR]') >= 0).to.be.true;
            done();
        }
    });

});
