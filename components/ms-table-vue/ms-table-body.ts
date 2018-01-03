import * as avalon from 'avalon2';

avalon.component('ms-table-body', {
    template: require('./ms-table-body.html'),
    defaults: {
        columns_data:[],
        table_data:[],
        tableWidth:100+'%',
        onInit(){
            //console.log('body');
        }
    }
});