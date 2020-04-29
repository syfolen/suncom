
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
        export function expect(value: any): IExpect {
            return new Expect().expect(value);
        }

        /**
         * 期望之外的，执行此方法时直接触发ASSERT_FAILED
         * export
         */
        export function outOfExpection(): void {
            Test.ASSERT_FAILED = true;
            suncom.Logger.error(DebugMode.ANY, `Test.outOfExpection 期望之外的`);
            if (Test.ASSERT_BREAKPOINT === true) {
                debugger;
            }
        }

        /**
         * 测试表达式是否为true
         * export
         */
        export function assertTrue(value: boolean, msg: string = null): void {
            if (Global.debugMode & DebugMode.TEST) {
                if (value !== true) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `Test.assertTrue 执行失败，实际值：${Test.convertToDisplayString(value)}`);
                    msg !== null && suncom.Logger.error(DebugMode.ANY, msg);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 测试表达式是否为false
         * export
         */
        export function assertFalse(value: boolean, msg: string = null): void {
            if (Global.debugMode & DebugMode.TEST) {
                if (value !== false) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `Test.assertFalse 执行失败，实际值：${Test.convertToDisplayString(value)}`);
                    msg !== null && suncom.Logger.error(DebugMode.ANY, msg);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 将对象转化为字符串
         */
        export function convertToDisplayString(data: any): string {
            if (data === void 0 || data === null) {
                return data;
            }

            let str: string;

            if (data instanceof Array) {
                str = `[${data.join(",")}]`;
            }
            else {
                try {
                    str = JSON.stringify(data);
                }
                catch (error) {
                    str = data.toString();
                }
            }

            return str;
        }
    }
}