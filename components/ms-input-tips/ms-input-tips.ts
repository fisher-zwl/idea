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
        x_show:false,
        mapValueToText(value) {
            this.text = value;
        },
        handleClear(){
            this.mapValueToText('');
            this.handleChange({
                target: { value: '' },
                denyValidate: true,
                type: 'changed'
            });
            $(".ane-input-tips input[name="+this.col +"]").focus();
            return false;
        },
        blur(){
            this.x_show = false;
        },
        focus(){
            this.x_show = true;
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
            this.mapValueToText(this.value);
        }
    }
});