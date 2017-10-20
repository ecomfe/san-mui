/**
 * @file Mask
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import {create} from '../common/util/cx';

const cx = create('mask');

let singleton = null;

export class Mask extends Component {

    static template = `
        <div
            class="{{computedClassName}}"
            style="{{mainStyle}}"
            on-click="onRequestClose" />
    `;

    static computed = {
        computedClassName() {
            return cx(this).build();
        },
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
    onClose && singleton.on('close', onClose);
}

export function hide(onClose) {
    if (singleton) {
        singleton.hide();
        onClose && singleton.un('close', onClose);
    }
}
