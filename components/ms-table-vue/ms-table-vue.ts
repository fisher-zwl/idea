import * as avalon from 'avalon2';
import '../ms-checkbox/ms-checkbox';
import * as $ from 'jquery';
import './ms-table-header';
import './ms-table-body';
import './ms-table-footer';
import {getColumn} from './ms-table-column';
import {getChildValue,getChildValue_double,popover} from './ms-table-util';
import '../ms-pagination/ms-pagination';
import {
    findParentComponent,
    parseSlotToVModel
} from '../../ane-util';

avalon.component('ms-table-vue', {
    template: require('./ms-table-vue.html'),
    defaults: {
        table_id:'',
        data: [],
        key: 'id',
        isdouble:false,//是否表头是多列
        header_column:[],
        columns_data:[],
        footer_data:[],
        loading:false,
        isTitle:false,
        checked: [],
        selection: [],
        checkedAll:false,
        scrollWidth:0,
        tableWidth:100+'%',//表格的宽度
        bodyTop:34,//表格内容上边距
        fixedLeft:false,//左侧固定
        fixedRight:false,//右侧固定
        fixed_bottom:1,//左右侧底部bottom
        columns_data_left:[],
        columns_data_right:[],
        fixedPatch:false,//右边滚动条间隙
        is_scrollLeft:true,//滚动条的位置
        is_scrollRight:false,
        scrollWidth_able:0,//可滚动的宽度
        fixedLeft_width:0,//左侧固定列宽度
        fixedRight_width:0,
        tableBorder:false,//表格是否有边框
        mouseenter_row:'',
        actions: avalon.noop,
        onSelect: avalon.noop,
        onSelectAll: avalon.noop,
        selectionChange: avalon.noop,
        handleMouseenter(row){//鼠标移进的事件
            this.mouseenter_row = row;
        },
        handleMouseLeave(){
            this.mouseenter_row = '';
        },
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
        onInit:function(event){
            let avalon_this = this;
            avalon_this.table_id = event.vmodel.$id;
            //console.log(event.vmodel);
            let columns = [];
            if(this.isdouble){
                let row = getChildValue_double(event.vmodel);
                columns = row[0];
                console.log('JSON.stringify(columns)'+ columns);
                row.shift();
                avalon_this.header_column = row;
            }else{
                columns = getChildValue(event.vmodel);
            }
            let columns_data = [];
            columns.forEach(function(column) {
                columns_data.push(column.props);
                if(column.props.type == "select"){
                    avalon_this.key = column.props.field || avalon_this.key;
                } 
            });
            console.log(columns_data);
            avalon_this.columns_data = columns_data;
            avalon_this.columns_data_left = [columns_data[0]];
            let len = columns_data.length-1;
            avalon_this.columns_data_right = [columns_data[len]];
            this.$watch('data', (v) => {
                avalon_this.checkedAll = false;
                avalon_this.checked.clear();
                avalon_this.selection.clear();
                popover();
            });
            this.$watch('data.length', v => {
                avalon_this.checkedAll = false;
                avalon_this.checked.clear();
                avalon_this.selection.clear();
                popover();
            });
            this.$watch('loading', v => {
                if(v){
                    this.display = 'block';
                }else{
                    this.display = 'none';
                    scrollFnc(avalon_this);
                }
            });
            
            $('#'+avalon_this.table_id).find('.ane-table-vue-body').scroll(function(){//监听滚动
                avalon_this.scrollWidth_able = avalon_this.scrollWidth+  $('#'+avalon_this.table_id).find('.ane-table-vue-body').get(0).scrollWidth- $('#'+avalon_this.table_id).find('.ane-table-vue-body').get(0).offsetWidth; 
                if($(this).scrollLeft() === avalon_this.scrollWidth_able){
                    avalon_this.is_scrollRight = true;
                }else if($(this).scrollLeft() < avalon_this.scrollWidth_able){
                    avalon_this.is_scrollRight = false;
                }
                if($(this).scrollLeft() == 0){
                    avalon_this.is_scrollLeft = true;
                }else if($(this).scrollLeft() > 0){
                    avalon_this.is_scrollLeft = false;
                }
                $('#'+avalon_this.table_id).find('.table-vue-table').scrollLeft($(this).scrollLeft()); 
                $('#'+avalon_this.table_id).children().find('.ane-table-vue-fixedLeft-body').scrollTop($(this).scrollTop());
                $('#'+avalon_this.table_id).children().find('.ane-table-vue-fixedRight-body').scrollTop($(this).scrollTop());
            });
            popover();
        },
        onReady: function(event) {
            let avalon_this = this;
            scrollFnc(avalon_this);
            $(window).resize(function(){//监测浏览器发生大小变化
                scrollFnc(avalon_this);
            });
            //console.log(event || window.event);
        },
        onDispose: function(vm, el) {}
    }
});
function scrollFnc(avalon_this){//判断是否有垂直滚动条
    let atvb = $('#'+avalon_this.table_id).find('.ane-table-vue-body').get(0);
    if( atvb.offsetHeight <  atvb.scrollHeight){
        avalon_this.scrollWidth = 17;
        avalon_this.fixedPatch = true;
    }else{
        avalon_this.scrollWidth = 0;
        avalon_this.fixedPatch = false;
    }
    if( atvb.offsetWidth <  atvb.scrollWidth){
        avalon_this.fixed_bottom = 18;
    }else{
        avalon_this.fixed_bottom = 1;
    }
}

