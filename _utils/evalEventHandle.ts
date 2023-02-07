/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-09-13 10:23:01
 * @LastEditors: liulina
 * @LastEditTime: 2022-10-11 16:13:59
 */

export const  evalEventHandleUtil = {
    fnExpRE : /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/,
    fnInvokeRE : /\([^)]*?\),*$/,
    simplePathRE : /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,
    eval2 : eval,
    genHandler(handlerValue, otherparam): string {
      if (!handlerValue) {
        return 'function(){}';
      }
      
      
      // 调用方法为doThis 
      const isMethodPath = this.simplePathRE.test(handlerValue);
      // 调用方法为() => {} or function (){} 行
      const isFunctionExpression = this.fnExpRE.test(handlerValue);
      // 调用方法为doThis（$event）型
      const isFunctionInvocation = this.simplePathRE.test(handlerValue.replace(this.fnInvokeRE, ''));
      
      // 没有修饰符
      if (isMethodPath) {
        return `${handlerValue}(${otherparam})`;
      }
      if (isFunctionExpression) {
        return`(${handlerValue})('${otherparam}')`;
      }
      if (isFunctionInvocation) {
        return `function Invocation ($event){${isFunctionInvocation ? `return ${handlerValue}` : handlerValue}}`; // inline statement
      }
      return handlerValue;
    },
    evalFnStr(handleStr, $event){
      if (handleStr.indexOf('Invocation') > -1) {
        const a = this.eval2("(false || "+handleStr+")");
        a($event)
      } else {
        new Function(handleStr)();
      }
    },
    hEval(val){
      if (typeof val === 'object') {
        return val;
      } else if (typeof val === 'string') {
        return this.eval2("(" + val + ")");
      } else {
        return this.eval2( val);
      }
    }

}

