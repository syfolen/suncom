
module suncom {
    /**
     * 期望异常测试类接口
     * export
     */
    export interface IExpect {

        /**
         * 期望为任意值，但不为null和undefined
         * export
         */
        anything(): void;

        /**
         * 期望数组中包含
         * export
         */
        arrayContaining<T>(array: T[]): void;

        /**
         * 期望字符串中含有value
         * export
         */
        stringContaining(value: string): void;

        /**
         * 期望字符串被包含
         * export
         */
        stringMatching(value: string): void;

        /**
         * 期望存在属性
         * @value: 若不为void 0，则同时校验值
         * export
         */
        toHaveProperty(key: string, value?: any): void;

        /**
         * 期望值为：value
         * export
         */
        toBe(value: any): void;

        /**
         * 期望值为：null
         * export
         */
        toBeNull(): void;

        /**
         * 期望值为：undefined
         * export
         */
        toBeUndefined(): void;

        /**
         * 期望对象类型为：cls
         * export
         */
        toBeInstanceOf(cls: new () => any): void;

        /**
         * 期望两个数字是否相等
         * @deviation: 误差，默认为：0
         */
        toBeCloseTo(value: number, deviation?: number): void;

        /**
         * 期望数字大于
         * export
         */
        toBeGreaterThan(value: number): void;

        /**
         * 期望数字大于或等于
         * export
         */
        toBeGreaterOrEqualThan(value: number): void;

        /**
         * 期望数字小于
         * export
         */
        toBeLessThan(value: number): void;

        /**
         * 期望数字小于或等于
         * export
         */
        toBeLessOrEqualThan(value: number): void;

        /**
         * 深度相等
         * export
         */
        toEqual(value: any): void;

        /**
         * 深度相等且类型一致
         * export
         */
        toStrictEqual(value: any): void;

        /**
         * 期望相反
         * export
         */
        readonly not: IExpect;
    }
}