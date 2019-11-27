var suncom;
(function (suncom) {
    /**
     * 事件管理器
     */
    var EventManager;
    (function (EventManager) {
        /**
         * 事件系统对象
         */
        var $system = new suncom.EventSystem();
        /**
         * 取消当前正在派发的事件
         * export
         */
        function dispatchCancel() {
            $system.dispatchCancel();
        }
        EventManager.dispatchCancel = dispatchCancel;
        /**
         * 事件派发
         * @args[]: 参数列表，允许为任意类型的数据
         * @cancelable: 事件是否允许被中断，默认为false
         * export
         */
        function dispatchEvent(type, args, cancelable) {
            $system.dispatchEvent(type, args, cancelable);
        }
        EventManager.dispatchEvent = dispatchEvent;
        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为 1
         * export
         */
        function addEventListener(type, method, caller, receiveOnce, priority) {
            $system.addEventListener(type, method, caller, receiveOnce, priority);
        }
        EventManager.addEventListener = addEventListener;
        /**
         * 移除事件
         * export
         */
        function removeEventListener(type, method, caller) {
            $system.removeEventListener(type, method, caller);
        }
        EventManager.removeEventListener = removeEventListener;
    })(EventManager = suncom.EventManager || (suncom.EventManager = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=EventManager.js.map