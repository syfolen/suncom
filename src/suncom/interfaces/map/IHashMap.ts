
module suncom {
    /**
     * 哈希表，通常用于作为一个大量数据的集合
     * 说明：
     * 1. 哈希表的主键值允许为任意类型
     * 2. 允许被存储的值为 null 或 undefined
     * export
     */
    export interface IHashMap<K, V> {

        /**
         * 返回字典中的条目数量
         * export
         */
        size(): number;

        /**
         * 是否存在从 key 到值的映射
         * export
         */
        exist(key: any): boolean;

        /**
         * 设置 key 所映射的值
         * export
         */
        set(key: K, value: V): V;

        /**
         * 获取 key 所映射的值
         * export
         */
        get(key: K): V;

        /**
         * 移除 key 及其所映射的值
         * export
         */
        remove(key: K): V;

        /**
         * 清除所有数据
         * export
         */
        clear(): void;

        /**
         * 为每个数据执行方法
         * 说明：
         * 1. 若method返回true，则会中断遍历
         * 2. 请勿在此方法中新增或移除数据
         * export
         */
        forEach(method: (value: V, key?: K) => any): void;
    }
}