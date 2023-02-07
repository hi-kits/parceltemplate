/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2023-02-06 17:11:39
 * @LastEditors: liulina
 * @LastEditTime: 2023-02-07 15:17:56
 */
/**
 * @const: DrawlotteryStyles
 * @version 0.0.1
 * @author by fico on 2022/06/20
 * @Copyright © 2022 hi-kits. All rights reserved.
 * @description
 */

// 核心库
import { css } from 'hi-element';

export const DrawlotteryStyles = css`
.LotteryWrap {
    font-size: 12px;
    line-height: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--gutter,0);
    height:100%;
}`;
