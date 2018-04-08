/**
 * @file 表格 - thead
 * @author errorrik<errorrik@gmail.com>
 * @author jinzhubaofu <leonlu@outlook.com>
 */

import san from 'san';

export default class THead extends san.Component {

    static template = `
        <thead><slot></slot></thead>
    `;

    static messages = {
        'UI:tr-inited'(e) {
            let tr = e.target;
            tr.data.set('pos', 'thead');
            tr.data.set('tableSelectable', this.data.get('tableSelectable'));
            this.tr = tr;
        }
    };

    inited() {
        this.dispatch('UI:thead-inited');
    }

    disposed() {
        this.tr = null;
    }

    updateSelectedState(type) {
        if (!this.tr) {
            return;
        }
        switch (type) {
            case 'all':
                this.tr.data.set('selected', true);
                this.tr.data.set('indeterminate', false);
                break;
            case 'indeterminate':
                this.tr.data.set('selected', false);
                this.tr.data.set('indeterminate', true);
                break;
            case 'none':
                this.tr.data.set('selected', false);
                this.tr.data.set('indeterminate', false);
                break;
        }
    }
}
