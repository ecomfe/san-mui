/**
 * @file File Selector
 * @author leon <ludafa@outlook.com>
 */

import {Component, DataTypes} from 'san';
import Button from '../Button';
import {create} from '../common/util/cx';

const cx = create('file-selector');

export default class FileSelector extends Component {

    static template = `
        <div class="{{className}}">
            <a disabled="{{dibabled}}" on-click="onSelect">
                <slot name="inner-upload-btn"></slot>
            </a>
            <input
                type="file"
                style="display: none"
                multiple="{{multiple ? 'multiple' : ''}}"
                accept="{{accept}}"
                on-change="onReceiveFiles($event)"  />
        </div>
    `;

    static computed = {
        className() {
            return cx(this).build();
        }
    };

    static dataTypes = {
        multiple: DataTypes.bool,
        disabled: DataTypes.bool,
        accept: DataTypes.string
    };

    static components = {
        'sm-button': Button
    };

    initData() {
        return {
            multiple: false,
            accept: '*',
            disabled: false
        };
    }

    onReceiveFiles(e) {
        this.fire('select', e.target.files);
        this.el.value = '';
    }

    onSelect() {
        this.el.lastElementChild.click();
    }

}
