
// 驼峰转换成链接符-
export const camelCaseToHyphen = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
// 中华线转换成驼峰
export const transformCamelStr = (str) => {
	var re = /-(\w)/g;
	return str.replace(re, function ($0, $1) {
		return $1.toUpperCase();
	});
}