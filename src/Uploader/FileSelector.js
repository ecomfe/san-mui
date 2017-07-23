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
            <sm-button
                variants="raised info"
                on-click="onSelect">
                选择文件
            </sm-button>
            <input
                type="file"
                style="display: none"
                multiple="{{multiple}}"
                on-change="onReceiveFiles($event)"  />
        </div>
    `;

    static computed = {
        className() {
            return cx(this).build();
        }
    };

    static dataTypes = {
        multiple: DataTypes.bool
    };

    static components = {
        'sm-button': Button
    };

    initData() {
        return {
            multiple: false
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
