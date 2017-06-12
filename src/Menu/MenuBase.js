/**
 * @file Menu Base
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';

export default san.defineComponent({
    defaultData() {
        return {
            open: false,
            disabled: false,
            multiple: false,
            autoWidth: true,
            itemClickClose: true,
            useLayerForClickAway: false,
            maxHeight: 500,
            className: 'menu-' + Math.floor(Math.random() * Date.now() + 1),
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            },
            targetOrigin: {
                vertical: 'top',
                horizontal: 'left'
            },
            zIndex: 101
        };
    },
    filters: {
        yesToBe(value, className) {
            return value ? className : '';
        }
    },
    inited() {
        this.transBoolean('all');
        this.transBoolean('open');
        this.transBoolean('multiple');
        this.transBoolean('disabled');
        this.transBoolean('autoWidth');
        this.transBoolean('itemClickClose');
        this.transBoolean('openImmediately');
        this.transBoolean('useLayerForClickAway');

        this.items = [];
        this.values = [];
        this.name = 'menu';
    },
    created() {
        this.handleClickOff = this.handleClickOff.bind(this);
        this.close = this.close.bind(this);
    },
    messages: {
        'UI:menu-item-selected'(arg) {
            let value = arg.value.value;
            let selectValue = this.data.get('value');

            // 多选
            if (this.data.get('multiple')) {

                let len = selectValue.length;
                let hasSelected = false;

                while (len--) {
                    if (selectValue[len] === value) {
                        selectValue.splice(len, 1);
                        hasSelected = true;
                        break;
                    }
                }

                if (!hasSelected) {
                    selectValue.push(value);
                }
            }
            // 单选
            else {
                selectValue = value;
            }

            this.data.set('value', selectValue);
            this.broadcast(selectValue);

            // 触发owner的onChange
            this.fire('change', this.sortValues());
            // 收起menu
            this.toggleMenu(arg.value.evt, true, 'ITEM');
        },
        'UI:menu-item-selected-text'(arg) {
            this.data.set('text', arg.value);
        },
        'UI:menu-item-attached'(arg) {
            this.items.push(arg.target);
            this.values.push(arg.target.data.get('value'));
            // 没有value默认填充第一个item的值
            arg.target.data.set('selectValue', this.data.get('value') || this.items[0].data.get('value'));
        },
        'UI:menu-item-detached'(arg) {
            let len = this.items.length;

            while (len--) {
                if (this.items[len] === arg.target) {
                    this.items.splice(len, 1);
                }
            }
        },
        'UI:menu-panel-attached'(arg) {
            arg.target.parentMenu = `${this.data.get('className')} sm-${this.data.get('type')}-menu`;
        },
        'UI:menu-panel-status-changed'(arg) {
            let value = arg.value;
            this.toggleMenu(null, !value.open, value.driver);
        },
        'UI:menu-open'(arg) {
            arg.value && (this.toggleAction = 1);
        }
    },
    bindEvent() {
        // 点击menu外位置隐藏menu
        document.addEventListener('click', this.handleClickOff);

        this.watch('all', () => {
            let selectValue = this.data.get('all') ? this.values : [];

            this.data.set('value', selectValue);
            this.broadcast(selectValue);
            this.fire('change', selectValue);            
        });

        this.watch('value', () => {
            this.broadcast(this.data.get('value'));         
        });
    },
    /**
     * 通过改变为每一个menu item的selectValue值，改变其已选状态
     *
     * @param {string} selectValue selectValue
     */
    broadcast(selectValue) {
        let len = this.items.length;
        while (len--) {
            this.items[len].data.set('selectValue', selectValue);
        }
    },
    handleClickOff(e) {
        if (!this.toggleAction) {
            return;
        }
        this.toggleAction--;

        this.toggleMenu(null, true, 'BODY');
    },

    /**
     * menu开关toggle
     *
     * @param {Object} evt event
     * @param {boolean} toClose 是否关闭menu
     * @param {string} driver 开关驱动者
     */
    toggleMenu(evt, toClose, driver) {
        evt && evt.stopPropagation();

        if (this.data.get('disabled')) {
            return;
        }

        let open = !this.data.get('open');
        if (typeof toClose !== 'undefined') {
            open = !toClose;
        }
        if (!open && driver === 'ITEM' && this.data.get('itemClickClose') === false) {
            return;
        }

        this.beforeToggleMenu && this.beforeToggleMenu();

        this.data.set('open', open);
        if (!open) {
            this.fire('close');
        }
        else {
            for (let child of this.owner.childs) {
                if (child.name === 'menu' && child.id !== this.id) {
                    child.close();
                }
            }
        }
    },
    close() {
        this.toggleMenu(null, true);
    },
    sortValues() {
        let value = this.data.get('value');
        if (!this.data.get('multiple')) {
            return value;
        }

        let values = this.values.slice(0);
        let selectValue = value || [];
        let len = values.length;

        while (len--) {
            if (selectValue.indexOf(values[len]) === -1) {
                values.splice(len, 1);
            }
        }

        this.data.set('value', values);
        return values;
    },
    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value === 'false' ? false : !!value);
    },
    disposed() {
        document.removeEventListener('click', this.handleClickOff);
    }
});
