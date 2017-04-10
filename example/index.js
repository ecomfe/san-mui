/**
 * @file example index
 * @author ielgnaw(wuji0223@gmail.com)
 */

import {router} from 'san-router';
import Main from './Main';
import Button from './Button.san';
import Tabs from './Tabs.san';

import './index.styl';

router.add({rule: '/', Component: Main, target: '#root'});
router.add({rule: '/button', Component: Button, target: '#root'});
router.add({rule: '/tabs', Component: Tabs, target: '#root'});

router.start();
