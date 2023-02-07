/**
 * @class: HiDrawlottery
 * @version 0.0.1
 * @author by fico on 2022/06/20
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */
// 核心库
import { HIElement, customElement, attr, html, when, ref, repeat, ExecutionContext, observable } from 'hi-element';
// 样式文件
import { DrawlotteryStyles as styles } from "./view.style";
import { evalEventHandleUtil } from '@utils/evalEventHandle';
import { Background } from '@utils/style/background';


import actions from '@shared/store';
// 模版文件
const template = html<HiView>`
<section class="LotteryWrap" ${ref("LotteryWrap")}>
    ${repeat(
        x => x.prizeList,
        html`
            ${when(
                (x,c) => c.index === 4,
                html`<div class="PrizeItem Start" @click="${(x, c: ExecutionContext) => c.parent.startClick(c.parentContext.event as MouseEvent, c.index)}">
                    <div class="ItemWrap" >
                        <span >
                        ${(x, c) => c.parent.lotteryTextObj.text}
                        </span>
                          </div>
                    </div>
                `)}
            <div class="PrizeItem lottery lottery-${ x => x.index}" style="${(x, c) => (Background(x.background, true)) + '; '}">
                <div class="ItemWrap"></div>
            </div>`, 
        { positioning: true }
    )}
</section>
`;

// 定义元素
@customElement({
   name: 'h-view',
   template,
   styles,
   shadowOptions: { mode: 'closed'}
})
export class HiView extends HIElement {
    // ------------------ 构造函数 ------------------
    constructor() {
        super();
    }
    // ------------------ 参数 ------------------

    // 初始化奖品项配置
    prizeIndexObject: Array<any> = [
      {background: '#dee'},
      {background: '#dee'},
      {background: '#dee'},
      {background: '#dee'},
      {background: '#dee'},
      {background: '#dee'},
      {background: '#dee'},
      {background: '#dee'}];
  /**
     * 奖品排序
     * @date 9/8/2022 - 1:10:32 PM
     * @type {Array<number>}
     */
   order: Array<number> = [0, 1, 2, 7, 3, 6, 5, 4];
    /**
     * 抽奖对象
     * @date 9/8/2022 - 1:09:53 PM
     * @type {HTMLElement}
     */
    @observable
    LotteryWrap: HTMLElement;

    /**
     * 奖品列表
     * @date 9/8/2022 - 1:10:14 PM
     * @type {Array<any>}
     */
    @observable
    prizeList: Array<any> = [];

    // 渲染到DOM的抽奖按钮对象
    @observable
    lotteryTextObj = {text: '立即开奖',dec: ''}
    

    /**
     * 父级传入的奖品列表
     * @type {Array<any>}
     */
    @observable
    prizeOptionList = '';
    prizeOptionListChanged(old, newValue){
      this.prizeList = [];
      if (newValue) {
        const newPrizeList = evalEventHandleUtil.hEval(newValue)
        this.order.forEach(element => {
          this.prizeList.push(newPrizeList[element]);
        });
      } else {
        this.prizeList = this.prizeIndexObject;
      }
    }

    // 父组件传入的抽奖按钮信息
    @attr lotteryInfo = '';
  
    
    /**
     * 开始抽奖
     * @date 9/8/2022 - 1:22:29 PM
     * @type {boolean} -会自动将属性传入的值转换成boolean类型
     */
    @attr({ mode: "boolean" }) start: boolean;
    
    // 这个是通过singleSpa传入的组件ID，用于关联视图和编辑组件
    @attr viewid: string;
    // ------------------ 自定义函数 ------------------
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用
     * @internal
     */
    connectedCallback(): void{
      super.connectedCallback();
      // 这是需要的，可视化框架传入的初始化数据
      actions.onGlobalStateChange((state) => {
        // 监听全局状态
        if (state.type === 'viewChange' && state.viewid === this.viewid) {
          this.lotteryTextObj = state.data
        }
        if (state.type === 'viewInit' && state.viewid === this.viewid) {
          this.update(state.data)
        }
      }, 'view', true)
    }
    // 用于更新组件数据
    update(data){
      if (data.attr.btnName) {
        this.lotteryTextObj = { text: data.attr.btnName, dec: data.attr.dec};
      }
    }
     // 用来实时更新单个属性，可以用update代替
    setValueFn(name, val){
    this[name + 'Changed']('', val);
    }
    
    /**
     * 点击抽奖时触发
     * @date 9/8/2022 - 11:31:11 AM
     */
    startClick(): void {
      this.$emit('change', {
        type: 1
      })
    }
}

