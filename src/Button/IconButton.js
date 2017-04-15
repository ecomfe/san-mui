/**
 * @file Icon Button
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import {create} from '../common/util/cx';
import Icon from '../Icon';
import {CenterRipple} from '../Ripple';

const cx = create('button');

export default class IconButton extends Component {

    static template = `
        <button
            class="{{computedClassName}}"
            disabled="{{disabled}}">
            <san-icon><slot /></san-icon>
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

}
