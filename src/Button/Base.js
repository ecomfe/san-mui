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
).childs[0].props;

const hrefProps = linkANodeProps.get('href');
const targetProps = linkANodeProps.get('target');

export default class BaseButton extends Component {

    inited() {

        let {data, aNode} = this;

        if (data.get('href')) {
            aNode.tagName = 'A';
            aNode.props.push(hrefProps);
            aNode.props.remove('type');
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
