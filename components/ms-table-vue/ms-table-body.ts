import * as avalon from 'avalon2';

avalon.component('ms-table-body', {
    template: require('./ms-table-body.html'),
    defaults: {
        columns_data:[],
        table_data:[],
        onInit(){
            console.log('body');
        }
    }
});