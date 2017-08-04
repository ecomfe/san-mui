## TreeView 树形列表

TreeView 是一个组合组件。它由最外层的 TreeView 携带一个检索过滤器，以及内部可以无限嵌套的 TreeViewItem 子组件构成。

TreeView 改装自 List 组件，并做了适当调整，在保留了 Icon 和 Text 内容的基础上，增加了 Checkbox，以及动态地通过 JSON 数据生成树形列表的功能。

### 静态列表

```san 标准树形列表

<template>
    <div>
        <div class="sm-tree-view-wrapper">
            <san-button
                variants="primary raised"
                on-click="deleteAllChecked($event)"
            >
                删除所有选中项
            </san-button>
            <san-button
                variants="primary raised"
                on-click="deleteAllChecked2($event)"
            >
                删除选中叶子项
            </san-button>
            <san-tree-view
                s-ref="view"
                dataSource="ATTRIBUTE"
                filterBar="{{!0}}"
                keepingSelected="{{!0}}"
                filterBarHintText="Type to filter, Press enter to highlight"
            >
                <san-tree-view-item
                    primaryText="Sent mail"
                    secondaryText="Second second second second second second"
                    checked="{{!!0}}"
                    on-click="click($event)"
                    on-checkboxClick="checkboxClick($event)">
                </san-tree-view-item>
                <san-tree-view-item primaryText="Drafts" disabled>
                    <san-icon slot="right">drafts</san-icon>
                </san-tree-view-item>
                <san-divider />
                <san-tree-view-item
                    primaryText="Inbox" 
                    toggleNested="{{!0}}"
                    initiallyOpen="{{!0}}"
                    checked="{{!0}}"
                    on-nestedTreeViewToggle="nestedTreeViewToggle($event)"
                    on-selectedToggle="selectedToggle($event)"
                    on-click="click($event)"
                >
                    <san-icon slot="left">inbox</san-icon>
                    <san-tree-view-item
                        slot="nested"
                        primaryText="Starred"
                        s-ref="starred"
                    >
                        <san-icon slot="left">star</san-icon>
                    </san-tree-view-item>
                    <san-tree-view-item
                        slot="nested"
                        primaryText="Sent mail"
                        toggleNested="{{!0}}"
                        primaryTogglesNestedTreeView="{{!0}}"
                        checked="{{!!0}}"
                    >
                        <san-tree-view-item
                            primaryText="Drafts"
                            slot="nested"
                            toggleNested="{{!0}}"
                            primaryTogglesNestedTreeView="{{!0}}"
                        >
                            <san-icon slot="left">send</san-icon>
                            <san-tree-view-item
                                primaryText="Drafts"
                                slot="nested"
                            >
                                <san-icon slot="left">drafts</san-icon>
                            </san-tree-view-item>
                        </san-tree-view-item>
                    </san-tree-view-item>
                    <san-tree-view-item
                        slot="nested"
                        primaryText="Inbox"
                        toggleNested="{{!0}}"
                        primaryTogglesNestedTreeView="{{!0}}"
                    >
                        <san-icon slot="right">inbox</san-icon>
                        <san-tree-view-item primaryText="Drafts" slot="nested">
                            <san-icon slot="left">drafts</san-icon>
                            <san-icon slot="right">drafts</san-icon>
                        </san-tree-view-item>
                    </san-tree-view-item>
                </san-tree-view-item>
            </san-tree-view>
        </div>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {TreeView, TreeViewItem} from '../src/TreeView';
import Divider from '../src/Divider';
import Button from '../src/Button';

import '../src/TreeView/index.styl';
import '../src/Divider/Divider.styl';
import '../src/Button/Button.styl';

import '../src/TreeView/custom.styl';

export default {

    components: {
        'san-icon': Icon,
        'san-tree-view': TreeView,
        'san-tree-view-item': TreeViewItem,
        'san-divider': Divider,
        'san-button': Button
    },

    inited() {
        
    },

    initData() {
    },

    selectedToggle(value) {
        console.log(value ? 'selected' : 'unselected');
    },

    click(evt) {
        console.log('click', evt);
    },

    checkboxClick(evt) {
        console.log('checkboxClick', evt);
    },

    deleteAllChecked(evt) {
        let view = this.ref('view');
        if (!view) {
            return;
        }
        let items = view.getAllCheckedItems();
        for (let i of items) {
            i && i.detach() && i.dispose();
        }
    },

    deleteAllChecked2(evt) {
        let view = this.ref('view');
        if (!view) {
            return;
        }
        let items = view.getAllCheckedItems();
        for (let i of items) {
            if (i.hasChildsHavingCheckbox()) {
                continue;
            }
            let p = i.parentComponent;
            i && i.detach() && i.dispose();
            items.splice(items.indexOf(p), 1);
        }
    },

    messages: {
        'UI:item-clicked'(arg) {
            console.log('item-clicked', arg.value, arg.value.comp.data.get('primaryText'));
        }
    }
}
</script>
<style>
.sm-tree-view-item.checked .sm-tree-view-item-content {
    color: #2196f3
}
</style>
```

