## Grid

栅格布局，参考 [iviewui](https://www.iviewui.com/components/grid) 栅格布局，使用同 iviewui，响应式布局暂时未支持


示例

```san 24 列栅格布局基本使用
<template>
    <div>
        <san-row>
            <san-col span="12">col-12</san-col>
            <san-col span="12">col-12</san-col>
        </san-row>
        <san-row>
            <san-col span="8">col-8</san-col>
            <san-col span="8">col-8</san-col>
            <san-col span="8">col-8</san-col>
        </san-row>
        <san-row>
            <san-col span="6">col-6</san-col>
            <san-col span="6">col-6</san-col>
            <san-col span="6">col-6</san-col>
            <san-col span="6">col-6</san-col>
        </san-row>
    </div>
</template>
<script>
import {Row, Col} from '../src/Grid';
import '../src/Grid/Grid.styl';
export default {
    components: {
        'san-row': Row,
        'san-col': Col
    }
}
</script>
<style lang="stylus">
.sm-col,
.sm-col>div
    color: #fff
    padding: 10px 0
    text-align: center
    background: rgba(0, 153, 229, .9)
    &:nth-child(odd)
        background: rgba(0, 153, 229, .7)

.sm-row
    margin: .5rem 0;
    &-gutter .sm-col
        background: transparent
</style>
```

```san 设置 gutter
<template>
    <div>
        <san-row gutter="{{16}}">
            <san-col span="6"><div>col-12</div></san-col>
            <san-col span="6"><div>col-12</div></san-col>
            <san-col span="6"><div>col-12</div></san-col>
            <san-col span="6"><div>col-12</div></san-col>
        </san-row>
    </div>
</template>
<script>
import {Row, Col} from '../src/Grid';
import '../src/Grid/Grid.styl';
export default {
    components: {
        'san-row': Row,
        'san-col': Col
    }
}
</script>
```

```san 使用 pull/push 进行栅格排序
<template>
    <div>
        <san-row>
            <san-col span="18" push="6">col-18 | push-6</san-col>
            <san-col span="6" pull="18">col-6 | pull-18</san-col>
        </san-row>
    </div>
</template>
<script>
import {Row, Col} from '../src/Grid';
import '../src/Grid/Grid.styl';
export default {
    components: {
        'san-row': Row,
        'san-col': Col
    }
}
</script>
```

```san 使用 offset 进行栅格偏移
<template>
    <div>
        <san-row>
            <san-col span="8">col-8</san-col>
            <san-col span="8" offset="8">col-8 | offset-8</san-col>
        </san-row>
        <san-row>
            <san-col span="6" offset="8">col-6 | offset-8</san-col>
            <san-col span="6" offset="4">col-6 | offset-4</san-col>
        </san-row>
        <san-row>
            <san-col span="12" offset="8">col-12 | offset-8</san-col>
        </san-row>
    </div>
</template>
<script>
import {Row, Col} from '../src/Grid';
import '../src/Grid/Grid.styl';
export default {
    components: {
        'san-row': Row,
        'san-col': Col
    }
}
</script>
```


```san 使用 flex 布局
<template>
    <div>
        <san-row type="flex">
            <san-col span="6" order="4">1 | order-4</san-col>
            <san-col span="6" order="3">2 | order-3</san-col>
            <san-col span="6" order="2">3 | order-2</san-col>
            <san-col span="6" order="1">4 | order-1</san-col>
        </san-row>
        <h3>使用 flex 布局 - 子元素向左排列</h3>
        <san-row tyh3e="flex" justify="start" class="code-row-bg">
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
        </san-row>
        <h3>使用 flex 布局 - 子元素向右排列</h3>
        <san-row type="flex" justify="end" class="code-row-bg">
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
        </san-row>
        <h3>使用 flex 布局 - 子元素居中排列</h3>
        <san-row type="flex" justify="center" class="code-row-bg">
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
        </san-row>
        <h3>使用 flex 布局 - 子元素等宽排列</h3>
        <san-row type="flex" justify="space-between" class="code-row-bg">
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
        </san-row>
        <h3>使用 flex 布局 - 子元素分散排列</h3>
        <san-row type="flex" justify="space-around" class="code-row-bg">
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
            <san-col span="4">col-4</san-col>
        </san-row>
        <h3>使用 flex 布局 - 顶部对齐</h3>
        <san-row type="flex" justify="center" align="top" class="code-row-bg">
            <san-col span="4"><p style="height: 80px">col-4</p></san-col>
            <san-col span="4"><p style="height: 30px">col-4</p></san-col>
            <san-col span="4"><p style="height: 100px">col-4</p></san-col>
            <san-col span="4"><p style="height: 60px">col-4</p></san-col>
        </san-row>
        <h3>使用 flex 布局 - 底部对齐</h3>
        <san-row type="flex" justify="center" align="bottom" class="code-row-bg">
            <san-col span="4"><p style="height: 80px">col-4</p></san-col>
            <san-col span="4"><p style="height: 30px">col-4</p></san-col>
            <san-col span="4"><p style="height: 100px">col-4</p></san-col>
            <san-col span="4"><p style="height: 60px">col-4</p></san-col>
        </san-row>
        <h3>使用 flex 布局 - 居中对齐</h3>
        <san-row type="flex" justify="center" align="middle" class="code-row-bg">
            <san-col span="4"><p style="height: 80px">col-4</p></san-col>
            <san-col span="4"><p style="height: 30px">col-4</p></san-col>
            <san-col span="4"><p style="height: 100px">col-4</p></san-col>
            <san-col span="4"><p style="height: 60px">col-4</p></san-col>
        </san-row>
    </div>
</template>
<script>
import {Row, Col} from '../src/Grid';
import '../src/Grid/Grid.styl';
export default {
    components: {
        'san-row': Row,
        'san-col': Col
    }
}
</script>
```


## API

### Row
#### 属性
| 名称 | 类型 | 必须 | 默认值 | 描述|
|---|---|---|---|---|
|type|string|false|normal|布局类型；可选值有 noraml / flex；默认按传统布局(normal)方式|
|gutter|number|false|0|布局的栅格的间距|
|align|string|false||flex 布局对齐方式，有效值：'top', 'middle', 'bottom'|
|justify|string|false||flex 布局 justify 值|

#### 事件

无

#### 插槽

|名称|描述|
|---|---|
|default|内容插槽|

### Col

#### 属性

| 名称 | 类型 | 必须 | 默认值 | 描述|
|---|---|---|---|---|
|span|number|true|无|占的栅格的列数|
|order|number|false|无|flex 布局，列的显示顺序|
|offset|number|false|无|列偏移的栅格列数|
|push|number|false|无|改变列排序的 push 值|
|pull|number|false|无|改变列排序的 pull 值|

#### 事件

无

#### 插槽

|名称|描述|
|---|---|
|default|内容插槽|
