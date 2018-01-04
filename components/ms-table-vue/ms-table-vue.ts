import * as avalon from 'avalon2';
import '../ms-checkbox/ms-checkbox';
import * as $ from 'jquery';
import './ms-table-header';
import './ms-table-body';
import './ms-table-footer';
import {getColumn} from './ms-table-column';
import {getChildValue} from './ms-table-util';
import '../ms-pagination/ms-pagination';
import {
    findParentComponent,
    parseSlotToVModel
} from '../../ane-util';

avalon.component('ms-table-vue', {
    template: require('./ms-table-vue.html'),
    defaults: {
        data: [],
        columns_data:[],
        footer_data:[],
        loading:false,
        scrollWidth:0,
        tableWidth:100+'%',//表格的宽度
        fixedLeft:false,//左侧固定
        fixedRight:false,//右侧固定
        columns_data_left:[],
        columns_data_right:[],
        fixedPatch:false,//右边滚动条间隙
        is_scrollLeft:true,//滚动条的位置
        is_scrollRight:false,
        scrollWidth_able:0,//可滚动的宽度
        fixedLeft_width:0,//左侧固定列宽度
        fixedRight_width:0,
        tableBodyClass:'table-body',
        tableBorder:false,//表格是否有边框
        mouseenter_row:'',
        handleMouseenter(row){//鼠标移进的事件
            this.mouseenter_row = row;
        },
        handleMouseLeave(){
            this.mouseenter_row = '';
        },
        onInit:function(event){
            let avalon_this = this;
            //console.log(event.vmodel);
            let columns = getChildValue(event.vmodel);
            let columns_data = [];
            columns.forEach(function(column) {
                columns_data.push(column.props);
            });
            //console.log(columns);
            avalon_this.columns_data = columns_data;
            avalon_this.columns_data_left = [columns_data[0]];
            let len = columns_data.length-1;
            avalon_this.columns_data_right = [columns_data[len]];
            //console.log(columns);
            this.$watch('data', (v) => {

            });
            this.$watch('data.length', v => {
            });
            this.$watch('loading', v => {
                if(v){
                    this.display = 'block';
                }else{
                    this.display = 'none';
                    scrollFnc(avalon_this);
                }
            });
            $('.'+avalon_this.tableBodyClass).scroll(function(){//监听水平滚动条
                //console.log($('.'+avalon_this.tableBodyClass));
                avalon_this.scrollWidth_able = avalon_this.scrollWidth+ $('.'+avalon_this.tableBodyClass).get(0).scrollWidth-$('.'+avalon_this.tableBodyClass).get(0).offsetWidth; 
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
                $('.ane-table-vue-header').scrollLeft($(this).scrollLeft()); 
                $('.ane-table-vue-fixedLeft-body').scrollTop($(this).scrollTop());
                $('.ane-table-vue-fixedRight-body').scrollTop($(this).scrollTop());
            });
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
    if($('.'+avalon_this.tableBodyClass).get(0).offsetHeight < $('.'+avalon_this.tableBodyClass).get(0).scrollHeight){
        avalon_this.scrollWidth = 17;
        avalon_this.fixedPatch = true;
    }else{
        avalon_this.scrollWidth = 0;
        avalon_this.fixedPatch = false;
    }
}