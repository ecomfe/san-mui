## Divider

Divider 组件用于管理或分割列表以及页面布局里的内容，它很轻量但也已足够让呈现的内容在视觉和空间上有区分的效果

#### 示例

配合列表使用

```san inset Divider
<template>
  <div class="sm-list-demo-wrapper">
    <san-list>
        <san-list-item primaryText="List Item 1" inset="{{!0}}" />
        <san-list-item primaryText="List Item 2" inset="{{!0}}" />
        <san-divider inset="{{!0}}" />
        <san-list-item primaryText="List Item 3" inset="{{!0}}" />
    </san-list>
  </div>
</template>
<script>
import {List, ListItem} from '../src/List';
import Divider from '../src/Divider';
import '../src/List/index.styl';
import '../src/Divider/Divider.styl';
export default {
    components: {
        'san-list': List,
        'san-list-item': ListItem,
        'san-divider': Divider
    }
};
</script>
<style>
.sm-list-demo-wrapper {
  max-width: 200px;
  border: 1px solid #e1e1e1;
}
</style>
```

配合Menu使用

```san Divider
<template>
  <div>
      <san-dropdownmenu openImmediately="{{!0}}" anchorOrigin="{{anchorOrigin}}">
          <san-menuitem value="{{ 1 }}" title="MenuItem 1" />
          <san-menuitem value="{{ 2 }}" title="MenuItem 2" />
          <san-divider />
          <san-menuitem value="{{ 3 }}" title="MenuItem 3" />
          <san-icon slot="iconButton">arrow_drop_down</san-icon>
      </san-dropdownmenu>
  </div>
</template>
<script>
import {DropDownMenu, MenuItem} from '../src/Menu';
import Icon from '../src/Icon';
import Divider from '../src/Divider';
import '../src/Menu/DropDownMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Divider/Divider.styl';
export default {
    components: {
        'san-dropdownmenu': DropDownMenu,
        'san-menuitem': MenuItem,
        'san-icon': Icon,
        'san-divider': Divider
    },
    initData() {
        return {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
            }
        };
    }
};
</script>
```