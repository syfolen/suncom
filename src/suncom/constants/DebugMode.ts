
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
        ANY = 0x1,

        /**
         * 开发测试
         * export
         */
        TDD = 0x2,

        /**
         * 验收测试
         * export
         */
        ATDD = 0x4,

        /**
         * 测试信息
         * export
         */
        TEST = 0x8,

        /**
         * 调试信息
         * export
         */
        DEBUG = 0x10,

        /**
         * 工程模式
         * export
         */
        ENGINEER = 0x20,

        /**
         * 框架
         * export
         */
        ENGINE = 0x40,

        /**
         * 原生
         * export
         */
        NATIVE = 0x80,

        /**
         * 网络
         * export
         */
        NETWORK = 0x100,

        /**
         * 网络心跳
         * export
         */
        NETWORK_HEARTBEAT = 0x200,

        /**
         * 普通
         * export
         */
        NORMAL = 0x400
    }
}