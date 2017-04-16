/**
 * @file ExpansionPanel
 * @author leon <ludafa@outlook.com>
 */

import san from 'san';
import {create} from '../common/util/cx';
import css from '../common/util/css';
import {IconButton} from '../Button';

const cx = create('expansion-panel');

export default class ExpansionPanel extends san.Component {

    static template = `
        <div class="{{computedClassName}}">
            <div class="${cx.getPartClassName('header')}">
                <div class="${cx.getPartClassName('title')}">
                    <slot name="title">{{title}}</slot>
                </div>
                <div class="${cx.getPartClassName('description')}">
                    <slot name="description">{{description}}</slot>
                </div>
                <san-icon-button
                    style="{{iconStyle}}"
                    on-click="toggle">
                    {{icon}}
                </san-icon-button>
            </div>
            <div class="${cx.getPartClassName('content')}" style="{{contentStyle}}">
                <slot />
            </div>
        </div>
    `;

    static components = {
        'san-icon-button': IconButton
    };

    static computed = {
        computedClassName() {
            let open = this.data.get('open');
            return cx(this).addStates({open}).build();
        },
        contentStyle() {
            let open = this.data.get('open');
            let style = css({
                transform: `scaleY(${open ? 1 : 0})`,
                overflowY: open ? 'auto' : 'hidden',
                maxHeight: open ? 'auto' : '0px',
                opacity: open ? 1 : 0
            });
            return style;
        },
        iconStyle() {
            let open = this.data.get('open');
            return css({
                transform: `rotate(${open ? 180 : 0}deg)`
            });
        }
    };

    initData() {
        return {
            open: false,
            icon: 'keyboard_arrow_down'
        };
    }

    toggle() {
        this.data.set('open', !this.data.get('open'));
    }

}
