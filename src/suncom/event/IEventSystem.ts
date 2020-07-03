
module suncom {
    /**
     * 自定义事件接口
     * export
     */
    export interface IEventSystem {

        /**
         * 取消当前正在派发的事件
         * export
         */
        dispatchCancel(): void;

        /**
         * 事件派发
         * @args[]: 参数列表，允许为任意类型的数据
         * @cancelable: 事件是否允许被中断，默认为false
         * export
         */
        dispatchEvent(type: string, args?: any, cancelable?: boolean): void;

        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为：EventPriorityEnum.MID
         * export
         */
        addEventListener(type: string, method: Function, caller: Object, receiveOnce?: boolean, priority?: EventPriorityEnum): void;

        /**
         * 移除事件
         * export
         */
        removeEventListener(type: string, method: Function, caller: Object): void;
    }
}