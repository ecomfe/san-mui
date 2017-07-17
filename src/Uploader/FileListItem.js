/**
 * @file File List Item
 * @author leon <ludafa@outlook.com>
 */

import {Component, DataTypes} from 'san';
import {create} from '../common/util/cx';
import {LinearProgress} from '../Progress';
import IconButton from '../Button/IconButton';

const cx = create('file-list-item');

export default class FileListItem extends Component {

    static template = `
        <div class="{{className}}">
            <div class="${cx.getPartClassName('name')}">{{name}}</div>
            <div class="${cx.getPartClassName('size')}">{{size}}</div>
            <sm-icon-button on-click="remove">remove</sm-icon-button>
            <sm-linear-progress />
        </div>
    `;

    static components = {
        'sm-linear-progress': LinearProgress,
        'sm-icon-button': IconButton
    };

    static computed = {
        className() {
            return cx(this).build();
        }
    };

    dataTypes = {
        filename: DataTypes.string.isRequired,
        url: DataTypes.string
    };

    remove() {
        this.fire('remove');
    }

}
