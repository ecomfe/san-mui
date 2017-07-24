/**
 * @file guid
 * @author leon <ludafa@outlook.com>
 */

const PREFIX = 'sm';

export default function (prefix = PREFIX) {
    let guid = (+(Math.random() + '').substr(2, 16)).toString(36);
    return `${prefix}-${guid}`;
}
