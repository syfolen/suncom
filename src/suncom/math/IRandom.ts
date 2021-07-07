
module suncom {
    /**
     * 线性同余发生器接口
     * export
     */
    export interface IRandom {

        /**
         * 指定随机种子（必须大于0）
         * export
         */
        seed(value: number): void;

        /**
         * 返回一个随机数
         * export
         */
        random(): number;


        /**
         * 返回 >= min 且 < max 的随机整数
         * export
         */
        randomInt(min: number, max: number): number;

        /**
         * 随机种子
         * export
         */
        readonly r: number;
    }
}