/**
 * 常用库
 * export
 */
module suncom {

    /**
     * 纯 js 公共方法类
     * export
     */
    export abstract class Common {
        /**
         * Hash Id
         */
        private static $hashId: number = 0;

        /**
         * 获取 Hash ID
         * export
         */
        static get hashId(): number {
            Common.$hashId++;
            return Common.$hashId;
        }

        /**
         * 获取类名
         * @cls: 指定类型
         * export
         */
        static getClassName(cls: any): string {
            const classString: string = cls.toString().trim();
            const index: number = classString.indexOf("(");
            return classString.substring(9, index);
        }

        /**
         * 返回对象的类名
         * export
         */
        static getQualifiedClassName(obj: any): string {
            if (obj === null) {
                return null;
            }
            const type = typeof obj;
            if (type !== "object") {
                return type;
            }
            const prototype = obj.prototype || Object.getPrototypeOf(obj) || null;
            if (prototype === null) {
                return type;
            }
            return Common.getClassName(prototype.constructor);
        }

        /**
         * 将枚举转化成字符串
         * export
         */
        static convertEnumToString(value: number, oEnum: any): string {
            if (value === void 0) {
                return null;
            }
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
        static addEnumString(key: string, oEnum: { NAME, MODULE }, concat: boolean = true): void {
            if (oEnum.NAME !== void 0) {
                if (oEnum[key] !== void 0) {
                    throw Error(`Common=> Duplicate Enum String ${oEnum.NAME}[${key}]`);
                }
                else if (concat === false) {
                    oEnum[key] = key;
                }
                else {
                    oEnum[key] = `${oEnum.NAME}.${oEnum.MODULE}.${key}`;
                }
            }
            else {
                throw Error(`Common=> Invalid Enum Object`);
            }
        }

        //=================================================
        // 字符串相关

        /**
         * 判断是否为数字
         * export
         */
        static isNumber(str: string | number): boolean {
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
        static isStringInvalidOrEmpty(str: string | number): boolean {
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
        static formatString(str: string, args: Array<any>): string {
            const s0 = str;
            const s1 = `[${args.join(", ")}]`;
            const a = ["%d", "%s", "{$}"];

            let reg2 = 0;
            while (args.length > 0) {
                const arg = args.shift() as any;
                let reg0: number = -1;
                for (const s2 of a) {
                    const reg1 = str.indexOf(s2);
                    if (reg1 === -1) {
                        continue;
                    }
                    if (reg0 === -1) {
                        reg0 = reg1;
                        reg2 = s2.length;
                    }
                    else if (reg1 < reg0) {
                        reg0 = reg1;
                        reg2 = s2.length;
                    }
                }
                if (reg0 === -1) {
                    console.log(`字符串未完成 str:${str}, array:${s1}`);
                    break;
                }
                str = str.substr(0, reg0) + arg + str.substr(reg0 + reg2);
            }
            return str;
        }

        //=================================================
        // 数学相关

        /**
         * 返回绝对值
         * export
         */
        static abs(a: number): number {
            if (a < 0) {
                return -a;
            }
            return a;
        }

        /**
         * 返回a与b中的较小值
         * export
         */
        static min(a: number, b: number): number {
            if (b < a) {
                return b;
            }
            return a;
        }

        /**
         * 返回a与b中的较大值
         * export
         */
        static max(a: number, b: number): number {
            if (a < b) {
                return b;
            }
            return a;
        }

        /**
         * 将 value 限制制于 min 和 max 之间
         * export
         */
        static clamp(value: number, min: number, max: number): number {
            if (value < min) {
                return min;
            }
            else if (value > max) {
                return max;
            }
            return value;
        }

        /**
         * 返回四舍五入后的结果
         * 因各个平台实现的版本可能不一致，故自定义了此方法
         * @n: 保留小数位数，默认为0
         * export
         */
        static round(value: number, n: number = 0): number {
            // 多保留一位小数点
            let multiples: number = Math.pow(10, n + 1);
            // 临时值（去小数点）
            let tmpValue: number = Math.floor(value * multiples);

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
                const modValue: number = intValue % 2;
                if (modValue === 1 || modValue === -1) {
                    intValue += 1;
                }
            }

            // 还原小数点，并返回
            return intValue / Math.pow(10, n);
        }

        /**
         * 返回 >= min 且 < max 的随机整数
         * export
         */
        static random(min: number, max: number): number {
            const value: number = Random.random() * (max - min);
            return Math.floor(value) + min;
        }

        //=================================================
        // 时间相关

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
        static convertToDate(date: string | number | Date): Date {
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
                const times: Array<string> = array[1].split(":");
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
        static dateAdd(datepart: string, increment: number, time: string | number | Date): number {
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
        static dateDiff(datepart: string, date: string | number | Date, date2: string | number | Date): number {
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
        static formatDate(str: string, time: string | number | Date): string {
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

        //=================================================
        // 其它

        /**
         * 返回 MD5 加密后的串
         * export
         */
        static md5(str: string): string {
            // return new md5().hex_md5(str);
            throw Error("Not supported!!!");
        }

        /**
         * 生成 HTTP 签名
         * export
         */
        static createSign(params: Object): string {
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
        static findFromArray<T>(array: T[], method: (data: T) => boolean, out: T[] = null): T | T[] {
            for (let i = 0, length = array.length; i < length; i++) {
                const item = array[i];
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
        static removeItemFromArray<T>(item: T, array: T[]): void {
            for (let i = 0, length = array.length; i < length; i++) {
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
        static removeItemsFromArray<T>(items: T[], array: T[]): void {
            for (let i = 0, length = items.length; i < length; i++) {
                Common.removeItemFromArray(items[i], array);
            }
        }
    }
}