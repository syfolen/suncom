
module suncom {
    /**
     * 调试模式，主要用于控制LOG的打印
     * export
     */
    export enum DebugMode {
        /**
         * 任意
         * export
         */
        ANY = 0x01,

        /**
         * 调试信息
         * export
         */
        DEBUG = 0x02,

        /**
         * 工程模式
         * export
         */
        ENGINEER = 0x04,

        /**
         * 框架
         * export
         */
        ENGINE = 0x08,

        /**
         * 原生
         * export
         */
        NATIVE = 0x10,

        /**
         * 网络
         * export
         */
        NETWORK = 0x20,

        /**
         * 网络心跳
         * export
         */
        NETWORK_HEARTBEAT = 0x40,

        /**
         * 普通
         * export
         */
        NORMAL = 0x80
    }
}