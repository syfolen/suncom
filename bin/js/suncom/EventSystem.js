var suncom;
(function (suncom) {
    /**
     * EventSystem 自定义事件系统
     * 为避免注册与注销对正在派发的事件列表产生干扰：
     * NOTE: 每个列表首个元素为布尔类型，默认为 false
     * NOTE: 若该列表的事件类型正在派发，则其值为 true
     * export
     */
    var EventSystem = /** @class */ (function () {
        function EventSystem() {
            /**
             * 事件对象集合
             */
            this.$events = {};
            /**
             * 己执行的一次性事件对象列表
             */
            this.$onceList = [];
            /**
             * 事件是否己取消
             */
            this.$isCanceled = false;
        }
        /**
         * 取消当前正在派发的事件
         * export
         */
        EventSystem.prototype.dispatchCancel = function () {
            this.$isCanceled = true;
        };
        /**
         * 事件派发
         * @args[]: 参数列表，允许为任意类型的数据
         * @cancelable: 事件是否允许被中断，默认为false
         * export
         */
        EventSystem.prototype.dispatchEvent = function (type, args, cancelable) {
            if (cancelable === void 0) { cancelable = false; }
            if (type === void 0 || type === null) {
                throw Error("Invalid Event Type!!!");
            }
            var list = this.$events[type] || null;
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
            var isCanceled = this.$isCanceled;
            // 标记当前事件未取消
            this.$isCanceled = false;
            // 响应回调
            for (var i = 1; i < list.length; i++) {
                var event_1 = list[i];
                // 一次性事件入栈
                if (event_1.receiveOnce === true) {
                    this.$onceList.push(event_1);
                }
                if (args === void 0) {
                    event_1.method.call(event_1.caller);
                }
                else if (args instanceof Array) {
                    event_1.method.apply(event_1.caller, args);
                }
                else {
                    event_1.method.call(event_1.caller, args);
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
                var event_2 = this.$onceList.pop();
                this.removeEventListener(event_2.type, event_2.method, event_2.caller);
            }
        };
        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为 1
         * export
         */
        EventSystem.prototype.addEventListener = function (type, method, caller, receiveOnce, priority) {
            if (receiveOnce === void 0) { receiveOnce = false; }
            if (priority === void 0) { priority = 1; }
            if (type === void 0 || type === null) {
                throw Error("Register Invalid Event Type!!!");
            }
            var list = this.$events[type] || null;
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
            var index = -1;
            for (var i = 1; i < list.length; i++) {
                var item = list[i];
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
            var event = new suncom.EventInfo();
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
        };
        /**
         * 移除事件
         * export
         */
        EventSystem.prototype.removeEventListener = function (type, method, caller) {
            if (type === void 0 || type === null) {
                throw Error("Remove Invalid Event Type!!!");
            }
            var list = this.$events[type] || null;
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
            for (var i = 0; i < list.length; i++) {
                var event_3 = list[i];
                if (event_3.method === method && event_3.caller === caller) {
                    list.splice(i, 1);
                    break;
                }
            }
            // 移除空列表
            if (list.length === 1) {
                delete this.$events[type];
            }
        };
        return EventSystem;
    }());
    suncom.EventSystem = EventSystem;
})(suncom || (suncom = {}));
//# sourceMappingURL=EventSystem.js.map