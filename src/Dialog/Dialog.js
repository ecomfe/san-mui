/**
 * @file Dialog component
 * @author zhouqinghuai@baidu.com
 */

import {create} from '../common/util/cx';
import Layer from '../Layer/Layer';
import * as Mask from '../Mask';
import css from '../common/util/css';

const cx = create('dialog');

export default class Dialog extends Layer {

    static template = `
        <div
            class="{{computedClassName}}"
            style="{{style}}">
            <h3 class="${cx.getPartClassName('title')}">
                <slot name="title">{{title}}</slot>
            </h3>
            <div class="${cx.getPartClassName('body')}">
                <slot></slot>
            </div>
            <div class="${cx.getPartClassName('actions')}">
                <slot name="actions"></slot>
            </div>
        </div>
    `;

    static computed = {
        style() {
            return css({
                display: this.data.get('open') ? 'block' : 'none',
                width: `${this.data.get('width')}px`
            });
        },

        computedClassName() {
            return cx(this).build();
        }

    };

    initData() {
        return {
            open: false,
            useMask: true,
            closeOnClickMask: true,
            width: 760
        };
    }

    attached() {
        super.attached();
        let onMaskClick = this.onMaskClick = this.onMaskClick.bind(this);
        this.watch('open', open => {
            if (this.data.get('useMask')) {
                open ? Mask.show(onMaskClick) : Mask.hide();
            }
        });
    }

    onMaskClick() {
        if (this.data.get('closeOnClickMask')) {
            this.data.set('open', false);
        }
    }

    detached() {
        this.data.set('open', false);
    }


}
