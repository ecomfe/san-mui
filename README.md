# san-mui

A Set of SAN Components that Implement Google's Material Design

[![Build Status](https://travis-ci.org/ecomfe/san-mui.svg?style=flat)](https://travis-ci.org/ecomfe/san-mui)
[![Coverage Status](https://coveralls.io/repos/github/ecomfe/san-mui/badge.svg?branch=master)](https://coveralls.io/github/ecomfe/san-mui?branch=master)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/ecomfe/san-mui/master/LICENSE)

## 使用指南

1. 通过 npm 安装

    ```sh
    npm i -S san-mui;
    ```

2. 在代码中引入

    ```js
    // 引入需要的组件
    import {Button, DatePicker} from 'san-mui';

    // 引入全部样式
    import 'san-mui/lib/index.css'
    ```

    如果在没有 tree-shaking 的优化下，希望只引入需要的组件，可以这么做：

    ```js
    import Button from 'san-mui/lib/Button';
    import 'san-mui/lib/Button/Button.css';
    ```

## 开发指南

### 开发

```sh
npm run dev
```

### 测试

```sh
npm test
```


### 构建

我们的源码存放在 `src`，构建产物放在 `lib` 下；

启动构建命令：

```sh
npm run build
```

## 发布指南

### 发布源

只发布到 npm 上；

### 发布内容

发布内容应该只包含 package.json / readme.md / lib

### 发布版本

两周内发版本 san-mui@1.0.0-alpha 系列

两周到一个月之内版本：san-mui@1.0.0-beta

一个月至两个月内：san-mui@1.0.0-rc

最终版本 san-mui@1.0.0
