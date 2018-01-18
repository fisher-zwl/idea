import * as avalon from 'avalon2';
import '../ms-checkbox/ms-checkbox';
import * as $ from 'jquery';
import {
    findParentComponent,
    parseSlotToVModel
} from '../../ane-util';

let easyTable = avalon.component('ms-ie8-table', {
    template: require('./ms-ie8-table.html'),
    defaults: {
        $for:':for="dddd"',
        onInit:function(event){
            let vm = event.vmodel;
            console.log(event.vmodel);
        },
        onReady:function(event){
            $('#tbody').resize(function(){
                tableSaikaColumn();
            });
            console.log($(".ane-table-fixed-tbody table").height());
        },
        onViewChange(){
            tableSaikaColumn();
        },
        onDispose: function(vm, el) {}
    }
});
function tableSaikaColumn(){
    console.log('出现滚动条dddd');
    let obj = document.getElementById('tbody');
    if(obj.scrollHeight>obj.clientHeight||obj.offsetHeight>obj.clientHeight){
        console.log('出现滚动条');
    }
    
    // if($('.ane-table-fixed-tbody').height() < $(".ane-table-fixed-tbody table").height()){
    //     console.log('出现滚动条');
    // }
    // $(".ane-table-fixed-thead .table").width($('.ane-table-fixed-tbody').width()+2);
    // $(".ane-table-fixed-tbody .table").width($('.ane-table-fixed-tbody').width());
    // $(".ane-table-fixed-thead .ane-table-th").each(function(index){         
    //     let td=$('.ane-table-fixed-tbody .ane-table-th').eq(index);
    //     $(this).find('span').width(td.width()+1);
    //     $(this).find('span').height(td.height()+3);
    //     $(this).find('span').css('line-height',(td.height()+3)+'px');
    // });
}
