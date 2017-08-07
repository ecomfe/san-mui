## ColorPicker 

`ColorPicker`组件，用于选取颜色，支持hex和rgba两种格式。

#### 示例

默认情况下不开启透明度选择，此时颜色格式为hex模式。

```san 基本用法 
<template>
    <div>
        <san-color-picker
            color="{=color=}"
            alpha="{{alpha}}"
        />
        <div>所选择的颜色为: {{color}}</div>
    </div>
</template>

<script>
import ColorPicker from '../src/ColorPicker';
import '../src/ColorPicker/ColorPicker.styl';
export default {
    components: {
        'san-color-picker': ColorPicker 
    },
    initData() {
        return {
            color: '#abcdef', 
            alpha: false 
        };
    }
}
</script>
```

同时还支持有透明度的颜色选择，此时颜色代码格式为rgba模式。

```san 透明度模式
<template>
    <div>
        <san-color-picker
            color="{=color=}"
            alpha="{{alpha}}"
        />
        <div>所选择的颜色为: {{color}}</div>
    </div>
</template>

<script>
import ColorPicker from '../src/ColorPicker';
import '../src/ColorPicker/ColorPicker.styl';
export default {
    components: {
        'san-color-picker': ColorPicker 
    },
    initData() {
        return {
            color: 'rgba(233, 16, 55, 0.5)',
            alpha: true
        };
    }
}
</script>
```



## API

### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| color | String | #ffffff | 所选颜色值，如果不传，默认情况下为#ffffff |
| alpha | Boolean | false | 是否使用透明度 |
 
### Events

| 名称 | 描述|
| --- |   --- |
| color-change | 颜色值改变时候触发 |

