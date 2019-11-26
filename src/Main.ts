

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

	console.log(suncom.Common.createHttpSign({ a: 1, b: "yes" }));

	// test Random
	console.log(suncom.Random.random());
	console.log(suncom.Random.random());
	console.log(suncom.Random.random());
	console.log(suncom.Random.random());
	console.log(suncom.Random.random());

	// test Dictionary
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

}, 500);