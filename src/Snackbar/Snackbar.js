/**
 * @file Snackbar
 *@author zhangsiyuan<zhangsiuan@baidu.com>
 */

import san from 'san';
import {create} from '../common/util/cx';
import css from '../common/util/css';
import Button from '../Button';

const cx = create('snackbar');

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
            <san-button variants="primary" on-click="handleActionClick($event)">
                {{action}}
            </san-button>
            
        </div>
    `,

    components: {
        'san-button': Button
    },
    initData() {
        return {
            open: false,
            position: 'rightBottom',
            action: '确定'
        };
    },

    handleActionClick(e) {
        this.fire('actionClick', e);
        this.data.set('open', false);
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











































