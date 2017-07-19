/**
 * @file Badage
 * @author malingyang(malingyang@baidu.com)
 */

import {create} from '../common/util/cx';
import css from '../common/util/css';
import san from 'san';
import Icon from '../Icon';
import {IconButton, Button} from '../Button';

const cx = create('badage');

export default san.defineComponent({
    components: {},

    template: `
        <div class="{{computedClass}}">
            <em san-if="content" class="${cx.getPartClassName('inform-default')}" style="{{computedStyleDefault}}">
                {{computedContent}}
            </em>
            <div class="${cx.getPartClassName('inform')}" style="{{computedStyleIcon}}">
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
            max: undefined,
            color: ''
        };
    },

    computed: {
        computedClass() {
            return cx(this).build();
        },
        computedContent() {
            let max = this.data.get('max');
            let content = this.data.get('content');
            if (isNaN(max) || isNaN(content)) {
                return content;
            }
            if (content > max) {
                return max + '+';
            } else {
                return content;
            }
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
                'color': color,
                'display': ifShow
            };
        }
    }

});