/**
 * @file Clock
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import cx from 'classnames';

function getMaxValue(type) {
    switch (type) {
        case '12hour':
            return 12;
        case '24hour':
            return 24;
        case 'minute':
            return 60;
    }
}

export default class Clock extends san.Component {

    static template = `
        <div class="sm-time-picker-clock" on-mousedown="onMouseDown($event)">
            <div style="pointer-events: none">
                <b
                    class="{{pointerClassName}}"
                    style="{{pointerStyle}}" />
                <i
                    san-for="item, i in items"
                    class="{{numberClassName[i]}}"
                    style="{{numberStyle[i]}}">
                    {{item.text}}
                </i>
            </div>
        </div>
    `;

    static computed = {

        pointerClassName() {
            let type = this.data.get('type');
            return cx(
                'sm-time-picker-clock-pointer',
                type === 'minute' ? 'variant-minute' : null
            );
        },
        pointerStyle() {
            let type = this.data.get('type');
            let value = this.data.get('_value');
            let round = value >= 12 ? 1 : 0;
            let rate = type === 'minute' ? 60 : 12;
            return {
                transform: `rotate(${Math.round(value / rate * 360 - 180) % 360}deg)`,
                height: `${type === '24hour' && round === 1 ? 80 : 102}px`
            };
        },
        numberClassName() {

            let items = this.data.get('items');
            let value = this.data.get('_value');

            let result = items.map(
                (item, i) => cx(
                    'sm-time-picker-clock-number',
                    `variant-round-${i >= 12 ? 2 : 1}`,
                    {
                        'state-selected': value === item.value
                    }
                )
            );

            return result;

        },
        numberStyle() {
            let items = this.data.get('items');
            let r = this.data.get('r');
            let blockSizes = this.data.get('blockSizes');
            let step = this.data.get('step');
            return items.map((_, index) => {

                let round = Math.floor(index / 12);
                let radius = r;

                for (let i = 0; i <= round; i++) {
                    radius -= blockSizes[i] * 0.75 + i * 12;
                }

                let x = (r + radius * Math.sin(index * step)).toFixed(2);
                let y = (r - radius * Math.cos(index * step)).toFixed(2);

                return {
                    transform: `translate(${x}px, ${y}px)`,
                    left: `${-blockSizes[round] / 2}px`,
                    top: `${-blockSizes[round] / 2}px`,
                    width: `${blockSizes[round]}px`,
                    height: `${blockSizes[round]}px`
                };

            });
        }
    };

    initData() {
        return {
            type: 'hour',
            value: 0,
            r: 130,
            step: 30 / 180 * Math.PI,
            blockSizes: [32, 28],
            items: []
        };
    }

    inited() {

        let {type, value} = this.data.get();
        let items = this.getItems(type);

        this.data.set('items', items);
        this.data.set('_value', value);

        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.watch('type', type => {
            this.data.set('items', this.getItems(type));
        });

        this.watch('value', value => {
            if (this.data.get('_value') !== value) {
                this.data.set('_value', value);
            }
        });

    }

    getItems(type) {

        switch (type) {
            case '12hour':
                return Array
                    .apply(null, new Array(12))
                    .map((_, i) => {

                        return {
                            text: i === 0 ? 12 : i,
                            value: i
                        };

                    });

            case '24hour':

                return Array
                    .apply(null, new Array(24))
                    .map((_, i) => {

                        return {
                            text: i === 0 ? 12 : (i === 12 ? '00' : i),
                            value: i
                        };

                    });

            case 'minute':
                return Array
                    .apply(null, new Array(12))
                    .map((_, i) => {

                        return {
                            text: i === 0 ? '00' : i * 5,
                            value: i * 5
                        };

                    });
        }

    }

    onMouseDown(e) {

        if (e.button !== 0) {
            return;
        }

        this.bindWindowEvents();

    }

    onMouseMove(e) {

        let {r, type} = this.data.get();

        let {clientX, clientY} = e;
        let {top, left} = e.target.getBoundingClientRect();
        let x = clientX - left - r;
        let y = clientY - top - r;
        let max = getMaxValue(type);
        let radius = Math.sqrt(x * x + y * y);
        let rotate = 180 - (x > 0 ? 1 : -1) * Math.acos(y / radius) / Math.PI * 180;
        let value = Math.round(rotate / 360 * max);

        if (type === '24hour') {
            value = value / 2 % 12 + (radius > 80 ? 0 : 12);
        }
        else {
            value %= max;
        }

        this.data.set('_value', value);

    }

    onMouseUp(e) {

        // 处理 click
        this.onMouseMove(e);

        // 触发父组件更新 value
        this.fire('change', this.data.get('_value'));

        // 解除事件绑定
        this.unbindWindowEvents();

    }

    bindWindowEvents() {
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    unbindWindowEvents() {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }

    detached() {

        // 解除事件绑定
        this.unbindWindowEvents();

    }

}
