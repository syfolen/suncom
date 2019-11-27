
module suncom {
    /**
     * 事件管理器
     */
    export namespace EventManager {
        /**
         * 事件系统对象
         */
        const $system: IEventSystem = new EventSystem();

        /**
         * 取消当前正在派发的事件
         * export
         */
        export function dispatchCancel(): void {
            $system.dispatchCancel();
        }

        /**
         * 事件派发
         * @args[]: 参数列表，允许为任意类型的数据
         * @cancelable: 事件是否允许被中断，默认为false
         * export
         */
        export function dispatchEvent(type: string, args?: any, cancelable?: boolean): void {
            $system.dispatchEvent(type, args, cancelable);
        }

        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为 1
         * export
         */
        export function addEventListener(type: string, method: Function, caller: Object, receiveOnce?: boolean, priority?: number): void {
            $system.addEventListener(type, method, caller, receiveOnce, priority);
        }

        /**
         * 移除事件
         * export
         */
        export function removeEventListener(type: string, method: Function, caller: Object): void {
            $system.removeEventListener(type, method, caller);
        }
    }
}