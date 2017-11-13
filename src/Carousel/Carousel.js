/**
 * @file san-mui/Carousel
 * @author solvan <sunwei11@baidu.com>
 */

import san from 'san';
import {create} from '../common/util/cx';
import {IconButton, Button} from '../Button';
import {throttle} from '../common/util/throttle';

const cx = create('carousel');
export default class Carousel extends san.Component {

    static template = `
        <div
            class="{{computedClassName}}"
            on-mouseenter="handleMouseEnter"
            on-mouseleave="handleMouseLeave">
            <div
            class="${cx.getPartClassName('container')}"
            style="height: {{height}}px">
                <san-icon-button
                    class="${cx.getPartClassName('arrow')} ${cx.getPartClassName('arrow-left')}"
                    san-if="arrow === 'hover' || 'always'"
                    on-click="throttledArrowClick(activeIndex - 1)">
                    {{prevIcon}}
                </san-icon-button>

                <san-icon-button
                    class="${cx.getPartClassName('arrow')} ${cx.getPartClassName('arrow-right')}"
                    san-if="arrow === 'hover' || 'always'"
                    on-click="throttledArrowClick(activeIndex + 1)">
                    {{nextIcon}}
                </san-icon-button>

                <slot></slot>

            </div>
            <ul
                class="${cx.getPartClassName('indicators')}"
                san-if="indicator">
                <li
                    class="${cx.getPartClassName('indicator')}
                    {{index === activeIndex ? 'is-active' : '' }}"
                    san-for="item, index in data"
                    on-mouseenter="throttledIndicatorHover(index)"
                    on-click="handleIndicatorClick(index)">
                    <san-button></san-button>
                </li>
            </ul>
        </div>
    `;

    static components = {
        'san-button': Button,
        'san-icon-button': IconButton
    };

    static computed = {
        computedClassName() {
            return cx(this).build();
        }
    };
    initData() {

        return {
            prevIcon: 'keyboard_arrow_left',
            nextIcon: 'keyboard_arrow_right',
            activeIndex: 0,
            items: [],
            autoplay: true,
            height: 500,
            interval: 3000,
            indicator: false,
            trigger: 'hover',
            arrow: 'always',
            isCycle: true
        };
    }

    inited() {
        this.items = [];
        let setActiveItem = this.setActiveItem.bind(this);
        this.throttledArrowClick = throttle(setActiveItem, 400, {
            trailing: false
        });
        this.throttledIndicatorHover = throttle(index => {
            this.handleIndicatorHover(index);
        }, 400);
    }

    attached() {

        this.watch('activeIndex', function (index) {
            this.resetItemPosition();
            this.fire('change', index);
        });
        this.startTimer();

    }

    detached() {
        this.data.set('activeIndex', 0);
        clearInterval(this.timer);
    }

    messages = {
        'UI:carousel-item-attached'(arg) {
            this.items.push(arg.target);
            this.translateItem(arg.target, this.items.length - 1, this.data.get('activeIndex'));

        },

        'UI:carousel-item-detached'(arg) {
            let len = this.items.length;

            while (len--) {
                if (this.items[len] === arg.target) {
                    this.items.splice(len, 1);
                }
            }
        }
    }

    setActiveItem(index) {

        index = Number(index);
        let length = this.items.length;
        let isCycle = this.data.get('isCycle');
        if (index < 0) {
            isCycle ? this.data.set('activeIndex', length - 1) : this.data.set('activeIndex', 0);
        }
        else if (index >= length) {
            isCycle ? this.data.set('activeIndex', 0) : this.data.set('activeIndex', length - 1);
        }
        else {
            this.data.set('activeIndex', index);
        }

    }

    handleMouseEnter() {
        this.data.set('arrow', 'hover');
        this.pauseTimer();
    }

    handleMouseLeave() {
        this.data.set('arrow', 'never');
        this.startTimer();
    }

    handleIndicatorClick(index) {
        this.data.set('activeIndex', index);
    }

    handleIndicatorHover(index) {
        if (this.data.get('trigger') === 'hover' && index !== this.data.get('activeIndex')) {
            this.data.set('activeIndex', index);
        }
    }

    resetItemPosition() {
        this.items.forEach((item, index) => {
            this.translateItem(item, index, this.data.get('activeIndex'));
        });
    }

    translateItem(item, index, activeIndex) {
        const parentWidth = item.el.offsetWidth;
        const length = this.items.length;
        if (index !== activeIndex && length > 2) {
            index = this.resetIndex(item, index, activeIndex, length);
        }
        item.data.set('active', index === activeIndex);
        item.data.set('translate', parentWidth * (index - activeIndex));
        item.data.set('ready', true);
    }

    resetIndex(item, index, activeIndex, length) {
        if (activeIndex === 0 && index === length - 1) {
            return -1;
        }
        else if (activeIndex === length - 1 && index === 0) {
            return length;
        }
        else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
            return length + 1;
        }
        else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
            return -2;
        }
        return index;
    }

    pauseTimer() {
        clearInterval(this.timer);
    }

    startTimer() {
        if (this.data.get('interval') <= 0 || !this.data.get('autoplay')) {
            return;
        }
        this.timer = setInterval(() => {
            this.playSlides();
        }, this.data.get('interval'));
    }

    playSlides() {
        let activeIndex = this.data.get('activeIndex');
        if (activeIndex < this.items.length - 1) {
            this.data.set('activeIndex', activeIndex + 1);
        }
        else {
            this.data.set('activeIndex', 0);
        }
    }


}
