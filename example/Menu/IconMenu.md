### IconMenu

[Icon Menus](https://www.google.com/design/spec/components/menus.html#menus-usage) 是一种点击图标而打开的菜单。它们可以设置相关的图标，并且只占用最少的空间。

```san IconMenu
<template>
<section>
    <div style="display: flex; align-items: flex-start">
        <sm-icon-menu icon="more_vert">
            <sm-menu-item title="刷新" on-click="hello('refresh')">
                <sm-icon slot="leftIcon">refresh</sm-icon>
            </sm-menu-item>
            <sm-menu-item title="推出" on-click="hello('eject')">
                <sm-icon slot="leftIcon">eject</sm-icon>
            </sm-menu-item>
            <sm-divider />
            <sm-menu-item title="喜欢" on-click="hello('like')">
                <sm-icon slot="leftIcon">favorite</sm-icon>
            </sm-menu-item>
        </sm-icon-menu>
        <sm-icon-menu icon="airplay" style="margin-left: 1rem">
            <sm-menu-item title="客厅">
                <sm-icon slot="leftIcon">brightness_5</sm-icon>
            </sm-menu-item>
            <sm-menu-item title="卧室">
                <sm-icon slot="leftIcon">brightness_3</sm-icon>
            </sm-menu-item>
            <sm-divider />
            <sm-menu-item title="书房">
                <sm-icon slot="leftIcon">business</sm-icon>
            </sm-menu-item>
        </sm-icon-menu>
    </div>
</section>
</template>
<script>
import {MenuItem, IconMenu} from '../../src/Menu';
import Icon from '../../src/Icon';
import Divider from '../../src/Divider';
import '../../src/Menu/index.styl';
import '../../src/Icon/Icon.styl';
import '../../src/Divider/Divider.styl';

export default {
    components: {
        'sm-icon-menu': IconMenu,
        'sm-menu-item': MenuItem,
        'sm-icon': Icon,
        'sm-divider': Divider
    },
    hello(icon) {
        console.log(icon);
    }
};
</script>
```

### API

#### 属性
|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|autoWidth|boolean|false|true|如果是true，那么菜单的宽度将会自适应浮层内容的宽度(我们会添加合适的周边空白)|
|maxHeight|number|false||指定浮层的最大高度|
|maxWidth|number|false||指定浮层的最大宽度|

#### 事件
无

### 插槽
|名称|描述|
|:---|:---|:---|
|default|默认内容，一般是多个 MenuItem|
