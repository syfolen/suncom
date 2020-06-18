
module suncom {
    /**
     * 命令定义
     * export
     */
    export namespace NotifyKey {

        /**
         * 测试事件
         * 说明：
         * 1. 参数不定
         * export
         */
        export const TEST_EVENT: string = "suncom.NotifyKey.TEST_EVENT";

        /**
         * 测试上行协议 { id: number, act: string, out: suncore.ITestSeqInfo }
         * @act: "exe" or "reg", exe为执行下行行为，reg为注册下行行为
         * export
         */
        export const TEST_RECV: string = "suncom.NotifyKey.TEST_RECV";

        /**
         * 移除所有测试按钮和处于等待的测试信号 { none }
         * export
         */
        export const REMOVE_ALL_BUTTONS_AND_SIGNALS: string = "suncom.NotifyKey.REMOVE_ALL_BUTTONS_AND_SIGNALS";

        /**
         * 用例测试完成 { none }
         * export
         */
        export const TEST_CASE_DONE: string = "suncom.NotifyKey.TEST_CASE_DONE";
    }
}