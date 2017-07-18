/**
 * @file routes
 * @author junmer
 */

/* eslint-disable fecs-export-on-declare */

import Main from '../README.md';

import AppBar from './AppBar.md';
import Avatar from './Avatar.md';
import Button from './Button.md';
import Card from './Card.md';
import Carousel from './Carousel.md';
import Checkbox from './Checkbox.md';
import Chip from './Chip.md';
import DatePicker from './DatePicker.md';
import Dialog from './Dialog.md';
import Divider from './Divider.md';
import Drawer from './Drawer.md';
import ExpansionPanel from './ExpansionPanel.md';
import Grid from './Grid.md';
import Icon from './Icon.md';
import List from './List.md';
import Menu from './Menu/Menu.md';
import IconMenu from './Menu/IconMenu.md';
import DropdownMenu from './Menu/DropdownMenu.san';
import Radio from './Radio.md';
import Paper from './Paper.md';
import Pagination from './Pagination.md';
// import Popover from './Popover.md';
import Progress from './Progress.md';
import Ripple from './Ripple.md';
import Slider from './Slider.md';
import Switch from './Switch.md';
import SubHeader from './SubHeader.md';
import Table from './Table.md';
import Tabs from './Tabs.md';
import TreeView from './TreeView.md';
import TextField from './TextField.md';
import TimePicker from './TimePicker.md';
import Toast from './Toast.md';
import Uploader from './Uploader.san';
import Tooltip from './Tooltip.san';

let routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        name: 'AppBar',
        component: AppBar
    },
    {
        name: 'Avatar',
        component: Avatar
    },
    {
        name: 'Button',
        component: Button
    },
    {
        name: 'Card',
        component: Card
    },
    {
        name: 'Carousel',
        component: Carousel
    },
    {
        name: 'Chip',
        component: Chip
    },
    {
        name: 'Grid',
        component: Grid
    },
    {
        name: 'Checkbox',
        component: Checkbox
    },
    {
        name: 'DatePicker',
        component: DatePicker
    },
    {
        name: 'Dialog',
        component: Dialog
    },
    {
        name: 'Divider',
        component: Divider
    },
    {
        name: 'Drawer',
        component: Drawer
    },
    {
        name: 'ExpansionPanel',
        component: ExpansionPanel
    },
    {
        name: 'Icon',
        component: Icon
    },
    {
        name: 'List',
        component: List
    },
    {
        name: 'Memu',
        components: [
            {
                name: 'Menu',
                component: Menu
            },
            {
                name: 'IconMenu',
                component: IconMenu
            },
            {
                name: 'DropdownMenu',
                component: DropdownMenu
            }
        ]
    },
    {
        name: 'Pagination',
        component: Pagination
    },
    {
        name: 'Paper',
        component: Paper
    },
    // {
    //     name: 'Popover',
    //     component: Popover
    // },
    {
        name: 'Progress',
        component: Progress
    },
    {
        name: 'Ripple',
        component: Ripple
    },
    {
        name: 'Radio',
        component: Radio
    },
    {
        name: 'Slider',
        component: Slider
    },
    {
        name: 'Switch',
        component: Switch
    },
    {
        name: 'SubHeader',
        component: SubHeader
    },
    {
        name: 'Table',
        component: Table
    },
    {
        name: 'Tabs',
        component: Tabs
    },
    {
        name: 'TextField',
        component: TextField
    },
    {
        name: 'TimePicker',
        component: TimePicker
    },
    {
        name: 'TreeView',
        component: TreeView
    },
    {
        name: 'Toast',
        component: Toast
    },
    {
        name: 'Tooltip',
        component: Tooltip
    },
    {
        name: 'Uploader',
        component: Uploader
    }
];

export default routes;
