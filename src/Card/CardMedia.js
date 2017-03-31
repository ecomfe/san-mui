/**
 * @file Card component
 * @author hanbingbing@baidu.com
 */

import san from 'san';
import './Card.styl';

export default san.defineComponent({
    template: `
        <div class="sm-card-media {{themeClass}}">
            <slot name="before"></slot>
            <div class="sm-card-title-block">
                <div class="sm-card-title {{titleClass}}">
                    {{title}}
                </div>
                <div class="sm-card-subtitle {{subTitleClass}}">
                    {{title}}
                </div>
                <slot name="title-after"></slot>
            </div>
            <slot name="after"></slot>
        </div>
    `,
    initData() {
        let config = {
            themeClass: '', // 主题样式
            title: '', // 标题
            subTitle: '', // 副标题
            titleClass: '', // 标题样式
            subTitleClass: '' // 副标题样式
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
