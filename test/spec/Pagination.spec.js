/**
 * @file Pagination test case
 * @author zhangzhiqiang(zhiqiangzhang37@gmail.com)
 */

import {expect} from 'chai';
import san from 'san';
import Pagination from 'src/Pagination';
import 'src/Pagination/index.styl';

describe('Pagination', () => {
    // prepare for testing
    const viewport = document.createElement('div');
    viewport.id = 'test';

    before(() => {
        document.body.appendChild(viewport);
    });

    after(() => {
        viewport.remove();
    });

    // testing component
    const createComponent = function (options) {
        const Component = san.defineComponent(
            Object.assign({
                components: {
                    'sm-pagination': Pagination
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

    it('pagination element', () => {
        const component = new Pagination({
            data: {
                total: 30
            }
        });
        component.attach(viewport);
        expect(component.el.tagName).to.equal('DIV');
        expect(component.el.className).to.equal('sm-pagination');
        expect(component.data.get('pageSize')).to.equal(10);
        expect(component.data.get('current')).to.equal(1);
        expect(component.data.get('showSizeChanger')).to.equal(true);
        expect(component.data.get('pageGroupLen')).to.equal(5);
        component.dispose();
    });

    it('should use default value when pageSize and current value invalid when inited.', () => {
        let component = createComponent({
            template: `
                <div>
                    <sm-pagination current="{{current}}"
                    s-ref="pager"
                    pageSize="{{pageSize}}"
                    pageSizeOptions="{{pageSizeOptions}}"
                    total="{{total}}"></sm-pagination>
                </div>
            `,
            initData() {
                return {
                    current: 100,
                    pageSizeOptions: [2, 4],
                    pageSize: 66,
                    total: 50
                };
            }
        });
        let paginationComponent = component.ref('pager');
        expect(paginationComponent.data.get('pageSize')).to.equal(2);
        expect(paginationComponent.data.get('current')).to.equal(1);
        expect(paginationComponent.el.querySelector('.page-num.current').textContent).to.equal('1');
        expect(paginationComponent.el.querySelector('.dropdown-selector').textContent).to.equal('2 / 页');
        component.dispose();
    });

    it('should automatically update totalPage and current when pageSize change', done => {
        let component = createComponent({
            template: '<div><sm-pagination total="{{total}}"></sm-pagination></div>',
            initData() {
                return {
                    total: 50
                };
            }
        });
        let paginationComponent = component.children[0];
        expect(paginationComponent.data.get('totalPage')).to.equal(5);
        expect(paginationComponent.data.get('current')).to.equal(1);
        let nextGroupButton = paginationComponent.el.querySelector('.page-selector .next-group');
        let selector = paginationComponent.el.querySelector('.page-size-selector');
        nextGroupButton.click();
        component.nextTick(() => {
            expect(paginationComponent.el.querySelector('.page-num.current').textContent).to.equal('5');
            expect(paginationComponent.data.get('current')).to.equal(5);
            selector.querySelector('.dropdown-selector').click();
            component.nextTick(() => {
                expect(selector.className).to.include('open');
                selector.querySelectorAll('.page-size-item')[2].click();
                component.nextTick(() => {
                    expect(paginationComponent.data.get('pageSize')).to.equal(20);
                    expect(paginationComponent.data.get('totalPage')).to.equal(3);
                    expect(paginationComponent.data.get('current')).to.equal(3);
                    component.dispose();
                    done();
                });
            });
        });
    });

    it('should turn to next page when click next page button', done => {
        let component = createComponent({
            template: '<div><sm-pagination total="{{total}}"></sm-pagination></div>',
            initData() {
                return {
                    total: 20
                };
            }
        });
        let paginationComponent = component.children[0];
        let nextButton = paginationComponent.el.querySelector('.next-page');
        nextButton.click();
        component.nextTick(() => {
            expect(paginationComponent.data.get('current')).to.equal(2);
            expect(paginationComponent.el.querySelector('.page-num.current').textContent).to.equal('2');
            expect(nextButton.className).to.include('disable');
            nextButton.click();
            component.nextTick(() => {
                expect(paginationComponent.data.get('current')).to.equal(2);
                expect(paginationComponent.el.querySelector('.page-num.current').textContent).to.equal('2');
                component.dispose();
                done();
            });
        });
    });

    it('should turn to pre page when click pre page button', done => {
        let component = createComponent({
            template: '<div><sm-pagination total="{{total}}" current="{{current}}"></sm-pagination></div>',
            initData() {
                return {
                    total: 50,
                    current: 2
                };
            }
        });
        let paginationComponent = component.children[0];
        expect(paginationComponent.data.get('current')).to.equal(2);
        expect(paginationComponent.el.querySelector('.page-num.current').textContent).to.equal('2');
        let preButton = paginationComponent.el.querySelector('.pre-page');

        preButton.click();
        component.nextTick(() => {
            expect(paginationComponent.data.get('current')).to.equal(1);
            expect(paginationComponent.el.querySelector('.page-num.current').textContent).to.equal('1');
            expect(preButton.className).to.include('disable');
            preButton.click();
            component.nextTick(() => {
                expect(paginationComponent.data.get('current')).to.equal(1);
                expect(paginationComponent.el.querySelector('.page-num.current').textContent).to.equal('1');
                component.dispose();
                done();
            });
        });
    });

});
