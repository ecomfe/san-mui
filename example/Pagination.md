## Button

### 分页组件

#### 示例

```san 1、只指定总条数（必传参数），其他使用默认参数
<template>
    <div>
        <san-pagination total="345"></san-pagination>
    </div>
</template>

<script type="text/javascript">

import Pagination from '../src/Pagination';
import '../src/Pagination/index.styl';

export default {
    components: {
        'san-pagination': Pagination
    }
};
</script>

```

```san 2、指定当前页码、总条数、页长、显示页长切换器、页长选项、上下翻页显示文字、页码变换回调、页长变换回调
<template>
    <div>
        <san-pagination
            current="3"
            total="200"
            pageSize="13"
            showSizeChanger="true"
            pageSizeOptions="[5, 10, 20]"
            nextPageText="下一页"
            lastPageText="上一页"
            on-pageChange="onPageChange($event)"
            on-pageSizeChange="onPageSizeChange($event)">
        </san-pagination>
    </div>
</template>

<script type="text/javascript">

import Pagination from '../src/Pagination';
import '../src/Pagination/index.styl';

export default {
    components: {
        'san-pagination': Pagination
    },
    onPageChange(data) {
        console.log(data);
    },
    onPageSizeChange(data) {
        console.log(data);
    }
};
</script>

```


## API

### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| pageSize | number | 10 | 页长（每页显示条数）当显示了 pageSize 选择框 pageSize 只能是可选项里的数字 |
| current | number | 1 | 默认第一页 |
| total | number | | 数据总数 |
| showSizeChanger | boolean | true | 是否显示 pageSize 选择框 |
| pageSizeOptions | Array | [5, 10, 20, 50] | pageSize 选择器可选页长 |
| nextPageText | string | | 上一页按钮显示文字 |
| lastPageText | string | | 下一页按钮显示文字 |

### Events

| 名称 | 描述|
| --- | --- |
| pageChange | 当页码改变的时候触发 |
| pageSizeChange | 当pageSize改变的时候触发 |
