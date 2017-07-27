/**
 * @file Grid/Row
 * @author sparklewhy@gmail.com
 */

import {Component, DataTypes} from 'san';
import {create} from '../common/util/cx';

const cx = create('row');

export default class Row extends Component {
    static template = `
        <div class="{{styleClass}}" style="{{rowStyle}}">
            <slot></slot>
        </div>
    `;

    static computed = {
        styleClass() {
            let result = [cx(this).build()];

            let type = this.data.get('type');
            if (type === 'flex') {
                result.push(cx.getPartClassName(type));

                let align = this.data.get('align');
                if (align) {
                    result.push(cx.getPartClassName(`${type}-${align}`));
                }

                let justify = this.data.get('justify');
                if (justify) {
                    result.push(cx.getPartClassName(`${type}-${justify}`));
                }
            }

            if (this.data.get('gutter')) {
                result.push(cx.getPartClassName('gutter'));
            }

            return result.join(' ');
        },

        rowStyle() {
            let gutter = +this.data.get('gutter');
            if (gutter) {
                gutter = gutter / -2;
                return {
                    'margin-left': gutter + 'px',
                    'margin-right': gutter + 'px'
                };
            }

            return {};
        }
    };

    initData() {
        return {
            /**
             * 布局类型，有效值 flex，默认按传统布局方式
             *
             * @type string
             */
            type: 'normal',

            /**
             * flex 布局对齐方式
             * 有效值：'top', 'middle', 'bottom'
             *
             * @property {string} align
             */

            /**
             * flex 布局 justify 值
             * 有效值：'start', 'end', 'center', 'space-around', 'space-between'
             *
             * @property {string} justify
             */

            /**
             * 布局的栅格的间距
             *
             * @type {number}
             */
            gutter: 0
        };
    }

    static dataTypes = {
        type: DataTypes.oneOf(['normal', 'flex']),
        align: DataTypes.oneOf(['top', 'middle', 'bottom']),
        gutter: DataTypes.number,
        justify: DataTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between'])
    };
}
