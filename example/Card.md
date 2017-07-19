## Card

[Card](https://material.io/guidelines/components/cards.html) 卡片是包含一组特定数据集的纸片，数据集含有各种相关信息，例如，关于单一主题的照片，文本，和链接。卡片通常是通往更详细复杂信息的入口。卡片有固定的宽度和可变的高度。最大高度限制于可适应平台上单一视图的内容，但如果需要它可以临时扩展（例如，显示评论栏）。卡片不会翻转以展示其背后的信息。

示例

```san 简单示例
<template>
    <section>
        <san-card>
            <san-card-header title="Myron Avatar" subTitle="sub title">
                <san-avatar
                    src="http://boscdn.bpc.baidu.com/movie/assets/avatar1.jpeg"
                    slot="avatar" />
                bbbb
            </san-card-header>
            <san-card-media title="Image Title" subTitle="Image Sub Title">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493050047187&di=e36d0920231b645717db227ce4bfc9f0&imgtype=0&src=http%3A%2F%2Fimg.tuku.cn%2Ffile_big%2F201502%2F0e93d8ab02314174a933b5f00438d357.jpg" />
            </san-card-media>
            <san-card-title title="Content Title" subTitle="Content Title"/>
            <san-card-text>
                散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            </san-card-text>
            <san-card-actions>
                <san-button>Action1</san-button>
                <san-button>Action2</san-button>
            </san-card-actions>
        </san-card>
    </section>
</template>
<script>
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from '../src/Card';
import {Button} from '../src/Button';
import Avatar from '../src/Avatar';

import '../src/Card/Card.styl';
import '../src/Card/CardActions.styl';
import '../src/Card/CardHeader.styl';
import '../src/Card/CardMedia.styl';
import '../src/Card/CardText.styl';
import '../src/Card/CardTitle.styl';
import '../src/Button/Button.styl';

export default {

    components: {
        'san-card': Card,
        'san-card-actions': CardActions,
        'san-card-header': CardHeader,
        'san-card-media': CardMedia,
        'san-card-text': CardText,
        'san-card-title': CardTitle,
        'san-button': Button,
        'san-avatar': Avatar
    }

}
</script>
```

## API

### CardHeader

#### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| title	 | string | | 标题文字 |
| titleClass | string |  | 标题样式,同 class 绑定方式一致 |
| subTitle	 | string | | 标题文字 |
| subTitleClass | string |  | 标题样式,同 class 绑定方式一致 |


#### Slots

| 名称 | 描述|
| --- | --- |
| avatar | 用于放置 avatar 组件 |

### CardMedia

#### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| title	 | string | | 标题文字 |
| titleClass | string |  | 标题样式,同 class 绑定方式一致 |
| subTitle	 | string | | 标题文字 |
| subTitleClass | string |  | 标题样式,同 class 绑定方式一致 |

#### Slots

| 名称 | 描述|
| --- | --- |
| default | 放置图片等媒体元素 |

### CardTitle

#### Props

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| title	 | string | | 标题文字 |
| titleClass | string | | 标题样式,同 class 绑定方式一致 |
| subTitle	 | string | | 标题文字 |
| subTitleClass | string | | 标题样式,同 class 绑定方式一致 |

### CardText

#### Slots

| 名称 | 描述|
| --- | --- |
| default | 用于放置大段介绍性的文字 |

### CardActions

#### Slots

| 名称 | 描述|
| --- | --- |
| default | 用于放置按钮 |
