/**
 * @file Card component
 * @author hanbingbing@baidu.com
 */

import san from 'san';
import {create} from '../common/util/cx';

const cx = create('card');

export default san.defineComponent({
    template: `
        <div class="${cx.getPartClassName('title-wrap')}">
            <div class="${cx.getPartClassName('title')} {{titleClass}}">
                {{title}}
            </div>
            <div class="${cx.getPartClassName('sub-title')} {{subTitleClass}}" san-if="subTitle">
                {{subTitle}}
            </div>
        </div>
    `,

    initData() {
        return {
            title: '', // 标题
            subTitle: '', // 副标题
            titleClass: '', // 标题样式
            subTitleClass: '' // 副标题样式
        };
    }
});
