/**
 * @file Card component
 * @author hanbingbing@baidu.com
 */

import san from 'san';
import './Card.styl';

export default san.defineComponent({
    template: `
        <div class="sm-card-title-wrap {{themeClass}}">
            <div class="sm-card-title {{titleClass}}">
                {{title}}
            </div>
            <div class="sm-card-subtitle {{subTitleClass}}">
                {{subTitle}}
            </div>
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
