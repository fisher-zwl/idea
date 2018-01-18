import * as avalon from 'avalon2';
import * as $ from 'jquery';
import 'bootstrap';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import { findParentComponent } from '../../ane-util';

controlComponent.extend({
    displayName: 'ms-input-tips',
    template: require('./ms-input-tips.html'),
    defaults: {
        text: '',
        type: 'input', 
        disabled: false,
        error_color:'#d2403d',
        success_color:'#536C80',
        tips_clear:true,
        tips_error:false,
        tips_html:'',
        tips_prompt:false,
        tips_blur:avalon.noop,
        tips_focus:avalon.noop,
        x_show:false,
        prompt_show:false,
        mapValueToText(value) {
            this.text = value;
        },
        handleClear(){
            var avalon_this = this;
            this.mapValueToText('');
            this.handleChange({
                target: { value: '',name:avalon_this.col},
                denyValidate: true,
                type: 'changed'
            });
            $(".ane-input-tips input[name="+this.col +"]").focus();
            return false;
        },
        blur(){
            if(!this.tips_error){
                this.x_show = false;
                this.prompt_show = false;
            }
            this.tips_blur(this.text);
        },
        focus(){
            this.x_show = true;
            this.prompt_show = true;
            this.tips_focus();
        },
        onInit: function (event) {
            emitToFormItem(this);
            this.$watch('value', v => {
                this.mapValueToText(v);
                this.handleChange({
                    target: { value: v },
                    denyValidate: true,
                    type: 'changed'
                });
            });
            var avalon_this = this;
            this.$watch('tips_error', v => {
                if(v){
                    avalon_this.x_show = true;
                    avalon_this.prompt_show = true;
                }
            });
            this.mapValueToText(this.value);
        }
    }
});