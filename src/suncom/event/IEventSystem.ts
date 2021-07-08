
module suncom {
    /**
     * 自定义事件系统
     * export
     */
    export interface IEventSystem {

        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为：EventPriorityEnum.MID
         * @args[]: 回调参数列表，默认为: null
         * 说明：
         * 1. 若需覆盖参数，请先调用removeEventListener移除事件后再重新注册
         * export
         */
        addEventListener(type: string, method: Function, caller: Object, receiveOnce?: boolean, priority?: EventPriorityEnum, args?: any[]): void;

        /**
         * 移除事件
         * export
         */
        removeEventListener(type: string, method: Function, caller: Object): void;

        /**
         * 查询事件是否己注册
         * export
         */
        hasEventListener(type: string, method: Function, caller: Object): boolean;

        /**
         * 事件派发
         * @data: 参数对象，允许为任意类型的数据，传递多个参数时可指定其为数组，若需要传递的data本身就是数组，则需要传递[data]
         * @cancelable: 通知是否允许被取消，默认为: true
         * export
         */
        dispatchEvent(type: string, data?: any, cancelable?: boolean): void;

        /**
         * 取消当前正在派发的事件
         * export
         */
        dispatchCancel(): void;
    }
}