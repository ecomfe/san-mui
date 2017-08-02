## List

List 组件以垂直排列的方式展现多个元素，通过配置可以赋予多种用途，如联系人列表，嵌套列表等等

#### 示例

普通列表

```san Simple List
<template>
  <div class="sm-list-wrapper">
    <san-list>
        <san-list-item primaryText="Sent mail">
            <san-icon slot="left">send</san-icon>
        </san-list-item>
        <san-list-item primaryText="Drafts">
            <san-icon slot="left">drafts</san-icon>
        </san-list-item>
        <san-list-item primaryText="Inbox">
            <san-icon slot="left">inbox</san-icon>
        </san-list-item>
        <san-list-item primaryText="Starred">
            <san-icon slot="left">star</san-icon>
        </san-list-item>
        <san-divider />
        <san-list-item primaryText="All mail">
            <san-icon slot="right">info</san-icon>
        </san-list-item>
        <san-list-item primaryText="Trash">
            <san-icon slot="right">info</san-icon>
        </san-list-item>
        <san-list-item primaryText="Spam">
            <san-icon slot="right">info</san-icon>
        </san-list-item>
        <san-list-item primaryText="Follow up">
            <san-icon slot="right">info</san-icon>
        </san-list-item>
    </san-list>
  </div>
</template>
<script>
import Icon from '../src/Icon';
import {List, ListItem} from '../src/List';
import Divider from '../src/Divider';
import '../src/Avatar/Avatar.styl';
import '../src/List/index.styl';
import '../src/Divider/Divider.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-list': List,
        'san-list-item': ListItem,
        'san-divider': Divider
    }
};
</script>
<style>
.sm-list-wrapper {
    border: 1px solid #e1e1e1;
    max-width: 360px;
}
</style>
```

聊天列表

```san Chat List
<template>
  <div class="sm-list-wrapper">
      <san-list>
          <san-sub-header>最近聊天记录</san-sub-header>
          <san-list-item primaryText="Junmer">
              <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"/>
              <san-icon slot="right">chat_bubble</san-icon>
          </san-list-item>
          <san-list-item primaryText="Leon Lu">
              <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"/>
              <san-icon slot="right">chat_bubble</san-icon>
          </san-list-item>
          <san-list-item primaryText="Zhiqiang Zhang">
              <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"/>
              <san-icon slot="right">chat_bubble</san-icon>
          </san-list-item>
          <san-list-item primaryText="CK Yau">
              <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"/>
              <san-icon slot="right">chat_bubble</san-icon>
          </san-list-item>
      </san-list>
      <san-divider />
      <san-list>
          <san-sub-header>历史聊天记录</san-sub-header>
          <san-list-item primaryText="Huiquan Huang">
              <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"/>
              <san-icon slot="right">chat_bubble</san-icon>
          </san-list-item>
      </san-list>
  </div>
</template>
<script>
import Icon from '../src/Icon';
import {List, ListItem} from '../src/List';
import Divider from '../src/Divider';
import Avatar from '../src/Avatar';
import SubHeader from '../src/SubHeader';
import '../src/Avatar/Avatar.styl';
import '../src/List/index.styl';
import '../src/SubHeader/SubHeader.styl';
import '../src/Divider/Divider.styl';
export default {
    components: {
        'san-sub-header': SubHeader,
        'san-icon': Icon,
        'san-list': List,
        'san-list-item': ListItem,
        'san-divider': Divider,
        'san-avatar': Avatar
    }
};
</script>
<style>
.sm-list-wrapper {
    border: 1px solid #e1e1e1;
    max-width: 360px;
}
</style>
```


嵌套列表

