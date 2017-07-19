## 对话框 Dialog

[对话框 Dialog](https://material.google.com/components/dialogs.html) 用于提示用户作一些决定，或者是完成某个任务时需要的一些其它额外的信息。 Dialog可以是用一种 取消/确定 的简单应答模式，也可以是自定义布局的复杂模式，比如说一些文本设置或者是文本输入 。

示例：

```san 简单的示例
<template>
    <div>
        <san-button on-click="openDialog">open a dialog</san-button>
        <san-dialog open="{=open=}">
            <div class="demo-dialog-title" slot="title">
                <san-icon>warning</san-icon>
                确认要删除吗？
            </div>
            <div>这里是弹框的内容呀</div>
            <div slot="actions">
                <san-button on-click="closeDialog" variants="info">cancel</san-button>
                <san-button on-click="closeDialog" variants="danger">delete</san-button>
            </div>
        </san-dialog>
    </div>
</template>
<script>
import Button from '../src/Button';
import Dialog from '../src/Dialog';
import Icon from '../src/Icon';

import '../src/Button/Button.styl';
import '../src/Dialog/Dialog.styl';
import '../src/Icon/Icon.styl';

export default {
    components: {
        'san-dialog': Dialog,
        'san-button': Button,
        'san-icon': Icon
    },
    initData() {
        return {
            open: false
        };
    },
    openDialog() {
        this.data.set('open', true);
    },
    closeDialog() {
        this.data.set('open', false);
    }
}
</script>
```

上边的例子中点击在弹窗侧的遮罩会自动关闭掉弹窗。如果你不想这样做，可以将 `closeOnClickMask` 设置为 false；

```san 禁止点击遮罩关闭弹窗
<template>
    <div>
        <san-button on-click="openDialog">open a dialog</san-button>
        <san-dialog open="{=open=}" closeOnClickMask="{{!1}}">
            <div class="demo-dialog-title" slot="title">
                <san-icon>warning</san-icon>
                确认要删除吗？
            </div>
            <div>这里是弹框的内容呀</div>
            <div slot="actions">
                <san-button on-click="closeDialog" variants="info">cancel</san-button>
                <san-button on-click="closeDialog" variants="danger">delete</san-button>
            </div>
        </san-dialog>
    </div>
</template>
<script>
import Button from '../src/Button';
import Dialog from '../src/Dialog';
import Icon from '../src/Icon';

import '../src/Button/Button.styl';
import '../src/Dialog/Dialog.styl';
import '../src/Icon/Icon.styl';

export default {
    components: {
        'san-dialog': Dialog,
        'san-button': Button,
        'san-icon': Icon
    },
    initData() {
        return {
            open: false
        };
    },
    openDialog() {
        this.data.set('open', true);
    },
    closeDialog() {
        this.data.set('open', false);
    }
}
</script>
<style>
.demo-dialog-title {
    display: flex;
    flex-flow: nowrap row;
    align-items: center;
    font-size: 1rem;
}

.demo-dialog-title >.sm-icon {
    margin-right: .5rem;
}
</style>
```

或者根本不使用遮罩层

```san 不使用遮罩层
<template>
    <div>
        <san-button on-click="openDialog">open a dialog</san-button>
        <san-dialog open="{=open=}" useMask="{{!1}}">
            <div class="demo-dialog-title" slot="title">
                <san-icon>warning</san-icon>
                <label>确认要删除吗？</label>
            </div>
            <div>这里是弹框的内容呀</div>
            <div slot="actions">
                <san-button on-click="closeDialog" variants="info">cancel</san-button>
                <san-button on-click="closeDialog" variants="danger">delete</san-button>
            </div>
        </san-dialog>
    </div>
</template>
<script>
import Button from '../src/Button';
import Dialog from '../src/Dialog';
import Icon from '../src/Icon';

import '../src/Button/Button.styl';
import '../src/Dialog/Dialog.styl';
import '../src/Icon/Icon.styl';

export default {
    components: {
        'san-dialog': Dialog,
        'san-button': Button,
        'san-icon': Icon
    },
    initData() {
        return {
            open: false
        };
    },
    openDialog() {
        this.data.set('open', true);
    },
    closeDialog() {
        this.data.set('open', false);
    }
}
</script>
<style>
.demo-dialog-title {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 1rem;
    width: 100%;
}

.demo-dialog-title >.sm-icon {
    margin-right: .5rem;
}

.demo-dialog-title >label {
    flex: 1 1 auto;
}

</style>
```

在内容比较多的时候，可以设置 `maxHeight` 来限定对话窗的大小；内容区域会出现滚动条；

```san 设置最大高度
<template>
    <div>
        <san-button on-click="openDialog">open a dialog</san-button>
        <san-dialog open="{=open=}" maxHeight="600px">
            <div class="demo-dialog-title" slot="title">
                Use Google's location service?
            </div>
            <ul>
                <li san-for="item in list">
                    {{item}}
                </li>
            </ul>
            <div slot="actions">
                <san-button on-click="closeDialog" variants="info">no thanks</san-button>
                <san-button on-click="closeDialog" variants="success">Use It</san-button>
            </div>
        </san-dialog>
    </div>
</template>
<script>
import Button from '../src/Button';
import Dialog from '../src/Dialog';
import Icon from '../src/Icon';

import '../src/Button/Button.styl';
import '../src/Dialog/Dialog.styl';
import '../src/Icon/Icon.styl';

export default {
    components: {
        'san-dialog': Dialog,
        'san-button': Button,
        'san-icon': Icon
    },
    initData() {
        return {
            open: false,
            list: Array.from({length: 100}).map((_, index) => `第${index}行`)
        };
    },
    openDialog() {
        this.data.set('open', true);
    },
    closeDialog() {
        this.data.set('open', false);
    }
}
</script>
```

> 请注意：在打开任何对话窗时，整个页面的滚动都会被锁定；关掉对话窗后恢复可以滚动。

## API

### 属性

| 名称 | 类型 | 必须 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| open | boolean | false | false | 是否打开弹窗 |
| closeOnClickMask | boolean | false | true | 是否在点击遮罩层时关闭弹窗 |
| useMask | boolean | false | true | 是否使用遮罩层 |
| maxHeight | string | false | 无 | 对话窗内容的最大高度，不包括底层按钮区域 |

### 事件

无

### 插槽

|名称|描述|
|---|---|
|actions|底部按钮区域插槽|
|default|内部区别插槽|
|title|标题插槽|
