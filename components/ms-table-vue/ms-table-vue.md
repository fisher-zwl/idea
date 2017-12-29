## 数据表格

### 远程分页表格测试(vue)

```html
<div :controller="table-saika" :css="{'margin-bottom':'20px',height:150}">
    <ms-table-vue :widget="{data:@remoteList,footer_data:@footer_data,loading:@loading}">
        <ms-table-column :widget="{title:'序号',field:'region_id',width:20,type:'selection',rowspan:2,colspan:2}"></ms-table-column>
        <ms-table-column :widget="{title:'全国',field:'region_name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'地区',field:'region_name',width:30}"></ms-table-column>
        <ms-table-column :widget="{title:'PID',field:'region_parent_id',width:30}"><span>wo hen shuai</span></ms-table-column>
    </ms-table-vue>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { message } from 'ane';

const vm_saika = avalon.define({
    $id: 'table-saika',
    remoteList: [],
    footer_data:[],
    loading:false,
    fetch(params = {}) {
        this.loading = true;
        $.getJSON('https://easy-mock.com/mock/58ff1b7c5e43ae5dbea5eff3/api/demo', params).then(data => {
            data.rows[0].region_parent_id = Date.now();
            vm_saika.remoteList = data.rows;
            for(let i = 0;i < data.rows.length;i++){
                data.rows[i].region_id = '合计';
            }
            this.loading = false;
        });
    }
});
vm_saika.fetch();
```