```san Nested List
<template>
  <div class="sm-list-wrapper">
    <san-list>
        <san-list-item primaryText="Sent mail">
            <san-icon slot="left">send</san-icon>
        </san-list-item>
        <san-list-item primaryText="Drafts">
            <san-icon slot="left">drafts</san-icon>
        </san-list-item>
        <san-list-item
            primaryText="Inbox"
            toggleNested="{{!0}}"
            initiallyOpen="{{!0}}"
            primaryTogglesNestedList="{{!0}}"
            on-nestedListToggle="nestedListToggle($event)"
        >
            <san-icon slot="left">inbox</san-icon>
            <san-list-item slot="nested" primaryText="Starred">
                <san-icon slot="left">star</san-icon>
            </san-list-item>
            <san-list-item slot="nested" primaryText="Sent mail" disabled toggleNested="{{!0}}">
                <san-icon slot="left">send</san-icon>
                <san-list-item primaryText="Drafts" slot="nested">
                    <san-icon slot="left">drafts</san-icon>
                </san-list-item>
            </san-list-item>
            <san-list-item slot="nested" primaryText="Inbox" toggleNested="{{!0}}" initiallyOpen="{{!0}}">
                <san-icon slot="left">inbox</san-icon>
                <san-list-item primaryText="Drafts" slot="nested">
                    <san-icon slot="left">drafts</san-icon>
                </san-list-item>
            </san-list-item>
        </san-list-item>
    </san-list>
  </div>
</template>
<script>
import Icon from '../src/Icon';
import {List, ListItem} from '../src/List';
import '../src/List/index.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-list': List,
        'san-list-item': ListItem
    },
    nestedListToggle(value) {
        console.log(value ? 'open' : 'close');
    }
};
</script>
<style>
.sm-list-wrapper {
    border: 1px solid #e1e1e1;
    max-width: 360px;
}
</style>
```

联系人列表

```san Contact List
<template>
  <div class="sm-list-wrapper">
    <san-list>
        <san-list-item primaryText="Mark">
            <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="right"/>
            <san-icon slot="left">star</san-icon>
        </san-list-item>
        <san-list-item primaryText="David" inset="{{!0}}">
            <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="right"/>
        </san-list-item>
        <san-list-item primaryText="Helen" inset="{{!0}}">
            <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="right"/>
        </san-list-item>
    </san-list>
    <san-divider inset="{{!0}}" />
    <san-list>
        <san-list-item primaryText="Alice">
            <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="right"/>
            <san-avatar slot="left" backgroundColor="#fff" color="#f24" style="{{avatarStyle}}">A</san-avatar>
        </san-list-item>
        <san-list-item primaryText="Allen" inset="{{!0}}">
            <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="right"/>
        </san-list-item>
    </san-list>
  </div>
</template>
<script>
import Icon from '../src/Icon';
import {List, ListItem} from '../src/List';
import Avatar from '../src/Avatar';
import Divider from '../src/Divider';
import '../src/Divider/Divider.styl';
import '../src/Avatar/Avatar.styl';
import '../src/List/index.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-avatar': Avatar,
        'san-list': List,
        'san-list-item': ListItem,
        'san-divider': Divider
    },
    initData() {
        return {
            avatarStyle: {
                'margin-left': '-8px'
            }
        };
    }
};
</script>
<style>
.sm-list-wrapper {
    border: 1px solid #e1e1e1;
    max-width: 360px;
}
</style>
```

文件夹列表

```san Folder List
<template>
  <div class="sm-list-wrapper">
    <san-list>
        <san-sub-header inset="{{!0}}">Folders</san-sub-header>
        <san-list-item primaryText="Photos">
            <san-avatar slot="left" icon="folder"/>
            <san-icon slot="right">info</san-icon>
        </san-list-item>
        <san-list-item primaryText="Recipes">
            <san-avatar slot="left" icon="folder"/>
            <san-icon slot="right">info</san-icon>
        </san-list-item>
        <san-list-item primaryText="Work">
            <san-avatar slot="left" icon="folder"/>
            <san-icon slot="right">info</san-icon>
        </san-list-item>
    </san-list>
  </div>
</template>
<script>
import Icon from '../src/Icon';
import {List, ListItem} from '../src/List';
import Avatar from '../src/Avatar';
import SubHeader from '../src/SubHeader';
import '../src/Avatar/Avatar.styl';
import '../src/List/index.styl';
import '../src/SubHeader/SubHeader.styl';
export default {
    components: {
        'san-sub-header': SubHeader,
        'san-icon': Icon,
        'san-avatar': Avatar,
        'san-list': List,
        'san-list-item': ListItem
    }
};
</script>
<style>
.sm-list-wrapper {
    border: 1px solid #e1e1e1;
    max-width: 360px;
}
</style>
```


