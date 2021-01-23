
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
            console.log("TestCommon");

            suncom.Test.expect(suncom.Common.getClassName(Abc)).toBe("Abc");
            suncom.Test.expect(suncom.Common.getQualifiedClassName(new Abc())).toBe("Abc");
            suncom.Test.expect(suncom.Common.getMethodName(TestFunc)).toBe("TestFunc");

            const abc = new Abc();
            suncom.Test.expect(suncom.Common.getMethodName(abc.func, abc)).toBe("func");
            suncom.Test.expect(suncom.Common.convertEnumToString(TestEnum.A_0, TestEnum)).toBe("A_0");

            suncom.Test.assertFalse(suncom.Mathf.isNumber("a"));
            suncom.Test.assertTrue(suncom.Mathf.isNumber("0x01"));
            suncom.Test.assertTrue(suncom.Mathf.isNumber("123"));
            suncom.Test.assertFalse(suncom.Mathf.isNumber(null));
            suncom.Test.assertFalse(suncom.Mathf.isNumber(void 0));
            suncom.Test.assertTrue(suncom.Mathf.isNumber("11.5"));
            suncom.Test.assertTrue(suncom.Mathf.isNumber(11.6));
            suncom.Test.assertFalse(suncom.Mathf.isNumber(abc as any));

            suncom.Test.assertTrue(suncom.Common.isStringNullOrEmpty(""));
            suncom.Test.assertFalse(suncom.Common.isStringNullOrEmpty("null"));
            suncom.Test.assertTrue(suncom.Common.isStringNullOrEmpty(null));
            suncom.Test.assertTrue(suncom.Common.isStringNullOrEmpty(void 0));
            suncom.Test.assertTrue(suncom.Common.isStringNullOrEmpty(abc as any));

            suncom.Test.expect(suncom.Common.formatString("{0}{1}", ["a", 3])).toBe("a3");
            suncom.Test.expect(suncom.Common.formatString("{0}{1}", ["{1}", 3])).toBe("{1}3");
            suncom.Test.expect(suncom.Common.formatString("{0}{1}{2}", ["{1}", 3])).toBe("{1}3{2}");

            suncom.Test.expect(suncom.Mathf.clamp(0, 2, 5)).toBe(2);
            suncom.Test.expect(suncom.Mathf.clamp(3, 2, 5)).toBe(3);
            suncom.Test.expect(suncom.Mathf.clamp(7, 2, 5)).toBe(5);

            suncom.Test.expect(suncom.Mathf.round(3.144, 2)).toBe(3.14);
            suncom.Test.expect(suncom.Mathf.round(3.146, 2)).toBe(3.15);
            suncom.Test.expect(suncom.Mathf.round(3.145, 2)).toBe(3.14);
            suncom.Test.expect(suncom.Mathf.round(3.155, 2)).toBe(3.16);
            suncom.Test.expect(suncom.Mathf.round(3.1451, 2)).toBe(3.15);
            suncom.Test.expect(suncom.Mathf.round(3.1551, 2)).toBe(3.16);

            // console.log(suncom.Mathf.$round(3.144, 2));
            // console.log(suncom.Mathf.$round(3.146, 2));
            // console.log(suncom.Mathf.$round(3.145, 2));
            // console.log(suncom.Mathf.$round(3.155, 2));
            // console.log(suncom.Mathf.$round(3.1451, 2));
            // console.log(suncom.Mathf.$round(3.1551, 2));

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

            // let yes: boolean = false;
            // const time = new Date();
            // for (let i = 0; i < 1000000; i++) {
            //     if (suncom.Common.round(-3.1451) !== 100) {
            //         yes = true;
            //     }
            // }
            // console.log(new Date().valueOf() - time.valueOf());
            // const time2 = new Date();
            // for (let i = 0; i < 1000000; i++) {
            //     if (suncom.Common.$round(-3.1451) !== 100) {
            //         yes = true;
            //     }
            // }
            // console.log(new Date().valueOf() - time2.valueOf());
            // const time3 = new Date();
            // for (let i = 0; i < 1000000; i++) {
            //     if (Math.round(-3.1451) !== 100) {
            //         yes = true;
            //     }
            // }
            // console.log(new Date().valueOf() - time3.valueOf());

            console.log(suncom.Mathf.random(0, 2));
            console.log(suncom.Mathf.random(0, 2));
            console.log(suncom.Mathf.random(0, 2));
            console.log(suncom.Mathf.random(0, 2));
            console.log(suncom.Mathf.random(0, 2));
            console.log(suncom.Mathf.random(0, 2));
            console.log(suncom.Mathf.random(0, 2));

            console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", new Date()));
            console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate(new Date())));
            console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate(new Date().valueOf())));
            console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate("12:11:15")));
            suncom.Test.expect(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate("1993-12-10 12:11:15"))).toBe("1993-12-10 12:11:15 0");

            suncom.Test.expect(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("yy", 31, "1993-12-10 12:11:15"))).toBe("2024-12-10 12:11:15 0");
            suncom.Test.expect(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("MM", 31, "1993-12-10 12:11:15"))).toBe("1996-07-10 12:11:15 0");
            suncom.Test.expect(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("dd", 31, "1993-12-10 12:11:15"))).toBe("1994-01-10 12:11:15 0");
            suncom.Test.expect(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("hh", 31, "1993-12-10 12:11:15"))).toBe("1993-12-11 19:11:15 0");
            suncom.Test.expect(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("mm", 31, "1993-12-10 12:11:15"))).toBe("1993-12-10 12:42:15 0");
            suncom.Test.expect(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ss", 31, "1993-12-10 12:11:15"))).toBe("1993-12-10 12:11:46 0");
            suncom.Test.expect(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ms", 31, "1993-12-10 12:11:15"))).toBe("1993-12-10 12:11:15 31");

            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("yy", -31, "1993-12-10 12:11:15")) === "1962-12-10 12:11:15 0", `年减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("MM", -31, "1993-12-10 12:11:15")) === "1991-05-10 12:11:15 0", `月减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("dd", -31, "1993-12-10 12:11:15")) === "1993-11-09 12:11:15 0", `日减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("hh", -31, "1993-12-10 12:11:15")) === "1993-12-09 05:11:15 0", `时减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("mm", -31, "1993-12-10 12:11:15")) === "1993-12-10 11:40:15 0", `分减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ss", -31, "1993-12-10 12:11:15")) === "1993-12-10 12:10:44 0", `秒减少有误`);
            console.assert(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ms", -31, "1993-12-10 12:11:15")) === "1993-12-10 12:11:14 969", `毫秒减少有误`);

            // console.log(suncom.Common.createHttpSign({ a: 1, b: "yes" }));

            suncom.Test.expect(suncom.Common.getFileName("http://url.xx")).toBe("url");
            suncom.Test.expect(suncom.Common.getFileExtension("http://url.xx")).toBe("xx");
            suncom.Test.expect(suncom.Common.getFileExtension("http://url")).toBeNull();
            suncom.Test.expect(suncom.Common.replacePathExtension("http://url.xx", "abc")).toBe("http://url.abc");

            const array: number[] = [1, 3, 5, 6, 7];

            const x: number = suncom.Common.findInArray(array, (i) => {
                if (i === 1) {
                    return true;
                }
                return false;
            }, null);
            suncom.Test.expect(x).toBe(1)

            const out: number[] = [];
            suncom.Common.findInArray(array, (i) => {
                if (i % 2 === 1) {
                    return true;
                }
                return false;
            }, out);
            suncom.Test.expect(out).toEqual([1, 3, 5, 7]);

            suncom.Common.removeItemFromArray(1, array);
            suncom.Test.expect(array).toEqual([3, 5, 6, 7]);

            suncom.Common.removeItemsFromArray([3, 5, 6], array);
            suncom.Test.expect(array).toEqual([7]);

            // suncom.Common.createPrefab("test.json");

            const forClone: any = {
                a: 2,
                b: [1, 2, 3],
                c: {
                    a: 5
                },
                d: true
            }

            const cloneObj: any = suncom.Common.clone(forClone);
            suncom.Test.expect(Object.keys(cloneObj).length).toBe(Object.keys(forClone).length);
            suncom.Test.expect(cloneObj["a"]).toBe(0);
            suncom.Test.expect(cloneObj["b"]).toBeInstanceOf(Array);
            suncom.Test.expect(cloneObj["b"].length).toBe(0);
            suncom.Test.expect(cloneObj["c"]).toBeNull();
            suncom.Test.expect(cloneObj["d"]).toBe(false);

            const copyObj: any = suncom.Common.copy(forClone);
            suncom.Test.expect(Object.keys(cloneObj).length).toBe(Object.keys(forClone).length);
            suncom.Test.assertTrue(forClone["a"] === copyObj["a"]);
            suncom.Test.assertTrue(forClone["b"] === copyObj["b"]);
            suncom.Test.assertTrue(forClone["c"] === copyObj["c"]);
            suncom.Test.assertTrue(forClone["d"] === copyObj["d"]);

            const deepCopyObj: any = suncom.Common.copy(forClone, true);
            suncom.Test.assertTrue(forClone["a"] === deepCopyObj["a"]);
            suncom.Test.assertFalse(forClone["b"] === deepCopyObj["b"]);
            suncom.Test.expect(forClone["b"]).toEqual(deepCopyObj["b"]);
            suncom.Test.assertFalse(forClone["c"] === deepCopyObj["c"]);
            suncom.Test.expect(forClone["c"]).toEqual(deepCopyObj["c"]);
            suncom.Test.expect(forClone["c"]).toStrictEqual(deepCopyObj["c"]);
            suncom.Test.assertTrue(forClone["d"] === deepCopyObj["d"]);

            suncom.Global.VERSION = "1.0.1";

            suncom.Test.expect(suncom.Common.compareVersion("1.0")).toBe(1);
            suncom.Test.expect(suncom.Common.compareVersion("1.0.0")).toBe(1);
            suncom.Test.expect(suncom.Common.compareVersion("1.0.1")).toBe(0);
            suncom.Test.expect(suncom.Common.compareVersion("1.0.2")).toBe(-1);
            suncom.Test.expect(suncom.Common.compareVersion("1.1")).toBe(-1);
            suncom.Test.expect(suncom.Common.compareVersion(void 0)).toBe(0);
            suncom.Test.expect(suncom.Common.compareVersion("{")).toBe(0);
        }
    }
}