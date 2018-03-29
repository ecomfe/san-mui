/**
 * @file san-mui/BaseButton
 * @author junmer
 * @author leon <ludafa@outlook.com>
 */

import {Component, parseTemplate} from 'san';

// 我们使用 anode 来动态生成 root element
// 原理是每个拥有 slot 的组件，都会把 anode 与实例绑定，所以我们可以对每个实例做修复
// 在 inited 时我们可以修改它，这样我们可以得到想要的 root element
//
// @tricky: 我们在这里使用了 san 提供的 parseTemplate 来获得 anode 属性

const linkANodeProps = parseTemplate(
    '<a href="{{href}}" target="{{target}}"/>'
).children[0].props;

let hrefProps;
let targetProps;
linkANodeProps.map(item => {
    if (item.name === 'href') {
        hrefProps = item;
    }
    else if (item.name === 'target') {
        targetProps = item;
    }
    return item;
});

export default class BaseButton extends Component {

    inited() {

        let {data, aNode} = this;
        if (data.get('href')) {
            aNode.tagName = 'A';
            aNode.props.push(hrefProps);
            aNode.props = aNode.props.filter(item => item.name && item.name !== 'type');
            aNode.props.splice(0, 1);
            this.tagName = 'a';
        }

        if (data.get('target')) {
            aNode.props.push(targetProps);
        }
    }

    initData() {
        return {
            type: 'button',
            disabled: false
        };
    }
}
