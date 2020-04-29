
module test {

    export class TestPool {

        constructor() {
            console.log("test pool");

            const a = suncom.Pool.getItemByClass("A", A);
            console.assert(a instanceof A, `对象池创建对象失败`);

            suncom.Pool.recover("A", a);
            console.assert(a["__suncom__$__inPool__"] === true, `存储对象失败`);
            suncom.Pool.recover("A", a);

            const b = suncom.Pool.getItem("A");
            console.assert(a === b, `获取对象失败`);

            const c = suncom.Pool.getItem("A");
            console.assert(c === null, `存储对象未排重`);

            suncom.Pool.recover("A", a);
            suncom.Pool.clear("A");
            console.assert(suncom.Pool.getItem("A") === null, `清理对象失败`);
        }
    }

    class A {

        data: number = 5;

        constructor() {

        }
    }
}