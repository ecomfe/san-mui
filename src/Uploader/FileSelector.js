/**
 * @file File Selector
 * @author leon <ludafa@outlook.com>
 */

import {Component, DataTypes} from 'san';

export default class FileSelector extends Component {

    static template = `
        <input
            type="file"
            multiple="{{multiple}}"
            on-change="onReceiveFiles($event)"  />
    `;

    static dataTypes = {
        multiple: DataTypes.bool
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

}
