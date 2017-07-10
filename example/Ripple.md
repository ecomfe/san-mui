## Ripple

Ripple 可以给元素添加涟漪动画效果。在点击元素时，产生向外扩散的水波纹效果。

> 请注意 Ripple 使用 `position: absolute;` 来覆盖父元素，以便在接受点击事件。
> 所以需要父元素提供 `position: relative;`

我们提供了 `TouchRipple` 和 `CenterRipple` 两种 Ripple。

`TouchRipple` 的涟漪动画是以点击的位置为中心向外扩散的。而 `CenterRipple` 是以父元素的中心为中心向外扩散的。

示例

```san TouchRipple 的简单使用
<template>
    <div class="sm-touch-ripple-demo">
        TouchRipple Demo
        <san-touch-ripple />
    </div>
</template>
<style>
.sm-touch-ripple-demo {
    position: relative;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 24px;
    background-color: rgb(0, 159, 147);
}
</style>
<script>
import {TouchRipple} from '../src/Ripple';
import '../src/Ripple/TouchRipple.styl';
export default {
    components: {
        'san-touch-ripple': TouchRipple
    }
};
</script>
```


```san CenterRipple 的简单使用
<template>
    <section>
        <div class="sm-center-ripple-demo">
            <div><sm-center-ripple /></div>
            <div><sm-center-ripple color="rgb(0, 159, 147)"/></div>
            <div><sm-center-ripple color="rgb(255, 255, 0)" /></div>
            <div><sm-center-ripple color="blue"/></div>
        </div>
    </section>
</template>
<style>
.sm-center-ripple-demo {
    height: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.sm-center-ripple-demo >div {
    position: relative;
    width: 6rem;
    height: 6rem;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #aaa;
}
</style>
<script>
import {CenterRipple} from '../src/Ripple';
import '../src/Ripple/CenterRipple.styl';
export default {
    components: {
        'sm-center-ripple': CenterRipple
    }
};
</script>
```

> 上边示例中可以看到你可以通过指定属性 color 来改变涟漪的颜色

除此之外，`CenterRipple` 还支持通过手动 API 的方式来触发涟漪动画。这在某些不在 `CenterRipple` 上点击的情况很有用。

```san CenterRipple 使用 API 手动触发涟漪动画
<template>
    <section>
        <div class="sm-center-ripple-demo" style="justify-content: center">
            <div style="margin-right: 1rem"><sm-center-ripple s-ref="ripple" /></div>
            <sm-button on-click="triggerRipple">点我触发一个左边的涟漪</sm-button>
        </div>
    </section>
</template>
<style>
.sm-center-ripple-demo {
    height: 200px;
    display: flex;
    align-items: center;
}
.sm-center-ripple-demo >div {
    position: relative;
    width: 6rem;
    height: 6rem;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #aaa;
}
</style>
<script>
import {CenterRipple} from '../src/Ripple';
import Button from '../src/Button';
import '../src/Ripple/CenterRipple.styl';
import '../src/Button/Button.styl';
export default {
    components: {
        'sm-center-ripple': CenterRipple,
        'sm-button': Button
    },
    triggerRipple() {
        this.ref('ripple').click();
    }
};
</script>
```

## API

### TouchRipple

#### 属性

| 名称 | 类型 | 必须 | 默认值 | 描述|
| --- | --- | --- | --- | --- |
| color | string | false | 无 | 当前进度值 |

#### 事件

无

#### 插槽

无

### CenterRipple

#### 属性

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| color | string | false | 无 | 当前进度值 |

#### 事件

无

#### 插槽

无
