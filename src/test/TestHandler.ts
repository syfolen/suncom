
module test {

    export class TestHandler {

        constructor() {
            console.log("TestHandler");
            
            const a = new A();
            const b = new B();
            const data: IData = { msg: 0 };

            let handler: suncom.Handler = suncom.Handler.create(a, a.test, [data]);
            handler.run();
            suncom.Test.expect(data.msg).toBe(1);

            data.msg = 0;
            handler = suncom.Handler.create(b, a.test, [data]);
            handler.run();
            suncom.Test.expect(data.msg).toBe(2);

            data.msg = 0;
            handler = suncom.Handler.create(a, a.test, [data]);
            handler.runWith({ msg: 5 });
            suncom.Test.expect(data.msg).toBe(6);
        }
    }

    class A {

        value: number = 1;

        test(data: IData, data2: IData): void {
            data.msg += this.value;
            if (data2) {
                data.msg += data2.msg;
            }
        }
    }

    class B {

        value: number = 2;

        test(data: IData, data2: IData): void {
            data.msg += this.value;
            if (data2) {
                data.msg += data2.msg;
            }
        }
    }

    interface IData {

        msg: number;
    }
}