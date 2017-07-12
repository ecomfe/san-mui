/**
 * @file IconMenu component
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import {Component} from 'san';
import IconButton from '../Button/IconButton';
import Paper from '../Paper';
import Popover from '../Popover';
import * as C from './constant';

export default class IconMenu extends Component {
    static template = `
        <div class="{{className}}">
            <sm-popover
                open="{=open=}"
                anchorOrigin="{{anchorOrigin}}"
                targetOrigin="{{targetOrigin}}"
                getAnchor="{{getAnchor}}">
                <sm-paper>
                    <slot />
                </sm-paper>
            </sm-popover>
            <sm-icon-button
                on-click="togglePopover"
                disabled="{{disabled}}">
                <slot name="icon">{{icon}}</slot>
            </sm-icon-button>
        </div>
    `;

    static components = {
        'sm-icon-button': IconButton,
        'sm-popover': Popover,
        'sm-paper': Paper
    };

    static messages = {
        [C.MENU_ITEM_INITED]({target}) {
            target.data.set('type', 'command');
            this.items.push(target);
        },
        [C.MENU_COLLAPSE]() {
            this.data.set('open', false);
        }
    };

    initData() {
        return {
            open: false,
            getAnchor: this.getAnchor.bind(this),
            anchorOrigin: 'tl',
            targetOrigin: 'tl'
        };
    }

    inited() {
        this.items = [];
    }

    getAnchor() {
        return this.el;
    }

    togglePopover() {
        this.data.set('open', !this.data.get('open'));
    }

}
