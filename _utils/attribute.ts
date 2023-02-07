/**
 * 设置属性
 * @param selector 需要处理的元素
 * @example
 * SetAttr(elem)('size', '40')
 * SetAttr(elem)({'size': '40', 'show': true})
 * @returns 
 */
export function SetAttr(selector: any): (attrs: any, value?: string) => void{
    if (!selector) { return () => {} };
    return function(attrs: any, value?: string) {
        if(arguments.length === 1 && typeof attrs === 'string'){
            //获取attr
            selector.setAttribute(attrs, '');
        } else {
            //设定attrs
                if (arguments.length === 2) {
                    //String
                    selector.setAttribute(attrs, value);
                } else {
                    //Object
                    for(var attrName in attrs){
                        selector[attrName] = attrs[attrName];
                        selector.setAttribute(attrName, attrs[attrName]);
                    }
                }
        }
    }
}
/**
 * 删除属性
 * @param selector 需要处理的元素
 * @example
 * RemoveAttr(elem)('size')
 * RemoveAttr(elem)(['size', 'show'])
 * @returns 
 */
export function RemoveAttr(selector: any): (attrs: any) => void{
    if (!selector) { return () => {} };
    return (attrs: any) => {
        if(typeof attrs === 'string'){
            selector.removeAttribute(attrs);
        } else {
            for (let index = 0; index < attrs.length; index++) {
                const element = attrs[index];
                selector.removeAttribute(element);
            }
        }
    }
}
/**
 * 查询属性
 * @param selector 需要处理的元素
 * @example
 * RemoveAttr(elem)('size')
 * RemoveAttr(elem)(['size', 'show'])
 * @returns 
 * {
 *  key: value
 * }
 */

/**
 * 查询属性
 * @date 8/4/2022 - 10:27:33 AM
 * @example
 * GetAttr(elem)('size')
 * @export
 * @param {*} selector 需要处理的元素
 * @returns {(attrs: any) => {[x: string]: any;}}
 */
export function GetAttr(selector: any): (attrs: any) => {[x: string]: any;}{
    return (attrs: any) => {
        if (!selector) { return {} };
        const _Attr = {};
        
        if(typeof attrs === 'string'){
            _Attr[attrs] = selector.getAttribute(attrs);
        } else {
            for (let index = 0; index < attrs.length; index++) {
                const element = attrs[index];
                _Attr[attrs] = selector.getAttribute(element);
            }
        }
        return _Attr;
    }
}
