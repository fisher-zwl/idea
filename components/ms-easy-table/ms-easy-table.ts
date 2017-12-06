import * as avalon from 'avalon2';
import '../ms-checkbox/ms-checkbox';
import * as $ from 'jquery';
import './ms-easy-table-util';
import '../ms-pagination/ms-pagination';
import {
    findParentComponent,
    parseSlotToVModel
} from '../../ane-util';
// import '../ms-loading';

let easyTable = avalon.component('ms-easy-table', {
    template: require('./ms-easy-table.html'),
    defaults: {
        columns: [],
        data: [],
        currentPage:1,
        prePageSize:20,
        theadHeight:32,
        key: 'id',
        loading: false,
        display:'none',
        needSelection: false,
        titleRows:[],//表头行标题
        isTitleRows:false,//表头titleRows是否有值
        maxWidth:2000,//tb最大宽度
        clickBg:1000,
        isClick:false,//是否触发点击事件
        checked: [],
        selection: [],
        isAllChecked: false,
        isTitle:false,
        onSelect: avalon.noop,
        onSelectAll: avalon.noop,
        selectionChange: avalon.noop,
        handleCheckAll: function(e) {
            var _this = this;
            var data = _this.data;
            if (e.target.checked) {
                data.forEach(function(record) {
                    _this.checked.ensure(record[_this.key]);
                    _this.selection.ensure(record);
                });
            } else {
                if (data.length > 0) {
                    this.checked.clear();
                    this.selection.clear();
                } else {
                    this.checked.removeAll(function(el) { return data.map(function(record) { return record[_this.key]; }).indexOf(el) !== -1; });
                    this.selection.removeAll(function(el) { return data.indexOf(el) !== -1; });
                }
            }
            this.selectionChange(this.checked, this.selection.$model);
            this.onSelectAll(e.target.checked, this.selection.$model);
        },
        handleCheck: function(checked, record) {
            if (checked) {
                this.checked.ensure(record[this.key]);
                this.selection.ensure(record);
            } else {
                this.checked.remove(record[this.key]);
                this.selection.remove(record);
            }
            this.selectionChange(this.checked, this.selection.$model);
            this.onSelect(record.$model, checked, this.selection.$model);
        },
        actions: avalon.noop,
        handle: function(type, col, record, $index) {
            var extra = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                extra[_i - 4] = arguments[_i];
            }
            var text = record[col.dataIndex].$model || record[col.dataIndex];
            this.actions.apply(this, [type, text, record.$model, $index].concat(extra));
        },
        onChange: avalon.noop,
        tableClick(index , record){
            this.clickBg = index;
            this.onClick(index,record.$model);
            return false;
        },
        onClick: avalon.noop,
        onInit: function(event) {
            var _this = this;
            this.columns.forEach(function(column) {
                if (column.needSelection) {//返回选择项的字段
                    _this.key = column.dataIndex || _this.key;
                    return false;
                }
            });
            this.$watch('checked.length', function(newV) {
                var currentPageKeys = _this.data
                    .map(function(record) { return record[_this.key]; });
                _this.isAllChecked = currentPageKeys
                    .filter(function(key) { return _this.checked.contains(key); })
                    .length == currentPageKeys.length;
            });
            this.$watch('data', function(v) {
                _this.isAllChecked = false;
                _this.checked.clear();
                _this.selection.clear();
                _this.clickBg  = 1000;
                tableSaikaColumn();
            });
            this.$watch('data.length', function(v) {
                _this.isAllChecked = false;
                _this.checked.clear();
                _this.selection.clear();
                _this.clickBg  = 1000;
                //tableSaikaColumn();
            });
            this.$watch('loading', function(v) {
                if(v){
                    this.display = 'block';
                }else{
                    this.display = 'none';
                }
            });
            //tableSaikaColumn();
        },
        onReady: function(event) {
            $(window).resize(function(){//监测浏览器发生大小变化
                tableSaikaColumn();
            });
        },
        onDispose: function(vm, el) {}
    }
});
function tableSaikaColumn(){
    $(".ane-table-fixed-thead .table").width($('.ane-table-fixed-tbody .table').width()+2);
    easyTable.theadHeight = $('.ane-table-fixed-tbody .table thead').height();  
    $(".ane-table-fixed-thead .ane-table-th").each(function(index){         
        let td=$('.ane-table-fixed-tbody .ane-table-th').eq(index);
        $(this).find('span').width(td.width());
        $(this).find('span').height(td.height()-2);
        $(this).find('span').css('line-height',(td.height()-2)+'px');
    });
}