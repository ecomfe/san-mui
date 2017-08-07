/**
 * @file Drawer
 * @author leon<ludafa@outlook.com>
 */

import san, {DataTypes} from 'san';
import {create} from '../common/util/cx';
import css from '../common/util/css';

const cx = create('drawer');

const POSITION_SIZE_MAP = {
    top: 'height',
    bottom: 'height',
    left: 'width',
    right: 'width'
};

const POSITION_TRANSLATE_MAP = {
    top: [0, 1],
    bottom: [0, -1],
    left: [1, 0],
    right: [-1, 0]
};

const POSITION_BASE_MAP = {
    top: {
        left: 0,
        right: 0
    },
    bottom: {
        left: 0,
        right: 0
    },
    left: {
        top: 0,
        bottom: 0
    },
    right: {
        top: 0,
        bottom: 0
    }
};

export default san.defineComponent({

    template: `
        <div class="{{computedClassName}}" >
            <div
                class="${cx.getPartClassName('content')}"
                style="{{contentStyle}}">
                <slot />
            </div>
            <div
                class="${cx.getPartClassName('mask')}"
                style="{{maskStyle}}"
                san-if="{{useMask}}"
                on-click="close"/>
        </div>
    `,

    initData() {
        return {
            open: false,
            size: 300,
            useMask: true,
            position: 'left'
        };
    },

    dataTypes: {
        open: DataTypes.bool,
        size: DataTypes.number,
        useMask: DataTypes.bool,
        position: DataTypes.oneOf(['left', 'right', 'top', 'bottom'])
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
        contentStyle() {

            let open = this.data.get('open');
            let size = this.data.get('size');
            let position = this.data.get('position');

            let transform = open
                ? `translate(${POSITION_TRANSLATE_MAP[position].map(i => `${i * size}px`).join(',')})`
                : '';

            let style = css({
                ...POSITION_BASE_MAP[position],
                [POSITION_SIZE_MAP[position]]: `${size}px`,
                [position]: `${-size}px`,
                transform
            });

            return style;

        },
        maskStyle() {
            let open = this.data.get('open');
            let style = css({
                opacity: open ? 1 : 0,
                visibility: open ? 'visible' : 'hidden'
            });
            return style;
        }
    },

    close() {
        this.data.set('open', false);
    }

});
