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
            style="display: {{open ? 'block' : 'none'}}"
            on-click="onRequestClose" />
    `;

    initData() {
        return {
            open: false
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
