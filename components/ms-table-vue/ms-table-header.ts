import * as avalon from 'avalon2';

avalon.component('ms-table-header', {
    template: require('./ms-table-header.html'),
    defaults: {
        columns_data:[],
        tableWidth:100+'%',
        checkedAll:false,
        isdouble:false,
        header_column:[],
        handleCheckAll:avalon.noop,
        onInit(){
            //console.log('12w123');
        }
    }
});