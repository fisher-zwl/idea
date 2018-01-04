import * as avalon from 'avalon2';

avalon.component('ms-table-body', {
    template: require('./ms-table-body.html'),
    defaults: {
        columns_data:[],
        table_data:[],
        tableWidth:100+'%',
        mouseenter_row:'',//保存hover事件的行index
        handleMouseenter:avalon.noop,
        handleMouseLeave:avalon.noop,
        onInit(event){
            let tr = event.vmodel.$element.children[0].children[0].children;
            //console.log(event.vmodel.$element.children[0].children[0].children);
            this.$watch('mouseenter_row',function(newVal,oldVal){
                let oldRow = tr[oldVal];
                let newRow = tr[newVal];
                if (oldRow) {
                    oldRow.classList.remove('hover-row');
                  //removeClass(oldRow, 'hover-row');
                }
                if (newRow) {
                    newRow.classList.add('hover-row');
                 // addClass(newRow, 'hover-row');
                }
            });
        }
    }
});