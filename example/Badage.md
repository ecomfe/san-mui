## Badage

`Badage`组件，配合图标、按钮组件使用，用于标识一些文字，数字等。

#### 示例

```san 基础用法
<template>
    <section class="badage-demo">
        <sm-badage
            content="23"
        >
            <sm-icon>
                assignment
            </sm-icon>
        </sm-badage>
        <sm-badage
            content="23"
        >
            <sm-icon-button>
                assignment
            </sm-icon-button>
        </sm-badage>
        <sm-badage
            content="23"
        >
            <sm-button variants="info">
                按钮
            </sm-button>
        </sm-badage>
        <sm-badage
            content="新通知"
            color="#ff9800"
        >
            <sm-button variants="info">
                按钮
            </sm-button>
        </sm-badage>
    </section> 
</template>

<script>
import Badage from '../src/Badage';
import Icon from '../src/Icon';
import {IconButton, Button} from '../src/Button';

import '../src/Badage/Badage.styl';
import '../src/Icon/Icon.styl';
import '../src/Button/Button.styl';

export default {
    components: {
        'sm-badage': Badage,
        'sm-icon-button': IconButton,
        'sm-icon': Icon,
        'sm-button': Button
    }
}
</script>

<style>
   .badage-demo {
    padding: 20px; 
    display: flex; 
    align-items: center;
    justify-content: space-around;
}
</style>
```

此外，还可以自定义badage内容中的最大值：

```san 最大值
<template>
    <section class="badage-demo">
        <sm-badage
            content="{{content}}"
            max="{{maxOne}}"
        >
            <sm-icon-button>
                assignment
            </sm-icon-button>
        </sm-badage>
        <sm-badage
            content="{{content}}"
            max="{{maxTwo}}"
        >
            <sm-icon-button>
                assignment
            </sm-icon-button>
        </sm-badage>
    </section> 
</template>

<script>
import Badage from '../src/Badage';
import {IconButton, Button} from '../src/Button';

import '../src/Badage/Badage.styl';
import '../src/Button/Button.styl';

export default {
    components: {
        'sm-badage': Badage,
        'sm-icon-button': IconButton
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
   .badage-demo {
    padding: 20px; 
    display: flex; 
    align-items: center;
    justify-content: space-around;
}
</style>
```

还可以自定义badage形状：

```san 自定义形状
<template>
    <section class="badage-demo">
        <sm-badage>
            <sm-icon slot="content">
                star
            </sm-icon>
            <sm-icon-button>
                assignment
            </sm-icon-button>
        </sm-badage>
        <sm-badage
            color="#f00"
        >
            <sm-icon slot="content">
                notifications
            </sm-icon>
            <sm-button variants="info">
                按钮
            </sm-button>
        </sm-badage>
    </section> 
</template>

<script>
import Badage from '../src/Badage';
import Icon from '../src/Icon';
import {IconButton, Button} from '../src/Button';

import '../src/Badage/Badage.styl';
import '../src/Icon/Icon.styl';
import '../src/Button/Button.styl';

export default {
    components: {
        'sm-badage': Badage,
        'sm-icon-button': IconButton,
        'sm-icon': Icon,
        'sm-button': Button
    }
}
</script>

<style>
   .badage-demo {
    padding: 20px; 
    display: flex; 
    align-items: center;
    justify-content: space-around;
}
</style>
```

此外，自身的hidden属性配合按钮事件，可以实现点击隐藏等功能：

```san 隐藏badage
<template>
    <section class="badage-demo">
        <sm-badage
            content="新通知"
            hidden="{{hidden}}"
        >
            <sm-button
                variants="info"
                on-click="handleClick"
            >
                点击按钮以隐藏通知
            </sm-button>
        </sm-badage>
    </section> 
</template>

<script>
import Badage from '../src/Badage';
import {IconButton, Button} from '../src/Button';

import '../src/Badage/Badage.styl';
import '../src/Button/Button.styl';

export default {
    components: {
        'sm-badage': Badage,
        'sm-icon-button': IconButton,
        'sm-button': Button
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
   .badage-demo {
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
| hidden | Boolean | false | 隐藏badage |
 
### Slots

| 名称 | 描述|
| --- |   --- |
| default | 可填充Icon, IconButton, Button, 分发需要加入badage内部的组件  |
| content | 可填充Icon，用于自定义badage形状,但该slot会被content属性覆盖 |

