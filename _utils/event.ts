/**
 * EventUtil - event helper functions
 * 
 * EventUtil.addHandler( element, 'click', function )
 * EventUtil.removeHandler( element, 'click', function )
 */
export const  EventUtil = {
    /**
     * 添加事件处理
     * @param element 元素
     * @param type 事件类型 例如： click、 change
     * @param handler 事件执行的函数
     */
    addHandler(element: any, type: string, handler: null | ((ev) => void), options?: {
      // 表示事件会在该类型的事件捕获阶段传播到该 EventTarget 时触发
      capture?: boolean;
      // 表示事件在添加之后最多只调用一次。如果是 true， 事件会在其被调用之后自动移除
      once?: boolean;
      // 设置为 true 时，表示事件永远不会调用 preventDefault()。如果事件仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告
      passive?: boolean;
    }): void {
        element!.addEventListener ? element!.addEventListener(type, handler, false) :
            element!.attachEvent ? element!.attachEvent('on' + type, handler) :
                element!['on' + type] = handler;
    },
    /**
     * 销毁事件处理
     * @param element 元素
     * @param type 事件类型 例如： click、 change
     * @param handler 事件执行的函数
     */
    removeHandler(element: any, type: string, handler: null | ((ev) => void), options?: {
      // 一个 Boolean 表示这个类型的事件将会被派遣到已经注册的侦听器，然后再派遣到 DOM 树中它下面的任何 EventTarget
      capture?: boolean;
      // 设置为 true 时，表示事件永远不会调用 preventDefault()。如果事件仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告
      passive?: boolean;
    }): void {
        element!.removeEventListener ? element!.removeEventListener(type, handler, false) :
            element!.detachEvent ? element!.detachEvent('on' + type, handler) :
                element!['on' + type] = null;
    },
    
    /**
     * 添加一次性事件
     * @date 8/25/2022 - 1:28:32 PM
     *
     * @param {*} element
     * @param {(ev) => void} handler
     */
    onceHandler(element: any, type: string, handler: null | ((ev) => void)): void {
      // const handleEventOnce = (data) => {
      //   handler(data);
      //   this.removeHandler(element, type, handleEventOnce);
      // };
      this.addHandler(element, type, handler, {once: true});
    },
    
    /**
     * 触发指定事件
     * @date 8/25/2022 - 2:07:50 PM
     *
     * @param {*} element
     * @param {string} type
     * @param {(ev) => void} handler
     */
    trigger(element: any, type: string, detail: any): void {
      element.dispatchEvent(new CustomEvent(type, { 
        // 当事件初始化时传递的数据
        detail,
        // 表明该事件是否会冒泡
        bubbles: true,
        // 表明该事件是否可以被取消
        cancelable: true 
      }));
    },

    emitEvent(vm, eventName, ...args) {
      let emitEventName: string;
      let emitEventMethodName: string;
      if (typeof eventName === 'string') {
        emitEventName = eventName;
        emitEventMethodName = 'on' + this.capitalize(eventName);
      } else {
        emitEventName = eventName.event;
        emitEventMethodName = eventName.method;
      }
      if (vm.$listeners[`${emitEventName}`]) {
        vm.$emit(emitEventName, ...args);
      }
      if (typeof vm.$props[emitEventMethodName] === 'function') {
        vm.$props[emitEventMethodName](...args);
      }
    },
    capitalize:(str) => str.charAt(0).toUpperCase() + str.slice(1)

}