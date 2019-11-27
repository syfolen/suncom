var suncom;
(function (suncom) {
    /**
     * 常用库（纯JS方法）
     * export
     */
    var Common;
    (function (Common) {
        /**
         * 哈希种子
         */
        var $hashId = 0;
        /**
         * 获取全局唯一的哈希值
         * export
         */
        function createHashId() {
            $hashId++;
            return $hashId;
        }
        Common.createHashId = createHashId;
        /**
         * 获取类名
         * @cls: 指定类型
         * export
         */
        function getClassName(cls) {
            var classString = cls.toString().trim();
            var index = classString.indexOf("(");
            return classString.substring(9, index);
        }
        Common.getClassName = getClassName;
        /**
         * 返回对象的类名
         * export
         */
        function getQualifiedClassName(obj) {
            var type = typeof obj;
            if (type !== "object") {
                return type;
            }
            var prototype = obj.prototype || Object.getPrototypeOf(obj) || null;
            if (prototype === null) {
                return type;
            }
            return Common.getClassName(prototype.constructor);
        }
        Common.getQualifiedClassName = getQualifiedClassName;
        /**
         * 将枚举转化成字符串
         * export
         */
        function convertEnumToString(value, oEnum) {
            var keys = Object.keys(oEnum);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (oEnum[key] === value) {
                    return key;
                }
            }
            return null;
        }
        Common.convertEnumToString = convertEnumToString;
        /**
         * 将枚举转化成字符串
         * export
         */
        function addEnumString(key, oEnum, concat) {
            if (concat === void 0) { concat = true; }
            if (oEnum.NAME === void 0) {
                throw Error("Common=> Invalid Enum Object");
            }
            else {
                if (oEnum[key] === void 0) {
                    if (concat === false) {
                        oEnum[key] = key;
                    }
                    else {
                        oEnum[key] = oEnum.NAME + "." + oEnum.MODULE + "." + key;
                    }
                }
                else {
                    throw Error("Common=> Duplicate Enum String " + oEnum.NAME + "[" + key + "]");
                }
            }
        }
        Common.addEnumString = addEnumString;
        /**
         * 判断是否为数字
         * export
         */
        function isNumber(str) {
            if (typeof str === "number") {
                return true;
            }
            if (typeof str === "string" && isNaN(Number(str)) === false) {
                return true;
            }
            return false;
        }
        Common.isNumber = isNumber;
        /**
         * 判断字符串是否为空
         * export
         */
        function isStringInvalidOrEmpty(str) {
            if (typeof str === "number") {
                return false;
            }
            if (typeof str === "string" && str !== "") {
                return false;
            }
            return true;
        }
        Common.isStringInvalidOrEmpty = isStringInvalidOrEmpty;
        /**
         * 格式化字符串
         * export
         */
        function formatString(str, args) {
            var signs = ["%d", "%s"];
            while (args.length > 0) {
                var key = null;
                var index = -1;
                for (var i = 0; i < signs.length; i++) {
                    var sign = signs[i];
                    var indexOfSign = str.indexOf(sign);
                    if (indexOfSign === -1) {
                        continue;
                    }
                    if (index === -1 || indexOfSign < index) {
                        key = sign;
                        index = indexOfSign;
                    }
                }
                if (index === -1) {
                    throw Error("\u5B57\u7B26\u4E32\u66FF\u6362\u672A\u5B8C\u6210 str:" + str);
                }
                str = str.replace(key, args.shift());
            }
            return str;
        }
        Common.formatString = formatString;
        /**
         * 格式化字符串
         */
        function formatString$(str, args) {
            while (args.length > 0) {
                if (str.indexOf("{$}") === -1) {
                    throw Error("\u5B57\u7B26\u4E32\u66FF\u6362\u672A\u5B8C\u6210 str:" + str);
                }
                else {
                    str = str.replace("{$}", args.shift());
                }
            }
            return str;
        }
        Common.formatString$ = formatString$;
        /**
         * 返回绝对值
         * export
         */
        function abs(a) {
            if (a < 0) {
                return -a;
            }
            return a;
        }
        Common.abs = abs;
        /**
         * 返回a与b中的较小值
         * export
         */
        function min(a, b) {
            if (b < a) {
                return b;
            }
            return a;
        }
        Common.min = min;
        /**
         * 返回a与b中的较大值
         * export
         */
        function max(a, b) {
            if (a < b) {
                return b;
            }
            return a;
        }
        Common.max = max;
        /**
         * 将value限制于min和max之间
         * export
         */
        function clamp(value, min, max) {
            if (value < min) {
                return min;
            }
            else if (value > max) {
                return max;
            }
            return value;
        }
        Common.clamp = clamp;
        /**
         * 返回近似值
         * 因各个平台实现的版本可能不一致，故自定义了此方法
         * @n: 需要保留小数位数，默认为0
         * NOTE: 此方法采用了四舍六入五成双的规则来取近似值
         * export
         */
        function round(value, n) {
            if (n === void 0) { n = 0; }
            var str = value.toString();
            var reg0 = str.indexOf(".");
            if (reg0 === -1) {
                return value;
            }
            var reg1 = reg0 + 1;
            if (str.length - reg1 <= n) {
                return value;
            }
            var s0 = str.substr(0, reg0);
            var s1 = str.substr(reg1, n);
            var s2 = str.substr(reg1 + n, 2);
            var a = s2.length === 1 ? s2 : s2.charAt(0);
            var b = s2.length === 1 ? "0" : s2.charAt(1);
            // 整数值
            var intValue = parseInt(s0 + s1);
            // 小数值
            var floatValue = parseInt(a + b);
            // 若整数值为负，且小数值有效，则需要修正小数值
            if (intValue < 0 && floatValue > 0) {
                intValue--;
                floatValue = 100 - floatValue;
            }
            var s3 = floatValue.toString();
            // 被修约值
            var reg2 = parseInt(s3.charAt(0));
            // 被修约参考值
            var reg3 = parseInt(s3.charAt(1));
            // 四舍六入
            if (reg2 > 5) {
                intValue += 1;
            }
            else if (reg2 === 5) {
                // 当五后面有数时进一
                if (reg3 > 0) {
                    intValue++;
                }
                // 当五后面无有效数字时，若五前为奇数，则进一
                else {
                    var modValue = intValue % 2;
                    if (modValue === 1 || modValue === -1) {
                        intValue += 1;
                    }
                }
            }
            // 还原小数点，并返回
            var s4 = intValue.toString();
            var reg4 = s4.length - n;
            var s5 = s4.substr(0, reg4) + "." + s4.substr(reg4);
            var reg5 = parseFloat(s5);
            return reg5;
        }
        Common.round = round;
        /**
         * 返回四舍五入后的结果
         * 因各个平台实现的版本可能不一致，故自定义了此方法
         * @n: 保留小数位数，默认为0
         */
        function $round(value, n) {
            if (n === void 0) { n = 0; }
            // 多保留一位小数点
            var multiples = Math.pow(10, n + 1);
            // 临时值（去小数点）
            var tmpValue = Math.floor(value * multiples);
            // 浮点值
            var floatValue = tmpValue % 10;
            // 整数值
            var intValue = (tmpValue - floatValue) / 10;
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
                var modValue = intValue % 2;
                if (modValue === 1 || modValue === -1) {
                    intValue += 1;
                }
            }
            // 还原小数点，并返回
            return intValue / Math.pow(10, n);
        }
        Common.$round = $round;
        /**
         * 返回>=min且<max的随机整数
         * export
         */
        function random(min, max) {
            var value = suncom.Random.random() * (max - min);
            return Math.floor(value) + min;
        }
        Common.random = random;
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
        function convertToDate(date) {
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
                var array = date.split(" ");
                var dates = array.length === 1 ? [] : array.shift().split("-");
                var times = array[0].split(":");
                if (times.length === 3) {
                    if (dates.length === 0) {
                        var a = new Date();
                        dates[0] = a.getFullYear().toString();
                        dates[1] = (a.getMonth() + 1).toString();
                        dates[2] = a.getDate().toString();
                    }
                    return new Date(Number(dates[0]), Number(dates[1]) - 1, Number(dates[2]), Number(times[0]), Number(times[1]), Number(times[2]));
                }
                return new Date(date);
            }
            throw Error("Convert Date Error:" + date);
        }
        Common.convertToDate = convertToDate;
        /**
         * 时间累加
         * @datepart: yy, MM, ww, dd, hh, mm, ss, ms
         * @increment： 增量，可为负
         * @arg2: 时间参数
         * export
         */
        function dateAdd(datepart, increment, time) {
            var date = Common.convertToDate(time);
            //计算增量毫秒数
            if (datepart === "yy") {
                date.setFullYear(date.getFullYear() + increment);
            }
            else if (datepart === "MM") {
                var rem = increment % 12;
                var mul = (increment - rem) / 12;
                // 增加倍数的年份
                date.setFullYear(date.getFullYear() + mul);
                // 增加余数的年份
                var month = date.getMonth() + rem;
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
            var timestamp = date.valueOf();
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
        Common.dateAdd = dateAdd;
        /**
         * 计算时间差
         * @datepart: yy, MM, ww, dd, hh, mm, ss, ms
         * export
         */
        function dateDiff(datepart, date, date2) {
            var d1 = Common.convertToDate(date);
            var d2 = Common.convertToDate(date2);
            var time = d1.valueOf();
            var time2 = d2.valueOf();
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
        Common.dateDiff = dateDiff;
        /**
         * 格式化时间，支持：yy-MM-dd hh:mm:ss ms
         * export
         */
        function formatDate(str, time) {
            var date = Common.convertToDate(time);
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
        Common.formatDate = formatDate;
        /**
         * 返回MD5加密后的串
         */
        function md5(str) {
            // return new md5().hex_md5(str);
            throw Error("Not supported!!!");
        }
        Common.md5 = md5;
        /**
         * 生成HTTP签名
         */
        function createHttpSign(params) {
            var keys = Object.keys(params).sort();
            var array = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "sign") {
                    array.push(key + "=" + params[key]);
                }
            }
            array.push("key=123456789012345678");
            return Common.md5(array.join("&"));
        }
        Common.createHttpSign = createHttpSign;
        /**
         * 从数组中查找数据
         * @array: 数据源
         * @method: 查询规则，返回true表示与规则匹配
         * @out: 若为null，则只返回查询到的第一条数据，否则将以数组的形式返回查询到的所有数据
         * export
         */
        function findFromArray(array, method, out) {
            if (out === void 0) { out = null; }
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                if (method(item) === true) {
                    if (out === null) {
                        return item;
                    }
                    out.push(item);
                }
            }
            return out;
        }
        Common.findFromArray = findFromArray;
        /**
         * 将数据从数组中移除
         * export
         */
        function removeItemFromArray(item, array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === item) {
                    array.splice(i, 1);
                    break;
                }
            }
        }
        Common.removeItemFromArray = removeItemFromArray;
        /**
         * 将数据从数组中移除
         * export
         */
        function removeItemsFromArray(items, array) {
            for (var i = 0; i < items.length; i++) {
                Common.removeItemFromArray(items[i], array);
            }
        }
        Common.removeItemsFromArray = removeItemsFromArray;
    })(Common = suncom.Common || (suncom.Common = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=Common.js.map