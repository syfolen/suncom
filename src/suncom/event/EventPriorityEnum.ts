
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
        LOWEST = 0,

        /**
         * 低
         * export
         */
        LOW,

        /**
         * 中（默认）
         * export
         */
        MID,

        /**
         * 高
         * export
         */
        HIGH,

        /**
         * 最高
         * export
         */
        HIGHEST,

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