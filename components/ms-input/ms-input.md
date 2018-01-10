## 输入组件

### 代码演示

#### 基本使用

``` html
<div :controller="doc-input-basic">
    <xmp is="ms-input" :widget="{col:'name',value:@value,isClear:@isClear_name,$rules:{required:true,message:'请输入名字'},onChange:@onChange_name}"></xmp>
    <xmp is="ms-input" :widget="{col:'pass',value:'',isClear:@isClear_pass, placeholder:'请输入密码', $rules:{required:true},onChange:@onChange_pass}"></xmp>
    <button :click="@Clear_name">清除1</button>
    <button :click="@Clear_pass">清除2</button>
</div>
```

``` js
import * as avalon from 'avalon2';
import 'ane';

const vm = avalon.define({
    $id: 'doc-input-basic',
    value: 'atroy',
    isClear_name:false,
    isClear_pass:false,
    Clear_name(){
        //console.log('djskldjksljdls:'+this.isClear);
        this.isClear_name = true;
    },
    Clear_pass(){
        //console.log('djskldjksljdls:'+this.isClear);
        this.isClear_pass = true;
    },
    onChange_name(e){
        if(e.target.value){
            this.isClear_name = false;
            console.log(' this.isClear_name:'+ this.isClear_name);
        }
    },
    onChange_pass(e){
        if(e.target.value){
            this.isClear_pass = false;
            console.log(' this.isClear_pass:'+ this.isClear_pass);
        }
        console.log(e);
    }
});
```

> 继承 [ms-control 组件](#!/form-control) 的所有参数