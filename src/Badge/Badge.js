/**
 * @file Badage
 * @author malingyang(malingyang@baidu.com)
 */

import {create} from '../common/util/cx';
import san, {DataTypes} from 'san';

const cx = create('badage');

export default san.defineComponent({

    template: `
        <div class="{{computedClass}}">
            <em
                san-if="content"
                class="${cx.getPartClassName('inform-default')}"
                style="{{computedStyleDefault}}">
                {{computedContent}}
            </em>
            <div
                class="${cx.getPartClassName('inform')}"
                style="{{computedStyleIcon}}">
                <slot name="content"></slot>
            </div>
            <div class="${cx.getPartClassName('text-wrapper')}">
                <slot></slot>
            </div>
        </div>
    `,

    initData() {
        return {
            content: '',
            hidden: false,
            color: ''
        };
    },

    dataTypes: {
        content: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        hidden: DataTypes.bool,
        max: DataTypes.number,
        color: DataTypes.string
    },

    computed: {
        computedClass() {
            return cx(this).build();
        },
        computedContent() {
            let max = this.data.get('max');
            let content = this.data.get('content');
            return content != null && max != null && +content > max ? `${max}+` : content;
        },
        computedStyleDefault() {
            let color = this.data.get('color');
            let ifShow = this.data.get('hidden') ? 'none' : 'block';
            return {
                'background-color': color,
                'display': ifShow
            };
        },
        computedStyleIcon() {
            let color = this.data.get('color');
            let ifShow = this.data.get('hidden') ? 'none' : 'block';
            return {
                color: color,
                display: ifShow
            };
        }
    }

});