除了 Material UI 标准尺寸的树形列表，考虑到 TreeView 经常被使用的布局场合，我们还提供了一套紧凑型型的样式方案。仅仅在最外层的 TreeView 组件上加入 **compact** 属性即可。

```san 紧凑型树形列表
<template>
    <div>
        <div class="sm-tree-view-wrapper">
            <san-tree-view
                compact="{{!0}}"
                wholeLineSelected="{{!0}}"
                keepingSelected="{{!0}}"
                dataSource="ATTRIBUTE"
                filterBar="{{!0}}"
                filterBarHintText="Type to find, Press enter to highlight"
                checked="{{!!0}}"
            >
                <san-tree-view-item
                    primaryText="Sent mail"
                    secondaryText="Second second second second second second"
                >
                </san-tree-view-item>
                <san-tree-view-item primaryText="Drafts">
                    <san-icon slot="right">drafts</san-icon>
                </san-tree-view-item>
                <san-divider />
                <san-tree-view-item
                    primaryText="Inbox" 
                    toggleNested="{{!0}}"
                    initiallyOpen="{{!0}}"
                    on-nestedTreeViewToggle="nestedTreeViewToggle($event)"
                    on-selectedToggle="selectedToggle($event)"
                >
                    <san-icon slot="left">inbox</san-icon>
                    <san-tree-view-item slot="nested" primaryText="Starred">
                        <san-icon slot="left">star</san-icon>
                    </san-tree-view-item>
                    <san-tree-view-item
                        slot="nested"
                        primaryText="Sent mail"
                        toggleNested="{{!0}}"
                        disabled="{{!0}}"
                        primaryTogglesNestedTreeView="{{!0}}"
                    >
                        <san-tree-view-item
                            primaryText="Drafts"
                            slot="nested"
                            toggleNested="{{!0}}"
                            primaryTogglesNestedTreeView="{{!0}}"
                        >
                            <san-icon slot="left">send</san-icon>
                            <san-tree-view-item
                                primaryText="Drafts"
                                slot="nested"
                            >
                                <san-icon slot="left">drafts</san-icon>
                            </san-tree-view-item>
                        </san-tree-view-item>
                    </san-tree-view-item>
                    <san-tree-view-item
                        slot="nested"
                        primaryText="Inbox"
                        toggleNested="{{!0}}"
                        primaryTogglesNestedTreeView="{{!0}}"
                    >
                        <san-icon slot="right">inbox</san-icon>
                        <san-tree-view-item primaryText="Drafts" slot="nested">
                            <san-icon slot="left">drafts</san-icon>
                            <san-icon slot="right">drafts</san-icon>
                        </san-tree-view-item>
                    </san-tree-view-item>
                </san-tree-view-item>
            </san-tree-view>
        </div>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {TreeView, TreeViewItem} from '../src/TreeView';
import Divider from '../src/Divider';
import Button from '../src/Button';

import '../src/TreeView/index.styl';
import '../src/Divider/Divider.styl';
import '../src/Button/Button.styl';

import '../src/TreeView/custom.styl';

export default {

    components: {
        'san-icon': Icon,
        'san-tree-view': TreeView,
        'san-tree-view-item': TreeViewItem,
        'san-divider': Divider,
        'san-button': Button
    },

    inited() {
        
    },

    initData() {
    },

    selectedToggle(value) {
        console.log(value ? 'selected' : 'unselected');
    },

    click(evt) {
        console.log('click', evt);
    },

    messages: {
        'UI:item-clicked'(arg) {
            console.log('item-clicked', arg.value, arg.value.comp.data.get('primaryText'));
        }
    }
}
</script>
```

### 动态列表

TreeView 支持通过指定的 JSON 结构来生成一个完整的树形列表。也可以与静态列表形式相结合，形成部分静态、部分动态的列表。

首先需要指定一个数据源类型，即 **dataSource="JSON"**。然后通过 **treeData** 属性传入描述属性结构的 JSON 对象。

