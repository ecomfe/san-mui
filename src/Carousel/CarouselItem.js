/**
 * @file san-mui/Carousel
 * @author solvan <sunwei11@baidu.com>
 */

import san from 'san';
import {create} from '../common/util/cx';

const cx = create('carousel-item');

export default class CarouselItem extends san.Component {

    static template = `

        <div
            class="{{computedClassName}} {{active ? 'is-active' : '' }}"
            style="transform: translateX({{translate}}px);
            -webkit-transform: translateX({{translate}}px);"
            san-if="ready">
            <slot></slot>
            <div class="${cx.getPartClassName('text-mask')}">
                <slot name="mask"></slot>
            </div>
        </div>

    `;
    static computed = {
        computedClassName() {
            return cx(this).build();
        }
    };

    initData() {
        return {
            translate: 0,
            active: false,
            ready: false
        };
    }
    attached() {
        this.dispatch('UI:carousel-item-attached');
    }

    detached() {
        this.dispatch('UI:carousel-item-detached');
    }
}
