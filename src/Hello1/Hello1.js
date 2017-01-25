/**
 * @file Hello1 component
 * @author ielgnaw(wuji0223@gmail.com)
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <p>Hello111 {{name}}!</p>
    `,
    initData() {
        return {
            name: 'San111'
        }
    },
    inited() {
    },
    compiled() {
    },
    created() {
    },
    attached() {
    },
    detached() {
    },
    disposed() {
    }
});
