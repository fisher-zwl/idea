import * as noty from 'noty';

type notificationArgs = {
    /**
     * 通知正文
     */
    message: string,
    /**
     * 通知标题
     */
    title?: string,
    /**
     * 没有用户操作的情况下通知保持显示的时间（毫秒），默认为 5000ms
     */
    timeout?: number,
    layout?: string
};

let defaultOptions = {
    timeout: 3000,
    layout: 'topRight',
    maxVisible: 1
};

export default {
    info({ message, title, timeout, layout }: notificationArgs): void {
        noty({
            text: template(title, message, 'fa fa-info-circle'),
            type: 'information',
            timeout: timeout || defaultOptions.timeout,
            layout: layout || defaultOptions.layout,
            maxVisible: defaultOptions.maxVisible
        });
    },
    success({ message, title, timeout, layout }: notificationArgs): void {
        noty({
            text: template(title, message, 'fa fa-check-circle'),
            type: 'success',
            timeout: timeout || defaultOptions.timeout,
            layout: layout || defaultOptions.layout,
            maxVisible: defaultOptions.maxVisible
        });
    },
    error({ message, title, timeout, layout }: notificationArgs): void {
        noty({
            text: template(title, message, 'fa fa-times-circle'),
            type: 'error',
            timeout: timeout || defaultOptions.timeout,
            layout: layout || defaultOptions.layout,
            maxVisible: defaultOptions.maxVisible
        });
    },
    warning({ message, title, timeout, layout }: notificationArgs): void {
        noty({
            text: template(title, message, 'fa fa-warning'),
            type: 'warning',
            timeout: timeout || defaultOptions.timeout,
            layout: layout || defaultOptions.layout,
            maxVisible: defaultOptions.maxVisible
        });
    },
    warn({ message, title, timeout, layout }: notificationArgs): void {
        this.warning({ message, title, timeout, layout });
    },
    config(options: notificationArgs): void {
        if (options.timeout !== undefined) {
            defaultOptions.timeout = options.timeout;
        }
        if (options.layout !== undefined) {
            defaultOptions.layout = options.layout;
        }
    }
};

function template(title: string, message: string, icon: string): string {
    title = title ? `<strong>${title}</strong><br>` : '';
    return `<div>
                <i class="${icon} pull-left" style="font-size: 38px;min-width: 38px;text-align: center;"></i>
                ${title}
                ${message}
            </div>`;
}