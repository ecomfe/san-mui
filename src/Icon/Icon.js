/**
 * @file Icon component
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <i class="{{icon ? icon : 'sm-icon'}} {{ className }}" style="{{size | fontSize}}">
            <slot />
        </i>
    `,
    filters: {
        fontSize(size) {
            return size ? `font-size: ${size}px` : '';
        }
    },
    initData() {
        return {
            size: 24
        };
    }
});
