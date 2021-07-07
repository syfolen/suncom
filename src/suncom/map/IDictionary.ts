
module suncom {
    /**
     * 字典，通常用于作为一个大量数据的集合，用于快速获取数据集中的某条数据
     * 说明：
     * 1. 字典的主键值只允许为数字或字符串类型
     * 2. 仅允许存储 Object 类型的数据
     * export
     */
    export interface IDictionary<T> {
        /**
         * 添加数据
         * export
         */
        put(data: T): T;

        /**
         * 根据键值返回数据
         * export
         */
        getByValue(key: NumberOrString, value: any): T;

        /**
         * 根据主键值快速返回数据
         * export
         */
        getByPrimaryValue(value: NumberOrString): T;

        /**
         * 移除数据
         * export
         */
        remove(data: T): T;

        /**
         * 根据键值移除数据
         * export
         */
        removeByValue(key: NumberOrString, value: any): T;

        /**
         * 根据主键值移除数据
         * export
         */
        removeByPrimaryValue(value: NumberOrString): T;

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
        forEach(method: (data: T) => any): void;

        /**
         * 数据源（请勿直接操作其中的数据）
         * export
         */
        readonly source: T[];
    }
}