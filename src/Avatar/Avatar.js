/**
 * @file Avatar Componennt
 * @author qiusiqi(qiusiqi@baidu.com)
 */

import san from 'san';
import Icon from '../Icon';
import padStyles from '../filters/padStyles';

export default san.defineComponent({

    template: `
        <div class="sm-avatar {{ className }}" style="{{ avatarStyle | padStyles }}{{ style | padStyles }}">
            <san-icon san-if="{{ icon }}">{{ icon }}</san-icon>
            <slot></slot>
        </div>
    `,

    components: {
        'san-icon': Icon
    },

    filters: {
        padStyles
    },

    computed: {
        avatarStyle() {
            let size = this.data.get('size') + 'px';
            let style = {
                backgroundColor: this.data.get('backgroundColor'),
                color: this.data.get('color'),
                fontSize: this.data.get('iconSize'),
                width: size,
                height: size,
                lineHeight: size
            };

            if (this.data.get('src')) {
                Object.assign(style, {
                    backgroundImage: `url(${this.data.get('src')})`
                });
            }

            return style;
        }
    }
});
