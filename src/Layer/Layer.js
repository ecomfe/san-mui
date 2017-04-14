

import san from 'san';

export default class Layer extends san.Component {
    static template = ``;

    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }
    }
}
