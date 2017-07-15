## Menu

Menu 可选择的菜单组件

菜单可以支持多级嵌套：

> 给 `MenuItem` 设置 `cascade` 属性，并在插入 `submenu` 插槽

```san 多级嵌套
<template>
    <div style="display: flex; align-items: flex-start">
        <sm-paper>
            <sm-menu style="min-width: 15rem">
                <sm-menu-item title="开发者" cascade>
                    <sm-menu slot="submenu" style="min-width: 15rem">
                        <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                        <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                        <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                        <sm-menu-item title="JavaScript 控制台" cascade>
                            <sm-menu slot="submenu" style="min-width: 15rem">
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                            </sm-menu>
                        </sm-menu-item>
                        <sm-menu-item title="JavaScript 控制台" cascade>
                            <sm-menu slot="submenu" style="min-width: 15rem">
                                <sm-menu-item title="JavaScript 控制台" />
                                <sm-menu-item title="JavaScript 控制台" />
                                <sm-menu-item title="JavaScript 控制台" />
                                <sm-menu-item title="JavaScript 控制台" />
                                <sm-menu-item title="JavaScript 控制台" />
                            </sm-menu>
                        </sm-menu-item>
                    </sm-menu>
                </sm-menu-item>
                <sm-menu-item title="开发者" cascade>
                    <sm-menu slot="submenu" style="min-width: 15rem">
                        <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                        <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                        <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                        <sm-menu-item title="JavaScript 控制台" cascade>
                            <sm-menu slot="submenu" style="min-width: 15rem">
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                                <sm-menu-item title="JavaScript 控制台" subTitle="⌘J" />
                            </sm-menu>
                        </sm-menu-item>
                        <sm-menu-item title="JavaScript 控制台" cascade>
                            <sm-menu slot="submenu" style="min-width: 15rem">
                                <sm-menu-item title="JavaScript 控制台" />
                                <sm-menu-item title="JavaScript 控制台" />
                                <sm-menu-item title="JavaScript 控制台" />
                                <sm-menu-item title="JavaScript 控制台" />
                                <sm-menu-item title="JavaScript 控制台" />
                            </sm-menu>
                        </sm-menu-item>
                    </sm-menu>
                </sm-menu-item>
            </sm-menu>
        </sm-paper>
    </div>
</template>
<script>
import {MenuItem, Menu} from '../../src/Menu';
import Icon from '../../src/Icon';
import Divider from '../../src/Divider';
import Paper from '../../src/Paper';
import '../../src/Menu/index.styl';
import '../../src/Icon/Icon.styl';
import '../../src/Divider/Divider.styl';
import '../../src/Paper/Paper.styl';

export default {
    components: {
        'sm-menu': Menu,
        'sm-menu-item': MenuItem,
        'sm-paper': Paper,
        'sm-icon': Icon,
        'sm-divider': Divider
    }
};
</script>
```

示例

```san 简单使用
<template>
    <div>
        <sm-paper>
            <sm-menu>
                <sm-menu-item title="MenuItem 1" />
                <sm-menu-item title="MenuItem 2" />
                <sm-menu-item title="MenuItem 3" />
                <sm-divider />
                <sm-menu-item title="MenuItem 4" />
            </sm-menu>
        </sm-paper>
    </div>
</template>
<script>
import {MenuItem, Menu} from '../../src/Menu';
import Icon from '../../src/Icon';
import Paper from '../../src/Paper';
import Divider from '../../src/Divider';
import '../../src/Menu/Menu.styl';
import '../../src/Icon/Icon.styl';
import '../../src/Paper/Paper.styl';
import '../../src/Divider/Divider.styl';

export default {
    components: {
        'sm-menu': Menu,
        'sm-menu-item': MenuItem,
        'sm-icon': Icon,
        'sm-paper': Paper,
        'sm-divider': Divider
    }
};
</script>
```

你可以结合 `Icon` 一起使用

```san 结合 Icon 一起使用
<template>
    <div style="display: flex; align-items: flex-start">
        <sm-paper>
            <sm-menu>
                <sm-menu-item title="播放" on-click="command('play')">
                    <sm-icon slot="leftIcon">play_arrow</sm-icon>
                </sm-menu-item>
                <sm-menu-item title="下一首" on-click="command('next')">
                    <sm-icon slot="leftIcon">skip_next</sm-icon>
                </sm-menu-item>
                <sm-menu-item title="上一首" on-click="command('previous')">
                    <sm-icon slot="leftIcon">skip_previous</sm-icon>
                </sm-menu-item>
                <sm-divider />
                <sm-menu-item title="反馈" />
            </sm-menu>
        </sm-paper>
        <sm-paper style="margin-left: 1rem">
            <sm-menu>
                <sm-menu-item title="用户">
                    <sm-icon slot="rightIcon">face</sm-icon>
                </sm-menu-item>
                <sm-menu-item title="喜欢">
                    <sm-icon slot="rightIcon">favorite</sm-icon>
                </sm-menu-item>
                <sm-menu-item title="标签">
                    <sm-icon slot="rightIcon">label</sm-icon>
                </sm-menu-item>
                <sm-menu-item title="支付">
                    <sm-icon slot="rightIcon">payment</sm-icon>
                </sm-menu-item>
                <sm-divider />
                <sm-menu-item title="反馈">
                    <sm-icon slot="rightIcon">feedback</sm-icon>
                </sm-menu-item>
            </sm-menu>
        </sm-paper>
    </div>
</template>
<script>
import {MenuItem, Menu} from '../../src/Menu';
import Icon from '../../src/Icon';
import Divider from '../../src/Divider';
import Paper from '../../src/Paper';
import '../../src/Menu';
import '../../src/Icon/Icon.styl';
import '../../src/Divider/Divider.styl';
import '../../src/Paper/Paper.styl';

export default {
    components: {
        'sm-menu': Menu,
        'sm-menu-item': MenuItem,
        'sm-paper': Paper,
        'sm-icon': Icon,
        'sm-divider': Divider
    },
    command(type) {
        console.log(`command: ${type}`);
    }
};
</script>
```

