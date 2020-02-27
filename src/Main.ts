

setTimeout(() => {
	// test common
	console.log(suncom.Common.createHashId());
	console.log(suncom.Common.createHashId());
	console.log(suncom.Common.createHashId());
	console.log(suncom.Common.createHashId());
	console.log(suncom.Common.createHashId());

	class Main {

	}

	console.log(suncom.Common.getClassName(Main));
	console.log(suncom.Common.getQualifiedClassName(new Main()));

	enum TestEnum {
		A_0 = 1
	}
	console.log(suncom.Common.convertEnumToString(1, TestEnum));

	const TestEnumObject = {
		NAME: "TestEnumObject",
		MODULE: "TestModule"
	}
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

	const s0 = new Main() as any;
	console.log(suncom.Common.isStringInvalidOrEmpty(s0));

	console.log(suncom.Common.formatString("%s%d", ["a", 3]))
	console.log(suncom.Common.formatString$("{$}{$}", ["a", 3]))

	console.log(suncom.Common.abs(-1));
	console.log(suncom.Common.abs(1));
	console.log(suncom.Common.abs(-0));
	console.log(suncom.Common.abs(0));

	const reg0 = "0" as any;
	const reg1 = "1" as any;
	console.log(suncom.Common.min(reg1, reg0));
	console.log(suncom.Common.min(reg0, reg1));
	console.log(suncom.Common.max(reg1, reg0));
	console.log(suncom.Common.max(reg0, reg1));

	const reg2 = 2;
	const reg3 = 5
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

	// test HashMap
	const hashMap: suncom.HashMap<any> = new suncom.HashMap("id");

	const x = { id: 5 };
	const y = { id: 7 };
	const z = { id: 9, name: "yes" };
	const w = { id: 11, name: "no" };

	hashMap.put(z);
	hashMap.put(y);
	hashMap.put(x);
	hashMap.put(w);

	console.log(hashMap.getByPrimaryValue(5));
	console.log(hashMap.getByPrimaryValue(7));
	console.log(hashMap.getByValue("id", 5));
	console.log(hashMap.getByValue("name", "yes"));
	console.log(hashMap.getByValue("name", "a"));
	console.log(hashMap.getByValue("name", void 0));
	console.log(hashMap.getByValue("name", null));
	console.log(hashMap.getByValue("ok", void 0));
	console.log(hashMap.getByValue("ok", null));
	console.log(hashMap.getByValue("test", void 0));
	console.log(hashMap.getByValue("test", null));

	console.log(hashMap.remove(x));
	console.log(hashMap.removeByPrimaryValue(7));
	console.log(hashMap.removeByValue("name", void 0));
	console.log(hashMap.removeByValue("name", null));
	console.log(hashMap.removeByValue("name", "a"));
	console.log(hashMap.removeByValue("name", "yes"));

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

	console.log(suncom.Common.getClassName(A as any));

	suncom.Global.VERSION = "1.0.1";

	console.log(suncom.Common.compareVersion("1.0"));
	console.log(suncom.Common.compareVersion("1.0.0"));
	console.log(suncom.Common.compareVersion("1.0.1"));
	console.log(suncom.Common.compareVersion("1.0.2"));
	console.log(suncom.Common.compareVersion("1.1"));
	console.log(suncom.Common.compareVersion(void 0));
	console.log(suncom.Common.compareVersion("{"));

}, 500);