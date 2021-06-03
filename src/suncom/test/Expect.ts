
module suncom {

    export class Expect implements IExpect {
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
            if (Global.debugMode > 0) {
                description !== null && Logger.debug(description);
            }
        }

        expect(value: any): IExpect {
            this.$var_value = value;
            return this;
        }

        interpret(str: string): IExpect {
            this.$var_interpretation = str;
            return this;
        }

        test(pass: boolean, message: string): void {
            if ((this.$var_asNot === false && pass === false) || (this.$var_asNot === true && pass === true)) {
                Test.ASSERT_FAILED = true;
                message !== null && Logger.error(message);
                this.$var_interpretation !== null && Logger.error(this.$var_interpretation);
                if (Test.ASSERT_BREAKPOINT === true) {
                    debugger;
                }
                throw Error("测试失败！");
            }
        }

        anything(): void {
            if (Global.debugMode > 0) {
                const pass: boolean = this.$var_value !== null && this.$var_value !== void 0;
                const message: string = `期望值${this.$var_asNot === false ? "" : "不为"}：null or undefined, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        arrayContaining<T>(array: T[]): void {
            if (Global.debugMode > 0) {
                let i: number, value: T, pass: boolean = true;
                for (i = 0; i < array.length; i++) {
                    value = array[i];
                    if (this.$var_value.indexOf(value) < 0) {
                        pass = false;
                        break;
                    }
                }
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}包含：${Common.toDisplayString(array)}, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        stringContaining(value: string): void {
            if (Global.debugMode > 0) {
                const pass: boolean = this.$var_value.indexOf(value) > -1;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}包含：${value}, 实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        stringMatching(value: string): void {
            if (Global.debugMode > 0) {
                const pass: boolean = value.indexOf(this.$var_value) > -1;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}被包含：${value}, 实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        toHaveProperty(key: string, value?: any): void {
            if (Global.debugMode > 0) {
                const pass: boolean = value === void 0 ? this.$var_value[key] !== void 0 : this.$var_value[key] === value;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}存在属性：${key}, 实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        toBe(value: any): void {
            if (Global.debugMode > 0) {
                const pass: boolean = this.$var_value === value;
                const message: string = `期望值${this.$var_asNot === false ? "" : "不为"}：${Common.toDisplayString(value)}, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        toBeNull(): void {
            this.toBe(null);
        }

        toBeUndefined(): void {
            this.toBe(void 0);
        }

        toBeBoolean(): void {
            if (Global.debugMode > 0) {
                const pass: boolean = typeof this.$var_value === "boolean";
                const message: string = `期望${this.$var_asNot === false ? "为" : "不为"}：布尔类型, 实际为：${typeof this.$var_value}`;
                this.test(pass, message);
            }
        }

        toBeInstanceOf(cls: new () => any): void {
            if (Global.debugMode > 0) {
                const pass: boolean = this.$var_value instanceof cls;
                const message: string = `期望 ${Common.getQualifiedClassName(this.$var_value)} 的类型${this.$var_asNot === false ? "" : "不"}为 ${Common.getClassName(cls)}`;
                this.test(pass, message);
            }
        }

        toBeFalsy(value: any): void {
            if (Global.debugMode > 0) {
                const pass: boolean = value ? false : true;
                const message: string = `期望 ${Common.toDisplayString(value)} ${this.$var_asNot === false ? "" : "不"}为假, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        toBeTruthy(value: any): void {
            if (Global.debugMode > 0) {
                const pass: boolean = value ? true : false;
                const message: string = `期望 ${Common.toDisplayString(value)} ${this.$var_asNot === false ? "" : "不"}为假, 实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        toBeCloseTo(value: number, deviation: number = 0): void {
            if (Global.debugMode > 0) {
                const pass: boolean = Math.abs(this.$var_value - value) <= Math.abs(deviation);
                const message: string = `期望与${value}的误差${this.$var_asNot === false ? "" : "不"}超过${deviation}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        toBeGreaterThan(value: number): void {
            if (Global.debugMode > 0) {
                const pass: boolean = this.$var_value > value;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}大于 ${value}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        toBeGreaterOrEqualThan(value: number): void {
            if (Global.debugMode > 0) {
                const pass: boolean = this.$var_value >= value;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}大于等于 ${value}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        toBeLessThan(value: number): void {
            if (Global.debugMode > 0) {
                const pass: boolean = this.$var_value < value;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}小于 ${value}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        toBeLessOrEqualThan(value: number): void {
            if (Global.debugMode > 0) {
                const pass: boolean = this.$var_value <= value;
                const message: string = `期望${this.$var_asNot === false ? "" : "不"}小于等于 ${value}，实际值：${this.$var_value}`;
                this.test(pass, message);
            }
        }

        toEqual(value: any): void {
            if (Global.debugMode > 0) {
                const pass: boolean = Common.isEqual(this.$var_value, value, false);
                const message: string = `期望相等：${Common.toDisplayString(value)}，实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        toStrictEqual(value: any): void {
            if (Global.debugMode > 0) {
                const pass: boolean = Common.isEqual(this.$var_value, value, true);
                const message: string = `期望相等：${Common.toDisplayString(value)}，实际值：${Common.toDisplayString(this.$var_value)}`;
                this.test(pass, message);
            }
        }

        get not(): IExpect {
            this.$var_asNot = true;
            return this;
        }
    }
}

