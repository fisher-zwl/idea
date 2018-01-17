## 输入组件

### 代码演示

#### 基本使用

``` html
<div :controller="doc-input-basic">
    <div :css="{marginBottom:10}">
        <xmp is="ms-input-tips" 
            :widget="{
                col:'name',
                tips_error:@tips_error_name,
                error_color:'#d2403d',
                tips_html:@tips_html_name,
                tips_prompt:true,
                onChange:@onChange_name}">
        </xmp>
    </div>
    <div  :css="{marginBottom:10}">
        <xmp is="ms-input-tips" 
            :widget="{
                col:'pass',
                tips_error:@tips_error_pass,
                tips_blur:@tips_blur,
                tips_focus:@tips_focus,
                error_color:'#d2403d', 
                placeholder:'请输入密码',
                tips_prompt:true,
                tips_html:@tips_html_pass,
                onChange:@onChange_pass}">
        </xmp>
    </div>
    <button :click="@sumbit_name" :css="{marginRight:10}">提交账号</button>
    <button :click="@sumbit_pass">提交密码</button>
    <div :css="{marginTop:10,marginBottom:10}">
        <xmp is="ms-input-tips" 
            :widget="{
                col:'password',
                value:'ceshi',
                tips_clear:false, 
                placeholder:'请输入密码',
                onChange:@onChange_pass}">
        </xmp>
    </div>
</div>
```

``` js
import * as avalon from 'avalon2';
import 'ane';
import {notification} from 'ane';

const vm = avalon.define({
    $id: 'doc-input-basic',
    name:'',
    pass:'',
    tips_error_name:false,
    tips_error_pass:false,
    tips_html_name:'账号支持数字、字母、汉字',
    tips_html_pass:'密码提示',
    tips_blur(text){
        console.log('光标已经移除:'+ text);
    },
    tips_focus(){
        console.log('光标已聚焦');
    },
    sumbit_name(){
        if(!this.name){
            this.tips_error_name = true;
            this.tips_html_name = '请输入账号';
        }else{
            notification.success({
                message: '提交账号成功',
                title: '通知'
            });
        }
    },
    sumbit_pass(){
        if(!this.pass){
            this.tips_error_pass = true;
            this.tips_html_pass = '请输入密码';
        }else{
            notification.success({
                message: '提交密码成功',
                title: '通知'
            });
        }
    },
    onChange_name(e){
        if(/[^0-9a-zA-Z\u4e00-\u9fa5]/.test(e.target.value)){
            this.tips_html_name = '请输入正确账号格式';
            this.tips_error_name = true;
        }else{
            this.tips_html_name = '账号支持数字、字母、汉字';
            this.tips_error_name = false;
        }
        this.name = e.target.value;
    },
    onChange_pass(e){
        this.pass = e.target.value;
        if(e.target.value){
            this.tips_error_pass = false;
            this.tips_html_pass = '密码提示';
        }
    }
});
```

### 组件参数
（注意：区分于ms-input组件，在于ms-input-tips自带×清除数据功能）

input样式字段：
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| error_color | 错误x和input颜色 | string | '#d2403d' |
| success_color | ×成功颜色(input默认颜色) | string | '#536C80' |
| tips_html | 提示内容文字 | string | '' |

input布尔值判断字段
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| tips_clear | 是否带×（默认带×） | boolean | true |
| tips_error | input框验证错误 | boolean | false |
| tips_prompt | input是否下方提示 | boolean | false |
| prompt_show | input隐藏提示的文字内容| boolean | false |
| x_show | input隐藏×显示 | boolean | false |
| disabled | 禁用input使用 | boolean | false |

input事件函数
| 参数 | 说明 | 类型 | 参数 |
|-----|-----|-----|-----|
| tips_blur | input光标焦点消失触发 | function | text（焦点消失的input值） |
| tips_focus | input光标聚焦时触发 | function | 无 |

> 继承 [ms-control 组件](#!/form-control) 的所有参数