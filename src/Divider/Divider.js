/**
 * @file Divider component 分割线
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';

export default san.defineComponent({
    template: '<hr class="sm-divider" style="{{ dividerStyle }}" />',

    computed: {
        dividerStyle() {
            return this.data.get('inset') ? 'margin-left: 72px;' : '';
        }
    },

    inited() {
        let inset = this.data.get('inset');
        this.data.set('inset', inset === 'false' ? false : !!inset);
    }
});
