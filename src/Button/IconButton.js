/**
 * @file Icon Button
 * @author leon <ludafa@outlook.com>
 */

import BaseButton from './Base';
import {create} from '../common/util/cx';
import Icon from '../Icon';
import {CenterRipple} from '../Ripple';

const cx = create('button');

export default class IconButton extends BaseButton {

    static template = `
        <button
            class="{{computedClassName}}"
            type="{{type}}"
            disabled="{{disabled}}"
            on-click="onClick($event)">
            <san-icon icon="{{icon}}"><slot /></san-icon>
            <san-center-ripple />
        </button>
    `;

    static components = {
        'san-icon': Icon,
        'san-center-ripple': CenterRipple
    };

    static computed = {
        computedClassName() {
            return cx(this).addVariants('icon').build();
        }
    };

    onClick(e) {
        if (!this.data.get('disabled')) {
            this.fire('click', e);
        }
    }

}