```san 纯数据生成树形列表
<template>
    <div>
        <div class="sm-tree-view-demo-title">
            <san-button
                variants="primary raised"
                on-click="changeTreeData($event)"
            >
                修改数据
            </san-button>
        </div>
        <div class="sm-tree-view-wrapper custom">
            <san-tree-view
                treeData="{=treeData=}"
                compact="{{!0}}"
                wholeLineSelected="{{!0}}"
                keepingSelected="{{!0}}"
                filterBar="{{!0}}"
                filterBarHintText="Type to find component, Enter to highlight"
                initiallyOpen="{{!0}}"
                primaryTogglesNestedTreeView="{{!0}}"
                dataSource="JSON"
                on-nestedItemToggle="nestedItemToggle($event)"
            >
                <san-tree-view-item
                    san-for="item in treeData"
                    initiallyOpen="{{!0}}"
                    primaryTogglesNestedTreeView="{{!0}}"
                    treeData="{=item=}"
                    dataSource="JSON"
                >
                </san-tree-view-item>
            </san-tree-view>
        </div>
    </div>
</template>
<script>
import Icon from '../src/Icon';
import {TreeView, TreeViewItem} from '../src/TreeView';
import Divider from '../src/Divider';
import Button from '../src/Button';

import '../src/TreeView/index.styl';
import '../src/Divider/Divider.styl';
import '../src/Button/Button.styl';

import '../src/TreeView/custom.styl';

export default {

    components: {
        'san-icon': Icon,
        'san-tree-view': TreeView,
        'san-tree-view-item': TreeViewItem,
        'san-divider': Divider,
        'san-button': Button
    },

    inited() {
        
    },

    initData() {
        return {
            treeData: [
                { text: 'a', checked: false, treeData: [
                    { text: 'a1', secondaryText: 'a1_desc' },
                    { text: 'a2', secondaryText: 'a2_desc' }
                ] },
                { text: 'b' , treeData: [] },
                { text: 'c', treeData: [
                    { text: 'c1' },
                    { text: 'c2' },
                ] },
                { text: 'd', checked: true },
                { text: 'e', treeData: [
                    { text: 'e1', checked: null },
                    { text: 'e2' },
                    { text: 'e3', checked: false, treeData: [
                        { text: 'e31' },
                        { text: 'e32', checked: true }
                    ] },
                    { text: 'e4' }
                ] },
                { text: 'f', checked: false }
            ],
        }
    },

    changeTreeData(evt) {
        this.data.set('treeData[0].treeData', undefined);

        this.data.set('treeData[1].text', 'changed-b');

        this.data.set('treeData[2].text', 'changed-ccc')
        this.data.splice('treeData[4].treeData', [1, 2]);
        this.data.push('treeData[4].treeData', {
            text: 'e5',
            checked: true
        });

        this.data.set('treeData[2].treeData[0].text', 'changed-c1')
        this.data.set('treeData[5]',
            { text: "changed-f", treeData: [{ text: 'f1' }] });
        this.data.unshift('treeData[5].treeData', {text:'f0'})
        this.data.push('treeData', { text: 'g' });
        //this.data.set('treeData[4].treeData[2].treeData[0].checked', true);
        console.log(JSON.stringify(this.data.get('treeData')));
    },

    nestedTreeViewToggle(value) {
        console.log(value ? 'expanding' : 'collapsing', arguments);
    },

    nestedItemToggle(target) {
        let treeData = target.data.get('treeData');
        if (typeof treeData === 'object' 
            && typeof treeData.treeData === 'object'
            && treeData.treeData.length === 0) {
            target.data.set('treeData.treeData', [{'text': 'dynamic'}]);
        }
    },

    selectedToggle(value) {
        console.log(value ? 'selected' : 'unselected');
    },

    click(evt) {
        console.log('click', evt);
    },

    messages: {
        'UI:item-clicked'(arg) {
            console.log('item-clicked', arg.value, arg.value.comp.data.get('primaryText'));
        }
    }
}
</script>
```

也可以通过和静态列表结合实现点击展开异步加载树形子列表。


