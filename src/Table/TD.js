/**
 * @file 表格 - td
 * @author errorrik<errorrik@gmail.com>
 * @author jinzhubaofu <leonlu@outlook.com>
 */

import san from 'san';

export default class TD extends san.Component {
    static template = `
        <td><slot></slot></td>
    `;
}
