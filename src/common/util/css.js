/**
 * @file convert object to css string
 * @author leon <ludafa@outlook.com>
 */

export default function css(style) {
    return style
        ? Object
            .keys(style)
            .map(key => {
                let kebabKey = key.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`);
                return `${kebabKey}:${style[key]};`;
            })
            .join('')
        : '';
}
