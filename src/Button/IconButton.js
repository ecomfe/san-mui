/**
 * @file Icon Button
 * @author leon <ludafa@outlook.com>
 */

// import BaseButton from './Base';
import {create} from '../common/util/cx';
import Icon from '../Icon';
import {CenterRipple} from '../Ripple';
import {Component, DataTypes} from 'san';

const cx = create('button');

export default class IconButton extends Component {

    static template = `
        <button
            class="{{computedClassName}}"
            type="{{type}}"
            disabled="{{disabled}}"
            on-click="onClick($event)">
            <san-icon><slot /></san-icon>
            <san-center-ripple />
        </button>
    `;

    initData() {
        return {
            type: 'button',
            disabled: false
        };
    }

    static components = {
        'san-icon': Icon,
        'san-center-ripple': CenterRipple
    };

    static computed = {
        computedClassName() {
            return cx(this).addVariants('icon').build();
        }
    };

    static dataTypes = {
        type: DataTypes.string,
        disabled: DataTypes.bool
    };

    onClick(e) {
        if (!this.data.get('disabled')) {
            this.fire('click', e);
        }
    }

}
