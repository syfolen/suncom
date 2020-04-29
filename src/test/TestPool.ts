
module test {

    export class TestPool {

        constructor() {
            console.log("TestPool");
            
            const a = suncom.Pool.getItemByClass("A", A);
            suncom.Test.expect(a).toBeInstanceOf(A);

            suncom.Pool.recover("A", a);
            suncom.Test.assertTrue(a["__suncom__$__inPool__"]);
            suncom.Pool.recover("A", a);

            suncom.Test.expect(suncom.Pool.getItem("A")).toBe(a);
            suncom.Test.expect(suncom.Pool.getItem("A")).toBeNull();

            suncom.Pool.recover("A", a);
            suncom.Pool.clear("A");
            suncom.Test.expect(suncom.Pool.getItem("A")).toBeNull();
        }
    }

    class A {

        data: number = 5;

        constructor() {

        }
    }
}