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


export const storMap = new Map();
export const actions = () => {
    const action = new Actions();
    return action;
};
