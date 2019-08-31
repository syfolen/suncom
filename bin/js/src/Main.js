// test Random
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
// test Dictionary
var dictionary = new suncom.Dictionary();
console.log(dictionary.get("name", "abc"));
dictionary.put("name", "AAA");
console.log(dictionary.get("name"));
dictionary.remove("name");
console.log(dictionary.get("name"));
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
//# sourceMappingURL=Main.js.map