设置列表

```san Setting List
<template>
  <div class="sm-list-wrapper">
    <san-list>
        <san-list-item disabled primaryText="通知与信息设置" secondaryText="总是中断"/>
    </san-list>
    <san-divider />
    <san-list>
        <san-sub-header>声音开启设置</san-sub-header>
        <san-list-item disableRipple="{{!0}}" primaryText="事件和提醒">
            <san-switch slot="right"/>
        </san-list-item>
        <san-list-item disableRipple="{{!0}}" primaryText="电话">
            <san-switch slot="right"/>
        </san-list-item>
        <san-list-item disableRipple="{{!0}}" primaryText="信息">
            <san-switch slot="right"/>
        </san-list-item>
    </san-list>
    <san-list>
        <san-sub-header>通知设置</san-sub-header>
        <san-list-item disableRipple="{{!0}}" primaryText="通知">
            <san-checkbox slot="left"/>
        </san-list-item>
        <san-list-item disableRipple="{{!0}}" primaryText="声音">
            <san-checkbox slot="left"/>
        </san-list-item>
        <san-list-item disableRipple="{{!0}}" primaryText="视频的声音">
            <san-checkbox slot="left"/>
        </san-list-item>
    </san-list>
  </div>
</template>
<script>
import Icon from '../src/Icon';
import {List, ListItem} from '../src/List';
import Divider from '../src/Divider';
import SubHeader from '../src/SubHeader';
import Checkbox from '../src/Checkbox';
import Switch from '../src/Switch';
import '../src/List/index.styl';
import '../src/SubHeader/SubHeader.styl';
import '../src/Checkbox/Checkbox.styl';
import '../src/Switch/Switch.styl';
import '../src/Divider/Divider.styl';
export default {
    components: {
        'san-sub-header': SubHeader,
        'san-icon': Icon,
        'san-list': List,
        'san-list-item': ListItem,
        'san-divider': Divider,
        'san-checkbox': Checkbox,
        'san-switch': Switch
    }
};
</script>
<style>
.sm-list-wrapper {
    border: 1px solid #e1e1e1;
    max-width: 360px;
}
</style>
```

通讯列表

```san Phone List
<template>
  <div class="sm-list-wrapper">
    <san-list>
        <san-list-item primaryText="(020)86812345" secondaryText="Mobile">
            <san-icon slot="left">phone</san-icon>
            <san-icon slot="right">chat_bubble</san-icon>
        </san-list-item>
        <san-list-item primaryText="(021)86812346" secondaryText="Work" inset="{{!0}}">
            <san-icon slot="right">chat_bubble</san-icon>
        </san-list-item>
    </san-list>
    <san-divider inset="{{!0}}" />
    <san-list>
        <san-list-item primaryText="spring@example.com" secondaryText="Personal">
            <san-icon slot="left">mail_outline</san-icon>
        </san-list-item>
        <san-list-item primaryText="summer@example.com" secondaryText="Work" inset="{{!0}}">
        </san-list-item>
    </san-list>
  </div>
</template>
<script>
import Icon from '../src/Icon';
import {List, ListItem} from '../src/List';
import Divider from '../src/Divider';
import '../src/List/index.styl';
import '../src/Divider/Divider.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-divider': Divider,
        'san-list': List,
        'san-list-item': ListItem
    }
};
</script>
<style>
.sm-list-wrapper {
    border: 1px solid #e1e1e1;
    max-width: 360px;
}
</style>
```

