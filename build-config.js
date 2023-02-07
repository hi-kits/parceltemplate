/*
 * @Descripttion: 
 * @version: 
 * @Author: liulina
 * @Date: 2022-07-20 18:28:23
 * @LastEditors: liulina
 * @LastEditTime: 2023-02-07 15:42:35
 */
const { join } = require('path');

const packageJson = require(`${__dirname}/package.json`);
const buildVersion = packageJson.version;

module.exports = {
  projectVersion: buildVersion,
  projectDir: __dirname,
  componentsDir: join(__dirname, 'src/packages'),
  scriptsDir: join(__dirname, 'scripts'),
  publishDir: join(__dirname, 'publish'),
  libDir: join(__dirname, 'dist'),
};
