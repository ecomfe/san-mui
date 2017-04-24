/**
 * @file Time Picker
 * @author leon <ludafa@outlook.com>
 */

import {Component} from 'san';
import moment from 'moment';
import Dialog from '../Dialog';
import Button from '../Button';
import TextField from '../TextField';
import Clock from './Clock';
import Header from './Header';

export default class TimePicker extends Component {

    static template = `
        <div class="sm-time-picker">
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
                on-input-focus="openPicker" />
            <san-dialog
                variants="time-picker"
                useMask="{{!0}}"
                closeOnClickMask="{{0}}"
                open="{=open=}"
                width="310">
                <san-header
                    slot="title"
                    type="{{type}}"
                    panel="{{panel}}"
                    hour="{{hour}}"
                    minute="{{minute}}"
                    meridiem="{{meridiem}}"
                    on-change="onPanelChange($event)"
                    on-change-meridiem="onMeridiemChange($event)" />
                <san-clock
                    type="{{panel}}"
                    value="{{clockValue}}"
                    meridiem="{{meridiem}}"
                    on-change="onClockChange($event)" />
                <footer slot="actions">
                    <san-button on-click="cancel" variants="info">取消</san-button>
                    <san-button on-click="confirm" variants="info">确认</san-button>
                </footer>
            </san-dialog>
        </div>
    `;

    static components = {
        'san-button': Button,
        'san-dialog': Dialog,
        'san-text-field': TextField,
        'san-clock': Clock,
        'san-header': Header
    };

    static computed = {
        clockValue() {

            let panel = this.data.get('panel');
            let date = this.data.get('date');
            let method = panel === 'minute' ? 'minute' : 'hour';
            let value = moment(date, 'HH:mm')[method]();

            if (date == null) {
                return '';
            }

            let clockValue = panel === '12hour'
                ? value % 12
                : value;

            return clockValue;

        },
        hour() {
            let type = this.data.get('type');
            let date = this.data.get('date');

            if (date == null) {
                return '';
            }

            date = moment(date, 'HH:mm');

            if (type === '12hour' && date.hour() >= 12) {
                date.hour(date.hour() - 12);
            }

            return date.format('HH');

        },
        minute() {
            let date = this.data.get('date');
            return date == null ? '' : moment(date, 'HH:mm').format('mm');
        }
    };

    initData() {
        /* eslint-disable fecs-properties-quote */
        return {
            // time picker props
            open: false,
            type: '12hour',
            panel: '12hour',
            format: 'YYYY-MM-DD HH:mm',
            meridiem: 'ante',

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
        let {value, format, type} = this.data.get();
        let date = moment(value, format);
        this.data.set('date', date.format('HH:mm'));
        this.data.set('panel', type);
        this.data.set('value', date.format(format));
        this.watch('type', type => {
            this.data.set('panel', type);
        });
    }

    openPicker() {
        this.data.set('open', true);
    }

    onPanelChange(panel) {
        let type = this.data.get('type');
        this.data.set('panel', panel === 'hour' ? type : panel);
    }

    onClockChange(value) {

        let {date, panel} = this.data.get();

        date = moment(date, 'HH:mm');

        if (panel === 'minute') {
            date.minute(+value);
        }
        else {
            date.hour(+value);
            this.timer = setTimeout(() => {
                this.data.set('panel', 'minute');
            }, 300);
        }

        this.data.set('date', date.format('HH:mm'));

    }

    onMeridiemChange(meridiem) {
        let date = moment(this.data.get('date'), 'HH:mm');
        let hour = date.hour();
        date.hour(hour % 12 + (meridiem === 'ante' ? 0 : 12));
        console.log(date.format('HH:mm'));
        this.data.set('date', date.format('HH:mm'));
        this.data.set('meridiem', meridiem);
    }

    cancel() {
        this.data.set('open', false);
    }

    confirm() {
        let {date, format, value} = this.data.get();

        value = moment(value, format);
        date = moment(date, 'HH:mm');

        let nextValue = value.hour(date.hour()).minute(date.minute()).format(format);

        this.data.set('value', nextValue);
        this.data.set('open', false);
    }

    detach() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

}
