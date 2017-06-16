
## Notification 

`Notification` 悬浮出现在页面右上角，显示全局的通知提醒消息。



#### 基本用法
Notification 组件提供通知功能，提供了`Notification`方法，接收一个`options`字面量参数，在最简单的情况下，你可以设置`title`字段和`message`字段，用于设置通知的标题和正文。默认情况下，经过一段时间后 `Notification` 组件会自动关闭，但是通过设置`duration`，可以控制关闭的时间间隔，特别的是，如果设置为`0`，则不会自动关闭。注意：`duration`接收一个`Number`，单位为毫秒，默认为`3000`。
当鼠标移到通知上时，会停止自动关闭，鼠标移开后重新开始`duration`计时之后关闭。

```san Notification
   <template>
    <div>
        <san-button
            variants="raised info"
            on-click="handleClick01">
            自动关闭
        </san-button>
        <san-button
            variants="raised info"
            on-click="handleClick02">
            不会自动关闭
        </san-button>
    </div>
</template>

<script>
import Notification from '../src/Notification';
import '../src/Notification/Notification.styl';
import Button from '../src/Button';
import '../src/Button/Button.styl';

export default {
    components: {
        'san-button': Button
    },
    handleClick01() {
        Notification({
            message: '欢迎来到王者荣耀',
            title: '成功'
        })
    },
    handleClick02() {
        Notification({
            message: '欢迎来到王者荣耀',
            title: '成功',
            duration: 0
        })
    }
}
</script>
```

#### 带有倾向性
带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息, 也可以通过`Notification.success(options)`进行调用

```san Notification
<template>
    <div>
        <san-button
            variants="raised info"
            on-click="handleClick01">
            成功
        </san-button>
        <san-button
            variants="raised info"
            on-click="handleClick02">
            警告
        </san-button>
        <san-button
            variants="raised info"
            on-click="handleClick03">
            信息
        </san-button>
        <san-button
            variants="raised info"
            on-click="handleClick04">
            错误
        </san-button>
        <san-button
            variants="raised info"
            on-click="handleClick05">
            简化调用
        </san-button>
    </div>
</template>

<script>
import Notification from '../src/Notification';
import '../src/Notification/Notification.styl';
import Button from '../src/Button';
import '../src/Button/Button.styl';

export default {
    components: {
        'san-button': Button
    },
    handleClick01() {
        Notification({
            message: '欢迎来到王者荣耀',
            title: '成功',
            type: 'success'
        })
    },
    handleClick02() {
        Notification({
            message: '高地塔正在遭受攻击',
            title: '警告',
            type: 'warning'
        })
    },
    handleClick03() {
        Notification({
            message: '敌人消灭了大龙和小龙',
            title: '信息',
            type: 'info'
        })
    },
    handleClick04() {
        Notification({
            message: '不可以攻击己方水晶',
            title: '错误',
            type: 'error'
        })
    },
     handleClick05() {
         Notification.success('简化调用')
     }
}
</script>
```
#### 带有偏移量
让 `Notification` 距离顶部偏移一些位置。注意，同时间不同的`Notification`偏移量应该保持一致，否则会出现间隔过大或重叠等不符预期的情况。

```san Notification
<template>
    <div>
        <san-button
            variants="raised info"
            on-click="handleClick01">
            带有偏移量
        </san-button>
    </div>
</template>

<script>
import Notification from '../src/Notification';
import '../src/Notification/Notification.styl';
import Button from '../src/Button';
import '../src/Button/Button.styl';

export default {
    components: {
        'san-button': Button
    },
    handleClick01() {
        Notification({
            message: '偏移了100px',
            title: '成功',
            offset:100
        })
    }
}
</script>
```


## API

### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| title | String |  | 提示的标题 |
| message | String |  | 提示的内容 |
| customClass |String| | 通知框的自定义class |
| offset | Number |  | 距离可视区域顶部的高度偏移值 |
| onClick | Function |  | 自定义点击事件回调函数 |
| onClose | Function |  | 自定义点击close后的回调函数 |
| duration | Number | 3000 | 延迟消失的毫秒值，设置为0即不会自动消失 |
| type | String | | 提示类型，包括success,error,warning,info,超出这四种会无效 |
 
 

