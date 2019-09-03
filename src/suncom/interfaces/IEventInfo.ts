
module suncom {

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