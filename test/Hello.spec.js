/**
 * @file test
 * @author ielgnaw(wuji0223@gmail.com)
 */

import chai from 'chai';
import path from 'path';
import san from 'san';
import Hello from '../src/Hello';

const expect = chai.expect;

describe('Hello Component', () => {
    const hello = new Hello();

    it('life cycle', () => {
        expect(hello.lifeCycle.is('inited')).to.equal(true);
        expect(hello.lifeCycle.is('created')).to.equal(false);
        expect(hello.lifeCycle.is('attached')).to.equal(false);
    });

    it('initData', () => {
        const wrap = document.createElement('div');
        document.body.appendChild(wrap);
        hello.attach(wrap);

        const p = wrap.getElementsByTagName('p')[0];
        expect(p.innerHTML.indexOf('Hello San')).to.equal(0);
    });

    it('method return right value', () => {
        expect(hello.test2()).to.equal(2);
    })
});
