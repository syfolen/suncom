
module test {

    export class TestEventSystem {

        constructor() {
            console.log("test EventSystem");
            const system:suncom.IEventSystem = new suncom.EventSystem();
            system.addEventListener("TEST", this.$func, this);

            const data: IData = { msg: 0 };
            system.dispatchEvent("TEST", [data, 1]);
            console.assert(data.msg === 1, `事件未成功回调`);
            system.dispatchEvent("TEST", data);
            console.assert(data.msg === 0, `事件未成功回调`);

            system.addEventListener("TEST", this.$func2, this, false, suncom.EventPriorityEnum.LAZY);
            system.dispatchEvent("TEST", data);
            console.assert(data.msg === 3, `事件优先级未生效`);
            system.removeEventListener("TEST", this.$func2, this);

            system.addEventListener("TEST", this.$func2, this, true, suncom.EventPriorityEnum.LAZY);
            system.dispatchEvent("TEST", data);
            console.assert(data.msg === 3, `一次性事件未生效`);
            system.dispatchEvent("TEST", data);
            console.assert(data.msg === 0, `一次性事件未移除`);

            system.removeEventListener("TEST", this.$func, this);
            system.addEventListener("TEST", this.$func3, this, false, suncom.EventPriorityEnum.HIGH);
            system.dispatchEvent("TEST", [data, 0, system], true);
            console.assert(data.msg === 0, `事件未能成功中断`);
        }

        private $func(data: IData, msg: number = 0): void {
            data.msg = msg;
        }

        private $func2(data: IData, msg: number = 3): void {
            data.msg = msg;
        }

        private $func3(data: IData, msg: number, system: suncom.IEventSystem): void {
            data.msg = 0;
            system.dispatchCancel();
        }

    }

    interface IData {

        msg: number;
    }
}