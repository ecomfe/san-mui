### IconMenu

[Icon Menus](https://www.google.com/design/spec/components/menus.html#menus-usage) 是一种点击图标而打开的菜单。它们可以设置相关的图标，并且只占用最少的空间。

```san IconMenu
<template>
<section>
    <div style="display: flex; align-items: flex-start">
        <sm-icon-menu icon="more_vert">
            <sm-menu-item title="刷新">
                <sm-icon slot="leftIcon">refresh</sm-icon>
            </sm-menu-item>
            <sm-menu-item title="推出">
                <sm-icon slot="leftIcon">eject</sm-icon>
            </sm-menu-item>
            <sm-divider />
            <sm-menu-item title="喜欢" >
                <sm-icon slot="leftIcon">favorite</sm-icon>
            </sm-menu-item>
        </sm-dropdown-menu>
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
    }
};
</script>
```
