
module suncom {
    /**
     * 调试模式，主要用于日志打印的控制，也用于模块中调试代码的开启与关闭
     * export
     */
    export enum DebugMode {
        /**
         * 任意
         * export
         */
        ANY = 0x1,

        /**
         * 引擎
         * export
         */
        ENGINE = 0x2,

        /**
         * 原生
         * export
         */
        NATIVE = 0x4,

        /**
         * 网络
         * export
         */
        NETWORK = 0x8,

        /**
         * 网络心跳
         * export
         */
        NETWORK_HEARTBEAT = 0x10,

        /**
         * 调试模式
         * export
         */
        DEBUG = 0x20,

        /**
         * 工程模式
         * export
         */
        ENGINEER = 0x40,

        /**
         * 普通
         * export
         */
        NORMAL = 0x80,

        /**
         * 测试模式
         * export
         */
        TEST = 0x100,

        /**
         * 测试驱动开发模式
         * export
         */
        TDD = 0x200,

        /**
         * 验收测试模式
         * export
         */
        ATDD = 0x400
    }
}