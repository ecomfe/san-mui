/**
 * @file Hello component
 * @author ielgnaw(wuji0223@gmail.com)
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <p>Hello {{name}}!</p>
    `,
    initData() {
        return {
            name: 'San'
        }
    },
    test1() {
        return 1;
    },
    test2() {
        return 2;
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
