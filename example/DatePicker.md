## 日期选择器 DatePicker

[DatePicker](https://material.google.com/components/pickers.html#pickers-date-pickers) 用来选择一个单个日期。

示例

```san 简单示例
<template>
    <div>
        <div class="date-picker-demo-row">
            <san-date-picker value="{=date=}" isDisabled="{{isDisabled}}"/>
        </div>
        <div class="date-picker-demo-row">
            <san-date-picker value="{=date=}" disabled />
        </div>
    </div>
</template>
<script>
import DatePicker from '../src/DatePicker';
import '../src/DatePicker/DatePicker.styl';
import moment from 'moment';
export default {
    components: {
        'san-date-picker': DatePicker
    },
    initData() {
        return {
            date: '',
            isDisabled(date) {
                let startTime = moment('20180301', 'YYYYMMDD').unix();
                let endTime = moment('20180306', 'YYYYMMDD').unix();
                if (date > startTime && date < endTime) {
                    return true;
                }
                return false;
            }
        };
    }
};
</script>
```

我们可以通过 `format` 属性来调整日期格式；我们内部使用了 [momentjs](http://momentjs.cn) 来做格式解析；

```san 自定义日期格式
<template>
    <div>
        当前日期格式是 YYYY年MM月DD日
        <div class="date-picker-demo-row">
            <san-date-picker value="{=date=}" format="YYYY年MM月DD日" />
        </div>
    </div>
</template>
<script>
import DatePicker from '../src/DatePicker';
import '../src/DatePicker/DatePicker.styl';
export default {
    components: {
        'san-date-picker': DatePicker
    },
    initData() {
        return {
            date: '2017年01月31日'
        };
    }
};
</script>
```

> 如果给定的初始值与格式不匹配，那么会影响到日期选择框弹中的选中值。
>
> 在弹窗中选择某个日期后，值会被按指定的格式输出。

## API

### 属性

| 名称 | 类型 | 必须 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| value | string | false | 无 | 日期选择框的值 |
| open | boolean | false | false | 是否打开选择弹窗 |
| format | string | false | YYYY-MM-DD | 日期字符串的格式；更多的格式请参考[这里](http://momentjs.cn/docs/#/displaying/format/) |
| disabled | boolean | false | false | 是否禁用 |
| isDisabled | function | false || 满足条件的函数是否禁用|

> DatePicker 的输入框部分属性与 TextField 一致，可以根据需要添加

### 事件

无

### 插槽

无
