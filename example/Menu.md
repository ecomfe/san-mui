## Menu

Menu 可选择的菜单组件

#### 示例

限高DropDown Menu

```san DropDown Menu
<template>
    <div>
        <san-dropdownmenu value="{{ 1 }}" maxHeight="120">
            <san-menuitem value="{{ 1 }}" title="MenuItem 1" />
            <san-menuitem value="{{ 2 }}" title="MenuItem 2" />
            <san-menuitem value="{{ 3 }}" title="MenuItem 3" />
            <san-menuitem value="{{ 4 }}" title="MenuItem 4" />
            <san-icon slot="iconButton">arrow_drop_down</san-icon>
        </san-dropdownmenu>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {DropDownMenu, MenuItem} from '../src/Menu';
import '../src/Menu/DropDownMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Icon/Icon.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-dropdownmenu': DropDownMenu,
        'san-menuitem': MenuItem
    }
};
</script>
```

带label值DropDown Menu - 绑定了change、close事件

```san DropDown Menu
<template>
    <div>
        <san-dropdownmenu on-change="dropDownChange($event)" on-close="dropDownClose()" value="{{ 2 }}">
            <san-menuitem value="{{ 1 }}" label="MenuItem 1" title="No.1" />
            <san-menuitem value="{{ 2 }}" label="MenuItem 2" title="No.2" />
            <san-menuitem value="{{ 3 }}" label="MenuItem 3" title="No.3" />
            <san-menuitem value="{{ 4 }}" label="MenuItem 4" title="No.4" />
            <san-icon slot="iconButton">arrow_drop_down</san-icon>
        </san-dropdownmenu>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {DropDownMenu, MenuItem} from '../src/Menu';
import '../src/Menu/DropDownMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Icon/Icon.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-dropdownmenu': DropDownMenu,
        'san-menuitem': MenuItem
    },
    dropDownChange(value) {
        console.log('value of dropdown menu changed to: ' + value);
    },
    dropDownClose() {
        console.log('menu closed');
    }
};
</script>
```


Disabled DropDown Menu

```san Disabled DropDown Menu
<template>
    <div>
        <san-dropdownmenu value="{{ 3 }}" disabled>
            <san-menuitem value="{{ 1 }}" label="MenuItem 1" title="No.1" />
            <san-menuitem value="{{ 2 }}" label="MenuItem 2" title="No.2" />
            <san-menuitem value="{{ 3 }}" label="MenuItem 3" title="No.3" />
            <san-menuitem value="{{ 4 }}" label="MenuItem 4" title="No.4" />
            <san-icon slot="iconButton">arrow_drop_down</san-icon>
        </san-dropdownmenu>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {DropDownMenu, MenuItem} from '../src/Menu';
import '../src/Menu/DropDownMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Icon/Icon.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-dropdownmenu': DropDownMenu,
        'san-menuitem': MenuItem
    }
};
</script>
```

自动展开 DropDown Menu

```san OpenImmediately DropDown Menu
<template>
    <div>
        <san-dropdownmenu value="{{ 1 }}" openImmediately="{{!0}}">
            <san-menuitem value="{{ 1 }}" label="MenuItem 1" title="No.1" />
            <san-menuitem value="{{ 2 }}" label="MenuItem 2" title="No.2" />
            <san-menuitem value="{{ 3 }}" label="MenuItem 3" title="No.3" />
            <san-menuitem value="{{ 4 }}" label="MenuItem 4" title="No.4" />
            <san-icon slot="iconButton">arrow_drop_down</san-icon>
        </san-dropdownmenu>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {DropDownMenu, MenuItem} from '../src/Menu';
import '../src/Menu/DropDownMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Icon/Icon.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-dropdownmenu': DropDownMenu,
        'san-menuitem': MenuItem
    }
};
</script>
```

Icon Menu - 点击列表项不关闭MENU，选项内嵌icon

