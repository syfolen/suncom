
module suncom {
    /**
     * 事件优先级
     * export
     */
    export enum EventPriorityEnum {
        /**
         * 最低
         * export
         */
        LAZY = 0,

        /**
         * 低（默认）
         * export
         */
        LOW,

        /**
         * 中
         * export
         */
        NOR,

        /**
         * 高
         * export
         */
        HIGH,

        /**
         * 框架级别
         * export
         */
        FWL,

        /**
         * 引擎级别
         * export
         */
        EGL,

        /**
         * 系统级别
         * export
         */
        OSL
    }
}