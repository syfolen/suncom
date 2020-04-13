
module suncom {
    /**
     * 事件优先级
     * export
     */
    export enum EventPriorityEnum {
        /**
         * 低
         * export
         */
        LOW = 0,

        /**
         * 中（默认）
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