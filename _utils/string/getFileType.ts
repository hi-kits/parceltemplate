/**
 * 获取后缀名
 * @function getSuffix
 * @version 0.0.1
 * @author by fico on 2022/12/12
 * @Copyright © 2022 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
export function getSuffix(filename) {
    return /\.[^\.]+$/.exec(filename);
}