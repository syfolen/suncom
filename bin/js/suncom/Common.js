var suncom;
(function (suncom) {
    /**
      * 纯 js 公共方法类
      */
    var Common = /** @class */ (function () {
        function Common() {
        }
        Object.defineProperty(Common, "hashId", {
            /**
              * 获取 Hash ID
              */
            get: function () {
                Common.$hashId++;
                return Common.$hashId;
            },
            enumerable: true,
            configurable: true
        });
        /**
          * 获取类名
          * @cls: 指定类型
          */
        Common.getClassName = function (cls) {
            var classString = cls.toString().trim();
            var index = classString.indexOf("(");
            return classString.substring(9, index);
        };
        /**
          * 将枚举转化成字符串
          */
        Common.convertEnumToString = function (value, oEnum) {
            if (value === void 0) {
                return null;
            }
            var keys = Object.keys(oEnum);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (oEnum[key] === value) {
                    return key;
                }
            }
            return null;
        };
        /**
          * 添加枚举值
          * @concat: 是否用key和NAME和MODULE拼接作为key的值，默认true
          */
        Common.addEnumString = function (key, oEnum, concat) {
            if (concat === void 0) { concat = true; }
            if (oEnum.NAME) {
                if (oEnum[key]) {
                    throw Error("Common=> Duplicate Enum String " + oEnum.NAME + "[" + key + "]");
                }
                else if (concat == false) {
                    oEnum[key] = key;
                }
                else {
                    oEnum[key] = oEnum.NAME + "." + oEnum.MODULE + "." + key;
                }
            }
            else {
                throw Error("Common=> Invalid Enum Object");
            }
        };
        //=================================================
        // 字符串相关
        /**
          * 判断是否为数字
          */
        Common.isNumber = function (str) {
            if (typeof str == "number") {
                return true;
            }
            if (isNaN(parseInt(str)) == false) {
                return true;
            }
            return false;
        };
        /**
          * 判断这符串是否为空
          */
        Common.isStringInvalidOrEmpty = function (str) {
            if (typeof str == "number") {
                return false;
            }
            if (typeof str == "string" && str != "") {
                return false;
            }
            return true;
        };
        /**
          * 格式化字符串
          */
        Common.formatString = function (str, args) {
            for (var i = 0; i < args.length; i++) {
                str = str.replace("{$}", args[i]);
            }
            return str;
        };
        //=================================================
        // 数学相关
        /**
         * 返回绝对值
         */
        Common.abs = function (a) {
            if (a < 0) {
                return -a;
            }
            return a;
        };
        /**
         * 返回a与b中的较小值
         */
        Common.min = function (a, b) {
            if (b < a) {
                return b;
            }
            return a;
        };
        /**
         * 返回a与b中的较大值
         */
        Common.max = function (a, b) {
            if (a < b) {
                return b;
            }
            return a;
        };
        /**
          * 将 value 限制制于 min 和 max 之间
          */
        Common.clamp = function (value, min, max) {
            if (value < min) {
                return min;
            }
            else if (value > max) {
                return max;
            }
            return value;
        };
        /**
          * 返回四舍五入后的结果
          * 因各个平台实现的版本可能不一致，故自定义了此方法
          * @n: 保留小数位数，默认为0
          */
        Common.round = function (value, n) {
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
            else if (floatValue == 5) {
                var modValue = intValue % 2;
                if (modValue == 1 || modValue == -1) {
                    intValue += 1;
                }
            }
            // 还原小数点，并返回
            return intValue / Math.pow(10, n);
        };
        /**
          * 返回 >= min 且 < max 的随机整数
          */
        Common.random = function (min, max) {
            var value = suncom.Random.random() * (max - min);
            return Math.floor(value) + min;
        };
        //=================================================
        // 时间相关
        /**
          * 将参数转化为 Date
          * @date: 任何格式的时间参数，可以为字符串或时间戳
          * 支持的格式说明：
          * 1. 时间戳
          * 2. hh:mm:ss
          * 3. yyyy-MM-dd hh:mm:ss
          */
        Common.convertToDate = function (date) {
            if (date instanceof Date) {
                return date;
            }
            // 时间戳或字符串形式的时间戳
            if (Common.isNumber(date) == true) {
                return new Date(date.toString());
            }
            // 自定义格式
            if (typeof date == "string") {
                // 自定义时间格式 yyyy-MM-dd hh:mm:ss 或 hh:mm:ss
                var array = date.split(" ");
                var dates = array[0].split("-");
                var times = array[1].split(":");
                if (dates.length == 3 && times.length == 3) {
                    return new Date(Number(dates[0]), Number(dates[1]) - 1, Number(dates[2]), Number(times[0]), Number(times[1]), Number(times[2]));
                }
                return new Date(date);
            }
            throw Error("Convert Date Error:" + date);
        };
        /**
          * 时间累加
          * @datepart: yy, MM, ww, dd, hh, mm, ss, ms
          * @increment： 增量，可为负
          * @arg2: 时间参数
          */
        Common.dateAdd = function (datepart, increment, time) {
            var date = Common.convertToDate(time);
            //计算增量毫秒数
            if (datepart == "yy") {
                date.setFullYear(date.getFullYear() + increment);
            }
            else if (datepart == "MM") {
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
            if (datepart == "ww") {
                timestamp += increment * 7 * 24 * 3600 * 1000;
            }
            else if (datepart == "dd") {
                timestamp += increment * 24 * 3600 * 1000;
            }
            else if (datepart == "hh") {
                timestamp += increment * 3600 * 1000;
            }
            else if (datepart == "mm") {
                timestamp += increment * 60 * 1000;
            }
            else if (datepart == "ss") {
                timestamp += increment * 1000;
            }
            else if (datepart == "ms") {
                timestamp += increment;
            }
            return timestamp;
        };
        /**
          * 计算时间差
          * @datepart: yy, MM, ww, dd, hh, mm, ss, ms
          */
        Common.dateDiff = function (datepart, date, date2) {
            var d1 = Common.convertToDate(date);
            var d2 = Common.convertToDate(date2);
            var time = d1.valueOf();
            var time2 = d2.valueOf();
            if (datepart == "ms") {
                return time2 - time;
            }
            time = Math.floor(time / 1000);
            time2 = Math.floor(time2 / 1000);
            if (datepart == "ss") {
                return time2 - time;
            }
            time = Math.floor(time / 60);
            time2 = Math.floor(time2 / 60);
            if (datepart == "mm") {
                return time2 - time;
            }
            time = Math.floor(time / 60);
            time2 = Math.floor(time2 / 60);
            if (datepart == "hh") {
                return time2 - time;
            }
            time = Math.floor(time / 24);
            time2 = Math.floor(time2 / 24);
            if (datepart == "dd") {
                return time2 - time;
            }
            if (datepart == "ww") {
                //1970/1/1是星期四，故应当减去4天
                return Math.floor(((time2 - 4) - (time - 4)) / 7);
            }
            if (datepart == "MM") {
                return d2.getMonth() - d1.getMonth() + (d2.getFullYear() - d1.getFullYear()) * 12;
            }
            if (datepart == "yy") {
                return d2.getFullYear() - d1.getFullYear();
            }
            return 0;
        };
        /**
          * 格式化时间，支持：yy-MM-dd hh:mm:ss
          */
        Common.formatDate = function (str, time) {
            var date = Common.convertToDate(time);
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
        };
        //=================================================
        // 其它
        /**
          * 返回 MD5 加密后的串
          */
        Common.md5 = function (str) {
            // return new md5().hex_md5(str);
            throw Error("暂未实现");
        };
        /**
          * 生成 HTTP 签名
          */
        Common.createSign = function (params) {
            var keys = Object.keys(params).sort();
            var array = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key != "sign") {
                    array.push(key + "=" + params[key]);
                }
            }
            array.push("key=123456789012345678");
            return Common.md5(array.join("&"));
        };
        /**
         * Hash Id
         */
        Common.$hashId = 0;
        return Common;
    }());
    suncom.Common = Common;
})(suncom || (suncom = {}));
//# sourceMappingURL=Common.js.map