/**
 * @file convert object to css string
 * @author leon <ludafa@outlook.com>
 */

export default function css(style) {
    return style
        ? Object
            .keys(style)
            .map(key => {
                let value = style[key];
                let kebabKey = key.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`);
                return value == null || value === '' ? '' : `${kebabKey}:${value};`;
            })
            .join('')
        : '';
}
