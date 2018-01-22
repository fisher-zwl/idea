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

### 有title属性可复制性表格

    表格默认是没有title属性，如果有需要只加个isTitle为true即可，不过如果是外加进入的数值必须采用属性tdval和rel属性，见下例子
```html
<div :controller="table-saika-title" :css="{'margin-bottom':'20px',height:376}">
    <ms-table-vue :widget="{data:@remoteList,loading:@loading,tableBorder:@tableBorder,isTitle:@isTitle}">
        <ms-table-column :widget="{title:'序号',field:'id',width:10}"><span>{{record.id+1}}</span></ms-table-column>
        <ms-table-column :widget="{title:'日期',field:'date',width:20}"><span>{{record.date|date("yyyy-MM-dd")}}</span></ms-table-column>
        <ms-table-column :widget="{title:'地址',field:'name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'省份',field:'address',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'名称',field:'province',width:20}"><span tdval="wo hen shuai" rel="drevil">wo hen shuai</span></ms-table-column>
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

const vm_saika_title = avalon.define({
    $id: 'table-saika-title',
    remoteList: [],
    loading:false,
    isTitle:true,
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
vm_saika_title.fetch();
```


### hover事件

```html
<div :controller="table-saika-hover" :css="{'margin-bottom':'20px',height:150}">
    <ms-table-vue :widget="{data:@remoteList,tableWidth:@tableWidth,footer_data:@footer_data,loading:@loading,fixedLeft:@fixedLeft,fixedRight:@fixedRight,fixedLeft_width:@fixedLeft_width,fixedRight_width:@fixedRight_width,tableBorder:@tableBorder}">
        <ms-table-column :widget="{title:'序号',field:'id',width:10,rowspan:2,colspan:2}">{{record.id+1}}</ms-table-column>
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
    tableBorder:true,
    fixedLeft_width:200,
    fixedRight_width:200,
    tableWidth:2000,
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

### checkbox事件

```html
<div :controller="table-saika-checkbox" :css="{'margin-bottom':'20px',height:150}">
    <ms-table-vue :widget="{data:@remoteList,tableWidth:@tableWidth,footer_data:@footer_data,loading:@loading,fixedRight:@fixedRight,fixedLeft_width:@fixedLeft_width,fixedRight_width:@fixedRight_width,tableBorder:@tableBorder,onSelect:@onSelect,onSelectAll:@onSelectAll}">
        <ms-table-column :widget="{title:'',field:'id',width:10,type:'select',rowspan:2,colspan:2}"></ms-table-column>
        <ms-table-column :widget="{title:'全国',field:'name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'地区',field:'address',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'乡镇',field:'province',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'省会',field:'date',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'PID',field:'statusTitle',width:10}"></ms-table-column>
    </ms-table-vue>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { message } from 'ane';

const vm_saika_checkbox = avalon.define({
    $id: 'table-saika-checkbox',
    remoteList: [],
    footer_data:[],
    loading:false,
    fixedRight:true,
    tableBorder:true,
    fixedLeft_width:200,
    fixedRight_width:200,
    tableWidth:2000,
    list: avalon.range(8).map(n => ({
        id: n, name: '老狼' + n, address: '深山', province: '老林',date:'1514895537781',status:1,statusTitle:'在线'
    })),
    onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows) {
        console.log(selected, selectedRows);
    },
    fetch() {
        this.loading = true;
        this.remoteList = this.list;
        this.loading = false;
    }
});
vm_saika_checkbox.fetch();
```

### 操作列事件

```html
<div :controller="table-saika-operation" :css="{'margin-bottom':'20px',height:150}">
    <ms-table-vue :widget="{data:@remoteList,tableWidth:@tableWidth,footer_data:@footer_data,loading:@loading,fixedRight:@fixedRight,fixedLeft_width:@fixedLeft_width,fixedRight_width:@fixedRight_width,tableBorder:@tableBorder,onSelect:@onSelect,onSelectAll:@onSelectAll,actions:@actions}">
        <ms-table-column :widget="{title:'',field:'id',width:10,type:'select',rowspan:2,colspan:2}"></ms-table-column>
        <ms-table-column :widget="{title:'全国',field:'name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'地区',field:'address',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'乡镇',field:'province',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'省会',field:'date',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'操作',field:'statusTitle',width:10,type:'operation'}">
            <span>
                <a :click="handle('search')" href="javascript:void(0)" :css="{marginRight:10}">查看</a>
                <a :click="handle('delete')" href="javascript:void(0)" :css="{marginRight:10}">删除</a>
                <a :click="handle('edit')" href="javascript:void(0)">编辑</a>
            </span>
        </ms-table-column>
    </ms-table-vue>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { notification } from 'ane';

