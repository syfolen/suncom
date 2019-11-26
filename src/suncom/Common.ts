
module suncom {
    /**
     * 常用库（纯JS方法）
     * export
     */
    export namespace Common {
        /**
         * 哈希种子
         */
        let $hashId: number = 0;

        /**
         * 获取全局唯一的哈希值
         * export
         */
        export function createHashId(): number {
            $hashId++;
            return $hashId;
        }

        /**
         * 获取类名
         * @cls: 指定类型
         * export
         */
        export function getClassName(cls: any): string {
            const classString: string = cls.toString().trim();
            const index: number = classString.indexOf("(");
            return classString.substring(9, index);
        }

        /**
         * 返回对象的类名
         * export
         */
        export function getQualifiedClassName(obj: any): string {
            const type: string = typeof obj;
            if (type !== "object") {
                return type;
            }
            const prototype: any = obj.prototype || Object.getPrototypeOf(obj) || null;
            if (prototype === null) {
                return type;
            }
            return Common.getClassName(prototype.constructor);
        }

        /**
         * 将枚举转化成字符串
         * export
         */
        export function convertEnumToString(value: number, oEnum: any): string {
            const keys: Array<string> = Object.keys(oEnum);
            for (let i: number = 0; i < keys.length; i++) {
                const key: string = keys[i];
                if (oEnum[key] === value) {
                    return key;
                }
            }
            return null;
        }

        /**
         * 将枚举转化成字符串
         * export
         */
        export function addEnumString(key: string, oEnum: { NAME, MODULE }, concat: boolean = true): void {
            if (oEnum.NAME === void 0) {
                throw Error(`Common=> Invalid Enum Object`);
            }
            else {
                if (oEnum[key] === void 0) {
                    if (concat === false) {
                        oEnum[key] = key;
                    }
                    else {
                        oEnum[key] = `${oEnum.NAME}.${oEnum.MODULE}.${key}`;
                    }
                }
                else {
                    throw Error(`Common=> Duplicate Enum String ${oEnum.NAME}[${key}]`);
                }
            }
        }

        /**
         * 判断是否为数字
         * export
         */
        export function isNumber(str: string | number): boolean {
            if (typeof str === "number") {
                return true;
            }
            if (typeof str === "string" && isNaN(parseFloat(str)) === false) {
                return true;
            }
            return false;
        }

        /**
         * 判断字符串是否为空
         * export
         */
        export function isStringInvalidOrEmpty(str: string | number): boolean {
            if (typeof str === "number") {
                return false;
            }
            if (typeof str === "string" && str !== "") {
                return false;
            }
            return true;
        }

        /**
         * 格式化字符串
         * export
         */
        export function formatString(str: string, args: Array<any>): string {
            const signs: string[] = ["%d", "%s"];
            while (args.length > 0) {
                let key: string = null;
                let index: number = -1;
                for (let i: number = 0; i < signs.length; i++) {
                    const sign: string = signs[i];
                    const indexOfSign: number = str.indexOf(sign);
                    if (indexOfSign === -1) {
                        continue;
                    }
                    if (index === -1 || indexOfSign < index) {
                        key = sign;
                        index = indexOfSign;
                    }
                }
                if (index === -1) {
                    throw Error(`字符串替换未完成 str:${str}`);
                }
                str = str.replace(key, args.shift());
            }
            return str;
        }

        /**
         * 格式化字符串
         */
        export function formatString$(str: string, args: Array<any>): string {
            while (args.length > 0) {
                if (str.indexOf("{$}") === -1) {
                    throw Error(`字符串替换未完成 str:${str}`);
                }
                else {
                    str = str.replace("{$}", args.shift());
                }
            }
            return str;
        }

        /**
         * 返回绝对值
         * export
         */
        export function abs(a: number): number {
            if (a < 0) {
                return -a;
            }
            return a;
        }

        /**
         * 返回a与b中的较小值
         * export
         */
        export function min(a: number, b: number): number {
            if (b < a) {
                return b;
            }
            return a;
        }

