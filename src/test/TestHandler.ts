
module test {

    export class TestHandler {

        constructor() {
            console.log("test Handler");

            const a = new A();
            const b = new B();
            const data: IData = { msg: 0 };

            let handler: suncom.IHandler = suncom.Handler.create(a, a.test, [data]);
            handler.run();
            console.assert(data.msg === 1, `执行器运行未成功`);

            data.msg = 0;
            handler = suncom.Handler.create(b, a.test, [data]);
            handler.run();
            console.assert(data.msg === 2, `执行器作用域未绑定成功`);

            data.msg = 0;
            handler = suncom.Handler.create(a, a.test, [data]);
            handler.runWith({ msg: 5 });
            console.assert(data.msg === 6, `执行器传参未成功`);
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