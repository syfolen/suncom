
module suncom {
    /**
     * 期望异常测试类
     */
    export class Expect implements IExpect {
        /**
         * 实际值
         */
        private $value: any;

        /**
         * 是否期望相反
         */
        private $asNot: boolean = false;

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
         */
        expect(value: any): Expect {
            this.$value = value;
            return this;
        }

        /**
         * 测试执行接口，若测试未通过，则输出description
         */
        test(pass: boolean, description: string): void {
            if ((this.$asNot === false && pass === false) || (this.$asNot === true && pass === true)) {
                Test.ASSERT_FAILED = true;
                description !== null && suncom.Logger.error(DebugMode.ANY, description);
                if (Test.ASSERT_BREAKPOINT === true) {
                    debugger;
                }
            }
        }

        /**
         * 期望为任意值，但不为null和undefined
         */
        anything(): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$value !== null && this.$value !== void 0;
                const description: string = `期望值${this.$asNot === false ? "" : "不为"}：null or undefined, 实际值：${Common.toDisplayString(this.$value)}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望数组中包含
         */
        arrayContaining<T>(array: T[]): void {
            if (Global.debugMode & DebugMode.TEST) {
                let pass: boolean = true;
                for (let i: number = 0; i < array.length; i++) {
                    const value: T = array[i];
                    if (this.$value.indexOf(value) < 0) {
                        pass = false;
                        break;
                    }
                }
                const description: string = `期望${this.$asNot === false ? "" : "不"}包含：${Common.toDisplayString(array)}, 实际值：${Common.toDisplayString(this.$value)}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望字符串中含有value
         */
        stringContaining(value: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$value.indexOf(value) > -1;
                const description: string = `期望${this.$asNot === false ? "" : "不"}包含：${value}, 实际值：${this.$value}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望字符串被包含
         */
        stringMatching(value: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = value.indexOf(this.$value) > -1;
                const description: string = `期望${this.$asNot === false ? "" : "不"}被包含：${value}, 实际值：${this.$value}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望存在属性
         * @value: 若不为void 0，则同时校验值
         */
        toHaveProperty(key: string, value?: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = value === void 0 ? this.$value[key] !== void 0 : this.$value[key] === value;
                const description: string = `期望${this.$asNot === false ? "" : "不"}存在属性：${key}, 实际值：${this.$value}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望值为：value
         */
        toBe(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$value === value;
                const description: string = `期望值${this.$asNot === false ? "" : "不为"}：${Common.toDisplayString(value)}, 实际值：${Common.toDisplayString(this.$value)}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望值为：null
         */
        toBeNull(): void {
            this.toBe(null);
        }

        /**
         * 期望值为：undefined
         */
        toBeUndefined(): void {
            this.toBe(void 0);
        }

        /**
         * 期望对象类型为：cls
         */
        toBeInstanceOf(cls: new () => any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$value instanceof cls;
                const description: string = `期望 ${suncom.Common.getQualifiedClassName(this.$value)} 的类型${this.$asNot === false ? "" : "不"}为 ${Common.getClassName(cls)}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望两个数字是否相等
         * @deviation: 误差，默认为：0
         */
        toBeCloseTo(value: number, deviation: number = 0): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = Math.abs(this.$value - value) <= Math.abs(deviation);
                const description: string = `期望与${value}的误差${this.$asNot === true ? "" : "不"}超过${deviation}，实际值：${this.$value}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望数字大于
         */
        toBeGreaterThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$value > value;
                const description: string = `期望${this.$asNot === true ? "" : "不"}大于 ${value}，实际值：${this.$value}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望数字大于或等于
         */
        toBeGreaterOrEqualThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$value >= value;
                const description: string = `期望${this.$asNot === true ? "" : "不"}大于等于 ${value}，实际值：${this.$value}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望数字小于
         */
        toBeLessThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$value < value;
                const description: string = `期望${this.$asNot === true ? "" : "不"}小于 ${value}，实际值：${this.$value}`;
                this.test(pass, description);
            }
        }

        /**
         * 期望数字小于或等于
         */
        toBeLessOrEqualThan(value: number): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = this.$value <= value;
                const description: string = `期望${this.$asNot === true ? "" : "不"}小于等于 ${value}，实际值：${this.$value}`;
                this.test(pass, description);
            }
        }

        /**
         * 深度相等
         */
        toEqual(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = suncom.Common.isEqual(this.$value, value, false);
                const description: string = `期望相等：${Common.toDisplayString(value)}，实际值：${Common.toDisplayString(this.$value)}`
            }
        }

        /**
         * 深度相等且类型一致
         */
        toStrictEqual(value: any): void {
            if (Global.debugMode & DebugMode.TEST) {
                const pass: boolean = suncom.Common.isEqual(this.$value, value, true);
                const description: string = `期望相等：${Common.toDisplayString(value)}，实际值：${Common.toDisplayString(this.$value)}`
            }
        }

        /**
         * 期望相反
         */
        get not(): IExpect {
            this.$asNot = true;
            return this as any;
        }
    }
}

