## 如何开发 san-mui 组件

### 项目结构规范

1. 所有的源码放置在 src 目录下
1. 每个组件/每类组件使用 src 下的一个目录，比如 src/Button；此外：
    1. 每个组件目录的命名必须是符合驼峰格式，即 `MyAnotherComponent`。
    1. 每个组件目录需要提供一个 index.js 输出所有组件；
    1. 每个组件目录需要提供一个 index.styl 输出所有组件的样式；
1. 测试用例需要放置在 test 目录下，其他要求与组件源码的组织风格一致。
1. 所有的 demo 和文档都放置在 example 目录下，文档的编写请参考现有的文档

### 组件开发规范

1. 首先应当遵守 [efe-tc 代码规范](https://github.com/ecomfe/spec)    
1. 每个组件应使用纯 js 方式编写，不可以使用 `.san` 格式编写。
1. 每个组件需要有配套的测试用例
1. 不要在 `.js` 中引入其他类型的文件，包括 `.styl`。例如以下写法是不允许的：

    ```js
    import from '../Button.styl';
    ```

    > WARNING: 构建时会报错的

1. 使用 `import` 引入依赖模块时不允许添加 `.js` 后缀。例如以下写法是不允许的：

    ```js
    import Button from '../Button/Button.js';
    ```

    > WARNING: 构建时会报错的
