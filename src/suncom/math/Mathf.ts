
module suncom {
    /**
     * 常用数学函数
     * export
     */
    export namespace Mathf {
        /**
         * PI
         * export
         */
        export const PI: number = Math.PI;

        /**
         * 2PI
         * export
         */
        export const PI2: number = Math.PI * 2;

        /**
         * 整数的最大安全值
         * export
         */
        export const MAX_SAFE_INTEGER: number = 9007199254740991;

        /**
         * 整数的最小安全值
         * export
         */
        export const MIN_SAFE_INTEGER: number = -9007199254740991;

        /**
         * 角度换算为弧度
         * export
         */
        export function d2r(d: number): number {
            return d * Math.PI / 180;
        }

        /**
         * 弧度换算为角度
         * export
         */
        export function r2d(a: number): number {
            return a * 180 / Math.PI;
        }

        /**
         * 将value限制于min和max之间
         * export
         */
        export function clamp(value: number, min: number, max: number): number {
            if (value < min) {
                return min;
            }
            else if (value > max) {
                return max;
            }
            return value;
        }

        /**
         * 返回近似值
         * @n: 需要保留小数位数，默认为0
         * 1. 因各个平台实现的版本可能不一致，故自定义了此方法
         * export
         */
        export function round(value: number, n: number = 0): number {
            let str: string = value.toString();

            const dotIndex: number = str.indexOf(".");
            if (dotIndex === -1) {
                return value;
            }

            const integerDotLength: number = dotIndex + 1;
            if (str.length - integerDotLength <= n) {
                return value;
            }

            const s0: string = str.substr(0, dotIndex);
            const s1: string = str.substr(integerDotLength, n);
            const s2: string = str.substr(integerDotLength + n, 2);

            const a: string = s2.length === 1 ? s2 : s2.charAt(0);
            const b: string = s2.length === 1 ? "0" : s2.charAt(1);

            let intValue: number = parseInt(s0 + s1);
            let floatValue: number = parseInt(a + b);

            // 若整数值为负，且小数值有效，则需要修正小数值
            if (intValue < 0 && floatValue > 0) {
                intValue -= 1;
                floatValue = 100 - floatValue;
            }

            const s3: string = floatValue.toString();
            // 被修约值
            const reg0: number = parseInt(s3.charAt(0));
            // 被修约参考值
            const reg1: number = parseInt(s3.charAt(1));

            // 四舍六入
            if (reg0 > 5) {
                intValue += 1;
            }
            else if (reg0 === 5) {
                // 当五后面有数时进一
                if (reg1 > 0) {
                    intValue++;
                }
                // 当五后面无有效数字时，若五前为奇数，则进一
                else {
                    const modValue: number = intValue % 2;
                    if (modValue === 1 || modValue === -1) {
                        intValue += 1;
                    }
                }
            }

            // 还原小数点，并返回
            const newValue: string = intValue.toString();
            const newDotIndex: number = newValue.length - n;

            const retValue: string = `${newValue.substr(0, newDotIndex)}.${newValue.substr(newDotIndex)}`;
            const retValueF: number = parseFloat(retValue);

            return retValueF;
        }

        /**
         * 返回 >= min 且 < max 的随机整数
         * export
         */
        export function random(min: number, max: number): number {
            const value: number = Math.random() * (max - min);
            return Math.floor(value) + min;
        }

        /**
         * 判断是否为数字
         * export
         */
        export function isNumber(str: string | number): boolean {
            if (typeof str === "number") {
                return isNaN(str) === false;
            }
            if (typeof str === "string") {
                if (str === "") {
                    return false;
                }
                return isNaN(+str) === false;
            }
            return false;
        }
    }
}