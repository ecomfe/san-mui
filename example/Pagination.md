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

```san 2、指定当前页码、总条数、页长、显示页长切换器、页长选项、页码变换回调、页长变换回调
<template>
    <div>
        <san-pagination
            current="3"
            total="200"
            pageSize="13"
            showSizeChanger="false"
            pageSizeOptions="[5, 10, 20]"
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
