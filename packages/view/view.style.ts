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
}
.PrizeItem {
    position: relative;
    background: var(--background);
    border-radius: var(--radius);
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-size: cover!important;
    z-index:2;
}
.PrizeItem .ItemWrap{
    display: flex;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.Start p{
    font-size: 11px;
    white-space: nowrap;
    margin: 10% 0px 0px;
    height: 2%;
}
.Start span{ height: 10%;}
.Start .ItemWrap{justify-content: center;text-align: center;}
.Start{
    cursor: pointer;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
}
.GiftPic {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 60%;
    height: 60%;
    text-align: center;
}
.GiftPic img {
    width: 100%;
    height: 100%;
}
.ItemWrap span{
    width: 90%;
    text-align: center;
}
.PrizeItem.active:after{
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
    box-shadow:inset 0 0 10px 3px #fa0000, rgb(250 0 0) 0px 0px 10px 3px;
    opacity: 0.3;
    z-index: 1;
}`;
