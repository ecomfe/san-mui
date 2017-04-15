/**
 * @file example index
 * @author ielgnaw(wuji0223@gmail.com)
 */

import {router} from 'san-router';
import Main from './Main';
import Button from './Button.san';
import TextField from './TextField.san';
import Menu from './Menu.san';
import Tabs from './Tabs.san';
import Pagination from './Pagination.san';
import Popover from './Popover.san';
import Drawer from './Drawer.san';
import Dialog from './Dialog.san';
import Progress from './Progress.san';
import DatePicker from './DatePicker.san';
import Table from './Table.san';
import Ripple from './Ripple.san';
import Icon from './Icon.san';

import './index.styl';

let routes = {
    '/': Main,
    '/button': Button,
    '/textfield': TextField,
    '/menu': Menu,
    '/tabs': Tabs,
    '/pagination': Pagination,
    '/popover': Popover,
    '/drawer': Drawer,
    '/progress': Progress,
    '/datepicker': DatePicker,
    '/dialog': Dialog,
    '/table': Table,
    '/ripple': Ripple,
    '/Icon': Icon
};

Object.keys(routes).forEach(rule => router.add({
    rule,
    Component: routes[rule],
    target: '#root'
}));

router.start();
