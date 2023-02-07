/**
 * 应用CSS background 属性
 * @param background - CSS background 属性值
 * @public
 */

export function isColor(color) {
    const hex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
    const rgb = /^(rgb|RGB)\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const rgba = /^(rgba|RGBA)\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0?\.?\d+\s*\)$/;
    const hsl = /^(hsl|HSL)\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
    const hsla = /^(hsla|HSLA)\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*0?\.?\d+\s*\)$/;
    return hex.test(color) || rgb.test(color) || rgba.test(color) || hsl.test(color) || hsla.test(color);
}
export function isImage(str) {
    var reg = /.(png|jpg|gif|jpeg|webp|bmp)$/;
    return reg.test(str);
}
export function Background(value: string, isString?): string | { 'background-color': string; } | { 'background-image': string; } {
    if (isImage(value)) {
        return !isString ?  {'background-image': `url(${value})`} : `background-image: url(${value})`;
    } else {
        return !isString ? {'background-color': value} : `background-color: ${value}`;
    }
}

