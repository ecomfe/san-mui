/**
 * @file Mask
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';

let singleton = null;

export class Mask extends Component {

    static template = `
        <div class="sm-mask" style="display: {{open ? 'block' : 'none'}}" />
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

}

export function show() {
    if (!singleton) {
        singleton = new Mask();
        singleton.attach(document.body);
    }
    singleton.show();
}

export function hide() {
    if (singleton) {
        singleton.hide();
    }
}
