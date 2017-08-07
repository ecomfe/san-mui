## 进度指示器 Progress

### 线形进度指示器 Linear Progress

Linear Progress 线形进度指示器应始终从 0％ 到 100％ 显示，绝不能从高到低反着来。如果一个队列里有多个正在进行的操作，使用一个进度指示器来指示整体的所需要等待的时间。这样，当指示器达到 100％ 时，它不会返回到0％再重新开始。

### 示例

```san Indeterminate Linear Progress
<template>
    <div>
        <san-linear-progress />
    </div>
</template>
<script>
import {LinearProgress} from '../src/Progress';
import '../src/Progress/LinearProgress.styl';
export default {
    components: {
        'san-linear-progress': LinearProgress
    }
};
</script>
```

```san Determinate Linear Progress
<template>
    <div>
        <san-linear-progress mode="determinate" value="{{value}}" />
        当前进度: {{value}}%
    </div>
</template>
<script>
import {LinearProgress} from '../src/Progress';
import '../src/Progress/LinearProgress.styl';
export default {
    components: {
        'san-linear-progress': LinearProgress
    },
    initData() {
        return {value: 0};
    },
    attached() {
        this.timer = setInterval(() => {
            let value = this.data.get('value');
            this.data.set('value', (value + Math.ceil(Math.random() * 20)) % 100);
        }, 1000);
    },

    detached() {
        clearTimeout(this.timer);
    }
};
</script>
```

### 环型进度指示器 Circular Progress

Circular Progress 环型进度指示器

### 示例

```san Indeterminate Circular Progress
<template>
    <div class="demo-progress-row">
        <san-circular-progress />
    </div>
</template>
<script>
import {CircularProgress} from '../src/Progress';
import '../src/Progress/CircularProgress.styl';
export default {
    components: {
        'san-circular-progress': CircularProgress
    }
};
</script>
```

```san Determinate Circular Progress
<template>
    <div class="demo-progress-row">
        <san-circular-progress mode="determinate" value="{{value}}" />
        <label class="demo-progress-row-text">当前进度: {{value}}%</label>
    </div>
</template>
<script>
import {CircularProgress} from '../src/Progress';
import '../src/Progress/CircularProgress.styl';
export default {
    components: {
        'san-circular-progress': CircularProgress
    },
    initData() {
        return {value: 0};
    },
    attached() {
        this.timer = setInterval(() => {
            let value = this.data.get('value');
            this.data.set('value', (value + Math.ceil(Math.random() * 20)) % 100);
        }, 1000);
    },

    detached() {
        clearTimeout(this.timer);
    }
};
</script>
<style>
.demo-progress-row {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
}
.demo-progress-row-text {
    display: block;
    margin: 1rem;
}
</style>
```

此外，环型进度指示器还可以通过属性 `size` 来指定大小。

```san 各种尺寸的进度指示器
<template>
    <div class="demo-circle-progress-size">
        <san-circular-progress mode="indeterminate" />
        <san-circular-progress mode="indeterminate" size="60" strokeWidth="{{3}}" />
        <san-circular-progress mode="indeterminate" size="100" strokeWidth="{{5}}" />
    </div>
</template>
<script>
import {CircularProgress, LinearProgress} from '../src/Progress';
export default {
    components: {
        'san-circular-progress': CircularProgress,
        'san-linear-progress': LinearProgress
    }
};
</script>
<style>
.demo-circle-progress-size {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>
```

## API

### Linear Progress

#### 属性

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| value | number | 0 | 当前进度值 |
| mode | string | indeterminate | 是否使用 value 来控制进度值 |
| max | number | 100 | 最大值 |
| min | number | 0 | 最小值 |

#### 事件

无

#### 插槽

无

### Circular Progress

#### 属性

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| value | number | 0 | 当前进度值 |
| mode | string | indeterminate | 是否使用 value 来控制进度值 |
| max | number | 100 | 最大值 |
| min | number | 0 | 最小值 |
| value | number | 0 | 进度值 |
| size | number | 32 | 环型进度指示器的半径 |
| strokeWidth | number | 2 | 环型进度指示器的线条粗细 |

#### 事件

无

#### 插槽

无
