/**
 * @file san-mui/Button
 * @author leon <ludafa@outlook.com>
 */

import BaseButton from './Base';
import {create} from '../common/util/cx';
import {TouchRipple} from '../Ripple';

const cx = create('button');

export default class Button extends BaseButton {

    static components = {
        'san-touch-ripple': TouchRipple
    };

    static template = `
        <button
            on-click="click"
            class="{{computedClassName}}"
            disabled="{{disabled ? 'disabled' : ''}}">
            <slot />
            <san-touch-ripple san-if="!disabled" />
        </button>
    `;

    static computed = {
        computedClassName() {
            return cx(this).build();
        }
    };

    initData() {
        return {
            disabled: false
        };
    }

    click(e) {
        if (!this.data.get('disabled')) {
            this.fire('click', e);
        }
    }

}
