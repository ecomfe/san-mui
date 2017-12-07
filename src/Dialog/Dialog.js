/**
 * @file Dialog component
 * @author zhouqinghuai@baidu.com
 */

import {create} from '../common/util/cx';
import Layer from '../Layer/Layer';
import Mask from '../Mask';
import {DataTypes} from 'san';

const cx = create('dialog');

export default class Dialog extends Layer {

    static template = `
        <div class="{{computedClassName}}" style="{{mainStyle}}">
            <div class="${cx.getPartClassName('content')}" style="{{contentStyle}}">
                <div class="${cx.getPartClassName('scroller')}" style="{{scrollerStyle}}">
                    <h3 class="${cx.getPartClassName('title')}">
                        <slot name="title">{{title}}</slot>
                    </h3>
                    <div class="${cx.getPartClassName('body')}">
                        <slot></slot>
                    </div>
                </div>
                <div class="${cx.getPartClassName('actions')}">
                    <slot name="actions"></slot>
                </div>
            </div>
            <sm-mask
                s-if="useMask"
                on-close="onMaskClick"
                open={{open}}
                z-index="{{-1}}" />
        </div>
    `;

    static components = {
        'sm-mask': Mask
    };

    static computed = {
        mainStyle() {
            return this.data.get('open') ? null : {display: 'none'};
        },
        contentStyle() {
            return {
                width: `${this.data.get('width')}px`
            };
        },
        computedClassName() {
            return cx(this).build();
        },
        scrollerStyle() {
            let maxHeight = this.data.get('maxHeight');
            return maxHeight == null
                ? null
                : {
                    'max-height': maxHeight,
                    'overflow': 'auto'
                };
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

    static dataTypes = {
        open: DataTypes.bool,
        useMask: DataTypes.bool,
        closeOnClickMask: DataTypes.bool,
        width: DataTypes.number
    };

    lockBodyScroll(locked) {
        let bodyClass = document.body.className;
        if (locked) {
            if (!bodyClass.match(/\bsm-lockoverflow\b/)) {
                document.body.className = bodyClass + ' sm-lockoverflow';
            }
        }
        else {
            document.body.className = bodyClass.replace(/(?:\s|\b)sm-lockoverflow\b/, '');
        }
    }

    attached() {
        super.attached();
        this.watch('open', open => {
            this.lockBodyScroll(open);
        });
        this.lockBodyScroll(this.data.get('open'));
    }

    detached() {
        super.detached();
        this.lockBodyScroll(false);
    }

    onMaskClick() {
        if (this.data.get('closeOnClickMask')) {
            this.data.set('open', false);
        }
        this.fire('clickMask');
    }

}
