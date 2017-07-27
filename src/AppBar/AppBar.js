/**
 * @file AppBar component
 * @author hanbingbing@baidu.com
 */

import san, {DataTypes} from 'san';
import {create} from '../common/util/cx';

const cx = create('appbar');

export default san.defineComponent({
    template: `
        <div class="{{styleClass}} sm-paper-{{zDepth}}">
            <div class="${cx.getPartClassName('left')}" san-if="showLeftIcon">
                <slot name="left"></slot>
            </div>
            <div class="${cx.getPartClassName('title')}">
                <span>{{title}}</span>
            </div>
            <div class="${cx.getPartClassName('right')}" san-if="showRightIcon">
                <slot name="right"></slot>
            </div>
        </div>
    `,

    initData() {
        return {
            title: 'default', // 标题
            zDepth: 1, // 阴影深度，不显示阴影设为 0
            showLeftIcon: true, // 默认显示左侧菜单
            showRightIcon: true // 默认展示右侧icon
        };
    },

    dataTypes: {
        title: DataTypes.string,
        zDepth: DataTypes.number,
        showLeftIcon: DataTypes.bool,
        showRightIcon: DataTypes.bool
    },

    computed: {
        styleClass() {
            return cx(this).build();
        }
    }

});