const vm_saika_operation= avalon.define({
    $id: 'table-saika-operation',
    remoteList: [],
    footer_data:[],
    loading:false,
    fixedRight:true,
    tableBorder:true,
    fixedLeft_width:200,
    fixedRight_width:200,
    tableWidth:2000,
    list: avalon.range(8).map(n => ({
        id: n, name: '老狼' + n, address: '深山', province: '老林',date:'1514895537781',status:1,statusTitle:'在线'
    })),
    onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows) {
        console.log(selected, selectedRows);
    },
    actions(type, text, record, index) {
        console.log(type, text, record, index);
        if (type == 'search') {
            notification.success({
                message: '查看数据',
                title: '通知'
            });
        }
        if (type == 'delete') {
            notification.success({
                message: '删除成功',
                title: '通知'
            });
        }
        if (type == 'edit') {
            notification.success({
                message: '编辑成功',
                title: '通知'
            });
        }
    },
    fetch() {
        this.loading = true;
        this.remoteList = this.list;
        this.loading = false;
    }
});
vm_saika_operation.fetch();
```

### 表格滚动条系列

```html
<div :controller="table-saika-scroll" :css="{'margin-bottom':'20px',height:150}">
    <ms-table-vue :widget="{data:@remoteList,tableWidth:@tableWidth,loading:@loading,tableBorder:@tableBorder,onSelect:@onSelect,onSelectAll:@onSelectAll,actions:@actions}">
        <ms-table-column :widget="{title:'',field:'id',width:10,type:'select',rowspan:2,colspan:2}"></ms-table-column>
        <ms-table-column :widget="{title:'全国',field:'name',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'地区',field:'address',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'乡镇',field:'province',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'省会',field:'date',width:20}"></ms-table-column>
        <ms-table-column :widget="{title:'操作',field:'statusTitle',width:10,type:'operation'}">
            <span>
                <a :click="handle('search')" href="javascript:void(0)" :css="{marginRight:10}">查看</a>
                <a :click="handle('delete')" href="javascript:void(0)" :css="{marginRight:10}">删除</a>
                <a :click="handle('edit')" href="javascript:void(0)">编辑</a>
            </span>
        </ms-table-column>
    </ms-table-vue>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { notification } from 'ane';

const vm_saika_scroll= avalon.define({
    $id: 'table-saika-scroll',
    remoteList: [],
    loading:false,
    tableBorder:true,
    tableWidth:2000,
    list: avalon.range(8).map(n => ({
        id: n, name: '老狼' + n, address: '深山', province: '老林',date:'1514895537781',status:1,statusTitle:'在线'
    })),
    onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows) {
        console.log(selected, selectedRows);
    },
    actions(type, text, record, index) {
        console.log(type, text, record, index);
        if (type == 'search') {
            notification.success({
                message: '查看数据',
                title: '通知'
            });
        }
        if (type == 'delete') {
            notification.success({
                message: '删除成功',
                title: '通知'
            });
        }
        if (type == 'edit') {
            notification.success({
                message: '编辑成功',
                title: '通知'
            });
        }
    },
    fetch() {
        this.loading = true;
        this.remoteList = this.list;
        this.loading = false;
    }
});
vm_saika_scroll.fetch();
```

### 远程分页表格测试(vue)

```html
<div :controller="table-saika" :css="{'margin-bottom':'20px',height:150}">
    <ms-table-vue :widget="{data:@remoteList,tableWidth:@tableWidth,footer_data:@footer_data,loading:@loading,fixedLeft:@fixedLeft,fixedRight:@fixedRight,fixedLeft_width:@fixedLeft_width,fixedRight_width:@fixedRight_width}">
        <ms-table-column :widget="{title:'序号',field:'region_id',width:10,rowspan:2,colspan:2}"></ms-table-column>
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


