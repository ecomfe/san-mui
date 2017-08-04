/**
 * @file SubHeader Componennt
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san, {DataTypes} from 'san';

export default san.defineComponent({

    template: `
        <p class="sm-sub-header" style="{{ subheaderStyle }}">
            <slot></slot>
        </p>
    `,

    computed: {
        subheaderStyle() {
            return this.data.get('inset') ? 'padding-left: 72px;' : '';
        }
    },

    dataTypes: {
        inset: DataTypes.bool
    }

});
