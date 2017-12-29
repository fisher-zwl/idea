import * as avalon from 'avalon2';
let  columns_data =  [];
avalon.component('ms-table-column', {
    template: '&nbsp;',
    defaults: {
        columns:[],
        field:"",//列字段标识
        title:"",//列字段名称
        width:"",//列宽
        type:"",//列类型
        onInit: function(event) {
            let columns_data = {
                'field':this.field,
                'title':this.title,
                'width':this.width,
                'type':this.type
            };
            console.log(columns_data);

        }
    }
});

export function  getColumn(){
    return columns_data;
}