### 表格多行多列

```html
<div :controller="table-saika-double" :css="{'margin-bottom':'20px',height:330}">
    <ms-table-vue :widget="{data:@remoteList,tableWidth:@tableWidth,loading:@loading,tableBorder:@tableBorder,onSelect:@onSelect,onSelectAll:@onSelectAll,actions:@actions,isdouble:@isdouble,bodyTop:@bodyTop}">
        <ms-table-column :widget="{title:'',field:'id',width:10,type:'select',rowspan:3,colspan:1}"></ms-table-column>
        <ms-table-column :widget="{title:'全国',field:'name',width:20,rowspan:1,colspan:1}">
            <ms-table-column :widget="{title:'代表',field:'date',width:20,rowspan:2,colspan:1}"></ms-table-column>
        </ms-table-column>
        <ms-table-column :widget="{title:'地区',field:'address',width:20,rowspan:3,colspan:1}"></ms-table-column>
        <ms-table-column :widget="{title:'乡镇',field:'province',width:20,rowspan:1,colspan:2}">
            <ms-table-column :widget="{title:'学校',field:'name',width:15,rowspan:2,colspan:1}"><span>hahhahhah</span></ms-table-column>
            <ms-table-column :widget="{title:'政府',field:'statusTitle',width:5,rowspan:1,colspan:1}">
                <ms-table-column :widget="{title:'公安',field:'name',width:5}"></ms-table-column>
            </ms-table-column>
        </ms-table-column>
        <ms-table-column :widget="{title:'省会',field:'date',width:20,rowspan:3,colspan:1}"><span>帅</span></ms-table-column>
        <ms-table-column :widget="{title:'操作',field:'statusTitle',width:10,type:'operation',rowspan:3,colspan:1}">
            <span>
                <a :click="handle('search')" href="javascript:void(0)" :css="{marginRight:10}">查看</a>
                <a :click="handle('delete')" href="javascript:void(0)" :css="{marginRight:10}">删除</a>
                <a :click="handle('edit')" href="javascript:void(0)">编辑</a>
            </span>
        </ms-table-column>
    </ms-table-vue>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { notification } from 'ane';

const vm_saika_double = avalon.define({
    $id: 'table-saika-double',
    remoteList: [],
    loading:false,
    tableBorder:true,
    tableWidth:2000,
    isdouble:true,
    bodyTop:104,
    list: avalon.range(8).map(n => ({
        id: n, name: '老狼' + n, address: '深山', province: '老林',date:'1514895537781',status:1,statusTitle:'在线'
    })),
    onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows) {
        console.log(selected, selectedRows);
    },
    actions(type, text, record, index) {
        console.log(type, text, record, index);
        if (type == 'search') {
            notification.success({
                message: '查看数据',
                title: '通知'
            });
        }
        if (type == 'delete') {
            notification.success({
                message: '删除成功',
                title: '通知'
            });
        }
        if (type == 'edit') {
            notification.success({
                message: '编辑成功',
                title: '通知'
            });
        }
    },
    fetch() {
        this.loading = true;
        this.remoteList = this.list;
        this.loading = false;
    }
});
vm_saika_double.fetch();
```

