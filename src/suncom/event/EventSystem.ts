
module suncom {
    /**
     * export
     */
    export class EventSystem implements IEventSystem {
        /**
         * 事件对象集合
         */
        private $var_events: { [type: string]: EventInfo[] } = {};

        /**
         * 避免注册与注销对正在派发的事件列表产生干扰
         */
        private $var_lockers: { [type: string]: boolean } = {};

        /**
         * 己执行的一次性事件对象列表
         */
        private $var_onceList: EventInfo[] = [];

        /**
         * 事件是否己取消
         */
        private $var_isCanceled: boolean = false;

        /**
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
            let list: EventInfo[] = this.$var_events[type];
            // 若列表不存在，则新建
            if (list === void 0) {
                list = this.$var_events[type] = [];
            }
            // 解锁并复制被锁定的列表
            else if (this.$var_lockers[type] === true) {
                this.$var_events[type] = list = list.slice(0);
                this.$var_lockers[type] = false;
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

            const event: EventInfo = Pool.getItemByClass("suncom.EventInfo", EventInfo);
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
            let list: EventInfo[] = this.$var_events[type];
            if (list === void 0) {
                return;
            }
            // 解锁并复制被锁定的列表
            if (this.$var_lockers[type] === true) {
                this.$var_events[type] = list = list.slice(0);
                this.$var_lockers[type] = false;
            }

            for (let i: number = 0; i < list.length; i++) {
                const event: EventInfo = list[i];
                if (event.method === method && event.caller === caller) {
                    list.splice(i, 1)[0].recover();
                    break;
                }
            }

            // 移除空列表
            if (list.length === 0) {
                delete this.$var_events[type];
                delete this.$var_lockers[type];
            }
        }

        /**
         * export
         */
        dispatchEvent(type: string, data?: any, cancelable: boolean = true): void {
            if (Common.isStringNullOrEmpty(type) === true) {
                throw Error(`派发无效事件！！！`);
            }
            const list: EventInfo[] = this.$var_events[type];
            if (list === void 0) {
                return;
            }
            // 锁定列表
            this.$var_lockers[type] = true;

            // 记录历史事件状态
            const isCanceled: boolean = this.$var_isCanceled;
            // 标记当前事件未取消
            this.$var_isCanceled = false;

            for (let i: number = 0; i < list.length; i++) {
                const event: EventInfo = list[i];
                // 一次性事件入栈
                if (event.receiveOnce === true) {
                    this.$var_onceList.push(event);
                }
                if (data instanceof Array) {
                    event.method.apply(event.caller, data);
                }
                else {
                    event.method.call(event.caller, data);
                }
                // 事件被取消
                if (this.$var_isCanceled) {
                    // 事件允许被取消
                    if (cancelable === true) {
                        break;
                    }
                    console.error(`尝试取消不可被取消的事件：${type}`);
                    this.$var_isCanceled = false;
                }
            }

            // 回归历史事件状态
            this.$var_isCanceled = isCanceled;
            // 标记允许直接更新
            this.$var_lockers[type] = false;

            // 注销一次性事件
            while (this.$var_onceList.length > 0) {
                const event: EventInfo = this.$var_onceList.pop();
                this.removeEventListener(event.type, event.method, event.caller);
            }
        }

        /**
         * export
         */
        dispatchCancel(): void {
            this.$var_isCanceled = true;
        }
    }
}