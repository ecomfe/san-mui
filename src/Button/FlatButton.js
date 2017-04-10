/**
 * @file Flat Button
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import Button from './Button';

export default san.defineComponent({
    components: {
        'san-button': Button
    },
    template: `
        <san-button variants="{{variants}}"><slot></slot></san-button>
    `,
    initData() {
        let variants = this.data.get('variants') || [];
        return {
            variants: variants && [...variants, 'flat']
        };
    }
});
