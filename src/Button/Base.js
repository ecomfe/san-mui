/**
 * @file san-mui/BaseButton
 * @author junmer
 */

import {Component} from 'san';

function genProp(element, name) {
    element.aNode.props.push({
        name: name,
        expr: {
            type: 3,
            paths: [{
                type: 1,
                value: name
            }]
        },
        raw: `\{\{${name}\}\}`
    });
}

function adaptAnchor(element) {

    if (element.data.get('href')) {
        element.aNode.tagName = 'A';
        element.tagName = 'a';
        genProp(element, 'href');
    }

    if (element.data.get('target')) {
        genProp(element, 'target');
    }

}

export default class BaseButton extends Component {

    inited() {

        // 兼容 button / a
        adaptAnchor(this);

    }

}
