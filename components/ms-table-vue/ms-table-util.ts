import * as avalon from 'avalon2';
import * as $ from 'jquery';
import 'bootstrap';

export function getChildValue(vmodel, render = vmodel.$render): any[] {//单行表头
    if (render.directives === undefined) {
        return [];
    }
    return render.directives.reduce((acc, action) => {
        if (action.is === 'ms-table-column') {
            acc.push({
                is: action.is,
                props: avalon.mix(true,action.value, {'inlineTemplate':action.fragment}),
                inlineTemplate: action.fragment,
                children: getChildValue(vmodel, action.innerRender || { directives: [] })
            });
        }
        return acc;
    }, []);
}

export function getChildValue_double(vmodel, render = vmodel.$render): any[] {//多行表头
    if (render.directives === undefined) {
        return [];
    }
    let one = [],
        two = [],
        three = [],
        renderColumn = [],
        arr=[];
    for(let i = 0; i < 5;i++){//可支持4行表格表头
        arr[i] = [];
    }
    return render.directives.reduce((acc, action) => {
        if (action.is === 'ms-table-column') {
            arr[1].push({
                is: action.is,
                props: avalon.mix(true,action.value, {'inlineTemplate':action.fragment}),
                inlineTemplate: action.fragment
            });
            let children = action.node.children,
                t = 2,
                temp = [];
            let columns = {
                is: action.is,
                props: avalon.mix(true,action.value, {'inlineTemplate':action.fragment}),
                inlineTemplate: action.fragment
            };
            if(children.length > 0){
                getChildObject(columns,children,t,arr);
            }else{
                arr[0].push({
                    is: action.is,
                    props: avalon.mix(true,action.value, {'inlineTemplate':action.fragment}),
                    inlineTemplate: action.fragment
                });
            }
        }
        acc = arr;
        return acc;
    }, []);
}
function getChildObject(columns,val,i,item){
    val.forEach(function(element){
        if(element.nodeName == 'ms-table-column'){
            let oneJect = getChildNode(element.props[':widget']);
            item[i].push({
                is: 'ms-table-column',
                props: oneJect,
                inlineTemplate: '',
            });
            let columns = {
                is: 'ms-table-column',
                props: oneJect,
                inlineTemplate: '',
            }
            if(element.children.length > 0){
                if(element.children[0].nodeName == 'span'){
                    columns.inlineTemplate = element.children[0].dom.outerHTML;
                }
                let t = i+1;
                getChildObject(columns,element.children,t,item);
            }else{
                item[0].push({
                    is: 'ms-table-column',
                    props: avalon.mix(true,columns.props, {'inlineTemplate':columns.inlineTemplate}),
                    inlineTemplate: columns.inlineTemplate,
                });
                return false;
            }
        }else{
            item[0].push({
                is: columns.is,
                props: avalon.mix(true,columns.props, {'inlineTemplate':columns.inlineTemplate}),
                inlineTemplate: columns.inlineTemplate,
            });
            return false;
        }
    });
}

export function popover(){//title的bootstrap tooltip
    var timer;
    $("[rel=drevil]").popover({  
        trigger:'manual',
        container: 'body',
        placement : 'top',
        //delay:{ show: 5000},
        //viewport:{selector: 'body',padding:0},
        //title : '<div style="font-size:14px;">title</div>',  
        html: 'true',  
        content: function() { 
            return '<div class="title-content">'+ $(this).attr('tdval') +'</div>';  
        },  
        animation: false  
    }).on("mouseenter", function () {  
        var _this = this;
        timer = setTimeout(function(){
            $('div').siblings(".popover").popover("hide"); 
            $(_this).popover("show");
        },1000);
        $(_this).siblings(".popover").on("mouseleave", function () {  
            $(_this).popover('hide'); 
        });
    }).on("mouseleave", function () {  
        var _this = this;
        clearTimeout(timer);  
        setTimeout(function () {  
            if (!$(".popover:hover").length) {  
                $(_this).popover("hide");  
            }  
        }, 100);  
    }).on('shown.bs.popover', function () {
        $('.popover').mouseleave(function(){
            $('.popover').hide();
        });
    }); 
}

function getChildNode(str){
    let regex = /([^{}](?=.*})(?!.*{))+/;
    let  obj = {};
    let strKey = regex.exec(str)[0].split(',');
    strKey.forEach(function(val){
        let key = val.split(':')[0];
        let title = val.split(':')[1];
        title = title.replace(/^\'|\'$/g,'');
        obj[key] = title;
    });
    return obj;
}

// /**
//  * 获取 td 元素，即单元格
//  * @param event 触发的事件
//  * @returns {*} td 元素 或者 null
//  */
// export const getCell = function(event) {
//     let cell = event.target;
  
//     while (cell && cell.tagName.toUpperCase() !== 'HTML') {
//       if (cell.tagName.toUpperCase() === 'TD') {
//         return cell;
//       }
//       cell = cell.parentNode;
//     }
  
//     return null;
//   };

//移除类函数
// export function removeClass(el,cls){
//     if (!el || !cls) return;
//   var classes = cls.split(' ');
//   var curClass = ' ' + el.className + ' ';

//   for (var i = 0, j = classes.length; i < j; i++) {
//     var clsName = classes[i];
//     if (!clsName) continue;

//     if (el.classList) {
//       el.classList.remove(clsName);
//     } else if (hasClass(el, clsName)) {
//       curClass = curClass.replace(' ' + clsName + ' ', ' ');
//     }
//   }
//   if (!el.classList) {
//     el.className = trim(curClass);
//   }
// }

//判断是否存在该类名