## TimePicker

[TimePicker 时间选择器](https://material.google.com/components/pickers.html#pickers-time-pickers) 用来在选择单个的时间，只包含小时和分钟

示例

```san 简单的使用
<template>
    <section>
        <h4>24小时制</h4>
        <san-time-picker type="24hour" value="{=time1=}" />
        <h4>12小时制</h4>
        <san-time-picker type="12hour" value="{=time2=}" />
        <h4>禁用状态</h4>
        <san-time-picker disabled hintText="被禁用的时间选择器" />
    </section>
</template>
<script>
import TimePicker from '../src/TimePicker';
import '../src/TimePicker/TimePicker.styl';
export default {
    components: {
        'san-time-picker': TimePicker
    },
    initData() {
        return {
            time1: '13:00',
            time2: '10:00 am'
        };
    }
};
</script>
```

我们支持自定义日期字符串格式的设定。通过属性 `format` 可以很容易地将时间改为你想要的格式。

```san 自定义格式
<template>
    <section>
        <h4>格式 HH:mm</h4>
        <san-time-picker type="24hour" value="{=time1=}" format="HH:mm" />
        <h4>A H时m分</h4>
        <san-time-picker type="12hour" value="{=time2=}" format="A H时m分"/>
    </section>
</template>
<script>
import TimePicker from '../src/TimePicker';
import '../src/TimePicker/TimePicker.styl';
export default {
    components: {
        'san-time-picker': TimePicker
    },
    initData() {
        return {
            time1: '13:00',
            time2: '上午 10时0分'
        };
    }
};
</script>
```

> 我们使用了 momentjs 来完成时间格式的支持，更多 `format` 可用的格式请参考[这里](http://momentjs.cn/docs/#/query/)

我们还支持国际化的设定，只需要给设定属性 `locale` 即可：

```san 自定义格式
<template>
    <section>
        <h4>简体中文</h4>
        <san-time-picker type="12hour" value="{=time2=}" format="A H时m分"/>
        <h4>英文</h4>
        <san-time-picker type="24hour" value="{=time1=}" format="HH:mm a" locale="en" />
    </section>
</template>
<script>
import TimePicker from '../src/TimePicker';
import '../src/TimePicker/TimePicker.styl';
export default {
    components: {
        'san-time-picker': TimePicker
    },
    initData() {
        return {
            time1: '13:00 am',
            time2: '上午 10时0分'
        };
    }
};
</script>
```

> 默认的方言为简体中文(zh-cn)，更多可用的方言请参考 [这里](http://momentjs.cn/docs/#/i18n/)

## API

### 属性

|名称|类型|必须|默认值|描述|
|:---|:---:|---|---|:---|
|type|string|true|24hour|时制，可选值为 24hour - 24小时制； 12hour - 12小时制|
|locale|string|false|zh-cn|方言|
|open|boolean|false|false|时间对话窗是否打开|
|disabled|boolean|false|false|是否为禁用状态|

> TimePicker 内部使用了 TextField；TextField 支持的属性 TimePicker 也支持，这些属性会直接影响文本框的效果。

### 事件
无

### 插槽
无
