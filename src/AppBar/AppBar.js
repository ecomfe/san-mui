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
        let styleClass = cx(this).build();

        return {
            title: 'default', // 标题
            styleClass,
            zDepth: 1, // 阴影深度，不显示阴影设为 0
            showLeftIcon: 1, // 默认显示左侧菜单
            showRightIcon: 1 // 默认展示右侧icon
        };
    },

    inited() {
        this.formatParam('showLeftIcon', 'showRightIcon');
    },

    formatParam(...paramName) {
        paramName.forEach(param => {
            let num = this.data.get(param);
            num && this.data.set(param, !!+num);
        });
    }
});
