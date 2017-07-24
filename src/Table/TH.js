/**
 * @file 表格 - th
 * @author errorrik<errorrik@gmail.com>
 * @author jinzhubaofu <leonlu@outlook.com>
 */

import san from 'san';

export default class TH extends san.Component {
    static template = `
        <th><slot></slot></th>
    `;
}
