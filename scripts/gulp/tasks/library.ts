/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2023-02-06 17:25:30
 * @LastEditors: liulina
 * @LastEditTime: 2023-02-07 15:44:43
 */
import { dest, series, src, task } from 'gulp';

import { join } from 'path';
// const del = require('del');

const buildConfig =  require('../../../build-config');
import { execNodeTask, cleanTask } from '../util/task-helpers';

const parcelFile = join(buildConfig.projectDir, 'rollup.parcel.config.ts');

// ---------1.首先将资源复制到dev文件夹  util sahred 组件文件包 tsconfig------------
task('copy:appdata', () => {
  return src([join(buildConfig.projectDir + '/appData/state.json')]).pipe(
    dest(join(buildConfig.libDir + '/'))
  );
});
// ---------------------2.tsc -p 生成.d.ts文件------------------------------

// ------------------------3.rollup 打包------------------------------------

task('rollup:parcel', execNodeTask('rollup', 'rollup', ['-c', parcelFile]));


// ------------------------6. 清理------------------------
task('clean:lib', cleanTask([join(buildConfig.libDir)]));


task(
  'build:parcel',
  series(
    'clean:lib',
    'rollup:parcel',
    'copy:appdata'
  )
);
