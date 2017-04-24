/**
 * @file Chip
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 */

import {create} from '../common/util/cx';
import css from '../common/util/css';
import san from 'san';
import Icon from '../Icon';
import '../Icon/Icon.styl';

const cx = create('chip');

export default san.defineComponent({
    components: {
        'san-icon': Icon
    },
    template: `
        <div 
            class="{{computedClassName}}" 
            style="{{wrapperStyle}}"
            on-click="handleClick($event)">
            
            <slot></slot>
            
            <san-icon 
                on-click="handleDelete($event)" 
                san-if=" showDelete && !this.data.get('disabled')" 
                class="${cx.getPartClassName('delete-icon')}" 
                size="20">
                close
            </san-icon>
        </div>
     `,

    initData() {
        return {
            showDelete: false,
            disabled: false
        };
    },
    handleClick(e) {
        this.fire('chipClick', e);
    },
    handleDelete(e) {
        this.fire('delete', e);
    },
    computed: {
        computedClassName() {
            const disabled = this.data.get('disabled');
            return cx(this)
                .addStates({
                    disabled,
                    normal: !disabled
                })
                .build();
        },
        wrapperStyle() {
            const color = this.data.get('color') ? this.data.get('color') : null;
            const backgroundColor = this.data.get('backgroundColor') ? this.data.get('backgroundColor') : null;
            return css({
                color,
                backgroundColor
            });
        }
    }
});

