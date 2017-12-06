## page分页组件

### 基本用法

```html
<div :controller="doc-page-basic">
    <ms-page :widget="{total:@total,onChange:@handlePageChange,current:@current,pageSize:@pageSize,pageClassName:@pageClassName}"></ms-page>
</div>
```

```js
import * as avalon from 'avalon2';
import * as $ from 'jquery';
import { notification } from 'ane';

const vm = avalon.define({
    $id: 'doc-page-basic',
    current: 1,
    pageSize: 10,
    total: 30,
    pageClassName:'aaaaaaaa',
    handlePageChange(currentPage) {
        notification.info({
            message: '当前第' + currentPage + '页',
            title: '通知'
        });
    }
});
```

### 组件参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| current | 当前页，从 1 开始 | number | 1 |
| pageSize | 每页条数 | number | 10 |
| total | 数据总数 | total | 0 |
| onChange | 翻页时的回调 | function(currentPage:number) | noop |