## 输入组件

### 代码演示

#### 基本使用

``` html
<div :controller="doc-input-basic">
    <xmp is="ms-input-tips" :widget="{col:'name',tips_error:@tips_error_name,value:@value,error_color:'#d2403d',$rules:{required:true,message:'请输入名字'},onChange:@onChange_name}"></xmp>
    <xmp is="ms-input-tips" :widget="{col:'pass',tips_error:@tips_error_pass,value:'',error_color:'#d2403d', placeholder:'请输入密码', $rules:{required:true},onChange:@onChange_pass}"></xmp>
    <button :click="@Clear_name">× 颜色改变1</button>
    <button :click="@Clear_pass">× 颜色改变2</button>
    <xmp is="ms-input-tips" :widget="{col:'password',value:'',tips_clear:@tips_clear, placeholder:'请输入密码', $rules:{required:true},onChange:@onChange_pass}"></xmp>
</div>
```

``` js
import * as avalon from 'avalon2';
import 'ane';

const vm = avalon.define({
    $id: 'doc-input-basic',
    value: 'atroy',
    tips_clear:false,
    tips_error_name:false,
    tips_error_pass:false,
    Clear_name(){
        this.tips_error_name = true;
    },
    Clear_pass(){
        this.tips_error_pass = true;
    },
    onChange_name(e){
        if(e.target.value){
            this.tips_error_name = false;
        }
    },
    onChange_pass(e){
        if(e.target.value){
            this.tips_error_pass = false;
        }
    }
});
```

### 组件参数
（注意：区分于ms-input组件，在于ms-input-tips自带×清除数据功能）

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| tips_clear | 是否带×（默认带×） | boolean | true |
| tips_error | input框验证错误 | boolean | false |
| error_color | ×错误颜色 | string | '#d2403d' |
| success_color | ×成功颜色(默认颜色) | string | '#536C80' |

> 继承 [ms-control 组件](#!/form-control) 的所有参数