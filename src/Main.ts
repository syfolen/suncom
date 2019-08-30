
// test Random
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());

// test Dictionary
const dictionary: suncom.IDictionary = new suncom.Dictionary();
console.log(dictionary.get("name", "abc"));
dictionary.put("name", "AAA");
console.log(dictionary.get("name"));
dictionary.remove("name");
console.log(dictionary.get("name"));

// test Pool
suncom.Pool.recover("item", {});
console.log(suncom.Pool.getItem("item"));

class A {
	i: number;
	constructor(i: number) {
		this.i = i;
	}
	print(x: number, y: number): void {
		console.log("print i:" + this.i, ", x:" + x, ", y:" + y);
	}
}

const a: A = suncom.Pool.getItemByClass("A", A, 5);
console.log(a.i);

// test handler
const handler: suncom.IHandler = new suncom.Handler(a, a.print, [6]);
handler.run();
handler.runWith(1);

// test common
console.log(suncom.Common.hashId);
console.log(suncom.Common.hashId);
console.log(suncom.Common.hashId);
console.log(suncom.Common.hashId);
console.log(suncom.Common.hashId);

console.log(suncom.Common.getClassName(A as any));

enum TestEnum {
	A_0 = 1
}
console.log(suncom.Common.convertEnumToString(1, TestEnum));
