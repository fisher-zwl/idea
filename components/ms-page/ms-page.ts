/**
 * page分页组件
 * @prop {Number} total 数据总量
 *  @prop {Number} current 当前页数
 * @event {Function} onChange 当页码改变时触发，参数current
 * @example
 * ```
 * <ms-pages :widget="{total:@total,onChange:@handlePageChange，current:@currentPage}"></ms-pages>
 *
 * ```
 */
import * as avalon from 'avalon2';
require('./ms-page.less')

avalon.component('ms-page',{
    template: require('./ms-page.html'),
    defaults: {
        pageClassName:'',
        current: 1,
        pageSize: 20,
        total: 0,
        pageTotal:0,
        $computed: {
            pageTotal: function () {
                return Math.ceil(this.total / this.pageSize);
            }
        },
        prevPage: function () {
            if (this.current > 1) {
                this.getCurrent(--this.current);
                this.onChange(this.current,this.pageSize);
            }
        },
        nextPage: function () {
            if (this.current < this.pageTotal){
                this.getCurrent(++this.current);
                this.onChange(this.current,this.pageSize);
            }
        },
        onChange: avalon.noop,
        getCurrent: avalon.noop,
        onInit: function (event) {
        },
        onReady: function (event) {
        },
        onDispose: function (event) {
        }    
     }
});