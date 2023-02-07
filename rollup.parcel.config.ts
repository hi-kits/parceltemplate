/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-23 09:21:30
 * @LastEditors: liulina
 * @LastEditTime: 2023-02-07 15:43:22
 */
import { getPackagesInfoList } from './build/getPackageName.js';

import { kitCommonPluginList } from './rollup.base.config';

// const timeStart = new Date().getTime();
const kitsList = getPackagesInfoList('parcel','packages/', '_', function (filePath) {});
const packageListObj = Object.keys(kitsList).map(item => {
  return {
    input: kitsList[item],
    output: [{
      file: 'dist/' + item + '.js',
      format: 'umd',
      name: item,
      inlineDynamicImports:true
    }],
    external: ['hi-element'],
    plugins: [...kitCommonPluginList]
  }
});

module.exports = [
// 每个组件单独打包
...packageListObj,
];
