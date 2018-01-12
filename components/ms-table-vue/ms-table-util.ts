import * as avalon from 'avalon2';
import * as $ from 'jquery';

export function getChildValue(vmodel, render = vmodel.$render): any[] {
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

export function getChildValue_double(vmodel, render = vmodel.$render): any[] {
    if (render.directives === undefined) {
        return [];
    }
    let one = [],
        two = [],
        three = [],
        renderColumn = [];
    return render.directives.reduce((acc, action) => {
        if (action.is === 'ms-table-column') {
            one.push({
                is: action.is,
                props: avalon.mix(true,action.value, {'inlineTemplate':action.fragment}),
                inlineTemplate: action.fragment
            });
            if(action.node.children.length > 0){
                action.node.children.forEach(function(element){
                    if(element.nodeName == 'ms-table-column'){
                        let oneJect = getChildNode(element.props[':widget']);
                        two.push({
                            props: oneJect
                        });
                        element.children.forEach(function(el){
                            if(el.nodeName == 'ms-table-column'){
                                let twoJect = getChildNode(el.props[':widget']);
                                three.push({
                                    props: twoJect
                                });
                                renderColumn.push({
                                    is: el.nodeName,
                                    props:  twoJect,
                                    //inlineTemplate: action.fragment
                                });
                            }else{
                                renderColumn.push({
                                    is: element.nodeName,
                                    props:  oneJect,
                                    //inlineTemplate: action.fragment
                                });
                            }
                        });
                    }else{
                        renderColumn.push({
                            is: action.is,
                            props: avalon.mix(true,action.value, {'inlineTemplate':action.fragment}),
                            inlineTemplate: action.fragment
                        });
                    }
                });
            }else{
                renderColumn.push({
                    is: action.is,
                    props: avalon.mix(true,action.value, {'inlineTemplate':action.fragment}),
                    inlineTemplate: action.fragment
                });
            }
        }
        acc = [renderColumn,one,two,three];
        return acc;
    }, []);
}

function getChildNode(str){
    let regex = /([^{}](?=.*})(?!.*{))+/;
    let  obj = {};
    let strKey = regex.exec(str)[0].split(',');
    //console.log();
    strKey.forEach(function(val){
        let key = val.split(':')[0];
        let title = val.split(':')[1];
        obj[key] = title;
    });
    return obj;
}

function getObject(){

}

/**
 * 获取 td 元素，即单元格
 * @param event 触发的事件
 * @returns {*} td 元素 或者 null
 */
export const getCell = function(event) {
    let cell = event.target;
  
    while (cell && cell.tagName.toUpperCase() !== 'HTML') {
      if (cell.tagName.toUpperCase() === 'TD') {
        return cell;
      }
      cell = cell.parentNode;
    }
  
    return null;
  };

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