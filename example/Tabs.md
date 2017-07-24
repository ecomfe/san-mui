## Tabs

[Tabs 标签栏](https://material.google.com/components/tabs.html) 在一个 app 中，tabs 使在不同的视图和功能间探索和切换以及浏览不同类别的数据集合起来变得简单

示例

```san 简单的使用
<template>
    <div>
        <sm-tabs value="{=currentTab=}">
            <sm-tab s-for="tab, index in tabs" value="{{tab.value}}">
                <span slot="label">{{tab.label}}</span>
            </sm-tab>
        </sm-tabs>
    </div>
</template>
<script>
import Tabs, {Tab} from '../src/Tabs';
import '../src/Tabs/Tabs.styl';
export default {
    components: {
        'sm-tabs': Tabs,
        'sm-tab': Tab
    },
    initData() {
        return {
            tabs: [
                {
                    label: 'recents',
                    icon: 'phone',
                    value: 'phone'
                },
                {
                    label: 'favorites',
                    icon: 'favorite',
                    value: 'favorite'
                },
                {
                    label: 'messages',
                    icon: 'message',
                    value: 'message'
                }
            ],
            currentTab: 'favorite'
        };
    }
};
</script>
```

或者与 Icon 结合起来使用：

```san 与 Icon 结合使用
<template>
    <div>
        <h4>使用 Icon 作为 Tab 内容</h4>
        <sm-tabs value="{=currentTab=}">
            <sm-tab s-for="tab, index in tabs" value="{{tab.value}}">
                <sm-icon slot="icon">{{tab.icon}}</sm-icon>
            </sm-tab>
        </sm-tabs>
        <h4>同时使用 Icon 和文本作为 Tab 内容</h4>
        <sm-tabs value="{=currentTab=}">
            <sm-tab s-for="tab, index in tabs" value="{{tab.value}}">
                <sm-icon slot="icon">{{tab.icon}}</sm-icon>
                <span slot="label">{{tab.label}}</span>
            </sm-tab>
        </sm-tabs>

    </div>
</template>
<script>
import Tabs, {Tab} from '../src/Tabs';
import Icon from '../src/Icon';

import '../src/Tabs/Tabs.styl';
import '../src/Icon/Icon.styl';

export default {
    components: {
        'sm-tabs': Tabs,
        'sm-tab': Tab,
        'sm-icon': Icon
    },
    initData() {
        return {
            tabs: [
                {
                    label: 'recents',
                    icon: 'phone',
                    value: 'phone'
                },
                {
                    label: 'favorites',
                    icon: 'favorite',
                    value: 'favorite'
                },
                {
                    label: 'messages',
                    icon: 'message',
                    value: 'message'
                }
            ],
            currentTab: 'favorite'
        };
    }
};
</script>
```


## API

### Tabs

#### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|value|string|false|无|当前标签的选中值|

#### 事件

|名称|描述|
|:---|:---|
|change|当激活标签发生变化时触发，参数为被选中标签的值|

#### 插槽

|名称|描述|
|:---|:---|:---|
|default|默认内容，一般是多个 Tab|

### Tab

#### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|value|string|false|无|标签值|

#### 事件
无

#### 插槽

|名称|描述|
|:---|:---|:---|
|icon|标签的 icon|
|label|标签的文本|
