/**
 * @class: HiDrawlottery
 * @version 0.0.1
 * @author by fico on 2022/06/20
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, html } from 'hi-element';

// 样式文件
import { DrawlotteryStyles as styles } from "./edit.style";
import actions from '@shared/store';


// import { HiDefaultPic } from '@currency/defaultPic';
// 模版文件
const template = html<HiEdit>`
  <p><span>样式</span> 九宫格 </p>
  <p>抽奖按钮名称：<input  value="${x => x.value}" @change="${(x, c) => x.valueChange(c.event)}"/></p>`;

// 定义元素
@customElement({
   name: 'h-edit',
   template,
   styles,
   shadowOptions: { mode: 'closed'}
})
export class HiEdit extends HIElement {
 
  @attr value: string;
    // ------------------ 构造函数 ------------------
    constructor() {
        super();
    }
    // ------------------ 参数 ------------------
  
  // 可视化中的模型数据
  public modalData;
  @attr viewid:string
  valueChange(event) {
    console.log(event.target.value);
    if (!this.modalData) {
      this.modalData = {};
    }
    this.modalData['btnName'] = event.target.value;
    // 用于在可视化框架中的组件交互，通知视图做出改变
    actions.setGlobalState({
      type: 'viewChange',
      viewid: this.viewid,
      data: {
        text: event.target.value,
        dec: '',
      },
      attrData: this.modalData
    })
    // 用于本地测试，实际在examples中的交互，如果需要的话，放开下面的代码
    // this.$emit('change', {attr: this.modalData})
  }
  connectedCallback(): void {
    super.connectedCallback();
    // 将可视化系统中的数据拿过来初始化组件数据
    actions.onGlobalStateChange(state => {
      if (state.type === 'editInit' && state.viewid === this.viewid) {
        this.update(state.data)
        this.modalData = state.data;
      }
    }, 'edit', true)
  }
  // 用于更新组件数据
  update(data){
    if (data.btnName) {
      this.value = data.btnName;
    }
  }
}



