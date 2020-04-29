
module suncom {
    /**
     * 期望异常测试类
     * export
     */
    export class Expect implements IExpect {

        private $asNot: boolean = false;

        private $value: any;

        expect(value: any): Expect {
            this.$value = value;
            return this;
        }

        /**
         * 期望为任意值，但不为null和undefined
         * export
         */
        anything(): void {
            if (Global.debugMode & DebugMode.TEST) {
                const yes: boolean = this.$value === null || this.$value === void 0;
                if ((this.$asNot === false && yes === true) || (this.$asNot === true && yes === false)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望值${this.$asNot === false ? "" : "不为"}：null or undefined, 实际值：${Test.convertToDisplayString(this.$value)}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望数组中包含
         * export
         */
        arrayContaining<T>(array: T[]): void {
            if (Global.debugMode & DebugMode.TEST) {
                let yes: boolean = true;
                for (let i: number = 0; i < array.length; i++) {
                    if (this.$value.indexOf(array[i]) < 0) {
                        yes = false;
                        break;
                    }
                }
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望${this.$asNot === false ? "" : "不"}包含：${Test.convertToDisplayString(array)}, 实际值：${Test.convertToDisplayString(this.$value)}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望字符串中含有value
         * export
         */
        stringContaining(value: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                let yes: boolean = this.$value.indexOf(value) > -1;
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望${this.$asNot === false ? "" : "不"}包含：${value}, 实际值：${this.$value}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望字符串被包含
         * export
         */
        stringMatching(value: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                let yes: boolean = value.indexOf(this.$value) > -1;
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望${this.$asNot === false ? "" : "不"}被包含：${value}, 实际值：${this.$value}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望存在属性
         * @value: 若不为void 0，则同时校验值
         * export
         */
        toHaveProperty(key: string, value?: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                let yes: boolean = value === void 0 ? this.$value[key] !== void 0 : this.$value[key] === value;
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望${this.$asNot === false ? "" : "不"}存在属性：${key}, 实际值：${this.$value}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望值为：value
         * export
         */
        toBe(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                if ((this.$value === value && this.$asNot === true) || (this.$value !== value && this.$asNot === false)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望值${this.$asNot === false ? "" : "不为"}：${Test.convertToDisplayString(value)}, 实际值：${Test.convertToDisplayString(this.$value)}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望值为：null
         * export
         */
        toBeNull(): void {
            this.toBe(null);
        }

        /**
         * 期望值为：undefined
         * export
         */
        toBeUndefined(): void {
            this.toBe(void 0);
        }

        /**
         * 期望对象类型为：cls
         * export
         */
        toBeInstanceOf(cls: new () => any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const yes: boolean = this.$value instanceof cls === true;
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望 ${Test.convertToDisplayString(this.$value)} 的类型${this.$asNot === false ? "" : "不"}为 ${Common.getClassName(cls)}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望两个数字是否相等
         * @deviation: 误差，默认为：0
         */
        toBeCloseTo(value: number, deviation: number = 0): void {
            if (Global.debugMode & DebugMode.TEST) {
                const yes: boolean = Math.abs(this.$value - value) <= Math.abs(deviation) ? true : false;
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望与${value}的误差${this.$asNot === true ? "" : "不"}超过${deviation}，实际值：${this.$value}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望数字大于
         * export
         */
        toBeGreaterThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const yes: boolean = this.$value > value;
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望${this.$asNot === true ? "" : "不"}大于 ${value}，实际值：${this.$value}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望数字大于或等于
         * export
         */
        toBeGreaterOrEqualThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const yes: boolean = this.$value >= value;
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望${this.$asNot === true ? "" : "不"}大于等于 ${value}，实际值：${this.$value}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望数字小于
         * export
         */
        toBeLessThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const yes: boolean = this.$value < value;
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望${this.$asNot === true ? "" : "不"}小于 ${value}，实际值：${this.$value}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 期望数字小于或等于
         * export
         */
        toBeLessOrEqualThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const yes: boolean = this.$value <= value;
                if ((this.$asNot === false && yes === false) || (this.$asNot === true && yes === true)) {
                    Test.ASSERT_FAILED = true;
                    suncom.Logger.error(DebugMode.ANY, `期望${this.$asNot === true ? "" : "不"}小于等于 ${value}，实际值：${this.$value}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 是否与期望对象一致
         * export
         */
        toEqual(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                if (this.$value instanceof Array && value instanceof Array) {
                    let a: any[] = this.$value.slice(0);
                    let b: any[] = value.slice(0);
                    a.sort();
                    b.sort();
                    if (a.length === b.length) {
                        for (let i: number = 0; i < a.length; i++) {
                            if (a[i] === b[i]) {
                                continue;
                            }
                            Test.ASSERT_FAILED = true;
                        }
                    }
                    else {
                        Test.ASSERT_FAILED = true;
                    }
                }
                else if (this.$value instanceof Array || value instanceof Array) {
                    Test.ASSERT_FAILED = true;
                }
                else if (this.$value !== value) {
                    Test.ASSERT_FAILED = true;
                }
                if (Test.ASSERT_FAILED === true) {
                    suncom.Logger.error(DebugMode.ANY, `Test.assertEquals 期望值：${Test.convertToDisplayString(value)}，实际值：${Test.convertToDisplayString(this.$value)}`);
                    if (Test.ASSERT_BREAKPOINT === true) {
                        debugger;
                    }
                }
            }
        }

        /**
         * 是否与期望对象完成一致
         * export
         */
        toStrictEqual(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                suncom.Logger.error(DebugMode.ANY, `暂未实现`);
                if (Test.ASSERT_BREAKPOINT === true) {
                    debugger;
                }
            }
        }

        get not(): IExpect {
            this.$asNot = true;
            return this as any;
        }
    }
}