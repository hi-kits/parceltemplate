/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-07-22 10:17:57
 * @LastEditors: liulina
 * @LastEditTime: 2023-02-07 10:57:39
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './examples/src/main.ts',
  output: {
    path: path.resolve(process.cwd(), '../dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules'],
    alias: {
      '@utils': path.resolve(__dirname, '_utils/'),
      '@shared': path.resolve(__dirname, 'shared/'),
      '@assist': path.resolve(__dirname, 'assist/')
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: {
          loader: 'ts-loader',
          options: { configFile: 'tsconfig.json' },
        }
      },
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          import: true,
        }
      },
    ]
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      filename: './index.html',
      favicon: './examples/logo.svg',
      scriptLoading: 'module',
    })
  ],
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    compress: true,
    port: 9000,
  },
};

