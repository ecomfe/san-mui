## Radio 单选框

[单选框 Radio](https://material.io/guidelines/components/selection-controls.html#selection-controls-radio-button) 允许用户从一个数据集中选择一个选项。

```san 简单的使用
<template>
    <div>
        <div class="radio-row">
            <sm-radio
                label="单选 1"
                name="group"
                value="simple1"
                on-input-change="handleChange($event)"
                checked="simple1"
                class="demo-radio"/>
            <sm-radio
                label="单选 2"
                name="group"
                value="simple2"
                class="demo-radio"/>
            <sm-radio
                label="自定义icon"
                name="group"
                value="simple3"
                class="demo-radio"
                uncheckIcon="favorite_border"
                checkedIcon="favorite"/>
            <sm-radio
                label="不可用"
                class="demo-radio"
                name="disabled"
                disabled
                value="dd"/>
            <sm-radio
                label="不可用"
                class="demo-radio"
                name="disabled"
                disabled
                checked="{= initValue =}"
                value="tt"/>
            <sm-radio
                label="文字在左边的"
                class="demo-radio"
                value="test"
                labelLeft/>
        </div>
    </div>
</template>
<script>
import Radio from '../src/Radio';
import '../src/Radio/Radio.styl';
export default {

    components: {
        'sm-radio': Radio,
    },

    initData() {
        return {
            value: 'ON',
            inputValue: ['ON'],
            initValue: 'tt'
        };
    },

    attached() {
        this.watch('initValue', val => {
            console.log(val);
        });
    },
    handleChange(e) {
        console.log(e);
    }
}
</script>
<style>
.radio-row {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    align-items: flex-start;
}

.radio-row .sm-radio {
    margin-bottom: 1rem;
}

.radio-row >p {
    padding: 1rem 0;
}

</style>
```

## API

### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|name|string|false||表单名|
|value|string|false||值|
|disabled|boolean|false||禁止|
|label|string|false||标签|
|labelLeft|boolean|false|false|标签是否显示在左侧|
|labelClass|string|false||额外的标签样式类名|
|uncheckIcon|string|false||自定义未勾选icon|
|checkedIcon|string|false||自定义已勾选icon|
|iconClass|string|false||额外的icon样式类名|
|checked|string|false||控件值|

### 事件

|名称|描述|
|---|---|
|change|与 `input[type=radio]` 元素的change事件一致，参数change事件的事件对象|
|input-change|当`checked`发生改变的时候触发的事件，参数为 checked 的值|

### 插槽

无
