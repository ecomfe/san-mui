/**
 * @file san-mui/Button
 * @author leon <ludafa@outlook.com>
 */

import {create} from '../common/util/cx';
import {TouchRipple} from '../Ripple';
import BaseButton from './Base';
import {DataTypes} from 'san';

const cx = create('button');

export default class Button extends BaseButton {

    static components = {
        'san-touch-ripple': TouchRipple
    };

    static template = `
        <button
            on-click="click($event)"
            type="{{type}}"
            class="{{computedClassName}}"
            disabled="{{disabled}}">
            <slot />
            <san-touch-ripple san-if="!disabled" />
        </button>
    `;

    static computed = {
        computedClassName() {
            return cx(this).build();
        }
    };

    static dataTypes = {
        type: DataTypes.string,
        disabled: DataTypes.bool
    };

    initData() {
        return {
            type: 'button',
            disabled: false
        };
    }

    attached() {
        // save the original href into originalHref and change current href according to disabled
        if (this.data.get('href')) {
            this.data.set('originalHref', this.data.get('href'));

            if (this.data.get('disabled')) {
                this.setHref('javascript:void(0);');
            }
        }

        this.watch('disabled', val => {
            if (val) {
                this.setHref('javascript:void(0);');
                return;
            }

            this.setHref(this.data.get('originalHref'));
        });
    }

    setHref(hrefVal) {
        this.data.set('href', hrefVal);
    }

    click(e) {
        if (!this.data.get('disabled')) {
            this.fire('click', e);
        }
    }

}
