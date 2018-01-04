import * as avalon from 'avalon2';

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