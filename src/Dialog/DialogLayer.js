/**
 * @file DialogLayer
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {create} from '../common/util/cx';

const cx = create('dialog-layer');

export default san.defineComponent({

    template: `
        <div class="{{computedClassName}}">
            <div
                san-if="useMask"
                class="${cx.getPartClassName('mask')}"
                on-click="onMaskClick" />
            <div class="${cx.getPartClassName('content')}">
                <h3 class="${cx.getPartClassName('title')}" san-if="title">
                    <slot name="title">{{title}}</slot>
                </h3>
                <div class="${cx.getPartClassName('body')}">
                    <slot></slot>
                </div>
                <div class="${cx.getPartClassName('actions')}">
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    `,

    computed: {
        computedClassName() {
            return cx(this).build();
        }
    },

    initData() {
        return {
            open: false
        };
    },

    onMaskClick() {
        this.data.set('open', false);
    }

});
