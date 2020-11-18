
module test {

    export class TestEventSystem {

        constructor() {
            console.log("TestEventSystem");
            
            const system: suncom.EventSystem = new suncom.EventSystem();
            system.addEventListener("TEST", this.$func, this);

            const data: IData = { msg: 0 };
            system.dispatchEvent("TEST", [data, 1]);
            suncom.Test.expect(data.msg).toBe(1);
            system.dispatchEvent("TEST", data);
            suncom.Test.expect(data.msg).toBe(0);

            system.addEventListener("TEST", this.$func2, this, false, suncom.EventPriorityEnum.LOWEST);
            system.dispatchEvent("TEST", data);
            suncom.Test.expect(data.msg).toBe(3);
            system.removeEventListener("TEST", this.$func2, this);

            system.addEventListener("TEST", this.$func2, this, true, suncom.EventPriorityEnum.LOWEST);
            system.dispatchEvent("TEST", data);
            suncom.Test.expect(data.msg).toBe(3);
            system.dispatchEvent("TEST", data);
            suncom.Test.expect(data.msg).toBe(0);

            system.removeEventListener("TEST", this.$func, this);
            system.addEventListener("TEST", this.$func3, this, false, suncom.EventPriorityEnum.HIGH);
            system.dispatchEvent("TEST", [data, 0, system], true);
            suncom.Test.expect(data.msg).toBe(0);
        }

        private $func(data: IData, msg: number = 0): void {
            data.msg = msg;
        }

        private $func2(data: IData, msg: number = 3): void {
            data.msg = msg;
        }

        private $func3(data: IData, msg: number, system: suncom.EventSystem): void {
            data.msg = 0;
            system.dispatchCancel();
        }

    }

    interface IData {

        msg: number;
    }
}