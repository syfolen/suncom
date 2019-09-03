
module suncom {
    /**
     * EventSystem 自定义事件系统
     * 为避免注册与注销对正在派发的事件列表产生干扰：
     * NOTE: 每个列表首个元素为布尔类型，默认为 false
     * NOTE: 若该列表的事件类型正在派发，则其值为 true
     */
    export class EventSystem implements IEventSystem {
        /**
         * 事件对象集合
         */
        private $events: { [type: string]: Array<boolean | IEventInfo> } = {};

        /**
         * 己执行的一次性事件对象列表
         */
        private $onceList: Array<IEventInfo> = [];

        /**
         * 事件是否己取消
         */
        private $isCanceled: boolean = false;

        /**
         * 取消当前正在派发的事件
         */
        dispatchCancel(): void {
            this.$isCanceled = true;
        }

        /**
         * 事件派发
         * @args[]: 参数列表，允许为任意类型的数据
         * @cancelable: 事件是否允许被中断，默认为false
         */
        dispatchEvent(type: string, args?: any, cancelable: boolean = false): void {
            if (type === void 0 || type === null) {
                throw Error("Invalid Event Type!!!");
            }
            const list: Array<boolean | IEventInfo> = this.$events[type] || null;

            // 无此类事件
            if (list === null) {
                return;
            }

            // 无回调函数被注册
            if (list.length === 1) {
                return;
            }

            // 标记禁止直接更新
            list[0] = true;

            // 记录历史事件状态
            const isCanceled: boolean = this.$isCanceled;
            // 标记当前事件未取消
            this.$isCanceled = false;

            // 响应回调
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
            while (this.$onceList.length) {
                const event: IEventInfo = this.$onceList.pop();
                this.removeEventListener(event.type, event.method, event.caller);
            }
        }

        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为 1
         */
        addEventListener(type: string, method: Function, caller: Object, receiveOnce: boolean = false, priority: number = 1): void {
            if (type === void 0 || type === null) {
                throw Error("Register Invalid Event Type!!!");
            }
            let list: Array<boolean | IEventInfo> = this.$events[type] || null;

            // 若事件列表不存在，则新建
            if (list === null) {
                list = this.$events[type] = [false];
            }
            // 若当前禁止直接更新，则复制列表
            else if (list[0] === true) {
                list = this.$events[type] = list.concat();
                // 新生成的列表允许被更新
                list[0] = false;
            }

            // 插入索引
            let index: number = -1;
            for (let i: number = 1; i < list.length; i++) {
                const item: IEventInfo = list[i] as IEventInfo;
                // 事件不允许重复注册
                if (item.method === method && item.caller === caller) {
                    return;
                }
                // 优先级高的事件先执行
                if (index === -1 && item.priority < priority) {
                    index = i;
                }
            }

            // 生成事件对象
            const event: IEventInfo = new EventInfo();
            event.type = type;
            event.method = method;
            event.caller = caller;
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
         */
        removeEventListener(type: string, method: Function, caller: Object): void {
            if (type === void 0 || type === null) {
                throw Error("Remove Invalid Event Type!!!");
            }
            let list: Array<boolean | IEventInfo> = this.$events[type] || null;

            // 无此类事件
            if (list === null) {
                return;
            }

            // 无回调函数被注册
            if (list.length === 1) {
                return;
            }

            // 若当前禁止直接更新，则复制列表
            if (list[0] === true) {
                list = this.$events[type] = list.slice(0);
                // 新生成的列表允许被更新
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