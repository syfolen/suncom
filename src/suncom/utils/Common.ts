
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
         * 返回某对象上的方法名
         * @caller: 默认为：null
         * export
         */
        export function getMethodName(method: Function, caller: Object = null): string {
            if (caller === null) {
                return Common.getClassName(method);
            }
            for (let key in caller) {
                if (caller[key] === method) {
                    return key;
                }
            }
            return null;
        }

        /**
         * 将枚举转化成字符串
         * export
         */
        export function convertEnumToString(value: number, oEnum: any): string {
            const keys: string[] = Object.keys(oEnum);
            for (let i: number = 0; i < keys.length; i++) {
                const key: string = keys[i];
                if (oEnum[key] === value) {
                    return key;
                }
            }
            return null;
        }

        /**
         * 判断是否为数字
         * export
         */
        export function isNumber(str: string | number): boolean {
            if (typeof str === "number") {
                return true;
            }
            if (typeof str === "string" && isNaN(Number(str)) === false) {
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
        export function formatString(str: string, args: any[]): string {
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
        export function formatString$(str: string, args: any[]): string {
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
         * 返回四舍五入后的结果
         * @n: 保留小数位数，默认为0
         * 说明：
         * 1. 因各个平台实现的版本可能不一致，故自定义了此方法
         * 弃用原因：
         * 1. tmpValue值的计算会因精度问题存在误差
         */
        export function $round(value: number, n: number = 0): number {
            Logger.warn(DebugMode.ANY, `此接口己弃用：suncom.Common.$round(value: number, n: number = 0);`);
            let tmpValue: number = Math.floor(value * Math.pow(10, n + 2));

            let floatValue: number = tmpValue % 100;
            let intValue: number = (tmpValue - floatValue) / 100;

            // 若整数值为负，且小数值有效，则需要修正小数值
            if (floatValue < 0 && floatValue > 0) {
                intValue -= 1;
                floatValue += 100;
            }

            const a: number = floatValue % 10;
            const b: number = (floatValue - a) / 10;

            // 四舍六入五成双
            if (b > 5) {
                intValue += 1;
            }
            else if (b === 5) {
                const modValue: number = a % 2;
                if (modValue === 1 || modValue === -1) {
                    intValue += 1;
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
                return new Date(date);
            }
            // 自定义格式
            if (typeof date === "string") {
                // 自定义时间格式 yyyy-MM-dd hh:mm:ss 或 hh:mm:ss
                const array: string[] = date.split(" ");
                const dates: string[] = array.length === 1 ? [] : array.shift().split("-");
                const times: string[] = array[0].split(":");
                if (times.length === 3) {
                    if (dates.length === 0) {
                        const a: Date = new Date();
                        dates[0] = a.getFullYear().toString();
                        dates[1] = (a.getMonth() + 1).toString();
                        dates[2] = a.getDate().toString();
                    }
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

            let t1: number = d1.valueOf();
            let t2: number = d2.valueOf();
            if (datepart === "ms") {
                return t2 - t1;
            }

            t1 = Math.floor(t1 / 1000);
            t2 = Math.floor(t2 / 1000);
            if (datepart === "ss") {
                return t2 - t1;
            }

            t1 = Math.floor(t1 / 60);
            t2 = Math.floor(t2 / 60);
            if (datepart === "mm") {
                return t2 - t1;
            }

            t1 = Math.floor(t1 / 60);
            t2 = Math.floor(t2 / 60);
            if (datepart === "hh") {
                return t2 - t1;
            }

            t1 = Math.floor(t1 / 24);
            t2 = Math.floor(t2 / 24);
            if (datepart === "dd") {
                return t2 - t1;
            }

            if (datepart === "ww") {
                //1970/1/1是星期四，故应当减去4天
                return Math.floor(((t2 - 4) - (t1 - 4)) / 7);
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
         * 格式化时间，支持：yy-MM-dd hh:mm:ss MS|ms
         * export
         */
        export function formatDate(str: string, time: string | number | Date): string {
            const date: Date = Common.convertToDate(time);
            str = str.replace("MS", ("00" + (date.getMilliseconds()).toString()).substr(-3));
            str = str.replace("ms", (date.getMilliseconds()).toString());
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
            return str;
        }

        /**
         * 返回MD5加密后的串
         * export
         */
        export function md5(str: string): string {
            throw Error("未实现的接口！！！");
        }

        /**
         * 获取文件名（不包括后缀名）
         * export
         */
        export function getFileName(path: string): string {
            const index: number = path.lastIndexOf("/");
            if (index > -1) {
                path = path.substr(index + 1);
            }
            const suffix: string = Common.getFileExtension(path);
            return path.substr(0, path.length - suffix.length - 1);
        }

        /**
         * 获取文件的扩展名
         * export
         */
        export function getFileExtension(path: string): string {
            const index: number = path.lastIndexOf(".");
            if (index === -1) {
                return null;
            }
            else {
                return path.substr(index + 1).toLowerCase();
            }
        }

        /**
         * 替换扩展名，并返回新的路径
         * export
         */
        export function replacePathExtension(path: string, newExt: string): string {
            const index: number = path.lastIndexOf(".");
            if (index === -1) {
                return path;
            }
            else {
                return path.substr(0, index + 1) + newExt;
            }
        }

        /**
         * 生成HTTP签名
         * @key: 密钥
         * @sign: 忽略签名字段，默认为："sign"
         * export
         */
        export function createHttpSign(params: Object, key: string, sign: string = "sign"): string {
            const keys: string[] = Object.keys(params).sort();
            const array: string[] = [];

            for (let i: number = 0; i < keys.length; i++) {
                const key: string = keys[i];
                if (key !== sign) {
                    array.push(`${key}=${params[key]}`);
                }
            }
            array.push(`key=${key}`);

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

        /**
         * 比较版本号
         * 若当前版本低于参数版本，返回 -1
         * 若当前版本高于参数版本，返回 1
         * 否则返回 0
         * export
         */
        export function compareVersion(ver: string): number {
            if (typeof ver !== "string") {
                Logger.error(DebugMode.ANY, `参数版本号无效`);
                return 0;
            }
            if (typeof Global.VERSION !== "string") {
                Logger.error(DebugMode.ANY, `版本号未设置`);
                return 0;
            }
            const array: string[] = ver.split(".");
            const array2: string[] = Global.VERSION.split(".");

            let length: number = array.length > array2.length ? array.length : array2.length;

            while (array.length < length) {
                array.push("0");
            }
            while (array2.length < length) {
                array2.push("0");
            }

            let error: number = 0;

            for (let i: number = 0; i < length; i++) {
                const s0: string = array[i];
                const s1: string = array2[i];
                if (Common.isNumber(s0) === false) {
                    error = (error & 1);
                    array[i] = "0";
                }
                if (Common.isNumber(s1) === false) {
                    error = (error & 2);
                    array2[i] = "0";
                }
            }

            if (error & 1) {
                Logger.error(DebugMode.ANY, `参数版本号无效 ver:${ver}`);
            }
            if (error & 2) {
                Logger.error(DebugMode.ANY, `当前版本号无效 ver:${Global.VERSION}`);
            }
            if (error > 0) {
                return 0;
            }

            for (let i: number = 0; i < length; i++) {
                const reg0: number = Number(array[i]);
                const reg1: number = Number(array2[i]);
                if (reg0 < reg1) {
                    return 1;
                }
                else if (reg0 > reg1) {
                    return -1;
                }
            }

            return 0;
        }
    }
}