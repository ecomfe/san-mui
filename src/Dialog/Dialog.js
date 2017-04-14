/**
 * @file Dialog component
 * @author zhouqinghuai@baidu.com
 */

import {create} from '../common/util/cx';
import Layer from '../Layer/Layer';
import * as Mask from '../Mask';

const cx = create('dialog');

export default class Dialog extends Layer {

    static template = `
        <div class="{{computedClassName}}" style="display: {{open ? 'block' : 'none'}}">
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

    initData() {
        return {
            open: false,
            computedClassName: cx(this).build(),
            useMask: true
        };
    }

    attached() {
        super.attached();
        this.watch('open', open => {
            console.log(open);
            if (this.data.get('useMask')) {
                open ? Mask.show() : Mask.hide();
            }
        });
    }


}
