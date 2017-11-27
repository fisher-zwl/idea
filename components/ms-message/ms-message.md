## 全局提示

### 基本用法

```html
<div :controller="doc-message-basic">
    <button type="button" class="btn btn-primary" :click="@info">普通提示</button>
    <button type="button" class="btn btn-default" :click="@success">成功提示</button>
    <button type="button" class="btn btn-default" :click="@error">失败提示</button>
    <button type="button" class="btn btn-default" :click="@warning">警告提示</button>
</div>
```

```js
import * as avalon from 'avalon2';
import { message } from 'ane';

avalon.define({
    $id: 'doc-message-basic',
    info() {
        message.info({
            content: '这是一条普通提示'
        });
    },
    success() {
        message.success({
            content: '这是一条成功提示'
        });
    },
    error() {
        message.error({
            content: '这是一条失败提示'
        });
    },
    warning() {
        message.warn({
            content: '这是一条警告提示'
        });
    }
});
```

### API

- `message.success({ content, duration, layout })`
- `message.error({ content, duration, layout })`
- `message.info({ content, duration, layout })`
- `message.warning({ content, duration, layout })`
- `message.warn({ content, duration, layout })` 同 message.warning

| 参数 | 说明 | 类型 | 默认值 | 是否可选 | 可选值 |
| --- | --- | --- | --- | --- | --- |
| content | 提示内容 | string | - | 必选 |
| duration | 自动关闭的延时，单位毫秒 | number | 1500 | 可选 |
| layout | 提示位置 | string | topRight | 可选 | topLeft / topCenter / topCenter  centerLeft / center / rightCenter  bottomLeft / bottomCenter / bottomCenter |

可以改变默认参数

- `message.config({ duration })`

| 参数 | 说明 | 类型 | 默认值 | 是否可选 | 可选值 |
| --- | --- | --- | --- | --- | --- |
| duration | 自动关闭的延时，单位毫秒 | number | 1500 | 可选 | - |