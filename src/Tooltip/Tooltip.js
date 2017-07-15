/**
 * @file Tooltip
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import {create} from '../common/util/cx';
import Popover from '../Popover/Popover';

const cx = create('tooltip');
// 被移动的
const SOURCE_ORIGIN_MAP = {
    left: 'cr',
    right: 'cl',
    top: 'bc',
    bottom: 'tc'
};

// 目标
const TARGET_ORIGIN_MAP = {
    left: 'cl',
    right: 'cr',
    top: 'tc',
    bottom: 'bc'
};

export default class Tooltip extends Component {

    static template = `
        <div class="sm-tooltip" on-click="togglePopover">
            <sm-popover
                anchorOrigin="{{anchorOrigin}}"
                targetOrigin="{{targetOrigin}}"
                getAnchor="{{getAnchor}}"
                open="{=open=}"
                maxWidth="{{maxWidth}}"
                maxHeight="{{maxHeight}}">
                <slot name="title">{{title}}</slot>
            </sm-popover>
            <slot />
        </div>
    `;

    static computed = {
        className() {
            return cx(this)
                .addStates({
                    fluid: this.data.get('fullWidth')
                })
                .build();
        },
        anchorOrigin() {
            return TARGET_ORIGIN_MAP[this.data.get('position')];
        },
        targetOrigin() {
            return SOURCE_ORIGIN_MAP[this.data.get('position')];
        }
    };

    static components = {
        'sm-popover': Popover
    };

    initData() {
        return {
            open: false,
            mode: 'click',
            position: 'bottom',
            maxWidth: null,
            maxHeight: null,
            getAnchor: this.getAnchor.bind(this)
        };
    }

    inited() {
        console.log(this.data.get('position'));
    }

    getAnchor() {
        return this.el;
    }

    togglePopover() {
        this.data.set('open', !this.data.get('open'));
    }

}
