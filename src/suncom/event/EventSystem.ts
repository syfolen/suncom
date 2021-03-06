
module suncom {
    /**
     * export
     */
    export class EventSystem implements IEventSystem {
        /**
         * 事件对象集合
         */
        private $var_events: KVString2Object<EventInfo[]> = {};

        /**
         * 避免注册与注销对正在派发的事件列表产生干扰
         */
        private $var_lockers: KVString2Boolean = {};

        /**
         * 己执行的一次性事件对象列表
         */
        private $var_onceList: EventInfo[] = [];

        /**
         * 事件是否己取消
         */
        private $var_isCanceled: boolean = false;

        /**
         * 对象回收站
         * 说明：
         * 1. 事件派发过程中，所有回收的观察者会先进入回收站
         * 2. 当事件派发彻底停止时，回收站中的的对象会被重置并进入对象池
         */
        private $var_recycles: EventInfo[] = [];

        /**
         * 事件派发接口调用次数
         */
        private $var_dispatchCount: number = 0;

        /**
         * export
         */
        addEventListener(type: string, method: Function, caller: Object, receiveOnce: boolean = false, priority: EventPriorityEnum = EventPriorityEnum.MID, args: any[] = null): void {
            if (method === void 0) { method = null; }
            if (caller === void 0) { caller = null; }
            if (Common.isStringNullOrEmpty(type) === true) {
                throw Error(`注册无效事件！！！`);
            }
            if (method === null) {
                throw Error(`注册无效的事件回调！！！`);
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
                const event: EventInfo = list[i];
                if (event.method === method && event.caller === caller) {
                    Logger.warn(`忽略重复注册的事件 name:${name}`);
                    return;
                }
                // 优先级高的事件先执行
                if (index === -1 && event.priority < priority) {
                    index = i;
                }
            }

            const event: EventInfo = Pool.getItemByClass("suncom.EventInfo", EventInfo);
            event.args = args;
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
            if (method === void 0) { method = null; }
            if (caller === void 0) { caller = null; }
            if (Common.isStringNullOrEmpty(type) === true) {
                throw Error(`移除无效的事件！！！`);
            }
            if (method === null) {
                throw Error(`移除无效的事件回调！！！`);
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
                    this.$var_recycles.push(list.splice(i, 1)[0]);
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
        hasEventListener(type: string, method: Function, caller: Object): boolean {
            if (method === void 0) { method = null; }
            if (caller === void 0) { caller = null; }
            if (suncom.Common.isStringNullOrEmpty(type) === true) {
                throw Error(`查询无效的监听`);
            }
            if (method === null) {
                throw Error(`查询无效的事件回调！！！`);
            }
            let events: EventInfo[] = this.$var_events[type];
            if (events === void 0) {
                return false;
            }
            for (let i: number = 0; i < events.length; i++) {
                const event: EventInfo = events[i];
                if (event.method === method && event.caller === caller) {
                    return true;
                }
            }
            return false;
        }

        /**
         * export
         */
        dispatchEvent(type: string, data?: any, cancelable: boolean = true): void {
            if (Common.isStringNullOrEmpty(type) === true) {
                throw Error(`派发无效的事件！！！`);
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
            // 事件派发次数 +1
            this.$var_dispatchCount++;

            for (let i: number = 0; i < list.length; i++) {
                const event: EventInfo = list[i];
                // 一次性事件入栈
                if (event.receiveOnce === true) {
                    this.$var_onceList.push(event);
                }
                const args: any = event.args === null ? data : event.args.concat(data);
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

            // 事件派发次数 -1
            this.$var_dispatchCount--;

            // 注销一次性事件
            while (this.$var_onceList.length > 0) {
                const event: EventInfo = this.$var_onceList.pop();
                this.removeEventListener(event.type, event.method, event.caller);
            }

            // 若当前事件派发次数为 0 ，则回收站中的对象入池
            if (this.$var_dispatchCount === 0) {
                while (this.$var_recycles.length > 0) {
                    const event: EventInfo = this.$var_recycles.pop();
                    event.args = null;
                    event.caller = null;
                    event.method = null;
                    event.priority = 0;
                    event.receiveOnce = false;
                    Pool.recover("suncom.EventInfo", event);
                }
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