信息列表

```san Messages List
<template>
  <div class="sm-list-wrapper">
    <san-sub-header>今天</san-sub-header>
    <san-list>
        <san-list-item
            primaryText="周末一起吃饭？"
            secondaryText="{{ longSecText1 }}"
            secondaryTextLines="2"
        >
            <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"/>
        </san-list-item>
        <san-divider inset="{{!0}}" />
        <san-list-item
            primaryText="夏天浪起来"
            secondaryText="{{ longSecText2 }}"
            secondaryTextLines="2"
        >
            <san-avatar slot="left" src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"/>
            <san-iconmenu icon="more_horiz" tooltip="操作" slot="right">
                <san-menuitem title="回复" />
                <san-menuitem title="删除" />
            </san-iconmenu>
        </san-list-item>
    </san-list>
  </div>
</template>
<script>
import {List, ListItem} from '../src/List';
import Divider from '../src/Divider';
import Avatar from '../src/Avatar';
import SubHeader from '../src/SubHeader';
import {IconMenu, MenuItem} from '../src/Menu';
import '../src/Avatar/Avatar.styl';
import '../src/List/index.styl';
import '../src/SubHeader/SubHeader.styl';
import '../src/Divider/Divider.styl';
import '../src/Menu/IconMenu.styl';
import '../src/Menu/MenuItem.styl';
export default {
    components: {
        'san-sub-header': SubHeader,
        'san-list': List,
        'san-list-item': ListItem,
        'san-divider': Divider,
        'san-avatar': Avatar,
        'san-iconmenu': IconMenu,
        'san-menuitem': MenuItem
    },
    initData() {
        return {
            longSecText1: '<span style="color: #333">靳东 - </span>我这周末会去你家附近办点事儿，要不要一起吃个饭？',
            longSecText2: '<span style="color: #333">我，张三，李四</span><br />我尽量到，可是我这周要出差，不知道啥时候能赶回来，你们先吃着，我回到再给你们打电话，别太想我'
        };
    }
};
</script>
<style>
.sm-list-wrapper {
    border: 1px solid #e1e1e1;
    max-width: 360px;
}
</style>
```


可选择列表

```san Selectable List
<template>
    <div>
        <div class="sm-list-wrapper">
        <san-list value="{{ value }}" selectable="{{!0}}" on-change="listItemSelect($event)">
            <san-list-item
                primaryText="Junmer"
                toggleNested="{{!0}}"
                initiallyOpen="{{!0}}"
                value="{{1}}">
                <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="left"/>
                <san-list-item primaryText="Leon Lu" value="{{ 2 }}" slot="nested">
                    <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="left"/>
                </san-list-item>
            </san-list-item>
            <san-list-item primaryText="CK Yau" value="{{ 3 }}">
                <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="left"/>
            </san-list-item>
            <san-list-item primaryText="Zhiqiang Zhang" value="{{ 4 }}">
                <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="left"/>
            </san-list-item>
            <san-list-item primaryText="Huiquan Huang" value="{{ 5 }}">
                <san-avatar src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg" slot="left"/>
            </san-list-item>
        </san-list>

        </div>
        <san-button
            variants="info"
            on-click="setValue($event)">点我会选中第一个</san-button>
    </div>
</template>
<script>
import {List, ListItem} from '../src/List';
import Avatar from '../src/Avatar';
import Button from '../src/Button';
import '../src/Avatar/Avatar.styl';
import '../src/List/index.styl';
export default {
    components: {
        'san-list': List,
        'san-list-item': ListItem,
        'san-avatar': Avatar,
        'san-button': Button
    },
    initData() {

        return {
            value: 3
        };
    },
    listItemSelect(value) {
        console.log('selected item value : ', value);
    },
    setValue() {
       this.data.set('value', 1);
    }
}
</script>
<style>
.sm-list-wrapper {
    border: 1px solid #e1e1e1;
    max-width: 360px;
}
</style>
```