let header_data = [
    {"is":"ms-table-column","props":{"title":"","field":"id","width":10,"type":"select","rowspan":3,"colspan":1,"inlineTemplate":""},"inlineTemplate":""},
    {"is":"ms-table-column","props":{"title":"全国","field":"name","width":20,"rowspan":3,"colspan":1,"inlineTemplate":""},"inlineTemplate":""},
    {"is":"ms-table-column","props":{"title":"地区","field":"address","width":20,"rowspan":3,"colspan":1,"inlineTemplate":""},"inlineTemplate":""},
    {
        "is": "ms-table-column",
        "props": {
          "title": "乡镇",
          "field": "province",
          "width": 20,
          "rowspan": 1,
          "colspan": 2,
          "inlineTemplate": "<ms-table-column :widget=\"{title:'学校',field:'date',width:10,rowspan:2,colspan:1}\"><span>hahhahhah</span></ms-table-column><ms-table-column :widget=\"{title:'政府',field:'statusTitle',width:10,rowspan:1,colspan:1}\"><ms-table-column :widget=\"{title:'公安',field:'statusTitle',width:10}\"></ms-table-column></ms-table-column>"},
        "children":[
            {"is":"ms-table-column","props":{"title":"'学校'","field":"'date'","width":"10","rowspan":"2","colspan":"1"}},
            {
                "props": {
                  "title": "'政府'",
                  "field": "'statusTitle'",
                  "width": "10",
                  "rowspan": "1",
                  "colspan": "1"
                },
                "children":[{"is":"ms-table-column","props":{"title":"'公安'","field":"'statusTitle'","width":"10"}}]
              }
        ]
    },
    {"is":"ms-table-column","props":{"title":"省会","field":"date","width":20,"rowspan":3,"colspan":1,"inlineTemplate":""},"inlineTemplate":""},
    {"is":"ms-table-column","props":{"title":"操作","field":"statusTitle","width":10,"type":"operation","rowspan":3,"colspan":1,"inlineTemplate":"<span><a :click=\"handle('search')\" href=\"javascript:void(0)\" :css=\"{marginRight:10}\">查看</a><a :click=\"handle('delete')\" href=\"javascript:void(0)\" :css=\"{marginRight:10}\">删除</a><a :click=\"handle('edit')\" href=\"javascript:void(0)\">编辑</a></span>"},"inlineTemplate":"<span><a :click=\"handle('search')\" href=\"javascript:void(0)\" :css=\"{marginRight:10}\">查看</a><a :click=\"handle('delete')\" href=\"javascript:void(0)\" :css=\"{marginRight:10}\">删除</a><a :click=\"handle('edit')\" href=\"javascript:void(0)\">编辑</a></span>"}
]