```san Command Icon Menu 
<template>
    <div>
        <san-iconmenu icon="more_horiz" itemClickClose="{{!1}}" tooltip="操作">
            <san-menuitem title="MenuItem 1" />
            <san-menuitem title="MenuItem 2" />
            <san-divider />
            <san-menuitem title="Download" on-change="download()">
                <san-icon slot="leftIcon">file_download</san-icon>
            </san-menuitem>
            <san-menuitem title="MenuItem 4">
                <san-icon slot="rightIcon">chevron_right</san-icon>
                <san-icon slot="rightIcon">subdirectory_arrow_right</san-icon>
                <san-icon slot="rightIcon">notifications_off</san-icon>
            </san-menuitem>
        </san-iconmenu>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {IconMenu, MenuItem} from '../src/Menu';
import Divider from '../src/Divider';
import '../src/Menu/IconMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Icon/Icon.styl'
import '../src/Divider/Divider.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-iconmenu': IconMenu,
        'san-menuitem': MenuItem,
        'san-divider': Divider
    },
    download() {
        console.log('starting to download');
    }
};
</script>
```


Icon Menu - 调整menu位置 ``anchorOrigin: {vertical: 'bottom',horizontal: 'right'},
targetOrigin: {horizontal: 'left',vertical: 'top'}``

```san Icon Menu 
<template>
    <div>
        <san-iconmenu icon="more_horiz" anchorOrigin="{{anchorOrigin}}" targetOrigin="{{targetOrigin}}">
            <san-menuitem title="MenuItem 1" />
            <san-menuitem title="MenuItem 2" />
            <san-divider />
            <san-menuitem title="Download" on-change="download()">
                <san-icon slot="leftIcon">file_download</san-icon>
            </san-menuitem>
            <san-menuitem title="MenuItem 4">
                <san-icon slot="rightIcon">chevron_right</san-icon>
                <san-icon slot="rightIcon">subdirectory_arrow_right</san-icon>
                <san-icon slot="rightIcon">notifications_off</san-icon>
            </san-menuitem>
        </san-iconmenu>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {IconMenu, MenuItem} from '../src/Menu';
import Divider from '../src/Divider';
import '../src/Menu/IconMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Icon/Icon.styl'
import '../src/Divider/Divider.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-iconmenu': IconMenu,
        'san-menuitem': MenuItem,
        'san-divider': Divider
    },
    initData() {
        return {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            },
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top'
            }
        };
    },
    download() {
        console.log('starting to download');
    }
};
</script>
```

Icon Menu - MENU渲染在一个隐形层之上，防止触发其他对象的点击事件

```san Icon Menu useLayerForClickAway
<template>
    <div>
        <san-iconmenu icon="more_horiz" useLayerForClickAway="{{!0}}">
            <san-menuitem title="MenuItem 1" />
            <san-menuitem title="MenuItem 2" />
            <san-divider />
            <san-menuitem title="MenuItem 3" />
            <san-menuitem title="MenuItem 4" />
        </san-iconmenu>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {IconMenu, MenuItem} from '../src/Menu';
import Divider from '../src/Divider';
import '../src/Menu/IconMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Icon/Icon.styl'
import '../src/Divider/Divider.styl';
export default {
    components: {
        'san-icon': Icon,
        'san-iconmenu': IconMenu,
        'san-menuitem': MenuItem,
        'san-divider': Divider
    }
};
</script>
```

多选Icon Menu

```san Multiple Icon Menu
<template>
    <div>
        <san-iconmenu
            icon="more_verti"
            value="{{ multipleValues }}"
            multiple 
            all="{{ all }}"
            on-change="iconMenuMultipleChange($event)"
        >
            <san-menuitem value="{{ 1 }}" title="multiple 1" />
            <san-menuitem value="{{ 2 }}" title="multiple 2" />
            <san-menuitem value="{{ 3 }}" title="multiple 3" />
            <san-menuitem value="{{ 4 }}" title="multiple 4" />
        </san-iconmenu>
        <san-button on-click="toggleChooseAll($event)">toggle全选</san-button>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {IconMenu, MenuItem} from '../src/Menu';
import {Button} from '../src/Button';
import '../src/Menu/IconMenu.styl';
import '../src/Menu/MenuItem.styl';
import '../src/Button/Button.styl';
export default {
    components: {
        'san-iconmenu': IconMenu,
        'san-menuitem': MenuItem,
        'san-button': Button
    },
    initData() {
        return {
            multipleValues: [3,1],
            all: false
        };
    },
    iconMenuMultipleChange(value) {
        console.log('iconmenu multiple values changed to: ' + JSON.stringify(value));
    },
    toggleChooseAll() {
        this.data.set('all', !this.data.get('all'));
    }
};
</script>
```
