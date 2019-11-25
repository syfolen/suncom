// test Random
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
// test Dictionary
setTimeout(function () {
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
    console.log(suncom.Common.formatString("%s{$}%d", ["a", 2, 3]));
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
    // test common
    console.log(suncom.Common.hashId);
    console.log(suncom.Common.hashId);
    console.log(suncom.Common.hashId);
    console.log(suncom.Common.hashId);
    console.log(suncom.Common.hashId);
    console.log(suncom.Common.getClassName(A));
    var TestEnum;
    (function (TestEnum) {
        TestEnum[TestEnum["A_0"] = 1] = "A_0";
    })(TestEnum || (TestEnum = {}));
    console.log(suncom.Common.convertEnumToString(1, TestEnum));
}, 500);
//# sourceMappingURL=Main.js.map