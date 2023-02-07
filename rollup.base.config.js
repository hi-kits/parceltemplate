/*
 * @Descripttion:
 * @version:
 * @Author: liulina
 * @Date: 2022-06-17 10:11:57
 * @LastEditors: liulina
 * @LastEditTime: 2023-02-07 14:18:31
 */
import commonJS from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import { transformCSSFragment, transformHTMLFragment } from './build/transform-fragments';
import image from 'rollup-plugin-img';
import cleanup from 'rollup-plugin-cleanup';
const path = require("path");

const extensions = ['.js', '.ts'];

const parserOptions = {
  sourceType: 'module'
};

const projectRootDir = path.resolve(__dirname, '');

export const kitCommonPluginList = [
  alias({
    entries: [
      { find: '@utils', replacement: path.resolve(projectRootDir, '_utils/') },
      { find: '@shared', replacement: path.resolve(projectRootDir, 'shared/') },
      { find: '@assist', replacement: path.resolve(projectRootDir, 'assist/')  }]
  }),
  resolve(),
  commonJS(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
        // "baseUrl": ".",
        // //模块名到基于baseUrl的路径映射的列表
        // "paths": {
        //   "@utils": [ "res/modlue/_utils" ],
        //   "@utils/*": [ "res/modlue/_utils/*" ],
        // }
      }
    }
  }),
  cleanup({extensions: ['ts','js', 'jsx', 'mjs'], comments: 'none', compactComments: false,}),
  terser(),
  image({
    limit: 10000,
    output: `images`, // default the root
    extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
    limit: 8192000, // default 8192(8k)
    exclude: 'node_modules/**'
  }),
  babel({
    exclude: 'node_modules/**', // 只编译源代码
    extensions,
    babelHelpers: 'runtime',
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-transform-runtime'
    ]
  }),
  transformTaggedTemplate({
    tagsToProcess: ['css'],
    transformer: transformCSSFragment,
    parserOptions
  }),
  transformTaggedTemplate({
    tagsToProcess: ['html'],
    transformer: transformHTMLFragment,
    parserOptions
  }),
  filesize({
    showMinifiedSize: false,
    showBrotliSize: true
  })
];
