
module suncom {

    /**
     * 全局常量或变量
     */
    export abstract class Global {

        /**
         * 运行环境
         */
        static readonly envMode: EnvMode = EnvMode.SIMULATOR;

        /**
         * 调试模式
         */
        static readonly debugMode: DebugMode = DebugMode.NORMAL | DebugMode.NATIVE | DebugMode.NETWORK | DebugMode.NETWORK_HEATBEAT | DebugMode.ENGINE | DebugMode.ENGINEER | DebugMode.DEBUG;

        /**
         * 设计分辨率
         */
        static readonly WIDTH: number = 1280;
        static readonly HEIGHT: number = 720;

        /**
         * 实际分辨率
         */
        static width: number = 1280;
        static height: number = 720;

        /**
         * 服务端地址
         */
        static readonly TCP_IP: string = "127.0.0.1";

        /**
         * 服务端端口
         */
        static readonly TCP_PORT: number = 0;

        /**
         * 游戏版本
         */
        static readonly VERSION: string = "1.0.0";
    }
}