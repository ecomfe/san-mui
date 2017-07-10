## Pager 纸片

[Paper 纸片](https://material.google.com/layout/principles.html#principles-how-paper-works), 一个阴影效果的容器。

```san 方形纸片
<template>
    <div class="paper-wrap">
        <san-paper class="my-paper none-shadow-paper" zDepth="0"></san-paper>
        <san-paper class="my-paper" zDepth="1"></san-paper>
        <san-paper class="my-paper" zDepth="2"></san-paper>
        <san-paper class="my-paper" zDepth="3"></san-paper>
        <san-paper class="my-paper" zDepth="4"></san-paper>
        <san-paper class="my-paper" zDepth="5"></san-paper>
    </div>
</template>
<script>
import Paper from '../src/Paper';
import '../src/Paper/Paper.styl';
export default {
    components: {
        'san-paper': Paper
    }
}
</script>
<style>
.paper-wrap {
    display: flex;
    margin: 10px 0;
}

.paper-wrap > .sm-paper {
    flex: 1;
    margin: 0 15px;
    height: 100px;
}

.none-shadow-paper {
    border: 1px solid #ccc;
}

.circle-paper-wrap .my-paper {
    width: 100px;
    flex: 0 1 auto;
}
</style>
```

```san 圆形纸片
<template>
    <div class="paper-wrap circle-paper-wrap">
        <san-paper class="none-shadow-paper" circle="1" zDepth="0"></san-paper>
        <san-paper circle="1" zDepth="1"></san-paper>
        <san-paper circle="1" zDepth="2"></san-paper>
        <san-paper circle="1" zDepth="3"></san-paper>
        <san-paper circle="1" zDepth="4"></san-paper>
        <san-paper circle="1" zDepth="5"></san-paper>
    </div>
</template>
<script>
import Paper from '../src/Paper';
import '../src/Paper/Paper.styl';
export default {
    components: {
        'san-paper': Paper
    }
}
</script>
<h3>圆形的纸片</h3>
```

## API


### 属性
|名称|类型|默认值|描述|
|---|---|---|---|
|circle|boolean| false |是否为圆形的纸片|
|rounded|boolean| true |是否为圆角的纸片|
|zDepth|number| 1 |1-6,纸片的阴影程度|

### 事件
无

### 插槽
|名称|描述|
|default|内容插槽|
