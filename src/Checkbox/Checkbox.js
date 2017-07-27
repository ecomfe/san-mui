/**
 * @file check component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san, {DataTypes} from 'san';
import icon from '../Icon';
import {CenterRipple} from '../Ripple';
import cx from 'classnames';

export default san.defineComponent({
    template: `
        <label
            on-click="handleClick"
            class="{{mainClass}}">
            <input type="checkbox"
                disabled="{{disabled}}"
                name="{{name}}"
                value="{{value}}"
                on-change="handleChange($event)"
                checked="{=checked=}">
            <div class="sm-checkbox-wrapper">
                <div
                    class="sm-checkbox-label {{labelClass}}"
                    san-if="label && labelLeft">
                    {{label}}
                </div>
                <div class="sm-checkbox-icon">
                    <sm-center-ripple class="sm-checkbox-ripple-wrapper" san-ref="ripple"></sm-center-ripple>
                    <svg
                        class="sm-checkbox-icon-uncheck sm-checkbox-svg-icon {{iconClass}}"
                        san-if="!checkedIcon"
                        viewBox="0 0 24 24">
                        <path
                            d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                    </svg>
                    <svg
                        class="sm-checkbox-icon-checked sm-checkbox-svg-icon {{iconClass}}"
                        san-if="!uncheckIcon"
                        viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <svg
                        class="sm-checkbox-icon-indeterminate sm-checkbox-svg-icon {{iconClass}}"
                        san-if="!checkedIcon && !uncheckIcon"
                        viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
                    </svg>
                    <sm-icon
                        san-if="uncheckIcon"
                        class="sm-checkbox-icon-uncheck {{iconClass}}">
                        {{uncheckIcon}}
                    </sm-icon>
                    <sm-icon
                        san-if="indeterminateIcon"
                        class="sm-checkbox-icon-indeterminate {{iconClass}}">
                        {{indeterminateIcon}}
                    </sm-icon>
                    <sm-icon
                        san-if="checkedIcon"
                        class="sm-checkbox-icon-checked {{iconClass}}">
                        {{checkedIcon}}
                    </sm-icon>
                </div>
                <div
                    class="sm-checkbox-label {{labelClass}}"
                    san-if="label && !labelLeft">{{label}}</div>
                </div>
        </label>
    `,
    components: {
        'sm-icon': icon,
        'sm-center-ripple': CenterRipple
    },
    initData() {
        return {
            name: '',
            value: 'ON',
            label: '',
            labelLeft: false,
            labelClass: '',
            uncheckIcon: '',
            checkedIcon: '',
            indeterminateIcon: 'icon',
            iconClass: '',
            checked: ['-1']
        };
    },
    dataTypes: {
        name: DataTypes.string,
        value: DataTypes.any,
        label: DataTypes.string,
        labelLeft: DataTypes.bool,
        labelClass: DataTypes.string,
        uncheckIcon: DataTypes.string,
        checkedIcon: DataTypes.string,
        indeterminateIcon: DataTypes.string,
        iconClass: DataTypes.string,
        checked: DataTypes.array,
        disabled: DataTypes.bool
    },
    computed: {
        mainClass() {
            return cx(
                'sm-checkbox',
                {
                    'label-left': this.data.get('labelLeft'),
                    'disabled': this.data.get('disabled'),
                    'no-label': !this.data.get('label')
                }
            );
        }
    },
    handleClick(e) {
        // 阻止事件冒泡，放置外部控制的时候触发两次 click
        if (!this.data.get('disabled')) {
            this.ref('ripple').click();
        }
    },
    handleChange(e) {

        // 修改表单元素的默认行为属性，使其可以在 click 时可以切换至 indeterminate 状态。
        if (this.data.get('canClickToSwitchToIndeterminate')) {

            // FIXME:
            // 防止我们设置的属性值某些情况下被浏览器的默认行为覆盖，不能立即执行这段代码。
            // 由于 iOS 下通过 MutationObserver 的 callback 并不能迫使函数在默认行为
            // 之后执行，所以暂时先用 setTimeout。
            setTimeout(() => {
                this.indeterminateIndex = ++[this.indeterminateIndex |= 0][0] % 3;
                this.data.set(
                    'checked',
                    this.indeterminateIndex !== 0
                        ? [this.data.get('value')]
                        : []
                );
                this.data.set('indeterminate', this.indeterminateIndex === 1);
                this.fire('change', this.indeterminateIndex);
            }, 0);

            return;

        }

        this.fire('change', e);

    },
    attached() {
        let input = null;
        this.watch('checked', value => {
            this.data.set('indeterminate', false);
            this.fire('input-change', value);
        });
        this.watch('indeterminate', value => {
            // FIXME:
            // https://www.w3.org/TR/html5/forms.html#dom-input-indeterminate
            // 由于 INPUT 元素的 DOM indeterminate property 并无对应的 HTML
            // attribute，暂时需要获取 INPUT 元素的实际 DOM 对象。
            input && (input.indeterminate = !!value);
        });

        // 初始化 indeterminate 状态。
        if (this.el) {
            input = this.el.querySelector('input');
            if (input) {
                input.indeterminate = !!this.data.get('indeterminate');
                if (!input.checked && !input.indeterminate) {
                    this.indeterminateIndex = 0;
                }
                if (input.checked && input.indeterminate) {
                    this.indeterminateIndex = 1;
                }
                if (input.checked && !input.indeterminate) {
                    this.indeterminateIndex = 2;
                }
            }
        }
    }
});