        /**
         * 返回a与b中的较大值
         * export
         */
        export function max(a: number, b: number): number {
            if (a < b) {
                return b;
            }
            return a;
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
         * 因各个平台实现的版本可能不一致，故自定义了此方法
         * @n: 需要保留小数位数，默认为0
         * NOTE: 此方法采用了四舍六入五成双的规则来取近似值
         * export
         */
        export function round(value: number, n: number = 0): number {
            // 多保留两位小数点
            let multiples: number = Math.pow(10, n + 2);
            // 临时值（去小数点）
            let tmpValue: number = Math.floor(value * multiples);

            // 获取修约参考位的值
            let reg0: number = tmpValue % 10;
            // 修正临时值，以便获取浮点值和整数值
            tmpValue = (tmpValue - reg0) / 10;

            // 浮点值
            let floatValue: number = tmpValue % 10;
            // 整数值
            let intValue: number = (tmpValue - floatValue) / 10;

            // 若浮点值小于 0 ，则进行修正
            if (floatValue < 0) {
                intValue -= 1;
                floatValue += 10;
            }

            // 四舍六入五成双

            if (floatValue > 5) {
                intValue += 1;
            }
            else if (floatValue === 5) {
                // 若参考位值大于0，则始终进一位
                if (reg0 !== 0) {
                    intValue += 1;
                }
                else {
                    const modValue: number = intValue % 2;
                    if (modValue === 1 || modValue === -1) {
                        intValue += 1;
                    }
                }
            }

            // 还原小数点，并返回
            return intValue / Math.pow(10, n);
        }

        /**
         * 返回>=min且<max的随机整数
         * export
         */
        export function random(min: number, max: number): number {
            const value: number = Random.random() * (max - min);
            return Math.floor(value) + min;
        }

        /**
         * 将参数转化为 Date
         * @date: 任何格式的时间参数，可以为字符串或时间戳
         * 支持的格式说明：
         * 1. Date对象
         * 2. 时间戳
         * 3. hh:mm:ss
         * 4. yyyy-MM-dd hh:mm:ss
         * export
         */
        export function convertToDate(date: string | number | Date): Date {
            if (date instanceof Date) {
                return date;
            }
            // 时间戳或字符串形式的时间戳
            if (Common.isNumber(date) === true) {
                return new Date(date.toString());
            }
            // 自定义格式
            if (typeof date === "string") {
                // 自定义时间格式 yyyy-MM-dd hh:mm:ss 或 hh:mm:ss
                const array: Array<string> = date.split(" ");
                const dates: Array<string> = array.length === 1 ? [] : array.shift().split("-");
                const times: Array<string> = array[0].split(":");
                if (dates.length === 3 && times.length === 3) {
                    return new Date(Number(dates[0]), Number(dates[1]) - 1, Number(dates[2]), Number(times[0]), Number(times[1]), Number(times[2]));
                }
                return new Date(date);
            }
            throw Error(`Convert Date Error:${date}`);
        }

        /**
         * 时间累加
         * @datepart: yy, MM, ww, dd, hh, mm, ss, ms
         * @increment： 增量，可为负
         * @arg2: 时间参数
         * export
         */
        export function dateAdd(datepart: string, increment: number, time: string | number | Date): number {
            const date: Date = Common.convertToDate(time);

            //计算增量毫秒数
            if (datepart === "yy") {
                date.setFullYear(date.getFullYear() + increment);
            }
            else if (datepart === "MM") {
                const rem: number = increment % 12;
                const mul: number = (increment - rem) / 12;
                // 增加倍数的年份
                date.setFullYear(date.getFullYear() + mul);
                // 增加余数的年份
                const month: number = date.getMonth() + rem;
                if (month > 11) {
                    date.setMonth(month - 11);
                    date.setFullYear(date.getFullYear() + 1);
                }
                else if (month < 0) {
                    date.setMonth(rem + 11);
                    date.setFullYear(date.getFullYear() - 1);
                }
                else {
                    date.setMonth(month);
                }
            }

            let timestamp: number = date.valueOf();

            if (datepart === "ww") {
                timestamp += increment * 7 * 24 * 3600 * 1000;
            }
            else if (datepart === "dd") {
                timestamp += increment * 24 * 3600 * 1000;
            }
            else if (datepart === "hh") {
                timestamp += increment * 3600 * 1000;
            }
            else if (datepart === "mm") {
                timestamp += increment * 60 * 1000;
            }
            else if (datepart === "ss") {
                timestamp += increment * 1000;
            }
            else if (datepart === "ms") {
                timestamp += increment;
            }

            return timestamp;
        }

        /**
         * 计算时间差
         * @datepart: yy, MM, ww, dd, hh, mm, ss, ms
         * export
         */
        export function dateDiff(datepart: string, date: string | number | Date, date2: string | number | Date): number {
            const d1: Date = Common.convertToDate(date);
            const d2: Date = Common.convertToDate(date2);

            let time: number = d1.valueOf();
            let time2: number = d2.valueOf();

            if (datepart === "ms") {
                return time2 - time;
            }

            time = Math.floor(time / 1000);
            time2 = Math.floor(time2 / 1000);

            if (datepart === "ss") {
                return time2 - time;
            }

            time = Math.floor(time / 60);
            time2 = Math.floor(time2 / 60);

            if (datepart === "mm") {
                return time2 - time;
            }

            time = Math.floor(time / 60);
            time2 = Math.floor(time2 / 60);

            if (datepart === "hh") {
                return time2 - time;
            }

            time = Math.floor(time / 24);
            time2 = Math.floor(time2 / 24);

            if (datepart === "dd") {
                return time2 - time;
            }

            if (datepart === "ww") {
                //1970/1/1是星期四，故应当减去4天
                return Math.floor(((time2 - 4) - (time - 4)) / 7);
            }

            if (datepart === "MM") {
                return d2.getMonth() - d1.getMonth() + (d2.getFullYear() - d1.getFullYear()) * 12;
            }

            if (datepart === "yy") {
                return d2.getFullYear() - d1.getFullYear();
            }

            return 0;
        }

        /**
         * 格式化时间，支持：yy-MM-dd hh:mm:ss ms
         * export
         */
        export function formatDate(str: string, time: string | number | Date): string {
            const date: Date = Common.convertToDate(time);
            str = str.replace("yyyy", date.getFullYear().toString());
            str = str.replace("yy", date.getFullYear().toString().substr(2, 2));
            str = str.replace("MM", ("0" + (date.getMonth() + 1).toString()).substr(-2));
            str = str.replace("dd", ("0" + (date.getDate()).toString()).substr(-2));
            str = str.replace("hh", ("0" + (date.getHours()).toString()).substr(-2));
            str = str.replace("mm", ("0" + (date.getMinutes()).toString()).substr(-2));
            str = str.replace("ss", ("0" + (date.getSeconds()).toString()).substr(-2));
            str = str.replace("M", (date.getMonth() + 1).toString());
            str = str.replace("d", (date.getDate()).toString());
            str = str.replace("h", (date.getHours()).toString());
            str = str.replace("m", (date.getMinutes()).toString());
            str = str.replace("s", (date.getSeconds()).toString());
            str = str.replace("ms", (date.getMilliseconds()).toString());
            return str;
        }

        /**
         * 返回MD5加密后的串
         */
        export function md5(str: string): string {
            // return new md5().hex_md5(str);
            throw Error("Not supported!!!");
        }

        /**
         * 生成HTTP签名
         */
        export function createHttpSign(params: Object): string {
            const keys: Array<string> = Object.keys(params).sort();
            const array: Array<string> = [];

            for (let i: number = 0; i < keys.length; i++) {
                const key: string = keys[i];
                if (key !== "sign") {
                    array.push(`${key}=${params[key]}`);
                }
            }
            array.push("key=123456789012345678");

            return Common.md5(array.join("&"));
        }

        /**
         * 从数组中查找数据
         * @array: 数据源
         * @method: 查询规则，返回true表示与规则匹配
         * @out: 若为null，则只返回查询到的第一条数据，否则将以数组的形式返回查询到的所有数据
         * export
         */
        export function findFromArray<T>(array: T[], method: (data: T) => boolean, out: T[] = null): T | T[] {
            for (let i: number = 0; i < array.length; i++) {
                const item: T = array[i];
                if (method(item) === true) {
                    if (out === null) {
                        return item;
                    }
                    out.push(item);
                }
            }
            return out;
        }

        /**
         * 将数据从数组中移除
         * export
         */
        export function removeItemFromArray<T>(item: T, array: T[]): void {
            for (let i: number = 0; i < array.length; i++) {
                if (array[i] === item) {
                    array.splice(i, 1);
                    break;
                }
            }
        }

        /**
         * 将数据从数组中移除
         * export
         */
        export function removeItemsFromArray<T>(items: T[], array: T[]): void {
            for (let i: number = 0; i < items.length; i++) {
                Common.removeItemFromArray(items[i], array);
            }
        }
    }
}