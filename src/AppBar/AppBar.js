/**
 * @file AppBar component
 * @author hanbingbing@baidu.com
 */

import san from 'san';
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
            showLeftIcon: 1, // 默认显示左侧菜单
            showRightIcon: 1 // 默认展示右侧icon
        };
    },

    computed: {
        styleClass() {
            return cx(this).build();
        }
    },

    inited() {
        this.formatParam('showLeftIcon', 'showRightIcon');
    },

    formatParam(...paramName) {
        paramName.forEach(param => {
            let num = this.data.get(param);
            this.data.set(param, !!+num);
        });
    }
});
