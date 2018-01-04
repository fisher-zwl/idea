## 数据表格(vue)

### 基础表格
基本表格的展示方法

    基础表格data表格数据、loading加载，ms-table-colum作为表格列代替项传入，title，field是必有的，width是表示占比整个表格的百分比，比如width：10表示该列宽占比10%，
    在ms-table-column内只要加上html元素，就会优先显示这个html元素，加入的html元素可以使用record以及field名称操作数据，达到需求渲染的结果
```html
<div :controller="table-saika-01" :css="{'margin-bottom':'20px',height:380}">
    <ms-table-vue :widget="{data:@remoteList,loading:@loading}">
        <ms-table-column :widget="{title:'序号',field:'id',width:10}"><span>{{record.id+1}}</span></ms-table-column>
        <ms-table-column :widget="{title:'日期',field:'date',width:20}"><span>{{record.date|date("yyyy-MM-dd")}}</span></ms-table-column>
        <ms-table-column :widget="{title:'地址',field:'name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'省份',field:'address',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'名称',field:'province',width:20}"><span>wo hen shuai</span></ms-table-column>
        <ms-table-column :widget="{title:'状态',field:'statusTitle',width:10}">
            <span :css="{color: record.status ? 'red':'' }">{{record.statusTitle}}</span>
        </ms-table-column>
    </ms-table-vue>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { message } from 'ane';

const vm_saika_1 = avalon.define({
    $id: 'table-saika-01',
    remoteList: [],
    loading:false,
    list: avalon.range(10).map(n => ({
        id: n, name: '老狼' + n, address: '深山', province: '老林',date:'1514895537781',status:1,statusTitle:'在线'
    })),
     fetch(params = {}) {
        this.loading = true;
        this.remoteList = this.list;
        //console.log(this.list);
        this.loading = false;
    }
});
vm_saika_1.fetch();
```
### 带边框表格
带边框表格

    表格默认是不带外边框的，只是绑定了tableBorder，默认值是false，当tableBorder值为true时，会自动给表格加上边框
```html
<div :controller="table-saika-border" :css="{'margin-bottom':'20px',height:376}">
    <ms-table-vue :widget="{data:@remoteList,loading:@loading,tableBorder:@tableBorder}">
        <ms-table-column :widget="{title:'序号',field:'id',width:10}"><span>{{record.id+1}}</span></ms-table-column>
        <ms-table-column :widget="{title:'日期',field:'date',width:20}"><span>{{record.date|date("yyyy-MM-dd")}}</span></ms-table-column>
        <ms-table-column :widget="{title:'地址',field:'name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'省份',field:'address',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'名称',field:'province',width:20}"><span>wo hen shuai</span></ms-table-column>
        <ms-table-column :widget="{title:'状态',field:'statusTitle',width:10}">
            <span :css="{color: record.status ? 'red':'' }">{{record.statusTitle}}</span>
        </ms-table-column>
    </ms-table-vue>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { message } from 'ane';

const vm_saika_border = avalon.define({
    $id: 'table-saika-border',
    remoteList: [],
    loading:false,
    tableBorder:true,//带边框表格
    list: avalon.range(10).map(n => ({
        id: n, name: '老狼' + n, address: '深山', province: '老林',date:'1514895537781',status:1,statusTitle:'在线'
    })),
     fetch(params = {}) {
        this.loading = true;
        this.remoteList = this.list;
        //console.log(this.list);
        this.loading = false;
    }
});
vm_saika_border.fetch();
```

###hover事件

```html
<div :controller="table-saika-hover" :css="{'margin-bottom':'20px',height:150}">
    <ms-table-vue :widget="{data:@remoteList,tableWidth:@tableWidth,footer_data:@footer_data,loading:@loading,fixedLeft:@fixedLeft,fixedRight:@fixedRight,fixedLeft_width:@fixedLeft_width,fixedRight_width:@fixedRight_width,tableBodyClass:@tableBodyClass}">
        <ms-table-column :widget="{title:'序号',field:'id',width:10,type:'selection',rowspan:2,colspan:2}">{{record.id+1}}</ms-table-column>
        <ms-table-column :widget="{title:'全国',field:'name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'地区',field:'address',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'乡镇',field:'province',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'省会',field:'date',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'PID',field:'statusTitle',width:10}"><span>wo hen shuai</span></ms-table-column>
    </ms-table-vue>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { message } from 'ane';

const vm_saika_hover = avalon.define({
    $id: 'table-saika-hover',
    remoteList: [],
    footer_data:[],
    loading:false,
    fixedLeft:true,
    fixedRight:true,
    fixedLeft_width:200,
    fixedRight_width:200,
    tableWidth:2000,
    tableBodyClass:'table-body-saika-hover',
    list: avalon.range(8).map(n => ({
        id: n, name: '老狼' + n, address: '深山', province: '老林',date:'1514895537781',status:1,statusTitle:'在线'
    })),
    fetch() {
        this.loading = true;
        this.remoteList = this.list;
        this.loading = false;
    }
});
vm_saika_hover.fetch();
```

### 远程分页表格测试(vue)

```html
<div :controller="table-saika" :css="{'margin-bottom':'20px',height:150}">
    <ms-table-vue :widget="{data:@remoteList,tableWidth:@tableWidth,footer_data:@footer_data,loading:@loading,fixedLeft:@fixedLeft,fixedRight:@fixedRight,fixedLeft_width:@fixedLeft_width,fixedRight_width:@fixedRight_width,tableBodyClass:@tableBodyClass}">
        <ms-table-column :widget="{title:'序号',field:'region_id',width:10,type:'selection',rowspan:2,colspan:2}"></ms-table-column>
        <ms-table-column :widget="{title:'全国',field:'region_name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'地区',field:'region_name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'乡镇',field:'region_name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'省会',field:'region_name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'PID',field:'region_parent_id',width:10}"><span>wo hen shuai</span></ms-table-column>
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
    fixedLeft:true,
    fixedRight:true,
    fixedLeft_width:200,
    fixedRight_width:200,
    tableWidth:2000,
    tableBodyClass:'table-body-saika',
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