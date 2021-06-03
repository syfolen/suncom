
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
         * 判断属性是否为 null 或未定义
         * export
         */
        export function isNullOrUndefined(value: any): boolean {
            return value === void 0 || value === null;
        }

        /**
         * 获取类名
         * @cls: 指定类型
         * export
         */
        export function getClassName(cls: any): string {
            if (cls instanceof Function && this.isStringNullOrEmpty(cls.name) === false) {
                return cls.name;
            }
            const classString: string = cls.toString().trim();
            const index: number = classString.indexOf("(");
            return cls.name || classString.substring(9, index);
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
            return this.getClassName(prototype.constructor);
        }

        /**
         * 返回某对象上的方法名
         * @caller: 默认为：null
         * export
         */
        export function getMethodName(method: Function, caller: Object = null): string {
            if (caller === null) {
                return this.getClassName(method);
            }
            let key: string;
            for (key in caller) {
                if (caller[key] === method) {
                    return key;
                }
            }
            return null;
        }

        /**
         * 去除字符串的头尾空格
         * 说明：
         * 1. 当 str 为无效字符串时返回 null
         * export
         */
        export function trim(str: string): string {
            if (this.isNullOrUndefined(str) === true) {
                return null;
            }
            const chrs: string[] = ["\r", "\n", "\t", " "];

            let chr: string, index: number;

            let from: number = 0;
            while (from < str.length) {
                chr = str.charAt(from);
                index = chrs.indexOf(chr);
                if (index === -1) {
                    break;
                }
                from++;
            }

            let to: number = str.length - 1;
            while (to > from) {
                chr = str.charAt(to);
                index = chrs.indexOf(chr);
                if (index === -1) {
                    break;
                }
                to--;
            }

            return str.substring(from, to + 1);
        }

        /**
         * 判断字符串是否为空
         * 说明：
         * 1. 当 value 为数字且不为 NaN 时返回 true
         * 2. 当 value 为字符串且不为 "" 时返回 true
         * 3. 否则返回 false
         * export
         */
        export function isStringNullOrEmpty(value: string | number): boolean {
            if (typeof value === "number") {
                // 排除NaN
                return isNaN(value);
            }
            if (typeof value === "string" && value !== "") {
                return false;
            }
            return true;
        }

        /**
         * 格式化字符串
         * export
         */
        export function formatString(str: string, args: any[]): string {
            let i: number, flag: string, index: number, remain: number = str.length;
            for (i = 0; i < args.length; i++) {
                flag = `{${i}}`;
                index = str.indexOf(flag, str.length - remain);
                if (index === -1) {
                    break;
                }
                remain = str.length - index - 3;
                str = str.substr(0, index) + args[i] + str.substr(index + 3);
            }
            return str;
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
            if (Mathf.isNumber(date) === true) {
                return new Date(date);
            }
            // 自定义格式
            if (typeof date === "string") {
                // 自定义时间格式 yyyy-MM-dd hh:mm:ss 或 hh:mm:ss
                const array: string[] = date.split(" ");
                const dates: string[] = array.length === 1 ? [] : array.shift().split("-");
                const times: string[] = array[0].split(":");

                let dt: Date;
                if (times.length === 3) {
                    if (dates.length === 0) {
                        dt = new Date();
                        dates[0] = dt.getFullYear().toString();
                        dates[1] = (dt.getMonth() + 1).toString();
                        dates[2] = dt.getDate().toString();
                    }
                    return new Date(+dates[0], +dates[1] - 1, +dates[2], +times[0], +times[1], +times[2]);
                }
                return new Date(date);
            }
            throw Error(`Convert Date Error:${date}`);
        }

        /**
         * 时间累加
         * @datepart: yy, MM, ww, dd, hh, mm, ss, ms
         * @increment： 增量，可为负
         * @time: 时间参数
         * @return: 时间戳
         * export
         */
        export function dateAdd(datepart: string, increment: number, time: string | number | Date): number {
            const date: Date = this.convertToDate(time);

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
                    date.setMonth(month - 12);
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
         * @return: 时间戳
         * export
         */
        export function dateDiff(datepart: string, date: string | number | Date, date2: string | number | Date): number {
            const d1: Date = this.convertToDate(date);
            const d2: Date = this.convertToDate(date2);

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
         * 格式化时间，支持：yyyy-MM-dd hh:mm:ss.MS or yy-M-d h-m-s.ms
         * export
         */
        export function formatDate(str: string, time: string | number | Date): string {
            const date: Date = this.convertToDate(time);
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
         * 获取 Url 参数值
         * export
         */
        export function getQueryString(name: string, param?: string): string {
            const reg: RegExp = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            const str: string = param || window.location.search;
            const array: RegExpMatchArray = str.substr(1).match(reg) || null;
            return array === null ? null : decodeURIComponent(array[2]);
        }

        /**
         * 生成HTTP签名
         * @sign: 密钥
         * @signKey: 忽略签名字段，默认为："sign"
         * export
         */
        export function createHttpSign(params: Object, sign: string, signKey: string = "sign"): string {
            const array: string[] = [];

            let key: string;
            for (key in params) {
                if (key !== signKey) {
                    array.push(`${key}=${params[key]}`);
                }
            }
            array.push(`${signKey}=${sign}`);

            return this.md5(array.join("&"));
        }

        /**
         * 获取文件名（不包括扩展名）
         * export
         */
        export function getFileName(path: string): string {
            const index: number = path.lastIndexOf("/");
            if (index > -1) {
                path = path.substr(index + 1);
            }
            const suffix: string = this.getFileExtension(path);
            if (suffix === null) {
                return path;
            }
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
            return path.substr(index + 1).toLowerCase();
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
            return path.substr(0, index + 1) + newExt;
        }

        /**
         * 从数组中查找数据
         * @array: 数据源
         * @method: 查询规则，返回true表示与规则匹配
         * @out: 若不为null，则返回查询到的所有数据，默认为: null
         * @return: 若out为null，则只返回查询到的第一条数据，否则返回null
         * export
         */
        export function findInArray<T>(array: T[], method: (data: T) => boolean, out: T[] = null): T {
            let i: number, item: T;
            for (i = 0; i < array.length; i++) {
                item = array[i];
                if (method(item) === true) {
                    if (out === null) {
                        return item;
                    }
                    out.push(item);
                }
            }
            return null;
        }

        /**
         * 将数据从数组中移除
         * export
         */
        export function removeItemFromArray<T>(item: T, array: T[]): void {
            let i: number;
            for (i = 0; i < array.length; i++) {
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
            let i: number;
            for (i = 0; i < items.length; i++) {
                this.removeItemFromArray(items[i], array);
            }
        }

        /**
         * 复制数据对象
         * @deep: 默认为: false
         * export
         */
        export function copy(data: any, deep: boolean = false): any {
            let i: number, key: string, array: any[], newData: any;
            if (data instanceof Array) {
                if (deep === false) {
                    return data.slice(0);
                }
                else {
                    array = [];
                    for (i = 0; i < data.length; i++) {
                        array.push(this.copy(data[i], deep));
                    }
                    return array;
                }
            }
            else if (data instanceof Object) {
                newData = {};
                if (deep === false) {
                    for (key in data) {
                        newData[key] = data[key];
                    }
                }
                else {
                    for (key in data) {
                        newData[key] = this.copy(data[key], deep);
                    }
                }
                return newData;
            }
            return data;
        }

        /**
         * 克隆数据结构
         */
        export function clone(data: any): any {
            let key: string, value: any, newData: any = {};
            for (key in data) {
                value = data[key];
                if (typeof value === "number") {
                    newData[key] = 0;
                }
                else if (typeof value === "boolean") {
                    newData[key] = false;
                }
                else if (value instanceof Array) {
                    newData[key] = [];
                }
                else if (value instanceof Object) {
                    newData[key] = null;
                }
                else {
                    throw Error("克隆意外的数据类型：" + value);
                }
            }
            return newData;
        }

        /**
         * 判断深度相等
         * export
         */
        export function isEqual(oldData: any, newData: any, strict: boolean): boolean {
            if (oldData === newData) {
                return true;
            }
            // NaN 比较特别
            if (typeof oldData === "number" && typeof newData === "number" && isNaN(oldData) && isNaN(newData)) {
                return true;
            }
            let i: number, key: string;
            // 比较数组
            if (oldData instanceof Array && newData instanceof Array && oldData.length === newData.length) {
                if (strict === false) {
                    oldData = oldData.slice();
                    newData = newData.slice();
                    oldData.sort();
                    newData.sort();
                }
                // 类型为数组并且数组长度相同
                for (i = 0; i < oldData.length; i++) {
                    if (this.isEqual(oldData[i], newData[i], strict) === false) {
                        return false;
                    }
                }
                return true;
            }
            else if (oldData instanceof Object && newData instanceof Object && Object.keys(oldData).length === Object.keys(newData).length) {
                if (strict === true && oldData.constructor !== newData.constructor) {
                    return false;
                }
                for (key in oldData) {
                    if (oldData.hasOwnProperty(key) === true && this.isEqual(oldData[key], newData[key], strict) === false) {
                        return false;
                    }
                }
                return true;
            }
            // 其它类型,均返回 false

            return false;
        }

        /**
         * 将对象转化为字符串
         */
        export function toDisplayString(data: any): string {
            if (data === void 0 || data === null) {
                return data;
            }
            if (typeof data === "number" || typeof data === "string" || typeof data === "boolean") {
                return data.toString();
            }

            let i: number, str: string, array: string[];

            if (data instanceof Array) {
                array = [];
                for (i = 0; i < data.length; i++) {
                    array.push(this.toDisplayString(data[i]));
                }
                return `[${array.join(",")}]`;
            }
            else {
                try {
                    str = JSON.stringify(data);
                }
                catch (error) {
                    str = `[${this.getQualifiedClassName(data)}]`;
                }
            }

            return str;
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
                Logger.error("参数版本号无效");
                return 0;
            }
            if (typeof Global.VERSION !== "string") {
                Logger.error("版本号未设置");
                return 0;
            }
            const array: string[] = ver.split(".");
            const array2: string[] = Global.VERSION.split(".");
            const length: number = Math.max(array.length, array2.length);

            let i: number;
            for (i = 0; i < length; i++) {
                array.length === i && array.push("0");
                array2.length === i && array2.push("0");
            }

            let s0: string, s1: string, error: number = 0;

            for (i = 0; i < length; i++) {
                s0 = array[i];
                s1 = array2[i];
                if (Mathf.isNumber(s0) === false) {
                    error |= 0x01;
                }
                if (Mathf.isNumber(s1) === false) {
                    error |= 0x02;
                }
            }

            if (error & 0x1) {
                Logger.error(`参数版本号无效 ver:${ver}`);
            }
            if (error & 0x2) {
                Logger.error(`当前版本号无效 ver:${Global.VERSION}`);
            }
            if (error > 0) {
                return 0;
            }

            let reg0: number, reg1: number;
            for (i = 0; i < length; i++) {
                reg0 = +array[i];
                reg1 = +array2[i];
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