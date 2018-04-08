/**
 * @file Checkbox test case
 * @author asd123freedom@gmail.com
 */

import {expect} from 'chai';
import san from 'san';
import {Table, THead, TFoot, TBody, TR, TD, TH} from 'src/Table';
import 'src/Table/Table.styl';

describe('Table', () => {
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
                    'sm-table': Table,
                    'sm-tr': TR,
                    'sm-th': TH,
                    'sm-td': TD,
                    'sm-tbody': TBody,
                    'sm-thead': THead,
                    'sm-tfoot': TFoot
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

    it('selectable multiple table', done => {
        let component = createComponent({
            template: `<div>
                <sm-table s-ref="table" selectable="multi" data="{{persons}}">
                    <sm-thead slot="header">
                        <sm-tr s-ref="th">
                            <sm-th tooltip="名称">Name</sm-th>
                            <sm-th tooltip="城市">City</sm-th>
                            <sm-th tooltip="生日">Birthday</sm-th>
                        </sm-tr>
                    </sm-thead>
                    <sm-tbody>
                        <sm-tr s-ref="tr{{index}}" selected="{=item.selected=}" san-for="item, index in persons">
                            <sm-td>{{item.name}}</sm-td>
                            <sm-td>{{item.city}}</sm-td>
                            <sm-td>{{item.birthday}}</sm-td>
                        </sm-tr>
                    </sm-tbody>
                </sm-table>
            </div>`,

            initData() {
                return {
                    persons: [
                        {
                            name: 'erik',
                            birthday: '1984-01-01',
                            city: 'BeiJing',
                            selected: true
                        },
                        {
                            name: 'otakustay',
                            birthday: '1986-04-04',
                            city: 'ShangHai',
                            selected: true
                        },
                        {
                            name: 'firede',
                            birthday: '1987-02-02',
                            city: 'BeiJing',
                            selected: false
                        },
                        {
                            name: 'leon',
                            birthday: '1989-03-03',
                            city: 'ShenZhen',
                            selected: true
                        }
                    ]
                };
            }
        });
        component.nextTick(() => {
            expect(component.ref('tr0').ref('checkbox').el.querySelector('input').checked).to.equal(true);
            expect(component.ref('th').ref('checkbox').el.querySelector('input').indeterminate).to.equal(true);
            done();
        });
    });

    it('selectable table change data', done => {
        let component = createComponent({
            template: `<div>
                <sm-table s-ref="table" selectable="multi" data="{{persons}}">
                    <sm-thead slot="header">
                        <sm-tr s-ref="th">
                            <sm-th tooltip="名称">Name</sm-th>
                            <sm-th tooltip="城市">City</sm-th>
                            <sm-th tooltip="生日">Birthday</sm-th>
                        </sm-tr>
                    </sm-thead>
                    <sm-tbody>
                        <sm-tr s-ref="tr{{index}}"
                            disabled="{{item.disabled}}"
                            item="{{item}}"
                            selected="{=item.selected=}" san-for="item, index in persons">
                            <sm-td>{{item.name}}</sm-td>
                            <sm-td>{{item.city}}</sm-td>
                            <sm-td>{{item.birthday}}</sm-td>
                        </sm-tr>
                    </sm-tbody>
                </sm-table>
            </div>`,

            initData() {
                return {
                    persons: [
                        {
                            name: 'erik',
                            birthday: '1984-01-01',
                            city: 'BeiJing',
                            selected: true
                        },
                        {
                            name: 'otakustay',
                            birthday: '1986-04-04',
                            city: 'ShangHai',
                            selected: true
                        },
                        {
                            name: 'firede',
                            birthday: '1987-02-02',
                            city: 'BeiJing',
                            selected: true
                        },
                        {
                            name: 'leon',
                            birthday: '1989-03-03',
                            city: 'ShenZhen',
                            selected: true
                        }
                    ],
                    staff: [
                        {
                            name: 'figo',
                            birthday: '1984-01-01',
                            city: 'BeiJing',
                            selected: false
                        },
                        {
                            name: 'zadine',
                            birthday: '1986-04-04',
                            city: 'ShangHai',
                            selected: false
                        }
                    ]
                };
            }
        });
        component.nextTick(() => {
            expect(component.ref('th').ref('checkbox').el.querySelector('input').checked).to.equal(true);
            let staff = component.data.get('staff');
            component.data.set('persons', staff);
            setTimeout(() => {
                expect(component.ref('th').ref('checkbox').el.querySelector('input').checked).to.equal(false);
                done();
            });
        });
    });
});
