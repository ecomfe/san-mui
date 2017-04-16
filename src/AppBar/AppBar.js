/**
 * @file AppBar component
 * @author hanbingbing@baidu.com
 */

import san from 'san';
import './AppBar.styl';

export default san.defineComponent({
    template: `
        <div class="sm-appbar {{themeClass}}">
            <div class="sm-appbar-left" san-if="showLeftIcon">
                <slot name="left"></slot>
            </div>
            <div class="sm-appbar-title">
                <span>{{title}}</span>
            </div>
            <div class="sm-appbar-right" san-if="showRightIcon">
                <slot name="right"></slot>
            </div>
        </div>
    `,
    initData() {
        let config = {
            title: 'default', // 标题
            themeClass: '', // 主题样式
            showLeftIcon: 1, // 默认显示左侧菜单
            showRightIcon: 1, // 默认展示右侧icon
            leftIconClass: '', // 左侧icon样式
            rightIconClass: '' // 右侧icon样式
        };

        return config;
    },
    inited() {
        [
            'showLeftIcon',
            'showRightIcon'
        ].forEach((item) => this.convertStrParamToNum(item));
    },
    compiled() {
    },
    created() {
    },
    attached() {
    },
    detached() {
    },
    disposed() {
    },
    convertStrParamToNum(param) {
        let num = this.data.get(param);
        num && this.data.set(param, !!+num);
    }
});
