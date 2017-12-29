import * as avalon from 'avalon2';
import * as bootbox from 'bootbox';
import { parseSlotToVModel } from '../../ane-util';
import * as $ from 'jquery';

avalon.component('ms-dialog', {
    template: '<div style="display: none"><slot name="header" /><slot name="body"/><slot name="footer"/></div>',
    defaults: {
        body: 'blank',
        footer: '',
        $dialog: null,
        show: false,
        className: '',
        size: '',
        uploading: false,
        $innerVm: '',
        okText: '',
        cancelText: '',
        height:'',
        width:'',
        isMove:false,
        onOk() {},
        onCancel() {},
        onInit(event) {
            var vm = event.vmodel;
            vm.$watch('show', (newV) => {
                if (newV) {
                    vm.$dialog = bootbox.dialog({
                        message: vm.body,
                        title: '{{title}}',
                        className: vm.className,
                        size: vm.size,
                        buttons: this.footer.length ? null : {
                            save: {
                                label: vm.okText || '保存',
                                className: 'btn-primary',
                                callback() {
                                    vm.onOk();
                                    return false;
                                }
                            },
                            cancel: {
                                label: vm.cancelText || '取消',
                                className: 'btn-default',
                                callback() {
                                }
                            }
                        }
                    }).on('hidden.bs.modal', (e) => {
                        vm.onCancel();
                        setTimeout(() => {
                            if ($('.modal.in').length) {
                                $('body').addClass('modal-open');
                            } else {
                                $('body').removeClass('modal-open');
                            }
                        }, 100);
                    })
                    .on('shown.bs.modal', () => {
                        
                    });
                    if(this.height && this.width){
                        let height = this.height,
                            width = this.width;
                        vm.$dialog.find('.modal-dialog').css({
                            "width": width+"px",
                            "top": function () {
                                return (vm.$dialog.height() - height - 70) / 2 + "px";  
                            }
                        });
                        vm.$dialog.find('.modal-content').css({  
                            "margin": "0px", 
                            "height": height+"px",
                            "width": width+"px"
                        });
                    }
                    const $content = vm.$dialog.find('.modal-content').attr(':controller', this.$innerVm);
                    if (this.footer.length) {
                        $content.append($(this.footer));
                    }
                    avalon.scan(vm.$dialog.get(0));
                    if(this.isMove){
                        DragDrop.enable();//拖放初始化
                    }
                } else {
                    if (vm.$dialog) {
                        $('body').trigger("click");
                        vm.$dialog.find('.bootbox-close-button').trigger('click');
                    }
                }
            });
        },
        onReady(event) {
            parseSlotToVModel(this);
            this.show && this.$fire('show', true);
        },
        onDispose(event) {
        }
    }
});

//拖放
let  DragDrop = function() {
    var dragdrap ={
        "enable":function() {
            $(document).mousedown(handleEvent);
            $(document).mousemove(handleEvent);
            $(document).mouseup(handleEvent);
        },
        "disable": function() {
            $(document).unbind('mousedown');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
        }
    },
        dragging = null,
        diffX = 0,
        diffY = 0;
  
    function handleEvent(event) {
    
        event = event || window.event;
    
        switch(event.type) {
            case 'mousedown' :
                
                var target = event.target || event.srcElement,
                    targetParent = target.offsetParent;
                
                if (targetParent == null) {
                    return;
                }
                // if(targetParent.className.indexOf('yhglDraggable') == -1){
                //     return;
                // }
                if (event.target.className == 'modal-header' || event.target.parentElement.className == 'modal-header') {
                    dragging = targetParent;
                    diffX = event.clientX - targetParent.offsetLeft;
                    diffY = event.clientY - targetParent.offsetTop;
                } else {
                    return;
                }
                break;
                
            case 'mousemove' :
                
                if (dragging !== null) {
                    dragging.style.left = (event.clientX - diffX) + 'px';
                    dragging.style.top = (event.clientY - diffY) + 'px';
                } else {
                    return;
                }
                break;
            
            case 'mouseup' :
                
                if (dragging !== null) {
                    dragging = null;
                } else {
                    return;
                }
                break;
        };
    };
    return dragdrap;
}();