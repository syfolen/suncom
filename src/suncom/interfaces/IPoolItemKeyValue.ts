
module suncom {
    /**
     * 对象池中对象被指定的键名与键值
     */
    export interface IPoolItemKeyValue {
        /**
         * 键名
         */
        key: string;

        /**
         * 池中值
         */
        inPoolValue: number | string;

        /**
         * 默认值
         */
        defaultValue: number | string;
    }
}