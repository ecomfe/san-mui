## Tooltip

[Tooltip](https://material.google.com/components/tooltips.html) 提示文字。当用户将鼠标悬停、点击于一个元素时出现。

示例

```san 使用示例
<template>
    <div>
        <h4>点击触发 tooltip 展开</h4>
        <div>
            <sm-tooltip title="我是一段tooltip" position="left">
                <sm-button>left</sm-button>
            </sm-tooltip>
            <sm-tooltip title="我是一段tooltip" position="right">
                <sm-button>right</sm-button>
            </sm-tooltip>
            <sm-tooltip title="我是一段tooltip" position="top">
                <sm-button>top</sm-button>
            </sm-tooltip>
            <sm-tooltip title="我是一段tooltip" position="bottom">
                <sm-button>bottom</sm-button>
            </sm-tooltip>
        </div>
        <h4>鼠标移入触发 tooltip 展开</h4>
        <div>
            <sm-tooltip title="我是一段tooltip" position="left" mode="hover">
                <sm-button>left</sm-button>
            </sm-tooltip>
            <sm-tooltip title="我是一段tooltip" position="right" mode="hover">
                <sm-button>right</sm-button>
            </sm-tooltip>
            <sm-tooltip title="我是一段tooltip" position="top" mode="hover">
                <sm-button>top</sm-button>
            </sm-tooltip>
            <sm-tooltip title="我是一段tooltip" position="bottom" mode="hover">
                <sm-button>bottom</sm-button>
            </sm-tooltip>
        </div>
    </div>
</template>
<script>
import Button from '../src/Button';
import Tooltip from '../src/Tooltip';

import '../src/Button/index.styl';
import '../src/Tooltip/index.styl';

export default {
    components: {
        'sm-button': Button,
        'sm-tooltip': Tooltip
    }
};
</script>
```

## API

### 属性

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
|open|bool|false|是否展开浮层|
|mode|string|click|交互模式，可选值有 `click` 和 `hover`|
|position|string|bottom|浮层展开位置，可选值有 `left` / `right` / `top` / `bottom`|
|maxWidth|number|null|浮层的最大宽度|
|maxHeight|number|null|浮层的最大高度|
|offset|number|8|浮层距离目标元素的位置偏移|

### 插槽

| 名称 | 描述 |
|---|---|
|default|tooltip浮层的触发元素|

### 事件
无
