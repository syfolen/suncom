
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
         * 测试信号
         */
        const signal: ISingal = {
            id: -1,
            handler: null
        };

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
        export function notExpected(): void {
            if (Global.debugMode & DebugMode.TEST) {
                new Expect().test(false, `Test.notExpected 期望之外的`);
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
        export function wait(id: number, handler: IHandler): void {
            if (Global.debugMode & DebugMode.TEST) {
                Test.expect(id).interpret("信号ID必须大于或等于0").toBeGreaterOrEqualThan(0);
                Test.expect(handler).interpret("必须设置有效的信号回调").toBeInstanceOf(Handler);
                Test.expect(signal.id).interpret("同一时间只允许监听一个测试信号").toBe(-1);
                signal.id = id;
                signal.handler = handler || null;
            }
        }

        /**
         * 发送信号
         * export
         */
        export function emit(id: number, args?: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                if (signal.id > -1 && signal.id === id) {
                    signal.id = -1;
                    signal.handler.runWith(args);
                }
            }
        }
    }
}