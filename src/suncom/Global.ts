
module suncom {
    /**
     * 全局常量或变量
     * export
     */
    export abstract class Global {
        /**
         * 运行环境
         * export
         */
        static readonly envMode: EnvMode = EnvMode.SIMULATOR;

        /**
         * 调试模式
         * export
         */
        static readonly debugMode: DebugMode = DebugMode.NORMAL | DebugMode.NATIVE | DebugMode.NETWORK | DebugMode.NETWORK_HEARTBEAT | DebugMode.ENGINE | DebugMode.ENGINEER | DebugMode.DEBUG;

        /**
         * 设计分辨率
         * export
         */
        static readonly WIDTH: number = 1280;

        /**
         * 设计分辨率
         * export
         */
        static readonly HEIGHT: number = 720;

        /**
         * 实际分辨率
         * export
         */
        static width: number = 1280;

        /**
         * 实际分辨率
         * export
         */
        static height: number = 720;

        /**
         * 游戏版本
         * export
         */
        static readonly VERSION: string = "1.0.0";
    }
}