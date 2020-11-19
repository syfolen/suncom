
module suncom {
    /**
     * 自定义事件系统
     * export
     */
    export class EventSystem {
        /**
         * 事件对象集合（内置属性，请勿操作）
         * export
         */
        private $events: { [type: string]: EventInfo[] } = {};

        /**
         * 避免注册与注销对正在派发的事件列表产生干扰（内置属性，请勿操作）
         * export
         */
        private $lockers: { [type: string]: boolean } = {};

        /**
         * 己执行的一次性事件对象列表（内置属性，请勿操作）
         * export
         */
        private $onceList: EventInfo[] = [];

        /**
         * 事件是否己取消（内置属性，请勿操作）
         * export
         */
        private $isCanceled: boolean = false;

        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为：EventPriorityEnum.MID
         * @args[]: 回调参数列表，默认为: null
         * 说明：
         * 1. 若需覆盖参数，请先调用removeEventListener移除事件后再重新注册
         * export
         */
        addEventListener(type: string, method: Function, caller: Object, receiveOnce: boolean = false, priority: EventPriorityEnum = EventPriorityEnum.MID): void {
            if (Common.isStringNullOrEmpty(type) === true) {
                throw Error(`注册无效事件！！！`);
            }
            if (method === void 0 || method === null) {
                throw Error(`注册无效的事件回调！！！`);
            }
            if (caller === void 0) {
                caller = null;
            }
            let list: EventInfo[] = this.$events[type];
            // 若列表不存在，则新建
            if (list === void 0) {
                list = this.$events[type] = [];
            }
            // 解锁并复制被锁定的列表
            else if (this.$lockers[type] === true) {
                this.$events[type] = list = list.slice(0);
                this.$lockers[type] = false;
            }

            let index: number = -1;
            for (let i: number = 0; i < list.length; i++) {
                const item: EventInfo = list[i];
                if (item.method === method && item.caller === caller) {
                    return;
                }
                // 优先级高的事件先执行
                if (index === -1 && item.priority < priority) {
                    index = i;
                }
            }

            const event: EventInfo = Laya.Pool.getItemByClass("suncom.EventInfo", EventInfo);
            event.type = type;
            event.caller = caller;
            event.method = method;
            event.priority = priority;
            event.receiveOnce = receiveOnce;

            if (index < 0) {
                list.push(event);
            }
            else {
                list.splice(index, 0, event);
            }
        }

        /**
         * 移除事件
         * export
         */
        removeEventListener(type: string, method: Function, caller: Object): void {
            if (Common.isStringNullOrEmpty(type) === true) {
                throw Error(`移除无效的事件！！！`);
            }
            if (method === void 0 || method === null) {
                throw Error(`移除无效的事件回调！！！`);
            }
            if (caller === void 0) {
                caller = null;
            }
            let list: EventInfo[] = this.$events[type];
            if (list === void 0) {
                return;
            }
            // 解锁并复制被锁定的列表
            if (this.$lockers[type] === true) {
                this.$events[type] = list = list.slice(0);
                this.$lockers[type] = false;
            }

            for (let i: number = 0; i < list.length; i++) {
                const event: EventInfo = list[i];
                if (event.method === method && event.caller === caller) {
                    list.splice(i, 1);
                    Laya.Pool.recover("suncom.EventInfo", event);
                    break;
                }
            }

            // 移除空列表
            if (list.length === 0) {
                delete this.$events[type];
                delete this.$lockers[type];
            }
        }

        /**
         * 事件派发
         * @data: 参数对象，允许为任意类型的数据，传递多个参数时可指定其为数组，若需要传递的data本身就是数组，则需要传递[data]
         * @cancelable: 通知是否允许被取消，默认为: true
         * export
         */
        dispatchEvent(type: string, data?: any, cancelable: boolean = true): void {
            if (Common.isStringNullOrEmpty(type) === true) {
                throw Error(`派发无效事件！！！`);
            }
            const list: EventInfo[] = this.$events[type];
            if (list === void 0) {
                return;
            }
            // 锁定列表
            this.$lockers[type] = true;

            // 记录历史事件状态
            const isCanceled: boolean = this.$isCanceled;
            // 标记当前事件未取消
            this.$isCanceled = false;

            for (let i: number = 0; i < list.length; i++) {
                const event: EventInfo = list[i];
                // 一次性事件入栈
                if (event.receiveOnce === true) {
                    this.$onceList.push(event);
                }
                if (data instanceof Array) {
                    event.method.apply(event.caller, data);
                }
                else {
                    event.method.call(event.caller, data);
                }
                // 事件被取消
                if (this.$isCanceled) {
                    // 事件允许被取消
                    if (cancelable === true) {
                        break;
                    }
                    console.error(`尝试取消不可被取消的事件：${type}`);
                    this.$isCanceled = false;
                }
            }

            // 回归历史事件状态
            this.$isCanceled = isCanceled;
            // 标记允许直接更新
            this.$lockers[type] = false;

            // 注销一次性事件
            while (this.$onceList.length > 0) {
                const event: EventInfo = this.$onceList.pop();
                this.removeEventListener(event.type, event.method, event.caller);
            }
        }

        /**
         * 取消当前正在派发的事件
         * export
         */
        dispatchCancel(): void {
            this.$isCanceled = true;
        }
    }
}