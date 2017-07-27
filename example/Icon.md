## 图标

材料图标使用几何形状来直观地表达核心思想、特性或主题。

**产品图标** 是一个品牌的产品、服务和工具的视觉表现。

**系统图标** 代表一个命令、文件、设备、目录或一般性操作。

示例：

```san 简单的使用
<template>
<section class="icon-demo" style="justify-content: space-around;">
    <sm-icon size="32">account_box</sm-icon>
    <sm-icon size="32">access_alarm</sm-icon>
    <sm-icon size="32">add_box</sm-icon>
    <sm-icon size="24" style="color: rgb(0, 159, 147)">airplay</sm-icon>
</section>
</template>
<script>
import Icon from '../src/Icon';
import '../src/Icon/Icon.styl'
export default {
    components: {
        'sm-icon': Icon
    }
};
</script>
```

```san 所有的 Icon
<template>
<section class="icon-demo">
    <div class="icon" san-for="icon in icons">
        <sm-icon size="32">{{icon}}</sm-icon>
        <p>{{icon}}</p>
    </div>
</section>
</template>
<script>
import icons from 'raw-loader!../src/common/font/codepoints';
import Icon from '../src/Icon';

const ALL_ICON_CODES = icons
    .replace(/\n/g, ' ')
    .split(/([\w_]+ e\w+)/)
    .filter(line => line.trim())
    .map(line => line.split(' ')[0]);

import '../src/Icon/Icon.styl'

export default {
    components: {
        'sm-icon': Icon
    },
    initData() {
        return {
            icons: ALL_ICON_CODES
        };
    }
};
</script>
<style media="screen">
.icon-demo {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
}

.icon-demo .icon {
    flex: 0 0 25%;
    display: flex;
    flex-flow: column;
    height: 81px;
    align-items: center;
    justify-content: center;
}

.icon-demo .icon p {
    margin-top: 5px;
    font-size: 12px
}

</style>
```

## API

### 属性

| 名称 | 类型 | 必须 | 默认值 | 描述|
|---|---|---|---|---|
|size|string\|number|false|无|icon 的大小，单位 px|

### 事件

无

### 插槽

|名称|描述|
|---|---|
|default|icon名|
