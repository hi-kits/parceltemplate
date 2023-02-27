import singleSpaHtml from 'hi-single-spa-html';
import { actions, storMap } from '@shared/store';


export const getParcelLifecycles = (getDomStr: (prop: any) => string) => {
	// 可视化系统中是通过singleSpa渲染组件的
const htmlLifecycles = singleSpaHtml({
	template: props => {
	  const action = actions();
	  action.setActions({
		setGlobalState: props.setGlobalState,
		onGlobalStateChange: props.onGlobalStateChange,
		offGlobalStateChange: props.offGlobalStateChange
	  });
	  storMap.set(props.id, action);
	  return getDomStr(props);  
	}
  })
  const bootstrap = htmlLifecycles.bootstrap;
  const mount = htmlLifecycles.mount;
  const unmount = htmlLifecycles.unmount;
  return {
	bootstrap,
	mount,
	unmount
  };
}

