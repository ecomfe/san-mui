


## DropDownMenu

`DropDownMenu` 组件实现的是 material design 规范中的 [Textfield dropdown](https://material.io/guidelines/components/text-fields.html#text-fields-layout).


```san 基本使用
<template>
<section>
    <div style="display: flex; align-items: flex-start">
        <sm-dropdown-menu  value="{=value=}">
            <sm-menu-item value="1" title="星期一"/>
            <sm-menu-item value="2" title="星期二"/>
            <sm-menu-item value="3" title="星期三"/>
            <sm-menu-item value="4" title="星期四"/>
            <sm-menu-item value="5" title="星期五"/>
            <sm-divider />
            <sm-menu-item value="6" title="星期六"/>
            <sm-menu-item value="7" title="星期日"/>
        </sm-dropdown-menu>
        <sm-dropdown-menu
            value="{{value2}}"
            on-change="change($event)"
            style="margin-left: 1rem">
            <sm-menu-item value="1" title="星期一"/>
            <sm-menu-item value="2" title="星期二"/>
            <sm-menu-item value="3" title="星期三"/>
            <sm-menu-item value="4" title="星期四"/>
            <sm-menu-item value="5" title="星期五"/>
            <sm-menu-item value="6" title="星期六"/>
            <sm-menu-item value="7" title="星期日"/>
        </sm-dropdown-menu>
        <sm-dropdown-menu
            value="{{value2}}"
            on-change="change($event)"
            disabled
            style="margin-left: 1rem">
            <sm-menu-item value="1" title="星期一"/>
            <sm-menu-item value="2" title="星期二"/>
            <sm-menu-item value="3" title="星期三"/>
            <sm-menu-item value="4" title="星期四"/>
            <sm-menu-item value="5" title="星期五"/>
            <sm-menu-item value="6" title="星期六"/>
            <sm-menu-item value="7" title="星期日"/>
        </sm-dropdown-menu>
    </div>
    <h4>可以通过指定 autoWidth=false，使浮层宽度与输入框体一致</h4>
    <sm-dropdown-menu value="{=value=}" autoWidth="{{!1}}">
        <sm-menu-item value="1" title="星期一"/>
        <sm-menu-item value="2" title="星期二"/>
        <sm-menu-item value="3" title="星期三"/>
        <sm-menu-item value="4" title="星期四"/>
        <sm-menu-item value="5" title="星期五"/>
        <sm-divider />
        <sm-menu-item value="6" title="星期六"/>
        <sm-menu-item value="7" title="星期日"/>
    </sm-dropdown-menu>
    <h4>禁用某一个选项</h4>
    <sm-dropdown-menu value="{=value=}" autoWidth="{{!1}}">
        <sm-menu-item value="1" title="星期一" disabled />
        <sm-menu-item value="2" title="星期二"/>
        <sm-menu-item value="3" title="星期三"/>
        <sm-menu-item value="4" title="星期四"/>
        <sm-menu-item value="5" title="星期五"/>
        <sm-divider />
        <sm-menu-item value="6" title="星期六"/>
        <sm-menu-item value="7" title="星期日"/>
    </sm-dropdown-menu>
</section>
</template>
<script>
import {MenuItem, DropDownMenu} from '../../src/Menu';
import Icon from '../../src/Icon';
import Divider from '../../src/Divider';
import '../../src/Menu/index.styl';
import '../../src/Icon/Icon.styl';
import '../../src/Divider/Divider.styl';

export default {
    components: {
        'sm-dropdown-menu': DropDownMenu,
        'sm-menu-item': MenuItem,
        'sm-icon': Icon,
        'sm-divider': Divider
    },
    initData() {
        return {
            value: '',
            value2: '1'
        };
    },
    change(value) {
        this.data.set('value2', value);
    }
};
</script>
```

当选择数量较多时，可以添加 `maxHeight` 来进行浮层的高度限制，浮层会出现滚动条；

```san 使用 maxHeight 对浮层高度进行限制
<template>
<section>
    <sm-dropdown-menu value="{=value=}" maxHeight="{{200}}">
        <sm-menu-item
            s-for="item in items"
            value="{{item.value}}"
            label="{{item.label}}"
        </sm-menu-item>
    </sm-dropdown-menu>
</section>
</template>
<script>
import {MenuItem, DropDownMenu} from '../../src/Menu';
import Icon from '../../src/Icon';
import Divider from '../../src/Divider';
import '../../src/Menu/index.styl';
import '../../src/Icon/Icon.styl';
import '../../src/Divider/Divider.styl';

export default {
    components: {
        'sm-dropdown-menu': DropDownMenu,
        'sm-menu-item': MenuItem,
        'sm-icon': Icon,
        'sm-divider': Divider
    },
    initData() {
        return {
            value: '',
            items: Array.from({length: 10}).map((_, i) => ({value: i, label: `第${i}项`}))
        };
    }
};
</script>
```
