/**
 * @file Hello1 component
 * @author ielgnaw(wuji0223@gmail.com)
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <div>
            <p>Hello {{name}}!</p>
            <p>We recommend using pure javascript to write components.</p>
        </div>
    `,
    initData() {
        return {
            name: 'San (recommended)'
        }
    },
    test() {
        return 1;
    },
    test2() {
        return 2;
    },
    test3() {
        return 3;
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
