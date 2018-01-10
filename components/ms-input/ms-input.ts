import * as avalon from 'avalon2';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import { findParentComponent } from '../../ane-util';

controlComponent.extend({
    displayName: 'ms-input',
    template: require('./ms-input.html'),
    defaults: {
        text: '',
        type: 'input', 
        disabled: false,
        isClear:false,
        mapValueToText(value) {
            this.text = value;
        },
        clearValue(){
            this.text = '';
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
            let avalon_this = this;
            this.$watch('isClear',function(v){
                if(v){
                    this.mapValueToText('');
                    this.handleChange({
                        target: { value: '' },
                        denyValidate: true,
                        type: 'changed'
                    });
                }
            });
            this.mapValueToText(this.value);
        }
    }
});