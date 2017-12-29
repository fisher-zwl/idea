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
        onInit:function(event){
            console.log(event.vmodel);
            let columns = getChildValue(event.vmodel);
            let columns_data = [];
            columns.forEach(function(column) {
                columns_data.push(column.props);
            });
            console.log(columns_data.length);
            this.columns_data = columns_data;
            console.log(columns);
            this.$watch('data', (v) => {

            });
            this.$watch('data.length', v => {
            });
            this.$watch('loading', v => {
                if(v){
                    this.display = 'block';
                }else{
                    this.display = 'none';
                    if($('.ane-table-vue-fixed-body').get(0).offsetHeight < $('.ane-table-vue-fixed-body').get(0).scrollHeight){
                        this.scrollWidth = 17;
                    }else{
                        this.scrollWidth = 0;
                    }
                }
            });
        },
        onReady: function(event) {
        },
        onDispose: function(vm, el) {}
    }
});