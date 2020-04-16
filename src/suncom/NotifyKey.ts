
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
    }
}