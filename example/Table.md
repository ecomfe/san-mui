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
    },
    multiTableSelect() {}
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
                <sm-tr san-for="item in persons" selected="{=item.selected=}" disabled="{{item.disabled}}">
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
                    selected: true,
                    disabled: true
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
    },
    multiTableSelect() {}
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

除了通过编写 template 的方式，你还可以通过指定数据的方式来使用 `table`:

```san Configurable Table
<template>
    <div>
        <sm-table
            data="{{persons}}"
            fields="{{fields}}"
            selectable="multi"
            on-select="select($event)" />
    </div>
</template>
<script>
import {ConfigurableTable} from '../src/Table';
import '../src/Table/Table.styl';
export default {
    components: {
        'sm-table': ConfigurableTable
    },
    select(selected) {
        console.log(selected);
    },
    initData() {
        return {
            persons: [
                {
                    name: 'erik',
                    birthday: '1984-01-01',
                    city: 'BeiJing',
                    selected: false,
                    disabled: true
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
            ],
            fields: [
                {
                    title: '名字',
                    prop: 'name'
                },
                {
                    title: '城市',
                    prop: 'city'
                },
                {
                    title: '生日',
                    prop: 'birthday',
                    content: function (item) {
                        return item.birthday.replace(/-/g, '/');
                    }
                }
            ]
        };
    }
};
</script>
```

## API

### Table

#### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|selectable|string\|boolean|false|false|表格是否可选，可以设定为 false 表示不可选；或者设定为 `single` 单选；或者设定为 `multi` 多选|

#### 事件

|名称|描述|
|:---|:---|
|select|当表格可选时，选中行发生变化时触发，带有当月选中行序号，例如: [0, 2, 3]|

#### 插槽

|名称|描述|
|:---|:---|:---|
|default|默认内容，一般是 TBody|
|header|表头，一般是 THead|
|footer|表脚，一般是 TFoot|

### THead / TFoot

#### 属性
无

#### 事件
无

#### 插槽

|名称|描述|
|:---|:---|
|default|默认插槽，一般为 TR|

### TBody

#### 属性
无

#### 事件
无

#### 插槽

|名称|描述|
|:---|:---|
|default|默认内容，一般为多个 TR|

### TR

#### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|selected|boolean|false|false|当前列是否被选中，仅当 table 的 selectable 为 single 或 multi 时有效）|

#### 事件
无

#### 插槽

|名称|描述|
|:---|:---|
|default|内容插槽，一般为多个 TH 或 TD|

### TH / TD

#### 属性
无

#### 事件
无

#### 插槽
|名称|描述|
|:---|:---|
|default|内容插槽|

### ConfigurableTable

#### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|fields|Array\<Object\>|true|无|表格的列配置，数组中每项都代表一列；每列必须添加 `title` / `prop` 属性，可选添加 `content` 属性，自定义单元格的渲染|
|selectable|string\|boolean|false|false|表格是否可选，可以设定为 false 表示不可选；或者设定为 `single` 单选；或者设定为 `multi` 多选|
|data|Array<*>|true|无|表格数据|

#### 事件

|名称|描述|
|:---|:---|
|select|当表格可选时，选中行发生变化时触发，带有当月选中行序号，例如: [0, 2, 3]|

#### 插槽
无
