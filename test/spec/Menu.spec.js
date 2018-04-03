/**
 * @file button test case
 * @author mengke01(kekee000@gmail.com)
 */

import {expect} from 'chai';
import san from 'san';
import {Menu, IconMenu, DropDownMenu, MenuItem} from 'src/Menu';
import 'src/Menu/index.styl';
import Icon from 'src/Icon';
import 'src/Icon/Icon.styl';

describe('Menu', () => {
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
        expect(itemComponent2.el.querySelector('.sm-icon')).to.be.not.null;
        expect(itemComponent2.el.querySelector('.sm-icon').innerText.trim()).to.equal('play_arrow');
        expect(component.data.get('arr').length).to.equal(0);

        itemComponent1.el.click();
        component.nextTick(() => {
            expect(component.data.get('arr').length).to.equal(0);
            itemComponent2.el.click();
            component.nextTick(() => {
                expect(component.data.get('arr').length).to.equal(1);
                component.dispose();
                done();
            });
        });
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
        component.nextTick(() => {
            expect(component.data.get('value')).to.deep.equal(['checkbox2', 'checkbox1']);
            expect(itemComponent1.el.querySelector('.sm-icon').innerText.trim()).to.equal('check');
            expect(itemComponent2.el.querySelector('.sm-icon').innerText.trim()).to.equal('check');
            itemComponent1.el.click();
            component.nextTick(() => {
                expect(component.data.get('value')).to.deep.equal(['checkbox2']);
                itemComponent2.el.click();
                component.nextTick(() => {
                    expect(component.data.get('value')).to.be.empty;
                    expect(itemComponent1.el.querySelector('.sm-icon').innerText.trim()).to.equal('');
                    expect(itemComponent2.el.querySelector('.sm-icon').innerText.trim()).to.equal('');
                    component.dispose();
                    done();
                });
            });
        });
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
        expect(itemComponent1.el.querySelector('.sm-icon').innerText.trim()).to.equal('');
        itemComponent1.el.click();
        component.nextTick(() => {
            expect(component.data.get('value')).to.equal('radio1');
            expect(itemComponent1.el.querySelector('.sm-icon').innerText.trim()).to.equal('check');
            expect(itemComponent2.el.querySelector('.sm-icon').innerText.trim()).to.equal('');
            component.dispose();
            done();
        });
    });

    it('component menu cascade', done => {
        let component = createComponent({
            template: `<div>
                            <ui-menu s-ref="menu">
                                <ui-menu-item s-ref="menu1" title="menu item" cascade>
                                    <ui-menu slot="submenu">
                                        <ui-menu-item s-ref="menu2" title="submenu item1" cascade>
                                            <ui-menu slot="submenu">
                                                <ui-menu-item s-ref="sub-sub-menu"  title="subsubmenu item" />
                                            </ui-menu>
                                        </ui-menu-item>
                                        <ui-menu-item title="submenu item2" cascade>
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

        let menu1 = component.ref('menu1');
        let menu2 = component.ref('menu2');

        menu1.el.click();
        setTimeout(() => {
            expect(menu1.data.get('subMenuOpen')).to.equal(true);
            expect(menu1.ref('popover').el.className).to.include('state-open');
            menu2.el.click();
            setTimeout(() => {
                expect(menu2.data.get('subMenuOpen')).to.equal(true);
                expect(menu2.ref('popover').el.className).to.include('state-open');
                // 测试能否级联关闭 父Menu
                component.ref('sub-sub-menu').el.click();
                component.nextTick(() => {
                    expect(menu1.data.get('subMenuOpen')).to.equal(false);
                    expect(menu1.ref('popover').el.className).to.not.include('state-open');
                    // 测试能否级联关闭 subMenu，这里适当地做了简化
                    menu1.el.click();
                    menu2.el.click();
                    menu1.el.click();
                    component.nextTick(() => {
                        expect(menu1.data.get('subMenuOpen')).to.equal(false);
                        expect(menu1.ref('popover').el.className).to.not.include('state-open');
                        expect(menu2.ref('popover').el.className).to.not.include('state-open');
                        component.dispose();
                        done();
                    });
                });
            }, 600);
        }, 900);
    });

    it('icon menu', done => {
        let component = createComponent({
            template:
                `<div>
                    <ui-icon-menu s-ref="icon-menu" icon="more_vert">
                        <ui-menu-item san-ref="sub-menu1" title="刷新" />
                        <ui-menu-item title="推出" />
                    </ui-icon-menu>
                </div>`
        });
        let iconMenu = component.ref('icon-menu');
        expect(iconMenu.data.get('open')).to.equal(false);
        iconMenu.el.querySelector('.sm-icon').click();
        component.nextTick(() => {
            expect(iconMenu.data.get('open')).to.equal(true);
            component.ref('sub-menu1').el.click();
            component.nextTick(() => {
                expect(iconMenu.data.get('open')).to.equal(false);
                expect(document.querySelector('.sm-popover').className).to.not.include('state-open');
                component.dispose();
                done();
            });
        });
    });

    it('dropdown menu', done => {
        let component = createComponent({
            template: `<div>
                            <ui-dropdown-menu
                                s-ref="menu"
                                value="{=value=}"
                                maxHeight="{{40}}"
                                on-click="handleClick($event)"
                                on-change="change($event)">
                                <ui-menu-item s-ref="menu-item-1" value="1" title="星期一"/>
                                <ui-menu-item s-ref="menu-item-2" value="2" title="星期二"/>
                                <ui-menu-item s-ref="menu-item-3" on-click="handleClick($event)" value="3" title="星期三"/>
                            </ui-dropdown-menu>
                        </div>`,
            initData() {
                return {
                    value: '1',
                    clickCounter: 1
                };
            },
            change(value) {
                this.data.set('value', value);
                expect(component.ref(`menu-item-${value}`).data.get('selected')).to.equal(true);
            },
            handleClick(event) {}
        });
        let menu = component.ref('menu');
        let itemComponent1 = component.ref('menu-item-1');
        let itemComponent3 = component.ref('menu-item-3');
        expect(itemComponent1.data.get('selected')).to.equal(true);
        menu.el.click();
        // 这里连续使用两个setTimeout，而不是nextTick，是为了等待menu弹入/弹出的动画结束，覆盖到对应on-transitionend的代码。
        setTimeout(() => {
            expect(menu.data.get('open')).to.equal(true);
            expect(menu.ref('popover').el.className).to.include('state-open');
            expect(itemComponent1.el.className).to.include('state-selected');
            itemComponent3.el.click();
            setTimeout(() => {
                expect(menu.data.get('open')).to.equal(false);
                expect(menu.ref('popover').el.className).to.not.include('state-open');
                expect(itemComponent3.el.className).to.include('state-selected');
                expect(itemComponent3.el.parentNode.scrollTop).to.equal(0);
                menu.el.click();
                component.nextTick(() => {
                    expect(menu.data.get('open')).to.equal(true);
                    expect(menu.ref('popover').el.className).to.include('state-open');
                    expect(itemComponent3.el.parentNode.scrollTop).to.equal(itemComponent3.el.offsetTop);
                    component.dispose();
                    done();
                });
            }, 550);
        }, 550);
    });

    it('dropdown menu disabled & readOnly', done => {
        let component = createComponent({
            template: `<div>
                            <ui-dropdown-menu
                                value="{=value=}"
                                s-ref="menu"
                                readOnly="{{readOnly}}"
                                disabled="{{disabled}}">
                                <ui-menu-item s-ref="menu-item-1" value="1" title="星期一"/>
                                <ui-menu-item s-ref="menu-item-2" value="2" title="星期二"/>
                            </ui-dropdown-menu>
                        </div>`,
            initData() {
                return {
                    value: '1',
                    readOnly: true,
                    disabled: false
                };
            }
        });
        let menu = component.ref('menu');
        let itemComponent1 = component.ref('menu-item-1');
        expect(itemComponent1.data.get('selected')).to.equal(true);
        expect(menu.el.className).to.include('state-readOnly');
        expect(menu.el.querySelector('input').readOnly).to.equal(true);
        menu.el.click();
        component.nextTick(() => {
            expect(menu.data.get('open')).to.equal(false);
            expect(menu.ref('popover').el.className).to.not.include('state-open');
            component.data.set('readOnly', false);
            component.data.set('disabled', true);
            component.nextTick(() => {
                expect(menu.data.get('open')).to.equal(false);
                expect(menu.ref('popover').el.className).to.not.include('state-open');
                expect(menu.el.className).to.include('state-disabled');
                component.data.set('disabled', false);
                component.dispose();
                done();
            });
        });
    });

    it('dropdown menu dynamic items', done => {
        let component = createComponent({
            template: `<div>
                            <ui-dropdown-menu  value="{=value=}" on-change="change($event)">
                                <ui-menu-item s-ref="item-{{index}}" san-for="item, index in items" value="{{item.value}}" title="{{item.title}}"/>
                            </ui-dropdown-menu>
                        </div>`,
            initData() {
                return {
                    value: '1',
                    items: [
                        {
                            value: '0',
                            title: '星期一'
                        },
                        {
                            value: '1',
                            title: '星期二'
                        },
                        {
                            value: '2',
                            title: '星期三'
                        }
                    ]
                };
            },
            change(value) {
                this.data.set('value', value);
                expect(component.ref(`item-${value}`).data.get('selected')).to.equal(true);
            }
        });
        // 测试items循环赋值
        let itemComponent1 = component.ref('item-1');
        let itemComponent2 = component.ref('item-2');
        let itemComponent3 = component.ref('item-3');
        expect(itemComponent1.data.get('selected')).to.equal(true);
        itemComponent2.el.click();
        component.nextTick(() => {
            expect(itemComponent2.data.get('selected')).to.equal(true);
            done();
        });

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
        component.nextTick(() => {
            // 重新渲染后，比较重新渲染的组件个数与items新变量长度是否一致
            let newItemsComponents = component.children[0].slotChildren[0].children[0].children;
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
            component.nextTick(() => {
                expect(newItemsComponent1.data.get('selected')).to.equal(true);
                component.dispose();
                done();
            });
        });
    });
});
