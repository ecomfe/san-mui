/**
 * @file button test case
 * @author mengke01(kekee000@gmail.com)
 */

import {expect} from 'chai';
import san from 'san';
import {IconButton, Button, FlatButton} from 'src/Button';

describe('Button', () => {
    const viewport = document.createElement('div');
    const createComponent = function (options) {
        let Component = san.defineComponent(
            Object.assign({
                components: {
                    'ui-button': Button,
                    'ui-icon-button': IconButton,
                    'ui-flat-button': FlatButton
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

    it('button element', () => {
        let component = new Button();
        component.attach(viewport);
        expect(component.el.tagName).to.equal('BUTTON');
        expect(component.el.className).to.equal('sm-button');
        expect(component.data.get('type')).to.equal('button');
        expect(component.data.get('disabled')).to.equal(false);
        component.dispose();
    });

    it('component button', done => {
        let component = createComponent({
            template: '<div><ui-button disabled="{{disabled}}" on-click="onclick">Hello</ui-button></div>',
            initData() {
                return {
                    disabled: true
                };
            },
            onclick() {
                expect(component.childs[0].data.get('disabled')).to.equal(false);
                done();
            }
        });
        expect(component.childs[0].el.innerText.trim()).to.equal('Hello');
        component.childs[0].el.click();
        setTimeout(() => {
            component.childs[0].data.set('disabled', false);
            setTimeout(() => {
                component.childs[0].el.click();
            });
        }, 10);
    });

    it('component link', done => {
        let component = createComponent({
            template: '<div><ui-button on-click="onclick" href="{{href}}">Hello</ui-button></div>',
            initData() {
                return {
                    href: 'hello'
                };
            }
        });
        expect(component.childs[0].el.tagName).to.equal('A');
        expect(component.childs[0].el.getAttribute('href')).to.equal('hello');
        done();
    });

    it('component iconbutton', done => {
        let component = createComponent({
            template: '<div><ui-icon-button>keyboard_arrow_down</ui-icon-button></div>'
        });
        expect(component.childs[0].el.querySelector('.sm-icon')).to.be.ok;
        expect(component.childs[0].el.querySelector('.sm-icon').innerText.trim())
            .to.equal('keyboard_arrow_down');
        done();
    });

    it('component flatbutton', done => {
        let component = createComponent({
            template: '<div><ui-flat-button>Hello</ui-flat-button></div>'
        });
        expect(component.childs[0].el.innerText.trim()).to.equal('Hello');
        done();
    });
});
