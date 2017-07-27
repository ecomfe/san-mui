/**
 * @file Grid/Row
 * @author sparklewhy@gmail.com
 */

import {Component, DataTypes} from 'san';
import {create} from '../common/util/cx';

const cx = create('col');
const SUPPORT_PROPS = ['span', 'order', 'offset', 'pull', 'push'];
const SUPPORT_SCREENS = ['xs', 'sm', 'md', 'lg'];

export default class Col extends Component {
    static template = `
        <div class="{{styleClass}}" style="{{colStyle}}">
            <slot></slot>
        </div>
    `;

    static computed = {
        styleClass() {
            let result = [cx(this).build()];

            let data = this.data;
            SUPPORT_PROPS.forEach(key => {
                let value = data.get(key);
                if (value) {
                    result.push(cx.getPartClassName(`${key}-${value}`));
                }
            });

            let numRegex = /^\d{1,2}$/;
            SUPPORT_SCREENS.forEach(screen => {
                let value = data.get(screen);
                if (!value) {
                    return;
                }

                if (numRegex.test(value)) {
                    result.push(
                        cx.getPartClassName(`${screen}-span-${value}`)
                    );
                }
                else {
                    value = JSON.parse(value);
                    for (let i = 0, len = SUPPORT_PROPS.length; i < len; i++) {
                        let key = SUPPORT_PROPS[i];
                        let propValue = value[key];
                        if (propValue) {
                            result.push(
                                cx.getPartClassName(`${screen}-${key}-${propValue}`)
                            );
                        }
                    }
                }
            });

            return result.join(' ');
        }
    };

    getColStyle() {
        let gutter = +this.parent.parent.data.get('gutter');
        if (gutter) {
            gutter = gutter / 2;
            return {
                'padding-left': gutter + 'px',
                'padding-right': gutter + 'px'
            };
        }

        return {};
    }

    initData() {
        return {
            colStyle: {}

            /**
             * 占的栅格的列数
             *
             * @property {number} span
             */

            /**
             * flex 布局，列的显示顺序
             *
             * @property {number} order
             */

            /**
             * 列偏移的栅格列数
             *
             * @property {number} offset
             */

            /**
             * 改变列排序的 push 值
             *
             * @property {number} push
             */

            /**
             * 改变列排序的 pull 值
             *
             * @property {number} pull
             */

            /**
             * 响应式布局，xs 尺寸下列占的栅格列数
             *
             * @property {number|Object} xs
             */

            /**
             * 响应式布局，sm 尺寸下列占的栅格列数
             *
             * @property {number|Object} sm
             */

            /**
             * 响应式布局，md 尺寸下列占的栅格列数
             *
             * @property {number|Object} md
             */

            /**
             * 响应式布局，lg 尺寸下列占的栅格列数
             *
             * @property {number|Object} lg
             */
        };
    }

    static dataTypes = {
        span: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        order: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        offset: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        push: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        pull: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        xs: DataTypes.oneOfType([DataTypes.number, DataTypes.object]),
        sm: DataTypes.oneOfType([DataTypes.number, DataTypes.object]),
        md: DataTypes.oneOfType([DataTypes.number, DataTypes.object]),
        lg: DataTypes.oneOfType([DataTypes.number, DataTypes.object])
    };

    attached() {
        this.data.set('colStyle', this.getColStyle());
    }

}
