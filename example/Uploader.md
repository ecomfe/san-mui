## Uploader

Uploader 不在 `material-design` 的标准组件中，但是非常常用。因此，我们做了简单的实现。

```san 简单使用
<template>
    <div>
        <sm-uploader
            withFileList
            action="http://180.76.137.83:8818/image"
            withCredentials
            accept=".png, .jpeg, .jpg"
            maxSize="{{2}}"
            name="filename"
            headers="{{headers}}"
            data="{{data}}"
            files="{=files=}"
            on-progress="onProgress($event)"
            on-success="onSuccess($event)"
            on-error="onError($event)"
            on-remove="onRemove($event)">
            <sm-icon-button>add_a_photo</sm-icon-button>
        </sm-uploader>
        <sm-uploader
            action="http://180.76.137.83:8818/image"
            withCredentials
            accept=".png, .jpeg, .jpg"
            maxSize="{{2}}"
            name="filename"
            headers="{{headers}}"
            data="{{data}}"
            files="{=files2=}"
            on-progress="onProgress($event)"
            on-success="onSuccess($event)"
            on-error="onError($event)"
            on-remove="onRemove($event)">
            <sm-button variants="raised primary">上传图片</sm-button>
        </sm-uploader>
    </div>
</template>
<script>
import Uploader from '../src/Uploader';
import {IconButton, Button} from '../src/Button';
import '../src/Uploader/index.styl';

export default {
    components: {
        'sm-uploader': Uploader,
        'sm-icon-button': IconButton,
        'sm-button': Button
    },
    initData() {
        return {
            files: [{
                name: 'a.png',
                url: 'https://placeimg.com/640/480/any'
            }],
            files2: [],
            data: {
                extraField: 'test',
                extraArray: ['1', '2', '3']
            }
        };
    },
    onProgress(file) {
        console.log('progress', file);
        setTimeout(() => {
            console.log(this.data.get('files'));
        });
    },
    onSuccess(file) {
        console.log('success', file);
        setTimeout(() => {
            console.log(this.data.get('files'));
        });
    },
    onError(file) {
        console.log('error', file);
        setTimeout(() => {
            console.log(this.data.get('files'));
        });
    },
    onRemove(file) {
        console.log('remove', file);
        setTimeout(() => {
            console.log(this.data.get('files'));
        });
    }
};
</script>
```

## API

### 属性

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
|name|string||发送上传请求时文件在表单中的name值|
|headers|object|null|发送上传请求时携带的http请求头参数|
|data|object|null|发送上传请求时在请求体中额外携带的参数|
|multiple|bool|false|是否可以多选文件|
|withCredentials|bool|false|发送上传请求时是否携带机要数据，例如cookie等|
|disabled|bool|false|是否禁用|
|accept|string|*|文件选择时可选的文件类型，格式与 input[type=file] 的 accept 属性一致，比如 `.png,.jpg`，或者 `audio/*`|
|maxSize|number|0|选择文件的最大体积，单位是MB|
|validateFile|func|null|校验选择的文件是否合法，一般用于自定义校验规则。如果不提供此属性，那么只会进行 `maxSize` 的校验；如果提供此属性将跳过 `maxSize` 的校验。|
|json|bool|false|是否按 json 格式来解析上传请求的响应体。如果请求的响应带有 `Content-Type` 头并且为 `application/json`，那么 uploader 会自动将响应体解析为 object |
|upload|func|null|自定义的上传函数；此函数在完成选择文件通过 `validateFile` 后被调用。函数原型为 function upload(rawFile, options, handlers) {}；其中 rawFile 是浏览器选择文件后带有二进制数据的 `File` 对象；options 是包含有上传需要的所有的参数；handlers 中包含有 done / fail / progress 三个回调函数。在适应的时机调用这三个函数，来通知 uploader 更新视图。|

### 事件

|名称|描述|
|---|---|
|progress|上传进度更新事件，参数有变化的 file 对象|
|success|上传完成事件；参数为完成上传的 file 对象|
|error|上传或校验失败事件；参数为失败的 file 对象|
|remove|移除文件事件；参数为被移除的 file 对象|

### 插槽
|名称|描述|
|---|---|
|default|用于放置上传按钮|
