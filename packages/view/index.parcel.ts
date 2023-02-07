/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2023-02-06 17:11:39
 * @LastEditors: liulina
 * @LastEditTime: 2023-02-07 17:12:49
 */
import actions from '@shared/store';
import singleSpaHtml from 'single-spa-html';

const htmlLifecycles = singleSpaHtml({
  domElementGetter: props => document.getElementById(props.id),
  template: props => {
    actions.setActions({
      setGlobalState: props.setGlobalState,
      onGlobalStateChange: props.onGlobalStateChange,
      offGlobalStateChange: props.offGlobalStateChange
    });
    return `<h-view gutter="4" viewid=${props.id}></h-view>`
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