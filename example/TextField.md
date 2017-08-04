## Text Field

[text field](https://material.io/guidelines/components/text-fields.html) 可以让用户输入文本。它们可以是单行的，带或不带滚动条，也可以是多行的，并且带有一个图标。

```san 简单的使用
<template>
    <div>
        <div class="input-row">
            <san-text-field hintText="提示文字"/>
            <san-text-field inputValue="{=value=}"/>
            <san-text-field labelClass="labelClass" inputValue="123" label="标签文字" hintText="提示文字"/>
            <san-text-field label="浮动标签" inputValue="{{test}}" labelFloat/>
            <san-text-field hintText="提输入密码" label="密码" labelFloat type="password"/>
            <san-text-field hintText="多行文本输入，默认 3行，最大6行" multiLine rows="{{3}}" rowsMax="{{6}}"/>
            <san-text-field hintText="Full Width" fullWidth/>
        </div>
    </div>
</template>
<script>
import TextField from '../src/TextField';
import '../src/TextField/index.styl';
export default {

    components: {
        'san-text-field': TextField,
    },

    initData() {
        return {};
    },

    attached() {},
}
</script>
<style>
.input-row {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    align-items: flex-start;
}

.input-row .sm-text-field {
    margin-bottom: .1rem;
}

.input-row >p {
    padding: 1rem 0;
}

</style>
```

```san 错误状态样式
<template>
    <div>
        <div class="input-row">
        <san-text-field hintText="提示文字" errorText="这是必填项"/>
        <san-text-field label="标签文字" hintText="提示文字" errorText="请输入数字"/>
        <san-text-field label="浮动标签" errorText="出错！出错！" labelFloat/>
        <san-text-field hintText="多行输入" errorText="不能一个字都不输入哦" multiLine rows="{{3}}"/>
        <san-text-field label="自定义错误颜色" errorText="又输错了，笨死了！" errorColor="orange" labelFloat/>
        </div>
    </div>
</template>
<script>
import TextField from '../src/TextField';
import '../src/TextField/index.styl';
export default {

    components: {
        'san-text-field': TextField,
    },

    initData() {
        return {};
    },

    attached() {},
}
</script>
<style>
.input-row {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    align-items: flex-start;
}

.input-row .sm-text-field {
    margin-bottom: .1rem;
}

.input-row >p {
    padding: 1rem 0;
}

</style>
```

```san 使用图标的示例
<template>
    <div>
        <div class="input-row">
        <san-text-field hintText="简介" type="number" icon="menu"/>
        <san-text-field hintText="简介" multiLine rows="{{3}}" rowsMax="{{6}}" icon="menu"/>
        </div>
    </div>
</template>
<script>
import TextField from '../src/TextField';
import '../src/TextField/index.styl';
export default {

    components: {
        'san-text-field': TextField,
    },

    initData() {
        return {};
    },

    attached() {},
}
</script>
<style>
.input-row {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    align-items: flex-start;
}

.input-row .sm-text-field {
    margin-bottom: .1rem;
}

.input-row >p {
    padding: 1rem 0;
}

</style>
```

```san 输入框被禁用
<template>
    <div>
        <div class="input-row">
            <san-text-field hintText="提示文字" disabled/>
            <san-text-field label="带标签" disabled/>
            <san-text-field label="浮动标签" labelFloat disabled/>
            <san-text-field hintText="多行文本输入，默认 3行，最大6行" disabled multiLine rows="{{3}}" rowsMax="{{6}}"/>
        </div>
    </div>
</template>
<script>
import TextField from '../src/TextField';
import '../src/TextField/index.styl';
export default {

    components: {
        'san-text-field': TextField,
    },

    initData() {
        return {};
    },

    attached() {},
}
</script>
<style>
.input-row {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    align-items: flex-start;
}

.input-row .sm-text-field {
    margin-bottom: .1rem;
}

.input-row >p {
    padding: 1rem 0;
}

</style>
```


```san 输入字符记录
<template>
    <div>
        <div class="input-row">
            <san-text-field
                hintText="最多不超过10个字符"
                errorText="{{inputErrorText}}"
                on-textOverflow="handleInputOverflow($event)"
                maxLength="{{10}}"/>
            <san-text-field
                hintText="不允许超过100个字符"
                errorText="{{multiLineInputErrorText}}"
                on-textOverflow="handleMultiLineOverflow($event)"
                multiLine rows="{{3}}" rowsMax="{{6}}" maxLength="{{100}}"/>
        </div>
    </div>
</template>
<script>
import TextField from '../src/TextField';
import '../src/TextField/index.styl';
export default {

    components: {
        'san-text-field': TextField,
    },

    initData() {
        return {};
    },

    attached() {},
    handleInputOverflow(isOverflow) {
        this.data.set('inputErrorText', isOverflow === 'true' ? '超过啦！！！！' : '');
    },
    handleMultiLineOverflow(isOverflow) {
        this.data.set('multiLineInputErrorText', isOverflow === 'true' ? '超过啦！！！！' : '');
    }
}
</script>
<style>
.input-row {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    align-items: flex-start;
}

.input-row .sm-text-field {
    margin-bottom: .1rem;
}

.input-row >p {
    padding: 1rem 0;
}

</style>
```


## API

### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|name|string|false||表单名|
|type|string|false||输入框的类型|
|icon|string|false||输入框的图标|
|iconClass|string|false||图标的样式|
|label|string|false||输入框标签|
|labelClass|string|false||额外的标签样式类名|
|labelFocusClass|string|false||输入框获得焦点时标签的样式|
|hintText|string|false||提示文字|
|hintTextClass|string|false||提示文字样式|
|helpText|string|false||帮助文字|
|helpTextClass|string|false||帮助文字样式|
|errorText|string|false||错误提醒文字|
|errorTextClass|string|false||错误提醒文字样式|
|fullWidth|boolean|false|false|是否将宽度设置为100%|
|underlineShow|boolean|false|true|是否显示底部横线|
|underlineClass|string|false||底部横线样式|
|underlineFocusClass|string|false||输入框获取焦点时底部横线的样式|
|inputClass|string|false||输入框样式|
|multiLine|boolean|false|false|是否为多行输入|
|rows|number||1|行数|
|rowsMax|number|||最大行数|
|maxLength|number||0|可输入的最大长度|
|disabled|boolean|false|false|禁止|
|inputValue|string|false||控件值|

### 事件

|名称|描述|
|---|---|
|input-focus|输入框获取焦点时触发|
|input-blur|输入框失去焦点时触发|
|input-change|输入框发生输入时触发|
|input-keypress|输入框keypress事件触发|
|input-keydown|输入框发生keydown触发|
### 插槽

|名称|描述|
|---|---|
|default|用于和其它组件配合使用，可以保留输入框的样式，但内部表单组件可以放置其它的组件|
