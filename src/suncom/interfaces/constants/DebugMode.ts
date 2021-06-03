
module suncom {
    /**
     * 调试模式，主要用于日志打印的控制，也用于模块中调试代码的开启与关闭
     * export
     */
    export enum DebugMode {
        /**
         * 错误日志
         * export
         */
        ERROR = 0x1,

        /**
         * 警告日志
         * export
         */
        WARN = 0x2,

        /**
         * 日志文件
         * export
         */
        LOG2F = 0x4,

        /**
         * 信息日志（框架）
         * export
         */
        INFO = 0x8,

        /**
         * 调试日志
         * export
         */
        DEBUG = 0x10,

        /**
         * 追踪日志
         * export
         */
        TRACE = 0x20,

        /**
         * 普通
         * export
         */
        NORMAL = 0x40
    }
}