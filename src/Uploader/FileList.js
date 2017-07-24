/**
 * @file File List
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import {create} from '../common/util/cx';

const cx = create('file-list');

export default class FileList extends Component {

    static template = `
        <div class="{{className}}">
            <slot />
        </div>
    `;

    static computed = {
        className() {
            return cx(this).build();
        }
    };

}
