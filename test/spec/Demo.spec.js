/**
 * @file Hello component test
 * @author ielgnaw(wuji0223@gmail.com)
 */

import {expect} from 'chai';
import san from 'san';

const Demo = san.defineComponent({

    template: `
        <p>Hello {{text}}</p>
    `,

    initData() {
        return {
            text: 'San'
        }
    },

    test() {
        return 1;
    }

});


describe('Demo', () => {
    // prepare for testing
    const viewport = document.createElement('div');
    viewport.id = 'test';

    before(() => {
        document.body.appendChild(viewport);
    });

    after(() => {
        viewport.remove();
    });

    const demo = new Demo();

    it('life cycle', () => {
        expect(demo.lifeCycle.is('inited')).to.equal(true);
        expect(demo.lifeCycle.is('created')).to.equal(undefined);
        expect(demo.lifeCycle.is('attached')).to.equal(undefined);
    });


    it('initData', () => {
        demo.attach(viewport);
        expect(demo.data.get('text')).to.equal('San');
        expect(demo.el.tagName).to.equal('P');
    });

    it('method return right value', () => {
        expect(demo.test()).to.equal(1);
        demo.dispose();
    });

});
