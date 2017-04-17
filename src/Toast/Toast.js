/**
 * @file Toast
 *@author zhangsiyuan<zhangsiuan@baidu.com>
 */

import san from 'san';
import {create} from '../common/util/cx';
import css from '../common/util/css';

const cx = create('toast');

const POSITION_BASE_MAP = {
    leftTop: {
        left: '24px',
        top: '-24px'
    },
    rightTop: {
        right: '24px',
        top: '-24px'
    },
    leftBottom: {
        left: '24px',
        bottom: '-24px'
    },
    rightBottom: {
        right: '24px',
        bottom: '-24px'
    }
};

const POSITION_TRANSLATE_MAP = {
    leftTop: 1,
    rightTop: 1,
    leftBottom: -1,
    rightBottom: -1
};

export default san.defineComponent({

    template: `
        <div 
            class="{{computedClassName}}"
            style="{{wrapperStyle}}">
            
            <span
                class="${cx.getPartClassName('content')}"
                style="{{contentStyle}}">
                {{message}}
            </span>
        </div>
    `,

    initData() {
        return {
            open: false,
            position: 'rightBottom'
        };
    },

    computed: {
        computedClassName() {
            let open = this.data.get('open');
            let position = this.data.get('position');
            return cx(this)
                .addStates({
                    open,
                    hidden: !open
                })
                .addVariants(position)
                .build();
        },
        wrapperStyle(){
            let open = this.data.get('open');
            let position = this.data.get('position');
            let visibility = open ? 'visible' : 'hidden';
            let transform = open ? `translate(0, ${POSITION_TRANSLATE_MAP[position] * 48}px)` : '';
            let opacity = open ? 1 : 0;

            let style = css({
                ...POSITION_BASE_MAP[position],
                transform,
                visibility,
                opacity
            });
            return style;

        },
        contentStyle() {
            let open = this.data.get('open');
            let opacity = open ? 1 : 0;

            return css({
                opacity
            });

        }
    }
});











































