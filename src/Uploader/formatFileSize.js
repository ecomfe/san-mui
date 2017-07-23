/**
 * @file format file size
 * @author leon <ludafa@outlook.com>
 */

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

export default function (size) {

    let unit = 0;

    while (size > 1024) {
        size /= 1024;
        unit++;
    }

    return `${Math.ceil(size)}${UNITS[unit]}`;

}
