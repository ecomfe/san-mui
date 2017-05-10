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

const INTERNAL_FORMAT = 'HH:mm';

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
                    on-change="onClockChange($event)"
                    on-confirm="onClockConfirm" />
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
            let value = moment(date, INTERNAL_FORMAT)[method]();

            return panel === '12hour' ? value % 12 : value;

        },
        hour() {
            let type = this.data.get('type');
            let date = this.data.get('date');

            if (date == null) {
                return '';
            }

            date = moment(date, INTERNAL_FORMAT);

            if (type === '12hour' && date.hour() >= 12) {
                date.hour(date.hour() - 12);
            }

            return date.format('HH');

        },
        minute() {
            let date = this.data.get('date');
            return date == null ? '' : moment(date, INTERNAL_FORMAT).format('mm');
        }
    };

    initData() {
        /* eslint-disable fecs-properties-quote */
        return {

            // time picker props
            open: false,
            type: '24hour',
            meridiem: 'ante',

            // text field props
            label: '',
            labelFloat: false,
            labelClass: '',
            labelFocusClass: '',
            hintText: '选择时间',
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

        let {
            value,
            format,
            type
        } = this.data.get();

        // 指定面板类型
        this.data.set('panel', type);

        // 如果没有明确指定 format，那么根据 type 推测出默认的 format
        if (!format) {
            format = type === '12hour' ? 'hh:mm a' : 'HH:mm';
            this.data.set('format', format);
        }

        // 计算出内部使用的值 date
        let date = moment(value, format);

        if (!date.isValid()) {
            date = moment();
        }

        this.data.set('date', date.format(INTERNAL_FORMAT));

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

        date = moment(date, INTERNAL_FORMAT);

        if (panel === 'minute') {
            date.minute(+value);
        }
        else {
            date.hour(+value);
        }

        this.data.set('date', date.format(INTERNAL_FORMAT));

    }

    onClockConfirm() {
        this.data.set('panel', 'minute');
    }

    onMeridiemChange(meridiem) {
        let date = moment(this.data.get('date'), INTERNAL_FORMAT);
        let hour = date.hour();
        date.hour(hour % 12 + (meridiem === 'ante' ? 0 : 12));
        this.data.set('date', date.format(INTERNAL_FORMAT));
        this.data.set('meridiem', meridiem);
    }

    cancel() {

        // 关掉弹窗
        this.data.set('open', false);

        // 切换回小时面板
        this.data.set('panel', this.data.get('type'));

    }

    confirm() {

        let {date, format} = this.data.get();

        date = moment(date, INTERNAL_FORMAT);

        let nextValue = date.format(format);

        // 更新值
        this.data.set('value', nextValue);

        // 关掉弹窗
        this.data.set('open', false);

        // 切换回小时面板
        this.data.set('panel', this.data.get('type'));

    }

    detached() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

}