```san 异步数据加载树形列表
<template>
    <div>
        <div class="sm-tree-view-wrapper custom">
            <san-tree-view
                compact="{{!0}}"
                wholeLineSelected="{{!0}}"
                keepingSelected="{{!0}}"
                filterBar="{{!0}}"
                filterBarHintText="Type to find component, Enter to highlight"
                initiallyOpen="{{!0}}"
                s-ref="view2"
                on-nestedItemToggle="asyncNestedItemToggle($event)"
            >
                <san-tree-view-item
                    primaryText="A"
                    toggleNested="{{!0}}"
                    dataSource="JSON"
                >
                </san-tree-view-item>
                <san-tree-view-item
                    primaryText="B"
                    toggleNested="{{!0}}"
                    dataSource="JSON"
                >
                </san-tree-view-item>
            </san-tree-view>
        </div>
    </div>
</template>
<script>
import san from 'san';
import Icon from '../src/Icon';
import {TreeView, TreeViewItem} from '../src/TreeView';
import Divider from '../src/Divider';
import Button from '../src/Button';

import '../src/TreeView/index.styl';
import '../src/Divider/Divider.styl';
import '../src/Button/Button.styl';

import '../src/TreeView/custom.styl';

export default {

    components: {
        'san-icon': Icon,
        'san-tree-view': TreeView,
        'san-tree-view-item': TreeViewItem,
        'san-divider': Divider,
        'san-button': Button
    },

    inited() {
        
    },

    initData() {
        return {
            asyncTreeData: {
                'A': {
                    checked: null,
                    treeData: [
                        { text: 'a1', checked: true, treeData: [
                            { text: 'a11' },
                            { text: 'a12', checked: false }
                        ] }
                    ]
                },
                'B': {
                    treeData: [
                        { text: 'b1' },
                        { text: 'b2' }
                    ]
                }
            }
        }
    },

    nestedTreeViewToggle(value) {
        console.log(value ? 'expanding' : 'collapsing', arguments);
    },

    nestedItemToggle(target) {
        let treeData = target.data.get('treeData');
        if (typeof treeData === 'object' 
            && typeof treeData.treeData === 'object'
            && treeData.treeData.length === 0) {
            target.data.set('treeData.treeData', [{'text': 'dynamic'}]);
        }
    },

    asyncNestedItemToggle(target) {
        if (target.data.get('treeData.treeData')) {
            return;
        }
        let text = target.data.get('primaryText');
        let data = this.data.get('asyncTreeData')[text];
        (typeof data === 'object') && (data.text = text);
        target.data.set('treeData', this.data.get('asyncTreeData')[text]);
    },

    selectedToggle(value) {
        console.log(value ? 'selected' : 'unselected');
    },

    click(evt) {
        console.log('click', evt);
    },

    messages: {
        'UI:item-clicked'(arg) {
            console.log('item-clicked', arg.value, arg.value.comp.data.get('primaryText'));
        }
    }
}
</script>
```

### API

#### TreeView

|名称|类型|必须|默认值|描述|备注|
|---|---|---|---|---|---|
|filterBar|boolean|否|false|显示检测过滤器||
|filterBarHintText|string|否|''|检测过滤器提示文字||
|compact|boolean|否|false|紧凑型样式|渗透至 TreeViewItem|
|wholeLineSelected|boolean|否|false|整行选中样式|渗透至 TreeViewItem|
|keepingSelected|boolean|否|false|鼠标移开后保持整行选中|渗透至 TreeViewItem|
|dataSource|string|否|'ATTRIBUTE'|定义数据源类型，'ATTRIBUTE' 代表由属性定义（静态），'JSON' 代表由传入 treeData 数据定义（动态）|渗透至 TreeViewItem|

#### TreeViewItem

|名称|类型|必须|默认值|描述|备注|
|---|---|---|---|---|---|
|compact|boolean|否|false|紧凑型样式|继承自 TreeView|
|wholeLineSelected|boolean|否|false|整行选中样式|继承自 TreeView|
|keepingSelected|boolean|否|false|鼠标移开后保持整行选中|继承自 TreeView|
|dataSource|string|否|'ATTRIBUTE'|定义数据源类型，'ATTRIBUTE' 代表由属性定义（静态），'JSON' 代表由传入 treeData 数据定义（动态）|继承自 TreeView|
|disabled|boolean|否|false|禁用项目||
|toggleNested|boolean|否|false|是否显示折叠、展开开关||
|primaryTogglesNestedTreeView|boolean|否|false|点击项目时是否优先折叠、展开子项||
|initiallyOpen|boolean|否|false|初始化时展开子项||
|primaryText|string|是|''|项目主要文字，仅在 dataSource = 'ATTRIBUTE' 时有效||
|secondaryText|string|否|''|项目次要文字，仅在 dataSource = 'ATTRIBUTE' 时有效||
|checked|variant|否|undefined|Checkbox 状态，undefined 代表未知 (由父子项决定)，null 代表禁用，true 代表显示 Checkbox 并选中，false 代表显示 Checkbox 并不选中。仅在 dataSource = 'ATTRIBUTE' 时有效||
|treeData|object|否|undefined|动态传入的项目数据结构，仅在 dataSource = 'JSON' 时有效||
