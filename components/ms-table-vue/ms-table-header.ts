import * as avalon from 'avalon2';

avalon.component('ms-table-header', {
    template: require('./ms-table-header.html'),
    defaults: {
        columns_data:[],
        onInit(){
            console.log('12w123');
        }
    }
});