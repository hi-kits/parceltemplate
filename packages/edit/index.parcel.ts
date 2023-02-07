import actions from '@shared/store';
import singleSpaHtml from 'single-spa-html';

// 可视化系统中是通过singleSpa渲染组件的
const htmlLifecycles = singleSpaHtml({
  template: props => {
    actions.setActions({
      setGlobalState: props.setGlobalState,
      onGlobalStateChange: props.onGlobalStateChange,
      offGlobalStateChange: props.offGlobalStateChange
    });
    return `<h-edit viewid=${props.id}></h-edit>`;
  }
})
const bootstrap = htmlLifecycles.bootstrap;
const mount = htmlLifecycles.mount;
const unmount = htmlLifecycles.unmount;

export const parcelLifecycles = {
  bootstrap,
  mount,
  unmount
}
