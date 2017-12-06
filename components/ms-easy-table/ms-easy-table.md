## 数据表格

### 多列多行表头

```html
<div :controller="table-easy-titleRows" :css="{'margin-bottom':'20px'}">
    <ms-easy-table :css="{height:'150px'}" 

:widget="{data:@remoteList,columns:@columns,loading:@loading,pagination:@pagination,onChange:@handleTableChange,onSelect:@handleSelect, 

onSelectAll:@handleSelectAll, isTitle:@isTitle,titleRows:@titleRows,isTitleRows:@isTitleRows,theadHeight:@theadHeight}">
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
    theadHeight:62,
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
        ],
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

### 远程分页表格测试(easy)

```html
<div :controller="table-easy" :css="{'margin-bottom':'20px'}">
    <ms-easy-table :css="{height:'150px'}" :widget="{data:@remoteList,columns:@columns,actions:@actions,onSelect:@handleSelect, onSelectAll:@handleSelectAll, isTitle:@isTitle,onClick:@onClick}">
    </ms-easy-table>
    <ms-page :widget="{total:@total,onChange:@handlePageChange,current:@current,pageSize:@pageSize,pageClassName:@pageClassName,getCurrent:@getCurrent}"></ms-page>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { message } from 'ane';
import { notification } from 'ane';
const vm_saika = avalon.define({
    $id: 'table-easy',
    remoteList: [],
    loading: false,
    isTitle:true,
    total:0,
    current:1,
    pageSize:10,
    pageClassName:'page-table',
    columns:[
        {
            dataIndex:'region_id',
            title:'',
            type:'select'
        },
        {
            title:'序号',
            type:'index',
            formatter:function(index){//可以设置序号
                return '<span>'+(index+1)+'</span>';
            }
        },
        {
            title:'姓名555555',
            dataIndex:'region_name'
        },
        {
            title:'身份',
            dataIndex:'region_parent_id'
        },
        {
            title:'住处',
            dataIndex:'region_name'
        },
        {
            title:'操作',
            type:'operation',
            dataIndex:'region_id',
            template:'<a :click="@handle(\'delete\', col, record, $index)">删除</a>'
                +'<a :click="@handle(\'edit\', col, record, $index)">编辑</a>'
                +'<a :click="@handle(\'check\', col, record, $index)">查看</a>'
        }
    ],
    getCurrent(current) {
        this.current = current;
    },
    fetch(params) {
        params.page = this.current;
        //vm_saika.loading = true;
        $.getJSON('https://easy-mock.com/mock/58ff1b7c5e43ae5dbea5eff3/api/demo', params).then(data => {
            // vm_saika.pagination.total = data.total;
            data.rows[0].region_parent_id = Date.now();
            vm_saika.remoteList = data.rows;
            vm_saika.total = data.total;
            vm_saika.loading = false;
        });
    },
    handleSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    handleSelectAll(selected, selectedRows) {
        console.log(selected, selectedRows);
    },
    actions(type, text, record, index) {
        if (type == 'delete') {
            message.success({
                content: '删除成功'
            });
        }
        if (type == 'edit') {
            message.success({
                content: '编辑成功'
            });
        }
        if (type == 'check') {
            message.success({
                content: '查看数据成功'
            });
        }
    },
    handlePageChange(currentPage) {
        notification.info({ 
            message: '当前第' + currentPage + '页',
            title: '通知'
        });
        this.fetch(params);
    },
    onClick(index, record){//点击行
        console.log('onClick:');
        console.log(index, record);
    }
});
let params = {
    'page': vm_saika.current,
    'pageSize':vm_saika.pageSize
}
vm_saika.fetch(params);
```