## Avatar

avatar组件，可以用来显示用户头像或者简短的文字和图标

#### 示例

可以显示图片、IconFont、文字，允许自定义大小、颜色、字体颜色等参数：

```san Avatar
<template>
    <san-list>
      <san-list-item primaryText="图片" disabled>
        <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"/>
      </san-list-item>
      <san-list-item primaryText="图片,自定义大小" disabled>
        <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" size="{{30}}"/>
      </san-list-item>
      <san-list-item primaryText="图标" disabled>
        <san-avatar slot="left" icon="folder"/>
      </san-list-item>
      <san-list-item primaryText="图标, 自定义大小、颜色" disabled>
        <san-avatar slot="left" icon="folder" color="#f93" backgroundColor="#ff2244" size="{{30}}" iconSize="{{20}}"/>
      </san-list-item>
      <san-list-item primaryText="文字" disabled>
        <san-avatar slot="left" color="#f93" backgroundColor="#2c9eff">MB</san-avatar>
      </san-list-item>
    </san-list>
</template>
<script>
import Icon from '../src/Icon';
import Avatar from '../src/Avatar';
import {List, ListItem} from '../src/List';
import '../src/Avatar/Avatar.styl';
import '../src/List/index.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-avatar': Avatar,
        'san-list': List,
        'san-list-item': ListItem
    }
};
</script>
```

## API

### 属性

| 名称 | 类型 | 必须 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
|size| number | false |40  | 大小 |
|iconSize| number | false | 20 | 图标大小 |
|backgroundColor| string | false | #bdbdbd | 背景色 |
|color| string | false | #f93 | 文字颜色 |
|src| string | false | | 图片地址 |

### 事件

无

### 插槽

|名称|描述|
|---|---|
|default|默认内容|
