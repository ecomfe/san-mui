/**
 * @file Icon component
 * @author leon <ludafa@outlook.com>
 */

import san, {DataTypes} from 'san';

export default san.defineComponent({
    template: `
        <i class="sm-icon" style="{{size | fontSize}}">
            <slot />
        </i>
    `,
    filters: {
        fontSize(size) {
            /* istanbul ignore next */
            return size ? `font-size: ${size}px` : '';
        }
    },

    initData() {
        /* istanbul ignore next */
        return {
            size: 24
        };
    },
    dataTypes: {
        size: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    }
});
