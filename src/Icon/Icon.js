/**
 * @file Icon component
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <i class="sm-icon" style="font-size: {{size}}px;">
            <slot />
        </i>
    `,
    initData() {
        return {
            size: 24
        };
    }
});
