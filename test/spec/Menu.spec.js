/**
 * @file button test case
 * @author mengke01(kekee000@gmail.com)
 */

import {expect} from 'chai';
import san from 'san';
import {Menu, IconMenu, DropDownMenu, MenuItem} from 'src/Menu';
import Icon from 'src/Icon';

describe('Menu', () => {
    const viewport = document.createElement('div');
    const createComponent = function (options) {
        let Component = san.defineComponent(
            Object.assign({
                components: {
                    'ui-menu': Menu,
                    'ui-icon-menu': IconMenu,
                    'ui-dropdown-menu': DropDownMenu,
                    'ui-menu-item': MenuItem,
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

    beforeEach(() => {
        document.body.appendChild(viewport);
    });
    afterEach(() => {
        viewport.remove();
    });

    it('component menu', done => {
        let component = createComponent({
            template: `<div>
                            <ui-menu>
                                <ui-menu-item title="MenuItem 1" disabled on-click="onclick" />
                                <ui-menu-item title="MenuItem 2" subTitle="⌘←" on-click="onclick">
                                    <ui-icon slot="leftIcon">play_arrow</ui-icon>
                                </ui-menu-item>
                            </ui-menu>
                        </div>`,
            initData() {
                return {
                    arr: []
                };
            },
            onclick() {
                this.data.push('arr', 1);
            }
        });

        let itemComponent1 = component.childs[1].slotChilds[0].childs[1];
        let itemComponent2 = component.childs[1].slotChilds[0].childs[3];

        expect(itemComponent1.data.get('disabled')).to.equal(true);
        expect(itemComponent1.el.querySelector('.sm-menu-item-title').innerText.trim()).to.equal('MenuItem 1');
        expect(itemComponent2.el.querySelector('.sm-menu-item-title').innerText.trim()).to.equal('MenuItem 2');
        expect(itemComponent2.el.querySelector('.sm-menu-item-sub-title').innerText.trim()).to.equal('⌘←');
        expect(itemComponent2.data.get('hasLeft')).to.equal(true);
        expect(itemComponent2.el.querySelector('.sm-icon')).to.be.ok;
        expect(itemComponent2.el.querySelector('.sm-icon').innerText.trim()).to.equal('play_arrow');
        itemComponent1.el.click();
        expect(component.data.get('arr').length).to.equal(0);
        itemComponent2.el.click();
        expect(component.data.get('arr').length).to.equal(1);
        done();
    });

    it('component menu checkbox', done => {
        let component = createComponent({
            template: `<div>
                            <ui-menu>
                                <ui-menu-item
                                    title="复选1"
                                    type="checkbox"
                                    checked="{=value=}"
                                    value="checkbox1" />
                                <ui-menu-item
                                    title="复选2"
                                    type="checkbox"
                                    checked="{=value=}"
                                    value="checkbox2" />
                            </ui-menu>
                        </div>`,
            initData() {
                return {
                    value: ['checkbox2']
                };
            }
        });

        let itemComponent1 = component.childs[1].slotChilds[0].childs[1];
        let itemComponent2 = component.childs[1].slotChilds[0].childs[3];
        itemComponent1.el.click();
        setTimeout(() => {
            expect(component.data.get('value').length).to.equal(2);
            expect(component.data.get('value')).to.contain('checkbox1');
            expect(component.data.get('value')).to.contain('checkbox2');
            expect(itemComponent1.el.querySelector('.sm-icon').innerText.trim()).to.equal('check');
            expect(itemComponent2.el.querySelector('.sm-icon').innerText.trim()).to.equal('check');
            itemComponent1.el.click();
            setTimeout(() => {
                itemComponent2.el.click();
                setTimeout(() => {
                    expect(component.data.get('value')).to.be.empty;
                    expect(itemComponent1.el.querySelector('.sm-icon').innerText.trim()).to.be.empty;
                    expect(itemComponent2.el.querySelector('.sm-icon').innerText.trim()).to.be.empty;
                    done();
                }, 0);
            }, 0);
        }, 0);
    });

    it('component menu radio', done => {
        let component = createComponent({
            template: `<div>
                            <ui-menu>
                                <ui-menu-item
                                    title="单选1"
                                    type="radio"
                                    checked="{=value=}"
                                    value="radio1" />
                                <ui-menu-item
                                    title="单选2"
                                    type="radio"
                                    checked="{=value=}"
                                    value="radio2" />
                            </ui-menu>
                        </div>`,
            initData() {
                return {
                    value: 'radio2'
                };
            }
        });

        let itemComponent1 = component.childs[1].slotChilds[0].childs[1];
        let itemComponent2 = component.childs[1].slotChilds[0].childs[3];
        expect(itemComponent2.el.querySelector('.sm-icon').innerText.trim()).to.equal('check');
        expect(itemComponent1.el.querySelector('.sm-icon').innerText.trim()).to.be.empty;
        itemComponent1.el.click();
        setTimeout(() => {
            expect(component.data.get('value')).to.equal('radio1');
            expect(itemComponent1.el.querySelector('.sm-icon').innerText.trim()).to.equal('check');
            expect(itemComponent2.el.querySelector('.sm-icon').innerText.trim()).to.be.empty;
            done();
        }, 0);
    });

    it('component menu cascade', done => {
        let component = createComponent({
            template: `<div>
                            <ui-menu>
                                <ui-menu-item title="menu item" cascade>
                                    <ui-menu slot="submenu">
                                        <ui-menu-item title="submenu item" cascade>
                                            <ui-menu slot="submenu">
                                                <ui-menu-item title="subsubmenu item" />
                                            </ui-menu>
                                        </ui-menu-item>
                                    </ui-menu>
                                </ui-menu-item>
                            </ui-menu>
                        </div>`,
            initData() {
                return {
                    value: 'radio2'
                };
            }
        });

        let menu1 = component.childs[1].slotChilds[0].childs[1];
        let menu2 = menu1.slotChilds.filter(child => {
            return child.name === 'submenu';
        })[0].childs[0].slotChilds[0].childs[1];
        let menu3 = menu2.slotChilds.filter(child => {
            return child.name === 'submenu';
        })[0].childs[0].slotChilds[0].childs[1];
        menu1.el.click();
        setTimeout(() => {
            expect(menu1.data.get('subMenuOpen')).to.equal(true);
            menu2.el.click();
            setTimeout(() => {
                expect(menu2.data.get('subMenuOpen')).to.equal(true);
                menu1.el.click(); // close all
                setTimeout(() => {
                    expect(menu1.data.get('subMenuOpen')).to.equal(false);
                    expect(menu2.data.get('subMenuOpen')).to.equal(false);
                    done();
                }, 0);
            }, 0);
        }, 0);
    });

    it('icon menu', done => {
        let component = createComponent({
            template: `<div>
                            <ui-icon-menu icon="more_vert">
                                <ui-menu-item title="刷新" />
                                <ui-menu-item title="推出" />
                            </ui-icon-menu>
                        </div>`,
            initData() {
                return {
                };
            }
        });
        expect(component.childs[1].data.get('open')).to.equal(false);
        component.childs[1].el.querySelector('.sm-icon').click();
        setTimeout(() => {
            expect(component.childs[1].data.get('open')).to.equal(true);
            done();
        }, 0);
    });

    it('dropdown menu', done => {
        let component = createComponent({
            template: `<div>
                            <ui-dropdown-menu  value="{=value=}" on-change="change($event)">
                                <ui-menu-item value="1" title="星期一"/>
                                <ui-menu-item value="2" title="星期二"/>
                                <ui-menu-item value="3" title="星期三"/>
                            </ui-dropdown-menu>
                        </div>`,
            initData() {
                return {
                    value: '1'
                };
            },
            change(value) {
                this.data.set('value', value);
                expect(component.childs[1].slotChilds[0].childs[value * 2 -1].data.get('selected')).to.equal(true);
            }
        });
        let itemComponent1 = component.childs[1].slotChilds[0].childs[1];
        let itemComponent2 = component.childs[1].slotChilds[0].childs[3];
        let itemComponent3 = component.childs[1].slotChilds[0].childs[5];
        expect(itemComponent1.data.get('selected')).to.equal(true);
        itemComponent2.el.click();
        setTimeout(() => {
            itemComponent3.el.click();
            done();
        }, 0);
    });
});
