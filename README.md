# hiTemplate
是一个基于hi-element来开发可视化组件的简单模版

packages中的文件夹名就是打包生成的文件名

其中`shared`文件中的`store.js`文件必不可少，是可视化系统内容组件状态的入口
命令`npm run dev` 本地启动调试
命令 `npm run build `生成的文件在dist目录下，此目录下的文件都是用于接入可视化系统需要的


会打包生成接入可视化工具的组件的必须的三个文件：
state.json  ---组件的初始化数据，需要自己进行修改
view.js     --组件预览
edit.js     ---更改组件外观的配置项
