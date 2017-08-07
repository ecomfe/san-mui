## Badge

`Badge`组件，配合图标、按钮组件使用，用于标识一些文字，数字等。

#### 示例

```san 基础用法
<template>
    <section class="badge-demo">
        <san-badge
            content="23"
        >
            <san-icon>
                assignment
            </san-icon>
        </san-badge>
        <san-badge
            content="23"
        >
            <san-icon-button>
                assignment
            </san-icon-button>
        </san-badge>
        <san-badge
            content="23"
        >
            <san-button variants="info">
                按钮
            </san-button>
        </san-badge>
        <san-badge
            content="新通知"
            color="#ff9800"
        >
            <san-button variants="info">
                按钮
            </san-button>
        </san-badge>
    </section>
</template>

<script>
import Badge from '../src/Badge';
import Icon from '../src/Icon';
import {IconButton, Button} from '../src/Button';

import '../src/Badge/Badge.styl';
import '../src/Icon/Icon.styl';
import '../src/Button/Button.styl';

export default {
    components: {
        'san-badge': Badge,
        'san-icon-button': IconButton,
        'san-icon': Icon,
        'san-button': Button
    }
}
</script>

<style>
   .badge-demo {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>
```

此外，还可以自定义badge内容中的最大值：

```san 最大值
<template>
    <section class="badge-demo">
        <san-badge
            content="{{content}}"
            max="{{maxOne}}"
        >
            <san-icon-button>
                assignment
            </san-icon-button>
        </san-badge>
        <san-badge
            content="{{content}}"
            max="{{maxTwo}}"
        >
            <san-icon-button>
                assignment
            </san-icon-button>
        </san-badge>
    </section>
</template>

<script>
import Badge from '../src/Badge';
import {IconButton, Button} from '../src/Button';

import '../src/Badge/Badge.styl';
import '../src/Button/Button.styl';

export default {
    components: {
        'san-badge': Badge,
        'san-icon-button': IconButton
    },
    initData() {
        return {
            content: 1000,
            maxOne: 99,
            maxTwo: 999
        }
    }
}
</script>

<style>
   .badge-demo {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>
```

还可以自定义badge形状：

```san 自定义形状
<template>
    <section class="badge-demo">
        <san-badge>
            <san-icon slot="content">
                star
            </san-icon>
            <san-icon-button>
                assignment
            </san-icon-button>
        </san-badge>
        <san-badge
            color="#f00"
        >
            <san-icon slot="content">
                notifications
            </san-icon>
            <san-button variants="info">
                按钮
            </san-button>
        </san-badge>
    </section>
</template>

<script>
import Badge from '../src/Badge';
import Icon from '../src/Icon';
import {IconButton, Button} from '../src/Button';

import '../src/Badge/Badge.styl';
import '../src/Icon/Icon.styl';
import '../src/Button/Button.styl';

export default {
    components: {
        'san-badge': Badge,
        'san-icon-button': IconButton,
        'san-icon': Icon,
        'san-button': Button
    }
}
</script>

<style>
   .badge-demo {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>
```

此外，自身的hidden属性配合按钮事件，可以实现点击隐藏等功能：

```san 隐藏badge
<template>
    <section class="badge-demo">
        <san-badge
            content="新通知"
            hidden="{{hidden}}"
        >
            <san-button
                variants="info"
                on-click="handleClick"
            >
                点击按钮以隐藏通知
            </san-button>
        </san-badge>
    </section>
</template>

<script>
import Badge from '../src/Badge';
import {IconButton, Button} from '../src/Button';

import '../src/Badge/Badge.styl';
import '../src/Button/Button.styl';

export default {
    components: {
        'san-badge': Badge,
        'san-icon-button': IconButton,
        'san-button': Button
    },
    initData() {
        return {
            hidden: false
        }
    },
    handleClick() {
        this.data.set('hidden', true);
    }
}
</script>

<style>
   .badge-demo {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>
```

## API

### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| content | String, Number |  | 描述文本 |
| color | String |  | 颜色 |
| max | Number |  | 最大值，超过最大值会显示 '{max}+'，要求 content 是 Number 类型 |
| hidden | Boolean | false | 隐藏badge |

### Slots

| 名称 | 描述|
| --- |   --- |
| default | 可填充Icon, IconButton, Button, 分发需要加入badge内部的组件  |
| content | 可填充Icon，用于自定义badge形状,但该slot会被content属性覆盖 |
