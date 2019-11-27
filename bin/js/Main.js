setTimeout(function () {
    // test common
    console.log(suncom.Common.createHashId());
    console.log(suncom.Common.createHashId());
    console.log(suncom.Common.createHashId());
    console.log(suncom.Common.createHashId());
    console.log(suncom.Common.createHashId());
    var Main = /** @class */ (function () {
        function Main() {
        }
        return Main;
    }());
    console.log(suncom.Common.getClassName(Main));
    console.log(suncom.Common.getQualifiedClassName(new Main()));
    var TestEnum;
    (function (TestEnum) {
        TestEnum[TestEnum["A_0"] = 1] = "A_0";
    })(TestEnum || (TestEnum = {}));
    console.log(suncom.Common.convertEnumToString(1, TestEnum));
    var TestEnumObject = {
        NAME: "TestEnumObject",
        MODULE: "TestModule"
    };
    suncom.Common.addEnumString("TEST_0", TestEnumObject, true);
    suncom.Common.addEnumString("TEST_1", TestEnumObject, true);
    console.log(suncom.Common.isNumber("a"));
    console.log(suncom.Common.isNumber("0x01"));
    console.log(suncom.Common.isNumber("123"));
    console.log(suncom.Common.isNumber(null));
    console.log(suncom.Common.isNumber(void 0));
    console.log(suncom.Common.isNumber("11.5"));
    console.log(suncom.Common.isNumber(11.5));
    console.log(suncom.Common.isStringInvalidOrEmpty(null));
    console.log(suncom.Common.isStringInvalidOrEmpty(void 0));
    var s0 = new Main();
    console.log(suncom.Common.isStringInvalidOrEmpty(s0));
    console.log(suncom.Common.formatString("%s%d", ["a", 3]));
    console.log(suncom.Common.formatString$("{$}{$}", ["a", 3]));
    console.log(suncom.Common.abs(-1));
    console.log(suncom.Common.abs(1));
    console.log(suncom.Common.abs(-0));
    console.log(suncom.Common.abs(0));
    var reg0 = "0";
    var reg1 = "1";
    console.log(suncom.Common.min(reg1, reg0));
    console.log(suncom.Common.min(reg0, reg1));
    console.log(suncom.Common.max(reg1, reg0));
    console.log(suncom.Common.max(reg0, reg1));
    var reg2 = 2;
    var reg3 = 5;
    console.log(suncom.Common.min(reg3, reg2));
    console.log(suncom.Common.min(reg2, reg3));
    console.log(suncom.Common.max(reg3, reg2));
    console.log(suncom.Common.max(reg2, reg3));
    console.log(suncom.Common.clamp(0, reg2, reg3));
    console.log(suncom.Common.clamp(3, reg2, reg3));
    console.log(suncom.Common.clamp(7, reg2, reg3));
    console.log(suncom.Common.round(3.144, 2));
    console.log(suncom.Common.round(3.146, 2));
    console.log(suncom.Common.round(3.145, 2));
    console.log(suncom.Common.round(3.155, 2));
    console.log(suncom.Common.round(3.1451, 2));
    console.log(suncom.Common.round(3.1551, 2));
    var yes = false;
    var time = new Date();
    for (var i = 0; i < 1000000; i++) {
        if (suncom.Common.round(-3.1451) !== 100) {
            yes = true;
        }
    }
    console.log(new Date().valueOf() - time.valueOf());
    var time2 = new Date();
    for (var i = 0; i < 1000000; i++) {
        if (suncom.Common.$round(-3.1451) !== 100) {
            yes = true;
        }
    }
    console.log(new Date().valueOf() - time2.valueOf());
    console.log((1 / 3).toString());
    console.log((0.3333333 * 10).toString());
    console.log(3.145.toString());
    console.log(3.155.toString());
    console.log(3.1451.toString());
    console.log(3.1452.toString());
    console.log(suncom.Common.random(0, 2));
    console.log(suncom.Common.random(0, 2));
    console.log(suncom.Common.random(0, 2));
    console.log(suncom.Common.random(0, 2));
    console.log(suncom.Common.random(0, 2));
    console.log(suncom.Common.random(0, 2));
    console.log(suncom.Common.random(0, 2));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", new Date()));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate(new Date())));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate(new Date().valueOf())));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate("12:11:15")));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.convertToDate("1993-12-10 12:11:15")));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("yy", 31, "1993-12-10 12:11:15")));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("MM", 31, "1993-12-10 12:11:15")));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("dd", 31, "1993-12-10 12:11:15")));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("hh", 31, "1993-12-10 12:11:15")));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("mm", 31, "1993-12-10 12:11:15")));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ss", 31, "1993-12-10 12:11:15")));
    console.log(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss ms", suncom.Common.dateAdd("ms", 31, "1993-12-10 12:11:15")));
    // console.log(suncom.Common.createHttpSign({ a: 1, b: "yes" }));
    // test Random
    console.log(suncom.Random.random());
    console.log(suncom.Random.random());
    console.log(suncom.Random.random());
    console.log(suncom.Random.random());
    console.log(suncom.Random.random());
    // test Dictionary
    var dictionary = new suncom.Dictionary("id");
    var x = { id: 5 };
    var y = { id: 7 };
    var z = { id: 9, name: "yes" };
    var w = { id: 11, name: "no" };
    dictionary.put(z);
    dictionary.put(y);
    dictionary.put(x);
    dictionary.put(w);
    console.log(dictionary.getByPrimaryValue(5));
    console.log(dictionary.getByPrimaryValue(7));
    console.log(dictionary.getByValue("id", 5));
    console.log(dictionary.getByValue("name", "yes"));
    console.log(dictionary.getByValue("name", "a"));
    console.log(dictionary.getByValue("name", void 0));
    console.log(dictionary.getByValue("name", null));
    console.log(dictionary.getByValue("ok", void 0));
    console.log(dictionary.getByValue("ok", null));
    console.log(dictionary.getByValue("test", void 0));
    console.log(dictionary.getByValue("test", null));
    console.log(dictionary.remove(x));
    console.log(dictionary.removeByPrimaryValue(7));
    console.log(dictionary.removeByValue("name", void 0));
    console.log(dictionary.removeByValue("name", null));
    console.log(dictionary.removeByValue("name", "a"));
    console.log(dictionary.removeByValue("name", "yes"));
    // test Pool
    suncom.Pool.recover("item", {});
    console.log(suncom.Pool.getItem("item"));
    var A = /** @class */ (function () {
        function A(i) {
            this.i = i;
        }
        A.prototype.print = function (x, y) {
            console.log("print i:" + this.i, ", x:" + x, ", y:" + y);
        };
        return A;
    }());
    var a = suncom.Pool.getItemByClass("A", A, 5);
    console.log(a.i);
    // test handler
    var handler = new suncom.Handler(a, a.print, [6]);
    handler.run();
    handler.runWith(1);
    console.log(suncom.Common.getClassName(A));
}, 500);
//# sourceMappingURL=Main.js.map