/**
 * label input项组件
 * @prop label input
 * 
 * @example
 * ``` html
 * <ms-label-tips :widget="{label: '标题',}">
        <ms-input-tips :widget="{value: @title, col: 'title',iconClass:'fa fa-exclamation-circle',icon_html:'<span>*</span>'}"></ms-input-tips>
    </ms-label-tips>
 * ```
 */
avalon.component('ms-label-tips', {
    template: require('./ms-label-tips.html'),
    defaults: {
        html:'',
        label:'',
        iconClass:'',
        icon_html:'',
        onInit(event) {
        },
        onReady(event) {

        }
    },
    soleSlot: 'html'
});