/**
 * @file Layer
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';

export default class Layer extends Component {

    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }
    }

}
