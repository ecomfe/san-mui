## Switch 开关

[开关 Switch](https://material.io/guidelines/components/selection-controls.html#selection-controls-switch) 允许用户在开关两个状态之间切换。

```san 简单的使用
<template>
    <div>
        <div class="switch-row">
            <sm-switch label="开关" onValue="{{value}}" class="demo-switch" on-input-change="handleChange($event)"/>
            <sm-switch label="默认为 true" value="{= inputValue =}" class="demo-switch"/>
            <sm-switch label="不可用" disabled class="demo-switch"/>
            <sm-switch label="文字在左边" labelLeft class="demo-switch"/>
        </div>
    </div>
</template>
<script>
import Switch from '../src/Switch';
import '../src/Switch/Switch.styl';
export default {

    components: {
        'sm-switch': Switch,
    },

    initData() {
        return {
            value: 'ON',
            inputValue: 'ON'
        };
    },

    attached() {
        this.watch('inputValue', val => {
            console.log(val);
        });
    },
    handleChange(e) {
        console.log(e);
    }
}
</script>
<style>
.switch-row {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    align-items: flex-start;
}

.switch-row .sm-switch {
    margin-bottom: 1rem;
}

.switch-row >p {
    padding: 1rem 0;
}

</style>
```

## API

### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|name|string|false||表单名|
|onValue|string|ON||开状态的返回值|
|offValue|string|OFF||关状态的返回值|
|label|string|false||标签|
|labelLeft|boolean|false|false|标签是否显示在左侧|
|labelClass|string|false||额外的标签样式类名|
|trackClass|string|||track 样式|
|thumbClass|string|||thumb 样式|
|disabled|boolean|false||禁止|
|value|string|false||控件值|

### 事件

|名称|描述|
|---|---|
|change|与 `input[type=radio]` 元素的change事件一致，参数change事件的事件对象|
|input-change|当`inputValue`发生改变的时候触发的事件，参数为 inputValue 的值|

### 插槽

无
