/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2023-02-07 11:05:07
 * @LastEditors: liulina
 * @LastEditTime: 2023-02-07 17:16:20
 */
function emptyAction() {  //设置一个actions实例
    // 提示当前使用的是空 Action
    console.warn("Current execute action is empty!");
}

class Actions {
    // 默认值为空 Action
    actions = {
        onGlobalStateChange: emptyAction,
        setGlobalState: emptyAction,
		offGlobalStateChange: emptyAction
    };

    /**
     * 设置 actions
     */
    setActions(actions) {
        this.actions = actions;
    }

    /**
     * 映射
     */
    onGlobalStateChange(...args) {
		//tslint: disable
        return this.actions.onGlobalStateChange(...args);
    }

    /**
     * 映射
     */
    setGlobalState(...args) {
        return this.actions.setGlobalState(...args);
    }
    /**
     * 映射
     */
	 offGlobalStateChange(...args) {
        return this.actions.offGlobalStateChange(...args);
    }
}

const actions = new Actions();
export default actions;