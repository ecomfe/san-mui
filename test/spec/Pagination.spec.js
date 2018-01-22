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

    it('should automatically update totalPage when pageSize change', done => {
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
        paginationComponent.data.set('pageSize', 25);
        component.nextTick(() => {
            expect(paginationComponent.data.get('totalPage')).to.equal(2);
            component.dispose();
            done();
        });
    });

    it('should turn to next page when click next page button', done => {
        let component = createComponent({
            template: '<div><sm-pagination total="{{total}}"></sm-pagination></div>',
            initData() {
                return {
                    total: 50
                };
            }
        });
        let paginationComponent = component.children[0];
        paginationComponent.el.getElementsByClassName('next-page')[0].click();
        component.nextTick(() => {
            expect(paginationComponent.data.get('current')).to.equal(2);
            component.dispose();
            done();
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
        paginationComponent.el.getElementsByClassName('pre-page')[0].click();
        component.nextTick(() => {
            expect(paginationComponent.data.get('current')).to.equal(1);
            component.dispose();
            done();
        });
    });

});
