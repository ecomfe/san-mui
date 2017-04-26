/**
 * @file san-mui/Paper
 * @author sparklewhy@gmail.com
 */

import {Component} from 'san';
import {create} from '../common/util/cx';

const cx = create('paper');

export default class Paper extends Component {
    static template = `
        <div class="{{paperClass}}">
            <slot></slot>
        </div>
    `;

    static computed = {
        paperClass() {
            let result = [cx(this).build()];

            if (this.data.get('circle')) {
                result.push(cx.getPartClassName('circle'));
            }

            if (this.data.get('rounded')) {
                result.push(cx.getPartClassName('rounded'));
            }

            result.push(cx.getPartClassName(this.data.get('zDepth')));

            return result.join(' ');
        }
    };

    initData() {
        return {
            circle: false,
            rounded: true,
            zDepth: 1
        };
    }

    inited() {
        this.formatParam('circle', 'rounded');
    }

    formatParam(...paramName) {
        paramName.forEach(param => {
            let num = this.data.get(param);
            num && this.data.set(param, !!+num);
        });
    }
}
