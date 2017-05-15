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
