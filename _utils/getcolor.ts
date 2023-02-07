/**
 * 渐变色解析器
 * @function Place
 * @version 0.0.1
 * @author by fico on 2022/11/16
 * @Copyright © 2022 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
export class Gradient {
    
    /**
     * 线性渐变色
     * @date 11/16/2022 - 5:13:32 PM
     *
     * @param {string} value
     */
    linear(value: string): void{
        /**
         * 实用程序组合多个正则表达式
         * @param {RegExp[]|string[]} regexpList 正则表达式或字符串的列表
         * @param {string} flags 正常RegExp标志
         */
        const combineRegExp = (regexpList, flags) => {
            let i,
                source = '';
            for (i = 0; i < regexpList.length; i++) {
                if (typeof regexpList[i] === 'string') {
                    source += regexpList[i];
                } else {
                    source += regexpList[i].source;
                }
            }
            return new RegExp(source, flags);
        };
        /**
         * 生成一次所需的正则表达式
         * 用这种方式管理正则表达式更容易，并且可以很好地描述
         * @result {object} 包含正则表达式的对象
         */
        const generateRegExp = () => {
            // 请注意，名称中带有"Capture"的变量包括捕获括号集
            let searchFlags = 'gi', // ignore case for angles, "rgb" etc
                rAngle = /(?:[+-]?\d*\.?\d+)(?:deg|grad|rad|turn)/, // Angle +ive, -ive and angle types
                rSideCornerCapture = /to\s+((?:(?:left|right)(?:\s+(?:top|bottom))?))/, // optional 2nd part
                circle =  /circle/,
                rComma = /\s*,\s*/, // Allow space around comma.
                rColorHex = /\#(?:[a-f0-9]{6}|[a-f0-9]{3})/, // 3 or 6 character form
                rDigits3 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*\)/,// "(1, 2, 3)"
                rDigits4 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*,\s*\d*\.?\d+\)/,// "(1, 2, 3, 4)"
                rValue = /(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?/,// ".9", "-5px", "100%".
                rKeyword = /[_a-z-][_a-z0-9-]*/,// "red", "transparent", "border-collapse".
                rColor = combineRegExp([
                    '(?:', rColorHex, '|', '(?:rgb|hsl)', rDigits3, '|', '(?:rgba|hsla)', rDigits4, '|', rKeyword, ')'
                ], ''),
                rColorStop = combineRegExp([rColor, '(?:\\s+', rValue, '(?:\\s+', rValue, ')?)?'], ''),// Single Color Stop, optional %, optional length.
                rColorStopList = combineRegExp(['(?:', rColorStop, rComma, ')*', rColorStop], ''),// List of color stops min 1.
                rLineCapture = combineRegExp(['(?:(', rAngle, ')|', rSideCornerCapture, ')',circle], ''),// Angle or SideCorner
                rGradientSearch = combineRegExp([
                    '(?:(', rLineCapture, ')', rComma, ')?(', rColorStopList, ')'
                ], searchFlags),// Capture 1:"line", 2:"angle" (optional), 3:"side corner" (optional) and 4:"stop list".
                rColorStopSearch = combineRegExp([
                    '\\s*(', rColor, ')', '(?:\\s+', '(', rValue, '))?', '(?:', rComma, '\\s*)?'
                ], searchFlags);// Capture 1:"color" and 2:"position" (optional).

            return {
                gradientSearch: rGradientSearch,
                colorStopSearch: rColorStopSearch
            };
        };
        /**
         * 实际上，将输入梯度参数字符串解析为可重用的对象
         * @note 实际上，这只支持标准语法，而不支持历史版本，有关详细信息，请参阅MDN
         *       https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient
         * @param regExpLib
         * @param {string} input 表单中的输入字符串 "to right bottom, #FF0 0%, red 20px, rgb(0, 0, 255) 100%"
         * @returns {object|undefined} 对象，包含输入字符串的分解，包括停止点数组
         */
        const parseGradient = (regExpLib, input) => {
            var result,
                matchGradient,
                matchColorStop,
                stopResult;

            // 重置搜索位置，因为我们重用正则表达式
            regExpLib.gradientSearch.lastIndex = 0;

            matchGradient = regExpLib.gradientSearch.exec(input);
            if (matchGradient !== null) {
                result = {
                    original: matchGradient[0],
                    colorStopList: []
                };

                // 线（角度或边角）
                if (!!matchGradient[1]) {
                    result.line = matchGradient[1];
                }
                // 如果是边角，则为角度或未定义
                if (!!matchGradient[2]) {
                    result.angle = matchGradient[2];
                }
                // 侧角或未定义（如果角度）
                if (!!matchGradient[3]) {
                    result.sideCorner = matchGradient[3];
                }


                // 重置搜索位置，因为我们重用正则表达式
                regExpLib.colorStopSearch.lastIndex = 0;

                // 循环通过所有颜色停止
                matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[4]);
                while (matchColorStop !== null) {

                    stopResult = {
                        color: matchColorStop[1]
                    };

                    // 位置（可选）
                    if (!!matchColorStop[2]) {
                        stopResult.position = matchColorStop[2];
                    }
                    result.colorStopList.push(stopResult);

                    // 从上一个位置继续搜索
                    matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[4]);
                }
            }

            // 如果未找到匹配项，则可以未定义
            return result;
        };
        const rGradientEnclosedInBrackets = /.*gradient\s*\(((?:\([^\)]*\)|[^\)\(]*)*)\)/;// Captures inside brackets - max one additional inner set.
        const match: any = rGradientEnclosedInBrackets.exec(value);
        return parseGradient(generateRegExp(), match[1]);
    }
    parse(value: string): void {
        let input;
        let tokens = {
            linearGradient: /^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,
            repeatingLinearGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,
            radialGradient: /^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,
            repeatingRadialGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,
            sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|left|right|top|bottom)/i,
            extentKeywords: /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,
            positionKeywords: /^(left|center|right|top|bottom)/i,
            pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
            percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,
            emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
            angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
            startCall: /^\(/,
            endCall: /^\)/,
            comma: /^,/,
            hexColor: /^\#([0-9a-fA-F]+)/,
            literalColor: /^([a-zA-Z]+)/,
            rgbColor: /^rgb/i,
            rgbaColor: /^rgba/i,
            number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/
        }
        const getAST = () => {
            var ast = matchListDefinitions();
            return ast;
        }

        function matchListDefinitions() {
            return this.matchListing(()=> {
                
            });
        }



        input = value.toString();
        return getAST();

    }
}
export class Gradients {
    constructor(code: string){
            this.input = code.toString();
            return this.matchListDefinitions();
    }
    /**
     * 输入值
     * @date 11/17/2022 - 9:45:58 AM
     * @type {*}
     */
    input;
    result;
    /**
     * 正则规则
     */
    tokens = {
        linearGradient: /^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,
        repeatingLinearGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,
        radialGradient: /^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,
        repeatingRadialGradient: /^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,
        sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|left|right|top|bottom)/i,
        extentKeywords: /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,
        positionKeywords: /^(left|center|right|top|bottom)/i,
        pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
        percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,
        emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
        angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
        startCall: /^\(/,
        endCall: /^\)/,
        comma: /^,/,
        hexColor: /^\#([0-9a-fA-F]+)/,
        literalColor: /^([a-zA-Z]+)/,
        rgbColor: /^rgb/i,
        rgbaColor: /^rgba/i,
        number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/
    }

    error(msg) {
        var err = new Error(this.input + ': ' + msg);
        err['source'] = this.input;
        throw err;
    }
    /**
     * 匹配列表定义
     * @returns 
     */
    matchListDefinitions() {
        return this.matchListing(() => {
            this.matchDefinition()
        });
    }
    matchListing(matcher) {
        let result:any = [];
    
        if (matcher()) {
          result.push(matcher());
          while (this.scan(this.tokens.comma)) {
            if (matcher()) {
              result.push(matcher());
            } else {
                this.error('One extra comma');
            }
          }
        }
    
        return result;
    }
    matchDefinition() {
        return this.matchGradient( 'linear-gradient', this.tokens.linearGradient, () => {
            this.matchLinearOrientation()
        }) ||
    
                this.matchGradient( 'repeating-linear-gradient', this.tokens.repeatingLinearGradient, () => {
                    this.matchLinearOrientation()
                }) ||
    
                this.matchGradient(
                'radial-gradient',
                this.tokens.radialGradient,
                () => {
                    this.matchListRadialOrientations()
                }) ||
    
                this.matchGradient(
                'repeating-radial-gradient',
                this.tokens.repeatingRadialGradient,
                () => {
                    this.matchListRadialOrientations()
                });
    }
    matchGradient(gradientType, pattern, orientationMatcher) {
        return this.matchCall(pattern, (captures) => {
    
          if (orientationMatcher) {
            if (!this.scan(this.tokens.comma)) {
                this.error('Missing comma before color stops');
            }
          }
    
          return {
            type: gradientType,
            orientation: orientationMatcher,
            colorStops: this.matchListing(()=>{
                this.matchColorStop()
            })
          };
        });
      }
      matchColorStop() {
        const color = this.matchColor();
    
        if (!color) {
            this.error('Expected color definition');
        }
    
        color.length = this.matchDistance();
        return color;
      }
    matchColor() {
        return this.matchHexColor() ||
        this.matchRGBAColor() ||
        this.matchRGBColor() ||
        this.matchLiteralColor();
      }
      matchHexColor() {
        return this.match('hex', this.tokens.hexColor, 1);
      }
      matchRGBAColor() {
        return this.matchCall(this.tokens.rgbaColor, () => {
          return  {
            type: 'rgba',
            value: this.matchListing(()=>{this.matchNumber()})
          };
        });
      }
      matchLiteralColor() {
        return this.match('literal', this.tokens.literalColor, 0);
      }
      matchNumber() {
        return this.scan(this.tokens.number)[1];
      }
      matchRGBColor() {
        return this.matchCall(this.tokens.rgbColor, ()=> {
          return  {
            type: 'rgb',
            value: this.matchListing(()=>{this.matchNumber()})
          };
        });
      }
    matchLinearOrientation() {
        return this.matchSideOrCorner() || this.matchAngle();
    }
    matchListRadialOrientations() {
        let radialOrientations,
            radialOrientation = this.matchRadialOrientation(),
            lookaheadCache;
    
        if (radialOrientation) {
          radialOrientations = [];
          radialOrientations.push(radialOrientation);
    
          lookaheadCache = this.input;
          if (this.scan(this.tokens.comma)) {
            radialOrientation = this.matchRadialOrientation();
            if (radialOrientation) {
              radialOrientations.push(radialOrientation);
            } else {
              this.input = lookaheadCache;
            }
          }
        }
    
        return radialOrientations;
      }
      matchSideOrCorner() {
        return this.match('directional', this.tokens.sideOrCorner, 1);
      }
      matchAngle() {
        return this.match('angular', this.tokens.angleValue, 1);
      }
      matchCall(pattern, callback) {
        let captures = this.scan(pattern);
    
        if (captures) {
          if (!this.scan(this.tokens.startCall)) {
            this.error('Missing (');
          }
    
          this.result = callback(captures);
    
          if (!this.scan(this.tokens.endCall)) {
            this.error('Missing )');
          }
    
          return this.result;
        }
      }
      matchRadialOrientation() {
        let radialType:any = this.matchCircle() || this.matchEllipse();
    
        if (radialType) {
          radialType['at'] = this.matchAtPosition();
        } else {
          const extent = this.matchExtentKeyword();
          if (extent) {
            radialType = extent;
            const positionAt = this.matchAtPosition();
            if (positionAt) {
              radialType['at'] = positionAt;
            }
          } else {
            const defaultPosition = this.matchPositioning();
            if (defaultPosition) {
              radialType = {
                type: 'default-radial',
                at: defaultPosition
              };
            }
          }
        }
    
        return radialType;
      }
      matchAtPosition() {
        if (this.match('position', /^at/, 0)) {
          let positioning = this.matchPositioning();
    
          if (!positioning) {
            this.error('Missing positioning value');
          }
    
          return positioning;
        }
      }
      matchPositioning() {
        let location = this.matchCoordinates();
    
        if (location.x || location.y) {
          return {
            type: 'position',
            value: location
          };
        }
      }
      matchCoordinates() {
        return {
          x: this.matchDistance(),
          y: this.matchDistance()
        };
      }
      matchDistance() {
        return this.match('%', this.tokens.percentageValue, 1) ||
        this.matchPositionKeyword() ||
        this.matchLength();
      }
      matchLength() {
        return this.match('px', this.tokens.pixelValue, 1) ||
        this.match('em', this.tokens.emValue, 1);
      }
      matchPositionKeyword() {
        return this.match('position-keyword', this.tokens.positionKeywords, 1);
      }
      matchExtentKeyword() {
        return this.match('extent-keyword', this.tokens.extentKeywords, 1);
      }
      scan(regexp) {
        let captures,
            blankCaptures;
    
        blankCaptures = /^[\n\r\t\s]+/.exec(this.input);
        if (blankCaptures) {
            this.consume(blankCaptures[0].length);
        }
    
        captures = regexp.exec(this.input);
        if (captures) {
            this.consume(captures[0].length);
        }
    
        return captures;
      }
      consume(size) {
        this.input = this.input.substr(size);
      }
      match(type, pattern, captureIndex) {
        let captures = this.scan(pattern);
        if (captures) {
          return {
            type: type,
            value: captures[captureIndex]
          };
        }
      }
      matchCircle() {
        let circle = this.match('shape', /^(circle)/i, 0);
    
        if (circle) {
          circle['style'] = this.matchLength() || this.matchExtentKeyword();
        }
    
        return circle;
      }
      matchEllipse() {
        var ellipse = this.match('shape', /^(ellipse)/i, 0);
    
        if (ellipse) {
          ellipse['style'] =  this.matchDistance() || this.matchExtentKeyword();
        }
    
        return ellipse;
      }
      
}



// Copyright (c) 2014 Rafael Caricio. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

