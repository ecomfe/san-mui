
## Chip

`Chip`是一种小块的用来呈现复杂实体的块，比如说日历的事件或联系人。它可以包含一张图片，一个短字符串(必要时可能被截取的字符串)，或者是其它的一些与实体对象有关的简洁的信息。

#### 示例

```san Chip
<template>
    <div class="chip-demo">
        <san-chip on-click="handleClick">default chip</san-chip>
        <san-chip disabled on-click="handleClick">disabled chip</san-chip>

        <san-chip
            showDelete
            on-click="handleClick"
            on-delete="handleDelete($event)"
            san-ref="chip">
            delete chip
        </san-chip>

        <san-chip>
            <san-avatar
                size="{{32}}"
                src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" />
            avatar chip
        </san-chip>
        <san-chip>
            <san-avatar
                size="{{32}}"
                icon="mood" />
            icon avatar chip
        </san-chip>
        <san-chip color="#f93" backgroundColor="green">
            <san-avatar
                size="{{32}}"
                color="#f93"
                backgroundColor="#2c9eff">
                mb
            </san-avatar>
            custom chip
        </san-chip>
    </div>
</template>

<script>
import Avatar from '../src/Avatar';
import Chip from '../src/Chip';

import '../src/Avatar/Avatar.styl';
import '../src/Chip/Chip.styl';

export default {
    components: {
        'san-avatar': Avatar,
        'san-chip': Chip,
    },

    handleDelete(e) {
        e.stopPropagation();
        console.log('你点击了删除按钮');
        const chipDom = this.ref('chip').el;
        chipDom.parentNode.removeChild(chipDom);
    },
    handleClick() {
        console.log('点击了chip')
    }
};
</script>

<style>
    .chip-demo {
        display: flex;
        flex-flow: row wrap;
    }

    .sm-chip {
        margin: 5px;
    }

</style>
```

## API

### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| disabled | Boolean | false | 禁用 |
| showDelete | Boolean | false | 是否显示删除icon |
| color | String |  | 文字的颜色 |
| backgroundColor | String |  | 背景色 |

### Slots

| 名称 | 描述|
| --- |   --- |
| default |   用于放置 avatar 和简短的文字 |

### Events

| 名称 | 描述|
| --- |   --- |
| delete |   点击删除图标后触发 |
| click |   点击时候触发 |
