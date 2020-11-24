
module suncom {
    /**
     * 期望异常测试类
     * export
     */
    export class Expect {
        /**
         * 实际值
         */
        private $var_value: any = void 0;

        /**
         * 是否期望相反
         */
        private $var_asNot: boolean = false;

        /**
         * 对异常的解释说明
         */
        private $var_interpretation: string = null;

        /**
         * 测试描述
         */
        constructor(description: string = null) {
            if (Global.debugMode & DebugMode.TEST) {
                description !== null && Logger.log(DebugMode.ANY, description);
            }
        }

        /**
         * 指定期望值
         * export
         */
        expect(value: any): Expect {
            this.$var_value = value;
            return this;
        }

        /**
         * 解释异常
         * export
         */
        interpret(str: string): Expect {
            this.$var_interpretation = str;
            return this;
        }

        /**
         * 测试执行接口，若测试未通过，则输出description
         * export
         */
        test(pass: boolean, message: string): void {
            if ((this.$var_asNot === false && pass === false) || (this.$var_asNot === true && pass === true)) {
                Test.ASSERT_FAILED = true;
                message !== null && Logger.error(DebugMode.ANY, message);
                this.$var_interpretation !== null && Logger.error(DebugMode.ANY, this.$var_interpretation);
                if (Test.ASSERT_BREAKPOINT === true) {
                    debugger;
                }
                throw Error("测试失败！");
            }
        }

        /**
         * 期望为任意值，但不为null和undefined
         * export
         */
        anything(): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$var_value !== null && this.$var_value !== void 0;
                const message: string = `期望值${this.$var_asNot === false ? "" : "不为"}：null or undefined, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望数组中包含
         * export
         */
        arrayContaining<T>(array: T[]): void {
            if (Global.debugMode & DebugMode.TEST) {
                let pass: boolean = true;
                for (let i: number = 0; i < array.length; i++) {
                    const value: T = array[i];
                    if (this.$var_value.indexOf(value) < 0) {
                        pass = false;
                        break;
                    }
                }
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}包含：${Common.toDisplayString(array)}, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望字符串中含有value
         * export
         */
        stringContaining(value: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$var_value.indexOf(value) > -1;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}包含：${value}, 实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望字符串被包含
         * export
         */
        stringMatching(value: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = value.indexOf(this.$var_value) > -1;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}被包含：${value}, 实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望存在属性
         * @value: 若不为void 0，则同时校验值
         * export
         */
        toHaveProperty(key: string, value?: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = value === void 0 ? this.$var_value[key] !== void 0 : this.$var_value[key] === value;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}存在属性：${key}, 实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望值为：value
         * export
         */
        toBe(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$var_value === value;
                const message: string = `期望值${this.$var_asNot === false ? "" : "不为"}：${Common.toDisplayString(value)}, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
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
         * 期望为：布尔类型
         * export
         */
        toBeBoolean(): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = typeof this.$var_value === "boolean";
                const message: string = `期望${this.$var_asNot === false ? "为" : "不为"}：布尔类型, 实际为：${typeof this.$var_value}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望对象类型为：cls
         * export
         */
        toBeInstanceOf(cls: new () => any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$var_value instanceof cls;
                const message: string = `期望 ${Common.getQualifiedClassName(this.$var_value)} 的类型${this.$var_asNot === false ? "" : "不"}为 ${Common.getClassName(cls)}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望在不关心类型的情况下，值在布尔上下文中为假
         * export
         */
        toBeFalsy(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = value ? false : true;
                const message: string = `期望 ${Common.toDisplayString(value)} ${this.$var_asNot === false ? "" : "不"}为假, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望在不关心类型的情况下，值在布尔上下文中为真
         * export
         */
        toBeTruthy(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = value ? true : false;
                const message: string = `期望 ${Common.toDisplayString(value)} ${this.$var_asNot === false ? "" : "不"}为假, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望两个数字是否相等
         * @deviation: 误差，默认为：0
         * export
         */
        toBeCloseTo(value: number, deviation: number = 0): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = Math.abs(this.$var_value - value) <= Math.abs(deviation);
                const message: string = `期望与${value}的误差${this.$var_asNot === true ? "" : "不"}超过${deviation}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望数字大于
         * export
         */
        toBeGreaterThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$var_value > value;
                const message: string = `期望${this.$var_asNot === true ? "" : "不"}大于 ${value}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望数字大于或等于
         * export
         */
        toBeGreaterOrEqualThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$var_value >= value;
                const message: string = `期望${this.$var_asNot === true ? "" : "不"}大于等于 ${value}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望数字小于
         * export
         */
        toBeLessThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$var_value < value;
                const message: string = `期望${this.$var_asNot === true ? "" : "不"}小于 ${value}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望数字小于或等于
         * export
         */
        toBeLessOrEqualThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$var_value <= value;
                const message: string = `期望${this.$var_asNot === true ? "" : "不"}小于等于 ${value}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        /**
         * 深度相等
         * export
         */
        toEqual(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = Common.isEqual(this.$var_value, value, false);
                const message: string = `期望相等：${Common.toDisplayString(value)}，实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        /**
         * 深度相等且类型一致
         * export
         */
        toStrictEqual(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = Common.isEqual(this.$var_value, value, true);
                const message: string = `期望相等：${Common.toDisplayString(value)}，实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        /**
         * 期望相反
         * export
         */
        get not(): Expect {
            this.$var_asNot = true;
            return this;
        }
    }
}

