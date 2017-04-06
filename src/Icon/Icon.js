/**
 * @file Icon component
 * @author hanbingbing@baidu.com
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <i
            class="material-icons {{iconClass}}"
            style="font-size: {{font}}px;color: {{color}}" >
            {{value}}
        </i>
    `,
    initData() {
        return {
            font: 24,
            color: 'black',
            value: 'menu'
        }
    },
    test() {
        return 'icon';
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
