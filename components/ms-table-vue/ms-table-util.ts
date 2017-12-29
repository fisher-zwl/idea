import * as avalon from 'avalon2';

export function getChildValue(vmodel, render = vmodel.$render): any[] {
    if (render.directives === undefined) {
        return [];
    }
    return render.directives.reduce((acc, action) => {
        if (action.is === 'ms-table-column') {
            acc.push({
                is: action.is,
                props: action.value,
                inlineTemplate: action.fragment,
                children: getChildValue(vmodel, action.innerRender || { directives: [] })
            });
        }
        return acc;
    }, []);
}