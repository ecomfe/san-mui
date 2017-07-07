## Table

[数据表格 Table](https://material.google.com/components/data-tables.html) 数据表格显示原始的数据集。它们通常出现在桌面端的企业产品中。

示例

```san 简单使用
<template>
    <div>
        <sm-table>
            <sm-thead slot="header">
                <sm-tr>
                    <sm-th tooltip="名称">Name</sm-th>
                    <sm-th tooltip="城市">City</sm-th>
                    <sm-th tooltip="生日">Birthday</sm-th>
                </sm-tr>
            </sm-thead>
            <sm-tbody>
                <sm-tr san-for="item in persons">
                    <sm-td>{{item.name}}</sm-td>
                    <sm-td>{{item.city}}</sm-td>
                    <sm-td>{{item.birthday}}</sm-td>
                </sm-tr>
            </sm-tbody>
        </sm-table>
    </div>
</template>
<script>
import {Table, THead, TFoot, TBody, TR, TD, TH} from '../src/Table';
import '../src/Table/Table.styl';
export default {
    components: {
        'sm-table': Table,
        'sm-tr': TR,
        'sm-th': TH,
        'sm-td': TD,
        'sm-tbody': TBody,
        'sm-thead': THead,
        'sm-tfoot': TFoot,
    },
    initData() {
        return {
            persons: [
                {
                    name: 'erik',
                    birthday: '1984-01-01',
                    city: 'BeiJing'
                },
                {
                    name: 'otakustay',
                    birthday: '1986-04-04',
                    city: 'ShangHai'
                },
                {
                    name: 'firede',
                    birthday: '1987-02-02',
                    city: 'BeiJing'
                },
                {
                    name: 'leon',
                    birthday: '1989-03-03',
                    city: 'ShenZhen'
                }
            ]
        };
    }
};
</script>
```


```san Hoverable
<template>
    <div>
        <sm-table class="sm-table-hoverable">
            <sm-thead slot="header">
                <sm-tr>
                    <sm-th tooltip="名称">Name</sm-th>
                    <sm-th tooltip="城市">City</sm-th>
                    <sm-th tooltip="生日">Birthday</sm-th>
                </sm-tr>
            </sm-thead>
            <sm-tbody>
                <sm-tr san-for="item in persons">
                    <sm-td>{{item.name}}</sm-td>
                    <sm-td>{{item.city}}</sm-td>
                    <sm-td>{{item.birthday}}</sm-td>
                </sm-tr>
            </sm-tbody>
        </sm-table>
    </div>
</template>
<script>
import {Table, THead, TFoot, TBody, TR, TD, TH} from '../src/Table';
import '../src/Table/Table.styl';
export default {
    components: {
        'sm-table': Table,
        'sm-tr': TR,
        'sm-th': TH,
        'sm-td': TD,
        'sm-tbody': TBody,
        'sm-thead': THead,
        'sm-tfoot': TFoot,
    },
    initData() {
        return {
            persons: [
                {
                    name: 'erik',
                    birthday: '1984-01-01',
                    city: 'BeiJing'
                },
                {
                    name: 'otakustay',
                    birthday: '1986-04-04',
                    city: 'ShangHai'
                },
                {
                    name: 'firede',
                    birthday: '1987-02-02',
                    city: 'BeiJing'
                },
                {
                    name: 'leon',
                    birthday: '1989-03-03',
                    city: 'ShenZhen'
                }
            ]
        };
    }
};
</script>
```

```san Selectable - Multiple
<template>
    <div>
        <sm-table selectable="multi" on-select="multiTableSelect($event)">
            <sm-thead slot="header">
                <sm-tr>
                    <sm-th tooltip="名称">Name</sm-th>
                    <sm-th tooltip="城市">City</sm-th>
                    <sm-th tooltip="生日">Birthday</sm-th>
                </sm-tr>
            </sm-thead>
            <sm-tbody>
                <sm-tr san-for="item in persons" selected="{=item.selected=}">
                    <sm-td>{{item.name}}</sm-td>
                    <sm-td>{{item.city}}</sm-td>
                    <sm-td>{{item.birthday}}</sm-td>
                </sm-tr>
            </sm-tbody>
        </sm-table>
        <ul>
            <li s-for="person in persons">
                <span>{{person.name}} - {{person.selected}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import {Table, THead, TFoot, TBody, TR, TD, TH} from '../src/Table';
import '../src/Table/Table.styl';
export default {
    components: {
        'sm-table': Table,
        'sm-tr': TR,
        'sm-th': TH,
        'sm-td': TD,
        'sm-tbody': TBody,
        'sm-thead': THead,
        'sm-tfoot': TFoot,
    },
    initData() {
        return {
            persons: [
                {
                    name: 'erik',
                    birthday: '1984-01-01',
                    city: 'BeiJing',
                    selected: true
                },
                {
                    name: 'otakustay',
                    birthday: '1986-04-04',
                    city: 'ShangHai',
                    selected: true
                },
                {
                    name: 'firede',
                    birthday: '1987-02-02',
                    city: 'BeiJing',
                    selected: false
                },
                {
                    name: 'leon',
                    birthday: '1989-03-03',
                    city: 'ShenZhen',
                    selected: true
                }
            ]
        };
    }
};
</script>
```

```san Selectable - Multiple
<template>
    <div>
        <sm-table selectable="single" on-select="multiTableSelect($event)">
            <sm-thead slot="header">
                <sm-tr>
                    <sm-th tooltip="名称">Name</sm-th>
                    <sm-th tooltip="城市">City</sm-th>
                    <sm-th tooltip="生日">Birthday</sm-th>
                </sm-tr>
            </sm-thead>
            <sm-tbody>
                <sm-tr san-for="item in persons" selected="{=item.selected=}">
                    <sm-td>{{item.name}}</sm-td>
                    <sm-td>{{item.city}}</sm-td>
                    <sm-td>{{item.birthday}}</sm-td>
                </sm-tr>
            </sm-tbody>
        </sm-table>
        <ul>
            <li s-for="person in persons">
                <span>{{person.name}} - {{person.selected}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import {Table, THead, TFoot, TBody, TR, TD, TH} from '../src/Table';
import '../src/Table/Table.styl';
export default {
    components: {
        'sm-table': Table,
        'sm-tr': TR,
        'sm-th': TH,
        'sm-td': TD,
        'sm-tbody': TBody,
        'sm-thead': THead,
        'sm-tfoot': TFoot,
    },
    initData() {
        return {
            persons: [
                {
                    name: 'erik',
                    birthday: '1984-01-01',
                    city: 'BeiJing',
                    selected: false
                },
                {
                    name: 'otakustay',
                    birthday: '1986-04-04',
                    city: 'ShangHai',
                    selected: false
                },
                {
                    name: 'firede',
                    birthday: '1987-02-02',
                    city: 'BeiJing',
                    selected: false
                },
                {
                    name: 'leon',
                    birthday: '1989-03-03',
                    city: 'ShenZhen',
                    selected: true
                }
            ]
        };
    }
};
</script>
```
