/**
 * @file Hello component test
 * @author ielgnaw(wuji0223@gmail.com)
 */

import chai from 'chai';
import path from 'path';
import san from 'san';
import Recommended from '../src/Recommended';

const expect = chai.expect;

describe('Recommended Component', () => {
    const recommended = new Recommended();

    it('life cycle', () => {
        expect(recommended.lifeCycle.is('inited')).to.equal(true);
        expect(recommended.lifeCycle.is('created')).to.equal(false);
        expect(recommended.lifeCycle.is('attached')).to.equal(false);
    });

    it('initData', () => {
        const wrap = document.createElement('div');
        document.body.appendChild(wrap);
        recommended.attach(wrap);

        const p = wrap.getElementsByTagName('p')[0];
        expect(p.innerHTML.indexOf('Hello San (recommended)')).to.equal(0);
    });

    it('method return right value', () => {
        expect(recommended.test()).to.equal(1);
    })
});
