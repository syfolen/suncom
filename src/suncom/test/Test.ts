
module suncom {
    /**
     * 测试类
     * export
     */
    export namespace Test {
        /**
         * 断言是否失败
         * export
         */
        export let ASSERT_FAILED: boolean = false;

        /**
         * 断言失败时是否自动断点
         * export
         */
        export let ASSERT_BREAKPOINT: boolean = true;

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
    }
}