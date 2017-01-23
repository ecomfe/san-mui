/**
 * @file example index
 * @author ielgnaw(wuji0223@gmail.com)
 */

import san from 'san';
import {router} from 'san-router';
import Hello from './Hello';

router.add({rule: '/', Component: Hello, target: '#root'});

router.start();
