/**
 * @file san-mui/BaseButton
 * @author junmer
 */

import {Component, parseTemplate} from 'san';

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
