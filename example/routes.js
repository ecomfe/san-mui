/**
 * @file routes
 * @author junmer
 */

/* eslint-disable fecs-export-on-declare */

import Main from './Main';
import Avatar from './Avatar.san';
import Button from './Button.san';
import TextField from './TextField.san';
import Menu from './Menu.san';
import List from './List.san';
import Tabs from './Tabs.san';
import Pagination from './Pagination.san';
import Popover from './Popover.san';
import Drawer from './Drawer.san';
import Dialog from './Dialog.san';
import Divider from './Divider.san';
import Progress from './Progress.san';
import DatePicker from './DatePicker.san';
import Table from './Table.san';
import Ripple from './Ripple.san';
import Icon from './Icon.san';
import Checkbox from './Checkbox.san';
import Switch from './Switch.san';
import SubHeader from './SubHeader.san';
import Radio from './Radio.san';
import ExpansionPanel from './ExpansionPanel.san';
import Toast from './Toast.san';
import TimePicker from './TimePicker.san';
import Chip from './Chip.san';
import AppBar from './AppBar.san';
import Paper from './Paper.san';
import Card from './Card.san';
import Slider from './Slider.san';

let routes = {
    '/': Main,
    '/AppBar': AppBar,
    '/Avatar': Avatar,
    '/Button': Button,
    '/Card': Card,
    '/TextField': TextField,
    '/Menu': Menu,
    '/List': List,
    '/Tabs': Tabs,
    '/Pagination': Pagination,
    '/Paper': Paper,
    '/Popover': Popover,
    '/Drawer': Drawer,
    '/Divider': Divider,
    '/Progress': Progress,
    '/DatePicker': DatePicker,
    '/Dialog': Dialog,
    '/Table': Table,
    '/Ripple': Ripple,
    '/Icon': Icon,
    '/Checkbox': Checkbox,
    '/Radio': Radio,
    '/Slider': Slider,
    '/Switch': Switch,
    '/SubHeader': SubHeader,
    '/ExpansionPanel': ExpansionPanel,
    '/TimePicker': TimePicker,
    '/Snackbar & Toast': Toast,
    '/Chip': Chip

};

export default routes;
