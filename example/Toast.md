
## Snackbar & Toast

`Snackbar` 是一种针对操作的轻量级反馈机制，常以一个小的弹出框的形式，出现在手机屏幕下方或者桌面左下方。它们出现在屏幕所有层的最上方，包括浮动操作按钮。

它们会在超时或者用户在屏幕其他地方点击之后自动消失。当它们出现时，不会阻碍用户在屏幕上的输入，并且也不支持输入。

`Toast` 同 `Snackbar` 非常相似，但是 `Toast` 并不包含操作。



#### 示例

```san Snackbar & Toast
<template>
    <div>
        <h3>
            Toast
        </h3>
        <section class="demo-toast-row">
            <label>位置</label>：
            <select value="{=toastPosition=}">
                <option value="leftTop">leftTop</option>
                <option value="rightTop">rightTop</option>
                <option value="leftBottom">leftBottom</option>
                <option value="rightBottom">rightBottom</option>
            </select>
        </section>

        <section class="demo-toast-row">
            <san-button
                variants="raised info"
                on-click="showToast">
                open Toast
            </san-button>
        </section>

        <san-toast
            message="稳住，我们能赢！"
            position="{{toastPosition}}"
            duration="{{duration}}"
            open="{{toast}}"></san-toast>

        <h3>
            Snackbar
        </h3>
        <section class="demo-toast-row">
            <label>位置</label>：
            <select value="{=snackbarPosition=}">
                <option value="leftTop">leftTop</option>
                <option value="rightTop">rightTop</option>
                <option value="leftBottom">leftBottom</option>
                <option value="rightBottom">rightBottom</option>
            </select>
        </section>

        <section class="demo-toast-row">
            <san-button
                variants="raised info"
                on-click="showSnackbar">
                open snackbar
            </san-button>
        </section>

        <san-toast
            message="稳住，我们赢不了"
            position="{{snackbarPosition}}"
            open="{{snackbar}}">
            <san-button variants="primary" on-click="handleActionClick($event)">
                {{action}}
            </san-button>
        </san-toast>

    </div>
</template>

<script>

    import Button from '../src/Button';
    import Toast from '../src/Toast';
    import '../src/Button/Button.styl';
    import '../src/Toast/Toast.styl';

    export default {

        components: {
            'san-button': Button,
            'san-toast': Toast
        },

        initData() {
            return {
                toastPosition: 'rightBottom',
                snackbarPosition: 'rightTop',
                duration: 1000,
                action: '投降'
            };
        },

        showToast() {
            this.data.set('toast', true);

        },

        showSnackbar() {
            this.data.set('snackbar', true);
        },

        handleActionClick(){
            console.log('action is clicked');
            this.data.set('snackbar', false);
        }

    }

</script>

<style>
    .demo-toast-row {
        padding: 1rem 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
</style>
```

## API

### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| message | String |  | 提示的信息 |
| open | Boolean | false | 提示框的状态，打开还是关闭 |
| action | String |  | 动作按钮上的文字 |
| duration | Number | 2000 | 延迟消失的毫秒值 |
| position | String | rigntBottom | 出现的位置，包括rightBottom，rightTop，leftBottom，leftTop |
 
### Slots

| 名称 | 描述|
| --- |   --- |
| default |   用于放置动作按钮，常用Flat Button |

