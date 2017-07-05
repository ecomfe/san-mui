/**
 * @file Mask
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';

let singleton = null;

export class Mask extends Component {

    static template = `
        <div
            class="sm-mask"
            style="{{mainStyle}}"
            on-click="onRequestClose" />
    `;

    static computed = {
        mainStyle() {
            let open = this.data.get('open');
            let zIndex = this.data.get('zIndex');
            return {
                'display': open ? 'block' : 'none',
                'z-index': zIndex
            };
        }
    };

    initData() {
        return {
            open: false,
            zIndex: 10
        };
    }

    show() {
        this.data.set('open', true);
    }

    hide() {
        this.data.set('open', false);
    }

    onRequestClose() {
        this.fire('close');
    }

}

export function show(onClose) {
    if (!singleton) {
        singleton = new Mask();
        singleton.attach(document.body);
    }
    singleton.show();
    singleton.on('close', onClose);
}

export function hide(onClose) {
    if (singleton) {
        singleton.hide();
        singleton.un('close', onClose);
    }
}
