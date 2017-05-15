## Button

### Flat Button

`Flat Buttons` 用于通用功能和减少分层在屏幕上,使其更具可读性。

#### 示例

我们提供了多种不同状态的按钮：

```san Flat Button
<template>
    <section>
        <san-button variants="primary">主色</san-button>
        <san-button variants="secondery">次色</san-button>
        <san-button variants="danger">危险</san-button>
        <san-button variants="warning">警告</san-button>
        <san-button variants="success">成功</san-button>
        <san-button variants="info">通知</san-button>
        <san-button disabled="{{!0}}">禁用</san-button>
    </section>
</template>
<script>
import Button from '../src/Button';
import '../src/Button/Button.styl';
export default {
    components: {
        'san-button': Button
    }
};
</script>
```

### Raised Button

`Raised Button` 用于在平面布局和页面上强调重要的功能。

### 示例

我们提供了多种不同状态的按钮：

```san Raised Button
<template>
    <section>
        <san-button variants="raised primary">主色</san-button>
        <san-button variants="raised secondery">次色</san-button>
        <san-button variants="raised danger">危险</san-button>
        <san-button variants="raised warning">警告</san-button>
        <san-button variants="raised success">成功</san-button>
        <san-button variants="raised info">通知</san-button>
        <san-button variants="raised info" disabled="{{!0}}">禁用</san-button>
    </section>
</template>
<script>
import Button from '../src/Button';
import '../src/Button/Button.styl';
export default {
    components: {
        'san-button': Button
    }
};
</script>
```

### Icon Button

`Icon Button` 可以在按钮内放置一个图标，点击效果呈圆形从中心点扩散。

### 示例

我们提供了多种不同状态的按钮：

```san Icon Button
<template>
    <section>
        <p class="button-icon-row">
            <san-button variants="primary">keyboard_arrow_down</san-button>
            <san-button variants="secondery">keyboard_arrow_left</san-button>
            <san-button variants="danger">keyboard_arrow_right</san-button>
            <san-button variants="warning">keyboard_arrow_up</san-button>
        </p>
        <p class="button-icon-row">
            <san-button variants="raised primary">keyboard_arrow_down</san-button>
            <san-button variants="raised secondery">keyboard_arrow_left</san-button>
            <san-button variants="raised danger">keyboard_arrow_right</san-button>
            <san-button variants="raised warning">keyboard_arrow_up</san-button>
        </p>
    </section>
</template>
<style>
.button-icon-row {
    margin: 1rem;
}
.button-icon-row>.sm-button {
    margin-right: 1rem
}
</style>
<script>
import {IconButton} from '../src/Button';
export default {
    components: {
        'san-button': IconButton
    }
};
</script>
```

### 用做于链接使用

`FlatButton`、`RaisedButton` 和 `IconButton` 都可以用做 `<a>` 来使用。只需要添加 `href` 即可。同时，在指定了 `href`时，`target` 也是支持的。

```san 作为链接使用
<template>
    <section>
        <div class="button-icon-row">
            <san-button
                target="_blank"
                href="https://github.com/ecomfe/san-mui"
                variants="primary">
                san-mui
            </san-button>
            <san-button
                target="_blank"
                href="https://github.com/ecomfe/san-mui"
                variants="secondery raised">
                keyboard_arrow_left
            </san-button>
            <san-icon-button
                target="_blank"
                href="https://github.com/ecomfe/san-mui"
                variants="danger">
                keyboard_arrow_right
            </san-button>
        </div>
    </section>
</template>
<style>
.button-icon-row {
    margin: 1rem 0;
    display: flex;
    align-items: center
}
.button-icon-row>.sm-button {
    margin-right: 1rem
}
</style>
<script>
import {Button, IconButton} from '../src/Button';
export default {
    components: {
        'san-button': Button,
        'san-icon-button': IconButton
    }
};
</script>
```

## API

### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| disabled | boolean | false | 禁用 |
| href | string? | null | 用做链接使用，点击时跳转地址 |
| variants | Array<string> | | 样式变种，预置了 `primary` `secondary` `danger` `warning` `success` `info` |
