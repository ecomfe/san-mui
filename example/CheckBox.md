## Checkbox 复选框

[复选框 Checkbox](https://material.google.com/components/selection-controls.html#selection-controls-checkbox) 允许用户从一个数据集中选择多个选项。

```san 简单的使用
<template>
    <div>
        <div class="checkbox-row">
            <sm-checkbox
                label="最简单的"
                value="{{value}}"
                class="demo-checkbox"
                on-input-change="handleChange($event)"
                checked="{=inputValue=}"/>
            <sm-checkbox
                label="自定义icon"
                class="demo-checkbox"
                uncheckIcon="favorite_border"
                checkedIcon="favorite" />
            <sm-checkbox
                label="不同的图形的icon"
                class="demo-checkbox"
                uncheckIcon="visibility_off"
                checkedIcon="visibility" />
            <sm-checkbox
                label="不可用"
                class="demo-checkbox"
                disabled />
            <sm-checkbox
                label="不可用"
                nativeValue="{{value}}"
                class="demo-checkbox"
                disabled
                checked="{=inputValue=}"/>
            <sm-checkbox label="文字在左边的" class="demo-checkbox" labelLeft/>
        </div>
    </div>
</template>
<script>
import Checkbox from '../src/Checkbox';
import Button from '../src/Button';
import '../src/Checkbox/Checkbox.styl';
export default {
    components: {
        'sm-checkbox': Checkbox,
        'sm-button': Button
    },
    initData() {
        return {
            value: 'ON',
            inputValue: ['ON']
        };
    },
    click(e) {
        let v = this.data.get('inputValue');
        this.data.set(
            'inputValue',
            !v || v.length === 0 || v[0] === '' ? [this.data.get('value')] : ['']
        );
    },
    handleChange(e) {
        console.log(e);
    }
};
</script>
<style>
.checkbox-row {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    align-items: flex-start;
}

.checkbox-row .sm-checkbox {
    margin-bottom: 1rem;
}

.checkbox-row >p {
    padding: 1rem 0;
}

</style>
```

现在CheckBox组件支持了数字与字符串两种输入。能够满足更多样的业务场景

```san 支持两种类型的value值
<template>
    <div>
        <div class="checkbox-row">
            <sm-checkbox
                label="字符串1"
                value="{{value1}}"
                class="demo-checkbox"
                checked="{=inputValue=}"/>
            <sm-checkbox
                label="字符串2"
                value="{{value2}}"
                class="demo-checkbox"
                checked="{=inputValue=}"/>
            <sm-checkbox
                label="数字1"
                value="{{value3}}"
                class="demo-checkbox"
                checked="{=inputValue2=}"/>
            <sm-checkbox
                label="数字2"
                value="{{value4}}"
                class="demo-checkbox"
                checked="{=inputValue2=}"/>
        </div>
        <div class="checkbox-bind-value">
            <p><span s-for="item in inputValue">"{{item}}"</span></p>
            <p><span s-for="item in inputValue2">{{item}}</span></p>
        </div>
    </div>
</template>
<script>
import Checkbox from '../src/Checkbox';
export default {
    components: {
        'sm-checkbox': Checkbox
    },
    initData() {
        return {
            value1: '1',
            value2: '2',
            inputValue: ['1', '2'],
            inputValue2: [1, 2],
            value3: 1,
            value4: 2
        };
    }
};
</script>
<style>
.checkbox-bind-value p span {
    margin: 0 5px;
}
</style>
```

除了 `勾选` 和 `未勾选` 两个状态，我们还支持 `不定` 状态 `indeterminate`。

```san 不确定状态
<template>
    <div class="checkbox-row">
        <p>这里我们可以通过属性 indeterminate 来指定是否启用不定状态</p>
        <sm-checkbox
            label="不确定"
            nativeValue="{{value}}"
            class="demo-checkbox"
            checked="{=inputValue=}"
            indeterminate="{=indeterminate=}"/>
        <sm-button
            variants="raised info"
            on-click="toggleIndeterminate">
            Toggle indeterminate
        </sm-button>

        <p>也可以将不定状态也包含在点击处理中</p>

        <sm-checkbox
            label="不定状态参与交互"
            canClickToSwitchToIndeterminate />

        <p>通过 indeterminateIcon 来指定不定状态的 icon</p>
        <sm-checkbox
            label="不定状态 icon"
            canClickToSwitchToIndeterminate
            uncheckIcon="battery_alert"
            indeterminateIcon="battery_unknown"
            checkedIcon="battery_charging_full" />

    </div>
</template>
<script>
import Checkbox from '../src/Checkbox';
import Button from '../src/Button';
import '../src/Checkbox/Checkbox.styl';
export default {
    components: {
        'sm-checkbox': Checkbox,
        'sm-button': Button
    },
    initData() {
        return {
            value: 'ON',
            inputValue: ['ON']
        };
    },
    toggleIndeterminate() {
        this.data.set('indeterminate', !this.data.get('indeterminate'));
    }
};
</script>
```

## API

### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|name|string|false||表单名|
|value|string|false||input 值|
|disabled|boolean|false||禁止|
|label|string|false||标签|
|labelLeft|boolean|false|false|标签是否显示在左侧|
|labelClass|string|false||额外的标签样式类名|
|uncheckIcon|string|false||自定义未勾选icon|
|checkedIcon|string|false||自定义已勾选icon|
|indeterminateIcon|string|false||自定义不确定icon|
|iconClass|string|false||额外的icon样式类名|
|checked|Array\<string\>|false||控件值|
|indeterminate|boolean|false|false|是否有不确定状态|
|canClickToSwitchToIndeterminate|boolean|false|false|不定状态是否参与点击交互|

### 事件

|名称|描述|
|---|---|
|change|与 `input[type=checkbox]` 元素的change事件一致，参数为change事件的事件对象|
|input-change|当`inputValue`发生改变的时候触发的事件，参数为 inputValue 的值|

### 插槽

无
