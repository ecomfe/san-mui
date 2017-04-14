/**
 * @file Dialog component
 * @author zhouqinghuai@baidu.com
 */

import san from 'san';
import DialogLayer from './DialogLayer';

export default san.defineComponent({
    template: `
        <div class="sm-dialog" />
    `,
    initData() {
        return {
            title: 'this is a title!',
            open: false
        };
    },
    attached() {
        // console.log(this.slotChilds);
        this.layer = new DialogLayer();
        this.watch('open', value => {
            this.layer.data.set('open', value);
            this.layer.data.set('children', this.slotsChilds);
        });
        this.layer.watch('open', open => {
            this.data.set('open', open);
        });
        this.layer.attach(document.body);
    },
    detached() {
        if (this.layer) {
            this.layer.dispose();
        }
    }
});
