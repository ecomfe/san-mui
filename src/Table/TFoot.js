
import san from 'san';


export default class TFoot extends san.Component {
    static template = `<tfoot><slot></slot></tfoot>`;

    static messages = {
        'UI:tr-inited': function (e) {
            let tr = e.target;
            tr.data.set('pos', 'tfoot');
            tr.data.set('tableSelectable', this.data.get('tableSelectable'));
        }
    };

    inited() {
        this.dispatch('UI:tfoot-inited');
    }
}
