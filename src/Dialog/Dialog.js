/**
 * @file Dialog component
 * @author zhouqinghuai@baidu.com
 */

import san from 'san';
import {create} from '../common/util/cx';
import Layer from '../Layer/Layer';

const cx = create('dialog');

export default class Dialog extends Layer {
    static template = `
        <div class="{{computedClassName}}" style="display: {{open ? 'block' : 'none'}}">
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
    `;

    initData() {
        return {
            title: 'this is a title!',
            open: false,
            computedClassName: cx(this).build()
        };
    }

    attached() {
        super.attached();

        this.watch('open', value => {
            console.log(value)
        })
    }
}
