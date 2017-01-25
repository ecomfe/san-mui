/**
 * @file Hello component test
 * @author ielgnaw(wuji0223@gmail.com)
 */

import chai from 'chai';
import path from 'path';
import san from 'san';
import NotRecommended from '../src/NotRecommended';

const expect = chai.expect;

describe('NotRecommended Component', () => {
    const notRecommended = new NotRecommended();

    it('life cycle', () => {
        expect(notRecommended.lifeCycle.is('inited')).to.equal(true);
        expect(notRecommended.lifeCycle.is('created')).to.equal(false);
        expect(notRecommended.lifeCycle.is('attached')).to.equal(false);
    });

    it('initData', () => {
        const wrap = document.createElement('div');
        document.body.appendChild(wrap);
        notRecommended.attach(wrap);

        const p = wrap.getElementsByTagName('p')[0];
        expect(p.innerHTML.indexOf('Hello San (not recommended)')).to.equal(0);
    });

    it('method return right value', () => {
        expect(notRecommended.test2()).to.equal(2);
    })
});
