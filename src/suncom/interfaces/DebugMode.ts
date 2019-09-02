
module suncom {

    /**
     * 调试模式
     */
    export enum DebugMode {
        /**
         * 调试信息
         */
        DEBUG = 0x1,

        /**
         * 工程模式
         */
        ENGINEER = 0x02,

        /**
         * 框架
         */
        ENGINE = 0x4,

        /**
         * 原生
         */
        NATIVE = 0x8,

        /**
         * 网络
         */
        NETWORK = 0x10,

        /**
         * 网络心跳
         */
        NETWORK_HEARTBEAT = 0x20,

        /**
         * 普通
         */
        NORMAL = 0x40
    }
}