/**
 * @file Hello component test
 * @author ielgnaw(wuji0223@gmail.com)
 */

import {expect} from 'chai';
import san from 'san';

const Demo = san.defineComponent({

    template: `
        <p>Hello San</p>
    `,

    test() {
        return 1;
    }

});


describe('Demo', () => {

    const demo = new Demo();

    it('life cycle', () => {
        expect(demo.lifeCycle.is('inited')).to.equal(true);
        expect(demo.lifeCycle.is('created')).to.equal(false);
        expect(demo.lifeCycle.is('attached')).to.equal(false);
    });

    it('initData', () => {
        const wrap = document.createElement('div');
        document.body.appendChild(wrap);
        demo.attach(wrap);

        const p = wrap.getElementsByTagName('p')[0];
        expect(p.innerHTML.indexOf('Hello San')).to.equal(0);

    });

    it('method return right value', () => {
        expect(demo.test()).to.equal(1);
    });

});
