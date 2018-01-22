import * as avalon from 'avalon2';

avalon.component('ms-table-header', {
    template: require('./ms-table-header.html'),
    defaults: {
        columns_data:[],
        tableWidth:100+'%',
        checkedAll:false,
        isdouble:false,
        header_column:[],
        sortCaret_asc:false,//升序
        sortCaret_desc:false,//降序
        default_sort:'asc',
        handleCheckAll:avalon.noop,
        handleSort:avalon.noop,
        sortClick(event,field,type){
            this.handleSort(field,type);
            switch(type){
                case 'asc':
                    event.target.parentElement.classList.add('asc');
                    event.target.parentElement.classList.remove('desc');
                    //this.default_sort = 'asc';
                    //console.log('字段'+field+'将进行'+'----升序----');
                    break;
                case 'desc':
                    event.target.parentElement.classList.add('desc');
                    event.target.parentElement.classList.remove('asc');
                    //this.default_sort = 'desc';
                    //console.log('字段'+field+'将进行'+'----降序----');
                    break;
            }
        },
        sortCaret(field,type){
            
        },
        clickEvent(e){
            console.log(e);
        },
        onInit(){
            //console.log('12w123');
        }
    }
});