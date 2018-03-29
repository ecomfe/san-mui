## AppBar

[app bar](https://material.google.com/layout/structure.html#structure-app-bar) 相当于安卓应用中的 action bar, 是一种特殊的工具栏，用于放置 logo，导航菜单，搜索以及一些按钮。

```san 简单的使用
<template>
    <div>
        <san-appbar title="SAN-MUI" class="example-drawer-appbar" />
    </div>
</template>
<script>
import AppBar from '../src/AppBar';
export default {
    components: {
        'san-appbar': AppBar
    }
};
</script>
```

```san 添加标题图标
<template>
    <div>
        <san-appbar title="标题">
            <san-icon-button
                variants="info raised"
                slot="left">
                menu
            </san-icon-button>
        </san-appbar>
    </div>
</template>
<script>
import AppBar from '../src/AppBar';
import {IconButton} from '../src/Button';

import '../src/Button/Button.styl';

export default {
    components: {
        'san-appbar': AppBar,
        'san-icon-button': IconButton
    }
};
</script>
```

```san 包含右侧图标
<template>
    <div>
        <san-appbar title="标题">
          <san-icon-button variants="info raised" slot="left">
            menu
          </san-icon-button>
          <san-icon-menu icon="more_horiz" itemClickClose="false" tooltip="菜单" slot="right">
            <san-menu-item title="MenuItem 1" />
            <san-menu-item title="MenuItem 2" />
          </san-iconmenu>
        </san-appbar>
    </div>
</template>
<script>
import AppBar from '../src/AppBar';
import {IconButton} from '../src/Button';
import {IconMenu, MenuItem} from '../src/Menu';

import '../src/Menu/IconMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Button/Button.styl';

export default {
    components: {
        'san-appbar': AppBar,
        'san-icon-button': IconButton,
        'san-icon-menu': IconMenu,
        'san-menu-item': MenuItem
    }
};
</script>
```

## API

### 属性

| 名称 | 类型 | 必须 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| title | string | true | 无 | 标题 |
| zDepth | number | 1 | false | 阴影深度，不显示阴影设为 0 |
| showLeftIcon | boolean | false | true | 显示左侧icon |
| showRightIcon | boolean | false | true | 展示右侧icon |

### 事件

无

### 插槽

|名称|描述|
|---|---|
|left|左侧按钮|
|right|右侧按钮|
