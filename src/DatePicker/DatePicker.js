/**
 * @file DatePicker
 * @author leon <ludafa@outlook.com>
 */

import Dialog from '../Dialog';
import {Component} from 'san';
import {create} from '../common/util/cx';
import moment from 'moment';
import {FORMAT} from './constant';

import Month from './Month';
import Button from '../Button';
import Header from './Header';
import MonthCarousel from './MonthCarousel';
import Year from './Year';
import Week from './Week';
import TextField from '../TextField';

const cx = create('date-picker');

export default class DatePicker extends Component {

    static template = `
        <div class="{{computedClassName}}" ref="anchor">
            <san-text-field
                label="{{label}}"
                labelFloat="{{labelFloat}}"
                labelClass="{{labelClass}}"
                labelFocusClass="{{labelFocusClass}}"
                hintText="{{hintText}}"
                hintTextClass="{{hintTextClass}}"
                inputClass="{{inputClass}}"
                errorText="{{errorText}}"
                errorColor="{{errorColor}}"
                helpText="{{helpText}}"
                helpTextClass="{{helpTextClass}}"
                maxLength="{{maxLength}}"
                disabled="{{disabled}}"
                readOnly="{{!0}}"
                fullWidth="{{fullWidth}}"
                underlineShow="{{!0}}"
                focus="{{!1}}"
                inputValue="{=value=}"
                charLength="{{charLength}}"
                float="{{float}}"
                multiLine="{{multiLine}}"
                icon="{{icon}}"
                on-input-focus="openDialog" />
            <san-dialog
                variants="date-picker"
                useMask="{{!0}}"
                closeOnClickMask="{{0}}"
                open="{=open=}"
                width="310">
                <san-header
                    slot="title"
                    date="{{pickedDate}}"
                    on-open="toggleYearPanel" />
                <san-month-carousel date="{=visualDate=}"/>
                <san-week />
                <san-month date="{=visualDate=}" value="{=pickedDate=}" />
                <san-year
                    san-if="{{yearPanelOpen}}"
                    date="{=pickedDate=}"
                    on-select="selectYear" />
                <footer slot="actions">
                    <san-button on-click="cancel" variants="info">取消</san-button>
                    <san-button on-click="confirm" variants="info">确认</san-button>
                </footer>
            </san-dialog>
        </div>
    `;

    static components = {
        'san-dialog': Dialog,
        'san-month': Month,
        'san-button': Button,
        'san-header': Header,
        'san-month-carousel': MonthCarousel,
        'san-year': Year,
        'san-week': Week,
        'san-text-field': TextField
    };

    initData() {
        /* eslint-disable fecs-properties-quote */
        return {
            open: false,
            yearPanelOpen: false,

            // text field props
            label: '',
            labelFloat: false,
            labelClass: '',
            labelFocusClass: '',
            hintText: '选择日期',
            hintTextClass: '',
            inputClass: '',
            errorText: '',
            errorColor: '',
            helpText: '',
            helpTextClass: '',
            maxLength: 0,
            disabled: false,
            fullWidth: 0,
            underlineShow: true,
            underlineClass: '',
            underlineFocusClass: '',
            focus: false,
            inputValue: '',
            charLength: 0,
            float: true,
            multiLine: false,
            icon: ''
        };
        /* eslint-enable fecs-properties-quote */
    }

    inited() {

        // 最终值
        let value = this.data.get('value');
        let date = moment(value);
        if (!date.isValid()) {
            date = moment();
        }

        // 用于定位选中日期的数据
        this.data.set('visualDate', date.format(FORMAT));

        // 用于定位选择器的数据
        this.data.set('pickedDate', date.format(FORMAT));

        this.watch('pickedDate', date => this.data.set('visualDate', date));

    }

    openDialog() {
        this.data.set('open', true);
    }

    cancel() {
        this.data.set('open', false);
    }

    confirm() {
        this.data.set('open', false);
        this.data.set('value', this.data.get('pickedDate'));
    }

    toggleYearPanel() {
        this.data.set('yearPanelOpen', !this.data.get('yearPanelOpen'));
    }

    selectYear() {
        this.data.set('yearPanelOpen', false);
    }

}
