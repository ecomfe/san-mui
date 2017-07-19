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
            value: '10'
        }
    },
    handlerChange(value) {
        console.log(value);
    }

};
</script>
</script>
```
