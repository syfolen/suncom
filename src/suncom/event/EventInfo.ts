
module suncom {
    /**
     * 自定义事件系统中的事件信息（内置对象，请勿在外部持有）
     * export
     */
    export class EventInfo {
        /**
         * 事件类型
         */
        type: string = null;

        /**
         * 回调对象
         */
        caller: Object = null;

        /**
         * 回调方法
         */
        method: Function = null;

        /**
         * 事件优先级，默认为: EventPriorityEnum.MID
         */
        priority: EventPriorityEnum = EventPriorityEnum.MID;

        /**
         * 是否只响应一次
         */
        receiveOnce: boolean = false;
    }
}