// // test Random
// console.log(suncom.Random.random());
// console.log(suncom.Random.random());
// console.log(suncom.Random.random());
// console.log(suncom.Random.random());
// console.log(suncom.Random.random());
// // test Dictionary
// const dictionary: suncom.IDictionary = new suncom.Dictionary();
// console.log(dictionary.get("name", "abc"));
// dictionary.put("name", "AAA");
// console.log(dictionary.get("name"));
// dictionary.remove("name");
// console.log(dictionary.get("name"));
// // test Pool
// suncom.Pool.recover("item", {});
// console.log(suncom.Pool.getItem("item"));
// class A {
// 	i: number;
// 	constructor(i: number) {
// 		this.i = i;
// 	}
// 	print(x: number, y: number): void {
// 		console.log("print i:" + this.i, ", x:" + x, ", y:" + y);
// 	}
// }
// const a: A = suncom.Pool.getItemByClass("A", A, 5);
// console.log(a.i);
// // test handler
// const handler: suncom.IHandler = new suncom.Handler(a, a.print, [6]);
// handler.run();
// handler.runWith(1);
// // test common
// console.log(suncom.Common.hashId);
// console.log(suncom.Common.hashId);
// console.log(suncom.Common.hashId);
// console.log(suncom.Common.hashId);
// console.log(suncom.Common.hashId);
// console.log(suncom.Common.getClassName(A as any));
// enum TestEnum {
// 	A_0 = 1
// }
// console.log(suncom.Common.convertEnumToString(1, TestEnum));
setTimeout(function () {
    var queue = new suncom.Queue();
    var length = 100000;
    for (var i = 0; i < length; i++) {
        queue.push(i);
    }
    while (queue.size > 0) {
        queue.pop();
    }
    var time;
    time = new Date().valueOf();
    for (var i = 0; i < 100; i++) {
        for (var i_1 = 0; i_1 < length; i_1++) {
            queue.push(i_1);
        }
        while (queue.size > 0) {
            queue.pop();
        }
    }
    console.log(new Date().valueOf() - time);
    var array = [];
    time = new Date().valueOf();
    for (var i = 0; i < 1; i++) {
        for (var i_2 = 0; i_2 < length; i_2++) {
            array.push(i_2);
        }
        while (array.length > 0) {
            array.pop();
        }
    }
    console.log(new Date().valueOf() - time);
}, 1000);
//# sourceMappingURL=Main.js.map