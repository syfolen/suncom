
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
         * 全局唯一
         */
        let $expect: IExpect = null;

        /**
         * 期望测试
         * export
         */
        export function expect(value: any, description?: string): IExpect {
            if (Global.debugMode & DebugMode.TEST) {
                return new Expect(description).expect(value);
            }
            if ($expect === null) {
                $expect = new Expect();
            }
            return $expect;
        }

        /**
         * 期望之外的，执行此方法时直接触发ASSERT_FAILED
         * export
         */
        export function notExpected(message?: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                Test.expect(true).interpret(`Test.notExpected 期望之外的`).toBe(false);
            }
        }

        /**
         * 测试表达式是否为true
         * export
         */
        export function assertTrue(value: boolean, message?: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                Test.expect(value).interpret(message || `Test.assertTrue error，实际值：${Common.toDisplayString(value)}`).toBe(true);
            }
        }

        /**
         * 测试表达式是否为false
         * export
         */
        export function assertFalse(value: boolean, message?: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                Test.expect(value).interpret(message || `Test.assertFalse error，实际值：${Common.toDisplayString(value)}`).toBe(false);
            }
        }
    }
}