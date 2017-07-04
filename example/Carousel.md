## Carousel

### 图集预览功能


#### 示例

我们提供了几种使用姿势的示例：

``` san 图集预览功能
<template>
     <div 
        class="ui-carousel-demo"
        style="width: 407px">
        <h3>图集预览功能</h3>
        <san-carousel
            data="{{detail}}"
            height="{{height}}"
            isCycle="{{isCycle}}"
            autoplay="{{autoplay}}">
            <san-carousel-item
                class="ui-news-atlas-wrapper"
                san-for="item, index in detail">
                <img
                    class="ui-news-atlas-pic"
                    src="{{item.link}}"/>
                <div slot="mask" class="ui-news-atlas-mask">
                    <p>
                        <span>{{index + 1}}/{{detail.length}}</span>
                        <span>{{item.content}}</span>
                    </p>

                </div>
            </san-carousel-item>

        </san-carousel>
    </div>
</template>
<script type="text/javascript">
import Carousel from '../src/Carousel/Carousel'
import CarouselItem from '../src/Carousel/CarouselItem'
export default {
    components: {
        'san-carousel': Carousel,
        'san-carousel-item': CarouselItem
    },
    initData() {
        return {
            height: 600,
            activeIndex: 0,
            isCycle: false,
            detail: [
                {
                    'content': '欢乐颂五美美美美，友情赞赞赞',
                    'link': 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2245649484,3582333793&fm=173&s=0FD06B855E4606D0443921B003003002&w=406&h=272&img.JPEG'
                },
                {
                    'content': '赵医生和曲筱绡更是配，赵医生帅帅帅',
                    'link': 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4188167168,378039613&fm=173&s=35105F95466370A6C0A8D9E203002061&w=454&h=396&img.JPEG'
                },
                {
                    'content': '范冰冰，人称范爷，1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手，毕业于上海师范大学谢晋影视艺术学院。',
                    'link': 'http://b.hiphotos.baidu.com/image/pic/item/cdbf6c81800a19d89dbd300939fa828ba61e467b.jpg'
                },
                {
                    'content': '电视剧《欢乐颂》的角色。纽约归国的高级商业精英，投资公司高管，首席CFO。',
                    'link': 'http://s14.sinaimg.cn/mw690/006sDPEIzy7bvhVgM2h7d'
                },
                {
                    'content': '刘涛，女演员歌手，出演欢乐颂中的安迪，2000年进入演艺圈，如今已大红大紫',
                    'link': 'http://n1.itc.cn/img8/wb/recom/2017/05/31/149622320012250354.JPEG'
                }
            ],
            autoplay: false,
            arrow: 'always'
        };
    }

};
</script>  
<style lang="stylus">
    .ui-carousel-demo
        padding: 10px 20px
        .ui-news-atlas-wrapper
            display: flex
            justify-content: center
            align-items: center
            background: #000

        .ui-news-atlas-pic
            max-width: 100%
            max-height: 100%

        .ui-news-atlas-mask
            width: 100%
            position: absolute
            bottom: 0
            left: 0
            color: #fff
            font-size: 14px
            background: rgba(0, 0, 0, 0.5)
            text-align: left
            p
                padding: 10px
</style> 
```

``` san 轮播图功能
<template>
     <div 
        class="ui-carousel-demo"
        style="width: 407px">
        <h3>轮播图功能</h3>
        <san-carousel
            data="{{detail}}"
            height="{{height}}"
            indicator="{{indicator}}">
            <san-carousel-item
                class="ui-autoplay-wrapper"
                san-for="item, index in detail">
                {{index + 1}}
            </san-carousel-item>

        </san-carousel>
    </div>
</template>
<script type="text/javascript">
import Carousel from '../src/Carousel/Carousel'
import CarouselItem from '../src/Carousel/CarouselItem'
export default {
    components: {
        'san-carousel': Carousel,
        'san-carousel-item': CarouselItem
    },
    initData() {
        return {
            height: 300,
            activeIndex: 0,
            detail: [1, 2, 3, 4],
            indicator: true
        };
    }

};
</script>  
<style lang="stylus">
    .ui-carousel-demo
        padding: 10px 20px
        .sm-carousel-container
            background: #fff
        .ui-autoplay-wrapper
            display: flex
            justify-content: center
            align-items: center
            background: #d3dce6

</style> 
```
## API

### Carousel Attributes

| 名称 | 类型 | 默认值 | 描述|
| --- | --- | --- | --- |
| height | int | 500 | 走马灯的高度 |
| autoplay| boolean | true | 是否自动切换 |
| interval | number | 3000| 自动切换的时间间隔，单位为毫秒|
| trigger | string | hover | 指示器的触发方式 |
| arrow | string | hover | 切换箭头的显示时机 hover/never |
|isCycle| boolean | true | 图集预览功能时到边界时是否循环预览|

### Carousel Events
| 事件名称 | 说明 | 回调参数|
| --- | --- | --- |
| change | 幻灯片切换时触发 | 目前激活的幻灯片的索引，原幻灯片的索引 |