/**
 * 十六进制color颜色/RGBA/RGB，改变透明度 
 * @function getOpacityColor
 * @param {*} color #555 rgba(85,85,85,0.6) rgb(85,85,85) 
 * @param {*} opacity 0.7 
 * @returns rgba(85,85,85,0.7) 
 */
export function getOpacityColor(color: string, opacity: number) {
    let _Color = color.toLowerCase();
    // 十六进制颜色值的正则表达式
    let _RegExp = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (_Color && _RegExp.test(_Color)) {
        if (_Color.length === 4) {
            let ColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                ColorNew += _Color.slice(i, i + 1).concat(_Color.slice(i, i + 1));
            }
            _Color = ColorNew;
        }
        // 处理六位的颜色值
        let ColorChange: any = [];
        for (let i = 1; i < 7; i += 2) {
            ColorChange.push(parseInt("0x" + _Color.slice(i, i + 2)));
        }
        return "rgba(" + ColorChange.join(",") + "," + opacity + ")";
    }
    return _Color;
}
