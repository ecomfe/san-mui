/**
 * @file TreeViewItem
 * @author Lu Yuan(luyuan.china@gmail.com)
 */

import san from 'san';
import { TouchRipple, CenterRipple } from '../Ripple';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import { Highlight } from './highlight';
import { TreeViewItem } from '../TreeView';

export default san.defineComponent({

    template: `
        <div class="sm-tree-view-item {{itemClass}} {{selectedClass}}
                    {{hasSecondaryTextClass}}"
            on-click="toggleTreeView($event)"
            style="{{itemStyle}}"
        >
            <san-touch-ripple san-if="!disableRipple && !disabled"
                style="{{touchRippleStyle}}"
                class="{{selectedClass}} {{hiddenClass}}"
            ></san-touch-ripple>

            <div class="sm-tree-view-item-content {{selectedClass}}
                        {{hiddenClass}}"
                style="{{itemContentStyle}}"
            >
                <div class="sm-tree-view-item-left">
                    <slot name="left"></slot>
                </div>
                <san-checkbox
                    san-if="hasCheckbox"
                    san-ref="checkbox"
                    nativeValue="{{checkboxValue}}"
                    disabled="{{disabled}}"
                    inputValue="{=checkboxInputValue=}"
                    indeterminate="{=checkboxIndeterminate=}"
                    on-change="checkboxChanged($event)"
                    on-click="checkboxClicked($event)"
                />
                <p class="sm-tree-view-item-primary-text"
                    san-if="primaryText"
                >{{ treeData ? treeData.text : primaryText }}</p>
                <p class="sm-tree-view-item-secondary-text"
                    style="{{secondaryTextStyle}}"
                    san-if="secondaryText"
                >{{ treeData ? treeData.secondaryText : secondaryText | raw }}
                </p>
                <div class="sm-tree-view-item-right" san-if="!toggleNested">
                    <slot name="right"></slot>
                </div>
            </div>
            <div
                class="sm-tree-view-item-expand {{selectedClass}}
                       {{hiddenClass}}"
                san-if="toggleNested"
                on-click="toggleTreeView($event, 'EXPAND', false, true)"
                style="{{expandStyle}}"
            >
                <san-icon>arrow_drop_{{ open | treeViewOpenIcon }}</san-icon>
                <san-center-ripple />
            </div>
            <div class="sm-tree-view-item-nested {{ open | treeViewOpen }}"
                style="{{nestedTreeViewStyle}}"
            >
                <slot name="nested" san-if="!initFromData"></slot>
                <san-tree-view-item
                    san-else
                    san-for="item in treeData.treeData"
                    treeData="{{item}}"
                    initiallyOpen="{{initiallyOpen}}"
                    initFromData
                >
                </san-tree-view-item>
            </div>
        </div>
    `,

    defaultData() {
        return {
            itemIndex: 0,
            disabled: false,
            hidden: false,
            selected: false,
            disableRipple: false,
            primaryTogglesNestedTreeView: true,
            initiallyOpen: false,
            checked: null,
            hasCheckbox: false,
            initFromData: false
        };
    },

    components: {
        'san-touch-ripple': TouchRipple,
        'san-center-ripple': CenterRipple,
        'san-checkbox': Checkbox,
        'san-icon': Icon,
        'san-tree-view-item': 'self'
    },

    messages: {
        'UI:nested-counter'(arg) {
            let target = arg.value;
            target.set('nestedLevel', target.get('nestedLevel') + 1);
            this.dispatch('UI:nested-counter', target);
        },
        'UI:tree-view-item-hidden'(arg) {
            let childHidden = arg.value;
            this.data.set('hidden', childHidden && this.data.get('hidden'));
        },
        'UI:expand-parent-tree-view-item'(arg) {
            if (typeof arg.value === 'object') {
                if (arg.value.old === ''
                    && this.data.get('lastExpandingState') === null) {
                    this.data.set('lastExpandingState', this.data.get('open'));
                }
            }
            this.toggleTreeView(document.createEvent('MouseEvent'), '',
                true, false);
        },
        'UI:query-checkbox-attribute'(arg) {
            let target = arg.target;
            if (typeof target.data.get('checked') === 'boolean') {
                return;
            }
            target.data.set('checked', this.data.get('checked'));
        },
        'UI:query-init-from-data'(arg) {
            let target = arg.target;
            if (target.data.get('initFromData') === undefined) {
                target.data.set('initFromData', this.data.get('initFromData'));
            }
        },
        'UI:update-parent-checkbox-state'(arg) {
            this.updateCheckboxStateFromChildren();
        }
    },

    initData() {
       return {
            nestedLevel: 1,
            children: 0,
            secondaryTextLines: 1,
            lastExpandingState: null,
            checkboxValue: 'ON',
            checkboxInputValue: [],
            checkboxIndeterminate: false
        };
    },

    filters: {
        treeViewOpenIcon(open) {
            return open ? 'down' : 'up';
        },
        treeViewOpen(open) {
            return open ? '' : 'hide';
        }
    },

    computed: {
        itemStyle() {
            return {
                'margin-left': this.data.get('nestedLevel') === 1
                    ? 0
                    : this.data.get('rippleMarginLeft') + 'px'
            };
        },
        itemContentStyle() {
            let paddingLeftHasLeft =
                this.data.get('compact') ? '32px' : '64px';
            let paddingLeftWithoutLeft =
                this.data.get('compact') ? '6px' : '16px';
            return {
                'margin-left': this.data.get('contentMarginLeft') + 'px',
                'padding-left': this.data.get('hasLeft')
                    ? paddingLeftHasLeft
                    : paddingLeftWithoutLeft
            };
        },
        expandStyle() {
            return {
                'transform': this.data.get('open')
                    ? 'rotate(0)'
                    : 'rotate(90deg)'
            }
        },
        touchRippleStyle() {
            let level = this.data.get('nestedLevel');
            let leftNormal = this.data.get('wholeLineSelected')
                ? ((1 - level) * this.data.get('rippleMarginLeft'))
                : this.data.get('contentMarginLeft');
            let leftCompact = this.data.get('wholeLineSelected')
                ? ((1 - level) * this.data.get('rippleMarginLeft'))
                : this.data.get('contentMarginLeft');
            if (!leftNormal || !leftCompact) {
                return;
            }

            return {
                'left': this.data.get('compact')
                    ? leftCompact + 'px'
                    : leftNormal + 'px'
            }
        },
        selectedClass() {
            return this.data.get('selected') ? 'selected': '';
        },
        hiddenClass() {
            return this.data.get('hidden') ? 'hidden' : '';
        },
        hasSecondaryTextClass() {
            return this.data.get('secondaryText') ? 'hasSecondaryText' : '';
        },
        itemClass() {
            return (this.data.get('disabled') ? 'disabled ' : '')
                + (this.data.get('toggleNested') ? 'nested ' : '')
                + (this.data.get('compact') ? 'compact' : '');
        },
        secondaryTextStyle() {
            return {
                //'-webkit-line-clamp': this.data.get('secondaryTextLines')
            }
        }
    },

    inited() {
        this.transBoolean('disabled');
        this.transBoolean('hidden');
        this.transBoolean('toggleNested');
        this.transBoolean('disableRipple');
        this.transBoolean('primaryTogglesNestedTreeView');
        this.transBoolean('initiallyOpen');
        this.data.set('open', this.data.get('initiallyOpen'));

        this.dispatch('UI:nested-counter', this.data);

        this.dispatch('UI:query-compact-attribute');
        this.dispatch('UI:query-whole-line-selected-attribute');
        this.dispatch('UI:query-keeping-selected-attribute');

        this.dispatch('UI:query-init-from-data');

        this.data.set('checked', this.transChecked(this.data.get('checked')), {
            silence: true
        });

        this.dispatch('UI:query-checkbox-attribute');

        if (this.data.get('treeData')) {
            this.initFromTreeData(this.data.get('treeData'));
        }

        this.watch('checked', (value) => {
            let checked = value;
            this.data.set('hasCheckbox', typeof checked === 'boolean');
            this.data.set('checkboxInputValue',
                checked ? [this.data.get('checkboxValue')] : ['']);
        });
    },

    attached() {
        let slotChilds = this.slotChilds;
        let hasLeft = 0;

        for (let slot of slotChilds) {
            if (slot.name === 'left' || slot.name === 'leftAvatar') {
                hasLeft++;
            }
        }

        this.data.set('hasLeft', hasLeft > 0);

        this.watch('selected', value => {
            this.fire('selectedToggle', value);
        });

        this.watch('hidden', value => {
            this.fire('hiddenToggle', value);
        });

        this.watch('checkboxInputValue', value => {
            if (!this.data.get('initFromData')) {
                return;
            }
            this.data.set('treeData.checked',
                value && value.toString() !== '', {
                    silence: true
                }
            );
            this.dispatch('UI:update-parent-checkbox-state');
        });

        this.watch('checkboxIndeterminate', value => {
            this.data.set('treeData.indeterminate', value);
        });

        this.watch('treeData.checked', value => {
            this.data.set('checkboxInputValue',
                value ? [this.data.get('checkboxValue')] : ['']);
        });

        this.watch('treeData', value => {
            //this.clearSelectedClass(false);
        });

        this.checkboxChanged();
        this.dispatch('UI:update-parent-checkbox-state');

        this.dispatch('UI:tree-view-item-attached', this);
    },

    detached() {
        this.dispatch('UI:tree-view-item-detached', this);
    },

    created() {
       if (!this.data.get('treeData')) {
            this.generateTreeData();
        }
    },

    disposed() {
    },

    toggleTreeView(evt, driver, forceOpen = false, forceSelected = true) {
        evt.stopPropagation();

        if (this.data.get('disabled')) {
            return;
        }
        this.fire('click', { event: evt, comp: this });

        (driver === 'EXPAND' || forceSelected) && this.toggleRipple();
        if (driver !== 'EXPAND' && !forceOpen
                && !this.data.get('primaryTogglesNestedTreeView')
                || (evt && evt.target && (evt.target.tagName === 'INPUT'
                                       || evt.target.tagName === 'LABEL'))) {
            return;
        }

        let open = this.data.get('open');
        this.data.set('open', forceOpen ? true : !open);

        this.fire('nestedTreeViewToggle', open);
        this.dispatch('UI:nested-item-toggle', this);
    },

    checkboxChanged(value) {
        this.updateChildCheckboxState(this.data.get('treeData'));
    },

    checkboxClicked(inputValue) {
    },

    clearSelectedClass(send) {
        this.data.get('selected') === true
            && this.data.set('selected', false);
        send && this.dispatch('UI:clear-selected-item');
    },

    toggleRipple() {
        if (this.data.get('keepingSelected')) {
            if (this.data.get('selected')
                && !this.data.get('primaryTogglesNestedTreeView')) {
                return;
            }
            this.clearSelectedClass(true);
            this.data.set('selected', true);
            this.dispatch('UI:record-selected-item');
        }
    },

    highlight(word, input, backColor = 'coral', foreColor = 'white') {
        let el = this.el;
        if (!el) {
            return;
        }
        let contentSelector = '.sm-tree-view-item-content';
        let primaryTextSelector = 'p.sm-tree-view-item-primary-text';
        let secondaryTextSelector = 'p.sm-tree-view-item-secondary-text';
        let primary =
            el.querySelector(contentSelector + '>' + primaryTextSelector);
        let secondary =
            el.querySelector(contentSelector + '>' + secondaryTextSelector);

        if (typeof word === 'string' && word !== '') {
            Highlight.highlight(primary, word, input, backColor, foreColor);
            Highlight.highlight(secondary, word, input, backColor, foreColor);
        } else {
            Highlight.unhighlight(primary, input);
            Highlight.unhighlight(secondary, input);
        }
    },

    updateCheckboxStateFromChildren(data) {
        !data && (data = this.data.get('treeData'));
        if (!data || !(data instanceof Object) || !data.treeData
            || !(data.treeData instanceof Array)) {
            return;
        }
        let checked = data.checked;
        let subChecked;
        let subIndeterminate = false;
        let count = 0;
        data.treeData.forEach((function (item, index) {
            if (item.checked !== undefined
                && typeof item.checked !== 'boolean') {
                return;
            }
            if (item.checked === undefined) {
                this.data.set(
                    'treeData.treeData[' + index + '].checked', checked);
            }
            if (subChecked === undefined) {
                subChecked = item.checked << count;
            } else {
                subChecked |= item.checked << count;
            }
            subIndeterminate |= !!item.indeterminate;
            count++;
        }).bind(this));
        this.data.set('treeData.checked', subChecked === (1 << count) - 1, {
            silence: false
        });
        this.data.set('checkboxIndeterminate',
            (subChecked > 0 && subChecked < (1 << count) - 1)
                || subIndeterminate);
        this.dispatch('UI:update-parent-checkbox-state');
    },

    updateChildCheckboxState(data, level, parentIndex) {
        if (!data || !(data instanceof Object) || !data.treeData
            || !(data.treeData instanceof Array)) {
            return;
        }
        level |= 0;
        data.treeData.forEach((function (item, index) {
            if (item.checked !== undefined
                && typeof item.checked !== 'boolean') {
                return;
            }
            let namespace = 'treeData.';
            for (let i = 0; i < level; i++) {
                namespace += 'treeData[' + parentIndex + '].'
            }
            this.data.set(namespace + 'treeData[' + index + '].checked',
                data.checked);
            this.updateChildCheckboxState(item, level + 1, index);
        }).bind(this));
    },

    initFromTreeData(data) {
        !data && (data = this.data.get('treeData'));
        if (!data || !(data instanceof Object)) {
            return;
        }
        this.data.set('toggleNested', data.treeData);
        this.data.set('primaryText', data.text);
        this.data.set('secondaryText', data.secondaryText);
        this.data.set('open', data.treeData && data.treeData.length > 0);
        this.data.set('checked', this.transChecked(data.checked), {
            silence: true
        });
        if (typeof this.data.get('checked') === 'boolean') {
            this.data.set('hasCheckbox', true);
            this.data.set('checkboxInputValue',
                this.data.get('checked')
                    ? [this.data.get('checkboxValue')]
                    : [],
                        {
                            silence: true
                        }
            );
            this.updateCheckboxStateFromChildren(data);
        } else {
            this.data.set('hasCheckbox', false);
        }
    },

    generateTreeData() {
        let data = {
            text: this.data.get('primaryText'),
            secondaryText: this.data.get('secondaryText'),
            checked: this.data.get('checked')
        }
        this.data.set('treeData', data, {
            silence: true
        });
        let checked = this.data.get('checked');
        this.data.set('hasCheckbox', typeof checked === 'boolean');
        this.data.set('checkboxInputValue',
            checked ? [this.data.get('checkboxValue')] : ['']);
    },

    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value !== undefined);
    },

    transChecked(value) {
        if (typeof value !== 'string') {
            return value;
        }
        switch (value) {
            case 'true':
            case 'checked':
                return true;
            case 'false':
                return false;
            case 'null':
                return null;
            case 'undefined':
            default:
                return undefined;
        }
    }
});
