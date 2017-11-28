## 数据表格

### 远程分页表格测试(easy)

```html
<div :controller="table-easy" :css="{'margin-bottom':'20px'}">
    <ms-easy-table :css="{height:'150px'}" :widget="{data:@remoteList,columns:@columns,loading:@loading,pagination:@pagination,onChange:@handleTableChange,onSelect:@handleSelect, onSelectAll:@handleSelectAll, isTitle:@isTitle}">
    </ms-easy-table>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { message } from 'ane';

const vm_saika = avalon.define({
    $id: 'table-easy',
    remoteList: [],
    loading: false,
    isTitle:true,
    pagination: {
        pageSize: 6, total: 0
    },
    columns:[
        {
            needSelection:true,
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
            dataIndex:'region_name'
        }
    ],
    fetch(params = {}) {
        vm_saika.loading = true;
        $.getJSON('http://easy-mock.com/mock/58ff1b7c5e43ae5dbea5eff3/api/demo', params).then(data => {
            // vm_saika.pagination.total = data.total;
            data.rows[0].region_parent_id = Date.now();
            vm_saika.remoteList = data.rows;
            vm_saika.loading = false;
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
            vm_saika.pagination.current = pagination.current;
        }
        this.fetch({
            start: pagination.pageSize * (pagination.current - 1),
            limit: pagination.pageSize
        });
    }
});
vm_saika.fetch();
```



### 组件参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| columns | 表格表头定义 | {title:string,dataIndex:string,needSelection:boolean}\[\] | \[\] |
| data | 表格数据 | any\[\] | \[\] |
| key | 数据行的唯一标识字段 | string | 'id' |
| isTitle | 表格td的title是否作用标志 | boolean | false|
| loading | 数据是否正在加载中 | boolean | false |
| needSelection | 是否需要选择数据行 | boolean | false |
| actions | handle方法被调用后，这个方法就会被调用 | function(type:string,text:string,record,index:number,...extra) | noop |
| pagination | 分页对象 | object | {current: 1, pageSize: 10, total: NaN, onChange: avalon.noop} |
| onSelect | 用户选择/取消选择行的回调，传入行数据、是否选中和所有选择的行数据 | function(record,selected:boolean,selectedRows) | noop |
| onSelectAll | 用户全选/取消全选的回调，传入是否选中和所有选择的行数据 | function(selected:boolean,selectedRows) | noop |
| selectionChange | 选择项变化时候的回调，传入所有选择的行数据key的集合和所有选择的行数据 | function(selectedRowKeys:string\[\],selectedRows) | noop |
| onChange | 分页、过滤或排序变化时的回调 | function(pagination) | noop |

> 当 pagination 中的 total 属性为 `NaN` 时，表示本地分页，否则表示远程分页

> handle 是一个内置的方法，用于相应自定义的表格数据操作，并交给 actions 参数统一处理