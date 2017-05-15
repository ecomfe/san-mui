## Avatar

```san Avatar
<template>
    <section>
        <san-list>
          <san-list-item primaryText="图片" disabled>
            <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"/>
          </san-list-item>
          <san-list-item primaryText="图片,自定义大小" disabled>
            <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" size="30"/>
          </san-list-item>
          <san-list-item primaryText="图标" disabled>
            <san-avatar slot="left" icon="folder"/>
          </san-list-item>
          <san-list-item primaryText="图标, 自定义大小、颜色" disabled>
            <san-avatar slot="left" icon="folder" color="#f93" backgroundColor="#ff2244" size="30" iconSize="20"/>
          </san-list-item>
          <san-list-item primaryText="文字" disabled>
            <san-avatar slot="left" color="#f93" backgroundColor="#2c9eff">MB</san-avatar>
          </san-list-item>
        </san-list>
    </section>
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
    },

    initData() {
        return {
        };
    }

}

</script>
```
