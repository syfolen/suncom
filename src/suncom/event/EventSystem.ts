
module suncom {
    /**
     * 自定义事件系统
     * export
     */
    export class EventSystem implements IEventSystem {
        /**
         * 事件对象集合（内置属性，请勿操作）
         * 为避免注册与注销对正在派发的事件列表产生干扰：
         * NOTE: 每个列表首个元素为布尔类型，默认为 false
         * NOTE: 若该列表的事件类型正在派发，则其值为 true
         * export
         */
        private $events: { [type: string]: Array<boolean | IEventInfo> } = {};

        /**
         * 己执行的一次性事件对象列表（内置属性，请勿操作）
         * export
         */
        private $onceList: IEventInfo[] = [];

        /**
         * 事件是否己取消（内置属性，请勿操作）
         * export
         */
        private $isCanceled: boolean = false;

        /**
         * 取消当前正在派发的事件
         * export
         */
        dispatchCancel(): void {
            this.$isCanceled = true;
        }

        /**
         * 事件派发
         * @args: 参数列表，允许为任意类型的数据
         * @cancelable: 事件是否允许被中断，默认为false
         * export
         */
        dispatchEvent(type: string, args?: any, cancelable: boolean = false): void {
            if (Common.isStringInvalidOrEmpty(type) === true) {
                throw Error(`派发无效事件！！！`);
            }
            const list: Array<boolean | IEventInfo> = this.$events[type] || null;

            if (list === null) {
                return;
            }
            // 标记禁止直接更新
            list[0] = true;

            // 记录历史事件状态
            const isCanceled: boolean = this.$isCanceled;
            // 标记当前事件未取消
            this.$isCanceled = false;

            for (let i: number = 1; i < list.length; i++) {
                const event: IEventInfo = list[i] as IEventInfo;
                // 一次性事件入栈
                if (event.receiveOnce === true) {
                    this.$onceList.push(event);
                }
                if (args === void 0) {
                    event.method.call(event.caller);
                }
                else if (args instanceof Array) {
                    event.method.apply(event.caller, args);
                }
                else {
                    event.method.call(event.caller, args);
                }
                // 事件允许被取消，且事件被取消
                if (cancelable === true && this.$isCanceled) {
                    break;
                }
            }

            // 回归历史事件状态
            this.$isCanceled = isCanceled;
            // 标记允许直接更新
            list[0] = false;

            // 注销一次性事件
            while (this.$onceList.length > 0) {
                const event: IEventInfo = this.$onceList.pop();
                this.removeEventListener(event.type, event.method, event.caller);
            }
        }

        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为：EventPriorityEnum.LOW
         * export
         */
        addEventListener(type: string, method: Function, caller: Object, receiveOnce: boolean = false, priority: EventPriorityEnum = EventPriorityEnum.LOW): void {
            if (Common.isStringInvalidOrEmpty(type) === true) {
                throw Error(`注册无效事件！！！`);
            }
            if (method === void 0 || method === null) {
                throw Error(`注册无效的事件回调！！！`);
            }
            let list: Array<boolean | IEventInfo> = this.$events[type] || null;

            if (list === null) {
                list = this.$events[type] = [false];
            }
            // 复制数组以避免干扰
            else if (list[0] === true) {
                list = this.$events[type] = list.slice(0);
                // 重置标记
                list[0] = false;
            }

            let index: number = -1;
            for (let i: number = 1; i < list.length; i++) {
                const item: IEventInfo = list[i] as IEventInfo;
                if (item.method === method && item.caller === caller) {
                    return;
                }
                // 优先级高的事件先执行
                if (index === -1 && item.priority < priority) {
                    index = i;
                }
            }

            const event: IEventInfo = {
                type: type,
                method: method,
                caller: caller,
                priority: priority,
                receiveOnce: receiveOnce
            };

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
            if (Common.isStringInvalidOrEmpty(type) === true) {
                throw Error(`移除无效的事件！！！`);
            }
            if (method === void 0 || method === null) {
                throw Error(`移除无效的事件回调！！！`);
            }
            let list: Array<boolean | IEventInfo> = this.$events[type] || null;

            if (list === null) {
                return;
            }

            // 复制数组以避免干扰
            if (list[0] === true) {
                list = this.$events[type] = list.slice(0);
                // 重置标记
                list[0] = false;
            }

            for (let i: number = 0; i < list.length; i++) {
                const event: IEventInfo = list[i] as IEventInfo;
                if (event.method === method && event.caller === caller) {
                    list.splice(i, 1);
                    break;
                }
            }

            // 移除空列表
            if (list.length === 1) {
                delete this.$events[type];
            }
        }
    }
}