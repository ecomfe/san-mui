## Drawer 抽屉式导航

[Drawer](https://material.google.com/patterns/navigation-drawer.html) 抽屉式导航是 Google 应用程序中一种常见的模式。抽屉导航从左侧滑出，它遵循列表的关键设计线和标准。

示例

```san 简单示例
<template>
    <div>
        <section class="demo-drawer-row">
            <h4>位置</h4>
            <div class="demo-drawer-radios">
                <sm-radio
                    label="左侧"
                    value="left"
                    checked="{=position=}" />
                <sm-radio
                    label="右侧"
                    value="right"
                    checked="{=position=}" />
                <sm-radio
                    label="上方"
                    value="top"
                    checked="{=position=}" />
                <sm-radio
                    label="下方"
                    value="bottom"
                    checked="{=position=}" />
            </div>
        </section>
        <section class="demo-drawer-row">
            <h4>使用遮罩层</h4>
            <div class="demo-drawer-radios">
                <sm-switch value="{=useMask=}" onValue="{{!0}}" offValue="{{!1}}" />
            </div>
        </section>
        <section class="demo-drawer-row">
            <san-button
                variants="raised info"
                on-click="onDemoButtonClick">
                toggle drawer
            </san-button>
        </section>
        <san-drawer position="{{position}}" open="{=open=}" useMask="{{useMask}}">
            <ul>
                <li>a</li>
                <li>b</li>
                <li>c</li>
                <li>d</li>
                <li>e</li>
            </ul>
        </san-drawer>
    </div>
</template>

<script>

import Drawer from '../src/Drawer';
import Button from '../src/Button';
import Switch from '../src/Switch';
import Radio from '../src/Radio';

import '../src/Switch/Switch.styl';
import '../src/Drawer/Drawer.styl';
import '../src/Button/Button.styl';

export default {

    components: {
        'san-drawer': Drawer,
        'san-button': Button,
        'sm-radio': Radio,
        'sm-switch': Switch
    },

    initData() {
        return {
            open: false,
            size: 300,
            position: 'left',
            useMask: true
        };
    },

    onDemoButtonClick(e) {
        this.data.set('open', !this.data.get('open'));
        console.log(this.data.get('open'));
    }

}

</script>

<style>
.demo-drawer-radios {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
}
.demo-drawer-radios >* {
    margin: .5rem 0;
}
</style>
```


### API

| 名称 | 类型 | 必须 | 默认值 | 描述|
|---|---|---|---|---|
|size|number|false|300|抽屉的大小|
|position|string|false|left|抽屉的位置，可选值为 `left` `right` `top` `bottom`|
|useMask|boolean|false|true|在抽屉打开时是否使用遮罩层；点击遮罩层会收起抽屉|
|open|boolean|false|false|是否打开抽屉|
