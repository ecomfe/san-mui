/**
 * @file NotificationItem
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 */

import Layer from '../Layer';
import Icon from '../Icon';

const typeMap = {
    success: 'check_circle',
    info: 'info',
    warning: 'error',
    error: 'cancel'
};

export default class NotificationItem extends Layer {
    static template = `
    <div
        class="sm-notification {{customClass}} {{closed ? 'state-hidden' : 'state-open'}}"
        style="top: {{top}}px"
        on-mouseenter="clearTimer"
        on-mouseleave="startTimer"
        on-click="handleClick">
        <san-icon
            san-if="type"
            class="sm-notification-type type-{{type}}"
            size="50">{{iconType}}</san-icon>
        <div class="sm-notification-group" >
            <p class="sm-notification-title">{{title}}</p>
            <div class="sm-notification-content">{{message}}</div>
            <div on-click="close($event)" class="sm-notification-close">
                <san-icon size="20" class="sm-notification-close-btn">close</san-icon>
            </div>
        </div>
    </div>
    `;

    initData() {
        return {
            title: '',
            message: '',
            duration: 3000,
            closed: true
        };
    }

    static components = {
        'san-icon': Icon
    };

    static computed = {
        iconType() {
            return typeMap[this.data.get('type')];
        }
    };

    handleClick() {
        this.fire('itemClick');
    }

    close(e) {
        if (e) {
            e.stopPropagation();
        }
        this.data.set('closed', true);
        this.el.addEventListener('transitionend', () => {
            this.fire('close');
        });
    }

    clearTimer() {
        clearTimeout(this.timer);
    }

    startTimer() {
        const duration = this.data.get('duration');
        if (duration > 0) {
            this.timer = setTimeout(() => {
                if (!this.closed) {
                    this.close();
                }
            }, duration);
        }
    }

    attached() {
        super.attached();

        requestAnimationFrame(() => {
            this.data.set('closed', false);
        });

        this.startTimer();
    }

    detached() {
        this.clearTimer();
    }
}
