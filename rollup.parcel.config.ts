
import { getPackagesInfoList } from './build/getPackageName.js';

import { kitCommonPluginList } from './rollup.base.config';
import externals from 'rollup-plugin-node-externals';

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
    plugins: [...kitCommonPluginList,  externals({deps: true})]
  }
});

module.exports = [
// 每个组件单独打包
...packageListObj,
];
