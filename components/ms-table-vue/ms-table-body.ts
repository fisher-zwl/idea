import * as avalon from 'avalon2';

avalon.component('ms-table-body', {
    template: require('./ms-table-body.html'),
    defaults: {
        columns_data:[],
        table_data:[],
        tableWidth:100+'%',
        checked:[],
        key:'id',
        mouseenter_row:'',//保存hover事件的行index
        handleMouseenter:avalon.noop,
        handleMouseLeave:avalon.noop,
        handleCheck:avalon.noop,
        actions: avalon.noop,
        operationTranslate(template){
            template = template.replace(/(ms-|:)click="handle\(([^"]*)\)"/g, ($0, $1, $2, $3) => {
                return `${$1}click="handle(${$2},)"`.replace(/,/, ', el, record, $index,').replace(/,\)/, ')');
            });
            return template;
        },
        handle: function(type, el, record, $index) {
            var extra = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                extra[_i - 4] = arguments[_i];
            }
            var text = record[el.field].$model || record[el.field];
            this.actions.apply(this, [type, text, record.$model, $index].concat(extra));
        },
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