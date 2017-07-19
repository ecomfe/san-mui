## InputNumber

### 计数器功能


#### 示例

``` san 基础用法
<template>
    <div>
        <san-input-number></san-input-number>
    </div>
</template>
<script type="text/javascript">
import InputNumber from '../src/InputNumber/InputNumber'
export default {
    components: {
        'san-input-number': InputNumber
    }
};
</script>
```

``` san 禁用状态
<template>
    <div>
        <san-input-number disabled="{{disabled}}"></san-input-number>
    </div>
</template>
<script type="text/javascript">
import InputNumber from '../src/InputNumber/InputNumber'
export default {
    components: {
        'san-input-number': InputNumber
    },
    initData() {
        return {
            disabled: true
        }
    }
};
</script>
```

``` san 额外提供了 large、small 两种尺寸的数字输入框
<template>
    <div>
        <san-input-number style="float: left; margin-right: 15px;" size="{{smallSize}}"></san-input-number>
        <san-input-number 
            size="{{largeSize}}"></san-input-number>
    </div>
</template>
<script type="text/javascript">
import InputNumber from '../src/InputNumber/InputNumber'
export default {
    components: {
        'san-input-number': InputNumber
    },
    initData() {
        return {
            smallSize: 'small',
            largeSize: 'large',
            
        }
    }
}
</script>
```

``` san 允许定义递增递减数值控制
<template>
    <div>
        <san-input-number
        step="{{step}}"
        max="{{max}}"
        min="{{min}}"
        value="{{value}}"
        on-change="handlerChange($event)"></san-input-number>
    </div>
</template>
<script type="text/javascript">
import InputNumber from '../src/InputNumber/InputNumber'
export default {
    components: {
        'san-input-number': InputNumber
    },
    initData() {
        return {
            step: 3,
            max: 10,
            min: 0,
            value: 10
        }
    },
    handlerChange(value) {
        console.log(value);
    }

};
</script>
```

## API

### InputNumber Attributes

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| value| number | 0 | 当前计数器绑定值 |
| min| number | -Infinity | 当前计数器允许的最小值|
| max | number | Infinity| 当前计数器允许的最大值|
| step | number | 1 | 计数器增加或减少的值 |
| size | string | - | 计数器的尺寸可选值large、small默认为正常 |
|disabled| boolean | false | 是否禁用计数器|

### InputNumber Events
| 事件名称 | 说明 | 回调参数|
| --- | --- | --- |
| change | 计数器当前value改变时触发 | 当前计数器的value值 |