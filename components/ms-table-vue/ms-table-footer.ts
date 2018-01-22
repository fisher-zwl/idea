import * as avalon from 'avalon2';

avalon.component('ms-table-footer', {
    template: require('./ms-table-footer.html'),
    defaults: {
        footer_data:[],
        tableWidth:100+'%',
        onInit(){
        }
    }
});