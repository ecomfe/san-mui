/**
 * @file Card component
 * @author hanbingbing@baidu.com
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <div class="sm-card {{themeClass}}">
            <slot></slot>
        </div>
    `,
    initData() {
        let config = {
            themeClass: '' // 主题样式
        };

        return config;
    },
    test() {
    },
    inited() {
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
    }
});
