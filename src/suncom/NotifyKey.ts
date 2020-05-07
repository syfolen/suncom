
module suncom {
    /**
     * 命令定义
     * export
     */
    export namespace NotifyKey {
        /**
         * 输出打印日志 { text: string }
         * 说明：
         * 1. 此事件仅在Global.debugMode为DebugMode.DEBUG时才会被派发
         * export
         */
        export const DEBUG_PRINT: string = "suncom.NotifyKey.DEBUG_PRINT";

        /**
         * 测试等待信号 { id: number, handler: suncom.IHandler = null}
         * export
         */
        export const TEST_WAIT: string = "suncom.NotifyKey.TEST_WAIT";

        /**
         * 测试发射信号 { id: number, args?: any }
         * export
         */
        export const TEST_EMIT: string = "suncom.NotifyKey.TEST_EMIT";

        /**
         * 测试发送事件 { id: number, act: string, out: suncore.ITestSeqInfo }
         * @act: "exe" or "reg", exe为执行点击行为，reg为注册点击行为
         * export
         */
        export const TEST_EVENT: string = "suncom.NotifyKey.TEST_EVENT";

        /**
         * 测试下行协议 { id: number, act: string, out: suncore.ITestSeqInfo }
         * @act: "exe" or "reg", exe为执行下行行为，reg为注册下行行为
         * export
         */
        export const TEST_PROTOCAL: string = "suncom.NotifyKey.TEST_PROTOCAL";

        /**
         * 测试注册按钮事件 { id: number, button?: any, once: boolean = true }
         * export
         */
        export const TEST_REG_BUTTON: string = "suncom.NotifyKey.TEST_REG_BUTTON";

        /**
         * 测试点击按钮事件 { btnId: number, type: string | Laya.Event = Laya.Event.CLICK }
         * export
         */
        export const TEST_CLICK_BUTTON: string = "suncom.NotifyKey.TEST_CLICK_BUTTON";
    }
}