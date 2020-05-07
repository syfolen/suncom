
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
         * 自动验收测试
         * export
         */
        AAT = 0x02,

        /**
         * 测试信息
         * export
         */
        TEST = 0x04,

        /**
         * 调试信息
         * export
         */
        DEBUG = 0x08,

        /**
         * 工程模式
         * export
         */
        ENGINEER = 0x10,

        /**
         * 框架
         * export
         */
        ENGINE = 0x20,

        /**
         * 原生
         * export
         */
        NATIVE = 0x40,

        /**
         * 网络
         * export
         */
        NETWORK = 0x80,

        /**
         * 网络心跳
         * export
         */
        NETWORK_HEARTBEAT = 0x100,

        /**
         * 普通
         * export
         */
        NORMAL = 0x200
    }
}