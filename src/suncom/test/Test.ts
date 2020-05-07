
module suncom {
    /**
     * 测试类
     * export
     */
    export namespace Test {
        /**
         * 断言是否失败，默认为：false
         * export
         */
        export let ASSERT_FAILED: boolean = false;

        /**
         * 断言失败时是否自动断点，默认为：true
         * export
         */
        export let ASSERT_BREAKPOINT: boolean = true;

        /**
         * 启用微服务器，默认为：false
         * export
         */
        export let ENABLE_MICRO_SERVER: boolean = false;

        /**
         * 期望测试
         * export
         */
        export function expect(value: any, description?: string): IExpect {
            return new Expect(description).expect(value);
        }

        /**
         * 期望之外的，执行此方法时直接触发ASSERT_FAILED
         * export
         */
        export function notExpected(message?: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                new Expect().test(false, message || `Test.notExpected 期望之外的`);
            }
        }

        /**
         * 测试表达式是否为true
         * export
         */
        export function assertTrue(value: boolean, message?: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                new Expect().test(value, message || `Test.assertTrue error，实际值：${Common.toDisplayString(value)}`);
            }
        }

        /**
         * 测试表达式是否为false
         * export
         */
        export function assertFalse(value: boolean, message?: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                new Expect().test(value === false, message || `Test.assertFalse error，实际值：${Common.toDisplayString(value)}`);
            }
        }

        /**
         * 等待信号，同一时间只允许监听一个测试信号
         * export
         */
        export function wait(id: number, handler: IHandler = null): void {
            if (Global.debugMode & DebugMode.TEST) {
                puremvc.Facade.getInstance().sendNotification(NotifyKey.TEST_WAIT, [id, handler]);
            }
        }

        /**
         * 发射信号
         * export
         */
        export function emit(id: number, args?: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                puremvc.Facade.getInstance().sendNotification(NotifyKey.TEST_EMIT, [id, args]);
            }
        }

        /**
         * 点击按钮
         * @event: 默认为：Laya.Event.CLICK
         * 说明：
         * 1. 按钮的点击会延时500毫秒执行
         * export
         */
        export function click(btnId: number, event: string | Laya.Event = Laya.Event.CLICK): void {
            if (Global.debugMode & DebugMode.TEST) {
                puremvc.Facade.getInstance().sendNotification(NotifyKey.TEST_CLICK_BUTTON, [btnId, event]);
            }
        }

        /**
         * 注册按钮
         * @id: 按钮编号，若为-1则清除所有按钮
         * @once: 一次性的按钮，默认为：true
         * export
         */
        export function regButton(id: number, button?: any, once: boolean = true): void {
            if (Global.debugMode & DebugMode.TEST) {
                puremvc.Facade.getInstance().sendNotification(NotifyKey.TEST_REG_BUTTON, [id, button, once]);
            }
        }
    }
}