## 数据表格

### 多列多行表头

```html
<div :controller="table-easy-titleRows" :css="{'margin-bottom':'20px'}">
    <ms-easy-table :css="{height:'150px'}" :widget="{data:@remoteList,columns:@columns,loading:@loading,pagination:@pagination,onChange:@handleTableChange,onSelect:@handleSelect, onSelectAll:@handleSelectAll, isTitle:@isTitle,titleRows:@titleRows,isTitleRows:@isTitleRows,theadHeight:@theadHeight}">
    </ms-easy-table>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { message } from 'ane';

const vm_saika_titleRows = avalon.define({
    $id: 'table-easy-titleRows',
    remoteList: [],
    loading: false,
    isTitle:true,
    isTitleRows:true,
    theadHeight:64,
    pagination: {
        pageSize: 6, total: 0
    },
    columns:[
        {
            needSelection:false,
            dataIndex:'region_id',
            title:'',
        },
        {
            title:'姓名',
            dataIndex:'region_name'
        },
        {
            title:'身份',
            dataIndex:'region_parent_id'
        },
        {
            title:'住处',
            dataIndex:'region_enble'
        },{
            title:'类型',
            dataIndex:'region_type'
        }
    ],
    titleRows:[
        [
            {fields: ['region_id'], title: '排序', titleAlign: 'center', rowspan: 2},
            {fields: ['region_name','region_parent_id','region_enble'], title: '个人信息', titleAlign: 'center', colspan: 3},
            {fields: ['custome'], title: '类型', titleAlign: 'center', rowspan: 2}
        ],
        [
            {fields: ['region_name'], title: '姓名', titleAlign: 'center'},
            {fields: ['region_parent_id'], title: '身份', titleAlign: 'center'},
            {fields: ['region_enble'], title: '住处', titleAlign: 'center'}
        ]
    ],
    fetch(params = {}) {
        vm_saika_titleRows.loading = true;
        $.getJSON('https://easy-mock.com/mock/58ff1b7c5e43ae5dbea5eff3/api/demo', params).then(data => {
            // vm_saika.pagination.total = data.total;
            data.rows[0].region_parent_id = Date.now();
            vm_saika_titleRows.remoteList = data.rows;
            vm_saika_titleRows.loading = false;
        });
    },
    handleSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    handleSelectAll(selected, selectedRows) {
        console.log(selected, selectedRows);
    },
    handleTableChange(pagination) {
        if (this.pagination.hasOwnProperty('current')) {
            vm_saika_titleRows.pagination.current = pagination.current;
        }
        this.fetch({
            start: pagination.pageSize * (pagination.current - 1),
            limit: pagination.pageSize
        });
    }
});
vm_saika_titleRows.fetch();
```