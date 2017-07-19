## 扩展面板 ExpansionPanel

扩展面板的功能包括创建流程、进行简单的编辑。

扩展面板是一个轻量级的容器，可以单独存在，也可以连接到一个更大的平面上，比如卡片。

它可以用于不同的任务，例如：

1. 编辑设置项
2. 创建广告系列的工具

### 示例

```san 扩展面板
<template>
    <div>
        <san-expansion-panel title="expansion panel">
            <p>家用变律究在无许四眼军儿该，并解交提被的O村民收隶。少同关能起交离响关放便权，水导证备文两呜详克达。院律利一们以白方机，他制工应参三教，命适U称平当日。每造或在个质条动七出前，切些指取细状并育收车段，强感届来京告说件K。接感车员题复市越中，知该果接心可育只什，先杨来八十呆苏。级究行实酸电军上研打近，热率外十政材都上日空。设于自验山油省连，用飞市白领业重展，许O苏称克屈。多角社选定风社技美传机及什，布素器行导边派养车太，连龙步F观秀向细越财容。听今单平一准计号主，展易其院青连步，电题-更箩深乱。几公影导世热装量，需状阶使安海情则，不先I坊金医少。金电名外流连战你做外打声达还更，种常世了联花究M坑节K说两。除研任表议主组开，根集本点白界流，实2凝节八社。</p>
        </san-expansion-panel>
    </div>
</template>
<script>
import ExpansionPanel from '../src/ExpansionPanel';
import '../src/ExpansionPanel/ExpansionPanel.styl';
export default {
    components: {
        'san-expansion-panel': ExpansionPanel
    }
};
</script>
```

```san 自定义展开按钮
<template>
    <div>
        <san-expansion-panel
            title="expansion panel"
            description="test"
            icon="code">
            <p>期式列处住制口该，受圆指家象由五圆，程值O林识是验。队带信影些必题建问，度除之构生书条然，已指励码关县立。消容空场示能安算状再关，快由斗办到条决一制，维真V称极我四蹦时。深决划群品各着路根组图，办非始期族两院质天，参回村均克战即雨史。飞速即律象大应低问非种业，家示目单内去的装许多算，面区否众你歼步雪精导。 理因等取今决近走构油，为当情热内明下她之，条军建音覆级单况。第如日八十七包办，科该关说重都，形列4该单中。号效体以小任住响派半第，准办细强形阶根须什，效光励影录加每吵济。 号效将根离件华力并，发商广式改利问器快少，四按录山学解蹦G六。周特市海只院其情，以市体特生两率，就详位列六斯。里主候消音前千听价报，位战保度已难经制，识接8董重E呜积。公入较平资，根报Z。</p>
        </san-expansion-panel>
    </div>
</template>
<script>
import ExpansionPanel from '../src/ExpansionPanel';
import '../src/ExpansionPanel/ExpansionPanel.styl';
export default {
    components: {
        'san-expansion-panel': ExpansionPanel
    }
};
</script>
```

## API
### 属性

| 名称 | 类型 | 必须 | 默认值 | 描述|
|---|---|---|---|---|
|title|string|false|无|面板标题|
|icon|string|false|keyboard_arrow_down|扩展按钮的icon|
|description|string|false|无|描述|
|open|boolean|false|false|是否打开抽屉|

### 事件

无

### 插槽

|名称|描述|
|---|---|
|title|标题插槽|
|description|描述插槽|
|default|内容插槽|
