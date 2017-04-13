/**
 * @file Icon component
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <i class="sm-icon {{class}}" style="font-size: {{size}}px;color: {{color}}">
            <slot />
        </i>
    `,
    initData() {
        return {
            size: 24,
            color: ''
        };
    }
});