/**
 * @file List
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import {Icon} from '../Icon';

export default san.defineComponent({

    template: `
        <div class="sm-list">
            <slot></slot>
        </div>
    `,

    components: {
        'san-icon': Icon
    }
});
