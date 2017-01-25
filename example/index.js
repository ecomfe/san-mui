/**
 * @file example index
 * @author ielgnaw(wuji0223@gmail.com)
 */

import san from 'san';
import {router} from 'san-router';
import Main from './Main';

router.add({rule: '/', Component: Main, target: '#root'});

router.start();