> 请注意：Menu 中只要任意一个 MenuItem 带有 `leftIcon`，那么此 Menu 中的所有的 MenuItem 都会有左侧缩进

我们在右侧不仅可以放置 Icon，还可以放置文本，一般用于快捷的标识：

```san 使用属性 subTitle 设置右侧文本
<template>
    <div style="display: flex; align-items: flex-start">
        <sm-paper>
            <sm-menu style="min-width: 10rem">
                <sm-menu-item
                    title="播放"
                    on-click="command('play')"
                    subTitle="⌘p" />
                <sm-menu-item
                    title="下一首"
                    on-click="command('next')"
                    subTitle="⌘→" />
                <sm-menu-item
                    title="上一首"
                    on-click="command('previous')"
                    subTitle="⌘←" />
                <sm-divider />
                <sm-menu-item title="反馈" />
            </sm-menu>
        </sm-paper>
    </div>
</template>
<script>
import {MenuItem, Menu} from '../../src/Menu';
import Icon from '../../src/Icon';
import Divider from '../../src/Divider';
import Paper from '../../src/Paper';
import '../../src/Menu';
import '../../src/Icon/Icon.styl';
import '../../src/Divider/Divider.styl';
import '../../src/Paper/Paper.styl';

export default {
    components: {
        'sm-menu': Menu,
        'sm-menu-item': MenuItem,
        'sm-paper': Paper,
        'sm-icon': Icon,
        'sm-divider': Divider
    },
    command(type) {
        console.log(`command: ${type}`);
    }
};
</script>
```

`MenuItem` 可以根据情况设定是否可以点击：

```san 禁用项
<template>
    <div style="display: flex; align-items: flex-start">
        <sm-paper>
            <sm-menu style="min-width: 10rem">
                <sm-menu-item
                    title="播放"
                    on-click="command('play')"
                    disabled
                    subTitle="⌘p" />
                <sm-menu-item
                    title="下一首"
                    on-click="command('next')"
                    subTitle="⌘→" />
                <sm-menu-item
                    title="上一首"
                    on-click="command('previous')"
                    subTitle="⌘←" />
                <sm-divider />
                <sm-menu-item title="反馈" />
            </sm-menu>
        </sm-paper>
    </div>
</template>
<script>
import {MenuItem, Menu} from '../../src/Menu';
import Icon from '../../src/Icon';
import Divider from '../../src/Divider';
import Paper from '../../src/Paper';
import '../../src/Menu';
import '../../src/Icon/Icon.styl';
import '../../src/Divider/Divider.styl';
import '../../src/Paper/Paper.styl';

export default {
    components: {
        'sm-menu': Menu,
        'sm-menu-item': MenuItem,
        'sm-paper': Paper,
        'sm-icon': Icon,
        'sm-divider': Divider
    },
    command(type) {
        console.log(`command: ${type}`);
    }
};
</script>
```

多选与单选菜单

```san 单选与复选
<template>
    <div>
        <sm-paper>
            <sm-menu style="min-width: 20rem">
                <sm-menu-item
                    title="复选1"
                    type="checkbox"
                    checked="{=value1=}"
                    value="checkbox1" />
                <sm-menu-item
                    title="复选3"
                    type="checkbox"
                    checked="{=value1=}"
                    value="checkbox2" />
                <sm-menu-item
                    title="复选3"
                    type="checkbox"
                    checked="{=value1=}"
                    value="checkbox3" />
                <sm-divider />
                <sm-menu-item
                    title="单选1"
                    type="radio"
                    checked="{=value2=}"
                    value="radio1" />
                <sm-menu-item
                    title="单选3"
                    type="radio"
                    checked="{=value2=}"
                    value="radio2" />
                <sm-menu-item
                    title="单选3"
                    type="radio"
                    checked="{=value2=}"
                    value="radio3" />
            </sm-menu>
        </sm-paper>
    </div>
</template>
<script>
import {MenuItem, Menu} from '../../src/Menu';
import Icon from '../../src/Icon';
import Paper from '../../src/Paper';
import Divider from '../../src/Divider';
import '../../src/Menu/Menu.styl';
import '../../src/Icon/Icon.styl';
import '../../src/Paper/Paper.styl';
import '../../src/Divider/Divider.styl';

export default {
    components: {
        'sm-menu': Menu,
        'sm-menu-item': MenuItem,
        'sm-icon': Icon,
        'sm-paper': Paper,
        'sm-divider': Divider
    },
    initData() {
        return {
            value1: ['checkbox2'],
            value2: 'radio3'
        };
    }
};
</script>
```
