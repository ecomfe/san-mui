/**
 * @file routes
 * @author junmer
 */

/* eslint-disable fecs-export-on-declare */

import Main from '../README.md';
import Avatar from './Avatar.md';
import Button from './Button.md';
import TextField from './TextField.san';
import Menu from './Menu.san';
import List from './List.san';
import TreeView from './TreeView.san';
import Tabs from './Tabs.san';
import Pagination from './Pagination.md';
import Popover from './Popover.md';
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
import Grid from './Grid.san';

let routes = {
    '/': Main,
    '/AppBar': AppBar,
    '/Avatar': Avatar,
    '/Button': Button,
    '/Card': Card,
    '/TextField': TextField,
    '/Menu': Menu,
    '/List': List,
    '/TreeView': TreeView,
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
    '/Chip': Chip,
    '/Grid': Grid

};

export default routes;
