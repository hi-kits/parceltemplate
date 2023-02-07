import '../../packages/index';

// 用于测试试图view变化效果
// 通知视图组件修改
window['viewChanged'] = (data) => {
	const hView = document.getElementById('hView');
	hView && hView['update'](data)
}
// 监听编辑项组件的变化
window['editChanged'] = (event) => {
	console.log(event.detail);
	window['viewChanged'](event.detail)
}