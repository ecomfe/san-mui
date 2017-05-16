## Button

### 弹层组件

#### 示例

```san 1、左侧出现的popover
<template>
    <div>
        <button id="popover-left">popover</button>
        <san-popover placement="left" triggerEleId="popover-left" triggerOperation="click" on-show="onShow()" on-hide="onHide()">
            <p>This is a popover!</p>
            <p>popover content!</p>
        </san-popover>
    </div>
</template>

<script type="text/javascript">
import Popover from '../src/Popover';
import '../src/Popover/index.styl';

export default {
    components: {
        'san-popover': Popover
    },
    onShow() {
        console.log('popover show');
    },
    onHide() {
        console.log('popover hide');
    }
};
</script>
```

```san 2、顶部出现的popover
<template>
    <div>
        <button id="popover-top">popover</button>
        <san-popover placement="top" triggerEleId="popover-top" triggerOperation="click">
            <p>This is a popover!</p>
            <p>popover content!</p>
        </san-popover>
    </div>
</template>

<script type="text/javascript">
import Popover from '../src/Popover';
import '../src/Popover/index.styl';

export default {
    components: {
        'san-popover': Popover
    }
};
</script>
```

```san 3、底部的popover(不显示小箭头)
<template>
    <div>
        <button id="popover-bottom">popover(不显示小箭头)</button>
        <san-popover placement="bottom" triggerEleId="popover-bottom" showArrow="false" triggerOperation="click">
            <p>This is a popover!</p>
            <p>popover content!</p>
        </san-popover>
    </div>
</template>

<script type="text/javascript">
import Popover from '../src/Popover';
import '../src/Popover/index.styl';

export default {
    components: {
        'san-popover': Popover
    }
};
</script>
```

```san 4、右侧出现的popover
<template>
    <div>
        <button id="popover-right">popover</button>
        <san-popover placement="right" triggerEleId="popover-right" triggerOperation="click">
            <p>This is a popover!</p>
            <p>popover content!</p>
        </san-popover>
    </div>
</template>

<script type="text/javascript">
import Popover from '../src/Popover';
import '../src/Popover/index.styl';

export default {
    components: {
        'san-popover': Popover
    }
};
</script>
```

```san 5、focus出现的popover
<template>
    <div>
        <input id="input" name="" placeholder="我是focus出现的popover">
        <san-popover triggerEleId="input" triggerOperation="focus">
            <p>This is a popover!</p>
            <p>popover content!</p>
        </san-popover>
    </div>
</template>

<script type="text/javascript">
import Popover from '../src/Popover';
import '../src/Popover/index.styl';

export default {
    components: {
        'san-popover': Popover
    }
};
</script>

<style type="text/css">
#input {
    width: 160px;
}
</style>
```



## API

### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| triggerEleId | string | | 触发 popover 浮层显示的元素id，需要根据此元素的位置计算弹出的位置 |
| triggerOperation | string | click | 定义如何触发弹出框，支持 “click”、 “focus” 两种类型 |
| showArrow | boolean | true | 是否显示浮层小箭头 |
| placement | string | bottom | 浮层出现方向，支持 “bottom”、 “top”、 “left”、 “right” |
| animation | boolean | true | 向弹出框应用 CSS 褪色过渡效果 |
| open | boolean | false | 浮层是否直接显示出来 |


### Events

| 名称 | 描述|
| --- | --- |
| show | 当浮层显示的时候触发 |
| hide | 当浮层隐藏的时候触发 |


### Slots

| 名称 | 描述|
| --- | --- |
| default | 内容部分 |


### Function

| 名称 | 描述|
| --- | --- |
| show | 显示浮层 |
| hide | 隐藏浮层 |
| toggle | 显示/隐藏浮层 |


