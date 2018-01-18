### 远程分页表格测试(easy)

```html
<div :controller="table-ie8" :css="{'margin-bottom':'20px'}">
    <ms-ie8-table :css="{height:'150px'}" :widget="{}">
        <table class=".table" slot="tableHeader">
            <thead>
                <tr>
                    <th>选择</th>
                    <th :click="@Click">序号</th>
                    <th :click="@Click">姓名</th>
                    <th :click="@Click">身份证</th>
                    <th :click="@Click">住处</th>
                    <th :click="@Click">手机号码</th>
                </tr>
            </thead>
        </table>
        <table slot="tableTbody">
            <tbody>
                <tr :for="($index,record) in @data">
                    <td title="表内容">{{record.region_id}}</td>
                    <td title="表内容">{{record.region_parent_id}}</td>
                    <td title="表内容">{{record.region_name}}</td>
                    <td title="表内容">{{record.region_type}}</td>
                    <td title="表内容">{{record.region_enble}}</td>
                    <td title="表内容">{{record.region_name}}</td>
                </tr>
            </tbody>
        </table>
    </ms-ie8-table>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { message } from 'ane';
import { notification } from 'ane';
const vm_saika = avalon.define({
    $id: 'table-ie8',
    data:[],
    Click(){
        alert('dsklkdsldskdsjlkd');
    },
    fetch(){
         $.getJSON('https://easy-mock.com/mock/58ff1b7c5e43ae5dbea5eff3/api/demo').then(data => {
            //data.rows[0].region_parent_id = Date.now();
            vm_saika.data = data.rows;
            //vm_saika.total = data.total;
        });
    }
});
vm_saika.fetch();
```