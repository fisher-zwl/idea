import * as avalon from 'avalon2';

avalon.component('ms-table-footer', {
    template: require('./ms-table-footer.html'),
    defaults: {
        columns_data:[],
        footer_data:[],
        onInit(){
            //console.log('body');
        }
    }
});