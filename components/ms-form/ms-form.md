## 表单组件

### 带验证功能的表单

```html
<div :controller="doc-form-validate">
    <xmp is="ms-form" :widget="{$form:@$form}">
        <ms-form-item :widget="{label:'标题'}">
            <ms-input :widget="{col:'title',$rules:{required:true,message:'请输入标题'}}"></ms-input>
        </ms-form-item>
        <ms-form-item :widget="{label:'邮箱'}">
            <ms-input :widget="{col:'email',$rules:{required:true,pattern:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,message:'请输入正确邮箱'}}"></ms-input>
        </ms-form-item>
        <ms-form-item :widget="{label:'内容'}">
            <ms-textarea :widget="{col:'content',$rules:{required:true}}"></ms-textarea>
        </ms-form-item>
        <button type="button" class="btn btn-primary btn-sm" :click="@save">保存</button>
    </xmp>
    <pre>{{@json}}</pre>
</div>
```

```js
import * as avalon from 'avalon2';
import { createForm, message } from 'ane';

const vm = avalon.define({
    $id: 'doc-form-validate',
    json: '',
    $form: createForm({
        onFieldsChange(fields, record) {
            vm.json = JSON.stringify(record);
        }
    }),
    save() {
        vm.$form.validateFields().then(isAllValid => {
            if (isAllValid) {
                message.success({
                    content: '保存成功'
                });
            }
        })

        // 验证某个字段
        vm.$form.validateField('email').then(result => {
            if (!result.isOk) {
                message.success({
                    content: result.message
                });
            }
        })

    }
});
```

### 用于搜索的表单

```html
<div :controller="doc-form-search">
    <xmp is="ms-form" :widget="{$form:@$form,type:'search',inline:true}">
        <ms-form-item :widget="{label:'标题：'}">
            <ms-input :widget="{col:'title'}"></ms-input>
        </ms-form-item>
        <ms-form-item :widget="{label:'内容：'}">
            <ms-input :widget="{col:'content'}"></ms-input>
        </ms-form-item>
        <button type="button" class="btn btn-primary btn-sm" :click="@save">搜索</button>
    </xmp>
    <pre>{{@json}}</pre>
</div>
```

```js
import * as avalon from 'avalon2';
import { createForm, message } from 'ane';

const vm1 = avalon.define({
    $id: 'doc-form-search',
    json: '',
    $form: createForm({
        onFieldsChange(fields, record) {
            vm1.json = JSON.stringify(record);
        }
    }),
    save() {
        vm1.$form.validateFields().then(isAllValid => {
            if (isAllValid) {
                message.success({
                    content: JSON.stringify(vm1.$form.record)
                });
            }
        })
    }
});
```

### 组件参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| $form | 表单数据集散中心，详见下文 | createForm() | null |
| type | 如果为 search，则只在表单项的值被用户手动修改时，才会加入到最后要提交的数据对象上，用于搜索表单 | string | '' |
| horizontal | 是否添加 form-horizontal 到 class | boolean | false |
| inline | 是否添加 form-inline 到 class | boolean | false |

#### createFrom(options)

由于 avalon2 自带的表单验证只能配合 ms-duplex 使用，表单中每个组件都写 onChnage 配置又很繁琐，并且为了方便的收集和分发表单数据，所以有了这个 `“表单数据集散中心”`。

options 配置：

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| record | 表单数据 | any | `{}` |
| autoAsyncChange | 是否在表单项改变时同步数据到 record | boolean | true |
| onFieldsChange | 表单项改变的回调 | function(fields, record) | noop |

$form 对象可访问的属性如下：

| 参数 | 说明 | 类型 |
|-----|-----|-----|
| fields | 所有的字段集合 | { \[string\]: meta } |
| setFieldsValue | 设置字段值的方法 | (fields) => void |
| addFields | 添加字段 | (fields) => void |
| validateField | 验证某个字段 | (fieldName) => Promise<{isOk: boolean, name: string, message: string}> |
| validateFields | 验证多个或者所有字段 | (field?) => Promise&#x3C;boolean&#x3E; |
| resetFields | 重置多个或者所有字段 | (field?) => void |


avalon内置验证规则有：
| 规则 | 描述 |
|-----|-----|
required(true) | 必须输入的字段。
email(true) | 必须输入正确格式的电子邮件。
url(true) | 必须输入正确格式的网址。
date(true或正则) | 必须输入正确格式的日期。默认是要求YYYY-MM-dd这样的格式。
number(true) | 必须输入合法的数字（负数，小数）。
digits(true) | 必须输入整数。
pattern(正则或true) | 让输入数据匹配给定的正则，如果没有指定，那么会到元素上找pattern属性转换成正则再匹配。
equalto(ID名) | 输入值必须和 #id 元素的value 相同。
maxlength：5	 | 输入长度最多是 5 的字符串（汉字算一个字符）。
minlength：10  | 输入长度最小是 10 的字符串（汉字算一个字符）。
chs(true) | 要求输入全部是中文。
max:5  | 输入值不能大于 5。
min:10  | 输入值不能小于 10。