### 表格字段排序

        表格排序：排序的字段为sort，当sort为'default'值，表格默认进行升降序排序，default_sort表示的是默认排序时初始排序状态，比如'asc'代表升序排序，'desc'代表降序排序;
    当sort为'custom'，表格进行的是自定义排序，custom_sortClass代表的是将要自定义排序的类名，此处类名建议使用fontAwesome字体图标的样式类，比如例子代码中
    'fa fa-sort-alpha-desc';当然当进行点击排序的时候，我绑定了handleSort函数，可以进行反馈目前进行的排序触发状态情况，返回值有field、type，field指的是排序的表格字段，
    type指的是当前进行的表格排序类型，custom表示自定义排序。
    
```html
<div :controller="table-saika-sort" :css="{'margin-bottom':'20px',height:376}">
    <ms-table-vue :widget="{data:@remoteList,loading:@loading,tableBorder:@tableBorder,handleSort:@handleSort}">
        <ms-table-column :widget="{title:'序号',field:'id',width:10,sort:'default',default_sort:'asc'}"><span>{{record.id+1}}</span></ms-table-column>
        <ms-table-column :widget="{title:'日期',field:'date',width:20,sort:'default',default_sort:'desc'}"><span>{{record.date|date("yyyy-MM-dd")}}</span></ms-table-column>
        <ms-table-column :widget="{title:'地址',field:'name',width:20,sort:'default'}"></ms-table-column>
        <ms-table-column :widget="{title:'省份',field:'address',width:20,sort:'custom',custom_sortClass:'fa fa-sort-alpha-desc'}"></ms-table-column>
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
import { notification } from 'ane';

const vm_saika_sort = avalon.define({
    $id: 'table-saika-sort',
    remoteList: [],
    loading:false,
    tableBorder:true,//带边框表格
    list: avalon.range(10).map(n => ({
        id: n, name: '老狼' + n, address: '深山', province: '老林',date:'1514895537781',status:1,statusTitle:'在线'
    })),
     fetch(params = {}) {
        this.loading = true;
        this.remoteList = this.list;
        this.loading = false;
    },
    handleSort(field,type){
        notification.success({
            message: '字段：'+field+'将进行'+type,
            title: '通知'
        });
    }
});
vm_saika_sort.fetch();
```


### 表格footer合计行
    
```html
<div :controller="table-saika-footer" :css="{'margin-bottom':'20px',height:376}">
    <ms-table-vue :widget="{data:@remoteList,loading:@loading,tableBorder:@tableBorder,handleSort:@handleSort,footer_show:true,bodyBottom:34,footer_data:@footer_data}">
        <ms-table-column :widget="{title:'序号',field:'id',width:10,sort:'default',default_sort:'asc'}"><span>{{record.id+1}}</span></ms-table-column>
        <ms-table-column :widget="{title:'日期',field:'date',width:20,sort:'default',default_sort:'desc'}"><span>{{record.date|date("yyyy-MM-dd")}}</span></ms-table-column>
        <ms-table-column :widget="{title:'地址',field:'name',width:20,sort:'default'}"></ms-table-column>
        <ms-table-column :widget="{title:'省份',field:'address',width:20,sort:'custom',custom_sortClass:'fa fa-sort-alpha-desc'}"></ms-table-column>
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
import { notification } from 'ane';

const vm_saika_footer = avalon.define({
    $id: 'table-saika-footer',
    remoteList: [],
    footer_data:[],
    loading:false,
    tableBorder:true,//带边框表格
    list: avalon.range(10).map(n => ({
        id: n, name: '老狼' + n, address: '深山', province: '老林',date:'1514895537781',status:1,statusTitle:'在线'
    })),
     fetch(params = {}) {
        this.loading = true;
        this.remoteList = this.list;
        this.footer_data = [
            [
                {field:'合计',width:10,colspan:1},
                {field:200,width:20,colspan:1},
                {field:300,width:20,colspan:1},
                {field:400,width:20,colspan:1},
                {field:500,width:20,colspan:1},
                {field:'--',width:10,colspan:1},
            ]
        ]
        this.loading = false;
    },
    handleSort(field,type){
        notification.success({
            message: '字段：'+field+'将进行'+type,
            title: '通知'
        });
    }
});
vm_saika_footer.fetch();
```