
module suncom {
    /**
     * 哈希表接口，通常用于作为一个大量数据的集合，用于快速获取数据集中的某条数据
     * export
     */
    export interface IHashMap<T> {
        /**
         * 数据源（请勿直接操作其中的数据）
         * export
         */
        source: T[];

        /**
         * 数据映射表（请勿直接操作其中的数据）
         */
        dataMap: { [key: string]: T };

        /**
         * 添加数据
         * export
         */
        put(data: T): T;

        /**
         * 移除数据
         * export
         */
        remove(data: T): T;

        /**
         * 根据键值返回数据
         * export
         */
        getByValue(key: string, value: any): T;

        /**
         * 根据主键值快速返回数据
         * export
         */
        getByPrimaryValue(value: number | string): T;

        /**
         * 根据键值移除数据
         * export
         */
        removeByValue(key: string, value: any): T;

        /**
         * 根据主键值移除数据
         * export
         */
        removeByPrimaryValue(value: number | string): T;

        /**
         * 为每个数据执行方法
         * 说明：
         * 1. 若method返回true，则会中断遍历
         * 2. 谨慎在此方法中新增或移除数据
         * export
         */
        forEach(method: (data: T) => any): void;
    }
}