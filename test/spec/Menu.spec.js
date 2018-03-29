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
                                <ui-menu-item san-ref="item1" title="MenuItem 1" disabled on-click="onclick" />
                                <ui-menu-item san-ref="item2" title="MenuItem 2" subTitle="⌘←" on-click="onclick">
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

        let itemComponent1 = component.ref('item1');
        let itemComponent2 = component.ref('item2');

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
                                <ui-menu-item san-ref="item1"
                                    title="复选1"
                                    type="checkbox"
                                    checked="{=value=}"
                                    value="checkbox1" />
                                <ui-menu-item san-ref="item2"
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

        let itemComponent1 = component.ref('item1');
        let itemComponent2 = component.ref('item2');
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
                                <ui-menu-item san-ref="item1"
                                    title="单选1"
                                    type="radio"
                                    checked="{=value=}"
                                    value="radio1" />
                                <ui-menu-item san-ref="item2"
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

        let itemComponent1 = component.ref('item1');
        let itemComponent2 = component.ref('item2');
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

        let menu1 = component.children[0].slotchildren[0].children[0];
        let menu2 = menu1.slotchildren.filter(child => {
            return child.name === 'submenu';
        })[0].children[0].slotchildren[0].children[0];
        let menu3 = menu2.slotchildren.filter(child => {
            return child.name === 'submenu';
        })[0].children[0].slotchildren[0].children[0];
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
        expect(component.children[0].data.get('open')).to.equal(false);
        component.children[0].el.querySelector('.sm-icon').click();
        setTimeout(() => {
            expect(component.children[0].data.get('open')).to.equal(true);
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
                expect(component.children[0].slotchildren[0].children[value - 1].data.get('selected')).to.equal(true);
            }
        });
        let itemComponent1 = component.children[0].slotchildren[0].children[0];
        let itemComponent2 = component.children[0].slotchildren[0].children[1];
        let itemComponent3 = component.children[0].slotchildren[0].children[2];
        expect(itemComponent1.data.get('selected')).to.equal(true);
        itemComponent2.el.click();
        setTimeout(() => {
            itemComponent3.el.click();
            done();
        }, 0);
    });

    it('dropdown menu dynamic items', done => {
        let component = createComponent({
            template: `<div>
                            <ui-dropdown-menu  value="{=value=}" on-change="change($event)">
                                <ui-menu-item san-for="item in items" value="{{item.value}}" title="{{item.title}}"/>
                            </ui-dropdown-menu>
                        </div>`,
            initData() {
                return {
                    value: '1',
                    items: [
                        {
                            value: '1',
                            title: '星期一'
                        },
                        {
                            value: '2',
                            title: '星期二'
                        },
                        {
                            value: '3',
                            title: '星期三'
                        }
                    ]
                };
            },
            change(value) {
                this.data.set('value', value);
                if (value === '1') {
                    expect(component.children[0].slotchildren[0].children[0].children[value - 1].data.get('selected')).to.equal(true);
                }
                else if (value === '4') {
                    expect(component.children[0].slotchildren[0].children[0].children[value - 4].data.get('selected')).to.equal(true);
                }
            }
        });
        // 测试items循环赋值
        let itemComponent1 = component.children[0].slotchildren[0].children[0].children[0];
        let itemComponent2 = component.children[0].slotchildren[0].children[0].children[1];
        let itemComponent3 = component.children[0].slotchildren[0].children[0].children[2];
        expect(itemComponent1.data.get('selected')).to.equal(true);
        itemComponent2.el.click();
        setTimeout(() => {
            expect(itemComponent2.data.get('selected')).to.equal(true);
            // done();
        }, 0);

        // 测试items动态改变
        let newItems = [
            {
                value: '4',
                title: '星期四'
            },
            {
                value: '5',
                title: '星期五'
            },
            {
                value: '6',
                title: '星期六'
            },
            {
                value: '7',
                title: '星期日'
            }
        ];
        // 测试动态改变items的值后，重新渲染
        component.data.set('items', newItems);
        setTimeout(() => {
            // 重新渲染后，比较重新渲染的组件个数与items新变量长度是否一致
            let newItemsComponents = component.children[0].slotchildren[0].children[0].children;
            expect(newItemsComponents.length).to.equal(newItems.length);
            // 重新渲染后，items内部data和重新指定的新items变量比较
            newItemsComponents.forEach((item, index) => {
                expect(item.data.get('value') === newItems[index].value);
                expect(item.data.get('title') === newItems[index].title);
            });

            // 测试重新渲染后，第一个item的data中seleted应该为false
            let newItemsComponent1 = newItemsComponents[0];
            expect(newItemsComponent1.data.get('selected')).to.equal(false);

            // 测试重新渲染items后的点击事件
            newItemsComponent1.el.click();
            setTimeout(() => {
                expect(newItemsComponent1.data.get('selected')).to.equal(true);
                done();
            });
        }, 0);
    });
});
