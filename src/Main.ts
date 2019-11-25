
// test Random
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());
console.log(suncom.Random.random());

// test Dictionary
setTimeout(() => {
	const dictionary: suncom.IDictionary<any> = new suncom.Dictionary("id");

	const x = { id: 5 };
	const y = { id: 7 };
	const z = { id: 9, name: "yes" };
	const w = { id: 11, name: "no" };

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

	console.log(suncom.Common.formatString("%s{$}%d", ["a", 2, 3]))

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

	const a = suncom.Pool.getItemByClass("A", A, 5) as A;
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

}, 500);