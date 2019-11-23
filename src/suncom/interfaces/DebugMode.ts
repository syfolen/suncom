
module suncom {
    /**
     * 调试模式
     * export
     */
    export enum DebugMode {
        /**
         * 调试信息
         * export
         */
        DEBUG = 0x1,

        /**
         * 工程模式
         * export
         */
        ENGINEER = 0x02,

        /**
         * 框架
         * export
         */
        ENGINE = 0x4,

        /**
         * 原生
         * export
         */
        NATIVE = 0x8,

        /**
         * 网络
         * export
         */
        NETWORK = 0x10,

        /**
         * 网络心跳
         * export
         */
        NETWORK_HEARTBEAT = 0x20,

        /**
         * 普通
         * export
         */
        NORMAL = 0x40
    }
}