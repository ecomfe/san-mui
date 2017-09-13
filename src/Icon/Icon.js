/**
 * @file Icon component
 * @author leon <ludafa@outlook.com>
 */

import san, {DataTypes} from 'san';

export default san.defineComponent({
    template: `
        <i class="sm-icon" style="{{size ? 'font-size:' + size + 'px' : ''}}">
            <slot />
        </i>
    `,
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
