
module test {

    class Abc {

        func() {

        }
    }

    enum TestEnum {
        A_0 = 1
    }

    function TestFunc(): void {

    }

    export class TestCommon {

        constructor() {
            console.log("test common");

            console.assert(suncom.Common.getClassName(Abc) === "Abc", `获取的类名不正确`);
            console.assert(suncom.Common.getQualifiedClassName(new Abc()) === "Abc", `获取的类名不正确`);

            console.assert(suncom.Common.getMethodName(TestFunc) === "TestFunc", `获取的方法名结果不正确`);

            const abc = new Abc();
            console.assert(suncom.Common.getMethodName(abc.func, abc) === "func", `获取类的方法名结果不正确`);

            console.assert(suncom.Common.convertEnumToString(TestEnum.A_0, TestEnum) === "A_0", `获取枚举名称失败`);

            console.assert(suncom.Common.isNumber("a") === false, `a不是数字`);
            console.assert(suncom.Common.isNumber("0x01") === true, `0x01应该为数字`);
            console.assert(suncom.Common.isNumber("123") === true, `123应该为数字`);
            console.assert(suncom.Common.isNumber(null) === false, `null应该不为数字`);
            console.assert(suncom.Common.isNumber(void 0) === false, `void 0应该不为数字`);
            console.assert(suncom.Common.isNumber("11.5") === true, `11.5应该为数字`);
            console.assert(suncom.Common.isNumber(11.6) === true, `11.6应该为数字`);

            console.assert(suncom.Common.isStringInvalidOrEmpty("") === true, `""理应为无效字符串`);
            console.assert(suncom.Common.isStringInvalidOrEmpty("null") === false, `"null"理应为有效字符串`);
            console.assert(suncom.Common.isStringInvalidOrEmpty(null) === true, `null理应为无效字符串`);
            console.assert(suncom.Common.isStringInvalidOrEmpty(void 0) === true, `void 0理应为无效字符串`);
            console.assert(suncom.Common.isStringInvalidOrEmpty(abc as any) === true, "Abc的实例不应该为字符串");

            console.assert(suncom.Common.formatString("%s%d", ["a", 3]) === "a3", `替换字符串失败`);
            console.assert(suncom.Common.formatString$("{$}{$}", ["a", 3]) === "a3", "替换字符串失败");
            console.assert(suncom.Common.formatString("%s%d", ["%d", 3]) === "%d3", `替换字符串失败`);
            console.assert(suncom.Common.formatString$("{$}{$}", ["{$}", 3]) === "{$}3", "替换字符串失败");

            console.assert(suncom.Common.clamp(0, 2, 5) === 2, `clamp结果有误`);
            console.assert(suncom.Common.clamp(3, 2, 5) === 3, `clamp结果有误`);
            console.assert(suncom.Common.clamp(7, 2, 5) === 5, `clamp结果有误`);

            console.assert(suncom.Common.round(3.144, 2) === 3.14, `四舍五入与预期不符`);
            console.assert(suncom.Common.round(3.146, 2) === 3.15, `四舍五入与预期不符`);
            console.assert(suncom.Common.round(3.145, 2) === 3.14, `5后无数，5前为偶，应当不进`);
            console.assert(suncom.Common.round(3.155, 2) === 3.16, `5后无数，5前为奇，应当进1`);
            console.assert(suncom.Common.round(3.1451, 2) === 3.15, `5后有数，应当进1`);
            console.assert(suncom.Common.round(3.1551, 2) === 3.16, `5后有数，应当进1`);

            // console.log(suncom.Common.$round(3.144, 2));
            // console.log(suncom.Common.$round(3.146, 2));
            // console.log(suncom.Common.$round(3.145, 2));
            // console.log(suncom.Common.$round(3.155, 2));
            // console.log(suncom.Common.$round(3.1451, 2));
            // console.log(suncom.Common.$round(3.1551, 2));

            // console.log("---------------");

            // console.log(Math.round(3.144 * 100) / 100);
            // console.log(Math.round(3.146 * 100) / 100);
            // console.log(Math.round(3.145 * 100) / 100);
            // console.log(Math.round(3.155 * 100) / 100);
            // console.log(Math.round(3.1451 * 100) / 100);
            // console.log(Math.round(3.1551 * 100) / 100);

            // console.log("---------------");

            // 1.15+1.25+1.35+1.45=5.2
            // console.log(suncom.Common.round(1.15, 1) + suncom.Common.round(1.25, 1) + suncom.Common.round(1.35, 1) + suncom.Common.round(1.45, 1));
            // console.log(suncom.Common.$round(1.15, 1) + suncom.Common.$round(1.25, 1) + suncom.Common.$round(1.35, 1) + suncom.Common.$round(1.45, 1));
            // console.log((Math.round(1.15 * 10) / 10) + (Math.round(1.25 * 10) / 10) + (Math.round(1.35 * 10) / 10) + (Math.round(1.45 * 10) / 10));

            let yes: boolean = false;
            const time = new Date();
            for (let i = 0; i < 1000000; i++) {
                if (suncom.Common.round(-3.1451) !== 100) {
                    yes = true;
                }
            }
            console.log(new Date().valueOf() - time.valueOf());
            const time2 = new Date();
            for (let i = 0; i < 1000000; i++) {
                if (suncom.Common.$round(-3.1451) !== 100) {
                    yes = true;
                }
            }
            console.log(new Date().valueOf() - time2.valueOf());
            const time3 = new Date();
            for (let i = 0; i < 1000000; i++) {
                if (Math.round(-3.1451) !== 100) {
                    yes = true;
                }
            }
            console.log(new Date().valueOf() - time3.valueOf());

            // console.log(suncom.Common.random(0, 2));
            // console.log(suncom.Common.random(0, 2));
            // console.log(suncom.Common.random(0, 2));
            // console.log(suncom.Common.random(0, 2));
            // console.log(suncom.Common.random(0, 2));
            // console.log(suncom.Common.random(0, 2));
            // console.log(suncom.Common.random(0, 2));

            console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", new Date()));
            console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate(new Date())));
            console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate(new Date().valueOf())));
            console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate("12:11:15")));
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate("1993-12-10 12:11:15")) === "1993-12-10 12:11:15 0", `时间转化有误`);

            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("yy", 31, "1993-12-10 12:11:15")) === "2024-12-10 12:11:15 0", `年累加有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("MM", 31, "1993-12-10 12:11:15")) === "1996-07-10 12:11:15 0", `月累加有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("dd", 31, "1993-12-10 12:11:15")) === "1994-01-10 12:11:15 0", `日累加有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("hh", 31, "1993-12-10 12:11:15")) === "1993-12-11 19:11:15 0", `时累加有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("mm", 31, "1993-12-10 12:11:15")) === "1993-12-10 12:42:15 0", `分累加有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ss", 31, "1993-12-10 12:11:15")) === "1993-12-10 12:11:46 0", `秒累加有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ms", 31, "1993-12-10 12:11:15")) === "1993-12-10 12:11:15 31", `毫秒累加有误`);

            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("yy", -31, "1993-12-10 12:11:15")) === "1962-12-10 12:11:15 0", `年减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("MM", -31, "1993-12-10 12:11:15")) === "1991-05-10 12:11:15 0", `月减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("dd", -31, "1993-12-10 12:11:15")) === "1993-11-09 12:11:15 0", `日减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("hh", -31, "1993-12-10 12:11:15")) === "1993-12-09 05:11:15 0", `时减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("mm", -31, "1993-12-10 12:11:15")) === "1993-12-10 11:40:15 0", `分减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ss", -31, "1993-12-10 12:11:15")) === "1993-12-10 12:10:44 0", `秒减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ms", -31, "1993-12-10 12:11:15")) === "1993-12-10 12:11:14 969", `毫秒减少有误`);

            // console.log(suncom.Common.createHttpSign({ a: 1, b: "yes" }));

            console.assert(suncom.Common.getFileName("http://url.xx") === "url", `文件名获取有误，应当为url`);
            console.assert(suncom.Common.getFileExtension("http://url.xx") === "xx", `文件名扩展名获取有误，应当为xx`);
            console.assert(suncom.Common.getFileExtension("http://url") === null, `文件名扩展名获取有误，应当为null`);
            console.assert(suncom.Common.replacePathExtension("http://url.xx", "abc") === "http://url.abc", `文件名替换失败`);

            const array: number[] = [1, 3, 5, 6, 7];

            const x: number = suncom.Common.findFromArray(array, (i) => {
                if (i === 1) {
                    return true;
                }
                return false;
            }, null) as number;
            console.assert(x === 1, `findFromArray执行有误`)

            const out: number[] = [];
            suncom.Common.findFromArray(array, (i) => {
                if (i % 2 === 1) {
                    return true;
                }
                return false;
            }, out);
            this.$aEqualsB(out, [1, 3, 5, 7]);

            suncom.Common.removeItemFromArray(1, array);
            this.$aEqualsB(array, [3, 5, 6, 7]);

            suncom.Common.removeItemsFromArray([3, 5, 6], array);
            this.$aEqualsB(array, [7]);

            suncom.Global.VERSION = "1.0.1";

            console.assert(suncom.Common.compareVersion("1.0") === 1, `版本号比较结果有误`);
            console.assert(suncom.Common.compareVersion("1.0.0") === 1, `版本号比较结果有误`);
            console.assert(suncom.Common.compareVersion("1.0.1") === 0, `版本号比较结果有误`);
            console.assert(suncom.Common.compareVersion("1.0.2") === -1, `版本号比较结果有误`);
            console.assert(suncom.Common.compareVersion("1.1") === -1, `版本号比较结果有误`);
            console.assert(suncom.Common.compareVersion(void 0) === 0, `版本号比较结果有误`);
            console.assert(suncom.Common.compareVersion("{") === 0, `版本号比较结果有误`);
        }

        private $aEqualsB<T>(a: T[], b: T[]): void {
            a = a.slice();
            b = b.slice();
            a.sort();
            b.sort();
            console.assert(a.length === b.length, `当前：[${a.join(",")}], 预期：[${b.join(",")}]`);
            for (let i = 0; i < a.length; i++) {
                console.assert(a[i] === b[i], `当前：[${a.join(",")}], 预期：[${b.join(",")}]`);
            }
        }
    }
}