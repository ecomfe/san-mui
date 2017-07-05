/**
 * @file san-mui/BaseButton
 * @author junmer
 */

import {Component, ExprType} from 'san';

/**
 * 生成属性
 *
 * @param  {Element} element Component
 * @param  {string}  name    属性名
 */
function genProp(element, name) {

    element.aNode.props.push({
        name: name,
        expr: {
            type: ExprType.TEXT,
            segs: [{
                type: ExprType.INTERP,
                expr: {
                    type: ExprType.ACCESSOR,
                    paths: [{
                        type: ExprType.STRING,
                        value: name
                    }]
                },
                filters: []
            }],
            raw: `\{\{${name}\}\}`
        },
        raw: `\{\{${name}\}\}`
    });

}

/**
 * 是否有数据
 *
 * @param  {Element} element Component
 * @param  {string}  name    属性名
 * @return {boolean}         结构
 */
function hasData(element, name) {
    return name in element.data.raw;
}

/**
 * 适配 链接标签
 *
 * @param  {Element} element Component
 */
function adaptAnchor(element) {

    if (hasData(element, 'href')) {
        element.aNode.tagName = 'A';
        element.tagName = 'a';
        genProp(element, 'href');
    }

    if (hasData(element, 'target')) {
        genProp(element, 'target');
    }

}

export default class BaseButton extends Component {

    inited() {

        // 兼容 button / a
        adaptAnchor(this);

    }

}
