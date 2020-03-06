
module suncom {
    /**
     * 自定义事件系统中的事件信息
     * export
     */
    export interface IEventInfo {
        /**
         * 事件类型
         */
        type: string;

        /**
         * 回调方法
         */
        method: Function;

        /**
         * 回调对象
         */
        caller: Object;

        /**
         * 事件优先级
         */
        priority: number;

        /**
         * 是否只响应一次
         */
        receiveOnce: boolean;
    }
}