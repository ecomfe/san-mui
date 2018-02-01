/**
 * @file list test case
 * @author qiusiqi
 */

import {expect} from 'chai';
import san from 'san';
import {List, ListItem} from 'src/List';
import 'src/List/index.styl'
import Icon from 'src/Icon';
import 'src/Icon/Icon.styl'

describe('List', () => {
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
                    'ui-list': List,
                    'ui-list-item': ListItem,
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

    it('list - disabled item', done => {
        let component = createComponent({
            template: `<div>
                            <ui-list>
                                <ui-list-item san-ref="item1" primaryText="item" disabled="{{disabled}}" on-click="onclick"/>
                            </ui-list>
                        </div>`,
            initData() {
                return {
                    disabled: true
                };
            },
            onclick() {
                expect(component.ref('item1').data.get('disabled')).to.equal(false);
                component.dispose();
                done();
            }
        });

        let itemComponent = component.ref('item1');
        expect(itemComponent.el.innerText.trim()).to.equal('item');
        itemComponent.el.click(); // disabled, expect nothing happen
        component.nextTick(() => {
            itemComponent.data.set('disabled', false);
            component.nextTick(() => {
                itemComponent.el.click();
            });
        });
    });

    it('list initiallyOpen', () => {
        let component = createComponent({
            template: `<div>
                            <ui-list>
                                <ui-list-item san-ref="item1" primaryText="item" initiallyOpen="{{!0}}" />
                            </ui-list>
                        </div>`,
            initData() {
                return {
                };
            }
        });
        let itemComponent = component.ref('item1');
        expect(itemComponent.el.innerText.trim()).to.equal('item');
        expect(itemComponent.data.get('open')).to.equal(true);
        component.dispose();
    });

    it('list item with comps', () => {
        let component = createComponent({
            template: `<div>
                            <ui-list>
                                <ui-list-item san-ref="item1" primaryText="item">
                                    <ui-icon slot="left">star</ui-icon>
                                </ui-list-item>
                            </ui-list>
                        </div>`,
            initData() {
                return {
                };
            }
        });
        let itemComponent = component.ref('item1');
        expect(itemComponent.data.get('hasLeft')).to.equal(true);
        expect(itemComponent.el.querySelector('.sm-icon')).to.be.not.null;
        expect(itemComponent.el.querySelector('.sm-icon').innerText.trim())
            .to.equal('star');
        component.dispose();
    });

    it('list item nested', done => {
        let component = createComponent({
            template: `<div>
                            <ui-list>
                                <ui-list-item  san-ref="item1" primaryText="item"
                                    toggleNested="{{!0}}"
                                    primaryTogglesNestedList="{{primaryTogglesNestedList}}"
                                    on-nestedListToggle="nestedListToggle($event)">
                                    <ui-list-item slot="nested" primaryText="nested item" />
                                </ui-list-item>
                            </ui-list>
                        </div>`,
            initData() {
                return {
                    primaryTogglesNestedList: false
                };
            },
            nestedListToggle(value) {
                expect(itemComponent.data.get('open')).to.equal(value);
            }
        });
        let itemComponent = component.ref('item1');
        expect(itemComponent.data.get('toggleNested')).to.equal(true);
        expect(itemComponent.data.get('open')).to.not.equal(true);
        // disabled toggle list
        itemComponent.el.querySelector('.sm-list-item-content').click();
        component.nextTick(() => {
            expect(itemComponent.data.get('toggleNested')).to.equal(true);
            expect(itemComponent.data.get('open')).to.not.equal(true);

            // enable toggle list && test toggle
            itemComponent.data.set('primaryTogglesNestedList', true);
            itemComponent.el.querySelector('.sm-list-item-content').click();
            component.nextTick(() => {
                expect(itemComponent.data.get('open')).to.equal(true);
                itemComponent.el.querySelector('.sm-list-item-content').click();
                component.nextTick(() => {
                    expect(itemComponent.data.get('open')).to.equal(false);
                    component.dispose();
                    done();
                });
            })
        });
    });

    it('selectable list', done => {
        let component = createComponent({
            template: `<div>
                            <ui-list value="{{ value }}" selectable="{{!0}}" on-change="listItemSelect($event)">
                                <ui-list-item san-ref="item1" primaryText="item 1" value="{{1}}"></ui-list-item>
                                <ui-list-item san-ref="item2" primaryText="item 2" value="{{2}}"></ui-list-item>
                            </ui-list>
                        </div>`,
            initData() {
                return {
                    value: 2
                };
            },
            listItemSelect(value) {
                expect(value).to.equal(1);
                component.nextTick(() => {
                    expect(itemComponent1.el.className).to.contain('selected');
                    component.dispose();
                    done();
                });
            }
        });
        let itemComponent1 = component.ref('item1');
        let itemComponent2 = component.ref('item2');
        expect(component.children[0].data.get('selectable')).to.equal(true);
        expect(itemComponent2.el.className).to.contain('selected');
        itemComponent1.el.click();
    });
});
