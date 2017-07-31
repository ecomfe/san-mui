## Slider

[Slider 滑块控件](https://material.google.com/components/sliders.html) 可以让我们通过在连续或间断的区间内滑动锚点来选择一个合适的数值。

区间最小值放在左边，对应的，最大值放在右边。滑块可以在滑动条的左右两端设定图标来反映数值的强度。这种交互特性使得它在设置诸如音量、亮度、色彩饱和度等需要反映强度等级的选项时成为一种极好的选择。

示例

```san 简单使用
<template>
    <div>
        <h4>音量调整</h4>
        <san-slider
            value="{= value =}"
            min="{{0}}"
            max="{{100}}" />
        <p>当前音量: {{value}}</p>
    </div>
</template>

<script>
import Slider from '../src/Slider';
import '../src/Slider/Slider.styl';
export default {
    components: {
        'san-slider': Slider
    },
    initData() {
        return {
            value: 0
        };
    }
}
</script>
```


```san 设置最大值、最小值和步进值
<template>
    <div>
        <h4>期末考试预期分数（最多 100 分，最少 60 分，10 分一档）</h4>
        <san-slider
            value="{=value=}"
            min="{{60}}"
            max="{{100}}"
            step="{{10}}" />
        <p>预期分数: {{value}}</p>
    </div>
</template>

<script>
import Slider from '../src/Slider';
import '../src/Slider/Slider.styl';
export default {
    components: {
        'san-slider': Slider
    },
    initData() {
        return {
            value: 60
        };
    }
}
</script>
```

```san 禁用状态
<template>
    <div>
        <san-slider
            disabled
            value="{=value=}"
            min="{{60}}"
            max="{{100}}"
            step="{{10}}" />
        <p>预期分数: {{value}}</p>
    </div>
</template>

<script>
import Slider from '../src/Slider';
import '../src/Slider/Slider.styl';
export default {
    components: {
        'san-slider': Slider
    },
    initData() {
        return {
            value: 70
        };
    }
}
</script>
```

## API

### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|value|string|false||值|
|disabled|boolean|false||禁止|
|min|string\|number|false|0|最小值|
|max|string\|number|false|100|最大值|
|step|string\|number|false|1|步进值|

### 事件

|名称|描述|
|---|---|
|dragStart|拖动开始|
|dragStop|拖动结束|
|change|值发生变化|

### 插槽

无
