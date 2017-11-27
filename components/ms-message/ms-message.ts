import * as noty from 'noty';

type messageArgs = {
    content: string,
    duration?: number,
    layout?: string
};

let defaultOptions = {
    duration: 1500,
    layout: 'topCenter',
    maxVisible: 1
};

export default {
    info({ content, duration, layout }: messageArgs): void {
        noty({
            text: '<i class="fa fa-info-circle"></i>' + content,
            type: 'information',
            layout: layout || defaultOptions.layout,
            timeout: duration || defaultOptions.duration,
            maxVisible: defaultOptions.maxVisible
        });
    },
    success({ content, duration, layout}: messageArgs): void {
        noty({
            text: '<i class="fa fa-check-circle"></i>' + content,
            type: 'success',
            layout: layout || defaultOptions.layout,
            timeout: duration || defaultOptions.duration,
            maxVisible: defaultOptions.maxVisible
        });
    },
    error({ content, duration, layout}: messageArgs): void {
        noty({
            text: '<i class="fa fa-times-circle"></i>' + content,
            type: 'error',
            layout: layout || defaultOptions.layout,
            timeout: duration || defaultOptions.duration,
            maxVisible: defaultOptions.maxVisible
        });
    },
    warning({ content, duration, layout}: messageArgs): void {
        noty({
            text: '<i class="fa fa-warning"></i>' + content,
            type: 'warning',
            layout: layout || defaultOptions.layout,
            timeout: duration || defaultOptions.duration,
            maxVisible: defaultOptions.maxVisible
        });
    },
    warn({ content, duration, layout}: messageArgs): void {
        this.warning({ content, duration, layout });
    },
    config(options: messageArgs): void {
        if (options.duration !== undefined) {
            defaultOptions.duration = options.duration;
        }
        if (options.layout !== undefined) {
            defaultOptions.layout = options.layout;
        }
    }
};