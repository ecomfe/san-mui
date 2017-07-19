/**
 * @file san-mui/InputNumber
 * @author solvan
 */

import san from 'san';
import {create} from '../common/util/cx';
import {Button} from '../Button';
import Icon from '../Icon';
import TextField from '../TextField';
import './InputNumber.styl';

const cx = create('inputNumber');

function getDecreaseResult(val, step, power) {
    const powerValue = Math.pow(10, power);
    let countValue = (powerValue * val - powerValue * step) / powerValue;
    return numConvert(countValue, power);
}

function getIncreaseResult(val, step, power) {
    const powerValue = Math.pow(10, power);
    let countValue = (powerValue * val + powerValue * step) / powerValue;
    return numConvert(countValue, power);
}

function numConvert(num, power) {
    return parseFloat(Number(num).toFixed(power));
}

function getPower(value) {
    const valueStr= value.toString();
    const valueIndex = valueStr.indexOf('.');
    let power = 0;
    if (valueIndex !== -1) {
        power = valueStr.length - valueIndex - 1;
    }
    return power;
}

export default class InputNumber extends san.Component {
    static template = `
        <div 
            class="{{computedClassName}} 
            {{size ? computedClassName + '-' + size : ''}}
            {{disabled ? 'disabled' : ''}}"
            disabled="{{disabled}}">
            <san-text-field 
                variants="${cx.getPartClassName('input')}"
                inputValue="{{value}}"
                on-input-keyup="enterDebounceKeyup($event)"/>
            <span 
                class="${cx.getPartClassName('increase')}
                {{size ? computedClassName + '-'+ size + '-increase' : ''}}
                {{maxDisabled || disabled ? 'is-disabled' : ''}}"
                on-click="increase($event)">
                <san-icon size="{{computedSize}}">{{plusIcon}}</san-icon>
            </span> 
            <span 
                class="${cx.getPartClassName('decrease')}
                {{size ? computedClassName + '-' + size + '-decrease' : ''}}
                {{minDisabled || disabled ? 'is-disabled' : ''}}"
                on-click="decrease($event)">
                <san-icon size="{{computedSize}}">{{minusIcon}}</san-icon>
            </span>

        </div>
    `;
    static components = {
        'san-button': Button,
        'san-text-field': TextField,
        'san-icon': Icon
    };
    static computed = {
        computedClassName() {
            return cx(this).build();
        },
        computedSize() {
            if(this.data.get('size') === 'large') {
                return 42;
            }
            else if (this.data.get('size') === 'small') {
                return 30;
            }
            else {
                return 34;
            }
        },
        minDisabled() {
            return getDecreaseResult(this.data.get('value'), this.data.get('step'), this.data.get('power')) < this.data.get('min');
        },
        maxDisabled() {
            return getIncreaseResult(this.data.get('value'), this.data.get('step'), this.data.get('power')) > this.data.get('max');
        },
        power() {
            
            return Math.max(
                getPower(
                    this.data.get('value')), 
                getPower(
                    this.data.get('step')));
        }   
    };

    initData() {
        return {
            plusIcon: 'add',
            minusIcon: 'remove',
            disabled: false,
            value: '0',
            max: Infinity,
            min: -Infinity, 
            size: '',
            step: 1,
            preVal: ''

        };
    };
    inited() {
    }

    attached() {
        this.data.set('preVal', this.data.get('value'));
        this.watch('value', (value) => {
            let newVal = Number(value);
            if (isNaN(newVal)) return;
            let max = this.data.get('max');
            let min = this.data.get('min');
            if (newVal >= max) newVal = max;
            if (newVal <= min) newVal = min;
            if (this.data.get('preVal') !== value) {
                this.fire('change', newVal);
            }
             

            

            
        });
    }

    enterDebounceKeyup(e) {
        this.data.set('preVal', this.data.get('value'));
        this.enterTimer = setTimeout(() => {
            let newVal = this.compareValue(e.target.value);
            this.data.set('value', newVal);
           
        }, 100);

    }


    setCurrentValue(value) {
        this.data.set('preVal', this.data.get('value'));
        const preVal = +this.data.get('preVal');
        let newVal = this.compareValue(value);
        if (preVal === newVal) return;
        this.data.set('value', newVal);
        
    }
    compareValue(value) {
        let newVal = Number(value);
        const currentMin = this.data.get('min');
        if (isNaN(newVal)) return currentMin !== -Infinity ? currentMin : 0;
        let max = this.data.get('max');
        let min = this.data.get('min');
        if (newVal >= max) newVal = max;
        if (newVal <= min) newVal = min;
        return newVal;
        
    }

    decrease() {
        if (this.data.get('disabled') || this.data.get('minDisabled')) return;
        const value = this.data.get('value') || 0;
        const newVal = getDecreaseResult(+value, this.data.get('step'), this.data.get('power'));
        if (newVal < this.data.get('min')) return;
        this.setCurrentValue(newVal);
    }
    increase() {
        if (this.data.get('disabled') || this.data.get('maxDisabled')) return;
        const value = this.data.get('value') || 0;
        const newVal = getIncreaseResult(+value, this.data.get('step'), this.data.get('power'));
        if (newVal > this.data.get('max')) return;
        this.setCurrentValue(newVal);
    }

    detached() {

        if (this.enterTimer) {
            clearTimeout(this.enterTimer);
        }
    }
}